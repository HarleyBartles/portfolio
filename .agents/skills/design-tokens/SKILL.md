---
name: design-tokens
description: Use when creating, naming, or consuming design tokens for the portfolio, deciding whether a value should be a token or hard-coded, or converting tokens to Tailwind v4 @theme.
license: MIT
---

# Design tokens

## Use when

- You are creating, naming, or renaming a design token.
- You are deciding whether a value should become a token or stay hard-coded.
- You are consuming a token in CSS, JSX, or a Tailwind utility class.
- You are mapping the token set to a Tailwind v4 `@theme` block.
- You are auditing a token file for orphans or duplicates.

## Core thesis

A token is a contract, not a variable. A good token has three discoverable parts: the name tells you where it belongs, the value is the raw fact, and the usage is the rule that keeps it from leaking into arbitrary one-off values. If a later agent cannot guess the correct token from the context, the contract is broken.

## Token types

The portfolio token system covers these types. Each type has a fixed prefix and a reference file with example values and constraints.

| Type | Prefix | Example token | Concern |
|---|---|---|---|
| color | `color-` | `color-surface-primary` | Backgrounds, text, borders, accents |
| typography | `font-`, `text-`, `leading-`, `tracking-`, `weight-` | `font-sans`, `text-base`, `leading-normal`, `weight-bold` | Typefaces, sizes, line heights, tracking, weights |
| space | `space-` | `space-4` | Margins, paddings, gaps |
| size | `size-` | `size-12` | Component widths, heights, icon boxes |
| radius | `radius-` | `radius-md` | Corner rounding |
| shadow | `shadow-` | `shadow-card` | Elevation and depth |
| z-index | `z-` | `z-overlay` | Stacking layers |
| breakpoint | `breakpoint-` | `breakpoint-md` | Responsive width thresholds |
| motion | `duration-`, `ease-`, `delay-` | `duration-200`, `ease-out` | Animation timing |

## Naming rules

- Use semantic names: `color-surface-primary`, not `color-blue` or `color-#3b82f6`.
- Use explicit states: `color-surface-primary-hover`, not `color-surface-primary-hvr` or `color-hover`.
- Use stable prefixes from the token type table. Do not invent new prefixes.
- Do not use ambiguous abbreviations. `bg` and `txt` are not allowed.
- Segment from general to specific: `<type>-<group>-<role>-[state]-[scale]`.
- Keep names lowercase and hyphenated. No camelCase, no underscores.

## Tailwind v4 @theme contract

The token set maps to a single `@theme` block inside `@layer theme`. Each token becomes a CSS custom property named `--<token>` and a `theme(--<token>)` value in the theme namespace. Use the exact shape and naming from [references/tailwind-v4-theme.md](./references/tailwind-v4-theme.md). Do not split the theme across multiple files.

## Consumption rules

- Read token values with `theme(--<token>)` in CSS.
- Use the Tailwind utility class that maps to the token in JSX markup.
- Do not use arbitrary values such as `w-[37px]` or `text-[#333]`.
- Do not apply one-off `!important` overrides to token-backed utilities.
- If a component needs a value that does not exist, add a token or use the closest lower step. Do not hard-code a one-off.

## Upstream

This skill consumes two upstream contracts:

- The master spec that chartered this foundation work: [`.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`](../../specs/2026-08-12-portfolio-premium-epic-spec.md).
- The umbrella taste skill this token work supports: [`designing-premium-sites`](../designing-premium-sites/SKILL.md).

## Reference routes

| Concern | Read this |
|---|---|
| How should a token be named? | [references/naming.md](./references/naming.md) |
| What is the exact Tailwind v4 @theme shape? | [references/tailwind-v4-theme.md](./references/tailwind-v4-theme.md) |
| How do I consume tokens in CSS, JSX, or utility classes? | [references/consumption.md](./references/consumption.md) |
| What are the token type definitions and example values? | [references/token-types.md](./references/token-types.md) |

## Working rules

1. Add a token when a value is used in more than one place or when it represents a meaningful design decision such as a brand color, a base space step, or an elevation.
2. Delete a token only after you have confirmed no file, component, or reference still consumes it. Use `grep` or the token audit list.
3. Audit the token file for orphans after any design pass. An orphan is a token with no consumer in the source tree.
4. When a value is one-off and not a design decision, hard-code it locally and leave a comment explaining why it is not a token.
