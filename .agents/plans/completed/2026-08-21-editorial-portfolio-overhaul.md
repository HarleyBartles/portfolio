# Editorial Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` (recommended) or `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a route-safe, art-directed editorial portfolio with a randomized feature deck, project-native imagery, stronger content pages, and an explicit professional About page.

**Architecture:** Keep the static React/Vite client and manifest-driven content. Split Markdown into lazy Vite chunks, generate route-specific static entry documents after Vite builds, compose the homepage from focused data and UI components, and store only optimized portfolio-owned media in `public/`.

**Tech Stack:** React 19, TypeScript 6, Vite 8, SCSS, React Router 7, Vitest, Testing Library, Playwright, Python/Pillow for one-time owned-asset optimization.

**Execution Strategy:** `executing-plans` — the changes are sequential and share the content manifest, visual tokens, page components, and verification surface. The user explicitly authorized direct work on `main` for this stand-up phase.

## Global Constraints

- Source design: `.agents/specs/2026-08-21-editorial-portfolio-overhaul-design.md`.
- Work directly on current `main`, fast-forwarded from `origin/main`; record the starting SHA.
- Preserve the warm editorial identity and honest status language.
- Never publish a plaintext email, phone number, fabricated CV fact, invented project metric, or fake Wild Bunch screenshot.
- Patch appears as exactly one candidate in the homepage feature pool.
- Feature motion never autoplays and becomes immediate under `prefers-reduced-motion`.
- Use only optimized assets derived from Harley-owned sibling repositories and record custody.
- Run `py -3 tools/run.py ci --check`, client unit tests, client build, and Playwright before pushing.

---

### Task 1: Route-safe build, metadata, and lazy content

**Files:**
- Create: `src/client/scripts/generate-route-documents.mjs`
- Create: `src/client/scripts/generate-route-documents.test.ts`
- Modify: `src/client/package.json`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/api/contentApi.ts`
- Modify: `src/client/src/api/contentApi.test.ts`
- Modify: `src/client/src/components/DocumentMetadata.tsx`
- Modify: `src/client/src/components/DocumentMetadata.test.tsx`
- Modify: `src/client/index.html`
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- `loadDocument(summary: ContentSummary): Promise<ContentDocument>` resolves one Markdown file through `import.meta.glob`.
- `getContent(slug: string): Promise<ContentDocument>` preserves the existing API and 404 error contract.
- `buildRouteDocuments({ distRoot, manifestPath, baseUrl, origin }): void` writes route `index.html` documents and `404.html`.
- `DocumentMetadata` updates description, canonical, Open Graph, and Twitter fields during client navigation; generated HTML supplies the same fields before hydration.

- [x] **Step 1: Add failing unit tests.** Prove a content request loads one known document and rejects an unknown slug; prove route generation writes `/projects/index.html`, one article route, route-specific canonical/OG tags, and a fallback `404.html`; prove metadata updates canonical, Open Graph, and Twitter fields.
- [x] **Step 2: Run `npm test -- --run src/api/contentApi.test.ts scripts/generate-route-documents.test.ts src/components/DocumentMetadata.test.tsx` from `src/client` and observe failures caused by the missing lazy loader, generator, and metadata fields.**
- [x] **Step 3: Implement the lazy glob loader, route-document generator, metadata tags, favicon/manifest head links, and build-script integration. Remove the deploy workflow's post-build `cp dist/index.html dist/404.html` workaround because the generator owns known routes and the fallback.**
- [x] **Step 4: Run the scoped unit tests and `npm run build`. Inspect `dist/projects/index.html` and `dist/writing/agentic-engineering-vs-vibe-coding/index.html`; both must contain their own canonical metadata.**
- [x] **Step 5: Mark Task 1 checkboxes complete in this file and commit with `fix: serve portfolio deep links as static routes`.**

### Task 2: Brand and visual asset custody

**Files:**
- Create: `src/client/public/brand/hb-mark.svg`
- Create: `src/client/public/brand/social-card.png`
- Create: `src/client/public/media/patch/patch-role-kits-640.webp`
- Create: `src/client/public/media/patch/patch-role-kits-1200.webp`
- Create: `src/client/public/media/learning-lab/venue-plan.png` (retain the already optimized 1.3 KB source rather than upscaling it)
- Create: `src/client/public/fairytales/goldilocks/page-640.webp`
- Create: `src/client/public/fairytales/goldilocks/page-1200.webp`
- Create: `src/client/public/fairytales/sorcerers-apprentice/page-640.webp`
- Create: `src/client/public/fairytales/sorcerers-apprentice/page-1200.webp`
- Create: `docs/asset-custody.md`
- Modify: `src/client/src/components/SiteHeader.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/data/content/fairytales/goldilocks.md`
- Modify: `src/client/src/data/content/fairytales/sorcerers-apprentice.md`
- Delete: the two multi-megabyte fairytale PNG files after all consumers move to WebP.

**Interfaces:**
- `SiteHeader` renders `/brand/hb-mark.svg` inside the home link with `width="52"`, `height="52"`, and an accessible link label.
- Patch `<picture>` consumers use 640 and 1200 px WebP sources with a 1200:720 intrinsic ratio.
- Fairytale Markdown points to 1200 px WebP images and follows each image with a scene transcript.

- [x] **Step 1: Update the header unit test first to require the designed SVG image and a skip link; run it and observe failure against the text/CSS mark.**
- [x] **Step 2: Create the SVG mark and social card. Use Pillow to compose the four exact Patch role-kit hero sources and optimize the venue plan and published fairytale pages at the named sizes. Record source paths, ownership, transformations, output dimensions, byte sizes, date, and alt text in `docs/asset-custody.md`.**
- [x] **Step 3: Update the header and fairytale Markdown, including useful scene-by-scene transcripts, then remove the old PNGs.**
- [x] **Step 4: Run the header test and `npm run build`; verify no added image exceeds 400 KB and no Markdown/public reference points at the removed PNG names.**
- [x] **Step 5: Mark Task 2 checkboxes complete and commit with `feat: add designed brand and owned editorial media`.**

### Task 3: Editorial feature deck and homepage narrative

**Files:**
- Create: `src/client/src/features/home/featureOrder.ts`
- Create: `src/client/src/features/home/featureOrder.test.ts`
- Create: `src/client/src/features/home/FeatureDeck.tsx`
- Create: `src/client/src/features/home/FeatureDeck.test.tsx`
- Create: `src/client/src/features/home/ProjectVisual.tsx`
- Modify: `src/client/src/pages/HomePage.tsx`
- Modify: `src/client/e2e/homepage.spec.ts`
- Modify: `src/client/src/styles/_tokens.scss`
- Modify: `src/client/src/styles/global.scss`
- Delete: `src/client/src/components/Reveal.tsx`
- Modify: `src/client/package.json` and lockfile to remove `framer-motion` when no consumer remains.

**Interfaces:**
- `createFeatureOrder<T>(items: readonly T[], random: () => number): T[]` returns every item once in shuffled order without mutating input.
- `FeatureDeck({ items, initialOrder? })` renders one lead, two supports, and Previous/Next/Shuffle buttons; selection changes are announced through a polite live region.
- `ProjectVisual({ slug, eager? })` maps known project slugs to the Patch picture, Learning Lab picture, Marketplace system graphic, or Wild Bunch capture brief.

- [x] **Step 1: Add failing pure tests for non-mutating shuffle and deterministic injection, then component tests for three visible stories, no autoplay, button-based hierarchy changes, and accessible labels.**
- [x] **Step 2: Run `npm test -- --run src/features/home/featureOrder.test.ts src/features/home/FeatureDeck.test.tsx` and observe the missing-module failures.**
- [x] **Step 3: Implement the pure order helper, feature deck, and project visuals. Rebuild the homepage hero, professional thesis, curated deck with exactly one Patch candidate, selected case studies, three evidence-backed working principles, and featured/latest writing. Essential content renders visible by default.**
- [x] **Step 4: Complete the 4 px spacing scale including `--space-5`, darken the small-text copper, add semantic media/color/motion tokens, constrain reading measure, remove accidental chrome underlines, and implement the 12-column wide composition with narrow/mobile fallbacks.**
- [x] **Step 5: Update Playwright homepage expectations and run the unit tests plus `npm run test:e2e -- e2e/homepage.spec.ts`.**
- [x] **Step 6: Mark Task 3 checkboxes complete and commit with `feat: build randomized editorial feature deck`.**

### Task 4: Art-directed index and content pages

**Files:**
- Create: `src/client/src/components/EditorialIndexCard.tsx`
- Create: `src/client/src/components/ContentNavigation.tsx`
- Modify: `src/client/src/pages/ProjectIndexPage.tsx`
- Modify: `src/client/src/pages/WritingIndexPage.tsx`
- Modify: `src/client/src/pages/FairytalesIndexPage.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/components/MarkdownContent.tsx`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/content/projects/*.md`
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/writing-navigation.spec.ts`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- `EditorialIndexCard` varies hierarchy/media by `ContentKind` without changing navigation semantics.
- `ContentNavigation` accepts the ordered current-kind summaries and current slug, then renders previous/next links.
- `prepareMarkdown` strips a duplicate leading H1 for every content kind.
- `MarkdownImage` emits responsive WebP `srcSet` for known fairytale paths with explicit lazy loading.

- [x] **Step 1: Add or update failing browser expectations for visual thumbnails, human-readable dates, the Wild Bunch capture brief, direct project/article loading, fairytale transcripts, and previous/next article navigation.**
- [x] **Step 2: Add focused unit coverage for stripping duplicate fairytale H1s and content-navigation boundaries; run and observe failures.**
- [x] **Step 3: Implement the featured-writing/index-list split, distinct project visuals, fairytale thumbnails, media-aware case-study headers, consistent dates, narrow prose, and previous/next navigation. Rewrite project Markdown into concise purpose/proof/decision/current-state sections without inventing facts.**
- [x] **Step 4: Run unit tests, the affected Playwright files, and `npm run build`.**
- [x] **Step 5: Mark Task 4 checkboxes complete and commit with `feat: art direct portfolio indexes and stories`.**

### Task 5: Explicit About page and honest contact seam

**Files:**
- Create: `src/client/src/components/ContactForm.tsx`
- Create: `src/client/src/components/ContactForm.test.tsx`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/components/SiteFooter.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/e2e/homepage.spec.ts`

**Interfaces:**
- `ContactForm({ endpoint })` posts name, reply email, message, and honeypot to an HTTPS endpoint; it renders validation, submitting, success, and failure states.
- When `endpoint` is absent or not HTTPS, About does not render an active submit control and names GitHub as the current fallback without exposing private contact details.
- `AboutPage` reads `import.meta.env.VITE_CONTACT_FORM_ENDPOINT` only as configuration; no address or phone appears in source or rendered HTML.

- [x] **Step 1: Add failing component tests for required fields, HTTPS-only endpoint validation, successful submission, failed submission, honeypot presence, and disconnected fallback.**
- [x] **Step 2: Run `npm test -- --run src/components/ContactForm.test.tsx` and observe failure against the missing component.**
- [x] **Step 3: Implement the contact component and rebuild About around direct professional copy: 6.5 years of full-stack practice, senior responsibility, working principles, Level 6 AI Engineering apprenticeship, useful problem types, honest CV note, and contact section. Replace the generic build-credit footer with a quieter authored close.**
- [x] **Step 4: Run contact tests and About/home browser coverage. Confirm the disconnected deployment state makes no false delivery claim.**
- [x] **Step 5: Mark Task 5 checkboxes complete and commit with `feat: make the about page explicitly professional`.**

### Task 6: Full verification, visual review, and direct-main publication

**Files:**
- Modify: `src/client/e2e/*.spec.ts` where final exact behavior requires it.
- Move: `.agents/plans/2026-08-21-editorial-portfolio-overhaul.md` to `.agents/plans/completed/2026-08-21-editorial-portfolio-overhaul.md`.
- Move: `.agents/specs/2026-08-21-editorial-portfolio-overhaul-design.md` to `.agents/specs/completed/2026-08-21-editorial-portfolio-overhaul-design.md`.
- Regenerate: affected `INDEX.md` files through `py -3 tools/run.py mesh --apply`.

**Interfaces:**
- Canonical validation remains `py -3 tools/run.py ci --check`.
- Publication proof is the verified remote `main` commit SHA and successful GitHub Pages deployment URL.

- [x] **Step 1: Run `npm test -- --run`, `npm run build`, and `npm run test:e2e` from `src/client`. Fix failures from product behavior, not by weakening intended assertions.**
- [x] **Step 2: Start the built site and inspect at 1440 px, 768 px, 390 px, 320 px, reduced motion, keyboard-only interaction, and 200% zoom. Check route entry status locally and final asset/bundle sizes.**
- [x] **Step 3: Review the complete diff against the design spec, scan for plaintext email/phone/private paths, run `py -3 tools/run.py ci --apply`, stage the final tree, and run `py -3 tools/run.py ci --check` on that staged tree.**
- [x] **Step 4: Mark all plan boxes complete, archive the plan and spec, regenerate the mesh, re-stage, re-run canonical CI, and commit the final closeout.**
- [x] **Step 5: Push `main`, verify `origin/main` matches the local full SHA, monitor the Pages deployment, and verify the homepage plus representative direct project/article/fairytale routes return a final HTTP 200.**

## Plan self-review

- Dependency order is coherent: route/content foundations precede page consumers; assets precede visual components; page work precedes global verification.
- Every production behavior has a named unit or browser test and an explicit red/green step.
- Wild Bunch imagery and contact delivery dependencies have honest fallback contracts.
- No task depends on a later output.
- Staged-tree canonical validation and direct-main publication proof are explicit.

**Plan-readiness: 9/10.**
