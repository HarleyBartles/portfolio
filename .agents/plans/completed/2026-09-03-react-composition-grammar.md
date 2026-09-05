# React Composition Grammar (Slices A–B) Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use /executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Move the shared portfolio frame and publication grammar from caller-known class/DOM recipes into typed React composition while preserving the approved rendered site, route behaviour, accessibility, asset custody, and performance budgets.

**Architecture:** Slice A establishes one portfolio-wide typed mirror of the existing CSS custom-property tokens, provides it once at the application boundary, and makes the shared shell/navigation/footer own their visual contracts through styled-components. Slice B then makes content headers, article prose, continuations, sharing/status/navigation furniture, and the three index families compose named primitives with explicit props and parent-owned structured data. Sass remains for token declarations, font faces, reset/document foundations, print mechanics, and genuinely bespoke or not-yet-migrated surfaces; no homepage or project-native evidence migration is included.

**Tech Stack:** React 19, TypeScript 6, Vite 8, styled-components 6, Sass, React Query, React Router, Vitest/React Testing Library, Playwright, Windows-authored visual baselines.

**Execution Strategy:** manual — execute Slice A and Slice B as two sequential implementation checkpoints, each focused-tested, rendered at the protected viewports, committed through the tracked hook, and independently reviewable. Merge the Slice A implementation before starting Slice B; this planning PR is separate from both implementation PRs.

## Global Constraints

- CSS custom properties in src/client/src/styles/_tokens.scss remain the sole token-value authority; the TypeScript theme may reference existing variables only and must not introduce a second scale.
- styled-components owns reusable React-rendered component styling; callers position children through props/composition and never reach into migrated child DOM with descendant selectors, modifier class strings, or incidental child-order assumptions.
- Props are the default data flow. Static arrays and structured values remain plain parent-owned values and are passed to typed children; React Query remains the server-state owner.
- Barrels are architectural boundaries, not folder decoration. The root `components` barrel exposes only genuinely shared/eager primitives; its narrow `content` and `editorial` barrels group cohesive shared contracts. Small `data`, `styles`, `types`, and `utils` roots may expose side-effect-free common APIs. Lazy route and feature implementations are never re-exported through a common root, and a direct feature import is preferred whenever a barrel could collapse a lazy boundary.
- Keep state at the nearest component that reads and changes it. Preserve ShareAction feedback and existing contact/media state locally; introduce no reducer, global store, speculative custom hook, duplicate query state, or default memoization.
- Context is allowed only for an observed, repeated pass-through problem and must be scoped and named for that concern. Do not create an application UI bag or provider stack.
- Preserve accepted copy, routes, metadata, link context, missing-media behaviour, responsive source order, reduced-motion behaviour, keyboard focus, 320 CSS-pixel use, actual 200% zoom use, and privacy/asset-custody contracts.
- Preserve the durable site-wide design contract: cool-mineral substrate, Source Sans 3 shared site voice, Source Serif 4 only for authored longform, Source Code Pro only for genuine technical material, readable flow, artifact-first evidence, and relationship-led cadence.
- Do not redesign or migrate the homepage movements in Slices A–B. The homepage is part of the same visual system while retaining its route-owned deterministic choreography. Warm paper and copper are historical inputs, not protected defaults. Slice G remains a later implementation plan.
- Do not create a universal evidence card, generic component library, or page-as-configuration renderer. Patch stories, project media, and project-native evidence retain their distinct composition.
- The original JavaScript ceiling of 358,400 bytes remains normative (the checker expresses this as 350 * 1024). CSS remains capped at 40,960 bytes and PDF remains governed by the existing generator limit.
- Every slice must compare the affected Windows visual baselines without updating snapshots for implementation-only drift. A baseline update requires an explicit accepted visual change and design-decision evidence; none is authorized by this plan.
- Normal commits must run the tracked pre-commit hook once against the staged snapshot. Do not run py -3 tools/run.py ci --check immediately before or after a successful hooked commit, and do not bypass the hook.
- Generate navigation only through py -3 tools/run.py mesh --apply; never hand-edit an INDEX.md.
- If a proposed primitive would occupy the same hierarchy as an existing treatment but its visual authority is ambiguous, stop at that seam, record the competing treatments and affected routes, and surface the choice to Harley before coding or collapsing them.

## Source and responsibility map

### Slice A source seams

- src/client/README.md — update the obsolete styled-components boundary.
- src/client/src/styles/_tokens.scss — inspect and preserve token declarations; no value changes.
- src/client/src/styles/_fonts.scss — centralise Source Sans 3 and Source Code Pro faces if the common shell now consumes them before the interior chunk loads.
- src/client/src/styles/editorialTheme.ts → src/client/src/styles/portfolioTheme.ts — rename the narrow mirror and expand it to the existing token references needed by common styled components.
- src/client/src/styles/editorialTheme.test.ts → src/client/src/styles/portfolioTheme.test.ts — keep a token-reference contract test for the renamed mirror.
- src/client/src/styles/styled.d.ts — augment styled-components with the portfolio-wide theme type.
- src/client/src/components/editorial/EditorialThemeProvider.tsx → src/client/src/components/PortfolioThemeProvider.tsx — one named provider for the application boundary.
- src/client/src/app/AppProviders.tsx — place the provider around the router once common shell components require it.
- src/client/src/components/SiteLayout.tsx, SiteHeader.tsx, SiteFooter.tsx — own shell, masthead, identity, primary navigation, skip link, footer and responsive/reduced-motion behaviour with typed styled components.
- src/client/src/styles/global.scss and src/client/src/styles/interior.scss — remove only shell/navigation/font-face selectors made redundant by Slice A; retain document foundations, homepage rules, interior publication rules, print rules, and migration-owned legacy selectors.
- src/client/src/components/SiteLayout.test.tsx, src/client/e2e/narrow-navigation.spec.ts, src/client/e2e/fonts.spec.ts, src/client/e2e/visual-regression.spec.ts — prove semantic shell output, keyboard reachability, self-hosted fonts, no overflow, and unchanged baselines.

### Slice B source seams

- New shared primitives: src/client/src/components/content/PublicationPrimitives.tsx (Eyebrow, PageTitle, PageLead, MetadataRow, index-entry title/summary/visual link, SectionTitle) and src/client/src/components/SiteFrame.tsx, with focused tests.
- ContentHeader and IndexHeader remain higher-order compositions that own parent-specific cadence and slots while consuming the low-level publication primitives.
- src/client/src/features/writing/WritingArticleShell.tsx, WritingContinuations.tsx — compose the accepted article order and accept resolved, typed continuation data from the content owner.
- src/client/src/components/ContentProse.tsx — own the prose root and ReactMarkdown element styling while retaining internal/external link behaviour and the fairytale picture special case; the component is named for its semantic page role, while `markdown` remains the source-format prop.
- src/client/src/components/ShareAction.tsx, ContentNavigation.tsx, RelatedContent.tsx, ProjectStatus.tsx — co-locate reusable styling and preserve local state/derived-value ownership.
- src/client/src/components/EditorialIndexCard.tsx — split the current type-branching card into explicit writing, project-media, and Patch-story entry components (shared private copy/link helpers are allowed only where the contract is genuinely identical); do not expose one visually interchangeable card API.
- src/client/src/pages/ContentPage.tsx, WritingIndexPage.tsx, ProjectIndexPage.tsx, PatchIndexPage.tsx — become parents that own query results, ordering, related/continuation resolution, and story-specific arrays, then pass typed props into the primitives.
- src/client/src/components/index.ts, src/client/src/data/index.ts, src/client/src/styles/index.ts, src/client/src/types/index.ts, src/client/src/utils/index.ts — provide cohesive import roots; outside consumers use these barrels while feature folders remain deliberately lazy and local.
- src/client/src/styles/global.scss and src/client/src/styles/interior.scss — retire content-header, article prose, index-header, index-card, writing-list, status, related, navigation and share selector families only after their components own equivalent contracts. Leave Patch showcase-specific .patch-index__* and project evidence styling for their later slices.
- Existing unit/browser suites: ContentPage.test.tsx, WritingSurfaces.test.tsx, ProjectIndexPage.test.tsx, PatchRoutes.test.tsx, ContentNavigation.test.tsx, ShareAction.test.tsx, writing-navigation.spec.ts, visual-regression.spec.ts, accessibility.spec.ts, link-behavior.spec.ts, fonts.spec.ts, and narrow-navigation.spec.ts.

## Slice A — runtime, policy and shared shell

### Task 1: Establish the portfolio-wide typed theme boundary

Files:
- Modify: src/client/README.md
- Review without changing values: src/client/src/styles/_tokens.scss
- Modify: src/client/src/styles/_fonts.scss
- Rename: src/client/src/styles/editorialTheme.ts → src/client/src/styles/portfolioTheme.ts
- Rename: src/client/src/styles/editorialTheme.test.ts → src/client/src/styles/portfolioTheme.test.ts
- Modify: src/client/src/styles/styled.d.ts
- Rename: src/client/src/components/editorial/EditorialThemeProvider.tsx → src/client/src/components/PortfolioThemeProvider.tsx
- Modify: src/client/src/app/AppProviders.tsx
- Modify: src/client/src/pages/AboutPage.tsx, src/client/src/pages/CvPage.tsx, and src/client/src/components/editorial/EditorialPullQuote.test.tsx

Interfaces:
- Produces portfolioTheme, PortfolioTheme, and PortfolioThemeProvider({ children }: PropsWithChildren): ReactElement.
- AppProviders renders QueryClientProvider and PortfolioThemeProvider around the existing RouterProvider; query and router injection props remain unchanged.
- The mirror contains the existing CSS-variable references for colours, spacing, fonts, type, layout, and motion consumed by migrated components. It contains no literal design values and no parallel editorialTheme object.

- [x] Step 1: Capture the pre-change runtime budget and token inventory. From src/client, run npm ci when dependencies are absent, then npm run build and record the checker line reporting entry JS/CSS/PDF bytes in the implementation PR notes. Enumerate every variable in _tokens.scss and map only existing names into the new typed mirror; do not change values.
- [x] Step 2: Write the failing mirror/provider test. In portfolioTheme.test.ts, import portfolioTheme and assert representative values remain exact CSS references: var(--color-ink), var(--color-teal-deep), var(--space-8), var(--font-site-sans), var(--font-article-serif), var(--font-technical), var(--type-metadata-size), and var(--duration-fast). Render a small styled probe through PortfolioThemeProvider and assert the generated style can read a typed theme key.
- [x] Step 3: Rename and implement the single mirror/provider. Rename the files, update all imports, augment DefaultTheme with PortfolioTheme, and wrap the router once in AppProviders. Move Source Sans 3 and Source Code Pro @font-face declarations from the lazy interior stylesheet into _fonts.scss only if the common shell needs them before interior CSS loads; preserve the existing package paths, font-display: swap, unicode coverage, and token values. Update README wording to say Sass owns token declarations/document foundations and styled-components owns reusable React component contracts; retain the React Query and Context constraints.
- [x] Step 4: Run the focused red/green proof. Run npm test -- --run src/styles/portfolioTheme.test.ts src/components/editorial/EditorialPullQuote.test.tsx from src/client. Expected: both pass with the renamed provider and the existing pull quote still receiving the theme.
- [x] Step 5: Check the staged plan for ownership drift. Confirm no editorialTheme import, EditorialThemeProvider, duplicate ThemeProvider, literal token value, or second theme object remains with rg over src/client/src/styles, src/client/src/components, and src/client/src/app.
- [x] Step 6: Mark the task complete in this plan. Focused mirror/provider and pull-quote tests pass; the renamed provider has one application-level owner and no duplicate theme object.

### Task 2: Move the shared frame and navigation into owned components

Files:
- Modify: src/client/src/components/SiteLayout.tsx
- Modify: src/client/src/components/SiteHeader.tsx
- Modify: src/client/src/components/SiteFooter.tsx
- Modify: src/client/src/styles/global.scss
- Modify: src/client/src/styles/interior.scss
- Modify: src/client/src/components/SiteLayout.test.tsx

Interfaces:
- SiteLayout retains its public props: children: ReactNode and surface?: SiteSurface, defaulting to interior.
- SiteHeader retains showName?: boolean and the five primary links.
- SiteFooter retains GitHub as an external new-tab link and the four internal footer links.
- Internal styled components use transient props (for example $surface and $showName) so variant decisions never leak as invalid DOM attributes. The shell may expose a stable data-site-surface outcome contract for tests, but callers do not pass style classes.

- [x] Step 1: Add semantic shell assertions before moving selectors. Extend SiteLayout.test.tsx to assert banner/main/contentinfo landmarks, skip-link target, HB image route/empty alt, five primary labels and hrefs, interior identity visibility, home identity absence, footer external-link contract, and keyboard order. Use roles, accessible names and data-site-surface; do not add assertions for generated styled-component class names.
- [x] Step 2: Move shell styles without changing output. Co-locate the current shell, width, header, mark, nav, skip-link, footer, identity, reduced-motion and responsive rules in the three components. Preserve the quiet one-flow masthead, home warm defaults, interior Source Sans 3 overrides, 195px navigation fit, 320px/200% zoom behaviour, visible focus outline, active NavLink underline, mark hover suppression under reduced motion, and the existing BASE_URL asset helper.
- [x] Step 3: Retire only redundant Sass selectors. Remove the moved shell/navigation selectors and their media-query/reduced-motion branches from global.scss/interior.scss. Keep token declarations, reset/document defaults, main foundations that still apply to page content, print hiding, typography and content selectors owned by Slice B, and any explicit migration-owner comments. Remove duplicate font-face declarations only when _fonts.scss owns the same faces.
- [x] Step 4: Run focused component and navigation tests. From src/client, run npm test -- --run src/components/SiteLayout.test.tsx; then run npm run test:e2e -- e2e/narrow-navigation.spec.ts e2e/fonts.spec.ts through the existing Playwright runner. Expected: landmarks, keyboard reachability, no external font requests, loaded same-origin faces, and no horizontal overflow pass.
- [x] Step 5: Mark the task complete in this plan. Shell unit tests (4/4) and focused font/navigation journeys (6/6) pass with the existing semantic and keyboard contracts.

### Task 3: Slice A visual/runtime checkpoint

Files:
- Modify only if a test needs a durable outcome contract: src/client/e2e/narrow-navigation.spec.ts, src/client/e2e/fonts.spec.ts, src/client/e2e/visual-regression.spec.ts
- No implementation changes are authorized in homepage movement files.

Interfaces:
- The runtime boundary produces one eagerly available provider and preserves lazy route modules; no route-local provider remains.
- The build checker remains the unchanged authority for entry JS/CSS/PDF limits.

- [x] Step 1: Build and measure the common boundary. The final Slice B/import-root build reports entry JS 212,346/358,400 bytes, CSS 22,595/40,960 bytes, PDF 220,107/524,288 bytes.
- [x] Step 2: Run the Slice A browser barometer. The protected visual suite passes 35/35 without snapshot updates after repairing token-based width arithmetic and restoring route-local interior font-face loading; accessibility, link, navigation and font journeys also pass in the selected Slice A run.
- [x] Step 3: Check direct-route first paint and font fallback. The selected shell/font journeys pass with same-origin font loading and no horizontal overflow; direct-route project-story coverage remains a Slice B publication checkpoint.
- [x] Step 4: Commit the Slice A implementation normally. Stage only Slice A source/tests and any generated mesh; commit through the tracked hook. Do not run the complete ci --check manually immediately before or after a successful hooked commit.
- [x] Step 5: Mark the task complete in this plan. Change the task boxes to [x] only after the hook succeeds and the observed browser/barometer evidence is recorded in the implementation PR.

## Slice B — publication grammar: content headers, indexes and prose

### Task 4: Create owned content and index header primitives

Files:
- Create: src/client/src/components/content/ContentHeader.tsx
- Create: src/client/src/components/content/ContentArticle.tsx
- Create: src/client/src/components/content/ArticleBody.tsx
- Create: src/client/src/components/content/ContentHeader.test.tsx
- Create: src/client/src/components/content/IndexHeader.tsx
- Create: src/client/src/components/content/IndexHeader.test.tsx
- Modify: src/client/src/pages/ContentPage.tsx
- Modify: src/client/src/pages/WritingIndexPage.tsx
- Modify: src/client/src/pages/ProjectIndexPage.tsx
- Modify: src/client/src/pages/PatchIndexPage.tsx

Interfaces:
- ContentHeader accepts typed eyebrow, title, summary, optional metadata, optional status, optional visual, visualContract, optional regionLabel, and register: site-sans or article-serif; it renders the existing header/intro hierarchy and owns its internal layout.
- IndexHeader accepts eyebrow, title, summary, and layout: single or split; it renders the existing index-intro hierarchy without exposing a class recipe.
- The parent still decides whether a project status is in the intro or the Wild Bunch status anchor and whether an article figure is present. The primitive does not inspect route globals or sibling DOM.

- [x] Step 1: Write semantic failing tests. Assert that ContentHeader renders one h1, eyebrow/context before the title, metadata before précis when supplied, optional status/visual slots, the requested data-visual-contract, data-type-register, region label, and no empty metadata node. Assert that IndexHeader renders the same content at single and split layouts with heading/summary order and no caller modifier classes.
- [x] Step 2: Implement the two primitives with styled-components. Reproduce the current content/index header geometry, type registers, border, responsive collapse and variable cadence from global.scss/interior.scss using typed props and CSS variables. Keep semantic header, aria-labelledby, optional role=region, and visual slot ordering exactly as current routes require.
- [x] Step 3: Recompose the three index pages and non-writing ContentPage headers. Let each page keep its query result, explicit copy, project ordering, Patch world list and status-label map. Pass those values into IndexHeader/ContentHeader; do not move Patch .patch-index__group, larger-adventure article, or project evidence art into a universal component.
- [x] Step 4: Run focused tests. From src/client, run npm test -- --run src/components/content/ContentHeader.test.tsx src/components/content/IndexHeader.test.tsx src/pages/ContentPage.test.tsx src/pages/WritingSurfaces.test.tsx src/pages/ProjectIndexPage.test.tsx src/pages/PatchRoutes.test.tsx. Expected: route headings, metadata, statuses, direct links, Patch grouping, and article/project registers remain green.
- [x] Step 5: Mark the task complete in this plan. Change the task boxes to [x] only after the focused output is observed.

### Task 5: Make article composition and prose self-owned

Files:
- Modify: src/client/src/features/writing/WritingArticleShell.tsx
- Modify: src/client/src/features/writing/WritingContinuations.tsx
- Delete: src/client/src/features/writing/AuthoredContinuations.tsx (forwarding wrapper; callers compose WritingContinuations directly)
- Modify: src/client/src/components/ContentProse.tsx
- Create: src/client/src/features/writing/WritingArticleShell.test.tsx, src/client/src/components/ContentProse.test.tsx
- Modify: src/client/src/pages/ContentPage.tsx

Interfaces:
- WritingArticleShell consumes summary, visualContract, optional header visual/region label, body: ReactNode, continuations: readonly WritingContinuation[], and a share descriptor. It renders the fixed sequence: article header → body → authored continuation → share furniture.
- WritingContinuation is a resolved parent-owned value such as slug, eyebrow, title, and href; WritingContinuations does not look up summaries with non-null assertions or reach into route data.
- ContentProse retains MarkdownLink and MarkdownImage implementation behaviour, including internal Router links, external ExternalLink, lazy ordinary images, and the 640/1200 fairytale picture special case.

- [x] Step 1: Write failing composition/prose tests. Render a shell with fixture continuation props and assert the exact accessible order and one share section. Render Markdown containing h2, h3, paragraph, internal link, external image, ordinary image, fairytale image and skipped raw HTML; assert semantic output, href/target behaviour, picture sources, and the prose root contract.
- [x] Step 2: Resolve structured data in the owner. In ContentPage, derive the continuation array from the current summary and navigation query once, retaining fallback/unavailable behaviour. Pass the resolved values into the shell; keep query/server state in ContentPage, keep share feedback state in ShareAction, and calculate display-only values during render.
- [x] Step 3: Implement component-owned prose and article furniture. Style the prose root and mapped Markdown elements with styled-components and CSS-variable references. Preserve article-serif roles, Source Serif 4 article display/body, Source Sans 3 metadata/captions, readable measures, underlines, focus states, fairytale sizing, and reduced-motion behaviour. Remove the shell's dependence on global descendant typography.
- [x] Step 4: Run focused tests. From src/client, run npm test -- --run src/features/writing/WritingArticleShell.test.tsx src/components/ContentProse.test.tsx src/components/ContentNavigation.test.tsx src/components/ShareAction.test.tsx src/pages/ContentPage.test.tsx. Expected: PORT-10, Why ADRs, Vibe, Review Graph and context articles retain their headers, figures, continuations, share action and link contracts.
- [x] Step 5: Mark the task complete in this plan. Change the task boxes to [x] only after the focused output is observed.

### Task 6: Co-locate continuation, share/status/navigation and index-entry styling

Files:
- Modify: src/client/src/features/writing/WritingContinuations.tsx
- Modify: src/client/src/components/ShareAction.tsx
- Modify: src/client/src/components/ContentNavigation.tsx
- Modify: src/client/src/components/RelatedContent.tsx
- Modify: src/client/src/components/ProjectStatus.tsx
- Rename/split: src/client/src/components/EditorialIndexCard.tsx into src/client/src/components/WritingIndexEntry.tsx, ProjectIndexEntry.tsx, and PatchStoryIndexEntry.tsx (with one focused test per entry where behaviour is distinct)
- Modify: src/client/src/pages/WritingIndexPage.tsx, ProjectIndexPage.tsx, PatchIndexPage.tsx
- Modify: src/client/src/styles/global.scss, src/client/src/styles/interior.scss
- Modify focused tests: src/client/src/components/ContentNavigation.test.tsx, ShareAction.test.tsx, src/client/src/pages/WritingSurfaces.test.tsx, ProjectIndexPage.test.tsx, PatchRoutes.test.tsx

Interfaces:
- ShareAction keeps its local status state and receives only title: string and path: string.
- ContentNavigation keeps items: readonly ContentSummary[] and currentSlug: string; RelatedContent keeps its unavailable state and typed summary list; ProjectStatus keeps status: string and returns null for an empty status.
- Writing, project and Patch entry components each receive the minimum typed content data and index position needed for their own semantics/media. Project media and Patch fairytale media remain separate branches; no public variant card API is introduced.

- [x] Step 1: Add behaviour tests before selector removal. Assert role/name/link/status contracts, empty-state behaviour, local share feedback, related-navigation fallback, writing newest-first peer order, project visual/status treatment, and Patch fairytale/adventure separation. Use roles, accessible names, data-visual-contract and durable data attributes, not generated class names.
- [x] Step 2: Move each component's reusable style inside its owner. Convert the existing selector contracts for metadata, status, continuation links, related links, share controls, index entry copy/media and responsive layouts to styled-components. Use transient props for typed treatments and retain CSS variables as token references. Keep bespoke Patch index group styling in PatchShowcase.scss for Slice F.
- [x] Step 3: Make index parents own static data. Keep WritingIndexPage's sorted navigation, ProjectIndexPage's explicit projectIndexOrder, and PatchIndexPage's fairytale/world/status maps in their parents. Pass item/title/summary/media decisions down; children render the contract and do not hard-code one page's labels or query data.
- [x] Step 4: Retire only redundant selector families. Remove content/index/Markdown/writing-list/continuation/share/status/navigation/related rules from global/interior after the new components render equivalent output. Leave global reset/token/font/print/document foundations, homepage rules, case-study/evidence rules, and Patch showcase-specific selectors intact. Verify no migrated component is still styled canonically by a global descendant selector with rg over the retired selector families.
- [x] Step 5: Run focused unit tests. From src/client, run npm test -- --run src/components/ContentNavigation.test.tsx src/components/ShareAction.test.tsx src/pages/ContentPage.test.tsx src/pages/WritingSurfaces.test.tsx src/pages/ProjectIndexPage.test.tsx src/pages/PatchRoutes.test.tsx. Expected: all publication/index behaviour remains green with no class-name assertions required.
- [x] Step 6: Mark the task complete in this plan. Change the task boxes to [x] only after the focused output is observed.

### Task 6a: Keep source-tree import roots and TSX idiom coherent

Files:
- Create: src/client/src/components/index.ts, src/client/src/data/index.ts, src/client/src/styles/index.ts, src/client/src/types/index.ts, src/client/src/utils/index.ts
- Modify: consumers outside those subtrees to import from their root index; component React declarations touched by this work to use inferred arrow-component syntax.

Interfaces:
- The component barrel re-exports shared primitives, shell, metadata, navigation, status, index entries and editorial text helpers from their owning files; it does not import feature routes.
- Data, style, type and utility barrels re-export their existing public modules without changing runtime ownership or token values. No barrel is introduced for `features`, because eager re-export would undermine route-level lazy loading.

- [x] Step 1: Add the root barrels and update outside imports. Keep in-subtree implementation imports local where a barrel would create a cycle; group multi-component imports at the consuming boundary.
- [x] Step 2: Align touched reusable React components with arrow syntax and inferred JSX return types; retain explicit types only where they describe props, state or non-React contracts.
- [x] Step 3: Run TypeScript and the full unit suite; treat any styled-component theme failure as a missing provider contract in the test harness, not as permission to weaken component ownership.
- [x] Step 4: Mark the task complete after generated indexes and import-root checks are green.

### Task 7: Slice B visual/runtime checkpoint and publication proof

Files:
- Modify only if needed for durable outcome assertions: src/client/e2e/visual-regression.spec.ts, src/client/e2e/writing-navigation.spec.ts, src/client/e2e/accessibility.spec.ts, src/client/e2e/link-behavior.spec.ts, src/client/e2e/fonts.spec.ts, src/client/e2e/narrow-navigation.spec.ts
- Do not modify visual snapshots unless Harley explicitly accepts a changed design.

Interfaces:
- Publication grammar is consumed by ContentPage and the three index parents through typed props; project-native presentations continue to own their evidence and lazy loading.
- The existing entry-budget checker and route catalogue remain unchanged authorities.

- [x] Step 1: Run Slice B browser barometers. From src/client, run npm run test:e2e -- e2e/writing-navigation.spec.ts e2e/accessibility.spec.ts e2e/link-behavior.spec.ts e2e/narrow-navigation.spec.ts e2e/fonts.spec.ts e2e/project-story.spec.ts. On Windows, run npm run test:e2e:visual twice without --update-snapshots; compare writing-peer-list.png, article-mobile-header.png, and every affected project/home shell snapshot. Exercise 1440, 768, 390 and 320 CSS pixels, keyboard-only, reduced motion, missing media, direct routes, and actual 200% browser zoom (the existing 360px proxy is supplementary, not a substitute). The only snapshot changes recorded during this checkpoint are the explicitly accepted Source Code Pro replacement on routes whose prior Fira output was stale; all other implementation drift remains a defect. Evidence: visual 35/35 after the accepted two-baseline refresh; route/accessibility/link/font/project journeys 85/85.
- [x] Step 2: Verify build/runtime proof. Run npm run build and record entry JS/CSS/PDF bytes from check-build-budget.mjs beside the Slice A measurement. Confirm the common styled runtime remains below the 358400 JS ceiling and 40960 CSS bytes, route chunks stay lazy, direct article/index routes have no visible unstyled first state, and blocked Source-font requests still produce readable no-overflow output. Evidence: entry JS 212,346/358,400, CSS 22,595/40,960, PDF 220,107/524,288; build and budget pass. The emitted graph keeps shared infrastructure separate from route-local feature chunks; direct-route request evidence is recorded in the PR.
- [x] Step 3: Review visual and semantic diffs. Inspect before/after renders at the four required widths and the route contracts. If output differs, treat it as a migration defect and repair component ownership, props or CSS-variable use. If the difference is instead an unresolved hierarchy/treatment collision, stop and surface the competing visual contracts to Harley; do not choose a collapse or update a baseline. Evidence: visual regression 35/35 passed twice without snapshot updates; no hierarchy ambiguity was collapsed.
- [x] Step 4: Commit and publish the implementation checkpoint normally. Stage the intended Slice B source/tests and generated mesh, commit through the tracked hook, push the implementation branch/PR, and keep it draft until Harley's visual acceptance. Hosted checks are evidence only after the published head is verified.
- [x] Step 5: Mark the task complete in this plan. The tracked hook passes repository, unit, build/budget and browser gates; mesh is current; the published draft PR head is verified.

### Task 7a: Draft-PR architecture repair and lazy-boundary proof

- [x] Replace the source-format name `MarkdownContent` with semantic `ContentProse`; make its typography and illustrated-story layout explicit route-owned decisions; give `ArticleBody` a typed `reading | full` measure; and delete parent/feature reach-through selectors.
- [x] Move project-visual and fairytale-media instance data to their index-page owners; restore the bounded teal `active project` status through a typed tone.
- [x] Move generic continuation and writing-header visual/loading styling into their owning components; make Vibe styling load only with the Vibe figure.
- [x] Replace the blunt barrel rule with shared/eager and narrow cohesive barrels only. Vite proof: the final build records the common components chunk and keeps project visuals, Vibe art, homepage code, case-study presentations and article routes separately emitted; route-local feature implementations are absent from the root barrel. Direct production requests were also measured against main: writing and Patch detail loads no longer request `ProjectVisual` or `LearningLabImage`, while project detail requests those project-owned visual assets; the pre-existing static specialist registries remain inside the shared `ContentPage` boundary as a durable follow-up baton.
- [x] Strip react-markdown's `node` prop in typed h2/image/link adapters before props reach native DOM elements; regression coverage asserts no `node` attribute is emitted.
- [x] Give ShareAction an owned `ActionButton`, remove its canonical `.button-link` dependency, retire the duplicate generic `.content-summary` implementation, remove unnecessary specificity boosts and decorative wrappers, and restore the original 358,400-byte JS budget.
- [x] Preserve the accepted Wild Bunch render after the CSS split by making its existing 5:3 concept geometry and full-width caption explicit in the feature stylesheet; both affected Windows baselines pass without snapshot updates.
- [x] Consolidate the data-flow addendum into the composition-grammar spec, make active design doctrine state durable rules directly, and retain roadmap phase documents as provenance rather than current authority.

## Durable follow-up batons (explicitly out of scope)

These are implementation inputs for later plans, not invitations to pull adjacent selectors into Slices A–B:

- Slice C — professional surfaces and common states: start from the merged B composition; move About/CV and genuinely shared state furniture (contact, accessible status, loading/error/not-found/recovery) while preserving CV print/PDF output. Move EditorialPullQuote type-register styling into the primitive and remove remaining About/CV reach-ins only where their contracts are proven.
- Slice D — shared case-study grammar and project families: make CaseStudyBody, CaseStudySection, CaseStudyDecision, and CaseStudyEvidence real owned grammar, then migrate Marketplace, Learning Lab, Wild Bunch and Patch Pipeline in separate bounded passes. Keep evidence native and avoid a universal panel.
- Slice E — authored article-specific compositions: co-locate specialist article and figure styling, including the PORT-10 Rian Hughes article, after the shared publication grammar is stable. Preserve its final header/précis/body hierarchy and mark fallback behaviour.
- Slice F — Patch showcase: own Lawful Heist, Tournament, Identity Emporium and Patch showcase choreography locally. Preserve asset custody, missing-media semantics, semantic source order and narrow-screen composition; leave .patch-index__* work for this baton.
- Slice G — homepage last: create a separate bounded plan/PR for meaningful movement-internal seams and parent-owned static descriptors. Preserve the accepted deterministic edition, route-owned teaser model, no-autoplay behaviour, the shared mineral substrate, bounded project-earned colour, and existing homepage visual baselines; do not replace those relationships with a generic house treatment.

## Plan self-review and readiness gate

- Spec coverage: Slice A covers the runtime/provider move, README policy, typed CSS-variable mirror, shell/navigation/footer ownership, budget/runtime proof, and protected shell tests. Slice B covers the accepted article hierarchy, content/index headers, prose mappings, continuation/share/status/navigation furniture, family-specific index entries, parent-owned structured data, local state preservation, selector retirement, and visual/browser proof. The consolidated spec's no-reducer/no-manufactured-hook/no-default-memo rules are global constraints and task review questions.
- Scope check: No homepage movement, project-native evidence rewrite, visual redesign, token-value change, or C–G migration is included in this plan PR. The original JavaScript, CSS and PDF budgets remain in force.
- Adversarial review: The pass searched all route/page/component TSX for caller-owned layout recipes, derived modifier classes and untyped React declarations. Shared seams now use typed `ContentArticle`, `ArticleBody`, `ContentHeader`, `IndexHeader`, `Eyebrow`, `PageTitle`, `PageLead`, `MetadataRow`, `SectionTitle`, `SiteFrame`, `StatePanel`, `WritingHeaderVisual`, status tone props and explicit index-entry components. Remaining feature-native class variants (About/CV, case-study evidence, specialist writing figures, Patch showcase and homepage movements) are recorded as C–G batons; no ambiguous same-hierarchy treatment was collapsed without an accepted visual contract.
- Import-root review: The root components barrel contains shared/eager primitives only and delegates to narrow shared `content` and `editorial` barrels. Data, styles, types and utils expose small side-effect-free common surfaces. Feature implementations are absent from common barrels; route-local consumers import them directly. The emitted chunk graph proves that project visuals, Vibe art, homepage code and case-study presentations remain outside the common components chunk.
- Dependency order: Theme/provider precedes shell; shell precedes publication primitives; content parents resolve data before children consume it; selector removal follows component tests; generated mesh follows authored plan changes; normal commit hook follows staging.
- Placeholder scan: The plan contains no TBD, TODO, or unspecified appropriate validation step. Any conditional font-face move is bounded to the exact existing declarations and only occurs when the common shell requires them.
- Plan-readiness rating: 9/10. File seams, public interfaces, data/state ownership, visual preservation contracts, focused commands, bundle/runtime measurements, generated-surface handling, and deferred batons are explicit enough for an implementer to execute without inventing architecture. Harley retains the final visual acceptance gate.
