---
name: vector-database-readiness
description: Assess and design vector search storage and retrieval across use cases, embeddings, metadata, indexing, filtering, scale, latency, recall, updates, deletion, tenant isolation, backup, and cost. Use before selecting or releasing a vector database or semantic search system.
---

# Vector Database Readiness

## Objective

Choose the lowest-complexity vector architecture that meets retrieval quality, security, operations, and growth needs.

## Workflow

1. Define search tasks, corpus size, update rate, query volume, latency, recall, filtering, tenancy, residency, and recovery requirements.
2. Compare an existing relational extension, dedicated vector engine, search platform, and managed service using measured needs.
3. Select embedding dimensions, distance metric, normalization, chunk identifiers, metadata schema, and versioning strategy.
4. Benchmark exact and approximate indexes with representative data, filters, cold starts, updates, and concurrent queries.
5. Test recall, latency percentiles, storage, rebuild time, deletion propagation, duplicate handling, and embedding migrations.
6. Verify tenant isolation, authorization before retrieval, encryption, backups, restores, observability, and failure recovery.
7. Document vendor exit, re-embedding cost, index rebuild procedure, capacity thresholds, and the final decision.

## Safety and authorization

- Do not select a vector database from benchmark headlines or model popularity alone.
- Never rely on metadata filtering as the only authorization control without verified tenant scoping.
- Treat embeddings and retrieved chunks as potentially sensitive data subject to the source content policy.

## Evidence and completion

- Record scope, versions, datasets, environments, assumptions, exclusions, and authorization.
- Preserve aggregate metrics and sanitized failure examples needed to reproduce conclusions.
- Separate measured results, evaluator judgments, human judgments, and inference.
- State release thresholds, residual risk, and the first remaining corrective action.

## Sources

- [pgvector](https://github.com/pgvector/pgvector)
- [Qdrant](https://github.com/qdrant/qdrant)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
