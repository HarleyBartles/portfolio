# Index-to-Silk Compositional Ownership Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the accepted Index-to-Silk anchor and Silk rope handoff into explicit parent-owned styled-component placement contracts while preserving the approved responsive result pixel-for-pixel.

**Architecture:** Introduce a dedicated `IndexSilkCrossing` compositor that owns the whole lock placement through typed transient props and keeps `IndexSilkCrossingLock` opaque. Refactor `SilkTraversalComposition` around one internal responsive rope axis so its upper rope, lower rope, and join port cannot drift independently. Remove the ambient `indexSilkRouteGeometry` coupling and let Playwright prove that the independently owned Index, crossing, and Silk contracts still meet at every authored media boundary.

**Tech Stack:** React, TypeScript, styled-components, Vitest, Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-13-index-silk-compositional-ownership-refactor-design.md`

**Execution Strategy:** `executing-plans` — the refactor is tightly coupled and sequential: characterization evidence must exist before ownership moves, the specialized crossing must land before the ambient geometry can be removed, and the Silk rope axis must be preserved against the same browser contract before final cleanup.

## Global Constraints

- Work in the existing worktree `Z:\_agent-worktrees\portfolio\codex\port-17-index-react` on branch `codex/port-17-index-react`. Do not create a new branch or PR.
- Preserve the accepted responsive lock contract exactly: `<=390` = `3deg / .7`; `391..720` = `6deg / .7`; `721..900` = `1deg / .85`; `901..1399` = `-1deg / .85`; `1400..2560` = `2.5deg / .9`; `2561+` freezes the authored 2560 canvas geometry.
- Preserve the accepted x/y contract exactly: narrow lock `4.516% + 11.65px`, Silk entry `4.516% + 12.57px`, y offset `2.44px`; compact lock `4.7144% + 9px`, Silk entry `4.7144% + 7.65px`, y offset `2.43px`; mid lock `20.9075% + 11.72px`, Silk entry `20.9075% + 12.8px`, y offset `2.38px`; default lock `22.1358% + 11.77px`, Silk entry `22.1358% + 13px`, y offset `2.35px`; wide lock `329px`, Silk entry `329.2px`, y offset `0px`.
- `IndexSilkCrossingLock` owns only its internal canvas, anchor, knot, ring occluder, layer order, and internal registration ports. It does not accept x/y/rotation/scale props.
- A compositional parent may position, size, uniformly scale, rotate, and layer the whole child only through its own styled wrapper.
- Use typed transient styled-component props for precise parent-owned placement. Do not use global styles, page-global geometry, cross-boundary CSS custom properties, `className`, `styled(ChildComponent)`, descendant-selector reach-through, React context, or generic style bags as the normal positioning API.
- `SilkTraversalComposition` owns its own upper rope, lower rope, local join port, and Commission 06 relationship. Its responsive rope entry values are local to that component and are not imported from the crossing compositor.
- `IndexChapter` continues to own its outgoing rope and must not import lock or Silk placement data.
- Shared responsive breakpoint names in `specialistsResponsive.ts` remain neutral vocabulary and may be reused by all components.
- The existing `chapterCrossingGeometry.ts` may continue to serve Opening-to-Index neutral geometry. Do not broaden this refactor into Opening-to-Index unless a tiny neutral crossing-surface extraction is required.
- The old Playwright assertion that the rope must pass horizontally through the SILK wordmark is stale on the already-approved ultrawide baseline. Remove that false invariant; do not move the accepted rope route to satisfy it.
- Protected visual snapshots are evidence, not update targets. Any changed Specialists snapshot is a regression until inspected and explicitly accepted.
- Do not generate or replace assets.
- No commit, push, or PR-state change is authorized by this plan. If Harley later grants commit authority, use normal commits and let the tracked pre-commit hook own the single full `py -3 tools/run.py ci --check` gate. Without commit authority, leave the implementation uncommitted and run the complete check directly at final verification.
- This plan starts from the already-accepted dirty responsive-anchor implementation currently in this worktree. Do not reset, discard, or recreate that baseline from `main` or from the last pushed checkpoint.

## Execution Precondition

Repository planning doctrine requires the implementation plan to be committed before `executing-plans` receives it. Execution must therefore not begin until Harley grants fresh authority for a planning-artifact commit.

Once that authority is granted, stage only the approved compositional-ownership spec, this implementation plan, the approved status change on the responsive-anchor spec, and generator-owned mesh changes produced by the normal hook. Do **not** stage the existing dirty product implementation as part of this planning commit. The tracked pre-commit hook runs the canonical gate against the staged snapshot, so the known stale browser assertion in the dirty working tree does not need to be altered merely to commit the plan.

After the planning commit succeeds, execute this plan against the existing accepted dirty responsive-anchor implementation. Separate implementation commits remain independently gated by explicit authority. Do not push merely because the planning commit is authorized; push remains separately gated.

---

### Task 1: Characterize the accepted responsive lock contract in the browser

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts:531-668`

**Interfaces:**
- Consumes: the currently accepted rendered Index-to-Silk lock, its parent placement wrapper, the responsive breakpoints in `specialistsResponsive.ts`, and the approved geometry table from the spec.
- Produces: a browser-level characterization table that protects lock centre, y offset, rotation, scale, topology, and ceiling freeze before any ownership refactor begins.

- [ ] **Step 1: Extend the existing topology test with exact rendered lock-placement samples.**

Keep the existing sample widths and add an expected-state table for the actual authored boundaries:

```ts
const lockExpectations = {
  320: { percent: 4.516, offsetPx: 11.65, yOffsetPx: 2.44, rotationDeg: 3, scale: 0.7 },
  390: { percent: 4.516, offsetPx: 11.65, yOffsetPx: 2.44, rotationDeg: 3, scale: 0.7 },
  391: { percent: 4.7144, offsetPx: 9, yOffsetPx: 2.43, rotationDeg: 6, scale: 0.7 },
  720: { percent: 4.7144, offsetPx: 9, yOffsetPx: 2.43, rotationDeg: 6, scale: 0.7 },
  721: { percent: 20.9075, offsetPx: 11.72, yOffsetPx: 2.38, rotationDeg: 1, scale: 0.85 },
  900: { percent: 20.9075, offsetPx: 11.72, yOffsetPx: 2.38, rotationDeg: 1, scale: 0.85 },
  901: { percent: 22.1358, offsetPx: 11.77, yOffsetPx: 2.35, rotationDeg: -1, scale: 0.85 },
  1399: { percent: 22.1358, offsetPx: 11.77, yOffsetPx: 2.35, rotationDeg: -1, scale: 0.85 },
  1400: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
  2560: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
  2561: { absolutePx: 329, yOffsetPx: 0, rotationDeg: 2.5, scale: 0.9 },
} as const
```

Measure `[data-index-silk-lock-placement]` with `getBoundingClientRect()` and `getComputedStyle()`. Use `DOMMatrixReadOnly` to derive rendered uniform scale and rotation from the computed transform:

```ts
const matrix = new DOMMatrixReadOnly(getComputedStyle(lockPlacement).transform)
const scale = Math.hypot(matrix.a, matrix.b)
const rotationDeg = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)
```

For percentage states, compute the expected lock centre from the crossing box itself so the assertion proves rendered geometry rather than source strings:

```ts
const expectedX = crossing.left + crossing.width * (expected.percent / 100) + expected.offsetPx
```

For wide/ceiling states use `crossing.left + 329`. Assert centre x and centre y against the crossing bottom within `<= 1px`, rotation within `<= 0.05deg`, and scale within `<= 0.005`.

- [ ] **Step 2: Preserve the existing physical handoff assertions in the same test.**

Retain these rendered contracts unchanged:

```ts
distance(indexExit, knotTop) <= 6
Math.abs(silkEntry.x - knotBottom.x) <= 3
distance(silkJoin.upper, silkJoin.port) <= 2
distance(silkJoin.lower, silkJoin.port) <= 2
distance(silkJoin.upper, silkJoin.lower) <= 2
Math.max(...thicknesses) - Math.min(...thicknesses) <= 3
Math.max(...thicknesses) <= 13
overflow <= 0
```

Keep the existing `2560 / 2561` relative-canvas freeze assertions for the lock and knot ports.

- [ ] **Step 3: Run the characterization browser test and require GREEN before refactoring.**

Run:

```powershell
npm --prefix src/client run test:e2e -- --grep "preserves rope topology across authored responsive boundaries"
```

Expected: PASS on the current accepted tree. If it fails, fix only the characterization arithmetic/tolerance if the rendered page still matches the approved visual contract; do not retune production geometry during this task.

- [ ] **Step 4: Record the stale baseline test as intentionally superseded.**

Do not edit production geometry. Confirm the old test still fails for its known ultrawide wordmark-x assumption so later removal is evidence-based:

```powershell
npm --prefix src/client run test:e2e -- --grep "keeps the physical route crossing the clean SILK mark while rope implementation is modularized"
```

Expected: FAIL on the accepted baseline at ultrawide because the rope centre is left of the SILK wordmark. This is known stale evidence, not a refactor failure.

### Task 2: Extract the dedicated `IndexSilkCrossing` compositor with typed parent-owned lock placement

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossingSurface.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: the approved lock geometry table, `specialistsMedia`, `CHAPTER_CROSSING_HEIGHT`, and the opaque `IndexSilkCrossingLock` child.
- Produces: `IndexSilkCrossing`, a specialized compositor that renders the neutral crossing surface/rule, omits the fallback generic anchor entirely, and positions the whole lock through its own typed styled wrapper. `ChapterCrossing` returns to generic ordinary-crossing ownership only.

- [ ] **Step 1: Write the failing `IndexSilkCrossing` component contract.**

Create `IndexSilkCrossing.test.tsx` with tests that require:

```tsx
const { container } = render(<IndexSilkCrossing style={{ opacity: 0.5 }} />)
const root = container.querySelector('[data-specialists-chapter-crossing="index-silk"]')
expect(root).toHaveStyle({ opacity: '0.5' })
expect(root?.querySelector('[data-specialists-crossing-rule]')).toBeInTheDocument()
expect(root?.querySelector('[data-index-silk-lock-placement]')).toBeInTheDocument()
expect(root?.querySelector('[data-index-silk-crossing-lock]')).toBeInTheDocument()
expect(root?.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
```

Also prove no `className` seam:

```tsx
// @ts-expect-error className is intentionally not part of the compositor API.
const { container } = render(<IndexSilkCrossing className="external-control" />)
expect(container.querySelector('[data-specialists-chapter-crossing="index-silk"]')).not.toHaveClass('external-control')
```

Do not inspect lock descendants beyond asserting that the child is composed inside the placement wrapper.

- [ ] **Step 2: Run the new component test and verify RED.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx
```

Expected: FAIL because `IndexSilkCrossing` does not exist yet.

- [ ] **Step 3: Extract neutral crossing-surface styled primitives.**

Move only the shared crossing surface and rule styling from `ChapterCrossing.styles.ts` into `ChapterCrossingSurface.styles.ts`:

```ts
export const CrossingSurface = styled.div`
  position: relative;
  height: ${CHAPTER_CROSSING_HEIGHT}px;
  background: var(--color-interior-canvas);
  pointer-events: none;
`

export const CrossingRule = styled.hr`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(32 35 31 / 30%);
`
```

`ChapterCrossing.styles.ts` should then own only the ordinary generic anchor styling. This is a neutral primitive extraction, not a new generic layout system.

- [ ] **Step 4: Define the typed lock-placement contract in `IndexSilkCrossing.styles.ts`.**

Use discriminated x geometry and typed transient props:

```ts
export type AuthoredX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

export type LockPlacement = {
  x: AuthoredX
  yOffsetPx: number
  rotationDeg: number
  scale: number
}

export type LockPlacementState = 'narrow' | 'compactLandscape' | 'mid' | 'default' | 'wide'

type IndexSilkLockPlacementProps = {
  $defaultPlacement: LockPlacement
  $widePlacement: LockPlacement
  $midPlacement: LockPlacement
  $compactPlacement: LockPlacement
  $narrowPlacement: LockPlacement
}
```

Add a local coordinate formatter that can only accept `AuthoredX`:

```ts
const authoredXCss = (x: AuthoredX): string =>
  x.kind === 'absolute-px'
    ? `${x.value}px`
    : `calc(${x.percent}% + ${x.offsetPx}px)`
```

The styled placement wrapper owns `position: absolute`, `z-index: 60`, `width: 176px`, `height: 154px`, `pointer-events: none`, and the whole-child transform. It reads only typed transient props and applies the same responsive media ordering as the accepted implementation.

- [ ] **Step 5: Implement `IndexSilkCrossing` as the compositional parent.**

Keep the geometry constants beside the parent component, not in a route-global module:

```ts
const LOCK_PLACEMENTS = {
  narrow: {
    x: { kind: 'percent-plus-px', percent: 4.516, offsetPx: 11.65 },
    yOffsetPx: 2.44,
    rotationDeg: 3,
    scale: 0.7,
  },
  compactLandscape: {
    x: { kind: 'percent-plus-px', percent: 4.7144, offsetPx: 9 },
    yOffsetPx: 2.43,
    rotationDeg: 6,
    scale: 0.7,
  },
  mid: {
    x: { kind: 'percent-plus-px', percent: 20.9075, offsetPx: 11.72 },
    yOffsetPx: 2.38,
    rotationDeg: 1,
    scale: 0.85,
  },
  default: {
    x: { kind: 'percent-plus-px', percent: 22.1358, offsetPx: 11.77 },
    yOffsetPx: 2.35,
    rotationDeg: -1,
    scale: 0.85,
  },
  wide: {
    x: { kind: 'absolute-px', value: 329 },
    yOffsetPx: 0,
    rotationDeg: 2.5,
    scale: 0.9,
  },
} as const satisfies Record<LockPlacementState, LockPlacement>
```

Render the child untouched inside the placement wrapper:

```tsx
<CrossingSurface data-specialists-chapter-crossing="index-silk" style={style}>
  <CrossingRule data-specialists-crossing-rule />
  <IndexSilkLockPlacement
    $defaultPlacement={LOCK_PLACEMENTS.default}
    $widePlacement={LOCK_PLACEMENTS.wide}
    $midPlacement={LOCK_PLACEMENTS.mid}
    $compactPlacement={LOCK_PLACEMENTS.compactLandscape}
    $narrowPlacement={LOCK_PLACEMENTS.narrow}
    data-index-silk-lock-placement
  >
    <IndexSilkCrossingLock />
  </IndexSilkLockPlacement>
</CrossingSurface>
```

Do not render a generic fallback anchor in this compositor.

- [ ] **Step 6: Return `ChapterCrossing` to generic ownership only.**

Remove `IndexSilkCrossingLock`, `IndexSilkLockPlacement`, and all `index-silk` special cases from `ChapterCrossing.tsx` / `ChapterCrossing.styles.ts`. Keep the ordinary anchor and its neutral crossing coordinate rules for Opening-to-Index.

Update `ChapterCrossing.test.tsx` so it proves only the ordinary crossing contract; remove the test that selects the authored Index-to-Silk lock from this generic component.

- [ ] **Step 7: Compose `IndexSilkCrossing` from the page.**

In `UsualSpecialistsPage.tsx`, replace:

```tsx
<ChapterCrossing crossing="index-silk" />
```

with:

```tsx
<IndexSilkCrossing />
```

Preserve the same `data-specialists-chapter-crossing="index-silk"` root so browser contracts and document ordering remain stable. Update `UsualSpecialistsPage.test.tsx` only as needed to keep its existing source-order and milestone-boundary assertions.

- [ ] **Step 8: Update browser selectors that intentionally referred to the old generic fallback anchor.**

In the test currently named `The Usual Specialists layers Silk-owned rope below traversal and below the crossing anchor`, replace the old generic Index-to-Silk anchor locator:

```ts
page.locator('[data-specialists-crossing-anchor="index-silk"]')
```

with the real authored parent-owned object:

```ts
page.locator('[data-index-silk-lock-placement]')
```

Rename the test to describe the authored crossing lock rather than the removed fallback anchor. Keep the z-order intent unchanged: Silk-owned route material stays below the traversal and below the authored crossing lock.

Do not add any selector that reaches through the lock component to style or position it; browser measurement selectors remain test-only evidence.

- [ ] **Step 9: Run the focused component suite and characterization browser test.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx src/features/patch-showcase/usual-specialists/IndexSilkCrossingLock.test.tsx src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
npm --prefix src/client run test:e2e -- --grep "preserves rope topology across authored responsive boundaries|authors the three-layer Index to Silk lock proof|layers Silk-owned rope below traversal and below the authored crossing lock"
```

Expected: all pass with unchanged rendered lock geometry.

- [ ] **Step 10: Commit only if fresh commit authority has been granted.**

If Harley has explicitly authorized commits, stage only Task 2 files and use a normal commit such as:

```powershell
git add src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/client/src/features/patch-showcase/usual-specialists/ChapterCrossingSurface.styles.ts src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.tsx src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.styles.ts src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.tsx src/client/src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx
git commit -m "refactor: isolate Index Silk crossing composition"
```

Do not use `--no-verify`. If no commit authority exists, skip this step and keep the tree uncommitted.

### Task 3: Collapse Silk's three entry-x declarations into one typed internal rope axis

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx`

**Interfaces:**
- Consumes: the approved Silk entry values and neutral `specialistsMedia` breakpoints.
- Produces: one `SilkRopeAxis` internal styled parent that owns responsive x placement exactly once; upper rope, lower rope, and join port are positioned relative to that local axis and retain their existing local top/width/material contracts.

- [ ] **Step 1: Strengthen the Silk component test around one local rope-axis owner.**

Add a structural assertion requiring one local axis that contains both rope placements and the join port:

```tsx
const axis = root?.querySelector('[data-silk-rope-axis]')
expect(axis).toBeInTheDocument()
expect(axis).toContainElement(upperRope as HTMLElement)
expect(axis).toContainElement(lowerRope as HTMLElement)
expect(axis).toContainElement(ropeJoinPort as HTMLElement)
```

Keep the existing assertions that Silk owns no generic crossing anchor and no Index-to-Silk lock.

- [ ] **Step 2: Run the focused component test and verify RED.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx
```

Expected: FAIL because the rope-axis parent does not exist yet.

- [ ] **Step 3: Define a typed local axis-position contract.**

Keep it private to `SilkTraversalComposition.tsx`:

```ts
type RopeAxisX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

type RopeAxisState = 'narrow' | 'compactLandscape' | 'mid' | 'default' | 'wide'

type RopeAxisProps = {
  $defaultX: RopeAxisX
  $wideX: RopeAxisX
  $midX: RopeAxisX
  $compactX: RopeAxisX
  $narrowX: RopeAxisX
}

const SILK_ROPE_AXIS = {
  narrow: { kind: 'percent-plus-px', percent: 4.516, offsetPx: 12.57 },
  compactLandscape: { kind: 'percent-plus-px', percent: 4.7144, offsetPx: 7.65 },
  mid: { kind: 'percent-plus-px', percent: 20.9075, offsetPx: 12.8 },
  default: { kind: 'percent-plus-px', percent: 22.1358, offsetPx: 13 },
  wide: { kind: 'absolute-px', value: 329.2 },
} as const satisfies Record<RopeAxisState, RopeAxisX>
```

The x formatter must accept only `RopeAxisX`, mirroring the strong typing of the lock compositor without sharing placement data between components.

- [ ] **Step 4: Introduce the zero-width responsive axis.**

Create a styled internal parent conceptually shaped like:

```ts
const SilkRopeAxis = styled.div<RopeAxisProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $defaultX }) => ropeAxisXCss($defaultX)};
  width: 0;
  pointer-events: none;

  @media ${specialistsMedia.atLeastWide} {
    left: ${({ $wideX }) => ropeAxisXCss($wideX)};
  }

  @media ${specialistsMedia.atMostMid} {
    left: ${({ $midX }) => ropeAxisXCss($midX)};
  }

  @media ${specialistsMedia.compactLandscape} {
    left: ${({ $compactX }) => ropeAxisXCss($compactX)};
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: ${({ $narrowX }) => ropeAxisXCss($narrowX)};
  }
`
```

Render `UpperRopePlacement`, `LowerRopePlacement`, and `RopeJoinPort` inside this axis. Set their own `left` to `0` and retain their existing local `translateX(-50%)`, top, width, height, terminal-entry offset, and material transforms. The Commission 06 traversal remains a sibling because its 25% / compact port is its own internal contract, not the Index-to-Silk entry axis.

- [ ] **Step 5: Remove every repeated responsive `left` rule from the three Silk rope children.**

After the axis owns x, `UpperRopePlacement`, `LowerRopePlacement`, and `RopeJoinPort` must not import or repeat route entry coordinates. Only their non-x responsive properties remain, for example compact top/height and per-band material width/terminal offset.

- [ ] **Step 6: Run the Silk component test and the browser topology characterization.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx
npm --prefix src/client run test:e2e -- --grep "preserves rope topology across authored responsive boundaries|has no authored composition transition at 620"
```

Expected: all pass with the accepted 391-720 entry remaining at `4.7144% + 7.65px` and every other authored band unchanged.

- [ ] **Step 7: Commit only if fresh commit authority has been granted.**

If authorized:

```powershell
git add src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx
git commit -m "refactor: localize Silk rope axis"
```

Otherwise leave the changes uncommitted.

### Task 4: Remove the ambient route-geometry coupling and harden architecture tests

**Files:**
- Delete: `src/client/src/features/patch-showcase/usual-specialists/indexSilkRouteGeometry.ts`
- Delete: `src/client/src/features/patch-showcase/usual-specialists/indexSilkRouteGeometry.test.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/chapterCrossingGeometry.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts`
- Modify if still referenced: `src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts`

**Interfaces:**
- Consumes: the specialized crossing contract from Task 2 and Silk-local axis contract from Task 3.
- Produces: no production import of `indexSilkRouteGeometry`; generic chapter-crossing geometry contains only genuinely generic/Opening-to-Index data; architecture tests reject the coupling patterns this refactor was designed to remove.

- [ ] **Step 1: Write architecture assertions before deleting the ambient module.**

Extend `ropeCompositionArchitecture.test.ts` with source-level checks that fail on the current transitional tree:

```ts
const chapterCrossingStyles = readSource('./ChapterCrossing.styles.ts')
const indexSilkCrossing = readSource('./IndexSilkCrossing.tsx')
const indexSilkCrossingStyles = readSource('./IndexSilkCrossing.styles.ts')
const silkTraversal = readSource('./SilkTraversalComposition.tsx')

expect(chapterCrossingStyles).not.toContain('IndexSilk')
expect(chapterCrossingStyles).not.toContain('index-silk')
expect(silkTraversal).not.toContain('indexSilkRouteGeometry')
expect(indexSilkCrossing).not.toContain('indexSilkRouteGeometry')
expect(indexSilkCrossingStyles).not.toMatch(/styled\(IndexSilkCrossingLock\)/)
expect(indexSilkCrossingStyles).not.toMatch(/\[data-index-silk-crossing-lock[^\]]*\]/)
```

Also scan the relevant source set to ensure no production file imports `./indexSilkRouteGeometry`.

- [ ] **Step 2: Run the architecture test and verify RED while the ambient module is still referenced.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts
```

Expected: FAIL until the transitional global route geometry is removed from consumers.

- [ ] **Step 3: Delete the ambient `indexSilkRouteGeometry` module and its source-value unit test.**

The exact responsive result is now protected at the correct levels:

- `IndexSilkCrossing` locally owns typed lock placement;
- `SilkTraversalComposition` locally owns typed Silk entry placement;
- `IndexChapter` owns its outgoing route;
- Playwright proves the physical seam.

Do not replace the deleted module with another cross-component geometry registry.

- [ ] **Step 4: Narrow `chapterCrossingGeometry.ts` to generic crossing data still in use.**

Remove the `index-silk` port row and any type member that exists only to support the deleted generic Index-to-Silk crossing path. Keep `CHAPTER_CROSSING_HEIGHT`, Opening-to-Index ports, and `chapterCrossingPortCss('opening-index')` because Opening and Index still legitimately share that neutral ordinary-crossing geometry.

Do not refactor Opening-to-Index further in this task.

- [ ] **Step 5: Run focused architecture and component tests.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx src/features/patch-showcase/usual-specialists/IndexSilkCrossingLock.test.tsx src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx
```

Expected: all pass. There must be no production import of the deleted route-geometry module.

- [ ] **Step 6: Commit only if fresh commit authority has been granted.**

If authorized and the refactor commit sequence is active:

```powershell
git add src/client/src/features/patch-showcase/usual-specialists/chapterCrossingGeometry.ts src/client/src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts src/client/src/features/patch-showcase/usual-specialists/ChapterCrossing.styles.ts
git commit -m "refactor: enforce Specialists composition boundaries"
```

Before committing, inspect `git diff --cached --name-status` to ensure this does not accidentally stage unrelated Silk work. The current `indexSilkRouteGeometry` files are untracked transitional implementation files; once Task 4 removes them there is no deletion to stage. Do not use `git add -A` to sweep unrelated files into this commit. Otherwise leave the tree uncommitted.

### Task 5: Remove stale browser evidence and prove the refactor is visually identical

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Regenerate through owner command: `.agents/plans/INDEX.md`, `.agents/specs/INDEX.md`, `src/client/src/features/patch-showcase/usual-specialists/INDEX.md`, and any other generated mesh indexes affected by created/deleted files.
- No production file changes unless a focused verification exposes a real regression.

**Interfaces:**
- Consumes: completed Tasks 1-4.
- Produces: an honest browser suite with the approved route topology as authority, unchanged protected visual evidence, current generated navigation, and a review-ready refactor.

- [ ] **Step 1: Delete the superseded SILK-wordmark x-crossing test.**

Remove the complete Playwright test named:

```text
The Usual Specialists keeps the physical route crossing the clean SILK mark while rope implementation is modularized
```

Do not replace it with another wordmark-position assertion. Its meaningful physical-route coverage is already superseded by the all-band topology test that proves Index→knot-top, knot-bottom→Silk, Silk internal join, thickness, overflow, and ceiling freeze.

- [ ] **Step 2: Run the focused Specialists browser suite against current source.**

Because production source changed, do not use `--skip-build` unless a fresh production build from the same tree already exists. Run:

```powershell
npm --prefix src/client run test:e2e -- --grep "preserves rope topology across authored responsive boundaries|locks wide-band rope handoffs|authors the three-layer Index to Silk lock proof|layers Silk-owned rope below traversal and below the crossing anchor|keeps the Index-to-Silk crossing outside the clipped Index milestone|has no authored composition transition at 620|freezes its authored 2560 geometry above the ceiling"
```

Require a clean first-attempt pass.

- [ ] **Step 3: Run the focused Vitest component/architecture suite.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexSilkCrossing.test.tsx src/features/patch-showcase/usual-specialists/IndexSilkCrossingLock.test.tsx src/features/patch-showcase/usual-specialists/ChapterCrossing.test.tsx src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

- [ ] **Step 4: Run protected Specialists visual regression without updating baselines.**

```powershell
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition across protected viewports"
```

Expected: PASS with no snapshot update. Any changed snapshot is a regression to investigate, not a new baseline to accept automatically.

- [ ] **Step 5: Run the production build and budget check.**

```powershell
npm --prefix src/client run build
```

Require entry JS, CSS, PDF, and CV budgets to remain green.

- [ ] **Step 6: Regenerate the generated navigation mesh.**

The new crossing files, new spec/plan, and deleted route-geometry files change generated navigation. Run the owning generator:

```powershell
py -3 tools/run.py mesh --apply
```

Inspect the generated diff. Do not hand-edit `INDEX.md` files.

- [ ] **Step 7: Run whitespace and working-tree inspection.**

```powershell
git diff --check
git status --short
```

Verify there are no unexpected files, no generated-image changes, and no unrelated staged changes.

- [ ] **Step 8: Run the complete canonical gate according to the authority state.**

If no normal commit will follow because commit authority remains absent, run the complete uncommitted proof directly:

```powershell
py -3 tools/run.py ci --check
```

If Harley grants commit authority before this step, do **not** run the complete gate immediately before the commit. Stage the intended complete tree and make a normal commit; the tracked pre-commit hook owns the one canonical `ci --check` execution against the staged snapshot. Do not bypass it.

- [ ] **Step 9: Perform the final ownership review before handoff.**

Read the final diff against `.agents/runbooks/code-style.md` and verify all of these are true:

```text
IndexSilkCrossing owns whole-lock placement.
IndexSilkCrossingLock owns only its internals.
SilkTraversalComposition owns one local rope axis.
IndexChapter owns its outgoing rope.
No cross-component geometry registry remains.
No global geometry CSS or CSS variable seam exists.
No styled(ChildComponent) seam exists.
No parent selector reaches into RopePiece or IndexSilkCrossingLock.
No caller className is exposed on the vertical slices.
All responsive visual evidence remains unchanged.
```

Target completion-readiness is `9/10` before requesting code review.

- [ ] **Step 10: Commit final documentation/mesh only if fresh commit authority has been granted.**

If commits are authorized and earlier task commits exist, stage the remaining browser/spec/plan/mesh changes and make a normal final commit. If commits remain unauthorized, leave all work uncommitted and report the exact validation evidence instead.

## Explicit Non-goals

- No redesign of anchor, knot, ring, rope, SILK wordmark, Commission 05, or Commission 06.
- No new responsive breakpoint.
- No `1600` or `1920` Index-to-Silk route state.
- No generic layout DSL, React context, global CSS geometry, or shared cross-component position registry.
- No change to the accepted `RopePiece` asset contract.
- No opportunistic Opening-to-Index refactor beyond the tiny neutral crossing-surface extraction required for both crossing compositors.
- No snapshot updates unless Harley explicitly accepts a visual change in a separate design decision.
- No commit, push, merge, or PR-state change without explicit authority.
