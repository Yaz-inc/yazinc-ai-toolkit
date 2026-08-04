---
name: nosql-query-engineering
description: Design and validate data models and complex queries for document, search, key-value, cache, and related NoSQL systems, including aggregation, indexing, consistency, partitioning, authorization, and operational tradeoffs. Use when relational assumptions do not fit the selected store.
---

# NoSQL Query Engineering

## Objective

Make access patterns explicit and choose a model that remains correct, secure, and operable at expected scale.

## Workflow

1. Identify the engine, version, workload, entities, access patterns, consistency needs, query shapes, scale, retention, and tenant boundaries.
2. Model documents, keys, indexes, mappings, denormalization, references, and partition strategy around verified access patterns.
3. Define atomicity, concurrency, retries, idempotency, cache invalidation, and conflict behavior.
4. Build bounded queries or aggregation pipelines and validate filters, projections, sorting, pagination, time ranges, and missing fields.
5. Inspect query plans or engine diagnostics for index use, fan-out, scans, hot partitions, memory, and result limits.
6. Test schema evolution, malformed documents, partial updates, deletion, failover, and cross-tenant authorization.
7. Document consistency tradeoffs, operational limits, backup and restore, migration, and vendor exit.

## Safety and authorization

- Do not treat schemaless storage as validation-free storage.
- Do not place authorization solely in client-side filters or query metadata.
- Review each source license and hosted-service data flow before adoption.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [MongoDB](https://github.com/mongodb/mongo)
- [Elasticsearch](https://github.com/elastic/elasticsearch)
- [Redis](https://github.com/redis/redis)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
