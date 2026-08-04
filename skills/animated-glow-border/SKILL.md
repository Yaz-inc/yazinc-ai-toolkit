---
name: animated-glow-border
description: Add a polished, theme-aware rotating glow around cards, panels, certificates, or feature containers using CSS conic gradients. Use for animated borders, traveling light effects, reverse border motion, glowing card outlines, live UI demonstrations, or subtle emphasis on dark and light interfaces.
---

# Animated Glow Border

Add one reusable CSS border effect that belongs to the host design system and degrades safely.

## Workflow

1. Inspect the project theme. Identify the surface background, primary color, accent color, radius, and existing motion rules.
2. Choose bright arc colors for dark surfaces and saturated darker colors for light surfaces.
3. Apply the effect only to elements that need emphasis. Avoid turning a full interface into continuous visual noise.
4. Use a registered angle custom property, a conic gradient, and a masked pseudo-element so the gradient occupies only the border.
5. Keep content above the pseudo-element and make the effect ignore pointer events.
6. Add reverse motion with `animation-direction: reverse` when a paired or closing panel needs visual contrast.
7. Disable animation for `prefers-reduced-motion` and print.
8. Verify radius alignment, focus visibility, contrast, performance, and graceful static rendering.

## Core pattern

```css
:root {
  --glow-edge: #67e8f9;
  --glow-core: #8b5cf6;
}

@property --glow-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes glow-border-rotate {
  to { --glow-angle: 360deg; }
}

.glow-border {
  position: relative;
  isolation: isolate;
  border-radius: 24px;
}

.glow-border::after {
  content: "";
  position: absolute;
  z-index: 3;
  inset: -1px;
  padding: 2px;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from var(--glow-angle),
    transparent 0 28%,
    var(--glow-edge) 42%,
    var(--glow-core) 50%,
    var(--glow-edge) 58%,
    transparent 72% 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  filter: drop-shadow(0 0 7px color-mix(in srgb, var(--glow-edge) 70%, transparent));
  animation: glow-border-rotate 5s linear infinite;
}

.glow-border.reverse::after { animation-direction: reverse; }

@media (prefers-reduced-motion: reduce) {
  .glow-border::after { animation: none; }
}
```

## Application rules

- Match the pseudo-element radius to the host element.
- Prefer one to four continuously animated borders per viewport. For larger grids, animate on hover and keyboard focus, or activate the effect only for the selected category.
- Do not use a flag, color, glow, or motion as the only way to communicate meaning.
- Keep links and buttons fully clickable by setting `pointer-events: none` on the effect.
- Preserve the existing focus outline and never replace it with the decorative glow.
- Test browsers without `@property`; they should retain a clean static border.

## Completion evidence

- Theme tokens are reused instead of introducing unrelated colors.
- Normal and reverse directions render correctly.
- Reduced-motion mode stops rotation.
- Keyboard focus remains visible and all actions remain operable.
- The effect does not cover text, icons, or interactive controls.
- The page remains stable at mobile and desktop widths.

## Origin

Created by Yasir Ikram for Yaz Inc and generalized as a reusable public UI workflow.
