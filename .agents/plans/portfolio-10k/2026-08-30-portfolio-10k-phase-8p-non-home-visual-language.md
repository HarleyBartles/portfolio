# Phase 8P Non-Home Visual-Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current AI-convergent non-home presentation with the accepted Working Engineering Record system while leaving `/` unchanged and blocked.

**Architecture:** Keep the current React route and specialist-presentation ownership. Add interior-only semantic tokens and typography beside the protected homepage tokens, pass an explicit `home` or `interior` surface through `SiteLayout`, and let each route derive composition from its content and existing component ownership. Shared code owns the mineral substrate, quiet shell, typography roles, focus/link behaviour, captions and semantic cadence; project files own bounded colour, artifact boundaries and earned interruptions.

**Tech Stack:** React 19, TypeScript 6, React Router 7, Sass, styled-components 6, Fontsource 5.3, Vitest 4, Playwright 1.61, Vite 8.

**Execution Strategy:** `subagent-driven-development` — each task has a separable TDD and review boundary, while source/token producers precede route consumers and the final rendered gate remains sequential and Harley-owned.

## Global Constraints

- Use `/applying-portfolio-visual-language` and `/applying-portfolio-typography` for every implementation and review task.
- The normative authority is `docs/editorial-drafts/phase-8/phase-8p-visual-language-contract.md`; subordinate evidence, rhythm and shell decisions add detail but do not replace it.
- Do not copy structure, panels, column ratios, spacing values, colour fields or component shapes from `phase-8p-integrated-route-proof.html` or the typography specimen.
- Keep `/` visually and behaviourally unchanged. Do not update homepage screenshots. Any homepage diff blocks this plan.
- Keep the cool mineral `#E6EAEB` visibly dominant across non-home routes.
- Use Source Sans 3 for site display, non-article body, navigation, metadata and captions; Source Serif 4 for authored article display/body only; Source Code Pro for code, diffs, command output and machine-readable evidence only.
- Keep meaningful metadata at `14px` or larger. `13px` requires explicit narrow, contrast and 200% proof and is not planned here.
- Keep the masthead to site identity and the existing Projects, Writing, Patch, About and CV navigation flow. Current-route context belongs to the page.
- Keep project colour evidence-owned and bounded. Shared navigation, captions, rules, statuses and recurring components remain neutral.
- Keep artifacts source-native. Do not introduce a universal evidence header/body/footer frame.
- Preserve authoritative deep links/history, top or fragment arrival, Back/Forward restoration, semantic source order, visible focus, link semantics, reduced motion, contrast and missing-media behaviour.
- Do not change public facts, case-study arguments, article prose, career claims, asset provenance or contact behaviour in this phase.
- Windows is canonical for visual-baseline updates. Linux/hosted checks confirm deterministic behaviour but do not replace Windows pixel proof.
- The homepage remains blocked until non-home implementation, rendered browser proof, AI-convergence valuation and Harley acceptance are all recorded.

---

### Task 1: Protect the homepage and introduce an explicit interior surface

**Files:**
- Modify: `src/client/src/components/SiteLayout.tsx`
- Modify: `src/client/src/components/SiteHeader.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/pages/HomePage.tsx`
- Modify: `src/client/src/styles/global.scss`
- Test: `src/client/e2e/homepage.spec.ts`

**Interfaces:**
- Consumes: the existing `SiteLayout` call sites and current homepage visual contracts.
- Produces: `SiteSurface = 'home' | 'interior'`, an explicit `surface` prop on `SiteLayout`, `showName` on `SiteHeader`, and `.site-shell--home` / `.site-shell--interior` scope hooks used by later tasks.

- [x] **Step 1: Write failing component tests for the surface boundary**

Add assertions that an interior layout exposes the interior scope and visible identity, while the home layout preserves the current mark-only header:

```tsx
render(<MemoryRouter><SiteLayout surface="interior"><p>Interior</p></SiteLayout></MemoryRouter>)
expect(document.querySelector('.site-shell--interior')).toBeInTheDocument()
expect(screen.getByText('Harley Bartles')).toBeVisible()

render(<MemoryRouter><SiteLayout surface="home"><p>Home</p></SiteLayout></MemoryRouter>)
expect(document.querySelector('.site-shell--home')).toBeInTheDocument()
expect(screen.queryByText('Harley Bartles')).not.toBeInTheDocument()
```

- [x] **Step 2: Run the focused test and observe RED**

Run from `src/client`:

```powershell
npm test -- --run src/components/SiteLayout.test.tsx
```

Expected: fail because `SiteLayout` has no `surface` prop, scope class or visible-name contract.

- [x] **Step 3: Implement the explicit surface interface**

Use this public shape and keep `interior` as the safe default for error/loading and ordinary non-home routes:

```tsx
export type SiteSurface = 'home' | 'interior'

export function SiteLayout({ children, surface = 'interior' }: {
  children: ReactNode
  surface?: SiteSurface
}): ReactElement {
  return (
    <div className={`site-shell site-shell--${surface}`}>
      <SiteHeader showName={surface === 'interior'} />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  )
}
```

Render `Harley Bartles` inside the existing home link only when `showName` is true. Set `<SiteLayout surface="home">` in `HomePage.tsx`. Add no interior visual rules beyond the scope hooks in this task.

- [x] **Step 4: Prove the boundary and homepage non-regression**

Run from `src/client`:

```powershell
npm test -- --run src/components/SiteLayout.test.tsx
npm run test:e2e -- e2e/homepage.spec.ts
```

Expected: component tests pass; the existing homepage behaviour assertions pass without snapshot updates.

- [x] **Step 5: Mark Task 1 complete and commit**

Mark this task's boxes `[x]`, stage only its files and commit:

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/components/SiteLayout.tsx src/client/src/components/SiteHeader.tsx src/client/src/components/SiteLayout.test.tsx src/client/src/pages/HomePage.tsx src/client/src/styles/global.scss src/client/e2e/homepage.spec.ts
git commit -m "refactor: separate home and interior surfaces"
```

### Task 2: Install the accepted type roles and interior semantic tokens

**Files:**
- Modify: `src/client/package.json`
- Modify: `src/client/package-lock.json`
- Modify: `src/client/src/styles/_fonts.scss`
- Modify: `src/client/src/styles/_tokens.scss`
- Modify: `src/client/src/styles/editorialTheme.ts`
- Modify: `src/client/src/styles/editorialTheme.test.ts`
- Modify: `src/client/src/styles/global.scss`
- Test: `src/client/scripts/css-token-references.test.ts`
- Test: `src/client/e2e/fonts.spec.ts`

**Interfaces:**
- Consumes: `.site-shell--interior` from Task 1 and the accepted typography/substrate contracts.
- Produces: `--color-interior-canvas`, `--font-site-sans`, `--font-article-serif`, `--font-technical`, exact role tokens, and Fontsource dependencies for Source Sans 3 and Source Code Pro. Existing Fraunces/Fira Code tokens remain available only to the protected homepage until Phase 8.

- [x] **Step 1: Write failing semantic-token and font tests**

Extend `editorialTheme.test.ts` with exact CSS-variable references:

```ts
expect(editorialTheme.color.interiorCanvas).toBe('var(--color-interior-canvas)')
expect(editorialTheme.font.siteSans).toBe('var(--font-site-sans)')
expect(editorialTheme.font.articleSerif).toBe('var(--font-article-serif)')
expect(editorialTheme.font.technical).toBe('var(--font-technical)')
```

Extend `fonts.spec.ts` to assert that an interior About heading resolves to Source Sans 3, article body to Source Serif 4, and a genuine code block to Source Code Pro. Keep the existing self-hosted/no-CDN assertions.

- [x] **Step 2: Run focused tests and observe RED**

```powershell
npm test -- --run src/styles/editorialTheme.test.ts scripts/css-token-references.test.ts
npm run test:e2e -- e2e/fonts.spec.ts
```

Expected: fail because Source Sans 3, Source Code Pro and the interior role tokens do not exist in production.

- [x] **Step 3: Add the accepted Fontsource dependencies and faces**

From `src/client` run:

```powershell
npm install @fontsource-variable/source-sans-3@^5.3.0 @fontsource-variable/source-code-pro@^5.3.0
```

Define normal variable faces with `font-display: swap`. Keep Source Serif 4. Do not remove legacy Fraunces/Fira Code while the homepage is protected.

- [x] **Step 4: Add exact interior role tokens and scoped defaults**

Add these semantic values to `_tokens.scss` and mirror them in `editorialTheme.ts`:

```scss
--color-interior-canvas: #e6eaeb;
--font-site-sans: 'Source Sans 3', 'Segoe UI', Arial, sans-serif;
--font-article-serif: 'Source Serif 4', 'Iowan Old Style', Georgia, serif;
--font-technical: 'Source Code Pro', 'Cascadia Code', 'SFMono-Regular', monospace;
--type-site-display-size: clamp(42px, 5.4vw, 72px);
--type-site-display-leading: .98;
--type-site-display-tracking: -.025em;
--type-section-size: 32px;
--type-site-body-size: 18px;
--type-site-body-leading: 1.62;
--type-article-body-size: 19px;
--type-article-body-leading: 1.66;
--type-metadata-size: 14px;
--type-caption-size: 14px;
--type-code-size: 14px;
```

Scope the mineral background and Source Sans base to `.site-shell--interior`. Scope Source Serif to `.content-page--writing` article title/body roles, not generic blockquotes. Scope Source Code Pro only to `code`, `pre`, diffs, command output and explicit machine-readable evidence hooks.

- [x] **Step 5: Prove role mapping, fallback behaviour and homepage isolation**

Run:

```powershell
npm test -- --run src/styles/editorialTheme.test.ts scripts/css-token-references.test.ts
npm run test:e2e -- e2e/fonts.spec.ts e2e/homepage.spec.ts
```

Add a font-blocking case in `fonts.spec.ts` that aborts Source font requests, reloads `/about` and one article, and asserts visible headings/body plus no page-level overflow.

- [ ] **Step 6: Mark Task 2 complete and commit**

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/package.json src/client/package-lock.json src/client/src/styles/_fonts.scss src/client/src/styles/_tokens.scss src/client/src/styles/editorialTheme.ts src/client/src/styles/editorialTheme.test.ts src/client/src/styles/global.scss src/client/scripts/css-token-references.test.ts src/client/e2e/fonts.spec.ts
git commit -m "feat: add interior typography and substrate roles"
```

### Task 3: Implement the accepted quiet shell at desktop, narrow and zoom-proxy widths

**Files:**
- Modify: `src/client/src/components/SiteHeader.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/e2e/narrow-navigation.spec.ts`
- Modify: `src/client/e2e/link-behavior.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: `showName` and interior tokens from Tasks 1-2.
- Produces: one interior identity/navigation flow with visible `Harley Bartles`, neutral active state, natural wrapping and no route-context furniture.

- [x] **Step 1: Write failing shell behaviour assertions**

Add tests that assert:

```ts
await expect(page.locator('.site-shell--interior .site-identity-name')).toHaveText('Harley Bartles')
await expect(page.locator('.site-shell--interior .site-header')).toHaveCount(1)
await expect(page.locator('.site-shell--interior [data-route-context]')).toHaveCount(0)
await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveCount(5)
```

At 195px, keep the existing keyboard-reachability assertion and add page-overflow and visible-name assertions.

- [x] **Step 2: Run shell tests and observe RED**

```powershell
npm test -- --run src/components/SiteLayout.test.tsx
npm run test:e2e -- e2e/narrow-navigation.spec.ts e2e/link-behavior.spec.ts
```

Expected: the new visible-name and interior shell assertions fail.

- [x] **Step 3: Style the single-flow interior shell**

Use Source Sans 3 for navigation at the 14px metadata floor, sentence case, ordinary underline/current-state treatment and visible focus. Keep HB + visible name in one home link. Allow the existing five-link list to wrap; do not add a hamburger, breadcrumb, folio line, route-context row or project colour.

- [x] **Step 4: Prove navigation behaviour and accessibility**

```powershell
npm run test:e2e -- e2e/narrow-navigation.spec.ts e2e/link-behavior.spec.ts e2e/accessibility.spec.ts
```

Expected: focus, links, active route, 195px wrapping and A/AA scans pass; homepage tests remain unchanged.

- [ ] **Step 5: Mark Task 3 complete and commit**

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/components/SiteHeader.tsx src/client/src/components/SiteLayout.test.tsx src/client/src/styles/global.scss src/client/e2e/narrow-navigation.spec.ts src/client/e2e/link-behavior.spec.ts src/client/e2e/accessibility.spec.ts
git commit -m "feat: implement the quiet interior shell"
```

### Task 4: Recompose shared indexes and authored longform without a universal page template

**Files:**
- Modify: `src/client/src/pages/ProjectIndexPage.tsx`
- Modify: `src/client/src/pages/WritingIndexPage.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/components/EditorialIndexCard.tsx`
- Modify: `src/client/src/features/writing/WritingPullQuotes.scss`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/src/pages/ProjectPage.test.tsx`
- Modify: `src/client/src/pages/WritingSurfaces.test.tsx`
- Modify: `src/client/e2e/writing-navigation.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`

**Interfaces:**
- Consumes: interior substrate, typography and shell from Tasks 1-3.
- Produces: Sans project/index hierarchy, quieter Serif article register, 14px metadata, semantic variable cadence and route-owned visual hooks. It does not produce a shared evidence frame or reusable route composition.

- [x] **Step 1: Write failing route-role tests**

Assert exact semantic ownership rather than CSS class snapshots:

```tsx
expect(projectArticle).toHaveAttribute('data-visual-language', 'project')
expect(writingArticle).toHaveAttribute('data-visual-language', 'authored-longform')
expect(screen.getByText(/min read/).closest('.editorial-meta')).toBeInTheDocument()
```

In Playwright assert computed font family/size for project title, article title/body and metadata, plus source-order and no-overflow at `1440`, `768`, `390`, `320` and a `360px` 200%-zoom proxy.

- [x] **Step 2: Run focused route tests and observe RED**

```powershell
npm test -- --run src/pages/ProjectPage.test.tsx src/pages/WritingSurfaces.test.tsx
npm run test:e2e -- e2e/writing-navigation.spec.ts
```

- [x] **Step 3: Apply semantic type and cadence roles**

Add `data-visual-language` to the existing `article` in `ContentPage.tsx`. Keep project/index body in Source Sans. Keep authored article display/body in Source Serif, with article display no larger or louder than the site-display role. Replace uppercase/tracked Mono metadata with sentence-case Source Sans at `14px/1.4/.012em`. Keep pull quotes inside the article's authored register and existing semantic `blockquote` ownership.

Recompose index spacing from content relationships: cluster title, summary, status/date and action; open larger space only between distinct entries/movements. Do not convert every entry to equal cards or copy the integrated proof layout.

- [x] **Step 4: Prove longform and index behaviour**

```powershell
npm test -- --run src/pages/ProjectPage.test.tsx src/pages/WritingSurfaces.test.tsx
npm run test:e2e -- e2e/writing-navigation.spec.ts e2e/accessibility.spec.ts
```

On Windows update only the writing/project-index baselines that intentionally changed:

```powershell
npm run test:e2e:visual -- --update-snapshots --grep "writing index|article header"
```

- [ ] **Step 5: Mark Task 4 complete and commit**

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/pages/ProjectIndexPage.tsx src/client/src/pages/WritingIndexPage.tsx src/client/src/pages/ContentPage.tsx src/client/src/components/EditorialIndexCard.tsx src/client/src/features/writing/WritingPullQuotes.scss src/client/src/styles/global.scss src/client/src/pages/ProjectPage.test.tsx src/client/src/pages/WritingSurfaces.test.tsx src/client/e2e/writing-navigation.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots/writing-peer-list.png src/client/e2e/visual-regression.spec.ts-snapshots/article-mobile-header.png
git commit -m "feat: apply non-home index and longform grammar"
```

### Task 5: Make shared case-study custody semantic without normalising artifacts

**Files:**
- Modify: `src/client/src/features/case-study/CaseStudyBody.tsx`
- Modify: `src/client/src/features/case-study/CaseStudyBody.scss`
- Modify: `src/client/src/features/case-study/CaseStudyEvidence.tsx`
- Modify: `src/client/src/features/case-study/CaseStudyPrimitives.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

**Interfaces:**
- Consumes: Sans/metadata/caption roles and route hooks from Tasks 2 and 4.
- Produces: shared custody semantics for captions, provenance, status and qualification while leaving artifact boundary/style to each project presentation.

- [x] **Step 1: Replace the old shared-frame test with failing custody tests**

Preserve the allowed shared caption semantics but stop asserting one identical visual frame across media. Add:

```tsx
expect(screen.getByRole('link', { name: /Inspect/ })).toHaveAttribute('href')
expect(container.querySelector('[data-evidence-custody="provenance"]')).toBeInTheDocument()
expect(container.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()
```

In `project-story.spec.ts`, replace `sibling case studies share one evidence-caption treatment` with assertions that Wild Bunch, Patch, Marketplace and Learning Lab each retain distinct artifact boundaries while captions remain Source Sans 3 at 14px and adjacent in semantic order.

- [x] **Step 2: Run focused case-study tests and observe RED**

```powershell
npm test -- --run src/features/case-study/CaseStudyPrimitives.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts --grep "custody|caption|artifact"
```

- [x] **Step 3: Implement custody primitives, not an evidence container**

Keep `CaseStudyEvidence` responsible for provenance/status/action semantics only. Add `data-evidence-custody="provenance"` to that semantic seam. Do not add a wrapper that imposes border, background, radius, header/body/footer or colour on child artifacts. In `CaseStudyBody.scss`, define shared caption typography and adjacency; keep media boundary rules out of the shared file.

- [x] **Step 4: Prove source-native evidence and narrow behaviour**

```powershell
npm test -- --run src/features/case-study/CaseStudyPrimitives.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts
```

Expected: every artifact remains recognisably source-native, provenance is unambiguous, genuine code may scroll internally, and the page has no horizontal overflow.

- [ ] **Step 5: Mark Task 5 complete and commit**

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/features/case-study/CaseStudyBody.tsx src/client/src/features/case-study/CaseStudyBody.scss src/client/src/features/case-study/CaseStudyEvidence.tsx src/client/src/features/case-study/CaseStudyPrimitives.test.tsx src/client/e2e/project-story.spec.ts
git commit -m "refactor: make case-study evidence custody semantic"
```

### Task 6: Apply bounded project identity and route-owned composition

**Files:**
- Modify: `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.scss`
- Modify: `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.test.tsx`
- Modify: `src/client/src/features/case-study/patch/PatchPipelineCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/patch/PatchPipelineCaseStudy.scss`
- Modify: `src/client/src/features/case-study/patch/PatchPipelineCaseStudy.test.tsx`
- Modify: `src/client/src/features/case-study/learning-lab/LearningLabCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/learning-lab/LearningLabCaseStudy.scss`
- Modify: `src/client/src/features/case-study/learning-lab/LearningLabCaseStudy.test.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.scss`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: affected Windows snapshots under `src/client/e2e/visual-regression.spec.ts-snapshots/`

**Interfaces:**
- Consumes: shared custody rules from Task 5 and the existing specialist-presentation registry.
- Produces: four independently derived project compositions with artifact-first evidence, relationship-led cadence and no shared composition template. Project-native colour may remain inside artifacts or leave them through an earned finite field; no route is required to manufacture a field.

- [x] **Step 1: Add failing route-specific authority assertions**

For every project, assert the absence of project colour on shared components. When a route lets project colour leave an artifact, give the owning field a specific `data-project-field` value and assert that finite boundary in the route test:

```tsx
expect(container.querySelector('.site-header')).not.toHaveAttribute('data-project-field')
expect(container.querySelector('.content-status')).not.toHaveAttribute('data-project-field')

// Only when this route earns a field:
expect(container.querySelector('[data-project-field="<route-owned-field>"]')).toBeInTheDocument()
```

In Playwright, keep `.site-header`, `.content-status` and shared captions neutral. When a `data-project-field` exists, read computed styles and prove that the field is finite and returns to mineral afterwards. A route with no earned field should not add one to satisfy the test. Keep existing semantic order, media loading and public-evidence assertions.

- [x] **Step 2: Run project tests and observe RED**

```powershell
npm test -- --run src/features/case-study/marketplace/MarketplaceCaseStudy.test.tsx src/features/case-study/patch/PatchPipelineCaseStudy.test.tsx src/features/case-study/learning-lab/LearningLabCaseStudy.test.tsx src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts --grep "Wild Bunch|Patch|Learning Lab|Marketplace"
```

- [x] **Step 3: Derive and implement each route from its own material**

Implement these bounded jobs without sharing their geometry:

- Wild Bunch: earth colour and constructed-world structure around the town/seed evidence; retain the approved sparse tintype density-loss edge only on qualifying images; remove route-wide dark evidence atmosphere and decorative dossier/Mono labels.
- Adventures of Patch: controlled teal only where Patch-owned production evidence carries it; retain source-native art and the database-to-production narrative; do not import mascot geometry or teal title bars into shared components.
- Agent Asset Marketplace: let distribution/custody relationships organise evidence; remove the polished distribution-map composition as a route-wide production grammar.
- Agentic Learning Lab: keep curriculum/experiment semantics in HTML and image evidence source-native; remove universal field-manual framing where it is merely decorative.

For every route, cluster claim + proof + qualification, open space at genuine story movements and use a rail only for a real parallel information stream that collapses into source order.

- [x] **Step 4: Prove project routes at required widths and missing-media state**

```powershell
npm test -- --run src/features/case-study/marketplace/MarketplaceCaseStudy.test.tsx src/features/case-study/patch/PatchPipelineCaseStudy.test.tsx src/features/case-study/learning-lab/LearningLabCaseStudy.test.tsx src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts
```

Add Playwright passes at `1440`, `768`, `390`, `320` and `360` zoom proxy, then hide images and assert the semantic argument remains complete. On Windows, update only the project snapshots named by the existing project-specific visual tests.

- [ ] **Step 5: Mark Task 6 complete and commit**

Stage the four project presentation folders, project browser tests, intentional Windows baselines and this plan. Commit:

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/features/case-study/marketplace src/client/src/features/case-study/patch src/client/src/features/case-study/learning-lab src/client/src/features/case-study/wild-bunch src/client/e2e/project-story.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots
git commit -m "feat: apply evidence-owned project compositions"
```

### Task 6A: Replace the cramped UUID markup with a truthful responsive allocation plate

**Files:**
- Create: `src/client/src/features/case-study/wild-bunch/WildBunchCodecMap.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchDeterminismFigure.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchDeterminismFigure.test.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.scss`

**Interfaces:**
- Consumes: the pinned resolver-v17 field ranges already represented by `WildBunchDeterminismFigure`.
- Produces: one accessible `WildBunchCodecMap` with a canonical UUID, exact 95/33 allocation rail, and bracketed high-to-low field groups that retain readable CSS typography at every width.

- [x] **Step 1: Extend the focused test around the truthful diagram contract**

Assert one labelled image, the canonical UUID, explicit right-end packing, and all eleven individually bracketed sample values in high-to-low bit order.

- [x] **Step 2: Run the focused test and observe RED**

Run `npm test -- --run src/features/case-study/wild-bunch/WildBunchDeterminismFigure.test.tsx`; expect failure because the current markup groups all assigned bits into one misleading substring.

- [x] **Step 3: Implement the shared-data responsive allocation plate**

Keep the exact allocation rail proportional. Do not claim that field boundaries align to hexadecimal characters. Use semantic HTML and container-responsive CSS so the grouped fields reflow without shrinking their typography; give this page-specific technical plate a restrained 105% breakout only in the two-column composition.

- [x] **Step 4: Prove semantics, build output and rendered breakpoints**

Run the focused Vitest file and `npm run build`. Inspect `1440 × 1100`, `934 × 459`, `390 × 844`, `360 × 844` and `320 × 844`; require no page overflow and readable association between every bracketed value and its field label.

- [ ] **Step 5: Hold for Harley's rendered acceptance**

Do not make a separate commit while the Phase 8P visual review is active. Fold the accepted plate and its proof into Task 6 and the final normal-hook commit.

### Task 7: Apply the interior system to Patch stories, About and CV

**Files:**
- Modify: `src/client/src/features/patch-showcase/PatchShowcase.scss`
- Modify: `src/client/src/features/patch-showcase/LawfulHeistPage.scss`
- Modify: `src/client/src/features/patch-showcase/LawfulHeistPage.test.tsx`
- Modify: `src/client/src/features/patch-showcase/TournamentPage.test.tsx`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/pages/AboutPage.scss`
- Modify: `src/client/src/pages/about/ProfessionalSurface.tsx`
- Modify: `src/client/src/pages/CvPage.scss`
- Modify: `src/client/src/pages/CvPage.test.tsx`
- Modify: `src/client/e2e/about-layout.spec.ts`
- Modify: `src/client/e2e/about.spec.ts`
- Modify: `src/client/e2e/cv-layout.spec.ts`
- Modify: `src/client/e2e/cv.spec.ts`
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: affected Windows snapshots under `src/client/e2e/visual-regression.spec.ts-snapshots/`

**Interfaces:**
- Consumes: interior type/shell/cadence and project-colour limits from Tasks 2-6.
- Produces: Sans-only About/CV, one earned chronology rail, and Patch story routes whose expressive imagery remains project-owned without becoming the house system.

- [x] **Step 1: Write failing professional and Patch-route assertions**

Add About/CV assertions for Source Sans title/body/metadata, one chronology rail, no Serif quotation and source-order collapse:

```tsx
expect(screen.getByText('No source capture, no success.').closest('blockquote')).toHaveAttribute('data-type-register', 'site-sans')
expect(container.querySelectorAll('[data-professional-rail="chronology"]')).toHaveLength(1)
expect(container.querySelector('[data-type-register="article-serif"]')).not.toBeInTheDocument()
```

For Patch stories, preserve existing semantic event/recruitment order and add no-universal-frame and narrow-overflow assertions.

- [x] **Step 2: Run focused tests and observe RED**

```powershell
npm test -- --run src/pages/CvPage.test.tsx src/features/patch-showcase/LawfulHeistPage.test.tsx src/features/patch-showcase/TournamentPage.test.tsx
npm run test:e2e -- e2e/about-layout.spec.ts e2e/about.spec.ts e2e/cv-layout.spec.ts e2e/cv.spec.ts
```

- [x] **Step 3: Implement professional and Patch route grammar**

Keep About and CV on mineral with Source Sans 3 throughout. Use the current `ProfessionalStoryRail` only for dates/state/context that remains useful beside the narrative; add `data-professional-rail="chronology"` and collapse it before its related content on narrow screens. Keep the production-invariant quotation in Sans. Remove paper retreat, prestige Serif, decorative Mono metadata, quotation furniture and repeated dossier rules.

For Tournament and Lawful Heist, keep real source imagery, narrative order and the accepted project-specific scale/overlap decisions. Replace any route-wide warm-paper/rounded-panel/tracked-label house resemblance with the interior mineral ground and project-owned local treatments. Do not make Patch styling a shared template.

- [x] **Step 4: Prove professional and Patch routes**

```powershell
npm test -- --run src/pages/CvPage.test.tsx src/features/patch-showcase/LawfulHeistPage.test.tsx src/features/patch-showcase/TournamentPage.test.tsx
npm run test:e2e -- e2e/about-layout.spec.ts e2e/about.spec.ts e2e/cv-layout.spec.ts e2e/cv.spec.ts e2e/project-story.spec.ts e2e/accessibility.spec.ts
```

Update the existing About/CV/Patch Windows baselines only after inspecting the rendered changes at `1440`, `390`, `320` and `360` zoom proxy.

- [ ] **Step 5: Mark Task 7 complete and commit**

```powershell
git add .agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md src/client/src/features/patch-showcase src/client/src/pages/AboutPage.tsx src/client/src/pages/AboutPage.scss src/client/src/pages/about/ProfessionalSurface.tsx src/client/src/pages/CvPage.scss src/client/src/pages/CvPage.test.tsx src/client/e2e/about-layout.spec.ts src/client/e2e/about.spec.ts src/client/e2e/cv-layout.spec.ts src/client/e2e/cv.spec.ts src/client/e2e/project-story.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots
git commit -m "feat: apply the interior system to professional and Patch routes"
```

### Task 7A: Close site-wide image alternative-text coverage

**Files:**
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: `docs/editorial-drafts/phase-8/phase-8p-non-home-implementation-proof.md`

**Interfaces:**
- Consumes: the generated public-route catalogue and the existing content/decorative distinction at every production `<img>` seam.
- Produces: WCAG 2.2 SC 1.1.1 regression proof across every canonical public route, including every homepage feature state, while preserving deliberate empty alternatives for the linked HB mark and repeated Marketplace plugin icons.

- [x] **Step 1: Audit the source and rendered contracts**

Inventory direct JSX images, Markdown-authored images and responsive `<picture>` seams. Require descriptive alternatives for content images and empty alternatives only where the same accessible name or adjacent text already carries the information.

- [x] **Step 2: Add a generated-route regression guard**

Drive Playwright from `route-metadata.generated.json`. Fail when an image omits `alt`, when a non-decorative image has blank alternative text, or when an explicitly decorative image starts announcing duplicated prose. Cycle through every homepage feature rather than checking only its initial state.

- [x] **Step 3: Prove the rendered route inventory**

Run `npm run test:e2e -- e2e/accessibility.spec.ts --grep "site-wide image alternatives"`. Record the exact route count and outcome in the Phase 8P implementation proof. Do not make a separate commit while the final visual review remains active.

### Task 8: Record rendered proof, run the valuation gate and stop at Harley acceptance

**Files:**
- Create: `docs/editorial-drafts/phase-8/phase-8p-non-home-implementation-proof.md`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: affected Windows snapshots under `src/client/e2e/visual-regression.spec.ts-snapshots/`
- Modify: `.agents/plans/portfolio-10k/2026-08-30-portfolio-10k-phase-8p-non-home-visual-language.md`
- Modify: generated `INDEX.md` files only through `py -3 tools/run.py mesh --apply`

**Interfaces:**
- Consumes: completed Tasks 1-7 and their focused proof.
- Produces: durable before/after custody, exact route/viewport evidence, AI-convergence judgment, canonical validation and an explicit Harley `Accepted` or `Blocked` result. It does not unlock or modify `/` by itself.

- [x] **Step 1: Add the final failing visual-coverage assertion**

Add one data-driven Playwright inventory covering the representative families and widths:

```ts
const nonHomeProof = [
  { path: './projects/wild-bunch', contract: 'wild-bunch-case-study-hero' },
  { path: './writing/why-adrs', contract: 'decision-memory' },
  { path: './about', contract: 'about-current-work' },
]
```

For each route assert visible focus, no page overflow, expected type register and stable semantic source order at `1440 × 1100`, `390 × 844`, `320 × 844` and `360 × 844` zoom proxy. This automated proxy supplies repeatable reflow pressure; it does not prove actual browser zoom. Use the existing `decision-memory` hook from `writingPresentations.ts`; do not add a proof-only production hook.

- [x] **Step 2: Run the final visual test before updating proof and observe any missing coverage**

```powershell
npm run test:e2e:visual
```

Expected: fail only for intentional visual changes or an uncovered representative hook. Any behavioural, accessibility, overflow or homepage failure returns to the owning task.

- [x] **Step 3: Create the durable implementation-proof record**

Record exact branch/head, changed route families, source-owned assets, before-state commit, each implementation commit, Windows screenshot names, desktop/narrow/zoom-proxy conditions, the browser used for the separate actual 200% zoom pass, missing-media checks, accessibility results, rejected shortcuts and the AI-convergence assessment. Use these exact status fields:

```markdown
## Valuation gate

- Credible AI-default resemblance found: Pending rendered review
- Automatic 50% penalty triggered: Pending rendered review
- Evidence and rationale: Pending comparison of the rendered non-home routes with the contract's named AI-default cluster and the accepted Working Engineering Record provenance.

## Harley acceptance

- Status: Pending
- Reviewed routes and viewports: `/projects/wild-bunch`, `/writing/why-adrs` and `/about` at `1440 × 1100`, `390 × 844`, `320 × 844` and `360 × 844` automated zoom proxy; the same real-content routes separately at actual 200% browser zoom
- Actual 200% browser-zoom result: Pending rendered review; record browser, route, overflow/reflow, focus and evidence-legibility observations
- Decision: Pending Harley's rendered review
```

After rendering, replace each valuation `Pending` with `Yes` or `No` and cite the specific observation and cultural reference used. Do not change Harley's `Pending` status without his actual rendered review; record `Accepted` or `Blocked` and attribute the decision accurately.

- [ ] **Step 4: Regenerate and run focused final proof**

From the repo root:

```powershell
py -3 tools/run.py mesh --apply
npm.cmd --prefix src/client run test:e2e:visual
```

Run only the affected unit slices named in Tasks 1-7, then inspect any regenerated output and the reviewed visual baselines. These focused proofs prepare the acceptance decision; they do not run or substitute for the complete commit gate.

Expected: mesh is current; 73+ repository tests, 159+ client tests, production build/budgets and 93+ Playwright journeys pass on the staged tree. Do not commit if generated or test counts decrease without an explained source change.

- [ ] **Step 5: Present rendered proof to Harley and obey the gate**

Open the representative routes and proof record for Harley. Before asking for acceptance, set the browser itself to actual 200% zoom and inspect the same real-content routes for overflow, reflow, focus visibility, source order and evidence legibility. Record the browser and observations in the implementation proof; do not infer this result from the `360 × 844` automated proxy. If `Blocked`, record the exact issue, return to the owning task and keep homepage Phase 8 blocked. If `Accepted`, update only the proof record's acceptance fields; do not implement `/` in this plan.

- [ ] **Step 6: Mark Task 8 complete and commit the accepted non-home implementation**

After Harley acceptance, mark this task's boxes `[x]`, stage the accepted tree, and commit normally. The pre-commit hook runs the complete gate once; do not pre-run or bypass it:

```powershell
git add .
git commit -m "feat: complete the Phase 8P non-home visual language"
```

Push the implementation branch, verify the remote PR head and hosted checks, and keep homepage Phase 8 blocked until this accepted Phase 8P work lands on `main`.

## Plan-readiness review

- **Spec coverage:** Tasks 1-3 establish the protected home/interior boundary, accepted fonts/substrate and quiet shell. Tasks 4-7 cover indexes, authored longform, shared custody, four project case studies, Patch stories, About and CV. Task 8 covers rendered proof, accessibility, AI-convergence valuation and Harley acceptance.
- **Dependency order:** Surface boundary precedes tokens; tokens precede shell and route consumers; shared custody precedes route-specific evidence; all implementation precedes rendered proof and acceptance.
- **Non-goals:** No homepage change, public-fact rewrite, content restructuring, contact change, universal evidence frame, proof-template copying, unrelated Sass migration or new art direction.
- **TDD:** Every task starts with a failing focused test, names the RED expectation, implements the smallest owned seam, reruns focused proof and commits independently.
- **Clean CI:** Task 8 regenerates and stages before the canonical check; the final normal commit reruns the tracked hook. Earlier task commits use focused proof and the normal hook without bypass.
- **Open human gate:** Exact visual tuning and final acceptance remain Harley-owned after rendered browser proof; this is explicit and does not require implementer improvisation.
- **Rating:** **9/10**. The accepted contract, live file map, interfaces, exact commands and falsification gates make the plan executable. The remaining point is intentionally reserved for rendered taste acceptance, which cannot be proven in a source-only plan.
