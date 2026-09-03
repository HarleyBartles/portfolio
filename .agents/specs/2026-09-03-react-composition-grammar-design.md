# React composition grammar design

**Status:** Ready for local planning.

## Goal

Make React own the portfolio's reusable visual and semantic grammar instead of asking page authors to reconstruct that grammar from raw HTML, class names and stylesheet knowledge.

The target is not `styled.div` everywhere. The target is a component architecture in which route and page components mostly compose named, typed primitives whose semantics, hierarchy, responsive behaviour and styling travel together. Raw semantic HTML remains normal inside those primitives and inside genuinely bespoke evidence or art-direction components.

`styled-components` is the chosen ownership mechanism for React-rendered visual grammar. CSS custom properties remain the sole token-value authority.

## Why this is open now

PORT-10 exposed the architectural cost of the current boundary. The Rian Hughes article was easy to stand up in a locally plausible but unapproved hierarchy because the accepted writing grammar still depended on knowledge of class names, descendant selectors and DOM order. The review caught it, but the component model did not make the approved composition the easiest path.

That is the failure to remove.

The August 29 styled-editorial-grammar work proved the mechanism on a deliberately small slice. It established a typed CSS-variable mirror, `EditorialPullQuote`, heading-wrap primitives and styled About/CV surfaces. Its decision to stop short of a wider migration was sensible while the benefit was hypothetical. PORT-10 supplies the concrete change reason that decision required.

This spec extends that earlier decision. It does not invalidate its token custody, performance discipline or preference for meaningful component ownership.

## Audit: this is a system problem

The current main branch is not a mostly component-owned UI with a few legacy pockets.

GitHub code search against the pre-PORT-10 index returned at least 66 production TSX modules containing `className`; merged main adds further writing-shell and PORT-10 modules. Treat roughly seventy class-bound TSX modules as the order of magnitude, not as a future invariant or a score to optimise.

The 23 substantive SCSS surfaces inspected during this audit total about 190 KB of source, roughly 186 KiB. The largest concentrations are:

- `src/client/src/styles/global.scss` — about 38.6 KB;
- `src/client/src/features/home/HomePage.scss` — about 40.5 KB;
- `src/client/src/features/home/ProjectVisual.scss` — about 12.3 KB;
- `src/client/src/features/patch-showcase/PatchShowcase.scss` — about 12.4 KB;
- `src/client/src/features/patch-showcase/LawfulHeistPage.scss` — about 11.6 KB;
- `src/client/src/features/case-study/learning-lab/LearningLabCaseStudy.scss` — about 11.7 KB;
- `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.scss` — about 10.3 KB.

Only four current styling modules actually define styled components: `EditorialPullQuote`, `EditorialTextWrap`, `ProfessionalSurface` and `CvSurface`. `EditorialThemeProvider` supplies the typed theme around the limited routes that use them.

The problem is visible at every level:

| Surface | Current seam | Architectural risk |
| --- | --- | --- |
| Shared shell | `SiteLayout`, `SiteHeader`, `SiteFooter` plus global selectors | site identity and navigation depend on external DOM/class contracts |
| Interior register | `interior.scss` overrides descendant classes under `.site-shell--interior` | route typography and metadata are an override layer rather than component ownership |
| Writing | `WritingArticleShell`, `MarkdownContent`, continuations/share plus global/article SCSS | approved article hierarchy can be recreated or reordered locally |
| Indexes | `EditorialIndexCard` plus `content-index`, `index-intro`, `writing-list` selector families | card/list/header grammar is coupled to incidental child structure |
| About/CV | partial styled-components migration plus local/global selector reach-ins | the proving ground still leaks implementation details across component boundaries |
| Case studies | thin wrappers such as `CaseStudyBody`, `CaseStudySection`, `CaseStudyDecision`, `CaseStudyEvidence` plus large route SCSS | several "components" are mostly aliases for HTML/class recipes |
| Authored article figures | paired TSX/SCSS files | article-specific components own semantics but not yet their complete visual contract |
| Patch showcase | large bespoke TSX/SCSS compositions | art direction is valid, but ownership is still split across markup and external CSS |
| Homepage | about 53 KB across `HomePage.scss` and `ProjectVisual.scss`, plus movement components | large accepted bespoke system; high migration risk and a separate protected visual boundary |

`global.scss` currently owns both legitimate document foundations and a large amount of component implementation: shell, navigation, common labels, links, content headers, summaries, metadata, statuses, Markdown prose, index cards, writing lists, content navigation, About, CV and print behaviour. `interior.scss` then changes many of those classes through route-wide descendant selectors. This is the central debt.

The existing shared case-study wrappers show the abstraction problem in miniature. `CaseStudyBody` is a `div` plus `case-study-body`; `CaseStudySection` chooses class strings for layout variants; `CaseStudyDecision` is a bare `div/h3/p` recipe; `CaseStudyEvidence` is a paragraph plus a class. They give names to markup, but most of the actual contract still lives elsewhere.

## Governing decision

### 1. React owns reusable composition grammar

A stable visual or semantic relationship that appears across routes or is important enough to protect on one canonical route belongs in a named React component with a deliberate API.

Examples include article headers, index headers and entries, metadata rows, précis/summary treatment, reading measure, continuation navigation, share furniture, common status/action treatments and shared case-study framing.

The public component should express the job, not the HTML primitive. `ArticleHeader`, `ArticleMetadata`, `IndexEntry` or an equally specific repository-native name is useful. `StyledDiv`, `Box2`, or a generic wrapper exported only to avoid writing `<div>` is not.

A primitive earns its place when it owns at least one meaningful contract: semantics, hierarchy, responsive behaviour, accessibility, a stable visual treatment, or a typed variant. If it owns none of those, leave the semantic element local.

### 2. `styled-components` is the default component-ownership mechanism

The current client README says styled-components is reserved for component-scoped dynamic styles. That boundary is now obsolete and must be updated in the first implementation slice.

For React-rendered UI being migrated under this programme, styles should normally live with the component that owns them. Static styling is not a reason to move the contract back into a global Sass selector.

This is a portfolio architecture decision. The repository's generic `web-styling` skill may help with implementation mechanics, but its cross-framework default preference for static CSS is not the authority for this design-system decision.

### 3. CSS custom properties remain canonical tokens

`src/client/src/styles/_tokens.scss` remains the single token-value source. Do not copy colours, spacing scales, type values or motion values into a new JavaScript theme authority.

Promote the existing typed theme from its narrow editorial role to the one portfolio-wide typed mirror needed by shared styled components. Renaming `editorialTheme` to reflect the wider scope is reasonable; maintaining parallel editorial and portfolio themes is not.

The mirror should expose existing CSS variables, not invent a second scale.

### 4. Promote the theme provider when the common shell needs it

The August 29 work kept `ThemeProvider` off the application shell because styled-components was limited to lazy About/CV routes. That optimisation stops making architectural sense once shared shell and publication primitives consume the theme.

When the first common components require it, move the single provider to an application/common-shell boundary such as `AppProviders`. Do this explicitly and measure the cost.

The current entry budgets remain hard: do not raise them to make the migration pass. The existing quality gate rejects an initial JavaScript entry above 358,400 bytes or CSS above 40,960 bytes. Record before/after entry sizes so the work cannot hide a CSS-to-JavaScript transfer. If the chosen common boundary breaches the existing budget, stop for Harley rather than silently raising the ceiling or recreating inconsistent route-local providers.

### 5. Parents compose children; they do not style through them

A migrated component owns its internal styling. A page or parent may position the component as a child, but it must not reach into the component's generated DOM with selectors such as `.parent .child-internal p`, modifier class strings, or assumptions about `:first-child` that belong to the child's visual contract.

Use typed props, internal styled components, or deliberate `styled(Component)` extension when a real variant exists.

The current About override of `blockquote[data-type-register='site-sans']` is an example to remove: the `EditorialPullQuote` variant should own its site-sans treatment itself.

### 6. Variants are typed decisions

Where one component legitimately has several treatments, represent them as a small typed API. Pure styling props should use transient props where appropriate so implementation details do not leak into the DOM.

Do not encode a component's public variant API as a string of BEM modifier classes assembled by callers.

### 7. HTML is not the enemy

Do not wrap every `p`, `span`, `li` or `div` in a public component. Semantic HTML remains the output language.

Raw HTML is appropriate:

- inside a named component whose external contract is already self-owned;
- for one-off semantic structure that has no reusable visual contract;
- inside project-native evidence where the exact content needs its own structure;
- where browser semantics are clearer than an abstraction.

The failure mode is not "there is a `<div>` in TSX". The failure mode is that a route author must know an unrelated stylesheet and DOM convention to make that `<div>` look and behave correctly.

### 8. Bespoke evidence stays bespoke

The Phase 8P visual-language contract remains authoritative. Do not flatten code, screenshots, diagrams, documents, Wild Bunch evidence, Patch story compositions or other project-native material into a universal evidence-card component merely to increase reuse.

Shared primitives should protect common reading grammar around evidence. Project-specific components should own their own styling locally.

### 9. This is an architecture migration, not a redesign

Preserve accepted copy, routes, metadata, accessibility, responsive behaviour and visual direction unless migration exposes a genuine defect. Do not use the refactor as permission to restyle pages, standardise earned differences or replace project-native art direction.

A visual change requires the normal portfolio change protocol and Harley's explicit acceptance.

## Intended end state for stylesheets

Sass remains valid for browser/document foundations that are genuinely global:

- CSS custom-property declarations;
- font-face declarations;
- reset/normalisation and document defaults;
- `html`, `body`, `#root`, selection and global focus foundations;
- unavoidable browser/print page mechanics whose scope is genuinely document-wide;
- temporary legacy selectors that still have a named migration owner.

Reusable React component styling should not remain in `global.scss` after its component has migrated.

`interior.scss` should shrink sharply as shell, typography and content primitives take ownership. Deletion is a valid outcome if no genuine route-level foundation remains, but do not chase file deletion as a metric.

Likewise, do not optimise for a line-count target in `global.scss`. The desired property is clear ownership, not a small file at any cost.

## Migration programme

This is too large for one all-or-nothing pull request. Each slice must be independently reviewable, green and mergeable. Later slices start from the merged result of earlier ones rather than maintaining a long-lived mega-branch.

### Slice A — runtime, policy and shared shell

Purpose: establish the new default and move the most widely shared frame under component ownership.

Open these seams first:

- `src/client/README.md`;
- `src/client/src/styles/_tokens.scss`;
- `src/client/src/styles/editorialTheme.ts` and `styled.d.ts`;
- `src/client/src/components/editorial/EditorialThemeProvider.tsx`;
- `src/client/src/app/AppProviders.tsx`;
- `src/client/src/components/SiteLayout.tsx`;
- `SiteHeader.tsx` and `SiteFooter.tsx`;
- the shell/navigation portions of `global.scss` and `interior.scss`;
- build-budget scripts/tests and shell browser tests.

Expected outcome:

- one application-level typed theme boundary once common components need it;
- component-owned site frame, masthead, navigation, footer and shared metadata/eyebrow/action atoms where those atoms are genuinely stable;
- no visual change to home or interior shell;
- explicit README/policy wording matching the new architecture;
- before/after bundle evidence under the existing budget.

Do not migrate the homepage movements in this slice.

### Slice B — publication grammar: content headers, indexes and prose

Purpose: remove the exact class/DOM reconstruction risk that PORT-10 exposed.

Open:

- `src/client/src/pages/ContentPage.tsx`;
- `src/client/src/features/writing/WritingArticleShell.tsx`;
- `WritingContinuations.tsx` and `AuthoredContinuations.tsx`;
- `src/client/src/components/MarkdownContent.tsx`;
- `ShareAction.tsx`, `ContentNavigation.tsx`, `RelatedContent.tsx`, `ProjectStatus.tsx`;
- `EditorialIndexCard.tsx`;
- `WritingIndexPage.tsx`, `ProjectIndexPage.tsx`, `PatchIndexPage.tsx`;
- the content/index/Markdown/writing-list selector families in `global.scss` and `interior.scss`.

The accepted writing hierarchy must become an owned composition rather than a caller recipe: eyebrow/context, title, metadata, précis, body, authored continuation and share furniture. Exact component names are for local planning, but the hierarchy must be hard to accidentally bypass when adding the next article.

`MarkdownContent` should stop relying on route-global descendant typography for ordinary prose. A component-owned prose root or explicit ReactMarkdown element mapping may be appropriate. Preserve internal/external link behaviour and the fairytale media special case unless a better owned primitive replaces it.

Index surfaces should share only the grammar that is genuinely shared. Writing's peer list, project media cards and Patch stories do not need to become one visually interchangeable card.

### Slice C — professional surfaces and common states

Purpose: finish the original proving ground and remove remaining cross-boundary overrides.

Open:

- `AboutPage.tsx` and `AboutPage.scss`;
- `pages/about/ProfessionalSurface.tsx`;
- `CvPage.tsx`, `CvPage.scss`, `pages/cv/CvSurface.tsx`;
- `EditorialPullQuote` and `EditorialTextWrap`;
- `ContactForm`, `AccessibleStatus`, loading/error/not-found/recovery actions and other genuinely shared state furniture;
- remaining About/CV/state selectors in `global.scss`.

Move `EditorialPullQuote`'s type-register styling into the primitive. Reduce descendant selectors inside `ProfessionalSurface` and `CvSurface` where a named child component or typed composition can express the relationship more honestly.

Preserve CV print/PDF output. Print rules may remain document-level where the browser page model genuinely makes that clearer; do not move them merely to claim a Sass deletion.

### Slice D — shared case-study grammar, then project families

Purpose: turn the existing case-study aliases into real owned grammar without flattening project evidence.

Start with:

- `CaseStudyBody`;
- `CaseStudySection`;
- `CaseStudyDecision`;
- `CaseStudyEvidence`;
- `CaseStudyBody.scss`.

Then migrate project families in bounded follow-ups:

1. Marketplace;
2. Learning Lab;
3. Wild Bunch;
4. Patch Pipeline.

Each project's own evidence components may remain unique. Co-locate their visual contracts with those components and retire the corresponding route SCSS only as ownership moves.

Do not create a universal evidence panel simply to reduce stylesheet count.

### Slice E — authored article-specific compositions

Purpose: make specialist article bodies and figures self-contained after the shared publication grammar is stable.

Candidates include:

- `ProductOwnershipArticle` and its asides/signal map;
- `TestingEvidenceArticle`;
- `ContextComplexityArticle` and figure;
- Vibe, ADR, Provisioning and Review Graph figures;
- PORT-10 `RianHughesArticle` and its wordmark figures;
- `WritingPullQuotes.scss` and the paired article/figure SCSS files.

The Rian Hughes article is a useful regression fixture: its final article header/précis/body hierarchy must remain unchanged while its figure styling becomes locally owned.

### Slice F — Patch showcase

Purpose: self-own the bespoke Patch story compositions without turning them into generic site furniture.

Open `PatchShowcase.scss`, `LawfulHeistPage.scss`, Lawful Heist, Tournament, Identity Emporium and `PatchShowcaseEvidence` in separate bounded steps as needed.

Preserve comic/evidence choreography, asset custody, missing-media behaviour and narrow-screen source order.

### Slice G — homepage, last

The homepage is deliberately last and should be its own plan/PR.

`HomePage.scss` and `ProjectVisual.scss` together account for more than 50 KB of the audited stylesheet source, but `/` is a protected visual boundary with a distinct accepted direction and edition seam. It is the wrong proving ground for the architecture migration.

After the shared component model is stable, migrate the accepted homepage movements to self-owned components without changing their appearance, choreography, current edition, destination-owned teaser model or visual-regression contracts.

The homepage may consume true shell/action foundations. It must not accidentally inherit non-home typography, substrate or composition rules merely because those foundations now use styled-components.

## Migration rules for local implementation

For every slice:

1. Inspect the rendered current state and identify the visual/semantic contract before moving code.
2. Add or strengthen behaviour/structure tests around the contract before removing the old selector path.
3. Build the new owned component composition.
4. Remove only the selectors and classes made redundant by that migration.
5. Prefer roles, accessible names and durable `data-*` visual/behaviour contracts in tests. Do not preserve meaningless class names solely because tests depend on them.
6. Check for parent styles that still reach into migrated child internals.
7. Record any intentional variant as a typed API rather than a caller-assembled modifier class.
8. Run the focused tests, build and browser checks before broad validation.
9. Compare entry JS/CSS sizes when a common dependency boundary changes.
10. Inspect real rendering at 1440, 768, 390 and 320 CSS pixels and actual 200% browser zoom. Keep keyboard, reduced-motion, missing-media and direct-route evidence where the affected surface owns those contracts.
11. Use Windows visual baselines where the existing suite protects the surface. Do not update a baseline merely because implementation changed if the visual result was supposed to remain the same.
12. Commit through the tracked hook. Do not raise budgets or weaken objective gates to make the refactor green.

## Architecture guard after migration begins

Do not add a blunt repository rule that bans `className`. Class names can still be legitimate for behaviour hooks, third-party integration, migration leftovers and uniquely structured evidence.

Do add focused guards that make completed ownership hard to regress. Suitable examples include:

- tests proving migrated shared components render the required semantic hierarchy;
- tests proving callers select typed variants rather than modifier classes;
- checks that retired global selector families do not reappear;
- a bounded allowlist/ledger for remaining production SCSS imports if that proves useful during the migration;
- tests that prevent external stylesheets from becoming the canonical implementation of migrated shared primitives.

Local Sol should choose the smallest maintainable guard after inspecting the current quality tooling. Do not build a bespoke linter merely to count JSX tags.

## Performance and loading boundary

The migration must preserve the existing lazy-route and direct-route contracts.

Moving styled-components into the common shell changes bundle placement even when visual output is identical. Measure this explicitly. The current quality system's initial-entry ceiling is a constraint, not a target to renegotiate.

Do not introduce layout shift or a visible unstyled first state. Re-check the direct-route first-paint and delayed-load behaviour on representative interior routes once the provider/common styled runtime moves.

## Authority and read order for local Sol

Before writing the JIT plan, read in this order:

1. `.agents/specs/2026-09-03-react-composition-grammar-design.md` — this programme and settled architecture.
2. `.agents/doctrine/portfolio-design-policy.md` — current portfolio-wide invariants and change protocol.
3. `docs/editorial-drafts/phase-8/phase-8p-visual-language-contract.md` and its referenced typography/shell/rhythm authorities — protected non-home visual direction.
4. `.agents/specs/2026-08-29-styled-editorial-grammar-design.md` and the August 29 design-decision ledger entry — provenance for the existing typed styled seam.
5. `src/client/README.md`, `_tokens.scss`, the typed theme/provider and build-budget checker — present implementation boundary and performance guard.
6. The current implementations named in Slice A and Slice B, plus their tests and rendered routes.

The generic `web-styling` skill does not reopen the decision to use styled-components. This spec is the repository architecture authority for this migration. Use repository styling/visual-language skills for implementation mechanics and validation where their scopes apply.

## Immediate planning boundary

Local Sol should not turn this spec into a single repository-wide rewrite.

First inspect current main and write a JIT implementation plan for **Slice A and Slice B**. They may be one PR only if the plan demonstrates a coherent, reviewable change with clear internal checkpoints; otherwise split them into two sequential PRs. Do not pull Slice C onward into the first implementation merely because a nearby selector is tempting to clean up.

The first implementation must leave durable follow-up batons for Slices C–G, updated for anything learned during real migration.

Use the existing `codex/react-composition-grammar` branch for the spec and first planning work. Regenerate repository indexes through the canonical mesh tooling as part of local planning/implementation rather than hand-editing generated index files.

## Non-goals

- No redesign of accepted pages under cover of refactoring.
- No second token source.
- No generic component library detached from the portfolio's actual grammar.
- No ban on semantic HTML.
- No universal evidence-card treatment.
- No forced reuse where project-native art direction is the reason a component exists.
- No change to public copy, routes, metadata, privacy contracts or asset custody unless a separate approved defect requires it.
- No homepage migration in the first implementation.
- No bundle-budget increase.
- No mega-PR that leaves half the site on an unreviewable transitional architecture.

## Programme completion test

The programme is complete when adding a normal article, index entry, project shell or other recurring surface primarily means composing approved React primitives rather than remembering class names and descendant selectors; migrated components own their visual contracts; remaining global Sass is genuinely global; bespoke evidence remains free to be bespoke; and all accepted visual, accessibility, performance and route contracts still hold.

The success metric is not "zero CSS files" or "zero raw HTML".

It is that the architecture makes the approved thing the easy thing to build.

**Ready for local planning.**
