# Marketplace Flagship and Case-Study System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` for every task begun after the execution-model decision recorded on 23 August 2026. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Marketplace inventory page with a source-backed, accessible case study that establishes a composable presentation seam for later flagship projects.

**Architecture:** Keep routing, metadata, related content, and ordinary Markdown documents in `ContentPage`. Add one explicit project `presentation` discriminator and one exhaustive registry, then render a Marketplace-specific body through small case-study primitives. The page consumes a committed, dated evidence snapshot and copied project-native SVGs; it never fetches Marketplace or consumer data at runtime.

**Tech Stack:** React 19, TypeScript, React Router, TanStack Query, Sass, Vite, Vitest, Playwright, Python `unittest`.

**Execution Strategy:** Tasks 1–5 were substantially executed before the epic-wide model decision recorded on 23 August 2026. Task 6 and any continuation or rework use `/subagent-driven-development`: a GPT-5.6 Sol main agent writes the JIT plan and remains the phase orchestrator; every implementation, research, repair, and review subagent uses GPT-5.6 Terra. This records the forward contract without rewriting earlier execution history.

## Global Constraints

- Keep static GitHub Pages delivery. Add no backend, runtime repository fetch, database, search index, analytics, or interactive explorer.
- Preserve the approved thesis exactly: “Shared where reuse earns it. Local where context matters.”
- Treat `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e` as the selected Marketplace evidence coordinate. It is already the portfolio gitlink on merged `main`; verify it, do not manufacture a submodule update.
- Use the dated `2026-08-21` repository audit only; do not describe it as live telemetry or automatic global synchronisation.
- Do not claim all repositories participate, that pins are current, that every asset is first-party, or that Wild Bunch uses `mcp-usage-pack`.
- Copy only the six specified Marketplace SVGs into portfolio custody. Text labels and semantic structure must remain useful if an icon fails.
- Preserve the ordinary Markdown path. A content item has exactly one body source: canonical Markdown `path` or a known project `presentation`.
- Preserve editorial engineering direction, keyboard access, reduced-motion behaviour, 320px/200% zoom usability, bundle budgets, and the existing route-error fallback.
- Do not weaken screenshot tolerances. Record wide and narrow PR screenshots during manual review.

## Current-truth drift record

| Spec assumption | Current evidence | Classification | Planning response |
| --- | --- | --- | --- |
| Portfolio gitlink must move from `be69c861…` to `52866df…` | `origin/main` at `f8b76a7` already pins `marketplace-source` to `52866df…`; the worktree submodule resolves to that SHA. | implementation seam moved | Verify the existing gitlink and use it for assets and inventory; do not change it. |
| Marketplace page is Markdown-backed | `content-manifest.json` still points at `projects/codex-marketplace.md`; `ContentPage` always renders `MarkdownContent`. | still true | Introduce the one discriminator and registry seam before replacing the body. |
| Marketplace preview is an arbitrary tile grid | `ProjectVisual` renders nine abbreviation tiles and the verified 17/74 count. | still true | Replace only this preview with core-three and selected/local cues; retain the full map for the specialist body. |
| Exact public audit dates and consumer SHAs are available | The approved spec supplies the complete dated table and exact public coordinates. | still true | Store them as authored static evidence and validate only their shape plus central Marketplace facts. |

---

### Task 1: Establish source-backed Marketplace evidence and quality contracts

**Files:**
- Create: `src/client/src/data/case-studies/marketplace-evidence.json`
- Modify: `tools/portfolio_quality.py`
- Modify: `tests/test_portfolio_quality.py`
- Modify: `src/client/src/data/content/content-manifest.json`

**Consumes:** Marketplace submodule at `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e`; the approved five-repository audit table.

**Produces:** A committed evidence object and a validator that understands the Marketplace presentation and exclusive body-source contract.

- [x] **Step 1: Extend the Python fixture so a project can be presentation-backed.**

  Update `PortfolioFixture.write()` to create only manifest items with a string `path`; this lets a fixture represent a valid code-backed project. Add fixture helpers for the Marketplace submodule tree and evidence file so each negative case is isolated.

- [x] **Step 2: Write failing quality tests.**

  Add focused tests that assert findings for: both `path` and `presentation`; neither source; an unknown presentation; presentation on non-project content; a missing or malformed evidence file; invalid date, non-HTTPS URL, short SHA, duplicate consumer/plugin names, private path or worktree/branch text; unknown selected Marketplace plugin; and evidence/submodule revision or inventory-count drift. Include a passing fixture with explicitly named local skills and plugins.

  Run: `py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v`

  Expected: FAIL because the existing validator requires every item to have Markdown and knows no Marketplace evidence schema.

- [x] **Step 3: Implement the minimum validator seams.**

  Add constants for the approved presentation identifier, evidence path, Marketplace gitlink, and central inventory paths. In `_validate_manifest`, enforce the path/presentation exclusive-or and only permit `marketplace-case-study` on a project. Preserve the canonical-POSIX and orphan-Markdown checks for Markdown-backed entries. Add a Marketplace-specific validator that reads the static evidence, rejects private/local coordinates, verifies its revision against the gitlink, reads the aggregate manifest and 17 enabled bundle manifests, and checks 17 plugins, 74 entries, and 70 unique canonical skill names.

- [x] **Step 4: Add the audited static evidence.**

  Create `marketplace-evidence.json` with `observedAt: "2026-08-21"`, the target SHA, `17`, `74`, and `70`, central plugin names, and the five approved consumer entries. Use public repository URLs and full public SHAs only. Include Wild Bunch’s historical-selection note and no `mcp-usage-pack` selection; do not add Agentic Learning Lab.

- [x] **Step 5: Convert the Marketplace manifest item at the data boundary.**

  Replace the current summary with the approved public summary, remove `path`, add `presentation: "marketplace-case-study"`, and set `relatedSlugs` to `provisioning-is-not-accumulation`, `context-is-not-state`, and `pass-references-not-paragraphs` in that order. Do not delete the Markdown file until Task 2 has the runtime fallback covered.

- [x] **Step 6: Prove the data contract.**

  Run: `py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v`

  Expected: PASS, including all presentation and evidence failures.

- [x] **Step 7: Mark this task complete in this plan.**

### Task 2: Add the discriminated presentation route without disturbing Markdown content

**Files:**
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `src/client/src/api/contentApi.test.ts`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Create: `src/client/src/features/case-study/projectPresentations.tsx`
- Delete: `src/client/src/data/content/projects/codex-marketplace.md`

**Consumes:** Validated `presentation` manifest items from Task 1.

**Produces:** `ProjectPresentation` as a narrow union; an exhaustive `projectPresentations` registry; and a route that chooses a registered body once while Markdown continues unchanged.

- [x] **Step 1: Write failing TypeScript tests for the source split.**

  In `documents.test.ts`, construct a `ContentSummary` with `presentation: 'marketplace-case-study'` and assert `loadDocument()` returns its summary with `markdown: ''` without looking for a loader. In `contentApi.test.ts`, assert `getContent('codex-marketplace')` returns the presentation summary while `getContent('wild-bunch')` still returns its Markdown body.

  Run: `npm.cmd test -- documents.test.ts api/contentApi.test.ts`

  Expected: FAIL because `ContentSummary` has no presentation field and the Marketplace manifest still assumes a Markdown loader.

- [x] **Step 2: Add the narrow shared type and loader behaviour.**

  Define `export type ProjectPresentation = 'marketplace-case-study'` and optional `presentation?: ProjectPresentation` on `ContentSummary`. Parse it in `itemToSummary`. Make `loadDocument()` return `{ summary, markdown: '' }` when a known presentation is present; keep the current glob lookup and `prepareMarkdown()` path for ordinary items.

- [x] **Step 3: Create the single exhaustive registry seam.**

  In `projectPresentations.tsx`, export `projectPresentations: Record<ProjectPresentation, ComponentType>` and initially map `'marketplace-case-study'` to the specialist component created in Task 3. The registry must be the only presentation-to-component switch.

- [x] **Step 4: Render the registry once in `ContentPage`.**

  Keep the current query, error, metadata, header, related-content, and navigation responsibilities. Derive a `PresentationBody` from `document.summary.presentation`; render it inside `.content-page-body` when present, otherwise render `MarkdownContent`. Do not add slug checks or route-specific branching outside the registry.

- [x] **Step 5: Delete the superseded Marketplace Markdown source and prove both paths.**

  Delete `projects/codex-marketplace.md` only after the registry renders. Run: `npm.cmd test -- documents.test.ts api/contentApi.test.ts`

  Expected: PASS; Marketplace has an empty Markdown payload and ordinary project Markdown remains intact.

- [x] **Step 6: Mark this task complete in this plan.**

### Task 3: Build composable case-study primitives and the Marketplace dossier

**Files:**
- Create: `src/client/src/features/case-study/CaseStudyBody.tsx`
- Create: `src/client/src/features/case-study/CaseStudySection.tsx`
- Create: `src/client/src/features/case-study/CaseStudyEvidence.tsx`
- Create: `src/client/src/features/case-study/CaseStudyDecision.tsx`
- Create: `src/client/src/features/case-study/marketplace/MarketplaceCaseStudy.tsx`
- Create: `src/client/src/features/case-study/marketplace/MarketplaceDistributionMap.tsx`
- Create: focused `*.test.tsx` files beside the components
- Create: `src/client/public/media/marketplace/{repo-worker-pack,superpowers-plus,mcp-usage-pack,frontend-pack,architecture-pack,dotnet-pack}.svg`
- Modify: `docs/asset-custody.md`
- Modify: `docs/design-decisions.md`

**Consumes:** Evidence snapshot from Task 1 and the presentation registry from Task 2.

**Produces:** Small reusable primitives plus one specific Marketplace narrative and a semantic static distribution map.

- [x] **Step 1: Copy the six reviewed project-native SVGs into portfolio custody.**

  Copy only the source paths named by the approved spec from `codex-marketplace/plugins/` at `52866df…`. Retain their visual identity; do not redraw branding. Record each public path, exact source path/repository/SHA, lineage or licence basis (including `superpowers-plus` derivative provenance), view box, bytes, transformation, date, and text-label fallback intent in `docs/asset-custody.md`.

- [x] **Step 2: Write failing component tests for the reusable primitives and case-study body.**

  Assert that sections own their heading relationship, evidence exposes the audit label/status/link, and each decision includes explicit reason and consequence. For `MarketplaceCaseStudy`, assert the exact thesis, the three operating-model headings in Baseline/Selected/Local source order, `Repository audit · 21 August 2026`, live state, public repository link, the five decisions, and the ordered related-essay links.

  For `MarketplaceDistributionMap`, assert a labelled `figure`, ordered groups/nested lists, text labels for all required plugins and consumers, a screen-reader explanation of differing pins, and Wild Bunch with `dotnet-pack`, `architecture-pack`, and `frontend-pack` but no `mcp-usage-pack`.

- [x] **Step 3: Implement the narrow primitives.**

  Make `CaseStudyBody` own the full-width/reading-measure boundary. Make `CaseStudySection` accept an explicit title and children. Make `CaseStudyEvidence` take audit date, status, and ordinary external link props. Make `CaseStudyDecision` render decision, reason, and consequence as semantic labelled content. Do not add a JSON block renderer, context, global state, or CMS abstraction.

- [x] **Step 4: Implement the specialist narrative in approved reading order.**

  Compose: `When repeated instruction becomes infrastructure`; the static distribution map; Baseline/Selected/Local; the six-step `repo-standards` trace; five decisions; and evidence/present-state closing. State the first-party pivot with transparent `superpowers-plus` lineage, pins/provenance as inspectable differences, and continuous iteration without perfection claims. Keep the visible repository link ahead of the closing evidence without treating it as the primary CTA.

- [x] **Step 5: Implement the map as content before decoration.**

  Use a labelled figure with ordered semantic source, core-plugin, selected-plugin, and consumer groups. Place local labels inside consumer boundaries. Keep text labels as the meaning; SVG icons are supplemental images with decorative `alt=""` when the adjacent label supplies the name. Restrict connectors to CSS pseudo-elements or `aria-hidden` SVG; no motion and no hover-dependent relationship.

- [x] **Step 6: Prove the component contract.**

  Run: `npm.cmd test -- features/case-study`

  Expected: PASS with semantic headings, source order, truthful Wild Bunch selection, accessible text labels, trace, and decision evidence covered.

- [x] **Step 7: Add the ledger decision and mark this task complete.**

  Add a dated `docs/design-decisions.md` entry explaining the composable case-study seam, its consequence (later case studies can vary in art direction and reading order), and a reconsideration trigger. Mark this task’s boxes complete.

### Task 4: Give the flagship and its preview an authored responsive visual system

**Files:**
- Modify: `src/client/src/features/home/ProjectVisual.tsx`
- Create or modify: `src/client/src/features/home/ProjectVisual.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: component tests from Task 3 as needed for class/semantics contract

**Consumes:** Case-study semantic structure and portfolio-custody SVG paths from Task 3.

**Produces:** A full-width editorial system map, responsive stacked reading order, and a concise Marketplace preview that shares core-three identity without duplicating the dossier.

- [x] **Step 1: Write the failing preview test.**

  Assert the Marketplace `ProjectVisual` exposes text for `repo-worker-pack`, `superpowers-plus`, and `mcp-usage-pack`, a restrained selected/local indication, and the verified 17-plugin/74-entry inventory context. Assert it no longer renders the arbitrary nine abbreviation labels.

- [x] **Step 2: Implement the compact preview.**

  Replace the tile constellation with the three core identities and a simple selected/local branch cue. Keep it a self-contained `figure` with an accurate accessible name. Do not embed the full consumer map in cards, project indexes, or the homepage.

- [x] **Step 3: Style the shared body and full map from semantic source order.**

  Add scoped Sass for wide `MarketplaceDistributionMap` composition: deep-teal source surface, warm-paper consumer regions, copper connectors, display focal statement, serif explanation, and code-like evidence labels. At narrow widths switch to an ordered stack with no horizontal scrolling or miniature scaled desktop diagram. Preserve visible focus and source order; use no motion.

- [x] **Step 4: Check responsive layout locally before visual baselines.**

  Run: `npm.cmd run build`

  Expected: PASS, including route documents, generated CV PDF, and bundle budget. Inspect `/projects/codex-marketplace` at 1440, 768, 390, and 320 CSS pixels; resolve clipping or horizontal overflow before recording snapshots.

- [x] **Step 5: Prove the preview and mark this task complete.**

  Run: `npm.cmd test -- features/home/ProjectVisual.test.tsx features/case-study`

  Expected: PASS.

### Task 5: Add route, visual, and manual evidence for the finished case study

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Create: reviewed snapshots under `src/client/e2e/visual-regression.spec.ts-snapshots/`
- Modify: `.githooks/pre-commit` and `tests/test_precommit_hook.py` if the staged-tree gate cannot resolve the linked worktree's Marketplace submodule
- Modify: the generated snapshot `INDEX.md` through `py -3 tools/run.py ci --apply`
- Modify: `.agents/plans/portfolio-10k/roadmap.md` with final commit, PR, rating, and evidence notes after merge

**Consumes:** The completed case study, styles, and existing Playwright preview server.

**Produces:** Direct-route and navigation proof, reviewed 1440/390 visual baselines, and a closed roadmap record.

- [x] **Step 1: Write failing browser assertions.**

  Extend `project-story.spec.ts` to visit `/projects/codex-marketplace` directly and via an in-app project link. Assert the exact thesis, visible public repository link, keyboard-reachable evidence links, semantic figure, the three operating-model headings, and truthful Wild Bunch selection. Add 390px and 320px checks for `document.documentElement.scrollWidth <= clientWidth` and ordered map labels. Exercise reduced motion without changing content.

- [x] **Step 2: Add stable visual contracts and capture reviewed baselines.**

  Add `data-visual-contract` hooks only to the Marketplace hero/map and narrow operating-model surface. Capture reviewed baselines at 1440 and 390 after fonts load and reduced motion is set. Use the established platform-specific baseline helper if Linux and Windows rasterise the bundled fonts differently; do not relax global tolerance.

- [x] **Step 3: Run focused browser tests.**

  Run: `npm.cmd run test:e2e -- e2e/project-story.spec.ts e2e/visual-regression.spec.ts`

  Expected: PASS with direct navigation, keyboard/evidence, narrow no-overflow, source order, and Marketplace visual checks.

- [x] **Step 4: Perform the required human-quality review.**

  Inspect the finished route at 1440, 768, 390, and 320 CSS pixels; keyboard-only; reduced motion; and 200% native zoom. Record PR screenshots before/after the new flagship. Confirm the thesis arrives before counts, the diagram reads as selective distribution rather than catalogue inventory, boundaries are not colour-only, Wild Bunch’s historical selection is honest, and the page remains credible with external links unavailable.

- [x] **Step 5: Regenerate and validate only after all source changes are staged.**

  Run:

  ```powershell
  py -3 tools/run.py ci --apply
  git add -A
  py -3 tools/run.py ci --check
  ```

  Expected: PASS. The canonical check covers Python validator tests, Vitest, TypeScript/Vite build, Playwright, routes, links, privacy, custody, and budgets. Do not run it earlier on an intentionally incomplete tree.

- [ ] **Step 6: Commit, publish, and update the roadmap only with verified evidence.**

  Commit focused source plus generated surfaces, push the Phase 3 branch, open a draft PR, and verify its exact head/check state in GitHub. The GPT-5.6 Sol orchestrator must personally review the material public copy, composition, hierarchy, style, taste, humanness, restraint, and AI-slop risk against the £10k portfolio bar. Sol may veto a creative output and must dispatch GPT-5.6 Terra revision work until it passes. After verified merge, replace the roadmap placeholders with the commit, PR, final handoff rating, review limitations, and manual evidence; then move this plan to `.agents/plans/completed/` through the completion runbook.

- [ ] **Step 7: Mark this task complete in this plan.**

### Task 6: Normalize the execution model across the £10k epic

**Files:**
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: all twelve approved `.agents/specs/2026-08-21-portfolio-10k-*-design.md` phase specifications
- Modify: this plan only to mark Task 6 complete
- Modify: generated `INDEX.md` surfaces only through `py -3 tools/run.py mesh --apply` if the generator reports drift

**Consumes:** Harley's 23 August 2026 execution-model decision; the approved twelve-phase roadmap and phase specifications; the current subagent-driven-development and handoff contracts.

**Produces:** One binding, prospective execution contract that a future phase orchestrator can follow without inferring models, responsibilities, creative authority, or escalation behaviour.

- [x] **Step 1: Replace the roadmap's legacy model routing with the binding orchestration contract.**

  State that GPT-5.6 Sol is the main phase orchestrator. Sol reads the roadmap, approved phase spec, current repository truth, design policy, decision ledger, and runbooks; writes the JIT implementation plan; selects `/subagent-driven-development`; maintains the whole-plan view, task sequencing, integration, evidence, handoff readiness, and completion drive. Every implementation, research, repair, task-review, re-review, and final-review subagent must use GPT-5.6 Terra. Generic escalation guidance must not create a Sol child: the Sol main agent narrows or replans the work and redispatches Terra.

- [x] **Step 2: Add the same binding execution-model section to all twelve phase specifications.**

  Put the section near the phase boundary, after `Outcome boundaries` in Phases 1–2 and after `Non-goals` in Phases 3–12. Make it govern implementation, continuation, or rework begun after 23 August 2026 without claiming that completed work used this model. Preserve every product requirement, source-of-truth boundary, dependency gate, and explicit Harley approval.

- [x] **Step 3: Make the Sol creative gate explicit and non-delegable.**

  Terra may draft creative work, but the Sol orchestrator personally reviews every material creative output, including public copy, creative writing, visual style, art direction, hierarchy, imagery and capture framing, and interaction tone. Sol assesses taste, humanness, restraint, specificity, and AI-slop risk against the £10k portfolio bar; it may veto and must dispatch Terra iteration until the output passes before handoff readiness. This gate precedes and does not replace any named Harley approval or factual, privacy, custody, accessibility, deployed-proof, or protected-default gate.

- [x] **Step 4: Preserve history and remove contradictory future routing.**

  Do not imply that GPT-5.6 Sol or Terra performed work where repository evidence does not prove it. Keep public project-story uses of `agent`, `model`, `review`, and `creative writing` unchanged when they describe the subject rather than portfolio delivery. Remove or rewrite the roadmap's former Terra-planner, SWE-1.7/GLM, Cloud Sol, and optional creative-review routing so there is one future execution model.

- [ ] **Step 5: Regenerate and validate the documentation surface.**

  Run `py -3 tools/run.py mesh --apply`, stage the intended source and generated surfaces, then run `py -3 tools/run.py ci --check`. Confirm the working tree contains no unrelated edits and the PR body accurately describes the expanded documentation scope and exact final head.

- [ ] **Step 6: Complete the task through SDD review.**

  The Terra implementer writes a report with changed files and validation evidence. A fresh Terra task reviewer checks all twelve specs and the roadmap for coverage, consistency, historical honesty, preserved human gates, and prose quality. The Sol orchestrator resolves any findings through Terra iteration, performs the final creative review itself, and marks this task complete only when the contract is unambiguous and handoff-ready.

## Plan-readiness self-review

- **Spec coverage:** Tasks 1–2 cover static evidence, central inventory, and exclusive presentation routing; Task 3 covers the approved narrative, map semantics, trace, decisions, assets, and custody; Task 4 covers the distinctive responsive composition and compact preview; Task 5 covers route, visual, accessibility, manual, canonical, creative-review, and publication evidence.
- **Dependency order:** Validator/evidence precede manifest conversion; content type/registry precede Markdown deletion; specialist components precede style and browser baselines; generated surfaces and canonical validation occur only after all source changes are staged.
- **No placeholders:** Consumer coordinates, plugin names, approved thesis, exact evidence revision, test files, commands, non-goals, and manual review requirements are explicit. Copy rhythm is the sole normal implementation judgment and remains bounded by the approved public copy contract.
- **Platform note:** Exact visual baselines use the existing per-platform screenshot convention when font rasterisation differs. The semantic, route, and overflow assertions remain platform-neutral.
- **Rating:** 9/10 plan-readiness. The plan has one resolved seam move (the already-pinned gitlink), all sources and test seams are identified, and no product or factual decision remains open.
