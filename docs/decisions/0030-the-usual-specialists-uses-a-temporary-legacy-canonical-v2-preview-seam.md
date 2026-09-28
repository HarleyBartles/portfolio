# ADR 0030: The Usual Specialists uses a temporary legacy-canonical/V2-preview seam

**Date:** 2026-09-13
**Status:** Superseded by [ADR 0032](0032-the-accepted-specialists-milestone-becomes-canonical.md)

**Context:** The document-world replacement is still incomplete, while the existing six-Specialist presentation is already a finished published page. Keeping the long-running PORT-17 branch open until every V2 chapter is complete would enlarge the review surface; replacing the canonical route now would publish an unfinished edition.

**Decision:** `/patch/the-usual-specialists/` temporarily remains the indexed canonical route for the frozen published legacy presentation. The accepted document-world V2 composition lives only at the unlinked `/patch/the-usual-specialists/next/` preview route during construction, with `noindex, nofollow`, no canonical URL and no publication OG/Twitter URL or image identity. The 2026-09-10 document-world decision continues to govern V2 composition and chapter approval; this successor decision changes temporary route ownership only, not the accepted Index, Silk, rope or responsive design.

**Consequence:** Further V2 Specialist work and protected V2 route evidence target `/patch/the-usual-specialists/next/` until final cutover. Public discovery, sitemap and related-content surfaces continue to expose only the legacy canonical page. Incomplete V2 may exist on `main`, but it must not become the canonical The Usual Specialists experience.

**Reconsider when:** The complete V2 edition has been reviewed on the deployed preview route and Harley explicitly approves canonical cutover. At that point, remove the temporary preview seam deliberately and transfer canonical route ownership to V2 without weakening the accepted document-world composition.
