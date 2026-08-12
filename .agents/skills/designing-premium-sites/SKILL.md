---
name: designing-premium-sites
description: Use when designing, evaluating, or arguing about the quality of a developer portfolio site where the target feel needs to exceed the default $500 look.
license: MIT
---

# Designing premium sites

## Use when

- You need to decide whether a portfolio design choice is good enough for a premium feel.
- You are evaluating a proposed page, component, or design reference before adopting it.
- The term "premium" is being used without a shared definition.
- A later implementation phase will redesign the site and the foundation needs to record the taste target.

## Core thesis

A premium-feel developer portfolio is not about more visual noise. It is about the density of considered decisions: every unit of space, type, colour, motion, and asset earns its place. A $500 site looks assembled; a $10k site looks authored. The difference is not budget, it is restraint, hierarchy, and finish.

## Quality heuristics

### Typography
- Body text is comfortable to read: font loading is handled, line height is generous, the measure is constrained.
- Hierarchy is clear at a glance: no more than three distinct heading treatments, scale is intentional, and contrast between levels is greater than 2x.
- No "default" system font stack without an explicit reason.

### Layout
- Spacing is systematised, not eyeballed. Margins and paddings relate to a base unit.
- Whitespace is treated as an active design material, not leftover canvas.
- Composition uses a grid or strong implied structure; elements do not drift.

### Motion
- Motion is used to clarify state and focus, not to decorate.
- Every animation has a clear trigger and end state; no loops that cannot be stopped.
- `prefers-reduced-motion` is respected.

### Assets
- Images, icons, and fonts are chosen for quality, not quantity.
- Self-hosted or attribution-respecting sources only.
- No generic stock assets unless they are transformed into the site's voice.

### Accessibility
- Colour contrast is never an afterthought.
- Focus states are visible; keyboard navigation is tested.
- Alt text and labels are treated as content, not metadata.

### Performance
- The fastest way to look cheap is to load slowly. Critical content renders first; no layout shifts from late-loading assets.

## Reference routes

- For the philosophical foundation shared across the vendored sources, see [`references/foundation-principles.md`](./references/foundation-principles.md).
- For the concrete `$10k` versus `$500` taste checklist, see [`references/ten-k-vs-five-hundred.md`](./references/ten-k-vs-five-hundred.md).
- Future pattern skills: `design-tokens`, `typography-for-the-web`, `web-layout`, `motion-patterns`, `asset-custody`, `evaluating-design-references`.

## Working rules

1. Judge any design by what it subtracts as much as by what it adds.
2. Never trade accessibility or performance for a visual effect.
3. When in doubt, reduce.
4. Record the rationale for every non-default choice in the spec or code so the next agent does not have to re-derive it.
