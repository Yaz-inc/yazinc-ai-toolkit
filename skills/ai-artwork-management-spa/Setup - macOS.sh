#!/bin/bash
# YAZ.INC Artwork Manager — One-time Protocol Setup (macOS)
# Registers yazinc:// URI protocol so the browser can launch the app directly.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_PATH="$SCRIPT_DIR/server.js"
NODE_PATH="$(which node)"

if [ -z "$NODE_PATH" ]; then
  echo "❌ Node.js not found. Install from https://nodejs.org then run this again."
  exit 1
fi

APP_DIR="$HOME/Applications/YazincArtworkManager.app"
PLIST="$APP_DIR/Contents/Info.plist"
EXEC="$APP_DIR/Contents/MacOS/launch.sh"

echo "📁 Creating app bundle at $APP_DIR..."
mkdir -p "$APP_DIR/Contents/MacOS"

# Create launcher script
cat > "$EXEC" <<EOF
#!/bin/bash
"$NODE_PATH" "$SERVER_PATH" &
sleep 1
open "http://localhost:3737"
EOF
chmod +x "$EXEC"

# Create Info.plist registering yazinc:// protocol
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>com.yazinc.artworkmanager</string>
  <key>CFBundleName</key>
  <string>YAZ.INC Artwork Manager</string>
  <key>CFBundleExecutable</key>
  <string>launch.sh</string>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>YAZ.INC Artwork Manager</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>yazinc</string>
      </array>
    </dict>
  </array>
</dict>
</plist>
EOF

# Register with Launch Services
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -f "$APP_DIR"

echo ""
echo "✅ Setup complete! You can now click 'Enable Full Mode' in the browser."
echo "   The Artwork Manager will launch automatically."
