#!/usr/bin/env python3
"""Back up any application project into a dated, restorable set and copy it to Google Drive.

Works for Laravel/PHP, Node/Next.js, Python/Django, Java/Spring, .NET, static HTML and anything else
(unknown projects get a strict generic profile). A set contains: project zip (with git history),
a database file (schema only unless told otherwise), sanitized config copies, SHA-256 checksums,
EXCLUDED.txt and RESTORE.md. Secrets, user uploads and data dumps are left out by default, and the
zip is scanned for leaked credentials before anything leaves the machine.

Standard library only (Python 3.8+). Passwords are never accepted on the command line:
use MYSQL_PWD / PGPASSWORD in the environment.

Example:
  python backup_app.py --root ./myapp --drive-dir "H:/My Drive/MyApp/Backups" --keep 3 --prune
"""
import argparse, datetime, fnmatch, hashlib, os, re, shutil, sqlite3, subprocess, sys, zipfile

SET_RE = re.compile(r"^\d{4}-\d{2}-\d{2}_\d{4}$")

COMMON_DIRS = ["_backup", ".claude/worktrees", "__MACOSX", ".aws", ".ssh"]
SECRET_FILE_GLOBS = [".env", ".env.*", "*.pem", "*.key", "*.p12", "*.pfx", "*.jks", "*.keystore", "id_rsa*",
                     "id_ed25519*", "*.ppk", "*.local", "credentials*.json", "service-account*.json",
                     "secrets.*", ".npmrc", ".pypirc", ".netrc"]
DATA_FILE_GLOBS = ["*.sql", "*.sql.gz", "*.dump", "*.bak", "*.sqlite", "*.sqlite3", "*.db", "*.log"]
SAFE_KEEP = [".env.example", ".env.sample", ".env.template", ".env.dist", "database/schema/*.sql"]
SANITIZE_IN_ZIP = ["application*.properties", "application*.yml", "application*.yaml", "bootstrap*.yml",
                   "appsettings*.json"]
TEXT_EXT = {".php", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".py", ".java", ".kt", ".cs", ".go", ".rb",
            ".rs", ".json", ".yml", ".yaml", ".properties", ".xml", ".md", ".txt", ".html", ".htm", ".cfg", ".ini",
            ".toml", ".sh", ".ps1", ".gradle", ".conf", ".env", ".example", ".vue", ".svelte", ".css", ".scss"}

PROFILES = {
    "laravel": dict(markers=["artisan"],
        dirs=["vendor", "node_modules", "storage/app", "storage/logs", "storage/framework", "public/storage",
              "bootstrap/cache", "public/build"], shallow=[],
        restore=["composer install; npm install if assets are used",
                 "copy the sanitized env copy to .env and fill the redacted values",
                 "create the database, import the .sql, then php artisan serve"]),
    "node": dict(markers=["package.json"],
        dirs=["node_modules", ".next", ".nuxt", ".turbo", ".cache", ".vercel", ".parcel-cache", "coverage",
              "public/uploads"], shallow=["dist", "build", "out", "uploads"],
        restore=["npm ci (or pnpm/yarn install)", "copy the sanitized env copy to .env.local and fill the redacted values",
                 "restore the database from the .sql, then npm run dev (or build and start)"]),
    "python": dict(markers=["manage.py", "requirements.txt", "pyproject.toml", "Pipfile"],
        dirs=["venv", ".venv", "env", "__pycache__", ".pytest_cache", ".mypy_cache", ".tox", "staticfiles"],
        shallow=["media", "uploads"],
        restore=["python -m venv .venv; pip install -r requirements.txt",
                 "copy the sanitized env copy to .env and fill the redacted values",
                 "restore the database, then python manage.py migrate / runserver (Django) or the app's start command"]),
    "java": dict(markers=["pom.xml", "build.gradle", "build.gradle.kts"],
        dirs=[".gradle", "target"], shallow=["build", "out"],
        restore=["mvn -DskipTests package (or ./gradlew build)",
                 "fill the redacted values in the application config",
                 "restore the database, then run the packaged application"]),
    "dotnet": dict(markers=["*.sln", "*.csproj"],
        dirs=["bin", "obj", "packages", ".vs"], shallow=[],
        restore=["dotnet restore; dotnet build", "fill the redacted values in appsettings*.json or user-secrets",
                 "restore the database, then dotnet run"]),
    "static": dict(markers=["index.html"], dirs=[], shallow=[],
        restore=["serve the folder with any static web server"]),
    "generic": dict(markers=[], dirs=[], shallow=[],
        restore=["read the project's README for build and run steps",
                 "fill redacted values from the password manager"]),
}

SECRET_NAME = re.compile(r"(pass(word|wd)?|secret|token|api[-_.]?key|private[-_.]?key|client[-_.]?secret|"
                         r"access[-_.]?key|auth[-_.]?key|credential|signing[-_.]?key|\bsid\b|dsn|app[-_.]?key|"
                         r"(^|[-_.])key$)", re.I)
KV_LINE = re.compile(r"^(\s*(?:export\s+)?)([A-Za-z0-9_.\-]+)(\s*[=:]\s*)(.*)$")
JSON_KV = re.compile(r'("(?:[^"\\]|\\.)*"\s*:\s*)"((?:[^"\\]|\\.)*)"')
URL_CRED = re.compile(r"([a-zA-Z][a-zA-Z0-9+.\-]*://[^\s:/@]+:)([^\s@/]+)(@)")

LEAK_PATTERNS = [
    ("AWS access key", re.compile(r"AKIA[0-9A-Z]{16}")),
    ("private key block", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY")),
    ("GitHub token", re.compile(r"gh[pousr]_[A-Za-z0-9]{36,}")),
    ("Slack token", re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}")),
    ("Google API key", re.compile(r"AIza[0-9A-Za-z_\-]{35}")),
    ("Stripe live key", re.compile(r"sk_live_[0-9a-zA-Z]{20,}")),
    ("OpenAI-style key", re.compile(r"sk-(?:proj-)?[A-Za-z0-9_\-]{32,}")),
    ("JWT", re.compile(r"eyJ[A-Za-z0-9_\-]{10,}\.eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}")),
]


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def redact_text(text):
    """Blank secret values in env, properties, yaml and json text. Returns (text, redacted_keys)."""
    keys, out = [], []
    for line in text.splitlines():
        m = KV_LINE.match(line)
        if m and SECRET_NAME.search(m.group(2)):
            val = m.group(4).strip()
            if val and not val.startswith(("<REDACTED", "${", "#")) and val.strip("\"'") not in ("", "null", "~"):
                line = f"{m.group(1)}{m.group(2)}{m.group(3)}<REDACTED>"
                keys.append(m.group(2))
        else:
            def jrepl(mm):
                if SECRET_NAME.search(mm.group(1)) and mm.group(2) and not mm.group(2).startswith(("<REDACTED", "${")):
                    keys.append(mm.group(1).split('"')[1])
                    return mm.group(1) + '"<REDACTED>"'
                return mm.group(0)
            line = JSON_KV.sub(jrepl, line)
        line = URL_CRED.sub(r"\1<REDACTED>\3", line)
        out.append(line)
    return "\n".join(out) + "\n", keys


def detect_stacks(root, forced):
    if forced and forced != "auto":
        return [s.strip() for s in forced.split(",") if s.strip()]
    found = []
    for dirpath, dirnames, filenames in os.walk(root):
        depth = os.path.relpath(dirpath, root).count(os.sep) + (0 if dirpath == root else 1)
        dirnames[:] = [d for d in dirnames if d not in ("node_modules", "vendor", ".git", "venv", ".venv", "target")]
        if depth > 2:
            dirnames[:] = []
            continue
        for stack, prof in PROFILES.items():
            if any(fnmatch.fnmatch(f, m) for f in filenames for m in prof["markers"]) and stack not in found:
                found.append(stack)
    if len(found) > 1 and "static" in found:
        found.remove("static")      # an index.html next to a real stack is just a file
    return found or ["generic"]


class Filter:
    def __init__(self, stacks, extra_exclude, extra_include):
        self.dirs = list(COMMON_DIRS)
        self.shallow = []
        for s in stacks:
            self.dirs += PROFILES[s]["dirs"]
            self.shallow += PROFILES[s]["shallow"]
        self.dirs += [d.strip("/").replace("\\", "/") for d in extra_exclude]
        self.keep = SAFE_KEEP + [k.replace("\\", "/") for k in extra_include]

    def kept(self, r):
        return any(fnmatch.fnmatch(r, k) or r.startswith(k.rstrip("/") + "/") for k in self.keep)

    def dir_hit(self, r, is_dir):
        parts = r.split("/") if is_dir else r.split("/")[:-1]   # folder names only, never the file name
        folder_path = "/".join(parts)
        for d in self.dirs:
            if "/" in d:
                if ("/" + d + "/") in ("/" + folder_path + "/"):
                    return True
            elif d in parts:
                return True
        return any(s in parts[:3] for s in self.shallow)

    def excluded(self, rel, is_dir=False):
        r = rel.replace("\\", "/")
        if self.kept(r):
            return False
        if self.dir_hit(r, is_dir):
            return True
        name = os.path.basename(r)
        return any(fnmatch.fnmatch(name, g) for g in SECRET_FILE_GLOBS + DATA_FILE_GLOBS)

    def kept_below(self, rel_dir):
        r = rel_dir.replace("\\", "/").rstrip("/") + "/"
        return any(k.startswith(r) for k in self.keep)


def make_zip(root, zip_path, flt, with_git):
    count, skipped, findings, redacted_cfg = 0, [], [], []
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6, allowZip64=True) as z:
        for dirpath, dirnames, filenames in os.walk(root):
            rel_dir = os.path.relpath(dirpath, root).replace("\\", "/")
            rel_dir = "" if rel_dir == "." else rel_dir
            if not with_git and ".git" in dirnames:
                dirnames.remove(".git")
            dirnames[:] = [d for d in dirnames
                           if (not flt.excluded(f"{rel_dir}/{d}".lstrip("/"), True)) or flt.kept_below(f"{rel_dir}/{d}".lstrip("/"))]
            for f in filenames:
                rel = f"{rel_dir}/{f}".lstrip("/")
                if flt.excluded(rel):
                    skipped.append(rel)
                    continue
                full = os.path.join(root, rel)
                try:
                    ext = os.path.splitext(f)[1].lower()
                    sanitize = any(fnmatch.fnmatch(f, g) for g in SANITIZE_IN_ZIP)
                    scan = (ext in TEXT_EXT or sanitize) and os.path.getsize(full) <= 1_000_000
                    if scan:
                        data = open(full, "rb").read()
                        text = data.decode("utf-8", errors="ignore")
                        if sanitize:
                            text, keys = redact_text(text)
                            data = text.encode("utf-8")
                            if keys:
                                redacted_cfg.append(f"{rel}: {', '.join(sorted(set(keys)))}")
                        for label, rx in LEAK_PATTERNS:
                            if rx.search(text):
                                findings.append(f"{rel}: looks like a {label}")
                        zi = zipfile.ZipInfo.from_file(full, rel)
                        zi.compress_type = zipfile.ZIP_DEFLATED
                        z.writestr(zi, data)
                    else:
                        z.write(full, rel)
                    count += 1
                except OSError as e:
                    skipped.append(f"{rel} ({e})")
    return count, skipped, findings, redacted_cfg


def zip_review_notes(zip_path):
    risky_ext = (".pdf", ".docx", ".xlsx", ".csv", ".zip", ".sqlite", ".db", ".sql")
    names = zipfile.ZipFile(zip_path).namelist()
    risky = [n for n in names if n.lower().endswith(risky_ext)]
    return risky


def find_env_files(root, extra):
    found = []
    for rel in ([".env", ".env.local", ".env.development"] + ["%s/.env" % d for d in os.listdir(root)
                                                             if os.path.isdir(os.path.join(root, d)) and not d.startswith(".")]):
        p = os.path.join(root, rel)
        if os.path.isfile(p) and rel not in found:
            found.append(rel)
            break
    for e in extra:
        rel = os.path.relpath(os.path.abspath(e), root).replace("\\", "/")
        if rel not in found and os.path.isfile(e):
            found.append(rel)
    return found


def take_db(args, out_dir, name, stamp):
    if args.db_file:
        ext = os.path.splitext(args.db_file)[1] or ".dump"
        fn = f"{name}_data_{stamp}{ext}"
        shutil.copy2(args.db_file, os.path.join(out_dir, fn))
        return fn, "copied the supplied database file"
    t = args.db_type or ("mysql" if args.db_name else "none")
    if t == "none":
        return None, "no database requested (use --db-type/--db-name or --db-file)"
    kind = "data" if args.dump_data else "schema_only"
    fn = f"{name}_{kind}_{stamp}.sql"
    out = os.path.join(out_dir, fn)
    if t == "sqlite":
        if not (args.db_name and os.path.isfile(args.db_name)):
            return None, "sqlite file not found (--db-name <path to .sqlite file>)"
        con = sqlite3.connect(f"file:{os.path.abspath(args.db_name)}?mode=ro", uri=True)
        with open(out, "w", encoding="utf-8") as fh:
            if args.dump_data:
                fh.write("\n".join(con.iterdump()))
            else:
                fh.write(";\n".join(r[0] for r in con.execute("select sql from sqlite_master where sql is not null")) + ";\n")
        return fn, "sqlite " + ("data dump" if args.dump_data else "schema only (no rows)")
    if t == "mysql":
        cmd = [args.dump_bin or "mysqldump", "-u", args.db_user or "root", "-h", args.db_host, "-P", str(args.db_port or 3306),
               "--routines", "--triggers", "--events", "--default-character-set=utf8mb4", "--add-drop-table"]
        cmd += ["--single-transaction", "--hex-blob"] if args.dump_data else ["--no-data"]
        cmd += [args.db_name, f"--result-file={out}"]
    elif t == "postgres":
        cmd = [args.dump_bin or "pg_dump", "-h", args.db_host, "-p", str(args.db_port or 5432), "-U", args.db_user or "postgres",
               "--no-owner", "--no-privileges", "-f", out]
        cmd += [] if args.dump_data else ["--schema-only"]
        cmd += [args.db_name]
    else:
        return None, f"unsupported --db-type {t} (use mysql, postgres, sqlite, or --db-file for anything else)"
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0 or not os.path.exists(out) or os.path.getsize(out) == 0:
        if os.path.exists(out):
            os.remove(out)
        return None, f"{t} dump failed (is the database running? password via env var): {r.stderr.strip()[:160]}"
    return fn, f"{t} " + ("data dump" if args.dump_data else "schema only (no rows)")


def prune(base, keep, current):
    if keep <= 0 or not os.path.isdir(base):
        return []
    sets = sorted(d for d in os.listdir(base) if SET_RE.match(d) and os.path.isdir(os.path.join(base, d)))
    removed = []
    for d in sets[:-keep]:
        if d != current:
            shutil.rmtree(os.path.join(base, d))
            removed.append(d)
    return removed


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", required=True, help="project folder")
    ap.add_argument("--stack", default="auto", help="auto, or a comma list of: " + ", ".join(PROFILES))
    ap.add_argument("--detect", action="store_true", help="print the detected stack and exclusions, then stop")
    ap.add_argument("--drive-dir", help="Google Drive folder that holds the sets (synced by Drive for Desktop)")
    ap.add_argument("--backup-dir", help="local sets folder (default <root>/_backup)")
    ap.add_argument("--keep", type=int, default=3, help="newest sets kept in each place (default 3)")
    ap.add_argument("--prune", action="store_true", help="delete older sets beyond --keep after verification")
    ap.add_argument("--db-type", choices=["mysql", "postgres", "sqlite", "none"])
    ap.add_argument("--db-name"); ap.add_argument("--db-user"); ap.add_argument("--db-host", default="127.0.0.1")
    ap.add_argument("--db-port", type=int); ap.add_argument("--dump-bin", help="path to mysqldump or pg_dump")
    ap.add_argument("--dump-data", action="store_true", help="include rows (may be personal data!)")
    ap.add_argument("--db-file", "--sql-file", dest="db_file", help="copy this existing dump (any format) into the set")
    ap.add_argument("--env-file", action="append", default=[], help="extra config file to sanitize and copy (repeatable)")
    ap.add_argument("--exclude", action="append", default=[], help="extra folder to exclude (repeatable)")
    ap.add_argument("--include", action="append", default=[], help="re-include a path or glob inside an excluded folder")
    ap.add_argument("--no-git", action="store_true", help="leave .git out")
    ap.add_argument("--allow-findings", action="store_true", help="copy to Drive even if the leak scan reported something")
    ap.add_argument("--project-name")
    args = ap.parse_args()

    root = os.path.abspath(args.root)
    name = re.sub(r"[^A-Za-z0-9._-]+", "_", args.project_name or os.path.basename(root))
    stacks = detect_stacks(root, args.stack)
    flt = Filter(stacks, args.exclude, args.include)
    print("stack:", ", ".join(stacks))
    if args.detect:
        print("excluded folders:", ", ".join(flt.dirs), "| shallow:", ", ".join(flt.shallow) or "-")
        print("excluded files:", ", ".join(SECRET_FILE_GLOBS + DATA_FILE_GLOBS))
        return

    stamp = datetime.datetime.now().strftime("%Y-%m-%d_%H%M")
    base = os.path.abspath(args.backup_dir or os.path.join(root, "_backup"))
    out = os.path.join(base, stamp)
    os.makedirs(out, exist_ok=True)

    zip_name = f"{name}_project_{stamp}.zip"
    zp = os.path.join(out, zip_name)
    count, skipped, findings, redacted_cfg = make_zip(root, zp, flt, not args.no_git)
    print(f"zip: {zip_name} {os.path.getsize(zp) // 1048576} MB, {count} files, {len(skipped)} skipped")
    for r in redacted_cfg:
        print("  config sanitized inside the zip ->", r)
    risky = zip_review_notes(zp)
    if risky:
        print(f"  review: {len(risky)} document/data-type files are inside the zip, check they are not user data:")
        for n in risky[:15]:
            print("   -", n)

    files = [zip_name]
    fn, msg = take_db(args, out, name, stamp)
    print("db:", msg)
    if fn:
        files.append(fn)

    restore_env = []
    for i, rel in enumerate(find_env_files(root, args.env_file), 1):
        text = open(os.path.join(root, rel), encoding="utf-8", errors="ignore").read()
        clean, keys = redact_text(text)
        cn = f"env-copy-{i}.txt"
        with open(os.path.join(out, cn), "w", encoding="utf-8", newline="\n") as fh:
            fh.write(f"# sanitized copy of {rel} ({stamp}); secret values are <REDACTED>, fill them from your password manager\n")
            fh.write("# Encrypted data needs the key that wrote it, so keep the original key when restoring.\n\n" + clean)
        files.append(cn)
        restore_env.append(f"{cn} = {rel}")
        print(f"env: {rel} -> {cn}; redacted: {', '.join(sorted(set(keys))) or 'nothing'}")

    with open(os.path.join(out, "EXCLUDED.txt"), "w", encoding="utf-8") as fh:
        fh.write("Left out on purpose: secrets, data dumps, user uploads, rebuildable folders.\n")
        fh.write("Stack(s): " + ", ".join(stacks) + "\nFolders: " + ", ".join(flt.dirs + flt.shallow) + "\n")
        fh.write("Files: " + ", ".join(SECRET_FILE_GLOBS + DATA_FILE_GLOBS) + "\n\nSkipped paths:\n")
        fh.write("\n".join(skipped[:500]) + "\n")
    steps = []
    for s in stacks:
        steps += [x for x in PROFILES[s]["restore"] if x not in steps]
    with open(os.path.join(out, "RESTORE.md"), "w", encoding="utf-8") as fh:
        fh.write(f"{name} backup {stamp}\n\nVerify the files against SHA256SUMS.txt first.\n\n1. Unzip {zip_name}.\n")
        for n, s in enumerate(steps, 2):
            fh.write(f"{n}. {s}\n")
        if restore_env:
            fh.write("\nConfig copies: " + "; ".join(restore_env) + "\n")
        fh.write("\nSecrets are not in this set. Keep the original encryption keys when restoring encrypted data.\n")
    with open(os.path.join(out, "SHA256SUMS.txt"), "w", encoding="ascii") as fh:
        for f in files:
            fh.write(f"{sha256(os.path.join(out, f))}  {f}\n")

    if findings and not args.allow_findings:
        with open(os.path.join(out, "REVIEW_REQUIRED.txt"), "w", encoding="utf-8") as fh:
            fh.write("The leak scan found possible secrets. Nothing was copied to Drive.\n" + "\n".join(findings) + "\n")
        print("LEAK SCAN FOUND POSSIBLE SECRETS - not copied to Drive, nothing pruned:")
        for f in findings[:20]:
            print("  !", f)
        print("Fix or --exclude them and rerun, or pass --allow-findings if they are false positives.")
        sys.exit(3)

    if args.drive_dir:
        dest = os.path.join(args.drive_dir, stamp)
        os.makedirs(dest, exist_ok=True)
        for f in sorted(os.listdir(out)):
            shutil.copy2(os.path.join(out, f), os.path.join(dest, f))
        bad = [f for f in files if sha256(os.path.join(out, f)) != sha256(os.path.join(dest, f))]
        if bad:
            print("DRIVE COPY MISMATCH:", bad, "- nothing pruned")
            sys.exit(2)
        print("drive: copied and verified ->", os.path.basename(args.drive_dir.rstrip('/\\')) + "/" + stamp)
        if args.prune:
            print("drive pruned:", prune(args.drive_dir, args.keep, stamp) or "nothing")
    if args.prune:
        print("local pruned:", prune(base, args.keep, stamp) or "nothing")
    print("set:", out)


if __name__ == "__main__":
    main()
