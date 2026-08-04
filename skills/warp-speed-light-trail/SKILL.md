---
name: warp-speed-light-trail
description: Add a premium, canvas-based warp speed light trail animation to the background of any dark UI section, footer, or hero area. Replicates the high-end particle acceleration effect seen on modern enterprise sites using HTML5 Canvas and requestAnimationFrame.
---

# Warp Speed Light Trail

Add a highly polished, performant Canvas 2D particle animation that creates the illusion of curved light trails zooming past the viewer. This effect elevates dark-mode interfaces, footers, and premium CTA sections.

## Workflow

1. Identify a dark container (e.g., `#0a0118` or deep black) where the effect will live. The host container must have `position: relative` and `overflow: hidden`.
2. Inject a `<canvas>` element inside an absolute wrapper that spans the full width and height of the container.
3. Ensure the canvas wrapper has `pointer-events: none` and `z-index: 0` so it sits behind text and buttons without blocking interactions.
4. Apply `mix-blend-mode: screen` or `mix-blend-mode: normal` to the canvas to ensure colors pop against the dark background.
5. Use a standard `requestAnimationFrame` loop to manage a pool of particle objects (stars/lines).
6. Respect `prefers-reduced-motion` by either stopping the animation loop or reducing the speed significantly.
7. Tie the particle colors to the project's design system (e.g., primary purple and secondary cyan).

## Core pattern (React / Next.js)

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function WarpSpeedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Setup
    const particles: any[] = [];
    const particleCount = 100;
    const colors = ['#7C3AED', '#06B6D4', '#A855F7']; // Brand colors

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation Loop
    const draw = () => {
      // Create trailing effect by drawing a semi-transparent black rectangle
      ctx.fillStyle = 'rgba(10, 1, 24, 0.2)'; // Match parent background
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        // Slight curve math for the "warp" feel
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = p.opacity;
        ctx.stroke();

        // Move particle
        if (!isReducedMotion) {
          p.x += p.speed;
        } else {
          p.x += p.speed * 0.1; // Slow down for accessibility
        }

        // Reset particle when it goes off screen
        if (p.x > width) {
          p.x = -p.length;
          p.y = Math.random() * height;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}
```

## Application rules

- Place `<WarpSpeedCanvas />` as the first child of the relative container.
- Ensure the background color drawn in `ctx.fillStyle` inside the animation loop EXACTLY matches the background of the parent container to create a smooth trailing effect without washing out the colors.
- Adjust `particleCount` based on the height of the container (use fewer particles for smaller headers, more for tall footers).
- Do not apply this to light-themed containers; the additive blending and trail logic is optimized for dark mode.
- Do not overlap the canvas heavily with readable text unless the text has a strong `text-shadow` or is enclosed in a glassmorphic card.

## Completion evidence

- The canvas element sizes correctly to its container.
- Particles animate smoothly horizontally with a trailing light effect.
- The animation pauses or slows down if the OS has reduced motion enabled.
- Text, links, and buttons sitting above the canvas remain fully interactive (`pointer-events: none` on canvas).
- Window resizing does not stretch or distort the canvas pixels.

## Origin

Created by Yasir Ikram for Yaz Inc, inspired by premium enterprise SaaS animations, and generalized as a reusable public UI workflow.
