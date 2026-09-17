# The Usual Specialists V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete `/patch/the-usual-specialists/next/` as the approved six-specialist recruitment story, preserving Index, rebuilding Silk, adding Writ/Klause/Rollback/Receipt, and carrying one deterministic in-universe recruitment folder through six distinct assent states before the final completed-folder close.

**Architecture:** `UsualSpecialistsPage.tsx` stays a thin, explicit composer: opening, nav, the accepted Index chapter, then one self-contained React section per specialist and the final close. Each chapter owns its own semantic beat order, styled-components layout, container-query breakpoint vocabulary, and chapter-local media; no route-wide responsive module may know chapter geometry. Build every new chapter as a live DOM/CSS wireframe in the preview route first, freeze its responsive boxes and shot slots in-browser, then commission/promote imagery into those slots without changing the chapter source order. The only deliberate shared story primitive is the layered `RecruitmentFolder`, which supplies deterministic continuity across otherwise independent chapter modules.

**Tech Stack:** React 19, TypeScript 6, styled-components 6, Vite 8, Vitest 4, Playwright 1.61, Sharp asset processing, repository asset-custody/provenance manifests.

**Spec:** `.agents/specs/2026-09-17-usual-specialists-visual-story-design.md`

**Execution Strategy:** `executing-plans` — execute the nine dependent slices sequentially, one reviewed/committed task at a time. Folder state, route order, and transition seams accumulate, so later tasks must consume the committed output of earlier tasks rather than run in parallel.

## Global Constraints

- The route in scope is `/patch/the-usual-specialists/next/`; the legacy canonical route remains untouched until a separate cutover decision.
- Preserve the accepted Index composition. Only semantic copy, folder continuity, and removal of series-wide rope authority may touch Index unless a concrete defect is separately approved.
- The safehouse is one ordinary apartment bent to purpose: Index records den, Silk corridor/service voids, Writ adjoining-room chambers, Klause sparse office, Rollback concrete basement, Receipt observation alcove.
- Chapter responsibility is fixed: Index discovers viable routes; Silk resolves the reliable ingress/egress route; Writ establishes authority/scope; Klause chooses the executable plan; Rollback preserves recoverability; Receipt records the consequential decisions and assents.
- The folder is an in-universe continuity carrier, not a repeated hero. Every chapter inherits all prior assent material and adds exactly one new marker.
- The assent marker is each chapter's closing-beat hero. The specialist then returns to their own work; no generic `I'M IN` beat may duplicate assent.
- Silk owns one bounded black/dark comic field and one canonical frame/page breakout. The black field must terminate at the fold into Writ; it must not become a dark route shell or themed navigation.
- Copy must be earned by medium. Each chapter may have one story card; extra copy belongs only to in-universe surfaces such as forms, signage, captions, monitors, annotations, or receipt print.
- Responsive story order is more important than desktop coordinates. Preserve the established inclusive bands: `320–389`, `390–719`, `720–899`, `900–1399`, `1400–1599`, `1600–1919`, `1920–2560`, with widths above `2560` freezing the `2560` composition.
- Essential content must survive 320 CSS px, actual 200% zoom, keyboard-only use, and reduced motion. No hover-only story content, scroll-jacking, or page-scale decorative animation.
- Accepted image masters, manifests, generation receipts, provenance records, and derivatives remain under repository custody. Removing an asset from active composition does not authorize deleting its accepted source/provenance.
- Source media lives under `src/client/assets/patch/the-usual-specialists/`; browser derivatives under `src/client/public/media/patch/the-usual-specialists/` are processor-owned and must never be hand-edited.
- For normal commits, stage the intended task tree and commit normally. The tracked pre-commit hook owns the complete canonical local gate; do not run `py -3 tools/run.py ci --check` immediately before or after a successful normal commit.
- Every material visual task receives a human visual review before its commit. Do not update screenshot baselines merely to make a changed composition green.

## Build strategy: live vertical slices, not a page-level layout

The route is not implemented as one giant responsive composition. `UsualSpecialistsPage.tsx` owns only document order and the route shell. It must not import chapter responsive constants, place chapter-internal children, or carry chapter-specific CSS variables. Its target shape is deliberately boring:

```tsx
<SpecialistsStory>
  <SpecialistsCanvas>
    <UsualSpecialistsOpening />
    <SpecialistsChapterNav />
    <CrossSectionConnector crossing="opening-index" />
    <IndexChapter />
    <IndexToSilkTransition />
    <SilkChapter />
    <SilkToWritTransition />
    <WritChapter />
    <WritToKlauseTransition />
    <KlauseChapter />
    <KlauseToRollbackTransition />
    <RollbackChapter />
    <RollbackToReceiptTransition />
    <ReceiptChapter />
    <ReceiptToFinalTransition />
    <RecruitmentClose />
  </SpecialistsCanvas>
</SpecialistsStory>
```

`CrossSectionConnector` remains only where the accepted opening-to-Index seam still needs it. The page composer owns the chapter-to-chapter seams by composing explicit named transition components from `SpecialistsChapterTransitions.tsx`; those seam components may own their own small styled band, but they must not position children inside either adjacent chapter. Do not invent one generic transition renderer or route-wide breakpoint vocabulary: `IndexToSilkTransition`, `SilkToWritTransition`, and the later seams are explicit because they tell different parts of the story.

Every new chapter follows the same file ownership pattern:

```text
<Writ|Klause|Rollback|Receipt>Chapter.tsx
  semantic source order and composition of that chapter only
<Writ|Klause|Rollback|Receipt>Chapter.styles.ts
  chapter root, beat placement, visual hierarchy, and container-query layout
<writ|klause|rollback|receipt>Responsive.ts
  that chapter's breakpoint names/constants only
<Writ|Klause|Rollback|Receipt>Chapter.test.tsx
  semantic order, folder-state inheritance, assent, and local layout-contract assertions
<Chapter><Beat>Composition.tsx/.styles.ts
  only when one media slot has enough internal layering to deserve an opaque child component
```

Route-level transition ownership is separate from chapter geometry:

```text
SpecialistsChapterTransitions.tsx
  explicit named seams composed by UsualSpecialistsPage.tsx
SpecialistsChapterTransitions.styles.ts
  only inter-chapter band/edge treatment; never chapter-internal placement
SpecialistsChapterTransitions.test.tsx
  seam order and bounded-surface assertions
```

Each named transition renders a neutral, non-interactive seam contract such as:

```tsx
<TransitionBand aria-hidden="true" data-specialists-transition="index-silk" />
```

The page may order these seam components between chapters, but neither the page nor the transition module receives chapter beat refs, child coordinates, or chapter responsive constants.

Do not extract a universal `SpecialistChapter`, `ChapterBeat`, or shared breakpoint taxonomy merely because the files look similar. The stable interface is the root section contract (`id`, `aria-labelledby`, `data-specialist-chapter`, optional root `style`) plus the shared `RecruitmentFolder` component. Everything else stays local until two implemented chapters prove a real shared abstraction.

### Wireframe-first implementation loop

For Silk, Writ, Klause, Rollback, and Receipt, execute the chapter task in this order:

1. **RED contract:** write the chapter unit test and page-order test first. The test names the source-order beats and inherited/output folder states, not pixel coordinates.
2. **Live React wireframe:** create the real chapter component and chapter-local styled-components with CSS-only media boxes (`figure`/`div`, `aspect-ratio`, border/background, `data-<chapter>-beat`). Use real story copy only where already approved and mount the real `RecruitmentFolder`; do not create temporary raster placeholder files.
3. **Compose immediately:** add the chapter to `UsualSpecialistsPage.tsx`, activate its chapter-nav entry, and add the explicit route-owned seam needed to connect it to the preceding chapter. Review it in the actual page between its real neighbours, not in Storybook or an isolated mock route.
4. **Responsive wireframe pass:** make the chapter work at 1440, 768, 390, and 320 CSS px plus actual 200% zoom before commissioning final art. The chapter's own responsive module/container queries must carry the layout; the page composer stays unchanged.
5. **Freeze shot slots:** once the live wireframe reads correctly, record the exact media slot role, aspect ratio, foreground/background separation, required transparent edges, and canonical folder visibility. Those measured slots become the commission brief.
6. **Commission into candidate custody:** generate only the imagery the frozen wireframe still needs. Put every generated candidate under that chapter's `candidates/<asset-id>/` custody with receipt/provenance before promotion.
7. **Promote and swap, do not redesign:** replace the CSS wireframe surface with the accepted composition child/media in the same beat container. If final art forces a different story order or page-level geometry, reject/recommission the art rather than moving responsibility upward into `UsualSpecialistsPage`.
8. **GREEN + browser review:** run chapter unit tests, custody checks, focused Playwright, reduced-motion/overflow checks, and human visual review. Commit that vertical slice before starting the next specialist.

This means each chapter reaches a reviewable state twice: first as a responsive live wireframe proving composition, then as a finished media-backed slice. Asset generation follows layout decisions; it does not drive them.

### Responsive ownership guard

Extend `responsiveCompositionArchitecture.test.ts` as each chapter lands. The test must keep proving that:

```ts
expect(pageSource).not.toContain('writResponsive')
expect(pageSource).not.toContain('klauseResponsive')
expect(pageSource).not.toContain('rollbackResponsive')
expect(pageSource).not.toContain('receiptResponsive')
```

and that each chapter-local style/composition file imports only its own responsive vocabulary. `UsualSpecialistsPage.styles.ts` may own the authored 2560px canvas ceiling and route-level flow; `SpecialistsChapterTransitions.styles.ts` may own only seam geometry. Neither may own specialist breakpoints or chapter-internal placement.

---

### Task 1: Record the approved direction and remove stale story semantics

**Files:**
- Modify: `docs/design-decisions.md`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexStoryCard.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexStoryCard.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts`

**Interfaces:**
- Consumes: approved design spec and existing opening/Index composition.
- Produces: current decision-ledger authority, corrected opening/Index semantics, and removal of the site-wide red-rope/navigation assumption before later chapters are added.

- [ ] **Step 1: Add failing semantic tests before changing production copy**

  Update `IndexStoryCard.test.tsx` so the rendered card must describe multiple viable routes and must not say `one route holds together`. Update `UsualSpecialistsOpening.test.tsx` so the opening no longer describes a `route-shaped problem`. Update `IndexChapter.test.tsx` and `ropeCompositionArchitecture.test.ts` so Index no longer owns a route-spanning `data-specialists-rope-piece="index"` purely for series navigation.

  ```tsx
  expect(screen.getByText(/routes that look viable/i)).toBeVisible()
  expect(screen.queryByText(/one route holds together/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/route-shaped problem/i)).not.toBeInTheDocument()
  expect(container.querySelector('[data-specialists-rope-piece="index"]')).not.toBeInTheDocument()
  ```

- [ ] **Step 2: Run the focused tests and confirm RED**

  Run:

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx src/features/patch-showcase/usual-specialists/IndexStoryCard.test.tsx src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/features/patch-showcase/usual-specialists/ropeCompositionArchitecture.test.ts
  ```

  Expected: failures on the old `route-shaped problem`, old singular-route Index copy, and old Index rope ownership.

- [ ] **Step 3: Add the dated decision-ledger entry**

  Append a `2026-09-17 — The Usual Specialists uses specialist-native chapter worlds with folder continuity` decision that explicitly:

  - supersedes the 12 September mineral-plaster Silk decision;
  - preserves accepted Index, the preview route seam, and breakpoint bands;
  - records the bounded black Silk field as evidence-earned project-native interruption;
  - records the canonical folder/assent continuity system;
  - states that the actual caper remains off-screen;
  - names objective guards: 1440/768/390/320, keyboard, reduced motion, actual 200% zoom, custody/provenance, no horizontal overflow;
  - uses a reconsider trigger tied to comprehension/accessibility/performance or explicit Harley reopening.

- [ ] **Step 4: Correct opening and Index semantics and retire series-wide rope from these chapters**

  Replace the opening précis with language that says Patch has a caper and missing operational certainty rather than a pre-existing route. Replace Index story-card copy with the approved candidate-route meaning. Remove the `IndexRopePlacement`/`RopePiece` render and its no-longer-needed layout rules.

  Use this semantic target, preserving Harley's final public voice during review rather than testing exact prose:

  ```tsx
  <p>
    Index is already moving before Patch finishes the pitch. She works across maps,
    revisions and overlapping records until the evidence exposes several routes that
    look viable, the constraints attached to them, and the material Silk will need
    to find out which parts actually hold.
  </p>
  ```

  Keep the opening rope start only if it still belongs to the opening composition itself; it must not imply a red line physically threads every later chapter.

- [ ] **Step 5: Visually demote, not remove, the chapter navigation**

  In `SpecialistsChapterNav.styles.ts`, keep the same accessible links/future labels but lower contrast/weight and keep it subordinate to the safehouse threshold. Do not create a second mobile navigation hierarchy.

- [ ] **Step 6: Run focused GREEN checks**

  Run the same Vitest command from Step 2. Then run:

  ```powershell
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Index responsive matrix|connector matrix"
  ```

  Expected: semantic/unit tests pass; Index responsive proof remains green; connector tests may now identify obsolete rope-specific assertions that must be removed only where the design intentionally retired them.

- [ ] **Step 7: Commit Task 1**

  ```powershell
  git add docs/design-decisions.md src/client/src/features/patch-showcase/usual-specialists
  git commit -m "design: align specialists story semantics"
  ```

---

### Task 2: Build the deterministic recruitment-folder continuity system

**Files:**
- Create: `src/client/assets/patch/the-usual-specialists/folder/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/folder/generation-receipt.json`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-base.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-index-blueprint.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-index-sticky.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-silk-route-pin.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-silk-red-cord.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-writ-carbon-slip.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-klause-k.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-rollback-dog-tags.png`
- Create: `src/client/assets/patch/the-usual-specialists/folder/folder-receipt-strip.png`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/folder-continuity-system.md`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/RecruitmentFolder.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/RecruitmentFolder.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/RecruitmentFolder.test.tsx`
- Generated by processor: `src/client/public/media/patch/the-usual-specialists/folder-*.webp`
- Generated by processor: `src/client/public/media/patch/the-usual-specialists/usual-specialists-derivatives.json`
- Generated by mesh: affected `INDEX.md` files

**Interfaces:**
- Consumes: `usualSpecialistsAssetPath(filename)`, Index assent material language, Adventures folder-system reference from the approved spec.
- Produces: `export type RecruitmentFolderState = 'opening' | 'index' | 'silk' | 'writ' | 'klause' | 'rollback' | 'receipt'` and `RecruitmentFolder({ state, decorative?, style? })` for all later chapter tasks.

- [ ] **Step 1: Write the folder-state contract test first**

  `RecruitmentFolder.test.tsx` must prove deterministic accumulation rather than seven unrelated whole images:

  ```tsx
  const { container, rerender } = render(<RecruitmentFolder state="silk" />)
  expect(container.querySelector('[data-folder-layer="base"]')).toBeInTheDocument()
  expect(container.querySelector('[data-folder-layer="index-blueprint"]')).toBeInTheDocument()
  expect(container.querySelector('[data-folder-layer="index-sticky"]')).toBeInTheDocument()
  expect(container.querySelector('[data-folder-layer="silk-pin"]')).toBeInTheDocument()
  expect(container.querySelector('[data-folder-layer="silk-cord"]')).toBeInTheDocument()
  expect(container.querySelector('[data-folder-layer="writ-slip"]')).not.toBeInTheDocument()

  rerender(<RecruitmentFolder state="receipt" />)
  expect(container.querySelectorAll('[data-folder-assent-layer]')).toHaveLength(8)
  ```

  Also test that one canonical base image is always used and that the working-list strike-through overlay derives from `state`, not from state-specific base rasters.

- [ ] **Step 2: Run the folder test and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/RecruitmentFolder.test.tsx
  ```

  Expected: module/component missing.

- [ ] **Step 3: Commission/import the folder as one base plus transparent marker layers**

  Create/import exactly the nine source images named above. The base must hold one stable folder geometry and one stable handwritten `Agents Needed` list. Marker images must have transparent backgrounds and register to the same 1536×1024 coordinate system so runtime layering cannot drift. The list itself never changes shape; strike-throughs are rendered by the component as SVG/CSS overlay according to state.

  Asset intent:

  ```text
  folder-base.png              canonical manila folder + unchanged handwritten list
  folder-index-blueprint.png   folded blue route/map sheet protruding from folder
  folder-index-sticky.png      yellow assent note attached to blueprint
  folder-silk-route-pin.png    circular route-end assent marker clipped to blueprint
  folder-silk-red-cord.png     short red cord segment physically related to Silk pin
  folder-writ-carbon-slip.png  pink carbon-copy assent slip
  folder-klause-k.png          produced K impression only, no rubber stamp tool
  folder-rollback-dog-tags.png metal dog tags hanging from folder/spine area
  folder-receipt-strip.png     thermal-paper recruitment summary stapled across folder
  ```

  Every generated/imported source gets manifest identity, generation receipt, and the shared provenance record before promotion. Do not derive these from the public homepage WebPs; use source-quality material or regenerate from the approved visual references.

- [ ] **Step 4: Extend custody/provenance validation for the `folder` package and generic future candidates**

  In `process-usual-specialists-assets.mjs`, add `folder` to `acceptedPackageRoots` and register the nine derivatives. In `validate-usual-specialists-provenance.mjs`, include `folder` in `packageNames` and replace the current hard-coded Silk candidate-manifest list with recursive discovery of `*/candidates/**/candidate-assets.json` beneath the Usual Specialists source root. Candidate discovery must not require the chapter to be promoted into `packageNames`/`acceptedPackageRoots`; that separation is what lets Writ/Klause/Rollback/Receipt enter custody before acceptance. Candidate sources remain validation-only until promoted; only accepted packages belong in `USUAL_SPECIALISTS_ASSETS` and receive browser derivatives. Add tests proving the validator rejects a missing folder marker receipt, discovers a candidate manifest in a candidate-only future package, and the processor rejects folder source hash/dimension drift.

  ```js
  const acceptedPackageRoots = Object.freeze({
    index: path.join(specialistsSourceRoot, 'index'),
    silk: path.join(specialistsSourceRoot, 'silk'),
    rope: path.join(specialistsSourceRoot, 'rope'),
    folder: path.join(specialistsSourceRoot, 'folder'),
  })
  ```

  Candidate discovery target:

  ```js
  // Under specialistsSourceRoot, recursively read files named candidate-assets.json
  // only when their path matches <package>/candidates/<asset-id>/candidate-assets.json.
  // Merge by package name without requiring that package to be accepted yet.
  // Do not require processor derivative entries for candidate-only sources.
  ```

  Later chapter image tasks use this exact custody shape before promotion:

  ```text
  src/client/assets/patch/the-usual-specialists/<package>/candidates/<asset-id>/candidate-assets.json
  src/client/assets/patch/the-usual-specialists/<package>/candidates/<asset-id>/<asset-id>.png
  ```

- [ ] **Step 5: Implement `RecruitmentFolder` as a layered state machine**

  Use an ordered state rank and render only layers whose assent rank is less than or equal to the requested state. Keep the base and list geometry invariant.

  ```tsx
  export type RecruitmentFolderState = 'opening' | 'index' | 'silk' | 'writ' | 'klause' | 'rollback' | 'receipt'

  const stateRank: Record<RecruitmentFolderState, number> = {
    opening: 0,
    index: 1,
    silk: 2,
    writ: 3,
    klause: 4,
    rollback: 5,
    receipt: 6,
  }

  export function RecruitmentFolder({ state, decorative = false, style }: RecruitmentFolderProps) {
    const rank = stateRank[state]
    return (
      <FolderFigure aria-hidden={decorative || undefined} style={style} data-folder-state={state}>
        <FolderLayer data-folder-layer="base" src={usualSpecialistsAssetPath('folder-base.webp')} alt={decorative ? '' : 'Patch’s recruitment folder'} />
        {rank >= 1 && <FolderLayer data-folder-assent-layer data-folder-layer="index-blueprint" src={usualSpecialistsAssetPath('folder-index-blueprint.webp')} alt="" />}
        {rank >= 1 && <FolderLayer data-folder-assent-layer data-folder-layer="index-sticky" src={usualSpecialistsAssetPath('folder-index-sticky.webp')} alt="" />}
        {rank >= 2 && <FolderLayer data-folder-assent-layer data-folder-layer="silk-pin" src={usualSpecialistsAssetPath('folder-silk-route-pin.webp')} alt="" />}
        {/* remaining layers in fixed material order */}
        <FolderListStrikeState state={state} />
      </FolderFigure>
    )
  }
  ```

  Expose one semantic alt on the figure when it carries story information; all registration layers remain decorative.

- [ ] **Step 6: Generate derivatives and run folder/custody GREEN checks**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/RecruitmentFolder.test.tsx scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  py -3 tools/run.py index-mesh --apply
  py -3 tools/run.py index-mesh --check
  ```

- [ ] **Step 7: Human-review all seven folder states before commit**

  Render `opening`, `index`, `silk`, `writ`, `klause`, `rollback`, and `receipt` at a consistent scale. Reject any state where the base folder/list geometry changes, a prior marker moves/disappears, or a new marker cannot be recognised at reduced size.

- [ ] **Step 8: Commit Task 2**

  ```powershell
  git add src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/src/features/patch-showcase/usual-specialists/RecruitmentFolder* .agents
  git commit -m "feat: add specialists folder continuity"
  ```

---

### Task 3: Rebuild Silk as the first finished chapter vertical slice

**Files:**
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify substantially: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.tsx`
- Replace substantially: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/silkResponsive.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx`
- Keep/reuse only if the wireframe slot still needs them: `src/client/src/features/patch-showcase/usual-specialists/SilkTraversalComposition.tsx`, `SilkTraversalCutout.tsx`, `SilkReactionFrameComposition.tsx` and their existing tests/styles
- Delete after the replacement chapter no longer imports them: `SilkApertureComposition.tsx`, `SilkApertureComposition.styles.ts`, `SilkApertureComposition.test.tsx`, `SilkWallAperture.tsx`, `SilkWallAperture.styles.ts`, `SilkWallAperture.test.tsx`, `SilkReceiptPeekthroughComposition.tsx`, `SilkReceiptPeekthroughComposition.styles.ts`, `SilkReceiptPeekthroughComposition.test.tsx`, `SilkCommission09Composition.tsx`, `SilkCommission09Composition.styles.ts`, `SilkCommission09Composition.test.tsx`, `silkCommission05Geometry.ts`, `silkCommission05Geometry.test.ts`, `silkCommission07ReviewGeometry.ts`, `silkCommission07ReviewGeometry.test.ts`, `silkCommission08ReviewGeometry.ts`, `silkCommission08ReviewGeometry.test.ts`, `useSilkApertureParallax.ts`, `useSilkApertureParallax.test.ts`
- Create only for missing wireframe slots: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-entry-test/candidate-assets.json`
- Create only for missing wireframe slots: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-failure/candidate-assets.json`
- Create only for missing wireframe slots: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-breakout/candidate-assets.json`
- Create only for missing wireframe slots: `src/client/assets/patch/the-usual-specialists/silk/candidates/silk-assent-corridor/candidate-assets.json`
- Candidate PNGs use the matching directory basename; accepted masters use the same basenames directly under `src/client/assets/patch/the-usual-specialists/silk/`
- Modify as accepted media changes: `src/client/assets/patch/the-usual-specialists/silk/accepted-assets.json`
- Modify as accepted media changes: `src/client/assets/patch/the-usual-specialists/silk/generation-receipt.json`
- Add/modify Silk provenance records under: `src/client/assets/patch/the-usual-specialists/provenance/`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: `RecruitmentFolder state="index"` on entry and `state="silk"` on close.
- Produces: a self-contained `<SilkChapter />` section that owns its bounded black field, responsive layout, causal beat order, and final media slots; `UsualSpecialistsPage.tsx` composes the separate route-owned transition seams around it.

- [ ] **Step 1: Write the RED chapter and composer contracts**

  Replace old aperture/gallery expectations with source-order and ownership assertions:

  ```tsx
  const chapter = screen.getByRole('region', { name: 'Silk' })
  const beats = Array.from(chapter.querySelectorAll('[data-silk-beat]'))
    .map((node) => node.getAttribute('data-silk-beat'))

  expect(beats).toEqual(['inheritance', 'test', 'failure', 'breach', 'traversal', 'resolution', 'assent'])
  expect(chapter.querySelectorAll('[data-silk-breakout="true"]')).toHaveLength(1)
  expect(chapter.querySelector('[data-folder-state="index"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-folder-state="silk"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-silk-receipt-peekthrough]')).not.toBeInTheDocument()
  ```

  In `UsualSpecialistsPage.test.tsx`, assert the route order is Index → `IndexToSilkTransition` → Silk and remove the old generic `index-silk` `CrossSectionConnector` expectation. In `responsiveCompositionArchitecture.test.ts`, assert `UsualSpecialistsPage.tsx` does not import `silkResponsive` or Silk geometry; importing the named transition module is allowed.

- [ ] **Step 2: Run the focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  ```

- [ ] **Step 3: Build the live Silk wireframe in React/styled-components before generating art**

  Replace the current aperture pile with real source-order beat containers. Use CSS-only surfaces for uncommissioned imagery; do not add temporary PNGs. Add `IndexToSilkTransition` as the explicit route-owned tear/takeover seam immediately before `<SilkChapter />`; keep the seam free of Silk child positioning.

  ```tsx
  <Chapter aria-labelledby="specialists-silk-title" data-specialist-chapter="silk" id="silk">
    <EntryBeat data-silk-beat="inheritance">
      <RecruitmentFolder state="index" />
    </EntryBeat>
    <ComicField>
      <TestBeat data-silk-beat="test" />
      <FailureBeat data-silk-beat="failure" />
      <BreachBeat data-silk-beat="breach" data-silk-breakout="true" />
      <TraversalBeat data-silk-beat="traversal" />
      <ResolutionBeat data-silk-beat="resolution" />
      <AssentBeat data-silk-beat="assent">
        <RecruitmentFolder state="silk" />
      </AssentBeat>
    </ComicField>
  </Chapter>
  ```

  `SilkChapter.styles.ts` owns `container-name: silk`, the bounded black substrate, and panel/grid logic through the end of the section. `UsualSpecialistsPage.tsx` mounts `<IndexToSilkTransition />` then `<SilkChapter />`; it does not place any Silk child. Task 4 adds the separate `SilkToWritTransition` seam when Writ exists.

- [ ] **Step 4: Make the wireframe responsive and review it in the real route**

  Rework `silkResponsive.ts` around narrative roles rather than `mirrored/recomposed` aperture geometry. Before any new generation, prove the CSS wireframe at 1440, 768, 390, 320, reduced motion, and actual 200% zoom. The narrow source order stays linear; no 174-206vw scenic apertures and no horizontal overflow. The `IndexToSilkTransition` may change edge treatment across widths, but it may not import `silkResponsive` or move Silk beats.

  Run:

  ```powershell
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Silk"
  ```

  Human review gate: the live boxes alone must already read as entry/inheritance -> test -> failure -> breach -> traversal -> resolution -> assent. If the story is unclear before imagery, fix the DOM/CSS composition now.

- [ ] **Step 5: Freeze Silk media slots and audit existing accepted assets against them**

  For each beat that needs imagery, record the slot's actual CSS `aspect-ratio`, crop direction, whether it needs a transparent foreground, and whether the folder is live DOM or baked scene context. Classify existing masters as `reuse`, `reference-only`, or `superseded-composition` against those measured slots. Do not delete accepted masters/provenance.

  Minimum expected classification:

  ```text
  corridor world                          reuse/reference for entry or test
  service corridor                        reuse/reference for traversal
  hands-free abseil transparent Silk      reuse candidate for the single breakout
  surprised-eyes reaction                 reuse candidate for resolution
  old plaster aperture rims               superseded-composition
  Receipt peek-through                    superseded-composition for Silk
  Commission 09 knockthrough stand-in     superseded-composition
  ```

- [ ] **Step 6: Commission only the media the approved wireframe still lacks**

  Create candidate custody only for missing roles using the fixed IDs `silk-entry-test`, `silk-failure`, `silk-breakout`, and `silk-assent-corridor`; if an existing accepted asset already fills a frozen slot, do not create that candidate directory. Candidate briefs must quote the frozen slot ratio and composition responsibility. The final corridor candidate must reserve a stable live-DOM folder area rather than regenerate the accumulated folder state.

  Run the candidate/provenance validation before promotion:

  ```powershell
  npm --prefix src/client test -- scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
  ```

- [ ] **Step 7: Promote accepted Silk media into the frozen beat containers**

  Replace each CSS-only media surface with an `<img>` or focused opaque composition child while preserving the same parent beat, source order, and responsive box. If an image requires moving a beat or adding page-level coordinates, reject/recommission it instead. Keep exactly one breakout layer.

  Use in-medium caption copy only where the picture already carries the action; e.g. `Apparently that means she said yes.` may sit in the assent frame, not explain the route mechanics.

- [ ] **Step 8: Run GREEN checks, browser review, and commit the finished Silk slice**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SilkChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Silk"
  git add src/client/src/features/patch-showcase src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/e2e/project-story.spec.ts
  git commit -m "feat: rebuild Silk as chapter-owned comic sequence"
  ```

---

### Task 4: Add Writ as one complete responsive chapter vertical slice

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/WritChapter.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/WritChapter.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/WritChapter.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/writResponsive.ts`
- Create focused composition children only after slot review, e.g. `WritAuthorityComposition.tsx`, when internal layering merits them
- Create: `src/client/assets/patch/the-usual-specialists/writ/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/writ/generation-receipt.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/writ/candidates/writ-arrival/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/writ/candidates/writ-rounds/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/writ/candidates/writ-authority-stop/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/writ/candidates/writ-assent/candidate-assets.json`
- Candidate PNGs use the matching directory basename, e.g. `.../writ-authority-stop/writ-authority-stop.png`
- Accepted masters use the same basenames directly under: `src/client/assets/patch/the-usual-specialists/writ/`
- Add/modify Writ provenance records under: `src/client/assets/patch/the-usual-specialists/provenance/`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: `<RecruitmentFolder state="silk" />`.
- Produces: a mounted `<WritChapter />` with local container-query layout and `<RecruitmentFolder state="writ" />` at close.

- [ ] **Step 1: Write RED tests for the module contract and page order**

  ```tsx
  const writ = screen.getByRole('region', { name: 'Writ' })
  expect(Array.from(writ.querySelectorAll('[data-writ-beat]')).map((n) => n.getAttribute('data-writ-beat')))
    .toEqual(['arrival', 'rounds', 'authority-stop', 'resolution', 'assent'])
  expect(writ.querySelector('[data-folder-state="silk"]')).toBeInTheDocument()
  expect(writ.querySelector('[data-folder-state="writ"]')).toBeInTheDocument()
  ```

  Extend the architecture test so the page composer cannot import `writResponsive` and Writ styles cannot import another chapter's responsive module.

- [ ] **Step 2: Run the focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/WritChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  ```

  Expected: Writ module/transition/link/order assertions fail because no Writ slice exists yet.

- [ ] **Step 3: Create and compose the CSS-only Writ wireframe**

  Build the real `WritChapter` root and local styles first. Mount it after an explicit `<SilkToWritTransition />` and activate the Writ nav link. Use five source-order beat containers with measured `aspect-ratio` boxes and real folder states; no commissioned imagery yet. `SilkToWritTransition` owns only the black-field termination/frosted-threshold seam; Writ owns all chambers geometry below it.

- [ ] **Step 4: Prove Writ's responsive composition before commissioning**

  Run unit tests and add a focused Playwright check for Writ at 1440/768/390/320, reduced motion, and actual 200% zoom. Review the actual route. Only after the converted-chambers geometry, frosted-door/reception threshold, authority stop, and assent hierarchy work as boxes should asset work begin.

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/WritChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Writ"
  ```

- [ ] **Step 5: Freeze Writ shot slots, commission candidates, and custody them**

  Freeze no more than four media roles: chambers arrival, Writ on rounds, authority stop, carbon-copy/assent. Name each candidate from the proven beat role (`writ-arrival`, `writ-rounds`, `writ-authority-stop`, `writ-assent`) only if that slot survives wireframe review; omitted slots do not get placeholder assets. Each candidate brief uses the actual wireframe slot ratio and safe crop. Keep Receipt cameo peripheral if used. Candidate validation must pass before any Writ source is promoted into `accepted-assets.json`.

  ```powershell
  npm --prefix src/client test -- scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
  ```

- [ ] **Step 6: Promote accepted media without changing the module boundary**

  Swap accepted media into the existing beat containers. Use focused child compositions only where a slot needs internal foreground/background layering. Keep forms/signage as semantic HTML where possible so earned copy is selectable and responsive. At promotion time, add `writ` to accepted package registries, fill `accepted-assets.json`/`generation-receipt.json`, register derivatives, and generate public WebPs; do not hand-edit `src/client/public/media/patch/the-usual-specialists/`.

- [ ] **Step 7: Run GREEN proof and commit Writ**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/WritChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Writ"
  git add src/client/src/features/patch-showcase src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/e2e/project-story.spec.ts
  git commit -m "feat: add chapter-owned Writ slice"
  ```

---

### Task 5: Add Klause as one complete responsive chapter vertical slice

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/KlauseChapter.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/KlauseChapter.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/KlauseChapter.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/klauseResponsive.ts`
- Create focused child composition files only after wireframe slots prove they are needed
- Create: `src/client/assets/patch/the-usual-specialists/klause/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/klause/generation-receipt.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/klause/candidates/klause-entry/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/klause/candidates/klause-attention/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/klause/candidates/klause-options/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/klause/candidates/klause-decision/candidate-assets.json`
- Candidate PNGs use the matching directory basename, e.g. `.../klause-decision/klause-decision.png`
- Accepted masters use the same basenames directly under: `src/client/assets/patch/the-usual-specialists/klause/`
- Add/modify Klause provenance records under: `src/client/assets/patch/the-usual-specialists/provenance/`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: `<RecruitmentFolder state="writ" />`.
- Produces: a self-contained `<KlauseChapter />` and `<RecruitmentFolder state="klause" />`.

- [ ] **Step 1: Write RED tests for local state reduction**

  ```tsx
  const chapter = screen.getByRole('region', { name: 'Klause' })
  const states = chapter.querySelectorAll('[data-klause-state]')
  expect(states.length).toBeGreaterThanOrEqual(4)
  expect(states.length).toBeLessThanOrEqual(5)
  expect(chapter.querySelectorAll('[data-klause-decision="final"]')).toHaveLength(1)
  expect(chapter.querySelector('[data-folder-state="writ"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-folder-state="klause"]')).toBeInTheDocument()
  ```

  Add `klauseResponsive` isolation assertions to `responsiveCompositionArchitecture.test.ts`.

- [ ] **Step 2: Run the focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/KlauseChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  ```

  Expected: Klause module/transition/link/order assertions fail because the slice has not been mounted.

- [ ] **Step 3: Build and mount the Klause CSS wireframe**

  Implement the actual chapter with four/five source-order state containers. Make the first state visibly denser and later states progressively occupy fewer layout regions using only styled-components. Add `<WritToKlauseTransition />` between the chapter roots, mount Klause after it, and activate the nav link before adding images. The transition may hand authorised material onto the decision surface, but it does not own Klause's reduction layout.

- [ ] **Step 4: Review the responsive wireframe and freeze only the slots that need pictures**

  At 1440/768/390/320, reduced motion, and actual 200% zoom, the layout must simplify as the reader progresses even when every media box is plain CSS. Add the focused Klause browser case before commissioning. Freeze aspect ratios for office entry, pen-stop/attention shift, options field, and final decision field only if all four are still needed. The K mark itself comes from `RecruitmentFolder`; do not commission a duplicate stamp hero.

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/KlauseChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Klause"
  ```

- [ ] **Step 5: Commission/custody the frozen slots, then swap them into the same state containers**

  Candidate briefs must describe the measured slot, not redesign the page. Name candidates from the surviving state role (`klause-entry`, `klause-attention`, `klause-options`, `klause-decision`) only when that state still needs raster art. Validate candidates before promotion. Then promote accepted assets, register `klause` in processor/provenance accepted-package lists, generate derivatives, and add an opaque child composition only if a particular state contains independently layered media.

  ```powershell
  npm --prefix src/client test -- scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
  ```

- [ ] **Step 6: Run GREEN proof and commit Klause**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/KlauseChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Klause"
  git add src/client/src/features/patch-showcase src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/e2e/project-story.spec.ts
  git commit -m "feat: add chapter-owned Klause slice"
  ```

---

### Task 6: Add Rollback as one complete responsive chapter vertical slice

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/RollbackChapter.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/RollbackChapter.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/RollbackChapter.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/rollbackResponsive.ts`
- Create focused child compositions only after wireframe review
- Create: `src/client/assets/patch/the-usual-specialists/rollback/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/rollback/generation-receipt.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/rollback/candidates/rollback-basement/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/rollback/candidates/rollback-failure/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/rollback/candidates/rollback-dog-tags/candidate-assets.json`
- Candidate PNGs use the matching directory basename, e.g. `.../rollback-failure/rollback-failure.png`
- Accepted masters use the same basenames directly under: `src/client/assets/patch/the-usual-specialists/rollback/`
- Add/modify Rollback provenance records under: `src/client/assets/patch/the-usual-specialists/provenance/`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: `<RecruitmentFolder state="klause" />`.
- Produces: a self-contained `<RollbackChapter />`, no CRT assent, and `<RecruitmentFolder state="rollback" />`.

- [ ] **Step 1: Write RED behavioural/module tests**

  ```tsx
  const chapter = screen.getByRole('region', { name: 'Rollback' })
  expect(within(chapter).getByText(/what's your plan b/i)).toBeVisible()
  expect(within(chapter).queryByText(/^i'm in$/i)).not.toBeInTheDocument()
  expect(chapter.querySelector('[data-rollback-test-state="failed"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-rollback-assent="dog-tags"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-folder-state="rollback"]')).toBeInTheDocument()
  ```

  Add `rollbackResponsive` isolation assertions to the architecture test.

- [ ] **Step 2: Run the focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/RollbackChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  ```

  Expected: Rollback module/transition/link/order assertions fail because the slice has not been mounted.

- [ ] **Step 3: Build and mount the Rollback CSS wireframe**

  Compose a chapter-local basement field with source-order beats for arrival/current test, Plan A failure, containment/recovery reasoning, dog-tag toss, and immediate return to testing. Use CSS motion/state surfaces and the real folder component; do not generate media yet. Add `<KlauseToRollbackTransition />` between the chapter roots, mount Rollback after it, and activate nav. The seam may shift from decision-cleanliness into concrete/noise but may not own basement beat placement.

- [ ] **Step 4: Prove still-body/moving-field hierarchy in the live responsive wireframe**

  At 1440/768/390/320 and actual 200% zoom, the environment boxes should change state more aggressively than the Rollback figure slot. Reduced motion must still show before/after containment states. Add the focused Rollback browser case and freeze media ratios only after that contrast works without art.

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/RollbackChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Rollback"
  ```

- [ ] **Step 5: Commission/custody the minimum Rollback slots and integrate them**

  Expected media roles are basement field, Plan A failure/containment state, and dog-tag transfer. Use `rollback-basement`, `rollback-failure`, and `rollback-dog-tags` only for slots that survive the wireframe review. The dog-tag candidate reserves the live folder destination/foreground and cannot include `I'M IN`. Validate candidates before promotion, then register `rollback` as an accepted package, generate derivatives, and swap accepted assets into the existing beat containers.

  ```powershell
  npm --prefix src/client test -- scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
  ```

- [ ] **Step 6: Run GREEN proof and commit Rollback**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/RollbackChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Rollback"
  git add src/client/src/features/patch-showcase src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/e2e/project-story.spec.ts
  git commit -m "feat: add chapter-owned Rollback slice"
  ```

---

### Task 7: Add Receipt as one complete responsive chapter vertical slice

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/ReceiptChapter.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/ReceiptChapter.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/ReceiptChapter.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/receiptResponsive.ts`
- Create focused child compositions only after wireframe review
- Create: `src/client/assets/patch/the-usual-specialists/receipt/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/receipt/generation-receipt.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/receipt/candidates/receipt-alcove/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/receipt/candidates/receipt-already-done/candidate-assets.json`
- Create only for wireframe slots that survive review: `src/client/assets/patch/the-usual-specialists/receipt/candidates/receipt-tea/candidate-assets.json`
- Candidate PNGs use the matching directory basename, e.g. `.../receipt-already-done/receipt-already-done.png`
- Accepted masters use the same basenames directly under: `src/client/assets/patch/the-usual-specialists/receipt/`
- Add/modify Receipt provenance records under: `src/client/assets/patch/the-usual-specialists/provenance/`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: `<RecruitmentFolder state="rollback" />` plus any subtle record traces already established in earlier chapters.
- Produces: a self-contained `<ReceiptChapter />`, `<RecruitmentFolder state="receipt" />`, and the release into the final close.

- [ ] **Step 1: Write RED Receipt module tests**

  ```tsx
  const chapter = screen.getByRole('region', { name: 'Receipt' })
  expect(chapter.querySelector('[data-folder-state="rollback"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-receipt-record-state="already-done"]')).toBeInTheDocument()
  expect(chapter.querySelector('[data-folder-state="receipt"]')).toBeInTheDocument()
  expect(within(chapter).getByText(/tea/i)).toBeVisible()
  ```

  Add `receiptResponsive` isolation assertions to the architecture test.

- [ ] **Step 2: Run the focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/ReceiptChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterNav.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  ```

  Expected: Receipt module/transition/link/order assertions fail because the slice has not been mounted.

- [ ] **Step 3: Build and mount the Receipt CSS wireframe**

  Implement source-order beats for arrival/observation, already-done reveal, assent/staple, and tea release. Use the actual folder states and a narrow alcove geometry in local styled-components. Add `<RollbackToReceiptTransition />`, mount Receipt after it, and activate nav before commissioning imagery. The seam compresses failure/noise into a quiet chronological record; Receipt still owns the alcove geometry itself.

- [ ] **Step 4: Prove the deceleration in the responsive wireframe and freeze media slots**

  Review at 1440/768/390/320, reduced motion, and actual 200% zoom. The chapter should use fewer/lower-energy regions than Rollback. Add the focused Receipt browser case. Freeze only the slots still needed after this pass: likely a wide alcove context, already-done Receipt, and tea aftermath. Reuse the existing Receipt alcove master only if it fits the frozen role/crop; otherwise keep it as reference/custody, not composition authority.

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/ReceiptChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Receipt"
  ```

- [ ] **Step 5: Commission/custody the missing Receipt media and swap it into the frozen boxes**

  Keep the thermal strip itself canonical in `RecruitmentFolder`; do not bake a divergent accumulated folder into Receipt art. Use `receipt-alcove`, `receipt-already-done`, and `receipt-tea` only for slots that survive the wireframe review. Validate candidates before promotion; then register `receipt` as an accepted package, generate derivatives, swap accepted media into the existing boxes, and preserve the same DOM source order.

  ```powershell
  npm --prefix src/client test -- scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
  ```

- [ ] **Step 6: Run GREEN proof and commit Receipt**

  ```powershell
  npm --prefix src/client run media:usual-specialists:apply
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/ReceiptChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/responsiveCompositionArchitecture.test.ts scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists Receipt"
  git add src/client/src/features/patch-showcase src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts src/client/e2e/project-story.spec.ts
  git commit -m "feat: add chapter-owned Receipt slice"
  ```

---
### Task 8: Add the final completed-folder close and reconcile published Specialists continuity copy

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsFinalClose.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsFinalClose.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsFinalClose.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.tsx` and test
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsChapterTransitions.styles.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/home/SpecialistsPatchFeature.tsx`
- Modify: `src/client/src/features/home/HomepageSections.test.tsx`

**Interfaces:**
- Consumes: `RecruitmentFolder state="receipt"` and completed six-chapter route.
- Produces: one and only one folder-hero composition and corrected homepage semantic copy that no longer says Silk validates a `lawful route` or that the folder represents `one lawful route into the story`.

- [ ] **Step 1: Write failing final-close and homepage semantic tests**

  ```tsx
  expect(page.querySelectorAll('[data-folder-hero="true"]')).toHaveLength(1)
  expect(page.querySelector('[data-folder-state="receipt"]')).toBeInTheDocument()
  expect(screen.queryByText(/one lawful route into the story/i)).not.toBeInTheDocument()
  ```

  In the homepage test, assert Silk alt/fallback describes route reliability/recruitment continuity without implying Writ's authority belongs to Silk.

- [ ] **Step 2: Run focused tests and confirm RED**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SpecialistsFinalClose.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/home/HomepageSections.test.tsx
  ```

- [ ] **Step 3: Implement the final folder hero**

  Add `<ReceiptToFinalTransition />` immediately before `SpecialistsFinalClose`; it may compress the quiet alcove into the completed carried object but must not become a recap montage. `SpecialistsFinalClose` renders the live canonical `RecruitmentFolder state="receipt"` large enough for the six material languages to be recognised. Do not add a vault, heist montage, or teaser for caper action.

  ```tsx
  export function SpecialistsFinalClose() {
    return (
      <FinalClose aria-label="Recruitment complete" data-specialists-final-close>
        <FolderHero data-folder-hero="true">
          <RecruitmentFolder state="receipt" />
        </FolderHero>
      </FinalClose>
    )
  }
  ```

- [ ] **Step 4: Correct homepage alt/fallback semantics without redesigning the homepage movement**

  Change only the stale semantic strings. Silk's eye-detail alt should describe a route surviving her hostile test without calling it lawful. The fallback should describe the completed recruitment/assent object rather than `one lawful route into the story`.

- [ ] **Step 5: Run focused GREEN checks and human review**

  ```powershell
  npm --prefix src/client test -- src/features/patch-showcase/usual-specialists/SpecialistsFinalClose.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/home/HomepageSections.test.tsx
  npm --prefix src/client run test:e2e -- e2e/homepage.spec.ts --grep "Specialists"
  ```

  Confirm the final close is the first point where the folder dominates the frame, and that the story simply stops after recruitment rather than promising/showing the caper.

- [ ] **Step 6: Commit Task 8**

  ```powershell
  git add src/client/src/features/patch-showcase src/client/src/features/home
  git commit -m "feat: close specialists recruitment story"
  ```

---

### Task 9: Finish full-route responsive, accessibility, visual-regression, and custody proof

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts` only if coverage registration needs to change, not to weaken rules
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Update approved Windows baselines only after human approval: `src/client/e2e/**/__screenshots__/*usual-specialists*`
- Modify only if evidence requires: chapter-local `*Responsive.ts`, chapter styles, alt text, lazy/eager image flags
- Generated: affected `INDEX.md` files

**Interfaces:**
- Consumes: complete route from Tasks 1–8.
- Produces: objective whole-route proof against the approved spec, with no remaining old-Silk geometry assertions or missing later-chapter coverage.

- [ ] **Step 1: Expand the page-order test to the complete six-chapter source order**

  `UsualSpecialistsPage.test.tsx` and `project-story.spec.ts` must prove:

  ```text
  opening → nav → Index → IndexToSilkTransition → Silk → SilkToWritTransition → Writ → WritToKlauseTransition → Klause → KlauseToRollbackTransition → Rollback → RollbackToReceiptTransition → Receipt → ReceiptToFinalTransition → final close
  ```

  Cross-section connectors may remain only where they do actual transition work. Do not create identical connector furniture between every chapter.

- [ ] **Step 2: Add folder continuity assertions at every chapter boundary**

  Browser proof must check the ordered states exist:

  ```ts
  for (const state of ['index', 'silk', 'writ', 'klause', 'rollback', 'receipt'] as const) {
    await expect(page.locator(`[data-folder-state="${state}"]`).first()).toBeVisible()
  }
  ```

  Add chapter-specific assertions for Writ authority, Klause reduction, Rollback no-CRT-assent, Receipt tea/release, and final single folder hero.

- [ ] **Step 3: Run breakpoint-edge browser checks and repair only evidence-backed defects**

  Exercise `389/390`, `719/720`, `899/900`, `1399/1400`, `1599/1600`, `1919/1920`, `2560/2880`. At each relevant width assert no page-level horizontal overflow and correct chapter order. Do not add special breakpoint values unless a defect cannot be solved within the approved bands.

- [ ] **Step 4: Perform the non-automated accessibility/visual gate**

  Review the complete route at:

  ```text
  1440 CSS px
  768 CSS px
  390 CSS px
  320 CSS px
  actual browser zoom 200%
  keyboard-only navigation
  prefers-reduced-motion: reduce
  thumbnail/reduced-detail scale for chapter first-read hierarchy
  ```

  Record findings in the PR/review notes, not in a permanent score file. Fix any case where text is obscured by art, folder markers become unrecognisable, source order diverges from reading order, focus is hidden, or Silk's black field fails to return to mineral at the Writ boundary.

- [ ] **Step 5: Update visual regression only after visual approval**

  Replace the old `Specialists Index draft`-only baseline with representative complete-route captures. Keep Index protection, but add approved frames that expose Silk's bounded takeover and the completed-route/final-folder state. On Windows, generate candidate baselines once, inspect them, then run the visual suite twice without `--update-snapshots` before trusting the baseline.

  ```powershell
  npm --prefix src/client run test:e2e:visual -- --update-snapshots
  npm --prefix src/client run test:e2e:visual
  npm --prefix src/client run test:e2e:visual
  ```

- [ ] **Step 6: Run all focused objective gates**

  ```powershell
  npm --prefix src/client run media:usual-specialists:check
  npm --prefix src/client test -- src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists scripts/process-usual-specialists-assets.test.ts scripts/validate-usual-specialists-provenance.test.ts
  npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists"
  npm --prefix src/client run test:e2e -- e2e/accessibility.spec.ts --grep "Usual Specialists"
  py -3 tools/run.py index-mesh --apply
  py -3 tools/run.py index-mesh --check
  git diff --check
  ```

- [ ] **Step 7: Stage the complete task and commit through the tracked canonical hook**

  Do not run `py -3 tools/run.py ci --check` immediately beforehand. Stage the exact final tree, inspect it, then commit normally so the hook runs the complete staged-tree gate once.

  ```powershell
  git status --short
  git diff --stat
  git add -A
  git diff --cached --check
  git diff --cached --stat
  git commit -m "test: prove complete specialists v2 story"
  ```

  Expected hook evidence: repository checks pass, Vitest passes, production build passes, Playwright journeys pass. If the hook rejects the commit, repair the reported slices with focused checks and retry; do not bypass it.

---

## Explicit Non-Goals During Execution

- Do not cut the legacy canonical route over to V2.
- Do not redesign the accepted Index field beyond the approved semantic/continuity changes.
- Do not show the caper itself.
- Do not turn the folder into an access credential, proof object, or repeated hero.
- Do not use a shared visual chapter template for all specialists.
- Do not preserve old Silk plaster/aperture modules because they were expensive to commission.
- Do not delete superseded accepted masters/provenance as part of composition cleanup.
- Do not invent a route-wide dark theme or change shared site navigation for Silk.
- Do not add new breakpoint bands unless browser evidence forces a separately reviewed change.
- Do not broaden this pass into unrelated Patch, homepage, project-page, or portfolio-shell redesign.

## Final Implementation Confidence Gate

Before execution handoff to code review, the implementer must be able to answer `yes` with current evidence to all of these:

1. Does every chapter perform only its own specialist job?
2. Does every chapter inherit the correct folder state and add exactly one assent marker?
3. Is the folder hero only at the final close?
4. Does Silk contain exactly one meaningful page/frame breakout and return to mineral before Writ?
5. Do Writ, Klause, Rollback, and Receipt read as actual adapted apartment spaces rather than unrelated fantasy sets?
6. Does every specialist visibly return to their own work after assent?
7. Is the caper absent because recruitment is the story?
8. Do 320px, actual 200% zoom, keyboard-only, and reduced-motion reviews preserve comprehension?
9. Are all new accepted visual assets covered by source manifests, generation receipts, provenance records, processor derivatives, and current hashes?
10. Has the latest normal commit passed the tracked complete local hook without bypass?
