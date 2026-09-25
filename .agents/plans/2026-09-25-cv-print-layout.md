# CV Print Layout Implementation Plan

**Lifecycle:** completed-awaiting-retirement

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the generated CV PDF as a legible, intentionally composed two-page A4 document while keeping print-only page furniture and non-interactive print URLs out of the web view.

**Architecture:** Keep the existing React CV source and Chromium PDF generator. Give print composition its own explicit header rows, print-only URL text, running title, and page split. Prove screen/print distinctions and physical fit with browser behavior and generated-PDF checks, then inspect both rendered pages visually.

**Tech Stack:** React, TypeScript, styled-components, Vitest, Playwright, Playwright Chromium PDF generation, pdf-lib.

**Spec:** `.agents/specs/2026-09-25-cv-print-design.md`.

**Execution Strategy:** `executing-plans` - the header, page distribution, and actual generated PDF fit are coupled and need one integrated render-and-adjust cycle.

## Global Constraints

- Keep the generated document A4 and use the page-one/page-two content composition in the approved spec, with Brand Addition on page one to use the available whitespace.
- Treat two pages as an editorial intention for the current content. If it cannot fit legibly, stop with rendered evidence and decide whether a third page is earned; do not shrink type merely to meet a page count.
- Keep the page-two running title and page count out of the web CV.
- Print the three approved contact URLs and each project's bare GitHub repository URL as non-interactive text; omit Contact and all PDF link annotations.
- Leave the PDF page background unpainted. Do not print a mineral/tinted surface or decorative colour fill.
- Use the same heading treatment for Access Group, Barbican/Arch, and Brand Addition.
- Preserve CV facts, project descriptions, education, and web destinations. Group the existing technical skills by domain under peer headings: Languages, Frameworks & libraries, Cloud & delivery, Data & integration, and Testing.
- Use browser geometry and rendered PDF inspection for fit. Do not add a pixel snapshot for the PDF.
- If the tracked commit hook reports a Chrome Playwright or visual-regression failure, stop and report its exact evidence before changing tests or snapshots.

## Review Focus

- Print URL intrinsic width must not collapse the identity or role columns. Cover with the real Chromium print geometry check in Task 2.
- Print-only page furniture must not leak into the screen CV. Cover in the CV Playwright behavior check in Task 2.
- The authored two-sheet content must fit inside each A4 sheet and preserve the agreed role split. Cover with sheet-boundary and content-placement assertions plus generated-PDF page-count verification in Task 3.
- Chromium must not carry screen or project hyperlinks into the printed artifact. Cover with the generated PDF annotation check in Task 2.

---

### Task 1: Retire predecessor plans and commit the approved design and plan

**Files:**
- Delete: `.agents/plans/2026-09-25-site-header-navigation.md`
- Delete: `.agents/plans/2026-09-25-site-chrome-composition-and-test-contracts.md`
- Delete: `.agents/plans/2026-09-25-visual-test-ownership-cleanup.md`
- Create: `.agents/specs/2026-09-25-cv-print-design.md`
- Create: `.agents/plans/2026-09-25-cv-print-layout.md`
- Generate: `.agents/plans/INDEX.md` and any other mesh-owned indexes

**Interfaces:** Consumes the merged `main` base and the approved design in the spec. Produces a committed, current plan and removes only predecessor plans already marked `completed-awaiting-retirement`.

- [x] Verify the worktree is based on current `main`; verify the three predecessor plans carry the completion marker and their durable module-owned responsive testing rule is present in `.agents/doctrine/validation-policy.md`.
- [x] Remove those three completion-marked predecessor plans. Leave the still-active editorial reader-panel plan untouched.
- [x] Add this approved CV print design and its implementation plan.
- [x] Regenerate navigation with `py -3 tools/run.py mesh --apply`; inspect the generated-index diff.
- [x] Commit the retirement, design, plan, and generated indexes as the first commit for this substantive slice. The tracked hook must pass.

### Task 2: Separate the paper header from screen navigation and prevent PDF links

**Files:**
- Modify: `src/client/src/pages/CvPage.tsx`
- Modify: `src/client/src/pages/cv/CvContent.tsx`
- Modify: `src/client/src/pages/cv/CvDocument.tsx`
- Modify: `src/client/scripts/generate-cv-pdf.mjs`
- Test: `src/client/e2e/cv-layout.spec.ts`
- Test: `src/client/scripts/generate-cv-pdf.test.ts`

**Interfaces:** Consumes the approved print information rules. Produces a print-only running title and bare URL row, explicit shrink-safe header tracks, and a PDF generation step that strips link targets before Chromium creates the artifact.

- [x] **Step 1: Write failing behavior tests.** In `cv-layout.spec.ts`, add browser checks that the running title is absent in screen media and present in print media; print shows the three bare URLs as text, omits the Contact destination, and the print header's identity, role, availability, and URL row remain within the header bounds without overlap. In `generate-cv-pdf.test.ts`, test that PDF print preparation removes `href` targets while preserving visible link text.
- [x] **Step 2: Run the focused tests and confirm the intended failures.** From `src/client`, run `npm test -- scripts/generate-cv-pdf.test.ts` and `npm run test:e2e -- e2e/cv-layout.spec.ts`. Expected: the current running title is visible on screen, the current print links expand to long URLs, and href targets remain.
- [x] **Step 3: Implement the print/screen split.** Render print URLs as plain text without protocol or trailing slash, hide the web-only links and Contact row in print, suppress the running title in screen media, and give the print header explicit two-column identity/role tracks plus a full-width details row. After switching the generator to print media, remove `href` from all remaining anchors so project text also prints without PDF link annotations; remove link-rewriting code that is no longer needed.
- [x] **Step 4: Verify focused behavior.** Re-run both commands. Expected: screen CV navigation remains usable with no running title; print presents plain URLs and a print-only running title; the measured header geometry has no overlap; href removal preserves readable anchor text.
- [x] **Step 5: Refactor only after green.** Keep print-only values and formatting owned by the CV page slice; avoid source-text or CSS-literal assertions.

### Task 3: Rebalance the role split and enforce rendered A4 fit

**Files:**
- Modify: `src/client/src/pages/CvPage.tsx`
- Modify: `src/client/scripts/generate-cv-pdf.mjs`
- Test: `src/client/e2e/cv-layout.spec.ts`
- Test: `src/client/scripts/generate-cv-pdf.test.ts`
- Generated: `src/client/public/harley-bartles-cv.pdf`

**Interfaces:** Consumes Task 2's print-only header and link handling. Produces the agreed page-one/page-two content split, with Brand Addition at the end of page one; a generated two-page artifact with no link annotations; and a fit check that rejects content extending beyond either page sheet.

- [x] **Step 1: Write rendered-layout tests.** Assert that the Access Group, Barbican/Arch, and Brand Addition sections are contained by page 1, the independent projects and remaining sections are contained by page 2, each project shows its bare GitHub repository URL, and each print sheet's content stays within its A4 sheet bounds. Assert generated PDF output has two pages and no link annotations, using PDF structure rather than pixel comparisons.
- [x] **Step 2: Establish the baseline failure.** The pre-change generated PDF had three pages, with page 3 containing only the final education entry; Barbican/Arch began on page 2. The new Playwright placement/fit assertions and strict PDF page-count guard cover these failures.
- [x] **Step 3: Recompose and guard fit.** Move Barbican/Arch to page 1 after Access Group and Brand Addition after Barbican/Arch; leave independent projects and later material on page 2. Add a generator assertion over rendered sheet bounds before PDF export. Require exactly two A4 pages for this approved content arrangement; report measured evidence if the content cannot fit legibly instead of shrinking type or silently adding a sheet.
- [x] **Step 4: Generate and inspect the artifact.** Run `npm run build` from `src/client`, render both generated PDF pages to PNG using Poppler `pdftoppm`, inspect both pages at full resolution, and verify with `pdfinfo` that the artifact is two A4 pages. Expected: no overlap, clipped content, horizontal overflow, or page-furniture leakage; both role groups and all later sections are readable.
- [x] **Step 5: Run the final focused checks.** Run `npm test -- scripts/generate-cv-pdf.test.ts` and `npm run test:e2e -- e2e/cv-layout.spec.ts e2e/cv.spec.ts`. Expected: all PDF-generation, screen/print, layout, and visitor-download contracts pass.
- [x] **Step 6: Review locally.** Run `git diff --check`, stand up the built site/PDF for the user's visual review, and make any requested visual revisions before committing.
- [x] **Step 7: Publish after visual approval.** Stage intended files; commit normally and honor the hook stop rule above; push the branch and open a Draft PR with the two rendered pages and validation evidence. Leave the plan marked `completed-awaiting-retirement` and fully checked through the PR handoff.
