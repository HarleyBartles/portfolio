# React Composition Slice E: Specialist Writing Ownership and Design Standardisation

**Agentic worker sub-skill:** Execute with `/executing-plans`; use `/react`, `/applying-portfolio-visual-language`, `/designing-premium-sites`, `/web-styling`, `/playwright-testing`, and `/verification-before-completion` at the tasks that name them.

## Goal

Refactor the specialist writing articles and figures named by Slice E into locally owned React/styled-components compositions, remove styling that reaches upward into `ContentHeader` or sideways into `ContentProse`, and standardise the visual system by retaining only presentation that earns its place.

The result must feel authored by a respected engineering agency: clear proposition, strong hierarchy, restrained detail, and evidence-led exceptions. This is not a licence to rewrite public facts, flatten distinctive evidence into generic cards, or invent a new site identity.

**Planning baseline:** `5cdf3dcfa3faa1d98d119154203f40727bbfcb63` from `origin/main`, verified 2026-09-06.

## Architecture

- Add a writing-specific header owner, `WritingArticleHeader`, following the successful `ProjectCaseStudyHeader` seam from Slice D.
- Keep route data in `writingPresentations.ts`; add a typed header-layout value there rather than route-name branches in a generic component.
- Keep `WritingArticleShell` responsible for article composition and `ContentProse` responsible for shared prose rhythm.
- Make the specialist body registry lazy so one article route does not load unrelated article implementations or their styled-components code. `ContentPage` owns a neutral Suspense boundary for the selected writing body.
- Move each specialist article or figure's styling beside the component that owns its markup. Delete its Sass file when no selectors remain.
- Prefer named styled components and semantic variants. Do not use generated class names as test contracts.
- A treatment may become canonical only when the same semantic job recurs in at least two materially similar places. Otherwise keep an earned local exception or remove it.
- Preserve semantic content and source assets. Decorative furniture may be removed when it contributes no proposition, hierarchy, evidence, orientation, interaction, or accessibility value.

## Tech Stack

React 19, TypeScript, styled-components, Sass design tokens, Vitest and Testing Library, Playwright, Vite, PowerShell, Python repository tooling, GitHub pull requests.

## Execution Strategy

Use one `gpt-5.6-luna` agent at `high` reasoning for each task packet, in order. Start each task in a fresh context containing:

1. this complete plan;
2. the task packet only;
3. the current `git status --short`;
4. the previous task's return packet.

Do not ask the Luna orchestrator or its Luna workers to rediscover the roadmap or architecture. The Luna orchestrator owns dependency order, dispatches bounded packets, reviews each worker diff, and resolves cross-task design consistency. Every delegated worker uses `gpt-5.6-luna`; no Terra or Sol worker is part of this execution model. Luna workers own bounded, reversible implementation and may make the creative decisions explicitly allowed by each packet.

Task 1 is a mandatory proposal gate, not implementation authority. The Luna orchestrator presents the completed matrix and browser-only before/after evidence to Harley. Task 2 must not start until Harley has accepted the visible actions. Ownership-only `keep-essential` migrations may then proceed; visible `refine-local`, `remove-furniture`, and `promote-canonical` actions may proceed only when their matrix rows carry Harley's acceptance.

After every task, Luna must return exactly:

- files changed;
- decision-record rows changed;
- focused commands run and their results;
- screenshots inspected;
- remaining risks or a literal `none`.

If a focused test fails twice for the same reason, stop changing code, record the exact failure, and return it to the Luna orchestrator. Do not broaden the write set to “fix the suite.”

### Research spike: planning for Luna

The plan applies these findings:

- Smaller agents do better when dense work is split into smaller steps with explicit actions and anticipated branches. Source: OpenAI, “A practical guide to building agents”: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Agent execution should repeatedly consult ground truth, use clear success criteria, and stop at defined checkpoints. Source: Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- Instructions should be short, specific, repository-grounded, and refined around observed failure modes. Source: GitHub, “Optimizing your AI usage”: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
- Luna is intended for cost-sensitive work; therefore this plan reduces inference burden rather than pretending model capability is unchanged. Source: OpenAI model guide: https://platform.openai.com/docs/models
- Vague taste goals should become observable requirements, prohibited behaviours, and tests written before execution. Source: OpenAI Academy, “AI workflow PRD and test case generator”: https://academy.openai.com/public/clubs/champions-ecqup/resources/ai-workflow-prd-and-test-case-generator-2026-07-07
- Rubrics are more reliable when they decompose judgment into individually gradable criteria, while expert review remains the authority for nuanced work. Sources: OpenAI Evals: https://evals.openai.com/ and OpenAI, “How evals drive the next chapter in AI for businesses”: https://openai.com/index/evals-drive-next-chapter-of-ai/
- Generate-then-critique loops work when evaluation criteria are clear and improvement is measurable. Source: Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents

Inference for this repository: positive taste language alone is too easy for a smaller model to rationalise after the fact. Creative autonomy is safest when each claimed value has a falsifier: an observable condition under which the treatment fails to earn its place. Luna chooses within that envelope, records pass/fail evidence, and defaults to restraint when the value claim is falsified.

## Global Constraints

- Work only in the existing linked worktree on branch `codex/react-composition-slice-e-plan`.
- Start execution by fetching and checking whether `origin/main` moved. If it moved, stop and report the drift to Harley; do not silently rebase or recreate the approved plan branch.
- Do not change article facts, claims, dates, links, quotations, continuation destinations, asset files, licences, analytics, contact behaviour, or route inventory.
- Do not redesign `ContentProse`, `EditorialAside`, global typography, navigation, the homepage, or project case studies.
- `UseSuperpowersArticle` already consumes shared prose and aside owners without article SCSS. Treat it as an audited no-op and regression fixture, not an invitation to manufacture a Slice E change.
- Sass variables remain canonical tokens. Do not add raw colours, typefaces, or arbitrary breakpoints where a token exists.
- Preserve direct-route loading, Suspense fallbacks, reduced-motion behaviour, keyboard order, semantic heading order, and media-off readability.
- No generic card grid, dashboard chrome, fake-handmade decoration, dossier styling, or ornamental labels.
- Never preserve a quirk merely because a snapshot contains it. Never change a snapshot merely to make a failing test green.
- Significant new visual direction, public-copy changes, asset custody/licensing changes, or a conflict with the active design policy stops for Harley.
- Luna may propose any creative action in the matrix but may not establish an accepted visual baseline. Harley accepts or rejects every visible `refine-local`, `remove-furniture`, and `promote-canonical` proposal before implementation.
- If Harley accepts a collection of changes that establishes a material new standardisation rule, the Luna orchestrator must append one dated entry to `docs/design-decisions.md` with rationale and a reconsideration trigger before Task 2. A local implementation decision that does not change policy stays in this plan's decision record.
- Use focused checks while iterating. The normal staged commit must run the tracked pre-commit hook as the sole complete local CI gate; do not run `ci --check` immediately before or after that commit.
- Hard ceiling values may not increase: JavaScript 358400 bytes, CSS 40960 bytes, CV PDF 524288 bytes, CV exactly 2 pages. Actual JS/CSS byte counts may move during CSS-to-JS ownership transfer while remaining below those ceilings.
- Check off each completed checkbox in this file before the implementation handoff.

## Creative Director Decision Rule

For every visible object changed by this slice, answer these six questions in the decision record before editing:

1. What creative or evidential job does it perform?
2. Which value falsifier below would prove that job is not being performed?
3. In a direct before/after comparison, did the treatment pass or fail that falsifier?
4. Is the treatment repeated because the job recurs, or only because implementation history happened that way?
5. If special, what does this specific content do to earn the exception?
6. Choose exactly one action: `keep-essential`, `refine-local`, `promote-canonical`, or `remove-furniture`.

### Value falsifiers

Use the first matching claim. A treatment fails when any listed falsifier is observed.

| Claimed value | The claim is falsified when… | Required action after failure |
| --- | --- | --- |
| Orientation | Removing it leaves route, section, sequence, and reading direction equally unambiguous at every target width. | `remove-furniture` |
| Grouping | Proximity, alignment, heading structure, or a containing semantic element already communicates the same group. | `remove-furniture` |
| Hierarchy | It duplicates an existing title/label, competes with the article proposition, or does not alter the first and second scan targets. | `remove-furniture` or `refine-local` |
| Evidence | It carries no data, relationship, provenance, state, sequence, or construction information that the text or asset does not already convey. | `remove-furniture` |
| Comprehension | In a side-by-side comparison, removal does not make the argument harder to explain in one sentence or the sequence harder to reconstruct. | `remove-furniture` |
| Memorability | The same treatment could wrap unrelated portfolio content without changing meaning; it is generic styling rather than content-shaped form. | `remove-furniture` |
| Brand coherence | It introduces card, dashboard, dossier, ornamental-label, or fake-handmade language without an evidence-specific reason. | `remove-furniture` or `refine-local` |
| Earned exception | Its rationale is only “visual interest”, “polish”, “consistency”, or “it was already there”, rather than a property unique to the content. | `remove-furniture`; do not canonicalise |
| Canonical reuse | Candidate uses do not perform the same semantic job, or the abstraction needs route names, positional selectors, or exception props. | Keep separate local owners; do not canonicalise |
| Accessibility | Removal loses an accessible name, meaningful order, contrast, focus visibility, media fallback, or necessary visual grouping. | `keep-essential` or replace with a simpler accessible treatment |

### Falsifier procedure

1. Capture the existing treatment.
2. Temporarily remove or neutralise only that treatment without changing content.
3. Compare both versions at 1440, 768, 390, and 320 CSS pixels; use actual 200% zoom when text or grouping is implicated.
4. Write one observable pass/fail sentence. Example: “FAILS grouping value: the heading and aligned columns still form the group at 320px; the border adds no information.”
5. Apply the required action. If evidence is mixed, choose `refine-local`; if still tied after refinement, remove the ornament.
6. Re-run the relevant semantic/accessibility test after the decision.

Action rules:

- `keep-essential`: retain meaning and hierarchy; implementation ownership may change.
- `refine-local`: improve restraint or legibility without spreading the treatment.
- `promote-canonical`: only for the same semantic job in at least two materially similar places; create one named primitive or variant and migrate all qualifying uses in this slice.
- `remove-furniture`: remove decorative chrome while preserving all semantic content and accessible names.
- If two actions remain equally defensible after inspecting all target widths, choose the less ornamental option.
- Do not resolve uncertainty by adding another wrapper, border, label, shadow, or colour.

## Initial Creative Decision Matrix

These are starting hypotheses, not immutable conclusions. Luna may change an action after rendering the page, but must record the evidence.

| Surface | Treatment | Claimed job | Specific falsifier to run | Starting action |
| --- | --- | --- | --- | --- |
| Shared writing header | title, metadata, précis, rule, visual slot | Establish authored longform hierarchy | The rule or layout fails if removing it leaves the same scan order and section boundary at all widths. | `promote-canonical` composition; test individual furniture |
| Vibe figure | door, threshold, road, chapter numerals, directional rules | Make the responsibility transition spatially legible | Numerals or rules fail if the door-road geometry and DOM order communicate the same sequence without them. | Keep spatial metaphor; test numerals and rules separately |
| ADR figure | Then / Kept / Later stages, central record, connectors | Explain durable decision memory over time | Any frame or connector fails if stage order and persistence remain equally reconstructable without it. | `keep-essential` semantics; test framing separately |
| Provisioning figure | Available / Activated / Working stages, boxes, connectors, shadow | Explain capability progression | Boxes or shadow fail if labels, alignment, and connectors preserve grouping and progression at 320px. | Keep labels/connectors; test boxes and shadow |
| Review graph | captured graph, dark frame, duplicate label | Present source-native evidence | Frame or label fails if the graph retains provenance, boundary, and accessible identity without it. | Keep graph; test frame and duplicate label |
| Context figure | hierarchy boxes, connectors, grid background, shadows | Explain organisational complexity | Grid or shadows fail if hierarchy and reporting relationships remain equally legible without them. | Keep hierarchy/connectors; test grid and shadows |
| Product ownership signal map | lanes, boundary, arrows, labels, enclosing border | Show webhook responsibility flow | Enclosure or label fails if system boundary and event direction remain unambiguous without it. | Keep semantic flow; test enclosure and ornamental labels |
| Rian Hughes figures | wordmarks, datum lines/key, plates, borders | Show typographic construction evidence | Plate or border fails if construction comparison and figure separation remain intact without it. Datum marks fail only if they encode no construction relation. | Keep evidence; test plates and borders independently |
| Shared prose/aside | prose rhythm and disclosure treatment | Maintain reading cadence and optional depth | Out of scope unless a changed child proves a concrete accessibility or ownership defect. | `keep-essential`; do not redesign |

## Task 1: Establish Baseline and Complete the Decision Record

**Skills:** `/executing-plans`, `/applying-portfolio-visual-language`, `/designing-premium-sites`, `/playwright-testing`

**Read-only scope:**

- `.agents/specs/2026-09-03-react-composition-grammar-design.md`
- `.agents/doctrine/portfolio-design-policy.md`
- `docs/design-decisions.md`
- `docs/editorial-drafts/phase-8/phase-8p-visual-language-contract.md`
- `docs/editorial-drafts/phase-8/phase-8p-rhythm-density-decision.md`
- all files named in Tasks 2-7

**Tracked write scope:** this plan file only. Do not edit React, TypeScript, Sass, snapshots, or other tracked implementation files during this task.

**Untracked evidence scope:** browser screenshots in an off-repository temporary directory. Use Playwright-injected CSS or DOM neutralisation for counterfactuals; reload the page after each experiment so no mutation survives into implementation.

- [ ] Run `git fetch origin main codex/react-composition-slice-e-plan --prune`.
- [ ] The execution handoff must provide the exact Harley-reviewed plan commit SHA as environment variable `SLICE_E_APPROVED_PLAN_HEAD`. Do not derive approval from the mutable branch tip.
- [ ] In PowerShell set `$planningBaseline = '5cdf3dcfa3faa1d98d119154203f40727bbfcb63'` and `$approvedPlanHead = $env:SLICE_E_APPROVED_PLAN_HEAD`; if `$approvedPlanHead` is empty, stop and request the reviewed SHA from Harley.
- [ ] Require `git rev-parse origin/main` and `git merge-base HEAD origin/main` to equal `$planningBaseline`, and require both `git rev-parse HEAD` and `git rev-parse origin/codex/react-composition-slice-e-plan` to equal `$approvedPlanHead`. If any comparison fails, stop and report the branch drift to Harley. Branch `HEAD` is expected to be ahead of `main`.
- [ ] Run `npm ci` from `src/client` only if `node_modules` is absent.
- [ ] From `src/client`, run `npm run build`, then start `npm run preview:e2e` in a dedicated terminal. Use `http://127.0.0.1:4174/` as the preview origin.
- [ ] Capture baseline screenshots outside the repository for each target route at 1440, 768, 390, and 320 CSS pixels, plus one actual browser 200% zoom pass at desktop width.
- [ ] Inspect keyboard order, reduced motion, direct-route load, and media-disabled fallback on at least one specialist route; inspect every target route for overflow.
- [ ] For each treatment, use Playwright to inject a temporary `display: none`, `visibility: hidden`, border/background/shadow neutralisation, or DOM attribute change appropriate to the falsifier. Do not save these experiments to tracked source.
- [ ] Run the falsifier procedure for each row. Replace every “starting action” with a recommendation and add one observable pass/fail sentence. Do not write “TBD”, “looks better”, “cleaner”, or another unsupported taste adjective.
- [ ] Add one row for any visible treatment discovered but not listed above.
- [ ] Record a loading-graph baseline from `dist/.vite/manifest.json` and captured JavaScript request URLs for one specialist route and `/writing/why-adrs`; identify which specialist body modules are eager before Task 3.
- [ ] Mark these Luna-owned checkboxes complete; do not commit yet.

**Target routes:**

- `/writing/agentic-engineering-vs-vibe-coding`
- `/writing/why-adrs`
- `/writing/provisioning-is-not-accumulation`
- `/writing/graph-iterative-review`
- `/writing/i-made-agentic-engineering-harder-than-it-needed-to-be`
- `/writing/i-just-write-the-code-is-not-a-full-sentence`
- `/writing/the-right-test-isnt-your-favourite-test`
- `/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists`

### Mandatory Harley decision gate

**Luna orchestrator gate write scope:** `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`, plus `docs/design-decisions.md` only when Harley accepts a material new standardisation rule.

- [ ] The Luna orchestrator presents the completed matrix and paired before/after evidence to Harley.
- [ ] Harley accepts, rejects, or amends every proposed visible `refine-local`, `remove-furniture`, and `promote-canonical` action. The Luna orchestrator records that disposition in the matrix.
- [ ] If the accepted set creates a material standardisation rule, the Luna orchestrator adds a dated `docs/design-decisions.md` entry with rationale and reconsideration trigger; otherwise it records “No ledger change: local implementation decisions only.”
- [ ] The Luna orchestrator commits and pushes the accepted decision record before dispatching Task 2.

**Stop condition:** do not start Task 2 until all four Harley-gate checkboxes are complete.

**Expected result:** every in-scope treatment has a falsifier result and recommendation, and every visible implementation action has explicit Harley disposition before component edits begin.

## Task 2: Create the Writing-Specific Header Owner

**Skills:** `/react`, `/test-driven-development`, `/web-styling`

**Files:**

- Create `src/client/src/features/writing/WritingArticleHeader.tsx`
- Create `src/client/src/features/writing/WritingArticleHeader.test.tsx`
- Modify `src/client/src/features/writing/WritingArticleShell.tsx`
- Modify `src/client/src/features/writing/WritingArticleShell.test.tsx`
- Modify `src/client/src/features/writing/writingPresentations.ts`
- Modify `src/client/src/features/writing/writingPresentations.test.tsx`
- Modify `src/client/src/pages/ContentPage.tsx`
- Modify `src/client/src/pages/ContentPage.test.tsx`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Required interface:**

- Export `WritingArticleHeaderLayout` from `WritingArticleHeader.tsx`.
- Allowed values: `standard`, `vibe-door-road`, `decision-memory`, `capability-read-path`, `review-graph-authority`, `agent-organisation-overhead`.
- `WritingArticleHeader` receives title, summary, metadata, optional visual, region label, visual contract, and layout.
- Existing `writingPresentations.ts` entries supply their specialist non-standard layout. When a writing route has no presentation entry, pass `standard`; do not add dummy presentation-registry entries solely to carry `standard`.
- `ContentPage.tsx` performs no route-name branching; derive the writing header layout generically as `writingPresentation?.layout ?? 'standard'`.

- [ ] Write failing tests for standard/visual headers, semantic order, optional visual omission, and layout marker.
- [ ] Implement the smallest component that passes them using named styled components.
- [ ] Move writing-only header geometry out of generic `ContentHeader` ownership without changing project or generic content consumers.
- [ ] Apply only the Harley-accepted header decisions. Remove decorative rules or modifiers only when the accepted record classifies them `remove-furniture`.
- [ ] Update affected `ContentPage` tests to assert semantic roles or stable `data-*` contracts, not styling classes.
- [ ] Run `npm test -- --run src/features/writing/WritingArticleHeader.test.tsx src/features/writing/WritingArticleShell.test.tsx src/features/writing/writingPresentations.test.tsx src/pages/ContentPage.test.tsx`.
- [ ] Run `py -3 tools/run.py mesh --apply` from the repository root and inspect the generated index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** specialist writing headers have one explicit React owner and no route-specific selector needs to reach into a generic header.

## Task 3: Add the Specialist Writing-Body Lazy Boundary

**Skills:** `/react`, `/test-driven-development`, `/playwright-testing`

**Files:**

- Modify `src/client/src/features/writing/writingArticleBodies.ts`
- Create `src/client/src/features/writing/writingArticleBodies.test.ts`
- Create `src/client/src/features/writing/WritingArticleBodyLoading.tsx`
- Create `src/client/src/features/writing/WritingArticleBodyLoading.test.tsx`
- Modify `src/client/src/pages/ContentPage.tsx`
- Modify `src/client/src/pages/ContentPage.test.tsx`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Required interface:**

- Export `WritingArticleBodyProps` and a `WritingArticleBody` lazy-component type from `writingArticleBodies.ts`.
- Replace each static specialist-body import with a dedicated `lazy(async () => ({ default: ... }))` entry. Do not place all bodies behind one shared dynamic import.
- `getWritingArticleBody(slug)` returns the selected lazy component or `undefined`.
- `ContentPage` wraps only the selected specialist body in `Suspense` with `WritingArticleBodyLoading`; ordinary `ContentProse` and project presentations keep their current paths.
- `WritingArticleBodyLoading` exposes one neutral status named “Loading article” and reserves a stable reading-body measure without card or skeleton furniture.
- `UseSuperpowersArticle.tsx` remains unchanged; only its registry entry becomes lazy.

- [ ] Write failing registry tests proving each known slug resolves to a React lazy component and unknown slugs return `undefined`. Leave cross-route loading proof to the production request-graph check in Task 8.
- [ ] Write a failing `ContentPage` test proving a pending specialist body shows the neutral body fallback while the already-resolved article header remains present.
- [ ] Implement one lazy import per specialist body and the narrow Suspense boundary.
- [ ] Run `rg -n "^import .*Article" src/client/src/features/writing/writingArticleBodies.ts`; expected result: no static specialist-article imports.
- [ ] Verify the fallback disappears when the selected body resolves and does not replace the whole route with `ContentLoadingState`.
- [ ] Run `npm test -- --run src/features/writing/writingArticleBodies.test.ts src/features/writing/WritingArticleBodyLoading.test.tsx src/pages/ContentPage.test.tsx`.
- [ ] Run `npm run build`; inspect `dist/.vite/manifest.json` and record the generated specialist-body chunks in the Task 1 loading-graph record.
- [ ] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** a direct writing route loads only its selected specialist body, behind a neutral route-local fallback, without changing `UseSuperpowersArticle` internally.

## Task 4: Localise Specialist Article Bodies and Inline Evidence

**Skills:** `/react`, `/test-driven-development`, `/web-styling`, `/designing-premium-sites`

**Files:**

- Modify `src/client/src/features/writing/ProductOwnershipArticle.tsx`
- Modify `src/client/src/features/writing/ProductOwnershipArticle.test.tsx`
- Delete `src/client/src/features/writing/ProductOwnershipArticle.scss` when empty
- Modify `src/client/src/features/writing/TestingEvidenceArticle.tsx`
- Modify `src/client/src/features/writing/TestingEvidenceArticle.test.tsx`
- Modify `src/client/src/features/writing/ContextComplexityArticle.tsx`
- Modify `src/client/src/features/writing/ContextComplexityArticle.test.tsx`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Decision envelope:**

- Product signal-map lanes, arrows, and labels carry evidence and must remain understandable.
- Enclosing frames, repeated captions, shadows, and ornamental eyebrow labels may be refined or removed according to the record.
- `TestingEvidenceArticle` and `ContextComplexityArticle` are audit/no-op candidates: each currently composes canonical `ContentProse` and `EditorialAside` with an apparently inert outer class. Do not replace an inert `div` with an empty styled component.
- Article copy and shared `ContentProse` / `EditorialAside` behaviour are protected.

- [ ] Run `rg -n "testing-evidence-article|context-complexity-article" src/client/src src/client/e2e` and record every consumer before editing.
- [ ] Add or strengthen tests for article semantics, fallback-to-whole-markdown behaviour, and aside order before changing implementation.
- [ ] For `ProductOwnershipArticle`, replace selectors with locally named styled components because the signal map has a real visual contract.
- [ ] If the audit confirms the Testing Evidence and Context Complexity outer classes have no consumer, remove the dead class hooks and use a fragment or the simplest semantic HTML that preserves source order. If a consumer exists, stop and report it to the Luna orchestrator; do not manufacture a styled owner.
- [ ] Apply each Harley-accepted keep/refine/remove decision; preserve screen-reader reading order.
- [ ] Remove the Product Ownership Sass import and delete the file only after `rg` proves no selectors remain.
- [ ] Run `npm test -- --run src/features/writing/ProductOwnershipArticle.test.tsx src/features/writing/TestingEvidenceArticle.test.tsx src/features/writing/ContextComplexityArticle.test.tsx`.
- [ ] Run `rg -n "ProductOwnershipArticle\\.scss|product-ownership" src/client/src` and explain every remaining match in the return packet.
- [ ] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** Product Ownership owns its genuine signal-map composition; Testing Evidence and Context Complexity retain no inert wrapper or empty styling abstraction.

## Task 5: Localise the Three Sequential Header Figures

**Skills:** `/react`, `/test-driven-development`, `/web-styling`, `/applying-portfolio-visual-language`

**Files:**

- Modify `src/client/src/features/writing/VibeCodingFigure.tsx`
- Modify `src/client/src/features/writing/VibeCodingFigure.test.tsx`
- Delete `src/client/src/features/writing/VibeCodingFigure.scss`
- Modify `src/client/src/features/writing/WhyAdrsFigure.tsx`
- Modify `src/client/src/features/writing/WhyAdrsFigure.test.tsx`
- Delete `src/client/src/features/writing/WhyAdrsFigure.scss`
- Modify `src/client/src/features/writing/ProvisioningFigure.tsx`
- Create `src/client/src/features/writing/ProvisioningFigure.test.tsx`
- Delete `src/client/src/features/writing/ProvisioningFigure.scss`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Decision envelope:**

- Sequence, direction, stage names, and accessible descriptions are protected.
- Chapter numbers, extra rules, enclosing boxes, and shadows may be removed when the decision record says they do not improve comprehension or memorability.
- Do not collapse three distinct arguments into one generic “steps” component.
- Promote only a truly shared low-level treatment such as a semantic connector or stage label, and only if at least two figures use it for the same job.

- [ ] Add failing structural/accessibility tests, including a new Provisioning figure test.
- [ ] Move each figure's styles into its component.
- [ ] Delete every selector targeting `.content-page-header`, its heading, intro, or visual descendants.
- [ ] Pass header geometry through the typed layout in Task 2.
- [ ] Apply Harley-accepted creative decisions one figure at a time and compare against its baseline at all four widths.
- [ ] Run `npm test -- --run src/features/writing/VibeCodingFigure.test.tsx src/features/writing/WhyAdrsFigure.test.tsx src/features/writing/ProvisioningFigure.test.tsx`.
- [ ] Run `rg -n "content-page-header|VibeCodingFigure\\.scss|WhyAdrsFigure\\.scss|ProvisioningFigure\\.scss" src/client/src/features/writing`; expected result: no deleted imports or upward header selectors.
- [ ] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** each sequential figure keeps its argument, loses accidental chrome, and owns all local styling.

## Task 6: Localise the Artifact and Organisation Figures

**Skills:** `/react`, `/test-driven-development`, `/web-styling`, `/applying-portfolio-visual-language`

**Files:**

- Modify `src/client/src/features/writing/ReviewGraphFigure.tsx`
- Modify `src/client/src/features/writing/ReviewGraphFigure.test.tsx`
- Delete `src/client/src/features/writing/ReviewGraphFigure.scss`
- Modify `src/client/src/features/writing/ContextComplexityFigure.tsx`
- Modify `src/client/src/features/writing/ContextComplexityFigure.test.tsx`
- Delete `src/client/src/features/writing/ContextComplexityFigure.scss`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Decision envelope:**

- The review graph remains source-native evidence; do not redraw or beautify its data.
- Organisational hierarchy, labels, and connectors remain legible at 320px.
- Duplicate labels, ornamental frames, grid-paper backgrounds, and shadows are removable candidates.
- A local figure may remain exceptional where its evidence type genuinely differs; exception is not permission for decorative excess.

- [ ] Add failing tests that protect accessible names, semantic labels, and missing-media fallback.
- [ ] Move local styles into the owning components and remove upward selectors.
- [ ] Apply Harley-accepted creative decisions, checking that removal does not erase grouping or hierarchy.
- [ ] Compare each route at 1440, 768, 390, and 320 widths and at actual 200% zoom.
- [ ] Run `npm test -- --run src/features/writing/ReviewGraphFigure.test.tsx src/features/writing/ContextComplexityFigure.test.tsx`.
- [ ] Run `rg -n "content-page-header|ReviewGraphFigure\\.scss|ContextComplexityFigure\\.scss" src/client/src/features/writing`; expected result: no deleted imports or upward header selectors.
- [ ] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** artifact and hierarchy evidence remain credible while redundant display framing is gone.

## Task 7: Localise the Rian Hughes Typographic Study

**Skills:** `/react`, `/test-driven-development`, `/web-styling`, `/applying-portfolio-typography`

**Files:**

- Modify `src/client/src/features/writing/RianHughesArticle.tsx`
- Modify `src/client/src/features/writing/RianHughesArticle.test.tsx`
- Modify `src/client/src/features/writing/RianHughesArticleFigures.tsx`
- Delete `src/client/src/features/writing/RianHughesArticle.scss`
- Modify `src/client/src/features/writing/INDEX.md` only through mesh generation
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`

**Decision envelope:**

- Preserve the final article header, précis, body hierarchy, figure order, captions, accessible names, and authored wordmark evidence.
- Datum lines and keys stay when they explain construction.
- Plates, borders, background fields, and the Patch cameo frame remain local only when the content earns them; otherwise remove the furniture, not the evidence.
- Do not generalise the typographic-study treatment to other articles.

- [ ] Add or strengthen tests for final header/précis/body hierarchy, figure order, fallback, and accessible labels.
- [ ] Co-locate body and figure styles with their owners without changing public prose.
- [ ] Apply the Harley-accepted creative decisions and inspect every wordmark at 1440, 768, 390, and 320 widths.
- [ ] Delete the Sass file only after `rg -n "RianHughesArticle\\.scss|rian-hughes" src/client/src` shows no obsolete import or orphan selector.
- [ ] Run `npm test -- --run src/features/writing/RianHughesArticle.test.tsx`.
- [ ] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [ ] Mark the task complete in this plan.

**Expected result:** the typographic study remains a justified special exception with locally owned styling and unchanged editorial hierarchy.

## Task 8: Integrate, Prove, and Publish the Implementation

**Skills:** `/playwright-testing`, `/verification-before-completion`, `/publishing-source`, `/handoff-gates`

**Files:**

- Modify `src/client/e2e/writing-navigation.spec.ts`
- Modify `src/client/e2e/visual-regression.spec.ts`
- Modify `src/client/e2e/accessibility.spec.ts`
- Update intentional snapshots under `src/client/e2e/*-snapshots/` only for Harley-accepted visible changes and only after visual review
- Modify `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`
- Modify generated indexes only through `py -3 tools/run.py mesh --apply`

- [ ] Replace obsolete class selectors in browser tests with roles, text, or stable semantic `data-*` hooks.
- [ ] Add all Slice E routes to focused navigation, overflow, keyboard, reduced-motion, direct-route, and media-off coverage where the existing suites provide those contracts.
- [ ] Add production request-graph coverage in `writing-navigation.spec.ts`: capture JavaScript request URLs while directly opening `/writing/i-just-write-the-code-is-not-a-full-sentence`; require the Product Ownership body chunk and reject Testing Evidence, Context Complexity, Rian Hughes, and Use Superpowers body chunks.
- [ ] In the same spec, directly open `/writing/why-adrs`; reject all five specialist body chunks. Resolve chunk names from the built Vite manifest or stable emitted module-name fragments rather than hard-coding hashes.
- [ ] Compare those request sets with Task 1's baseline and record the before/after result in the plan.
- [ ] Run `npm test -- --run`; expected result: all Vitest tests pass.
- [ ] From `src/client`, run `npm run test:e2e -- e2e/writing-navigation.spec.ts e2e/accessibility.spec.ts e2e/visual-regression.spec.ts`; the specs must exercise 1440, 768, 390, and 320 widths for the changed writing routes.
- [ ] Perform one actual browser 200% zoom pass; CSS viewport emulation alone does not satisfy this checkbox.
- [ ] Run `npm run test:e2e:visual` twice without snapshot updates. Only if a Harley-accepted decision changes a protected image, run `npm run test:e2e:visual -- --update-snapshots` once, inspect the image diff against that accepted matrix row, then run `npm run test:e2e:visual` twice without updates.
- [ ] Run `npm run build`; expected result: successful Vite production build.
- [ ] Record actual before/after entry JavaScript and CSS byte counts. The ceiling values remain unchanged at 358400 JavaScript bytes and 40960 CSS bytes; final byte counts may move between JS and CSS but must remain at or below both ceilings. Explain the transfer rather than treating any byte increase as automatic failure.
- [ ] Run `py -3 tools/run.py mesh --apply`, then `py -3 tools/run.py mesh --check`; expected result: check exits zero.
- [ ] Run `git diff --check`; expected result: no whitespace errors.
- [ ] Review `git diff --stat`, `git diff --name-status`, and `git status --short` for scope.
- [ ] Mark all completed task checkboxes `[x]`, stage the intended tree, and commit normally so the tracked pre-commit hook runs the single complete `ci --check` gate.
- [ ] Record the commit SHA and hook result in the PR body. Do not rerun full CI immediately after a successful hooked commit.
- [ ] Push with upstream tracking and update the existing draft PR. Keep base `main` and draft state.
- [ ] Verify remote head SHA, base branch, draft state, and hosted checks before handing back to Harley.

**Expected result:** Slice E is implementation-complete, visually reviewed, within budgets, and remains in a draft PR for human review.

## Plan Acceptance Tests

Before execution begins, Harley should be able to answer yes to all of these:

- [ ] Can Luna begin Task 1 within ten minutes without rediscovering scope?
- [ ] Does every task have an exact write set and focused validation command?
- [ ] Are creative choices bounded without being pre-decided?
- [ ] Can Luna independently identify and propose removal of valueless furniture, with Harley accepting visible baseline changes once at the Task 1 gate rather than through repeated implementation interruptions?
- [ ] Are public facts, assets, site-wide identity, and high-risk taste decisions still protected?
- [ ] Does each special treatment have to earn either local exception or canonical promotion?
- [ ] Does every task return enough evidence for the Luna orchestrator to catch drift before the next task?
- [ ] Is full CI run once through the normal commit hook rather than duplicated?

## Execution Handoff

After plan approval, invoke `/executing-plans` with a `gpt-5.6-luna` orchestrator at `high` reasoning. Supply the exact reviewed PR head SHA as `SLICE_E_APPROVED_PLAN_HEAD`; the worker must not infer approval from the current remote branch tip. Execute Task 1, stop at the mandatory Harley decision gate, then execute Tasks 2-8 sequentially after acceptance. If the orchestrator delegates, every worker is also `gpt-5.6-luna` at `high` reasoning; workers return packets to Luna, and Luna reviews each packet and diff before dispatching the next one. Stop for Harley at the explicit Global Constraints gates or when the retry threshold is reached.