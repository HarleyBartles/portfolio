---
name: motion-patterns
description: Use when adding or reviewing animation, hover transitions, viewport-triggered reveals, scroll-linked effects, or view transitions in the portfolio.
license: MIT
---

# Motion patterns

## Core thesis

Motion must explain state, hierarchy, or spatial relationship without taking control of scrolling or making content depend on animation. The current portfolio uses browser APIs plus CSS/styled-components; do not add a motion or smooth-scroll library merely to implement a routine effect.

## Current primitives

The shared motion values live in `src/client/src/styles/_tokens.scss` and are mapped through `portfolioTheme.ts`:

- `--duration-fast` / `theme.motion.fast`: short interaction feedback.
- `--duration-state` / `theme.motion.state`: larger state transitions.
- `--ease-out` / `theme.motion.easeOut`: the current shared easing.

Use transform and opacity for routine animated presentation. Do not invent a parallel duration/easing scale in component code.

See [references/motion-primitives.md](./references/motion-primitives.md).

## Viewport-triggered reveals

For a simple one-shot reveal, prefer `IntersectionObserver` to detect visibility and CSS/styled-components to animate the final-state change. Content must render meaningfully without the observer or animation.

Do not introduce a smooth-scroll controller for a reveal. Native browser scrolling remains authoritative.

See [references/scroll-reveals.md](./references/scroll-reveals.md).

## Scroll-linked effects

A passive scroll listener is not automatically scroll-jacking. It is acceptable for a bounded effect when all of these are true:

- the browser still owns scroll position and speed;
- work is gated to the relevant viewport region where practical;
- visual writes are scheduled with `requestAnimationFrame` rather than performed on every raw event;
- the effect uses compositor-friendly presentation such as transform;
- reduced motion resolves to a stable non-moving state; and
- the page remains understandable if the effect does not run.

`useSilkApertureParallax.ts` is a current example of that bounded pattern. Do not copy its complexity for a simple reveal.

## Reduced motion

The repository already has a global `prefers-reduced-motion: reduce` safeguard in `global.scss`. Components with motion-specific state or JavaScript must also ensure reduced motion produces the intended final state immediately and stops scroll-linked movement.

Use CSS media queries for CSS transitions and `window.matchMedia('(prefers-reduced-motion: reduce)')` where JavaScript needs the preference. See [references/reduced-motion.md](./references/reduced-motion.md).

## View transitions

Treat the browser View Transitions API as optional progressive enhancement, not as a current site-wide navigation contract. Use it only when a concrete state relationship earns it and the non-transition path is complete. See [references/view-transitions.md](./references/view-transitions.md).

## Working rules

1. Start with no animation; add motion only when it clarifies a state or relationship.
2. Keep browser-native scrolling in control. Never alter scroll speed, pin progress, or require synthetic scrolling for ordinary reading.
3. Reuse the current motion tokens before creating another shared timing value.
4. Keep essential content visible and usable when animation APIs fail or reduced motion is enabled.
5. Test the affected interaction with reduced motion and at the supported responsive/zoom boundaries from the portfolio design policy.

## Upstream

This skill supports [`../../doctrine/portfolio-design-policy.md`](../../doctrine/portfolio-design-policy.md) and the umbrella taste guidance in [`../designing-premium-sites/SKILL.md`](../designing-premium-sites/SKILL.md).
