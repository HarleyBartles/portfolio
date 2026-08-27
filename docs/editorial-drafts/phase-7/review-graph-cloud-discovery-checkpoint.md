# Review graph: Cloud discovery checkpoint

Status: durable editorial-room record; discovery completed 27 August 2026

This file is the durable answer ledger for Cloud Sol's conversation with Harley. Append to it during discovery. Do not rewrite an earlier answer merely because the manuscript changes. If later evidence corrects an entry, add a dated correction that points back to the earlier item.

## Session clock

- Started at: `2026-08-27T06:23:00Z`
- Target stop: `2026-08-27T09:23:00Z`
- Hard stop: `2026-08-27T11:23:00Z`
- Last durable save: `2026-08-27T09:28:00Z`
- Current manuscript commit: `ed00017eeb89cdfee2fd4d67d1d2f510172f6f03`

The hard stop is binding. At five hours, stop asking questions and write the best honest baton status the evidence supports.

## Settled editorial frame

- Candidate: `graph-iterative-review`.
- Governing article point: graph engineering is hard. Anyone can draw a graph; engineering a trustworthy graph-based workflow is much harder.
- Historical spine: deliberate prose loop -> explicit graph -> deterministic router -> JIT node-local traversal -> discovery that the graph topology itself still was not trustworthy.
- Central diagnosis: after enough iteration Harley believed he had designed the workflow as a graph, but the explicit graph still behaved as a collection of linked review loops, some recursive and some capable of terminating into invalid states with no lawful next action.
- Technical boundary: a collection of linked loops is still mathematically a graph. The failure is graph design/control-flow semantics, not classification.
- Primary trust problem: JIT traversal only works when the graph is trustworthy enough for the agent to hand administration of the graph to the graph. The current version has not earned that authority.
- Secondary trust problem: what `reviewed-green` should prove. Strengthening final-green semantics comes after repairing workflow authority.
- Audience lenses for all editorial choices: `is it £10k?` means would we be comfortable paying £10,000 for this site from a respectable agency; the weary sceptical hiring manager must feel safe forwarding the URL; the jaded cynical architect must fail to tear the claimed depth down to superficial pattern recognition.
- Authority: Harley owns experience, meaning, privacy, voice and admission. Repository evidence owns implementation state. A plan proves intent, not delivered behaviour.

## Answered questions

### RG-A001
- Question: Why did Harley build the iterative-review skill and graph in the first place?
- Harley's answer: The purpose was to let inferior models reason their way through to a frontier-level review. A frontier model can be trusted to self-review; a lesser model cannot, so the weaker model needs more explicit process support.
- Editorial consequence: Keep the capability-amplification purpose clear, but do not claim current benchmarked frontier equivalence.
- Evidence class: first-party account; public Marketplace skill corroborates that the legacy workflow is for non-frontier orchestrators.
- Public boundary: Intended purpose is not delivered benchmark proof.

### RG-A002
- Question: What failed in the first version of the graph?
- Harley's answer: The first version asked the agent to understand the graph before traversal and overwhelmed it. The next iteration added deterministic node and recipe tooling so the agent could be discouraged from reading the whole graph and instead run the next node and read its recipe just in time.
- Editorial consequence: Whole-process comprehension -> deterministic next-node authority -> JIT local reasoning.

### RG-A003
- Question: What made Harley question the graph's trustworthiness?
- Harley's answer: JIT traversal requires the graph itself to be trustworthy enough that the agent can hand administration of the graph to the graph. The current graph is not trustworthy: it has dead ends that cannot automatically recover and loops that can recurse. Sol's trust audit concluded a weaker agent handing global control to the graph would eventually have to reason globally again.
- Editorial consequence: This is the decisive failure.

### RG-A004
- Question: Is the primary correction graph control or stronger final green?
- Harley's answer: Trust and global workflow state are primary. Final-green weakness is real but secondary. There is no point strengthening green while the graph itself is the failure mode.

### RG-A005
- Question: What is the positive case for graphs?
- Harley's answer: A graph is an excellent way to route an agent through complex work. Novelty is context, not justification. Harley encountered graph engineering, recognised a control problem that needed it, and used it because the topology paid rent.
- Public boundary: Do not launder unsubstantiated Anthropic attribution into truth.

### RG-A006
- Question: What makes this review structurally wrong as a loop?
- Harley's answer: Once a loop contains loops inside loops, diverging exit paths and different onward paths, it is no longer usefully a loop. It is a badly designed graph. Keeping that topology implicit forces the weaker model to reconstruct global state and routing decisions itself.
- Public boundary: Present this as Harley's design judgement about this workflow, not a universal claim that loops are obsolete.

### RG-A007
- Question: What does Sol's replacement plan say is concretely wrong with the current graph?
- Repository evidence at pinned Marketplace revision `70dd30e2e65fd8f7aa89796a1a037da14235dd2a`: Plan 1 freezes legacy defects including final strong without valid report, circular resolution state, cumulative preflight state, lost normalization origin, blocked state, misleading round state and unrepresentable blocker.
- Editorial consequence: The failure is systemic, not one bad edge. Use two or three examples, not the catalogue.
- Public boundary: The replacement plan is accepted future work, not delivered v2.

### RG-A008
- Question: Why trust the Sol audit?
- Harley's answer: Agent opinion is useful as runtime observation of an environment the agent actually has to consume. It is not automatic authority. Observe, then verify against implementation and evidence.
- Editorial consequence: Keep the audit as empirical runtime probe, not deference to a model.

### RG-A009
- Question: What is the clearest current failure?
- Harley's answer: `I can ask the tool for the next node and it can leave me stranded.`
- Editorial consequence: Make this the concrete hinge of the authority argument.

### RG-A010
- Question: What contract must JIT traversal satisfy?
- Harley's answer: If whole-graph understanding is required, context overload returns. Therefore routing must be deterministic and recipes JIT. Every non-terminal state must yield one lawful meaningful next action or an honest `BLOCKED` exit with durable state. There is no third `work it out` mode.

### RG-A011
- Question: What version-one property beyond JIT is worth preserving?
- Harley's answer: The effort ladder. Cheap/fast agents handle narrow work; lens reviewers handle bounded specialist judgement; the strongest included reviewer owns broad/final judgement. Escalation is non-linear and should track capability fit and aperture.

### RG-A012
- Question: Should final strong consume earlier reassurance?
- Harley's answer: No. It must remain independent. Earlier reviewers prepare the PR, not pre-authorise green. Repeated final-strong churn is a real tension still being solved.

### RG-A013
- Question: Is money the driver?
- Harley's answer: No. The driver is capability amplification for weaker included models. Economics are secondary. If a frontier model is already available for the whole review, the graph is much less valuable.

### RG-A014
- Question: What would practical proof look like?
- Harley's answer: Run the weaker-model workflow, then hand the result to an independent frontier reviewer outside the graph. It is acceptable for the frontier reviewer to catch something. It is not acceptable for the frontier reviewer to remain the main iterative discovery engine.

### RG-A015
- Question: What benchmark posture is acceptable?
- Harley's answer: The skill should eventually prove itself against a stable frontier-reference defect set, with no false greens on required trials and independent frontier audit for escapes. Until then, do not call it finished in the strongest sense.

### RG-A016
- Question: Why decomposed lenses?
- Harley's answer: A whole-PR reviewer catches less than several agents asked narrower questions from relevant angles. The value is decomposed attention, not reviewer count.

### RG-A017
- Question: Who decides lens scope?
- Harley's answer: The strongest included orchestrator. It has to build review packages narrow enough to preserve specialist focus but broad enough to include dependencies/evidence needed for valid judgement.

### RG-A018
- Question: What is wrong with prose-only scope?
- Harley's answer: Giving a reviewer the whole diff and writing `only review these files` is weak isolation. `Prose is a sign on the wall.`

### RG-A019
- Question: What is wrong with blind file slicing?
- Harley's answer: A reviewer given only the nominal files can lose dependencies it needs to judge them correctly. Scope construction is itself engineering work.

### RG-A020
- Question: How much of the accepted mapper/challenger topology does Harley own?
- Harley's answer: Only if it pays rent. The invariant is strong scope construction; exact redundancy/topology is provisional.

### RG-A021
- Question: What does `Prose is a sign on the wall` mean in this article?
- Harley's answer: Prose can guide but cannot reliably prevent. Executable routing can turn advice into gates. Hard gates can still be wrong if the gate itself is badly designed.

### RG-A022
- Question: Are hooks part of the Review Graph solution?
- Harley's answer: No settled claim. Hooks are adjacent future capability-control experiments, not current Review Graph architecture.

### RG-A023
- Question: Is current iterative-review useful?
- Harley's answer: Yes, but expect churn. In observed use it commonly needs two or three human ambiguity clearances and final-strong can run roughly five times. These are anecdotes, not benchmark metrics.

### RG-A024
- Question: What causes some of the turn hunger?
- Harley's answer: Mechanical work has been model-visible as nodes. A node purely to do bookkeeping does not deserve a node; model-visible nodes should pay rent in judgement.

### RG-A025
- Question: How should broader paid model allowances affect this article?
- Harley's answer: Mostly they should not. The broader `sandbagging paid frontier capacity` lesson is a separate article.

### RG-A026
- Question: Should specialist lenses drip findings through loops?
- Harley's answer: No. A lens reviewer should review comprehensively and raise the complete finding set before repair. It should define why each finding is a problem and the acceptance condition that makes it pass.

### RG-A027
- Question: Does the reviewer prescribe implementation?
- Harley's answer: No. Reviewer owns defect definition and acceptance condition; fixer owns implementation; independent verifier checks closure and regressions.

### RG-A028
- Question: What must redispatched final-strong prove?
- Harley's answer: Two separate things: all previously reported findings are resolved, and a fresh comprehensive pass produces no new findings. One does not imply the other.

### RG-A029
- Question: How should later fixes invalidate earlier review evidence?
- Harley's answer: Known unresolved problem. No settled design yet. Do not invent a selective invalidation policy for the article.

### RG-A030
- Portfolio-wide editorial lenses corrected and settled.
- `Is it £10k?` means: would we be comfortable paying £10,000 for this site if a respectable agency delivered it? Copy is core to that perception and should feel properly authored, edited and finished.
- Weary sceptical hiring manager: has already seen ten portfolios making the same senior/frontier-agentic claim and had three `promising` ones laughed off by the architect. He will not forward another unless the proof looks safe enough to defend.
- Jaded cynical architect: expects pattern-name familiarity without depth and actively tears claims down to what the developer actually understands. Three weak candidates have already arrived today; the default expectation is that this one will fail too.
- Editorial consequence: all portfolio copy choices are filtered through all three lenses. Truth/evidence/privacy still outrank presentation.

### RG-A031
- Question: Does `collection of linked loops` still pay rent after tracing the history?
- Harley's answer: Yes. The chronology is: started as an explicit prose loop; after much iteration Harley believed he had turned it into a graph; later scrutiny showed that the explicit graph still behaved as a collection of linked loops, some recursively non-terminating and some terminating into invalid states.
- Public boundary: A collection of linked loops is still graph topology. Criticise graph design/control-flow semantics, not mathematical classification.

### RG-A032
- Governing article point: `graph engineering is hard. Anyone can draw a graph, engineering a graph based workflow is hard.`
- Editorial consequence: This is now the governing argument for the reframed manuscript.

## Historical source trace

The Git history confirms the article's evolution rather than relying on memory:

- `76606de92d53c09c8cdf836c50e867d0170470ae` on 2026-08-02: design titled `Iterative Review — PR Review Loop Design`; explicitly proposes a `multi-round subagent review loop`; numbered prose sends reviewer-fix flow back to an earlier step.
- `50ef0dcc86fb43620af901627499c92e48cbf610` on 2026-08-02: first implementation opens by calling itself a `multi-round subagent review loop`; no explicit graph or mechanical router.
- `550fa59d9f8401daaea5ce34d35abd954e64525c` on 2026-08-04: `Iterative review as a graph`; commit explicitly says `Replace round list with review state graph`.
- `8961cbf3662d18b3fdb82d27bae0eea98e8f5a7a` on 2026-08-08: adds `next_node.py`; contract calls it the `mechanical source of truth for the graph` and says not to override it.
- `6215daae0abc4056184ce66b98b5b2cff7a2cc23` on 2026-08-08: rewrites the skill as a thin orchestrator; agent opens only the recipe named by `next_node.py`; explicit `Do not read ahead` JIT traversal.

Editorial consequence: use this sequence as the article's causal backbone: prose loop -> explicit graph -> executable deterministic routing -> JIT node-local traversal -> authority failure becomes visible.

## Editorial decisions

- ED-RG-001: JIT delegation of process control requires trustworthy process authority.
- ED-RG-002: Keep frontier vs weaker-model capability explicit because it explains why the machinery exists.
- ED-RG-003: Preserve `hand administration of the graph to the graph` as a voice anchor.
- ED-RG-004: Keep graph/process trust before final-green trust.
- ED-RG-005: Do not sell graph engineering through novelty.
- ED-RG-006: Do not publish unverified Anthropic graph-shift attribution.
- ED-RG-007: Preserve the `badly designed graph` judgement as structural explanation.
- ED-RG-008: Prefer concrete legacy state failures over `the graph lies` in public prose.
- ED-RG-009: Use systemic state failures as bridge into replacement work.
- ED-RG-010: Keep dead-route/state defects distinct from false-green defects.
- ED-RG-011: Agent opinion is runtime observation, not automatic authority.
- ED-RG-012: Keep AGENTS.md/Devin examples out unless they pay rent.
- ED-RG-013: Driving analogy is optional, not required.
- ED-RG-014: `I can ask the tool for the next node and it can leave me stranded` is the clearest current failure.
- ED-RG-015: Replacement acceptance question is whether routing always yields lawful continuation or honest `BLOCKED`.
- ED-RG-016: Whole-graph comprehension causes context overload; JIT removes it; routing therefore has to be complete and truthful.
- ED-RG-017: Reject `sometimes read ahead` as an architectural escape hatch.
- ED-RG-018: Any dead end other than legitimate `BLOCKED` is a workflow-authority defect.
- ED-RG-019: Preserve the effort ladder as a genuine success.
- ED-RG-020: Escalation is capability/aperture routing, not a simple linear pipeline.
- ED-RG-021: The graph earns its keep partly by making non-linear escalation explicit.
- ED-RG-022: Final-strong remains independent of prior reassurance.
- ED-RG-023: Repeated final-strong churn remains a real design tension.
- ED-RG-024: Earlier tiers should make final-strong boring, not pre-authorise its answer.
- ED-RG-025: The article may openly describe an unsolved design.
- ED-RG-026: Capability fit is primary; financial cost is secondary.
- ED-RG-027: Frontier bypass remains explicit.
- ED-RG-028: Do not fabricate a solved retry policy.
- ED-RG-054: Specialist lens should finish its judgement before repair begins.
- ED-RG-055: Separate specialist review, independent fix, independent verification.
- ED-RG-056: Skipping specialist re-review can be lawful only when complete findings plus independent verification justify it.
- ED-RG-057: Final-strong remains the later whole-change gate.
- ED-RG-058: Review findings specify acceptance conditions, not implementation.
- ED-RG-059: Reviewer owns problem/pass condition; fixer owns implementation; verifier owns closure/regression check.
- ED-RG-061: Final-strong findings should be comprehensive before repair.
- ED-RG-062: Make fast fix/review robust and boring.
- ED-RG-063: Redispatched final-strong separately checks prior closure and fresh discovery.
- ED-RG-064: Never infer no-new-findings from previous-findings-resolved.
- ED-RG-065: Reduce strong-review churn through completeness and repair quality, not weakened gates.
- ED-RG-066: Stop using this editorial room to design version two. Questions and edits must materially change article copy, structure, evidence, voice, opening, ending or cuts.
- ED-RG-067: When unresolved design questions appear, record the honest boundary and return to editorial work.
- ED-RG-071: Adopt the curveball frame: `If you write a loop, don't be surprised when your agent starts looping`.
- ED-RG-072: Use Git history as causal backbone.
- ED-RG-073: `Prose is a sign on the wall` now has direct historical proof in iterative-review itself.
- ED-RG-074: Architect-proof distinction is `explicit topology is not trustworthy topology`.
- ED-RG-075: £10k-quality copy is core to a £10k-feeling site; presentation is outside this room except deliberate copy affordances such as pull quotes.
- ED-RG-076: Preserve `collection of linked loops` as central diagnosis.
- ED-RG-077: Public chronology: `I started with a loop` -> `I thought I'd designed the graph` -> `it turned out to be a collection of linked loops, some recursive and some with invalid end states`.
- ED-RG-078: Graph representation can still preserve loop-centric failure modes when termination, exits and recovery are not engineered first-class.
- ED-RG-079: Rebuild article around the causal sequence instead of patching old graph-first manuscript.
- ED-RG-080: Working title is `If you write a loop, don't be surprised when your agent starts looping`.
- ED-RG-081: Clarify once that linked loops remain graph topology; the engineering failure is termination, recovery, state semantics and lawful exits.
- ED-RG-082: Use direct Git receipts for Aug 2/Aug 4/Aug 8 chronology.
- ED-RG-083: Cut loops-to-graphs zeitgeist/Anthropic tangent, hook experiments and most detailed v2 topology from the body.
- ED-RG-084: Keep only three deliberate pull-quote opportunities: `Anyone can draw a graph. Engineering a graph-based workflow is hard.`, `Prose is a sign on the wall.`, and `Everything you asked for is fixed does not prove there is nothing else wrong.`
- ED-RG-085: Collapse v1 positives into decomposed attention, valid review packages and effort/aperture.
- ED-RG-086: Keep current-state honesty concise: useful today, but expect churn; observations are anecdotal, not benchmark metrics.
- ED-RG-087: Present v2 at principle level only. Leave stale-evidence invalidation visibly unresolved.
- ED-RG-088: End on proof rather than architecture. If the frontier reviewer still does most discovery work, iterative-review has not earned its purpose.
- ED-RG-089: New manuscript is approximately 2.4k words, intentionally cut from roughly 4.8k. Rejected/supporting material remains here or in the cross-article ledger.

## Cutting-room / cross-article material

- Unsubstantiated viral `Anthropic engineers shifted from loops to graphs` attribution. Keep only as evidence about folklore, not as a public Anthropic claim.
- AGENTS.md cross-harness scoping and Devin custom-subagent `allowed-tools` runtime mismatch. Better suited to an article about documentation versus observed environment truth.
- Hook-based capability gates. Adjacent future capability-control topic, not Review Graph v2.
- Broader `hoarding paid frontier capacity can be false economy` story is already pinned as CAT-011 in the cross-article ledger.

## Voice language worth preserving

- `hand administration of the graph to the graph`
- `the graph that's in place today is not trustworthy`
- `we can't make the final green review any stronger while the graph itself is the failure mode`
- `if your loop has loops in loops with diverging exit paths and onward paths, you don't have a loop, you have a badly designed graph`
- `I can ask the tool for the next node and it can leave me stranded`
- `prose is a sign on the wall`
- `if it pays rent`
- `a node just to do something mechanical doesn't deserve a node of its own`
- `expect churn`
- `make the fast fix fast review loop robust and boring`
- `no new findings occur can't be assumed from everything asked for previously is resolved`

## Editorial outcome

- Production article: `src/client/src/data/content/writing/2026-08-22-graph-iterative-review.md`
- Settled title: `If you write a loop, don't be surprised when your agent starts looping`.
- Final structure: original prose loop -> explicit graph -> mechanical/JIT authority -> linked-loop diagnosis -> workflow authority -> prose versus gates -> version-one strengths -> current churn -> version-two principles -> proof standard.
- The three deliberate pull quotes remain in the production article.
- The working manuscript, Cloud brief and local first pass were removed after their decisions were incorporated here and in the public article. This checkpoint and the cross-article ledger retain the material that has a future editorial use.
