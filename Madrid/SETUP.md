# Setup Guide - Auto Archive Tabs

This guide will help you set up and configure the Auto Archive Tabs Safari extension.

---

## 📋 Prerequisites

- macOS 11.0 or later
- Safari 14.0 or later
- Xcode 12.0 or later

---

## 🚀 Quick Start

### 1. Project Structure

Ensure your project has this structure:

```
Madrid/
├── Madrid/
│   └── ViewController.swift
├── Madrid Extension/
│   ├── SafariWebExtensionHandler.swift
│   └── Resources/
│       ├── background.js
│       ├── content.js
│       ├── popup.html
│       ├── popup.css
│       ├── popup.js
│       ├── manifest.json
│       ├── images/
│       │   ├── icon-16.png
│       │   ├── icon-32.png
│       │   ├── icon-48.png
│       │   ├── icon-64.png
│       │   ├── icon-96.png
│       │   ├── icon-128.png
│       │   ├── icon-256.png
│       │   └── icon-512.png
│       └── _locales/ (optional)
└── Madrid.xcodeproj
```

### 2. Build the Extension

1. Open `Madrid.xcodeproj` in Xcode
2. Select the "Madrid" scheme
3. Build the project (⌘B)
4. Run the project (⌘R)

### 3. Enable the Extension

1. The app will launch and show instructions
2. Open Safari
3. Go to Safari → Preferences (or Settings on macOS 13+)
4. Click "Extensions"
5. Find "Auto Archive Tabs" and enable it
6. Grant required permissions:
   - ✅ Access to webpage content
   - ✅ Access to browsing history
   - ✅ Access to tabs

### 4. Verify Installation

1. Look for the 🌟 icon in Safari's toolbar
2. Click it to open the popup
3. You should see:
   - Active tabs count
   - Archive (empty initially)
   - Settings tab

---

## ⚙️ Configuration

### Default Settings

The extension comes with sensible defaults:

| Setting | Default | Description |
|---------|---------|-------------|
| Archive Threshold | 24 hours | How long before inactive tabs are archived |
| Archive Expiration | 24 hours | How long archived tabs are kept |
| Min Tabs for Archiving | 11 tabs | Only archive when window has ≥ this many tabs |
| Max Tabs per Window | 20 tabs | Hard limit on tabs per window |

### Customizing Settings

1. Click the extension icon in Safari's toolbar
2. Navigate to the "⚙️ Settings" tab
3. Adjust values as needed
4. Click "Save Settings"

### Recommended Configurations

#### Light User (≤10 tabs typically)
```
Archive Threshold: 48 hours
Archive Expiration: 48 hours
Min Tabs: 15
Max Tabs: 25
```

#### Medium User (10-20 tabs)
```
Archive Threshold: 24 hours (default)
Archive Expiration: 24 hours (default)
Min Tabs: 11 (default)
Max Tabs: 20 (default)
```

#### Heavy User (20+ tabs)
```
Archive Threshold: 12 hours
Archive Expiration: 12 hours
Min Tabs: 20
Max Tabs: 30
```

#### Tab Hoarder (50+ tabs)
```
Archive Threshold: 6 hours
Archive Expiration: 6 hours
Min Tabs: 30
Max Tabs: 40
```

---

## 🚫 Never Archive Patterns

### What Are They?

URL patterns that tell the extension which sites should never be archived.

### Common Patterns

Add these in the "🚫 Never Archive" tab:

```
*://mail.google.com/*          # Gmail
*://outlook.live.com/*         # Outlook
*://calendar.google.com/*      # Google Calendar
*://github.com/*               # GitHub
*://notion.so/*                # Notion
*://docs.google.com/*          # Google Docs
*://localhost:*/*              # Local development
*://192.168.*.*/*              # Local network
```

### Pattern Syntax

- `*` matches anything
- `://` separates protocol
- Pattern format: `*://domain.com/*`

Examples:

| Pattern | Matches |
|---------|---------|
| `*://example.com/*` | All pages on example.com |
| `*://mail.google.com/*` | All Gmail pages |
| `*://github.com/user/*` | Specific GitHub user pages |
| `*://localhost:*/*` | All localhost ports |

### Using the Context Menu

Right-click any page → "Never Archive This Tab"

This automatically adds a pattern like: `*://domain.com/*`

---

## 📦 Using the Archive

### Viewing Archived Tabs

1. Click the extension icon
2. The "📄 Archive" tab shows all archived tabs
3. Each entry shows:
   - Favicon
   - Page title
   - URL
   - Time since archived

### Restoring Tabs

Click the "Restore" button on any archived tab to:
1. Open it in a new tab
2. Remove it from the archive

### Archive Lifecycle

```
Tab inactive 24h → Archived → Stored 24h → Auto-deleted
```

Adjust these timings in Settings.

---

## 🧪 Testing the Extension

### Test Auto-Archiving

1. Open 15 tabs
2. Set "Archive Threshold" to 1 minute (for testing)
3. Wait ~11 minutes (includes periodic cleanup delay)
4. Check popup - old tabs should be archived

### Test Max Tab Limit

1. Set "Max Tabs per Window" to 5
2. Open 6 tabs rapidly
3. The extension will archive/close the least active tab

### Test Never Archive

1. Open a tab (e.g., Gmail)
2. Right-click → "Never Archive This Tab"
3. Open many other tabs
4. Wait for archiving
5. Gmail should remain open

---

## 🔍 Troubleshooting

### Extension Not Appearing

**Problem:** Extension icon not in toolbar

**Solutions:**
1. Check Safari → Preferences → Extensions
2. Ensure "Auto Archive Tabs" is enabled
3. Grant all permissions
4. Restart Safari

### Tabs Not Being Archived

**Problem:** Tabs stay open past threshold

**Possible causes:**
1. Window has < Min Tabs (check settings)
2. Tab is pinned (pinned tabs never archive)
3. Tab matches never-archive pattern
4. Tab was recently active

**Debug:**
1. Open Safari's Web Inspector
2. Develop → Show JavaScript Console
3. Look for extension logs (🌟 prefix)

### Archive Not Showing Tabs

**Problem:** Archive tab is empty despite archiving

**Solutions:**
1. Check browser console for errors
2. Verify storage permissions
3. Reinstall extension

### Settings Not Saving

**Problem:** Settings reset after closing popup

**Solutions:**
1. Check storage permissions in Safari preferences
2. Rebuild and reinstall extension
3. Check for JavaScript errors in popup

---

## 🔐 Permissions Explained

The extension requires these permissions:

### `tabs`
- **Why:** Track tab activity, close tabs, create tabs
- **Used for:** Archive/restore functionality

### `storage`
- **Why:** Save settings, archive, activity data
- **Used for:** Persistence across sessions

### `contextMenus`
- **Why:** Add "Never Archive This Tab" option
- **Used for:** Quick protection of important tabs

### `<all_urls>`
- **Why:** Track all tabs regardless of domain
- **Used for:** Universal tab management

**Note:** No data is sent to external servers. Everything stays local.

---

## 🎯 Best Practices

### 1. Set Realistic Limits

Don't set max tabs too low - you might lose work.

Start with defaults, adjust based on usage.

### 2. Use Never-Archive Liberally

Protect important sites like:
- Email
- Project management tools
- Active documents
- Local development

### 3. Review Archive Periodically

Check archived tabs before they expire.

You might find something important.

### 4. Adjust Threshold Based on Usage

If you frequently return to tabs:
- Increase threshold (48h+)

If you rarely revisit:
- Decrease threshold (12h)

### 5. Pin Important Tabs

Pinned tabs are never archived.

Use for:
- Email
- Calendar
- Frequently used tools

---

## 📊 Monitoring

### View Statistics

Click the extension icon to see:
- Total active tabs
- Number of archived tabs

### Console Logging

For debugging, check Safari's console:

```javascript
console.log messages from extension:
🌟 Auto Archive Tabs - Initializing...
✅ Auto Archive Tabs initialized
📊 Tracking N existing tabs
📦 Archived: [tab title]
🧹 Cleaned up N expired archive entries
```

---

## 🔄 Updates

### Automatic Updates

Safari extensions update automatically when:
1. Published to Safari Extensions Gallery
2. Extension is approved by Apple

### Manual Updates

For development:
1. Pull latest changes
2. Build in Xcode
3. Restart Safari

---

## 🆘 Getting Help

### Check Logs

1. Open Safari
2. Develop → Show JavaScript Console
3. Look for errors or warnings

### Report Issues

Include:
1. Safari version
2. macOS version
3. Extension settings
4. Console logs
5. Steps to reproduce

### Feature Requests

Open an issue describing:
1. Use case
2. Expected behavior
3. Example scenarios

---

## 🎓 Advanced Usage

### Custom Cleanup Intervals

Edit `background.js`:

```javascript
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

// Change to 5 minutes:
const CLEANUP_INTERVAL = 5 * 60 * 1000;
```

### Export/Import Settings

Coming soon - manual export/import via:

```javascript
// Export
browser.storage.local.get(null).then(console.log)

// Import
browser.storage.local.set(importedData)
```

---

## 📚 Resources

- [Safari Extensions Documentation](https://developer.apple.com/documentation/safariservices/safari_web_extensions)
- [WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Safari App Extensions](https://developer.apple.com/documentation/safariservices/safari_app_extensions)

---

**Happy browsing! 🌟**
