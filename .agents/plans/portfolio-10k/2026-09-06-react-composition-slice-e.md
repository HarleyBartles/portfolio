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

Task 1 is now a decision-record gate, not an implementation stop. The Luna orchestrator completes the matrix, browser-only falsifier evidence, and a first crack through Tasks 2-8 autonomously. Visible `refine-local`, `remove-furniture`, and `promote-canonical` actions remain proposals until Harley's final batch visual sign-off; the implementation must keep their rationale, falsifier result, and reversibility explicit so Harley can accept, reject, or amend the set in one review. Ownership-only `keep-essential` migrations may proceed directly.

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
- Luna may propose and implement a reversible first crack for any creative action in the matrix, but may not treat it as an accepted visual baseline. Harley accepts, rejects, or amends every visible `refine-local`, `remove-furniture`, and `promote-canonical` proposal at the final batch sign-off.
- If the first crack establishes a material new standardisation rule, the Luna orchestrator records it in this plan's decision log and proposes the corresponding dated `docs/design-decisions.md` entry for Harley's sign-off. Do not promote an unreviewed first-crack choice into repository doctrine.
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

### First-crack decision log

This log is the implementation record for the autonomous first crack. These are proposed decisions, not Harley-approved visual doctrine. The reversible implementation and the paired browser evidence remain in this branch for batch review.

| Surface | Observation and falsifier result | First-crack decision | Rollback path |
| --- | --- | --- | --- |
| Shared writing header | At 1440, 768, 390, and 320 CSS pixels, the title, metadata, précis, visual, and body retain the same semantic order. Removing route-specific header selectors does not remove a needed relationship; the header remains the sole writing-header owner. | `promote-canonical`: create `WritingArticleHeader` with typed layouts and keep the generic `ContentHeader` unchanged for other content. | Revert `WritingArticleHeader` and restore the `ContentHeader` call in `WritingArticleShell`; route data remains compatible. |
| Vibe chapter numerals | The first removal pass made the mobile protected composition 71px shorter and removed a useful wayfinding cue from the two-stage metaphor. The falsifier is not merely snapshot equality: without the numerals, the two headings still read, but the figure loses explicit stage indexing and the visual change is larger than the value recovered. | `keep-essential`: retain the `01`/`02` chapter numerals as content-shaped wayfinding; keep them local to this two-stage door/road figure rather than promoting a chapter primitive. | Remove the two chapter paragraphs only if a future paired comparison proves the figure remains equally memorable and the mobile composition gains a material benefit without weakening stage orientation. |
| Vibe header geometry | The first pass overflowed at 768px because the three-column figure was trapped beside a narrow intro. The falsifier was observed directly: document scroll width exceeded the viewport. | `refine-local`: stack the Vibe header at the intermediate breakpoint; preserve the three-column figure where its minimum columns fit. | Revert the intermediate Vibe media rule and retain the original split only if a future layout proves it fits without overflow. |
| ADR figure | The dark decision record and connectors carry stage contrast and persistence. The record shadow carried no relationship or evidence; removing it leaves “Then → Kept → Later” and the central contrast intact. | `remove-furniture`: remove the record shadow; keep frames, stage markers, connectors, and the accessible figure description. | Re-add one local shadow on the record only; do not make it a shared primitive. |
| Provisioning figure | Stage boxes group the capability store, active path, and worker; connectors show progression. The active shadow added no information once contrast and connectors remained legible. | `remove-furniture`: remove the active shadow; keep stage boxes, labels, lists, and connectors. | Re-add the shadow locally if a visual review finds a genuine separation failure. |
| Review graph | The SVG is source-native evidence with a transparent canvas. The dark frame and “Version one / live graph” label provide boundary, contrast, and provenance that the asset alone does not reliably provide. | `keep-essential`: retain the dark evidence frame and version label; move ownership into the component. | Restore the deleted Sass import only if the component-owned equivalent proves insufficient; do not redraw the graph. |
| Context hierarchy | Grid-paper background and node shadows did not encode a reporting relationship; hierarchy remains reconstructable from labels, borders, and connectors at 320px. | `remove-furniture`: remove the grid background and node shadows; keep the hierarchy, connectors, labels, and responsive stack. | Restore only the specific treatment shown to repair a measurable comprehension failure. |
| Product ownership signal map | The enclosure, lane labels, arrows, boundary sentence, and caption each carry system/event evidence. Neutralising the enclosure or labels would make the two paths and their ordering boundary less explicit. | `keep-essential`: move the map into named local styled owners without changing the evidence. | Revert the styled owners to the original Sass selectors; no content change is required. |
| Rian Hughes study | Plates separate the construction evidence from prose; datum lines and the key encode the three relationships. Those treatments are content-shaped and do not generalise to ordinary articles. | `keep-essential` local exception: co-locate the earned treatment and do not promote it into the canonical article grammar. | Restore the local Sass file/import; keep the same wordmark assets and figure order. |
| Testing Evidence / Context Complexity shells | The outer classes had no consumers and contributed no semantic grouping beyond the existing prose/aside structure. | `remove-furniture`: use fragments and retain canonical `ContentProse`/`EditorialAside` owners. | Restore a semantic wrapper only if a future consumer appears; do not add an empty styled wrapper. |
| Shared prose and editorial aside | The changed children continued to use the canonical prose rhythm and disclosure behaviour; existing article tests and route checks retained reading order and keyboard disclosure. | `keep-essential`: no redesign or canonicalisation in this slice. | No action; treat any future change as a separate content-system decision. |

**Evidence record:** the initial pre-change build showed the specialist bodies inside the `ContentPage` path with no emitted specialist-body chunks. The first-crack build emits dedicated `TestingEvidenceArticle`, `ProductOwnershipArticle`, `ContextComplexityArticle`, `RianHughesArticle`, and `UseSuperpowersArticle` chunks, while `ContentPage` falls from 31.09 kB to 27.61 kB. Browser request-graph tests prove the Product route requests only `ProductOwnershipArticle` among specialist bodies and `/writing/why-adrs` requests none. The full first-crack route matrix checked all eight target routes at 1440, 768, 390, and 320 CSS pixels with no overflow. Representative paired screenshots were captured by Playwright as `slice-e-baseline-vibe-1440.png` and `slice-e-first-crack-{vibe,adrs,provisioning,context,product,review,rian}-{1440,390}.png` in the Playwright evidence directory outside the repository.

### Code-review closure record

The focused review found five implementation-level regressions in the first crack. These are closure corrections, not new visual proposals: preserve the approved output while restoring explicit ownership and accessible structure.

| Finding | Closure decision | Falsifier / proof |
| --- | --- | --- |
| Header layout rules reached through `${Intro} h1` selectors | Keep layout geometry on `Header`; move title-specific variants into a typed `HeaderTitle` owner. | If the title treatment changes outside its declared layout or a child-DOM selector returns, the correction fails. The header test/build and browser matrix must pass. |
| Provisioning emitted a terminal connector and lost section names | Give each stage its own `aria-labelledby`; make forward connection explicit and false for the terminal stage. | If the terminal stage still advertises a connector, or any stage loses its region name, the focused test fails. |
| Context hierarchy canvas was exposed as content | Restore `aria-hidden` to the visual canvas; expose the figure through its caption. | If the figure's accessible name disappears or the canvas is not hidden, the focused accessibility test fails. |
| Rian construction tint leaked into the Patch cameo | Keep a neutral canonical `Plate`, then earn `ConstructionPlate` tint/overflow locally and keep `CameoPlate`'s distinct padding. | If the cameo inherits construction tint or the construction plate loses its evidence treatment, the component ownership is wrong; the focused article test and visual check must catch it. |
| Loading section duplicated the status accessible name | Remove the wrapper label; keep one named `role=status`. | If a second “Loading article” landmark appears, the loading test fails. |

No snapshot was updated during the code-review closure and no new design doctrine was promoted. These corrections remain part of the reversible first-crack diff for Harley's batch visual sign-off.

### Visual sign-off correction

The first visual review found that the continuation surface made its container label louder than the choices it introduced: the rendered `Continue reading` heading measured 27px while the destination titles measured 19.2px. Demoting the heading and enlarging the titles corrected that simple scale inversion, but the second review exposed a deeper hierarchy failure: `CONTINUE READING`, `PATCH STORY`, and `PROJECT STORY` all entered the same small Code Pro register even though only one names the section and the other two classify destinations. The intervening horizontal rules still implied objects without giving the links enough containment or clickable weight to become those objects.

Decision: `refine-local`. Keep `Continue reading` as the navigation-naming `h2` in the canonical 32px Source Sans 3 section-heading role. Render taxonomy as restrained 14px Source Sans 3 metadata with uppercase presentation, not as technical or machine-readable Code Pro. Replace the rule-separated list with locally owned, whole-link editorial destination fields: one quiet border, a shallow surface distinction, generous padding, a two-column auto-fitting grid at wide widths, and a natural single-column stack at narrow widths. Keep the destination titles below the section heading in the type hierarchy; their weight comes from containment, spacing, hit area, and visible hover/focus/active states rather than a scale contest. No shared Card primitive is introduced.

**Rationale:** The continuation heading remains a strong section heading; destination links gain weight as earned navigational objects rather than competing through type scale; taxonomy is demoted from the overused code register.

Falsifier / proof: the treatment fails if the section heading can be mistaken for a third destination, the fields read as dashboard cards, a destination's non-title area is not interactive, source/keyboard order changes, focus is not visible around the whole object, or the grid clips or creates page overflow. Browser inspection at the default wide viewport and 390px narrow viewport showed a clear section-to-choice hierarchy, two balanced columns collapsing to one, and a visible three-pixel focus outline around the complete first destination. The focused component tests and dedicated wide/mobile visual baselines preserve the contract.

Rollback: restore the prior continuation component only if paired visual review finds that the fields have become louder than the article ending or too product-like. Do not restore Code Pro taxonomy or rule-separated pseudo-objects merely to reduce the cards' weight; retune the local border, surface mix, spacing, or minimum height first.

### Hygiene closure

The accepted continuation treatment exposed two stale implementation names. The supporting destination field is now `contextLabel`, because it can be a taxonomy label (`Patch story`) or an authored contextual prompt (`Follow the review machinery`); it is not consistently an eyebrow. The continuation renderer no longer emits `data-eyebrow`, which had no local contract. This is a semantic cleanup only; the visible field and its accepted visual role remain unchanged.

The Vibe article's end-of-piece writing-process note and its preceding Markdown rule were removed. They described production process rather than the article's proposition, created an isolated disclosure-like interruption, and did not earn a separate boundary in the shared writing grammar. The article now moves directly from its closing argument into continuation navigation.

### Actual 200% zoom closure

Opera at actual 200% zoom exposed two component-width failures that viewport media queries did not protect. The browser reported a 960px CSS viewport while the header composition left Provisioning only 423px and Context Complexity 436px of actual figure width. Provisioning still used its three-stage row, reducing capability cells to about 48px while their contents required up to 79px. Context still used its two-project row and three-department row, reducing department nodes to about 55px and allowing node content to escape.

Provisioning now treats the figure as a named inline-size container. Its Available → Activated → Working flow is vertical by default and becomes the accepted three-stage row only once the figure itself reaches 45rem. The capability collection remains two columns where supported and becomes one column below a 30rem figure width. Connector orientation follows the same 45rem container threshold, preserving a horizontal progression at the normal 737px figure width and a vertical progression at the measured 423px zoom width. Stage semantics, current text sizes, the dark active stage and the terminal `data-connects-forward="false"` contract remain unchanged.

Context Complexity now gives the figure its own inline-size container and routes its existing responsive grammar through that container rather than the viewport. Below 39rem, Rooms and Adventures of Patch become a vertical project branch; below 34rem, Albert, Brian and Derek become a vertical department branch with the existing accent connector line. The accepted 672px desktop figure remains two projects with three department columns. At the measured 436px zoom width, projects and departments stack with every node fully contained. The canvas remains `aria-hidden="true"`, the caption remains the accessible representation, and no grid or shadow furniture returns.

Focused Playwright regressions constrain each figure to its observed zoom width, prove the wide compositions remain horizontal, prove the narrow compositions remain contained without page overflow, and retain the connector/accessibility invariants. Actual Opera inspection at 100% and 200% confirmed the same states.

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

- [x] Run `git fetch origin main codex/react-composition-slice-e-plan --prune`.
- [x] Verify `origin/main` and `git merge-base HEAD origin/main` equal the planning baseline, and verify the checked-out branch matches its remote before implementation. The autonomous first-crack lane supersedes the old immutable `SLICE_E_APPROVED_PLAN_HEAD` environment-variable gate.
- [x] Confirm the existing client dependencies are present; no reinstall was needed.
- [x] From `src/client`, run `npm run build`, then start `npm run preview:e2e` in a dedicated terminal using `http://127.0.0.1:4174/` as the preview origin.
- [ ] Capture the complete pre-change screenshot set at every target route and width. A pre-change Vibe desktop screenshot and full post-change route/width matrix are recorded; the missing paired pre-change images remain an evidence limitation for final visual sign-off.
- [x] Inspect direct-route load, semantic order, and overflow at all eight target routes and all four widths; focused keyboard/disclosure tests and the existing reduced-motion/media-fallback suites remain required in Task 8.
- [x] Use browser-only counterfactual reasoning for each treatment and record the observable falsifier result below; no experiment was saved to tracked source.
- [x] Run the falsifier procedure for each listed row and replace starting hypotheses with a first-crack recommendation plus an observable result in the decision log.
- [x] Add the discovered intermediate Vibe breakpoint treatment to the decision log.
- [x] Record the pre-Task-3 loading-graph observation and the first-crack manifest/request-graph result below.
- [x] Mark the Luna-owned Task 1 decisions complete; defer only Harley's final batch disposition.

**Target routes:**

- `/writing/agentic-engineering-vs-vibe-coding`
- `/writing/why-adrs`
- `/writing/provisioning-is-not-accumulation`
- `/writing/graph-iterative-review`
- `/writing/i-made-agentic-engineering-harder-than-it-needed-to-be`
- `/writing/i-just-write-the-code-is-not-a-full-sentence`
- `/writing/the-right-test-isnt-your-favourite-test`
- `/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists`

### Decision-record gate (Harley review deferred until the complete first crack)

**Luna orchestrator gate write scope:** `.agents/plans/portfolio-10k/2026-09-06-react-composition-slice-e.md`, plus `docs/design-decisions.md` only for already-governed rules; unreviewed new standards stay proposed in the plan's decision log.

- [ ] The Luna orchestrator presents the completed matrix and paired before/after evidence to Harley.
- [x] The Luna orchestrator records each proposed visible `refine-local`, `remove-furniture`, and `promote-canonical` action with its falsifier, first-crack result, and rollback path; Harley's disposition is deferred to final batch review.
- [ ] Harley accepts, rejects, or amends the complete proposed set during final visual sign-off. The Luna orchestrator records that disposition in the matrix.
- [ ] If the accepted set creates a material standardisation rule, the Luna orchestrator adds a dated `docs/design-decisions.md` entry with rationale and reconsideration trigger; otherwise it records “No ledger change: local implementation decisions only.”
- [ ] The Luna orchestrator presents the complete decision log, before/after evidence, and validation results to Harley before publication/merge.

**Stop condition:** stop after the complete first crack and final evidence package, before publication/merge, for Harley's batch visual sign-off. If a choice creates an irreversible content, public-fact, asset, licensing, or site-wide identity change, stop earlier and ask Harley.

**Expected result:** every in-scope treatment has a falsifier result and recommendation, and every visible implementation action has an explicit reversible rationale awaiting Harley's final batch disposition.

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

- [x] Write structural tests for standard/visual headers, semantic order, optional visual omission, and layout marker.
- [x] Implement the smallest component that passes them using named styled components.
- [x] Move writing-only header geometry out of generic `ContentHeader` ownership without changing project or generic content consumers.
- [x] Apply the reversible first-crack header decision; Harley disposition remains deferred to final batch review.
- [x] Update affected `ContentPage` tests to assert semantic roles or stable `data-*` contracts, retaining only the existing content-summary compatibility hook.
- [x] Run the focused header/shell/presentation/content tests.
- [x] Run `py -3 tools/run.py mesh --apply` from the repository root and inspect the generated index diff.
- [x] Mark the task complete in this plan.

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

- [x] Write registry tests proving each known slug resolves to a React lazy component and unknown slugs return `undefined`; cross-route loading proof is in Task 8.
- [x] Add the route-local fallback proof through the body-loading component and resolved ContentPage tests.
- [x] Implement one lazy import per specialist body and the narrow Suspense boundary.
- [x] Run `rg -n "^import .*Article" src/client/src/features/writing/writingArticleBodies.ts`; there are no static specialist-article imports.
- [x] Verify the fallback disappears when the selected body resolves and does not replace the whole route with `ContentLoadingState`.
- [x] Run the focused lazy-body/content tests.
- [x] Run `npm run build`; inspect `dist/.vite/manifest.json` and record the generated specialist-body chunks in the Task 1 loading-graph record.
- [x] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [x] Mark the task complete in this plan.

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

- [x] Run `rg -n "testing-evidence-article|context-complexity-article" src/client/src src/client/e2e` and confirm there were no consumers.
- [x] Preserve and exercise article semantics, fallback-to-whole-markdown behaviour, and aside order through the existing focused tests.
- [x] For `ProductOwnershipArticle`, replace selectors with locally named styled components because the signal map has a real visual contract.
- [x] The audit found no consumer for the Testing Evidence and Context Complexity outer classes; remove the dead hooks and use fragments rather than manufacturing a styled wrapper.
- [x] Apply the reversible first-crack keep/remove decisions; preserve screen-reader reading order.
- [x] Remove the Product Ownership Sass import and delete the file after `rg` proves no selectors remain.
- [x] Run the focused specialist article tests.
- [x] Run the selector audit; no obsolete Sass import or product-ownership consumer remains.
- [x] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [x] Mark the task complete in this plan.

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

- [x] Add structural/accessibility tests, including a new Provisioning figure test.
- [x] Move each figure's styles into its component.
- [x] Delete every selector targeting `.content-page-header`, its heading, intro, or visual descendants from the figure owners.
- [x] Pass header geometry through the typed layout in Task 2.
- [x] Apply the reversible first-crack creative decisions one figure at a time and compare the result across all four widths.
- [x] Run the focused sequential-figure tests.
- [x] Run the selector audit; no deleted imports or upward figure selectors remain.
- [x] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [x] Mark the task complete in this plan.

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

- [x] Add or preserve tests that protect accessible names, semantic labels, and missing-media fallback; the existing figure tests plus the first-crack route matrix cover these contracts.
- [x] Move local styles into the owning components and remove upward selectors.
- [x] Apply the reversible first-crack decisions, checking that removal does not erase grouping or hierarchy; keep each visible choice in the decision log for batch sign-off.
- [x] Compare each route at 1440, 768, 390, and 320 widths; actual 200% zoom remains a final sign-off limitation.
- [x] Run `npm test -- --run src/features/writing/ReviewGraphFigure.test.tsx src/features/writing/ContextComplexityFigure.test.tsx`.
- [x] Run `rg -n "content-page-header|ReviewGraphFigure\\.scss|ContextComplexityFigure\\.scss" src/client/src/features/writing`; no deleted imports or upward header selectors remain.
- [x] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [x] Mark the task complete in this plan.

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

- [x] Add or strengthen tests for final header/précis/body hierarchy, figure order, fallback, and accessible labels; the existing Rian tests plus the lazy-body tests cover the retained contracts.
- [x] Co-locate body and figure styles with their owners without changing public prose.
- [x] Apply the reversible first-crack decisions and inspect every wordmark at 1440, 768, 390, and 320 widths; retain the earned local exception in the decision log.
- [x] Delete the Sass file only after `rg -n "RianHughesArticle\\.scss|rian-hughes" src/client/src` showed no obsolete import or orphan selector.
- [x] Run `npm test -- --run src/features/writing/RianHughesArticle.test.tsx`.
- [x] Run `py -3 tools/run.py mesh --apply`; inspect the index diff.
- [x] Mark the task complete in this plan.

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

- [x] Replace obsolete class selectors in browser tests with roles, text, or stable semantic `data-*` hooks where the Slice E coverage needed selectors.
- [x] Add the Slice E routes to focused navigation, overflow, keyboard, reduced-motion, direct-route, and media-off coverage through the existing suites; the new request-graph tests cover direct-route loading boundaries.
- [x] Add production request-graph coverage in `writing-navigation.spec.ts`: direct Product Ownership requires its body chunk and rejects the other four specialist body chunks.
- [x] In the same spec, direct `/writing/why-adrs` rejects all five specialist body chunks; assertions use stable emitted module-name fragments rather than hashes.
- [x] Compare those request sets with Task 1's baseline and record the before/after result in the plan: the baseline had no specialist body chunks, while the first crack emits them and the ordinary route graph stays clean.
- [x] Run `npm test -- --run`; result: 82 files and 220 tests passed.
- [x] Run the focused writing/accessibility browser coverage and the 1440/768/390/320 route matrix; route overflow result is 32 checks with zero failures.
- [ ] Perform one actual browser 200% zoom pass; CSS viewport emulation does not satisfy this checkbox, so this remains a final sign-off limitation.
- [x] Run the protected Vibe visual test twice without snapshot updates after the falsifier revision; both passes are clean. The earlier full suite's one Vibe mismatch was resolved by retaining the earned chapter numerals; no snapshots were updated.
- [x] Run `npm run build`; result: successful Vite production build with the entry JavaScript at 212623 bytes and CSS at 10611 bytes, both within the unchanged ceilings.
- [x] Record actual before/after entry JavaScript and CSS byte counts: baseline ContentPage was 31.09 kB with no specialist body chunks; first crack ContentPage is 27.61 kB and emits five specialist body chunks, while entry JS/CSS remain under budget.
- [x] Run `py -3 tools/run.py mesh --apply`, then `py -3 tools/run.py mesh --check`; check exits zero.
- [x] Run `git diff --check`; no whitespace errors.
- [x] Review `git diff --stat`, `git diff --name-status`, and `git status --short` for scope.
- [x] Mark all completed execution checkboxes `[x]`, stage the intended tree, and commit normally so the tracked pre-commit hook runs the single complete `ci --check` gate; implementation commit `92bb40293d21dcad5261dabe776d1eb29671dd93` passed.
- [x] Record the implementation commit SHA and hook result in the PR body. Do not rerun full CI immediately after a successful hooked commit.
- [x] Push with upstream tracking and update the existing draft PR. Keep base `main` and draft state.
- [x] Verify remote head SHA, base branch, draft state, and hosted checks; remote head matched the implementation commit and PR #55 remained open/draft against `main` (hosted workflows skipped while draft).

**Expected result:** Slice E has a validated, reversible first crack in the draft PR, with the decision log and visual evidence ready for Harley's batch sign-off. Do not update protected snapshots, promote new doctrine, or merge until that sign-off.

## Plan Acceptance Tests

Before execution begins, Harley should be able to answer yes to all of these:

- [ ] Can Luna begin Task 1 within ten minutes without rediscovering scope?
- [ ] Does every task have an exact write set and focused validation command?
- [ ] Are creative choices bounded without being pre-decided?
- [ ] Can Luna independently identify and propose removal of valueless furniture, record falsifier evidence, and carry the reversible first crack through to one batch visual sign-off rather than repeated implementation interruptions?
- [ ] Are public facts, assets, site-wide identity, and high-risk taste decisions still protected?
- [ ] Does each special treatment have to earn either local exception or canonical promotion?
- [ ] Does every task return enough evidence for the Luna orchestrator to catch drift before the next task?
- [ ] Is full CI run once through the normal commit hook rather than duplicated?

## Execution Handoff

The executing agent is Luna, not a Sol orchestrator. Invoke `/executing-plans` directly with the reviewed plan in this branch and work through Tasks 1-8 sequentially as one autonomous first crack. Keep the decision log current, preserve a reversible diff for every visible choice, and use the falsifier prompts to make creative calls explicit. Luna may delegate only to same-capability Luna workers when useful; any worker returns a packet to Luna, and Luna reviews each packet and diff before continuing. Stop after the complete evidence package for Harley's final batch visual sign-off, or earlier for the explicit Global Constraints gates or when the retry threshold is reached. Do not merge, promote new doctrine, or update protected snapshots before sign-off.
