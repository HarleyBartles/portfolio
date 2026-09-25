# Site Header Navigation Implementation Plan

**State:** `completed-awaiting-retirement` for this predecessor slice. Checked boxes below mean implemented or explicitly transferred; they do not certify unobserved evidence.

**Closure evidence and transfers:** The reviewed menu, shared identity, footer reflow and page-opening implementation landed in `c8c5e31`; the resize journey was stabilized in `b28cc3c`. Both commits were pushed to draft PR #80 and passed their hooks. The user's mobile visual review accepted the menu and footer. The original RED run against the pre-implementation header, a documented loaded-font breakpoint measurement, actual 200% browser zoom, fresh whole-branch code/design review, and an accurate PR description are not established by this plan. The current successor `.agents/plans/2026-09-25-visual-test-ownership-cleanup.md` Task 4 owns the remaining review, measurement, zoom limitation, and PR evidence. Do not invent historical RED evidence.

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use one site header on every route, keeping the mark, Harley Bartles name and primary navigation on one balanced row, and give the shared footer a deliberate narrow layout.

**Architecture:** `SiteHeader` owns two responsive compositions of the same six primary links. The wide composition keeps the identity at the left and a single unwrapped link row at the right. The compact composition places the HB mark at the left and a square menu button at the right; opening the button reveals a full-width editorial menu sheet below. The button's *visible outline*, not merely its CSS box, reflects the mark's visible square outline. A single content-derived threshold applies to home and interior routes, and header gutters change continuously across the existing 46rem frame boundary.

**Tech Stack:** React, React Router, styled-components, Vitest, Playwright.

**Spec:** The approved design contract in this plan, based on the user's 2026-09-25 header discussion and `.agents/doctrine/portfolio-design-policy.md`.

**Execution Strategy:** `executing-plans`, because layout, menu state, accessibility and responsive proof are one coupled component change.

## Approved design contract

- The header's visual invariant is one horizontal line: identity left, navigation links or menu control right. The two sides remain vertically aligned.
- Inline navigation remains a single row to the right of the identity. It never wraps under the mark or drops a lone link onto another line.
- Switch to the compact composition *before* the wider interior identity and six links become crowded. Use the actual loaded fonts and both home/interior layouts to select and verify one threshold. Start near 34rem as a measurement candidate, not as an immutable design token.
- The same HB mark and `Harley Bartles` name appear on home and interior routes, including the supported 320px mobile width. A square hamburger control stays at the opposite side in compact view. Match the *visible outer edges* of the mark and control outlines in size, placement, weight and colour; equal 52px CSS boxes alone do not prove visual continuity. The button has an accessible name even though it has no visible text.
- The compact menu is closed initially. Opening it reveals all six existing links once, in source order, as large left-aligned full-width rows on the mineral surface, with fine dividers and an active-page mark. The final row has no divider because the header's bottom rule closes the sheet. The button changes to a close icon. Closing it restores the two-square composition. There is no intermediate always-visible stacked navigation.
- Preserve the current routes, mark, header surface, skip link, focus indication, reduced-motion behavior and keyboard order. The compact links are not focusable while closed. `aria-expanded` reflects state; Escape closes the list and returns focus to the button; choosing a route closes it. Resize from compact to wide must not leave stale open state when returning to compact.
- The header width and link spacing must not make an unexplained jump at 737/736px. The direct inline-to-menu change at the chosen threshold is intentional and must have clear breathing room on both sides.
- The footer keeps the same six links on every route. Before natural flex wrapping produces uneven rows, it changes to a two-column, three-row layout with comfortable link targets. At 320px, all six links and copyright remain visible without horizontal overflow.

## Global constraints

- Scope includes the shared site header and footer, plus the later-approved page-opening inset contract. Do not change article copy, route content, global `SiteFrame` behavior or unrelated navigation. Page-specific main content can retain its own composition while the shell chrome is unified.

### Later-approved page-opening contract

`SiteLayout` owns the responsive distance from the header rule to the first visible content on ordinary routes. Migrate the existing page wrappers to remove their opening top padding or margin, while preserving their internal and closing spacing. Homepage and authored full-width presentations may declare a composed opening and own its geometry explicitly. Verify the rendered ordinary-route opening at 320px and desktop width so new routes inherit the shared value rather than accumulating independent offsets.
- Follow `.agents/doctrine/portfolio-design-policy.md` and `.agents/runbooks/planning.md`. Review shared layout at 1440, 768, 390 and 320 CSS pixels, keyboard-only, reduced motion and actual 200% browser zoom. A narrow viewport is not proof of actual browser zoom.
- The worktree currently contains an uncommitted `SiteHeader.tsx` gutter/gap experiment and `e2e/header-continuity.spec.ts`. Inspect and reconcile those files before implementing; do not commit them as the final solution by default or reset unrelated work.
- The tracked pre-commit hook owns the complete local gate. Use focused checks during iteration, commit normally, then push only after a successful hooked commit. Do not run the complete canonical gate immediately before or after that commit.
- Retire the predecessor `.agents/plans/2026-09-25-shell-copy-cleanup.md` and regenerate its index in the first commit of this substantive slice, as required by `.agents/runbooks/planning.md`. Keep this new plan tracked while work is in flight.

## Review focus

- **Interior identity pressure:** Test the width immediately above the compact switch with the name visible and loaded fonts; mark, links and minimum breathing room must fit on one row.
- **Compact keyboard path:** Closed links must be absent from Tab order; button, expanded links, Escape and route selection must have predictable focus and state.
- **Resize state:** Open compact menu, expand to inline width, then shrink again; no stale expanded panel or misleading `aria-expanded` value.
- **Threshold continuity:** At 737/736px, positions and header height remain visually steady, with no sudden change in link spacing or gutter.
- **Outline continuity:** Compare the rendered outer border of the mark and menu button side by side at compact widths; a matching layout box with a visibly different square does not satisfy the first visual candidate.
- **Small and zoomed layouts:** At 390/320px and actual 200% browser zoom, the identity, menu control, open list and footer links remain visible without horizontal overflow.

---

### Task 1: Establish the responsive and interaction proof

**Files:** Modify `src/client/e2e/header-continuity.spec.ts`; modify `src/client/e2e/narrow-navigation.spec.ts`; modify `src/client/src/components/SiteLayout.test.tsx` only if a unit-level interaction check adds value. Reconcile the existing uncommitted browser test rather than duplicating it.

**Interfaces:** Consumes the approved design contract. Produces browser assertions against the existing `.site-header`, `.site-mark` and `nav[aria-label="Primary"]` hooks, plus accessible menu-button state.

- [x] Implement one 34rem switch with visible clearance on home and `/projects`; transfer the missing documented loaded-font measurement and PR rationale to the successor plan's Task 4.
- [x] Write focused Playwright assertions for the inline state just above and compact state just below that threshold on home and interior routes: no wrap or overlap above; mark/name and button aligned left/right below; closed links hidden; full-width ordered rows when open. Keep the existing 737/736 continuity check and adapt it to the final composition. Assess border continuity by visual review, not a brittle pixel equality assertion.
- [x] Add interaction coverage for button Enter/Space, `aria-expanded`, closed Tab order, Escape and focus return, route selection, and compact-to-wide-to-compact resize. Use the existing 195px test as a genuine narrow-layout check, updated for the new menu behavior.
- [x] Run the focused header and narrow-navigation checks against the implemented header. The requested pre-implementation RED run was not recorded and cannot be reconstructed as historical evidence; close that obsolete step explicitly.

### Task 2: Implement the two header compositions

**Files:** Modify `src/client/src/components/SiteHeader.tsx`, `src/client/src/components/SiteLayout.tsx`, and `src/client/src/components/SiteFooter.tsx`. Modify `src/client/src/components/SiteFrame.tsx` only if a header-local override cannot remove the 46rem gutter jump without changing other frames. Modify focused tests from Task 1 as necessary for truthful behavior, not to encode CSS internals.

**Interfaces:** Consumes the Task 1 browser contract. Produces one `SiteHeader` with a wide inline `PrimaryNav` and compact menu button/list exposing the same six routes once in the accessibility tree at any viewport.

- [x] Reconcile the earlier fluid-gutter and link-gap experiment with the chosen threshold. Keep header frame changes local where possible. Remove the old 30rem stacking behavior and prevent the wide link row from wrapping.
- [x] Implement the compact button opposite the shared mark/name identity. Remove the `showName` and interior/home link-style split from `SiteHeader`. Inspect `public/brand/hb-mark.svg`: its outlined rect uses a 64-unit viewBox, x/y 2, width/height 60, and a 3-unit stroke. Match its *rendered* outer square with the menu button's visible border at the displayed scale; use the existing ink and focus language. Give the icon an accessible name through the button.
- [x] Implement controlled disclosure state with `aria-expanded` and a stable `aria-controls` target. Render/hide one shared ordered link list so closed links are inaccessible and untabbable. Close on Escape with focus returned to the button, on route selection, and on transition to wide layout. Keep the expanded list below the top row as an editorial sheet with one closing rule.
- [x] Give the shared footer a two-column link grid at the content-derived narrow threshold, preserving link order, visible focus and one copyright row. Add focused 481/480/390/320px browser evidence; do not add footer collapse controls.
- [x] Run the focused Playwright tests and `npm test -- src/components/SiteLayout.test.tsx` from `src/client` until green. Fix any layout, interaction or accessibility defect found by those checks.
- [x] Show and iterate the compact candidate with the user; the menu and footer received visual acceptance. Transfer any undocumented square-outline comparison and actual 200% browser-zoom proof or limitation to the successor plan's Task 4.

### Task 3: Validate and hand off the header change

**Files:** This plan; `src/client/e2e/INDEX.md` only through the owning mesh generator if a new test file remains; `docs/design-decisions.md` only if implementation changes a protected design default rather than fixing the header composition.

**Interfaces:** Consumes the finished source and proof from Tasks 1-2. Produces a reviewable branch and explicit evidence.

- [x] Run the smallest relevant browser/accessibility and build checks needed to resolve remaining risks; inspect `git diff --check` and the final diff. Do not add tautological or change-detector tests.
- [x] Regenerate the repository mesh for added/retired planning and test files with `py -3 tools/run.py mesh --apply`, inspect its diff, and let the normal hook validate the staged commit. Do not hand-edit generated indexes.
- [x] Transfer the still-unverified fresh whole-branch code/design review to the successor plan's Task 4; no review is claimed here.
- [x] Commit and push the visually accepted implementation through the tracked hook. Transfer the stale PR description, breakpoint measurement, and zoom evidence or limitation to the successor plan's Task 4; mark this predecessor `completed-awaiting-retirement` by explicit transfer.

## Acceptance

At every supported width and on every route, the closed header shows the mark and name at left and either an unwrapped link row or the square menu button at right. No links appear below until the button opens. The open editorial sheet is complete, keyboard usable and closable, with one bottom rule. The footer changes from one row to three deliberate link pairs at narrow widths. The 737/736px jump is gone; the intentional inline-to-menu switch occurs with room to spare. No horizontal overflow appears at 320px or in the verified zoom review.
