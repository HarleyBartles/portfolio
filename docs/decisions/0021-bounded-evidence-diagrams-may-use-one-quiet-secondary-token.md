# ADR 0021: Bounded evidence diagrams may use one quiet secondary token

**Date:** 2026-08-31
**Status:** Accepted

**Context:** The Wild Bunch UUID allocation needs three logical groups to remain
quickly distinguishable without turning the diagram into project theming. The
green in the current development map is not durable Wild Bunch palette authority,
while a one-off local colour would have no place in the site's style contract.

**Decision:** `evidence-group secondary` (`#B8C2AD`) is a shared semantic token
for one subordinate logical group inside a bounded evidence diagram. It is not a
site accent, status colour, project identity colour or recurring component
treatment. Harley accepted this narrow role after reviewing the rendered UUID
allocation on 31 August 2026.

**Consequence:** Evidence can express a secondary classification without
borrowing temporary project UI colour or inventing an ungoverned local value.
The token must retain sufficient contrast on its evidence surface and must not
spread merely to make unrelated layouts feel coordinated.

**Reconsider when:** A project-owned palette can truthfully carry the distinction,
the grouping remains equally clear without colour, contrast fails, or the token
starts appearing outside bounded evidence relationships.
