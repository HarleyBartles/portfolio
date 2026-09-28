# ADR 0017: Pull quotes may enter the editorial margin

**Date:** 2026-08-26
**Status:** Accepted

**Context:** Why ADRs? established a three-part pull-quote rhythm inside a 70-character reading column. On wide screens, keeping every quote inside that same measure left the surrounding canvas visually unused and made the quotes feel like decorated paragraphs rather than changes in editorial pace.

**Decision:** Keep prose inside the shared reading measure. On authored articles that earn the treatment, allow pull quotes to extend rightward into the editorial margin at wide viewports, then return them to the prose width before that breakout risks crowding or overflow. Treat Why ADRs? as the first design seed, not an automatic rule for every article.

**Consequence:** Pull quotes can make asymmetrical whitespace active without widening body copy or introducing a permanent sidebar. A later site-wide polish pass can propagate, consolidate or revise the grammar after comparing it across the publication.

**Reconsider when:** The breakout weakens section hierarchy, creates an awkward line length, competes with nearby evidence, overflows at supported widths, or repeated use makes distinct articles feel templated.
