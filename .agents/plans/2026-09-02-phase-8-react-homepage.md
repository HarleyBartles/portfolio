# Phase 8 React Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` (recommended) or `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the deferred shuffled homepage at `/` with the accepted six-movement Phase 8 React homepage while preserving modular Writing/Patch edition seams and destination-owned teaser copy.

**Architecture:** `HomePage` remains the page orchestrator and renders a deterministic `homepageEdition` descriptor into focused section components. Each selected feature owns its inward route, incoming teaser, media, fallback, and responsive vocabulary; the shell owns only ordering, metadata, and passing the next descriptor's teaser to the current section. Homepage-specific SCSS translates the accepted wireframe into the production shell without changing unrelated interior surfaces.

**Tech Stack:** React 19, TypeScript, React Router, SCSS, Vitest/Testing Library, Playwright, Vite static GitHub Pages build.

**Execution Strategy:** `executing-plans` — the edition contract, component markup, asset paths, and responsive CSS are tightly coupled and should be executed sequentially in this existing worktree.

## Global Constraints

- Stay on `codex/phase-8-homepage-editorial-room` and update draft PR #48 only; do not create another branch/PR or mark it ready.
- Preserve the accepted movement order: opening, Marketplace, Wild Bunch, Writing, Patch, professional close.
- Keep normal scrolling free; `→` routes inward, `↓` continues, and no mount-time randomness returns.
- Preserve Fold 3 topology: `events → Cache → State` and `complete ordered event history → Replay → Cache → State`; Replay never feeds State directly.
- Keep Specialists black torn-paper styling local to its Patch feature, with semantic wordmark text and zero-flow Klause overprint.
- Promote accepted full-resolution assets into production custody; production code must not reference `docs/editorial-drafts`.
- Target WCAG 2.2 AA, visible focus, reduced motion, 320px and 200% zoom reflow, robust media fallbacks, and no horizontal page overflow.
- Do not reopen Fold 2 unless React translation reveals a functional or accessibility defect.

---

### Task 1: Deterministic edition and destination-owned teaser contract

**Files:**
- Create: `src/client/src/features/home/homepageEdition.ts`
- Create: `src/client/src/features/home/homepageEdition.test.ts`
- Remove after replacement: `src/client/src/features/home/featureCatalog.ts`
- Remove after replacement: `src/client/src/features/home/featureCatalog.test.ts`
- Remove after replacement: `src/client/src/features/home/featureOrder.ts`
- Remove after replacement: `src/client/src/features/home/featureOrder.test.ts`
- Remove after replacement: `src/client/src/features/home/FeatureDeck.tsx`
- Remove after replacement: `src/client/src/features/home/FeatureDeck.test.tsx`

**Interfaces:**
- Consumes: canonical production routes for the selected article and Patch story.
- Produces: `HomepageFeatureDescriptor`, `HomepageEdition`, `homepageEditions`, `defaultHomepageEdition`, and `getHomepageEdition(id?)`.

- [ ] **Step 1: Write failing contract tests**

  Assert literal expected data for the default Writing and Patch descriptors, including `anchorId`, `title`, `to`, and `incomingTeaser`, then prove a test-only alternate Patch descriptor changes the teaser read by the preceding slot without changing shell logic.

- [ ] **Step 2: Run the focused test and verify RED**

  Run `npm.cmd --prefix src/client test -- src/features/home/homepageEdition.test.ts`; expect failure because `homepageEdition.ts` does not exist.

- [ ] **Step 3: Implement the smallest typed edition registry**

  Add discriminated Writing/Patch descriptors and a pinned default edition. Selection accepts an optional stable ID and falls back to the default; it contains no date, cookie, network, or random policy.

- [ ] **Step 4: Run the focused test and verify GREEN**

  Re-run the focused Vitest command and require a clean pass.

- [ ] **Step 5: Mark Task 1 checklist items complete in this plan**

---

### Task 2: Production section components and semantic page composition

**Files:**
- Create: `src/client/src/features/home/HomepageOpening.tsx`
- Create: `src/client/src/features/home/MarketplaceFeature.tsx`
- Create: `src/client/src/features/home/WildBunchFeature.tsx`
- Create: `src/client/src/features/home/WritingFeature.tsx`
- Create: `src/client/src/features/home/SpecialistsPatchFeature.tsx`
- Create: `src/client/src/features/home/ProfessionalClose.tsx`
- Create: `src/client/src/features/home/HomepageSections.test.tsx`
- Modify: `src/client/src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `HomepageFeatureDescriptor` values from Task 1 and production route helpers through React Router links.
- Produces: independently authored semantic sections whose `nextTeaser` prop is rendered by the current section but sourced from the destination descriptor.

- [ ] **Step 1: Write failing semantic/component tests**

  Render the real section components in `MemoryRouter` and assert: accepted headings and inward routes; canonical anchors in order; current sections render the supplied next teaser; Wild Bunch contains one event history, six ordered events, Replay, Cache, and State in semantic order; Specialists exposes real `PATCH` and `The Usual Specialists` text and a zero-flow overprint marker.

- [ ] **Step 2: Run the focused tests and verify RED**

  Run `npm.cmd --prefix src/client test -- src/features/home/HomepageSections.test.tsx`; expect missing-component failures.

- [ ] **Step 3: Implement focused section components and replace `HomePage`**

  Translate the accepted HTML source into React components, use `Link` for inward application routes and native anchors for homepage continuation, remove the navigation query/loading gate, and let `HomePage` select the edition and connect adjacent descriptors.

- [ ] **Step 4: Run Tasks 1-2 tests and verify GREEN**

  Run `npm.cmd --prefix src/client test -- src/features/home/homepageEdition.test.ts src/features/home/HomepageSections.test.tsx`.

- [ ] **Step 5: Mark Task 2 checklist items complete in this plan**

---

### Task 3: Promote accepted assets and record custody

**Files:**
- Create: `src/client/public/media/homepage/marketplace-superpowers-plus-wide.svg`
- Create: `src/client/public/media/homepage/marketplace-superpowers-plus-intermediate.svg`
- Create: `src/client/public/media/homepage/marketplace-superpowers-plus-narrow.svg`
- Create: `src/client/public/media/homepage/wild-bunch-state.webp`
- Create: `src/client/public/media/homepage/wild-bunch-state-vertical.webp`
- Create: `src/client/public/media/homepage/wild-bunch-replay-leather.webp`
- Create: `src/client/public/media/homepage/wild-bunch-cache-crosshatch.webp`
- Create: `src/client/public/media/homepage/specialists-torn-edge-left.png`
- Create: `src/client/public/media/homepage/specialists-torn-edge-right.png`
- Create: `src/client/public/media/homepage/patch-wordmark.svg`
- Create: `src/client/public/media/homepage/the-usual-specialists-wordmark.svg`
- Create: `src/client/public/media/homepage/specialists-folder.png`
- Create: `src/client/public/media/homepage/specialists-silk.png`
- Create: `src/client/public/media/homepage/specialists-rollback.png`
- Create: `src/client/public/media/homepage/specialists-receipt.png`
- Create: `src/client/public/media/homepage/specialists-klause-k.png`
- Modify: `docs/asset-custody.md`

**Interfaces:**
- Consumes: accepted full-resolution editorial-room assets and their recorded hashes/rights boundaries.
- Produces: stable same-origin `/media/homepage/*` paths used by Task 2 components and documented production custody.

- [ ] **Step 1: Copy only the accepted source assets byte-for-byte**

  Copy from the accepted wireframe, wordmark, and lawful-heist proof asset folders into `public/media/homepage`; do not regenerate, downsample, or copy font binaries.

- [ ] **Step 2: Verify identity and production references**

  Compare SHA-256 hashes between each source and destination and search production source to prove no component references `docs/editorial-drafts`.

- [ ] **Step 3: Add the Phase 8 homepage custody record**

  Record source paths, original custody, byte-for-byte promotion, dimensions/hashes, decorative versus semantic role, and fallback behaviour in `docs/asset-custody.md`.

- [ ] **Step 4: Mark Task 3 checklist items complete in this plan**

---

### Task 4: Responsive authored styling and failure states

**Files:**
- Create: `src/client/src/features/home/HomePage.scss`
- Modify: `src/client/src/pages/HomePage.tsx`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes: section class/data contracts from Task 2 and asset paths from Task 3.
- Produces: homepage-local wide/tablet/portrait regimes at the accepted `1280`, `901`, `721`, Specialists `1100`, and Specialists `521` boundaries.

- [ ] **Step 1: Add browser assertions that fail against the unstyled translation**

  Extend `src/client/e2e/homepage.spec.ts` with observable layout contracts: no overflow at standing/boundary widths, authored anchor landings, zero-flow K geometry, reduced-motion native scrolling, and content survival when homepage media requests fail.

- [ ] **Step 2: Run homepage e2e and verify RED**

  Build and run the homepage spec through the repository e2e runner; expect layout/fallback assertions to fail before the SCSS translation exists.

- [ ] **Step 3: Implement homepage-local SCSS**

  Port the accepted composition into namespaced production styles, retaining the production SiteHeader/SiteFooter shell. Remove only obsolete homepage selectors from global SCSS after confirming no other consumer uses them.

- [ ] **Step 4: Re-run homepage e2e and verify GREEN**

  Require the accepted routes, anchors, topology, fallback, reduced-motion, zero-flow, and overflow assertions to pass.

- [ ] **Step 5: Mark Task 4 checklist items complete in this plan**

---

### Task 5: Replace old homepage browser/baseline contracts and document the durable decision

**Files:**
- Modify: `src/client/e2e/homepage.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Replace: `src/client/e2e/visual-regression.spec.ts-snapshots/homepage-masthead.png`
- Replace: `src/client/e2e/visual-regression.spec.ts-snapshots/homepage-feature-deck.png`
- Modify: `docs/design-decisions.md`

**Interfaces:**
- Consumes: the standing homepage from Tasks 1-4.
- Produces: browser proof of the new public contract and a dated decision retiring the manual randomized deck in favour of deterministic selected editions.

- [ ] **Step 1: Rewrite obsolete browser expectations**

  Remove old hero/shuffle/card assumptions and assert the six accepted movements, intended inward routes, destination-owned teaser behaviour, jump semantics, keyboard traversal, and Fold 3/Specialists invariants.

- [ ] **Step 2: Update representative Windows visual baselines**

  Replace the old masthead/deck screenshots with representative opening and whole-movement snapshots named for the new contracts; run the changed screenshot test twice without update mode after authoring baselines.

- [ ] **Step 3: Record the durable homepage edition decision**

  Add a 2026-09-02 decision stating that the shell uses pinned deterministic Writing/Patch descriptors, destinations own incoming teaser copy, and rotation policy remains deferred.

- [ ] **Step 4: Run focused unit, homepage e2e, and visual checks**

  Run the home unit tests, `homepage.spec.ts`, and the changed visual test twice on Windows.

- [ ] **Step 5: Mark Task 5 checklist items complete in this plan**

---

### Task 6: Rendered inspection, durable handoff, and branch proof

**Files:**
- Create: `docs/editorial-drafts/phase-8/phase-8-homepage-react-implementation-handoff.md`
- Move on completion: `.agents/plans/2026-09-02-phase-8-react-homepage.md` to `.agents/plans/completed/2026-09-02-phase-8-react-homepage.md`
- Regenerate: affected `INDEX.md` files via `py -3 tools/run.py mesh --apply`

**Interfaces:**
- Consumes: completed production homepage and objective test results.
- Produces: durable implementation handoff, rendered evidence, clean committed branch, and updated draft PR #48 without changing readiness state.

- [ ] **Step 1: Inspect the real React page at all accepted widths**

  Inspect `1440×1000`, `984×912`, `768×900`, `390×844`, and `320×844`, plus `1279/1280`, `900/901`, `720/721`, `520/521`, and `1099/1100`; check composition, links, focus, media-off/failure, reduced motion, and overflow. Perform a real 200% browser-zoom pass.

- [ ] **Step 2: Repair only genuine production translation defects**

  For each discovered defect, add or tighten the smallest failing automated assertion first, verify RED, implement the repair, and verify GREEN. Do not reopen Fold 2 art direction.

- [ ] **Step 3: Write the implementation handoff**

  Record component/config boundaries, edition seam, promoted assets/fallbacks, exact tests/browser evidence, and any deliberate wireframe deviations.

- [ ] **Step 4: Complete and archive the plan**

  Mark every checklist item complete, move this file to `.agents/plans/completed/`, update affected links, and run `py -3 tools/run.py mesh --apply`.

- [ ] **Step 5: Commit normally and let the tracked hook run the complete gate**

  Stage the intended tree and commit without bypassing `.githooks/pre-commit`; the hook's successful `py -3 tools/run.py ci --check` run is the canonical local proof for the exact commit.

- [ ] **Step 6: Push and verify draft PR #48**

  Push the existing branch, verify the GitHub-visible head and checks, and confirm PR #48 remains draft. Do not mark it ready or merge it.

- [ ] **Step 7: Mark Task 6 checklist items complete in the archived plan**

## Plan readiness

**Rating:** 9/10. The live brief, accepted proof, production seams, exact asset sources, test commands, breakpoint set, and publication boundary are explicit. The remaining uncertainty is normal rendered tuning during translation, which Task 6 constrains through test-first defect repair and the accepted wireframe authority.
