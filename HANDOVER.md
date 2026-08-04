# Yazinc AI Toolkit Git Identity Rewrite Handover

Version-Timestamp: 2026-08-04 22:08:00 +05:00

## Objective

Finish the authorized Git history correction for `Yaz-inc/yazinc-ai-toolkit` so the sole author and committer identity is:

- Name: `Yaz Inc`
- Email: `yazinc@gmail.com`
- GitHub repository owner: `Yaz-inc`

The user explicitly authorized rewriting the public history and force-pushing `main`. Older `Co-authored-by: Cursor <cursoragent@cursor.com>` trailers were also confirmed as incorrect contributor attribution and have been removed from the rewritten local history.

## Current verified state

- Repository: `D:\Servers\laragon\www\yazinc-ai-toolkit`
- Remote: `https://github.com/Yaz-inc/yazinc-ai-toolkit.git`
- Rewritten local `main`: `38609b82f46c8b16241f71b72ff539c73b12da77`
- Current remote `main`: `e1b22d552f683238c51c2d7d11f691d773ae835f`
- Rewritten local tree: `cab84917ad31016d95d97d3a5bf4ed4331e26e92`
- Original tree: `cab84917ad31016d95d97d3a5bf4ed4331e26e92`
- Rewritten commit count: `19`
- Original commit count: `19`
- Working tree was clean before this handover file was created.
- Repository-local Git identity is configured as `Yaz Inc <yazinc@gmail.com>`.
- Every commit on rewritten `main` has author and committer `Yaz Inc <yazinc@gmail.com>`.
- Rewritten `main` contains no `Co-authored-by: Cursor` trailers.
- The pre-deployment secrets scan passes with no critical findings or warnings.
- No force-push has been performed yet. The public repository is still on the original history.

## Recovery assets

A complete verified Git bundle exists outside the repository:

`D:\Servers\laragon\www\yazinc-ai-toolkit-author-backup-20260804.bundle`

- Size at creation: `204243` bytes
- It contains the complete original history at `e1b22d552f683238c51c2d7d11f691d773ae835f`.
- Verify it with:

```powershell
git bundle verify "D:\Servers\laragon\www\yazinc-ai-toolkit-author-backup-20260804.bundle"
```

Git filter-branch also retained the original local ref:

`refs/original/refs/heads/main -> e1b22d552f683238c51c2d7d11f691d773ae835f`

Do not remove the bundle or original ref until the rewritten remote and GitHub Pages deployment are fully verified.

## Rewrite already completed

The local rewrite changed the incorrect `yasirnmg <yasirnmg@gmail.com>` author and committer identity to `Yaz Inc <yazinc@gmail.com>` and removed the Cursor co-author trailers. The rewrite finished successfully even though the initial terminal call returned before completion.

The `.git-rewrite` temporary directory is no longer present. No rewrite process is running.

## Required remaining work

### 1. Reconfirm the local rewrite

```powershell
git status --short
git log main --format='%an <%ae> | %cn <%ce>' | Sort-Object -Unique
git log main --format='%B' | Select-String -Pattern '^Co-authored-by:'
git rev-parse main
git rev-parse 'main^{tree}'
git rev-parse 'refs/original/refs/heads/main^{tree}'
git rev-list --count main
git rev-list --count refs/original/refs/heads/main
```

Expected results:

- Only `Yaz Inc <yazinc@gmail.com>` appears as author and committer.
- No co-author trailer is returned.
- Both tree hashes are `cab84917ad31016d95d97d3a5bf4ed4331e26e92`.
- Both histories contain 19 commits.

### 2. Reconfirm the remote has not changed

```powershell
git ls-remote origin refs/heads/main
```

The expected remote hash before the force-push is:

`e1b22d552f683238c51c2d7d11f691d773ae835f`

Stop if it differs. A changed remote requires a new comparison and a new lease value.

### 3. Run final safety checks

```powershell
node --check assets/i18n.js
node --check assets/toolkit.js
git diff --check
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\pre-deploy-secrets-scan.ps1 -Path . -Strict
```

This handover file is intentionally local operational documentation. Do not include `HANDOVER.md` in the force-push unless the user explicitly asks to publish it.

### 4. Force-push with the exact lease

The user already authorized this history rewrite. Use the lease-protected command, not an unrestricted force-push:

```powershell
git push --force-with-lease=refs/heads/main:e1b22d552f683238c51c2d7d11f691d773ae835f origin main
```

### 5. Verify the rewritten remote

```powershell
git ls-remote origin refs/heads/main
```

Expected remote hash:

`38609b82f46c8b16241f71b72ff539c73b12da77`

Also verify the GitHub commit page shows `Yaz Inc` for recent and older commits. GitHub contributor statistics may take time to refresh after a history rewrite.

### 6. Verify GitHub Pages

Confirm the landing page rebuilds and remains functional:

`https://yaz-inc.github.io/yazinc-ai-toolkit/`

Check at minimum:

- Hero title and subtitle render correctly.
- Skill catalog renders.
- Read instructions, copy, and How to use controls remain available.
- No browser console errors appear.
- The public page returns HTTP 200.

### 7. Cleanup only after full verification

Keep the external bundle until the user confirms the repository and Pages deployment are correct. The original ref and bundle provide rollback evidence. Any cleanup of those recovery assets is a separate destructive action and should be performed only with explicit approval.

## Important notes for the next agent

- Use English when communicating with the user.
- Do not rewrite or force-push again if the remote hash has changed.
- Do not expose credentials or unrelated project information.
- Do not add another contributor identity to commits.
- Preserve Codex `Agent-Attribution` trailers. They are audit metadata, not GitHub co-author trailers.
- The latest public landing-page work was complete before the identity rewrite.
