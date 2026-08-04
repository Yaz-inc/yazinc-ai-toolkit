---
name: sql-query-engineering
description: Design, explain, validate, and safely execute complex SQL involving joins, CTEs, window functions, recursive logic, aggregates, pivots, dates, reconciliation, and controlled writes across SQL dialects. Use for analysis, reporting, data fixes, or backend query development.
---

# SQL Query Engineering

## Objective

Produce correct, readable, dialect-aware SQL whose results are independently validated.

## Workflow

1. Confirm the engine, version, schema, grain, relationships, timezone, collation, null semantics, permissions, and desired output.
2. Restate the question as explicit inputs, filters, grouping, expected cardinality, edge cases, and invariants.
3. Build the query in inspectable layers using named CTEs or views and qualify ambiguous columns.
4. Validate joins for one-to-one, one-to-many, many-to-many, missing-key, duplicate-key, and null behavior.
5. Test on bounded data and compare counts, totals, samples, and an independent calculation.
6. Inspect the plan before expensive execution and parameterize user-controlled values.
7. For writes, preview affected rows, use a transaction, preserve before-state evidence, verify row counts, and keep rollback.

## Safety and authorization

- Use read-only access by default and obtain approval for data modification, locks, long scans, or production execution.
- Never concatenate untrusted input into SQL or expose connection credentials in commands.
- Do not approve a result solely because the query runs. Validate its business meaning and grain.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [SQLGlot](https://github.com/tobymao/sqlglot)
- [SQLFluff](https://github.com/sqlfluff/sqlfluff)
- [DuckDB](https://github.com/duckdb/duckdb)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
