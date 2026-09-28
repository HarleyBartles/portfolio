# ADR 0032: The accepted Specialists milestone becomes canonical

**Date:** 2026-09-21
**Status:** Accepted

**Context:** The opening, Index chapter and Under Construction boundary have completed their design and implementation closeout. Harley explicitly approved promoting that accepted V2 milestone to the public route rather than keeping the finished Index slice behind the temporary legacy-canonical/V2-preview seam while later chapters are designed independently.

**Decision:** Supersede the route-ownership terms of the 2026-09-13 temporary seam decision. `/patch/the-usual-specialists/` is now the indexed canonical route for the accepted document-world V2 milestone: opening, Index and Under Construction. Later specialist chapters remain unmounted until their own accepted milestones land. The old six-Specialist legacy renderer is retired. `/patch/the-usual-specialists/next/` remains only as an unlinked `noindex, nofollow` alias of the same published V2 page, with no independent canonical or social-publication identity. This changes publication ownership only; it does not reopen the accepted Index composition or responsive invariants.

**Consequence:** Public discovery, metadata, sitemap and related-content surfaces point to the accepted V2 milestone without pretending the unfinished specialist chapters exist. The roadmap continues from Silk on top of the published Index foundation, and each later chapter can extend the canonical page only after its own review and acceptance. The retained `/next/` alias is compatibility/preview infrastructure, not a second edition or design authority.

**Reconsider when:** Harley explicitly changes canonical route ownership, or the retained no-index alias no longer serves a useful compatibility or review purpose. Ordinary later-chapter design and implementation do not reopen this route-ownership decision.
