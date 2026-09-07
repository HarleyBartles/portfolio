# React Composition Slice F — Patch Stories and Brand Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `/executing-plans` to implement this plan task-by-task, `/test-driven-development` for each code task, and `/verification-before-completion` before any completion claim. Keep the work sequential where shared routing/brand seams are changing; do not fan out workers against the same files.

**Goal:** Complete Slice F by making the Adventures of Patch story pages own their bespoke React/styled-components composition, establishing the Adventures of PATCH lockup as persistent series identity, renaming The Lawful Heist Crew to The Usual Specialists, making `/patch/the-usual-specialists` canonical, and retaining `/patch/lawful-heist` only as a compatibility redirect.

**Architecture:** Add a Patch-family brand primitive that owns the canonical Adventures of PATCH lockup and The Usual Specialists wordmark. `PatchPage` supplies that brand treatment through a small generic `ContentPage` header-visual seam; `ContentPage` remains Patch-agnostic. Identity Emporium, Tournament of Reasonable Defaults, The Usual Specialists, and the Patch index then self-own their styled-components choreography and stable visual contracts. Shared Sass is retired only after every consumer moves. Canonical story routing moves to `/patch/the-usual-specialists`; the legacy lawful-heist path remains a redirect/static compatibility document with canonical metadata pointing at the new route.

**Tech Stack:** React 19, TypeScript 6, React Router 7, styled-components 6, Vitest/Testing Library, Playwright, Vite 8, generated route metadata/documents, existing Sass foundations only where not in Slice F scope.

**Execution Strategy:** Subagent-driven development under one Sol orchestrator. Execute the tasks in order. Brand/routing seams land before story-family migrations; story migrations stay sequential; deletion and lazy-load proof happen only after all consumers have moved.

## Handoff gate

**Readiness: 9.5 / 10.**

- Current branch and implementation baseline are verified.
- Canonical/legacy route behaviour is explicit.
- Brand custody and story ownership boundaries are explicit.
- Exact migration order and Sass retirement targets are explicit.
- Unit, generated-route, accessibility, lazy-loading, responsive and visual-regression proofs are explicit.
- Windows-only visual baseline policy and build-budget obligations are explicit.
- Non-goals prevent this slice from turning into a generic evidence-frame or site-wide redesign.

## Preconditions and branch baseline

- Work on `codex/react-composition-slice-f-plan`.
- The accepted pre-Slice-F implementation baseline is commit `427b990bc2090d0478772b8ef903275f7e7f4b04`.
- This plan commit is planning movement only; implementation begins after it.
- Before source edits, run `git status --short` and `git rev-parse HEAD`. Reconcile any branch movement or foreign work before continuing.
- Treat `.agents/specs/2026-09-03-react-composition-grammar-design.md` as settled architecture. Slice F is the bespoke Patch-story composition slice; do not collapse it into generic case-study grammar.
- Treat `.agents/doctrine/portfolio-design-policy.md`, `docs/design-decisions.md`, and `docs/asset-custody.md` as design/source-custody authority.
- Use normal hooked commits. The tracked pre-commit hook owns the canonical staged-tree CI execution; do not manually run the complete CI immediately before or after the hooked commit unless the hook/runbook explicitly requires recovery.

## Canonical routing decision

- Canonical public story route: `/patch/the-usual-specialists`.
- Legacy compatibility route: `/patch/lawful-heist`.
- The legacy route must redirect with React Router `Navigate(..., replace)` after hydration and must still receive a generated static route document whose canonical metadata points to `/patch/the-usual-specialists` so direct old links remain viable on the static host.
- All first-party live links move to `/patch/the-usual-specialists`: homepage feature, Patch index, writing/article references, continuations, tests and any generated metadata derived from the manifest.
- The old route may remain only in redirect compatibility code/tests, migration/provenance notes, or genuinely historical source material.
- Historical source media/generation receipt names may retain `lawful-heist` where renaming would destroy provenance. Public UI, route metadata, presentation naming and live component naming use The Usual Specialists.

## Non-negotiable constraints

- No generic evidence-frame redesign. Preserve the bespoke comic/evidence choreography of Identity Emporium, Tournament, and The Usual Specialists.
- The Adventures of PATCH cliff-drop lockup is now series identity and must appear on `/patch` and every canonical `/patch/:slug` story page.
- The Usual Specialists gets both the series lockup and its own wordmark.
- Preserve story copy, evidence order, current media, alt text, semantic meaning and the `PatchShowcasePicture` missing-media failure behaviour unless a test proves an existing inconsistency that must be corrected.
- Use styled-components for migrated Slice F composition. Do not replace Sass selectors with equivalent global class recipes.
- Keep Source Sans 3 as site voice. Preserve project-native colour only where it is part of accepted story art direction.
- Prefer semantic roles and explicit stable `data-*` visual contracts over implementation-class selectors in tests and browser probes.
- Preserve route-level and presentation-level lazy loading. Do not create an eager Patch barrel that imports every specialist story implementation.
- Preserve hard budgets: entry JavaScript `358400` bytes, entry CSS `40960` bytes, generated CV PDF `524288` bytes and exactly two CV pages.
- Validate at 320 CSS px minimum width and actual browser 200% zoom, not merely a simulated narrower viewport.
- New/changed visual baselines are authored on Windows only. Once accepted, run the affected visual test twice without update and require both passes.
- Do not redesign the homepage, project case study, PORT-10 article, or unrelated writing surfaces. Their only permitted Slice F changes are canonical Patch brand asset paths and canonical The Usual Specialists links/naming.

## Target ownership map

### Shared Patch brand

- `src/client/src/features/patch-brand/PatchBrand.tsx` — new Patch-family brand primitives and asset-path authority.
- `src/client/src/features/patch-brand/PatchBrand.test.tsx` — semantic/asset-path tests.
- `src/client/public/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg` — existing canonical series mark; unchanged geometry.
- `src/client/public/brand/adventures-of-patch/the-usual-specialists-wordmark.svg` — canonical destination for the existing Specialists wordmark.

### Patch routing/header seam

- `src/client/src/pages/PatchPage.tsx` — canonical story-brand selection and `ContentPage` handoff.
- `src/client/src/pages/ContentPage.tsx` — generic optional `headerVisual` seam only; no Patch slug knowledge.
- `src/client/src/app/router.tsx` — explicit `/patch/lawful-heist` legacy redirect plus canonical dynamic route handling.
- `src/client/scripts/generate-route-documents.mjs` — static legacy-route document mapping old Patch path to canonical new path.
- `src/client/scripts/generate-route-documents.test.ts` — legacy document/canonical metadata proof.

### Identity Emporium

- `src/client/src/features/patch-showcase/IdentityEmporiumPage.tsx`
- `src/client/src/features/patch-showcase/PatchShowcaseEvidence.tsx`
- focused Identity tests added/expanded beside the feature.

### Tournament of Reasonable Defaults

- `src/client/src/features/patch-showcase/TournamentPage.tsx`
- focused Tournament tests.

### The Usual Specialists

- Rename `src/client/src/features/patch-showcase/LawfulHeistPage.tsx` to `UsualSpecialistsPage.tsx`.
- Rename its focused test accordingly.
- Delete `src/client/src/features/patch-showcase/LawfulHeistPage.scss` after local ownership lands.
- `src/client/src/data/content/projectPresentations.ts` — lazy presentation import becomes `patch-usual-specialists` -> `UsualSpecialistsPage`.
- `src/client/src/types/content.ts` and validation fixtures — presentation vocabulary follows the public/current name.

### Patch index

- `src/client/src/pages/PatchIndexPage.tsx` — series-branded index and local styled-components composition.

### Shared Sass retirement

- `src/client/src/features/patch-showcase/PatchShowcase.scss` — delete after Identity, Tournament and index have all moved.

## Task 1 — Establish canonical Patch brand custody

**Files**

- Create `src/client/src/features/patch-brand/PatchBrand.tsx`.
- Create `src/client/src/features/patch-brand/PatchBrand.test.tsx`.
- Move `src/client/public/media/homepage/the-usual-specialists-wordmark.svg` to `src/client/public/brand/adventures-of-patch/the-usual-specialists-wordmark.svg` with no duplicate left behind.
- Modify `src/client/src/features/home/homepageAssets.ts` and its tests.
- Modify `src/client/src/features/home/SpecialistsPatchFeature.tsx`.
- Modify `src/client/src/features/writing/RianHughesArticleFigures.tsx` and its tests.
- Modify `docs/asset-custody.md`.
- Append a dated decision to `docs/design-decisions.md`.

**Test first**

1. Add `PatchBrand.test.tsx` proving a base-url-aware path helper resolves both canonical brand SVGs.
2. Prove `PatchSeriesLockup` renders the existing cliff-drop mark with a meaningful accessible label.
3. Prove `UsualSpecialistsWordmark` resolves the canonical brand path rather than `/media/homepage/`.
4. Update homepage/article tests to expect the moved Specialists asset.
5. Run the focused tests and observe the old paths fail before implementation.

**Implementation**

Use a small family-owned API along these lines; exact styled wrapper names remain local:

```ts
export function patchBrandAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string
export function PatchSeriesLockup(props: { className?: string }): JSX.Element
export function UsualSpecialistsWordmark(props: { className?: string }): JSX.Element
export function PatchStoryBrand(props: {
  storyWordmark?: 'usual-specialists'
  className?: string
}): JSX.Element
```

- Keep the SVGs external and outlined; do not duplicate their geometry in React.
- Keep `currentColor` behaviour intact so consuming compositions control presentation without editing the marks.
- Remove the Adventures brand helper from `homepageAssets.ts`; that file should remain homepage-media authority only.
- Homepage and Rian Hughes article consume the canonical brand path/component without changing accepted layout.
- Record in `docs/asset-custody.md` that both marks are Adventures of Patch brand assets and the Specialists mark is no longer homepage-owned.
- Record in `docs/design-decisions.md` that the cliff-drop lockup is the persistent series mark across Patch index/subpages and that The Usual Specialists carries a secondary story wordmark.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/features/patch-brand/PatchBrand.test.tsx src/features/home/homepageAssets.test.ts src/features/writing/RianHughesArticle.test.tsx
```

- Inspect both SVG network requests in a production preview or Playwright run; there must be no stale `/media/homepage/the-usual-specialists-wordmark.svg` request.

**Commit**

`refactor: give Patch brand assets canonical custody`

- [x] Task 1 complete: brand assets have one canonical home, tests are green, documentation reflects custody, and no duplicate Specialists wordmark remains.

## Task 2 — Make The Usual Specialists canonical and put Patch identity on every story route

**Files**

- Modify `src/client/src/app/router.tsx`.
- Modify `src/client/src/pages/ContentPage.tsx`.
- Modify `src/client/src/pages/PatchPage.tsx`.
- Modify `src/client/src/data/content/content-manifest.json`.
- Modify `src/client/src/data/patch/patch-evidence.json` (or the current exact Patch evidence path if moved since baseline).
- Modify `src/client/scripts/generate-route-documents.mjs` and `generate-route-documents.test.ts`.
- Regenerate `src/client/src/data/routes/route-metadata.generated.json` through its owner script.
- Update `src/client/src/pages/ContentPage.test.tsx`, `src/client/src/pages/PatchRoutes.test.tsx`, `src/client/src/features/writing/WritingContinuations.test.tsx`, `src/client/e2e/writing-navigation.spec.ts`, and route-generation fixtures that encode the old public name/path.
- Update `src/client/src/features/home/homepageEdition.ts` and the Rian Hughes article source/link expectation to the canonical route.
- Update `tools/portfolio_quality.py` only where it validates current title/presentation/route vocabulary.

**Test first**

1. Add a router test proving `/patch/lawful-heist` replaces navigation with `/patch/the-usual-specialists`.
2. Update Patch route/content tests so The Usual Specialists is fetched/rendered from canonical slug `the-usual-specialists`.
3. Update writing/homepage tests to require first-party links to `/patch/the-usual-specialists`.
4. Extend route-document tests so a static `/patch/lawful-heist/index.html` is still emitted but its canonical URL is `/patch/the-usual-specialists`.
5. Assert generated route metadata contains only the canonical story entry, not a second indexable lawful-heist content entry.

**Implementation**

- Change the manifest item slug from `lawful-heist` to `the-usual-specialists` and public title to `The Usual Specialists`.
- During this task the presentation value may temporarily remain `patch-lawful-heist` until Task 5 if changing it now would cross the story-implementation seam; tests must make that temporary state explicit. Task 5 retires it.
- Add an explicit legacy route in `router.tsx` for `patch/lawful-heist` whose element is `<Navigate to="/patch/the-usual-specialists" replace />`. Keep the canonical `patch/:slug` lazy route for current stories.
- Add a `LEGACY_ROUTES` entry in `generate-route-documents.mjs` mapping `/patch/lawful-heist` -> `/patch/the-usual-specialists`. Reuse the canonical story metadata so the emitted old-path document has the new canonical URL/title/description.
- Add `headerVisual?: ReactNode` to `ContentPage` and render `headerVisual ?? projectHeaderVisual`. Do not import Patch brand code or inspect Patch slugs in `ContentPage`.
- `PatchPage` passes `<PatchStoryBrand storyWordmark={slug === 'the-usual-specialists' ? 'usual-specialists' : undefined} />` as `headerVisual`.
- Update homepage, Patch index data mapping, article link and writing continuations to canonical new route.
- Update current evidence title from Lawful Heist to The Usual Specialists while preserving historical media paths/provenance fields.
- Run the route owner scripts rather than hand-editing generated JSON.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/writing/WritingContinuations.test.tsx scripts/generate-route-documents.test.ts
npm run routes:apply
npm run routes:check
```

Browser proof:

- Open `/patch/the-usual-specialists` directly: canonical story renders with Adventures of PATCH + Specialists wordmark.
- Open `/patch/lawful-heist` directly: URL is replaced with `/patch/the-usual-specialists` and content renders once.
- Inspect the built `dist/patch/lawful-heist/index.html`: canonical metadata points to `/patch/the-usual-specialists`.
- Open Identity and Tournament directly: each shows the Adventures of PATCH series lockup without a Specialists wordmark.

**Commit**

`feat: make The Usual Specialists the canonical Patch route`

- [x] Task 2 complete: new route is canonical everywhere, old route redirects, static compatibility exists, and every Patch story has the series mark.

## Task 3 — Migrate Identity Emporium to self-owned styled composition

**Files**

- Modify `src/client/src/features/patch-showcase/IdentityEmporiumPage.tsx`.
- Modify `src/client/src/features/patch-showcase/PatchShowcaseEvidence.tsx`.
- Add/expand focused Identity tests.
- Remove Identity-specific selectors from `PatchShowcase.scss`; do not delete the file yet because Tournament/index still consume it.

**Test first**

1. Preserve the heading `Three approaches to preparation`, existing explanatory copy and all current evidence figures.
2. Prove the evidence helper still requests AVIF/WebP siblings through `getPatchMediaByPath`/`getPatchAssetPath` and still throws `Patch evidence is missing for ${path}.` when evidence is absent.
3. Add stable `data-visual-contract="patch-identity-emporium"` at the composition boundary.
4. Add semantic assertions for the three approaches/roles rather than `.identity-evidence*` implementation classes.

**Implementation**

- Move Identity layout, spacing, paper/ink treatment, paired evidence choreography and breakpoints into styled-components colocated with the owning React composition.
- Keep the evidence arrays/paths and source order unchanged.
- Preserve the accepted identity pale green `#c9ded5` only where it is part of this story's current art direction; use site tokens for generic spacing/type/borders where an existing token is semantically correct.
- Do not add generic evidence primitives solely to reduce lines of CSS.
- Remove the `PatchShowcase.scss` import from Identity once its own composition is complete.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/IdentityEmporiumPage.test.tsx src/pages/PatchRoutes.test.tsx
```

- Browser-check 1440, 768, 390 and 320 CSS px plus actual 200% zoom.
- Keyboard traversal must not create a reading-order mismatch with the visual evidence choreography.

**Commit**

`refactor: give Identity Emporium local composition ownership`

- [x] Task 3 complete: Identity has no shared Sass dependency, preserves evidence behaviour and passes responsive/semantic checks.

## Task 4 — Migrate Tournament to self-owned styled composition

**Files**

- Modify `src/client/src/features/patch-showcase/TournamentPage.tsx`.
- Add/expand Tournament focused tests.
- Modify `src/client/e2e/visual-regression.spec.ts` selectors.
- Remove Tournament-specific selectors from `PatchShowcase.scss`.

**Test first**

Preserve the four events and exact story payload:

1. Seven-Day App Build — `Build me an app in seven days.` — `No medal`.
2. High Jump — `Build a login page.` — `No medal`.
3. Under-specified Maze — `Write me an API for users.` — `Bronze`.
4. Long Course with Consultation — `Implement GET /users/{id}.` — `Gold`.

Add:

- `data-visual-contract="patch-tournament"` on the story boundary.
- `data-patch-event` on event articles.
- A stable semantic/data selector for the consultation event so visual tests no longer depend on Sass classes.

**Implementation**

- Translate the current grid, scoreboard/medal hierarchy, evidence pairings and responsive reflow into styled-components owned by `TournamentPage`.
- Preserve current geometry closely enough that existing accepted Tournament baselines remain valid unless the new persistent series lockup intentionally changes a full-page snapshot.
- Update visual wait helpers from `article.tournament-event` to the stable data contract.
- Remove the `PatchShowcase.scss` import from Tournament when complete.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/TournamentPage.test.tsx src/pages/PatchRoutes.test.tsx
npm run test:e2e:visual -- e2e/visual-regression.spec.ts --grep "Tournament"
```

Visual policy:

- If only the newly approved series-brand header changes a full-page baseline, author that intentional baseline once on Windows and review it.
- Do not update baselines to hide migration drift in the Tournament body.
- After an accepted update, run the affected visual test twice without `--update-snapshots`.

**Commit**

`refactor: give Tournament local composition ownership`

- [x] Task 4 complete: Tournament owns its composition, body visuals remain equivalent, and visual tests use semantic contracts.

## Task 5 — Rename and migrate The Usual Specialists implementation

**Files**

- Rename `LawfulHeistPage.tsx` -> `UsualSpecialistsPage.tsx`.
- Rename its focused test file accordingly.
- Delete `LawfulHeistPage.scss` after migration.
- Modify `src/client/src/data/content/projectPresentations.ts`.
- Modify `src/client/src/types/content.ts`.
- Modify `src/client/src/data/content/content-manifest.json` presentation value to `patch-usual-specialists`.
- Modify `tools/portfolio_quality.py` and relevant fixtures/tests.
- Modify `src/client/e2e/accessibility.spec.ts` route label/path.
- Modify `src/client/e2e/visual-regression.spec.ts` stable selectors and snapshot names only where useful; do not rename historical image-source directories for aesthetics.

**Test first**

1. Replace public heading/region expectations for `The Lawful Heist Crew` with `The Usual Specialists`.
2. Preserve all six recruits, order, quotes, responsibilities, media and captions: Index, Silk, Writ, Klause, Rollback, Receipt.
3. Add `data-visual-contract="patch-usual-specialists"` at the story boundary.
4. Add `data-specialist="index|silk|writ|klause|rollback|receipt"` to recruit boundaries and migrate browser tests away from `.heist-recruit--rollback`.
5. Assert presentation vocabulary uses `patch-usual-specialists`; remove `patch-lawful-heist` from current allowed types/validation.

**Implementation**

- Rename current component/test symbols and lazy import to `UsualSpecialistsPage`.
- Keep canonical route `/patch/the-usual-specialists`; legacy lawful-heist compatibility remains solely in Task 2 routing/static-doc code.
- Translate the current dossier/recruit grid and per-specialist choreography into local styled-components.
- Preserve earned story colours currently represented by heist ink `#18211c`, blue `#406a78` and gold `#d4a43b`; delete unused local variables rather than carrying dead palette forward.
- Keep the current Rollback visual framing/evidence placement equivalent.
- Delete `LawfulHeistPage.scss` only after no current runtime import remains.
- Search current runtime/test vocabulary for `The Lawful Heist Crew`, `patch-lawful-heist`, and live `/patch/lawful-heist` links. Remaining occurrences must be explicit redirect compatibility or provenance.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/pages/PatchRoutes.test.tsx src/pages/ContentPage.test.tsx
npm run test:e2e:visual -- e2e/visual-regression.spec.ts --grep "Usual Specialists|Rollback"
```

- Open canonical route at 1440, 768, 390, 320 and 200% zoom.
- Confirm both brand marks remain legible and do not steal the story's first evidence beat.

**Commit**

`refactor: make The Usual Specialists own its story composition`

- [x] Task 5 complete: current implementation/public vocabulary is Specialists-native, Sass is gone, and lawful-heist survives only as explicit compatibility/provenance.

## Task 6 — Rebrand the Patch index as the series front door

**Files**

- Modify `src/client/src/pages/PatchIndexPage.tsx`.
- Modify `src/client/src/pages/PatchRoutes.test.tsx`.
- Modify `src/client/e2e/visual-regression.spec.ts`.
- Remove Patch-index selectors from `PatchShowcase.scss`.

**Test first**

1. Require visible Adventures of PATCH series lockup on `/patch`.
2. Keep a semantic H1 `Adventures of Patch`; it may be visually hidden if the outlined mark is the visual title.
3. Preserve the current fairytale/in-flight grouping and lesson/status information.
4. Require the current Specialists index link to `/patch/the-usual-specialists`.
5. Add `data-visual-contract="patch-index"`.

**Implementation**

- Replace generic `IndexHeader` use with a Patch-owned series header using `PatchSeriesLockup`, a compact eyebrow such as `Visual lessons`, and the existing explanatory summary.
- Keep text semantics in real HTML; the SVG is brand presentation, not the only accessible title.
- Move `.patch-index__*` layout/card/group styles into local styled-components in `PatchIndexPage`.
- Keep the distinction between fairytales and in-flight/advanced adventures; do not turn the page into a generic card grid.
- Add wide/mobile visual snapshots for the index because the brand-first header is an intentional reframe.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/pages/PatchRoutes.test.tsx
npm run test:e2e:visual -- e2e/visual-regression.spec.ts --grep "Patch index"
```

- Author the new index baselines once on Windows, review, then run each twice without update.

**Commit**

`refactor: make Patch index the branded series front door`

- [x] Task 6 complete: `/patch` is visibly the Adventures of Patch series index, keeps semantic heading structure, and links only to canonical story routes.

## Task 7 — Delete shared Patch Sass and prove route/presentation isolation

**Files**

- Delete `src/client/src/features/patch-showcase/PatchShowcase.scss`.
- Modify `src/client/e2e/project-story.spec.ts`.
- Modify `src/client/e2e/accessibility.spec.ts`.
- Modify `src/client/e2e/visual-regression.spec.ts` to add Identity coverage and final semantic selectors.
- Regenerate/check any repo mesh/catalogue owned outputs required by changed file references.

**Test first**

Strengthen lazy-load proof so direct story routes load their own presentation chunk and not siblings:

- `/patch/identity-emporium` -> `IdentityEmporiumPage` chunk; Tournament/Specialists chunks absent.
- `/patch/tournament` -> `TournamentPage` chunk; Identity/Specialists chunks absent.
- `/patch/the-usual-specialists` -> `UsualSpecialistsPage` chunk; Identity/Tournament chunks absent.
- Fairytale content routes remain content-only/static presentation cases and do not eagerly pull specialist story chunks.
- `/patch/lawful-heist` may load only enough router/runtime code to redirect; after replacement navigation the Specialists route behaves as the canonical route.

Accessibility route matrix must include:

- Patch index.
- Identity Emporium.
- Tournament.
- The Usual Specialists.

Add Identity wide/mobile visual snapshots if none exist so all three bespoke compositions now have direct screenshot custody.

**Implementation**

- Delete `PatchShowcase.scss` only after an `rg` proves no runtime import remains.
- Remove obsolete classNames that exist only for deleted Sass/test selectors; keep semantic classNames only if another legitimate consumer still needs them.
- Keep chunk names/expectations implementation-aware enough to prove isolation without depending on Vite hash values.
- Apply/check repo mesh only through its owner command if changed file references require it.

**Focused verification**

```powershell
cd src/client
npm test -- --run src/pages/PatchRoutes.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts
npm run test:e2e:visual -- e2e/visual-regression.spec.ts --grep "Patch|Identity|Tournament|Usual Specialists|Rollback"
```

On Windows, run the affected visual set twice without update after the last accepted baseline change.

If repo mesh reports stale generated references:

```powershell
cd ..\..
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
```

**Commit**

`refactor: retire shared Patch showcase Sass`

- [x] Task 7 complete: both Patch Sass files are gone, every specialist route remains lazy/isolated, and Patch accessibility/visual coverage is complete.

## Task 8 — Final Slice F validation and closeout

**Focused unit/regression set**

Run the full focused Slice F set, including at minimum:

```powershell
cd src/client
npm test -- --run \
  src/features/patch-brand/PatchBrand.test.tsx \
  src/features/home/homepageAssets.test.ts \
  src/features/writing/RianHughesArticle.test.tsx \
  src/features/writing/WritingContinuations.test.tsx \
  src/pages/ContentPage.test.tsx \
  src/pages/PatchRoutes.test.tsx \
  src/features/patch-showcase/IdentityEmporiumPage.test.tsx \
  src/features/patch-showcase/TournamentPage.test.tsx \
  src/features/patch-showcase/UsualSpecialistsPage.test.tsx \
  scripts/generate-route-documents.test.ts
npm run routes:check
npm run build
```

Adjust exact test filenames only if the repo's current colocated naming differs; do not omit the corresponding behaviour.

**Residue searches**

From repo root:

```powershell
rg -n "PatchShowcase\.scss|LawfulHeistPage\.scss" src/client
rg -n "patch-lawful-heist|The Lawful Heist Crew" src/client tools docs
rg -n "\/patch\/lawful-heist" src/client docs
rg -n "media/homepage/the-usual-specialists-wordmark\.svg" src/client docs
```

Interpretation:

- No Sass imports/references remain.
- Old presentation/public-name matches must be provenance/migration history only.
- `/patch/lawful-heist` matches must be the explicit redirect/static-compatibility tests or historical prose; no live first-party navigation may target it.
- No current asset consumer uses the old homepage wordmark path.

**Manual rendered acceptance**

Inspect in a production build/preview:

- `/patch`.
- `/patch/identity-emporium`.
- `/patch/tournament`.
- `/patch/the-usual-specialists`.
- `/patch/lawful-heist` redirect behaviour.

At:

- 1440 px desktop.
- 768 px tablet/narrow desktop.
- 390 px phone.
- 320 CSS px minimum.
- Actual 200% zoom.
- Keyboard-only traversal.

Acceptance points:

1. Adventures of PATCH mark is visible on index and every story page.
2. Specialists mark appears only where semantically appropriate.
3. New canonical route is used by all first-party navigation.
4. Old route redirects and old static document canonicalises to the new route.
5. No horizontal overflow at 320 CSS px or 200% zoom.
6. Reading/focus order remains sensible where visual grids reorder.
7. Identity evidence order/roles unchanged.
8. Tournament four-event medal narrative unchanged.
9. All six Specialists and their evidence remain present/in order.
10. Missing Patch media still fails loudly through `PatchShowcasePicture`.
11. No shared Patch Sass ships.
12. Direct story routes do not eagerly load sibling specialist chunks.
13. Accessibility suite is green for Patch index + all bespoke stories.
14. Accepted visual baselines pass twice without update on Windows.
15. Build budgets remain green.

**Hooked final commit / validation**

- Stage the intended final tree.
- Use a normal commit so the tracked pre-commit hook runs the canonical `py -3 tools/run.py ci --check` staged-tree gate.
- Do not manually re-run the same complete CI immediately before or after a successful hooked commit.
- If the hook fails, fix the failure, restage, and commit normally again.
- Verify `git status --short` is clean after the final commit.

**Closeout record**

- Update any Slice F decision/plan status section required by repo runbooks.
- Move this plan to the repo's completed-plan surface only when implementation is actually complete and the repo's plan lifecycle requires that move; do not pre-archive it.

- [ ] Task 8 complete: all 15 acceptance points are proven, the hook is green, budgets are green, visual checks are stable, and the worktree is clean.

## Completion contract

Slice F is complete only when all of the following are true:

- [ ] `/patch/the-usual-specialists` is canonical.
- [ ] `/patch/lawful-heist` is compatibility-only and redirects to the canonical route.
- [ ] The legacy static document canonicalises to the new route.
- [ ] No first-party live link targets `/patch/lawful-heist`.
- [ ] Adventures of PATCH lockup is visible on Patch index and every Patch story.
- [ ] The Usual Specialists wordmark is canonical brand custody and appears on its story page.
- [ ] Identity, Tournament, Specialists and Patch index own their composition in React/styled-components.
- [ ] `PatchShowcase.scss` and `LawfulHeistPage.scss` are deleted.
- [ ] `patch-lawful-heist` is no longer current presentation vocabulary.
- [ ] Story copy/evidence/media order is preserved.
- [ ] `PatchShowcasePicture` still fails loudly on missing evidence.
- [ ] Specialist routes remain lazy and do not load sibling chunks.
- [ ] Patch accessibility and responsive/zoom checks are green.
- [ ] Windows visual baselines are accepted and pass twice without update.
- [ ] Build budgets and canonical hooked CI are green.

## Non-goals

- Do not build a universal Patch/evidence renderer.
- Do not redesign the three story bodies beyond ownership-preserving translation and the approved brand-header change.
- Do not rename historical source media/generation receipt directories merely to erase lawful-heist provenance.
- Do not redesign homepage Specialists composition; only move it to canonical brand asset/route custody.
- Do not refactor unrelated case-study/writing grammar.
- Do not alter fairytale content beyond any generic Patch series-header behaviour naturally inherited through `PatchPage`.
- Do not change hosting architecture solely to obtain an HTTP 301/302; static compatibility document + canonical metadata + client `replace` redirect is sufficient for this slice unless the existing deployment already exposes a native redirect mechanism.
