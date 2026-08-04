---
name: mission-control
description: >-
  Interact with Mission Control — AI agent orchestration dashboard. Use when
  registering agents, managing tasks, syncing skills, or querying agent/task
  status via MC APIs, OpenClaw adapters, or SSE events.
---

# Mission Control Agent Skill

Mission Control (MC) is an AI agent orchestration dashboard with real-time SSE/WebSocket, a skill registry, framework adapters, and RBAC. This skill teaches agents how to interact with MC APIs programmatically.

## Quick Start

**Base URL:** `http://localhost:3000` (default Next.js dev) or your deployed host.

**Auth header:** `x-api-key: <your-api-key>`

**Register + heartbeat in two calls:**

```bash
# 1. Register
curl -X POST http://localhost:3000/api/adapters \
  -H "Content-Type: application/json" \
  -H "x-api-key: $MC_API_KEY" \
  -d '{
    "framework": "generic",
    "action": "register",
    "payload": { "agentId": "my-agent-01", "name": "My Agent" }
  }'

# 2. Heartbeat (repeat every 5 minutes)
curl -X POST http://localhost:3000/api/adapters \
  -H "Content-Type: application/json" \
  -H "x-api-key: $MC_API_KEY" \
  -d '{
    "framework": "generic",
    "action": "heartbeat",
    "payload": { "agentId": "my-agent-01", "status": "online" }
  }'
```

## Authentication

| Method | Header | Use Case |
|--------|--------|----------|
| API Key | `x-api-key: <key>` or `Authorization: Bearer <key>` | Agents, scripts, CI/CD |
| Session cookie | `Cookie: __Host-mc-session=<token>` (HTTPS) | Browser UI |

**Roles:** `viewer` < `operator` < `admin`

## Agent lifecycle

```
register → heartbeat (5m) → fetch assignments → report task status → disconnect
```

All lifecycle actions: `POST /api/adapters` with `framework`, `action`, `payload`.

**Actions:** `register`, `heartbeat`, `report`, `assignments`, `disconnect`  
**Frameworks:** `generic`, `openclaw`, `crewai`, `langgraph`, `autogen`, `claude-sdk`

## Core APIs

| Area | Endpoint | Notes |
|------|----------|-------|
| Agents | `/api/agents` | CRUD, task stats |
| Tasks | `/api/tasks` | Priorities, bulk status |
| Skills | `/api/skills` | List, read SKILL.md content, security check |
| Status | `/api/status` | Health, gateway, models |
| Events | `/api/events` | SSE for live updates |

## Environment variables

| Variable | Description |
|----------|-------------|
| `API_KEY` | Agent/script auth |
| `MISSION_CONTROL_DB_PATH` | SQLite path (default `.data/mission-control.db`) |
| `OPENCLAW_GATEWAY_HOST` / `PORT` | Gateway connection |

For full API tables and payload shapes, see source project `SKILL.md` or OpenAPI spec in repo.

## Origin

- **Origin:** Generalized agent orchestration workflow
- **Extracted:** 2026-06-10
- **Note:** Condensed from project-root `SKILL.md`; expand from source when MC API changes.
