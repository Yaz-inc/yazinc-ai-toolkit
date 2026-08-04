# Yazinc AI Toolkit

<p align="center">
  <strong>A growing arsenal of agent skills for uncompromising software architecture</strong><br>
  Codex · Cursor · Claude Code · Antigravity
</p>

<p align="center">
  <a href="https://yaz-inc.github.io/yazinc-ai-toolkit/"><strong>OPEN THE INTERACTIVE TOOLKIT</strong></a>
  &nbsp;·&nbsp;
  <a href="https://www.yaz-inc.com">VISIT YAZ INC</a>
</p>

> **Looking for the designed homepage?** Open the [Yazinc AI Toolkit landing page](https://yaz-inc.github.io/yazinc-ai-toolkit/). This repository contains the source files and installable skills.

Public AI-agent skill library created by **Yasir Ikram** and maintained by **Yaz Inc**. It provides reusable skills, patterns, templates, and scripts for Codex, Cursor, Claude Code, Antigravity, and other Agent Skills-compatible tools. The library is designed to keep growing as new, proven workflows are developed.

## Easy to understand. Easy to use.

The interactive toolkit makes every skill approachable for first-time developers and experienced teams alike. Each skill card provides three clear actions:

- **Read instructions** to understand the complete workflow and its safety rules.
- **Copy skill instructions** to place the full skill guidance on the clipboard instantly.
- **How to use** to open a short guide with the invocation, three simple steps, and a ready-to-copy example prompt.

There is no need to memorize commands, installation folders, or agent-specific syntax. Install the toolkit once, choose a skill, copy the suggested prompt, and describe the result you need in your active project.

## Smart implementation playbooks

The landing page also provides a small, curated set of outcome-based technology playbooks. Each one explains what the solution pattern is, how to apply it safely, and provides a copy-ready starter prompt with official references. Playbooks are guidance, not installable skills, so the main skills catalog remains focused and easy to navigate.

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
