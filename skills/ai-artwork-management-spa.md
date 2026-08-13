---
name: ai-artwork-management-spa
description: AI Generated Artwork Management (SPA) by Yazinc. No installation, instant flash working skill. Includes a local Node.js server for physical file deletion from the browser.
---

# AI Generated Artwork Management (SPA) by Yazinc
*No installation for the viewer. One double-click to enable full physical delete.*

## Requirements
- **Node.js** installed on the machine (https://nodejs.org) — only needed for physical file deletion
- No other installations needed for viewing/downloading assets

## How It Works (Full Stack)

### Files Created
| File | Purpose |
|---|---|
| `Yaz_inc_instant_download.html` | React SPA frontend — works standalone OR via server |
| `server.js` | Express server — enables physical file deletion via `/api/delete` |
| `package.json` | Node.js dependencies (just `express`) |
| `▶ Start Artwork Manager.bat` | **One double-click** → installs deps, starts server, opens browser |

### User Flow
1. **Double-click** `▶ Start Artwork Manager.bat`
2. Browser opens at `http://localhost:3737` automatically
3. Green banner: "Server Online — Physical delete active"
4. Click trash icon on any asset → file is **permanently deleted from disk**

### Offline Fallback (file:// protocol)
If user opens HTML directly without server:
- Orange banner shows: "Server Offline"
- **▶ Start Server** button visible — clicking it opens the `.bat` file
- Delete button still works but only removes from view (virtual delete)
- Every 10 seconds, app auto-checks if server came online


This skill documents the proven Yazinc workflow for taking raw, flawed AI-generated artwork (e.g., baked-in text, weird gradients) and turning it into production-ready transparent assets, managed by a lightning-fast, zero-installation frontend interface.

## 1. Replacing Baked-in AI Typography
AI image generators often hallucinate text or bake incorrect words directly into the artwork. To fix this without ruining the original 3D icon or art style:

### The "Erase and Replace" Method
1. **Do not modify the icon**: Keep the generated icon exactly as is. Flattening it or changing its color will destroy the generated 3D aesthetic.
2. **Erase the text**: If the text is on a solid background (e.g., white), use `Pillow` in Python to draw a rectangle over the baked text to erase it cleanly.
3. **Match the AI Font Style**:
   - AI often generates thick, blocky, extended fonts.
   - **DO NOT** use standard thin fonts (like Outfit or Inter) with faux-bolding (drawing text multiple times with an offset). It looks messy.
   - **USE** naturally heavy, wide fonts like `Arial Black` or `Segoe UI Black` in **ALL CAPS**. They perfectly mimic the AI's hallucinated heavy geometric style.

```python
# Example of erasing bottom text on a 1024x1024 white-bg image
from PIL import Image, ImageDraw, ImageFont

orig_img = Image.open("ai_generated.jpg").convert("RGBA")
w, h = orig_img.size
draw = ImageDraw.Draw(orig_img)
# Erase bottom 38% where text is baked
draw.rectangle([0, int(h * 0.62), w, h], fill=(255, 255, 255, 255))

# Use a heavy font to replace it (ALL CAPS)
font_heavy = ImageFont.truetype("C:/Windows/Fonts/ariblk.ttf", 150)
draw.text((x, y), "YAZ.INC", font=font_heavy, fill=(35, 23, 92, 255))
```

## 2. Extracting Typography from User Screenshots
When a user provides a screenshot of exact typography on a light background:
1. Load the image in Python (`.convert("RGBA")`).
2. Loop through pixels: calculate brightness `(r+g+b)/3.0`.
3. If brightness > 220, set alpha to 0 (transparent).
4. If brightness is low (dark text), replace the color with the strict brand color (e.g., `#0a0118`) while preserving the calculated alpha for smooth anti-aliased edges.

## 3. Instant Flash React Asset Manager (CDN)
For managing final assets (Logos, Banners, Posters), do not over-engineer with PHP or a backend. A single HTML file using React via CDN provides a premium, zero-installation experience:

- **State Management**: Use React state to handle tabs (Folders) and virtual deletion.
- **Virtual Deletion**: A "Red Bucket" button simply filters the asset out of the React state array (`setAssets(prev => prev.filter(a => a.id !== id))`), cleaning the user's view without touching the filesystem.
- **Day/Night Preview**: Implement a global theme toggle (e.g., swapping `bg-[#0a0118]` to `bg-gray-100`) so transparent PNGs can be previewed against both light and dark backgrounds. Use CSS patterns (like `radial-gradient`) in light mode to make transparency obvious.

### Requirements for the HTML File:
- Tailwind CDN
- React & ReactDOM CDN
- Babel CDN (for compiling JSX directly in the browser)
- `assets` array with `{ id, title, file, folder, ratio, fit, size }` metadata.
