# Current portfolio token types

The authoritative list is the live `:root` block in `src/client/src/styles/_tokens.scss`. This reference describes its current categories; it must not invent categories that the source file does not carry.

| Category | Current prefix / examples | Purpose |
| --- | --- | --- |
| colour | `--color-*` | Site surfaces, ink, focus, status, bounded shared evidence colours |
| spacing | `--space-*` | Reusable layout rhythm from `--space-1` through the current larger steps |
| size | `--size-*` | Shared component dimensions such as the site header |
| fonts | `--font-*` | Source Sans 3, Source Serif 4, Source Code Pro roles and compatibility aliases |
| type | `--type-*` | Shared display, body, metadata, caption, and code sizes/leading/tracking |
| reading/layout | `--line-*`, `--layout-*`, `--measure-*` | Readability and shared page measures |
| motion | `--duration-*`, `--ease-*` | The small current timing vocabulary used by CSS and styled-components |

`src/client/src/styles/portfolioTheme.ts` currently exposes typed groups for colour, spacing, size, font, type, layout, and motion. It is an adapter over the CSS custom properties, not a complete independent catalogue.

If a proposed token does not fit a current category, first ask whether it is actually a site-wide contract. A local composition variable or literal is preferable to manufacturing an unused global family such as radii, shadows, z-index scales, breakpoint tokens, or delay scales that the repository does not currently own.
