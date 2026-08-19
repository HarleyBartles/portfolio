# Motion primitives

## Duration

Use the `duration-*` tokens. The value is in milliseconds.

| Token | Value | Use |
|---|---|---|
| `duration-0` | `0ms` | No animation; reduced-motion fallback |
| `duration-75` | `75ms` | Micro feedback such as a button press |
| `duration-150` | `150ms` | Hover, focus, and small state changes |
| `duration-300` | `300ms` | Scroll reveals and component entrances |
| `duration-500` | `500ms` | Page-level or large state changes |

## Easing

Use the `ease-*` tokens. The value is a cubic-bezier.

| Token | Value | Use |
|---|---|---|
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrances and hover; starts fast and settles |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits; slows into the end |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric swaps such as toggles |

## Stagger

Stagger turns a group motion into a sequence. It is not a longer animation.

- Stagger no more than six items in the same group.
- Use `delay-75` (75ms), `delay-100` (100ms), or `delay-150` (150ms) between items.
- Do not stagger unrelated elements. Use it only for lists, grids, or card groups that belong to the same block.
- The first item starts at `delay-0`.

## Transform choice

Only `translate`, `scale`, `rotate`, and `opacity` are routine choices. They can run on the compositor thread and stay at 60fps.

Avoid real-time animation of these properties:

- `width`, `height`, `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `box-shadow`
- `filter` (including `blur`)
- `font-size`, `line-height`

If a layout change is the goal, change the layout property once and animate `opacity` or a short `scale` alongside it. Do not tween the layout property itself.

Use `will-change: transform, opacity` only when the element is actively animating. Remove it after the animation completes. Overuse of `will-change` consumes GPU memory and can make other motion worse.
