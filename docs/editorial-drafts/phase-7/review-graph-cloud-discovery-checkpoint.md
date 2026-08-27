# Review graph: Cloud discovery checkpoint

Status: active editorial-room memory for the draft PR

This file is the durable answer ledger for Cloud Sol's conversation with Harley. Append to it during discovery. Do not rewrite an earlier answer merely because the manuscript changes. If later evidence corrects an entry, add a dated correction that points back to the earlier item.

## Session clock

- Started at: `2026-08-27T06:23:00Z`
- Target stop: `2026-08-27T09:23:00Z`
- Hard stop: `2026-08-27T11:23:00Z`
- Last durable save: `2026-08-27T06:30:56Z`
- Current manuscript commit: baseline `da85903012fbf115a01b75f8e44c836611fb6866`; Cloud manuscript still placeholder at this checkpoint save

The hard stop is binding. At five hours, stop asking questions and write the best honest baton status the evidence supports.

## Settled editorial frame

- Candidate: `graph-iterative-review`.
- Governing story, revised by Cloud discovery: Harley built the review graph so a weaker model could traverse an explicit review process without having to reason globally like a frontier model. JIT node execution only works if the graph itself is trustworthy enough for the agent to hand process administration over to it. The current version has not earned that trust.
- The article should therefore establish process-authority trust before the later question of what a completion claim such as `reviewed-green` would need to prove.
- Required progression: why weaker models needed stronger process scaffolding; why whole-graph comprehension failed; why deterministic next-node/JIT recipes were the correction; why that correction makes graph trustworthiness load-bearing; what the current graph still gets wrong; what the accepted replacement design proposes; what has and has not landed.
- Audience test: a weary hiring manager should quickly see conventional engineering judgement applied to an agentic system. A cynical architect should be able to trace the correction, disagree with choices and still accept the honesty of the claim.
- Authority: Harley owns experience, meaning, privacy, voice and admission. Repository evidence owns implementation state. A plan proves intent, not delivered behaviour.

## Answered questions

### RG-A001

- Question: Why did Harley build the iterative-review skill and graph in the first place?
- Harley's answer: The purpose was to let inferior models reason their way through to a frontier-level review. A frontier model can be trusted to self-review; a lesser model cannot, so the weaker model needs more explicit process support.
- Editorial consequence: Open with the capability gap and the engineering response, not graph anatomy. The graph is compensating structure for a weaker orchestrator, not a universal recommendation for every review.
- Evidence class: first-party account; public Marketplace skill currently corroborates that the legacy workflow is for non-frontier orchestrators and excludes Sol/frontier models.
- Public boundary: Do not claim equivalence to frontier review quality as a delivered or benchmarked result. Harley's intended purpose and the future design's detection-sensitivity goal are distinct from proven current performance.
- Related manuscript section: opening / why the graph exists.
- Reopened later: no

### RG-A002

- Question: What failed in the first version of the graph?
- Harley's answer: The first version asked the agent to understand the graph before traversal and overwhelmed it. The next iteration added deterministic node and recipe tooling so the agent could be discouraged from reading the whole graph and instead run the next node and read its recipe just in time.
- Editorial consequence: The key design progression is whole-process comprehension -> deterministic next-node authority -> JIT local reasoning. This is a stronger and more concrete origin story than the provisional “checklist was a menu” opening alone.
- Evidence class: first-party account; current public skill corroborates the JIT one-node-at-a-time contract and warns against reading the graph ahead of time.
- Public boundary: Do not infer a specific model, benchmark result or quantified failure rate unless later supplied and approved.
- Related manuscript section: origin / JIT correction.
- Reopened later: no

### RG-A003

- Question: What made Harley question the graph's trustworthiness?
- Harley's answer: Letting an agent run autonomously through a graph while reading each node JIT inherently requires the graph itself to be fully trustworthy. The agent is meant to hand administration of the graph to the graph and focus on the current node without worrying about global control flow. The graph in place today is not trustworthy: in Harley's account it lies in places, contains dead ends that cannot be automatically recovered from and contains loops that can recurse. Harley asked a frontier agent, Sol, to assess the graph and skill for trustworthiness and got a decisive “not trustworthy” if the agent hands the process off to the graph; at some point the agent will get stuck and have to reason globally about the graph again.
- Editorial consequence: This is the first decisive failure. The problem is not merely an overclaim at `ready`; the architecture violates the premise that made JIT traversal useful. The manuscript should make that causal chain explicit before moving to green/evidence semantics.
- Evidence class: first-party account, with public accepted design already corroborating executable contradictions including circular/non-terminating routes and skippable evidence-producing nodes.
- Public boundary: “lies in places” is valuable Harley-language but remains shorthand until tied to a concrete public example. Do not invent the Sol audit transcript or quote it beyond Harley's account unless a publishable artifact is identified.
- Related manuscript section: trust failure / pivot to replacement design.
- Reopened later: no

## Editorial decisions

- ED-RG-001: The provisional first-pass thesis “a disciplined route does not prove coverage” is valid but too late in the causal chain to govern the opening. The more fundamental article argument is that JIT delegation of process control requires a trustworthy process authority.
- ED-RG-002: Keep frontier vs weaker-model economics/capability explicit because it explains why this machinery exists at all. Avoid turning “inferior” into a universal model ranking claim; use it in Harley's intended comparative sense within this review task.
- ED-RG-003: Preserve the phrase “hand administration of the graph to the graph” as a voice anchor. It expresses the intended architectural boundary cleanly.

## Corrections and anti-inferences

- Do not say the planned version-two trust kernel is implemented. Marketplace `main` currently publishes the approved design, seven-plan roadmap and first implementation plan; the legacy skill remains the live implementation.
- Do not let the legacy graph's `ready` state imply `reviewed-green`.
- Do not infer exhaustive coverage from a matched lens set, a final reviewer or internally consistent ledgers.
- Do not turn cost-conscious use of weaker agents into a claim that cheaper models are categorically better reviewers.
- Do not invent a triggering production incident. The trigger identified so far is an architectural trust audit by Sol following practical iteration on the graph.
- Do not use plan detail as public implementation evidence.
- Do not collapse “the graph is not trustworthy as process authority” into “the review missed a defect”. No concrete missed production defect has been claimed.
- Do not publish “the graph lies” as a factual implementation description until a specific public example makes the meaning precise.

## Unresolved questions

1. After Sol's “not trustworthy” assessment, did Harley initially set out to repair the graph so weaker agents could safely surrender global control, or did the work immediately broaden into defining what a trustworthy `reviewed-green` claim itself would require?
2. What did version one solve well enough that it deserves to survive the critique beyond the JIT traversal mechanism itself?
3. Which concrete current contradiction, dead end or recursive route best demonstrates the trust failure without turning the article into graph archaeology?
4. Why replace the authority model rather than keep patching the router?
5. What part of the version-two design is Harley's strongest engineering judgement, and what part remains most uncertain?
6. What should the hiring manager understand about Harley after reading this that the Provisioning article doesn't already establish?
7. Which additional voice anchors, jokes, irritations or metaphors are unmistakably Harley and worth preserving?
8. What must remain private, qualified or explicitly unknown?

## Voice language worth preserving

- “hand administration of the graph to the graph”
- “the graph that's in place today is not trustworthy”
- “it lies in places” (hold for a concrete example before public use)
- frontier model can self-review; lesser model needs scaffolding strong enough that it does not have to reason globally about the review process

## Cutting-room material from this article

Record valuable material that does not serve the final governing argument here rather than deleting it from editorial memory.

No Review Graph cuttings recorded yet.

## Baton status

Current status: discovery active

At the hard stop, replace this with exactly one of:

- `Ready for local production` and the settled argument, factual boundary and manuscript path;
- `Needs one named fact` and the single fact still required; or
- `Not yet publishable` and the honest editorial reason.
