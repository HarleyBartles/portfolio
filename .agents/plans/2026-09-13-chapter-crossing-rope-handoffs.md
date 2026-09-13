# Chapter Crossing Rope Handoffs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace independently positioned chapter-boundary rope joins with one `ChapterCrossing` primitive per boundary that owns the rule, handoff coordinate and future-anchor placeholder.

**Architecture:** `UsualSpecialistsPage` composes `SpecialistsChapterNav` after Opening, then `ChapterCrossing` siblings before Index and Silk. The Opening→Index order is `Opening → nav → crossing → Index`; the Index→Silk order is `Index → crossing → Silk`. Each crossing owns the mineral transition surface, horizontal rule, authoritative seam x-position and future-anchor placeholder. Adjacent chapter rope wrappers consume the same exported geometry rather than duplicating boundary coordinates. `RopePiece` remains a dumb typed asset renderer, while each chapter continues to own its own rope crop, scale, rotation and internal route geometry.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest/Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`

**Execution Strategy:** `executing-plans` inline on the existing PORT-17 branch. Author only the current 1400–1599 wide band in this slice; later responsive states are separate visual iterations.

## Global Constraints

- Preserve protected Index composition; do not update visual snapshots to hide drift.
- `RopePiece` owns only typed asset selection/rendering. Parent placements own all geometry.
- Opening→Index and Index→Silk each have exactly one crossing-owned seam point and one crossing-owned anchor placeholder.
- The chapter nav sits between Opening and the Opening→Index crossing. It uses the same mineral background as the page, paints above the rope, and owns no rope, seam or anchor geometry.
- Only Index and Silk tabs are interactive until later chapters exist; Writ, Klause, Rollback and Receipt render as inert tab shells.
- The Opening→Index anchor must sit on the mineral transition surface below the nav, never on the full-colour opening image or on the nav itself.
- The crossing's anchor placeholder must be capable of fully occluding the small raster/tangent mismatch at the join; it must not compensate for disconnected endpoints.
- Remove transition-rule/anchor ownership from neighboring chapters when the crossing takes it over.
- The Opening page-start anchor remains Opening-owned; the Silk Commission 06 harness join remains Silk-internal.
- The Silk Commission 06 harness join must be structurally correct without Commission 06 hiding it: Silk upper and lower rope centrelines meet at one shared internal port with matching thickness. Commission 06 may later occlude that already-correct join, but its placement must not be required to make the rope read as continuous.
- Chapter crossings own no rope. Across the shared page stacking context the paint order is `adjacent chapter surfaces < crossing rule < chapter-owned rope pieces < crossing anchor`. The crossing root must not isolate its rule and anchor into one stacking layer. Crossing anchors and neighboring rope endpoints must be able to straddle the boundary without either adjacent chapter clipping them in half.
- Use only the existing responsive vocabulary. Do not add a new breakpoint.
- For this iteration, lock the 1400–1599 wide-band crossing x positions structurally and stop for visual review before authoring another media band.

---

### Task 1: Introduce the ChapterCrossing primitive

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx`

**Interfaces:**
- Consumes: typed crossing id `'opening-index' | 'index-silk'` and optional root-only `style?: CSSProperties`.
- Produces: `[data-specialists-chapter-crossing]`, an actual horizontal rule `[data-specialists-crossing-rule]`, and `[data-specialists-crossing-anchor]` centered on the crossing-owned rope port.
- Exports: the crossing geometry constants used by neighboring parent placement styles; wide-band values are fixed CSS-pixel positions so they cannot drift between 1400 and 1599.

- [x] Write a failing component test for both crossing ids, anchor ownership, rule ownership, root-only style forwarding and no caller `className` seam.
- [x] Run the focused test and verify RED because the primitive does not exist.
- [x] Implement the minimal primitive and wide-band geometry authority.
- [x] Re-run the focused test and expect PASS.

### Task 2: Move chapter-boundary rules and anchors into crossings

**Files:**
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`

**Interfaces:**
- `UsualSpecialistsPage` inserts `ChapterCrossing crossing="opening-index"` between Opening and Index, and `ChapterCrossing crossing="index-silk"` between Index and Silk.
- `UsualSpecialistsPage` inserts `SpecialistsChapterNav` before the Opening→Index crossing, preserving the route order `Opening → nav → crossing → Index`.
- The lower Opening rule and Silk top rule are retired; the Index→Silk placeholder anchor is removed from `SilkTraversalComposition` and lives in the crossing.
- `SpecialistsChapterNav` reproduces the six-tab wireframe rail. Index and Silk link to mounted chapter ids; Writ, Klause, Rollback and Receipt are inert.
- The nav is opaque and paints above the Opening rope so the rope passes physically behind it without being visible through the tab strip.

- [x] Update compositor/component tests first and verify RED against current ownership.
- [x] Insert the crossings and remove duplicated rule/anchor ownership.
- [x] Re-run the focused component suite and expect PASS.

### Task 3: Lock wide-band rope endpoints to crossing geometry

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Opening's wide-band exit targets the Opening→Index crossing port.
- Index's wide-band entry/exit geometry is authored from the two crossing ports rather than viewport percentages.
- Silk upper's wide-band entry targets the Index→Silk crossing port; its width remains independent of its cropped length.

- [x] Add a failing browser contract at widths 1400, 1440 and 1599 asserting each crossing anchor remains fixed and both neighboring rope endpoints remain inside the anchor occlusion zone.
- [x] Verify RED against the current percentage-driven drift.
- [x] Implement the minimal wide-band placement changes using the crossing geometry constants; do not author other responsive bands.
- [x] Re-run the focused browser contract and expect PASS.
- [ ] Stop for Harley's visual review before authoring another media band.

### Task 4: Make the Silk internal rope join and crossing depth structural

**Files:**
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- `IndexMilestoneBoundary` ends after Index. The Index→Silk crossing is its following sibling and therefore cannot be clipped by that historical milestone wrapper.
- The obsolete `overflow: clip` boundary behavior is retired now that the page-spanning temporary rope no longer exists.
- `ChapterCrossing` keeps its rule and anchor in the page stacking context without trapping them in a crossing-local stacking context. The primitive owns no rope: rule paints below neighboring chapter-owned rope pieces; anchor paints above them.
- `SilkTraversalComposition` owns one explicit internal rope join port. At the wide band, the visible endpoint of the upper rope and visible entry of the lower rope coincide at that port independently of Commission 06 geometry.

- [x] Update component/browser contracts first: Index→Silk crossing must be outside the milestone; Silk exposes one internal rope join port; upper/lower rope endpoints must coincide there within 2px; anchor/rope/rule depth must remain `rule < rope < anchor` across the chapter boundary.
- [x] Verify RED against the current crossed Silk join and clipped Index→Silk crossing.
- [x] Move the Index→Silk crossing outside the milestone, retire obsolete milestone clipping, and make crossing depth non-clipping.
- [x] Re-author only the wide-band Silk upper/lower placement around the shared internal port; keep the lower terminal curl and chapter entry geometry otherwise unchanged.
- [ ] Re-run the focused component and 1400/1440/1599 browser contracts and stop for visual review.
