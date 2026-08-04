---
name: frontend-quality-gate
description: Define and enforce frontend quality budgets for performance, responsive behavior, SEO, best practices, console errors, network failures, and regression evidence. Use for web release gates and recurring quality monitoring.
---

# Frontend Quality Gate

## Objective

Prevent user-visible frontend regressions through measurable budgets and reproducible evidence.

## Workflow

1. Identify critical pages, devices, networks, browsers, authenticated states, third-party scripts, and business journeys.
2. Establish representative baselines for loading, interaction, layout stability, asset weight, errors, and key rendering milestones.
3. Define page-specific budgets and distinguish laboratory measurements from field data.
4. Run repeatable audits in stable conditions and capture build, environment, cache, and device context.
5. Investigate regressions by asset, request chain, rendering work, JavaScript execution, caching, and third-party impact.
6. Verify corrections across responsive breakpoints and core journeys, not only the home page.
7. Add CI thresholds with sensible variance and preserve reports for trend comparison.

## Safety and authorization

- Do not treat a single synthetic score as complete user experience evidence.
- Do not weaken budgets merely to make a failing pipeline pass without a documented decision.
- Keep analytics, cookies, and captured pages free of unnecessary personal or session data.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
