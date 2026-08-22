# Portfolio £10k Phase 2: CV and Contact Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a public, accessible two-page CV in HTML and generated PDF form, plus a truthful Formspree contact journey, without publishing personal contact details or adding a runtime backend.

**Architecture:** Extend `professionalProfile` as the sole reusable store for CV facts, public links, availability, education, and selected independent work. Compose `/cv` as semantic React HTML with exactly two explicit A4 print regions; generate the deployment PDF from that route with the existing Playwright Chromium dependency after route documents exist. Keep ContactForm's current local `fetch` state machine, tightening its Formspree payload and honest fallbacks instead of introducing a service or SDK.

**Tech Stack:** React 19, TypeScript, React Router, SCSS design tokens, Vite, Vitest, Playwright, Node ESM build scripts, Python route/SEO checks, GitHub Actions, Formspree endpoint configuration.

**Execution Strategy:** `executing-plans` — the route, static document generator, PDF build, Playwright fixture, deployment rebuild, and visual evidence are strongly ordered around one deployable artifact. Execute sequentially in this worktree; do not split production edits between agents.

## Global Constraints

- Keep `src/client/src/data/professionalProfile.ts` as the only authored store for reusable CV facts; `CvPage` composes facts but does not repeat dates, formal titles, availability, education, or selected-work records.
- Publish `Senior software engineer | full-stack and agentic systems` as a professional headline, while retaining the real current formal title `Software Engineer`.
- Publish only: `Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid up to one day per week.` and `Four weeks' notice`; do not imply relocation, wider weekly travel, or immediate start.
- Do not publish salary, a personal email address, telephone number, acting, customer data, internal Access details, unverified frameworks, private metrics, or interview-only anecdotes in source, generated HTML, the PDF, metadata, logs, or fixtures.
- Keep the CV to exactly two explicit `[data-cv-page]` A4 regions. Use semantic HTML, existing font families and tokens, visible screen controls, and print CSS that hides normal chrome and screen-only controls.
- Use only the existing manual `fetch` and `FormData` contact transport. Send exactly `name`, `email`, `message`, and `_gotcha` to an HTTPS `VITE_CONTACT_FORM_ENDPOINT` with `Accept: application/json`.
- Keep `src/client/.env.example` empty of real IDs, ignore `src/client/.env.local`, and use fake HTTPS endpoints only in automated tests. No form SDK, backend, PDF library, analytics, custom CAPTCHA, or new runtime dependency.
- Generate `dist/harley-bartles-cv.pdf` after Vite and route documents; require a `%PDF` signature and a maximum size of 512 KiB. Do not commit a hand-maintained PDF in `public/`.
- Add `/cv` to each existing route authority directly; do not introduce a route-registry refactor in this phase.
- Keep `/cv` out of primary navigation, link it from About, and keep a useful HTML route when PDF download or browser print is unavailable.
- Before completion, inspect HTML at 1440, 768, 390, and 320 CSS pixels, keyboard-only, reduced motion, and actual 200% browser zoom. Render and inspect both generated PDF pages.
- Run focused tests during each task. Run `py -3 tools/run.py ci --check` once on the final staged tree before commit; do not bypass pre-commit.

## Planning Evidence and Drift Table

**Planning baseline:** `origin/main` is `cd5b73b2ea402f8e6a2a8fe175e9569536bbd376` after Phase 1 PR #19 merged. This branch contains the separate marketplace hygiene commit `6543075ad01d3ac42ad9d6a7f02f4421bdd126c1`.

| Spec assumption | Live evidence | Classification | Plan response |
| --- | --- | --- | --- |
| Phase 1 is a dependency rather than an active draft. | GitHub merged PR #19 and `origin/main` now contains `cd5b73b`. | still true, with stale roadmap status repaired | Record Phase 1 as done and make this Phase 2 plan the active roadmap link. |
| A shared professional-facts source exists. | `professionalProfile.ts` supplies career, capability, and apprenticeship facts, but lacks availability, notice, education, CV links, and selected work; Brand Addition currently ends in February 2019. | implementation seam moved | Extend the existing typed source and correct the Brand Addition CV period to January 2019 rather than creating a CV-local record. |
| ContactForm needs finishing rather than replacement. | It already validates HTTPS endpoints, submits `FormData`, and renders disconnected/submitting/sent/error states; it still uses `company_website`, has no limits/privacy copy, and only offers GitHub fallback. | implementation seam moved | Preserve the component and state machine; change payload/name/limits/fallbacks and add state-specific regression tests. |
| Every public-route authority needs `/cv`. | `generate-route-documents`, sitemap refresh, link hygiene, and public-route smoke each list the five existing index routes. | still true | Make four explicit `/cv` additions with direct focused coverage, not a registry abstraction. |
| CI can build a fake test form and a production deployment artifact separately. | Playwright's web-server build receives no test endpoint; the main deployment currently uploads the canonical build without a post-test rebuild. | implementation seam moved | Provide Playwright a fake HTTPS endpoint through its web-server environment and rebuild the Pages artifact on `main` after canonical validation with the production environment variable. |
| Formspree activation can be completed by repository code. | `gh secret list --repo HarleyBartles/portfolio` returned no `VITE_CONTACT_FORM_ENDPOINT` metadata entry. | external activation dependency, not a design conflict | Implement and test the configured path, ship the honest disconnected state when configuration is absent, and leave one controlled post-merge delivery proof for Harley after provider setup. |
| The roadmap skill name remains current. | Marketplace `main` renamed `working-with-epics` to `writing-roadmaps`; the refreshed derived skill tree and roadmap wording are committed in `6543075`. | implementation seam moved and resolved | Use `/writing-roadmaps` for subsequent epic routing; make no further generated-skill edits in this phase. |

## File Structure

| File | Responsibility |
| --- | --- |
| `src/client/src/data/professionalProfile.ts` | Typed public CV facts, public professional links, availability, notice, education, and selected independent work. |
| `src/client/src/data/professionalProfile.test.ts` | Locks factual boundaries and public-link/date invariants. |
| `src/client/src/pages/CvPage.tsx` | Semantic two-region web CV composed exclusively from profile data. |
| `src/client/src/pages/CvPage.test.tsx` | Verifies page ordering, source-data composition, controls, and prohibited-output boundaries. |
| `src/client/src/pages/AboutPage.tsx` | Replaces the future-CV note with web-CV and generated-PDF actions plus finished availability and notice copy. |
| `src/client/src/components/ContactForm.tsx` | Formspree payload, privacy notice, limits, truthful fallbacks, and robust submission states. |
| `src/client/src/components/ContactForm.test.tsx` | Exercises fields, exact payload, duplicate prevention, success reset, error retention, and unsafe configuration. |
| `src/client/src/app/router.tsx` | Lazy `/cv` route. |
| `src/client/src/styles/global.scss` | Narrow responsive CV layout, print rules, CV controls, and contact-state presentation using existing tokens. |
| `src/client/scripts/generate-route-documents.mjs` and test | Static `/cv/index.html` metadata entry. |
| `src/client/scripts/generate-cv-pdf.mjs` and test | Preview lifecycle, two-region assertion, A4 tagged/outlined PDF generation, cleanup, signature, and size enforcement. |
| `src/client/scripts/check-build-budget.mjs` and test | Makes the generated PDF signature and 512 KiB ceiling part of build validation. |
| `src/client/package.json` | Orders the PDF generator after route documents and before build-budget validation. |
| `src/client/playwright.config.ts` | Injects an obviously fake HTTPS endpoint for browser tests only. |
| `src/client/e2e/about.spec.ts`, `cv.spec.ts`, `accessibility.spec.ts`, `visual-regression.spec.ts`, snapshots | Browser, accessibility, visual, download, and intercepted-delivery evidence. |
| `tools/refresh_seo_files.py`, `tools/check_link_hygiene.py`, `tools/check_public_routes.py`, `tests/test_public_routes.py`, `tests/test_seo_routes.py` | Explicit `/cv` sitemap, link, and public-route contracts. |
| `.github/workflows/ci.yml` | Rebuilds the main-branch Pages artifact with the production configuration only after canonical tests. |
| `.gitignore`, `src/client/.env.example` | Documents the configuration variable without tracking local values. |
| `.agents/plans/portfolio-10k/roadmap.md` | Records Phase 1 closeout, this plan's readiness, the final PR/merge, validation, and live-activation outcome. |

### Task 1: Extend the canonical professional CV facts

**Files:**
- Modify: `src/client/src/data/professionalProfile.ts`
- Modify: `src/client/src/data/professionalProfile.test.ts`

**Interfaces:**
- Consumes: existing `CareerStage`, `CapabilityGroup`, and apprenticeship records.
- Produces: `professionalProfile.availability`, `noticePeriod`, `education`, `publicLinks.github`, `publicLinks.linkedin`, `publicLinks.portfolio`, and `independentWork` for every downstream Phase 2 surface.

- [x] **Step 1: Write the failing data assertions.** Add focused assertions before production changes for the exact LinkedIn URL `https://www.linkedin.com/in/harley-bartles-92326110/`, the full remote-first sentence, `Four weeks' notice`, Brand Addition's `July 2005 – January 2019` period, the three education groups, and selected-work IDs `agent-asset-marketplace`, `wild-bunch`, and `agentic-learning-lab`.

  ```ts
  expect(professionalProfile.availability.fullLabel).toBe(
    'Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid up to one day per week.',
  )
  expect(professionalProfile.noticePeriod).toBe("Four weeks' notice")
  expect(professionalProfile.education.map(({ level }) => level)).toEqual([
    'Higher education — in progress',
    'Further education',
    'Further education',
    'Secondary education',
  ])
  ```

- [x] **Step 2: Run the data test to verify the new contract fails.**

  Run: `npm --prefix src/client test -- src/data/professionalProfile.test.ts`

  Expected: failure because the new fields and corrected date do not yet exist.

- [x] **Step 3: Add the smallest typed profile extensions.** Define `Availability`, `EducationRecord`, `PublicProfessionalLink`, and `IndependentWork` types next to the existing data types. Add public GitHub, canonical LinkedIn, and portfolio links; add short/full availability labels and notice; add the exact approved education records; add concise selected-work labels, evidence, and paths: Agent Asset Marketplace `/projects/codex-marketplace`, Wild Bunch `/projects/wild-bunch`, and Agentic Learning Lab `/projects/agentic-learning-lab`. Correct Brand Addition's stored period to `July 2005 – January 2019`; preserve the continuous Barbican/Arch and Access facts.

- [x] **Step 4: Verify the focused data suite is green.**

  Run: `npm --prefix src/client test -- src/data/professionalProfile.test.ts`

  Expected: all profile tests pass and no assertion accepts a title, date, qualification, or availability broadening.

- [x] **Step 5: Mark this task's checklist boxes complete in this plan after the passing command is recorded.**

### Task 2: Finish Formspree contact behaviour without adding a transport layer

**Files:**
- Modify: `src/client/src/components/ContactForm.tsx`
- Modify: `src/client/src/components/ContactForm.test.tsx`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes: `professionalProfile.publicLinks` from Task 1 and an optional `VITE_CONTACT_FORM_ENDPOINT` prop.
- Produces: a configured form that sends only the four approved fields, or an accessible disconnected fallback with LinkedIn and GitHub; no caller receives delivery state.

- [x] **Step 1: Write failing ContactForm tests for the full public contract.** Cover:
  - `maxLength` values 100, 254, and 5000 plus required/autocomplete fields;
  - `_gotcha` being visually hidden, `aria-hidden`, out of tab order, and included in the submitted `FormData`;
  - a `FormData` key set exactly equal to `['_gotcha', 'email', 'message', 'name']`;
  - missing, blank, malformed, and non-HTTPS configuration rendering no form or submit button and offering both canonical GitHub and LinkedIn fallbacks;
  - a pending promise showing `Sending…`, disabling only the submit button, and accepting one fetch despite two click attempts;
  - HTTP-success reset plus `role="status"`; and failed or rejected fetch retaining typed values, restoring `Try again`, and exposing only a `role="alert"` message.

- [x] **Step 2: Run the ContactForm test to verify it fails for the new requirements.**

  Run: `npm --prefix src/client test -- src/components/ContactForm.test.tsx`

  Expected: failure for `company_website`, missing length/privacy/fallback conditions, and missing duplicate-submit evidence.

- [x] **Step 3: Make the minimal component and style change.** Keep the existing `useState` state machine and `fetch` call. Replace the honeypot with:

  ```tsx
  <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
  ```

  Add `maxLength={100}`, `maxLength={254}`, and `maxLength={5000}` to name, email, and message. Guard `handleSubmit` when already submitting, reset only after `response.ok`, and change the sent copy to a thank-you without a response-time promise. Render the required Formspree privacy-policy link and sensitive-information warning adjacent to the submit control. Use profile-owned LinkedIn and GitHub links in disconnected mode; do not add `mailto:` or `tel:` output. Preserve visible labels, focus treatment, enabled text fields while submitting, and existing error styling.

- [x] **Step 4: Verify the focused component suite is green.**

  Run: `npm --prefix src/client test -- src/components/ContactForm.test.tsx`

  Expected: every configuration, payload, pending, success, and failure test passes without a real network request.

- [x] **Step 5: Mark this task's checklist boxes complete in this plan after the passing command is recorded.**

### Task 3: Build the semantic two-page CV and the finished About conversion surface

**Files:**
- Create: `src/client/src/pages/CvPage.tsx`
- Create: `src/client/src/pages/CvPage.test.tsx`
- Modify: `src/client/src/app/router.tsx`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes: the typed public profile contract from Task 1, `DocumentMetadata`, `SiteLayout`, React Router `Link`, and the existing Vite base URL.
- Produces: lazy `/cv`, exactly two ordered `data-cv-page` regions, About links to the web CV and `harley-bartles-cv.pdf`, and a stable `data-visual-contract="about-cv-conversion"` review target.

- [x] **Step 1: Write the failing CV/route component test.** Render `CvPage` inside `MemoryRouter` and assert two regions in `[data-cv-page="1"]`, `[data-cv-page="2"]` order, the professional headline and formal `Software Engineer` title, remote-first/notice copy, all three education levels, selected independent work, the About-return and PDF-download links, and no email/phone, acting, salary, or `mailto:`/`tel:` output. Add an About assertion that the old future-CV notice is gone and the two new actions are present.

- [x] **Step 2: Run the CV test to verify it fails before the route exists.**

  Run: `npm --prefix src/client test -- src/pages/CvPage.test.tsx`

  Expected: module or assertion failure because `CvPage`, page regions, and conversion links have not been implemented.

- [x] **Step 3: Implement the two explicit page regions from profile data.** Add a lazy `path: 'cv'` route and compose `CvPage` inside `SiteLayout` with `DocumentMetadata` canonical `/cv`. Use only profile data for facts and ordered semantic headings/lists:
  - Page 1: identity/contact routes (portfolio, LinkedIn, GitHub, and About contact), approved headline/availability/notice; evidence-led profile; capability groups; then the largest chronology allocation for The Access Group, preserving Recruitment CRM, Screening, early-greenfield Access Checks, sole-engineer responsibility, .NET 8/Azure Functions API, React/.NET portal, and bounded Playwright-and-LLM public-site checks.
  - Page 2: the continuous Barbican Insurance Group/Arch Capital Group period and acquisition context; compressed Brand Addition progression including the Team Manager-to-Web Manager transition and external-developer boundary; exactly the three selected independent-work entries; then all approved education groups and wording, including the in-progress Level 6 distinction without claiming a degree.

  Use `data-cv-page="1"` and `data-cv-page="2"` only on the two paper regions. Add a screen-only action nav with a `Link` back to `/about` and an anchor to `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`. Replace About's phase-boundary note with the same two meaningful CV actions, full availability, and notice copy; do not add `/cv` to `SiteHeader`.

- [x] **Step 4: Add narrow screen styling before print styling.** Use existing CSS tokens to create a legible stacked desktop/narrow `cv-page` and `cv-sheet` composition with no card-grid, logo, portrait, skill bar, or motion. At 320 CSS pixels keep sheets fluid (`max-width: 100%`) and avoid horizontal page overflow; retain semantic source order and visible focus styles.

- [x] **Step 5: Verify the focused component tests are green.**

  Run: `npm --prefix src/client test -- src/pages/CvPage.test.tsx src/data/professionalProfile.test.ts`

  Expected: two explicit page regions and all factual/prohibited-output assertions pass.

- [x] **Step 6: Mark this task's checklist boxes complete in this plan after the passing command is recorded.**

### Task 4: Register `/cv` in static route, SEO, and browser-fixture authorities

**Files:**
- Modify: `src/client/scripts/generate-route-documents.mjs`
- Modify: `src/client/scripts/generate-route-documents.test.ts`
- Modify: `src/client/playwright.config.ts`
- Modify: `tools/refresh_seo_files.py`
- Modify: `tools/check_link_hygiene.py`
- Modify: `tools/check_public_routes.py`
- Modify: `tests/test_public_routes.py`
- Create: `tests/test_seo_routes.py`

**Interfaces:**
- Consumes: the `/cv` React route from Task 3 and existing five-route lists.
- Produces: static `dist/cv/index.html` metadata, `/cv` in sitemap/link/public-route checks, and an isolated fake HTTPS endpoint available only to Playwright's web-server build.

- [x] **Step 1: Write failing route-authority tests.** Extend the Node generator test to read `dist/cv/index.html` and require `CV | Harley Bartles` metadata plus canonical `https://harleybartles.github.io/portfolio/cv`. Update `test_public_routes.py` expected route/request lists to include `/cv`. Create `tests/test_seo_routes.py` asserting both `refresh_seo_files.build_routes()` and `check_link_hygiene.build_routes()` contain `/cv` exactly once.

- [x] **Step 2: Run the focused route tests to prove all four authorities currently omit `/cv`.**

  Run: `npm --prefix src/client test -- scripts/generate-route-documents.test.ts`

  Run: `py -3 -m unittest tests.test_public_routes tests.test_seo_routes -v`

  Expected: metadata/route-list failures for `/cv` before the explicit additions.

- [x] **Step 3: Add direct static-route entries and the test-only endpoint.** Add `/cv` with title `CV | Harley Bartles` and an evidence-led description to `INDEX_METADATA`; append `/cv` to the three Python `INDEX_ROUTES` constants. In `playwright.config.ts`, keep `webServer.command` unchanged and supply `env: { VITE_CONTACT_FORM_ENDPOINT: 'https://forms.example.test/contact' }` so only Playwright builds are configured. Do not expose a real endpoint or alter production source configuration.

- [x] **Step 4: Verify focused static-route and Python route tests pass.**

  Run: `npm --prefix src/client test -- scripts/generate-route-documents.test.ts`

  Run: `py -3 -m unittest tests.test_public_routes tests.test_seo_routes -v`

  Expected: `/cv` appears once in each known-route contract, and its generated document has the canonical metadata.

- [x] **Step 5: Mark this task's checklist boxes complete in this plan after the passing commands are recorded.**

### Task 5: Generate and validate the deployment PDF, configuration boundary, and main-branch artifact

**Files:**
- Create: `src/client/scripts/generate-cv-pdf.mjs`
- Create: `src/client/scripts/generate-cv-pdf.test.ts`
- Modify: `src/client/scripts/check-build-budget.mjs`
- Modify: `src/client/scripts/check-build-budget.test.ts`
- Modify: `src/client/package.json`
- Modify: `.github/workflows/ci.yml`
- Modify: `.gitignore`
- Create: `src/client/.env.example`

**Interfaces:**
- Consumes: generated `dist/cv/index.html` from Task 4, the existing `@playwright/test` Chromium installation, and the two page-region attributes from Task 3.
- Produces: `dist/harley-bartles-cv.pdf`, `assertCvPdf(pdfPath, maxBytes)` build validation, documented local configuration, and a main-branch artifact rebuilt with `secrets.VITE_CONTACT_FORM_ENDPOINT` only after canonical tests.

- [x] **Step 1: Write failing PDF and budget tests.** Add a pure `assertCvPdf` contract test using temporary files: accept a non-empty `%PDF` file at 512 KiB, reject a non-PDF signature, and reject 512 KiB plus one byte. Extend `checkBuildBudget` expected result with `pdfBytes` and add the same missing/oversized/signature cases. Write the generator test around an injected preview/browser seam so it requires exactly two ordered `[data-cv-page]` elements and closes resources on both success and failure.

- [x] **Step 2: Run the focused script tests to verify the new helpers do not exist.**

  Run: `npm --prefix src/client test -- scripts/generate-cv-pdf.test.ts scripts/check-build-budget.test.ts`

  Expected: import or assertion failure for `assertCvPdf`, `pdfBytes`, and the generator lifecycle contract.

- [x] **Step 3: Implement the PDF generator and budget contract.** In `generate-cv-pdf.mjs`, start `npm run preview:test` as a child process, wait by polling its local URL rather than sleeping, open `/portfolio/cv/` with `chromium.launch()`, await the route and `document.fonts.ready`, and assert page-region values equal `['1', '2']`. Emulate print media and call:

  ```js
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    outline: true,
  })
  ```

  Use `try`/`finally` to close page/browser and terminate/await the preview process on every path. Export and use `assertCvPdf` to require a `%PDF` prefix and a size at or below `512 * 1024`. Add `maxCvPdfBytes` to `DEFAULT_BUDGETS`, validate `dist/harley-bartles-cv.pdf`, and return `pdfBytes` with JS/CSS values.

- [x] **Step 4: Put the generator in the correct build and configuration sequence.** Change `build` to exactly `tsc -b && vite build && node scripts/generate-route-documents.mjs && node scripts/generate-cv-pdf.mjs && node scripts/check-build-budget.mjs`. Add `src/client/.env.local` to root `.gitignore` and create `src/client/.env.example` containing only `VITE_CONTACT_FORM_ENDPOINT=`. In CI, after `Run canonical quality gate`, add a `main`-only build step with `env.VITE_CONTACT_FORM_ENDPOINT: ${{ secrets.VITE_CONTACT_FORM_ENDPOINT }}` and `npm --prefix src/client run build`, then upload that rebuilt `dist` artifact. Tests still use the fake endpoint from Task 4 and no CI test submits to Formspree.

- [x] **Step 5: Install Chromium only if the local Playwright cache is absent, then verify scripts and build.** Before the first command that creates the derived PDF, run the PDF-skill artifact marker required by the active runtime exactly once:

  ```powershell
  node container_tools/mark_artifact_operation_started.mjs --operation-kind create --expected-output-count 1 --output-format pdf
  ```

  Then run:

  ```powershell
  npx --prefix src/client playwright install chromium
  npm --prefix src/client test -- scripts/generate-cv-pdf.test.ts scripts/check-build-budget.test.ts
  npm --prefix src/client run build
  ```

  Expected: the focused tests pass; build leaves a non-empty `src/client/dist/harley-bartles-cv.pdf` with a `%PDF` prefix and no more than 524,288 bytes.

- [x] **Step 6: Add print CSS tied to the generated artifact.** Add `@page { size: A4; margin: 0; }` and print rules that hide `.site-header`, `.site-footer`, `.skip-link`, and `.cv-screen-controls`; set each `[data-cv-page]` to one A4 `210mm × 297mm` sheet with controlled inner margins and `break-after: page` except the final sheet. Keep external URLs readable, links clickable, warm-paper/ink/copper contrast strong, and normal site chrome absent from print.

- [x] **Step 7: Re-run the production build after print styling.**

  Run: `npm --prefix src/client run build`

  Expected: no generator leak, two-page candidate PDF generated, and build-budget output includes `pdfBytes` under 524,288.

- [x] **Step 8: Mark this task's checklist boxes complete in this plan after the passing commands are recorded.**

### Task 6: Add browser, visual, accessibility, and PDF-inspection proof

**Files:**
- Modify: `src/client/e2e/about.spec.ts`
- Create: `src/client/e2e/cv.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Create/Modify: `src/client/e2e/visual-regression.spec.ts-snapshots/*`

**Interfaces:**
- Consumes: the fake Playwright endpoint from Task 4, generated PDF from Task 5, and visible CV/About contracts from Task 3.
- Produces: direct-route, intercepted-submission, download, axe, stable visual, responsive, keyboard, reduced-motion, zoom, and rendered-PDF evidence without external delivery.

- [ ] **Step 1: Write browser coverage for the integrated contracts.** Update About's old disconnected-only expectation to the fake configured form, availability/notice, and both CV actions. Create `cv.spec.ts` to open `/cv/` directly, assert its title/canonical-facing content, exactly two page regions in order, formal-title/education boundaries, working About/PDF links, and a PDF response whose bytes begin `%PDF`. Intercept `https://forms.example.test/contact`, submit the form, and assert its method, `Accept` header, and four-key `FormData` payload without allowing a real request. Add `/cv` to both desktop and mobile axe route arrays. Add a CV-sheet screenshot and the changed About conversion area to visual regression using reviewed `data-visual-contract` regions.

- [ ] **Step 2: Run behavioural browser tests before creating visual baselines.**

  Run: `npm --prefix src/client exec playwright test e2e/about.spec.ts e2e/cv.spec.ts e2e/accessibility.spec.ts`

  Expected: direct route, fake endpoint, PDF response, and axe contracts pass without a real external request.

- [ ] **Step 3: Create reviewed visual baselines and prove they are stable.** First run `npm --prefix src/client exec playwright test e2e/visual-regression.spec.ts` without `--update-snapshots` to produce inspectable candidate screenshots. Inspect the new wide and narrow CV/About images, then create baselines for only the intended composed regions with `npm --prefix src/client exec playwright test e2e/visual-regression.spec.ts --update-snapshots`. Run the same visual-regression command twice more without `--update-snapshots`. Keep platform-specific snapshots only where a reviewed rasterisation difference is real; do not relax global tolerance.

- [ ] **Step 4: Perform the required manual HTML review.** At 1440, 768, 390, and 320 CSS pixels verify hierarchy, readable measures, no horizontal page scroll, visible focus, and usable controls. Navigate with keyboard only; enable reduced motion; use actual 200% browser zoom. Record any factual/copy/visual issue before proceeding rather than changing baselines to hide it.

- [ ] **Step 5: Render and inspect the generated PDF outside the repository tree.** Use the bundled PDF tooling or Poppler to confirm two pages and render both to external scratch PNGs:

  ```powershell
  New-Item -ItemType Directory -Force Z:\_agent-scratch\portfolio\codex\portfolio-10k-phase-2-cv-contact\pdf-review | Out-Null
  pdfinfo src/client/dist/harley-bartles-cv.pdf
  pdftoppm -png src/client/dist/harley-bartles-cv.pdf Z:\_agent-scratch\portfolio\codex\portfolio-10k-phase-2-cv-contact\pdf-review\cv
  ```

  Inspect every rendered page for clipped/overlapping/orphaned text, margins, hierarchy, links/dates, readable contrast, and absence of site chrome. Confirm selectable text and clickable links in a PDF viewer. Keep only scratch review images outside the repository.

- [ ] **Step 6: Re-run the focused browser suite after any visual correction.**

  Run: `npm --prefix src/client exec playwright test e2e/about.spec.ts e2e/cv.spec.ts e2e/accessibility.spec.ts e2e/visual-regression.spec.ts`

  Expected: all focused browser evidence passes with the fake endpoint intercepted locally.

- [ ] **Step 7: Mark this task's checklist boxes complete in this plan after the passing commands and manual review are recorded.**

### Task 7: Final integration, staged validation, review, and publication evidence

**Files:**
- Modify: `.agents/plans/portfolio-10k/2026-08-22-portfolio-10k-phase-2-cv-contact.md`
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: generated `INDEX.md` files only through the mesh generator if the new tracked files require it.

**Interfaces:**
- Consumes: all task outputs and validation evidence.
- Produces: a staged, canonical-validated branch, a factual review record, a draft PR, and a roadmap handoff that names the external Formspree delivery dependency rather than claiming it is live.

- [ ] **Step 1: Reconcile generated surfaces before the final gate.**

  Run: `py -3 tools/run.py mesh --apply`

  Run: `py -3 tools/run.py skills --check`

  Expected: the mesh is current and marketplace-derived skills remain unchanged from the pinned main tip.

- [ ] **Step 2: Stage the final tree and run the canonical gate once.**

  Run: `git add --all`

  Run: `git diff --cached --check`

  Run: `py -3 tools/run.py ci --check`

  Expected: the staged tree has no whitespace errors; canonical CI verifies Python checks, Vitest, production build/PDF, and Playwright journeys. Do not rerun this broad gate without a subsequent source change.

- [ ] **Step 3: Self-review against the approved spec and policy.** Inspect the staged diff and map every acceptance outcome to an implementation/test/manual-review receipt. Explicitly check absence of private contact literals, salary, acting, title inflation, unknown Access facts, new dependencies, SDKs, backends, telemetry, manually stored PDFs, and primary-navigation `/cv` links. Record the actual evidence scope and all limitations; a clean CI result alone is not proof-grade completion.

- [ ] **Step 4: Commit and publish the reviewable branch.** Commit without `--no-verify`, push `codex/portfolio-10k-phase-2-cv-contact`, and open a draft PR using the repository template. Include the exact branch head SHA, canonical validation, wide/narrow visual/PDF evidence, fake-endpoint isolation, generated-PDF size, and the fact that the real Formspree endpoint is not configured. Move the PR to ready only after the self-review finds no actionable issue and hosted CI is expected to pass.

- [ ] **Step 5: Record hosted and activation outcomes only after proof.** After GitHub proves the merged commit and hosted quality check, update the roadmap with the merge commit, PR, latest rating, and validation result. If Harley configures Formspree, perform one controlled post-merge submission and record only delivery success and the public route. If not configured, record `live Formspree activation is pending` as the sole contained dependency; do not claim contact conversion is live.

- [ ] **Step 6: Mark this task's checklist boxes complete in this plan after publication/merge evidence is recorded.**

## Plan Self-Review and Plan-Readiness

### Spec coverage

- Shared-fact ownership, availability, notice, education, selected work, formal-title boundary, and the exact professional story are covered by Tasks 1 and 3.
- Formspree configuration, field limits, exact payload, privacy notice, disconnected/success/error states, honeypot, fake endpoint, and no-live-test rule are covered by Tasks 2, 4, and 6.
- `/cv` routing, metadata, static documents, sitemap/link/public-route contracts, and no primary-navigation addition are covered by Tasks 3 and 4.
- Generated two-A4-page PDF, build ordering, cleanup, signature/size checks, production artifact rebuild, and print treatment are covered by Task 5.
- Required browser, axe, visual, keyboard, reduced-motion, 320/200%, and PDF visual review are covered by Task 6.
- Final staged canonical validation, self-review, PR/hosted proof, roadmap truth, and external activation disclosure are covered by Task 7.

### Dependency and scope review

- Task 1 produces all typed facts consumed by Tasks 2 and 3.
- Task 3 creates the React route and page regions before Task 4 generates its static route document and before Task 5 navigates to it for PDF creation.
- Task 4 provides both static route output and fake endpoint environment before Task 5's build and Task 6's browser suite.
- Task 5 produces the PDF consumed by Task 6's direct response and rendered-page review.
- Task 7 runs after every producer and has one final canonical CI run on the staged tree.
- The plan intentionally excludes provider dashboard activation, a new backend, any dependency addition, a route-registry refactor, new primary navigation, and a manually maintained PDF.

### Readiness rating

**Plan-readiness: 9/10.** The remaining uncertainty is intentionally external: Formspree endpoint creation, GitHub secret configuration, domain restriction, and one controlled live delivery proof are not available in repository state. The plan still produces a complete, testable CV and an honest disconnected contact state without inventing that external authority.

## Execution Handoff

This plan is saved at `.agents/plans/portfolio-10k/2026-08-22-portfolio-10k-phase-2-cv-contact.md`. The execution strategy is `executing-plans`; plan-readiness is **9/10**. Harley has already asked to roll directly into Phase 2, so begin Task 1 in this worktree after this plan and roadmap checkpoint are committed.
