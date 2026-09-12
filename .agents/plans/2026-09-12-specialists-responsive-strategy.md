# The Usual Specialists Responsive Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan sequentially. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the current Specialists React page consume one page-owned responsive vocabulary and freeze its accepted authored geometry above the explicit `2560px` ceiling without changing approved pixels through `2560px`.

**Architecture:** Add one route-local responsive module that names the authored thresholds and media-query strings. Wrap the current route contents in a centred authored canvas capped at `2560px`; preserve current geometry through the ceiling and add explicit above-ceiling overrides only where unbounded viewport formulas would otherwise continue drifting. Existing vertical slices retain ownership of their internal geometry.

**Tech Stack:** React 19, TypeScript 6, styled-components 6, Vitest, Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-specialists-responsive-strategy-design.md`

**Execution Strategy:** `executing-plans` — the tasks are tightly coupled and sequential because the central responsive contract is consumed by every later style edit and the ceiling proof depends on the completed refactor.

## Global Constraints

- Continue on branch `codex/port-17-index-react` in linked worktree `Z:\_agent-worktrees\portfolio\codex\port-17-index-react`; do not create another branch/worktree and do not mutate `Z:\portfolio`.
- Keep PR #58 open and draft. Do not merge, mark ready, or describe the full Specialists page as complete.
- Image generation remains hands-off.
- Support the authored page from `320` through `2560` CSS px and keep protected current pixels unchanged at `2560`, `1600`, `1440`, `768`, `390`, and `320`.
- Above `2560`, centre a `2560px` authored canvas and freeze internal geometry to its accepted `2560` values while exterior space grows.
- Treat `390`, `720`, `900`, `1400`, `1600`, and `1921` as page-owned responsive edges. Treat `620` only as the existing named opening-local exception.
- Start the wide regime at `1400`; remove `1401` as a production breakpoint while preserving continuity at the `1399/1400` edge.
- Preserve the existing `1600` traversal-return beat and `1920/1921` hard ultrawide topology switch.
- Preserve all current Index geometry/occlusion invariants and vertical-slice ownership boundaries.
- Add no later Specialist chapter and make no public-copy or asset changes.
- Use focused checks while iterating. Let the tracked pre-commit hook own the complete `py -3 tools/run.py ci --check` gate for normal commits.
- Never use `--no-verify`. Do not update protected visual snapshots merely to make tests pass; any unexpected diff is a regression until inspected.

---

### Task 1: Establish the page-local responsive vocabulary

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.test.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`

**Interfaces:**
- Produces `SPECIALISTS_WIDTHS` with `minimum: 320`, `narrowMax: 390`, `openingNarrowMax: 620`, `compactMax: 720`, `midMax: 900`, `wideMin: 1400`, `expandedMin: 1600`, `ultrawideMin: 1921`, and `ceiling: 2560`.
- Produces `specialistsMedia` strings: `atMostNarrow`, `openingAtMostNarrow`, `atMostCompact`, `atMostMid`, `belowWide`, `atLeastWide`, `atLeastExpanded`, `atLeastUltrawide`, and `beyondCeiling`.
- Produces `SpecialistsCanvas`, a centred `width: min(100%, 2560px)` composition container under the full-width `SpecialistsStory` article, with stable `data-specialists-canvas="authored"` hook in JSX.

- [ ] **Step 1: Write the failing responsive-contract unit test**

Create `specialistsResponsive.test.ts`:

```ts
import { describe, expect, test } from 'vitest'
import { SPECIALISTS_WIDTHS, specialistsMedia } from './specialistsResponsive'

describe('Specialists responsive contract', () => {
  test('names the authored 320-2560 domain and its page-local edges', () => {
    expect(SPECIALISTS_WIDTHS).toEqual({
      minimum: 320,
      narrowMax: 390,
      openingNarrowMax: 620,
      compactMax: 720,
      midMax: 900,
      wideMin: 1400,
      expandedMin: 1600,
      ultrawideMin: 1921,
      ceiling: 2560,
    })
    expect(specialistsMedia.atLeastWide).toBe('(min-width: 1400px)')
    expect(specialistsMedia.beyondCeiling).toBe('(min-width: 2561px)')
  })
})
```

- [ ] **Step 2: Run the unit test and prove RED**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/specialistsResponsive.test.ts
```

Expected: FAIL because `./specialistsResponsive` does not exist.

- [ ] **Step 3: Implement the responsive module and authored canvas**

Create `specialistsResponsive.ts` with the exact constants above and media strings derived from those constants. Add `SpecialistsCanvas` to `UsualSpecialistsPage.styles.ts` with `width: min(100%, 2560px)`, `margin-inline: auto`, and `position: relative`. Wrap `UsualSpecialistsOpening` and `IndexChapter` in that canvas in `UsualSpecialistsPage.tsx` and add `data-specialists-canvas="authored"`.

- [ ] **Step 4: Run focused component/unit proof**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/specialistsResponsive.test.ts src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Mark Task 1 checklist complete in this plan**

Change Task 1's five checkboxes to `[x]` after observing the stated proof.

---

### Task 2: Replace raw Specialists viewport thresholds with the owned vocabulary

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexDeskDocument.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexBlueCarrier.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.tsx`

**Interfaces:**
- Consumes `specialistsMedia` from Task 1.
- Leaves every vertical-slice prop contract unchanged.
- The existing `620` opening/rope rules consume only `specialistsMedia.openingAtMostNarrow`; no Index chapter file may consume that exception.
- Existing `min-width: 1401px` rules become `@media ${specialistsMedia.atLeastWide}` (`1400px`). Existing `max-width: 1399px` rules become `@media ${specialistsMedia.belowWide}`.

- [ ] **Step 1: Refactor media-query literals without changing owned geometry values**

Import `specialistsMedia` into each listed style-bearing file and replace its route-local breakpoint literals with the matching named query. Preserve all property values other than changing the wide threshold from `1401` to `1400`.

- [ ] **Step 2: Prove no raw authored breakpoint queries remain in current Specialists production files**

Run:

```powershell
rg -n "@media \\((?:min|max)-width: (?:390|620|720|900|1399|1401|1600|1921)px\\)" src/client/src/features/patch-showcase/usual-specialists src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx
```

Expected: no matches. `specialistsResponsive.ts` is the single source containing the numeric media strings.

- [ ] **Step 3: Run the focused Specialists unit suite**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists
```

Expected: PASS.

- [ ] **Step 4: Run existing responsive browser relationships before adding ceiling behaviour**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "The Usual Specialists"
```

Expected: existing Specialists structural suite PASS, including `1399/1400/1401`, `1599/1600`, and `1920/1921` coverage.

- [ ] **Step 5: Mark Task 2 checklist complete in this plan**

Change Task 2's five checkboxes to `[x]` after observing the stated proof.

---

### Task 3: Freeze the complete authored geometry above 2560

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`

**Interfaces:**
- Consumes `SpecialistsCanvas` and `specialistsMedia.beyondCeiling`.
- Above `2560`, only exterior canvas margin changes. The following existing unbounded viewport formulas are explicitly frozen at their `2560` results:
  - opening threshold-copy left edge: `580px` relative to authored canvas;
  - Index story-card left edge: `1927.2px` relative to authored canvas;
  - Index commission-composition left edge: `1184px` relative to authored canvas.
- Existing clamped ultrawide formulas remain unchanged because they already reach a finite cap by the authored ceiling.

- [ ] **Step 1: Add a failing browser test for the explicit ceiling**

In `project-story.spec.ts`, add one Specialists test that captures at `2560` the canvas-relative bounding boxes of `[data-patch-series-lockup]`, `[data-specialists-wordmark]`, `[data-index-substrate="desk-diagram"]`, `[data-index-substrate="blue-carrier"]`, `[data-index-substrate="graph-paper"]`, `[data-index-story-card]`, `[data-index-commission-composition="commission-evidence"]`, and representative traversal figures. Recheck at `2561`, `2880`, and `3440`.

For each width require:

```ts
expect(canvas.width).toBeCloseTo(2560, 0)
expect(Math.abs(canvas.x - ((width - 2560) / 2))).toBeLessThanOrEqual(1)
```

Compare each element's `{ x: bounds.x - canvas.x, y: bounds.y - canvas.y, width: bounds.width, height: bounds.height }` to its `2560` reference within `2px`. Also require no horizontal document overflow.

- [ ] **Step 2: Run the ceiling test and prove RED**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "freezes its authored 2560 geometry"
```

Expected: FAIL because at least threshold/story/commission viewport-driven geometry continues beyond the current ceiling.

- [ ] **Step 3: Add minimal above-ceiling overrides**

Use `@media ${specialistsMedia.beyondCeiling}` only in the owning style components:

```css
/* UsualSpecialistsOpening.styles.ts / ThresholdCopy */
left: 580px;

/* IndexChapter.styles.ts / StoryCardPlacement */
left: 1927.2px;

/* IndexChapter.styles.ts / CommissionCompositionPlacement */
left: 1184px;
```

Do not duplicate already-clamped geometry and do not add a transform/scale to the whole page.

- [ ] **Step 4: Run the ceiling and existing Specialists browser proof**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "The Usual Specialists|freezes its authored 2560 geometry"
```

Expected: all focused Specialists tests PASS.

- [ ] **Step 5: Run protected visual regression without update mode**

Run:

```powershell
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft"
```

Expected: PASS unchanged at `2560`, `1600`, `1440`, `768`, `390`, and `320`. Any diff is a regression and must be diagnosed; do not update snapshots in this task.

- [ ] **Step 6: Mark Task 3 checklist complete in this plan**

Change Task 3's six checkboxes to `[x]` after observing the stated proof.

---

### Task 4: Review, publish, and close plan custody

**Files:**
- Modify via generator only: relevant `INDEX.md` files after adding responsive source/test/spec/plan files.
- Remove after published proof: `.agents/plans/2026-09-12-specialists-responsive-strategy.md` leaves the tracked tree under the current completed-artifact standard. Preserve any optional convenience copy only in the central disposable scratch store; Git history remains the record.
- Update: PR #58 evidence/body if needed, keeping it open and draft.

**Interfaces:**
- Consumes the completed implementation and focused proof from Tasks 1-3.
- Produces a normal hooked source commit, exact pushed head, draft PR evidence, then a docs-only custody commit if moving the plan changes the tree.

- [ ] **Step 1: Regenerate and verify the repo mesh before the source commit**

Run from repo root:

```powershell
py -3 tools/run.py index-mesh --apply
py -3 tools/run.py mesh --check
git diff --check
```

Expected: mesh check and diff check PASS.

- [ ] **Step 2: Perform a fresh-context read-only review**

Review the full responsive-strategy diff against the approved spec, with emphasis on breakpoint ownership, no visual drift through `2560`, true ceiling lock above `2560`, vertical-slice ownership, and browser-test quality. Resolve any Critical/Important findings and re-run the smallest affected proof.

- [ ] **Step 3: Stage only the intended source/test/generated-navigation package and commit normally**

Use a normal commit such as:

```powershell
git commit -m "refactor: establish Specialists responsive strategy"
```

Do not use `--no-verify`. The tracked hook owns the complete canonical CI gate.

- [ ] **Step 4: Push and verify PR #58 against the exact source head**

Push `codex/port-17-index-react`, verify PR #58 resolves to that head, refresh evidence if needed, and keep the PR `OPEN` + `DRAFT` with the partial Specialists caveat.

- [ ] **Step 5: Remove the completed planning artifacts from tracked custody, regenerate mesh, and make the docs-only commit normally**

After published proof, remove this completed plan and its completed design spec from the tracked tree in accordance with `.agents/doctrine/completed-artifacts.md`. An optional convenience copy may be placed under the central disposable `_agent-scratch/<repo-name>/completed/` store, but it is not evidence. Run `py -3 tools/run.py index-mesh --apply` and `py -3 tools/run.py mesh --check`, then commit normally so the hook proves the custody tree too. Push and verify the final remote head.

- [ ] **Step 6: Mark Task 4 checklist complete before the plan move and report exact final proof**

Report source/custody SHAs, focused test results, canonical hook result, clean worktree, exact remote alignment, and PR #58 remaining open/draft. Do not call the full Specialists page complete.

## Plan readiness

**Rating:** 9.5/10.

The approved authored bands, `620` local exception, `1400` continuity correction, explicit `2560` ceiling, exact above-ceiling frozen coordinates, ownership boundaries, RED/GREEN proof, protected visual gate, publication route, and custody closeout are all specified. Execution should not require inventing a breakpoint, component API, visual outcome, or validation command.
