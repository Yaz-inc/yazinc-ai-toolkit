---
name: rag-evaluation
description: Evaluate retrieval-augmented generation systems across ingestion, chunking, indexing, retrieval, reranking, context precision, context recall, faithfulness, answer relevance, citations, freshness, and tenant isolation. Use for RAG development and release gates.
---

# RAG Evaluation

## Objective

Determine whether retrieval supplies the right evidence and whether the model uses that evidence truthfully.

## Workflow

1. Define the knowledge scope, users, authorization model, source freshness, answer expectations, and harmful failure cases.
2. Create a versioned evaluation set with questions, expected evidence, answer criteria, unanswerable cases, and access-boundary cases.
3. Measure ingestion completeness, chunk quality, metadata accuracy, duplicate content, deletion propagation, and index freshness.
4. Evaluate retrieval recall and precision at useful cutoffs, filters, reranking, latency, and cross-tenant isolation.
5. Evaluate answer faithfulness, relevance, citation support, uncertainty, refusal on missing evidence, and conflict handling.
6. Segment results by source, language, question type, freshness, tenant, and difficulty to avoid misleading averages.
7. Trace failures to ingestion, chunking, embeddings, retrieval, reranking, prompting, generation, or policy and retest the corrected layer.

## Safety and authorization

- Never place confidential documents in external evaluation services without approved data processing and access controls.
- Do not let generated answers substitute for source-grounded expected evidence in high-risk domains.
- Test deletion, retention, and tenant isolation before treating a RAG system as production-ready.

## Evidence and completion

- Record scope, versions, datasets, environments, assumptions, exclusions, and authorization.
- Preserve aggregate metrics and sanitized failure examples needed to reproduce conclusions.
- Separate measured results, evaluator judgments, human judgments, and inference.
- State release thresholds, residual risk, and the first remaining corrective action.

## Sources

- [Ragas](https://github.com/vibrantlabsai/ragas)
- [Promptfoo](https://github.com/promptfoo/promptfoo)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
