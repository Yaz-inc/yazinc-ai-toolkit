# Type of App

Version-Timestamp: 2026-08-04 17:36:47 +05:00

Classify the application before choosing tests. Record all applicable types because one product can combine an admin app, customer portal, vendor portal, API, and AI features.

| Type | Primary risks | Minimum focus |
|---|---|---|
| Public website | Content integrity, accessibility, forms, privacy, browser/device support | Navigation, forms, WCAG 2.2 AA checks, analytics consent, performance |
| Internal business app | Incorrect workflows, privilege creep, data loss, weak audit history | RBAC, CRUD, validation, recovery, activity log |
| Customer or vendor portal | Tenant leakage, direct-object access, incorrect ownership, confusing support flows | Landing routes, tenant scope, object authorization, exports, messages |
| Multi-tenant SaaS | Cross-tenant disclosure, role conflict, background-job scope | Tenant isolation at query and object level, jobs, storage, cache keys |
| E-commerce or payment app | Price/order manipulation, payment scope, fraud, irreversible writes | Server totals, payment boundaries, idempotency, PCI scope, refunds |
| Workflow, ERP, CRM, or asset system | Relationship corruption, stale UI, lifecycle errors, system-of-record impact | Connected QA chain, state transitions, reports, exports, audit trail |
| API or integration service | Broken object authorization, schema drift, retries, replay | Current OWASP API guidance, contracts, auth, rate limits, idempotency |
| SPA or PWA | Stale client state, cache/version mismatch, offline conflicts | API parity, refresh/deep links, storage, service worker, offline recovery |
| Mobile app | Device permissions, lifecycle, offline state, platform differences | Real devices, upgrades, background/foreground, secure storage |
| Desktop app | Installer/update risk, local permissions, filesystem handling | Install/uninstall, updates, local storage, OS compatibility |
| AI-enabled app | Prompt injection, sensitive disclosure, excessive agency, unsafe output | Tool permissions, input/output validation, grounding, human oversight |

For unknown systems, inspect routes, menus, authentication roles, package manifests, API definitions, deployment files, and data models before assigning a type.
