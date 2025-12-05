// ========================================
// AUTO ARCHIVE TABS - Background Script
// ========================================

// Default settings
const DEFAULT_SETTINGS = {
    // Scope: 'global', 'perWindow', or 'perTabGroup'
    scope: 'global',
    // Sync settings across devices (Macs with the extension installed)
    syncEnabled: true,
    // Global settings
    archiveThreshold: 24,
    archiveThresholdUnit: 'hours', // 'seconds', 'minutes', 'hours'
    archiveExpiration: 24,
    archiveExpirationUnit: 'hours',
    minTabsForArchiving: 11,
    maxTabsPerWindow: 20,
    maxTabsAction: 'archiveOldest', // 'archiveOldest' or 'closeNew'
    neverArchivePatterns: [],
    siteLimits: [], // Array of { domain: string, maxTabs: number }
    // Per-window overrides (only used when scope is 'perWindow')
    windowOverrides: {},
    // Per-tab-group overrides (only used when scope is 'perTabGroup')
    // tabGroupOverrides: { [groupId]: { maxTabsPerWindow: number, archiveThreshold: number, ... } }
    tabGroupOverrides: {},
    // Custom names for tab groups (for display)
    tabGroupNames: {}
};

// Check if Tab Groups API is available
function isTabGroupsApiAvailable() {
    return typeof browser.tabGroups !== 'undefined';
}

// Storage keys
const STORAGE_KEYS = {
    SETTINGS: 'settings',
    ARCHIVE: 'archive',
    TAB_ACTIVITY: 'tabActivity',
    URL_ACTIVITY: 'urlActivity', // Track by URL for persistence across browser restarts
    WINDOW_NAMES: 'windowNames' // Custom names for windows
};

// Get settings for a specific window (with per-window overrides if enabled)
function getSettingsForWindow(settings, windowId) {
    if (settings.scope !== 'perWindow' || !windowId) {
        return settings;
    }
    
    const overrides = settings.windowOverrides?.[windowId] || {};
    return { ...settings, ...overrides };
}

// Get settings for a specific tab (with tab group overrides if enabled)
function getSettingsForTab(settings, tab) {
    if (settings.scope !== 'perTabGroup' || !tab.groupId || tab.groupId === -1) {
        return settings;
    }
    
    const overrides = settings.tabGroupOverrides?.[tab.groupId] || {};
    return { ...settings, ...overrides };
}

// Get settings for a tab group
function getSettingsForTabGroup(settings, groupId) {
    if (settings.scope !== 'perTabGroup' || !groupId || groupId === -1) {
        return settings;
    }
    
    const overrides = settings.tabGroupOverrides?.[groupId] || {};
    return { ...settings, ...overrides };
}

// Convert time to milliseconds based on unit
function toMilliseconds(value, unit) {
    switch (unit) {
        case 'seconds': return value * 1000;
        case 'minutes': return value * 60 * 1000;
        case 'hours': return value * 60 * 60 * 1000;
        case 'days': return value * 24 * 60 * 60 * 1000;
        default: return value * 60 * 60 * 1000;
    }
}

// URLs that should be deleted directly, not archived
const SKIP_ARCHIVE_URLS = [
    'favorites://',
    'about:',
    'safari-resource:',
    'file://'
];

// Initialize extension
async function initialize() {
    console.log('🌟 Auto Archive Tabs - Initializing...');
    
    // Try to load synced settings first (for cross-device sync)
    let settings = null;
    try {
        const syncResult = await browser.storage.sync.get(STORAGE_KEYS.SETTINGS);
        if (syncResult.settings) {
            settings = { ...DEFAULT_SETTINGS, ...syncResult.settings };
            console.log('📡 Loaded synced settings from iCloud');
        }
    } catch (e) {
        console.log('Sync storage not available, using local storage');
    }
    
    // Fall back to local storage
    if (!settings) {
        const result = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
        settings = result.settings || DEFAULT_SETTINGS;
    }
    
    // Always save to local storage for offline access
    await browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
    console.log('✅ Settings loaded');
    
    // Initialize archive if needed
    const archiveResult = await browser.storage.local.get(STORAGE_KEYS.ARCHIVE);
    if (!archiveResult.archive) {
        await browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: [] });
    }
    
    // Initialize tab activity tracking
    const activityResult = await browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY);
    if (!activityResult.tabActivity) {
        await browser.storage.local.set({ [STORAGE_KEYS.TAB_ACTIVITY]: {} });
    }
    
    // Initialize URL activity tracking (persists across browser restarts)
    const urlActivityResult = await browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY);
    if (!urlActivityResult.urlActivity) {
        await browser.storage.local.set({ [STORAGE_KEYS.URL_ACTIVITY]: {} });
    }
    
    // Track all existing tabs
    await trackExistingTabs();
    
    // Start periodic cleanup
    startPeriodicCleanup();
    
    // Listen for sync changes from other devices
    setupSyncListener();
    
    console.log('✅ Auto Archive Tabs initialized');
}

// Listen for settings changes from other devices
function setupSyncListener() {
    try {
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'sync' && changes.settings) {
                console.log('📡 Settings updated from another device');
                const newSettings = { ...DEFAULT_SETTINGS, ...changes.settings.newValue };
                browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: newSettings });
                restartCleanupWithNewSettings();
            }
        });
    } catch (e) {
        console.log('Could not setup sync listener:', e);
    }
}

// Save settings (to both local and sync if enabled)
async function saveSettings(settings) {
    // Always save locally
    await browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
    
    // Also save to sync if enabled
    if (settings.syncEnabled) {
        try {
            // Don't sync windowOverrides or archive (too large/device-specific)
            const syncSettings = { ...settings };
            delete syncSettings.windowOverrides;
            await browser.storage.sync.set({ [STORAGE_KEYS.SETTINGS]: syncSettings });
            console.log('📡 Settings synced to iCloud');
        } catch (e) {
            console.log('Could not sync settings:', e);
        }
    }
}

// Track all existing tabs on startup
async function trackExistingTabs() {
    const tabs = await browser.tabs.query({});
    const now = Date.now();
    
    // Load existing URL activity (persists across browser restarts)
    const urlActivityResult = await browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY);
    const urlActivity = urlActivityResult.urlActivity || {};
    
    // Create tab ID to URL mapping for quick lookups
    const tabActivity = {};
    
    for (const tab of tabs) {
        // Use URL as the key for persistence
        const url = tab.url;
        if (url && !shouldSkipArchive(url)) {
            // Only set timestamp if URL doesn't have one (preserve existing timestamps)
            if (!urlActivity[url]) {
                urlActivity[url] = now;
            }
            // Map tab ID to URL for quick lookups
            tabActivity[tab.id] = url;
        }
    }
    
    // Clean up old URLs that don't have active tabs anymore (older than 30 days)
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const activeUrls = new Set(Object.values(tabActivity));
    for (const url in urlActivity) {
        if (!activeUrls.has(url) && urlActivity[url] < thirtyDaysAgo) {
            delete urlActivity[url];
        }
    }
    
    await browser.storage.local.set({ 
        [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity,
        [STORAGE_KEYS.URL_ACTIVITY]: urlActivity 
    });
    console.log(`📊 Tracking ${tabs.length} existing tabs (${Object.keys(urlActivity).length} URLs with preserved timestamps)`);
}

// Update tab activity timestamp (by URL for persistence)
async function updateTabActivity(tabId, url = null) {
    const now = Date.now();
    
    // Get the tab URL if not provided
    if (!url) {
        try {
            const tab = await browser.tabs.get(tabId);
            url = tab.url;
        } catch (e) {
            console.log('Could not get tab URL:', e);
            return;
        }
    }
    
    if (!url || shouldSkipArchive(url)) return;
    
    // Update both tab ID mapping and URL timestamp
    const [tabResult, urlResult] = await Promise.all([
        browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY),
        browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY)
    ]);
    
    const tabActivity = tabResult.tabActivity || {};
    const urlActivity = urlResult.urlActivity || {};
    
    // Map tab ID to URL
    tabActivity[tabId] = url;
    // Update URL timestamp (this is what persists across restarts)
    urlActivity[url] = now;
    
    await browser.storage.local.set({ 
        [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity,
        [STORAGE_KEYS.URL_ACTIVITY]: urlActivity 
    });
}

// Check if URL matches never-archive patterns
function matchesNeverArchivePattern(url, patterns) {
    for (const pattern of patterns) {
        const regex = patternToRegex(pattern);
        if (regex.test(url)) {
            return true;
        }
    }
    return false;
}

// Convert wildcard pattern to regex
function patternToRegex(pattern) {
    const escaped = pattern
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*');
    return new RegExp('^' + escaped + '$');
}

// Check if URL should skip archive (delete directly)
function shouldSkipArchive(url) {
    if (!url) return true;
    return SKIP_ARCHIVE_URLS.some(prefix => url.startsWith(prefix));
}

// Archive a tab
async function archiveTab(tab) {
    // Remove from activity tracking first (both tab ID and URL)
    const [tabResult, urlResult] = await Promise.all([
        browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY),
        browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY)
    ]);
    const tabActivity = tabResult.tabActivity || {};
    const urlActivity = urlResult.urlActivity || {};
    
    delete tabActivity[tab.id];
    if (tab.url) {
        delete urlActivity[tab.url];
    }
    
    await browser.storage.local.set({ 
        [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity,
        [STORAGE_KEYS.URL_ACTIVITY]: urlActivity 
    });
    
    // Check if this URL should be deleted directly (start page, etc)
    if (shouldSkipArchive(tab.url)) {
        await browser.tabs.remove(tab.id);
        console.log(`🗑️ Deleted directly (start page): ${tab.title}`);
        return;
    }
    
    const archiveResult = await browser.storage.local.get(STORAGE_KEYS.ARCHIVE);
    const archive = archiveResult.archive || [];
    
    // Check for duplicates - don't add if URL already exists
    const isDuplicate = archive.some(entry => entry.url === tab.url);
    
    if (!isDuplicate) {
        const entry = {
            id: Date.now() + Math.random(), // Unique ID
            title: tab.title || 'Untitled',
            url: tab.url,
            timestamp: Date.now(),
            windowId: tab.windowId
        };
        
        archive.unshift(entry); // Add to beginning
        await browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: archive });
        console.log(`📦 Archived: ${tab.title}`);
    } else {
        console.log(`⏭️ Skipped duplicate: ${tab.title}`);
    }
    
    // Close the tab
    await browser.tabs.remove(tab.id);
}

// Clean up expired archive entries
async function cleanupExpiredArchive() {
    const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
    const settings = settingsResult.settings || DEFAULT_SETTINGS;
    
    const archiveResult = await browser.storage.local.get(STORAGE_KEYS.ARCHIVE);
    const archive = archiveResult.archive || [];
    
    const expirationMs = toMilliseconds(
        settings.archiveExpiration || settings.archiveExpirationHours || 24,
        settings.archiveExpirationUnit || 'hours'
    );
    const now = Date.now();
    
    const filteredArchive = archive.filter(entry => {
        return (now - entry.timestamp) < expirationMs;
    });
    
    if (filteredArchive.length < archive.length) {
        await browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: filteredArchive });
        console.log(`🧹 Cleaned up ${archive.length - filteredArchive.length} expired archive entries`);
    }
}

// Archive old inactive tabs in a window
async function archiveInactiveTabs(windowId) {
    const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
    const baseSettings = settingsResult.settings || DEFAULT_SETTINGS;
    
    const tabs = await browser.tabs.query({ windowId });
    
    // Use URL activity for persistence across browser restarts
    const urlActivityResult = await browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY);
    const urlActivity = urlActivityResult.urlActivity || {};
    
    const now = Date.now();
    let archivedCount = 0;
    
    // Group tabs by their tab group for per-group processing
    if (baseSettings.scope === 'perTabGroup' && isTabGroupsApiAvailable()) {
        // Process each tab group separately
        const tabsByGroup = {};
        for (const tab of tabs) {
            const groupId = tab.groupId || -1;
            if (!tabsByGroup[groupId]) {
                tabsByGroup[groupId] = [];
            }
            tabsByGroup[groupId].push(tab);
        }
        
        for (const [groupId, groupTabs] of Object.entries(tabsByGroup)) {
            const groupSettings = getSettingsForTabGroup(baseSettings, parseInt(groupId));
            const unpinnedTabs = groupTabs.filter(tab => !tab.pinned);
            
            // Only archive if group has >= min unpinned tabs
            if (unpinnedTabs.length < groupSettings.minTabsForArchiving) {
                continue;
            }
            
            const thresholdMs = toMilliseconds(
                groupSettings.archiveThreshold || 24,
                groupSettings.archiveThresholdUnit || 'hours'
            );
            
            for (const tab of groupTabs) {
                if (tab.pinned) continue;
                if (matchesNeverArchivePattern(tab.url, groupSettings.neverArchivePatterns)) continue;
                
                const lastActive = urlActivity[tab.url] || now;
                if ((now - lastActive) >= thresholdMs) {
                    await archiveTab(tab);
                    archivedCount++;
                }
            }
        }
    } else {
        // Use window-based or global settings
        const settings = getSettingsForWindow(baseSettings, windowId);
        const unpinnedTabs = tabs.filter(tab => !tab.pinned);
        
        // Only archive if window has >= min unpinned tabs
        if (unpinnedTabs.length < settings.minTabsForArchiving) {
            return 0;
        }
        
        const thresholdMs = toMilliseconds(
            settings.archiveThreshold || settings.archiveThresholdHours || 24,
            settings.archiveThresholdUnit || 'hours'
        );
        
        for (const tab of tabs) {
            if (tab.pinned) continue;
            if (matchesNeverArchivePattern(tab.url, settings.neverArchivePatterns)) continue;
            
            const lastActive = urlActivity[tab.url] || now;
            if ((now - lastActive) >= thresholdMs) {
                await archiveTab(tab);
                archivedCount++;
            }
        }
    }
    
    if (archivedCount > 0) {
        console.log(`📦 Archived ${archivedCount} inactive tabs in window ${windowId}`);
    }
    
    return archivedCount;
}

// Archive oldest tabs in a specific group
async function archiveOldestInGroup(groupTabs, groupSettings, baseSettings) {
    const urlActivityResult = await browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY);
    const urlActivity = urlActivityResult.urlActivity || {};
    
    const sortedTabs = groupTabs
        .filter(tab => !matchesNeverArchivePattern(tab.url, baseSettings.neverArchivePatterns))
        .sort((a, b) => {
            const aActivity = urlActivity[a.url] || Date.now();
            const bActivity = urlActivity[b.url] || Date.now();
            return aActivity - bActivity; // Oldest first
        });
    
    const toClose = groupTabs.length - groupSettings.maxTabsPerWindow;
    
    for (let i = 0; i < Math.min(toClose, sortedTabs.length); i++) {
        const tab = sortedTabs[i];
        console.log(`Archiving oldest tab in group: ${tab.title}`);
        await archiveTab(tab);
    }
}

// Get domain from URL
function getDomainFromUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace(/^www\./, '');
    } catch {
        return null;
    }
}

// Check if a domain matches a site limit pattern
function domainMatchesSiteLimit(tabDomain, limitDomain) {
    if (!tabDomain || !limitDomain) return false;
    // Exact match or subdomain match
    return tabDomain === limitDomain || tabDomain.endsWith('.' + limitDomain);
}

// Enforce site-specific tab limits
async function enforceSiteLimits(windowId, newTab) {
    if (!newTab || !newTab.url) return;
    
    const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
    const settings = settingsResult.settings || DEFAULT_SETTINGS;
    const siteLimits = settings.siteLimits || [];
    
    if (siteLimits.length === 0) return;
    
    const newTabDomain = getDomainFromUrl(newTab.url);
    if (!newTabDomain) return;
    
    // Find matching site limit
    const matchingLimit = siteLimits.find(limit => 
        domainMatchesSiteLimit(newTabDomain, limit.domain)
    );
    
    if (!matchingLimit) return;
    
    // Get all tabs in the window
    const allTabs = await browser.tabs.query({ windowId });
    
    // Count tabs for this domain (excluding pinned)
    const domainTabs = allTabs.filter(tab => {
        if (tab.pinned) return false;
        const tabDomain = getDomainFromUrl(tab.url);
        return domainMatchesSiteLimit(tabDomain, matchingLimit.domain);
    });
    
    if (domainTabs.length <= matchingLimit.maxTabs) return;
    
    console.log(`Site limit reached for ${matchingLimit.domain}: ${domainTabs.length}/${matchingLimit.maxTabs}`);
    
    // For site-specific limits, always close the newly opened tab
    console.log(`Closing new tab for ${matchingLimit.domain}: ${newTab.title || 'New Tab'}`);
    try {
        await browser.tabs.remove(newTab.id);
        // Clean up tab ID mapping
        const tabResult = await browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY);
        const tabActivity = tabResult.tabActivity || {};
        delete tabActivity[newTab.id];
        await browser.storage.local.set({ [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity });
    } catch (e) {
        console.log('Could not close new tab:', e);
    }
}

// Enforce max tabs per window or tab group
async function enforceMaxTabs(windowId, newlyCreatedTab = null) {
    const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
    const baseSettings = settingsResult.settings || DEFAULT_SETTINGS;
    
    const tabs = await browser.tabs.query({ windowId });
    
    // If using per-tab-group settings and the new tab has a group
    if (baseSettings.scope === 'perTabGroup' && isTabGroupsApiAvailable() && newlyCreatedTab?.groupId && newlyCreatedTab.groupId !== -1) {
        const groupId = newlyCreatedTab.groupId;
        const groupSettings = getSettingsForTabGroup(baseSettings, groupId);
        
        // Count tabs in this group
        const groupTabs = tabs.filter(tab => !tab.pinned && tab.groupId === groupId);
        
        if (groupTabs.length <= groupSettings.maxTabsPerWindow) {
            return;
        }
        
        console.log(`Tab group ${groupId} has ${groupTabs.length} tabs (max: ${groupSettings.maxTabsPerWindow})`);
        
        // Handle max tabs action for this group
        if (groupSettings.maxTabsAction === 'closeNew' && newlyCreatedTab && !newlyCreatedTab.pinned) {
            console.log(`Closing newly created tab in group: ${newlyCreatedTab.title || 'New Tab'}`);
            try {
                await browser.tabs.remove(newlyCreatedTab.id);
                const tabResult = await browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY);
                const tabActivity = tabResult.tabActivity || {};
                delete tabActivity[newlyCreatedTab.id];
                await browser.storage.local.set({ [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity });
            } catch (e) {
                console.log('Could not close new tab:', e);
            }
            return;
        }
        
        // Archive oldest in group
        await archiveOldestInGroup(groupTabs, groupSettings, baseSettings);
        return;
    }
    
    // Standard window-based or global enforcement
    const settings = getSettingsForWindow(baseSettings, windowId);
    const unpinnedTabs = tabs.filter(tab => !tab.pinned);
    
    if (unpinnedTabs.length <= settings.maxTabsPerWindow) {
        return;
    }
    
    console.log(`Window ${windowId} has ${unpinnedTabs.length} unpinned tabs (max: ${settings.maxTabsPerWindow})`);
    
    // Check if we should close the new tab instead
    if (settings.maxTabsAction === 'closeNew' && newlyCreatedTab && !newlyCreatedTab.pinned) {
        console.log(`Closing newly created tab: ${newlyCreatedTab.title || 'New Tab'}`);
        try {
            await browser.tabs.remove(newlyCreatedTab.id);
            // Clean up tab ID mapping
            const tabResult = await browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY);
            const tabActivity = tabResult.tabActivity || {};
            delete tabActivity[newlyCreatedTab.id];
            await browser.storage.local.set({ [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity });
        } catch (e) {
            console.log('Could not close new tab:', e);
        }
        return;
    }
    
    // Default behavior: archive oldest tabs
    // First, try archiving old tabs
    const archivedCount = await archiveInactiveTabs(windowId);
    
    // Check again
    const remainingTabs = await browser.tabs.query({ windowId });
    const remainingUnpinned = remainingTabs.filter(tab => !tab.pinned);
    
    if (remainingUnpinned.length <= settings.maxTabsPerWindow) {
        console.log('Max tabs enforced via archiving');
        return;
    }
    
    // Still too many - close least recently active tabs
    const urlActivityResult = await browser.storage.local.get(STORAGE_KEYS.URL_ACTIVITY);
    const urlActivity = urlActivityResult.urlActivity || {};
    
    const sortedTabs = remainingUnpinned
        .filter(tab => !matchesNeverArchivePattern(tab.url, settings.neverArchivePatterns))
        .sort((a, b) => {
            const aActivity = urlActivity[a.url] || Date.now();
            const bActivity = urlActivity[b.url] || Date.now();
            return aActivity - bActivity; // Oldest first
        });
    
    const toClose = remainingUnpinned.length - settings.maxTabsPerWindow;
    
    for (let i = 0; i < Math.min(toClose, sortedTabs.length); i++) {
        const tab = sortedTabs[i];
        console.log(`Closing least active tab: ${tab.title}`);
        await archiveTab(tab);
    }
    
    console.log('Max tabs enforced');
}

// Calculate proportional cleanup interval (max 10 minutes)
function calculateCleanupInterval(settings) {
    const thresholdMs = toMilliseconds(
        settings.archiveThreshold || 24,
        settings.archiveThresholdUnit || 'hours'
    );
    
    // Cleanup interval = threshold / 6 (check ~6 times per threshold period)
    // But max 10 minutes, min 5 seconds
    const proportionalInterval = thresholdMs / 6;
    const maxInterval = 10 * 60 * 1000; // 10 minutes
    const minInterval = 5 * 1000; // 5 seconds
    
    return Math.max(minInterval, Math.min(maxInterval, proportionalInterval));
}

// Periodic cleanup with proportional interval
let cleanupIntervalId = null;

async function startPeriodicCleanup() {
    const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
    const settings = settingsResult.settings || DEFAULT_SETTINGS;
    
    const interval = calculateCleanupInterval(settings);
    console.log(`Cleanup interval set to ${Math.round(interval / 1000)}s (proportional to ${settings.archiveThreshold} ${settings.archiveThresholdUnit})`);
    
    // Clear existing interval if any
    if (cleanupIntervalId) {
        clearInterval(cleanupIntervalId);
    }
    
    cleanupIntervalId = setInterval(async () => {
        console.log('Running periodic cleanup...');
        
        // Clean expired archives
        await cleanupExpiredArchive();
        
        // Archive inactive tabs in all windows
        const windows = await browser.windows.getAll();
        for (const window of windows) {
            await archiveInactiveTabs(window.id);
        }
        
        console.log('Periodic cleanup complete');
    }, interval);
}

// Restart cleanup with new interval when settings change
async function restartCleanupWithNewSettings() {
    await startPeriodicCleanup();
}

// Event listeners
browser.tabs.onActivated.addListener(async (activeInfo) => {
    await updateTabActivity(activeInfo.tabId);
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        await updateTabActivity(tabId, tab.url);
    }
    
    // If URL changed, update the tab ID -> URL mapping
    if (changeInfo.url) {
        await updateTabActivity(tabId, changeInfo.url);
    }
    
    // Check site limits when tab URL changes
    if (changeInfo.url && tab.windowId) {
        await enforceSiteLimits(tab.windowId, tab);
    }
});

browser.tabs.onCreated.addListener(async (tab) => {
    await updateTabActivity(tab.id);
    
    // Enforce max tabs when new tab is created (pass the new tab)
    if (tab.windowId) {
        await enforceMaxTabs(tab.windowId, tab);
    }
});

browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    // Clean up tab ID mapping (but preserve URL activity for persistence)
    const tabResult = await browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY);
    const tabActivity = tabResult.tabActivity || {};
    
    // Get the URL before deleting (to optionally clean up urlActivity if needed)
    const url = tabActivity[tabId];
    delete tabActivity[tabId];
    
    await browser.storage.local.set({ [STORAGE_KEYS.TAB_ACTIVITY]: tabActivity });
    // Note: We don't delete from urlActivity here to preserve the timestamp
    // in case the user reopens the same URL later
});

// Message handler for popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    
    if (request.action === 'getSettings') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => result.settings || DEFAULT_SETTINGS);
    }
    
    if (request.action === 'updateSettings') {
        return saveSettings(request.settings)
            .then(() => {
                // Restart cleanup with new interval
                restartCleanupWithNewSettings();
                return { success: true };
            });
    }
    
    if (request.action === 'getWindows') {
        return browser.windows.getAll({ populate: true })
            .then(async (windows) => {
                const windowNamesResult = await browser.storage.local.get(STORAGE_KEYS.WINDOW_NAMES);
                const windowNames = windowNamesResult.windowNames || {};
                
                return windows.map(w => ({
                    id: w.id,
                    tabCount: w.tabs ? w.tabs.filter(t => !t.pinned).length : 0,
                    name: windowNames[w.id] || `Window ${w.id}`,
                    focused: w.focused
                }));
            });
    }
    
    if (request.action === 'setWindowName') {
        return browser.storage.local.get(STORAGE_KEYS.WINDOW_NAMES)
            .then(result => {
                const windowNames = result.windowNames || {};
                windowNames[request.windowId] = request.name;
                return browser.storage.local.set({ [STORAGE_KEYS.WINDOW_NAMES]: windowNames });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'setWindowOverride') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (!settings.windowOverrides) {
                    settings.windowOverrides = {};
                }
                settings.windowOverrides[request.windowId] = {
                    ...settings.windowOverrides[request.windowId],
                    ...request.overrides
                };
                return saveSettings(settings);
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'removeWindowOverride') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (settings.windowOverrides) {
                    delete settings.windowOverrides[request.windowId];
                }
                return saveSettings(settings);
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'getCurrentWindow') {
        return browser.windows.getCurrent()
            .then(w => ({ windowId: w.id }));
    }
    
    if (request.action === 'getTabGroups') {
        // Check if Tab Groups API is available
        if (!isTabGroupsApiAvailable()) {
            return Promise.resolve({ available: false, groups: [] });
        }
        
        return browser.tabGroups.query({})
            .then(async (groups) => {
                const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
                const settings = settingsResult.settings || DEFAULT_SETTINGS;
                const customNames = settings.tabGroupNames || {};
                
                // Get tab counts per group
                const tabs = await browser.tabs.query({});
                const tabCounts = {};
                for (const tab of tabs) {
                    if (tab.groupId && tab.groupId !== -1) {
                        tabCounts[tab.groupId] = (tabCounts[tab.groupId] || 0) + 1;
                    }
                }
                
                return {
                    available: true,
                    groups: groups.map(g => ({
                        id: g.id,
                        title: customNames[g.id] || g.title || `Group ${g.id}`,
                        color: g.color,
                        tabCount: tabCounts[g.id] || 0
                    }))
                };
            })
            .catch(e => {
                console.log('Tab Groups API error:', e);
                return { available: false, groups: [] };
            });
    }
    
    if (request.action === 'setTabGroupOverride') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (!settings.tabGroupOverrides) {
                    settings.tabGroupOverrides = {};
                }
                settings.tabGroupOverrides[request.groupId] = {
                    ...settings.tabGroupOverrides[request.groupId],
                    ...request.overrides
                };
                return saveSettings(settings);
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'removeTabGroupOverride') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (settings.tabGroupOverrides) {
                    delete settings.tabGroupOverrides[request.groupId];
                }
                return saveSettings(settings);
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'isTabGroupsAvailable') {
        return Promise.resolve({ available: isTabGroupsApiAvailable() });
    }
    
    if (request.action === 'getArchive') {
        return browser.storage.local.get(STORAGE_KEYS.ARCHIVE)
            .then(result => result.archive || []);
    }
    
    if (request.action === 'restoreTab') {
        return browser.tabs.create({ url: request.url })
            .then(() => {
                // Remove from archive
                return browser.storage.local.get(STORAGE_KEYS.ARCHIVE);
            })
            .then(result => {
                const archive = result.archive || [];
                const filtered = archive.filter(entry => entry.id !== request.id);
                return browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: filtered });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'addNeverArchivePattern') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (!settings.neverArchivePatterns.includes(request.pattern)) {
                    settings.neverArchivePatterns.push(request.pattern);
                }
                return browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'removeNeverArchivePattern') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                settings.neverArchivePatterns = settings.neverArchivePatterns.filter(
                    p => p !== request.pattern
                );
                return browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'addSiteLimit') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (!settings.siteLimits) {
                    settings.siteLimits = [];
                }
                // Remove existing limit for this domain if exists
                settings.siteLimits = settings.siteLimits.filter(
                    l => l.domain !== request.domain
                );
                // Add new limit
                settings.siteLimits.push({
                    domain: request.domain,
                    maxTabs: request.maxTabs
                });
                return browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'removeSiteLimit') {
        return browser.storage.local.get(STORAGE_KEYS.SETTINGS)
            .then(result => {
                const settings = result.settings || DEFAULT_SETTINGS;
                if (!settings.siteLimits) {
                    settings.siteLimits = [];
                }
                settings.siteLimits = settings.siteLimits.filter(
                    l => l.domain !== request.domain
                );
                return browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
            })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'getStats') {
        return Promise.all([
            browser.tabs.query({}),
            browser.storage.local.get(STORAGE_KEYS.ARCHIVE),
            browser.storage.local.get(STORAGE_KEYS.TAB_ACTIVITY)
        ]).then(([tabs, archiveResult, activityResult]) => {
            // Count only non-pinned tabs
            const unpinnedTabs = tabs.filter(tab => !tab.pinned);
            return {
                totalTabs: unpinnedTabs.length,
                archivedCount: (archiveResult.archive || []).length,
                trackedTabs: Object.keys(activityResult.tabActivity || {}).length
            };
        });
    }
    
    if (request.action === 'showShowcase') {
        // Store flag to show showcase when app opens
        return browser.storage.local.set({ showShowcase: true })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'openApp') {
        // Send native message to open the app
        return browser.runtime.sendNativeMessage("application.id", { action: "openApp" })
            .then(() => ({ success: true }))
            .catch(error => {
                console.log('Native messaging not available, trying URL scheme');
                // Fallback: try opening via URL scheme
                return browser.tabs.create({ url: 'autoarchive://open' })
                    .then(() => ({ success: true }))
                    .catch(() => ({ success: false }));
            });
    }
    
    if (request.action === 'clearArchive') {
        return browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: [] })
            .then(() => ({ success: true }));
    }
    
    if (request.action === 'deleteFromArchive') {
        return browser.storage.local.get(STORAGE_KEYS.ARCHIVE)
            .then(result => {
                const archive = result.archive || [];
                const filtered = archive.filter(entry => entry.id !== request.id);
                return browser.storage.local.set({ [STORAGE_KEYS.ARCHIVE]: filtered });
            })
            .then(() => ({ success: true }));
    }
});

// Context menu for "Never Archive This Tab"
browser.contextMenus.create({
    id: "neverArchiveTab",
    title: "Never Archive This Tab",
    contexts: ["page"]
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "neverArchiveTab") {
        const pattern = new URL(tab.url).origin + "/*";
        
        const settingsResult = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);
        const settings = settingsResult.settings || DEFAULT_SETTINGS;
        
        if (!settings.neverArchivePatterns.includes(pattern)) {
            settings.neverArchivePatterns.push(pattern);
            await browser.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
            console.log(`✅ Added never-archive pattern: ${pattern}`);
        }
    }
});

// Initialize on startup
initialize();
