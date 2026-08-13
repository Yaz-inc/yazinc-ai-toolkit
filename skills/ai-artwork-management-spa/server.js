/**
 * YAZ.INC Artwork Manager — Local Server
 * ----------------------------------------
 * Enables physical file deletion from the browser.
 * Run via: start_server.bat (double-click)
 *
 * Requirements:
 *   - Node.js installed (https://nodejs.org)
 *   - Run start_server.bat once — it auto-installs express
 *
 * API Endpoints:
 *   DELETE /api/delete?file=filename.png  → physically deletes from ./Social Media/
 *   GET    /                              → auto-redirects to the HTML manager
 */

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const { exec } = require('child_process');

const app        = express();
const PORT       = 3737;
const SOCIAL_DIR = path.join(__dirname, 'Social Media');

// Serve all static files in the Artwork folder (HTML, images, etc.)
app.use(express.static(__dirname));

// Root redirect → open the manager directly
app.get('/', (req, res) => {
  res.redirect('/Yaz_inc_instant_download.html');
});

// Health check
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', version: '1.0.0', tool: 'YAZ.INC Artwork Manager' });
});

// ──────────────────────────────────────────────
// DELETE /api/delete?file=filename.png
// ──────────────────────────────────────────────
app.delete('/api/delete', (req, res) => {
  const filename = req.query.file;

  // Basic security: no path traversal
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return res.status(400).json({ error: 'Invalid filename.' });
  }

  const filepath = path.join(SOCIAL_DIR, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: `File not found: ${filename}` });
  }

  fs.unlink(filepath, (err) => {
    if (err) {
      console.error('Delete error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log(`🗑️  Deleted: ${filename}`);
    res.json({ success: true, deleted: filename });
  });
});

// ──────────────────────────────────────────────
// DELETE /api/folder  body: { files: ['a.png','b.png'] }
// Deletes all files in a folder (bulk)
// ──────────────────────────────────────────────
app.delete('/api/folder', express.json(), (req, res) => {
  const { files } = req.body || {};
  if (!Array.isArray(files)) return res.status(400).json({ error: 'files[] array required' });

  const results = [];
  for (const filename of files) {
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      results.push({ file: filename, deleted: false, error: 'Invalid filename' });
      continue;
    }
    const fp = path.join(SOCIAL_DIR, filename);
    try {
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
      console.log(`🗑️  Deleted (folder): ${filename}`);
      results.push({ file: filename, deleted: true });
    } catch (e) {
      results.push({ file: filename, deleted: false, error: e.message });
    }
  }
  res.json({ success: true, results });
});

// ──────────────────────────────────────────────
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   YAZ.INC Artwork Manager                ║');
  console.log('║   AI Business Solutions  ✅ Ready        ║');
  console.log(`║   Opening at ${url}        ║`);
  console.log('║                                          ║');
  console.log('║   Keep this window open while using app  ║');
  console.log('║   Close it when you are done             ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
  // Auto-open browser on Windows
  exec(`start ${url}`);
});
