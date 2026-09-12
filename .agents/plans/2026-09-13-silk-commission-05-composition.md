# Silk Commission 05 Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stretched Commission 05 aperture experiment with a locked-ratio React composition whose frame, internal world viewport and parallax bleed cannot expose scene edges or world pixels through outer frame transparency.

**Architecture:** Add a dedicated `SilkCommission05Composition` vertical slice with an intrinsic `1672 / 941` ratio. It owns a conservatively inset rectangular world viewport derived from the selected rim's alpha topology, an oversized diagnostic scene plate, Commission 06's crossing layer, bounded bleed-aware parallax and the fixed foreground rim; `SilkChapter` owns only whole-object page placement and width. Keep `SilkWallAperture` for Commission 07/08 and remove the temporary Commission 05-specific rim-image seam from that generic component.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest/Testing Library, Sharp 0.34.5 for source-alpha verification, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`

**Execution Strategy:** `executing-plans` — the geometry constants, component, page integration and browser contracts are tightly coupled and should land sequentially in one implementation pass.

## Global Constraints

- Preserve accepted Index geometry and protected visual baselines; do not update snapshots to hide drift.
- Use only `specialistsResponsive.ts`; do not add an authored 620px breakpoint.
- 1920px inclusive remains the ultrawide boundary; internal authored geometry freezes above 2560px.
- Commission 05's rim and whole composition must retain the source ratio `1672 / 941`; no independent width/height stretching, skew or `object-fit: fill`.
- Parent owns whole-child page placement/width/z-order; Commission 05 owns aspect ratio, viewport, scene crop/bleed, parallax, crossing layer, rim and internal z-order.
- The world viewport must remain separated from the rim asset's outer transparent component; scene pixels must never appear in the outer transparency.
- The scene plate must remain larger than the viewport and preserve hidden bleed at both parallax extrema; if bleed is insufficient, reduce travel rather than exposing an edge.
- Commission 06 remains rope-free and crosses the Commission 05 threshold as an independent traversal layer.
- Reduced motion disables relative scene movement.
- Keep the selected regular rim as an evaluation candidate, not an accepted production master; do not create a Silk `accepted-assets.json` in this slice.
- No image generation is part of this plan.

---

### Task 1: Lock Commission 05 geometry and source-alpha safety

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/silkCommission05Geometry.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/silkCommission05Geometry.test.ts`
- Consume: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-commission-05-aperture-rim-regular.png`

**Interfaces:**
- Consumes: selected `1672 × 941` RGBA evaluation candidate.
- Produces: exported source dimensions, `1672 / 941` aspect-ratio constants, conservative viewport inset percentages, requested total parallax travel, scene overscan and safety margin.

- [ ] **Step 1: Write the failing node-environment geometry test.** Import the not-yet-existing constants, load the candidate PNG through Sharp, flood-fill transparent pixels connected to the image boundary at alpha `<16`, and assert every pixel covered by the authored viewport rectangle is outside that outer-transparent component. Also assert source dimensions are exactly `1672 × 941`.
- [ ] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/silkCommission05Geometry.test.ts` from `src/client`** and verify RED because the geometry module does not exist.
- [ ] **Step 3: Implement the geometry constants** using the measured safe-region evidence: conservative viewport insets approximately `10.5%` left, `6.5%` right, `16%` top and `9.5%` bottom; requested total parallax travel `32px`; vertical scene overscan `32px` per side; safety margin `8px`. Keep these values internal to the Commission 05 slice rather than exposing parent-controlled CSS variables.
- [ ] **Step 4: Re-run the focused geometry test** and expect PASS, proving the authored rectangle cannot intersect outer transparency for this source asset.

### Task 2: Make parallax travel bleed-aware

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts`

**Interfaces:**
- Consumes: requested total travel, rendered scene height, rendered viewport height and per-edge safety margin.
- Produces: `calculateSafeSilkParallaxTravel(...)` and optional viewport-aware clamping in `useSilkApertureParallax`; existing generic callers without a viewport retain current behavior.

- [ ] **Step 1: Add failing pure-helper tests** showing `32px` requested travel remains `32px` when a scene has `64px` total extra vertical height with an `8px` per-edge safety reserve, clamps when the extra height is smaller, and becomes zero when no safe bleed remains.
- [ ] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts`** and verify RED for the missing helper/behavior.
- [ ] **Step 3: Implement the minimal helper and hook extension.** When a viewport ref is supplied, calculate safe total travel as `max(0, sceneHeight - viewportHeight - 2 * safetyMargin)` and pass `min(requestedTravel, safeTravel)` to the existing offset calculation. Measure untransformed element heights (`offsetHeight`/`clientHeight`), not transform-shifted y coordinates. Generic apertures that omit the viewport ref continue using their authored `maxTravel` unchanged.
- [ ] **Step 4: Re-run the parallax unit tests** and expect PASS.

### Task 3: Build the locked Commission 05 composition

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkCommission05Composition.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.styles.ts`

**Interfaces:**
- Consumes: `crossing?: ReactNode`, root-only `style?: React.CSSProperties`, Commission 05 geometry constants, `usualSpecialistsAssetPath('silk-commission-05-aperture-rim-regular.webp')`.
- Produces: `SilkCommission05Composition` hooks `[data-silk-commission-05-composition]`, `[data-silk-commission-05-world-viewport]`, `[data-silk-commission-05-scene]`, `[data-silk-commission-05-crossing]`, `[data-silk-commission-05-frame]`; diagnostic scene text and source-edge band remain internal.

- [ ] **Step 1: Write the failing component test** requiring the fixed Commission 05 structure, decorative rim image, diagnostic rectangular scene plate, crossing ownership, root-only style forwarding and absence of a caller-facing `className` seam.
- [ ] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/SilkCommission05Composition.test.tsx`** and verify RED because the component does not exist.
- [ ] **Step 3: Implement the component and styles.** Root is `position: relative; width: 100%; aspect-ratio: 1672 / 941; isolation: isolate`. World viewport uses the geometry-module insets and `overflow: hidden`. Diagnostic scene is an ordinary rectangular landscape surface inset beyond the viewport by at least the authored horizontal/vertical overscan and carries a conspicuous inset source-perimeter band that is visible only if the composition fails. Only the scene receives the parallax transform. Crossing sits above scene/viewport and below the rim where the eventual traversal needs re-occlusion. Rim fills the root with `width/height:100%; object-fit:contain`, never `fill`.
- [ ] **Step 4: Remove `rimImageSrc` and `ForegroundRimImage` from `SilkWallAperture`.** Commission 07/08 return to the generic procedural rim path; Commission 05 is the sole consumer of the selected regular frame.
- [ ] **Step 5: Re-run Commission 05, generic aperture and parallax unit tests** and expect PASS.

### Task 4: Integrate Commission 05 without parent stretch authority

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`

**Interfaces:**
- Consumes: `SilkCommission05Composition` and existing Commission 06 traversal placeholder.
- Produces: a page-owned Commission 05 placement wrapper whose CSS controls position, width and z-order only; child height derives exclusively from the locked aspect ratio.

- [ ] **Step 1: Rewrite the SilkChapter test first** so Commission 05 must contain `[data-silk-commission-05-composition]` and Commission 06 crossing, must no longer contain the generic corridor aperture, while Commission 07/08 remain generic `breach`/`slit` apertures.
- [ ] **Step 2: Run the focused SilkChapter test** and verify RED against the current experiment.
- [ ] **Step 3: Replace the Commission 05 `SilkWallAperture` call** with `SilkCommission05Composition crossing={traversal}` and remove the old `CorridorWorld` placeholder.
- [ ] **Step 4: Remove fixed `height` from `CorridorAperturePlacement`.** Preserve its existing authored horizontal placement as the starting page composition and let the child's aspect ratio derive height. Adjust only existing Specialists responsive states when needed to keep story/traversal/breach relationships usable; do not add a new breakpoint.
- [ ] **Step 5: Re-run the focused Silk component suite** and expect PASS.

### Task 5: Prove frame ratio, viewport containment and parallax bleed in the browser

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Preserve unchanged: `src/client/e2e/visual-regression.spec.ts` Index protected snapshot target.

**Interfaces:**
- Consumes: Commission 05 data hooks and the existing authored-width matrix `[2880, 2561, 2560, 1920, 1600, 1440, 901, 900, 768, 721, 720, 390, 320]`.
- Produces: objective browser evidence that the frame never skews, scene/viewport geometry remains concealed, parallax cannot expose a scene edge and reduced motion remains static.

- [ ] **Step 1: Update the authored-width Silk test** to select the dedicated Commission 05 composition. At every sampled width assert its rendered width/height ratio matches `1672 / 941` within a small layout tolerance, it remains inside the stage contract, Commission 06 still crosses its vertical boundary, and the route has no horizontal overflow. Keep Commission 07/08 generic-aperture assertions unchanged.
- [ ] **Step 2: Replace the Commission 05 normal-motion browser capture** with geometry from composition, viewport, scene and frame. Before and after scrolling, assert frame offset/size relative to composition is unchanged, scene offset changes within the authored `±16px` bound, and scene top/bottom continue to extend beyond viewport top/bottom by at least the `8px` safety margin.
- [ ] **Step 3: Update the reduced-motion test** to assert Commission 05's scene offset remains `0.00` and transform is `none` after the same scroll.
- [ ] **Step 4: Run `npm run test:e2e -- e2e/project-story.spec.ts --grep "Silk|620"` from `src/client`** and expect all focused contracts green.
- [ ] **Step 5: Run the protected Index visual regression unchanged** and do not update snapshots.
- [ ] **Step 6: Inspect the live page at ordinary desktop, 768, 390 and 320 plus actual Chrome 200% zoom.** The diagnostic source-perimeter band must remain invisible; if it appears, fix component geometry rather than hiding the band.

### Task 6: Keep evaluation custody honest and stop for visual review

**Files:**
- Modify: `docs/asset-custody.md`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/INDEX.md`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/candidates/INDEX.md`
- Keep candidate source: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-commission-05-aperture-rim-regular.png`
- Keep evaluation derivative: `src/client/public/media/patch/the-usual-specialists/silk-commission-05-aperture-rim-regular.webp`
- Regenerate: generated `INDEX.md` mesh as required after tracked source changes.

**Interfaces:**
- Consumes: selected regular rim as an approved in-situ evaluation candidate only.
- Produces: honest custody and a reviewable local React proof; no accepted Silk production manifest or final visual baseline.

- [ ] **Step 1: Record the candidate's source/derivative identities and the locked-composition evaluation status** without promoting it to accepted production art.
- [ ] **Step 2: Run `py -3 tools/run.py index-mesh --apply` and `py -3 tools/run.py index-mesh --check`.**
- [ ] **Step 3: Run `git diff --check`, the focused Commission 05/Silk Vitest suite and `npm run build`.** Do not run full canonical `ci --check` immediately before a normal commit; the tracked hook owns that complete gate when the eventual checkpoint is committed.
- [ ] **Step 4: Inspect `git status`, full relevant diff and protected Index evidence** for accidental snapshot, breakpoint, custody or generic-aperture drift.
- [ ] **Step 5: Stop for Harley's visual review of the locked composition.** Do not generate new Commission 05 imagery, create a Silk visual baseline or promote the rim from candidate to accepted production art until Harley explicitly approves the in-situ result.
