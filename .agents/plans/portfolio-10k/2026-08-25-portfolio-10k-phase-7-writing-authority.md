# Portfolio £10k Phase 7: Writing Authority and Breadth Implementation Plan

**Status:** Ready for execution

**Approved design:** [Writing Authority and Breadth](../../specs/2026-08-21-portfolio-10k-07-writing-authority-design.md)

**Repository baseline:** `146c6b40e9c8790644fc492a46b128daf458b86e`

**Marketplace evidence pin:** `ddbd36f4e34c82155983f84de2318d00b0f2824d` on public `main`, observed 25 August 2026

**Inherited skill-TDD pin:** `obra/superpowers` public `main` at `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`, observed 25 August 2026

**Execution strategy:** `/subagent-driven-development`. GPT-5.6 Sol remains the controller and personally owns editorial judgement, integration and every creative pass. Each implementation or review subagent uses GPT-5.6 Terra with a task-specific brief and no delegated children. Tasks run in dependency order; independent test and evidence work may run concurrently only when files do not overlap.

## Outcome

Publish five finished essays as one authored technical publication. Two essays prove core engineering judgement, three prove distinct agentic-engineering judgement, and every route carries a typed principal figure, explicit editorial metadata, source custody and two useful onward choices.

The public roster is fixed for this phase:

1. `agentic-engineering-vs-vibe-coding`
2. `provisioning-is-not-accumulation`
3. `graph-iterative-review`
4. `api-is-only-the-middle`
5. `tests-are-different-kinds-of-evidence`

The Graph evidence gate passed. `context-is-not-state` and `pass-references-not-paragraphs` leave the public manifest rather than expanding the launch roster to seven rough essays. Their useful source material remains available in Git history.

## Current-truth drift table

| Spec assumption | Current evidence | Classification | Plan response |
| --- | --- | --- | --- |
| Phase 6 precedes this work | PR #29 merged as `e906f05`; its mobile and fresh-worktree follow-up PR #30 merged as `146c6b4`; hosted run `32836625754` passed on the latter commit | still true | Start Phase 7 from `146c6b4` and close Phase 6 in the roadmap |
| Five public writing routes exist | The manifest has Vibe, Graph, Context, Provisioning and Pass References | implementation seam moved | Replace the roster in place; do not treat route count as editorial completion |
| Graph is preferred only if public implementation proves it | Marketplace public `main` at `ddbd36f4` contains the router, state schema, node recipes, transition tests, finding/resolution ledgers, regression routing and final-strong gate | still true, evidence gate passed | Select Graph and pin `ddbd36f4`; do not implement the Context fallback |
| The old Graph article may describe an earlier design baseline | The live graph now includes normalize-inputs, reviewer-fast, lens dispatch and triage, scoped fix review, regression scan, resolved ledger and final-strong closeout | implementation seam moved | Rewrite against the live pin; the existing article is source material only |
| Skill TDD derives from `obra/superpowers` | Upstream public `main` still resolves to the design pin `b36e0829`; Marketplace records the derivative custody and keeps the RED/GREEN pressure-testing method | still true | Record derivation precisely and distinguish Harley's evidence-custody extension from inherited practice |
| Writing metadata is generic | `ContentSummary` still exposes `date`, `featured` and untyped related slugs; the index silently falls back to the first article | still true | Introduce a writing-specific discriminated contract and fail closed |
| Writing routes use chronological navigation | `ContentPage` still computes writing order and renders `ContentNavigation` for every kind | still true | Replace writing Previous/Next with two curated continuations; preserve project and Patch navigation |
| Principal figures sit outside Markdown | No writing figure registry exists; writing routes render a generic header and Markdown body | still true | Build the typed figure and continuation system before article integration |
| Existing Vibe argument is closed | Current prose matches the approved generous professional boundary, with one repo-wide AI-tell phrase still requiring a final edit | still true | Preserve the argument, edit only for factual accuracy, voice and publication coherence |

No design conflict requires reopening the approved specification.

## Graph evidence-gate record

The accepted public revision is Marketplace `ddbd36f4e34c82155983f84de2318d00b0f2824d`. The following committed surfaces prove an implemented workflow rather than an aspirational diagram:

- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/scripts/next_node.py`
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/scripts/start_review.py`
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-state-graph.md`
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-state-schema.json`
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-metrics-schema.json`
- the `node-*.md` recipes and focused transition tests under `tests/`
- append-only finding, resolution and regression records compiled into review metrics
- a final-strong reviewer contract that refuses unresolved important findings or regressions

The feature lineage is visible in Marketplace commits `42bf9d37`, `1cf3c0dd`, `70d25d08`, `dd8ef9a4`, `f3792c9f`, `c519cf31`, `431a9fec` and `1c307a23`. The article should use the accepted full revision, with the lineage available when a specific design consequence needs history.

## Phase 7 creative-review brief

**Audience:** Hiring managers and senior engineers who already know software can be generated and want evidence that Harley can make it dependable, operable and worth owning.

**Intended response:** A reader should recognise a software engineer applying established product, delivery, testing and operational judgement to agentic systems. The publication should feel useful in its own right. Hiring value remains subtext.

**Distinctive design intent:** Treat the writing area as one serious technical journal with five individually authored arguments. A restrained publication grammar holds the routes together, while each principal figure has its own explanatory geometry. Prose remains the centre of gravity. Figures, source links, pull quotations and continuation choices earn their space by making an argument easier to understand.

**Protected defaults:** Existing typography, palette, site canvas, prose measure, accessible external-link policy, static delivery, reduced-motion behaviour and the distinction between projects, Patch stories and writing. The Vibe article's approved argument stays closed.

**Factual, privacy and custody boundaries:** Pin every cross-repository claim. Access Checks copy stays inside the approved public facts and must not expose internal topology, customer identity, candidate data or private metrics. It may name the product, .NET 8, Azure Functions, customer portal, Access Screening as a downstream consumer, and Harley's end-to-end responsibility. Source relationships must say derivation, traditional composition, Harley's extension, later convergence, supporting evidence or further reading accurately.

**Failure modes:** Five interchangeable templates; generic diagrams; a testing pyramid; separate frontend/backend proof silos; Graph copy that publishes a plan as implementation; plugin catalogues; hostility toward vibe coding; architecture badges; a chronological blog feed; automatic continuation copy; a fallback visual; seven public essays retained for volume; source links without custody; hiring pitch conclusions; stiff no-contraction prose; em dashes; emoji; repeated AI-familiar contrast constructions; or prose that explains familiar engineering concepts to Harley instead of expressing his judgement through them.

**Observable acceptance signals:** Exactly five essays exist publicly. One and only one index lead is visually obvious. Each first viewport states one useful proposition and contains a readable principal figure whose text alternative carries the same argument. A reader can follow the approved continuation graph without seeing hidden category labels. Every essay has a concrete opening, earns its sections, uses evidence honestly and ends quietly. The API and testing essays feel as authoritative as the agentic pieces without duplicating the Wild Bunch architecture case study. At 320 pixels and 200% zoom, prose, figures and continuation choices remain legible and free of horizontal overflow.

**Evidence surface for Sol review:** Exact Markdown, rendered index and five routes, typed metadata, figure DOM and text equivalents, source-custody ledger, validator findings, focused component tests, accessibility results, desktop and narrow captures, continuation traversal, repo-wide voice scan and hosted PR checks.

**Required review lenses:** `/writing-with-clarity` with the writing and implementation-plan `/unslop-profiles`; `/designing-premium-sites`; `/frontend-ux`; `/react`; `/web-layout`; `/web-styling`; `/wcag`; `/asset-custody`; `/playwright-testing`; `/test-driven-development`; and the active portfolio design policy. Sol reads every article as one coherent piece and renders every material presentation change before recording `pass` or `veto`.

## Global constraints

- Keep the work to Phase 7. Do not choose or build the Phase 8 homepage feature.
- Keep article prose in ordinary Markdown. Do not add MDX, diagram runtimes, chart packages or custom Markdown directives.
- Render the principal figure and continuations through typed React components outside Markdown.
- Unknown visual identifiers, missing descriptions, missing continuation targets, duplicate leads and the wrong Graph/Context roster fail validation. There is no generic fallback.
- `dateline` is an editorial coordinate, not `datePublished`, `pubDate` or repository chronology.
- Do not expose public `core` or `agentic` category labels.
- External sources open in a new context through the existing accessible link component. Internal article links remain ordinary client navigation.
- Generated indexes and mechanical files belong in the commit when the canonical generator changes them.
- Every material creative output needs Sol's personal pass or veto before integration is considered complete.
- Harley's final author review of all five complete essays and the full reading journey is a hard gate before the PR becomes merge-ready.

---

### Task 1: Make the five-essay editorial contract enforceable

**Files:**
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `tools/portfolio_quality.py`
- Modify: `tests/test_portfolio_quality.py`
- Create: `docs/editorial-source-custody.md`
- Modify: `docs/INDEX.md`

**Consumes:** Approved roster and metadata contract; Marketplace pin `ddbd36f4`; upstream pin `b36e0829`; current manifest loader and quality validator.

**Produces:** A discriminated writing editorial type, exact launch-roster fixtures, a source-custody authority and a deterministic validator ready for atomic activation with the final manifest in Task 5.

- [ ] **Step 1: Write the failing TypeScript contract tests.** Build final-roster fixtures that require every editorial writing summary to expose `dateline`, positive `readingMinutes`, `indexLead`, eligible homepage proposition, typed visual ID plus description, and exactly two `{ slug, rationale }` continuations. Require non-writing content to remain valid without writing metadata.
- [ ] **Step 2: Write the failing Python validation matrix.** Cover exactly five published essays; exact Graph roster and Context exclusion; Pass References exclusion; exactly one lead; unique known visual IDs; non-empty descriptions and homepage propositions; exactly two distinct, published, non-self continuation targets; non-empty rationales; preserved route paths; valid datelines; and no generic `featured` or writing `relatedSlugs` fallback.
- [ ] **Step 3: Define the exact contract.** Add `ArticleVisualId`, `EditorialContinuation`, `WritingEditorial` and an `EditorialWritingSummary` subtype plus a narrow parser. Preserve the current `ContentSummary` union until Task 5 can atomically require the subtype for all live writing entries. Keep the public data serialisable and immutable at its consumer boundary.
- [ ] **Step 4: Encode the approved final state in fixtures without publishing it early.** Keep Vibe as the only `indexLead`. Make all five essays homepage eligible with authored feature propositions. Assign stable visual IDs for prototype responsibility, knowledge routing, review governance, product ownership and evidence boundaries. Do not derive one field from another. Implement the narrow validator as a directly tested helper, but do not call it from the repository-wide manifest gate until Task 5 atomically supplies the final roster and integrates the route. This is an explicit producer-before-consumer bridge, not a permissive legacy mode.
- [ ] **Step 5: Establish editorial source custody.** Record the Marketplace Graph pin and exact proof paths; `obra/superpowers` derivation pin and file; traditional testing principles; Harley's Marketplace evidence-custody extension; any later-convergence sources selected during article writing; Access Checks public-fact authority; usage mode; relationship; access date and final article destination. Link the ledger from `docs/INDEX.md`.
- [ ] **Step 6: Make focused checks pass.** Run `py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v` and `npm.cmd --prefix src/client test -- src/data/documents.test.ts src/api/contentApi.test.ts`.
- [ ] **Step 7: Regenerate, stage, verify and commit.** Run `py -3 tools/run.py ci --apply`, inspect every generated change, stage the whole intended Task 1 slice, run `git diff --cached --check`, then commit `feat: define the writing editorial contract`.
- [ ] **Step 8: Mark Task 1 complete.** Set this task's checklist boxes to `[x]`, stage the plan and carry that state in Task 2's commit.

---

### Task 2: Build the shared reading and continuation system

**Files:**
- Create: `src/client/src/components/ArticleFigure.tsx`
- Create: `src/client/src/components/ArticleFigure.test.tsx`
- Create: `src/client/src/components/ArticleContinuations.tsx`
- Create: `src/client/src/components/ArticleContinuations.test.tsx`
- Modify: `src/client/src/styles/global.scss`

**Consumes:** Task 1 typed editorial metadata and valid continuation graph.

**Produces:** Five typed principal-figure renderers and curated continuation navigation, fully tested with final-roster fixtures and ready for atomic route integration in Task 5.

- [ ] **Step 1: Write failing figure-registry tests.** Require each `ArticleVisualId` to render a real `<figure>` with visible `<figcaption>`, stable contract marker and an equivalent ordered or descriptive text surface. Unknown IDs must be unrepresentable and no fallback figure may render.
- [ ] **Step 2: Write failing continuation tests.** Require two descriptive linked headings with title, rationale and reading time; preserve author order; report unavailable navigation honestly when the catalogue query fails; reject self-links and duplicate targets in fixtures.
- [ ] **Step 3: Write failing component-level composition tests.** With final-roster fixtures, require the figure and two continuations in source order and prove unavailable catalogue handling. Defer live route and index assertions until Task 5, after all five article files exist.
- [ ] **Step 4: Implement semantic figures without a new dependency.** Build the five figures from HTML and CSS, using owned inline SVG only where the Graph topology needs connectors that HTML cannot express cleanly. Keep essential labels selectable and available in source order. Figures communicate: capability to accountable product; knowledge routed across four scopes; the reduced live review loop; product responsibility with API in the middle; and evidence boundaries across the product system.
- [ ] **Step 5: Implement the reusable continuation component.** Resolve titles and reading time from supplied catalogue data, preserve author order and use descriptive linked headings. Report catalogue failure honestly. Do not couple the component to chronological navigation.
- [ ] **Step 6: Apply responsive and accessible component styling.** Verify meaningful headings, DOM order, focus treatment, contrast, figure equivalence, code wrapping, 320-pixel behaviour, 200% zoom and reduced-motion neutrality. Keep unused publication-wide layout rules out of the stylesheet until Task 5 can render them.
- [ ] **Step 7: Run focused tests and build.** Run `npm.cmd --prefix src/client test -- src/components/ArticleFigure.test.tsx src/components/ArticleContinuations.test.tsx` and `npm.cmd --prefix src/client run build`.
- [ ] **Step 8: Stage, inspect and commit.** Run `py -3 tools/run.py ci --apply`, inspect generated indexes and budgets, stage the intended slice, run `git diff --cached --check`, then commit `feat: build the technical writing components`.
- [ ] **Step 9: Mark Task 2 complete.** Set this task's checklist boxes to `[x]`, stage the plan and carry that state in Task 3's commit.

---

### Task 3: Finish the three agentic-engineering essays

**Files:**
- Modify: `src/client/src/data/content/writing/2026-08-01-agentic-engineering-vs-vibe-coding.md`
- Modify: `src/client/src/data/content/writing/2026-08-12-provisioning-is-not-accumulation.md`
- Modify: `src/client/src/data/content/writing/2026-08-05-graph-iterative-review.md`
- Modify: `docs/editorial-source-custody.md`
- Modify: `tests/test_portfolio_quality.py`

**Consumes:** Task 1 custody and metadata; Task 2 figure arguments; approved Vibe argument; the live Marketplace Graph pin.

**Produces:** Three coherent, source-backed essays proving professional boundary, environment architecture and runtime governance.

- [ ] **Step 1: Lock three one-sentence arguments and outlines in the SDD workspace.** Vibe stays generous while locating accountable engineering after the prototype. Provisioning explains selecting knowledge by environment, reusable workflow, task and verification scope. Graph explains why explicit state, guarded transitions, bounded repair and honest exits pay for their complexity.
- [ ] **Step 2: Preserve Vibe's approved argument while removing publication defects.** Keep its generosity and professional confidence. Remove the repo-wide familiar phrase `The thing I keep coming back to`, any duplicated contrast construction and the process-note footer. Do not turn the edit into a rewrite or a defence of engineering status.
- [ ] **Step 3: Rebuild Provisioning from the proposition outward.** Open with a concrete over-provisioning failure. Make routing, scope and maintenance burden observable. Apply YAGNI without turning the essay into a plugin catalogue or a set of four equal definition cards in prose.
- [ ] **Step 4: Rewrite Graph against `ddbd36f4`.** Use the actual single-next-node router and reduced graph. Explain scope honesty, cheap pre-lens review, deep lenses, finding custody, re-preflight, scoped fix review, regression scan, resolved ledger, final strong pass, `ready` and first-class `blocked`. State what the system can and cannot prove. Do not claim that Mermaid is executable or that reviewer output is independently true merely because it followed the graph.
- [ ] **Step 5: Run the Sol editorial gate article by article.** Read each piece aloud in effect, then inspect argument progression, paragraph adjacency, contractions, economy, exact technical vocabulary, evidence boundaries, conclusions and AI-familiar phrase frequency across the whole repo. Record pass or veto in the SDD ledger and revise until all three pass.
- [ ] **Step 6: Add only earned source links and custody.** Link the public Graph source at the accepted revision. Classify source relationships; no link dump and no unattributed copied language.
- [ ] **Step 7: Run prose and contract checks.** Run the focused quality tests and repo-wide scans for em dashes, emoji and named AI-familiar constructions. Inspect every hit in context rather than mechanically replacing legitimate technical punctuation inside source references.
- [ ] **Step 8: Stage, inspect and commit.** Read each built Markdown route and inspect its matching Task 2 figure in the focused component test surface. Full route composition remains deliberately deferred until Task 5. Stage the intended slice, run `git diff --cached --check`, then commit `feat: publish the agentic engineering essays`.
- [ ] **Step 9: Mark Task 3 complete.** Set this task's checklist boxes to `[x]`, stage the plan and carry that state in Task 4's commit.

---

### Task 4: Write the two core-engineering essays

**Files:**
- Create: `src/client/src/data/content/writing/2026-08-18-api-is-only-the-middle.md`
- Create: `src/client/src/data/content/writing/2026-08-21-tests-are-different-kinds-of-evidence.md`
- Modify: `docs/editorial-source-custody.md`
- Modify: `tests/test_portfolio_quality.py`

**Consumes:** Task 1 metadata and public-fact boundaries; Task 2 figure arguments; the approved API and testing contracts; inherited skill-TDD pin and Marketplace extension evidence.

**Produces:** Employer-safe end-to-end product-ownership proof and a risk-led evidence strategy that bridges conventional and agentic engineering.

- [ ] **Step 1: Lock the API argument and evidence boundary before drafting.** Use Access Checks only as the safe concrete anchor. Structure the piece through ambiguity, contract, implementation, delivery, operation, support, recovery and learning. Keep the API visibly in the middle. Name only approved public facts and never imply original authorship of the whole product architecture.
- [ ] **Step 2: Draft and edit the API essay.** Start with a concrete piece of work that arrived larger than an endpoint. Show how sole-engineer responsibility broadens the work beyond the formal title without discussing recognition, progression, dissatisfaction, job search or employer evaluation. Finish with a reusable account of product ownership, not a CV paragraph.
- [ ] **Step 3: Lock the testing argument and evidence map before drafting.** Begin with the claim and risk being examined, then place local behaviour, contract, collaboration and consequential journey checks across frontend, API, application, persistence, infrastructure and external systems. Do not organise around tools, a pyramid or frontend/backend teams.
- [ ] **Step 4: Draft and edit the testing essay.** Explain why TDD starts with risk, question and observation boundary before RED and responsible GREEN. Name the `obra/superpowers` pressure-testing derivation. Explain Harley's composition as `The scenario travels with the skill. The result stays with the run.` Claim the exact Marketplace custody extension without claiming global priority. Treat later OpenAI or Anthropic guidance, if retained, as later independent convergence.
- [ ] **Step 5: Run the Sol editorial gate article by article.** Inspect authority, specificity, employer safety, paragraph flow, prose economy, contractions, technical accuracy, source relationships, conclusions and AI-familiar phrase frequency across the full five-essay set. Record pass or veto and revise until both pass.
- [ ] **Step 6: Complete source custody.** Pin every retained source and label its relationship. Remove candidate sources that do not advance the article. Ensure public links resolve and use the existing accessible external-link treatment.
- [ ] **Step 7: Run focused quality and safety checks.** Add negative tests for private or disallowed employer claims and false originality language. Run the quality tests and repo-wide voice scan.
- [ ] **Step 8: Stage, inspect and commit.** Inspect both Markdown files as coherent pieces and inspect their matching Task 2 figures in the focused component test surface. Full route composition remains deliberately deferred until Task 5. Stage the intended slice, run `git diff --cached --check`, then commit `feat: publish the core engineering essays`.
- [ ] **Step 9: Mark Task 4 complete.** Set this task's checklist boxes to `[x]`, stage the plan and carry that state in Task 5's commit.

---

### Task 5: Close the publication as one £10k reading journey

**Files:**
- Delete: `src/client/src/data/content/writing/2026-08-07-context-is-not-state.md`
- Delete: `src/client/src/data/content/writing/2026-08-15-pass-references-not-paragraphs.md`
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/content/content-manifest.json`
- Modify: `tools/portfolio_quality.py`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `src/client/src/components/EditorialIndexCard.tsx`
- Modify: `src/client/src/components/ContentNavigation.test.tsx`
- Modify: `src/client/src/pages/WritingIndexPage.tsx`
- Create: `src/client/src/pages/WritingIndexPage.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/e2e/content.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: visual baselines selected by the existing Windows visual contract
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: this plan

**Consumes:** Tasks 1-4 complete publication, typed routes and source custody.

**Produces:** Exactly five public essays, complete traversal and accessibility evidence, reviewed Windows visual baselines, roadmap evidence and a PR ready for Harley's author gate.

- [ ] **Step 1: Activate the final contract atomically.** Turn `ContentSummary` into the discriminated project/Patch/general versus editorial-writing union, make the loader require `EditorialWritingSummary` for writing items, populate the manifest with the five complete article files and approved metadata, remove generic writing `featured` and `relatedSlugs`, and connect `validate_writing_editorial` to the canonical portfolio validator. Re-run the full invalid-state matrix against repository truth.
- [ ] **Step 2: Remove superseded public routes deliberately.** Delete Context and Pass References from source and manifest. Assert both routes return not found, neither appears on the index or in continuations, and no orphan Markdown remains. Preserve their history; do not replace them with redirects in this phase.
- [ ] **Step 3: Integrate and test the complete editorial graph.** Recompose `ContentPage` and `WritingIndexPage` around the typed contract. Assert every route has the expected title, dateline, reading time, proposition, figure, caption and exactly two authored continuations. Traverse the preferred Graph continuation map. Assert no writing route exposes chronological Previous/Next and project/Patch navigation still works. Lead with Vibe because metadata says so, then present the other four by stable dateline without `archive`, `latest`, `recent` or publication chronology language.
- [ ] **Step 4: Test semantics and accessibility.** Run axe on the writing index and all five routes. Manually verify landmark and heading order, keyboard navigation, visible focus, external-link disclosure, figure equivalence, 200% zoom, code and long-link wrapping, and no horizontal overflow at 320 pixels.
- [ ] **Step 5: Perform the full visual review.** Inspect the index and every essay at 1440, 768, 390 and 320 CSS pixels plus 200% zoom. Confirm publication coherence without identical templates, deliberate whitespace, attached captions, readable figures, stable prose measure and continuation hierarchy. Review reduced motion even though no figure requires motion.
- [ ] **Step 6: Capture focused evidence and update baselines.** Use the smallest visual set that proves the index lead, each principal figure at desktop and narrow widths, and the continuation treatment. Do not add brittle full-page captures for every paragraph. Run Windows-canonical baseline updates only through the existing visual command.
- [ ] **Step 7: Run a whole-publication editorial pass.** Sol reads the index and five essays in the curated traversal, checking that every sentence pays dues, concepts do not repeat without purpose, terminology is stable, source links earn their place and the publication sounds like one human author. Run a repo-wide frequency scan for familiar AI constructions rather than treating each article in isolation.
- [ ] **Step 8: Present Harley's hard author gate.** Keep the PR draft until Harley has read the five complete essays and reviewed the full reading journey. Treat factual, employer-safe, tone, title and authorship notes as load-bearing. Iterate until Harley accepts the publication for merge.
- [ ] **Step 9: Run canonical validation on a staged tree.** Run `py -3 tools/run.py ci --apply`, stage all intended source and generated files, run `git diff --cached --check`, then run `py -3 tools/run.py ci --check`. If Windows Playwright exits without reporting tests, preserve the evidence, diagnose it and rerun the exact layer; never call the full gate green unless one complete canonical run passes.
- [ ] **Step 10: Run completion review.** Use `/handoff-gates` completion-readiness, then `/iterative-review` on the draft PR with selected writing, frontend, accessibility and source-custody lenses. Resolve all important findings, record limitations, make the PR readable and wait for hosted checks on the exact head.
- [ ] **Step 11: Commit and close the roadmap record.** Commit `feat: finish the writing authority publication`. After merge proof, move this plan to `.agents/plans/completed/`, record exact commit, PR, rating and hosted run in the roadmap, then use `/finishing-a-development-branch` for cleanup.
- [ ] **Step 12: Mark Task 5 complete.** Set every remaining plan checklist box to `[x]` before completion handoff. No unchecked plan item may be hidden behind a clean reviewer or CI result.

## Verification summary

Focused implementation checks are named inside each task. The final required evidence is:

```powershell
py -3 tools/run.py ci --apply
git add --all
git diff --cached --check
py -3 tools/run.py ci --check
```

Alongside the canonical gate, retain:

- all five route and index component tests;
- exact roster and metadata validation;
- continuation traversal and negative route checks;
- axe results for six writing surfaces;
- manual 1440, 768, 390, 320 and 200% evidence;
- focused Windows visual baselines;
- source and editorial custody review;
- Sol creative pass/veto records;
- Harley's final author approval; and
- hosted checks on the exact PR head.

## Plan-readiness self-review

**Rating:** 9/10.

The plan fixes the evidence-gated roster, pins the live Graph and inherited skill-TDD sources, names producer-before-consumer tasks, preserves the closed Vibe argument, separates shared presentation from article authorship, defines exact verification and retains Harley's hard author gate. Execution still requires creative judgement, but it does not require inventing a missing product decision. The main residual risk is the amount of long-form editorial iteration, which is controlled through per-article Sol gates and a final whole-publication read rather than premature word-count targets.
