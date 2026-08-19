# Responsive patterns

## Breakpoints

The portfolio uses a small set of content-driven breakpoints. A breakpoint should only exist because the layout fails or wastes space at the next smaller range.

| Name | Width | When to use |
|---|---|---|
| `sm` | 40rem (640px) | Single-column layouts start to accept side-by-side elements. |
| `md` | 48rem (768px) | Navigation can expand; multi-column layouts become comfortable. |
| `lg` | 64rem (1024px) | Full page shell with side columns; card grids reach three or four columns. |
| `xl` | 80rem (1280px) | Large desktops; wider measure needs a max-width container. |

These short names map to the `breakpoint-sm`, `breakpoint-md`, `breakpoint-lg`, and `breakpoint-xl` tokens in the design tokens.

## Mobile-first order

- Write the base styles for the smallest, simplest layout. This is the default.
- Add `min-width` media queries as the viewport grows. Each query adds complexity, it does not repair a broken small screen.
- Keep source order the same as the reading order. Do not use `order` to rearrange content for a breakpoint.
- Test the base layout before adding any breakpoints. If the small layout is broken, breakpoints will not fix it.

## Content-driven adaptation

- Change the number of columns when the content no longer fits the available width.
- Adjust font size and spacing only when the reading measure or touch targets require it.
- Reorder or hide content only when the small-screen goal is different from the large-screen goal. Hiding content for layout reasons usually means the layout is wrong.
- Keep the same visual weight across breakpoints. The primary, secondary, and tertiary levels should stay clear.

## Container queries

Use container queries when a component must respond to the width of its own container, not the viewport.

| Use container queries | Use viewport media queries |
|---|---|
| A card that has two columns in a wide sidebar and one column in a narrow main column. | Page shell changes such as showing or hiding a sidebar. |
| A form that switches from horizontal to vertical based on its fieldset width. | Global navigation or footer changes. |
| A table that changes layout based on the available card width. | Hero or full-bleed section changes. |

## Avoiding breakpoint explosion

- Start with three or fewer breakpoints. Add `lg` or `xl` only when the layout needs them, not because the design shows them.
- If you find yourself adding a breakpoint for a single component, use a container query or restructure the component instead.
- Do not create device-specific breakpoints such as `iPhone` or `iPad`. Devices change; the content does not.
- Document the reason for each breakpoint in a comment or in the design review. A breakpoint without a reason is a candidate for removal.
