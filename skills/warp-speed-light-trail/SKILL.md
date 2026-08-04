---
name: warp-speed-light-trail
description: Build a premium Canvas 2D warp-speed background with mirrored light trails confined to the left and right edges and a protected dark center for readable content. Use for dark SaaS footers, CTA bands, and hero sections that need perspective streaks, edge-weighted motion, responsive rendering, and reduced-motion support.
---

# Warp Speed Light Trail

Create two mirrored perspective light fields around a deliberately quiet center. Treat the center as a protected reading corridor, not as part of the particle field.

Use the Airbyte pricing footer as a visual composition reference: `https://airbyte.com/pricing`. Reproduce the general geometry and motion behavior only. Do not copy proprietary source code, assets, branding, or exact visual values.

## Non-negotiable visual contract

- Keep the central 42 to 50 percent of the section dark, calm, and effectively free of trails on desktop.
- Widen the protected center to roughly 54 to 62 percent on narrow screens.
- Render separate left and right particle groups. Mirror their geometry so the result feels balanced.
- Start visible streaks near the protected-center boundaries and accelerate them toward the outer edges.
- Use perspective rays with slight curvature, varied lengths, and tapered opacity. Do not use uniform horizontal lines.
- Concentrate most streaks near the sides. Allow only a soft fade near the center boundary.
- Use mostly dim neutral-purple trails with occasional brand-purple or cyan highlights.
- Keep content above the animation with a dark center overlay and strong contrast.

Reject an implementation when lines cross behind central text, particles travel across the full canvas, both sides move in the same screen direction, or the entire background has uniform brightness.

## Workflow

1. Inspect the existing section, layout system, colors, breakpoints, script organization, and motion conventions.
2. Preserve the current stack. Do not introduce React, WebGL, or another dependency solely for this effect when Canvas 2D fits.
3. Add one decorative canvas inside an absolute, non-interactive wrapper. Keep semantic content in normal document flow above it.
4. Define the protected center as a ratio of canvas width, not a hard-coded pixel width.
5. Generate each particle with a side value of `-1` or `1`, a progress value, a target edge position, a trail span, a speed, an opacity, and a color.
6. Project each particle from its side of the center corridor toward its matching outer edge. Accelerate progress with an easing exponent such as `progress ** 1.5`.
7. Apply both geometry and CSS masking. Geometry keeps trails out of the center, while masking creates a soft transition.
8. Add a separate dark center overlay above the canvas and below the content. Do not rely on canvas opacity alone.
9. Cap device pixel ratio at `2`, recalculate on resize, and scale particle count with the rendered width.
10. Stop the animation for `prefers-reduced-motion: reduce` and render one stable frame.
11. Verify desktop and mobile screenshots, multiple animation frames, console output, content contrast, and pointer interaction.

## Required structure

```html
<footer class="warp-section">
  <div class="warp-field" aria-hidden="true">
    <canvas class="warp-canvas"></canvas>
  </div>
  <div class="warp-content">...</div>
</footer>
```

```css
.warp-section {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #050109;
}

.warp-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(90deg, #000 0 22%, transparent 43% 57%, #000 78% 100%);
  mask-image: linear-gradient(90deg, #000 0 22%, transparent 43% 57%, #000 78% 100%);
}

.warp-section::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(5,1,9,.45) 28%, #050109 43% 57%, rgba(5,1,9,.45) 72%, transparent);
}

.warp-content { position: relative; z-index: 2; }
.warp-canvas { display: block; width: 100%; height: 100%; }
```

Adapt class names and colors to the project instead of pasting a competing style system.

## Perspective geometry

Use separate start and edge coordinates for each side:

```js
const safeHalf = width * (width < 700 ? 0.30 : 0.235);
const startX = width * 0.5 + particle.side * safeHalf;
const edgeX = particle.side < 0 ? -width * 0.08 : width * 1.08;
const eased = Math.max(0, progress) ** 1.55;

const x = startX + (edgeX - startX) * eased;
const y = particle.originY + (particle.targetY - particle.originY) * eased;
```

Draw from `progress - tailSpan` to `progress`. Use a transparent-to-color gradient, modest glow, and increasing line width toward the edge. Reset a particle only after its head passes its own outer edge.

Default to outward motion because it creates the expanding warp effect. Reverse the progress direction only when the approved reference clearly requires inward motion. Never let both particle groups drift left-to-right across the whole section.

## Performance and accessibility

- Use `requestAnimationFrame` and time-based movement.
- Reuse a bounded particle pool instead of allocating particles every frame.
- Cap the pool at a practical range such as 40 to 90 particles.
- Cap device pixel ratio at `2` to control GPU and memory cost.
- Use `ResizeObserver` or a debounced resize handler.
- Keep the wrapper at `pointer-events: none` and `aria-hidden="true"`.
- Render a static frame and stop scheduling frames when reduced motion is requested.
- Avoid logging animation data or adding third-party tracking.

## Acceptance checks

- Confirm that the center remains visually dark in several non-consecutive frames.
- Confirm that no visible line crosses the central content corridor.
- Confirm that left-side particles terminate at the left edge and right-side particles terminate at the right edge.
- Confirm balanced visual density without exact mirroring that looks mechanical.
- Confirm that text and controls remain readable, selectable, and interactive.
- Confirm correct canvas sizing after desktop and mobile resizes.
- Confirm no horizontal page overflow and no browser console errors.
- Confirm that reduced-motion mode stops continuous animation.
- Capture desktop and narrow-screen evidence before declaring completion.

## Origin

Created by Yasir Ikram for Yaz Inc. Refined from implementation testing using the Airbyte pricing footer as an external visual reference, then generalized into an original, reusable Canvas 2D workflow.
