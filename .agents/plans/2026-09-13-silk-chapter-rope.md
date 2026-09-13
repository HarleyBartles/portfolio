# Silk Chapter-Owned Rope Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the page-spanning rope inside the Silk chapter with a Silk-owned wireframe rope segment so Silk can author the physical depth order `chapter content < rope < Silk cutout < anchors` without changing protected Index layering.

**Architecture:** Preserve the existing Opening/Index `SpecialistsJourneyRope` geometry and legacy local z-index values, but clip its overflow at the existing `[data-specialists-index-milestone]` boundary so the legacy route physically stops painting before Silk without changing Index internals. Replace the standalone Silk rope/cutout siblings with one `SilkTraversalComposition` that owns the Silk-local rope SVG, Commission 06 attachment geometry and entry anchor in one coordinate system. `SilkChapter` positions that whole composition atomically above ordinary chapter content while `SilkCommission05Composition` owns only world/viewport/frame.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest/Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`

**Execution Strategy:** `executing-plans` inline. This is a tightly coupled visual-ownership refactor and should land sequentially with focused browser evidence after each ownership boundary changes.

## Global Constraints

- Preserve accepted Index geometry and protected visual baselines; do not update snapshots to hide drift.
- Restore the legacy Opening/Index rope implementation rather than changing its z-index to solve Silk.
- Silk's physical order is `world/page/apertures/frames/wordmark/content < Silk rope < Commission 06 Silk cutout < anchor hardware`.
- The Silk rope must visibly cross over the `SILK` wordmark and the Commission 05 broken-wall frame.
- Commission 06 must paint above the Silk rope.
- Commission 06 must be geometrically locked to the Silk rope inside one controlling composition through one explicit attachment port derived from the same authored coordinate system; `SilkChapter` must not position the rope and cutout independently.
- The Silk traversal composition's rope entry must meet the visible clipped Opening/Index rope at the Index/Silk boundary. The local entry anchor covers that exact seam; no disconnected red segments are acceptable.
- Anchor hardware must paint above the Silk rope.
- `SilkCommission05Composition` must not accept a crossing/traversal child after this migration.
- Landscape Commission 05 remains active at `391px` and above; the temporary portrait proxy applies only at `390px` and below.
- Use only `specialistsResponsive.ts`; do not introduce a 620px authored breakpoint.
- No image generation and no new rope/anchor raster assets are part of this slice; use authored red SVG/CSS wireframe geometry.
- Do not add a site-wide CSS-variable or shared global z-index control API for Silk's stack.

---

### Task 1: Restore the legacy route and establish a Silk stacking boundary

**Files:**
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.tsx`
- Delete: `src/client/src/features/patch-showcase/usual-specialists/specialistsLayers.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: the existing protected Opening/Index rope with `data-temporary-wireframe-rope="true"`.
- Produces: an `IndexMilestoneBoundary` wrapper retaining `[data-specialists-index-milestone]` whose `overflow: clip` terminates descendant legacy-rope paint at the Index/Silk boundary without changing Index geometry.

- [ ] **Step 1: Replace the temporary wrong-order browser assertion with a failing chapter-boundary assertion.** At `1440` and `390`, assert the legacy rope remains inside `[data-specialists-index-milestone]`, that the milestone clips descendant overflow, and that its bottom edge meets the Silk chapter boundary rather than allowing the page-spanning SVG to paint into Silk.

```ts
const milestone = page.locator('[data-specialists-index-milestone]')
const silk = page.getByRole('region', { name: 'Silk' })
const legacyRope = page.locator('[data-temporary-wireframe-rope="true"]')
expect(await legacyRope.evaluate((el) => el.closest('[data-specialists-index-milestone]') !== null)).toBe(true)
await expect(milestone).toHaveCSS('overflow', 'clip')
const milestoneBox = await milestone.boundingBox()
const silkBox = await silk.boundingBox()
expect(Math.abs(milestoneBox!.y + milestoneBox!.height - silkBox!.y)).toBeLessThanOrEqual(1)
```

- [ ] **Step 2: Run `npm run test:e2e -- --skip-build e2e/project-story.spec.ts --grep "Silk chapter boundary"` from `src/client`** and verify RED against the current global-layer experiment.
- [ ] **Step 3: Restore `SpecialistsJourneyRope.tsx` to its pre-experiment local values** (`RopeClip`/SVG route at `z-index: 8`, anchor at `9`) and remove the `specialistsLayers` import/file. Replace the plain Index milestone wrapper in `UsualSpecialistsPage.tsx` with a styled `IndexMilestoneBoundary` that preserves the same data hook and adds `position: relative; overflow: clip`; do not change Index/Opening internal styles.
- [ ] **Step 4: Re-run the focused boundary test** and expect PASS.

### Task 2: Add the atomic Silk traversal composition

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx`
- Delete: `src/client/src/features/patch-showcase/usual-specialists/SilkJourneyRope.tsx`
- Delete: `src/client/src/features/patch-showcase/usual-specialists/SilkJourneyRope.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`

**Interfaces:**
- Produces: `<SilkTraversalComposition />` with root hook `[data-silk-traversal-composition]`; root-only `style?: React.CSSProperties`; no caller `className` seam.
- Owns `[data-silk-journey-rope]`, `[data-silk-journey-rope-path]`, Commission 06 `[data-silk-commission="06"]`, `[data-silk-traversal-rope-port]` and `[data-silk-rope-anchor]` inside one coordinate system.
- `SilkChapter` can position/scale only the whole traversal composition, never the rope and Commission 06 separately.

- [ ] **Step 1: Write a failing component test** requiring the atomic composition root, stable rope path, Commission 06 and its attachment port, entry anchor, root-only style forwarding and absence of a caller `className` API.

```tsx
const { container } = render(<SilkTraversalComposition style={{ opacity: 0.5 }} />)
expect(container.querySelector('[data-silk-traversal-composition]')).toHaveStyle({ opacity: '0.5' })
expect(container.querySelector('[data-silk-journey-rope-path]')).toHaveAttribute('d', SILK_WIREFRAME_ROPE_PATH)
expect(container.querySelector('[data-silk-traversal-composition]')).toContainElement(container.querySelector('[data-silk-commission="06"]'))
```

- [ ] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/SilkTraversalComposition.test.tsx src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`** and verify RED because the controlling component does not exist and the chapter still owns separate rope/cutout geometry.
- [ ] **Step 3: Implement the minimal composition.** Its root fills one page-owned placement box. Inside it render one SVG with `viewBox="0 0 1000 1800"`, `preserveAspectRatio="none"`, the authored red rope path, Commission 06 positioned from the same authored attachment coordinate, and the entry anchor. The Commission 06 transform origin/harness port must sit exactly on the rope attachment point so responsive body-size changes do not alter registration.
- [ ] **Step 4: Replace the standalone `<SilkJourneyRope />`, Commission 06 and entry anchor in `SilkChapter` with one `<SilkTraversalComposition />`.** Remove traversal/rope-port/anchor placement styles from `SilkChapter.styles.ts`; the parent owns only the whole composition's page placement/z-order.
- [ ] **Step 5: Re-run the composition and `SilkChapter.test.tsx` tests** and expect PASS.

### Task 3: Keep Commission 05 independent and author the composite depth stack

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`

**Interfaces:**
- `SilkCommission05Composition` becomes `({ style }: { style?: CSSProperties })` only; remove `crossing?: ReactNode`, `CrossingLayer` and `[data-silk-commission-05-crossing]`.
- `Stage` contains `<CorridorAperturePlacement><SilkCommission05Composition /></CorridorAperturePlacement>` and one `<SilkTraversalComposition />` as independent siblings.
- The traversal composition is one chapter-level stacking object above wall/frame/wordmark; inside it rope < Commission 06 < anchor.

- [ ] **Step 1: Rewrite the component tests first.** Commission 05 must contain world viewport/scene/frame but no crossing hook. `SilkChapter` must contain one traversal composition sibling of Commission 05; Commission 06, rope and anchor must all be descendants of that controlling component.
- [ ] **Step 2: Run the focused component tests** and verify RED against the current `crossing={traversal}` implementation.
- [ ] **Step 3: Keep the crossing prop/layer removed from Commission 05** and place the traversal composition after Commission 05 in the stage with explicit chapter-level z-index authority.
- [ ] **Step 4: Author the physical z-order inside `SilkTraversalComposition`.** The composition root paints above ordinary apertures, frames, story card and name mark; inside it rope paints below Commission 06 and anchor. No parent selector or responsive offset may independently reposition Commission 06 relative to the rope.
- [ ] **Step 5: Re-run the focused Silk component suite** and expect PASS.

### Task 4: Prove the physical rope choreography and preserve Index

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Preserve unchanged: `src/client/e2e/visual-regression.spec.ts` protected Index snapshot target.

**Interfaces:**
- Consumes: `[data-silk-traversal-composition]`, `[data-silk-journey-rope]`, `[data-silk-journey-rope-path]`, `[data-silk-rope-anchor]`, `[data-silk-name-mark]`, Commission 05 frame and Commission 06 traversal.
- Produces: browser evidence of actual overlap plus ordered paint relationships at desktop and narrow widths.

- [ ] **Step 1: Rewrite the route-crossing test** to use the Silk-owned SVG path, not `[data-temporary-wireframe-rope]`. At the wordmark centre y, sample the nearest screen-space rope point and assert it lies horizontally inside the `SILK` wordmark bounds at `1440`, `391`, `390` and `320`. At the Index/Silk boundary, compare the last visible legacy-route point with the Silk route's first point and the entry-anchor centre; require the rope endpoints to coincide within browser-layout tolerance and the anchor to cover that same seam.
- [ ] **Step 2: Replace the temporary wrong-order depth test** with the approved relations at `1440` and `390`: `frame/name mark < traversal composition`, then inside the composition `rope < Commission 06 < anchor`. Prove `[data-silk-traversal-rope-port]` remains within a small screen-space tolerance of the authored rope point at `1440`, `768`, `391`, `390` and `320`, and prove the whole composition moves/scales atomically rather than exposing separate parent-owned rope/Silk placement seams.
- [ ] **Step 3: Keep the Commission 05 ratio/containment/parallax tests green** including the `391 -> 390` landscape/portrait seam and the 8px scene-bleed safety reserve.
- [ ] **Step 4: Run `npm run test:e2e -- e2e/project-story.spec.ts --grep "Silk|620"`** and expect the complete focused suite green.
- [ ] **Step 5: Run `npm run test:e2e -- --skip-build e2e/visual-regression.spec.ts --grep "Specialists Index draft keeps the approved composition"`** and require the protected Index screenshots to pass unchanged.
- [ ] **Step 6: Inspect the live page at 1440, 391, 390 and 320 plus actual Chrome 200% zoom.** Verify by eye that the rope crosses on top of `SILK` and wall frames, Silk paints above the rope, the legacy route is not visible through Silk, and no diagnostic cyan/magenta source edge is exposed.

### Task 5: Reconcile authority and stop for visual review

**Files:**
- Modify: `.agents/plans/2026-09-13-silk-commission-05-composition.md`
- Modify: `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`
- Regenerate: repository `INDEX.md` mesh as required by tracked changes.

**Interfaces:**
- Produces: one coherent authority: Commission 05 owns only aperture physics; Silk owns traversal/rope/anchors; Opening/Index route remains protected and temporary.

- [ ] **Step 1: Mark the obsolete Commission 05 crossing-child steps as superseded by this plan** without rewriting the historical RED/GREEN evidence.
- [ ] **Step 2: Run `py -3 tools/run.py index-mesh --apply` then `py -3 tools/run.py index-mesh --check`** after all new tracked paths are staged/visible to the mesh.
- [ ] **Step 3: Run `git diff --check` plus the focused Vitest suite and production build.** Do not manually run full canonical `ci --check` immediately before a normal commit; the tracked pre-commit hook owns that complete gate.
- [ ] **Step 4: Stop for Harley's visual review.** Do not accept the heavy rim as production art, author a Silk visual baseline, generate new imagery, or proceed into later Silk commissions until the rope/frame/cutout choreography is approved in situ.
