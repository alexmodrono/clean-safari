# Extension Icons

This extension requires icons in the following sizes:

- 16x16
- 32x32
- 48x48
- 64x64
- 96x96
- 128x128
- 256x256
- 512x512

## Icon Design Guidelines

### Concept
A clean, modern icon representing:
- Tab management (multiple overlapping rectangles)
- Archiving (folder or box symbol)
- Organization (clean lines)

### Color Scheme
- Primary: #667eea (purple-blue gradient)
- Secondary: #764ba2 (deep purple)
- Accent: White or light gray for contrast

### Suggested Design

```
┌─────────────────┐
│  ╔═══╗          │
│  ║ ⭐ ║  📦      │  Multiple tabs with a star
│  ║───║          │  and archive box
│  ╚═══╝          │
└─────────────────┘
```

Or a simpler design:

```
┌─────────────────┐
│                 │
│     ⭐          │  Just a star emoji
│    ╱ ╲         │  representing "auto"
│   ╱___╲        │  with clean organization
│                 │
└─────────────────┘
```

## Creating Icons

### Option 1: Use SF Symbols (Recommended for macOS)

```swift
// In Xcode, you can generate app icons using SF Symbols
// Symbol: "star.square.stack.3d.up"
// or "archivebox.fill"
```

### Option 2: Design in Figma/Sketch

1. Create artboard with icon sizes
2. Use the color scheme above
3. Export as PNG @1x, @2x, @3x
4. Place in `images/` directory

### Option 3: Use Icon Generator

Use online tools like:
- https://www.appicon.co
- https://makeappicon.com

Upload a 1024x1024 base icon and it will generate all sizes.

## File Structure

Place all icons in the `images/` directory:

```
images/
├── icon-16.png
├── icon-32.png
├── icon-48.png
├── icon-64.png
├── icon-96.png
├── icon-128.png
├── icon-256.png
└── icon-512.png
```

## Temporary Development Icons

For development, you can use SF Symbols or emoji-based icons:

- Use the 🌟 (star) emoji
- Or ⭐ (white star) emoji
- Or 📦 (package) emoji

Safari will display these in the toolbar and extension gallery.
