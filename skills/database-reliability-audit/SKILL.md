---
name: database-reliability-audit
description: Audit relational database integrity, constraints, transactions, concurrency, indexes, backups, restores, retention, observability, and recovery readiness. Use for production-readiness reviews, migration planning, data-risk assessments, or recurring database health checks.
---

# Database Reliability Audit

## Objective

Verify that the database preserves correct data and can recover predictably from failures.

## Workflow

1. Identify the engine, version, topology, dataset size, workload, recovery objectives, maintenance model, and schema-change boundaries.
2. Map critical tables, keys, constraints, relationships, ownership fields, tenant boundaries, and high-value invariants.
3. Check missing or inconsistent constraints, orphaned rows, duplicates, invalid states, null behavior, and transaction boundaries.
4. Review indexes, query patterns, locks, deadlocks, long transactions, connection limits, replication, and storage growth.
5. Inspect backup schedules, encryption, retention, monitoring, and access. Verify restore evidence in an isolated target.
6. Test failure and recovery scenarios proportionate to risk, including partial writes, retries, job re-entry, and service interruption.
7. Report recovery readiness, data defects, capacity risks, owners, and prioritized corrective actions.

## Safety and authorization

- Use read-only queries by default and obtain explicit approval for repairs, schema changes, restores, or production load.
- Never expose connection strings, database dumps, personal data, or encryption material.
- A backup is not verified until a restore has succeeded and application-level integrity has been checked.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [SQLFluff](https://github.com/sqlfluff/sqlfluff)
- [DuckDB](https://github.com/duckdb/duckdb)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
