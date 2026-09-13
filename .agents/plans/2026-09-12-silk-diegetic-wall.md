# Silk Diegetic Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the superseded rectangular Silk wireframe with a tested diegetic mineral-wall/aperture proof, align Linear commissioning authority to that direction, and preserve the accepted Index/responsive contracts.

**Architecture:** Keep Index unchanged and make `SilkChapter` own a page-surface composition built from local aperture primitives. Each aperture clips a behind-wall world plane, owns a stable foreground rim, and optionally applies bounded scroll parallax to the world plane only; the Silk parent owns placement/size/z-order. Keep rope continuity modular and test physical relationships rather than one page-spanning SVG implementation.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest/Testing Library, Playwright, Vite.

**Spec:** `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`

## Global Constraints

- Preserve accepted Index geometry and protected visual baselines.
- Use only `specialistsResponsive.ts` authored states; do not add a Silk-local 620px breakpoint.
- 1920px inclusive is the first ultrawide state; geometry freezes above 2560px.
- The `SILK` SVG stays clean and unmodified; the physical rope crosses its glyph bodies.
- Commission 06 owns no rope pixels; React composes traversal above/through the local rope.
- Parent wrappers own whole-child geometry; children own internals; no `className` styling API, selector reach-through, geometry custom-property API or `styled(ChildComponent)` seam.
- Parallax is subtle, direct-scroll, bounded, aperture-world-only and disabled by `prefers-reduced-motion: reduce`.
- No image generation is part of this implementation plan.

---

### Task 1: Align durable design and commissioning authority

**Files:**
- Create: `.agents/specs/2026-09-12-silk-diegetic-wall-design.md`
- Create: `.agents/plans/2026-09-12-silk-diegetic-wall.md`
- Modify: `docs/design-decisions.md`
- Regenerate: `.agents/specs/INDEX.md`, `.agents/plans/INDEX.md`
- External: PORT-18 issue and PORT-16 page/Silk/commission documents in Linear

**Interfaces:**
- Consumes: approved moonshot direction from Harley on 12 September 2026.
- Produces: one current authority chain for the React proof and later image commissioning.

- [x] **Step 1: Rewrite PORT-18 and the PORT-16 page/Silk documents** so the old disposable Silk wireframe is historical only and the mineral-page/aperture direction is the current composition authority.
- [x] **Step 2: Rewrite Commission 05–09 and the rope/anchor/occluder/Receipt briefs** around behind-wall plates, aperture threshold traversal, reaction slit, reopened handoff geometry and page-world depth transitions.
- [x] **Step 3: Rename/rewrite the panel-edge-occluder brief** as a mineral-wall aperture/rim package and record the asset-family responsibilities.
- [x] **Step 4: Add a dated `docs/design-decisions.md` entry** recording the problem, approved direction, preserved invariants and reconsideration triggers.
- [x] **Step 5: Run `py -3 tools/run.py index-mesh --apply`** because new spec/plan files change generated navigation.
- [x] **Step 6: Run `py -3 tools/run.py index-mesh --check`** and expect a clean pass.

Mesh checkpoint note: the 12 September apply/check passes were run while this new plan/spec and the Silk source directory were still untracked. The mesh generator only links tracked custody into parent generated indexes, so rerun apply/check after staging the eventual commit to bring those new tracked paths into generated navigation; do not hand-edit the generated indexes.

### Task 2: Define the Silk aperture primitive with a static reduced-motion contract

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.test.tsx`

**Interfaces:**
- Consumes: ordinary React children as the behind-wall world; optional semantic `variant: 'corridor' | 'breach' | 'slit'`; root-only `style?: React.CSSProperties`.
- Produces: `SilkWallAperture` root with `[data-silk-aperture]`, stable `[data-silk-aperture-rim]` and transformable `[data-silk-aperture-world]` hooks.

- [x] **Step 1: Write the failing component test** proving the root/child hooks, variant attribute, semantic child rendering, root-only style forwarding and no caller-facing `className` seam.
- [x] **Step 2: Run `npm test -- --run src/features/patch-showcase/usual-specialists/SilkWallAperture.test.tsx`** and expect failure because the component does not exist.
- [x] **Step 3: Implement the minimal aperture structure and CSS** with irregular `clip-path` silhouettes for corridor/breach/slit, a world layer with bleed, and a non-moving foreground rim/pseudo-edge treatment. Do not add scroll behavior yet.
- [x] **Step 4: Re-run the focused Vitest file** and expect pass.

### Task 3: Add bounded scroll parallax to the aperture world plane

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/useSilkApertureParallax.test.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkWallAperture.styles.ts`

**Interfaces:**
- Consumes: aperture root ref, maximum travel in CSS px, `prefers-reduced-motion` and viewport intersection state.
- Produces: a bounded `translate3d(0, y, 0)` on the world layer only, with zero transform under reduced motion.

- [x] **Step 1: Write failing hook tests** for clamping, reduced-motion zeroing and inactive/off-screen zeroing using pure exported calculation helpers rather than brittle scroll-event timing.
- [x] **Step 2: Run the focused hook test** and expect failure.
- [x] **Step 3: Implement a small calculation helper and hook** using one `requestAnimationFrame` update path and `IntersectionObserver`; listen to normal `scroll`/`resize`, never prevent/default or alter scroll position.
- [x] **Step 4: Wire the hook into `SilkWallAperture`** so only `[data-silk-aperture-world]` moves and the root/rim remain fixed.
- [x] **Step 5: Re-run aperture/hook Vitest tests** and expect pass.

### Task 4: Rewrite the Silk chapter from rectangular cells to page/world apertures

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Replace substantially: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`

**Interfaces:**
- Consumes: `SilkWallAperture`, accepted `silk-wordmark.svg`, accepted `specialists-silk.webp`, existing story copy.
- Produces: chapter 02 mineral-page proof with corridor aperture, traversal threshold placeholder, breach aperture, Receipt placeholder, reaction slit and reopened handoff placeholder.

- [x] **Step 1: Rewrite the Silk component test first** to remove rectangular Commission 05/07/08/09 assumptions and require the new aperture variants, accepted reaction source behind the slit, page-plane story card/name mark, traversal threshold placeholder and separate handoff beat.
- [x] **Step 2: Run the Silk component test** and expect failure against the old wireframe.
- [x] **Step 3: Replace the old `WireframeSurface` composition** with authored page-plane/aperture placeholders. Keep Commission identifiers as narrative hooks where useful but do not render them as bordered figures.
- [x] **Step 4: Keep the story card deliberately calm on the mineral page plane** and preserve the real `SILK` wordmark.
- [x] **Step 5: Keep the accepted reaction image behind the slit aperture** using the existing close crop, adjusted only as required by the new slit geometry.
- [x] **Step 6: Run the Silk component test** and expect pass.

### Task 5: Replace obsolete Silk browser contracts with physical depth contracts

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`

**Interfaces:**
- Consumes: new aperture data hooks and unchanged Index protected wrapper.
- Produces: browser proof for responsive apertures, parallax/reduced motion, rope/SILK relationship, overflow and 2560 ceiling without freezing implementation-specific rectangle coordinates.

- [x] **Step 1: Replace the test named `preserves the locked Silk wireframe relationships`** with authored-width assertions that corridor/breach/slit apertures are visible, are not ordinary bordered figures, preserve source order, and remain inside the Silk stage without horizontal overflow.
- [x] **Step 2: Add a normal-motion parallax browser test**: capture world/rim geometry/transform before and after scrolling through the first aperture; assert the world transform changes within the designed bound while the rim remains page-locked relative to its aperture root.
- [x] **Step 3: Add a reduced-motion browser test** that emulates `reduce`, scrolls the same range, and asserts the world transform remains zero/none.
- [x] **Step 4: Replace the `one rope` implementation-count assertion** with rope/SILK crossing and traversal-layering outcomes that tolerate future chapter-local segments.
- [x] **Step 5: Preserve the Index visual-regression clip exactly** and add no Silk baseline until the placeholder aperture composition receives Harley's visual approval.
- [x] **Step 6: Run focused Playwright tests** for Specialists responsive/aperture/rope contracts.

### Task 6: Prepare Silk asset custody for the new commission architecture

**Files:**
- Modify: `docs/asset-custody.md`
- Modify: `src/client/assets/patch/INDEX.md`
- Create: `src/client/assets/patch/the-usual-specialists/silk/INDEX.md`
- Create later on acceptance only: `src/client/assets/patch/the-usual-specialists/silk/accepted-assets.json`
- Modify or split later on accepted media: `src/client/scripts/process-usual-specialists-assets.mjs`

**Interfaces:**
- Consumes: no new accepted generated images in this task.
- Produces: documented custody boundary making clear that the rejected Commission 05 attempt is not accepted and Silk will use a separate accepted-source package when art is approved.

- [x] **Step 1: Update custody prose** to record the approved Silk wordmark and the new planned Silk source-package boundary without falsely claiming commissioned images exist.
- [x] **Step 2: Add the Silk source-directory `INDEX.md` only**; do not create an empty accepted-assets manifest that could be mistaken for accepted art.
- [x] **Step 3: Do not generalize the media processor yet.** Record that processor work starts when the first Silk master is actually accepted, so we do not build speculative pipeline branches around placeholder assets.
- [x] **Step 4: Regenerate/check the index mesh** after the structural asset-directory addition.

### Task 7: Focused verification and review checkpoint

**Files:** all changed files above.

**Interfaces:**
- Consumes: Tasks 1–6.
- Produces: one reviewable moonshot React proof ready for Harley's visual inspection before more image commissioning.

- [x] **Step 1: Run focused Vitest** for `SilkChapter`, `SilkWallAperture`, parallax helper/hook, `UsualSpecialistsPage` and responsive vocabulary.
- [x] **Step 2: Run focused Playwright** for the Specialists authored widths, parallax/reduced-motion and Index protected contracts.
- [x] **Step 3: Run `npm run build`** to prove the production bundle and existing media checks.
- [x] **Step 4: Run `py -3 tools/run.py index-mesh --check`** and expect pass.
- [x] **Step 5: Inspect `git diff --check`, `git status` and the complete diff** for stale wireframe language, accidental Index drift and unsupported asset claims.
- [x] **Step 6: Stop for Harley visual review before generating any further Silk imagery or authoring a Silk visual baseline.** Harley approved the React proof on 12 September 2026 and authorized the next commission experiment.
