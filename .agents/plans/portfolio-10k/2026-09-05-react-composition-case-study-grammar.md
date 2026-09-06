# React Composition Grammar Slice D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Use `/test-driven-development` for each code task, `/artifact-contracts` for layout and visual-contract moves, and `/browser-tools` for rendered verification. Keep this PR draft until Harley has visually accepted the completed slice.

**Goal:** Complete Slice D by turning the existing case-study class recipes into React-owned shared grammar, then migrate Marketplace, Learning Lab, Wild Bunch and Patch Pipeline in that order without flattening their project-specific evidence or changing their accepted design.

**Architecture:** Shared case-study semantics become a small typed grammar (`CaseStudyBody`, `CaseStudySection`, `CaseStudyCallout`, `CaseStudyMediaCaption`, `CaseStudyDecision`, `CaseStudyEvidence`) whose intrinsic contracts are owned by styled-components. Project detail headers become a synchronous case-study composition with typed layout variants so their first-paint geometry no longer depends on `ContentPage.scss` or on a lazy visual stylesheet. Each project family keeps its own higher-order choreography and specialist evidence components; those components own their visual contracts locally. CSS custom properties remain token authority, parent routes own story data and variant choice, and lazy presentation boundaries remain explicit in `projectPresentations.ts`.

**Tech Stack:** React 19, TypeScript 6, React Router 7, TanStack Query 5, styled-components 6, Sass foundations, Vitest/Testing Library, Playwright, Vite 8.

**Execution Strategy:** Sequential. Establish the shared grammar and project-header boundary first, then migrate the four families in the specification order: Marketplace, Learning Lab, Wild Bunch, Patch Pipeline. Do not implement multiple project families concurrently against a changing shared primitive API. End each task with its focused tests green before moving on.

## Handoff gate

**Readiness: 9.5 / 10.**

- Exact implementation roots and current branch baseline are verified.
- The shared API direction, ownership boundaries, family order and retirement targets are explicit.
- Focused and final validation commands are explicit.
- Lazy-loading, cold-load layout stability, visual regression, accessibility, budgets and mesh obligations have explicit proofs.
- Non-goals and the narrow Patch-showcase compatibility exception are explicit.
- Remaining implementation discretion is intentionally local: a project-only styled composition may stay specific when two pieces merely look similar but do not share the same semantic contract.

## Preconditions and branch baseline

- Work in the existing draft PR #54 branch: `codex/slice-d-canonical-url`.
- The accepted pre-Slice-D implementation baseline is commit `dbe6f5fa91560961475b1de38b1b1b487c653223` (`fix: make site route transitions deterministic`). The plan commit comes after that baseline and must not be treated as implementation movement.
- Before editing source, run `git status --short` and `git rev-parse HEAD`. Stop if the worktree is dirty from another worker or if the branch has moved unexpectedly; reconcile the live branch before continuing.
- Treat `.agents/specs/2026-09-03-react-composition-grammar-design.md` as the settled architecture. Slice D is: shared case-study grammar first, then Marketplace, Learning Lab, Wild Bunch, Patch Pipeline.
- Treat `.agents/doctrine/portfolio-design-policy.md` and `docs/design-decisions.md` as current visual/design authority.
- Preserve the PR #54 route/canonical/contact/masthead/PDF-port fixes. They are baseline, not Slice D work.

## Non-negotiable constraints

- No redesign. Preserve copy, evidence order, accepted hierarchy, responsive behaviour, typography, imagery, status treatment and visual signatures unless Harley explicitly accepts a visual change.
- Keep Source Sans 3 for site voice, Source Serif 4 for authored long-form, and Source Code Pro for technical/compact utility text. Do not reintroduce Fraunces or Fira.
- Share low-level semantic primitives when their role is stable. Keep higher-order project compositions specific until the common contract is real.
- Do not create a universal evidence panel, config-driven case-study renderer, universal project card, or route-name-specific primitive merely to reduce stylesheet count.
- Parent components own story-specific arrays/data and typed variant choice. Children own rendering. Do not manufacture state, Context, reducers, custom hooks or memoization for this refactor.
- Migrated parents must not style through child implementation classes or DOM shape. If a parent needs a meaningful child variation, expose a typed prop/variant on the child or create a family-owned composition.
- Use transient `$` props only as private styled-components implementation controls. Public component APIs use ordinary semantic prop names.
- Preserve `projectPresentations.ts` dynamic imports. No shared/eager barrel may re-export the four specialist presentation implementations or their side-effect styles.
- Keep project-header geometry synchronous while `ProjectVisual` remains lazy. A cold direct route must first paint in its final header composition, including the correct visual fallback measure.
- Do not migrate writing presentation CSS in this slice. Writing figures that still qualify `ContentHeader` are Slice E work.
- Do not migrate the Patch showcase in this slice. The only permitted Slice F touch is replacing the shared `.case-study-media-caption` compatibility class with the new shared caption primitive if that is required to delete `CaseStudyBody.scss`; do not alter showcase composition or art direction.
- Do not migrate homepage/index `ProjectVisual` composition wholesale. Only change `ProjectVisual`/`ProjectVisual.scss` where required to remove project-detail parent reach-through or to pass a typed placement into a child that must own its own case-study-hero treatment.
- Preserve hard budgets: entry JavaScript `358400` bytes, entry CSS `40960` bytes, generated CV PDF `524288` bytes and exactly two CV pages.
- Do not update Windows visual baselines for implementation-only drift. If a screenshot changes, diagnose the ownership migration until the existing baseline passes or stop for Harley if the old and new implementation genuinely cannot be visually equivalent.

## Current debt this slice must remove

- `CaseStudyBody.tsx` is a wrapper whose visual grammar lives in `CaseStudyBody.scss` through `.case-study-lead`, `.case-study-callout` and `.case-study-media-caption` selector recipes.
- `CaseStudySection.tsx` exposes its lead layout through generated class names and descendants rather than owning it as React/styled composition.
- `CaseStudyDecision.tsx` and `CaseStudyEvidence.tsx` expose semantic markup but not a complete owned visual contract.
- `ContentPage.scss` exists only to make project detail header geometry synchronous and reaches into `ContentHeader` internals such as `.content-page-intro`, `.content-page-visual`, `.content-page-status-anchor`, `.content-summary` and `h1`.
- `ProjectVisual.scss` still contains a Patch case-study selector that reaches upward through `.content-page-header[data-visual-contract="patch-case-study-hero"]`.
- Marketplace, Learning Lab, Wild Bunch and Patch Pipeline each retain a family-wide Sass file that owns component internals through class selectors.
- Several project tests assert implementation classes such as `.case-study-lead__heading`, `.case-study-callout` and `.content-status`; those should move to semantic roles or explicit stable data contracts as ownership moves.

## File and ownership map

### Shared case-study grammar

- `src/client/src/features/case-study/CaseStudyBody.tsx` — case-study body boundary; no imported Sass recipe.
- `src/client/src/features/case-study/CaseStudySection.tsx` — typed `flow | lead | lead-prose` section composition and its heading/body layout.
- `src/client/src/features/case-study/CaseStudyCallout.tsx` — shared inset/callout treatment currently represented by `.case-study-callout`.
- `src/client/src/features/case-study/CaseStudyMediaCaption.tsx` — shared figure-caption treatment currently represented by `.case-study-media-caption`.
- `src/client/src/features/case-study/CaseStudyDecision.tsx` — decision/reason/consequence semantic and intrinsic presentation.
- `src/client/src/features/case-study/CaseStudyEvidence.tsx` — provenance line and intrinsic evidence presentation.
- `src/client/src/features/case-study/CaseStudyPrimitives.test.tsx` — semantic/ownership tests for the grammar.
- `src/client/src/features/case-study/CaseStudyBody.scss` — delete after the last consumer moves.

### Project detail header

- `src/client/src/features/case-study/ProjectCaseStudyHeader.tsx` — new synchronous project-detail header composition, typed by semantic layout variant and built from shared `Eyebrow`, `PageTitle`, `PageLead` and `ProjectStatus` primitives.
- `src/client/src/features/case-study/ProjectCaseStudyHeader.test.tsx` — header semantics, variants and fallback ownership.
- `src/client/src/pages/ContentPage.tsx` — parent data/layout selection and lazy `ProjectVisual` instance.
- `src/client/src/pages/ProjectPage.tsx` — remove route-Sass import after header ownership moves.
- `src/client/src/pages/ContentPage.scss` — delete when no project header geometry remains there.
- `src/client/src/features/home/ProjectVisual.tsx` / `ProjectVisual.scss` — retain intrinsic visual ownership; remove only project-detail parent reach-through and pass explicit placement to Learning Lab/Patch internals where required.
- `src/client/src/components/content/ContentHeader.tsx` — keep as the generic/writing header; do not add Wild Bunch/Learning Lab/Patch-specific branches to this shared component.

### Marketplace

- `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.tsx`
- `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.test.tsx`
- `src/client/src/features/case-study/marketplace/MarketplaceDistributionMap.tsx`
- `src/client/src/features/case-study/marketplace/MarketplaceDistributionMap.test.tsx`
- `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.scss` — delete.

### Learning Lab

- `src/client/src/features/case-study/learning-lab/LearningLabCaseStudy.tsx`
- `LearningLabCaseStudy.test.tsx`
- `CurriculumAtlas.tsx` / `CurriculumAtlas.test.tsx`
- `LabAnatomy.tsx` / `LabAnatomy.test.tsx`
- `LabPromotionFlow.tsx` / `LabPromotionFlow.test.tsx`
- `LearningLabImage.tsx`
- `LearningLoop.tsx` / `LearningLoop.test.tsx`
- `RepresentativeLabs.tsx` / `RepresentativeLabs.test.tsx`
- `learningLabEvidence.ts` / `learningLabEvidence.test.ts` only if a typed presentation-data boundary needs adjustment; do not rewrite evidence data for styling convenience.
- `LearningLabCaseStudy.scss` — delete.

### Wild Bunch

- `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- `WildBunchCaseStudy.test.tsx`
- `WildBunchCodecMap.tsx`
- `WildBunchDeterminismFigure.tsx` / `WildBunchDeterminismFigure.test.tsx`
- `WildBunchEventFlow.tsx` / `WildBunchEventFlow.test.tsx`
- `WildBunchProductEvidence.tsx` / `WildBunchProductEvidence.test.tsx`
- `WildBunchCaseStudy.scss` — delete.

### Patch Pipeline

- `src/client/src/features/case-study/patch/PatchPipelineCaseStudy.tsx`
- `PatchPipelineCaseStudy.test.tsx`
- `PatchProductionFlow.tsx` / `PatchProductionFlow.test.tsx`
- `patchEvidence.ts` / `patchEvidence.test.ts` only if presentation ownership requires a data-shape change; preserve evidence custody.
- `PatchPipelineCaseStudy.scss` — delete.

### Cross-cutting validation

- `src/client/src/pages/ContentPage.test.tsx`
- `src/client/src/features/case-study/projectPresentations.ts`
- `src/client/src/features/case-study/projectPresentations.test.tsx`
- `src/client/e2e/project-story.spec.ts`
- `src/client/e2e/fonts.spec.ts` where current project-header class assertions need semantic replacement.
- `src/client/e2e/visual-regression.spec.ts` only to target stable semantic/data contracts if existing selectors disappear; do not change expected images without Harley approval.
- Patch-showcase caption consumers (`src/client/src/features/patch-showcase/TournamentPage.tsx`, `PatchShowcaseEvidence.tsx`, and any other search result for `case-study-media-caption`) only for a mechanical switch to `CaseStudyMediaCaption`.

---

### Task 1: Replace the shared class recipe with real case-study primitives

**Files:** shared case-study grammar files above, plus direct consumers needed to remove `.case-study-callout` / `.case-study-media-caption`.

**Target API:**

```ts
export type CaseStudySectionLayout = 'flow' | 'lead' | 'lead-prose'

type CaseStudySectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'title'> & {
  title: string
  headingId?: string
  layout?: CaseStudySectionLayout
  children: ReactNode
}
```

`CaseStudySection` owns the two-column lead layout, `lead-prose` column ratio, heading/body min-width rules, heading typography, first/last child margins and the <=44rem stack. It may keep a generated heading id as a fallback, but callers with durable public/tested IDs should pass `headingId` explicitly. Do not expose heading/body class names as the styling API.

`CaseStudyCallout` owns the current 28ch measure, accent rule, display typography and balanced wrapping. If a family needs a different accent, expose one semantic tone/accent value or let a family styled wrapper set the existing CSS variable; do not require a global class.

`CaseStudyMediaCaption` owns the current caption spacing, muted colour, site-sans type, caption size and line height.

- [ ] **Step 1: Add failing primitive ownership tests.** Extend `CaseStudyPrimitives.test.tsx` to cover `flow`, `lead`, `lead-prose`, explicit/fallback heading IDs, `CaseStudyCallout`, `CaseStudyMediaCaption`, decision/evidence semantics, and the absence of the retired `.case-study-lead*`, `.case-study-callout`, `.case-study-media-caption` and `.case-study-evidence` implementation classes from the new primitive output.
- [ ] **Step 2: Run the focused red test.** From `src/client`: `npm test -- --run src/features/case-study/CaseStudyPrimitives.test.tsx`. Expected: new primitive/ownership assertions fail before implementation.
- [ ] **Step 3: Implement the shared grammar with styled-components.** Keep intrinsic shared behaviour in the primitive owner. Reuse existing theme/token values; this is a visual-preserving refactor, not a token redesign.
- [ ] **Step 4: Replace direct generic class consumers.** Change Marketplace, Learning Lab and Patch callouts to `<CaseStudyCallout>`. Change Wild Bunch and Patch Pipeline captions to `<CaseStudyMediaCaption>`. Mechanically migrate Patch-showcase caption consumers to the same primitive if they are the only remaining reason to retain the class; do not touch their surrounding showcase layout.
- [ ] **Step 5: Delete `CaseStudyBody.scss`.** Before deletion, run `rg "case-study-(lead|callout|media-caption)" src/client/src src/client/e2e` and classify every hit. Remaining hits may be story/test language only; no migrated component may depend on the old class recipe.
- [ ] **Step 6: Re-run the primitive suite.** `npm test -- --run src/features/case-study/CaseStudyPrimitives.test.tsx`. Expected: green.

### Task 2: Give project-detail headers their own synchronous React composition

**Files:** `ProjectCaseStudyHeader.tsx` + test, `ContentPage.tsx`, `ContentPage.test.tsx`, `ProjectPage.tsx`, `ContentPage.scss`, and the narrow `ProjectVisual` files described above.

**Interface direction:**

```ts
export type ProjectCaseStudyHeaderLayout =
  | 'standard'
  | 'learning-lab'
  | 'wild-bunch'
  | 'patch'

type ProjectCaseStudyHeaderProps = {
  eyebrow: string
  title: string
  summary: string
  status: string
  layout: ProjectCaseStudyHeaderLayout
  visualContract: string
  visual?: ReactNode
}
```

The component owns its intro, status placement, visual slot and Suspense fallback geometry. `standard` covers Marketplace/current generic visual layout. The other three variants reproduce the current synchronous geometry in `ContentPage.scss`. `visualContract` remains an observability/test marker, not a CSS selector switch.

- [ ] **Step 1: Add failing header tests.** In `ProjectCaseStudyHeader.test.tsx`, assert semantic h1/summary/status output, stable `data-visual-contract`, typed variant markers, and fallback presence without relying on `.content-page-intro`/`.content-page-visual` classes. In `ContentPage.test.tsx`, assert project documents use the project header while writing/Patch-story routes still use their existing shells.
- [ ] **Step 2: Implement `ProjectCaseStudyHeader`.** Build it from `Eyebrow`, `PageTitle`, `PageLead` and `ProjectStatus`; keep all variant layout rules inside the component. Wild Bunch status placement belongs to this component, not to a parent-supplied `statusAnchor` recipe.
- [ ] **Step 3: Move fallback geometry into the header owner.** Preserve the existing 5:3 generic/Marketplace fallback, Wild Bunch field, Learning Lab minimum visual height and Patch mobile 16:9 fallback. The fallback must reserve final geometry before the lazy `ProjectVisual` resolves.
- [ ] **Step 4: Recompose `ContentPage`.** Parent logic maps project presentation to the semantic layout variant and passes values. Do not put route-specific layout branches into `ContentHeader`. Keep non-project content behaviour unchanged.
- [ ] **Step 5: Remove the route stylesheet.** Delete the `ContentPage.scss` import from `ProjectPage.tsx`, then delete `ContentPage.scss` once its project rules are fully owned.
- [ ] **Step 6: Remove the remaining child-to-parent selector.** In `ProjectVisual.scss`, replace the Patch selector qualified by `.content-page-header[data-visual-contract="patch-case-study-hero"]` with an intrinsic placement variant driven by `ProjectVisual`'s existing `placement="case-study-hero"` API. Do not style the header from `ProjectVisual`.
- [ ] **Step 7: Prove cold-load behaviour.** Update `e2e/project-story.spec.ts` so the delayed `ProjectVisual` tests inspect stable semantic/data parts owned by `ProjectCaseStudyHeader`, not old classes. Cover Wild Bunch and Marketplace as the bespoke and generic cases; add Learning Lab/Patch assertions if their fallback geometry is not already exercised elsewhere.
- [ ] **Step 8: Run focused tests.** `npm test -- --run src/features/case-study/ProjectCaseStudyHeader.test.tsx src/pages/ContentPage.test.tsx` then `npm run test:e2e -- e2e/project-story.spec.ts`. Expected: all green and no project first-paint jump.

### Task 3: Migrate Marketplace without flattening its operating-model evidence

**Files:** Marketplace files listed above.

- [ ] **Step 1: Rewrite tests away from shared implementation classes.** Preserve heading order, links, evidence custody and decision semantics, but replace assertions such as `closest('.case-study-lead')` with semantic section/data contracts owned by the new components.
- [ ] **Step 2: Move family composition into `MarketplaceCaseStudy.tsx`.** The page owns its story copy and repeated model/decision data. Use shared `Eyebrow`, `CaseStudySection`, `CaseStudyCallout`, `CaseStudyDecision` and `CaseStudyEvidence` where their real contract matches. Keep the three-layer model and decision grid Marketplace-specific.
- [ ] **Step 3: Move the map contract into `MarketplaceDistributionMap.tsx`.** Its figure, caption, source/plugin/consumer grid and responsive collapse belong to that component. Do not create a generic distribution/evidence diagram primitive.
- [ ] **Step 4: Remove Marketplace's header override.** The old mobile `.content-page-header--visual` rule is obsolete after Task 2 and must not be recreated locally.
- [ ] **Step 5: Delete `MarketplaceCaseStudy.scss`.** Run `rg "marketplace-(case-study|map|decisions)|case-study-trace" src/client/src/features/case-study/marketplace src/client/e2e` and confirm any remaining selectors are intentional stable test/data contracts rather than styling dependencies.
- [ ] **Step 6: Run focused Marketplace tests.** `npm test -- --run src/features/case-study/marketplace/MarketplaceCaseStudy.test.tsx src/features/case-study/marketplace/MarketplaceDistributionMap.test.tsx` and the Marketplace-related cases in `npm run test:e2e -- e2e/project-story.spec.ts`.

### Task 4: Migrate Learning Lab and make its evidence components own their visuals

**Files:** all Learning Lab files listed in the ownership map plus the narrow `ProjectVisual` wiring needed for hero placement.

- [ ] **Step 1: Preserve the route-level story and evidence data.** `LearningLabCaseStudy.tsx` continues to own section order and authored copy; `learningLabEvidence.ts` remains evidence/data authority.
- [ ] **Step 2: Give each evidence component its own intrinsic contract.** Move Curriculum Atlas styles to `CurriculumAtlas.tsx`, anatomy styles to `LabAnatomy.tsx`, promotion-flow styles to `LabPromotionFlow.tsx`, representative-lab styles to `RepresentativeLabs.tsx`, and image/load treatment to `LearningLabImage.tsx`. Keep family colours/tokens local to the Learning Lab family rather than global selectors.
- [ ] **Step 3: Fix `LearningLoop` ownership.** `LearningLoop.tsx` currently relies on selectors in `ProjectVisual.scss`. Give it typed density/placement props if the hero/index/preview presentations genuinely differ, and make `ProjectVisual` pass that value. `ProjectVisual.scss` may position the Learning Lab visual as a whole, but must not style `LearningLoop`'s private stage DOM or `LearningLabImage` internals.
- [ ] **Step 4: Recompose Learning Lab's route-only sections.** Origin, safety, system and dated-state blocks remain Learning-Lab-specific React compositions. Use shared case-study primitives only where their semantics match; do not force them through a generic evidence panel.
- [ ] **Step 5: Delete `LearningLabCaseStudy.scss`.** Search the family for each retired `learning-lab-*` style hook and ensure styling now lives with its owner. Stable `data-visual-contract` values may remain for browser/visual tests.
- [ ] **Step 6: Run focused Learning Lab tests.** `npm test -- --run src/features/case-study/learning-lab/*.test.tsx src/features/case-study/learning-lab/*.test.ts`. Then run the Learning Lab cases in `npm run test:e2e -- e2e/project-story.spec.ts` including narrow widths/reduced motion and missing-media/fallback behaviour already covered by the family tests.

### Task 5: Migrate Wild Bunch while preserving its evidence-ledger choreography

**Files:** all Wild Bunch files listed in the ownership map.

- [ ] **Step 1: Preserve story order and source custody.** `WildBunchCaseStudy.tsx` remains the authored parent. Keep the origin, development-build evidence, determinism, event-history, knowledge-boundary, trade-off and source-note movements in the accepted order with the existing pinned URLs.
- [ ] **Step 2: Move route choreography into owned styled compositions.** Story-movement layout, dossier treatment and family-specific spacing belong in Wild-Bunch-local components/styled wrappers, not a route-wide selector sheet and not shared case-study primitives.
- [ ] **Step 3: Move specialist visual contracts to their evidence owners.** `WildBunchDeterminismFigure`, `WildBunchEventFlow`, `WildBunchProductEvidence` and `WildBunchCodecMap` own their internal grids, type, borders, responsive behaviour and media/caption treatment. Preserve UUID wrapping, trail-map/product evidence and reduced-motion behaviour exactly.
- [ ] **Step 4: Use shared grammar only for shared roles.** Keep `CaseStudySection`, `CaseStudyEvidence` and `CaseStudyMediaCaption` for genuine shared semantics. Do not create a generic architecture-diagram primitive from the determinism/event-flow components.
- [ ] **Step 5: Delete `WildBunchCaseStudy.scss`.** Search for retired `wild-bunch-*` styling classes and convert browser tests to semantic roles or stable `data-*` contracts where they currently couple to implementation classes.
- [ ] **Step 6: Run focused Wild Bunch tests.** `npm test -- --run src/features/case-study/wild-bunch/*.test.tsx`, then `npm run test:e2e -- e2e/project-story.spec.ts`. Preserve the 1128/686/510 one-line UUID behaviour, 390/320 split behaviour, no horizontal overflow, keyboard access, reduced motion and pinned evidence assertions.

### Task 6: Migrate Patch Pipeline without consuming Slice F

**Files:** Patch Pipeline files listed above; no Patch-showcase layout files except the caption-only compatibility switch already allowed in Task 1.

- [ ] **Step 1: Preserve Patch evidence custody and story order.** Keep `patchEvidence.ts` as the source for media/revision facts and keep the 01–07 narrative sequence, project snapshot, framing questions, production flow and showcase bridge intact.
- [ ] **Step 2: Replace shared class recipes.** Use `CaseStudyCallout`, `CaseStudyMediaCaption` and `CaseStudyEvidence`. Where multiple Patch movements genuinely share one internal heading-number/body composition, extract a Patch-only typed component. Where their choreography differs, keep them as separate styled sections rather than forcing them through `CaseStudySection`.
- [ ] **Step 3: Move `PatchProductionFlow` styling into its owner.** Its production stages/evidence are a Patch-specific visual, not a candidate for the universal case-study grammar.
- [ ] **Step 4: Move route-specific Patch styling into the components that own it.** Preserve teal family tokens, evidence figures, frame-gate questions, snapshot, bridge/boundary/close and responsive behaviour. Contextual extension of a shared primitive should use a styled wrapper/typed variant, not `.patch-case-study .case-study-*` descendant selectors.
- [ ] **Step 5: Delete `PatchPipelineCaseStudy.scss`.** Search the Patch Pipeline family for retired classes and convert tests that assert `.case-study-lead` structure to semantic/data contracts.
- [ ] **Step 6: Run focused Patch tests.** `npm test -- --run src/features/case-study/patch/*.test.tsx src/features/case-study/patch/*.test.ts`, then the Patch Pipeline cases in `npm run test:e2e -- e2e/project-story.spec.ts`.

### Task 7: Close selector debt and prove lazy boundaries structurally

**Files:** `projectPresentations.ts`, `projectPresentations.test.tsx`, `ContentPage.test.tsx`, `project-story.spec.ts`, `fonts.spec.ts`, and any generated indexes changed by Tasks 1–6.

- [ ] **Step 1: Audit retired selectors.** From repo root run:

```powershell
rg "case-study-lead|case-study-callout|case-study-media-caption|content-page-header.*(marketplace|learning-lab|wild-bunch|patch)-case-study-hero" src/client/src src/client/e2e
```

Expected: no styling dependency on the retired shared/project-header recipes. Any intentional test text/data-contract hit must be explained locally.

- [ ] **Step 2: Audit Sass imports.** Run:

```powershell
rg "CaseStudyBody\.scss|MarketplaceCaseStudy\.scss|LearningLabCaseStudy\.scss|WildBunchCaseStudy\.scss|PatchPipelineCaseStudy\.scss|ContentPage\.scss" src/client/src
```

Expected: zero results after the target files are deleted.

- [ ] **Step 3: Preserve dynamic presentation imports.** Keep all four family entries as `React.lazy(() => import(...))` in `projectPresentations.ts`; no root/shared barrel imports family implementations.
- [ ] **Step 4: Add/request-graph browser proof.** In `project-story.spec.ts`, record JS requests for direct loads of `/projects/codex-marketplace`, `/projects/agentic-learning-lab`, `/projects/wild-bunch`, and `/projects/adventures-of-patch`. Each route must load its own presentation chunk and must not request sibling family presentation chunks. Also direct-load one writing route and one `/patch/...` showcase route and prove they do not request the four case-study family chunks unless their route actually needs one.
- [ ] **Step 5: Verify the production chunk graph.** From `src/client`, run `npm run build`; inspect `dist/.vite/manifest.json` and the emitted assets. Record the common entry size, each case-study family chunk, and any shared chunk introduced by the refactor. A shared chunk is acceptable only when it contains genuinely shared grammar, not specialist family code/styles.

### Task 8: Full visual, browser, budget and repository closure

- [ ] **Step 1: Run the complete unit suite.** From `src/client`: `npm test -- --run`.
- [ ] **Step 2: Run the complete browser gate.** `npm run test:e2e`.
- [ ] **Step 3: Run visual regression twice without updating snapshots.** `npm run test:e2e:visual`, then run the same command again. Expected: all existing Windows signatures pass both runs unchanged.
- [ ] **Step 4: Inspect the four project routes at the established widths.** Use browser tooling at 1440, 768, 390 and 320 CSS pixels plus actual 200% browser zoom. Verify heading/hero geometry, evidence order, no horizontal overflow, keyboard traversal and reduced-motion behaviour. Exercise direct cold loads as well as client navigation.
- [ ] **Step 5: Build and record budgets.** `npm run build`. Record entry JS against `358400`, CSS against `40960`, CV PDF against `524288`, and confirm exactly two PDF pages.
- [ ] **Step 6: Regenerate/validate the mesh.** From repo root run `py -3 tools/run.py mesh --apply`, inspect the generated `INDEX.md` diffs, then run `git diff --check`.
- [ ] **Step 7: Commit through the normal hook.** Stage only intended Slice D files and commit normally so the tracked pre-commit hook runs `py -3 tools/run.py ci --check`. Do not immediately duplicate that full gate manually after a successful hooked commit. If no commit will follow, run `py -3 tools/run.py ci --check` directly instead.
- [ ] **Step 8: Verify publication state.** Confirm `git status --short` is clean, push the branch, verify PR #54 still targets `main` and remains draft, then update the PR body with final head SHA, test counts, visual result, bundle/PDF budgets and request-graph evidence. Hand back as `Ready for Harley visual acceptance` or `Blocked`; do not mark the PR ready for review or merge it.

## Explicit non-goals / deferred work

- Slice E authored article-specific presentation migration.
- Slice F Patch showcase composition/art-direction migration, except the caption-only shared primitive compatibility switch required to retire `CaseStudyBody.scss`.
- Slice G homepage migration and wholesale `ProjectVisual` redesign.
- Rewriting project copy, evidence claims, pinned revisions or source custody.
- Creating a universal project/evidence renderer.
- Removing every class name from the repository. Stable classes/data attributes may remain where they are an intentional DOM/test contract; they must not be the hidden styling API for migrated composition.
- Solving writing-specific `ContentHeader` reach-through in this slice.

## Completion definition

Slice D is complete when:

1. `CaseStudyBody.scss`, `ContentPage.scss` and all four family-wide case-study Sass files are deleted.
2. Shared case-study primitives own their intrinsic visual/semantic contracts in React/styled-components.
3. Project detail header geometry is synchronous and owned by a case-study header component while `ProjectVisual` remains lazy.
4. Marketplace, Learning Lab, Wild Bunch and Patch Pipeline retain their distinct evidence choreography with family-specific visuals owned by the components that render them.
5. No migrated parent styles through a child's private class/DOM internals.
6. Direct routes preserve lazy-family isolation and cold-load geometry.
7. Unit, browser, visual, build, budget, PDF, mesh and tracked CI gates pass.
8. Existing approved visual baselines remain unchanged unless Harley explicitly accepts a difference.
9. PR #54 remains draft and is handed back for Harley visual acceptance.
