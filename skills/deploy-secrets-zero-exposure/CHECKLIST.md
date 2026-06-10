# Deploy secrets — pre/post gate checklist

Copy into deploy notes. **All Pre-deploy items must pass.** Post-deploy 404 checks run on live domain.

---

## Pre-deploy (local / CI)

### Git & repository

- [ ] `.env`, `.env.*` (except `.env.example` if needed), `/_deploy`, `key.*.md`, `*pat*` tokens not tracked
- [ ] No API keys, passwords, or PATs in committed files (scan or `pre-deploy-secrets-scan.ps1`)
- [ ] `git remote -v` shows clean HTTPS/SSH URLs — **no token in URL**
- [ ] No `.sql` dumps, `.zip` backups, or `storage/logs/*.log` in commit

### Build & artifact

- [ ] Production build does not embed secrets in JS/CSS bundles
- [ ] No `NEXT_PUBLIC_` prefix on secret keys (Next.js)
- [ ] AI/settings JSON with keys gitignored; only `.example` in repo
- [ ] Source maps disabled or stripped in production (if they expose internal paths)

### Ops & debug

- [ ] `APP_DEBUG=false` / equivalent in production env
- [ ] Setup wizards (`database-setup`, install.php) disabled or 404 after install
- [ ] `fix.php` / recovery scripts: gitignored live copy, key auth documented
- [ ] No `phpinfo()`, `test.php`, `debugbar` enabled in production

### Upload scope

- [ ] Deploy uploads **only** required runtime files (not full `.git`, not `_deploy/`)
- [ ] Document root = `public/` (Laravel) or platform equivalent — not repo root
- [ ] Server env vars set on host (Vercel/cPanel/.env outside web root)

---

## Post-deploy (live domain)

Replace `your-domain.com`. Expect **404** or **403** — never **200** with content.

| URL | Expected | Pass |
|-----|----------|------|
| `/.env` | 404 | [ ] |
| `/.git/HEAD` | 404 | [ ] |
| `/.git/config` | 404 | [ ] |
| `/_deploy/` | 404 | [ ] |
| `/storage/logs/laravel.log` | 404 | [ ] |
| `/vendor/` (if misconfigured docroot) | 404 | [ ] |
| `/fix.php` (no key) | 403 | [ ] |
| `/database-setup` (after install) | 404 | [ ] |

### Optional hardening

- [ ] `/.env.example` → 404 (hides stack fingerprint)
- [ ] `/composer.json` → 404
- [ ] Security headers present (HSTS, X-Frame-Options) — see `reference.md`

---

## Sign-off

| Field | Value |
|-------|-------|
| Project | |
| Domain | |
| Deploy date | |
| HEAD / tag | |
| Scan script | Critical: 0, Warning: |
| Post-deploy 404 | All pass: Yes / No |
| Signed off by | |

**If any secret URL returns 200:** rotate exposed credentials, fix server config, re-run full checklist.
