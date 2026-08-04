---
name: data-pipeline-orchestration
description: Design, implement, and review resilient data pipelines with scheduling, dependencies, idempotency, retries, backfills, checkpoints, quality gates, observability, ownership, and recovery. Use for ETL, ELT, batch, event, and analytics workflows.
---

# Data Pipeline Orchestration

## Objective

Ensure pipeline reruns and failures produce predictable, traceable, and recoverable outcomes.

## Workflow

1. Map sources, destinations, owners, schedules, dependencies, service objectives, data contracts, and failure impact.
2. Break the workflow into bounded idempotent tasks with explicit inputs, outputs, state, and completion markers.
3. Define retries, timeouts, concurrency, rate limits, checkpoints, deduplication, late data, and backfill behavior.
4. Place schema, quality, reconciliation, and freshness gates before publishing downstream data.
5. Use least-privilege credentials and separate development, staging, and production configuration.
6. Emit structured logs, metrics, lineage, run identifiers, alerts, and operator-ready failure context.
7. Test partial failure, rerun, duplicate events, dependency outage, backfill, cancellation, and recovery before release.

## Safety and authorization

- Do not make retrying a task duplicate or corrupt downstream data.
- Do not put credentials or personal payloads in orchestration metadata, logs, or task arguments.
- Require explicit approval for production backfills, destructive cleanup, or wide reprocessing.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [Apache Airflow](https://github.com/apache/airflow)
- [Dagster](https://github.com/dagster-io/dagster)
- [Prefect](https://github.com/PrefectHQ/prefect)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
