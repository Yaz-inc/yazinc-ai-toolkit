#!/bin/bash
# YAZ.INC Artwork Manager — One-time Protocol Setup (Linux)
# Registers yazinc:// URI protocol via xdg-mime / .desktop file.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_PATH="$SCRIPT_DIR/server.js"
NODE_PATH="$(which node || which nodejs)"

if [ -z "$NODE_PATH" ]; then
  echo "❌ Node.js not found. Install from https://nodejs.org then run this again."
  exit 1
fi

DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/yazinc-artwork-manager.desktop"
HANDLER_SCRIPT="$HOME/.local/bin/yazinc-launch.sh"

mkdir -p "$DESKTOP_DIR"
mkdir -p "$HOME/.local/bin"

# Create handler script
cat > "$HANDLER_SCRIPT" <<EOF
#!/bin/bash
"$NODE_PATH" "$SERVER_PATH" &
sleep 1
xdg-open "http://localhost:3737" 2>/dev/null || sensible-browser "http://localhost:3737"
EOF
chmod +x "$HANDLER_SCRIPT"

# Create .desktop entry
cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=YAZ.INC Artwork Manager
Exec=$HANDLER_SCRIPT %u
Type=Application
Terminal=false
MimeType=x-scheme-handler/yazinc;
Categories=Graphics;
EOF

# Register with xdg
chmod +x "$DESKTOP_FILE"
xdg-mime default yazinc-artwork-manager.desktop x-scheme-handler/yazinc
update-desktop-database "$DESKTOP_DIR" 2>/dev/null

echo ""
echo "✅ Setup complete! You can now click 'Enable Full Mode' in the browser."
echo "   The Artwork Manager will launch automatically via yazinc:// protocol."
