---
name: web-layout
description: Use when designing grids, spacing, composition, or responsive breakpoints for the portfolio, or when reviewing a layout for hierarchy, drift, and breakpoint discipline.
license: MIT
---

# Web layout

## Use when

- You are choosing between CSS Grid, Flexbox, or a hybrid for a section or component.
- You are defining or reviewing the spacing scale, base unit, and vertical rhythm.
- You are deciding how to guide the eye through a page or component.
- You are setting or auditing responsive breakpoints.
- A layout feels crowded, unstructured, or loses its order as the viewport changes.

## Core thesis

Layout is a set of intentional relationships between elements, not a collection of screen positions. A good layout reveals what belongs together, what comes first, and what the reader should look at next. Every margin, track, and breakpoint exists to reinforce those relationships.

## Grids

CSS Grid and Flexbox solve different problems. Use the tool whose natural model matches the relationship you are trying to express.

- Use CSS Grid when the layout is two-dimensional: rows and columns must align at the same time. Examples: card galleries, page shells, form fields with labels.
- Use Flexbox when the layout is one-dimensional: a single row or column of related items. Examples: navigation bars, button groups, centering an icon and a label.
- Keep the grid structure visible in the code. Name grid areas when the arrangement carries meaning; avoid anonymous magic numbers.
- Do not nest Flexbox containers more than necessary. Deep nesting turns alignment rules into a guessing game.
- Let the content define the track size when possible; fixed tracks are for known media or components.

## Whitespace

Whitespace is an active material, not a leftover. It separates, groups, and creates rhythm.

- Choose a base spacing unit and derive every value from it. For the portfolio, the base unit is 0.25rem (4px at the default font size).
- Use a spacing scale with named steps rather than arbitrary values. A small named scale such as 0.25rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem, and 4rem covers most cases.
- Assign margins, paddings, and gaps from the scale. A value such as `1.125rem` should have a reason if it is not on the scale.
- Use the same spacing value to show relationship and different values to show separation. Items that belong together sit closer than sections that belong apart.
- Do not chase visual balance by tweaking individual margins. If the rhythm looks wrong, change the scale step or the component structure, not one element at a time.

## Composition

Composition is the order in which the eye meets the content. A clear composition reduces the need for extra ornament.

- Establish one primary focal point per section. The reader should know the most important thing before anything else.
- Build hierarchy through size, weight, and position before adding color, borders, or motion.
- Place related elements close together and unrelated elements farther apart. Proximity is the strongest grouping signal.
- Align baselines and edges to a common structure. Misalignment by a few pixels breaks the sense that elements belong to the same system.
- Avoid visual noise. Every additional line, shadow, or label competes with the content. If an element does not add meaning, remove it.

## Responsive patterns

Breakpoints are content decisions, not device decisions. A breakpoint should appear when the layout stops working, not when a device list says it is time.

- Start with the smallest usable layout. Add the first breakpoint only when the small layout breaks or wastes space.
- Prefer a small set of breakpoints: a narrow, a mid, and a wide range. Additional breakpoints need a written reason.
- Use container queries when the component should respond to its own width, not the viewport. Viewport media queries are for page-level changes.
- Keep source order meaningful. The small-screen order should make sense on its own; do not rely on `order` properties to fix a broken reading sequence.
- Avoid breakpoint explosion. If a design needs more than five breakpoints, the layout is probably too fragile or too specific.

## Upstream

This skill consumes two upstream contracts:

- The master spec that chartered this foundation work: [`.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`](../../specs/2026-08-12-portfolio-premium-epic-spec.md).
- The umbrella taste skill this layout work supports: [`designing-premium-sites`](../designing-premium-sites/SKILL.md).

## Reference routes

| Concern | Read this |
|---|---|
| Which grid type fits this layout? | [references/grids.md](./references/grids.md) |
| What spacing scale and rhythm should I use? | [references/whitespace.md](./references/whitespace.md) |
| How do I build focal points and hierarchy? | [references/composition.md](./references/composition.md) |
| Which breakpoints or container queries should I use? | [references/responsive-patterns.md](./references/responsive-patterns.md) |

## Working rules

1. Break the grid only for a specific, defensible reason. The exception should be visible in the design and in the code.
2. Align every spacing, margin, and padding to the base unit or a named step on the scale.
3. Review a layout for drift by checking three things: are baselines aligned, do group boundaries match the spacing scale, and does the source order still make sense at the smallest breakpoint?
4. Add a breakpoint only after the layout fails at the current range. Do not add breakpoints for devices that are not part of the current problem.
