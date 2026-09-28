# ADR 0019: Shared editorial grammar is component-owned

**Date:** 2026-08-29
**Status:** Accepted

**Context:** The portfolio's authored visual language relies on recurring
editorial treatments, but a global selector retained assumptions from an older
About-page DOM shape. It produced an overlapping conversion label and a second
unrelated story rule, while an earlier implementation also referenced spacing
tokens that did not exist.

**Decision:** Keep CSS custom properties as the single token-value source.
Use a typed styled-components mirror for new shared editorial primitives and
the Phase 7A professional-surface layouts being actively changed. The first
primitive is the canonical pull quote. Existing Sass remains until a surface
has a concrete change reason; this is not a wholesale migration.

**Consequence:** Canonical treatments travel with named components, and a
different treatment becomes a visible local decision. Typed theme access and
the repository-wide token-reference test make invented token names easier to
catch. Browser layout checks remain necessary because declared styles cannot
prove text wrapping or geometry.

**Reconsider when:** The lazy styled-components boundary breaches the existing
performance budget, shared primitives become a constraint on a genuinely
distinct case-study art direction, or a future CSS architecture supplies the
same ownership and testability with less runtime cost.
