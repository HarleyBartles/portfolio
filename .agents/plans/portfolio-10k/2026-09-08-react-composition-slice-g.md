# React Composition Slice G — Homepage Ownership Migration Implementation Plan

> **Execution mode:** use `/executing-plans` inline in this session, `/test-driven-development` for each code task, and `/verification-before-completion` before any completion claim. Steps use checkbox (`- [ ]`) syntax for tracking. Execute tasks sequentially; do not fan out workers against the shared homepage Sass surface.

**Goal:** Migrate the accepted six-movement homepage and the adjacent `ProjectVisual` stylesheet seam to self-owned React/styled-components composition without changing the homepage's appearance, choreography, deterministic edition, teaser ownership, responsive decisions, visual baselines, loading boundaries, or accessibility behaviour.

**Architecture:** Keep `HomePage` as the small six-movement orchestrator. Move only genuine homepage-wide substrate/frame/type/action foundations into `SiteLayout` plus a small home-local primitive module, while each movement owns its own composition and authored responsive rules. Extract Wild Bunch proof and the tournament Patch presentation only where those seams make the parent composition clearer; keep Specialists media-failure state local. Retire `HomePage.scss` and `ProjectVisual.scss` only after stable semantic/data test contracts exist and every live consumer has moved.

**Tech Stack:** React 19, TypeScript 6, React Router 7, styled-components 6, Vitest/Testing Library, Playwright 1.61, Vite 8, Sass only for non-Slice-G surfaces, Windows-authored visual baselines.

**Execution Strategy:** `executing-plans`, inline. This is one coherent homepage subsystem with reviewable movement-sized tasks, not a roadmap split. Execute one task at a time in this session because tasks progressively remove selectors from the same `HomePage.scss`; each task must finish green before the next starts. `ProjectVisual` remains a later bounded sidecar task because its Sass is named by Slice G but its runtime consumers are no longer homepage-only.

## Global Constraints

- The homepage is one deterministic six-movement composition in this exact source order: `opening`, `marketplace`, `wild-bunch`, `writing`, `patch`, `professional-close`.
- Do not redesign the homepage. Preserve current copy, routes, metadata, visual hierarchy, art direction, media, source order, anchor choreography, and accepted screenshots unless Harley separately approves a design change through the portfolio change protocol.
- No autoplay, runtime randomness, date/cookie/network edition rotation, scroll-jacking, or decorative idle motion.
- Preserve `defaultHomepageEdition.id === 'phase-8-first-edition'` and the destination-owned `incomingTeaser` model. Do not move teaser copy into `HomePage`.
- Preserve `WildBunchFeature({ nextFeature: WritingHomepageFeature })`, `WritingFeature({ feature: WritingHomepageFeature; nextFeature: PatchHomepageFeature })`, `PatchHomepageSlot({ feature: PatchHomepageFeature })`, `SpecialistsPatchFeature({ feature: PatchHomepageFeature })`, and `ProjectVisual({ slug, eager?, placement? })` as the externally consumed behavioural interfaces unless a task below explicitly adds an internal child interface.
- Keep Specialists `mediaFailed` state in `SpecialistsPatchFeature`; do not hoist it and do not invent Context, reducers, custom hooks, memoization, or duplicated state.
- Keep the Patch presentation registry seam. `HomePage` must not know which Patch presentation implementation is selected.
- Preserve Wild Bunch proof topology `events-cache-state;history-replay-cache-state`, six ordered events, cache/replay/state semantics, and topology-specific responsive rewiring.
- Preserve Adventures of PATCH series identity, The Usual Specialists wordmark, zero-flow overprint, current media-failure fallback copy, and the current `/patch/the-usual-specialists` route.
- Preserve current authored breakpoint decisions. In particular, do not casually merge/remove the regimes around `1400`, `1280/1279`, `1100/1099`, `901/900`, `801/800`, `721/720`, `521/520`, `481/480`, and `341/340` CSS pixels.
- Material visual proof must cover `1440`, `768`, `390`, and `320` CSS pixels plus the breakpoint-edge stress matrix defined in Task 1, keyboard-only traversal, reduced motion, failed homepage media, anchor landings, and actual browser 200% zoom.
- The existing CDP page-scale test is supplemental evidence only. Actual 200% browser zoom remains a manual acceptance gate.
- No horizontal overflow at `320` CSS px or at 200% browser zoom.
- Preserve homepage route laziness from `src/client/src/app/router.tsx`. Do not make `HomePage` eager through a common barrel.
- Preserve `ContentPage`'s lazy `ProjectVisual` boundary. Do not re-export `ProjectVisual` through an eager shared barrel or otherwise pull it into unrelated direct-route first paint.
- Keep `ProjectVisual` at `src/client/src/features/home/ProjectVisual.tsx` for this slice. Its directory name is historical debt, but rehoming it would add import/chunk churn unrelated to the ownership migration; only its styling ownership changes here.
- Preserve hard budgets: entry JavaScript `358400` bytes, entry CSS `40960` bytes, generated CV PDF `524288` bytes, exactly two CV pages.
- Because this migration transfers CSS into styled-components JavaScript, record HomePage and ProjectVisual emitted JS/CSS sizes before and after the migration in addition to the entry budgets. A passing entry budget does not excuse a large unexplained route-chunk transfer.
- Existing homepage visual baselines are protected contracts. Do not update `homepage-opening-wide.png`, `homepage-wild-bunch-wide.png`, `homepage-specialists-wide.png`, `homepage-specialists-lockup-wide.png`, `homepage-wild-bunch-portrait.png`, or `homepage-specialists-lockup-portrait.png` merely because implementation changed.
- New/changed screenshot baselines are Windows-only. After the last accepted visual change, run the affected homepage visual test twice without `--update-snapshots` and require both passes.
- Prefer roles, accessible names, and stable `data-*` contracts over Sass implementation classes in tests. Do not keep meaningless class names solely for Playwright geometry probes.
- Use focused tests while iterating. Stage the complete intended tree and commit normally; the tracked pre-commit hook owns the canonical staged-tree CI. Never use `git commit --no-verify` and do not run full `py -3 tools/run.py ci --check` immediately before or immediately after a successful normal hooked commit.
- Generated `INDEX.md` files are not hand-edited. Use the repo owner command when mesh output becomes stale.

---

## Handoff Gate

**Plan-readiness: 9.5 / 10.**

- The accepted visual/product contract is already settled by the composition-grammar spec, active design policy, and current production homepage.
- The plan treats the homepage as one designed composition and puts stress-characterisation before style migration.
- Movement ownership, shared-home primitives, Wild Bunch proof, Patch presentation/failure state, and `ProjectVisual` lazy-boundary decisions are explicit.
- The shared-primitive migration has an explicit temporary class compatibility bridge so residual movement Sass cannot silently lose nested selectors before its owning task moves; those bridge classes are retired task-by-task and are never test contracts.
- Breakpoint cliffs, visual baselines, route chunks, entry budgets, failure states, zoom, keyboard, and reduced-motion proof are explicit.
- The remaining human-owned gate is final visual inspection at actual 200% zoom; the implementation agent must provide evidence but may not redefine the accepted design.

## Preconditions and Known Baseline

- Worktree: `Z:\_agent-worktrees\portfolio\codex\react-composition-slice-g-plan`.
- Branch: `codex/react-composition-slice-g-plan`.
- Slice G base: `095b7e6f2a45b0d66965a862b6a40a1b15306b4d` (`feat: complete React composition Slice F for Patch stories (#56)`).
- `origin/main` matched that SHA when the worktree was created.
- The fresh full diagnostic is not green: all `185` Playwright journeys passed, but client unit tests exposed two pre-existing async/load-sensitive flakes in `ContentPage.test.tsx` and `PatchRoutes.test.tsx`.
- Harley explicitly authorised repairing those two flakes before the next commit, but planning comes first. Task 0 is baseline stabilisation, not Slice G product scope.
- Current built baseline recorded before Slice G source changes: entry JS `212721` bytes; entry CSS `10611` bytes; `HomePage` JS `15414` bytes; `HomePage` CSS `32436` bytes; `ProjectVisual` JS `8608` bytes; `ProjectVisual` CSS `3418` bytes. Rebuild and recapture immediately before the styling migration if Task 0 changes output unexpectedly.
- Treat `.agents/specs/2026-09-03-react-composition-grammar-design.md`, `.agents/doctrine/portfolio-design-policy.md`, and `docs/design-decisions.md` as current authority. The old Phase 8 homepage plan/handoff are provenance for accepted behaviour, not a design brief to reopen.

## Target Ownership Map

### Shared shell and homepage-local grammar

- Modify `src/client/src/components/SiteLayout.tsx` so `surface="home"` owns the current mineral substrate, home font roles, full-width main frame, and horizontal-clipping contract instead of relying on `.site-shell--home` reach-through from `HomePage.scss`.
- Modify `src/client/src/components/SiteLayout.test.tsx` to prove the home shell owns that surface contract without changing the interior surface.
- Create `src/client/src/features/home/HomePrimitives.tsx` for homepage-local `HomeFrame`, `HomeEyebrow`, display/section/body typography, `HomeRouteActions`, route/anchor action links, and `HomeAnchorTarget`.
- Create `src/client/src/features/home/HomePrimitives.test.tsx` for semantic/styling contracts that genuinely belong to those primitives.
- Do not force `PublicationPrimitives.ActionRouteLink`/`ActionAnchor` onto the homepage: their filled-control treatment is not the current homepage action language.

### Movement ownership

- `HomepageOpening.tsx` owns opening grid/proof composition.
- `MarketplaceFeature.tsx` owns the Marketplace copy/art overlap and its `480`/`900` responsive asset treatment.
- `WildBunchFeature.tsx` owns movement copy, continuation metadata, and parent-owned repeated event/state descriptor data.
- Create `WildBunchProof.tsx` for the proof's semantic nodes and typed repeated-content interface.
- Create `WildBunchProof.styles.ts` for the proof topology and authored responsive geometry.
- `WritingFeature.tsx` owns the serif editorial fold.
- `ProfessionalClose.tsx` owns the close/conversion fold.
- `PatchHomepageSlot.tsx` remains only the presentation registry/selector.
- Create `TournamentPatchFeature.tsx` for the tournament presentation's owned homepage composition.
- `SpecialistsPatchFeature.tsx` keeps local media failure state and owns Specialists composition.
- Create `SpecialistsPatchFeature.styles.ts` for named styled pieces of the large Specialists art direction so the React parent remains readable.

### Adjacent ProjectVisual seam

- Keep `src/client/src/features/home/ProjectVisual.tsx` at its current module path and preserve its exported `ProjectVisualSlug` and props.
- Create `src/client/src/features/home/ProjectVisual.styles.ts` for named styled visual wrappers.
- Delete `ProjectVisual.scss` only after project index and lazy case-study consumers remain green and chunk-isolated.

### Sass retirement

- `HomePage.scss` is reduced task-by-task as each owner moves, then deleted only after `rg` proves no remaining live import/selector dependency.
- `ProjectVisual.scss` is deleted in the dedicated ProjectVisual task.

## Task 0 — Stabilise or falsify the two fresh-baseline unit-test flakes before the next commit

**Files**

- Modify only as required: `src/client/src/pages/ContentPage.test.tsx`.
- Modify only as required: `src/client/src/pages/PatchRoutes.test.tsx`.
- Do not change product runtime merely to make these timing tests pass unless focused reproduction proves an actual runtime defect.

**Interfaces**

- Consumes: current async `ContentPage` query/presentation loading behaviour and current lazy Patch presentation behaviour.
- Produces: either a reproduced race with the smallest deterministic synchronisation repair, or recorded evidence that the suspected flakes cannot be reproduced under focused and full-load pressure. No arbitrary timeout inflation and no changed public UI contract.

- [x] **Step 1: Reproduce the baseline failures under focused repetition before editing**

```powershell
cd src/client
1..10 | ForEach-Object {
  npm test -- --run src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

Observed on 2026-09-08: all ten focused repetitions passed (`19/19` tests each run). The two failures do not reproduce in isolation.

- [x] **Step 2: Reproduce under full unit-suite concurrency before deciding whether a repair is justified**

```powershell
npm test
npm test
npm test
```

Observed on 2026-09-08: all three full runs passed (`86/86` files, `227/227` tests). Under load, `ContentPage.test.tsx` expanded to roughly `9.1-9.2s` total and `PatchRoutes.test.tsx` to roughly `6.4-6.8s` total, confirming substantial concurrency pressure, but no individual assertion or test timed out. The suspected failures therefore remain non-reproducible rather than repaired.

- [x] **Step 3: Inspect the suspected async seams and decline speculative changes while green**

Inspection found multiple explicit `5_000` Testing Library polling ceilings in `ContentPage.test.tsx`, while the canonical Specialists test already waits for the lazy story region before its later synchronous detail assertions. Because neither path can currently be made RED, do not raise timeouts or rewrite assertions by guess. The pre-commit hook is the next canonical pressure run; if it reproduces a unit failure, capture that exact failure and apply the repair shape below before retrying the commit.

**Repair shape only if the hook or a later focused reproduction is RED:**

Use the smallest change that waits for the UI state actually required by the assertion. The target shape is:

```tsx
const story = await screen.findByRole('region', { name: 'The Usual Specialists adventure' })
expect(within(story).getAllByRole('article')).toHaveLength(6)
expect(await screen.findByText('Advanced visual pre-production')).toBeVisible()
expect(await screen.findByAltText(/completed recruitment folder/i)).toBeVisible()
```

For the reproduced `ContentPage.test.tsx` case, wait for the final semantic region/heading/presentation state that the test actually needs rather than raising `5_000` to a larger timeout. Do not wait on implementation-only spinner timing when the assertion is about final content.

- [x] **Step 4: Prove the focused files are stable repeatedly**

```powershell
1..10 | ForEach-Object {
  npm test -- --run src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

Expected: all ten focused runs pass.

- [x] **Step 5: Record the baseline diagnosis independently of Slice G**

Do not describe the original failures as Slice G regressions. Current evidence is: original fresh-baseline diagnostic reported two load-sensitive unit failures; ten focused repetitions and three subsequent full-load unit runs are green; no source/test mutation is justified without a RED reproduction. If the commit hook reproduces either failure, the commit must fail closed and the exact race must be repaired before retry.

- [x] **Step 6: Mark Task 0 diagnostic gate complete in this plan**

Task 0 is complete as a diagnostic gate because repeated focused and full-load proof is green and no evidence-backed code change remains. This does not erase the original baseline observation; the normal hooked commit remains the next independent gate.

**Commit boundary:** planning came first as Harley requested. The suspected flakes were then investigated before the next commit; because ten focused repetitions and three full-load runs stayed green, no speculative test/runtime mutation is warranted. The first normal hooked commit on this branch commits the plan and lets the hook provide the next independent canonical pressure run. If the hook reproduces either unit failure, it must fail closed and the exact race must be repaired before retrying.

## Task 1 — Freeze the homepage's semantic and responsive stress contract before moving styles

**Files**

- Modify `src/client/src/features/home/HomepageSections.test.tsx`.
- Modify `src/client/e2e/homepage.spec.ts`.
- Modify only test-hook attributes in `HomepageOpening.tsx`, `MarketplaceFeature.tsx`, `WildBunchFeature.tsx`, `WritingFeature.tsx`, `PatchHomepageSlot.tsx`, `SpecialistsPatchFeature.tsx`, and `ProfessionalClose.tsx`.
- Modify `src/client/e2e/visual-regression.spec.ts` only to replace incidental class selectors with stable contracts; do not update snapshots.

**Interfaces**

- Consumes: current six-movement DOM, current authored breakpoint regimes, current semantic headings/links, and current visual baselines.
- Produces: stable test hooks used by later tasks: `data-home-frame`, `data-wild-event`, `data-wild-wire`, `data-wild-reading-card`, `data-wild-cache`, `data-wild-replay`, `data-wild-state`, and `data-patch-series-lockup` where geometry genuinely matters.

- [x] **Step 1: Add stable visual-contract attributes without changing layout**

Use attributes on the current elements before the styled-components migration, for example:

```tsx
<div className="home-frame" data-home-frame>
```

```tsx
<li className="home-wild-event" data-wild-event key={name}>
  ...
  <span className="..." data-wild-wire aria-hidden="true" />
</li>
```

```tsx
<section className="wild-proof-cache" data-wild-cache ... />
<section className="wild-proof-replay" data-wild-replay ... />
<section className="wild-proof-state" data-wild-state ... />
```

Do not add `data-*` attributes for every nested node. Add them only where a semantic/visual relationship is part of the accepted contract and existing tests currently need a private class to locate it.

- [x] **Step 2: Strengthen unit structure tests before selector retirement**

Replace `.home-wild-event` counting with the durable event hook and add frame/slot assertions:

```tsx
expect(proof.querySelectorAll('[data-wild-event]')).toHaveLength(6)
expect(proof).toHaveAttribute('data-topology', 'events-cache-state;history-replay-cache-state')
expect(container.querySelectorAll('[data-home-frame]').length).toBeGreaterThan(0)
```

Keep the existing exact movement order and destination-owned continuation assertions.

- [x] **Step 3: Expand the browser stress matrix to the authored breakpoint cliffs**

Replace the existing width list with:

```ts
const homepageStressWidths = [
  1440,
  1400, 1399,
  1280, 1279,
  1100, 1099,
  984,
  901, 900,
  801, 800,
  768,
  721, 720,
  521, 520,
  481, 480,
  390,
  341, 340,
  320,
] as const
```

At every width prove `scrollWidth <= clientWidth`, all six movements remain present/in order, and the primary movement headings are attached. Retain the existing reduced-motion anchor checks.

- [x] **Step 4: Migrate geometry probes from incidental classes to durable contracts**

Use `[data-home-frame]`, `[data-wild-event]`, `[data-wild-wire]`, `[data-wild-cache]`, `[data-wild-replay]`, `[data-wild-state]`, and `[data-wild-reading-card]` in `homepage.spec.ts`. Preserve the existing numerical geometry assertions: editorial frame width/left edge, wire-to-cache termination, copy/proof ordering, and state relationship at the same regimes.

- [x] **Step 5: Add route-laziness proof for the homepage itself**

In `homepage.spec.ts`, use a fresh page/context request log:

```ts
const requested: string[] = []
page.on('request', (request) => requested.push(request.url()))
await page.goto('./about')
expect(requested.some((url) => /HomePage-.*\.js/.test(url))).toBe(false)
```

Then open `/` in a fresh page and require the emitted `HomePage-*.js` chunk to be requested. Do not assert Vite hash values.

- [x] **Step 6: Run the pre-migration stress suite against the current Sass implementation**

```powershell
cd src/client
npm test -- --run src/features/home/homepageEdition.test.ts src/features/home/HomepageSections.test.tsx src/features/home/ProjectVisual.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

Expected: all tests pass with the existing screenshots unchanged. If the strengthened test reveals a current product defect, stop that assertion from becoming migration scope and route the defect through the normal design/change decision before changing public output.

- [x] **Step 7: Mark Task 1 complete in this plan**

Change every Task 1 checkbox to `[x]` only after the strengthened contract passes on the untouched visual implementation.

**Commit:** `test: stress the accepted homepage composition`

## Task 2 — Move the true home shell/frame/action grammar out of global Sass

**Files**

- Create `src/client/src/features/home/HomePrimitives.tsx`.
- Create `src/client/src/features/home/HomePrimitives.test.tsx`.
- Modify `src/client/src/components/SiteLayout.tsx`.
- Modify `src/client/src/components/SiteLayout.test.tsx`.
- Modify all homepage movement files to consume only the primitives they actually share.
- Modify `src/client/src/features/home/HomePage.scss` by removing only root/shared primitive selectors after their consumers move.

**Interfaces**

- Consumes: `SiteLayout({ children, surface?: 'home' | 'interior' })`, `SiteFrame`, portfolio theme tokens.
- Produces:

```ts
export const HomeFrame: StyledComponent<'div', ...>
export const HomeEyebrow: StyledComponent<'p', ...>
export const HomeDisplayTitle: StyledComponent<'h1', ...>
export const HomeSectionTitle: StyledComponent<'h2', ...>
export const HomeBody: StyledComponent<'p', ...>
export const HomeRouteActions: StyledComponent<'div', ...>
export const HomeRouteLink: StyledComponent<typeof Link, ...>
export const HomeCtaAnchor: StyledComponent<'a', ...>
export const HomeNextAnchor: StyledComponent<'a', ...>
export const HomeAnchorTarget: StyledComponent<'span', ...>
```

Exact styled-components utility types may be inferred rather than exported explicitly; the component names/HTML semantics above are the contract.

- [x] **Step 1: Write failing shell/primitive tests**

Prove `surface="home"` produces the current mineral background/site-sans surface and a full-width main while `surface="interior"` retains its existing framed behaviour. Prove `HomeFrame` exposes `data-home-frame`, and home actions remain text links rather than filled publication buttons.

```tsx
render(
  <PortfolioThemeProvider>
    <MemoryRouter>
      <SiteLayout surface="home"><HomeFrame>Home frame</HomeFrame></SiteLayout>
    </MemoryRouter>
  </PortfolioThemeProvider>,
)

expect(screen.getByTestId('site-shell')).toHaveAttribute('data-site-surface', 'home')
expect(screen.getByText('Home frame')).toHaveAttribute('data-home-frame')
```

- [x] **Step 2: Put the home surface contract in `SiteLayout`**

Extend the existing `$surface` styled branch instead of styling `.site-shell--home` from the route stylesheet. Preserve current values:

```tsx
const Main = styled(SiteFrame)<{ $surface: SiteSurface }>`
  ${({ $surface }) => $surface === 'home' ? `
    width: 100%;
    max-width: none;
  ` : ''}
`
```

The home `SiteShell` branch must preserve the current equivalent of:

```css
background: var(--color-interior-canvas);
color: #172127;
font-family: var(--font-site-sans);
overflow-x: hidden;
```

Pass `$surface={surface}` to `Main`. Do not change the `SiteLayout` public prop API.

- [x] **Step 3: Create homepage-local frame/type/action primitives with current values**

`HomeFrame` may wrap `SiteFrame`, but must override the homepage's accepted frame transition at `800px`; do not inherit `SiteFrame`'s `46rem` breakpoint as a visual change:

```tsx
export const HomeFrame = styled(SiteFrame).attrs({ 'data-home-frame': true })`
  width: min(76rem, calc(100% - 48px));

  @media (max-width: 800px) {
    width: min(calc(100% - 28px), 76rem);
  }
`
```

Port the exact current `.home-eyebrow`, `.home-display`, `.home-section-title`, `.home-body`, `.home-route-actions`, `.home-cta`, and `.home-next` declarations into named primitives. Use theme font/color tokens where they resolve to the same accepted value; do not substitute a near-equivalent publication primitive.

- [x] **Step 4: Replace only the shared primitive class usage in movement JSX**

During this staged migration, residual movement Sass still contains nested selectors such as `.wild-grid ... .home-section-title`, `.home-article-summary .home-cta`, and `.heist-close .home-next`. Preserve those old class names temporarily as compatibility hooks on the new primitives until the movement that owns the nested selector migrates. They are not stable tests or architecture; Task 10 removes any remaining bridge classes.

Example:

```tsx
<HomeFrame>
  <HomeEyebrow className="home-eyebrow">Agent Asset Marketplace · superpowers-plus</HomeEyebrow>
  <HomeSectionTitle className="home-section-title" id="home-marketplace-title">A strong system, changed by using it.</HomeSectionTitle>
  ...
</HomeFrame>
```

`HomeFrame` may likewise retain `className="home-frame"` while residual movement selectors such as `.opening .home-frame` still exist. Keep each movement's section/grid/composition styling in its current owner/Sass until that movement's task, then remove its compatibility classes together with those selectors.

- [x] **Step 5: Remove only the now-owned shared Sass rules**

Remove the root home shell/main selectors and the primitive declarations they replaced. Keep all movement/grid/breakpoint rules still consumed by unmigrated features. Do not delete `HomePage.scss` yet.

- [x] **Step 6: Verify shared grammar and the full homepage stress contract**

```powershell
cd src/client
npm test -- --run src/components/SiteLayout.test.tsx src/features/home/HomePrimitives.test.tsx src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

Expected: screenshots unchanged.

- [x] **Step 7: Mark Task 2 complete in this plan**

Change every Task 2 checkbox to `[x]` only after tests and visual comparison are green.

**Commit:** `refactor: give the homepage its shared local grammar`

## Task 3 — Give the opening movement local composition ownership

**Files**

- Modify `src/client/src/features/home/HomepageOpening.tsx`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx`.
- Remove opening-only selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `HomeFrame`, `HomeEyebrow`, `HomeDisplayTitle`, `HomeCtaAnchor`.
- Produces: `HomepageOpening(): ReactElement` with unchanged `data-home-movement="opening"`, `data-visual-contract="homepage-opening"`, heading ID/name, proof-list semantics, and `#marketplace` CTA.

- [x] **Step 1: Add opening structure assertions before moving styles**

Prove the `Professional proof` list has four items, H1 text/ID remain unchanged, and the movement contains one `data-home-frame`.

```tsx
const proof = screen.getByRole('list', { name: 'Professional proof' })
expect(within(proof).getAllByRole('listitem')).toHaveLength(4)
expect(screen.getByRole('link', { name: 'See the work ↓' })).toHaveAttribute('href', '#marketplace')
```

- [x] **Step 2: Translate opening layout into local named styled pieces**

Define `OpeningMovement`, `OpeningGrid`, `OpeningTitle`, and `OpeningProof` in `HomepageOpening.tsx`. Port the exact current min-height, align-items, 12-column grid, 7/5 split, proof rule/list spacing, and `800`/`480` responsive behaviour from the opening selector block in `HomePage.scss`.

```tsx
const OpeningMovement = styled.section`
  position: relative;
  min-height: calc(100svh - 86px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(23 33 39 / 22%);

  @media (max-width: 800px) { min-height: auto; }
`
```

Keep the exact current padding/type values by moving them from Sass rather than re-tuning them.

- [x] **Step 3: Remove opening-only Sass selectors**

Remove `.opening`, `.opening-grid`, `.opening-title`, `.opening-proof` and their responsive descendants only after the component renders through local styled ownership. At the same time remove opening-only compatibility classNames that no longer have another consumer; keep `data-home-frame` as the test contract.

- [x] **Step 4: Verify opening at stress widths and unchanged snapshot**

```powershell
cd src/client
npm test -- --run src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "editorial order|breakpoint edges|editorial frame"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

- [x] **Step 5: Mark Task 3 complete in this plan**

Change every Task 3 checkbox to `[x]` after the opening screenshot remains unchanged.

**Commit:** `refactor: give the homepage opening local composition ownership`

## Task 4 — Give Marketplace local composition ownership

**Files**

- Modify `src/client/src/features/home/MarketplaceFeature.tsx`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx` as needed for semantic proof.
- Remove Marketplace-only selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `HomeAnchorTarget`, `HomeEyebrow`, `HomeSectionTitle`, `HomeBody`, `HomeRouteActions`, `HomeRouteLink`, `HomeNextAnchor`, `homepageAssetPath`.
- Produces: `MarketplaceFeature(): ReactElement` with unchanged `#marketplace` anchor, `/writing/use-superpowers` route, `#wild-bunch` continuation, and three responsive SVG sources.

- [x] **Step 1: Characterise asset/source and route ownership in unit tests**

Prove the Marketplace picture keeps `480px` narrow and `900px` intermediate source media and the same accessible `img` alt text; keep route/continuation assertions.

- [x] **Step 2: Replace the global overlap recipe with named local pieces**

Define `MarketplaceMovement`, `MarketplaceGrid`, `MarketplaceCopy`, `MarketplaceVisual`, and `MarketplaceAsset`. Port the exact current full-bleed 12-column overlap, copy substrate, rotated art transforms, and the `<=800`/`<=480` source-order choreography.

```tsx
const MarketplaceGrid = styled(HomeFrame)`
  position: relative;
  width: 100%;
  max-width: none;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0;
`
```

Do not replace the movement with a generic project card or generic two-column feature.

- [x] **Step 3: Remove Marketplace Sass only after local ownership is complete**

Remove `.home-project` rules only where no later movement still needs them; otherwise leave the shared residue until its last consumer migrates. Remove `.marketplace-movement`, `.market-grid`, `.market-asset`, and Marketplace-specific responsive descendants in this task. Remove Marketplace compatibility classNames whose last Sass consumer disappeared in the same patch.

- [x] **Step 4: Run focused stress/browser proof**

```powershell
cd src/client
npm test -- --run src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "editorial order|breakpoint edges"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

The protected homepage snapshot test includes neighbouring movement geometry; any diff is a migration defect unless independently approved.

- [x] **Step 5: Mark Task 4 complete in this plan**

Change every Task 4 checkbox to `[x]` only after the stress matrix is green.

**Commit:** `refactor: give Marketplace homepage composition ownership`

## Task 5 — Extract and migrate the Wild Bunch proof without flattening its topology

**Files**

- Modify `src/client/src/features/home/WildBunchFeature.tsx`.
- Create `src/client/src/features/home/WildBunchProof.tsx`.
- Create `src/client/src/features/home/WildBunchProof.styles.ts`.
- Create `src/client/src/features/home/WildBunchProof.test.tsx`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx`.
- Modify `src/client/e2e/homepage.spec.ts` only if stable-hook names need final alignment.
- Remove Wild-Bunch-only selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `WildBunchFeature({ nextFeature: WritingHomepageFeature })`, `homepageAssetPath`, homepage action/type primitives.
- Produces:

```ts
export type WildBunchEvent = readonly [metadata: string, name: string]

export type WildBunchProofProps = {
  events: readonly WildBunchEvent[]
  stateNodes: readonly string[]
}

export function WildBunchProof(props: WildBunchProofProps): ReactElement
```

- Parent ownership: keep the six event descriptors and state-node labels in `WildBunchFeature.tsx` and pass them explicitly to `WildBunchProof`.
- Local proof ownership: texture asset paths, proof-only decorative wires, and cache/replay/state layout remain inside the proof component/styles.

- [ ] **Step 1: Write focused proof tests against the current semantic contract**

```tsx
render(<WildBunchProof events={eventsFixture} stateNodes={stateFixture} />)
expect(screen.getByRole('heading', { name: 'Immutable event history' })).toBeVisible()
expect(screen.getByRole('heading', { name: 'Cache' })).toBeVisible()
expect(screen.getByRole('heading', { name: 'Replay' })).toBeVisible()
expect(screen.getByRole('heading', { name: 'State' })).toBeVisible()
expect(container.querySelectorAll('[data-wild-event]')).toHaveLength(6)
expect(container.querySelector('[data-wild-proof]')).toHaveAttribute(
  'data-topology',
  'events-cache-state;history-replay-cache-state',
)
```

Also prove event order and state-node label order match the parent-provided arrays.

- [ ] **Step 2: Extract the semantic proof component before changing geometry**

Move the current `figure` subtree into `WildBunchProof.tsx`. Keep the movement heading/copy/route actions in `WildBunchFeature`. Do not introduce state/effects; the proof is deterministic render output from props.

- [ ] **Step 3: Port the Wild Bunch topology CSS into owned styled pieces**

`WildBunchProof.styles.ts` must contain named styled nodes for history, event list/event, live wire, history sweep, cache, replay, state, state texture, and connector flows. Preserve the current container-query units, exact proof aspect ratios, and all four authored layout regimes:

```text
>=1400
1280..1399
901..1279
721..900
<=720
<=340 reading-card pressure adjustment
```

Do not normalise these into a single generic breakpoint because the proof changes topology.

- [ ] **Step 4: Give the Wild Bunch movement itself local composition ownership**

In `WildBunchFeature.tsx`, own the eyebrow/copy/proof rail and `WildReadingCard` layout. Preserve `display: contents` regimes where they are necessary to the accepted source-order-to-grid relationship; do not use DOM reordering.

- [ ] **Step 5: Remove all Wild Bunch Sass selectors and private class-only hooks**

After local ownership is green, remove `.wild-*`, `.home-wild-*`, and Wild-specific `.home-project-*` rules from `HomePage.scss`. Remove classNames that no longer serve styling or another legitimate behaviour contract; keep the durable `data-*` hooks.

- [ ] **Step 6: Run the proof unit suite and the full Wild Bunch geometry stress test**

```powershell
cd src/client
npm test -- --run src/features/home/WildBunchProof.test.tsx src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "Wild Bunch|breakpoint edges|editorial frame"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

Expected: both `homepage-wild-bunch-wide.png` and `homepage-wild-bunch-portrait.png` remain unchanged.

- [ ] **Step 7: Mark Task 5 complete in this plan**

Change every Task 5 checkbox to `[x]` only after all Wild Bunch geometry and screenshots are green.

**Commit:** `refactor: give Wild Bunch homepage proof local ownership`

## Task 6 — Give the Writing movement local editorial ownership

**Files**

- Modify `src/client/src/features/home/WritingFeature.tsx`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx` only for durable structure assertions.
- Remove Writing-only selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `WritingHomepageFeature`, `PatchHomepageFeature`, `HomeFrame`, `HomeEyebrow`, `HomeRouteActions`, `HomeRouteLink`, `HomeNextAnchor`, `HomeAnchorTarget`.
- Produces: unchanged `WritingFeature({ feature, nextFeature })` with Source Serif 4 title/summary treatment and destination-owned continuation.

- [ ] **Step 1: Strengthen Writing ownership tests**

Prove the title comes from `feature.title`, the inward route comes from `feature.to`, and continuation text/href comes from `nextFeature.incomingTeaser`/`nextFeature.anchorId`.

- [ ] **Step 2: Port the Writing fold to local styled-components**

Define `WritingMovement`, `WritingGrid`, `WritingLabel`, `WritingTitle`, and `WritingSummary`. Preserve the current 12-column positions, `clamp(58px, 7.4vw, 104px)` title, Source Serif 4 register, summary rail, `<=800`, `521..800`, and `<=480` behaviour exactly.

- [ ] **Step 3: Remove Writing Sass and run stress proof**

Remove Writing-specific compatibility classNames in the same patch as their last Sass selectors, then run:

```powershell
cd src/client
npm test -- --run src/features/home/homepageEdition.test.ts src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "editorial order|breakpoint edges|editorial frame"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

- [ ] **Step 4: Mark Task 6 complete in this plan**

Change every Task 6 checkbox to `[x]` only after destination-owned teaser tests and homepage visual proof remain green.

**Commit:** `refactor: give the homepage writing fold local ownership`

## Task 7 — Give the Professional Close local conversion ownership

**Files**

- Modify `src/client/src/features/home/ProfessionalClose.tsx`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx`.
- Remove Professional-Close-only selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `HomeFrame`, `HomeEyebrow`, React Router `Link`.
- Produces: `ProfessionalClose` with `id="contact"`, unchanged heading/copy, and routes `/contact`, `/cv`, `/about`.

- [ ] **Step 1: Add explicit close-route semantics**

```tsx
expect(screen.getByRole('link', { name: 'Tell me about it →' })).toHaveAttribute('href', '/contact')
expect(screen.getByRole('link', { name: 'Read my CV →' })).toHaveAttribute('href', '/cv')
expect(screen.getByRole('link', { name: 'About me →' })).toHaveAttribute('href', '/about')
```

- [ ] **Step 2: Port the close's two-rail composition locally**

Define `ProfessionalCloseMovement`, `ProfessionalCloseGrid`, `ProfessionalCloseCopy`, `ProfessionalCloseActions`, and `ProfessionalActionRow`. Preserve the current 7/4 column relationship, top rule, heading clamp, wrap behaviour, `<=800` stack, and no bottom border.

- [ ] **Step 3: Remove close Sass and verify anchors/frame**

Remove Professional-Close compatibility classNames in the same patch as their last Sass selectors, then run:

```powershell
cd src/client
npm test -- --run src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "editorial order|breakpoint edges|editorial frame|semantic content"
```

- [ ] **Step 4: Mark Task 7 complete in this plan**

Change every Task 7 checkbox to `[x]` after the close retains its accepted conversion and frame relationship.

**Commit:** `refactor: give the homepage close local ownership`

## Task 8 — Preserve the Patch presentation seam while migrating Tournament and Specialists

**Files**

- Modify `src/client/src/features/home/PatchHomepageSlot.tsx`.
- Create `src/client/src/features/home/TournamentPatchFeature.tsx`.
- Modify `src/client/src/features/home/SpecialistsPatchFeature.tsx`.
- Create `src/client/src/features/home/SpecialistsPatchFeature.styles.ts`.
- Modify `src/client/src/features/home/HomepageSections.test.tsx`.
- Modify `src/client/e2e/homepage.spec.ts` only for stable Patch hooks.
- Modify `src/client/e2e/visual-regression.spec.ts` only to replace `.patch-marque` snapshot location with `data-patch-series-lockup`; do not update image files.
- Remove Patch-homepage selectors from `src/client/src/features/home/HomePage.scss`.

**Interfaces**

- Consumes: `PatchHomepageFeature`, `PatchSeriesLockup`, `UsualSpecialistsWordmark`, `homepageAssetPath`.
- Produces:

```ts
type PatchPresentation = ComponentType<{ feature: PatchHomepageFeature }>

export const patchHomepagePresentations: Record<
  PatchHomepageFeature['presentation'],
  PatchPresentation
>
```

`PatchHomepageSlot({ feature })` remains unchanged. `SpecialistsPatchFeature({ feature })` retains its local `mediaFailed` boolean and `failMedia` transition.

- [ ] **Step 1: Strengthen registry and failure-state tests before migration**

Keep the existing tournament-vs-Specialists registry assertion. Add explicit tests that Specialists renders the canonical series lockup/wordmark, `data-zero-flow-overprint="true"`, and fallback copy after an owned media error without changing the selected edition.

- [ ] **Step 2: Extract the tournament presentation from the registry module**

Move the existing local `TournamentPatchFeature` into `TournamentPatchFeature.tsx`. It may consume shared home primitives but owns its section/frame/layout. `PatchHomepageSlot.tsx` should become registry + selection only.

- [ ] **Step 3: Name the Specialists composition pieces while keeping state local**

`SpecialistsPatchFeature.styles.ts` should expose named styled pieces used by the parent, including substrate, substrate edge/fill, heist movement, hero composition/plate, title field, series lockup wrapper, wordmark title, close, detail frame/crop variants, overprint, and media fallback.

The parent remains structurally readable:

```tsx
export function SpecialistsPatchFeature({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  const [mediaFailed, setMediaFailed] = useState(false)
  const failMedia = (): void => setMediaFailed(true)

  return (
    <SpecialistsMovement $mediaFailed={mediaFailed} ...>
      <SpecialistsSubstrate ... />
      <HeistMovement>
        <HeroComposition ... />
        <TitleField ... />
        <DetailEvidence ... />
        <MediaFallback>Completed recruitment folder...</MediaFallback>
      </HeistMovement>
    </SpecialistsMovement>
  )
}
```

Do not convert `mediaFailed` into a global class recipe. Pass `$mediaFailed` only to the styled owners that need it.

- [ ] **Step 4: Port exact Specialists art direction and breakpoint regimes**

Preserve the existing project-earned colours, tear widths/reveals, absolute wide composition, `<=1099` grid reflow, `<=520` narrow composition, and the media-off fallback layout exactly. Preserve the overprint's absolute zero-flow relationship to the hero composition.

- [ ] **Step 5: Replace visual-test class hooks with stable Patch contracts**

Add `data-patch-series-lockup` to the lockup wrapper and use it for the existing lockup screenshots. Keep `data-zero-flow-overprint`, `data-patch-presentation`, and `data-visual-contract="homepage-specialists"`.

- [ ] **Step 6: Remove Patch homepage Sass and run failure/geometry/visual proof**

Remove Patch-homepage compatibility classNames only when their last Sass selector has moved to the named styled owner, then run:

```powershell
cd src/client
npm test -- --run src/features/home/homepageEdition.test.ts src/features/home/HomepageSections.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts --grep "Specialists|semantic content|breakpoint edges|editorial order"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

Expected: Specialists wide/lockup wide/lockup portrait screenshots remain unchanged; media-abort fallback remains visible and usable.

- [ ] **Step 7: Mark Task 8 complete in this plan**

Change every Task 8 checkbox to `[x]` only after both presentation values remain supported and Specialists failure state is green.

**Commit:** `refactor: give Patch homepage presentations local ownership`

## Task 9 — Retire `ProjectVisual.scss` without moving or eagerly loading `ProjectVisual`

**Files**

- Modify `src/client/src/features/home/ProjectVisual.tsx`.
- Create `src/client/src/features/home/ProjectVisual.styles.ts`.
- Modify `src/client/src/features/home/ProjectVisual.test.tsx`.
- Delete `src/client/src/features/home/ProjectVisual.scss` after migration.
- Modify `src/client/e2e/project-story.spec.ts` only to strengthen lazy-chunk proof if current coverage does not prove the final import boundary.
- Do not move the `ProjectVisual.tsx` module path in this slice.

**Interfaces**

- Consumes/produces unchanged:

```ts
export type ProjectVisualSlug =
  | 'codex-marketplace'
  | 'agentic-learning-lab'
  | 'adventures-of-patch'
  | 'wild-bunch'
  | 'agentic-engineering-vs-vibe-coding'
  | 'i-made-agentic-engineering-harder-than-it-needed-to-be'

type ProjectVisualProps = {
  slug: ProjectVisualSlug
  eager?: boolean
  placement?: 'preview' | 'index' | 'case-study-hero'
}

export function ProjectVisual(props: ProjectVisualProps): ReactElement
```

- `ProjectIndexPage` may continue its direct route-local import.
- `ContentPage` must continue `lazy(async () => import('../features/home/ProjectVisual'))` and must not receive an eager import through another module.

- [ ] **Step 1: Replace class-based unit expectations with contract/behaviour expectations**

For Wild Bunch index and Patch index placements, assert `data-visual-contract`, accessible labels, picture/source count, and computed layout outcomes rather than `toHaveClass('project-visual--...')` where the class is only a Sass hook.

- [ ] **Step 2: Port the stylesheet to named styled wrappers**

Create named components for Wild Bunch preview/concept, Learning Lab visual, Patch visual/index/case-study placement, captions, Marketplace diagram, and essay/diagram visual treatments. Preserve the exact `45rem`, `44rem`, `56rem`, and `64rem` media decisions currently in `ProjectVisual.scss`.

Where placement changes styling, use typed transient props such as `$placement: 'preview' | 'index' | 'case-study-hero'`; do not rebuild modifier class strings.

- [ ] **Step 3: Remove the Sass import and delete `ProjectVisual.scss`**

`ProjectVisual.tsx` should import only `ProjectVisual.styles.ts` plus current feature dependencies. Do not create a shared eager barrel.

- [ ] **Step 4: Prove non-home visual semantics and direct-route chunk isolation**

```powershell
cd src/client
npm test -- --run src/features/home/ProjectVisual.test.tsx src/pages/ContentPage.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts --grep "ProjectVisual|first-paint geometry|header reserves"
```

The existing `**/*ProjectVisual-*.js` delayed-load tests must still intercept a real requested chunk on direct project routes. Project detail routes must not render a visible unstyled first state or collapse reserved header geometry while that chunk is pending.

- [ ] **Step 5: Mark Task 9 complete in this plan**

Change every Task 9 checkbox to `[x]` only after `ProjectVisual.scss` is gone and lazy direct-route proof remains green.

**Commit:** `refactor: give ProjectVisual local styled ownership`

## Task 10 — Delete `HomePage.scss`, clean selector residue, and prove the complete one-homepage contract

**Files**

- Modify `src/client/src/pages/HomePage.tsx` to remove the final `HomePage.scss` import.
- Delete `src/client/src/features/home/HomePage.scss`.
- Modify homepage feature files only to remove now-meaningless classNames left after Sass retirement.
- Modify `src/client/src/features/home/HomepageSections.test.tsx` and `src/client/e2e/homepage.spec.ts` only where final class retirement requires stable semantic/data selectors.
- Modify `src/client/e2e/visual-regression.spec.ts` only for stable locator cleanup; do not update accepted homepage snapshots.

**Interfaces**

- `HomePage()` remains the same six-component orchestration:

```tsx
<SiteLayout surface="home">
  <DocumentMetadata ... />
  <HomepageOpening />
  <MarketplaceFeature />
  <WildBunchFeature nextFeature={edition.writing} />
  <WritingFeature feature={edition.writing} nextFeature={edition.patch} />
  <PatchHomepageSlot feature={edition.patch} />
  <ProfessionalClose />
</SiteLayout>
```

- [ ] **Step 1: Prove both retired Sass surfaces have no live consumers**

From repo root:

```powershell
rg -n "HomePage\.scss|ProjectVisual\.scss" src/client
rg -n "home-wild-event|home-wild-live-wire|wild-reading-card|wild-proof-cache|wild-proof-replay|wild-proof-state|patch-marque" src/client/src src/client/e2e
```

Interpretation: no Sass import remains. Any old class-name match must have a legitimate remaining runtime purpose; otherwise remove it and use the stable `data-*` contract already established in Task 1/8.

- [ ] **Step 2: Delete `HomePage.scss` and its import only after the residue search is understood**

Do not delete first and repair missing styles by eye. Every selector family must already have an owning styled component.

- [ ] **Step 3: Run the complete focused Slice G unit set**

```powershell
cd src/client
npm test -- --run src/components/SiteLayout.test.tsx src/features/home/HomePrimitives.test.tsx src/features/home/homepageEdition.test.ts src/features/home/HomepageSections.test.tsx src/features/home/WildBunchProof.test.tsx src/features/home/ProjectVisual.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx
```

- [ ] **Step 4: Run the complete homepage stress browser suite**

```powershell
npm run test:e2e -- e2e/homepage.spec.ts
npm run test:e2e -- e2e/project-story.spec.ts --grep "ProjectVisual|first-paint geometry|header reserves"
```

Require all breakpoint-edge width checks, reduced motion, anchors, frame geometry, Wild Bunch connector geometry, media-failure fallback, keyboard/focus behaviour, homepage route-laziness, and ProjectVisual direct-route isolation to pass.

- [ ] **Step 5: Run the protected homepage visual test twice without update**

On Windows:

```powershell
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
npm run test:e2e:visual -- --grep "homepage keeps its authored opening"
```

Both runs must pass against the existing files. A diff is a migration defect by default; do not run `--update-snapshots` to make this task green.

- [ ] **Step 6: Build and record bundle movement**

```powershell
npm run build
```

Then from repo root inspect emitted files without relying on hashes:

```powershell
$manifest = Get-Content src/client/dist/.vite/manifest.json -Raw | ConvertFrom-Json
$keys = 'index.html', 'src/pages/HomePage.tsx', 'src/features/home/ProjectVisual.tsx'
foreach ($key in $keys) {
  $entry = $manifest.$key
  $js = if ($entry.file) { (Get-Item (Join-Path 'src/client/dist' $entry.file)).Length } else { 0 }
  $css = 0
  foreach ($cssFile in @($entry.css)) { $css += (Get-Item (Join-Path 'src/client/dist' $cssFile)).Length }
  Write-Output "$key`tJS=$js`tCSS=$css"
}
```

Compare against the pre-Slice-G numbers in this plan. Entry hard budgets must remain green. Explain route-chunk CSS-to-JS movement in the task return; do not accept an unexplained large increase merely because the hard entry ceiling still passes.

- [ ] **Step 7: Perform manual rendered stress acceptance**

In a real desktop browser using the production build/preview, inspect `/` at:

- `1440` CSS px.
- `768` CSS px.
- `390` CSS px.
- `320` CSS px.
- actual browser `200%` zoom from a normal desktop viewport.
- keyboard-only traversal.
- reduced-motion preference.

At minimum verify:

1. Six movements remain in the accepted order and none visually collapses into generic house furniture.
2. Opening first fold and proof rail retain hierarchy.
3. Marketplace art/copy overlap and narrow asset choreography remain authored rather than clipped/happenstance.
4. Wild Bunch event/cache/replay/state topology reads correctly in every responsive regime and connector arrows terminate on the intended nodes.
5. Writing retains the deliberately different serif editorial register.
6. Specialists retains the series mark, wordmark, folder/evidence choreography, overprint, and lawful media-failure fallback.
7. Professional Close remains a calm conversion fold with all three routes usable.
8. No horizontal overflow at minimum width or 200% zoom.
9. Focus remains visible and reading/focus order follows source order.
10. No visible unstyled first state or layout shift appears on direct load.

- [ ] **Step 8: Apply/check repo mesh only through its owner command if plan/file references made it stale**

From repo root:

```powershell
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
git diff --check
```

Do not hand-edit generated `INDEX.md` files.

- [ ] **Step 9: Mark Task 10 complete in this plan**

Change every Task 10 checkbox to `[x]` only after unit, browser, visual, bundle, manual zoom, mesh, and whitespace proof are complete.

**Commit:** `refactor: retire homepage Sass ownership`

## Task 11 — Final Slice G validation and closeout

**Files**

- Modify this plan only for final checklist/evidence notes.
- Move this plan to `.agents/plans/completed/2026-09-08-react-composition-slice-g.md` only after implementation is actually complete and the completing-plans lifecycle requires the move.
- Update links to the in-flight plan path through the repository's owner workflow when archiving; do not pre-archive during implementation.

**Interfaces**

- Consumes: the complete Slice G tree from Tasks 0-10.
- Produces: one clean hooked commit state suitable for code review; no weakened budgets, no snapshot laundering, no uncommitted generated drift.

- [ ] **Step 1: Review Slice G against the programme architecture questions**

Record answers in the task return:

1. Meaningful component boundaries: small home-local grammar plus six movement owners; Wild Bunch proof and Patch presentations stay bespoke.
2. Static/structured data: edition descriptors remain in `homepageEdition`; Wild Bunch repeated data is parent-owned and passed explicitly; Specialists media failure is local UI state.
3. State locality: no new lifted/context/reducer state exists without an observed shared transition owner.
4. Props: movement props express real adjacent-destination ownership rather than pass-through plumbing.
5. Effects/hooks/memoization: no new ones exist without an observed synchronisation/reuse/performance need.
6. Parent readability: `HomePage`, `WildBunchFeature`, and `SpecialistsPatchFeature` can be understood from named children/props without reading a global stylesheet.

- [ ] **Step 2: Run final residue searches**

```powershell
rg -n "HomePage\.scss|ProjectVisual\.scss" src/client
rg -n "phase-8-first-edition|incomingTeaser|homepageEditions" src/client/src/features/home
rg -n "Math\.random|setInterval|setTimeout|localStorage|sessionStorage" src/client/src/features/home src/client/src/pages/HomePage.tsx
```

Interpretation:

- No retired Sass import/reference remains.
- Deterministic edition/teaser ownership remains explicit.
- No new homepage rotation/autoplay persistence machinery has appeared.

- [ ] **Step 3: Stage the complete intended tree and commit normally**

Do not manually run full canonical CI immediately before this commit. Stage the complete tree, inspect it, then commit normally so the tracked pre-commit hook validates the staged snapshot:

```powershell
git status --short
git diff --check
git diff --cached --stat
git commit -m "refactor: complete React composition Slice G"
```

If the hook rejects the commit, use its independent-failure report for focused repair, restage, and retry normally. Never use `--no-verify`.

- [ ] **Step 4: Verify the committed worktree is clean**

```powershell
git status --short
git log -1 --oneline
```

Expected: no uncommitted files; final commit exists on `codex/react-composition-slice-g-plan`.

- [ ] **Step 5: Mark Task 11 complete in this plan before its final lifecycle archive commit**

The implementation is not complete until the plan task tracking itself reflects the executed evidence.

## Completion Contract

Slice G is complete only when all of the following are true:

- [ ] The two pre-existing unit flakes are either reproduced and stabilised independently or remain explicitly falsified by repeated focused/full-load proof; they are not misreported as Slice G regressions.
- [ ] `HomePage` remains a six-movement orchestrator in the accepted order.
- [ ] `defaultHomepageEdition` remains deterministic and destination-owned teaser copy remains in descriptors.
- [ ] No autoplay/random/date/cookie/network edition machinery exists.
- [ ] The home shell/frame/type/action grammar is owned by `SiteLayout` plus home-local primitives, without imposing publication-button styling on the homepage.
- [ ] Opening owns its composition locally.
- [ ] Marketplace owns its overlap/art choreography locally.
- [ ] Wild Bunch owns a dedicated typed proof composition with unchanged topology and repeated data order.
- [ ] Writing owns its serif editorial fold locally.
- [ ] Professional Close owns its conversion fold locally.
- [ ] Patch presentation selection remains registry-driven and hidden from `HomePage`.
- [ ] Specialists retains local media-failure state, canonical brand marks, overprint, evidence choreography, and fallback semantics.
- [ ] `ProjectVisual` retains its current module/API and lazy `ContentPage` boundary while owning styles locally.
- [ ] `HomePage.scss` and `ProjectVisual.scss` are deleted with no live imports.
- [ ] Incidental style-only classes are retired where durable semantic/data contracts replace them.
- [ ] Breakpoint-edge stress tests cover the accepted authored cliffs and no horizontal overflow appears.
- [ ] Keyboard, focus, reduced motion, anchor landings, media failure, and actual 200% zoom remain usable.
- [ ] Existing homepage visual baselines pass twice on Windows without snapshot update.
- [ ] HomePage and ProjectVisual route-chunk size movement is measured/explained; hard entry JS/CSS/PDF budgets remain unchanged and green.
- [ ] Homepage and ProjectVisual route/direct-load lazy boundaries remain intact with no visible unstyled first state.
- [ ] Repo mesh/whitespace checks are green and generated indices were not hand-edited.
- [ ] Final commits use the tracked pre-commit hook and the worktree is clean.

## Non-goals

- Do not redesign any homepage movement, reword homepage copy, change current project/article destinations, or revisit the accepted Phase 8 editorial hierarchy.
- Do not merge the six movements into a generic `HomepageFeature` component or generic feature-card system.
- Do not turn Wild Bunch into a universal evidence/diagram primitive.
- Do not turn Specialists/Patch art direction into shared site furniture.
- Do not rehome `ProjectVisual.tsx` to a new feature directory in this slice.
- Do not rewrite project index/case-study compositions while removing `ProjectVisual.scss`; only preserve their current visual behaviour and lazy-load contract.
- Do not consolidate authored breakpoints merely to reduce media-query count.
- Do not replace actual 200% zoom review with a narrow viewport or CDP page-scale proxy.
- Do not update protected homepage snapshots to conceal migration drift.
- Do not raise build budgets or add new dependencies to make the migration convenient.
