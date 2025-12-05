#!/bin/bash

# ===========================================
# Build & Package Script for Auto Archive
# ===========================================
# This script builds the app and creates a DMG
#
# Usage: ./build-dmg.sh [version]
# Example: ./build-dmg.sh 1.0.0

set -e

# Configuration
APP_NAME="Auto Archive"
SCHEME="Madrid"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$PROJECT_DIR/build"
ARCHIVE_PATH="$BUILD_DIR/$APP_NAME.xcarchive"
EXPORT_PATH="$BUILD_DIR/Export"
DMG_DIR="$BUILD_DIR/dmg"
VERSION="${1:-$(date +%Y.%m.%d)}"

echo "🏗️  Auto Archive Build Script"
echo "=============================="
echo "Version: $VERSION"
echo "Project: $PROJECT_DIR"
echo ""

# Clean build directory
echo "🧹 Cleaning build directory..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Archive the app
echo "📦 Archiving app..."
xcodebuild archive \
    -project "$PROJECT_DIR/Madrid.xcodeproj" \
    -scheme "$SCHEME" \
    -archivePath "$ARCHIVE_PATH" \
    -configuration Release \
    CODE_SIGN_IDENTITY="-" \
    CODE_SIGNING_REQUIRED=NO \
    CODE_SIGNING_ALLOWED=NO \
    | xcpretty || xcodebuild archive \
    -project "$PROJECT_DIR/Madrid.xcodeproj" \
    -scheme "$SCHEME" \
    -archivePath "$ARCHIVE_PATH" \
    -configuration Release \
    CODE_SIGN_IDENTITY="-" \
    CODE_SIGNING_REQUIRED=NO \
    CODE_SIGNING_ALLOWED=NO

# Export the app
echo "📤 Exporting app..."
mkdir -p "$EXPORT_PATH"

# Create export options plist
cat > "$BUILD_DIR/ExportOptions.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>mac-application</string>
    <key>signingStyle</key>
    <string>automatic</string>
</dict>
</plist>
EOF

# Try to export, or just copy from archive if export fails
xcodebuild -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportPath "$EXPORT_PATH" \
    -exportOptionsPlist "$BUILD_DIR/ExportOptions.plist" \
    2>/dev/null || cp -R "$ARCHIVE_PATH/Products/Applications/"*.app "$EXPORT_PATH/"

# Find the app
APP_PATH=$(find "$EXPORT_PATH" -name "*.app" -type d | head -1)
if [ -z "$APP_PATH" ]; then
    APP_PATH=$(find "$ARCHIVE_PATH/Products/Applications" -name "*.app" -type d | head -1)
fi

if [ -z "$APP_PATH" ]; then
    echo "❌ Error: Could not find built app"
    exit 1
fi

echo "✅ App built at: $APP_PATH"

# Create DMG
echo "💿 Creating DMG..."
DMG_NAME="AutoArchive-${VERSION}.dmg"
DMG_PATH="$BUILD_DIR/$DMG_NAME"

mkdir -p "$DMG_DIR"
cp -R "$APP_PATH" "$DMG_DIR/"

# Create Applications symlink
ln -s /Applications "$DMG_DIR/Applications"

# Create DMG with hdiutil
hdiutil create -volname "$APP_NAME" \
    -srcfolder "$DMG_DIR" \
    -ov -format UDZO \
    "$DMG_PATH"

echo ""
echo "✅ Build complete!"
echo "📦 DMG: $DMG_PATH"
echo ""

# Calculate checksum
CHECKSUM=$(shasum -a 256 "$DMG_PATH" | awk '{print $1}')
echo "🔐 SHA256: $CHECKSUM"

# Output for GitHub Actions
if [ -n "$GITHUB_OUTPUT" ]; then
    echo "dmg_path=$DMG_PATH" >> "$GITHUB_OUTPUT"
    echo "dmg_name=$DMG_NAME" >> "$GITHUB_OUTPUT"
    echo "checksum=$CHECKSUM" >> "$GITHUB_OUTPUT"
fi

