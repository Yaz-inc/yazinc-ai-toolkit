---
name: data-reconciliation-migration
description: Plan and verify data migrations, imports, exports, corrections, and system synchronization using counts, keys, hashes, aggregates, referential checks, exception reports, cutover controls, and rollback. Use whenever data moves or changes at scale.
---

# Data Reconciliation Migration

## Objective

Prove that every authorized source record is accounted for and that destination meaning matches the source.

## Workflow

1. Define source and destination ownership, schemas, grain, scope, mappings, exclusions, cutover window, recovery objectives, and acceptance criteria.
2. Snapshot or back up source and destination state and record counts, checksums, key ranges, and high-value aggregates.
3. Create explicit field mappings, transformations, default rules, identifier strategy, timezone handling, and rejection behavior.
4. Dry-run on representative data and produce row-level exceptions without exposing unnecessary sensitive fields.
5. Execute in idempotent batches with checkpoints, rate limits, retry rules, logging, and a tested stop procedure.
6. Reconcile totals, distinct keys, hashes, aggregates, relationships, duplicates, missing rows, rejected rows, and application behavior.
7. Obtain owner approval, preserve evidence, monitor after cutover, and retain rollback until the agreed stability window closes.

## Safety and authorization

- Never migrate the only copy of data or run an irreversible correction without backup and restore evidence.
- Do not hide rejected, transformed, merged, or defaulted records.
- Use transactions or compensating actions appropriate to scale and engine behavior.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [Pandas](https://github.com/pandas-dev/pandas)
- [Polars](https://github.com/pola-rs/polars)
- [Great Expectations](https://github.com/fivetran/great_expectations)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
