# Quick Reference - Auto Archive Tabs

## 🎯 At a Glance

**What it does:** Automatically archives inactive tabs to keep Safari fast and organized.

**When it works:** When you have ≥11 tabs open

**What gets archived:** Tabs inactive for ≥24 hours

**What's protected:** Pinned tabs, recently active tabs, never-archive patterns

---

## 🚀 Quick Actions

| Action | How To |
|--------|--------|
| Open extension | Click 🌟 icon in toolbar |
| Restore tab | Click "Restore" button |
| Protect a tab | Right-click → "Never Archive This Tab" |
| Adjust settings | Click extension → Settings tab |
| Add pattern | Click extension → Never Archive tab → Add |

---

## ⚙️ Default Settings

```
Archive after:     24 hours of inactivity
Archive expires:   24 hours after archiving
Min tabs:          11 (won't archive if window has <11)
Max tabs:          20 (hard limit per window)
Cleanup runs:      Every 10 minutes
```

---

## 🚫 Never Archive Examples

Add these patterns to protect important sites:

```
*://mail.google.com/*         Gmail
*://outlook.live.com/*        Outlook  
*://calendar.google.com/*     Calendar
*://github.com/*              GitHub
*://notion.so/*               Notion
*://docs.google.com/*         Google Docs
*://localhost:*/*             Local dev
```

---

## 📊 How Archiving Works

```
1. You open tabs
   ↓
2. Tab is idle for 24h
   ↓
3. Window has ≥11 tabs?
   ↓ YES              ↓ NO
4. Archive tab    → Do nothing
   ↓
5. Store for 24h
   ↓
6. Auto-delete
```

---

## 🛡️ What's Protected

✅ **Always Safe:**
- Pinned tabs
- Currently active tab
- Tabs matching never-archive patterns
- Tabs created in last few seconds

❌ **May Be Archived:**
- Unpinned tabs
- Idle for >24h
- Not protected by patterns
- Window has ≥11 tabs

---

## 🔧 Troubleshooting

### Tabs not archiving?

1. Check window tab count (need ≥11)
2. Check tab isn't pinned
3. Check tab isn't protected
4. Wait for next cleanup cycle (10 min)

### Can't find archived tab?

1. Check if it expired (24h default)
2. Increase expiration in settings

### Extension not working?

1. Safari → Preferences → Extensions
2. Enable "Auto Archive Tabs"
3. Grant all permissions
4. Restart Safari

---

## 📱 Mobile Support

❌ iOS Safari: Not supported
✅ macOS Safari: Fully supported

---

## 🔐 Privacy

- ✅ All data stored locally
- ✅ No analytics or tracking
- ✅ No data sent to servers
- ✅ Open source code

---

## 💡 Pro Tips

1. **Pin tabs you always need**
   - Email, calendar, project tools

2. **Use patterns for work domains**
   - `*://company.com/*`

3. **Adjust threshold for your workflow**
   - Short attention span? → 12h
   - Deep researcher? → 48h

4. **Set max tabs slightly above average**
   - Usually use 15? → Set to 20

5. **Review archive before expiration**
   - Check daily for important tabs

---

## 🎨 Icon Meaning

🌟 = Auto Archive Tabs (star = automatic)

---

## ⌨️ Shortcuts

| Shortcut | Action |
|----------|--------|
| Click toolbar icon | Open popup |
| ⌘W | Close tab (may archive later) |
| ⌘⇧T | Reopen closed tab (before archived) |

---

## 📞 Get Help

1. Check console: Develop → Show JavaScript Console
2. Look for 🌟 prefixed messages
3. Review SETUP.md for detailed help
4. Open issue on GitHub

---

## 🆕 What's New

**v1.0.0** - Initial Release
- Auto-archiving
- Never-archive patterns
- Max tab limits
- Beautiful popup UI

---

**Print this page or bookmark for quick reference! 📌**
