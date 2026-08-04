---
name: performance-load-testing
description: Plan and execute load, stress, spike, soak, capacity, and API performance tests with controlled traffic, service-level thresholds, bottleneck evidence, and safe release decisions. Use when response time, throughput, concurrency, or scalability matters.
---

# Performance Load Testing

## Objective

Measure realistic system behavior under load and identify the first limiting resource without harming shared systems.

## Workflow

1. Define the authorized target, environment, user journeys, workload model, concurrency, data volume, service objectives, and stop conditions.
2. Establish a low-load baseline and verify that scripts measure the intended behavior rather than cached or failed responses.
3. Model ramp-up, steady state, spikes, endurance, and recovery using realistic think time and data variation.
4. Monitor application, database, queue, cache, network, and infrastructure metrics during each run.
5. Correlate latency percentiles, throughput, errors, saturation, resource use, and downstream dependencies.
6. Stop on safety thresholds, investigate bottlenecks, apply one change at a time, and repeat the comparable test.
7. Report capacity, confidence limits, bottlenecks, invalid runs, and recommended operating headroom.

## Safety and authorization

- Never load-test production or third-party systems without explicit written authorization and coordinated monitoring.
- Do not use real customer credentials or generate uncontrolled billable traffic.
- Set request ceilings, timeouts, emergency stops, and cleanup for generated data.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Grafana k6](https://github.com/grafana/k6)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
