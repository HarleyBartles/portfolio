# Current motion primitives

The live shared values are defined in `src/client/src/styles/_tokens.scss` and exposed to styled-components through `portfolioTheme.ts`.

| Token | Current value | Intended role |
| --- | --- | --- |
| `--duration-fast` / `theme.motion.fast` | `160ms` | Short hover or interaction feedback |
| `--duration-state` / `theme.motion.state` | `320ms` | Larger visual state changes |
| `--ease-out` / `theme.motion.easeOut` | `cubic-bezier(0.16, 1, 0.3, 1)` | Shared settling curve |

Use the CSS custom-property form in Sass/CSS and the typed theme form when an existing styled-component already consumes the theme.

Routine animated properties should usually be `transform` and/or `opacity`. Layout properties can change as state changes, but avoid continuously tweening dimensions/position when the same effect can be represented on the compositor.

Do not write documentation or components against imaginary `duration-75`, `duration-300`, `delay-*`, or alternate easing token families. If a new shared timing primitive is genuinely required, add it through the design-token workflow and give it a semantic job.
