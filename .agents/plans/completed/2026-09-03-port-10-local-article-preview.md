# PORT-10 Local Article Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the locked PORT-10 manuscript on a real writing URL, with its agreed links and owned figures, while keeping it outside every publication surface until Harley approves it in the browser.

**Architecture:** Add one explicit preview-document registry beside the published manifest. `getContent` may resolve this registered preview for a direct `/writing/:slug` request, but navigation, route-catalogue generation, sitemap generation, index cards, share actions, publication metadata, and continuation navigation continue to derive only from the published manifest. `ContentPage` reads a document-level preview flag to render the title directly into the locked opening sentence, apply `noindex`, and suppress publication furniture. A typed PORT-10 article component replaces two non-public Markdown placement markers with accessible React figures built from the canonical outlined SVG assets.

**Tech Stack:** React 19, TypeScript, React Router, React Markdown, SCSS, Vitest/Testing Library, Playwright, Vite static preview.

**Execution Strategy:** `/executing-plans` — manual sequential execution in the user-authorised shared checkout because the preview registry, page boundary, manuscript composition, and figure styling are one tightly coupled slice. Stay on `harleydbartles/port-10-rian-hughes-editorial-room` and update draft PR #50 only.

## Global constraints

- Do not edit `docs/editorial-drafts/port-10/port-10-third-draft.md`; copy its public prose exactly and resolve only its bracketed directions.
- Preserve the exact title and final line, and place `Chassis was already winning.` immediately after the title without a dek, date, reading time, pull quote, or header figure between them.
- Keep the preview absent from the writing index, homepage, manifest, route catalogue, sitemap, chronological navigation, authored continuation graph, and share affordance.
- Mark the direct preview route `noindex`. Do not generate a publication date, reading time, proposition, index lead, featured state, or continuation rationale.
- Use only the canonical outlined Specialists and PATCH assets. Do not add or embed Chassis or ITC Serif Gothic font software, reconstruct glyphs, or separate either wordmark into rearrangeable letters.
- Keep the article prose in the established Source Serif 4 register and all figure labels/captions in the established Source Sans 3 register.
- Keep PR #50 draft. Do not merge, mark ready, or claim publication.

---

### Task 1: Direct-route preview boundary

**Files:**
- Create: `src/client/src/data/previews/port10Preview.ts`
- Create: `src/client/src/data/previews/port10Preview.md`
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/api/contentApi.ts`
- Test: `src/client/src/api/contentApi.test.ts`
- Test: `src/client/src/pages/ContentPage.test.tsx`

**Interfaces:**
- Consumes: the locked manuscript and current manifest-backed `getContent`/`getNavigation` contract.
- Produces: one explicitly registered `ContentDocument` with `publicationState: 'preview'`, resolvable by direct slug but absent from `navigation`.

- [x] **Step 1: Write failing data and page-boundary tests**

  Prove the preview slug loads as writing content while `getNavigation()` excludes it. Prove the rendered route has the exact title and opening sentence, `robots=noindex`, and no content summary, date, reading time, share action, chronological navigation, or authored continuations.

- [x] **Step 2: Run the focused tests and verify RED**

  Run `npm.cmd --prefix src/client test -- src/api/contentApi.test.ts src/pages/ContentPage.test.tsx`; expect the direct route to return not found and the preview assertions to fail.

- [x] **Step 3: Implement the smallest preview registry and page branch**

  Add the preview document flag and lookup without touching the manifest. Copy the locked public prose into preview Markdown, preserving every paragraph exactly, replacing direction notes only with verified links and two HTML comment placement markers. Use these destinations:

  - The Usual Specialists: `/patch/lawful-heist`
  - Eurostile: `https://www.myfonts.com/collections/eurostile-font-urw/`
  - Bank Gothic: `https://www.myfonts.com/collections/bank-gothic-font-grouptype`
  - Korolev: `https://www.myfonts.com/collections/korolev-font-device`
  - Chassis: `https://www.myfonts.com/collections/chassis-font-device`
  - Tales from Beyond Science: `https://comicsalliance.com/tales-beyond-science-rian-hughes-mark-millar-preview/` (final accepted destination because it lets the reader inspect Hughes's art directly)
  - Hughes on type, illustration, and design: `https://www.koreropress.com/news/rian-hughes-interview/`
  - Brand Addition: `/about`

  Keep internal links in-app and let `MarkdownContent` provide the existing accessible external-link treatment.

- [x] **Step 4: Re-run the focused tests and verify GREEN**

  Re-run the Task 1 Vitest command and require a clean pass.

- [x] **Step 5: Mark Task 1 checklist items complete in this plan**

---

### Task 2: Typed wordmark evidence and PATCH cameo

**Files:**
- Create: `src/client/src/features/writing/RianHughesArticle.tsx`
- Create: `src/client/src/features/writing/RianHughesArticleFigures.tsx`
- Create: `src/client/src/features/writing/RianHughesArticle.scss`
- Create: `src/client/src/features/writing/RianHughesArticle.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `docs/asset-custody.md`

**Interfaces:**
- Consumes: the two preview Markdown placement markers, `the-usual-specialists-wordmark.svg` (`viewBox 0 0 1120 240`), and `adventures-of-patch-cliff-drop.svg` (`viewBox 0 0 340 126.2021`).
- Produces: a full-width finished wordmark figure, an immediately following restrained construction figure, and a subordinate PATCH cameo.

- [x] **Step 1: Write failing article-figure tests**

  Assert the two markers resolve in reading order; neither marker/note is rendered; both Specialists figures reuse the canonical outlined asset; the construction overlay exposes only the shared left edge, SPECIALISTS cap line, and baseline relationships; the PATCH figure uses the canonical cliff-drop asset; and every figure has a useful visible caption and accessible description.

- [x] **Step 2: Run the focused test and verify RED**

  Run `npm.cmd --prefix src/client test -- src/features/writing/RianHughesArticle.test.tsx src/pages/ContentPage.test.tsx`; expect missing-component and missing-figure failures.

- [x] **Step 3: Implement typed insertion and restrained figure styling**

  Split only at the two exact markers and fall back to ordinary Markdown if either marker is absent. Render canonical SVGs through base-path-safe URLs. In the construction view, retain the same outlined geometry and add three meaningful datum rules with adjacent HTML labels; do not use SVG `<text>`, a commercial font, or a dimension-sheet thicket. Give the finished mark inspection width, place construction directly after it, and keep PATCH visibly smaller.

- [x] **Step 4: Record derived-figure custody**

  Add a custody note that the React construction overlay reuses the unchanged canonical outline and contributes only CSS/SVG datum rules and semantic labels; record source paths, current hashes/viewBoxes, accessibility fallback, and the absence of font binaries or new third-party artwork.

- [x] **Step 5: Re-run focused tests and verify GREEN**

  Re-run the Task 2 Vitest command and require a clean pass.

- [x] **Step 6: Mark Task 2 checklist items complete in this plan**

---

### Task 3: Browser contracts and responsive proof

**Files:**
- Modify: `src/client/e2e/writing-navigation.spec.ts`

**Interfaces:**
- Consumes: the complete preview route from Tasks 1-2.
- Produces: browser proof that the locked article reads continuously and the evidence choreography survives supported widths and asset failure.

- [x] **Step 1: Add the focused browser journey**

  Assert direct route status, exact title/opening/final line, figure order, internal versus external link behaviour, `noindex`, absence from `/writing/`, and no horizontal overflow at 1440, 768, 390, and 320 CSS pixels. Abort both canonical logo requests once and prove captions and prose still carry the argument.

- [x] **Step 2: Build and run the focused browser spec**

  Run `npm.cmd --prefix src/client run build`, then `npm.cmd --prefix src/client run test:e2e -- e2e/writing-navigation.spec.ts`; require a clean pass.

- [x] **Step 3: Inspect the real production-style preview personally**

  Serve with `npm.cmd --prefix src/client run preview:test`. In the browser inspect `/portfolio/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists/` at 1440, 768, 390, and 320 CSS pixels; read continuously, check title/opening adjacency, paragraph rhythm, figure hierarchy, captions, link behaviour, image-failure resilience, focus visibility, and overflow. Repair only genuine defects, with a failing assertion first where practical.

- [x] **Step 4: Mark Task 3 checklist items complete in this plan**

---

### Task 4: Draft-PR handoff

**Files:**
- Modify and move on completion: `.agents/plans/2026-09-03-port-10-local-article-preview.md` to `.agents/plans/completed/2026-09-03-port-10-local-article-preview.md`
- Regenerate: affected `INDEX.md` files via `py -3 tools/run.py mesh --apply`

**Interfaces:**
- Consumes: the browser-reviewed local preview and focused green evidence.
- Produces: a clean committed branch, updated draft PR #50, and a running preview for Harley.

- [x] **Step 1: Complete and archive the plan**

  Mark all task boxes complete, move the plan to `.agents/plans/completed/`, run `py -3 tools/run.py mesh --apply`, and inspect the generated diff.

- [x] **Step 2: Apply the completion-readiness gate**

  Rate the implementation against the locked prose, preview boundary, link, figure, accessibility, responsive, custody, and no-publication contracts. Continue work below 8/10; target 9/10.

- [x] **Step 3: Commit normally and let the tracked hook prove the exact staged tree**

  Stage only the intended PORT-10 files and commit without bypassing `.githooks/pre-commit`. Do not redundantly run the complete CI command immediately before or after the successful hook.

- [x] **Step 4: Push and verify draft PR #50**

  Push the existing branch, verify the GitHub-visible head and draft state, and leave the PR unmerged and not ready.

- [x] **Step 5: Leave the preview running and report the handoff**

  Provide the exact local URL, implemented links and figures, observed focused checks, any unresolved visual/source question, and the literal stop statement `Ready for Harley browser review`.

- [x] **Step 6: Mark Task 4 checklist items complete in the archived plan**

## Plan readiness

**Rating:** 9/10. The locked source, exact direct route, reversible non-publication seam, verified link destinations, canonical figure assets, test commands, responsive widths, and stop boundary are explicit. The only remaining judgement is ordinary browser tuning of figure scale and spacing, bounded by Task 3 and Harley's review.

## Post-review shell correction

Harley rejected the runtime preview-state seam during browser review. The branch itself is the publication boundary, so the final branch implementation composes PORT-10 through the ordinary manifest-backed writing route, generated route metadata, writing index, sitemap, canonical metadata, reading metadata, continuation links, and share action. The shared `WritingArticleShell` owns that furniture for every writing route; article-specific rendering supplies only the body and optional principal figure.

Harley subsequently overruled Cloud Sol's recommendation to make the title land directly into `Chassis was already winning.` The title and hook are not closely linked enough to justify a PORT-10 exception. The ordinary title, date/read-time, précis, then manuscript hierarchy remains authoritative, and the shell no longer exposes a summary opt-out.

Once the précis occupied its proper shell position, Harley removed the standalone `Chassis was already winning.` opening as redundant with both the précis and the first paragraph's conclusion that Chassis was ahead. The accepted manuscript now starts with `I was looking for a face for The Usual Specialists.`

## Post-review figure correction

Harley preferred the construction-overlay Specialists treatment and rejected the adjacent clean duplicate. The final article keeps one Specialists figure with its three-datum overlay, key, caption, and accessible description, followed later by the subordinate PATCH cameo.
