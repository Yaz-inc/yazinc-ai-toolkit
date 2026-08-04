---
name: big-data-analytics
description: Select and operate scalable analytics workflows for datasets that exceed practical single-process memory or runtime limits using distributed or parallel computation. Use for large batch, streaming, iterative, or partitioned analysis.
---

# Big Data Analytics

## Objective

Scale only when measured data and workload justify the operational complexity.

## Workflow

1. Measure data size, file count, partitions, skew, growth, query pattern, latency target, memory, compute, network, and cost constraints.
2. Prototype the logic on sampled data with a local dataframe or analytical database and establish correctness.
3. Choose Polars, Dask, Spark, or another approved engine based on scale, team skills, deployment, streaming, connectors, and operations.
4. Design partitioning, file formats, schemas, joins, shuffles, caching, checkpoints, and incremental processing.
5. Test skew, small files, serialization, retries, worker loss, partial output, duplicate processing, and backfills.
6. Monitor job stages, spill, memory, shuffle, I/O, executor failures, cost, and output quality.
7. Reconcile distributed output against the validated sample and document capacity, recovery, and simpler fallback paths.

## Safety and authorization

- Do not introduce a cluster when DuckDB, Polars, or bounded SQL can meet the requirement.
- Keep secrets out of job configuration and protect temporary storage, logs, and checkpoints.
- Limit test scale and cloud spend with quotas, timeouts, and explicit teardown.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [Apache Spark](https://github.com/apache/spark)
- [Dask](https://github.com/dask/dask)
- [Polars](https://github.com/pola-rs/polars)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
