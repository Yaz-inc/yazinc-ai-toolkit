---
name: design-to-code-implementation
description: Implement approved Figma, Canva-derived assets, screenshots, prototypes, or written UI specifications as maintainable production interfaces. Use for design handoff, responsive frontend work, component mapping, visual fidelity, interaction states, accessibility, browser verification, or closing gaps between a design and its running implementation.
---

# Design to Code Implementation

## Objective

Translate design intent into accessible, responsive, maintainable code that fits the existing application architecture and behaves correctly with real data.

## Workflow

1. Inspect the repository, framework, design system, routes, data contracts, existing components, browser targets, and build process before selecting an implementation approach.
2. Inspect the complete design source. Capture dimensions, grids, tokens, assets, breakpoints, component variants, states, motion, content rules, and annotations. Flag missing behavior instead of inventing high-risk decisions silently.
3. Map design elements to existing components and tokens. Reuse supported primitives before adding new dependencies or parallel styling systems.
4. Implement semantic structure first, then layout, typography, color, imagery, interaction, responsive behavior, and motion.
5. Cover default, hover, focus, active, selected, disabled, loading, empty, validation, error, permission, offline, success, and destructive states where applicable.
6. Test with representative short, long, missing, localized, and high-density content. Verify keyboard use, screen-reader semantics, zoom, reflow, contrast, reduced motion, and touch targets.
7. Compare the running interface with the approved design at relevant viewports. Fix meaningful visual and behavioral differences without sacrificing accessibility or maintainability.
8. Run project linting, tests, build checks, and browser verification. Record intentional deviations and their rationale.

## Decision rules

- Treat the design as intent, not permission to break semantics, security, accessibility, or existing product behavior.
- Prefer CSS and existing assets for interface visuals. Use raster generation only when the required output is genuinely bitmap artwork.
- Do not hardcode data, secrets, environment-specific URLs, or one-off dimensions that fail at nearby viewport sizes.
- Preserve server-side authorization. Hiding an interface control is not an access-control implementation.
- Avoid new packages when the existing stack can implement the design cleanly.

## Completion evidence

- Implemented routes or components and their mapped design sources.
- Screenshots or visual comparisons at target viewports.
- Keyboard and accessibility results for critical journeys.
- Lint, test, build, and browser results.
- Documented deviations, assumptions, and unresolved issues.

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Original workflow, no third-party code bundled.
- **Commit:** Not applicable.
- **Extracted:** 2026-08-04
