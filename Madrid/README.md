# 🌟 Auto Archive Tabs

### *Smart Tab Management for Safari*

Auto Archive Tabs is an intelligent, cross-browser tab manager designed to keep your browser clean, fast, and organized — **without losing anything important**.

It automatically archives inactive tabs, limits how many tabs can exist in each window, cleans up old archive entries, and protects sites you never want closed.

---

## 🚀 Features at a Glance

### 🕒 **Auto-Archive After 24 Hours**

Tabs automatically archive themselves when they have been **inactive for 24 hours**.
When a tab is archived:

* It is **closed** in the browser
* Its title, URL, and timestamp are **saved** in the extension
* You can **restore it anytime** from the popup

This keeps your active workspace clean while retaining everything you might revisit.

---

### 🪟 **Only Archive When a Window Is Busy (>10 Tabs)**

To avoid aggressive cleanup during focused work, auto-archiving only happens when a window has **more than 10 tabs**.

**≤10 tabs?**
Nothing is archived.

**≥11 tabs?**
Inactive tabs (24h+) become eligible.

---

### ❌ **"Never Archive" Protection System**

Some sites should *never* be archived — email, notes, dashboards, etc.

You can protect them via:

* **Right-click → "Never Archive This Tab"**
* Adding URL patterns in the popup (e.g. `*://mail.google.com/*`)

Protected tabs are never removed or auto-closed.

---

### 🧹 **Auto-Delete Old Archive Entries (24 Hours)**

Archived tabs automatically **expire after 24 hours** to prevent clutter.

The archive always stays clean and minimal.

---

### 📉 **Hard Limit on Max Tabs per Window**

Prevent accidental tab overload.

Default: **20 tabs per window**

When the limit is exceeded:

1. The extension tries to archive old inactive tabs
2. If still above the limit, it closes the **least recently active** tab
3. It avoids:
   * Newly created tabs
   * Pinned tabs
   * Never-archive patterns

Your windows are always clean, fast, and manageable.

---

### 🧭 **Popup Dashboard**

The popup gives you:

* 📄 List of recently archived tabs (with timestamps)
* 🔄 One-click restore
* 🚫 "Never Archive" pattern management
* ⚙️ All settings in one place

---

## 🛠️ Settings Overview

| Setting                    | Default | Description                                               |
| -------------------------- | ------- | --------------------------------------------------------- |
| **Archive Threshold**      | 24h     | Time of inactivity before a tab can auto-archive          |
| **Archive Expiration**     | 24h     | How long archived tabs stay before deletion               |
| **Min Tabs for Archiving** | 11      | Archiving activates only when window has ≥ this many tabs |
| **Max Tabs per Window**    | 20      | Hard cap; extension limits tabs by archiving or closing   |
| **Never Archive Patterns** | User list | URLs or patterns that are protected                     |

All settings can be adjusted in the popup.

---

## 🧠 How It Works (Architecture)

**Activity Tracking**
Every time a tab becomes active or finishes loading, its `lastActive` timestamp is updated.

**Periodic Cleanup**
Every 10 minutes:
* Expired archive entries are removed
* Inactive tabs are archived (if window has ≥ min tabs)

**Tab Limit Enforcement**
When a new tab is created:
* If window exceeds max tabs → extension archives old tabs
* If still above limit → closes least recently active tab

**Storage**
All data stored locally via `browser.storage.local`:
* `settings`
* `archive[]`
* `tabActivity{}`

---

## 📦 Installation

### For Development:

1. Open Safari
2. Go to Safari → Preferences → Advanced
3. Enable "Show Develop menu in menu bar"
4. Go to Develop → Allow Unsigned Extensions
5. Open Safari → Preferences → Extensions
6. Enable "Auto Archive Tabs"

### For Distribution:

This extension can be packaged and submitted to the Safari Extensions Gallery.

---

## 🔐 Privacy

Auto Archive Tabs:

* Does **not** send data anywhere
* Does **not** collect analytics
* Does **not** track your browsing history outside open tabs
* Stores everything **locally on your device**

You own your data.

---

## ❓ FAQ

### **Will this close pinned tabs?**

❌ Never.

### **Can I restore archived tabs?**

✅ Yes. One click from the popup.

### **Will it work on iOS Safari?**

❌ No. iOS Safari does not support this class of WebExtensions.

### **What if I want different limits per window or per domain?**

Coming soon — or open an issue and it can be added.

### **Does the archive persist after closing the browser?**

Yes, until the expiration period (default 24h).

### **What happens when the window hits the hard limit?**

The extension:
1. Archives old inactive tabs
2. If necessary, closes the least recently active tab

Always respecting the exclusion rules.

---

## 🛠️ Development

### Project Structure

```
Madrid/
├── ViewController.swift          # Main app controller
├── SafariWebExtensionHandler.swift
├── Extension/
│   ├── background.js            # Core logic
│   ├── content.js               # Content script
│   ├── popup.html               # Popup UI
│   ├── popup.css                # Popup styles
│   ├── popup.js                 # Popup logic
│   └── manifest.json            # Extension manifest
└── Resources/
    └── images/                  # Extension icons
```

### Building

1. Open the Xcode project
2. Select the Madrid target
3. Build and run (⌘R)
4. The Safari extension will be automatically loaded

### Testing

1. Create multiple tabs (15+)
2. Wait 24 hours or adjust settings for faster testing
3. Check the popup to see archived tabs
4. Test restore functionality
5. Test "Never Archive" patterns

---

## 📄 License

MIT License

Copyright (c) 2025 Alejandro Modroño Vara

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🤝 Contributing

Pull requests welcome!

Ideas for improvement include:
* Per-domain tab limits
* Sidebar UI (Arc-style)
* Multi-window analytics
* Syncing settings between browsers
* Export/import archive as JSON
* Advanced filtering and search in archive
* Integration with Safari Reading List

---

## 🙏 Acknowledgments

Built with:
- Safari WebExtensions API
- Modern JavaScript (ES6+)
- Browser Storage API
- Safari Context Menus API

---

## 📧 Contact

Created by Alejandro Modroño Vara

For issues, feature requests, or questions, please open an issue on GitHub.

---

**Made with ❤️ for clean browsing**
