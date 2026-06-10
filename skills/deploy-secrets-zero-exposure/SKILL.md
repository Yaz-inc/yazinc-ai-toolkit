---
name: deploy-secrets-zero-exposure
description: >-
  Strict pre/post-deploy gate: no secrets, keys, .env, .git, ops files, or
  credential artifacts reachable on the public domain or to unauthorized users.
  Use before every deploy, when adding fix.php or admin tools, reviewing hosting,
  or when the user asks about deployment security or secret exposure online.
---

# Deploy Secrets — Zero Online Exposure

**Golden rule:** Local keys on your machine are fine. **Nothing secret may exist on the server in a path that HTTP can reach** — not for anonymous visitors, not for logged-in users who lack admin ops rights.

This skill applies to **all stacks** (Laravel, Next.js, Perfex, Slim PHP, static sites).

## When to invoke

- Before **first production deploy** or any deploy to a client domain
- When adding **ops utilities** (`fix.php`, setup wizards, debug routes)
- When configuring **web server / Vercel / cPanel** document root
- After **git pull** on production
- User asks: "is this safe to deploy?", "security check", "secrets online"

## Non-negotiable rules

| Rule | Why |
|------|-----|
| `.env` and env backups **never** in web root or git | Direct download = full compromise |
| API keys, PATs, DB passwords **never** in source, config committed to git, or JS bundles | Repo leak + browser DevTools |
| `.git/` **never** web-accessible | History contains every past secret |
| `_deploy/`, `key.*.md`, credential files **gitignored**; never uploaded to hosting | One wget away from disaster |
| Ops files (`fix.php`, `phpinfo.php`, setup scripts) **auth-gated** or **404 when disabled** | Shared hosting scans these constantly |
| `APP_DEBUG=false`, no stack traces to users in production | Errors leak paths and queries |
| Secrets only via **server env** or **files outside document root** | Build artifacts must not embed keys |
| Clean git remote URLs (no PAT in URL) | Config copies and logs leak tokens |

## Pre-deploy gate (mandatory)

Copy [CHECKLIST.md](CHECKLIST.md) and complete **every** item. Do not deploy until all pass.

Run local scan:

```powershell
# From Yazinc Ai Toolkit repo (scan any project path)
powershell -File D:\Servers\laragon\www\yazinc-ai-toolkit\scripts\pre-deploy-secrets-scan.ps1 -Path D:\Servers\laragon\www\YourProject
```

Fix **Critical** findings before upload. **Warning** items need explicit sign-off.

## Document root discipline

```
CORRECT                          WRONG
─────────                        ─────
/public/     ← HTTP only        entire repo as docroot
  index.php                      .env sitting in public_html
/storage/    ← outside OR        .git/ under docroot
  denied by server               backup.sql in public/
```

**Laravel:** `public/` is docroot only.  
**Next.js (Vercel):** secrets in Vercel env vars — never `NEXT_PUBLIC_*` for keys.  
**Perfex:** `modules/` and `application/` must not be directly served.  
**Static:** no `.env`, `.git`, `node_modules` on CDN origin.

## What must return 404 (post-deploy verify)

Hit these on **production domain** (replace `your-domain.com`):

```
https://your-domain.com/.env
https://your-domain.com/.git/config
https://your-domain.com/_deploy/
https://your-domain.com/storage/logs/laravel.log
https://your-domain.com/composer.json          (optional hardening)
https://your-domain.com/.env.example           (optional — reveals stack)
```

For ops tools you keep (e.g. `fix.php`): must return **403 without valid key**, not directory listing or source disclosure.

Record results in deploy notes. Any **200** on secrets = **stop and fix immediately**.

## Git & local keys (allowed locally, never on server)

| Location | Local dev | Production server |
|----------|-----------|-------------------|
| `_deploy/key.git.md` | OK, gitignored | **Must not exist** |
| `.env` | OK, gitignored | OK **outside** web root only |
| PAT in `git remote` URL | Discouraged | N/A — no git on shared hosting docroot |
| `fix.php` with derived key | OK if gitignored | OK in `public/` **with key auth** |

Push pattern: use key file locally → inject token only for `git push` command, not stored in remote URL. See skill `laravel-dual-repo-push`.

## Stack quick rules

### Laravel / PHP apps
- `.gitignore`: `.env`, `/_deploy`, `/public/fix.php`, `/storage/app/**/settings.json` with keys
- Commit templates only: `fix.php.example`
- Disable `/database-setup` after install (`APP_ALLOW_DB_SETUP=false`) — see `laravel-security-hardening`
- Block `/storage`, `/vendor`, `/bootstrap/cache` at web server when docroot misconfigured

### Next.js / React (Vercel or Node)
- `NEXT_PUBLIC_*` = visible in browser — **never** for API keys, Supabase service role, Stripe secret
- Server-only: `process.env.SECRET` in Server Components / Route Handlers / `getServerSideProps`
- No `.env*` in static export output
- Vercel: set secrets in dashboard; never in `vercel.json`

### Perfex CRM modules
- Module config with keys: encrypt at rest or server-side env — not plain in JS admin panels
- `uploads/`, `modules/`, `application/` blocked from direct HTTP

### Shared hosting (cPanel)
- Set docroot to `public/` subfolder, not project root
- Deny dotfiles (`.env`, `.git`) in `.htaccess` — template: [templates/web-deny-sensitive.conf.example](../../templates/web-deny-sensitive.conf.example)

## Agent workflow on deploy tasks

When user asks to deploy or you prepare a release:

1. **Read** this skill + stack-specific skill (`laravel-security-hardening`, etc.)
2. **Run** pre-deploy scan; list Critical/Warning in response
3. **Confirm** `.gitignore` blocks all secret paths — template block in [templates/gitignore-secrets.block](../../templates/gitignore-secrets.block)
4. **Never** add secrets to files that will be committed or served
5. **After deploy**, run post-deploy 404 checks (or give user the URL list)
6. **Report** pass/fail table — do not claim "secure" without verification

## Related skills

| Skill | Focus |
|-------|-------|
| `laravel-security-hardening` | Laravel route lock, validation, 403/404 hygiene |
| `laravel-deploy-fix-php` | Authenticated cache recovery script |
| `laravel-dual-repo-push` | Local key file for git push |
| `laravel-json-ai-settings` | Encrypted AI keys in storage, not git |

## Deep reference

Stack-specific deny rules, CI patterns, incident response: [reference.md](reference.md)

## Origin

- **Synthesized:** Yazinc Ai Toolkit cross-project standard
- **Informed by:** Asset Manager deploy patterns @ `0ee71e9`, Yazfex PAT-in-remote lesson
- **Added:** 2026-06-10
