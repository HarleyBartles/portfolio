# Icon and SVG custody

## Current pattern

The portfolio does not depend on a general icon library. Reuse an existing semantic component or authored SVG before creating another icon surface.

- External-link affordance: reuse `src/client/src/components/ExternalLink.tsx`; it owns the inline decorative SVG, new-tab semantics, and accessible wording.
- Brand marks and project diagrams: keep them as explicit repository-owned SVG assets when their identity/provenance matters.
- Small one-off UI glyphs: an inline SVG is acceptable when it is simple, component-owned, and not pretending to be a reusable icon system.

## Accessibility

A decorative glyph should stay out of the accessibility tree. An icon-only control needs an accessible name from the control, not a duplicate spoken SVG. Prefer visible text when the symbol would make the reader guess.

## Avoid duplication

Before adding an SVG, search for an existing component or asset that already owns the meaning. Do not create a new public icon directory or add an icon-package dependency merely to reproduce an affordance the repository already has.
