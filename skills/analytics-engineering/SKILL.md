---
name: analytics-engineering
description: Design tested analytics transformations, staging layers, dimensions, facts, semantic metrics, documentation, freshness controls, and reproducible builds. Use when turning operational data into trusted reporting and decision datasets.
---

# Analytics Engineering

## Objective

Create understandable analytics models with stable grain, tested relationships, and governed business definitions.

## Workflow

1. Define stakeholders, decisions, business processes, source systems, refresh needs, historical behavior, and metric ownership.
2. Profile sources and document contracts, keys, event time, load time, late data, deletions, and known quality issues.
3. Create staging models that preserve source meaning, then build dimensions and facts with explicit grain and conformed keys.
4. Define metrics once with owners, formulas, filters, units, timezone, currency, and effective dates.
5. Add tests for uniqueness, not-null, relationships, accepted values, freshness, volume, and high-value business invariants.
6. Build incrementally and idempotently, support backfills, and verify totals against source systems.
7. Publish lineage, documentation, exposures, quality status, release notes, and rollback for breaking changes.

## Safety and authorization

- Do not redefine business metrics without owner approval and versioned impact analysis.
- Do not use production extracts containing unnecessary personal data for development.
- Treat dashboards as downstream consumers that require contract and regression checks.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [dbt Core](https://github.com/dbt-labs/dbt-core)
- [DuckDB](https://github.com/duckdb/duckdb)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
