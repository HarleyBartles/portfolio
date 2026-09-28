# ADR 0026: Article asides are shared editorial grammar

**Date:** 2026-09-05
**Status:** Accepted

**Context:** Five current writing consumers were doing the same editorial job with unrelated local shells: WorkClaw, Astra, two product-ownership disclosures and the testing lens. Their dark fields, pale field and one always-open presentation were historical local treatments, not distinct content semantics.

**Decision:** Make `src/client/src/components/editorial/EditorialAside.tsx` the canonical component, exported from `src/client/src/components/editorial`. It owns the common field, title and precis hierarchy, disclosure affordance, collapsed-first native details behavior, keyboard semantics and responsive rules. Article prose keeps the strict reading measure; the aside deliberately breaks out only to the right on a wide editorial field while retaining the prose column’s left edge. Wide desktop places title and precis in the left lane with disclosure/body on the right; tablet places title and precis side by side, then puts the disclosure on the next row with opened body in the right lane; mobile returns all three to one left-aligned column. Article bodies supply only their content, optional eyebrow, disclosure label and concrete visual content where earned. The testing lens now follows the same collapsed-first treatment. Article-local aside shells and styles are prohibited unless a deliberately new grammar is designed and approved.

**Consequence:** Readers encounter one recognisable aside device without flattening the writing itself. A new article cannot quietly invent another callout, and the same component-owned precedent already governing `EditorialPullQuote` is explicit for asides. The product-ownership signal map remains local content inside the shared primitive, not a competing aside design.

**Reconsider when:** A published article needs a materially different semantic relationship that the shared aside cannot express. That proposal must name the relationship, render its behavior at desktop, narrow widths and 200% zoom, and receive explicit approval before a new primitive or local treatment is introduced.
