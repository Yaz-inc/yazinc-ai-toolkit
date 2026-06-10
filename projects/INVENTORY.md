# Yaz Inc — Project Inventory

> Scan of `D:\Servers\laragon\www\` for toolkit extraction planning.  
> Update when you add repos or finish extracting skills.

## Legend

| Status | Meaning |
|--------|---------|
| **Extracted** | Skills published to Yazinc Ai Toolkit |
| **Ready** | Has `SKILL.md` or clear patterns to extract |
| **Reuse CDghl** | Laravel admin — use existing 13 Laravel skills |
| **Scan** | Needs review before extraction |
| **Archive** | Old / zip / low priority |

---

## Extracted to toolkit

| Project | Local path | GitHub | Skills |
|---------|------------|--------|--------|
| Asset Manager | `CDghl` | [Yaz-inc/Asset-Manager-V17-Final](https://github.com/Yaz-inc/Asset-Manager-V17-Final) | **13 Laravel skills** @ `0ee71e9` |

---

## Ready to extract (has skills or strong patterns)

| Project | Local path | GitHub | Stack | Candidate skills |
|---------|------------|--------|-------|------------------|
| Mission Control | `MissionControl` | [builderz-labs/mission-control](https://github.com/builderz-labs/mission-control) | Next.js, SQLite | `mission-control` (SKILL.md in repo root) |
| MediaV1 | `MediaV1` | [yasirnmg/MediaV1](https://github.com/yasirnmg/MediaV1) | React, Vite, MUI, Supabase | Supabase + media UI patterns |
| FM2026 | `fm2026` | [Yazinc/FM2026](https://github.com/Yazinc/FM2026.git) | Slim PHP 4 | Fee management API (non-Laravel) |
| Phil / philsis | `phil` | [Yazinc/philsis](https://github.com/Yazinc/philsis.git) | Multi-folder (`phil_app`, Backend) | TBD — scan `phil_app` |

---

## Yaz-inc client / product (scan for extraction)

| Project | Local path | GitHub / notes | Stack hint |
|---------|------------|----------------|------------|
| RockCrete USA Pro | `RockCreteUsa-Pro` | [Yaz-inc/rockcreteusa](https://github.com/Yaz-inc/rockcreteusa) + client repo | Blueprint/docs, scripts, `.template` |
| Perfex | `perfex` | No git in folder | CRM module work |
| Perfex module | `perfex_module` | Git, no origin URL | Perfex PHP module |
| Plumber Pro | `Plumber_Pro` | No git | Plumbing business app |
| ProPlumb USA | `proplumb-usa` | No git | |
| Streamline Plumbing | `Streamline Plumbing` | No git | |
| Provision | `provision` | No git | |
| Setup | `setup` | No git | |
| Yazfex AI | `yazfexai-com` | No git | |
| Yaz-inc.com | `Yaz-inc.com` | No git | Marketing site |
| Yazlicence | `yazlicence` | No git | |

---

## OpenClaw / agent ecosystem

| Project | Local path | GitHub | Notes |
|---------|------------|--------|-------|
| Mission Control (local) | `MissionControl` | builderz-labs | Primary MC install |
| INIDNA MC | `inidna_missionControl` | abhi1693/openclaw-mission-control | Fork/variant |
| OpenClaw | `OpenClaw` | No git | |
| Gravity Claw | `gravity_claw` | No git | |

---

## Laravel / PHP (likely reuse CDghl skills)

These folders exist under Laragon; many lack git remotes. For new Laravel admin work, **start from toolkit skills** rather than re-extracting:

- `CD_List`, `Delta`, `lalibala`, `mam`, `mamalicious`, `nccdd_module`, `LaravelBlankPckg`, `AssetManager_Azaro`, `GHL`, `wp`, `tradeshow`, `wooley`, `IDE`, `FM25`

Action: init git + link to GitHub when a project becomes active again.

---

## Extraction priority (suggested)

1. **mission-control** — already authored; copy to toolkit ✓ (this session)
2. **MediaV1** — Supabase + React media patterns (if you reuse media apps)
3. **fm2026** — Slim PHP fee system (separate from Laravel cluster)
4. **RockCreteUsa-Pro** — deploy/template scripts if generalized
5. Active client Laravel apps — only **delta** patterns not in Asset Manager skills

---

## Security note

Some local repos may have **tokens embedded in git remote URLs**. Never copy those into this repo. Rotate PATs and use `_deploy/key.git.md` (gitignored) instead.

---

## How to add a project

1. Add section to [REGISTRY.md](REGISTRY.md)
2. Add row here
3. Extract skills via [WORKFLOW.md](../WORKFLOW.md)
4. Update [INDEX.md](../INDEX.md)
