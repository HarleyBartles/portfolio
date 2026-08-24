# Portfolio £10k Phase 5 Lawful Heist Crew Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` (recommended) or `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `/patch/lawful-heist/` as an authored sequential recruitment story using six canonical Heist Crew portraits, six portfolio-generated assent markers and the completed recruitment folder.

**Architecture:** Extend the existing manifest-driven Patch specialist seam with one focused React page and stylesheet. Keep upstream Adventures of Patch sources pinned and verified separately from six committed portfolio-generated master images, then use the existing Sharp processor to create the deployable AVIF/WebP evidence and receipt. Keep the page static, semantic and source ordered.

**Tech Stack:** React 19, TypeScript, Vite, SCSS, Sharp, Vitest, Testing Library, Playwright, axe-core, Python repository quality gates, OpenAI image generation.

**Execution Strategy:** `executing-plans` because asset selection, derivative processing, editorial composition and rendered-page taste review are tightly coupled and Sol must own the final visual and prose judgement.

## Global Constraints

- Execute only the remaining roadmap Phase 5 Lawful Heist Crew slice. Do not advance Phase 6.
- Follow `.agents/specs/2026-08-24-portfolio-10k-05-lawful-heist-crew-design.md` and the active portfolio design policy.
- Public route and title are `/patch/lawful-heist/` and `The Lawful Heist Crew`.
- Use the crew in this order: Index, Silk, Writ, Klause, Rollback, Receipt.
- No em dashes, decorative emoji, generic AI contrast formulas or repeated model-favourite reflection frames in public copy.
- Keep all names, quotes, responsibilities and assent wording as HTML. Images cannot carry the only accessible meaning.
- No carousel, lightbox, horizontal scroller, autoplay, decorative animation, forced Patch composite or invented heist scene.
- Upstream character and folder sources must resolve inside a clean `ADVENTURES_PATCH_SOURCE_ROOT` at the pinned Adventures of Patch revision.
- Portfolio-generated masters must be committed under `src/client/assets/patch/lawful-heist/` with prompts, checksums, permission and selection evidence in `generation-receipt.json`.
- Deploy only measured AVIF/WebP derivatives under `src/client/public/media/patch/`; never deploy full-size source PNGs.
- Generated text, character identity, material continuity and physical credibility are hard visual acceptance gates.
- Review at 1440, 768, 390 and 320 CSS pixels, keyboard-only, reduced motion and 200% zoom.
- Stage all generated source and mesh changes before `py -3 tools/run.py ci --check`; do not bypass hooks.

---

### Task 1: Re-pin source custody and create the six accepted marker masters

**Files:**
- Create: `src/client/assets/patch/lawful-heist/generation-receipt.json`
- Create: `src/client/assets/patch/lawful-heist/assent-index.png`
- Create: `src/client/assets/patch/lawful-heist/assent-silk.png`
- Create: `src/client/assets/patch/lawful-heist/assent-writ.png`
- Create: `src/client/assets/patch/lawful-heist/assent-klause.png`
- Create: `src/client/assets/patch/lawful-heist/assent-rollback.png`
- Create: `src/client/assets/patch/lawful-heist/assent-receipt.png`
- Modify: `docs/asset-custody.md`

**Interfaces:**
- Consumes: Adventures of Patch `main` at `13bf77adc63cf5c8f49363cedd5dd392822b8375`; canonical portraits under `build/characters/heist-crew/reference_sheets/`; joined folder references under `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/`; the explicit derivative permission in the approved spec.
- Produces: six reviewed source PNGs and a machine-readable `generation-receipt.json` containing `sourceRevision`, `permission`, `tool`, `generatedAt`, and six records with `id`, `sourcePath`, `sourceSha256`, `prompt`, `outputPath`, `outputSha256`, `width`, `height`, `status`, and `inspectionNotes`.

- [x] **Step 1: Verify source state and exact promoted paths.** Run:

  ```powershell
  git -C Z:\adventures-of-patch fetch origin
  git -C Z:\adventures-of-patch merge --ff-only origin/main
  git -C Z:\adventures-of-patch status --short --branch
  git -C Z:\adventures-of-patch rev-parse HEAD
  git -C Z:\adventures-of-patch ls-files build/characters/heist-crew/reference_sheets workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder
  ```

  Expected: clean `main`, exact head `13bf77adc63cf5c8f49363cedd5dd392822b8375` unless a later merged source-only change is explicitly inspected and pinned, all six `*_hero__v1.png` portraits, and `01_clean...png` through `07_receipt_joined.png` present.

- [x] **Step 2: Inspect every generation reference at original resolution.** Use `view_image` on `02_index_joined.png`, `03_silk_joined.png`, `05_writ_joined.png`, `06_klause_joined.png`, `04_rollback_joined.png` and `07_receipt_joined.png`. Preserve this functional order even though the source folder sequence places Rollback before Writ and Klause.

- [x] **Step 3: Generate one marker at a time with the source image attached.** Use the image-generation tool once per marker with the shared instruction below, replacing the final object sentence exactly:

  ```text
  Create a production-ready editorial asset derived from the attached Adventures of Patch continuity image. Isolate the named assent object as one convincing physical prop on a transparent or clean neutral background, with no character, folder, table, border, caption or surrounding scene. Preserve the source object's established materials, colours, proportions, wear, lighting and identifying details. Keep any source lettering exactly legible; do not invent, rewrite or approximate text. Use a square composition with comfortable but economical clearance around the object, coherent three-quarter product lighting and a natural contact shadow. This will appear as a small dossier inset beside the canonical character portrait, so favour a clear silhouette and believable physical scale over decorative flourish. Do not add trademarks, signatures, logos or new symbols.

  Object: [Index's folded blueprint and handwritten note | Silk's steel ring and red tension cord | Writ's triplicate assent form | Klause's decisive stamp or stamped mark | Rollback's dog tags | Receipt's printed audit roll].
  ```

- [x] **Step 4: Inspect and accept deliberately.** View each output at original resolution. Reject any candidate with mangled lettering, wrong object identity, inconsistent materials, false transparency, clipped edges, generic icon treatment or invented marks. Regenerate from the same approved source until all six pass. Do not use a weak candidate merely to complete the set.

- [x] **Step 5: Commit selected masters and provenance.** Place only the six accepted masters in `src/client/assets/patch/lawful-heist/`. Write `generation-receipt.json` with full prompts, SHA-256 values and concise inspection notes. Add the approved permission text and selected master paths to `docs/asset-custody.md`. Stage the complete custody slice, run `git diff --cached --check`, then commit:

  ```powershell
  git add src/client/assets/patch/lawful-heist docs/asset-custody.md
  git diff --cached --check
  git commit -m "assets: create Lawful Heist assent markers"
  ```

- [x] **Step 6: Mark Task 1 complete.** Set Task 1's checklist boxes to `[x]`, stage the plan file and include that state in the next task commit.

### Task 2: Extend the verified derivative pipeline

**Files:**
- Modify: `src/client/scripts/process-patch-assets.test.ts`
- Modify: `src/client/scripts/process-patch-assets.mjs`
- Modify: `tools/portfolio_quality.py`
- Modify: `tests/test_portfolio_quality.py`
- Modify: `src/client/public/media/patch/patch-derivatives.json`
- Create: `src/client/public/media/patch/patch-heist-folder-open-1200.avif`
- Create: `src/client/public/media/patch/patch-heist-folder-open-1200.webp`
- Retain and re-pin: `src/client/public/media/patch/patch-heist-1200.avif`
- Retain and re-pin: `src/client/public/media/patch/patch-heist-1200.webp`
- Create: twelve portrait derivatives named `patch-heist-{index|silk|writ|klause|rollback|receipt}-560.{avif|webp}`
- Create: twelve marker derivatives named `patch-heist-{index|silk|writ|klause|rollback|receipt}-marker-420.{avif|webp}`
- Modify: `src/client/src/data/case-studies/patch-evidence.json`
- Modify: `docs/asset-custody.md`
- Regenerate: `src/client/public/media/patch/INDEX.md`

**Interfaces:**
- Consumes: Task 1's six master PNG paths and checksums; clean Patch root and pinned source revision; existing `PATCH_DERIVATIVES`, `loadSourceInputs`, `buildDerivativeManifest`, `renderDerivative` and receipt contracts.
- Produces: verified derivative definitions for one opening folder, one retained completed folder, six portraits and six marker masters; evidence records consumed by `PatchShowcasePicture` in Task 3.

- [ ] **Step 1: Write failing processor tests.** Extend `fixtureManifest` and the reviewed-definition test to require:

  ```ts
  expect(PATCH_DERIVATIVES.heistFolderOpen.sourcePath).toContain('01_clean_folder')
  expect(PATCH_DERIVATIVES.heistIndex.sourcePath).toBe('build/characters/heist-crew/reference_sheets/index_hero__v1.png')
  expect(PATCH_DERIVATIVES.heistReceipt.sourcePath).toBe('build/characters/heist-crew/reference_sheets/receipt_hero__v1.png')
  expect(PATCH_DERIVATIVES.heistIndexMarker.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/assent-index.png')
  expect(PATCH_DERIVATIVES.heistReceiptMarker.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/assent-receipt.png')
  expect(Object.keys(PATCH_DERIVATIVES).filter((key) => key.endsWith('Marker'))).toHaveLength(6)
  ```

  Add a pure `assertPortfolioSourceIdentity` test that accepts a path inside `clientRoot` with the receipt SHA-256 and rejects an external path, absent receipt entry and checksum drift.

- [ ] **Step 2: Run the focused tests and observe the expected failure.** Run:

  ```powershell
  npm --prefix src/client test -- --run scripts/process-patch-assets.test.ts
  ```

  Expected: FAIL because the new definitions and local-source verifier do not exist.

- [ ] **Step 3: Add the exact derivative definitions.** Pin `PATCH_SOURCE_REVISION` to the verified Patch main commit. Add the opening folder at width `1200`, six canonical portraits at width `560`, and six local marker masters at width `420`, all in AVIF and WebP using the existing support encoding. Keep the existing `heist` completed-folder family and its output names for compatibility, but replace its anonymous `--heist-source` identity seam with the tracked `07_receipt_joined.png` path at the newly pinned revision.

- [ ] **Step 4: Verify local generated masters without confusing their custody.** Add `portfolioSourcePath` handling that resolves only beneath `clientRoot`, reads Task 1's generation receipt, checks the named master SHA-256 and intrinsic dimensions, and emits `sourceCustody: "portfolio-generated"` plus `generationReceiptPath` in derivative receipts. Upstream definitions must still use `verifyTrackedSource`. Remove the now-unnecessary `--heist-source` argument and update `parseArgs` tests and error text accordingly.

- [ ] **Step 5: Keep repository quality truth aligned.** Update the approved Patch revision in `tools/portfolio_quality.py` and its tests. Allow Heist marker evidence to use `sourceType: "generated-pose"`, `sourceStatus: "accepted"`, the pinned continuity `sourceRevision`, and custody text naming the portfolio generation receipt. Do not weaken validation for other Patch media.

- [ ] **Step 6: Make focused tests pass.** Run:

  ```powershell
  npm --prefix src/client test -- --run scripts/process-patch-assets.test.ts
  py -3 -m unittest discover -s tests -p "test_portfolio_quality.py" -v
  ```

  Expected: all focused processor and quality tests pass.

- [ ] **Step 7: Apply the canonical processor and inspect outputs.** Run:

  ```powershell
  $env:ADVENTURES_PATCH_SOURCE_ROOT = 'Z:\adventures-of-patch'
  node src/client/scripts/process-patch-assets.mjs --apply
  node src/client/scripts/process-patch-assets.mjs --check
  Remove-Item Env:ADVENTURES_PATCH_SOURCE_ROOT
  ```

  Inspect every new AVIF at native size with `view_image`. Confirm folder lettering remains legible, portraits preserve the accepted character identity, marker silhouettes survive at intended size, and no output is upscaled or clipped.

- [ ] **Step 8: Update evidence and custody from measured receipt values.** Add all 28 new or retained Heist derivatives to `patch-evidence.json` with measured width, height and bytes. Use `repository-evidence` for folders and portraits and `generated-pose` for markers. Rewrite the Lawful Heist custody section with exact source paths, Patch revision, Git object IDs, SHA-256 values, generation receipt, transformation, output checksums, sizes, alt intent and the explicit limited derivative permission.

- [ ] **Step 9: Regenerate, stage and commit the pipeline slice.** Run `py -3 tools/run.py ci --apply`, stage all processor, evidence, custody, generated media and index outputs, then run the focused tests and `git diff --cached --check` again. Commit:

  ```powershell
  git commit -m "feat: process Lawful Heist crew evidence"
  ```

- [ ] **Step 10: Mark Task 2 complete.** Set Task 2's checklist boxes to `[x]`, stage the plan file and include that state in the next task commit.

### Task 3: Register the route and build the sequential crew story

**Files:**
- Modify: `src/client/src/data/content/content-manifest.json`
- Modify: `src/client/src/features/case-study/projectPresentations.ts`
- Modify: `src/client/src/features/case-study/projectPresentations.test.tsx`
- Modify: `src/client/src/pages/PatchIndexPage.tsx`
- Modify: `src/client/src/pages/PatchRoutes.test.tsx`
- Create: `src/client/src/features/patch-showcase/LawfulHeistPage.tsx`
- Create: `src/client/src/features/patch-showcase/LawfulHeistPage.test.tsx`
- Create: `src/client/src/features/patch-showcase/LawfulHeistPage.scss`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: `src/client/scripts/generate-route-documents.test.ts`
- Regenerate: `public/sitemap.xml`
- Regenerate: affected `INDEX.md` files

**Interfaces:**
- Consumes: Task 2 evidence paths through `PatchShowcasePicture`; the approved crew/copy contract; existing `patch` manifest, specialist presentation and index seams.
- Produces: manifest presentation `patch-lawful-heist`, lazy-loaded `LawfulHeistPage`, linked Patch index entry, semantic six-profile story and generated static route metadata.

- [ ] **Step 1: Write failing route and presentation tests.** Require a `Lawful Heist` manifest item with the expected public title, advanced visual pre-production status and presentation. Require the Patch index entry to link to `/portfolio/patch/lawful-heist`; require the route to render the title, opening standfirst, six profiles in the approved order, development status, completed folder and engineering case-study link. Register `patch-lawful-heist` in the specialist presentation test.

- [ ] **Step 2: Write the focused page test before the component.** Require exactly six `article` elements with these headings and responsibilities:

  ```ts
  expect(profiles.map((profile) => within(profile).getByRole('heading', { level: 2 }).textContent)).toEqual([
    'Index', 'Silk', 'Writ', 'Klause', 'Rollback', 'Receipt',
  ])
  expect(profiles[0]).toHaveTextContent('provenance')
  expect(profiles[1]).toHaveTextContent('pressure-tests')
  expect(profiles[2]).toHaveTextContent('authority')
  expect(profiles[3]).toHaveTextContent('decision')
  expect(profiles[4]).toHaveTextContent('Plan B')
  expect(profiles[5]).toHaveTextContent("It's logged")
  ```

  Also require fourteen meaningful images across opening folder, six portraits, six markers and completed folder, while permitting decorative markers to use empty alt only when adjacent HTML repeats their whole meaning.

- [ ] **Step 3: Run focused tests and observe failure.** Run:

  ```powershell
  npm --prefix src/client test -- --run src/features/patch-showcase/LawfulHeistPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/case-study/projectPresentations.test.tsx scripts/generate-route-documents.test.ts
  ```

  Expected: FAIL because the route, presentation and component do not exist.

- [ ] **Step 4: Implement the manifest and presentation seam.** Register:

  ```json
  {
    "slug": "lawful-heist",
    "kind": "patch",
    "title": "The Lawful Heist Crew",
    "status": "advanced visual pre-production",
    "summary": "Six specialists turn a lawful vault override into a plan whose execution should be almost offensively boring.",
    "presentation": "patch-lawful-heist",
    "tags": ["patch", "agentic-engineering", "authority", "audit", "recovery"],
    "relatedSlugs": ["tournament-of-reasonable-defaults", "identity-emporium", "adventures-of-patch"]
  }
  ```

  Add the lazy presentation import and make `PatchIndexPage` resolve the existing world titled `Lawful Heist` to this item without changing the evidence title stored in `patch-evidence.json`.

- [ ] **Step 5: Build `LawfulHeistPage` in semantic order.** Use a local immutable crew data structure for the six names, responsibilities, portraits, marker paths, quotes and connective copy. Render the opening folder before the profiles and the completed folder afterward. Keep the working lines from the spec only where they sound natural in the continuous page; edit surrounding prose for cadence rather than forcing every supplied line into equal-length panels.

- [ ] **Step 6: Compose a comic-book dossier sequence, not a profile grid.** In `LawfulHeistPage.scss`, use the existing spacing tokens, warm paper and typography as the portfolio frame. Reflect the planned adventure's comic-book energy with asymmetric panel spans, decisive colour fields, full-bleed imagery where the source background supports it, and short white editorial insets placed at an image edge. An occasional oval text block may suggest speech through shape and placement, without a tail or literal speech-bubble styling. Give each profile one underlying grid with portrait, prose and small marker inset, then vary the geometry only when it improves character, handoff or reading order. Give Rollback a larger image span and enough vertical room for his canonical upper-limit agent scale to dominate without clipping or breaking proportionality; keep his dog-tag marker quiet. At narrow widths collapse to the DOM order with no CSS `order`. Keep prose near `48rem`, align wider evidence to the existing page canvas and avoid arbitrary unused columns. No new global CSS is needed.

- [ ] **Step 7: Complete accessibility and static-route coverage.** Add the Heist route to the desktop/mobile axe matrix. Extend route-document tests with a Patch manifest fixture and assert `/patch/lawful-heist`, title, summary and canonical URL. Use semantic headings, visible links and reviewed alt text. Add `decoding="async"` to `PatchShowcasePicture` for below-fold evidence; expose an `eager` option only for the opening folder if measured first-paint review justifies it.

- [ ] **Step 8: Run focused tests and edit the whole page aloud.** Run the Task 3 focused Vitest command. Then scan all public copy with:

  ```powershell
  rg -n "—|I keep returning to|the thing I keep returning to|That's not|It isn't just|I don't need to|at its core|what matters is|the real story|this is where|the bottom line|it is worth noting" src/client/src/features/patch-showcase/LawfulHeistPage.tsx
  ```

  Read the rendered source copy as one coherent piece. Fix mechanical panel symmetry, repeated sentence skeletons, orphan transitions and qualifications that do not add meaning.

- [ ] **Step 9: Regenerate and commit the route slice.** Run `py -3 tools/run.py ci --apply`, stage all source, test, sitemap and mesh outputs, rerun focused tests and `git diff --cached --check`, then commit:

  ```powershell
  git commit -m "feat: publish the Lawful Heist Crew story"
  ```

- [ ] **Step 10: Mark Task 3 complete.** Set Task 3's checklist boxes to `[x]`, stage the plan file and include that state in the review commit.

### Task 4: Rendered-page taste, accessibility and performance review

**Files:**
- Modify as evidence requires: `src/client/src/features/patch-showcase/LawfulHeistPage.tsx`
- Modify as evidence requires: `src/client/src/features/patch-showcase/LawfulHeistPage.scss`
- Modify as evidence requires: `src/client/src/features/patch-showcase/PatchShowcaseEvidence.tsx`
- Modify if signature baseline is justified: `src/client/e2e/visual-regression.spec.ts`
- Create if justified: Windows baseline under `src/client/e2e/visual-regression.spec.ts-snapshots/`
- Modify: `docs/design-decisions.md`
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: this plan

**Interfaces:**
- Consumes: complete Task 3 route and accepted media.
- Produces: Sol-reviewed desktop/mobile composition, manual accessibility evidence, measured loading behaviour and a dated design-decision record.

- [ ] **Step 1: Start a production preview and inspect at the required widths.** Run `npm --prefix src/client run build` and `npm --prefix src/client run preview:test`. Use Playwright at 1440, 768, 390 and 320 CSS pixels. Inspect the full page, not only the hero. Confirm the reading order, portrait scale, marker hierarchy, folder payoff, deliberate whitespace and relationship to Identity and Tournament.

- [ ] **Step 2: Review the £10k composition.** Reject any section that resembles an interchangeable card, leaves unexplained empty columns, lets a marker compete with its character, shrinks baked detail below legibility or repeats the same visual cadence six times. Check that comic-book energy comes from useful geometry, colour and editorial placement, not novelty decoration, literal speech bubbles or broken portfolio grammar. Adjust only the Heist stylesheet and shared evidence loading behaviour required by this page.

- [ ] **Step 3: Review accessibility manually.** Use keyboard-only navigation, 200% browser zoom and reduced-motion emulation. Confirm no horizontal overflow at 320, headings remain ordered, links have visible focus, images do not contain unique text meaning and the page remains understandable with images disabled. Run the focused axe route at desktop and mobile.

- [ ] **Step 4: Review loading and image stability.** Throttle the page, confirm intrinsic dimensions reserve every image frame, only the principal opening evidence may load eagerly, and all six portraits and markers remain lazy below fold. Record total derivative bytes and reject any source-sized or redundant payload.

- [ ] **Step 5: Decide the visual baseline on evidence.** Add one Windows baseline only if the finished route is a signature composition whose regression would evade the existing component and axe tests. If added, author it once on Windows and run the unchanged visual test twice without `--update-snapshots`. Otherwise record in the plan that manual viewport evidence is the proportionate guard.

- [ ] **Step 6: Record the design decision and review outcome.** Append a dated `Lawful Heist recruitment dossier` entry to `docs/design-decisions.md` naming the audience problem, decision, consequence and reconsideration trigger. Update the Phase 5 roadmap note with the plan link and local review state, leaving Phase 5 `executing` until hosted exact-head proof and Harley's acceptance.

- [ ] **Step 7: Commit review repairs and evidence.** Stage all review-driven source, baseline, ledger, roadmap and plan changes. Run affected tests and `git diff --cached --check`, then commit:

  ```powershell
  git commit -m "style: finish the Lawful Heist dossier"
  ```

- [ ] **Step 8: Mark Task 4 complete.** Set Task 4's checklist boxes to `[x]`, stage the plan file and include that state in Task 5's closeout commit.

### Task 5: Canonical verification, review and publication

**Files:**
- Modify: this plan
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify if generated: affected `INDEX.md`, route and sitemap outputs
- Create externally: draft GitHub pull request using `.github/pull_request_template.md`

**Interfaces:**
- Consumes: clean staged implementation from Tasks 1 through 4.
- Produces: exact local proof, self-review findings and repairs, an open PR with exact head SHA, passing hosted checks and a browser review URL for Harley.

- [ ] **Step 1: Perform the completion-readiness review.** Read the full diff against the approved spec and `.agents/runbooks/code-review.md`. Check factual status, source custody, permission, generated text, prose flow, public route, responsive composition, alt intent, payload and unrelated changes. Repair every in-scope issue before continuing.

- [ ] **Step 2: Regenerate and stage the final tree.** Run `py -3 tools/run.py ci --apply`, inspect every generated change, stage the complete intended tree and verify `git diff --cached --check` is clean. Include canonical generated files unless direct evidence proves they are disposable.

- [ ] **Step 3: Run canonical validation on the staged tree.** Run:

  ```powershell
  $env:ADVENTURES_PATCH_SOURCE_ROOT = 'Z:\adventures-of-patch'
  py -3 tools/run.py ci --check
  Remove-Item Env:ADVENTURES_PATCH_SOURCE_ROOT
  ```

  Expected: repository standards, generated mesh, link hygiene, portfolio quality, Python, Vitest, build, axe and Playwright journeys all pass. Record exact observed counts and any intentionally skipped platform-specific suite. Do not call the branch green from partial output.

- [ ] **Step 4: Commit final proof state.** Mark completed plan boxes accurately, record commands, counts, Patch revision, accepted generation outputs, viewport evidence, visual-baseline decision and remaining human gate. Commit:

  ```powershell
  git commit -m "docs: record Lawful Heist verification"
  ```

- [ ] **Step 5: Push and open a draft PR.** Push `codex/portfolio-10k-phase-5-lawful-heist` and open a draft PR into `main` using the repository template. Include purpose, design rationale, custody, accessibility, performance, exact commands, before/after 1440 and 390 evidence, and the full head SHA. Do not include private local source paths in the public PR body.

- [ ] **Step 6: Flip ready and prove hosted checks.** After self-review and local canonical green, mark the PR ready. Monitor `Portfolio / Portfolio quality gate` and the Windows visual job when applicable. Repair failures on the same branch and re-run local evidence before pushing.

- [ ] **Step 7: Give Harley the review surface.** Start or retain the production preview at a stable local URL, provide the direct `/portfolio/patch/lawful-heist/` link and the PR URL, and stop at Harley's visual and merge decision. Keep Phase 5 `executing` until the PR merges and post-deploy public-route proof passes.

- [ ] **Step 8: Close Phase 5 only after merge proof.** After Harley reports merge, verify GitHub's merge commit, fast-forward shared `main`, verify the deployed exact route and post-deploy check, archive this plan to `.agents/plans/completed/`, repair roadmap and generated index links, commit/publish any required closeout PR, then remove the worktree through the repository helper. Do not start Phase 6 before this proof.

## Plan self-review record

- **Spec coverage:** Source promotion, generation, custody, derivative processing, route registration, copy, composition, accessibility, performance, review and publication all map to explicit tasks.
- **Dependency order:** Task 1 produces accepted masters; Task 2 produces evidence; Task 3 consumes evidence; Task 4 reviews the rendered result; Task 5 proves and publishes it.
- **Scope:** One route and its necessary source/evidence seams. No independent subsystem or roadmap expansion is included.
- **Execution lane:** `executing-plans` keeps the sequential visual and editorial judgement with Sol.
- **Known external state:** Adventures of Patch PR #88 is merged on `main` at `13bf77adc63cf5c8f49363cedd5dd392822b8375`. The six portraits are canonical character assets; folder boards remain adventure-specific continuity sources.
- **Plan-readiness rating:** 9.2/10. Exact source paths, outputs, tests, review widths, custody and publication gates are locked. The only deliberate judgement left to execution is visual acceptance of generated candidates and the final rendered edit, both owned by Sol in named gates.
