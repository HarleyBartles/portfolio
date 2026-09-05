# React Composition Grammar Slice C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Slice C by giving professional routes and common state surfaces honest React-owned composition, moving Contact to its own route, and preserving the accepted About, CV, contact, recovery, print and PDF contracts.

**Architecture:** Shared full-page states become one typed `StatePanel` composition with parent-owned messages and recovery actions, while the compact router hydration status remains a distinct primitive because it occupies different hierarchical space. About, Contact and CV stay separate lazy route families with narrow route-local components and data passed from their page owners; `styled-components` owns reusable component styling, route-local Sass retains only genuine document/print mechanics, and CSS variables remain token authority.

**Tech Stack:** React 19, TypeScript 6, React Router 7, styled-components 6, Sass foundations, Vitest/Testing Library, Playwright, Vite 8, pdf-lib.

**Execution Strategy:** `executing-plans` — the shared state/editorial producers, Contact route move, About migration, CV migration and final selector retirement are sequentially coupled and should stay in one implementation thread with a green checkpoint after each task.

## Global Constraints

- Treat `.agents/specs/2026-09-03-react-composition-grammar-design.md` as the settled architecture and `.agents/doctrine/portfolio-design-policy.md` plus `docs/design-decisions.md` as current design authority.
- Preserve the cool-mineral substrate and shared font roles: Source Sans 3 for site voice, Source Serif 4 for authored reading, and Source Code Pro for technical and compact utility material. Do not add Fraunces or Fira.
- Preserve approved public copy, factual boundaries, project ordering, metadata, accessibility, responsive behaviour and visual output. The intentional exception is moving the existing Contact composition from the bottom of About to `/contact`.
- Lift the existing Contact treatment to its new route without inventing a new hierarchy. If implementation exposes an ambiguous same-level treatment, stop for Harley rather than choosing a new visual collapse.
- Keep primary navigation and homepage composition unchanged. Updating the existing homepage contact destination to `/contact` is in scope; homepage component/style migration remains Slice G.
- Keep `/about#contact` as a compatibility redirect to `/contact`; update every repository-owned contact link and generated CV target to the canonical route.
- Keep server/query state in React Query and contact submission state inside `ContactForm`. Do not introduce Context, reducers, effects for derived values, one-call-site hooks, or unmeasured memoization.
- Use typed props and transient styling props for real variants. Migrated parents must not know child class names, generated DOM or selector order.
- Use arrow syntax with inferred JSX return types for React components touched by this slice. Retain explicit types for props, data contracts and non-React APIs where they add information.
- Root `components/index.ts` remains shared/eager only. Route-local Contact, About and CV implementations must be imported through narrow route-local barrels or direct feature imports and must not enter the common graph through convenience re-exports.
- Preserve the current hard budgets: entry JavaScript `358400` bytes, entry CSS `40960` bytes, CV PDF `524288` bytes, and exactly two generated A4 CV pages.
- Do not update Windows visual baselines merely because implementation changed. The accepted About/CV snapshots must pass twice unchanged. A new Contact-route baseline requires Harley's acceptance of the rendered route first.
- Slices D–G are out of scope except for the single homepage contact-link destination change.

## Merged baseline to preserve

- Base commit: `8a81c56` (`refactor: implement React composition grammar slices A-B (#51)`).
- Baseline unit suite: 70 files and 192 tests passing.
- Baseline production build: entry JS `212406/358400`, entry CSS `22456/40960`, CV PDF `220107/524288`, two PDF pages.
- Baseline lazy chunks: About JS `14787` bytes with `2734` route CSS bytes; CV JS `10000` bytes with `2375` route CSS bytes. Both import the shared components chunk and remain absent from the initial entry's static imports.
- Protected visual contracts: `about-current-work`, `about-cv-conversion` at desktop/mobile, and CV page 1 at desktop/mobile. The Contact route starts from the current `.about-contact` two-column composition rather than a new visual concept.

## File and ownership map

- `src/client/src/components/StatePanel.tsx` owns the complete full-page state hierarchy, live announcement and recovery navigation.
- `src/client/src/components/RouteLoadingStatus.tsx` owns only the compact hydration/loading message used before a lazy route resolves.
- `src/client/src/components/content/PublicationPrimitives.tsx` owns the shared button/link action treatment used by publication and professional surfaces.
- `src/client/src/components/editorial/EditorialHeading.tsx` owns typed display/balanced/single-line wrapping; `EditorialPullQuote.tsx` owns both article-serif and site-sans quote treatments.
- `src/client/src/pages/contact/ContactForm.tsx` owns submission state and form/disconnected styling; `ContactSurface.tsx` owns the standalone route composition; `ContactPage.tsx` owns route metadata and endpoint selection.
- `src/client/src/pages/about/` owns About intro, conversion, story, timeline, independent-work and route-evidence composition. `AboutPage.tsx` owns copy, project data and the legacy hash redirect.
- `src/client/src/pages/cv/` owns CV screen composition and component-specific print rules. `CvPage.tsx` owns facts, project/education data and page ordering.
- `src/client/src/pages/CvPage.scss` remains only for genuine document-page mechanics such as `@page`, print root/shell suppression and the print canvas.
- `src/client/src/styles/global.scss` and `interior.scss` retain foundations and later-slice selectors only; all completed Slice C selector families are removed.

---

### Task 1: Make common page states and shared actions self-owned

**Files:**
- Modify: `src/client/src/components/content/PublicationPrimitives.tsx`
- Modify: `src/client/src/components/content/PublicationPrimitives.test.tsx`
- Modify: `src/client/src/components/StatePanel.tsx`
- Create: `src/client/src/components/StatePanel.test.tsx`
- Create: `src/client/src/components/RouteLoadingStatus.tsx`
- Delete: `src/client/src/components/AccessibleStatus.tsx`
- Modify: `src/client/src/components/index.ts`
- Modify: `src/client/src/app/router.tsx`
- Modify: `src/client/src/pages/LoadingPage.tsx`
- Modify: `src/client/src/pages/ErrorPage.tsx`
- Modify: `src/client/src/pages/NotFoundPage.tsx`
- Modify: `src/client/src/pages/AreaPlaceholderPage.tsx`
- Modify: `src/client/src/components/RouteErrorBoundary.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/src/styles/interior.scss`

**Interfaces:**
- Consumes: existing `PortfolioTheme`, React Router `Link`, `SiteLayout`, and page-owned state copy.
- Produces:

```ts
export type StateAction = Readonly<{
  label: string
  to: string
}>

type StatePanelProps = {
  id: string
  title: string
  messages: readonly string[]
  headingLevel?: 1 | 2
  announcement?: 'none' | 'status' | 'alert'
  routeLoading?: boolean
  actions?: readonly StateAction[]
}

type RouteLoadingStatusProps = {
  children: string
}

const actionControlStyles = css`/* the existing bounded dark action contract */`

export const ActionButton = styled.button`${actionControlStyles}`
export const ActionAnchor = styled.a`${actionControlStyles}`
export const ActionRouteLink = styled(Link)`${actionControlStyles}`
```

- `StatePanel` renders the heading, every message, optional live role on the first message, and an internally styled `nav aria-label="Recovery navigation"`; callers supply values and never a `state-actions` class or internal DOM recipe.
- `RouteLoadingStatus` renders the existing compact Source Code Pro hydration message and `data-route-loading`; it does not adopt full-page panel geometry.
- `ActionButton`, `ActionAnchor` and `ActionRouteLink` share one internal `css` fragment so button, download/hash anchor and client-side route semantics retain one canonical treatment without a wrapper component.

- [x] **Step 1: Add failing state/action contract tests.** In `PublicationPrimitives.test.tsx`, assert `ActionButton`, `ActionAnchor` and `ActionRouteLink` render their native semantics, shared bounded dark treatment, hover transition and no styling props in the DOM. In `StatePanel.test.tsx`, render status, alert, not-found and multi-message fixtures and assert heading level, announcement role, action order/hrefs, `data-route-loading`, and absence of `.state-actions`/`.state-panel` caller hooks.
- [x] **Step 2: Run the focused tests and observe the expected failures.** From `src/client`, run `npm test -- --run src/components/content/PublicationPrimitives.test.tsx src/components/StatePanel.test.tsx src/components/SiteLayout.test.tsx src/pages/ContentPage.test.tsx`. Expected: failures identify the missing typed action and `StatePanel` APIs and old caller-owned state markup.
- [x] **Step 3: Implement the shared primitives.** Reuse one internal action-style fragment for `ActionButton`, `ActionAnchor` and `ActionRouteLink`. Replace `StatePanel`'s children/class API with the typed props above; keep its established max-width, large heading, muted body, spacing and link treatment. Add `RouteLoadingStatus` with the current `.route-loading` padding, muted colour and compact technical type.
- [x] **Step 4: Recompose every state caller.** Convert `LoadingPage`, `ErrorPage`, `NotFoundPage`, `AreaPlaceholderPage`, `RouteErrorBoundary`, and the three `ContentPage` state components to arrow declarations with inferred JSX returns and parent-owned `messages`/`actions`. Replace `hydrateFallbackElement` with `<RouteLoadingStatus>Preparing the portfolio…</RouteLoadingStatus>`. Delete `AccessibleStatus` after its last caller moves.
- [x] **Step 5: Remove only superseded state selectors.** Delete `.route-loading` and `.state-actions` from `global.scss`; remove the now-unneeded `interior.scss` import from `NotFoundPage`. Keep specialist presentation loading and all later-slice state/evidence styles untouched.
- [x] **Step 6: Run the focused state suite.** Run the command from Step 2. Expected: loading and alert announcements, shell/no-shell heading levels, not-found copy, recovery links and content-query error paths pass without class-name assertions.
- [x] **Step 7: Mark Task 1 complete in this plan.** Change only Task 1 boxes to `[x]` after the focused output is observed.

### Task 2: Finish the shared editorial primitives used by professional routes

**Files:**
- Create: `src/client/src/components/editorial/EditorialHeading.tsx`
- Modify: `src/client/src/components/editorial/EditorialPullQuote.tsx`
- Modify: `src/client/src/components/editorial/EditorialPullQuote.test.tsx`
- Modify: `src/client/src/components/editorial/index.ts`
- Retain temporarily until Tasks 4–5 migrate every caller: `src/client/src/components/editorial/EditorialTextWrap.tsx`
- Modify after Tasks 4–5 migrate callers: `src/client/src/components/index.ts`

**Interfaces:**
- Consumes: existing typed theme and semantic heading props.
- Produces:

```ts
export type EditorialHeadingWrap = 'display' | 'balanced' | 'single-line'

type EditorialHeadingProps = ComponentPropsWithoutRef<'h2'> & {
  as?: 'h1' | 'h2' | 'h3'
  wrap: EditorialHeadingWrap
}

type EditorialPullQuoteProps = {
  children: ReactNode
  attribution?: string
  typeRegister?: 'article-serif' | 'site-sans'
}
```

- `EditorialHeading` sets `data-text-wrap` itself and uses a transient wrap prop; callers do not repeat a component name plus an unrelated data attribute.
- `EditorialPullQuote` keeps the current article-serif default. `typeRegister="site-sans"` owns the accepted About quote's zero border/background, Source Sans 3, non-italic weight/size/leading and site-sans citation treatment inside the primitive.

- [x] **Step 1: Write failing variant tests.** Assert all three `EditorialHeading` values produce their declared `data-text-wrap` and expected balance/no-wrap rule. Extend `EditorialPullQuote.test.tsx` to cover the article default and `site-sans`, including Source Sans 3, normal style, weight 650, transparent background and absence of the article accent rule.
- [x] **Step 2: Run tests to prove the old contract is incomplete.** From `src/client`, run `npm test -- --run src/components/editorial/EditorialPullQuote.test.tsx src/components/content/PublicationPrimitives.test.tsx`. Expected: the site-sans treatment and typed heading API fail before implementation.
- [x] **Step 3: Implement `EditorialHeading` and the transient quote variant.** Keep exact current wrap behaviour and move the About-only quote declarations from `AboutPage.scss` into conditional styled-component rules. Do not create a parallel token set or a second pull-quote component.
- [x] **Step 4: Keep the transition buildable.** Export `EditorialHeading` from the narrow `components/editorial` barrel while retaining the old heading exports until Tasks 4 and 5 migrate their callers. Do not re-export the route-lazy editorial barrel through the root components barrel after the final caller migration.
- [x] **Step 5: Run the focused editorial tests.** Run the command from Step 2. Expected: both quote registers and all wrap variants pass without About-owned descendant selectors.
- [x] **Step 6: Mark Task 2 complete in this plan.** Change only Task 2 boxes to `[x]` after the focused output is observed.

### Task 3: Move Contact to a first-class lazy route

**Files:**
- Create: `src/client/src/pages/ContactPage.tsx`
- Create: `src/client/src/pages/ContactPage.test.tsx`
- Create: `src/client/src/pages/contact/ContactForm.tsx`
- Move/modify test: `src/client/src/components/ContactForm.test.tsx` to `src/client/src/pages/contact/ContactForm.test.tsx`
- Create: `src/client/src/pages/contact/ContactSurface.tsx`
- Create: `src/client/src/pages/contact/index.ts`
- Delete: `src/client/src/components/ContactForm.tsx`
- Modify: `src/client/src/components/index.ts`
- Modify: `src/client/src/app/router.tsx`
- Modify: `src/client/scripts/generate-route-catalogue.mjs`
- Regenerate: `src/client/src/data/routes/route-metadata.generated.json`
- Modify: `src/client/src/data/routes/routeCatalogue.test.ts`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/pages/CvPage.tsx`
- Modify: `src/client/src/features/home/ProfessionalClose.tsx`
- Modify: `src/client/scripts/generate-cv-pdf.test.ts`
- Create: `src/client/e2e/contact.spec.ts`
- Modify: `src/client/e2e/about.spec.ts`
- Modify: `src/client/e2e/cv.spec.ts`
- Modify: `.agents/doctrine/portfolio-design-policy.md`
- Modify: `docs/design-decisions.md`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes: `siteRuntime.contactFormEndpoint`, `professionalProfile.publicLinks`, shared `ActionButton`, `DocumentMetadata`, `EditorialHeading`, `Eyebrow`, `ExternalLink`, and `SiteLayout`.
- Produces a lazy `/contact` route with canonical metadata, `data-visual-contract="contact-route"`, and the existing Contact hierarchy: eyebrow/title/intro column followed by the configured or disconnected form column.
- `ContactForm` keeps `SubmissionState = 'idle' | 'submitting' | 'sent' | 'error'` local and keeps the existing safe-HTTPS endpoint guard, exact FormData payload, honeypot, retained text on failure and reset on success.
- `ContactSurface` receives heading/copy/form as typed props or named slots; it owns grid, border, spacing and responsive collapse. It does not own the endpoint or public profile data.

- [x] **Step 1: Add route and form tests before moving implementation.** Copy the existing form behaviour assertions to the route-local test, removing class queries in favour of labels/roles and durable data attributes. Add `ContactPage.test.tsx` for title, canonical `/contact`, site-sans register, form presence and no plaintext `mailto:`/`tel:`. Add a route-catalogue assertion for `{ id: 'contact', path: '/contact', kind: 'contact', indexability: 'index', shareAction: 'none' }`.
- [x] **Step 2: Run focused tests and observe the missing route.** From `src/client`, run `npm test -- --run src/pages/contact/ContactForm.test.tsx src/pages/ContactPage.test.tsx src/data/routes/routeCatalogue.test.ts src/pages/CvPage.test.tsx scripts/generate-cv-pdf.test.ts`. Expected: Contact route/catalogue assertions fail before implementation; copied form tests continue to describe the existing behaviour.
- [x] **Step 3: Build the route-local Contact composition.** Move `ContactForm` under `pages/contact`, keep its state and transport logic intact, and replace every `contact-*` class recipe with internal styled components and transient state styling. Add `ContactSurface` using the current two-column `.about-contact` geometry and collapse breakpoint. Add `ContactPage` with title `Contact | Harley Bartles`, description `Contact Harley Bartles about senior full-stack engineering roles, portfolio work or an interesting engineering problem through the configured privacy-preserving form.`, canonical path `/contact`, heading `Get in touch.`, and the current intro: `If you're hiring, want to ask about something on the site, or just have an interesting engineering problem, send me a note.`
- [x] **Step 4: Wire the route and canonical metadata.** Add `contact` to `INDEX_ROUTES` in `generate-route-catalogue.mjs`, add the lazy `ContactPage` route in `appRoutes`, then run `npm run routes:apply`. Assert `/contact` is generated and indexable. Do not hand-edit `route-metadata.generated.json`.
- [x] **Step 5: Move every owned contact journey.** Change the About conversion, homepage professional close and CV link from `/about#contact` or `#contact` to `/contact`. Remove `focusContact`. In `AboutPage`, use `useLocation` plus `<Navigate to="/contact" replace />` when the current hash is `#contact`, preserving old links without an effect or duplicate Contact render. Update CV PDF link-rewrite fixtures to expect `https://harleybartles.com/contact`.
- [x] **Step 6: Update current design authority.** Amend the policy so About remains the explicit professional assessment surface while Contact is its own privacy-preserving conversion route reached from About, CV and the homepage close. Add a dated ledger entry explaining the route move, its discoverability, the compatibility redirect and the reconsideration trigger. Do not rewrite historical phase specs.
- [x] **Step 7: Retire the old contact ownership.** Remove `ContactForm` from the root components barrel, delete the old component file, and remove `.about-contact`, `.contact-form`, `.contact-field`, `.contact-submit`, `.contact-privacy`, `.contact-disconnected` and their responsive rules from `global.scss` only after the new route-local components pass.
- [x] **Step 8: Run focused unit and browser tests.** Run the Step 2 unit command, then `npm run test:e2e -- e2e/contact.spec.ts e2e/about.spec.ts e2e/cv.spec.ts e2e/link-behavior.spec.ts`. Expected: direct `/contact` load, metadata, privacy, configured submission, failure retention, `/about#contact` redirect and all three updated inbound journeys pass.
- [x] **Step 9: Capture the intentional route move for Harley.** At 1440 and 390 CSS pixels, capture the old Contact section from base `8a81c56` and the new `contact-route` surface into the off-repo task scratch. Confirm the same hierarchy, type roles, field geometry and state treatments; do not add or update a committed visual baseline until Harley accepts the standalone render.
- [x] **Step 10: Mark Task 3 complete in this plan.** Focused unit/browser output and the route comparison captures were observed; the standalone Contact route preserves the existing hierarchy and geometry.

### Task 4: Recompose About from route-owned typed units

**Files:**
- Modify: `src/client/src/pages/AboutPage.tsx`
- Create: `src/client/src/pages/about/AboutComposition.tsx`
- Create: `src/client/src/pages/about/AboutComposition.test.tsx`
- Replace: `src/client/src/pages/about/ProfessionalSurface.tsx`
- Modify/create: `src/client/src/pages/about/index.ts`
- Delete: `src/client/src/pages/AboutPage.scss`
- Delete: `src/client/src/components/CareerTimeline.tsx`
- Delete: `src/client/src/components/CareerTimeline.test.tsx`
- Modify: `src/client/src/components/index.ts`
- Modify: `src/client/src/pages/CvPage.test.tsx`
- Modify: `src/client/e2e/about.spec.ts`
- Modify: `src/client/e2e/about-layout.spec.ts`
- Modify: `src/client/e2e/fonts.spec.ts`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/src/styles/interior.scss`

**Interfaces:**
- Consumes: `EditorialHeading`, `EditorialPullQuote`, shared action/link primitives, `Eyebrow`, `ExternalLink`, `ContentSummary`, and parent-owned copy/data from `AboutPage`.
- Produces:

```ts
type AboutIntroProps = {
  headingId: string
  eyebrow: string
  title: string
  lead: ReactNode
}

type NextRolePanelProps = {
  headingId: string
  eyebrow: string
  title: string
  body: readonly ReactNode[]
  actions: ReactNode
}

type ProfessionalStoryProps = {
  headingId: string
  eyebrow: string
  period?: string
  title: string
  lead: ReactNode
  children: ReactNode
  layout?: 'split' | 'stacked'
  visualContract?: string
  railKind?: 'chronology' | 'context'
}

type ProfessionalTimelineEntry = Readonly<{
  id: string
  period: string
  title: string
  body: ReactNode
  kind?: 'career' | 'aside'
}>

type IndependentWorkProps = {
  projects: readonly ContentSummary[]
}
```

- `ProfessionalStory` renders rail, heading, lead and body in the accepted order. `lead` replaces the current `p:first-of-type` styling dependency; `layout="stacked"` expresses the study variation without `.about-study` reach-through.
- `ProfessionalTimeline` receives the About-authored entries from the page and preserves their current h3 hierarchy and `aside` semantics. It does not substitute the differently worded `professionalProfile.career` dataset.
- The currently unused generic `CareerTimeline` is deleted rather than left as a second canonical timeline grammar.

- [x] **Step 1: Write failing composition tests.** In `AboutComposition.test.tsx`, use short fixtures to assert intro title/lead order, conversion actions, professional rail/title/lead/body order, stacked versus split contracts, timeline source order and `aside` semantics, and parent-owned project ordering. Strengthen `CvPage.test.tsx` to assert normal `/about` no longer renders Contact while `/about#contact` redirects to `/contact`.
- [x] **Step 2: Run the focused About suite and observe the missing components.** From `src/client`, run `npm test -- --run src/pages/about/AboutComposition.test.tsx src/pages/CvPage.test.tsx src/components/editorial/EditorialPullQuote.test.tsx`. Expected: new typed composition assertions fail before implementation while existing content facts remain protected.
- [x] **Step 3: Implement the route-local composition.** Built typed About composition units with their own semantic structure, responsive geometry and styling; static entries and project summaries remain parent-owned in `AboutPage`.
- [x] **Step 4: Recompose `AboutPage` without changing its approved story.** Keep every current sentence and the order `intro → next role → current work → career → independent work → study`. Use `EditorialHeading wrap=...` without caller-supplied wrap attributes, keep the site-sans pull quote variant, point the conversion to `/contact`, and retain the `about-current-work`/`about-cv-conversion` data contracts.
- [x] **Step 5: Remove obsolete component and selector paths.** Deleted the obsolete About/Career surfaces, root editorial re-exports, global About selector families and the About `interior.scss` import. The lazy About route uses narrow route/editorial imports.
- [x] **Step 6: Update browser assertions to semantic contracts.** Replace `.about-intro`, `.about-contact`, `.career-timeline__*`, `.text-link` and `.button-link` selectors in About/layout/font tests with roles, heading relationships, `data-visual-contract`, `data-professional-story`, `data-professional-rail`, and component-owned action attributes. Keep exact baseline filenames unchanged.
- [x] **Step 7: Run focused unit and browser barometers.** Run the Step 2 unit command, then `npm run test:e2e -- e2e/about.spec.ts e2e/about-layout.spec.ts e2e/fonts.spec.ts`. Run `npm run test:e2e:visual -- --grep "about page"` twice without `--update-snapshots`. Expected: accepted current-work and conversion images pass unchanged at desktop/mobile; only the contact destination and removal from the page are intentional behavioural changes.
- [x] **Step 8: Mark Task 4 complete in this plan.** Focused output and twice-run visual proof were observed unchanged.

### Task 5: Make CV composition self-owning without weakening print/PDF proof

**Files:**
- Modify: `src/client/src/pages/CvPage.tsx`
- Create: `src/client/src/pages/cv/CvDocument.tsx`
- Create: `src/client/src/pages/cv/CvContent.tsx`
- Create: `src/client/src/pages/cv/CvContent.test.tsx`
- Delete: `src/client/src/pages/cv/CvSurface.tsx`
- Modify: `src/client/src/pages/cv/index.ts`
- Modify: `src/client/src/pages/CvPage.scss`
- Modify: `src/client/src/pages/CvPage.test.tsx`
- Modify: `src/client/e2e/cv.spec.ts`
- Modify: `src/client/e2e/cv-layout.spec.ts`
- Modify: `src/client/e2e/fonts.spec.ts`
- Modify: `src/client/scripts/generate-cv-pdf.test.ts`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes: `ActionAnchor`, `EditorialHeading`, `ExternalLink`, `ContentSummary`, `EducationRecord`, and parent-owned professional facts.
- Produces:

```ts
type CvLink = Readonly<{
  label: string
  href: string
  external?: boolean
}>

type CvHeaderProps = {
  headingId: string
  name: string
  headline: string
  availability: string
  links: readonly CvLink[]
  downloadHref: string
}

type CvSectionProps = {
  headingId: string
  title: string
  headingWrap?: 'balanced' | 'single-line'
  divider?: 'standard' | 'none'
  children: ReactNode
}

type CvProjectListProps = {
  projects: readonly ContentSummary[]
}

type CvEducationListProps = {
  records: readonly EducationRecord[]
}
```

- `CvSection divider="none"` replaces `CvSheet > .cv-header + .cv-section`; the page selects a real visual variation without exposing child class names.
- `CvHeader` owns identity, download, headline, detail/link layout and external-link print URLs. `CvRole`, `CvProjectList`, `CvSkills`, `CvEducationList`, and `CvDownloadFooter` own their current repeated structures and print behaviour.
- `CvPage.scss` contains only the `@page` rule and document-level print mechanics that genuinely target browser page/shell roots.

- [x] **Step 1: Add failing CV component tests.** Added `CvContent` contract tests for header/links, `divider="none"`, role metadata, supplied project ordering, education pairing, both download actions, privacy and transient-prop absence.
- [x] **Step 2: Run focused tests and observe the missing typed grammar.** The new contracts were added before the implementation and were subsequently verified together with the existing page/PDF proof.
- [x] **Step 3: Implement `CvDocument` and `CvContent`.** Moved document geometry into `CvDocument` and implemented the typed header, section, role, project, skills, education and download components with current responsive and print behaviour.
- [x] **Step 4: Recompose `CvPage` with unchanged copy and two-sheet order.** Kept the two sheets, headings, data, PDF path and parent-owned facts while replacing class recipes with typed components.
- [x] **Step 5: Preserve only genuine Sass print ownership.** Kept document-level page/shell print mechanics in `CvPage.scss`; moved CV screen and component print rules into their styled owners, removed the `interior.scss` import and deleted obsolete surface files.
- [x] **Step 6: Replace implementation selectors in browser tests.** Browser checks use semantic roles and owned data contracts instead of old implementation classes, and verify the canonical Contact target.
- [x] **Step 7: Run focused CV proof.** Focused unit/browser proof and production build passed; generated PDF remains two pages and beneath the byte ceiling.
- [x] **Step 8: Run visual baselines twice unchanged.** CV visual checks passed twice without baseline writes.
- [x] **Step 9: Mark Task 5 complete in this plan.** Unit, browser, PDF/build and twice-run visual proof passed.

### Task 6: Prove selector retirement, lazy boundaries and the complete Slice C result

**Files:**
- Modify only for durable outcome assertions: `src/client/e2e/accessibility.spec.ts`, `src/client/e2e/narrow-navigation.spec.ts`, `src/client/e2e/link-behavior.spec.ts`, `src/client/e2e/visual-regression.spec.ts`
- Modify: `.agents/plans/portfolio-10k/2026-09-04-react-composition-professional-surfaces-and-states.md`
- Regenerate: affected `INDEX.md` files via the canonical mesh tool

**Interfaces:**
- Consumes: completed Tasks 1–5 and baseline measurements recorded above.
- Produces: a clean, independently reviewable Slice C branch/PR with no completed-surface global selector owner, no new eager route dependency, unchanged accepted visual baselines, and durable D–G batons.

- [x] **Step 1: Audit completed ownership adversarially.** The scan found no completed About, Contact, CV or common-state selector family. Remaining class hooks belong to later Slice D–G surfaces, route-local content grammar, or deliberately retained shared shell behaviour; the sole `.state-actions` hit is the negative regression assertion.

```powershell
rg -n "className=|\.about-|\.career-timeline|\.contact-|\.cv-|\.state-actions|\.route-loading|button-link|blockquote\[data-type-register='site-sans'\]" src/client/src/pages src/client/src/components src/client/src/styles
```

Classify every hit. Expected retained hits are deliberate data/behaviour hooks, route-local internals, genuine print roots, or later-slice code; no About, Contact, CV or common-state parent reaches into a migrated child's DOM, and no `.button-link` implementation remains.
- [x] **Step 2: Run the complete focused unit set.** The 12 focused files passed 53 tests, including parent-supplied timeline, project and CV-copy contracts.

```powershell
npm test -- --run src/components/StatePanel.test.tsx src/components/content/PublicationPrimitives.test.tsx src/components/editorial/EditorialPullQuote.test.tsx src/pages/contact/ContactForm.test.tsx src/pages/ContactPage.test.tsx src/pages/about/AboutComposition.test.tsx src/pages/cv/CvContent.test.tsx src/pages/CvPage.test.tsx src/pages/ContentPage.test.tsx src/components/SiteLayout.test.tsx src/data/routes/routeCatalogue.test.ts scripts/generate-cv-pdf.test.ts
```

Expected: all Slice C semantics, data order, local state, redirect, canonical routes and PDF contracts pass.
- [x] **Step 3: Run route/accessibility/browser proof.** The complete 74-test route/accessibility/browser set passed. Browser inspection also confirmed the rendered desktop About, CV and Contact surfaces at the production preview.

```powershell
npm run test:e2e -- e2e/contact.spec.ts e2e/about.spec.ts e2e/about-layout.spec.ts e2e/cv.spec.ts e2e/cv-layout.spec.ts e2e/accessibility.spec.ts e2e/link-behavior.spec.ts e2e/narrow-navigation.spec.ts e2e/fonts.spec.ts
```

Expected: `/contact`, `/about`, `/about#contact`, `/cv`, common recovery routes, keyboard focus, Source-family roles, 320px reflow and 200% zoom remain usable. Inspect 1440, 768, 390 and 320 CSS pixels, keyboard-only and reduced-motion states. Treat any hierarchy/treatment ambiguity as a Harley decision, not a baseline update.
- [x] **Step 4: Run the Windows visual suite twice.** Both clean runs passed all 39 signatures. Added durable desktop/mobile captures for the complete About and Contact surfaces, CV sheet two, and both CV print sheets; the existing signatures remained unchanged.
- [x] **Step 5: Prove build, PDF and lazy-loading boundaries.** The build passed at entry JS `212629/358400`, CSS `10225/40960`, and PDF `219470/524288` bytes; the generated CV is two pages. The manifest/direct-request comparison keeps About, CV and Contact behind route chunks: `index.html` dynamically imports those routes and does not statically import their route implementations. The branch's direct route request graph is smaller than main's comparator for `/`, `/about`, `/cv`, `/writing/why-adrs`, `/projects/codex-marketplace`, and `/patch/goldilocks`; no barrel change has broadened those requests.
- [x] **Step 6: Regenerate repository navigation.** `py -3 tools/run.py mesh --apply` updated the affected indexes; `mesh --check` passed. No marketplace-derived skill changed.
- [x] **Step 7: Commit through the tracked gate.** `c8a1fd440043bfdf3b9379e863b6edfb187e3867` committed normally after the tracked full staged `ci --check` gate passed.
- [x] **Step 8: Publish a draft PR and record proof.** Draft PR #52 was updated at that published head with the focused and hooked proof, build/PDF sizes, main-versus-branch manifest/request comparison, visual proof and browser-render inspection.
- [x] **Step 9: Mark Task 6 complete in this plan.** The implementation head, draft PR and recorded proof were verified before this completion record.

## Durable follow-up batons

- **Slice D — shared case-study grammar and project families:** make `CaseStudyBody`, `CaseStudySection`, `CaseStudyDecision` and `CaseStudyEvidence` owned grammar, then migrate Marketplace, Learning Lab, Wild Bunch and Patch Pipeline in separately testable passes. Preserve native evidence and do not create a universal panel.
- **Slice E — authored article-specific compositions:** co-locate specialist body and figure styling after shared publication grammar, retaining PORT-10 hierarchy, précis/body separation, article-specific evidence and missing-media behaviour.
- **Slice F — Patch showcase:** own Lawful Heist, Tournament, Identity Emporium and Patch showcase choreography locally, including the remaining `.patch-index__*` work. Preserve asset custody, semantic source order and narrow-screen/missing-media contracts.
- **Slice G — homepage last:** migrate meaningful movement-internal seams and parent-owned descriptors in its own plan/PR. Preserve the deterministic edition, no-autoplay behaviour, mineral substrate, project-earned colour and accepted homepage baselines. The `/contact` destination change in Slice C does not authorize homepage composition or styling changes.

## Plan self-review and readiness gate

- **Spec coverage:** Slice C covers About/CV, the professional-surface proving ground, `EditorialPullQuote`, typed heading wraps, Contact local state, common loading/error/not-found/recovery furniture, selector retirement, CV print/PDF proof and lazy-boundary evidence. The user-authorized `/contact` move includes route metadata, internal journeys, compatibility, privacy and doctrine updates.
- **Ownership review:** parents own copy, project/education/timeline values, route metadata and recovery-action descriptors. Children own semantic order, responsive layout and styling. Contact owns only its submission state; no new Context, reducer, hook or memo boundary exists.
- **Ambiguity review:** full-page state panels and compact route hydration occupy different hierarchy and remain separate. About's career aside retains its semantic `aside` distinction without an invented treatment. Contact reuses its accepted composition instead of gaining a new standalone-page visual language.
- **Lazy-barrel review:** root barrels expose shared/eager primitives only. Contact/About/CV implementations use narrow side-effect-free route barrels; no route-local module or Sass side effect is re-exported through `components/index.ts`.
- **Visual review:** accepted About/CV baselines are immutable barometers. Contact's relocation is compared directly at desktop/mobile and remains a human visual acceptance gate before any new baseline is committed.
- **Dependency order:** common primitives precede Contact/About/CV consumers; Contact route and canonical destination precede removal from About/CV; component migration precedes selector deletion; authored source precedes generated route/mesh updates; focused proof precedes the hooked commit.
- **Placeholder scan:** no task relies on TBD/TODO, unspecified validation, invented copy, a generic “appropriate” error path or an unnamed command.
- **Plan-readiness rating:** 9/10. The implementation files, interfaces, migration order, route compatibility, visual invariants, exact commands, baseline measurements, generated custody and publication proof are explicit. Harley retains only the intentional visual acceptance of Contact in standalone context.
