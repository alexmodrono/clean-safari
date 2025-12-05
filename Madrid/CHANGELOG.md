# Changelog

All notable changes to Auto Archive Tabs will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-27

### Added
- 🎉 Initial release of Auto Archive Tabs
- ⏰ Auto-archive tabs after 24 hours of inactivity
- 🪟 Smart archiving only when window has >10 tabs
- ❌ Never-archive protection system with pattern matching
- 🧹 Auto-delete expired archive entries after 24 hours
- 📉 Hard limit on max tabs per window (default: 20)
- 🧭 Beautiful popup dashboard with three tabs:
  - Archive view with restore functionality
  - Never-archive pattern management
  - Settings configuration
- 📊 Real-time statistics (active tabs, archived count)
- 🖱️ Context menu integration: "Never Archive This Tab"
- 💾 Local storage for all data (privacy-first)
- 🔄 Periodic cleanup every 10 minutes
- 🎨 Modern, gradient-based UI design
- 📱 Responsive popup interface
- ⚡ Efficient tab activity tracking
- 🛡️ Protection for:
  - Pinned tabs
  - Newly created tabs
  - Tabs matching never-archive patterns
- ⏱️ Timestamp display with relative time formatting
- 🔍 Favicon support for archived tabs
- ✅ Toast notifications for user actions
- 🎯 Configurable settings:
  - Archive threshold (hours)
  - Archive expiration (hours)
  - Min tabs for archiving
  - Max tabs per window
  - Custom URL patterns

### Technical Details
- Built with Safari WebExtensions API (Manifest V3)
- Background script with event-driven architecture
- Browser storage API for persistence
- Context menus API for quick actions
- Modern JavaScript (ES6+)
- Clean, maintainable code structure
- Comprehensive error handling
- Console logging for debugging

### Documentation
- Comprehensive README with features and FAQ
- Detailed SETUP guide with configuration examples
- ICONS guide for asset creation
- Inline code documentation

---

## [Unreleased]

### Planned Features
- 📱 iOS Safari support (if/when WebExtensions API is available)
- 📂 Export/import archive as JSON
- 🔍 Search and filter in archive
- 📈 Advanced statistics and analytics
- 🎨 Customizable themes
- 🔔 Notifications for archived tabs
- 📊 Per-domain tab limits
- 🖥️ Multi-window management
- 🔄 Sync settings via iCloud
- 🎯 Smart suggestions for never-archive patterns
- 📋 Bulk restore operations
- 🏷️ Tags and categories for archived tabs
- 📱 Sidebar UI (Arc-style)
- 🔗 Integration with Safari Reading List
- 📅 Schedule-based archiving (e.g., archive work tabs after hours)
- 🧠 ML-based prediction of tabs you'll revisit
- 📊 Visual analytics dashboard
- 🎮 Keyboard shortcuts
- 🌐 Localization (multiple languages)

### Known Issues
None reported yet.

---

## Version History

| Version | Date       | Highlights                              |
|---------|------------|----------------------------------------|
| 1.0.0   | 2025-11-27 | Initial release with core features     |

---

## Upgrade Notes

### From Development to 1.0.0
No migration needed - fresh install.

### Future Migrations
Will be documented here when schema changes occur.

---

## Contributing

See [README.md](README.md) for contribution guidelines.

---

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for clean browsing**
