---
name: laravel-dual-repo-push
description: Push one tested branch or release tag to separate developer and client GitHub remotes using clean remote URLs and an approved credential manager. Use when a Laravel or other software project must deliver the same verified commit to two repositories without embedding tokens in commands, scripts, configuration, or logs.
---

# Dual GitHub Remote Push

## Objective

Deliver the same verified commit to two authorized Git remotes while keeping authentication outside repository files, command history, process arguments, and remote URLs.

## Setup

Configure clean HTTPS or SSH remotes:

```powershell
git remote add origin https://github.com/YOUR-ORG/your-app-dev.git
git remote add client https://github.com/CLIENT-ORG/your-app.git
git remote -v
```

Authenticate with Git Credential Manager, `gh auth login`, SSH keys managed by the operating system, or an organization-approved secret manager. Never place a token before `@github.com` in a remote URL.

## Workflow

1. Confirm the requested branch, tag, two target remotes, repository owners, and authorization to publish.
2. Verify that the working tree and index contain only intended changes.
3. Run the project test, build, lint, secret-scan, and release checks proportionate to risk.
4. Confirm both remote URLs are clean and point to the intended repositories.
5. Push the same branch to both remote names. Stop if either push fails.
6. Compare the local commit SHA with both remote branch SHAs.
7. Record the release commit, targets, result, and any rollback instructions without recording credentials.

## Reusable script

Copy [templates/push-both-repos.example.ps1](../../templates/push-both-repos.example.ps1) into the project, configure the remote names, then run:

```powershell
.\scripts\push-both-repos.ps1
.\scripts\push-both-repos.ps1 -Tag "v1.0.0"
```

The script rejects HTTPS remote URLs containing embedded credentials.

## Release gates

- The branch is tested and approved for both destinations.
- No `.env`, credentials, private keys, customer data, or operational secret files are staged.
- Both repositories are expected to receive the same commit.
- Branch protection, required reviews, and client release controls are respected.
- Force pushes and history rewrites require separate explicit authorization.

## Completion evidence

- Local commit SHA and both verified remote SHAs.
- Clean remote names and repository destinations.
- Test and secret-scan results.
- Release tag result when applicable.
- Any failed target, remediation, or rollback requirement.

## Origin

- **Project:** Generalized dual-repository delivery workflow
- **Repo:** No third-party code bundled
- **Commit:** Not applicable
- **Extracted:** 2026-08-04
