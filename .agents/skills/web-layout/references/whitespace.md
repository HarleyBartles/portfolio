# Whitespace

## Spacing scale

The portfolio uses a base unit of 0.25rem (4px at the default 16px font size). All spacing values are multiples of this unit. The named steps below are also referenced in the design tokens.

| Name | Value | Use |
|---|---|---|
| `space-0` | `0` | No spacing |
| `space-1` | `0.25rem` | Icon gaps, tight component internals |
| `space-2` | `0.5rem` | Small internal gaps, form labels |
| `space-3` | `0.75rem` | Tight section gaps |
| `space-4` | `1rem` | Default component padding and gaps |
| `space-5` | `1.25rem` | Medium component gaps |
| `space-6` | `1.5rem` | Section internal gaps |
| `space-8` | `2rem` | Larger component separations |
| `space-10` | `2.5rem` | Major section padding |
| `space-12` | `3rem` | Section separations |
| `space-16` | `4rem` | Major section breaks |

The canonical token definitions for these steps live in [`design-tokens`](../design-tokens/references/token-types.md).

## Rhythm

Rhythm is the repeated vertical spacing between elements. A consistent rhythm makes a page feel calm and connected.

- Set the vertical rhythm from the body text line height. A body line height of `1.5` or `1.625` becomes the beat that headings, lists, and blocks align to.
- Choose section margins from the top half of the scale: `space-12` or `space-16`.
- Choose component gaps from the middle: `space-4`, `space-6`, or `space-8`.
- Choose label or icon gaps from the bottom: `space-1`, `space-2`, or `space-3`.

## Negative space

Negative space is the empty area around and between elements. Treat it as a material, not a leftover.

- Use whitespace to show grouping. Items closer together are read as a single unit.
- Use whitespace to separate groups. A larger gap between sections than within a section shows the boundary.
- Use whitespace to create a focal point. Isolation draws attention to the one element that sits alone.
- Do not fill empty space because it is empty. Empty space is part of the design.

## Avoiding arbitrary margins

| Bad | Why it fails | Better |
|---|---|---|
| `margin: 1.125rem` | Not a step on the scale and hard to compare to other values. | `margin: var(--space-4)` |
| `margin-top: 37px` | Pixel value is not tied to the base unit or font size. | `margin-top: var(--space-10)` |
| Tweaking one element until it looks right | Creates a one-off value that breaks the rhythm. | Change the scale step or the component structure. |
