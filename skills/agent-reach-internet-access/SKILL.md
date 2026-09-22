---
name: agent-reach-internet-access
description: Install, configure, and use Agent Reach to give any AI agent read and search access to 13+ internet platforms — Twitter, Reddit, YouTube, GitHub, LinkedIn, Web, and more — with zero API fees.
---

# Agent Reach Internet Access

Give any AI agent one-click access to the entire internet. Install, configure, health-check, and route upstream CLI tools for 13+ platforms with zero API fees.

## When to use

- An agent needs to read a web page, tweet, Reddit post, YouTube video, or LinkedIn profile
- An agent needs to search across Twitter, Reddit, GitHub, or the open web
- Setting up internet access for a new agent environment
- Diagnosing broken internet access channels

## Stack

- Python 3.10+
- Node.js (for mcporter / MCP tools)
- Upstream CLIs: twitter-cli, yt-dlp, bili-cli, rdt-cli, gh, opencli, mcporter

## Instructions

### Do

- Use `agent-reach install --env=auto` first (read-only, safe) before any system changes
- Ask the user before running `--system` to install external tools
- Use `agent-reach doctor` to check what works and what needs fixing
- Call upstream tools directly after installation (Agent Reach is the installer, not a wrapper)
- Keep all config and tokens in `~/.agent-reach/` — never in the project workspace
- Use secondary accounts for cookie-based auth (Twitter, Reddit) to reduce risk

### Don't

- Don't run commands with `sudo` unless the user explicitly approves
- Don't modify system files outside `~/.agent-reach/`
- Don't install packages not listed in the official guide
- Don't clone repos or create files inside the agent workspace
- Don't store credentials in project directories

## Supported Platforms

| Platform | Capabilities | Auth Required | Upstream Tool |
|----------|-------------|:---:|---------------|
| 🌐 Web | Read any URL → Markdown | No | Jina Reader |
| 🔍 Web Search | Search the open web | No | Exa via mcporter |
| 🐦 Twitter/X | Read, search, timeline | Cookie | twitter-cli |
| 📖 Reddit | Search, read posts | Login | opencli or rdt-cli |
| 📺 YouTube | Metadata, transcripts | No | yt-dlp |
| 💻 GitHub | Read, search repos/issues | No | gh CLI |
| 💼 LinkedIn | Profiles, job search | Login | mcp-server-linkedin |
| 📘 Facebook | Search, profiles, feed | Login | opencli |
| 📷 Instagram | Search, profiles, posts | Login | opencli |
| 📺 Bilibili | Hot, ranking, search | No | bili-cli |
| 📕 XiaoHongShu | Search, read, comments | Session | opencli or MCP |
| 📈 Xueqiu | Stock quotes, hot posts | Cookie | Built-in |
| 🎙️ Podcasts | Audio → text transcript | API key | Groq Whisper |
| 📡 RSS | Read any feed | No | feedparser |

## Steps

### 1. Install (Windows PowerShell)

```powershell
# Create isolated virtual environment
py -3 -m venv $env:USERPROFILE\.agent-reach-venv
$env:USERPROFILE\.agent-reach-venv\Scripts\Activate.ps1

# Install from GitHub
python -m pip install https://github.com/Panniantong/agent-reach/archive/main.zip

# Safe check (read-only, no system changes)
agent-reach install --env=auto

# Install core tools (after user approval)
agent-reach install --env=auto --system
```

### 2. Install (macOS / Linux)

```bash
# Recommended: pipx
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip

# Or use venv
python3 -m venv ~/.agent-reach-venv
source ~/.agent-reach-venv/bin/activate
pip install https://github.com/Panniantong/agent-reach/archive/main.zip

# Check and install
agent-reach install --env=auto
agent-reach install --env=auto --system
```

### 3. Add optional channels

```bash
# Pick specific channels
agent-reach install --env=auto --system --channels=twitter,reddit,linkedin

# Or install everything
agent-reach install --env=auto --system --channels=all
```

### 4. Diagnose and fix

```bash
agent-reach doctor          # Full health check
agent-reach watch           # Quick health + update check
agent-reach check-update    # Check for new versions
```

### 5. Configure credentials (as needed)

```bash
agent-reach configure twitter-cookies   # Twitter auth
agent-reach configure proxy             # Network proxy
agent-reach configure groq-key          # Podcast transcription
```

## Command reference (after installation)

| Platform | Command Example |
|----------|----------------|
| Web | `curl -s "https://r.jina.ai/URL"` |
| Web Search | `mcporter call exa.web_search_exa query="..." numResults=5` |
| Twitter | `twitter search "query" -n 10` |
| YouTube | `yt-dlp --dump-json URL` |
| GitHub | `gh search repos "query"` |
| Reddit | `opencli reddit search "query" -f yaml` |
| LinkedIn | `mcporter call linkedin.get_person_profile linkedin_username="..."` |
| Facebook | `opencli facebook search "query" -f yaml` |
| Instagram | `opencli instagram user USERNAME -f yaml` |
| RSS | `python3 -c "import feedparser; ..."` |

## Example

```bash
# Read a competitor's website as clean markdown
curl -s "https://r.jina.ai/https://example.com"

# Search Twitter for industry discussions
export TWITTER_AUTH_TOKEN="..." TWITTER_CT0="..."
twitter search "nextjs saas" -n 10

# Search GitHub for similar projects
gh search repos "laravel crm dashboard" --sort stars

# Search the web
mcporter call exa.web_search_exa query="best react dashboard frameworks 2026" numResults=5
```

## Additional resources

- [Agent Reach GitHub](https://github.com/Panniantong/Agent-Reach)
- [Install guide](https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md)
- [Update guide](https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/update.md)

## Origin

- **Project:** Agent Reach (open source)
- **Repo:** Panniantong/Agent-Reach
- **License:** MIT
- **Added:** 2026-09-22
