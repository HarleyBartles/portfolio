# Silk Commission 05 Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stretched Commission 05 aperture experiment with a locked-ratio React composition whose frame, internal world viewport and parallax bleed cannot expose scene edges or world pixels through outer frame transparency.

**Architecture:** Add a dedicated `SilkCommission05Composition` vertical slice with a landscape `1672 / 941` ratio and a temporary rotated portrait proxy at `390px` and below. It owns a sealed rectangular world viewport whose perimeter is proven to sit beneath the heavy rim, an oversized diagnostic scene plate, bounded bleed-aware parallax and the fixed foreground rim; `SilkChapter` owns whole-object page placement and width. Commission 06 and the rope are chapter-level physical layers, not children of Commission 05. Keep `SilkWallAperture` for Commission 07/08 and remove the temporary Commission 05-specific rim-image seam from that generic component.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest/Testing Library, Sharp 0.34.5 for source-alpha verification, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`

**Execution Strategy:** `executing-plans` — the geometry constants, component, page integration and browser contracts are tightly coupled and should land sequentially in one implementation pass.

## Global Constraints

- Preserve accepted Index geometry and protected visual baselines; do not update snapshots to hide drift.
- Use only `specialistsResponsive.ts`; do not add an authored 620px breakpoint.
- 1920px inclusive remains the ultrawide boundary; internal authored geometry freezes above 2560px.
- Commission 05 remains landscape at `391px` and above. At the existing narrow boundary (`390px` and below), the same frame rotates 90 degrees as a temporary portrait wireframe proxy with ratio `941 / 1672`; no independent width/height stretching, skew or `object-fit: fill`.
- Parent owns whole-child page placement/width. Commission 05 owns aspect ratio, viewport, scene crop/bleed, parallax and rim. Commission 06 and rope ownership are superseded by `.agents/plans/2026-09-13-silk-chapter-rope.md`.
- The world viewport's complete rectangular perimeter plus the authored 8px inward safety band must remain under heavy-frame material at alpha `>=250`; scene pixels must never appear in the outer transparency.
- The scene plate must remain larger than the viewport and preserve hidden bleed at both parallax extrema; if bleed is insufficient, reduce travel rather than exposing an edge.
- Commission 06 remains rope-free and crosses the Commission 05 threshold as an independent traversal layer.
- Reduced motion disables relative scene movement.
- The regular rim remains rejected evidence for this locked-viewport role. The selected heavy rim and accepted Commission 05 corridor scene are now accepted Silk production masters with a chapter-specific `accepted-assets.json` after Harley's 13 September in-situ approval.
- No image generation is part of this plan.

> **Supersession note — 13 September 2026:** Task 3/4 references below to a Commission 05-owned `crossing` child describe the intermediate implementation that exposed the stacking-context problem. Do not preserve that API in the final Silk slice. The approved chapter-owned rope plan removes the crossing child and moves Commission 06 to `SilkChapter` as a sibling above the rope.

---

### Task 1: Lock Commission 05 geometry and source-alpha safety

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/silkCommission05Geometry.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/silkCommission05Geometry.test.ts`
- Consume: `src/client/assets/patch/the-usual-specialists/silk/silk-commission-05-aperture-rim-heavy.png`

**Interfaces:**
- Consumes: selected heavy-treatment `1672 × 941` RGBA evaluation candidate.
- Produces: exported source dimensions, `1672 / 941` aspect-ratio constants, conservative viewport inset percentages, requested total parallax travel, scene overscan and safety margin.

- [x] **Step 1: Write the failing node-environment geometry test.** The final contract loads the heavy candidate PNG through Sharp, asserts exact `1672 × 941` dimensions, and proves an 8px inward band on all four authored viewport edges stays at `alpha >=250`. This deliberately strengthened the initial exact-edge proof after live QA exposed a thin bottom diagnostic bleed.
- [x] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/silkCommission05Geometry.test.ts` from `src/client`** and verify RED before the strengthened geometry constants landed.
- [x] **Step 3: Implement the geometry constants** from the measured high-opacity safe box `x=200..1500`, `y=130..820`: source-relative insets approximately `11.96%` left, `10.23%` right, `13.82%` top and `12.75%` bottom; initial requested total parallax travel `32px`; initial vertical scene overscan `32px` per side; safety margin `8px`. Keep these values internal to the Commission 05 slice rather than exposing parent-controlled CSS variables. **13 September tuning:** the accepted Commission 05 corridor source is now rendered with `80px` hidden overscan per vertical edge and the authored travel is `128px` total (`±64px`) after visual review found both 32px and 64px total travel too subtle. After the `8px` per-edge safety reserve, the `160px` hidden scene-height surplus leaves `144px` of safe total travel, so the requested `128px` remains within the concealed bleed envelope.
- [x] **Step 4: Re-run the focused geometry test** and expect PASS, proving all four hard viewport edges plus the 8px inward diagnostic band remain hidden under frame material.

### Task 2: Make parallax travel bleed-aware

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts`

**Interfaces:**
- Consumes: requested total travel, rendered scene height, rendered viewport height and per-edge safety margin.
- Produces: `calculateSafeSilkParallaxTravel(...)` and optional viewport-aware clamping in `useSilkApertureParallax`; existing generic callers without a viewport retain current behavior.

- [x] **Step 1: Add failing pure-helper tests** showing `32px` requested travel remains `32px` when a scene has enough extra height after an `8px` per-edge safety reserve, clamps when the extra height is smaller, and becomes zero when no safe bleed remains.
- [x] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts`** and verify RED for the missing helper/behavior.
- [x] **Step 3: Implement the minimal helper and hook extension.** When a viewport ref is supplied, calculate safe total travel as `max(0, sceneHeight - viewportHeight - 2 * safetyMargin)` and pass `min(requestedTravel, safeTravel)` to the existing offset calculation. Measure untransformed element heights (`offsetHeight`/`clientHeight`), not transform-shifted y coordinates. Generic apertures that omit the viewport ref continue using their authored `maxTravel` unchanged.
- [x] **Step 4: Re-run the parallax unit tests** and expect PASS.

### Task 3: Build the locked Commission 05 composition

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.styles.ts`

**Interfaces:**
- Final interface after the chapter-owned rope migration: root-only `style?: React.CSSProperties`, Commission 05 geometry constants and `usualSpecialistsAssetPath('silk-commission-05-aperture-rim-heavy.webp')`; no traversal/crossing prop.
- Produces: `SilkCommission05Composition` hooks `[data-silk-commission-05-composition]`, `[data-silk-commission-05-world-viewport]`, `[data-silk-commission-05-scene]`, `[data-silk-commission-05-frame]`; diagnostic scene text and source-edge band remain internal. The historical crossing hook below is superseded by `.agents/plans/2026-09-13-silk-chapter-rope.md`.

- [x] **Step 1: Write the failing component test** requiring the fixed Commission 05 structure, decorative rim image, diagnostic rectangular scene plate, crossing ownership, root-only style forwarding and absence of a caller-facing `className` seam.
- [x] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/SilkCommission05Composition.test.tsx`** and verify RED because the component does not exist.
- [x] **Step 3: Implement the component and styles.** Root is `position: relative; width: 100%; aspect-ratio: 1672 / 941; isolation: isolate`. World viewport uses the geometry-module insets and `overflow: hidden`. Diagnostic scene is an ordinary rectangular landscape surface inset beyond the viewport by the authored overscan and carries a conspicuous source-perimeter band. A cyan viewport-edge probe remains beneath the frame during evaluation so any crop-edge exposure is immediately visible. Only the scene receives the parallax transform. Crossing sits above scene/viewport and below the rim. Rim fills the root with `width/height:100%; object-fit:contain`, never `fill`.
- [x] **Step 4: Remove `rimImageSrc` and `ForegroundRimImage` from `SilkWallAperture`.** Commission 07/08 return to the generic procedural rim path; Commission 05 is the sole consumer of the selected heavy frame.
- [x] **Step 5: Re-run Commission 05, generic aperture and parallax unit tests** and expect PASS.

### Task 4: Integrate Commission 05 without parent stretch authority

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`

**Interfaces:**
- Consumes: `SilkCommission05Composition` and existing Commission 06 traversal placeholder.
- Produces: a page-owned Commission 05 placement wrapper whose CSS controls position, width and z-order only; child height derives exclusively from the locked aspect ratio.

- [x] **Step 1: Rewrite the SilkChapter test first** so Commission 05 must contain `[data-silk-commission-05-composition]` and Commission 06 crossing, must no longer contain the generic corridor aperture, while Commission 07/08 remain generic `breach`/`slit` apertures.
- [x] **Step 2: Run the focused SilkChapter test** and verify RED against the stretched experiment.
- [x] **Step 3: Replace the Commission 05 `SilkWallAperture` call** with `SilkCommission05Composition crossing={traversal}` and remove the old `CorridorWorld` placeholder.
- [x] **Step 4: Remove fixed `height` from `CorridorAperturePlacement`.** Author width only at the existing responsive states (`82%/1140px` below wide, `1050px` wide, `1120px` expanded, `1200px` ultrawide, plus compact/narrow percentage widths); child height derives exclusively from `1672 / 941`. Move the traversal lower inside the component so it still crosses the threshold without reintroducing parent height authority.
- [x] **Step 5: Re-run the focused Silk component suite** and expect PASS.

### Task 5: Prove frame ratio, viewport containment and parallax bleed in the browser

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Preserve unchanged: `src/client/e2e/visual-regression.spec.ts` Index protected snapshot target.

**Interfaces:**
- Consumes: Commission 05 data hooks and the authored-width matrix `[2880, 2561, 2560, 1920, 1600, 1440, 901, 900, 768, 721, 720, 391, 390, 320]`.
- Produces: objective browser evidence that the frame never skews, scene/viewport geometry remains concealed, parallax cannot expose a scene edge and reduced motion remains static.

- [x] **Step 1: Update the authored-width Silk test** to select the dedicated Commission 05 composition. At `391px` and above assert landscape `1672 / 941`; at `390px` and below assert the temporary portrait `941 / 1672` proxy. At every sampled width keep the frame inside the stage contract, keep Commission 06 crossing its vertical boundary, and retain no horizontal overflow. Keep Commission 07/08 generic-aperture assertions unchanged.
- [x] **Step 1a — historical intermediate proof, superseded:** An explicit depth-stack browser contract was added while Commission 06 still lived inside Commission 05. Its `traversal < route < wall rim < name mark` ordering and shared page-level TypeScript layer vocabulary were later rejected after in-situ review. `.agents/plans/2026-09-13-silk-chapter-rope.md` replaces this with chapter-owned layering where frame/name mark < Silk rope < Commission 06/anchors.
- [x] **Step 2: Replace the Commission 05 normal-motion browser capture** with geometry from composition, viewport, scene and frame. Before and after scrolling, assert frame offset/size relative to composition is unchanged, scene offset changes within the current authored `±64px` bound, and scene top/bottom continue to extend beyond viewport top/bottom by at least the `8px` safety margin.
- [x] **Step 3: Update the reduced-motion test** to assert Commission 05's scene offset remains `0.00` and transform is `none` after the same scroll.
- [x] **Step 4: Run `npm run test:e2e -- e2e/project-story.spec.ts --grep "Silk|620"` from `src/client`** and expect all focused contracts green. Final rerun: 5/5 passed after responsive width and traversal re-authoring.
- [x] **Step 5: Run the protected Index visual regression unchanged** and do not update snapshots. Passed 1/1 across the existing six protected Index viewports with no snapshot updates.
- [ ] **Step 6: Inspect the live page at ordinary desktop, 768, 390 and 320 plus actual Chrome 200% zoom.** The diagnostic source-perimeter band must remain invisible; if it appears, fix component geometry rather than hiding the band.

### Task 6: Close accepted custody after visual review

**Files:**
- Modify: `docs/asset-custody.md`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/INDEX.md`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/candidates/INDEX.md`
- Keep rejected comparison source: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-commission-05-aperture-rim-regular.png`
- Keep accepted frame source: `src/client/assets/patch/the-usual-specialists/silk/silk-commission-05-aperture-rim-heavy.png`
- Keep accepted Commission 05 scene source: `src/client/assets/patch/the-usual-specialists/silk/silk-commission-05-corridor.png`
- Keep deterministic public derivatives for both accepted Silk masters.
- Regenerate: generated `INDEX.md` mesh as required after tracked source changes.

**Interfaces:**
- Consumes: accepted heavy rim + accepted Commission 05 corridor; regular rim remains rejected comparison evidence.
- Produces: honest accepted Silk custody, deterministic derivatives and a reviewable React checkpoint; no chapter-wide Silk visual baseline yet.

- [x] **Step 1: Record accepted/rejected outcomes:** regular rejected because its thin top cannot fully hide a straight viewport edge; heavy frame and final corridor scene accepted after in-situ review. Lock their source identities in the Silk accepted manifest and deterministic derivative receipt.
- [x] **Step 2: Run `py -3 tools/run.py index-mesh --apply` and `py -3 tools/run.py index-mesh --check`.**
- [x] **Step 3: Run `git diff --check`, the focused Commission 05/Silk Vitest suite and `npm run build`.** Do not run full canonical `ci --check` immediately before a normal commit; the tracked hook owns that complete gate when the eventual checkpoint is committed.
- [ ] **Step 4: Inspect `git status`, full relevant diff and protected Index evidence** for accidental snapshot, breakpoint, custody or generic-aperture drift.
- [x] **Step 5: Harley approved the locked composition and 128px total parallax (`±64px`) in situ on 13 September 2026.** No further Commission 05 generation is needed for this checkpoint.
