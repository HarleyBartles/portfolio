Status: Cloud Sol working manuscript, reframed editorial draft, not publication-ready

# If you write a loop, don't be surprised when your agent starts looping

The first version of `iterative-review` was exactly what the title says: a multi-round subagent review loop. I was trying to make weaker models useful on review work I would normally reserve for a frontier model by decomposing the job into bounded passes. A strong reviewer looked at the branch, the orchestrator fixed its findings, a faster reviewer checked each fix, and any new finding sent the process back around again.

The [original design from 2 August](https://github.com/HarleyBartles/agent-asset-marketplace/blob/76606de92d53c09c8cdf836c50e867d0170470ae/.agents/specs/2026-08-02-iterative-review-design.md) spells it out in numbered prose. Step six says that if the fast reviewer raises another issue, fix it and return to step five. The [first implementation](https://github.com/HarleyBartles/agent-asset-marketplace/commit/50ef0dcc86fb43620af901627499c92e48cbf610) even opens by calling itself a "multi-round subagent review loop".

It worked well enough to expose its own shape. Review could contain review-fix-review loops, specialist passes, regression checks, escalation and a final whole-branch gate. Treating all of that as one loop left too much topology implicit in the orchestrator's head. At that point, calling it a loop stopped helping me reason about it. If your loop has loops in loops with diverging exit paths and onward paths, you don't have a loop. You have a badly designed graph.

So I built the graph.

## Anyone can draw a graph

On 4 August I replaced the round list with an explicit review state graph. The [commit says exactly that](https://github.com/HarleyBartles/agent-asset-marketplace/commit/550fa59d9f8401daaea5ce34d35abd954e64525c): "Replace round list with review state graph". Nodes represented things such as preflight, lens review, fixing, regression checking and final review. Edges described the conditions under which the workflow could move between them.

That was a real improvement. The workflow already had graph topology; drawing it made branching, repair paths and exits inspectable instead of asking the model to reconstruct them from a numbered procedure.

It was also easy to overestimate how much I had achieved.

> Anyone can draw a graph. Engineering a graph-based workflow is hard.

The first graph was still mostly something the agent was told to understand and follow. I had changed the representation without yet removing global workflow judgement from the model. The arrows were clearer, but they were still arrows painted on the wall.

The next step was to make the graph mechanically authoritative. On 8 August I added [`next_node.py`](https://github.com/HarleyBartles/agent-asset-marketplace/commit/8961cbf3662d18b3fdb82d27bae0eea98e8f5a7a), a deterministic router that returns the single allowed next node and refuses a proposed transition when the graph says it is illegal. The contract called the validator the "mechanical source of truth for the graph" and told the orchestrator not to override it.

Later that day I pushed the design further. The skill became a thin orchestrator: ask for the next node, open only that node's recipe, do the bounded work, then ask again. The [JIT traversal change](https://github.com/HarleyBartles/agent-asset-marketplace/commit/6215daae0abc4056184ce66b98b5b2cff7a2cc23) explicitly says not to read ahead.

That was the point where the graph had to stop merely looking correct and start being correct enough to trust.

## I had built a collection of linked loops

The purpose of JIT traversal is to stop a weaker model carrying the whole review process in context. I want its reasoning budget spent on the current review obligation, not on remembering every route it might need three states from now.

That only works if the agent can hand administration of the graph to the graph. Mine did not deserve that authority.

I could ask the routing tool for the next node and eventually end up stranded. Some paths could recurse. Some could terminate in states where the deterministic machinery no longer had a lawful continuation. Recovery depended on the agent doing the exact thing JIT traversal was designed to remove: stop trusting the local route, reconstruct the wider graph, work out what had gone wrong and improvise an escape.

Mathematically, of course, linked loops are still graph topology. The failure was not that I had secretly chosen the wrong data structure. I had made the topology explicit without engineering its termination, recovery and state transitions rigorously enough for it to own the workflow.

That distinction changed how I looked at the system. I started with a loop. After enough iteration I thought I had turned it into a graph. What I had actually built was a graph dominated by a collection of associated review loops, some recursive and some capable of ending badly.

Once the agent stopped compensating for that design with global reasoning, the graph failed more honestly.

## The graph has to deserve authority

I eventually asked a frontier model a deliberately uncomfortable question: if I give this workflow to a weaker agent and tell it to surrender global process reasoning to the graph, is the graph trustworthy enough to take over?

The answer was no.

The useful part of that audit was not the model's opinion by itself. Agent opinion is runtime observation, not authority. I checked the diagnosis back against the implementation and the replacement work. The failures were systemic enough that the current [version-two plan](https://github.com/HarleyBartles/agent-asset-marketplace/blob/70dd30e2e65fd8f7aa89796a1a037da14235dd2a/.agents/specs/2026-08-21-trustworthy-iterative-review-design.md) deliberately refuses to treat version-one state, reports or metrics as proof of a version-two green result.

The evidence kernel freezes concrete legacy states the replacement must reject. A supposedly final review can exist without the report needed to justify it. Resolution state can become circular. The old model can lose information needed to explain how it arrived somewhere or fail to represent a blocker cleanly. Those are not one bad edge. They are failures in the thing I was asking the weaker agent to trust as its global workflow authority.

The contract I want is much smaller than the graph itself. From any live state, the tooling should return one truthful, meaningful next action. If there is no safe continuation, it should return an honest `BLOCKED` state with enough durable evidence for a human or later run to understand why. There should not be a third mode where the agent has to reverse-engineer the graph and rescue it.

That problem comes before making the final green claim stronger. I cannot make `ready` mean more while the route to `ready` can itself be the failure mode.

## Prose is a sign on the wall

The history of this skill is also a fairly literal demonstration of one of my recurring rules for agentic systems.

> Prose is a sign on the wall.

The first review loop existed almost entirely in prose. The agent was told which round came next and when to go back. The first graph made the topology clearer, but the agent was still expected to understand and obey it. `next_node.py` moved one part of that authority into executable control flow. JIT node recipes went further by removing the expectation that the agent should understand the whole graph before acting.

Prose still has a job. It explains intent, tells the agent what judgement is expected and gives a human something readable to inspect. It is weak as a safety boundary. An agent can read "run preflight again after every fix", agree with it and then skip ahead anyway. A router can make that transition impossible.

The uncomfortable half of that principle is that code does not become correct merely because it can enforce itself. A hard gate that sends the agent into an invalid state is worse than a weak instruction because the consumer has been told it no longer needs to second-guess the gate.

That is the standard the next graph has to meet. It is not enough to encode the arrows. The arrows have to be lawful.

## The review machinery is still worth keeping

Two parts of the current skill are worth preserving: decomposed attention and an effort ladder.

A general reviewer asked to inspect an entire pull request will miss things that deliberately focused reviewers can find. A security reviewer, a skill-standards reviewer and a test-coverage reviewer are not valuable because three agents are automatically better than one. They are valuable because each gets a narrower question and can spend its attention inside that boundary.

Getting the boundary right is engineering work too. Suppose three skills changed alongside nineteen unrelated runbook and tooling files. Giving the skills reviewer the entire diff and writing "only review these three files" does not create a specialist review. It creates a general review with a polite request attached. Prose is a sign on the wall.

Blindly slicing the diff to those three files is not enough either. If one of the skills depends on a runbook whose contract changed in the same pull request, hiding that runbook from the reviewer makes the scope cleaner by removing evidence it needs to be correct.

The orchestrator therefore has to construct a review package that is narrow enough to preserve specialist attention and broad enough to include the dependencies needed for valid judgement. That is a harder problem than selecting a profile name.

The effort ladder follows the same principle. I use the strongest included model available to orchestrate the review and make the widest judgements. Narrower work can go to faster included reviewers when they are capable of answering the question. The final strong reviewer gets the broadest aperture and acts as the gatekeeper. The point is capability fit, not a ritual where every stage automatically escalates to a more expensive model.

That part of version one is worth preserving. The graph should make different review apertures and repair paths explicit without forcing the strongest reviewer to supervise every local fix.

## Useful today, but expect churn

I still use the current skill. I would recommend it with a warning attached: expect churn.

In my own use, the orchestrator commonly stops two or three times for me to clear an ambiguity. The final strong reviewer can end up being dispatched around five times before the pull request is clean. Those are observations from using the workflow, not benchmark results.

Some stops are legitimate. A real `BLOCKED` state should stop when the review reaches a judgement the available process cannot settle safely. Many of the interruptions I see today are not that. They are accidental ambiguity in the graph or a reasonable agent noticing that the workflow has consumed a large number of turns and checking whether it should continue.

That second case is useful evidence. A JIT graph can protect context and still waste enormous amounts of interaction if every piece of bookkeeping becomes another model-visible node. I now think a node has to pay rent in judgement. Deterministic state updates, ledger compilation and other mechanical administration should sit under the tool boundary or inside the recipe that needs them, not demand a conversational hop of their own.

The current graph remains useful because explicit state, specialist attention and bounded repair are better than asking one model to review until it feels done. It is not yet the trustworthy autonomous workflow I want it to be. The human is still part of its recovery mechanism.

## The next version has to earn fewer loops

I do not want to solve review churn by adding an arbitrary retry count and declaring success when the counter runs out. I want fewer loops because each expensive judgement produces a better contract for the cheaper work that follows it.

A specialist reviewer should finish its assigned review before anybody starts fixing. If it finds three issues, I want all three. Each finding should explain the defect and state what must become true for that finding to count as resolved. The reviewer owns the acceptance condition, not the implementation. An independent fixer can then choose how to satisfy it, and a separate fast reviewer can check that the condition is satisfied and that the repair did not introduce an obvious regression.

The same rule applies to the strongest reviewer. If `final-strong` fails a pull request, it should complete that pass and state everything it currently believes has to change. The fast fix and verification lane should then be robust and boring enough that the next strong pass is not spent supervising yesterday's repairs.

When the strong reviewer returns, it still has two independent responsibilities: verify that the findings from the previous pass are resolved, and review the whole change again for anything new.

> Everything you asked for is fixed does not prove there is nothing else wrong.

That is why the final strong gate stays independent. Earlier reviewers are there to make that broad review uneventful, not to tell it what conclusion to reach.

There are still unresolved design questions. A later fix can stale evidence from an earlier lens, for example, and I have not yet decided exactly when that should reopen prior review. I would rather leave that boundary visible than invent a neat answer for the article.

## How I will know it works

The replacement graph is not finished when its diagram looks cleaner. The skill has to prove that the decomposition is buying useful review quality.

There are two tests I care about. The controlled one is a benchmark against a stable frontier-reference defect set: supported weaker-model and reviewer combinations should repeatedly find the defects they are supposed to find without producing false green results. Any escape gets an independent frontier audit rather than a convenient explanation.

The practical test is simpler. I raise pull requests through the weaker-model iterative-review workflow, then hand the result to an independent frontier reviewer outside the graph. It is fine if that reviewer catches something the graph missed. What I do not want is to spend the scarce frontier reviewer on the same fix-review-fix loop the graph was built to absorb.

If the frontier reviewer is still doing most of the discovery work, iterative-review has not earned its purpose. If it mostly acts as an independent final audit, the weaker route is doing useful engineering work rather than merely generating review activity.

I started with a loop because it was the simplest version of the workflow I wanted. It accumulated enough branching review, repair and exit behaviour that I had to make the graph explicit. Then I made the graph drive its own traversal and discovered that explicit topology was only the start of the job.

The next version has a harder standard. The agent should be able to stop thinking about the topology, ask what comes next and trust the answer. Until it can, I have a graph. I do not yet have a trustworthy graph-based workflow.
