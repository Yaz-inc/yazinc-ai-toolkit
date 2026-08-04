# Yazinc AI Toolkit

<p align="center">
  <strong>51 reusable AI-agent skills for better software delivery</strong><br>
  Codex · Cursor · Claude Code · Antigravity
</p>

<p align="center">
  <a href="https://yaz-inc.github.io/yazinc-ai-toolkit/"><strong>OPEN THE INTERACTIVE TOOLKIT</strong></a>
  &nbsp;·&nbsp;
  <a href="https://www.yaz-inc.com">VISIT YAZ INC</a>
</p>

> **Looking for the designed homepage?** Open the [Yazinc AI Toolkit landing page](https://yaz-inc.github.io/yazinc-ai-toolkit/). This repository contains the source files and installable skills.

Public AI-agent skill library created by **Yasir Ikram** and maintained by **Yaz Inc**. It provides reusable skills, patterns, templates, and scripts for Codex, Cursor, Claude Code, Antigravity, and other Agent Skills-compatible tools.

**Reusable prompts:** Use [prompts/google-sans-website-agent.md](prompts/google-sans-website-agent.md) to instruct a development agent to implement and verify Google Sans correctly.

## What & why

| | |
|---|---|
| **What** | Central repo for agent skills and proven dev patterns |
| **Why** | Start each new project from scaffolding you already trust; push learnings back after each delivery |
| **Who** | Developers and AI-agent users who need reusable, inspectable workflows |

## For humans

1. Clone and install everything: `git clone https://github.com/Yaz-inc/yazinc-ai-toolkit.git; cd yazinc-ai-toolkit; powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-toolkit.ps1 -Target all`
2. Open a new Codex, Cursor, Claude Code, or Antigravity session.
3. Ask: `Use the test-software-app skill to audit this application before launch.`
4. To update later: `git pull; powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-toolkit.ps1 -Target all`

## For AI agents

**Read [AGENTS.md](AGENTS.md) first.** It explains the public repository rules, installation method, validation requirements, and publishing checklist.

Meta-skill for contributing: `skills/extract-to-toolkit/SKILL.md`

## Structure

```
yazinc-ai-toolkit/
├── AGENTS.md              ← agents read this on open
├── WORKFLOW.md            ← generalize, validate, commit, publish
├── INDEX.md               ← canonical skill catalog
├── projects/REGISTRY.md   ← public provenance policy
├── skills/                ← reusable SKILL.md folders
├── patterns/              ← detailed implementation guidance
├── templates/             ← safe reusable examples
└── scripts/               ← installation and validation helpers
```

## Rules

- Never commit secrets, tokens, customer data, private paths, or unrelated repository history
- One skill = one focused job
- For every new skill, update `INDEX.md`, `projects/REGISTRY.md`, and the landing-page catalog

## GitHub

- **Repo:** [Yaz-inc/yazinc-ai-toolkit](https://github.com/Yaz-inc/yazinc-ai-toolkit)
- **Maintainer:** Yaz Inc
