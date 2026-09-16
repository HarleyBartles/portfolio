# The Usual Specialists responsive composition architecture implementation plan

**Status:** Ready for execution planning handoff. Execution has not started.

**Plan-readiness handoff gate:** 9/10 on 2026-09-16. Task dependencies are sequential, every mutation slice has an explicit RED/GREEN contract and focused verification command, generated surfaces are ordered after source changes, the normal staged-tree hook remains the canonical CI gate, and no implementation task requires an unresolved product or ownership decision.

**Source spec:** `.agents/specs/2026-09-16-usual-specialists-responsive-composition-architecture-design.md`

**Execution strategy:** `executing-plans`, sequentially in this worktree. The tasks are tightly coupled through one protected visual composition, so do not dispatch independent workers for them.

**Goal:** Replace the historical route-wide Specialists breakpoint taxonomy with a thin page chassis and independently owned Opening, connector, Index and Silk responsive compositions, while preserving every accepted Index/Silk pixel relationship and leaving a simple seam for Writ and the remaining cast.

## Baseline and execution preconditions

- Worktree: `Z:\_agent-worktrees\portfolio\codex\port-17-silk-continuation`
- Branch: `codex/port-17-silk-continuation`
- Planning baseline commit: `828af25` (`feat: complete Silk responsive frame checkpoint`)
- Canonical preview route: `/patch/the-usual-specialists/next/`
- Published `/patch/the-usual-specialists/` remains the frozen six-specialist legacy experience and is out of scope.
- Current planning tree contains the approved responsive architecture spec plus the separately requested Marketplace revision-drift warning change. Before implementation starts, preserve those changes as their own reviewed/committed planning/tooling state; do not accidentally fold them into a feature refactor commit.
- Do not reset, stash, clean, or discard unrelated work to manufacture a clean tree.
- Do not update protected visual snapshots during this refactor. A snapshot difference is a regression until explicitly reviewed and approved.
- Do not generate or replace assets.
- Do not redesign Index or Silk.
- Do not add Writ, Klause, Rollback or Receipt chapters in this plan.
- Do not introduce a universal page grid, chapter registry, responsive-layout framework, React geometry context, or geometry ThemeProvider.
- Use named `const` arrow functions and the repository's vertical-slice ownership rules.

## Architectural target

The route ends with these ownership layers:

```text
UsualSpecialistsPage
  SpecialistsCanvas: fluid from 320 support floor to 2560 authored ceiling
    UsualSpecialistsOpening: owns opening responsiveness
    SpecialistsChapterNav: owns nav responsiveness
    opening-index crossing: owns seam responsiveness
    IndexChapter: owns Index responsiveness
    index-silk crossing: owns seam responsiveness
    SilkChapter: owns Silk responsiveness
```

The page does not own `390`, `720`, `900`, `1400`, `1600` or `1920` as route-wide composition states. Coincident numbers may appear in several local contracts when the independently owned compositions genuinely change at the same width.

Chapter descendants may use named inline-size containers so the authored geometry freezes naturally with the `2560px` canvas. A composition root cannot query itself; root-only width changes may remain owner-local viewport media queries or move onto an inner stage. Seam geometry that coordinates two independently owned surfaces may also retain seam-owned viewport queries. Neither case recreates page-wide responsive doctrine.

## Protected behaviour that must not change

- `320px` remains supported with no horizontal overflow.
- The authored canvas remains capped at `2560px` and centered beyond that width.
- Index's accepted document, graph-paper, blue-carrier, commission, figure and rope relationships remain unchanged.
- Opening-to-Index and Index-to-Silk rope/lock registrations remain continuous.
- Silk's `1200px` recomposition remains a first-class responsive transition.
- Existing `1500`, `1800` and `1919` Silk effects are preserved in this pass unless a purely mechanical ownership move makes a redundant query disappear with zero rendered change.
- Commission 09 keeps the portrait source below `390px`.
- Commission 09 keeps the accepted compact and narrow edge bleed.
- Receipt/Silk mirroring and hole attachment remain unchanged.
- Aperture parallax remains bounded and reduced-motion behaviour remains unchanged.
- Existing protected Specialists screenshots remain byte-for-byte baseline-compatible.

## Validation rules for every task

1. Use TDD for each new behavioural or architectural contract: write the focused failing test, run it and confirm the expected failure, make the minimum implementation change, then rerun it green.
2. Use component tests for component-owned semantics and interfaces.
3. Use Playwright for actual responsive geometry and cross-component relationships.
4. Use the existing Windows visual suite for protected pixels; do not update snapshots.
5. Prefer a focused check after each task. The normal Git hook owns the complete `py -3 tools/run.py ci --check` gate when a task is committed.
6. Do not bypass the hook with `--no-verify`.
7. If implementation authority does not include commits, run the focused checks and leave commit steps unapplied rather than bypassing repository workflow.

---

## Task 1: Remove page-level breakpoint ownership from the canvas chassis

**Consumes:** approved spec and the current `UsualSpecialistsPage`/canvas implementation.

**Produces:** a page chassis whose only width contract is the `2560px` authored ceiling, plus a focused architecture guard that prevents page-level responsive taxonomy from returning.

**Files:**

- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Add: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Verify: `src/client/e2e/project-story.spec.ts`

### Interface contract

The page canvas should be structurally equivalent to:

```ts
export const SpecialistsCanvas = styled.div`
  width: min(100%, 2560px);
  margin-inline: auto;
  position: relative;
`
```

Do not export a new `SPECIALISTS_WIDTHS`-style object from page code. `320px` is proved as a support invariant in browser tests rather than stored as a page composition state.

### Steps

- [x] **1.1 RED:** Add an architecture assertion that page styles do not import `specialistsResponsive` and do not export/use a route-wide breakpoint taxonomy. The realistic regression this catches is a future page change re-centralising chapter breakpoints.
- [x] **1.2 Verify RED:** Run the focused architecture test and confirm it fails because `UsualSpecialistsPage.styles.ts` still imports `SPECIALISTS_WIDTHS`.
- [x] **1.3 GREEN:** Remove the `specialistsResponsive` import from `UsualSpecialistsPage.styles.ts` and express the `2560px` ceiling directly on `SpecialistsCanvas`.
- [x] **1.4 Keep page tests page-scoped:** Ensure `UsualSpecialistsPage.test.tsx` continues to prove article identity, source order and root-only style forwarding without adding child geometry assertions.
- [x] **1.5 Browser proof:** Run the existing page/canvas browser tests covering `320`, `2560` and beyond-ceiling behaviour. Do not alter geometry to satisfy a unit test.
- [x] **1.6 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(settled composition coherent|freezes its authored canvas)"
  ```
- [x] **1.7 Commit checkpoint:** If commit authority is active, stage only Task 1 implementation/test files and the tracked plan progress, then commit normally with a message such as `refactor: thin Specialists page canvas contract`; let the hook own the full gate.
- [x] **1.8 Progress tracking:** After the checkpoint succeeds, mark every Task 1 box `[x]` in this plan before starting Task 2.

---

## Task 2: Give Opening and chapter crossings their own responsive authority

**Consumes:** Task 1 page chassis.

**Produces:** Opening-owned responsive rules and seam-owned crossing rules with no dependency on route-wide `specialistsResponsive`.

**Files:**

- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/chapterCrossingGeometry.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/CrossSectionConnector.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/CrossSectionConnector.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

Opening may own local threshold strings in `UsualSpecialistsOpening.styles.ts`. Where descendant layout benefits from inline-size ownership, establish a named container on the opening root, for example:

```css
container-name: specialists-opening;
container-type: inline-size;
```

Do not force the opening root itself through a container query; a root cannot query its own container. Owner-local media for root padding is acceptable.

`chapterCrossingGeometry.ts` remains the neutral Opening-to-Index seam contract. Its query strings belong to the seam itself. It may keep local viewport media because it coordinates two independent composition owners.

`CrossSectionConnector` owns the Index-to-Silk lock placement states. Prefer a named inline-size container on `ConnectorSurface` and query the lock-placement descendant where practical:

```text
specialists-crossing container
  lock placement responds to the connector's allocated width
```

### Steps

- [x] **2.1 RED:** Extend the architecture test so Opening, `chapterCrossingGeometry.ts` and `CrossSectionConnector.tsx` are rejected if they import `specialistsResponsive`.
- [x] **2.2 Verify RED:** Run the focused architecture test and confirm all three current imports are detected.
- [x] **2.3 Opening migration:** Replace `specialistsMedia` references in `UsualSpecialistsOpening.styles.ts` with opening-local conditions. Add a named opening inline-size container and use `@container specialists-opening ...` for descendant-only width treatments that can move without changing pixels; keep root-only width behaviour owner-local.
- [x] **2.4 Seam migration:** Replace `specialistsMedia` usage in `chapterCrossingGeometry.ts` with seam-local conditions preserving exactly the current `389/390`, `719/720`, `899/900` and `1399/1400` behaviour.
- [x] **2.5 Connector migration:** Move the connector lock's narrow/compact/mid/default/wide state switching to connector-owned conditions. Keep the current lock placements, rotations and scales exactly:

  ```text
  narrow: 4.516% + 11.65px, scale .7, rotate 3deg
  compact: 4.7144% + 9px, scale .7, rotate 6deg
  mid: 20.9075% + 11.72px, scale .85, rotate 1deg
  default: 22.1358% + 11.77px, scale .85, rotate -1deg
  wide: 329px, scale .9, rotate 2.5deg
  ```

- [x] **2.6 Component proof:** Keep `CrossSectionConnector.test.tsx` limited to compositor ownership: rule, placement wrapper, opaque lockup, root style forwarding and no `className` seam.
- [x] **2.7 Browser ownership proof:** Refactor/add one connector-owned Playwright assertion that samples both sides of the connector transitions (`389/390`, `719/720`, `899/900`, `1399/1400`) and proves the rope/lock registration rather than merely element presence.
- [x] **2.8 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx src/features/patch-showcase/usual-specialists/CrossSectionConnector.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists keeps its rope pieces and authored crossing lockups"
  ```
- [x] **2.9 Commit checkpoint:** If authorized, commit Task 2 as one green seam-ownership slice; do not include Index or Silk migrations yet.
- [x] **2.10 Progress tracking:** Mark every Task 2 box `[x]` before starting Task 3.

---

## Task 3: Move the Index responsive contract into Index ownership

**Consumes:** Task 2 seam-local crossing contract.

**Produces:** an Index-owned inline-size container and Index-local responsive vocabulary used by all Index vertical slices, with no Index import of `specialistsResponsive`.

**Files:**

- Add: `src/client/src/features/patch-showcase/usual-specialists/indexResponsive.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexBlueCarrier.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexCommissionComposition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexDeskDocument.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Modify: architecture guard test from Task 1
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

Create an Index-only query vocabulary. Keep the module intentionally small and scoped to current consumers. A suitable shape is:

```ts
export const INDEX_CONTAINER_NAME = 'index'

export const indexQueries = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughCompact: '(max-width: 719px)',
  throughMid: '(max-width: 899px)',
  belowWide: '(max-width: 1399px)',
  wide: '(min-width: 1400px)',
  expanded: '(min-width: 1600px)',
  ultrawide: '(min-width: 1920px)',
} as const
```

Use only entries the migrated Index source actually needs. Do not recreate unused page vocabulary for symmetry.

`IndexChapter` is the named query container:

```css
container-name: index;
container-type: inline-size;
```

Index descendants may then use `@container index (...)`.

### Ceiling-freeze rule

Index currently contains explicit `beyondCeiling` corrections because formulas use viewport units. Where an Index formula represents chapter-relative movement, replace the relevant `vw` term with `cqi` while the output is otherwise unchanged. Because the Index container stops at the page's `2560px` canvas, the formula then freezes naturally beyond the ceiling.

Do this only for formulas whose containing width is demonstrably the authored Index canvas. Do not rewrite unrelated typography or user-environment media.

### Steps

- [x] **3.1 RED:** Extend the architecture guard to fail while any Index-owned source imports `specialistsResponsive`. Include every current Index consumer listed under Files.
- [x] **3.2 Verify RED:** Run the guard and confirm the current Index imports are the failure.
- [x] **3.3 Add `indexResponsive.ts`:** Define the minimum Index-local query vocabulary needed to preserve the existing transitions.
- [x] **3.4 Establish container ownership:** Add `container-name: index` and `container-type: inline-size` to the `IndexChapter` root/stage boundary that contains all responsive Index descendants.
- [x] **3.5 Migrate Index styles:** Replace route-global media references in `IndexChapter.styles.ts` and all Index child files with `@container index ...` conditions where the responsive target is a descendant of the Index container.
- [x] **3.6 Freeze chapter-relative formulas:** Convert eligible `vw` calculations that currently require `beyondCeiling` fixes to `cqi`, then remove only the now-redundant >2560 corrections. Verify numerically in the browser at `2560` and `2880` before deleting each correction.
- [x] **3.7 Keep seam geometry separate:** Do not move `chapterCrossingPortCss('opening-index')` into Index responsive vocabulary; it remains a seam-owned integration contract from Task 2.
- [x] **3.8 Component proof:** Keep `IndexChapter.test.tsx` focused on composition ownership and opaque children. Do not add viewport-coordinate assertions to JSDOM.
- [x] **3.9 Browser proof:** Create/refactor an Index-owned Playwright matrix that samples Index's actual transitions, including at least `389/390`, `719/720`, `899/900`, `1399/1400`, `1599/1600`, `1919/1920`, `2560/2880`, and asserts the accepted major Index relationships plus no overflow.
- [x] **3.10 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(settled composition coherent|rope pieces and authored crossing lockups|freezes its authored canvas)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```

  The visual command must compare existing Windows snapshots without `--update-snapshots`.
- [x] **3.11 Commit checkpoint:** If authorized, commit the complete Index ownership migration only after unit, browser and protected visual checks are green.
- [x] **3.12 Progress tracking:** Mark every Task 3 box `[x]` before starting Task 4.

---

## Task 4: Establish Silk's local responsive vocabulary and repair traversal ownership

**Consumes:** Tasks 1-3, especially the thin canvas and local composition pattern.

**Produces:** a Silk-owned query container/vocabulary, a parent-owned traversal placement wrapper and no cross-boundary traversal geometry variables.

**Files:**

- Add: `src/client/src/features/patch-showcase/usual-specialists/silkResponsive.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`
- Modify: architecture guard test
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

Create a Silk-only vocabulary for composition states that cross more than one Silk slice. The `1200px` transition must have a truthful name; do not preserve `SILK_1920_TREATMENT_MEDIA`.

Conceptual shape:

```ts
export const SILK_CONTAINER_NAME = 'silk'

export const silkQueries = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughCompact: '(max-width: 719px)',
  throughMid: '(max-width: 899px)',
  mirrored: '(min-width: 720px) and (max-width: 1199px)',
  recomposed: '(min-width: 1200px)',
  recomposedUpper: '(min-width: 1200px) and (max-width: 1399px)',
  // Add only additional currently required Silk states with composition-meaningful names.
} as const
```

The Silk chapter root establishes `container-name: silk; container-type: inline-size` for its descendants. Child-only internal thresholds may remain in the child when they do not represent a cross-slice Silk state.

`SilkTraversalComposition` must no longer assume stage placement itself. `SilkChapter` supplies a whole-child `TraversalPlacement` wrapper; the traversal child fills that assigned box and owns all rope/cutout/join geometry inside it.

### Steps

- [x] **4.1 RED architecture guard:** Add assertions that reject the cross-boundary custom properties `--silk-compact-rope-join-top` and `--silk-compact-traversal-top`, and reject stage-level absolute placement owned by the traversal child's root.
- [x] **4.2 Verify RED:** Run the guard and confirm the current parent/child CSS API is detected.
- [x] **4.3 RED component contract:** Update `SilkTraversalComposition.test.tsx` to prove the child owns one internal rope axis and receives no raw join/traversal coordinate props. Preserve its existing asset/port assertions.
- [x] **4.4 Add `silkResponsive.ts`:** Introduce only the currently shared Silk composition states. Rename the `1200px` state for what it does, not for a stale `1920` label.
- [x] **4.5 Establish Silk container:** Add the named inline-size container on the Silk chapter root. Keep any root-only media rule Silk-local because the root cannot query itself.
- [x] **4.6 Parent placement:** Add `TraversalPlacement` in `SilkChapter.styles.ts`, place it where the traversal child currently occupies the stage, and wrap `<SilkTraversalComposition />` in `SilkChapter.tsx`.
- [x] **4.7 Child internalization:** Change the traversal root from stage-level `position:absolute; inset:0` ownership to a box-filling local composition. Move the compact join/traversal calculations that currently arrive through CSS variables into the traversal's own Silk-container-relative CSS. Use `cqi` where those formulas were authored against the full Silk canvas.
- [x] **4.8 Remove hidden API:** Delete both cross-boundary CSS custom-property declarations from `SilkChapter.styles.ts` and all `var(...)` consumers from `SilkTraversalComposition.tsx`.
- [x] **4.9 Browser proof:** Preserve/run the existing rope continuity and Silk scene tests at `320`, `390`, `719/720`, `899/900`, `1199/1200`, `1499/1500`, `1920`. The 1199/1200 pair is specifically required to prove the legitimate Silk recomposition.
- [x] **4.10 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(rope pieces and authored crossing lockups|renders the settled Silk scene set|attached to the Receipt hole)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [x] **4.11 Commit checkpoint:** If authorized, commit traversal ownership as a complete green Silk slice.
- [x] **4.12 Progress tracking:** Mark every Task 4 box `[x]` before Task 5.

---

## Task 5: Make Commission 05/07 aperture bleed parent-owned

**Consumes:** Task 4 Silk container/vocabulary.

**Produces:** `SilkApertureComposition` roots that fill the box allocated by Silk while retaining all internal frame/world/parallax and portrait/landscape behaviour.

**Files:**

- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkApertureComposition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkApertureComposition.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

After this task:

```text
SilkChapter placement wrapper
  owns external width / bleed / offset / z-order

SilkApertureComposition root
  width: 100%
  owns its semantic aspect ratio
  owns portrait-vs-landscape frame selection
  owns viewport, rim, overscan, world and parallax
```

The child must no longer enlarge itself to `116%` and pull itself left by `-8%` merely to satisfy its caller's placement. Those accepted visual values move to the parent placement wrappers at the same Silk states.

### Steps

- [x] **5.1 RED component contract:** Add a test-level architectural assertion that the aperture root does not own external `116%`/negative-margin bleed while retaining both frame variants and its internal viewport.
- [x] **5.2 Verify RED:** Confirm the test/guard fails on the current root bleed rules.
- [x] **5.3 Parent external boxes:** Move accepted Commission 05/07 external bleed and offset rules to `CorridorAperturePlacement` and `BreachAperturePlacement`. Preserve the exact rendered boxes at narrow/compact/mirrored widths.
- [x] **5.4 Child cleanup:** Make the aperture root fill the parent allocation. Keep internal aspect ratios, portrait frame switching, viewport insets, scene overscan and `prefers-reduced-motion` behaviour child-owned.
- [x] **5.5 Responsive migration:** Replace remaining `specialistsResponsive` imports in `SilkApertureComposition.styles.ts` with Silk-owned/container-owned conditions.
- [x] **5.6 Browser proof:** Preserve Commission 05/07 geometry, narrow Silk gutter, parallax and reduced-motion tests. Compare global frame bounding boxes before/after rather than only checking the new ownership structure.
- [x] **5.7 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkApertureComposition.test.tsx src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(renders the settled Silk scene set|narrow Silk gutters|moves only its aperture worlds)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [x] **5.8 Commit checkpoint:** If authorized, commit the aperture ownership slice only when visual evidence is unchanged.
- [x] **5.9 Progress tracking:** Mark every Task 5 box `[x]` before Task 6.

---

## Task 6: Make the Commission 08 reaction viewport the child's external box

**Consumes:** Task 5 parent-owned external-box pattern.

**Produces:** a tested `SilkReactionFrameComposition` whose root represents the visible reaction/eye aperture, with the lath-and-plaster frame bleeding around it internally; `SilkChapter` no longer imports Commission 08 frame/source geometry to position neighboring slices.

**Files:**

- Add: `src/client/src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`
- Modify: architecture guard test
- Modify: `src/client/e2e/project-story.spec.ts`
- Preserve: `src/client/src/features/patch-showcase/usual-specialists/silkCommission08ReviewGeometry.ts`
- Preserve: `src/client/src/features/patch-showcase/usual-specialists/silkCommission08ReviewGeometry.test.ts`

### Interface contract

`silkCommission08ReviewGeometry.ts` remains the internal asset/frame truth for Commission 08. `SilkReactionFrameComposition` may import it; `SilkChapter.styles.ts` may not.

The child's root must correspond to the visible reaction viewport. Internally, derive the surrounding frame canvas from the existing accepted frame-to-viewport ratios. Conceptually:

```text
Reaction root = visible eyes aperture (8.25:1 accepted viewport ratio)
  reaction image clipped to root
  internal frame canvas positioned/scaled around root
```

The parent therefore positions a meaningful visible object, not source-image coordinates.

### Steps

- [x] **6.1 RED child test:** Add `SilkReactionFrameComposition.test.tsx`. Prove accepted reaction image/frame assets, root-only style forwarding, no `className` seam, and that the semantic composition root is the visible viewport boundary rather than the full source-frame canvas.
- [x] **6.2 RED architecture guard:** Reject `SilkChapter.styles.ts` imports of `silkCommission08ReviewGeometry` or its raw frame/viewport constants.
- [x] **6.3 Verify RED:** Run both tests and confirm they fail for the current parent knowledge/root semantics.
- [x] **6.4 Rebuild child internals:** Move frame-canvas positioning around the root into `SilkReactionFrameComposition.styles.ts` using the existing Commission 08 internal geometry. Keep reaction image crop/scale and frame asset visually unchanged.
- [x] **6.5 Re-express parent placement:** Retune `ReactionAperturePlacement` only as necessary so its allocated box is the same visible eye viewport the user already sees. Parent spacing below it must reference the placement/root box, not Commission 08 source-frame calculations.
- [x] **6.6 Delete parent source math:** Remove Commission 08 frame width/height/viewport imports and compensation formulas from `SilkChapter.styles.ts`.
- [x] **6.7 Browser semantic-box proof:** Keep an internal `[data-silk-commission-08-review-viewport]` element at `inset: 0` inside the semantic reaction root and add a Playwright assertion that their bounding boxes match within a small layout tolerance. Keep the existing rendered gap/attachment assertions for Receipt and Commission 09 so this structural change cannot move the page.
- [x] **6.8 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.test.tsx src/features/patch-showcase/usual-specialists/silkCommission08ReviewGeometry.test.ts src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(renders the settled Silk scene set|Receipt/Silk to Commission 09 gutter|attached to the Receipt hole)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [x] **6.9 Commit checkpoint:** If authorized, commit Commission 08 external-box ownership after all visual/geometry checks pass.
- [x] **6.10 Progress tracking:** Mark every Task 6 box `[x]` before Task 7.

---

## Task 7: Make Receipt/Silk one opaque external lockup footprint

**Consumes:** Task 6 semantic external-box pattern.

**Produces:** a tested `SilkReceiptPeekthroughComposition` whose root encloses the complete authored Receipt/Silk visible lockup, while frame/hole/peek-cutout scaling and mirroring remain internal.

**Files:**

- Add: `src/client/src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

The parent sees one box:

```text
ReceiptPeekthroughPlacement
  SilkReceiptPeekthroughComposition root = complete visible lockup footprint
    receipt plane / aperture world / frame
    Silk peek cutout
```

Responsive scale and mirroring that describe Receipt-to-Silk internals remain inside the child. Parent layout must not carry a manually derived "visual top overhang" or equivalent child-internal compensation once the root describes the visible footprint.

### Steps

- [x] **7.1 RED child test:** Add the missing colocated test covering accepted assets, root-only style forwarding, absence of `className`, and internal ownership of receipt plane + peek cutout.
- [x] **7.2 RED browser contract:** Add a Playwright assertion that the child root bounds equal the union of its visible frame and Silk peek-cutout layers within tolerance. This should fail on the current undersized root whose children visibly overflow it.
- [x] **7.3 Rebuild the external footprint:** Adjust child internal positioning/scaling so the root encloses the complete visible lockup at each existing responsive treatment. Keep the actual frame, world, peek cutout, scale factors and mirror states visually unchanged.
- [x] **7.4 Simplify parent placement:** Update `ReceiptPeekthroughPlacement` to position/size the complete lockup as one object. Remove parent-side derived overhang constants or offsets whose only purpose was compensating for the child's hidden overflow.
- [x] **7.5 Preserve child-local transitions:** Keep existing narrow/compact/lower/mirror/recomposed child states when they genuinely describe Receipt/Silk internals. Move a threshold to `silkResponsive.ts` only if multiple Silk sibling placements consume that same composition state.
- [x] **7.6 Browser proof:** Preserve the existing Receipt-hole attachment and mirror-band tests at `320`, `390`, `720`, `900`, `1199/1200`, `1499/1500`, `1920` plus the new external-box assertion.
- [x] **7.7 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.test.tsx src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(scales the accepted Receipt and Silk lockup|Receipt/Silk to Commission 09 gutter|attached to the Receipt hole)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [x] **7.8 Commit checkpoint:** If authorized, commit the Receipt external-box slice when pixels and attachment remain unchanged.
- [x] **7.9 Progress tracking:** Mark every Task 7 box `[x]` before Task 8.

---

## Task 8: Make Commission 09 bleed parent-owned while preserving portrait custody

**Consumes:** Task 7 opaque lockup footprint.

**Produces:** a Commission 09 child that fills the box allocated by Silk and owns only frame/world/source internals, while the parent owns accepted compact/narrow external bleed.

**Files:**

- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission09Composition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission09Composition.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

### Interface contract

`SilkCommission09Composition` keeps:

- landscape and portrait frame source selection;
- portrait `<source media="(max-width: 389px)">` exactly;
- internal frame viewport registration;
- internal world/overscan/parallax;
- frame aspect ratio appropriate to the active source.

`HandoffCell`/the parent placement owns:

- whole Commission 09 box position;
- whole box width;
- compact `116%` edge bleed and equivalent narrow external bleed;
- z-order relative to Receipt and the chapter close.

### Steps

- [x] **8.1 RED component/architecture contract:** Add an assertion that the Commission 09 composition root does not apply caller-placement bleed (`116%`, negative outer margin) while retaining the exact portrait source threshold and custody-backed assets.
- [x] **8.2 Verify RED:** Confirm the current child root fails this ownership test.
- [x] **8.3 Move whole-object bleed:** Transfer compact/narrow external width/offset behaviour from `SilkCommission09Composition.styles.ts` to `HandoffCell` or a dedicated parent-owned Commission 09 placement wrapper.
- [x] **8.4 Keep child internals:** Make the child fill the allocated box and preserve its internal landscape/portrait aspect and viewport calculations. Replace any remaining `specialistsResponsive` import with Silk-owned conditions.
- [x] **8.5 Browser semantic-box proof:** Add a stable `data-silk-commission-09-placement` marker to the parent-owned placement wrapper. Assert that the Commission 09 composition root and that placement box coincide at compact/narrow widths, while the placement itself still bleeds past the viewport edges exactly as before.
- [x] **8.6 Run existing bleed/gutter tests:** Preserve the current tests for compact widescreen bleed, Receipt/Silk-to-Commission-09 gutter, narrow gutter and narrow torn-frame edge bleed.
- [x] **8.7 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkCommission09Composition.test.tsx src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists.*(Commission 09|narrow Silk gutters)"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [ ] **8.8 Commit checkpoint:** If authorized, commit parent-owned Commission 09 bleed after all tests are green.
- [ ] **8.9 Progress tracking:** Mark every Task 8 box `[x]` before Task 9.

---

## Task 9: Finish Silk responsive localization and shrink the parent test surface

**Consumes:** Tasks 4-8, where traversal/aperture/reaction/receipt/Commission 09 boundaries are already correct.

**Produces:** a Silk chapter that imports no route-global responsive vocabulary and no child-internal geometry; child semantics live in colocated tests; parent tests only composition ownership.

**Files:**

- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/silkResponsive.ts`
- Modify: any remaining Silk file still importing `specialistsResponsive`
- Modify: architecture guard test
- Modify: `src/client/e2e/project-story.spec.ts`

### Responsive state rule

Preserve current behaviour first. The known current secondary ranges around `1500`, `1800` and `1919` stay local to Silk unless the ownership refactor has made one mathematically redundant with no rendered delta.

This plan does **not** require a breakpoint-minimisation pass. Do not convert working discrete states to `clamp()` merely to reduce query count. Threshold rationalisation is a later design/optimization decision once the ownership architecture has landed.

### Steps

- [ ] **9.1 RED architecture guard:** Extend the guard to reject any remaining Silk import of `specialistsResponsive` and any `SilkChapter.styles.ts` import from a child-internal geometry module.
- [ ] **9.2 Verify RED:** Run it and enumerate the remaining imports before changing code.
- [ ] **9.3 Complete query migration:** Move remaining cross-slice Silk states into `silkResponsive.ts`; leave genuinely child-internal states beside the owning child. Use Silk container queries for descendant composition where possible and Silk-local media only where the root/user environment requires it.
- [ ] **9.4 Rename misleading states:** Ensure no `SILK_1920_TREATMENT_MEDIA`-style name survives for the `1200px` recomposition.
- [ ] **9.5 Remove parent internal knowledge:** Delete remaining parent imports/calculations that depend on Commission frame source coordinates or child-private geometry. Parent calculations may reference only parent-owned placement boxes and route ambient tokens.
- [ ] **9.6 Rebalance tests:** Remove child-internal assertions from `SilkChapter.test.tsx` once equivalent or stronger assertions exist in `SilkTraversalComposition`, `SilkApertureComposition`, `SilkReactionFrameComposition`, `SilkReceiptPeekthroughComposition` and `SilkCommission09Composition` tests. Keep the chapter test focused on chapter story order, opaque child presence, root style forwarding and no `className` seam.
- [ ] **9.7 Browser ownership grouping:** Rename/group the Specialists browser tests so page, connector, Index and Silk responsive matrices are visibly owned by those surfaces. Preserve or strengthen coverage; do not delete width samples just because they no longer belong to a global page matrix.
- [ ] **9.8 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```
- [ ] **9.10 Commit checkpoint:** If authorized, commit the completed Silk-responsive ownership slice.
- [ ] **9.11 Progress tracking:** Mark every Task 9 box `[x]` before Task 10.

---

## Task 10: Delete the historical shared responsive module and flatten Index milestone scaffolding

**Consumes:** Tasks 1-9; all page/opening/crossing/Index/Silk consumers must already own their responsive contracts.

**Produces:** no `specialistsResponsive.ts`, no migration-only `IndexMilestoneBoundary`, explicit page source order, and protected Index screenshots captured from equivalent geometry rather than a wrapper retained for testing.

**Files:**

- Delete: `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.ts`
- Delete: `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.test.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: architecture guard test
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

### Page source-order target

```tsx
<SpecialistsCanvas data-specialists-canvas="authored">
  <OpeningComposition>
    <UsualSpecialistsOpening />
  </OpeningComposition>
  <SpecialistsChapterNav />
  <CrossSectionConnector crossing="opening-index" />
  <IndexChapter />
  <CrossSectionConnector crossing="index-silk" />
  <SilkChapter />
</SpecialistsCanvas>
```

Do not introduce a replacement chapter-sequence component or registry.

### Visual-regression migration

The current protected Index screenshot is clipped from `[data-specialists-index-milestone]`. Before deleting the wrapper, prove an equivalent clip can be derived from real content boundaries:

```text
first boundary: opening/header top
last boundary: Index chapter bottom
```

Use the existing `clipBetween(...)` helper (or a minimal equivalent) and assert while the wrapper still exists that the calculated clip and wrapper bounding box match within a small pixel tolerance. Only then remove the wrapper and use that same calculated clip for the existing snapshot names. Snapshot files must remain unchanged.

### Steps

- [ ] **10.1 Pre-removal characterization:** While `IndexMilestoneBoundary` still exists, add a browser assertion proving the content-derived opening-through-Index clip matches the wrapper's bounding box.
- [ ] **10.2 Verify characterization:** Run that focused test green before deleting anything. This is a refactor safety characterization, not the RED test.
- [ ] **10.3 RED page contract:** Change `UsualSpecialistsPage.test.tsx` to expect the explicit page sequence without `[data-specialists-index-milestone]`; confirm it fails on the current wrapper.
- [ ] **10.4 Delete migration wrapper:** Remove `IndexMilestoneBoundary` from JSX/styles and keep the exact source order shown above.
- [ ] **10.5 Switch protected clip:** Change the visual-regression test to use the characterized content-derived clip while retaining the existing snapshot filenames and files.
- [ ] **10.6 Delete shared responsive module:** Run `rg` first and confirm no production import remains. Then delete `specialistsResponsive.ts` and its obsolete test.
- [ ] **10.7 Final architecture guard:** Assert there is no `specialistsResponsive` import/file dependency and no route-wide chapter breakpoint object. This guard should allow local `indexResponsive.ts`, `silkResponsive.ts`, opening-local and seam-local conditions.
- [ ] **10.8 Focused verification:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists"
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```

  Do not pass `--update-snapshots`.
- [ ] **10.9 Commit checkpoint:** If authorized, commit historical responsive-module/milestone removal as a green cleanup slice.
- [ ] **10.10 Progress tracking:** Mark every Task 10 box `[x]` before Task 11.

---

## Task 11: Regenerate navigation, run the final evidence set, and prepare execution handoff

**Consumes:** all implementation tasks complete and locally green.

**Produces:** current generated indexes, a staged-tree canonical gate through the normal commit hook, and a reviewer-ready implementation return with no hidden validation debt.

**Files:**

- Regenerate: generated `INDEX.md` files affected by added/deleted plan/source/test files
- Modify: this plan only to mark completed task boxes and record final verification evidence
- Do not edit unrelated generated surfaces by hand.

### Steps

- [ ] **11.1 Regenerate index mesh:** Run:

  ```powershell
  py -3 tools/run.py index-mesh --apply
  py -3 tools/run.py index-mesh --check
  ```

- [ ] **11.2 Verify source hygiene:** Run:

  ```powershell
  rg -n "specialistsResponsive|SPECIALISTS_WIDTHS|specialistsMedia" src/client/src/features/patch-showcase/usual-specialists src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx
  git diff --check
  ```

  The `rg` command should return no historical shared-responsive imports/usages. Local `indexResponsive`/`silkResponsive` names are expected and are not searched by this command.
- [ ] **11.3 Specialists unit suite:** Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists
  ```

  This includes the responsive architecture guard and the new Reaction/Receipt tests.
- [ ] **11.4 Specialists browser suite:** Run:

  ```powershell
  npm --prefix src/client run test:e2e -- --grep "The Usual Specialists"
  ```

  Confirm the page, connector, Index and Silk owner matrices all pass.
- [ ] **11.5 Protected visual suite:** Run the same command twice:

  ```powershell
  npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition"
  ```

  Do not use `--update-snapshots`. Both runs must pass the existing Windows baselines.
- [ ] **11.6 Production build/budget:** If a normal task commit hook has not already exercised the current exact tree, run:

  ```powershell
  npm --prefix src/client run build
  ```

  Confirm entry JavaScript, CSS and PDF remain within the existing budgets printed by `check-build-budget`.
- [ ] **11.7 Stage the complete intended feature tree:** Inspect `git status`, `git diff`, `git diff --cached` and ensure no Marketplace/tooling/spec planning changes from before execution have been accidentally absorbed into feature changes unless they were intentionally committed before Task 1.
- [ ] **11.8 Canonical commit gate:** With commit authority, commit normally and let the tracked hook run the complete staged-tree `ci` apply/check flow. Do not run a duplicate full `ci --check` immediately before or after a successful hooked commit.
- [ ] **11.9 Completion evidence:** Record the final commit SHA, focused test results, Playwright result, protected visual result and budget output in the execution return. Do not claim push/PR/merge unless separately authorized and verified.
- [ ] **11.10 Progress tracking:** Mark every Task 11 box `[x]`; then pass the completed implementation through `handoff-gates` `completion-readiness` before code-review handoff.

---

## Expected final file-shape changes

New source/test files expected:

- `src/client/src/features/patch-showcase/usual-specialists/indexResponsive.ts`
- `src/client/src/features/patch-showcase/usual-specialists/silkResponsive.ts`
- `src/client/src/features/patch-showcase/usual-specialists/SilkReactionFrameComposition.test.tsx`
- `src/client/src/features/patch-showcase/usual-specialists/SilkReceiptPeekthroughComposition.test.tsx`
- `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`

Deleted files expected:

- `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.ts`
- `src/client/src/features/patch-showcase/usual-specialists/specialistsResponsive.test.ts`

No asset additions, deletions or baseline-image changes are expected.

## Non-goals for this implementation plan

- No visual redesign or visual-baseline update.
- No new specialist chapter.
- No future Writ/Klause/Rollback/Receipt responsive design.
- No universal grid/subgrid rollout.
- No broad responsive helper library outside this route.
- No attempt to minimize the raw count of Silk media/container queries.
- No replacement of accepted secondary Silk thresholds solely because their numbers are aesthetically untidy.
- No change to the canonical/publication identity of the V2 preview.
- No source-asset/provenance recustody.
- No push, PR, merge or branch cleanup without separate authority.

## Execution success criteria

The plan is complete only when all of the following are true:

1. `UsualSpecialistsPage` owns only route/canvas/sequence concerns and no chapter responsive taxonomy.
2. The canvas still supports 320 and freezes at 2560.
3. Opening and crossings own their responsive conditions.
4. Index owns its responsive states through an Index-local contract/container.
5. Silk owns its responsive states through a Silk-local contract/container, including a truthfully named 1200 recomposition.
6. Future chapters can introduce unrelated thresholds without changing Index/Silk/page responsive infrastructure.
7. `SilkTraversalComposition` receives no hidden cross-boundary geometry variables and does not own stage-level placement.
8. Commission 05/07, Reaction 08, Receipt and Commission 09 expose meaningful external boxes while keeping their internal art geometry opaque.
9. `SilkChapter.styles.ts` imports no child-internal frame/source geometry.
10. `specialistsResponsive.ts` and its route-wide breakpoint taxonomy are gone.
11. `IndexMilestoneBoundary` is gone and the protected Index screenshot is still unchanged.
12. Page/chapter/child/browser tests align with ownership boundaries.
13. Existing protected visual baselines pass unchanged.
14. No horizontal overflow, rope discontinuity, Receipt detachment, Commission 09 source/bleed regression or reduced-motion regression is introduced.
15. The normal staged-tree commit hook passes before the implementation is handed to review.
