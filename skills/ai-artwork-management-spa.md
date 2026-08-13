---
name: ai-artwork-management-spa
title: "AI Generated Artwork Management (SPA) by Yazinc"
description: >
  A complete, zero-installation local artwork management system.
  A single HTML React SPA + optional Node.js server gives you a 
  beautiful gallery with folder tabs, lightbox, physical file delete,
  and one-click OS protocol launch. No cloud. No subscriptions. 
  Just drop files and go.
tags: [artwork, spa, react, nodejs, local, gallery, no-install]
---

# AI Generated Artwork Management (SPA) by Yazinc

> **Zero-install for viewing. One double-click to unlock full delete power.**  
> Works on Windows, macOS, and Linux.

---

## What This Skill Delivers

A complete local artwork management system built for AI-generated assets:

| Feature | Detail |
|---|---|
| 📁 **Folder Tabs** | Auto-created from your asset data — add an asset to a folder and the tab appears |
| 🔍 **Lightbox** | Click any image → full-screen preview with blur backdrop + spring animation |
| 🗑️ **Physical Delete** | Trash icon permanently deletes files from disk (requires Full Mode) |
| 📂 **Create Folders** | Type a folder name in sidebar → press Enter → new tab appears instantly |
| 🌤️ **Light/Dark Mode** | Toggle anytime. Light mode is default |
| ⚡ **yazinc:// Protocol** | After one-time setup, browser launches the server app directly |
| 🟢 **Server Status Banner** | Live indicator — green = Full Mode active, indigo = Preview Mode |
| ⬇️ **Download Button** | Direct download link on every card |

---

## Files Created

```
Artwork/
├── Yaz_inc_instant_download.html     ← Main SPA (React via CDN, no install)
├── server.js                         ← Express server (physical delete + protocol)
├── package.json                      ← Just one dependency: express
├── ▶ Start Artwork Manager.bat       ← Windows: double-click to launch
├── ⚙ Setup - Windows.bat            ← One-time: registers yazinc:// in registry
├── ⚙ Setup - macOS.sh              ← One-time: registers yazinc:// on macOS
├── ⚙ Setup - Linux.sh              ← One-time: registers yazinc:// on Linux
└── Social Media/                     ← Your actual image files live here
    ├── logo.png
    ├── banner.png
    └── ...
```

---

## Setup for a New User (Agent Instructions)

### Step 1 — Create the folder structure

```
<project>/Artwork/
<project>/Artwork/Social Media/     ← all images go here (flat, no subfolders needed)
```

### Step 2 — Create these files

Copy the following files from this skill into the user's `Artwork/` folder:

1. `Yaz_inc_instant_download.html`
2. `server.js`
3. `package.json`
4. `▶ Start Artwork Manager.bat`
5. `⚙ Setup - Windows.bat`
6. `⚙ Setup - macOS.sh`
7. `⚙ Setup - Linux.sh`

### Step 3 — Add the user's images to `Social Media/`

All images must be flat inside `Social Media/`. No sub-directories needed — folders are virtual (UI-only categories).

### Step 4 — Register assets in the HTML

Open `Yaz_inc_instant_download.html` and update the `ASSETS` array inside the `<script>` tag:

```javascript
const ASSETS = [
  {
    id: 'unique-id',           // any unique string
    title: 'My Logo',          // display name in the card
    file: 'my_logo.png',       // filename inside Social Media/
    folder: 'Logos',           // tab/folder name (auto-creates the tab)
    height: 240                // preview height in pixels (220–320 recommended)
  },
  // add more...
];
```

> **Tip:** `folder` values are auto-derived — just write the same string on multiple assets and they share a tab automatically.

---

## User Guide (What the User Sees)

### Viewing Artworks
- Open `Yaz_inc_instant_download.html` directly in browser
- Click any folder tab in the left sidebar to filter
- Click any image thumbnail to open the **full-size lightbox**
- Press `Esc` or click outside the lightbox to close

### Creating a New Folder
- Type a name in the **"New Folder"** input at the bottom of the sidebar
- Press `Enter` or click `+`
- The new folder tab appears instantly

### Deleting an Artwork
- Hover over a card → **trash icon** appears (top-right of card)
- Click it to remove

### Deleting an Entire Folder
- Hover over any folder tab → **trash icon** appears
- Click it to remove the folder and all its artworks

### Enable Full Mode (Physical Delete)
By default the app runs in **Preview Mode** — artworks are removed from the gallery view but files stay safely on disk.

To enable **physical disk deletion**:

**First time only — run the setup for your OS:**

| OS | File to run |
|---|---|
| 🪟 Windows | `⚙ Setup - Windows.bat` |
| 🍎 macOS | `⚙ Setup - macOS.sh` (run in Terminal) |
| 🐧 Linux | `⚙ Setup - Linux.sh` (run in Terminal) |

This registers a `yazinc://` protocol on your system (exactly like Discord or VS Code do).

**Then:** Click **⚡ Enable Full Mode** in the app → your browser fires `yazinc://start` → the server launches automatically → green banner confirms Full Mode is active.

### Light / Dark Mode
Click the **Dark Mode / Light Mode** toggle button (top-right of the main area) anytime.

---

## API Endpoints (Technical)

The Express server exposes:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/status` | Health check — returns `{status: "online"}` |
| `DELETE` | `/api/delete?file=filename.png` | Deletes single file from `Social Media/` |
| `DELETE` | `/api/folder` + `{files: [...]}` body | Bulk delete all files in a folder |
| `GET` | `/*` | Serves all static files (HTML, images, etc.) |

Security: Path traversal is blocked — filenames containing `..`, `/`, or `\` are rejected.

---

## Adding New Artwork Later

1. Drop the `.png`/`.jpg` file into `Artwork/Social Media/`
2. Add a new entry to the `ASSETS` array in the HTML
3. Refresh the browser — the new card appears instantly

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 (CDN), Babel (CDN) — zero npm install |
| Styling | Vanilla CSS, DM Sans font (Google Fonts) |
| Backend | Node.js + Express (only for physical delete) |
| Protocol | Custom `yazinc://` URI scheme (OS-level) |
| Storage | Local filesystem only — no cloud, no database |

---

## Port

Default: `http://localhost:3737`

To change: edit `const PORT = 3737` in `server.js`.
