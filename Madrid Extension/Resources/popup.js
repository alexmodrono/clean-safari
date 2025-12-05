// ========================================
// AUTO ARCHIVE TABS - Popup Script
// ========================================

// Translations
const translations = {
    en: {
        appName: "Auto Archive",
        tabs: "tabs",
        tabArchive: "Archive",
        tabSettings: "Settings",
        tabProtected: "Protected",
        archived: "archived",
        clear: "Clear",
        clearAll: "Clear All",
        showGuide: "Show Guide",
        noArchivedTabs: "No archived tabs yet",
        inactiveTabsAppear: "Inactive tabs will appear here",
        archiveAfterInactive: "Archive after inactive for",
        deleteFromArchive: "Delete from archive after",
        minTabsForArchiving: "Minimum tabs to start archiving",
        maxTabsPerWindow: "Max tabs per window",
        whenMaxReached: "When max tabs reached",
        archiveOldestOption: "Archive oldest inactive tab",
        closeNewOption: "Close the new tab",
        protectedInfo: "Sites matching these patterns will never be archived.",
        patternPlaceholder: "e.g. *://github.com/*",
        add: "Add",
        noProtectedSites: "No protected sites",
        unitSec: "sec",
        unitMin: "min",
        unitHour: "hr",
        unitDay: "day",
        siteLimits: "Per-site tab limits",
        siteLimitsInfo: "Limit the number of tabs for specific websites.",
        siteDomainPlaceholder: "e.g. youtube.com",
        maxTabs: "max",
        noSiteLimits: "No site limits configured",
        settingsScope: "Settings scope",
        scopeGlobal: "Global",
        scopePerWindow: "Window",
        scopePerTabGroup: "Tab Groups",
        scopeGlobalHint: "Same settings for all tabs",
        scopePerWindowHint: "Different settings per window",
        scopePerTabGroupHint: "Different settings per tab group (School, Work, etc.)",
        selectWindow: "Configure window",
        selectTabGroup: "Configure tab group",
        syncSettings: "Sync across devices",
        syncHint: "Sync settings between your Macs via iCloud",
        tabGroupsUnavailable: "Tab Groups require Safari 17+",
        noTabGroups: "No tab groups found"
    },
    es: {
        appName: "Auto Archive",
        tabs: "pestañas",
        tabArchive: "Archivo",
        tabSettings: "Ajustes",
        tabProtected: "Protegidos",
        archived: "archivadas",
        clear: "Borrar",
        clearAll: "Borrar todo",
        showGuide: "Mostrar guía",
        noArchivedTabs: "No hay pestañas archivadas",
        inactiveTabsAppear: "Las pestañas inactivas aparecerán aquí",
        archiveAfterInactive: "Archivar tras inactividad de",
        deleteFromArchive: "Eliminar del archivo tras",
        minTabsForArchiving: "Mínimo de pestañas para archivar",
        maxTabsPerWindow: "Máximo de pestañas por ventana",
        whenMaxReached: "Al alcanzar el máximo",
        archiveOldestOption: "Archivar la pestaña más antigua",
        closeNewOption: "Cerrar la nueva pestaña",
        protectedInfo: "Los sitios que coincidan con estos patrones nunca se archivarán.",
        patternPlaceholder: "ej. *://github.com/*",
        add: "Añadir",
        noProtectedSites: "No hay sitios protegidos",
        unitSec: "seg",
        unitMin: "min",
        unitHour: "h",
        unitDay: "día",
        siteLimits: "Límites por sitio",
        siteLimitsInfo: "Limita el número de pestañas para sitios específicos.",
        siteDomainPlaceholder: "ej. youtube.com",
        maxTabs: "máx",
        noSiteLimits: "Sin límites configurados",
        settingsScope: "Alcance de ajustes",
        scopeGlobal: "Global",
        scopePerWindow: "Ventana",
        scopePerTabGroup: "Grupos",
        scopeGlobalHint: "Mismos ajustes para todas las pestañas",
        scopePerWindowHint: "Ajustes diferentes por ventana",
        scopePerTabGroupHint: "Ajustes diferentes por grupo (Escuela, Trabajo, etc.)",
        selectWindow: "Configurar ventana",
        selectTabGroup: "Configurar grupo",
        syncSettings: "Sincronizar entre dispositivos",
        syncHint: "Sincroniza ajustes entre tus Macs via iCloud",
        tabGroupsUnavailable: "Grupos requieren Safari 17+",
        noTabGroups: "No hay grupos de pestañas"
    },
    fr: {
        appName: "Auto Archive",
        tabs: "onglets",
        tabArchive: "Archive",
        tabSettings: "Paramètres",
        tabProtected: "Protégés",
        archived: "archivés",
        clear: "Effacer",
        clearAll: "Tout effacer",
        showGuide: "Afficher le guide",
        noArchivedTabs: "Aucun onglet archivé",
        inactiveTabsAppear: "Les onglets inactifs apparaîtront ici",
        archiveAfterInactive: "Archiver après inactivité de",
        deleteFromArchive: "Supprimer de l'archive après",
        minTabsForArchiving: "Minimum d'onglets pour archiver",
        maxTabsPerWindow: "Maximum d'onglets par fenêtre",
        whenMaxReached: "Quand le maximum est atteint",
        archiveOldestOption: "Archiver l'onglet le plus ancien",
        closeNewOption: "Fermer le nouvel onglet",
        protectedInfo: "Les sites correspondant à ces modèles ne seront jamais archivés.",
        patternPlaceholder: "ex. *://github.com/*",
        add: "Ajouter",
        noProtectedSites: "Aucun site protégé",
        unitSec: "sec",
        unitMin: "min",
        unitHour: "h",
        unitDay: "j",
        siteLimits: "Limites par site",
        siteLimitsInfo: "Limitez le nombre d'onglets pour des sites spécifiques.",
        siteDomainPlaceholder: "ex. youtube.com",
        maxTabs: "max",
        noSiteLimits: "Aucune limite configurée",
        settingsScope: "Portée des paramètres",
        scopeGlobal: "Global",
        scopePerWindow: "Fenêtre",
        scopePerTabGroup: "Groupes",
        scopeGlobalHint: "Mêmes paramètres pour tous les onglets",
        scopePerWindowHint: "Paramètres différents par fenêtre",
        scopePerTabGroupHint: "Paramètres différents par groupe (École, Travail, etc.)",
        selectWindow: "Configurer fenêtre",
        selectTabGroup: "Configurer groupe",
        syncSettings: "Synchroniser entre appareils",
        syncHint: "Synchroniser via iCloud entre vos Macs",
        tabGroupsUnavailable: "Groupes nécessitent Safari 17+",
        noTabGroups: "Aucun groupe d'onglets"
    },
    de: {
        appName: "Auto Archive",
        tabs: "Tabs",
        tabArchive: "Archiv",
        tabSettings: "Einstellungen",
        tabProtected: "Geschützt",
        archived: "archiviert",
        clear: "Löschen",
        clearAll: "Alle löschen",
        showGuide: "Anleitung zeigen",
        noArchivedTabs: "Keine archivierten Tabs",
        inactiveTabsAppear: "Inaktive Tabs erscheinen hier",
        archiveAfterInactive: "Archivieren nach Inaktivität von",
        deleteFromArchive: "Aus Archiv löschen nach",
        minTabsForArchiving: "Minimum Tabs zum Archivieren",
        maxTabsPerWindow: "Maximum Tabs pro Fenster",
        whenMaxReached: "Bei Erreichen des Maximums",
        archiveOldestOption: "Ältesten inaktiven Tab archivieren",
        closeNewOption: "Neuen Tab schließen",
        protectedInfo: "Seiten, die diesen Mustern entsprechen, werden nie archiviert.",
        patternPlaceholder: "z.B. *://github.com/*",
        add: "Hinzufügen",
        noProtectedSites: "Keine geschützten Seiten",
        unitSec: "sek",
        unitMin: "min",
        unitHour: "std",
        unitDay: "tag",
        siteLimits: "Limits pro Seite",
        siteLimitsInfo: "Begrenzen Sie die Anzahl der Tabs für bestimmte Websites.",
        siteDomainPlaceholder: "z.B. youtube.com",
        maxTabs: "max",
        noSiteLimits: "Keine Limits konfiguriert",
        settingsScope: "Einstellungsbereich",
        scopeGlobal: "Global",
        scopePerWindow: "Fenster",
        scopePerTabGroup: "Gruppen",
        scopeGlobalHint: "Gleiche Einstellungen für alle Tabs",
        scopePerWindowHint: "Unterschiedliche Einstellungen pro Fenster",
        scopePerTabGroupHint: "Unterschiedliche Einstellungen pro Gruppe (Schule, Arbeit, etc.)",
        selectWindow: "Fenster konfigurieren",
        selectTabGroup: "Gruppe konfigurieren",
        syncSettings: "Geräteübergreifend sync",
        syncHint: "Einstellungen via iCloud zwischen Macs sync",
        tabGroupsUnavailable: "Gruppen erfordern Safari 17+",
        noTabGroups: "Keine Tab-Gruppen gefunden"
    },
    pt: {
        appName: "Auto Archive",
        tabs: "abas",
        tabArchive: "Arquivo",
        tabSettings: "Configurações",
        tabProtected: "Protegidos",
        archived: "arquivadas",
        clear: "Limpar",
        clearAll: "Limpar tudo",
        showGuide: "Mostrar guia",
        noArchivedTabs: "Nenhuma aba arquivada",
        inactiveTabsAppear: "Abas inativas aparecerão aqui",
        archiveAfterInactive: "Arquivar após inatividade de",
        deleteFromArchive: "Excluir do arquivo após",
        minTabsForArchiving: "Mínimo de abas para arquivar",
        maxTabsPerWindow: "Máximo de abas por janela",
        whenMaxReached: "Ao atingir o máximo",
        archiveOldestOption: "Arquivar a aba mais antiga",
        closeNewOption: "Fechar a nova aba",
        protectedInfo: "Sites que correspondem a estes padrões nunca serão arquivados.",
        patternPlaceholder: "ex. *://github.com/*",
        add: "Adicionar",
        noProtectedSites: "Nenhum site protegido",
        unitSec: "seg",
        unitMin: "min",
        unitHour: "h",
        unitDay: "dia",
        siteLimits: "Limites por site",
        siteLimitsInfo: "Limite o número de abas para sites específicos.",
        siteDomainPlaceholder: "ex. youtube.com",
        maxTabs: "máx",
        noSiteLimits: "Nenhum limite configurado",
        settingsScope: "Escopo das configurações",
        scopeGlobal: "Global",
        scopePerWindow: "Janela",
        scopePerTabGroup: "Grupos",
        scopeGlobalHint: "Mesmas configurações para todas as abas",
        scopePerWindowHint: "Configurações diferentes por janela",
        scopePerTabGroupHint: "Configurações diferentes por grupo (Escola, Trabalho, etc.)",
        selectWindow: "Configurar janela",
        selectTabGroup: "Configurar grupo",
        syncSettings: "Sincronizar entre dispositivos",
        syncHint: "Sincronizar configurações entre seus Macs via iCloud",
        tabGroupsUnavailable: "Grupos requerem Safari 17+",
        noTabGroups: "Nenhum grupo de abas encontrado"
    }
};

// Get current language
function getLanguage() {
    const lang = navigator.language.split('-')[0];
    return translations[lang] ? lang : 'en';
}

// Get translation
function t(key) {
    const lang = getLanguage();
    return translations[lang][key] || translations.en[key] || key;
}

// Apply translations to the page
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Translate select options
    document.querySelectorAll('option[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

// Current settings state
let currentSettings = null;
let currentWindowId = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Auto Archive Tabs - Popup loaded');
    
    // Apply translations
    applyTranslations();
    
    // Initialize tabs navigation
    initializeTabs();
    
    // Initialize unit buttons
    initializeUnitButtons();
    
    // Check tab groups availability first
    await checkTabGroupsAvailability();
    
    // Initialize scope buttons and sync toggle
    initializeScopeControls();
    
    // Get current window ID
    const windowResult = await browser.runtime.sendMessage({ action: 'getCurrentWindow' });
    currentWindowId = windowResult.windowId;
    
    // Load initial data
    await loadStats();
    await loadSettings();
    await loadArchive();
    await loadPatterns();
    await loadSiteLimits();
    await loadWindows();
    
    // Setup event listeners
    setupEventListeners();
});

// Tab navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const tabId = btn.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize unit buttons
function initializeUnitButtons() {
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const unit = btn.dataset.unit;
            
            // Update hidden input
            document.getElementById(targetId).value = unit;
            
            // Update active state for this group
            const parent = btn.closest('.time-units');
            parent.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Trigger auto-save
            autoSaveSettings();
        });
    });
}

// Track if tab groups are available
let tabGroupsAvailable = false;

// Initialize scope buttons and sync toggle
function initializeScopeControls() {
    // Scope buttons
    document.querySelectorAll('.scope-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const scope = btn.dataset.scope;
            
            // If tab groups scope but not available, show message
            if (scope === 'perTabGroup' && !tabGroupsAvailable) {
                return;
            }
            
            // Update active state
            document.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update hint text
            const hintEl = document.getElementById('scope-hint');
            const hintKey = scope === 'global' ? 'scopeGlobalHint' : 
                           scope === 'perTabGroup' ? 'scopePerTabGroupHint' : 'scopePerWindowHint';
            hintEl.setAttribute('data-i18n', hintKey);
            hintEl.textContent = t(hintKey);
            
            // Show/hide selectors based on scope
            const windowGroup = document.getElementById('window-selector-group');
            const tabGroupSelector = document.getElementById('tab-group-selector-group');
            const tabGroupUnavailable = document.getElementById('tab-groups-unavailable');
            
            windowGroup.classList.add('hidden');
            tabGroupSelector.classList.add('hidden');
            tabGroupUnavailable.classList.add('hidden');
            
            if (scope === 'perWindow') {
                windowGroup.classList.remove('hidden');
            } else if (scope === 'perTabGroup') {
                if (tabGroupsAvailable) {
                    tabGroupSelector.classList.remove('hidden');
                    await loadTabGroups();
                } else {
                    tabGroupUnavailable.classList.remove('hidden');
                }
            }
            
            // Save scope setting
            autoSaveSettings();
        });
    });
    
    // Sync toggle
    const syncToggle = document.getElementById('sync-toggle');
    syncToggle.addEventListener('click', () => {
        const isChecked = syncToggle.getAttribute('aria-checked') === 'true';
        syncToggle.setAttribute('aria-checked', !isChecked);
        autoSaveSettings();
    });
}

// Check if tab groups are available and update UI
async function checkTabGroupsAvailability() {
    try {
        const result = await browser.runtime.sendMessage({ action: 'isTabGroupsAvailable' });
        tabGroupsAvailable = result.available;
        
        const tabGroupBtn = document.getElementById('scope-tab-group-btn');
        if (!tabGroupsAvailable && tabGroupBtn) {
            tabGroupBtn.classList.add('disabled');
            tabGroupBtn.title = t('tabGroupsUnavailable');
        }
    } catch (e) {
        console.log('Could not check tab groups availability:', e);
        tabGroupsAvailable = false;
    }
}

// Load tab groups for the selector
async function loadTabGroups() {
    try {
        const result = await browser.runtime.sendMessage({ action: 'getTabGroups' });
        const select = document.getElementById('tab-group-select');
        
        if (!result.available || result.groups.length === 0) {
            select.innerHTML = `<option value="">${t('noTabGroups')}</option>`;
            return;
        }
        
        select.innerHTML = result.groups.map(g => `
            <option value="${g.id}">
                ${g.title} (${g.tabCount} ${t('tabs')})
            </option>
        `).join('');
        
        // Add change listener
        select.addEventListener('change', () => {
            loadSettingsForTabGroup(parseInt(select.value));
        });
        
        // Load settings for first group
        if (result.groups.length > 0) {
            loadSettingsForTabGroup(result.groups[0].id);
        }
    } catch (error) {
        console.error('Error loading tab groups:', error);
    }
}

// Load settings for a specific tab group
async function loadSettingsForTabGroup(groupId) {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        currentSettings = settings;
        
        // Apply tab group overrides
        let effectiveSettings = settings;
        if (settings.tabGroupOverrides?.[groupId]) {
            effectiveSettings = { ...settings, ...settings.tabGroupOverrides[groupId] };
        }
        
        updateSettingsUI(effectiveSettings);
    } catch (error) {
        console.error('Error loading settings for tab group:', error);
    }
}

// Load windows for the selector
async function loadWindows() {
    try {
        const windows = await browser.runtime.sendMessage({ action: 'getWindows' });
        const select = document.getElementById('window-select');
        
        select.innerHTML = windows.map(w => `
            <option value="${w.id}" ${w.id === currentWindowId ? 'selected' : ''}>
                ${w.name} (${w.tabCount} ${t('tabs')})${w.focused ? ' ★' : ''}
            </option>
        `).join('');
        
        // Add change listener
        select.addEventListener('change', () => {
            // When window changes, reload settings for that window
            loadSettingsForWindow(parseInt(select.value));
        });
    } catch (error) {
        console.error('Error loading windows:', error);
    }
}

// Load settings for a specific window (when using per-window scope)
async function loadSettingsForWindow(windowId) {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        currentSettings = settings;
        
        // If per-window scope, apply window overrides
        let effectiveSettings = settings;
        if (settings.scope === 'perWindow' && settings.windowOverrides?.[windowId]) {
            effectiveSettings = { ...settings, ...settings.windowOverrides[windowId] };
        }
        
        // Update UI with effective settings
        updateSettingsUI(effectiveSettings);
    } catch (error) {
        console.error('Error loading settings for window:', error);
    }
}

// Update settings UI with given values
function updateSettingsUI(settings) {
    document.getElementById('archive-threshold').value = settings.archiveThreshold || 24;
    const thresholdUnit = settings.archiveThresholdUnit || 'hours';
    document.getElementById('archive-threshold-unit').value = thresholdUnit;
    setActiveUnitButton('archive-threshold-unit', thresholdUnit);
    
    document.getElementById('archive-expiration').value = settings.archiveExpiration || 24;
    const expirationUnit = settings.archiveExpirationUnit || 'hours';
    document.getElementById('archive-expiration-unit').value = expirationUnit;
    setActiveUnitButton('archive-expiration-unit', expirationUnit);
    
    document.getElementById('min-tabs').value = settings.minTabsForArchiving || 11;
    document.getElementById('max-tabs').value = settings.maxTabsPerWindow || 20;
    document.getElementById('max-tabs-action').value = settings.maxTabsAction || 'archiveOldest';
}

// Set active unit button
function setActiveUnitButton(targetId, unit) {
    const buttons = document.querySelectorAll(`.unit-btn[data-target="${targetId}"]`);
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.unit === unit);
    });
}

// Load stats
async function loadStats() {
    try {
        const stats = await browser.runtime.sendMessage({ action: 'getStats' });
        document.getElementById('tab-count').textContent = stats.totalTabs;
        document.getElementById('archive-count').textContent = stats.archivedCount;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load settings
async function loadSettings() {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        currentSettings = settings;
        
        // Load scope setting
        const scope = settings.scope || 'global';
        document.querySelectorAll('.scope-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.scope === scope);
        });
        
        // Update scope hint
        const hintEl = document.getElementById('scope-hint');
        const hintKey = scope === 'global' ? 'scopeGlobalHint' : 
                       scope === 'perTabGroup' ? 'scopePerTabGroupHint' : 'scopePerWindowHint';
        hintEl.textContent = t(hintKey);
        
        // Show/hide selectors based on scope
        const windowGroup = document.getElementById('window-selector-group');
        const tabGroupSelector = document.getElementById('tab-group-selector-group');
        const tabGroupUnavailable = document.getElementById('tab-groups-unavailable');
        
        windowGroup.classList.add('hidden');
        tabGroupSelector.classList.add('hidden');
        tabGroupUnavailable.classList.add('hidden');
        
        if (scope === 'perWindow') {
            windowGroup.classList.remove('hidden');
        } else if (scope === 'perTabGroup') {
            if (tabGroupsAvailable) {
                tabGroupSelector.classList.remove('hidden');
                await loadTabGroups();
            } else {
                tabGroupUnavailable.classList.remove('hidden');
            }
        }
        
        // Load sync setting
        const syncToggle = document.getElementById('sync-toggle');
        syncToggle.setAttribute('aria-checked', settings.syncEnabled !== false);
        
        // Load effective settings based on scope
        let effectiveSettings = settings;
        if (scope === 'perWindow' && currentWindowId && settings.windowOverrides?.[currentWindowId]) {
            effectiveSettings = { ...settings, ...settings.windowOverrides[currentWindowId] };
        }
        // For tab groups, the settings will be loaded when a group is selected
        
        // Update UI
        updateSettingsUI(effectiveSettings);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Auto-save settings (debounced)
let saveTimeout = null;

async function autoSaveSettings() {
    // Debounce saves to avoid too many updates
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }
    
    saveTimeout = setTimeout(async () => {
        try {
            // Get current scope and sync settings
            const activeScope = document.querySelector('.scope-btn.active')?.dataset.scope || 'global';
            const syncEnabled = document.getElementById('sync-toggle').getAttribute('aria-checked') === 'true';
            
            // Get the current form values
            const formSettings = {
                archiveThreshold: parseInt(document.getElementById('archive-threshold').value) || 24,
                archiveThresholdUnit: document.getElementById('archive-threshold-unit').value,
                archiveExpiration: parseInt(document.getElementById('archive-expiration').value) || 24,
                archiveExpirationUnit: document.getElementById('archive-expiration-unit').value,
                minTabsForArchiving: parseInt(document.getElementById('min-tabs').value) || 11,
                maxTabsPerWindow: parseInt(document.getElementById('max-tabs').value) || 20,
                maxTabsAction: document.getElementById('max-tabs-action').value
            };
            
            // Build the settings object
            let settings;
            
            if (activeScope === 'perTabGroup') {
                // In per-tab-group mode, save form values as tab group override
                const selectedGroupId = parseInt(document.getElementById('tab-group-select').value);
                
                if (selectedGroupId) {
                    settings = {
                        ...currentSettings,
                        scope: activeScope,
                        syncEnabled: syncEnabled,
                        neverArchivePatterns: await getNeverArchivePatterns(),
                        siteLimits: await getSiteLimits(),
                        tabGroupOverrides: {
                            ...currentSettings?.tabGroupOverrides,
                            [selectedGroupId]: formSettings
                        }
                    };
                } else {
                    // No group selected, just save scope
                    settings = {
                        ...currentSettings,
                        scope: activeScope,
                        syncEnabled: syncEnabled,
                        neverArchivePatterns: await getNeverArchivePatterns(),
                        siteLimits: await getSiteLimits()
                    };
                }
            } else if (activeScope === 'perWindow' && currentWindowId) {
                // In per-window mode, save form values as window override
                const selectedWindowId = parseInt(document.getElementById('window-select').value) || currentWindowId;
                
                settings = {
                    ...currentSettings,
                    scope: activeScope,
                    syncEnabled: syncEnabled,
                    neverArchivePatterns: await getNeverArchivePatterns(),
                    siteLimits: await getSiteLimits(),
                    windowOverrides: {
                        ...currentSettings?.windowOverrides,
                        [selectedWindowId]: formSettings
                    }
                };
            } else {
                // In global mode, save form values directly
                settings = {
                    ...formSettings,
                    scope: activeScope,
                    syncEnabled: syncEnabled,
                    neverArchivePatterns: await getNeverArchivePatterns(),
                    siteLimits: await getSiteLimits(),
                    windowOverrides: currentSettings?.windowOverrides || {},
                    tabGroupOverrides: currentSettings?.tabGroupOverrides || {}
                };
            }
            
            currentSettings = settings;
            await browser.runtime.sendMessage({ action: 'updateSettings', settings });
            console.log('Settings auto-saved');
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }, 300);
}

// Get current never-archive patterns
async function getNeverArchivePatterns() {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        return settings.neverArchivePatterns || [];
    } catch (error) {
        return [];
    }
}

// Get current site limits
async function getSiteLimits() {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        return settings.siteLimits || [];
    } catch (error) {
        return [];
    }
}

// Load archive
async function loadArchive() {
    try {
        const archive = await browser.runtime.sendMessage({ action: 'getArchive' });
        const container = document.getElementById('archive-list');
        const clearBtn = document.getElementById('clear-archive-btn');
        
        if (!archive || archive.length === 0) {
            clearBtn.classList.add('hidden');
            container.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 8v13H3V8"/>
                        <path d="M1 3h22v5H1z"/>
                        <line x1="10" y1="12" x2="14" y2="12"/>
                    </svg>
                    <p>${t('noArchivedTabs')}</p>
                    <small>${t('inactiveTabsAppear')}</small>
                </div>
            `;
            return;
        }
        
        clearBtn.classList.remove('hidden');
        
        container.innerHTML = archive.map(entry => `
            <div class="archive-item" data-id="${entry.id}">
                <div class="archive-item-info">
                    <img class="archive-favicon" src="${getFaviconUrl(entry.url)}" alt="" onerror="this.style.display='none'">
                    <div class="archive-item-text">
                        <span class="archive-title">${escapeHtml(entry.title)}</span>
                        <span class="archive-url">${truncateUrl(entry.url)}</span>
                    </div>
                </div>
                <div class="archive-item-actions">
                    <span class="archive-time">${formatTime(entry.timestamp)}</span>
                    <button class="btn-icon restore-btn" data-url="${escapeHtml(entry.url)}" data-id="${entry.id}" title="Restore">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${entry.id}" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add restore listeners
        container.querySelectorAll('.restore-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const url = btn.dataset.url;
                const id = parseFloat(btn.dataset.id);
                await restoreTab(url, id);
            });
        });
        
        // Add delete listeners
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = parseFloat(btn.dataset.id);
                await deleteFromArchive(id);
            });
        });
        
        document.getElementById('archive-count').textContent = archive.length;
    } catch (error) {
        console.error('Error loading archive:', error);
    }
}

// Restore a tab
async function restoreTab(url, id) {
    try {
        await browser.runtime.sendMessage({ action: 'restoreTab', url, id });
        await loadArchive();
        await loadStats();
    } catch (error) {
        console.error('Error restoring tab:', error);
    }
}

// Delete from archive
async function deleteFromArchive(id) {
    try {
        await browser.runtime.sendMessage({ action: 'deleteFromArchive', id });
        await loadArchive();
        await loadStats();
    } catch (error) {
        console.error('Error deleting from archive:', error);
    }
}

// Clear all archive
async function clearArchive() {
    try {
        await browser.runtime.sendMessage({ action: 'clearArchive' });
        await loadArchive();
        await loadStats();
    } catch (error) {
        console.error('Error clearing archive:', error);
    }
}

// Load patterns
async function loadPatterns() {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        const patterns = settings.neverArchivePatterns || [];
        const container = document.getElementById('patterns-list');
        
        if (patterns.length === 0) {
            container.innerHTML = `
                <div class="empty-state small">
                    <svg class="empty-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <p>${t('noProtectedSites')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = patterns.map(pattern => `
            <div class="pattern-item">
                <span class="pattern-text">${escapeHtml(pattern)}</span>
                <button class="btn-icon remove-pattern" data-pattern="${escapeHtml(pattern)}" title="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');
        
        // Add remove listeners
        container.querySelectorAll('.remove-pattern').forEach(btn => {
            btn.addEventListener('click', async () => {
                const pattern = btn.dataset.pattern;
                await removePattern(pattern);
            });
        });
    } catch (error) {
        console.error('Error loading patterns:', error);
    }
}

// Add pattern
async function addPattern(pattern) {
    if (!pattern.trim()) return;
    
    try {
        await browser.runtime.sendMessage({ action: 'addNeverArchivePattern', pattern: pattern.trim() });
        await loadPatterns();
        document.getElementById('new-pattern').value = '';
    } catch (error) {
        console.error('Error adding pattern:', error);
    }
}

// Remove pattern
async function removePattern(pattern) {
    try {
        await browser.runtime.sendMessage({ action: 'removeNeverArchivePattern', pattern });
        await loadPatterns();
    } catch (error) {
        console.error('Error removing pattern:', error);
    }
}

// Load site limits
async function loadSiteLimits() {
    try {
        const settings = await browser.runtime.sendMessage({ action: 'getSettings' });
        const siteLimits = settings.siteLimits || [];
        const container = document.getElementById('site-limits-list');
        
        if (siteLimits.length === 0) {
            container.innerHTML = `
                <div class="site-limits-empty">
                    <span>${t('noSiteLimits')}</span>
                </div>
            `;
            return;
        }
        
        container.innerHTML = siteLimits.map(limit => `
            <div class="site-limit-item" data-domain="${escapeHtml(limit.domain)}">
                <div class="site-limit-info">
                    <img class="site-limit-favicon" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(limit.domain)}&sz=32" alt="" onerror="this.style.display='none'">
                    <span class="site-limit-domain">${escapeHtml(limit.domain)}</span>
                </div>
                <div class="site-limit-actions">
                    <span class="site-limit-badge">${t('maxTabs')} ${limit.maxTabs}</span>
                    <button class="btn-icon remove-site-limit" data-domain="${escapeHtml(limit.domain)}" title="Remove">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add remove listeners
        container.querySelectorAll('.remove-site-limit').forEach(btn => {
            btn.addEventListener('click', async () => {
                const domain = btn.dataset.domain;
                await removeSiteLimit(domain);
            });
        });
    } catch (error) {
        console.error('Error loading site limits:', error);
    }
}

// Add site limit
async function addSiteLimit(domain, maxTabs) {
    if (!domain.trim()) return;
    
    // Clean domain (remove protocol if present)
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '');
    cleanDomain = cleanDomain.replace(/\/.*$/, '');
    
    try {
        await browser.runtime.sendMessage({ 
            action: 'addSiteLimit', 
            domain: cleanDomain, 
            maxTabs: parseInt(maxTabs) || 3 
        });
        await loadSiteLimits();
        document.getElementById('new-site-domain').value = '';
        document.getElementById('new-site-max').value = '3';
    } catch (error) {
        console.error('Error adding site limit:', error);
    }
}

// Remove site limit
async function removeSiteLimit(domain) {
    try {
        await browser.runtime.sendMessage({ action: 'removeSiteLimit', domain });
        await loadSiteLimits();
    } catch (error) {
        console.error('Error removing site limit:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Auto-save on any settings change
    const settingsInputs = [
        'archive-threshold',
        'archive-expiration',
        'min-tabs',
        'max-tabs',
        'max-tabs-action'
    ];
    
    settingsInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', autoSaveSettings);
            element.addEventListener('input', autoSaveSettings);
        }
    });
    
    // Add pattern
    document.getElementById('add-pattern-btn').addEventListener('click', () => {
        const input = document.getElementById('new-pattern');
        addPattern(input.value);
    });
    
    // Enter key for pattern input
    document.getElementById('new-pattern').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPattern(e.target.value);
        }
    });
    
    // Add site limit
    document.getElementById('add-site-limit-btn').addEventListener('click', () => {
        const domainInput = document.getElementById('new-site-domain');
        const maxInput = document.getElementById('new-site-max');
        addSiteLimit(domainInput.value, maxInput.value);
    });
    
    // Enter key for site limit domain input
    document.getElementById('new-site-domain').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const maxInput = document.getElementById('new-site-max');
            addSiteLimit(e.target.value, maxInput.value);
        }
    });
    
    // Rickroll easter egg
    document.getElementById('logo-rickroll').addEventListener('click', () => {
        browser.tabs.create({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
    });
    
    // Clear archive button
    document.getElementById('clear-archive-btn').addEventListener('click', clearArchive);
    
    // Help button - open the app
    document.getElementById('help-btn').addEventListener('click', async () => {
        // Open the containing app
        await browser.runtime.sendMessage({ action: 'openApp' });
    });
    
    // Donate button
    document.getElementById('donate-btn').addEventListener('click', () => {
        browser.tabs.create({ url: 'https://buymeacoffee.com/amodrono' });
    });
}

// Utility functions
function getFaviconUrl(url) {
    try {
        const urlObj = new URL(url);
        return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch {
        return '';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function truncateUrl(url) {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        const display = urlObj.hostname + (path.length > 20 ? path.substring(0, 20) + '...' : path);
        return display;
    } catch {
        return url.substring(0, 40) + '...';
    }
}

function formatTime(timestamp) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
}
