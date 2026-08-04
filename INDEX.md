# Yazinc Ai Toolkit — Skill Index

> Update whenever you add, change, or retire a skill. See [WORKFLOW.md](WORKFLOW.md).

**Current catalog:** 50 reusable skills, excluding `_template`.

## Cross-project (all stacks)

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `central-knowledge-base` | Safely maintain shared non-secret knowledge, provenance, pointers, and duplicate resolution | local working copy | 2026-08-04 |
| `test-software-app` | Human-centered, evidence-backed application testing with selectable 3, 4, 5, or 6-stage audits | local audit session | 2026-08-04 |
| `deploy-secrets-zero-exposure` | **Strict deploy gate** — no secrets reachable on live domain | toolkit | 2026-06-10 |

**Use before every deploy.** Run `scripts/pre-deploy-secrets-scan.ps1`; complete `skills/deploy-secrets-zero-exposure/CHECKLIST.md`.

## Active skills — Laravel admin platform (Asset Manager)

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `extract-to-toolkit` | Meta-skill: extract patterns into this repo | — | 2026-06-10 |
| `laravel-datatables-module` | Server-side Yajra CRUD lists | 0ee71e9 | 2026-06-10 |
| `laravel-activity-logger` | Hybrid indexed + JSON audit log | 0ee71e9 | 2026-06-10 |
| `laravel-deploy-fix-php` | Post-deploy cache reset | 0ee71e9 | 2026-06-10 |
| `laravel-dual-repo-push` | Dev + client GitHub push | 0ee71e9 | 2026-06-10 |
| `laravel-rbac-permissions` | Module read/write middleware | 0ee71e9 | 2026-06-10 |
| `laravel-soft-delete-trash` | Unified trash + 30-day cleanup | 0ee71e9 | 2026-06-10 |
| `laravel-security-hardening` | Setup lock, gitignore ops, input rule | 0ee71e9 | 2026-06-10 |
| `laravel-json-ai-settings` | Encrypted AI keys in storage JSON | 0ee71e9 | 2026-06-10 |
| `laravel-ai-multi-provider` | Provider fallback + friendly errors | 0ee71e9 | 2026-06-10 |
| `laravel-vision-label-scan` | Image → JSON → review → apply | 0ee71e9 | 2026-06-10 |
| `laravel-env-maintenance` | `.env` maintenance + branded 503 | 0ee71e9 | 2026-06-10 |
| `laravel-form-select2-global` | App-wide form/Select2 CSS variables | 0ee71e9 | 2026-06-10 |
| `mission-control` | MC agent API, adapters, tasks, skills sync | 30ecc3d | 2026-06-10 |

**Laravel cluster source:** Asset Manager @ `0ee71e9`  
**Agent orchestration:** Mission Control @ `30ecc3d`

## AI skill cluster (Laravel)

```
laravel-json-ai-settings → laravel-ai-multi-provider → laravel-vision-label-scan
```

## Engineering, quality, security, and operations

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `playwright-e2e-testing` | Cross-browser journeys, CRUD regression, traces, and authenticated workflow testing | external capability synthesis | 2026-08-04 |
| `api-contract-testing` | OpenAPI contracts, authorization, malformed inputs, invariants, and compatibility | external capability synthesis | 2026-08-04 |
| `application-security-review` | Evidence-based ASVS, API, threat, and static security review | external capability synthesis | 2026-08-04 |
| `supply-chain-security` | Secrets, dependencies, containers, SBOMs, licenses, and vulnerability risk | external capability synthesis | 2026-08-04 |
| `database-reliability-audit` | Integrity, transactions, concurrency, backups, restores, and recovery readiness | external capability synthesis | 2026-08-04 |
| `ci-cd-release-gates` | Tested, least-privilege delivery pipelines with approvals and rollback | external capability synthesis | 2026-08-04 |
| `performance-load-testing` | Load, stress, spike, soak, capacity, and bottleneck testing | external capability synthesis | 2026-08-04 |
| `frontend-quality-gate` | Web performance, responsive behavior, and regression budgets | external capability synthesis | 2026-08-04 |
| `accessibility-audit` | Automated and human WCAG 2.2 accessibility verification | external capability synthesis | 2026-08-04 |
| `observability-incident-response` | Logs, metrics, traces, alerts, runbooks, recovery, and learning | external capability synthesis | 2026-08-04 |
| `architecture-decision-records` | Reversible architecture decisions with evidence and tradeoffs | external capability synthesis | 2026-08-04 |

## Product design and user experience

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `ui-ux-product-design` | User-centered flows, information architecture, wireframes, visual systems, states, accessibility, usability testing, and handoff | external capability synthesis | 2026-08-04 |
| `figma-canva-design-workflow` | Coordinated Figma product UI and Canva campaign asset production with controlled handoff | original workflow | 2026-08-04 |
| `design-to-code-implementation` | Accessible, responsive implementation from approved design through runtime verification | original workflow | 2026-08-04 |
| `design-system-engineering` | Governed tokens, component libraries, variants, theming, documentation, and design-code parity | original workflow | 2026-08-04 |
| `screen-reader-accessibility-testing` | Keyboard and assistive-technology testing across critical application journeys | original workflow | 2026-08-04 |

## AI evaluation, retrieval, and operations

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `ai-evaluation-red-team` | Quality, safety, security, cost, latency, and adversarial AI evaluation | external capability synthesis | 2026-08-04 |
| `deepeval-ai-testing` | Dataset-driven AI regression suites and trace-aware failure analysis | external capability synthesis | 2026-08-04 |
| `rag-evaluation` | Retrieval, faithfulness, relevance, citations, freshness, and isolation | external capability synthesis | 2026-08-04 |
| `ai-observability` | Privacy-aware model, retrieval, agent, tool, quality, cost, and error telemetry | external capability synthesis | 2026-08-04 |
| `vector-database-readiness` | Vector architecture selection, benchmarking, isolation, recovery, and exit planning | external capability synthesis | 2026-08-04 |

## Data and analytics operations

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `data-operations-router` | Route data work by objective, scale, sensitivity, mutation risk, and evidence | toolkit | 2026-08-04 |
| `data-profile-clean-validate` | Reproducible profiling, cleaning, normalization, and validation | external capability synthesis | 2026-08-04 |
| `sql-query-engineering` | Safe complex SQL, joins, CTEs, windows, recursion, reconciliation, and writes | external capability synthesis | 2026-08-04 |
| `sql-performance-optimization` | Plans, indexes, cardinality, locks, workload evidence, and regression checks | external capability synthesis | 2026-08-04 |
| `nosql-query-engineering` | Document, search, key-value, aggregation, indexing, and consistency design | external capability synthesis | 2026-08-04 |
| `data-reconciliation-migration` | Source-to-target mappings, batch controls, parity evidence, and rollback | external capability synthesis | 2026-08-04 |
| `analytics-engineering` | Tested staging, dimensions, facts, metrics, documentation, and backfills | external capability synthesis | 2026-08-04 |
| `big-data-analytics` | Scale-aware local, parallel, and distributed analytical processing | external capability synthesis | 2026-08-04 |
| `data-pipeline-orchestration` | Idempotent ETL and ELT scheduling, retries, backfills, gates, and recovery | external capability synthesis | 2026-08-04 |
| `data-quality-contracts` | Versioned schema, semantic, freshness, volume, and compatibility agreements | external capability synthesis | 2026-08-04 |
| `data-lineage-governance` | Lineage, ownership, classification, retention, impact, and metadata quality | external capability synthesis | 2026-08-04 |
| `analyst-insight-reporting` | Reproducible analysis, metrics, accessible visuals, uncertainty, and decisions | external capability synthesis | 2026-08-04 |

## Templates

| File | Linked skill |
|------|--------------|
| `templates/fix.php.example` | `laravel-deploy-fix-php` |
| `templates/push-both-repos.example.ps1` | `laravel-dual-repo-push` |
| `templates/TracksSoftDeletes.php.example` | `laravel-soft-delete-trash` |
| `templates/form-field-heights.css.example` | `laravel-form-select2-global` |
| `templates/gitignore-secrets.block` | `deploy-secrets-zero-exposure` |
| `templates/web-deny-sensitive.conf.example` | `deploy-secrets-zero-exposure` |

Full project list: [projects/INVENTORY.md](projects/INVENTORY.md)

## Planned (other projects)

| Project | Repo | Candidate skills |
|---------|------|------------------|
| **YazfexAi Suite** | local `138b0d1` | Perfex AI module, keystore, KB |
| **Yazfex AI Website** | Yaz-inc/yazfexai | Next.js theme, Supabase, SaaS pages |
| MediaV1 | yasirnmg/MediaV1 | Supabase + React media UI |
| FM2026 | Yazinc/FM2026 | Slim PHP fee management |
| philsis | Yazinc/philsis | TBD after scan |
| RockCrete USA Pro | Yaz-inc/rockcreteusa | Deploy/template patterns |
