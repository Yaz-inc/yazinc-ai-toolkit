---
name: backup-app-to-google-drive
description: >-
  Back up any application project (Laravel/PHP, Node and Next.js, Python and Django, Java and Spring, .NET, static HTML,
  or anything else) into a dated, restorable set and copy it to a Google Drive folder synced by Google Drive for Desktop.
  A set holds the project zip with git history, a database file (schema only by default), sanitized config copies, SHA-256
  checksums and restore steps. Secrets, user uploads and data dumps stay out, the zip is scanned for leaked credentials, the
  Drive copy is verified by checksum, and only the newest N sets (default 3) are kept. Use when asked to back up an app,
  save a project to Google Drive, make a restore point or backup set, or take a fresh off-machine copy after a deploy.
---

# Backup Your App to Google Drive

One repeatable routine that turns any project folder into a safe, verified restore point in Google Drive, with no API
tokens: it writes into the folder that Google Drive for Desktop already syncs.

## When to use

- A project has no git remote yet, or you want an off-machine copy after every release.
- You need a "step back in time" option: a few dated sets you can restore from.
- You want a backup that is safe to put in a personal or shared Drive (no secrets, no user data).

## Stack

Any. A small profile per stack decides what is rebuildable and what must never leave the machine. Detected automatically
from marker files; several can apply at once (for example Laravel plus Node assets).

| Stack | Detected by | Left out (rebuildable or sensitive) |
|---|---|---|
| Laravel / PHP | `artisan` | `vendor`, `node_modules`, `storage/app` (uploads and documents), `storage/logs`, `storage/framework`, `public/storage`, `bootstrap/cache` |
| Node, Next.js, Nuxt | `package.json` | `node_modules`, `.next`, `.nuxt`, `dist`, `build`, `out`, `.turbo`, caches, `uploads` |
| Python, Django | `manage.py`, `requirements.txt`, `pyproject.toml` | `venv`, `.venv`, `__pycache__`, caches, `staticfiles`, `media` |
| Java, Spring | `pom.xml`, `build.gradle*` | `target`, `build`, `.gradle`; config secrets blanked inside the zip |
| .NET | `*.sln`, `*.csproj` | `bin`, `obj`, `packages`, `.vs`; `appsettings*.json` secrets blanked |
| Static HTML | `index.html` | nothing large |
| Unknown | none | strict generic rules only; always inspect the zip |

Always left out, in every stack: `.env*` (except `.env.example`), keys and certificates (`*.pem`, `*.key`, `*.pfx`, `id_rsa*`),
credential files, `*.sql`, `*.sql.gz`, `*.dump`, `*.bak`, `*.sqlite*`, `*.db`, logs, the backup folder itself and worktree copies.

## Instructions

### Do

- Ask once, then remember: project folder, Google Drive folder, how many sets to keep (default 3), database type and name.
- Treat the leak scan and the document listing as real checks. Open the findings before you copy anything to Drive.
- Name a database file after its true source (`review`, `production`, `local`); a dump header can say something else.
- Tell the user which set was pruned and that Drive's bin keeps deleted sets, still counting against storage, until emptied.
- Keep the original encryption keys safe elsewhere: encrypted data restores only with the key that wrote it.

### Don't

- Don't put a real `.env`, a vault file, a production data dump, signed or generated documents, or user uploads into Drive.
- Don't accept a database password on the command line. Use `MYSQL_PWD` or `PGPASSWORD` in the environment.
- Don't prune before the Drive copy has matched its checksums, and never delete the set just made.
- Don't use `--allow-findings` unless you have looked at every finding and they are false positives.

## Steps

1. **Gather inputs.** Project folder; Drive folder (Drive for Desktop must be installed and signed in; on Windows it mounts as a
   drive letter with a `My Drive` folder, on macOS under `~/Library/CloudStorage`; a letter already in use makes Drive pick another one). No Drive for Desktop? Build the
   set locally and let the user upload it by hand.
2. **Check what will be left out:** `python scripts/backup_app.py --root <project> --detect`
3. **Run it:**
   ```bash
   python scripts/backup_app.py --root <project> --drive-dir "<Drive folder>" --keep 3 --prune \
     --db-type mysql --db-name <db> --dump-bin <path/to/mysqldump>
   ```
   Database options: `--db-type mysql|postgres|sqlite|none`, `--db-name`, `--db-user`, `--db-host`, `--db-port`,
   `--dump-bin`, or `--db-file <dump>` to include a dump you already have in any format (MongoDB, SQL Server and so on).
   The database must be running for mysql and postgres. Rows are included only with `--dump-data`, and a data dump holds real
   people's data: confirm with the user, then password-protect it before it goes to Drive.
4. **Read the output:** stack detected, file counts, config sanitized inside the zip, the "document/data-type files" review list,
   the leak scan result, `drive: copied and verified`, what was pruned.
5. **If the leak scan stops the run** (exit code 3, `REVIEW_REQUIRED.txt`): nothing was copied. Remove or `--exclude` the file, or
   rotate the credential, then rerun.
6. **Report:** set name, sizes, what was excluded and why, what was pruned, and that the copy was verified.

## What a set contains

```
<project>/_backup/<YYYY-MM-DD_HHmm>/
  <name>_project_<stamp>.zip          project incl. .git, minus the exclusions
  <name>_schema_only_<stamp>.sql      structure only (data only on request)
  env-copy-1.txt                      the config file with every secret value replaced by <REDACTED>
  SHA256SUMS.txt  EXCLUDED.txt  RESTORE.md
```

The same folder is copied to `<Drive folder>/<stamp>/`. Regenerate `SHA256SUMS.txt` after changing any file in a set.

## Useful options

| Option | Purpose |
|---|---|
| `--stack node,python` | override detection |
| `--include <path>` | re-include a safe path inside an excluded folder (for example blank forms) |
| `--exclude <folder>` | add a folder to the exclusions |
| `--env-file <path>` | sanitize and copy another config file |
| `--no-git` | leave `.git` out |
| `--keep N`, `--prune` | keep the newest N sets in both places, delete older ones after verification |
| `--backup-dir <path>` | local sets folder (default `<project>/_backup`) |

## Lessons built into the defaults

- A `*.sql` exclude also catches a framework's schema snapshot (Laravel `database/schema/*.sql`); that is source, so it is kept.
- Uploads hide in several places (`storage/app`, `public/storage`, `media`, `uploads`, worktree copies): exclude whole trees,
  not file names.
- Spring and .NET config files are source and may hold passwords, so the zip carries blanked copies, and `${PLACEHOLDER}` values stay.
- Connection strings keep their host and user but lose the password.
- Keeping the backup folder inside the project would nest old sets in each new zip, so it is always excluded.
- Rewriting a zip changes its hash, so regenerate the checksum file after any edit.

## Restoring

Verify `SHA256SUMS.txt`, unzip, fill the redacted values from your password manager, install dependencies for the stack, create the
database and import the `.sql`, then start the app. `RESTORE.md` in the set lists the steps for the detected stack.

## Additional resources

- [scripts/backup_app.py](scripts/backup_app.py): standard-library Python 3.8+, no installs. Run with `--help`.

## Origin

- **Project:** generalized workflow
- **Added:** 2026-10-03
