---
name: motion-patterns
description: Use when adding or reviewing animation, scroll reveals, view transitions, hover states, or any motion for the portfolio.
license: MIT
---

# Motion patterns

## Use when

- You are adding a scroll reveal, view transition, hover state, or entrance animation.
- You are reviewing an animation for clarity, performance, or accessibility.
- You need to choose a duration, easing, or transform for a motion.
- A motion effect feels decorative, slow, or distracting.
- You are deciding whether a page transition should be same-document or cross-document.

## Core thesis

Motion is a way to explain state. It tells the reader what changed, where focus moved, or what will happen next. If the motion does not answer one of those questions, it is noise. Good motion is fast, purposeful, and reversible.

## Motion primitives

The portfolio uses the `motion` library for React. Do not import from `framer-motion`.

Use the design-token motion values for timing. Use transform and opacity for the animation properties. Other properties force layout and paint and will not stay smooth.

- **Duration** is measured against the task. A hover or small feedback is `duration-150`. A reveal is `duration-300`. A page-level or large state change is `duration-500`.
- **Easing** sets the feel. `ease-out` is for entrances and hover because it starts fast and settles. `ease-in` is for exits. `ease-in-out` is for symmetric state swaps such as a toggle.
- **Stagger** is a sequence delay, not a longer animation. Use `delay-75`, `delay-100`, or `delay-150` from the token set. Stagger no more than six related items; beyond that, the reader stops seeing a pattern.
- **Transform choice** keeps the GPU path. Translate, scale, rotate, and opacity are the only routine choices. Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, or `filter` in real time.

For the full timing tables, see [references/motion-primitives.md](./references/motion-primitives.md).

## Scroll reveals

Reveal an element when it enters the viewport for the first time. Do not reveal every element on the page. Reveal section headings, card groups, and primary content blocks. Skip static backgrounds, dividers, and content already above the fold on first load.

Use `IntersectionObserver` or the `useInView` hook from `motion`. Trigger the animation once per element. Do not drive animation from the `scroll` event; that creates scroll jacking and drops frames.

Keep the reveal small: `translateY` of 16px to 32px paired with an opacity change is enough. Larger distances draw attention to the motion instead of the content. A longer duration feels slow. `duration-300` with `ease-out` is the default. Stagger groups by `delay-75` if the items belong to the same block.

For the full rules, see [references/scroll-reveals.md](./references/scroll-reveals.md).

## View transitions

View Transitions make a change look continuous. Use them only when the change itself is meaningful, such as opening a detail, swapping a tab, or navigating to a new page with a persistent element.

- **Same-document** transitions use `document.startViewTransition(() => updateDOM())`. The callback must change the DOM. Pair the old and new elements with the same `view-transition-name` to create a shared-element morph.
- **Cross-document** transitions use the `@view-transition` at-rule: `@view-transition { navigation: auto; }`. Control per-page behaviour with the `pageswap` and `pagereveal` events. This requires a multi-page app, not a single-page router that emulates navigation.

If the API is not available, the change should still work as a normal state or page load. Respect `prefers-reduced-motion: reduce` before running any view transition.

For the full rules, see [references/view-transitions.md](./references/view-transitions.md).

## Reduced motion

The default story is reduce. If a user has not asked for motion, do not make them opt out. The reduce path must be a clean, instant state change, not a shortened or muted version of the same animation.

Check `prefers-reduced-motion: reduce` with a media query or let `motion` respect the setting through `reducedMotion="user"`. In the reduced path, set duration to `0ms` and skip stagger. This is the baseline. Add motion only when the preference allows it.

For the implementation details, see [references/reduced-motion.md](./references/reduced-motion.md).

## Upstream

This skill consumes two upstream contracts:

- The master spec that chartered this foundation work: [`.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`](../../specs/2026-08-12-portfolio-premium-epic-spec.md).
- The umbrella taste skill this motion work supports: [`designing-premium-sites`](../designing-premium-sites/SKILL.md).

## Reference routes

| Concern | Read this |
|---|---|
| What are the timing, easing, and transform rules? | [references/motion-primitives.md](./references/motion-primitives.md) |
| How should scroll reveals work? | [references/scroll-reveals.md](./references/scroll-reveals.md) |
| How do I implement same-document or cross-document transitions? | [references/view-transitions.md](./references/view-transitions.md) |
| How do I respect reduced motion and what is the fallback? | [references/reduced-motion.md](./references/reduced-motion.md) |

## Working rules

1. An animation earns its place only if it explains a state or focus change. Decorative motion is noise.
2. Pair every entrance with an exit or completion. Do not leave elements half-animated.
3. Default to the reduced path. Add motion only when the user has not asked for reduced motion.
4. Test by toggling `prefers-reduced-motion: reduce` in DevTools or the OS, not in a browser theater mode.
5. Keep motion off the critical path. If the animation fails, the content and navigation must still work.
