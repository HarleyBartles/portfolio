---
name: design-tokens
description: Use when creating, naming, changing, or consuming portfolio design tokens, or when deciding whether a repeated visual value belongs in the shared token system.
license: MIT
---

# Design tokens

## Use when

- You are adding or changing a reusable colour, spacing, size, typography, layout, or motion value.
- You need the same design value in Sass/CSS and a styled-component.
- You are deciding whether a value belongs in shared tokens or should remain local to one composition.
- You are auditing shared tokens for drift or unused entries.

## Core contract

`src/client/src/styles/_tokens.scss` is the source of truth for portfolio-wide design tokens. It declares CSS custom properties on `:root` and is loaded through `global.scss`.

`src/client/src/styles/portfolioTheme.ts` is the typed styled-components adapter for the subset of those tokens that React styling consumes through `theme.*`. It maps to the same CSS custom properties; it is not a second value authority.

Do not introduce a parallel token registry, utility framework, or theme syntax to express values the repository already owns.

## Add or change a token

1. Inspect `_tokens.scss` and nearby consumers first. Reuse an existing semantic token when it already owns the job.
2. Add a CSS custom property to the existing category in `_tokens.scss` only when the value is reused across surfaces or represents a durable shared decision.
3. If styled-components needs typed access, map that custom property in `portfolioTheme.ts` under the existing semantic group.
4. Consume the token with `var(--token-name)` in Sass/CSS, or the mapped `theme.<group>.<name>` value inside styled-components.
5. Update focused tests when the token or mapping has an objective contract worth pinning. `src/client/src/styles/portfolioTheme.test.ts` covers the typed mapping and `src/client/scripts/css-token-references.test.ts` guards referenced CSS variables. Search consumers before renaming or deleting a token.

See [references/consumption.md](./references/consumption.md) and [references/token-types.md](./references/token-types.md).

## Naming

Prefer the vocabulary already present in `_tokens.scss`: semantic role before raw appearance, established category prefixes, and names that describe the job rather than the literal value. Project- or composition-specific values may stay local when they are genuinely bounded rather than pretending every value is site-wide design-system law.

See [references/naming.md](./references/naming.md).

## Working rules

- Shared values have one raw-value authority: `_tokens.scss`.
- `portfolioTheme.ts` maps tokens; it does not duplicate raw colour, spacing, typography, or motion values.
- CSS and Sass read custom properties with `var(...)`; styled-components may use either `var(...)` directly or an existing typed theme mapping.
- Do not create a token merely to avoid every literal. A one-off, evidence-bound composition value may remain local.
- Do not invent token families that the current repository does not have. Add a new shared category only when current design work establishes that contract.
- After a rename or removal, search the source tree and run the smallest relevant style/component tests.

## Upstream

This skill supports the current portfolio design contract in [`../../doctrine/portfolio-design-policy.md`](../../doctrine/portfolio-design-policy.md) and the umbrella taste guidance in [`../designing-premium-sites/SKILL.md`](../designing-premium-sites/SKILL.md).
