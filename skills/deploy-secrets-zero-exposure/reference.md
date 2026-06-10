# Deploy secrets — extended reference

Read when hardening a specific host or responding to a suspected leak.

## Web server deny templates

Use [templates/web-deny-sensitive.conf.example](../../templates/web-deny-sensitive.conf.example). Apply at vhost or `.htaccess` **inside document root** as defense-in-depth when docroot might be misconfigured.

## Environment variable tiers

| Tier | Example | Where it lives |
|------|---------|----------------|
| Public config | `NEXT_PUBLIC_SITE_URL`, analytics ID | Client bundle OK |
| Server secret | `DATABASE_URL`, `STRIPE_SECRET`, AI API keys | Server env only |
| Ops secret | `fix.php` derived key, `APP_KEY` | Server `.env` outside web root |
| Local-only | `_deploy/key.git.md`, dev PAT | Dev machine, gitignored |

## CI/CD

- Secrets in GitHub Actions / GitLab CI **variables** — never echo in logs
- `git push` in CI: use `secrets.GITHUB_TOKEN` or scoped PAT — not printed in workflow YAML
- Artifact uploads: exclude `.env`, `.git`, `_deploy`

## Common leak scenarios

| Scenario | Fix |
|----------|-----|
| Whole repo in `public_html` | Point vhost to `public/`; remove `.env` from docroot |
| `.git` exposed | Delete from server; block dot dirs; redeploy without `.git` |
| PAT in remote URL leaked via screenshot | `git remote set-url origin https://github.com/org/repo.git`; rotate PAT |
| `storage/logs` browsable | Nginx/Apache deny; Laravel `storage` outside public |
| Supabase service role in client component | Move to Route Handler / API route server-side only |
| Database dump in `public/` | Delete file; rotate DB password |

## Incident response (secret reached HTTP 200)

1. **Rotate** every credential that file could expose (DB, API, PAT, APP_KEY if `.env`)
2. **Remove** file from server; fix docroot / deny rules
3. **Audit** access logs for download IPs if available
4. **Re-run** full post-deploy checklist
5. Document in private notes — not in public repo

## Stack: Vercel / Next.js

```bash
# Wrong — in client component or shared module imported by client
const key = process.env.NEXT_PUBLIC_OPENAI_KEY

# Right — server route only
// app/api/chat/route.ts
const key = process.env.OPENAI_API_KEY
```

Preview deployments: use separate env vars or limited keys — not production secrets.

## Stack: Perfex / CodeIgniter

- `application/config/app-config.php` with DB creds — must not be under web-served path
- Module upload folders: no PHP execution in `uploads/`
- License/keystore files: encrypt; never plain JSON in web-accessible cache

## Stack: Laravel shared hosting

- Symlink `public/storage` only — not whole `storage/`
- `bootstrap/cache/*.php` — OK in public subtree but should not list directory
- Queue/cron `.env` read from project root **above** `public/`

## Verification commands (local, before upload)

```powershell
# Patterns that must not appear in files you're about to deploy (adjust paths)
rg -i "(api[_-]?key|secret|password|github_pat_|sk-[a-zA-Z0-9]{20,})" --glob "!vendor" --glob "!.git" public/ resources/js/

# Ensure gitignored paths exist locally but won't ship
git check-ignore -v .env _deploy/key.git.md public/fix.php
```
