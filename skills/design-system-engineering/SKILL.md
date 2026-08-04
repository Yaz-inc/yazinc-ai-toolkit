---
name: design-system-engineering
description: Create, audit, or synchronize design tokens, reusable components, variants, documentation, and code across design tools and product repositories. Use for Figma libraries, frontend component libraries, typography and color systems, responsive foundations, theming, governance, design-code parity, or reducing inconsistent UI patterns.
---

# Design System Engineering

## Objective

Build a governed system of reusable decisions and components that keeps design and production code consistent, accessible, and economical to maintain.

## Workflow

1. Inventory current tokens, styles, components, duplicated patterns, platforms, consumers, ownership, release process, and known accessibility gaps.
2. Define foundations using semantic tokens for color, typography, spacing, sizing, radius, elevation, motion, breakpoints, and focus. Separate raw values from intent-based aliases.
3. Define component anatomy, properties, variants, states, responsive behavior, content constraints, keyboard behavior, semantics, and accessibility acceptance criteria.
4. Map Figma variables and components to code tokens and components with stable names. Record unavoidable differences explicitly.
5. Implement the smallest useful set first. Prioritize frequently reused primitives and high-risk form, navigation, feedback, overlay, and data-display components.
6. Document usage, composition, content guidance, anti-patterns, migration examples, ownership, and deprecation policy near the maintained source.
7. Test visual states, themes, responsive behavior, keyboard operation, contrast, zoom, reduced motion, and API compatibility.
8. Release with versioning, migration notes, consumer verification, and rollback guidance proportionate to the change.

## Governance rules

- Add a component or variant only when a recurring product need justifies its maintenance cost.
- Prefer semantic tokens over direct color or spacing values in product code.
- Do not fork the system for a one-page visual preference. Document exceptions with an owner and retirement plan.
- Treat breaking token or component changes as product API changes.
- Keep brand expression flexible while maintaining usability and WCAG 2.2 Level AA targets.

## Completion evidence

- Token and component inventories with canonical ownership.
- Design-to-code mapping and parity exceptions.
- Tested variants, states, themes, and accessibility behavior.
- Version, migration notes, affected consumers, and release result.
- Deprecation and governance decisions for duplicated patterns.

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Original workflow, no third-party code bundled.
- **Commit:** Not applicable.
- **Extracted:** 2026-08-04
