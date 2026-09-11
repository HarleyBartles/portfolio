# Index Commission Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three separately positioned Index commission siblings with one `IndexCommissionComposition` vertical slice while preserving the approved PORT-17 Index visuals, ultrawide topology, and character-legibility invariants.

**Architecture:** `IndexCommissionComposition` becomes the sole owner of the relative placement and stacking of `IndexObservation`, `IndexMacguffin`, and `IndexAssentNote`. `IndexChapter` places that composition as one opaque child; Commission 03 is the internal origin, the existing 1920-and-below relationships are reproduced inside the new component, and the 1921+ internal arrangement freezes at the accepted 1921 geometry while only the whole composition continues translating right. `IndexObservation` remains untouched internally, so its existing Patch and Index traversal figures continue to move with Commission 03 automatically.

**Tech Stack:** React 19, TypeScript 6, styled-components 6, Vitest, Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-11-index-commission-composition-design.md`

**Execution Strategy:** Choose either `executing-plans` in this session or `subagent-driven-development` task-by-task at handoff. Whichever lane is chosen must preserve the approved uncommitted visual draft and the live Vite/Chrome review state through the ownership refactor. Do not make a source commit until the user has inspected and approved the refactored live composition.

## Global Constraints

- Continue on branch `codex/port-17-index-react` in linked worktree `Z:\_agent-worktrees\portfolio\codex\port-17-index-react`; do not create another branch or worktree and do not mutate `Z:\portfolio`.
- Keep PR #58 open and draft; do not mark it ready, merge it, or describe the full Specialists page as complete.
- Scope remains the partial PORT-17 page: opening/header, apartment/safehouse establishing composition, accepted Index chapter, and temporary accepted red rope path only; add no later Specialist chapters.
- Image generation remains hands-off.
- Preserve the accepted composition through 1920 CSS px.
- At 1921 CSS px, keep the hard topology switch: the lower Patch moves from left of the upper Patch to right of it, with at least 48 CSS px visible separation and no interpolation through the upper figure.
- Keep the blue INDEX sheet and graph paper outside `IndexCommissionComposition`. From 1921+, preserve their existing locked relative offset while the blue sheet recovers only as far as its 1920 position; the beige desk document does not move.
- Keep Commission 03 and Commission 04 visibly overlapping by at least 24 CSS px throughout 1921-2560.
- Commission 04 may cover no more than 50% of Patch's protected visible region inside Commission 03.
- Commission 04 and the sticky note must leave Index's protected face region completely unoccluded.
- The sticky note centre must stay inside the horizontal Commission 03/04 overlap band and the note must physically overlap both art cells.
- Keep `IndexObservation`, `IndexMacguffin`, and `IndexAssentNote` as opaque children. Do not move `patch-peer` or `index-inspect` out of `IndexObservation` and do not reach into any child DOM from the new component.
- `IndexCommissionComposition` may expose only `style?: React.CSSProperties` as a root-only override. Do not expose `className`, raw coordinate props, descendant style props, cross-boundary geometry CSS variables, or a `styled(ChildComponent)` seam.
- Keep whole desk height ownership in `IndexChapter.styles.ts`: `DeskComposition` remains `height: clamp(640px, 44vw, 780px)` with `height: 700px` at `<=720px`; do not reintroduce those values into `IndexDeskDocument`.
- Preserve the current unstaged accepted edits in `src/client/e2e/project-story.spec.ts` and `IndexChapter.styles.ts` while moving ownership; do not reset or weaken them.
- Do not edit `src/client/public/media/patch/the-usual-specialists/index-wordmark.svg`.
- Use focused checks while iterating. Let the tracked pre-commit hook own the complete `py -3 tools/run.py ci --check` run once the final source tree is staged.
- Never use `--no-verify` and never update visual snapshots merely to make tests pass.

---

### Task 1: Add the opaque `IndexCommissionComposition` vertical slice

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.styles.ts`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.tsx`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.test.tsx`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexMacguffin.tsx`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexMacguffin.test.tsx`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.tsx`
- Verify unchanged: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.test.tsx`

**Interfaces:**
- Consumes: `IndexObservation`, `IndexMacguffin`, and `IndexAssentNote` with their existing `style?: React.CSSProperties` root-only contracts.
- Produces: `export const IndexCommissionComposition = ({ style }: { style?: CSSProperties }): ReactElement` with root marker `data-index-commission-composition="commission-evidence"`.
- Internal geometry: Commission 03 is internal origin `(0, 0)` at every responsive band. Commission 04 and the assent note are positioned only by private wrappers inside this component.
- Ultrawide contract: at `>=1921px`, Commission 04 is `465.31px` to the right and `85px` below Commission 03; the assent note is `402.655px` to the right and `175px` below Commission 03. Those values are the exact relative offsets produced by the accepted 1921 parent formulas.

- [x] **Step 1: Write the failing component contract test**

Create `IndexCommissionComposition.test.tsx` with this contract:

```tsx
import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexCommissionComposition } from './IndexCommissionComposition'

describe('IndexCommissionComposition', () => {
  test('owns the three commission slices and forwards a root-only style override', () => {
    const { container } = render(<IndexCommissionComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-commission-composition="commission-evidence"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-index-substrate="commission-03"]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-substrate="commission-04"]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-substrate="assent-note"]')).toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexCommissionComposition className="external-control" />)
    expect(container.querySelector('[data-index-commission-composition="commission-evidence"]')).not.toHaveClass('external-control')
  })
})
```

- [x] **Step 2: Run the new test and prove it is red before implementation**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx
```

Expected: FAIL because `./IndexCommissionComposition` does not exist yet.

- [x] **Step 3: Implement the component shell with opaque children**

Create `IndexCommissionComposition.tsx`:

```tsx
import type { CSSProperties, ReactElement } from 'react'
import { IndexAssentNote } from './IndexAssentNote'
import {
  AssentNotePlacement,
  Composition,
  MacguffinPlacement,
  ObservationPlacement,
} from './IndexCommissionComposition.styles'
import { IndexMacguffin } from './IndexMacguffin'
import { IndexObservation } from './IndexObservation'

type IndexCommissionCompositionProps = {
  style?: CSSProperties
}

export const IndexCommissionComposition = ({ style }: IndexCommissionCompositionProps): ReactElement => {
  return (
    <Composition data-index-commission-composition="commission-evidence" style={style}>
      <ObservationPlacement>
        <IndexObservation />
      </ObservationPlacement>
      <AssentNotePlacement>
        <IndexAssentNote />
      </AssentNotePlacement>
      <MacguffinPlacement>
        <IndexMacguffin />
      </MacguffinPlacement>
    </Composition>
  )
}
```

The existing three child components remain unchanged. In particular, do not edit `IndexObservation` traversal placement; `patch-peer` and `index-inspect` must remain owned by that component.

- [x] **Step 4: Move the accepted relative geometry into private composition styles**

Create `IndexCommissionComposition.styles.ts` with Commission 03 as the origin and this exact responsive geometry:

```tsx
import styled from 'styled-components'

export const Composition = styled.div`
  position: relative;
  width: 1110px;
  height: 359px;

  @media (min-width: 1401px) {
    width: calc(2vw + 1082px);
  }

  @media (min-width: 1921px) {
    width: 1065.31px;
  }

  @media (max-width: 1399px) {
    width: 840px;
    height: 475px;
  }

  @media (max-width: 900px) {
    width: 670px;
    height: 505px;
  }

  @media (max-width: 720px) {
    width: 660px;
    height: 577px;
  }

  @media (max-width: 390px) {
    width: 500px;
    height: 497px;
  }
`

export const ObservationPlacement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;

  @media (max-width: 1399px) {
    width: 530px;
  }

  @media (max-width: 900px) {
    width: 520px;
  }

  @media (max-width: 720px) {
    width: 660px;
  }

  @media (max-width: 390px) {
    width: 500px;
  }
`

export const MacguffinPlacement = styled.div`
  position: absolute;
  z-index: 11;
  top: 85px;
  left: 510px;
  width: 600px;

  @media (min-width: 1401px) {
    left: calc(2vw + 482px);
  }

  @media (min-width: 1921px) {
    left: 465.31px;
  }

  @media (max-width: 1399px) {
    top: 220px;
    left: 380px;
    width: 460px;
  }

  @media (max-width: 900px) {
    top: 250px;
    left: 270px;
    width: 400px;
  }

  @media (max-width: 720px) {
    top: 322px;
    left: 100px;
    width: 330px;
  }

  @media (max-width: 390px) {
    top: 242px;
    left: 150px;
    width: 280px;
  }
`

export const AssentNotePlacement = styled.div`
  position: absolute;
  z-index: 12;
  top: 175px;
  left: 450px;
  width: 220px;
  transform: rotate(-5deg);

  @media (min-width: 1401px) {
    left: calc(10vw + 310px);
  }

  @media (min-width: 1921px) {
    left: 402.655px;
  }

  @media (max-width: 1399px) {
    top: 180px;
    left: 350px;
    width: 220px;
  }

  @media (max-width: 900px) {
    top: 200px;
    left: 280px;
    width: 172px;
  }

  @media (max-width: 720px) {
    top: 272px;
    left: 280px;
    width: 150px;
  }

  @media (max-width: 390px) {
    top: 190px;
    left: 300px;
    width: 124px;
  }
`
```

Why these values are authoritative:

- At the base/1400 layout, the old parent positions give Commission 04 `510px` right / `85px` down from Commission 03 and the note `450px` right / `175px` down.
- From 1401 through 1920, subtracting the existing Commission 03 trajectory from the existing Commission 04/note trajectories yields exactly `calc(2vw + 482px)` and `calc(10vw + 310px)` respectively.
- At 1921, the accepted formulas yield Commission 04 offset `465.31px` and note offset `402.655px`; freezing those values at 1921+ removes the independent trajectories while preserving the tight-end approved topology.
- The root widths/heights bound the authored absolute children without changing their scale. They are private internal dimensions, not caller controls.

- [x] **Step 5: Run the new composition test green and re-run the existing child contracts**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx src/features/patch-showcase/usual-specialists/IndexObservation.test.tsx src/features/patch-showcase/usual-specialists/IndexMacguffin.test.tsx src/features/patch-showcase/usual-specialists/IndexAssentNote.test.tsx
```

Expected: PASS. `IndexObservation.test.tsx` must still prove `patch-peer` and `index-inspect` use substrate `commission-03-baseline`.

Do not commit yet; the user requires live visual approval after integration.

- [x] **Step 6: Mark Task 1 complete in this plan**

Change Task 1's checklist boxes to `[x]` only after the focused component and child-contract tests pass.

---

### Task 2: Replace the three chapter placements with one whole-composition placement

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Preserve current accepted dirty changes: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: Task 1 `IndexCommissionComposition` with no caller-facing geometry API.
- Produces: `IndexChapter` with one `CommissionCompositionPlacement` around one `IndexCommissionComposition`; the chapter no longer imports or positions `IndexObservation`, `IndexMacguffin`, or `IndexAssentNote` directly.
- Parent whole-composition placement: top/left only, preserving the former Commission 03 stage position. At `>=1921px`, the wrapper remains `left: calc(50vw - 96px)`, so the entire fixed-internal commission composition translates right as viewport width grows.

- [x] **Step 1: Tighten the chapter compositor test to the new ownership boundary**

In `IndexChapter.test.tsx`, replace the three assertions for `commission-03`, `commission-04`, and `assent-note` with one assertion for the opaque composition root:

```tsx
expect(chapter.querySelector('[data-index-commission-composition="commission-evidence"]')).toBeInTheDocument()
```

Do not assert Commission 03/04/note internals from `IndexChapter.test.tsx`; Task 1's colocated composition test owns that contract.

- [x] **Step 2: Run the chapter test and prove the new boundary is red before integration**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx
```

Expected: FAIL because `IndexChapter` does not yet render `data-index-commission-composition="commission-evidence"`.

- [x] **Step 3: Refactor `IndexChapter.tsx` to compose one whole child**

Remove direct imports of `IndexAssentNote`, `IndexMacguffin`, and `IndexObservation`. Import `IndexCommissionComposition` and `CommissionCompositionPlacement` instead.

The commission section of the render tree becomes exactly:

```tsx
<CommissionCompositionPlacement>
  <IndexCommissionComposition />
</CommissionCompositionPlacement>
```

Keep it in the same stage-level position currently occupied by the three commission siblings: after `BlueCarrierPlacement` and before the `Stage` closes. Do not move the blue carrier, graph paper, desk composition, or story card into the new component.

- [x] **Step 4: Remove commission-child geometry from `Stage` and add the whole-child wrapper**

In `IndexChapter.styles.ts`:

1. Delete all nine commission geometry variables from `Stage`:

```text
--index-03-left
--index-03-top
--index-03-width
--index-04-left
--index-04-top
--index-04-width
--index-note-left
--index-note-top
--index-note-width
```

2. Delete their 1401+, 1921+, 1399-, 900-, 720-, and 390- overrides.

3. Preserve the stage-height outcomes without a cross-boundary geometry channel by replacing the existing variable-derived mobile `min-height` rules with literal equivalents:

```tsx
export const Stage = styled.div`
  position: relative;
  min-height: 980px;

  @media (max-width: 900px) {
    min-height: 1119px;
  }

  @media (max-width: 720px) {
    min-height: 1295px;
  }

  @media (max-width: 390px) {
    min-height: 1215px;
  }
`
```

`1119px` preserves old `840px + 279px`; `1295px` preserves old `1040px + 255px` through 391-720px. At `<=390px`, the former CSS-variable expression late-bound to the later `--index-04-top: 960px` override, so `1215px` preserves the actual old `960px + 255px` stage height.

4. Delete the old exported `ObservationPlacement`, `MacguffinPlacement`, and `AssentNotePlacement` definitions from the bottom of the file.

5. Add this one parent-owned whole-composition wrapper:

```tsx
export const CommissionCompositionPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 590px;
  left: calc(50% - 430px);

  @media (min-width: 1401px) {
    left: clamp(270px, calc(5vw + 200px), 328px);
  }

  @media (min-width: 1921px) {
    left: calc(50vw - 96px);
  }

  @media (max-width: 1399px) {
    left: calc(50% - 390px);
  }

  @media (max-width: 900px) {
    left: 40px;
  }

  @media (max-width: 720px) {
    top: 718px;
    left: -40px;
  }

  @media (max-width: 390px) {
    left: -110px;
  }
`
```

The wrapper owns only the whole child's stage placement and z-layer. Do not set descendant coordinates from the chapter and do not use `styled(IndexCommissionComposition)`.

6. Preserve these existing dirty ultrawide rules byte-for-byte unless a focused test proves a separate defect:

```tsx
@media (min-width: 1921px) {
  left: clamp(70px, calc(28.3vw - 474px), 174px);
}
```

for `BlueCarrierPlacement`, and:

```tsx
@media (min-width: 1921px) {
  left: clamp(330px, calc(28.3vw - 214px), 434px);
}
```

for `GraphPaperPlacement`. Also preserve `StoryCardPlacement`'s existing 1921+ `left: calc(92vw - 428px)` rule and all desk sizing rules.

- [x] **Step 5: Run the focused component/chapter unit tests**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx src/features/patch-showcase/usual-specialists/IndexObservation.test.tsx src/features/patch-showcase/usual-specialists/IndexMacguffin.test.tsx src/features/patch-showcase/usual-specialists/IndexAssentNote.test.tsx src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx
```

Expected: PASS.

- [x] **Step 6: Prove the ownership seam is gone in source**

Run:

```powershell
rg -n -- "--index-(03|04|note)|ObservationPlacement|MacguffinPlacement|AssentNotePlacement|styled\(IndexCommissionComposition\)" src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts
```

Expected: no matches. This check applies only to the chapter files; similarly named private wrappers inside `IndexCommissionComposition.styles.ts` are correct ownership.

Do not commit yet; proceed directly to responsive proof and live user review.

- [x] **Step 7: Mark Task 2 complete in this plan**

Change Task 2's checklist boxes to `[x]` only after the focused unit tests and ownership-seam search pass.

---

### Task 3: Prove responsive invariants, obtain live approval, then publish the bounded refactor

**Files:**
- Preserve and include existing accepted test edits: `src/client/e2e/project-story.spec.ts`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.tsx`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.styles.ts`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Verify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Regenerate after new files exist: generated `INDEX.md` files via the repo mesh command.
- Move only after this refactor is fully published: `.agents/plans/2026-09-11-index-commission-composition.md` to `.agents/plans/completed/2026-09-11-index-commission-composition.md`.

**Interfaces:**
- Consumes: Tasks 1-2 integrated component ownership plus the already-written browser geometry invariants in `project-story.spec.ts`.
- Produces: a user-approved live composition, focused browser/unit proof, a normal hooked source commit on the existing branch, and an updated draft PR #58 without changing its partial-scope status.

- [x] **Step 1: Run the four focused Specialists structural/browser tests**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "The Usual Specialists"
```

Expected: 4 tests PASS, including:

```text
The Usual Specialists preserves the accepted Index composition across authored responsive bands
The Usual Specialists keeps the accepted Index traversal relationships through ultrawide
The Usual Specialists switches the lower Patch across the upper Patch at the ultrawide boundary without collapsing their visual separation
The Usual Specialists keeps Commission 03 character evidence legible through the ultrawide overlap
```

The existing browser assertions remain authoritative and must not be weakened: 48px Patch-to-Patch separation, fixed blue-sheet/graph relative offset at 1921+, blue-sheet recovery capped at its 1920 position, 24px minimum Commission 03/04 overlap, Patch coverage `<=0.5`, zero Index-face overlap, and sticky-note seam bridging.

- [x] **Step 2: Check whitespace and inspect the complete bounded diff**

Run:

```powershell
git diff --check
git status --short
git diff -- src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.tsx src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.styles.ts src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.test.tsx src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/client/e2e/project-story.spec.ts
```

Expected: `git diff --check` is clean; the diff contains the new composition boundary plus the already-approved ultrawide test/style draft and no unrelated files.

- [x] **Step 3: Reuse the existing Vite server and Chrome responsive tab for user visual review**

Keep the existing route live at:

```text
http://127.0.0.1:5173/patch/the-usual-specialists/
```

Reuse the existing browser instance rather than starting another one. Inspect at minimum these CSS viewport widths in the current responsive DevTools tab:

```text
1920
1921
2048
2560
```

At 1920, verify the previously accepted topology remains unchanged. At 1921, verify the hard topology switch and the accepted tight commission arrangement. At 2048 and 2560, verify Commission 03/04/note travel as one fixed-internal collage while the whole group moves right, the sticky note still stitches the seam, Patch remains legible, Index's face remains clear, and the blue INDEX/graph group retains its separate locked relationship.

Stop here for the user's live visual judgement. Do not stage or commit the source refactor before explicit approval of this live state.

- [x] **Step 4: After live approval, run the focused protected visual regression without update mode**

Run:

```powershell
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft"
```

Expected: inspect the actual result; do not assume PASS. If it passes, make no snapshot changes. If it fails because the newly approved ultrawide composition intentionally differs from the existing protected baseline, preserve the failure evidence and stop for an explicit snapshot-baseline decision; do not run update mode automatically.

Execution note: the first protected run failed only at 2560 because the approved ultrawide composition intentionally replaced the old baseline. After explicit user approval, only the 2560 snapshot was updated from the inspected actual image. The normal rerun then exposed an unintended 390px story-height increase from 2470px to 2550px. Root-cause tracing showed the old variable-based `min-height` late-bound to the 390px `--index-04-top: 960px`, producing `1215px`; the refactor had literalized the 720px value as `1295px`. Adding a 390px `min-height: 1215px` override restored the existing 390 snapshot unchanged. A final normal protected run passed all six widths.

- [x] **Step 5: Regenerate and verify navigation for the new component/test/plan files**

Run:

```powershell
py -3 tools/run.py index-mesh --apply
py -3 tools/run.py mesh --check
```

Expected: generated indexes include the new commission component/test/plan paths and `mesh --check` passes.

- [x] **Step 6: Stage only the intended implementation package and commit normally**

Stage the exact intended source/test/generated-navigation files after live approval and visual-regression disposition. Do not stage unrelated work.

Use a normal commit such as:

```powershell
git commit -m "refactor: compose Index commission evidence"
```

Expected: the tracked pre-commit hook runs the complete canonical local gate and the commit succeeds. Do not use `--no-verify`, and do not run `py -3 tools/run.py ci --check` immediately before or after the normal hooked commit.

- [x] **Step 7: Push the existing branch and refresh draft PR #58 proof**

Push `codex/port-17-index-react`, verify PR #58's published head matches the exact local commit SHA, and update its evidence/body only as needed to describe the new `IndexCommissionComposition` ownership and fresh validation. Keep PR #58 OPEN and DRAFT and retain the partial-page caveat.

- [x] **Step 8: Close only this implementation plan's custody after publication proof**

After the source commit is pushed and PR #58 is verified at that head, move:

```text
.agents/plans/2026-09-11-index-commission-composition.md
```

to:

```text
.agents/plans/completed/2026-09-11-index-commission-composition.md
```

Then run:

```powershell
py -3 tools/run.py index-mesh --apply
py -3 tools/run.py mesh --check
```

Commit and push that docs-only custody change normally if the repo's tracked state requires it. Completing this narrow plan does not mean the full Specialists page is complete and does not make PR #58 ready for review.

- [x] **Step 9: Mark Task 3 complete before moving the plan**

Change Task 3's checklist boxes to `[x]` only after live user approval, focused visual-regression disposition, normal hooked source commit, push/PR head verification, and plan-custody closeout all succeed.

## Plan readiness

- Handoff gate: plan-readiness
- Rating: 9.5/10
- Rationale: the approved ownership boundary, exact 1920-and-below geometry preservation, exact 1921 frozen internal offsets, parent wrapper trajectory, dirty-draft preservation, focused red/green commands, browser checkpoints, user approval gate, and publication constraints are all explicit. The implementer should not need to invent any component API, breakpoint behaviour, or validation route.
