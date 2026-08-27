# Review graph: Cloud discovery checkpoint

Status: active editorial-room memory for the draft PR

This file is the durable answer ledger for Cloud Sol's conversation with Harley. Append to it during discovery. Do not rewrite an earlier answer merely because the manuscript changes. If later evidence corrects an entry, add a dated correction that points back to the earlier item.

## Session clock

- Started at: `2026-08-27T06:23:00Z`
- Target stop: `2026-08-27T09:23:00Z`
- Hard stop: `2026-08-27T11:23:00Z`
- Last durable save: `2026-08-27T07:02:53Z`
- Current manuscript commit: `8124193b4cc88928ee24ecb00241b42f5ccf26dc`

The hard stop is binding. At five hours, stop asking questions and write the best honest baton status the evidence supports.

## Settled editorial frame

- Candidate: `graph-iterative-review`.
- Governing story: Harley built the review graph so a weaker model could traverse an explicit review process without having to reason globally like a frontier model. JIT node execution only works if the graph itself is trustworthy enough for the agent to hand process administration over to it. The current version has not earned that trust.
- The primary problem is trust in global workflow state and control. The later problem of what `reviewed-green` should prove is real but secondary: strengthening the final completion claim is premature while the graph itself can still become the failure mode.
- Required progression: why weaker models needed stronger process scaffolding; why whole-graph comprehension failed; why deterministic next-node/JIT recipes were the correction; why that correction makes graph trustworthiness load-bearing; what the current graph still gets wrong; how version two first repairs workflow authority and state; only then, how it strengthens the eventual green claim; what has and has not landed.
- Audience test: a weary hiring manager should quickly see conventional engineering judgement applied to an agentic system. A cynical architect should be able to trace the correction, disagree with choices and still accept the honesty of the claim.
- Authority: Harley owns experience, meaning, privacy, voice and admission. Repository evidence owns implementation state. A plan proves intent, not delivered behaviour.

## Answered questions

### RG-A001
- Question: Why did Harley build the iterative-review skill and graph in the first place?
- Harley's answer: The purpose was to let inferior models reason their way through to a frontier-level review. A frontier model can be trusted to self-review; a lesser model cannot, so the weaker model needs more explicit process support.
- Editorial consequence: Open with the capability gap and the engineering response, not graph anatomy. The graph is compensating structure for a weaker orchestrator, not a universal recommendation for every review.
- Evidence class: first-party account; public Marketplace skill currently corroborates that the legacy workflow is for non-frontier orchestrators and excludes Sol/frontier models.
- Public boundary: Do not claim equivalence to frontier review quality as a delivered or benchmarked result. Harley's intended purpose and the future design's detection-sensitivity goal are distinct from proven current performance.
- Reopened later: no

### RG-A002
- Question: What failed in the first version of the graph?
- Harley's answer: The first version asked the agent to understand the graph before traversal and overwhelmed it. The next iteration added deterministic node and recipe tooling so the agent could be discouraged from reading the whole graph and instead run the next node and read its recipe just in time.
- Editorial consequence: The key design progression is whole-process comprehension -> deterministic next-node authority -> JIT local reasoning.
- Evidence class: first-party account; current public skill corroborates the JIT one-node-at-a-time contract and warns against reading the graph ahead of time.
- Reopened later: no

### RG-A003
- Question: What made Harley question the graph's trustworthiness?
- Harley's answer: Letting an agent run autonomously through a graph while reading each node JIT inherently requires the graph itself to be fully trustworthy. The agent is meant to hand administration of the graph to the graph and focus on the current node without worrying about global control flow. The graph in place today is not trustworthy: in Harley's account it lies in places, contains dead ends that cannot be automatically recovered from and contains loops that can recurse. Harley asked a frontier agent, Sol, to assess the graph and skill for trustworthiness and got a decisive “not trustworthy” if the agent hands the process off to the graph; at some point the agent will get stuck and have to reason globally about the graph again.
- Editorial consequence: This is the first decisive failure. The problem is not merely an overclaim at `ready`; the architecture violates the premise that made JIT traversal useful.
- Evidence class: first-party account, with public accepted design corroborating executable contradictions including circular/non-terminating routes and skippable evidence-producing nodes.
- Reopened later: no

### RG-A004
- Question: After the trust audit, was the primary correction about repairing graph control or immediately about proving a stronger final green?
- Harley's answer: Trust and global workflow state are the main problem. The fact that the current graph may not prove green is secondary, though still real. There is no point trying to make the final green review stronger while the graph itself is the failure mode.
- Editorial consequence: Keep process-authority trust before completion-authority trust.
- Evidence class: first-party engineering judgement, corroborated by the accepted design.
- Reopened later: no

### RG-A005
- Question: What is the positive case for graphs, and how should the current graph-engineering zeitgeist appear in the article?
- Harley's answer: A graph is an excellent way to route an agent through complex work. The unstated hiring signal is that graph engineering is newly prominent, with practitioner opinion moving extremely quickly from loops toward graphs. Harley likely absorbed a viral misattribution claiming Anthropic engineers had announced this shift; fact-checking did not substantiate that attribution. The article must not launder it into truth. Instead it may point to the wider, very fast-moving discussion while framing Harley's decision as: he read about graphs, identified a concrete place where one solved a real control problem, and did not blindly jump on a bandwagon.
- Editorial consequence: Keep novelty as context, never as proof.
- Evidence class: first-party account + externally verified chronology/discussion.
- Public boundary: distinguish verified Anthropic loop-engineering publication from later practitioner graph discussion; do not attribute a graph-engineering proclamation to Anthropic without a primary source.
- Reopened later: no

### RG-A006
- Question: What makes this review structurally wrong as a loop?
- Harley's answer: Once a loop contains loops inside loops, diverging exit paths and different onward paths, it is no longer usefully a loop. It is a badly designed graph. The review needs branching decisions such as repair, re-preflight, bounded re-review, regression review, escalation and stop. Keeping that inside a nominal loop leaves the topology implicit and makes the weaker model reconstruct global state and routing decisions itself.
- Editorial consequence: The graph is not extra ceremony laid over a loop. It makes an already graph-shaped problem explicit.
- Evidence class: first-party engineering judgement; current implementation can corroborate multiple branch/recovery/terminal routes.
- Public boundary: Present this as Harley's design judgement about this workflow, not a universal claim that loops are obsolete.
- Reopened later: no

### RG-A007
- Question: What does Sol's replacement plan say is concretely wrong with the current graph?
- Harley's direction: Use the Marketplace replacement roadmap/Plan 1 written by the same Sol that performed the trust audit as the comprehensive evidence source for today's failings rather than asking Harley to reconstruct them from memory.
- Repository evidence at pinned Marketplace revision `70dd30e2e65fd8f7aa89796a1a037da14235dd2a`: Plan 1 explicitly characterizes version-one defects as regression fixtures, including `final_strong_without_report`, `circular_resolution_state`, `cumulative_preflight_state`, `lost_normalization_origin`, `blocked_state`, `round_state`, and `unrepresentable_blocker`. The roadmap requires version-one state/reports/metrics to remain non-authoritative for version two and keeps the legacy skill human-opt-in until Plan 7 cutover.
- Editorial consequence: The public plan demonstrates that the problem is systemic: the legacy state model can represent contradictory, circular, lossy or unrecoverable workflow states. Use two or three examples in prose, not the whole defect catalogue.
- Evidence class: public repository plan at pinned revision, plus Harley's first-party identification of this plan as the output of Sol's trust assessment.
- Public boundary: The plan is accepted future work, not implemented repair.
- Reopened later: no

### RG-A008
- Question: Why did Harley trust Sol's audit enough to let it reshape the graph, and what broader engineering method does that represent?
- Harley's answer: A large part of his confidence in agentic-engineering changes comes from explicitly asking for the agent's honest opinion of the environment and workflow it has to operate in. Documentation describes intended behavior, but an agent actually using the surface can expose materially different runtime truth. He has seen this twice elsewhere: `AGENTS.md` scoping assumptions that work well in Codex can behave harmfully when carried over to Devin, and Devin's documented `allowed-tools` behavior for custom subagent profiles has not matched observed reality, with the only reliably observed workaround broadening inherited tool access in an inherently unsafe way. The analogy is learning to drive: a book can teach the rules, but you cannot learn how the car actually behaves without driving it. Sometimes the agent operating inside the environment is the only useful observer of whether a change helps or hinders it.
- Editorial consequence: The Sol audit is not an appeal to model authority or taste. It is an empirical runtime probe of the system from the perspective of the component that must consume it.
- Evidence class: first-party engineering practice. The AGENTS.md and Devin examples require exact source/observation custody before public use.
- Public boundary: Do not imply an agent's opinion is automatically correct or higher authority than documentation. Do not publish the Devin workaround as recommendation.
- Reopened later: no

### RG-A009
- Question: What is the most important concrete failure in the current graph?
- Harley's answer: The load-bearing failure is simple and observable: the agent can ask the deterministic tooling for the next node and the tool can return a route that leaves the agent stranded. That is a predictable failure of the graph's authority contract, not a vague concern about review quality. Because the whole JIT design exists to let the weaker agent stop reasoning globally about workflow state, any state from which deterministic traversal cannot continue safely defeats the architecture.
- Editorial consequence: Make this the concrete hinge of the article.
- Evidence class: first-party engineering judgement, corroborated by the pinned Plan 1 regression catalogue.
- Public boundary: Do not imply every traversal strands the agent. The claim is that the current authority permits predictable stranded states.
- Reopened later: no

### RG-A010
- Question: What exact contract must JIT traversal satisfy so the weaker agent never has to reason globally about the graph?
- Harley's answer: First, if the agent has to understand the whole graph before following it, the graph itself creates context overload before review begins. Second, because the agent cannot carry the whole graph, it needs deterministic next-node tooling plus JIT recipes; a rule like "sometimes read ahead" is an unacceptable escape hatch because it reintroduces global reasoning unpredictably. Third, given those first two constraints, the graph may have no dead ends except legitimate `BLOCKED` exits. If the tool cannot return a truthful next node that moves the review meaningfully forward, the agent is forced to inspect outside its current node and verify the router, breaking the architecture.
- Editorial consequence: State the replacement contract as a closed choice: the tool returns one lawful executable next action, or it returns an honest `BLOCKED` terminal with enough durable state for safe handoff/resume. There is no third "work it out" mode.
- Evidence class: first-party engineering judgement, corroborated by the accepted version-two design's fail-closed state model and blocker semantics.
- Public boundary: Do not claim version two already satisfies this contract. It is the accepted target design; the legacy graph still violates it.
- Reopened later: no

## Editorial decisions

- ED-RG-001: The provisional first-pass thesis “a disciplined route does not prove coverage” is valid but too late in the causal chain to govern the opening. JIT delegation of process control requires a trustworthy process authority.
- ED-RG-002: Keep frontier vs weaker-model capability explicit because it explains why this machinery exists at all.
- ED-RG-003: Preserve “hand administration of the graph to the graph” as a voice anchor.
- ED-RG-004: Treat graph/process trust and final-green trust as two ordered layers.
- ED-RG-005: Do not sell graph engineering through novelty. Use the rapid loop-to-graph discourse shift only as context.
- ED-RG-006: Preserve the correction itself as evidence discipline: a viral “Anthropic engineers say” attribution did not survive source checking.
- ED-RG-007: Treat “a loop with nested loops, diverging exits and onward paths is a badly designed graph” as a voice anchor and structural explanation.
- ED-RG-008: Prefer the public Plan 1 defect catalogue over the phrase “the graph lies” in public prose.
- ED-RG-009: Use systemic state failures as the bridge into version two: this is not one bad edge to patch, but evidence that the authority model is too weak.
- ED-RG-010: Keep legacy dead-route/state defects distinct from false-green defects.
- ED-RG-011: Frame “what is your honest agent's opinion?” as a diagnostic instrument, not deference to the model.
- ED-RG-012: Keep AGENTS.md/Devin examples as supporting context or cross-article material unless they earn a short paragraph.
- ED-RG-013: Preserve the driving analogy in some form.
- ED-RG-014: Use “I can ask the tool for the next node and it can leave me stranded” as the clearest statement of the legacy graph's trust failure.
- ED-RG-015: The primary version-two acceptance question is whether the workflow authority can always return a lawful recoverable next state or fail closed.
- ED-RG-016: The causal chain is settled: whole-graph comprehension causes context overload; JIT traversal removes that burden; therefore deterministic routing must be complete and truthful for every non-terminal state.
- ED-RG-017: Reject “sometimes read ahead” explicitly.
- ED-RG-018: Define legitimate terminal failure narrowly as `BLOCKED`. Any other dead end is a defect in workflow authority.

## Corrections and anti-inferences

- Do not say the planned version-two trust kernel is implemented. Marketplace `main` currently publishes the approved design, seven-plan roadmap and first implementation plan; the legacy skill remains the live implementation.
- Do not let the legacy graph's `ready` state imply `reviewed-green`.
- Do not infer exhaustive coverage from a matched lens set, a final reviewer or internally consistent ledgers.
- Do not turn cost-conscious use of weaker agents into a claim that cheaper models are categorically better reviewers.
- Do not invent a triggering production incident. The trigger identified is an architectural trust audit by Sol following practical iteration on the graph.
- Do not use plan detail as public implementation evidence.
- Do not collapse “the graph is not trustworthy as process authority” into “the review missed a defect”. No concrete missed production defect has been claimed.
- Do not publish “the graph lies” without unpacking it into public evidence.
- Do not lead with coverage, evidence provenance or snapshot identity as though they caused the redesign. They are real completion-trust concerns, but global workflow trust is the primary failure.

## Unresolved questions

1. What version-one properties beyond JIT traversal are worth keeping?
2. What should the hiring manager understand about Harley after reading this that the Provisioning article doesn't already establish?
3. Which additional voice anchors, jokes, irritations or metaphors are worth preserving?
4. What must remain private, qualified or explicitly unknown?
5. Which version-two features are essential to the workflow-authority contract versus later completion-trust improvements?

## Voice language worth preserving

- “hand administration of the graph to the graph”
- “the graph that's in place today is not trustworthy”
- “it lies in places” (hold for a concrete example before public use)
- “we can't make the final green review any stronger while the graph itself is the failure mode”
- “if your loop has loops in loops with diverging exit paths and onward paths, you don't have a loop, you have a badly designed graph”
- “I can ask the tool for the next node and it can leave me stranded”
- “sometimes read ahead is shit” (voice anchor; likely soften for public copy while preserving the judgement)

## Cutting-room material from this article

- The unsubstantiated viral “Anthropic engineers shifted from loops to graphs” attribution is useful evidence about how quickly agentic-engineering folklore can harden into apparent fact. Do not publish it as an Anthropic claim.
- AGENTS.md cross-harness scoping and Devin custom-subagent `allowed-tools` behavior may belong in a future article about documentation versus observed agent environment truth. Keep the unsafe workaround out of recommendation copy.

## Baton status

Current status: discovery active

At the hard stop, replace this with exactly one of:
- `Ready for local production` and the settled argument, factual boundary and manuscript path;
- `Needs one named fact` and the single fact still required; or
- `Not yet publishable` and the honest editorial reason.
