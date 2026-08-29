# Styled editorial grammar design

## Goal

Adopt styled components as the forward implementation seam for reusable,
authored visual grammar. The change must make the canonical treatment easier
to consume than a bespoke recreation, without turning Phase 7A into a
repository-wide stylesheet rewrite.

## Decision

Keep CSS custom properties in `src/client/src/styles/_tokens.scss` as the
canonical token source. Expose an exact, typed TypeScript mirror for styled
components. A `ThemeProvider` belongs only around the lazily loaded
professional-surface routes that use styled components, not around the whole
application shell.

The first shared grammar primitive is `EditorialPullQuote`. It owns its rule,
inset, display type, attribution and narrow-width behaviour. About consumes it
first. New shared visual grammar should be added as a named primitive only
when at least two surfaces need the same semantics and treatment.

About and CV are the proving ground. Their page-specific layout contracts move
from `global.scss` into co-located styled components, including the About
story rail and CV conversion panel. Global Sass retains reset rules, CSS
custom-property definitions, generic typography, controls, layout shell and
stable legacy surfaces.

## Why this earns its place

The intended portfolio language is authored site-wide grammar, not repeated
styling guesses. A shared component makes the canonical treatment the normal
path. Divergence remains possible, but it has to become an explicit component
or a local override in the review diff. The typed token mirror catches
invented token names at TypeScript time; the stylesheet token-reference test
remains the cross-system guard for raw CSS variables.

## Scope

- Create the typed theme and professional-surface provider boundary.
- Create and test `EditorialPullQuote`.
- Migrate the currently touched About and CV layout contracts to styled
  components, preserving their existing semantic markup, routes and copy.
- Retire only the global selectors made redundant by that migration.
- Add focused unit and browser layout proof for the conversion panel, story
  rails and pull quote.
- Record the protected-default evolution in `docs/design-decisions.md`.

## Non-goals

- No global Sass-to-styled-components conversion.
- No token-value redesign or duplicate token authority.
- No migration of settled articles, case studies or imagery just because they
  use Sass.
- No runtime theme around routes that do not consume the new primitives.
- No relaxation of the entry bundle budget, accessibility contracts or
  responsive review requirements.

## Alternatives considered

1. **Remain with global Sass and ask implementers to be careful.** Rejected:
   it leaves stale selector assumptions and recreated visual grammar easy to
   introduce.
2. **Move all Sass to styled components.** Rejected: it would create broad
   churn, weaken review focus and spend performance budget before proving a
   benefit.
3. **Use co-located Sass only.** Useful for page ownership but insufficient
   for typed token consumption and reusable, testable grammar components.

## Validation

- `EditorialPullQuote` unit tests prove its semantic output and canonical
  style contract.
- The existing missing-token test continues to scan every stylesheet.
- About browser proof checks that the conversion label cannot overlap its
  heading and story rails do not produce duplicate rules at the affected
  desktop width.
- Build and focused browser checks prove the lazy boundary does not breach the
  existing entry budget.
- Visual review remains at 1440, 768, 390 and 320 CSS pixels.

## Readiness review

The scope is deliberately one foundation slice: a typed bridge, one shared
primitive and two in-flight page surfaces. Token custody, runtime boundary,
non-goals and validation are explicit. **Rating: 9/10.**
