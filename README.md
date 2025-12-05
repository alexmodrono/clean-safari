<p align="center">
  <img src="Madrid Extension/Resources/images/icon-256.png" alt="Auto Archive Logo" width="128" height="128">
</p>

<h1 align="center">Auto Archive for Safari</h1>

<p align="center">
  <strong>Keep your browser clean. Automatically.</strong>
</p>

<p align="center">
  <a href="https://github.com/alexmodrono/clean-safari/releases/latest">
    <img src="https://img.shields.io/github/v/release/alexmodrono/clean-safari?style=flat-square&color=E94560" alt="Latest Release">
  </a>
  <a href="https://github.com/alexmodrono/clean-safari/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/alexmodrono/clean-safari?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/alexmodrono/clean-safari/stargazers">
    <img src="https://img.shields.io/github/stars/alexmodrono/clean-safari?style=flat-square" alt="Stars">
  </a>
  <img src="https://img.shields.io/badge/platform-macOS-blue?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Safari-17%2B-orange?style=flat-square" alt="Safari Version">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#support">Support</a>
</p>

---

## 🎯 The Problem

We've all been there — you open Safari and find **50+ tabs** you forgot about. They slow down your browser, drain your battery, and make finding anything impossible.

**Auto Archive** solves this by automatically archiving tabs you haven't used in a while, keeping them safely stored so you can restore them anytime.

## ✨ Features

<table>
<tr>
<td width="50%">

### 📦 Smart Archiving
Automatically archives inactive tabs based on your custom time threshold. Set it to minutes, hours, or days — you're in control.

### 🛡️ Protected Sites
Never archive important sites. Add URL patterns to protect your essential tabs from ever being archived.

### ⚡ Instant Restore
One click to bring back any archived tab. Your browsing history is never lost, just organized.

</td>
<td width="50%">

### 📊 Tab Limits
Set maximum tabs per window or per Tab Group. When you exceed the limit, oldest inactive tabs are archived automatically.

### 🏷️ Tab Groups Support
Configure different settings for each Safari Tab Group. Keep 5 tabs for Personal, 50 for Work — your rules.

### 🔄 Cross-Device Sync
Settings sync across all your Macs via iCloud. Configure once, apply everywhere.

</td>
</tr>
</table>

## 📥 Installation

### From Releases (Recommended)

1. Download the latest `.dmg` from [Releases](https://github.com/alexmodrono/clean-safari/releases/latest)
2. Open the `.dmg` and drag **Auto Archive** to your Applications folder
3. Open the app — it will guide you through enabling the extension
4. In Safari, go to **Settings → Extensions** and enable **Auto Archive**

### Build from Source

```bash
# Clone the repository
git clone https://github.com/alexmodrono/clean-safari.git
cd clean-safari

# Open in Xcode
open Madrid.xcodeproj

# Build and run (⌘R)
```

> **Requirements:** Xcode 15+, macOS 14+, Safari 17+

## 🚀 Usage

### Quick Start

1. **Click the extension icon** in Safari's toolbar
2. **Configure your settings** in the Settings tab:
   - Archive threshold (how long before a tab is archived)
   - Max tabs per window
   - Protected site patterns
3. **That's it!** Auto Archive works silently in the background

### Understanding the Tabs

| Tab | Purpose |
|-----|---------|
| **Archive** | View and restore archived tabs |
| **Settings** | Configure archiving rules and limits |
| **Protected** | Manage sites that should never be archived |

## ⚙️ Configuration

### Settings Scope

Choose how your settings apply:

| Scope | Description |
|-------|-------------|
| **Global** | Same settings for all tabs and windows |
| **Tab Groups** | Different settings per Tab Group (Safari 17+) |
| **Per Window** | Different settings for each Safari window |

### Time Thresholds

Set when tabs should be archived:

- **Archive after inactive for:** Time before a tab is archived (e.g., 24 hours)
- **Delete from archive after:** How long archived tabs are kept (e.g., 7 days)

### Tab Limits

Control tab proliferation:

- **Minimum tabs to start archiving:** Won't archive if you have fewer tabs
- **Max tabs per window:** Automatically archive when exceeded
- **Per-site limits:** Limit tabs for specific domains (e.g., max 3 YouTube tabs)

### Protected Patterns

Use URL patterns to protect sites:

```
*://github.com/*        # All GitHub pages
*://mail.google.com/*   # Gmail
*://*.slack.com/*       # All Slack workspaces
```

## 🔒 Privacy

Auto Archive:
- ✅ Runs entirely locally on your Mac
- ✅ Never sends browsing data to external servers
- ✅ Only syncs settings (not tabs) via iCloud
- ✅ Open source — audit the code yourself

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/clean-safari.git

# Open in Xcode
cd clean-safari
open Madrid.xcodeproj

# Make changes and test
# The extension files are in: Madrid Extension/Resources/
```

## 💖 Support

If you find Auto Archive useful, consider supporting its development:

<a href="https://buymeacoffee.com/amodrono">
  <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee">
</a>

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for a cleaner browsing experience
- UI design influenced by [shadcn/ui](https://ui.shadcn.com/)
- Built with ❤️ for the Safari community

---

<p align="center">
  <sub>Made with ☕ by <a href="https://github.com/alexmodrono">Alejandro Modroño</a></sub>
</p>

