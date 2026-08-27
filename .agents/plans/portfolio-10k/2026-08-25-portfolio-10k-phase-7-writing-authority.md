# Portfolio £10k Phase 7: Writing Authority and Breadth Implementation Plan

**Status:** Ready for execution

**Approved design:** [Writing Authority and Breadth](../../specs/2026-08-21-portfolio-10k-07-writing-authority-design.md)

**Repository baseline:** `146c6b40e9c8790644fc492a46b128daf458b86e`

**Marketplace evidence pin:** `ddbd36f4e34c82155983f84de2318d00b0f2824d` on public `main`, observed 25 August 2026

**Wild Bunch evidence pin:** `b095031388e8f8ca175f6639f8e460582e8ffb1d` on public `main`, observed 25 August 2026

**Inherited skill-TDD pin:** `obra/superpowers` public `main` at `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`, observed 25 August 2026

**Execution strategy:** `/subagent-driven-development`. GPT-5.6 Sol remains the controller and personally owns editorial judgement, integration and every creative pass. Each implementation or review subagent uses GPT-5.6 Terra with a task-specific brief and no delegated children. Tasks run in dependency order. Independent test and evidence work may run concurrently only when files do not overlap.

## Outcome

Publish the strongest technical publication that can be finished to the full editorial standard inside the Phase 7 time budget. Five essays is the publication floor, not a target cardinality. The practical working pool contains eight candidates and will probably yield five to eight finished essays. The upper end is a wall-clock guardrail for this phase, not a schema rule.

The candidate pool is:

1. `agentic-engineering-vs-vibe-coding`, accepted material and intended lead;
2. `why-adrs`, a user-directed Phase 7 addition;
3. `provisioning-is-not-accumulation`;
4. `graph-iterative-review`;
5. `context-is-not-state`;
6. `pass-references-not-paragraphs`;
7. `api-is-only-the-middle`; and
8. `tests-are-different-kinds-of-evidence`.

Vibe is already accepted material and remains the intended lead unless Harley reopens that author decision. The other seven candidates pass through the same admission gate before manifest activation; Why ADRs must receive full drafting and author review as a user-directed addition. Existing-file status carries no weight. Every newly admitted essay needs a distinct argument, concrete evidence, enough substance for a finished article, a useful place in the reading graph and a realistic completion cost. Candidates that do not earn publication remain deliberately unpublished material preserved in Git. Harley's final author decision governs the roster.

The Graph evidence gate has passed. It proves that Graph has real implementation behind it. It does not admit Graph automatically, force Context out or make Pass References expendable.

## Current-truth drift table

| Spec assumption | Current evidence | Classification | Plan response |
| --- | --- | --- | --- |
| Phase 6 precedes this work | PR #29 merged as `e906f05`; follow-up PR #30 merged as `146c6b4`; hosted run `32836625754` passed on the latter commit | still true | Start Phase 7 from `146c6b4` and close Phase 6 in the roadmap |
| Five public writing routes exist | The manifest has Vibe, Graph, Context, Provisioning and Pass References | implementation seam moved | Treat all non-Vibe routes as candidates; do not confuse route count with editorial completion |
| The previous plan fixed five launch identities | Harley clarified that five was a density floor and supplied an eight-candidate pool | approved design amendment | Admit every essay that earns full treatment, publish at least five and derive contracts from the final roster |
| Why ADRs was outside the roster | Harley supplied the argument, professional provenance and public corroboration | approved Phase 7 addition | Write it as a required core-engineering candidate, not as an ADR tutorial |
| Graph is preferred only if public implementation proves it | Marketplace public `main` at `ddbd36f4` contains the router, state schema, node recipes, transition tests, finding and resolution ledgers, regression routing and final-strong gate | evidence gate passed | Pin the source and audition Graph on editorial distinctness; keep Context independently eligible |
| The old Graph article may describe an earlier design baseline | The live graph includes normalize-inputs, reviewer-fast, lens dispatch and triage, scoped fix review, regression scan, resolved ledger and final-strong closeout | implementation seam moved | Rewrite against the live pin if admitted |
| Graph now has a published implementation and a merged trustworthiness plan | Marketplace `main` contains the graph as it currently stands and the accepted plan for making its completion claim trustworthy | editorial story clarified | Tell the progression honestly: what a trustworthy review graph requires, how the first implemented graph fell short, what exists now and what the merged plan still needs to change. Re-pin both surfaces when Graph enters Sol review; never present planned guarantees as delivered behaviour. |
| Skill TDD derives from `obra/superpowers` | Upstream public `main` still resolves to `b36e0829`; Marketplace records the derivative custody and keeps the RED/GREEN pressure-testing method | still true | Record derivation precisely and distinguish Harley's evidence-custody extension from inherited practice |
| Writing metadata is generic | `ContentSummary` exposes `date`, `featured` and untyped related slugs; the index silently falls back to the first article | still true | Introduce a writing-specific discriminated contract and fail closed |
| Writing routes use chronological navigation | `ContentPage` computes writing order and renders `ContentNavigation` for every kind | still true | Replace writing Previous/Next with two authored continuations; preserve project and Patch navigation |
| Principal figures sit outside Markdown | No writing figure registry exists; writing routes render a generic header and Markdown body | still true | Build the registry after admission so it represents the actual publication |
| Existing Vibe argument is closed | Current prose matches the approved generous professional boundary, with a small voice edit remaining | still true | Preserve the argument and edit only for accuracy, voice and publication coherence |
| Access Checks proves responsibility but not yet one consequential outcome | `professionalProfile.ts` records the formal title, sole-engineer scope and public system shape; About lacks a stakes, change, outcome and influence chain | important discovery, source-gated | Ask Harley for one employer-safe example before API drafting and hand the approved account to Phase 7A |
| Wild Bunch contains usable ADR corroboration | Public `main` contains ADR-0028 plus replay, snapshot recovery, projection and versioning tests | still true, page closed | Use the source in Why ADRs and source custody only; defer Wild Bunch page proof compression to Phase 7A |

The approved Phase 7 amendment is fully reflected in this plan. No unresolved design conflict remains.

## Evidence records

### Graph evidence gate

Marketplace `ddbd36f4e34c82155983f84de2318d00b0f2824d` proves an implemented workflow through:

- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/scripts/next_node.py`;
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/scripts/start_review.py`;
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-state-graph.md`;
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-state-schema.json`;
- `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-metrics-schema.json`;
- the `node-*.md` recipes and focused transition tests under `tests/`;
- append-only finding, resolution and regression records compiled into review metrics; and
- a final-strong contract that refuses unresolved important findings or regressions.

The accepted revision, not an earlier plan, governs factual claims. Selection remains an editorial decision.

### Wild Bunch ADR corroboration

Wild Bunch `b095031388e8f8ca175f6639f8e460582e8ffb1d` provides public source material through:

- `docs/adr/ADR-0028-onion-ddd-cqrs-event-sourcing-and-projections-posture.md`, which identifies event recording masquerading as event sourcing and records the corrective posture;
- `docs/adr/README.md`, which exposes decision-history custody;
- `tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs`, which exercises replay equality;
- `tests/WildBunch.Integration.Tests/Versioning/VersionMismatchBehaviorTests.cs`, which exercises version mismatch behaviour; and
- `tests/WildBunch.Application.Tests/Projections/GameLogEntryLegacyProjectionTests.cs`, which exercises projection compatibility.

These sources corroborate mistakes, correction history and falsifiers. Phase 7 must not edit the Wild Bunch portfolio case study.

## Phase 7 creative-review brief

**Audience:** Weary hiring managers and senior engineers who want evidence that Harley can make agentic systems dependable, operable and worth owning. A second reader is the principal architect who is tired of candidates wearing DDD, CQRS and event-sourcing vocabulary as costume.

**Intended response:** The hiring manager should recognise an established software engineer applying conventional product, delivery, testing and operational judgement to agentic work. The architect should be able to disagree with a choice while seeing that it is real, selective, informed by consequences and backed by falsifiable evidence.

**Distinctive publication intent:** Treat writing as one serious technical journal whose final size follows editorial merit. Prose remains the centre of gravity. Each admitted essay receives a principal figure only when the figure makes its argument easier to grasp. Metadata supplies an early route from the Vibe lead to strong core-engineering proof without exposing internal category labels.

**Why ADRs responsibility:** The essay argues that architectural decisions are institutional memory. Preserve context, decision, rejected alternatives, evidence behind rejection, consequences and reconsideration triggers. Use Harley's direct principle: “If nobody writes down what we tried and why we rejected it, nothing stops tomorrow's engineer repeating yesterday's experiments.” The supporting line “Do not make future engineers pay twice for the same learning” cannot replace the argument. Not every experiment deserves an ADR; record alternatives a competent future engineer could plausibly rediscover. Treat mistakes as high-value information when they explain why a decision exists.

The professional account must remain nuanced. Harley learned this architectural kit during roughly two years on Barbican/Arch, a complex enterprise system built by a three-person team alongside a strong senior developer experienced in DDD, CQRS and event sourcing. The patterns are field-acquired tools, not doctrine. The later replacement encountered much of the same domain complexity, supporting the conclusion that substantial complexity was essential. The original system still failed organisationally because too much reasoning remained tacit and disappeared with the team. Both facts matter.

**Protected defaults:** Existing typography, palette, site canvas, prose measure, accessible external-link policy, static delivery, reduced-motion behaviour and the distinction between projects, Patch stories and writing. The Vibe article's approved argument stays closed.

**Factual, privacy and custody boundaries:** Pin every cross-repository claim. Classify Harley's first-party professional account separately from public repository evidence, external conceptual sources and inference. Access Checks copy stays inside approved public facts and must not expose internal topology, customer identity, candidate data or private metrics. Any claim about dependants, stakes, a before state, outcome or organisational influence requires Harley's explicit approval and an exact, approximate, qualitative or confidential classification.

**Failure modes:** Optimising for a number; five interchangeable templates; rehabilitating a weak stub because it exists; rejecting a strong essay because five already exist; a generic ADR explainer; smug “we were right” framing; architecture badges; Graph presented as a plan rather than implementation; automatic deletion of Context or Pass References; a chronological blog feed; automatic continuation copy; fallback visuals; source links without custody; hiring-pitch conclusions; stiff no-contraction prose; em dashes; emoji; repeated AI-familiar constructions; or prose that teaches familiar patterns to Harley instead of expressing his judgement through them.

**Observable acceptance signals:** At least five essays meet the full editorial bar. Every one has a distinct argument, concrete evidence, a useful graph role, a readable first viewport and a typed principal figure whose text equivalent carries the same claim. Exactly one index lead and exactly two authored continuations exist per published essay. Why ADRs is author-approved and rooted in professional experience. A reader reaches conventional engineering proof early. The principal architect can establish professional provenance, selective pattern use, a rejected alternative, a correction and a falsifier without repository archaeology. All routes remain legible at 320 pixels and 200% zoom.

**Evidence surface for Sol review:** Candidate admission ledger; exact Markdown; rendered index and admitted routes; typed metadata; figure DOM and text equivalents; source-custody ledger; validator findings; focused component tests; accessibility results; desktop and narrow captures; continuation traversal; repo-wide voice scan; and hosted PR checks.

## Global constraints

- Keep work to Phase 7. Do not choose or build the Phase 8 homepage feature.
- Do not edit the Wild Bunch case-study page. Record deferred proof-compression work in Phase 7A.
- Keep article prose in ordinary Markdown. Do not add MDX, diagram runtimes, chart packages or custom Markdown directives.
- Render principal figures and continuations through typed React components outside Markdown.
- Validate at least five published essays. Do not encode eight as a schema maximum.
- Require exactly one lead and exactly two distinct, published, non-self continuations per essay.
- Derive visual identifiers, fixtures and traversal tests from the final admitted roster. Unknown visual identifiers fail closed; there is no fallback figure.
- `dateline` is an editorial coordinate, not `datePublished`, `pubDate` or repository chronology.
- Do not expose public `core` or `agentic` category labels.
- External sources open in a new context through the existing accessible link component. Internal article links remain client navigation.
- Preserve rejected candidates in Git and record why they remain unpublished.
- Generated indexes and mechanical files belong in the commit when the canonical generator changes them.
- Every material creative output requires Sol's personal pass or veto.
- Harley's complete-publication author review is a hard gate before merge readiness. Structural validation cannot admit an essay.

### Writing-pack execution contract

Portfolio consumes Marketplace `writing-pack` and `unslop-plus` at revision
`aec3a077ccd16053516cd0fde9303bafdd0c58bf`. Use `/writing` as the composed
entrypoint for material prose. Its order is binding: establish facts, audience,
purpose and constraints; draft or revise with `/writing-with-clarity`; apply an
authorised voice profile only when one actually exists; run `/writing-style`
only when the text supplies material evidence for a fatigue review; then finish
through the `/writing-with-clarity` final-edit gate.

`/writing-profile-engine` may validate and evaluate the bundled fatigue profile
deterministically. Its findings are observations and repair candidates, not an
AI detector, authorship verdict, token blacklist or automatic rewrite queue.
One phrase occurrence is not a defect. Review frequency across the complete
publication, context, author intent and the risk of flattening Harley's voice
before changing prose. Facts, safety, legal and accessibility constraints,
Harley's explicit direction, and the approved project voice outrank a profile
finding. Do not infer or create a private voice card from repository prose.

---

### Task 1: Build the roster-independent editorial contract

**Files:**
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `tools/portfolio_quality.py`
- Modify: `tests/test_portfolio_quality.py`
- Create: `docs/editorial-source-custody.md`
- Create: `docs/editorial-admission.md`
- Modify: `docs/INDEX.md`

**Consumes:** Approved admission model, candidate pool and source pins.

**Produces:** A discriminated writing contract, generic contract fixtures, a deterministic floor validator, a source-custody authority and an executable admission ledger.

- [ ] **Step 1: Write failing TypeScript contract tests.** Require every editorial writing summary to expose `dateline`, positive `readingMinutes`, `indexLead`, homepage proposition, typed visual ID plus description, and exactly two `{ slug, rationale }` continuations. Keep non-writing content valid without writing metadata. Use generic fixtures rather than encoding final candidates.
- [ ] **Step 2: Write the failing Python validation matrix.** Reject fewer than five published essays, duplicate or missing leads, unknown visual IDs, empty descriptions or propositions, malformed datelines, generic writing `featured` or `relatedSlugs`, and continuation targets that are absent, duplicated or self-referential. Prove that six, seven and eight valid essays pass. Do not add a maximum-cardinality rule.
- [ ] **Step 3: Define the contract.** Add `ArticleVisualId`, `EditorialContinuation`, `WritingEditorial` and `EditorialWritingSummary` plus a narrow parser. Preserve the current union until Task 5 atomically activates the final roster.
- [ ] **Step 4: Create the admission ledger.** Give every candidate fields for its one-sentence argument, concrete evidence, substance, graph role, completion cost, provisional decision, final Harley decision and rationale. Record Vibe as accepted material and intended lead. Record Why ADRs as required for full drafting and author review, without confusing that requirement with structural admission by code.
- [ ] **Step 5: Establish source custody.** Record the Marketplace Graph pin, inherited skill-TDD pin, Wild Bunch corroboration, Access Checks public-fact authority and Harley's first-party Barbican/Arch account. For each, record relationship, usage mode, access date, limits and candidate destination.
- [ ] **Step 6: Run focused checks.** Run `py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v` and `npm.cmd --prefix src/client test -- src/data/documents.test.ts src/api/contentApi.test.ts`.
- [ ] **Step 7: Regenerate, stage, inspect and commit.** Run `py -3 tools/run.py ci --apply`, inspect generated changes, stage the Task 1 slice, run `git diff --cached --check`, then commit `feat: define editorial admission and writing contracts`.
- [ ] **Step 8: Mark Task 1 complete.** Update this checklist and carry the plan state in Task 2's commit.

---

### Task 2: Audition all eight candidates

**Files:**
- Modify: `docs/editorial-admission.md`
- Modify: `docs/editorial-source-custody.md`
- Inspect and modify provisionally: all existing writing Markdown candidates
- Create provisionally: `src/client/src/data/content/writing/2026-08-18-why-adrs.md`
- Modify: this plan

**Consumes:** Task 1 gate, existing prose, source pins and Harley's supplied professional account.

**Produces:** One accepted-control brief for Vibe, seven comparable admission briefs, a provisional shortlist with at least five realistic publication paths overall and Harley's provisional author decision before expensive full production.

- [ ] **Step 1: Read every candidate as source material.** Do not infer quality from current manifest status or file length. Capture the strongest existing argument, evidence and reusable passages without polishing yet.
- [ ] **Step 2: Write an audition brief for every candidate.** Use `/writing` to state its one-sentence argument, reader value, distinctness from the other seven, evidence route, likely sections, useful reading-graph role and realistic finish cost. Keep fatigue-profile findings subordinate to the actual argument and evidence.
- [ ] **Step 3: Test the ADR brief against the supplied history.** Require institutional memory, rejected alternatives, mistakes, reconsideration triggers, selective kitbag posture and the Barbican/Arch organisational lesson. Reject any generic “what is an ADR?” structure.
- [ ] **Step 4: Keep Graph and Context independent.** Graph evidence readiness contributes to Graph's score but does not count against Context. Keep Pass References eligible on its own argument. Do not delete or de-register either.
- [ ] **Step 5: Run Sol's provisional admission pass.** Keep Vibe accepted. Classify each of the other seven candidates `draft now`, `reserve`, or `do not spend launch time`, with concise reasoning against the five gate questions. Why ADRs enters `draft now` by user direction. Ensure at least five credible publication paths exist before proceeding.
- [ ] **Step 6: Present the provisional roster to Harley.** Record his author decision in the ledger. This gate authorises drafting effort, not public activation. If fewer than five paths survive, revisit the strongest reserve before Task 3.
- [ ] **Step 7: Stage, inspect and commit.** Preserve all candidate Markdown. Commit the admission record and any explicitly provisional ADR scaffold as `docs: record the Phase 7 editorial auditions`.
- [ ] **Step 8: Mark Task 2 complete.** Update this checklist and carry the plan state in Task 3's commit.

---

### Task 3: Write the required ADR argument and shortlisted core-engineering essays

**Files:**
- Create or modify: `src/client/src/data/content/writing/2026-08-18-why-adrs.md`
- Create or modify if shortlisted: `src/client/src/data/content/writing/2026-08-20-api-is-only-the-middle.md`
- Create or modify if shortlisted: `src/client/src/data/content/writing/2026-08-22-tests-are-different-kinds-of-evidence.md`
- Modify: `docs/editorial-admission.md`
- Modify: `docs/editorial-source-custody.md`
- Modify: `tests/test_portfolio_quality.py`

**Consumes:** Task 2 provisional decisions and approved source boundaries.

**Produces:** An author-ready Why ADRs essay plus every provisionally admitted core-engineering candidate.

- [ ] **Step 1: Write Why ADRs from the scar outward.** Open through the professional consequence, then establish decision history as institutional memory. Preserve Harley's direct principle. Explain worthwhile rejected alternatives, mistakes, consequences and reconsideration triggers. Hold essential domain complexity and failed knowledge transfer together without sneering.
- [ ] **Step 2: Prove the selective kitbag posture.** State that DDD, CQRS and event sourcing are field-acquired tools rather than universal doctrine. Use Access and Wild Bunch as evidence of selective application without turning the essay into a project comparison.
- [ ] **Step 3: Use Wild Bunch as corroboration only.** Cite ADR-0028 and relevant public tests at the pinned revision. Do not edit or reopen the Wild Bunch case-study page. Distinguish source fact, Harley's professional account and editorial inference.
- [ ] **Step 4: Draft API if provisionally admitted.** Ask Harley for one employer-safe example covering reliance, consequence, before state, exact decision, observable result and adjacent influence. Classify every fact. If the safe outcome does not survive review, omit the claim and return the candidate to reserve rather than inventing proof.
- [ ] **Step 5: Draft Testing if provisionally admitted.** Organise around claim, risk and observation boundary across the product system. Name the inherited pressure-testing method and Harley's evidence-custody extension accurately. Avoid tool catalogues and testing pyramids.
- [ ] **Step 6: Run the composed writing gate on each completed essay.** Sol applies `/writing`, including the final clarity edit, then may use `/writing-profile-engine` and `/writing-style` to inspect contextual and repo-wide AI-familiar phrase frequency. Preserve the evaluator output in task scratch and record only the consequential evidence, decision and limitation in the admission ledger. Never auto-repair from a pattern match. Record pass or veto.
- [ ] **Step 7: Run focused quality and safety checks.** Add negative checks for private employer claims, false originality and unsupported professional assertions. Run the quality suite and source-link validation.
- [ ] **Step 8: Stage, inspect and commit.** Commit only finished, editorially passed essays and their custody changes as `feat: write the Phase 7 core engineering essays`.
- [ ] **Step 9: Mark Task 3 complete.** Update this checklist and carry the plan state in Task 4's commit.

---

### Task 4: Groom the shortlisted agentic-engineering essays

**Files:**
- Modify: `src/client/src/data/content/writing/2026-08-01-agentic-engineering-vs-vibe-coding.md`
- Modify if shortlisted: `src/client/src/data/content/writing/2026-08-12-provisioning-is-not-accumulation.md`
- Modify if shortlisted: `src/client/src/data/content/writing/2026-08-22-graph-iterative-review.md`
- Modify if shortlisted: `src/client/src/data/content/writing/2026-08-07-context-is-not-state.md`
- Modify if shortlisted: `src/client/src/data/content/writing/2026-08-15-pass-references-not-paragraphs.md`
- Modify: `docs/editorial-admission.md`
- Modify: `docs/editorial-source-custody.md`

**Consumes:** Task 2 provisional decisions, Task 3 publication voice and the live Graph evidence pin.

**Produces:** The accepted Vibe lead and every provisionally admitted agentic candidate at the same editorial bar as Why ADRs.

- [ ] **Step 1: Preserve Vibe's approved argument.** Remove only factual, voice and publication-coherence defects. Keep its generous professional boundary and avoid a defensive rewrite.
- [ ] **Step 2: Give each shortlisted candidate a non-overlapping job.** Provisioning owns environment and knowledge selection. Graph owns explicit state, guarded transitions and bounded repair. Context owns durable project memory if its argument remains distinct. Pass References owns evidence-rich delegation if it can sustain more than a procedural tip.
- [ ] **Step 3: Rewrite Graph as a trustworthiness progression.** Re-pin Marketplace `main` when the article enters Sol review. Explain what a trustworthy review graph needs, how Harley built an implemented but untrustworthy first graph, what the current graph actually guarantees, and what the merged plan proposes to make its completion claim trustworthy. Cover scope honesty, cheap early review, deep lenses, finding custody, scoped repair, regression scanning, final strong review and first-class blocked exits. Keep implemented behaviour, observed shortcomings and planned work visibly separate.
- [ ] **Step 4: Refuse mechanical roster logic.** Do not weaken Context because Graph is strong. Do not keep Pass References because a file exists. Return candidates that miss the bar to reserve with a recorded reason.
- [ ] **Step 5: Run Sol's article and whole-set gates.** Read each piece through `/writing` as a coherent argument, then compare the set for duplication, terminology drift, repeated examples and familiar AI phrasing. Use the profile engine as reproducible evidence, not as authority. Revise until each candidate earns `pass` or receives a recorded veto.
- [ ] **Step 6: Complete source custody and checks.** Add only sources that advance the argument, validate links and run the focused quality suite.
- [ ] **Step 7: Stage, inspect and commit.** Commit the finished agentic set and updated admission evidence as `feat: finish the agentic engineering essays`.
- [ ] **Step 8: Mark Task 4 complete.** Update this checklist and carry the plan state in Task 5's commit.

---

### Task 5: Close admission and build the actual publication system

**Files:**
- Modify: `docs/editorial-admission.md`
- Modify: `src/client/src/types/content.ts`
- Create: `src/client/src/components/ArticleFigure.tsx`
- Create: `src/client/src/components/ArticleFigure.test.tsx`
- Create: `src/client/src/components/ArticleContinuations.tsx`
- Create: `src/client/src/components/ArticleContinuations.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: all admitted candidate Markdown metadata
- Modify: this plan

**Consumes:** Every completed candidate, Sol pass or veto records and Harley's authorship judgement.

**Produces:** Harley's final admitted roster, explicit unpublished decisions, roster-derived visual contracts and a tested continuation system ready for atomic activation.

- [ ] **Step 1: Present completed candidates as one body of work.** Give Harley the argument, evidence route, editorial result and graph role for each. Retain Vibe's accepted state unless Harley explicitly reopens it. Record `admit` or `deliberately unpublished` for every other completed candidate with his rationale. If fewer than five are admitted overall, return to the highest-value reserve and repeat Tasks 3 or 4 for that candidate.
- [ ] **Step 2: Freeze the editorial graph.** Keep exactly one index lead, Vibe unless Harley changes it. Author exactly two useful continuations for every admitted essay. Ensure the lead offers an early route to conventional engineering proof. Do not expose internal category labels.
- [ ] **Step 3: Define visual IDs from the admitted arguments.** Create one stable typed ID and text-equivalent proposition per admitted principal figure. Do not retain visual fixtures for rejected candidates and do not derive IDs from array position.
- [ ] **Step 4: Write failing figure-registry tests.** Require every admitted visual ID to render a semantic `<figure>`, visible `<figcaption>`, stable contract marker and equivalent ordered or descriptive text. Unknown IDs must be unrepresentable; no fallback may render.
- [ ] **Step 5: Write failing continuation tests.** Require two descriptive linked headings with title, rationale and reading time; preserve author order; reject self-links, duplicates and unpublished targets; report catalogue failure honestly.
- [ ] **Step 6: Implement the figures and continuations.** Use HTML and CSS, with owned inline SVG only when connectors cannot be expressed cleanly. Keep essential labels selectable and in source order. Do not force admitted essays into identical diagram geometry.
- [ ] **Step 7: Apply accessible responsive styling.** Verify headings, DOM order, focus, contrast, figure equivalence, code wrapping, 320-pixel behaviour, 200% zoom and reduced-motion neutrality.
- [ ] **Step 8: Run focused tests and build.** Run component tests and `npm.cmd --prefix src/client run build`.
- [ ] **Step 9: Stage, inspect and commit.** Commit the frozen admission record and publication components as `feat: build the admitted writing publication`.
- [ ] **Step 10: Mark Task 5 complete.** Update this checklist and carry the plan state in Task 6's commit.

---

### Task 6: Activate, review and publish the admitted roster atomically

**Files:**
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/src/data/documents.ts`
- Modify: `src/client/src/data/content/content-manifest.json`
- Modify: `tools/portfolio_quality.py`
- Modify: `src/client/src/data/documents.test.ts`
- Modify: `src/client/src/components/EditorialIndexCard.tsx`
- Modify: `src/client/src/pages/WritingIndexPage.tsx`
- Create: `src/client/src/pages/WritingIndexPage.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/e2e/content.spec.ts`
- Modify: `src/client/e2e/accessibility.spec.ts`
- Modify: visual baselines selected by the Windows visual contract
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: this plan
- Delete only if rejected: candidate Markdown files that would otherwise be manifest orphans

**Consumes:** Task 5 final roster, visual registry, continuation graph and admission record.

**Produces:** The admitted public publication, full traversal and accessibility evidence, reviewed visual baselines, roadmap evidence and a PR ready for Harley's author gate.

- [ ] **Step 1: Activate the final contract atomically.** Require `EditorialWritingSummary` for every live writing item. Populate the manifest from the admitted roster, remove generic writing `featured` and `relatedSlugs`, and connect validation to the canonical quality gate.
- [ ] **Step 2: Resolve rejected source files deliberately.** Preserve the decision in `docs/editorial-admission.md`. Remove a rejected Markdown file from the working tree only when keeping it would violate the manifest-orphan rule. Git history is its custody; no redirect is required in Phase 7. Assert the rejected route is absent from index and continuations.
- [ ] **Step 3: Integrate the editorial graph.** Render metadata-driven lead treatment, principal figures and exactly two authored continuations. Remove chronological Previous/Next from writing while preserving project and Patch navigation. Order non-lead essays by stable dateline without archive or latest language.
- [ ] **Step 4: Test the actual roster.** Assert a floor of five, the exact final admitted identities, one lead, complete metadata, known figures, two continuations each, valid full traversal and absence of rejected routes. Let tests discover the final roster from manifest data rather than a stale five-item fixture.
- [ ] **Step 5: Test semantics and accessibility.** Run axe on the index and every admitted route. Manually verify landmarks, headings, keyboard navigation, focus, external-link disclosure, figure equivalence, 200% zoom, code and long-link wrapping, and no horizontal overflow at 320 pixels.
- [ ] **Step 6: Perform the full visual review.** Inspect index and every essay at 1440, 768, 390 and 320 CSS pixels plus 200% zoom. Confirm coherent publication grammar without identical templates, deliberate whitespace, attached captions, readable figures and clear continuation hierarchy.
- [ ] **Step 7: Update focused Windows baselines.** Capture only the surfaces needed to prove lead treatment, every distinct principal figure and continuation behaviour. Avoid brittle full-page paragraph captures.
- [ ] **Step 8: Run whole-publication editorial and skeptic passes.** Sol reads the index and all admitted essays in traversal order through the composed `/writing` workflow. Evaluate the admitted corpus against the bundled fatigue profile to expose site-wide density, then judge every finding in context. Check that every sentence pays dues and the publication sounds like Harley rather than a mechanically normalised author. Record how quickly a weary hiring manager reaches conventional engineering proof. Run the principal-architect falsification path and record distance to professional provenance, selective pattern use, a rejected alternative, correction history and a falsifier.
- [ ] **Step 9: Present Harley's hard final author gate.** Keep the PR draft until Harley has read and approved the complete publication as one body of work. Treat factual, employer-safe, tone, title, admission and authorship notes as load-bearing.
- [ ] **Step 10: Run canonical validation on a staged tree.** Run `py -3 tools/run.py ci --apply`, stage all intended source and generated files, run `git diff --cached --check`, then `py -3 tools/run.py ci --check`. Diagnose and rerun any test layer that exits without trustworthy evidence.
- [ ] **Step 11: Run completion review.** Use `/handoff-gates` completion-readiness and `/iterative-review` with writing, frontend, accessibility and source-custody lenses. Resolve all important findings, make the PR body readable and wait for hosted checks on the exact head.
- [ ] **Step 12: Commit and close the roadmap record.** Commit `feat: finish the writing authority publication`. After merge proof, move this plan to `.agents/plans/completed/`, record exact commit, PR, rating and hosted run in the roadmap, then use `/finishing-a-development-branch` for cleanup.
- [ ] **Step 13: Mark Task 6 complete.** No unchecked plan item may be hidden behind a green reviewer or CI result.

## Verification summary

Focused checks are named within each task. Final evidence must include:

```powershell
py -3 tools/run.py ci --apply
git add --all
git diff --cached --check
py -3 tools/run.py ci --check
```

Retain alongside the canonical gate:

- `py -3 .agents/skills/writing-profile-engine/scripts/validate_profiles.py --json` with a valid bundled-profile result;
- the eight-candidate admission ledger and Harley's final decisions;
- route and index component tests covering every admitted essay;
- roster-floor and metadata validation;
- complete continuation traversal and negative route checks;
- axe results for the index and every admitted route;
- manual 1440, 768, 390, 320 and 200% evidence;
- focused Windows visual baselines;
- source and editorial custody review;
- Sol creative pass or veto records;
- weary-hiring-manager and principal-architect path findings;
- Harley's final author approval; and
- hosted checks on the exact PR head.

## Plan-readiness self-review

**Rating:** 9/10.

The plan makes editorial admission executable without turning an approximate working range into a content schema. It preserves all candidates until a reasoned decision, requires the ADR article to carry the supplied professional history, separates first-party account from public corroboration, keeps Wild Bunch closed, derives presentation from the final roster and preserves Harley's decisive author gate. The main residual risk is editorial wall-clock cost. The audition gate controls that risk before expensive drafting while leaving room for every strong essay to earn publication.
