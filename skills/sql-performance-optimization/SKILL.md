---
name: sql-performance-optimization
description: Diagnose and improve SQL performance using query plans, cardinality, indexes, statistics, partitioning, join strategy, locks, caching, workload evidence, and regression tests. Use when queries are slow, expensive, blocking, or unstable.
---

# SQL Performance Optimization

## Objective

Reduce user-visible latency and resource cost without changing query meaning or creating harmful write overhead.

## Workflow

1. Capture the exact query, parameters, engine version, schema, indexes, data volumes, concurrency, cache state, and observed latency distribution.
2. Establish a reproducible baseline with result correctness, plan, rows examined, I/O, CPU, memory, locks, and timing.
3. Inspect cardinality estimates, access paths, join order, sorts, spills, scans, filters, functions, and repeated work.
4. Evaluate query rewrites, targeted indexes, statistics, partition pruning, precomputation, or model changes one at a time.
5. Measure benefits and costs under representative parameters, cold and warm conditions, and concurrent workload.
6. Check write amplification, storage, maintenance, deadlocks, plan regressions, and alternate query patterns.
7. Document the chosen change, before and after evidence, rollback, monitoring threshold, and rejected options.

## Safety and authorization

- Do not add indexes or database settings directly in production without workload review and rollback.
- Do not use production-wide cache clearing or uncontrolled full scans for benchmarking.
- Preserve result equivalence and test parameter-sensitive plans.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [SQLFluff](https://github.com/sqlfluff/sqlfluff)
- [DuckDB](https://github.com/duckdb/duckdb)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
