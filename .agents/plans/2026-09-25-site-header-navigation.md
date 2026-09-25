# Site Header Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the site identity and primary navigation on one balanced header row at every width, switching directly from inline links to a compact menu before the links crowd the identity.

**Architecture:** `SiteHeader` owns two responsive compositions of the same six primary links. The wide composition keeps the identity at the left and a single unwrapped link row at the right. The first compact candidate places the HB mark at the left and a square menu button at the right; opening the button reveals a right-aligned vertical link list below. The button's *visible outline*, not merely its CSS box, reflects the mark's visible square outline. A single content-derived threshold applies to home and interior routes, and header gutters change continuously across the existing 46rem frame boundary.

**Tech Stack:** React, React Router, styled-components, Vitest, Playwright.

**Spec:** The approved design contract in this plan, based on the user's 2026-09-25 header discussion and `.agents/doctrine/portfolio-design-policy.md`.

**Execution Strategy:** `executing-plans`, because layout, menu state, accessibility and responsive proof are one coupled component change.

## Approved design contract

- The header's visual invariant is one horizontal line: identity left, navigation links or menu control right. The two sides remain vertically aligned.
- Inline navigation remains a single row to the right of the identity. It never wraps under the mark or drops a lone link onto another line.
- Switch to the compact composition *before* the wider interior identity and six links become crowded. Use the actual loaded fonts and both home/interior layouts to select and verify one threshold. Start near 34rem as a measurement candidate, not as an immutable design token.
- In the first compact visual candidate, hide the adjacent `Harley Bartles` text. Show only the HB mark and a square hamburger control at opposite sides of the header. Match the *visible outer edges* of their outlines in size, placement, weight and colour, using the rendered mark as reference; equal 52px CSS boxes alone do not prove visual continuity. The button has an accessible name even though it has no visible text. This symmetric treatment is tentative until reviewed in context and may be revised without reopening the agreed two-state navigation strategy.
- The compact menu is closed initially. Opening it reveals all six existing links once, in source order, as a right-aligned vertical list below the row. Closing it restores the two-square composition. There is no intermediate always-visible stacked navigation.
- Preserve the current routes, mark, header surface, skip link, focus indication, reduced-motion behavior and keyboard order. The compact links are not focusable while closed. `aria-expanded` reflects state; Escape closes the list and returns focus to the button; choosing a route closes it. Resize from compact to wide must not leave stale open state when returning to compact.
- The header width and link spacing must not make an unexplained jump at 737/736px. The direct inline-to-menu change at the chosen threshold is intentional and must have clear breathing room on both sides.

## Global constraints

- Scope is the shared site header and its focused tests. Do not change article copy, route content, global `SiteFrame` behavior or unrelated navigation.
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
- **Small and zoomed layouts:** At 390/320px and actual 200% browser zoom, the two controls and open list remain visible without horizontal overflow.

---

### Task 1: Establish the responsive and interaction proof

**Files:** Modify `src/client/e2e/header-continuity.spec.ts`; modify `src/client/e2e/narrow-navigation.spec.ts`; modify `src/client/src/components/SiteLayout.test.tsx` only if a unit-level interaction check adds value. Reconcile the existing uncommitted browser test rather than duplicating it.

**Interfaces:** Consumes the approved design contract. Produces browser assertions against the existing `.site-header`, `.site-mark` and `nav[aria-label="Primary"]` hooks, plus accessible menu-button state.

- [ ] Record the current experimental diff and the loaded-font geometry for home and `/projects` near the proposed switch. Choose one threshold with visible clearance for the wider interior identity; document the measured reason in the implementation/PR, not an arbitrary device category.
- [ ] Write focused Playwright assertions for the inline state just above and compact state just below that threshold on both surfaces: no wrap or overlap above; mark/button aligned left/right below; hidden name and links while closed; right-aligned ordered list when open. Keep the existing 737/736 continuity check and adapt it to the final composition. Assess border continuity by visual review, not a brittle pixel equality assertion.
- [ ] Add interaction coverage for button Enter/Space, `aria-expanded`, closed Tab order, Escape and focus return, route selection, and compact-to-wide-to-compact resize. Use the existing 195px test as a genuine narrow-layout check, updated for the new menu behavior.
- [ ] Run `npx playwright test e2e/header-continuity.spec.ts e2e/narrow-navigation.spec.ts` from `src/client` against an owned dev server with `PORTFOLIO_E2E_ORIGIN` and `PORTFOLIO_E2E_EXTERNAL_SERVER=true`. Confirm the new behavior checks fail against the pre-implementation header for the intended reasons.

### Task 2: Implement the two header compositions

**Files:** Modify `src/client/src/components/SiteHeader.tsx`. Modify `src/client/src/components/SiteFrame.tsx` only if a header-local override cannot remove the 46rem gutter jump without changing other frames. Modify focused tests from Task 1 as necessary for truthful behavior, not to encode CSS internals.

**Interfaces:** Consumes the Task 1 browser contract. Produces one `SiteHeader` with a wide inline `PrimaryNav` and compact menu button/list exposing the same six routes once in the accessibility tree at any viewport.

- [ ] Reconcile the earlier fluid-gutter and link-gap experiment with the chosen threshold. Keep header frame changes local where possible. Remove the old 30rem stacking behavior and prevent the wide link row from wrapping.
- [ ] Implement the first compact candidate with the square button opposite the mark and hide the adjacent name at the compact threshold. Inspect `public/brand/hb-mark.svg`: its outlined rect uses a 64-unit viewBox, x/y 2, width/height 60, and a 3-unit stroke. Match its *rendered* outer square with the menu button's visible border at the displayed scale; use the existing ink and focus language. Avoid a decorative third element or visible label. Give the icon an accessible name through the button.
- [ ] Implement controlled disclosure state with `aria-expanded` and a stable `aria-controls` target. Render/hide one shared ordered link list so closed links are inaccessible and untabbable. Close on Escape with focus returned to the button, on route selection, and on transition to wide layout. Keep the expanded list below the top row and aligned to the right edge.
- [ ] Run the focused Playwright tests and `npm test -- src/components/SiteLayout.test.tsx` from `src/client` until green. Fix any layout, interaction or accessibility defect found by those checks.
- [ ] Review ready-page screenshots for home and `/projects` at 1440, 768, threshold +1/-1, 390 and 320 CSS pixels, with the compact menu closed/open. Compare the two visible square outlines for apparent size, stroke, edge position and balance against the whole header, then show the first candidate for user visual judgement before treating that treatment as final. Check keyboard-only use, reduced motion and actual 200% browser zoom; report any capability limit honestly.

### Task 3: Validate and hand off the header change

**Files:** This plan; `src/client/e2e/INDEX.md` only through the owning mesh generator if a new test file remains; `docs/design-decisions.md` only if implementation changes a protected design default rather than fixing the header composition.

**Interfaces:** Consumes the finished source and proof from Tasks 1-2. Produces a reviewable branch and explicit evidence.

- [ ] Run the smallest relevant browser/accessibility and build checks needed to resolve remaining risks; inspect `git diff --check` and the final diff. Do not add tautological or change-detector tests.
- [ ] Regenerate the repository mesh for added/retired planning and test files with `py -3 tools/run.py mesh --apply`, inspect its diff, and let the normal hook validate the staged commit. Do not hand-edit generated indexes.
- [ ] Obtain a fresh code/design review against the approved contract; correct actionable findings and repeat focused checks when the implementation changes.
- [ ] After the user has seen and judged the first compact visual candidate, commit through the tracked hook, push, and prepare a draft PR with before/after visual evidence, the chosen breakpoint measurement, interaction proof and any unverified zoom limitation. Mark this plan `completed-awaiting-retirement` only after agent-owned implementation and review obligations are complete.

## Acceptance

At every width, the closed header has only the identity at left and either an unwrapped link row or the square menu button at right. The first compact candidate contains no visible name and reflects the mark's visible square outline in the button border, subject to user judgement after seeing it. No links appear below the mark until the button opens. The open list is complete, right-aligned, keyboard usable and closable. The 737/736px jump is gone; the intentional inline-to-menu switch occurs with room to spare for both header identities. No horizontal overflow appears at 320px or in the verified zoom review.
