# Icon custody

Use this reference when adding, sizing, or reviewing icons for the portfolio.

## Icon set

- `lucide-react` is the default icon library.
- Import individual icons by name (e.g. `import { Menu } from 'lucide-react'`); do not import the whole library.
- If a required icon is not in `lucide-react`, add a single custom SVG file to `src/client/public/icons/` or the project icons directory. Do not inline complex SVGs in every component.

## Sizing

- Size icons with the type scale or layout grid, not with arbitrary pixel values.
- A 16px icon is the default for inline text; 20px and 24px are the defaults for buttons and controls.
- Keep the icon stroke width at the default unless the design deliberately needs a different weight.

## Usage rules

- Use an icon when it makes the control faster to recognise.
- Do not use an icon when the metaphor is unclear, when the action is rare, or when a text label is more direct.
- Pair every icon with a text label or an `aria-label` if the icon is the only content.
- Do not use colour alone to convey meaning in an icon; use a label or shape to reinforce the state.

## When not to use an icon

- When the user has to guess what the icon means.
- When the icon is purely decorative and adds no information.
- When the layout is already dense; another small shape may create visual clutter.
