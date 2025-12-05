#!/bin/bash

# ===========================================
# Icon Generation Script for Auto Archive
# ===========================================
# This script converts SVG icons to PNG at various sizes
# 
# Requirements:
#   - rsvg-convert (from librsvg): brew install librsvg
#   OR
#   - Inkscape: brew install --cask inkscape
#   OR
#   - Use macOS Preview/Automator manually
#
# Usage: ./generate-icons.sh [source.svg]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_ROOT/Madrid Extension/Resources/images"

# Source SVG (default to icon-modern.svg)
SOURCE_SVG="${1:-$IMAGES_DIR/icon-modern.svg}"

# Extension icon sizes
EXTENSION_SIZES=(48 64 96 128 256 512)

# App icon sizes for macOS
APP_ICON_SIZES=(16 32 64 128 256 512 1024)

echo "🎨 Auto Archive Icon Generator"
echo "================================"
echo "Source: $SOURCE_SVG"
echo ""

# Check for available conversion tools
if command -v rsvg-convert &> /dev/null; then
    CONVERTER="rsvg"
    echo "✅ Using rsvg-convert"
elif command -v inkscape &> /dev/null; then
    CONVERTER="inkscape"
    echo "✅ Using Inkscape"
elif command -v qlmanage &> /dev/null; then
    CONVERTER="qlmanage"
    echo "⚠️  Using qlmanage (basic macOS tool, quality may vary)"
else
    echo "❌ No SVG converter found!"
    echo ""
    echo "Please install one of the following:"
    echo "  brew install librsvg     # Recommended"
    echo "  brew install --cask inkscape"
    echo ""
    echo "Or manually convert using:"
    echo "  1. Open $SOURCE_SVG in a browser"
    echo "  2. Take screenshots at required sizes"
    echo "  3. Or use online tools like cloudconvert.com"
    exit 1
fi

echo ""

# Function to convert SVG to PNG
convert_svg() {
    local input="$1"
    local output="$2"
    local size="$3"
    
    case $CONVERTER in
        rsvg)
            rsvg-convert -w "$size" -h "$size" "$input" -o "$output"
            ;;
        inkscape)
            inkscape "$input" -w "$size" -h "$size" -o "$output" 2>/dev/null
            ;;
        qlmanage)
            # qlmanage doesn't support custom sizes well, but we can try
            qlmanage -t -s "$size" -o "$(dirname "$output")" "$input" 2>/dev/null
            # Rename output
            local temp_name="$(dirname "$output")/$(basename "$input").png"
            if [ -f "$temp_name" ]; then
                mv "$temp_name" "$output"
            fi
            ;;
    esac
}

# Generate extension icons
echo "📦 Generating extension icons..."
for size in "${EXTENSION_SIZES[@]}"; do
    output="$IMAGES_DIR/icon-$size.png"
    echo "   Creating icon-$size.png..."
    convert_svg "$SOURCE_SVG" "$output" "$size"
done

echo ""
echo "✅ Extension icons generated!"
echo ""

# Generate App Icon set (optional)
read -p "🍎 Generate macOS App Icon set? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    APP_ICON_DIR="$PROJECT_ROOT/Madrid/Assets.xcassets/AppIcon.appiconset"
    
    echo "📱 Generating macOS App Icons..."
    
    for size in "${APP_ICON_SIZES[@]}"; do
        # Standard resolution
        output="$APP_ICON_DIR/icon_${size}x${size}.png"
        echo "   Creating ${size}x${size}..."
        convert_svg "$SOURCE_SVG" "$output" "$size"
        
        # @2x resolution (for sizes up to 512)
        if [ "$size" -le 512 ]; then
            size2x=$((size * 2))
            output2x="$APP_ICON_DIR/icon_${size}x${size}@2x.png"
            echo "   Creating ${size}x${size}@2x..."
            convert_svg "$SOURCE_SVG" "$output2x" "$size2x"
        fi
    done
    
    echo ""
    echo "✅ App icons generated!"
    echo ""
    echo "⚠️  Remember to update Contents.json in AppIcon.appiconset"
fi

echo ""
echo "🎉 Done! Icons are ready in:"
echo "   $IMAGES_DIR"
echo ""
echo "💡 Tip: For best quality, consider using Figma, Sketch, or"
echo "   Adobe Illustrator to export the SVGs manually."

