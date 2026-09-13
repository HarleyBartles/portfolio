# The Usual Specialists Preview Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the currently published six-Specialist page as the canonical `/patch/the-usual-specialists/` experience while deploying the accepted document-world V2 unchanged at the unlinked `/patch/the-usual-specialists/next/` preview route, so the current long-running PORT-17 PR can merge as a bounded foundation PR.

**Architecture:** Recover the published page from `main` as a frozen `LegacyUsualSpecialistsPage`, return the manifest-backed canonical route to the ordinary `ContentPage` shell, and map `patch-usual-specialists` to that legacy component. Add one explicit router-only preview route that composes the existing V2 `UsualSpecialistsPage` under a full-frame, no-index route wrapper. Keep preview route registration in a tiny separate JSON source consumed only by runtime preview metadata, static route-document generation, and deployed-route checking; it must never enter the content manifest, generated public route catalogue, sitemap, homepage, Patch index, continuations, or related-content data. Move all current V2 structural, responsive, visual, and accessibility evidence to `/next/` while adding separate proof that the canonical route still renders the frozen published experience.

**Tech Stack:** React 19, TypeScript, React Router, TanStack Query, styled-components, Vitest, Testing Library, Playwright, Vite, Node ESM build tooling, Python deployment checks.

**Spec:** `.agents/specs/2026-09-13-usual-specialists-preview-migration-design.md`

**Execution Strategy:** `executing-plans` — the migration has a strict dependency order. First freeze and restore the legacy canonical experience. Then add the explicit runtime preview route. Then teach static/deployed route tooling about the separate preview route class. Finally retarget V2 browser evidence and prove discovery isolation. Do not start Writ or extend Silk during this plan.

## Current Baseline

- Worktree: `Z:\_agent-worktrees\portfolio\codex\port-17-index-react`.
- Branch: `codex/port-17-index-react`.
- Clean planning baseline: `4e33633 docs: lock Specialists preview migration design`.
- Accepted ownership-refactor implementation: `e6e024a refactor: lock Specialists crossing ownership`.
- The working tree was clean before this plan was authored.
- The current V2 implementation remains `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx` and contains the accepted opening, Index, Index-to-Silk crossing, and current Silk work only.
- The exact published legacy page is still recoverable from `main:src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx` and its matching test.

## Global Constraints

- Keep the current branch and worktree. Do not create another branch or PR for this migration.
- The public canonical route remains `/patch/the-usual-specialists/` throughout this plan.
- The V2 preview route is exactly `/patch/the-usual-specialists/next/`.
- Keep the V2 component identity `UsualSpecialistsPage`. Do not rename the V2 tree to `Next`.
- Recover the published page from `main` as `LegacyUsualSpecialistsPage`. Treat it as frozen compatibility code: copy the published source, rename the exported component, and do not redesign, modernize, restyle, extract, or otherwise refactor it.
- Restore only the published canonical experience. **Do not restore the obsolete `/patch/lawful-heist` redirect from `main`; the current 404 contract for that route remains authoritative.**
- During migration, `patch-usual-specialists` resolves to `LegacyUsualSpecialistsPage`.
- The preview route is an explicit React Router route, not a content-manifest item and not another project-presentation identity.
- The preview route must be directly deployable with its own generated `dist/patch/the-usual-specialists/next/index.html`.
- The preview is `noindex, nofollow`, has no canonical link, and carries no `og:url`, `og:image`, or Twitter-image publication metadata.
- Reuse the existing `DocumentMetadata` `noIndex` behavior and the existing static `renderMetadata()` no-index branch. Do not invent a second SEO component or metadata model.
- Keep preview-route registration separate from `content-manifest.json` and `route-metadata.generated.json`.
- Do not add `/next/` to `public/sitemap.xml`, `expected_public_routes()`, homepage navigation, Patch index links, writing continuations, related content, content navigation, or any other discovery surface.
- Do not add a redirect between canonical and preview routes.
- Do not change accepted Index/Silk geometry, responsive media boundaries, rope ownership, component ownership, current V2 prose, or commissioned assets.
- Do not update protected V2 visual snapshots. The path changes; the rendered V2 pixels do not.
- Do not generate or replace image assets.
- Do not add Writ, Klause, Rollback, Receipt, later integration polish, or final cutover behavior.
- Do not push, merge, publish, close the PR, or mutate PR state without separate explicit authority.
- Implementation must not begin merely because this plan exists. The plan is the durable handoff; execution requires the next explicit implementation instruction.

## Task 1: Freeze the published legacy page and restore the canonical ContentPage shell

**Files:**
- Create from `main`: `src/client/src/features/patch-showcase/LegacyUsualSpecialistsPage.tsx`
- Create from `main`: `src/client/src/features/patch-showcase/LegacyUsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/features/case-study/projectPresentations.ts`
- Modify: `src/client/src/features/case-study/projectPresentations.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/src/pages/PatchRoutes.test.tsx`

**Interfaces:**
- Consumes: the exact published pre-PORT-17 component on `main`, the manifest presentation identity `patch-usual-specialists`, and the ordinary `ContentPage` composition that `main` used for the published page.
- Produces: a frozen `LegacyUsualSpecialistsPage` rendered by the canonical manifest-backed route inside the same ordinary content shell visitors currently know, while leaving the V2 `UsualSpecialistsPage` source untouched and ready for the explicit preview route in Task 2.

- [x] **Step 1: Write the canonical-route regression first.**

Replace the current V2-specific canonical test in `PatchRoutes.test.tsx` with a legacy-publication contract. Keep the existing `/patch/lawful-heist` 404 test unchanged.

The canonical route test must require all of the following before production changes:

```tsx
const router = renderRoute('/patch/the-usual-specialists')

expect(router.state.location.pathname).toBe('/portfolio/patch/the-usual-specialists')
expect(await screen.findByRole('heading', { level: 1, name: 'The Usual Specialists' }, { timeout: 15_000 })).toBeVisible()
const story = await screen.findByRole('region', { name: 'The Usual Specialists adventure' }, { timeout: 15_000 })
expect(within(story).getAllByRole('article')).toHaveLength(6)
expect(within(story).getByText('Advanced visual pre-production')).toBeVisible()
expect(within(story).getByRole('img', { name: /completed recruitment folder/i })).toBeVisible()
expect(document.querySelector('[data-visual-contract="patch-usual-specialists-index-draft"]')).toBeNull()
expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index')
expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
  'href',
  'https://harleybartles.com/patch/the-usual-specialists',
)
```

Also require the ordinary content shell to exist rather than the V2 full-frame bypass:

```tsx
expect(document.querySelector('.content-page-header')).not.toBeNull()
expect(document.querySelector('.content-page-body')).not.toBeNull()
```

- [x] **Step 2: Run the canonical route test and verify RED.**

```powershell
npm --prefix src/client test -- --run src/pages/PatchRoutes.test.tsx
```

Expected: the canonical Specialists test fails because the current route still renders V2 full-frame.

- [x] **Step 3: Recover the legacy component byte-for-byte from `main`, then rename only its export.**

Use Git as source custody rather than reconstructing the old page from memory. A Windows-safe raw-byte recovery command is:

```powershell
py -3 -c "import pathlib, subprocess; pathlib.Path(r'src/client/src/features/patch-showcase/LegacyUsualSpecialistsPage.tsx').write_bytes(subprocess.check_output(['git','show','main:src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx']))"
```

Then change only:

```diff
-export function UsualSpecialistsPage() {
+export function LegacyUsualSpecialistsPage() {
```

Do not convert its function declarations to arrows, extract styled components, rename legacy CSS classes, or otherwise apply current style preferences to this frozen compatibility surface.

Prove the production file differs from `main` only by that export rename:

```powershell
py -3 -c "import pathlib, subprocess; source=subprocess.check_output(['git','show','main:src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx']).decode('utf-8'); expected=source.replace('export function UsualSpecialistsPage()', 'export function LegacyUsualSpecialistsPage()'); actual=pathlib.Path(r'src/client/src/features/patch-showcase/LegacyUsualSpecialistsPage.tsx').read_text(encoding='utf-8'); assert actual == expected"
```

- [x] **Step 4: Recover and rename the published legacy component test.**

Recover `main:src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx` into `LegacyUsualSpecialistsPage.test.tsx`, then make only the identity changes needed to import/render `LegacyUsualSpecialistsPage` and describe it as the frozen published story.

Keep the published behavior assertions intact:

```tsx
expect(profiles).toHaveLength(6)
expect(profiles.map((profile) => profile.getAttribute('data-specialist'))).toEqual([
  'index', 'silk', 'writ', 'klause', 'rollback', 'receipt',
])
expect(within(story).getAllByRole('img')).toHaveLength(15)
expect(within(story).getByText('Advanced visual pre-production')).toBeVisible()
expect(within(story).getByRole('link', { name: /engineering case study/i })).toHaveAttribute(
  'href',
  '/portfolio/projects/adventures-of-patch',
)
```

- [x] **Step 5: Point the canonical presentation identity at the frozen component.**

In `projectPresentations.ts`, change only the `patch-usual-specialists` entry:

```ts
'patch-usual-specialists': lazy(async () => ({
  default: (await import('../patch-showcase/LegacyUsualSpecialistsPage')).LegacyUsualSpecialistsPage,
})),
```

Update `projectPresentations.test.tsx` so its canonical presentation variable is named `LegacyUsualSpecialistsPage` and the rendered assertion proves the six-Specialist legacy region rather than merely finding the title:

```tsx
const story = await screen.findByRole('region', { name: 'The Usual Specialists adventure' }, { timeout: 15_000 })
expect(within(story).getAllByRole('article')).toHaveLength(6)
```

Do not register V2 as another presentation identity.

- [x] **Step 6: Remove the V2-only full-frame bypass from manifest-backed `ContentPage`.**

The current branch added this V2-specific canonical behavior:

```ts
const routeOwnsFrame = document.summary.presentation === 'patch-usual-specialists'
```

and:

```tsx
<SiteLayout mainFrame={routeOwnsFrame ? 'full' : 'contained'}>
  ...
  {routeOwnsFrame && Presentation !== undefined ? (
    <Suspense fallback={<SpecialistPresentationLoading />}>
      <Presentation />
    </Suspense>
  ) : <ContentArticle>...</ContentArticle>}
</SiteLayout>
```

Return the manifest-backed route to the ordinary `main` composition:

```tsx
<SiteLayout>
  <DocumentMetadata
    title={`${document.summary.title} | Harley Bartles`}
    description={document.summary.summary}
    canonicalPath={getContentPath(document.summary)}
  />
  <ContentArticle
    kind={document.summary.kind}
    visualLanguage={document.summary.kind === 'writing' ? 'authored-longform' : document.summary.kind}
    register={document.summary.kind === 'writing' ? 'article-serif' : 'site-sans'}
  >
    {/* existing ordinary content composition */}
  </ContentArticle>
</SiteLayout>
```

Do not invent a generic frame-mode field in the presentation registry for this migration. V2 full-frame ownership moves to the explicit preview route in Task 2. Final cutover can deliberately restore V2 full-frame ownership when it switches the canonical presentation later.

- [x] **Step 7: Update the `ContentPage` canonical boundary test.**

Change the `patch-usual-specialists` presentation mock to a minimal legacy-shaped region, for example:

```tsx
presentation === 'patch-usual-specialists'
  ? () => React.createElement(
      'section',
      { 'aria-label': 'The Usual Specialists adventure', 'data-visual-contract': 'patch-usual-specialists' },
      React.createElement('p', undefined, 'Frozen legacy specialists body'),
    )
  : undefined
```

Replace the current assertion that Specialists bypasses `.content-page-header` / `.content-page-body` with proof that canonical Specialists uses the ordinary shell and retains canonical metadata:

```tsx
expect(screen.getByText('Harley Bartles')).toBeVisible()
expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index')
expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
  'href',
  'https://harleybartles.com/patch/the-usual-specialists',
)
expect(container.querySelector('.content-page-header')).not.toBeNull()
expect(container.querySelector('.content-page-body')).not.toBeNull()
expect(screen.getByRole('region', { name: 'The Usual Specialists adventure' })).toBeVisible()
```

- [x] **Step 8: Run the focused canonical suite.**

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/LegacyUsualSpecialistsPage.test.tsx src/features/case-study/projectPresentations.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx
```

Expected: all pass, including the still-existing `/patch/lawful-heist` 404 assertion.

- [x] **Step 9: Mark Task 1 complete in this plan only after the focused suite is green.**

Change every Task 1 checkbox above from `[ ]` to `[x]` only after the exact recovered legacy source has been verified against `main` and the focused suite passes. If execution commits are authorized, include this plan-progress edit in the Task 1 commit rather than leaving tracking dirt behind.

> **Execution ruling (2026-09-13):** The attempted Task 1-only normal commit was correctly rejected by the complete hook because the existing V2 Playwright and protected-visual tests still targeted the canonical route that Task 1 had just restored to legacy. Tasks 1-4 therefore form one gate-coupled migration checkpoint in this execution. Do not bypass the hook or weaken those tests; complete the approved preview route and route-test migration before retrying the normal commit.

### Task 2: Add the explicit V2 preview route with runtime no-index metadata

**Files:**
- Create: `src/client/src/data/routes/preview-routes.json`
- Create: `src/client/src/pages/UsualSpecialistsPreviewPage.tsx`
- Create: `src/client/src/pages/UsualSpecialistsPreviewPage.test.tsx`
- Modify: `src/client/src/app/router.tsx`
- Modify: `src/client/src/components/DocumentMetadata.test.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Modify: `src/client/src/pages/PatchRoutes.test.tsx`

**Interfaces:**
- Consumes: the unchanged V2 `UsualSpecialistsPage`, `SiteLayout mainFrame="full"`, existing `DocumentMetadata noIndex`, and one authored preview-route registration.
- Produces: a directly addressable `/patch/the-usual-specialists/next/` route that owns V2 without participating in manifest/content discovery or canonical metadata.

- [x] **Step 1: Add the one explicit preview-route registration outside the content manifest.**

Create `src/client/src/data/routes/preview-routes.json` with no content kind, slug, related content, share action, social image, or canonical identity:

```json
[
  {
    "path": "/patch/the-usual-specialists/next/",
    "title": "The Usual Specialists Preview | Harley Bartles",
    "description": "Unlinked preview of the in-progress document-world edition of The Usual Specialists.",
    "indexability": "noindex"
  }
]
```

This file is the cross-runtime source for preview deployment metadata. It is **not** input to `generate-route-catalogue.mjs`.

- [x] **Step 2: Write the preview route wrapper contract.**

Create `UsualSpecialistsPreviewPage.test.tsx` around a fake `Presentation` component and require:

```tsx
render(
  <PortfolioThemeProvider>
    <MemoryRouter>
      <UsualSpecialistsPreviewPage
        Presentation={() => (
          <article aria-label="The Usual Specialists" data-visual-contract="patch-usual-specialists-index-draft">
            <h1>The Usual Specialists</h1>
          </article>
        )}
      />
    </MemoryRouter>
  </PortfolioThemeProvider>,
)

expect(screen.getByRole('article', { name: 'The Usual Specialists' })).toBeVisible()
expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
expect(document.head.querySelector('meta[property="og:url"]')).toBeNull()
expect(document.head.querySelector('meta[property="og:image"]')).toBeNull()
expect(screen.getByRole('main')).toHaveStyle({ width: '100%', maxWidth: 'none' })
```

Use the same `SiteLayout` full-frame style assertion already owned by `SiteLayout.test.tsx`; do not add a public CSS class solely for this test.

- [x] **Step 3: Implement the specific preview wrapper.**

`UsualSpecialistsPreviewPage.tsx` should accept the already-resolved V2 component from the router so the router can lazy-load V2 directly:

```tsx
import type { ComponentType } from 'react'
import { DocumentMetadata, SiteLayout } from '../components'
import previewRoutes from '../data/routes/preview-routes.json'

type UsualSpecialistsPreviewPageProps = {
  Presentation: ComponentType
}

const previewRoute = previewRoutes.find(
  (route) => route.path === '/patch/the-usual-specialists/next/',
)

if (previewRoute === undefined) {
  throw new Error('The Usual Specialists preview route registration is missing.')
}

export const UsualSpecialistsPreviewPage = ({ Presentation }: UsualSpecialistsPreviewPageProps) => (
  <SiteLayout mainFrame="full">
    <DocumentMetadata
      title={previewRoute.title}
      description={previewRoute.description}
      canonicalPath={previewRoute.path}
      noIndex
    />
    <Presentation />
  </SiteLayout>
)
```

Do not add content navigation, related content, share actions, or a preview banner around V2. The preview should render the exact V2 composition under its intended site chrome.

- [x] **Step 4: Add the explicit router entry and lazy-load V2 directly.**

Add a route loader in `app/router.tsx`:

```tsx
const loadUsualSpecialistsPreviewRoute = async () => {
  const [{ UsualSpecialistsPage }, { UsualSpecialistsPreviewPage }] = await Promise.all([
    import('../features/patch-showcase/UsualSpecialistsPage'),
    import('../pages/UsualSpecialistsPreviewPage'),
  ])

  return {
    Component: () => (
      <UsualSpecialistsPreviewPage Presentation={UsualSpecialistsPage} />
    ),
  }
}
```

Register the exact explicit path next to the Patch routes:

```tsx
{
  path: 'patch/the-usual-specialists/next',
  lazy: loadUsualSpecialistsPreviewRoute,
},
```

Place it before `patch/:slug` for human readability even though React Router route ranking makes the nested explicit path unambiguous.

- [x] **Step 5: Strengthen the existing `DocumentMetadata` no-index proof.**

In `DocumentMetadata.test.tsx`, first render a public route to seed canonical/social metadata, then rerender a no-index preview and assert the existing cleanup semantics remove publication identity:

```tsx
const { rerender } = render(
  <DocumentMetadata
    title="Project Stories | Harley Bartles"
    description="Selected public engineering project stories from Harley Bartles."
    canonicalPath="/projects"
  />,
)

rerender(
  <DocumentMetadata
    title="The Usual Specialists Preview | Harley Bartles"
    description="Unlinked preview of the in-progress document-world edition of The Usual Specialists."
    canonicalPath="/patch/the-usual-specialists/next/"
    noIndex
  />,
)

expect(readMeta('robots')).toHaveAttribute('content', 'noindex, nofollow')
expect(readCanonical()).toBeNull()
expect(readProperty('og:url')).toBeNull()
expect(readProperty('og:image')).toBeNull()
expect(readMeta('twitter:image')).toBeNull()
```

Do not create a preview-specific metadata component.

- [x] **Step 6: Add canonical/preview route separation proof.**

In `PatchRoutes.test.tsx`, retain the Task 1 canonical legacy test and add a separate preview test:

```tsx
const router = renderRoute('/patch/the-usual-specialists/next/')

expect(router.state.location.pathname).toBe('/portfolio/patch/the-usual-specialists/next/')
const story = await screen.findByRole('article', { name: 'The Usual Specialists' }, { timeout: 15_000 })
expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
expect(story.querySelector('[data-specialist-chapter="index"]')).toBeInTheDocument()
expect(story.querySelector('[data-specialist-chapter="silk"]')).toBeInTheDocument()
expect(story.querySelector('[data-specialist-chapter="writ"]')).not.toBeInTheDocument()
expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
expect(document.querySelector('.content-page-header')).toBeNull()
expect(document.querySelector('.content-page-body')).toBeNull()
```

The two route tests must make it impossible for canonical and preview ownership to swap silently.

- [x] **Step 7: Retarget the V2 component-only router context.**

In `UsualSpecialistsPage.test.tsx`, change its three `MemoryRouter` initial entries from canonical to preview:

```tsx
initialEntries={['/portfolio/patch/the-usual-specialists/next/']}
```

Do not change any V2 structure, ownership, or visual assertions.

- [x] **Step 8: Run the runtime preview suite.**

```powershell
npm --prefix src/client test -- --run src/components/DocumentMetadata.test.tsx src/pages/UsualSpecialistsPreviewPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

Expected: canonical legacy and preview V2 both pass, and the preview has no canonical identity.

- [x] **Step 9: Mark Task 2 complete and record the intentional stage boundary.**

Change the Task 2 checkboxes to `[x]` only after the runtime preview suite is green. Task 2 intentionally establishes the React route before Task 3 teaches static/deployed route tooling about it; the tree remains buildable, but the preview is not publication-ready until Task 3 completes. Do not publish or hand off between those stages as though the preview deployment contract were finished. If commits are authorized, include this plan-progress edit with the Task 2 commit.

### Task 3: Generate static preview HTML and validate preview deployment as a separate route class

**Files:**
- Modify: `src/client/scripts/generate-route-documents.mjs`
- Modify: `src/client/scripts/generate-route-documents.test.ts`
- Modify: `tools/check_public_routes.py`
- Modify: `tests/test_public_routes.py`
- Modify: `src/client/src/data/routes/routeCatalogue.test.ts`
- Modify: `tests/test_seo_routes.py`
- Verify unchanged generated/public surfaces: `src/client/src/data/routes/route-metadata.generated.json`, `src/client/public/sitemap.xml`

**Interfaces:**
- Consumes: `preview-routes.json`, the existing static no-index metadata branch, the manifest-backed public route catalogue, and the deployed-route HTTP checker.
- Produces: a generated static preview document and a deployed-preview validation lane that is explicitly separate from public route discovery.

- [x] **Step 1: Extend the route-document generator test first.**

Update the `buildRouteDocuments()` test fixture to pass the authored preview route and require a static file at:

```text
dist/patch/the-usual-specialists/next/index.html
```

Require its HTML to contain:

```ts
expect(preview).toContain('<title>The Usual Specialists Preview | Harley Bartles</title>')
expect(preview).toContain('name="robots" content="noindex, nofollow"')
expect(preview).not.toContain('rel="canonical"')
expect(preview).not.toContain('property="og:url"')
expect(preview).not.toContain('property="og:image"')
expect(preview).not.toContain('name="twitter:image"')
```

Also require the normal manifest-derived route set to remain unchanged and separate from the preview route set.

- [x] **Step 2: Make preview routes an explicit separate input to `buildRouteDocuments`.**

Change the function shape from one implicit route set to explicit public/preview inputs:

```js
export const buildRouteDocuments = async ({
  distRoot,
  manifestPath,
  baseUrl,
  origin,
  previewRoutes = [],
}) => {
  // existing manifest + compatibility route work
  const publicEntries = [...contentEntries, ...legacyEntries]
  const entries = [...publicEntries, ...previewRoutes]
  // existing write loop

  return {
    publicRoutes: publicEntries.map((entry) => entry.path),
    previewRoutes: previewRoutes.map((entry) => entry.path),
  }
}
```

Keep using the existing `renderMetadata()` branch for `indexability: 'noindex'`; do not duplicate that rendering logic.

In the executable script path, read `src/data/routes/preview-routes.json`, pass it to `buildRouteDocuments`, and log the route classes separately, for example:

```js
const previewRoutesPath = path.join(clientRoot, 'src', 'data', 'routes', 'preview-routes.json')
const previewRoutes = JSON.parse(await readFile(previewRoutesPath, 'utf8'))
```

Pass that exact `previewRoutes` array to `buildRouteDocuments`.

```text
[generate-route-documents] wrote 28 public/compatibility routes, 1 preview route, and 404.html
```

The preview config is consumed here only to create directly addressable static HTML. Do not pass it to `buildRouteCatalogue()`.

- [x] **Step 3: Prove the public route catalogue excludes the preview.**

Extend `routeCatalogue.test.ts`:

```ts
expect(getRouteMetadata('/patch/the-usual-specialists/next')).toBeUndefined()
expect(getRouteMetadata('/patch/the-usual-specialists/next/')).toBeUndefined()
```

Do not modify `generate-route-catalogue.mjs` or add the preview to `route-metadata.generated.json`.

- [x] **Step 4: Extend the deployed-route parser with robots metadata.**

Add the tracked preview source beside the existing manifest constant:

```py
DEFAULT_PREVIEW_ROUTES = (
    ROOT / "src" / "client" / "src" / "data" / "routes" / "preview-routes.json"
)
```

In `DocumentMetadataParser`, add one field:

```py
self.robots: str | None = None
```

and capture:

```py
if tag.lower() == "meta" and (attributes.get("name") or "").lower() == "robots":
    self.robots = attributes.get("content")
```

Do not change the canonical validation for public routes.

- [x] **Step 5: Add a separate preview-route expectation and inspection path.**

Keep `expected_public_routes(manifest)` unchanged. Add a small preview helper that consumes the separate config rather than the manifest:

```py
def expected_preview_routes(preview_routes: Sequence[Mapping[str, Any]]) -> list[str]:
    return [
        route["path"]
        for route in preview_routes
        if isinstance(route.get("path"), str) and route["path"]
    ]
```

Extend `check_public_routes()` with a keyword-only `preview_routes` input defaulting to an empty sequence for library callers. For each preview route require:

```text
HTTP 200
Content-Type text/html
non-empty <title>
not the generic GitHub Pages error document
robots exactly noindex, nofollow
no canonical link
```

The preview inspection should conceptually be:

```py
if parser.robots != "noindex, nofollow":
    findings.append(f"{route}: robots is {parser.robots!r}, expected 'noindex, nofollow'")
if parser.canonical is not None:
    findings.append(f"{route}: preview route must not declare a canonical URL")
```

In CLI `main()`, read the tracked source explicitly and pass that separate data to `check_public_routes()`:

```py
preview_routes = json.loads(DEFAULT_PREVIEW_ROUTES.read_text(encoding="utf-8"))
```

Keep `expected_public_routes()` manifest-only.

- [x] **Step 6: Extend Python route-checker tests.**

In `tests/test_public_routes.py`:

- add `self.preview_routes` containing `/patch/the-usual-specialists/next/`;
- add a preview HTML helper with `<meta name="robots" content="noindex, nofollow">` and no canonical;
- pass `preview_routes=self.preview_routes` to checker calls;
- require the request set to include `/portfolio/patch/the-usual-specialists/next/` separately from public routes;
- assert `expected_public_routes(self.manifest)` still does **not** contain the preview;
- add failure cases for a preview with a canonical URL, missing/wrong robots metadata, non-HTML content, and a generic GitHub Pages error body.

Do not weaken any existing public-route or custom-404 assertion.

- [x] **Step 7: Add explicit sitemap/public-route exclusion proof.**

In `tests/test_seo_routes.py`, add a preview exclusion test against both public-route authorities and the generated sitemap:

```py
preview = '/patch/the-usual-specialists/next/'
for build_routes in (refresh_seo_files.build_routes, check_link_hygiene.build_routes):
    routes = build_routes()
    self.assertNotIn(preview, routes)
    self.assertNotIn(preview.rstrip('/'), routes)

sitemap = (refresh_seo_files.PUBLIC / 'sitemap.xml').read_text(encoding='utf-8')
self.assertNotIn('/patch/the-usual-specialists/next', sitemap)
```

This test should pass without modifying `refresh_seo_files.py`, `site_profile.py`, or the sitemap generator because preview routes never enter `route-metadata.generated.json`.

- [x] **Step 8: Run the focused tooling suite.**

```powershell
npm --prefix src/client test -- --run scripts/generate-route-documents.test.ts src/data/routes/routeCatalogue.test.ts
py -3 -m unittest tests.test_public_routes tests.test_seo_routes
```

Then run the production build once to prove the real static preview document is emitted:

```powershell
npm --prefix src/client run build
```

Inspect:

```powershell
Select-String -Path src/client/dist/patch/the-usual-specialists/next/index.html -Pattern 'noindex, nofollow','canonical','og:url','og:image','twitter:image'
```

Expected: `noindex, nofollow` is present; canonical / OG URL / image publication metadata are absent.

Also verify the public generated authorities remain clean:

```powershell
git diff -- src/client/src/data/routes/route-metadata.generated.json src/client/public/sitemap.xml
```

Expected: no diff caused by preview registration.

- [x] **Step 9: Mark Task 3 complete only after static and deployed-route contracts are green.**

Change the Task 3 checkboxes to `[x]` only after the route-document tests, Python checker tests, production build, emitted preview inspection, and public-authority no-diff check all pass. If commits are authorized, include this plan-progress edit with the Task 3 commit.

### Task 4: Move all V2 browser evidence to `/next/` and prove discovery isolation

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: `src/client/e2e/homepage.spec.ts`
- Modify: `src/client/e2e/writing-navigation.spec.ts`
- Modify: `src/client/src/pages/PatchIndexPage.test.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- V2 production files: no changes expected.

**Interfaces:**
- Consumes: canonical legacy route from Task 1, preview runtime/static route from Tasks 2-3, and the existing PORT-17 browser/visual contracts.
- Produces: one browser owner for V2 (`/next/`), one canonical owner for legacy (`/patch/the-usual-specialists/`), unchanged V2 snapshots, and focused proof that no discovery surface links to the preview.

- [x] **Step 1: Introduce canonical/preview test constants in `project-story.spec.ts`.**

Near the existing route constants add:

```ts
const specialistsCanonicalPath = './patch/the-usual-specialists/'
const specialistsPreviewPath = './patch/the-usual-specialists/next/'
```

Replace every V2-specific `./patch/the-usual-specialists/` navigation in this file with `specialistsPreviewPath`. This includes the accepted Index composition, Silk apertures, wide-band handoffs, three-layer lock, rope topology, z-order, clipped milestone, parallax, reduced motion, 620 continuity, ultrawide traversal, Patch separation, Commission 03 overlap, and 2560 ceiling-freeze tests.

Do not change any geometry table, tolerance, breakpoint, selector, or production value while making this route-only migration.

- [x] **Step 2: Split chunk-isolation proof between legacy canonical and V2 preview.**

The existing chunk helper uses substring matching, which would confuse `UsualSpecialistsPage` with `LegacyUsualSpecialistsPage`. First tighten it to asset-filename prefix matching:

```ts
const requestedChunk = (requested: readonly string[], chunk: string) => requested.some((url) => {
  const filename = new URL(url).pathname.split('/').at(-1) ?? ''
  return filename.startsWith(`${chunk}-`)
})
```

Then replace the current single Specialists route row with two route owners:

```ts
{
  path: specialistsCanonicalPath,
  heading: 'The Usual Specialists',
  chunk: 'LegacyUsualSpecialistsPage',
  siblings: ['IdentityEmporiumPage', 'TournamentPage', 'UsualSpecialistsPage'],
},
{
  path: specialistsPreviewPath,
  heading: 'The Usual Specialists',
  chunk: 'UsualSpecialistsPage',
  siblings: ['IdentityEmporiumPage', 'TournamentPage', 'LegacyUsualSpecialistsPage'],
},
```

Use `requestedChunk()` for positive and sibling assertions. This proves canonical direct loads do not fetch V2 and preview direct loads do not fetch legacy.

- [x] **Step 3: Retarget protected visual regression without changing snapshots.**

In `visual-regression.spec.ts`, change only the route in the existing protected Specialists test:

```ts
await openStable(page, './patch/the-usual-specialists/next')
```

Keep these existing snapshot names unchanged:

```text
patch-usual-specialists-index-2560.png
patch-usual-specialists-index-1600.png
patch-usual-specialists-index-1440.png
patch-usual-specialists-index-768.png
patch-usual-specialists-index-390.png
patch-usual-specialists-index-320.png
```

Any pixel diff is a migration regression. Do not update the baseline.

- [x] **Step 4: Keep canonical legacy accessibility and add V2 preview accessibility.**

In `accessibility.spec.ts`, keep the canonical Specialists route in the general WCAG route list but rename it clearly as legacy during migration, then add the preview route:

```ts
{ name: 'The Usual Specialists canonical adventure', path: 'patch/the-usual-specialists' },
{ name: 'The Usual Specialists V2 preview', path: 'patch/the-usual-specialists/next/' },
```

The site-wide image-alt loop intentionally follows `routeCatalogue` and therefore will cover the canonical legacy route only. Preserve that public-catalogue behavior and add one specific preview image-alt test outside the catalogue loop:

```ts
test('The Usual Specialists V2 preview gives every image an intentional text alternative', async ({ page }) => {
  await page.goto('patch/the-usual-specialists/next/')
  await expect(page.locator('main h1').first()).toBeVisible()
  await expectIntentionalImageAlternatives(page)
})
```

Do not add preview to `route-metadata.generated.json` just to make the existing loop discover it.

- [x] **Step 5: Add focused discovery-isolation assertions to the owning surfaces.**

The existing tests already prove public links target canonical Specialists. Keep those positive assertions and add one negative preview-link assertion per owning surface rather than scanning every page in the site.

Homepage `homepage.spec.ts`:

```ts
await expect(page.getByRole('link', { name: 'Meet the crew →' })).toHaveAttribute(
  'href',
  /patch\/the-usual-specialists$/,
)
await expect(page.locator('a[href*="/patch/the-usual-specialists/next"]')).toHaveCount(0)
```

Patch index `PatchIndexPage.test.tsx`:

```tsx
expect(await screen.findByRole('link', { name: 'View The Usual Specialists' })).toHaveAttribute(
  'href',
  '/patch/the-usual-specialists',
)
expect(document.querySelector('a[href*="/patch/the-usual-specialists/next"]')).toBeNull()
```

PORT-10 continuation `writing-navigation.spec.ts`:

```ts
await expect(continuations.getByRole('link', { name: /The Usual Specialists/ })).toHaveAttribute(
  'href',
  '/patch/the-usual-specialists',
)
await expect(page.locator('a[href*="/patch/the-usual-specialists/next"]')).toHaveCount(0)
```

Keep the equivalent canonical continuation assertion in `ContentPage.test.tsx` and add:

```tsx
expect(article.querySelector('a[href*="/patch/the-usual-specialists/next"]')).toBeNull()
```

Do not alter production navigation copy or destinations; these are regression assertions around the already-canonical links.

- [x] **Step 6: Run focused runtime/browser route proof.**

Vitest:

```powershell
npm --prefix src/client test -- --run src/pages/PatchIndexPage.test.tsx src/pages/PatchRoutes.test.tsx src/pages/ContentPage.test.tsx src/features/case-study/projectPresentations.test.tsx src/features/patch-showcase/LegacyUsualSpecialistsPage.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

Playwright structural/responsive proof:

```powershell
npm --prefix src/client run test:e2e -- --grep "direct route loads keep case-study presentation chunks isolated|The Usual Specialists"
```

Require the complete Specialists subset to pass against its new route ownership without geometry changes.

- [x] **Step 7: Run the protected V2 visual test without updating snapshots.**

```powershell
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition across protected viewports"
```

Expected: PASS against `/next/` with all existing snapshots unchanged.

- [x] **Step 8: Run the focused accessibility and discovery suites.**

```powershell
npm --prefix src/client run test:e2e -- --grep "The Usual Specialists canonical adventure|The Usual Specialists V2 preview|PORT-10 uses the complete writing shell|homepage routes the accepted movements"
```

If the homepage test name differs from the grep fragment at execution time, resolve it from the live test file and run that one named owning test; do not broaden the route migration to unrelated homepage work.

- [x] **Step 9: Mark Task 4 complete only after V2 route migration is fully proved.**

Change the Task 4 checkboxes to `[x]` only after the structural/responsive suite, protected screenshots, accessibility checks, and focused discovery-isolation assertions are green. If commits are authorized, include this plan-progress edit with the Task 4 commit.

### Task 5: Regenerate navigation, validate the foundation boundary, and prepare review

**Files:**
- Regenerate through owner command: `.agents/plans/INDEX.md`, `src/client/src/data/routes/INDEX.md`, `src/client/src/features/patch-showcase/INDEX.md`, `src/client/src/pages/INDEX.md`, and any other generated `INDEX.md` affected by the new files.
- Verify no unexpected changes in: `src/client/src/data/routes/route-metadata.generated.json`, `src/client/public/sitemap.xml`, `src/client/src/data/content/content-manifest.json`.
- No V2 geometry or asset files should change in this task.

**Interfaces:**
- Consumes: completed Tasks 1-4.
- Produces: a review-ready foundation/migration slice with clean generated navigation, canonical legacy protection, deployed unlinked preview protection, unchanged V2 visual evidence, and no future-Specialist scope creep.

- [x] **Step 1: Regenerate the tracked mesh after new files exist.**

Run the narrow owner command:

```powershell
py -3 tools/run.py mesh --apply
```

Inspect the generated diff. Do not hand-edit `INDEX.md` files.

- [x] **Step 2: Prove the exclusion invariants directly from source/generated authorities.**

```powershell
rg -n "the-usual-specialists/next" src/client/src/data/content/content-manifest.json src/client/src/data/routes/route-metadata.generated.json src/client/public/sitemap.xml
```

Expected: no matches.

Then prove the route exists only in the intended preview authorities and tests:

```powershell
rg -n "the-usual-specialists/next" src/client/src/app/router.tsx src/client/src/data/routes/preview-routes.json src/client/src/pages/UsualSpecialistsPreviewPage.tsx src/client/scripts/generate-route-documents.mjs tools/check_public_routes.py src/client/e2e tests
```

Review every match; none should be a public discovery link.

- [x] **Step 3: Run focused unit/tooling validation.**

```powershell
npm --prefix src/client test -- --run src/components/DocumentMetadata.test.tsx src/features/case-study/projectPresentations.test.tsx src/features/patch-showcase/LegacyUsualSpecialistsPage.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/pages/UsualSpecialistsPreviewPage.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx src/pages/PatchIndexPage.test.tsx scripts/generate-route-documents.test.ts src/data/routes/routeCatalogue.test.ts
py -3 -m unittest tests.test_public_routes tests.test_seo_routes
```

- [x] **Step 4: Run the production build and inspect preview output.**

```powershell
npm --prefix src/client run build
```

Require budgets to stay green. Then inspect the emitted preview document and verify the canonical generated route document still carries its existing public canonical metadata.

- [x] **Step 5: Run the V2 Specialists browser and protected visual suites.**

```powershell
npm --prefix src/client run test:e2e -- --grep "The Usual Specialists|direct route loads keep case-study presentation chunks isolated"
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft keeps the approved composition across protected viewports"
```

Expected: all route, responsive, rope, Silk, ultrawide, ceiling, accessibility, and protected visual evidence remains green on `/next/`; the canonical route is separately proved legacy.

- [x] **Step 6: Inspect the complete implementation diff before any commit.**

```powershell
git diff --check
git status --short
git diff --stat
git diff -- src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx src/client/src/features/patch-showcase/usual-specialists
```

Expected for the final command: no V2 production geometry/content diff. Route ownership changes should not alter the accepted V2 implementation.

- [ ] **Step 7: Run the complete canonical gate through the normal staged commit path.**

Stage the exact intended implementation tree and inspect `git diff --cached --name-status`. Then make the authorized normal commit and let the tracked pre-commit hook own the one complete staged-tree `py -3 tools/run.py ci --check` gate. Do **not** run the canonical full gate immediately before the commit, and do not bypass the hook with `--no-verify`.

If implementation commit authority has not been granted, stop before this step and report the completed focused evidence plus the missing authority. Do not call the migration complete or hand it to code review from an uncommitted dirty tree.

- [ ] **Step 8: Perform the final migration-boundary review.**

Read the final diff against `.agents/runbooks/code-style.md` and `.agents/runbooks/code-review.md` and verify all of these are true:

```text
Canonical /patch/the-usual-specialists/ renders the frozen six-Specialist legacy page.
Canonical route remains indexed and canonical to the unchanged public URL.
V2 UsualSpecialistsPage is reachable at /patch/the-usual-specialists/next/ only.
Preview is noindex, nofollow and has no canonical or publication image/URL metadata.
Preview is absent from content manifest, generated public route catalogue and sitemap.
Homepage, Patch index, writing continuations and related content still link only canonical.
/patch/lawful-heist remains absent; no redirect was restored.
All existing V2 responsive geometry and protected screenshots are unchanged.
No Writ or later Specialist implementation was added.
No new generic preview framework was introduced for unrelated pages.
```

Target implementation readiness before code review: `9/10` or higher.

- [ ] **Step 9: Commit only under current execution authority; publication remains separately gated.**

If Harley has explicitly authorized implementation commits for this execution, use bounded normal commits and the tracked hook. A sensible sequence is:

```text
feat: restore published Specialists canonical page
feat: add Specialists V2 preview route
test: isolate Specialists preview deployment contract
```

Generated mesh files belong with the task that creates/removes the indexed files or in the final test/cleanup commit. Do not use `git add -A` blindly.

Do **not** push merely because local commits are authorized. Push, PR-state changes, merge, and branch closeout remain separate authority gates.

- [ ] **Step 10: Close the plan tracking surface.**

After the authorized implementation commit succeeds and its pre-commit gate is green, change every remaining Task 5 checkbox to `[x]`. Because the successful commit itself could not truthfully contain a pre-checked "commit succeeded" box, make one final bounded documentation closeout commit containing only this plan-progress update and any mechanically regenerated plan index if it changed:

```powershell
git add .agents/plans/2026-09-13-usual-specialists-preview-migration.md .agents/plans/INDEX.md
git diff --cached --name-status
git commit -m "docs: close Specialists preview migration plan"
```

Let the normal hook run; do not bypass it. Then verify:

```powershell
git status --short
git diff
git diff --cached
```

Expected: all three are empty before the implementation is handed to code review. Do not leave plan-progress or generated-index dirt behind.

## Explicit Non-goals

- No redesign of the legacy page.
- No redesign or geometry change to V2 opening, Index, rope/crossing, Silk, commissioned assets, or responsive bands.
- No completion of Silk beyond what is already present on the branch.
- No Writ, Klause, Rollback, Receipt, or final assembled-page work.
- No final canonical cutover to V2.
- No deletion of `LegacyUsualSpecialistsPage` during this migration foundation PR.
- No redirect from `/next/` to canonical or from canonical to `/next/`.
- No restoration of `/patch/lawful-heist`.
- No query flag, environment flag, feature flag, CMS switch, or dual-canonical scheme.
- No new content-manifest item for V2.
- No addition of preview to `route-metadata.generated.json`, sitemap, public-route lists, navigation, related content, or share surfaces.
- No generic multi-page preview framework; this plan introduces one explicit preview-route class and one route registration because the deployed route tooling must distinguish preview reachability from public discovery.
- No visual snapshot updates unless Harley separately approves a real visual change.
- No push, merge, PR-state mutation, or branch closeout as part of implementation without explicit authority.

## Handoff Readiness

**Implementer confidence target:** 9.5/10.

The plan resolves the main live-repo ambiguity that was not obvious from the design spec: the current branch's `ContentPage` special-case makes `patch-usual-specialists` full-frame for V2, while the published legacy page on `main` relied on the ordinary content shell. Task 1 therefore removes that special-case as part of restoring the published canonical experience; Task 2 gives V2 its full-frame ownership at the explicit preview route. The legacy source location, route seam, cross-runtime preview metadata source, static document generation seam, deployed-route checker, sitemap/catalogue exclusions, and V2 test migration are all named explicitly. No implementer should need to invent a route contract or visual decision.
