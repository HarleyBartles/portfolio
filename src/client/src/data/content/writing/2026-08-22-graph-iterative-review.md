---
title: If you write a loop, don't be surprised when your agent starts looping
date: 2026-08-22
summary: A review graph can guide agents through complex work. Mine exposed the harder job: making the graph trustworthy enough to own the route.
---

# If you write a loop, don't be surprised when your agent starts looping

The first version of `iterative-review` was exactly what the title says: a multi-round subagent review loop. I was trying to make weaker models capable of review work I'd normally reserve for a frontier model by decomposing the job into bounded passes. A strong reviewer looked at the branch, the orchestrator fixed its findings, a faster reviewer checked each fix, and any new finding sent the process back around again.

The [original design](https://github.com/HarleyBartles/agent-asset-marketplace/blob/76606de92d53c09c8cdf836c50e867d0170470ae/.agents/specs/2026-08-02-iterative-review-design.md) spells it out in numbered prose. Step six says that if the fast reviewer raises another issue, fix it and return to step five. The [first implementation](https://github.com/HarleyBartles/agent-asset-marketplace/commit/50ef0dcc86fb43620af901627499c92e48cbf610) even opens by calling itself a "multi-round subagent review loop".

It worked well enough to expose its own shape. Review could contain review-fix-review loops, specialist passes, regression checks, escalation and a final whole-branch gate. Treating all of that as one loop left too much topology implicit in the orchestrator's head. At that point, calling it a loop stopped helping me reason about it. If your loop has loops in loops with diverging exit paths and onward paths, you don't have a loop. You have a badly designed graph.

So I built the graph.

## A diagram is only the start

A couple of days later I'd replaced the round list with an explicit review state graph. The [commit says exactly that](https://github.com/HarleyBartles/agent-asset-marketplace/commit/550fa59d9f8401daaea5ce34d35abd954e64525c): "Replace round list with review state graph". Nodes represented preflight, lens review, fixing, regression checking and final review. Edges described when the workflow could move between them.

Drawing it made branching, repair paths and exits inspectable instead of asking the model to reconstruct them from a numbered procedure. It also made the workflow look more engineered than it was.

> Anybody can draw a graph, but nobody wants to do the hard bit and engineer a workflow. I will.

That was the work I had set myself. The first graph was still mostly something the agent was told to understand and follow. I'd changed the representation without removing global workflow judgement from the model. The arrows were clearer, but they were still arrows painted on the wall, plus a handwritten note to the agent saying: follow the arrows.

A few iterations later I added [`next_node.py`](https://github.com/HarleyBartles/agent-asset-marketplace/commit/8961cbf3662d18b3fdb82d27bae0eea98e8f5a7a), a deterministic router that returns the single allowed next node and refuses a proposed transition when the graph says it's illegal. The contract called the validator the "mechanical source of truth for the graph" and put a sign on the wall next to the override button saying "don't press this button".

Not long after that, the skill became a thin orchestrator: ask for the next node, open only that node's recipe, do the bounded work, then ask again. The [JIT traversal change](https://github.com/HarleyBartles/agent-asset-marketplace/commit/6215daae0abc4056184ce66b98b5b2cff7a2cc23) explicitly says not to read ahead. The machine had got better; beside it was another strongly worded sign saying "don't read past this point".

Once the agent was told not to read ahead, a wrong transition stopped being something it could quietly compensate for. The graph itself had to be right.

The contract was simple enough to state. From any live state, the tooling should return one lawful next action that advances the review. If there's no safe continuation, it should return an honest `BLOCKED` state with enough durable evidence for a human or later run to understand why. There shouldn't be a third mode where the agent has to reverse-engineer the graph and rescue it.

I can't make `ready` mean more while the route to `ready` can strand the agent.

## I'd built a collection of linked loops

JIT traversal is supposed to stop a weaker model carrying the whole review process in context. I want its reasoning budget spent on the current review obligation, not on remembering every route it might need three states from now.

That only works if the agent can hand administration of the graph to the graph. Mine didn't deserve that authority.

I could ask the routing tool for the next node and eventually end up stranded. Some paths could recurse. Some could terminate in states where the deterministic machinery no longer had a lawful continuation. Recovery depended on the agent doing the exact thing JIT traversal was meant to remove: stop trusting the local route, reconstruct the wider graph, work out what had gone wrong and improvise an escape.

Mathematically, linked loops are still graph topology. The failure wasn't that I'd secretly chosen the wrong data structure. I'd made the topology explicit without engineering its termination, recovery and state transitions rigorously enough for it to own the workflow.

I started with a loop. After enough iteration I thought I'd turned it into a graph. What I'd actually built was a graph dominated by linked review loops, some recursive and some capable of ending badly.

Once the agent stopped compensating for that design with global reasoning, the graph failed more honestly.

## The graph has to deserve authority

I eventually asked a frontier model a deliberately uncomfortable question: if I give this workflow to a weaker agent and tell it to surrender global process reasoning to the graph, is the graph trustworthy enough to take over?

The answer was no.

I didn't treat the model's answer as authority. I treated it as a runtime observation and checked the diagnosis against the implementation and the replacement work. The failures were systemic enough that the current [version-two plan](https://github.com/HarleyBartles/agent-asset-marketplace/blob/70dd30e2e65fd8f7aa89796a1a037da14235dd2a/.agents/specs/2026-08-21-trustworthy-iterative-review-design.md) refuses to treat version-one state, reports or metrics as proof of a version-two green result.

The replacement tests preserve concrete legacy states it must reject. A supposedly final review can exist without the report needed to justify it. Resolution state can become circular. The old model can lose information needed to explain how it arrived somewhere or fail to represent a blocker cleanly. Those aren't cosmetic defects in a diagram. They're failures in the thing I was asking the weaker agent to trust.

## Where authority lives

The skill's history demonstrates one of my recurring rules for agentic systems.

> Prose is a sign on the wall.

The first review loop existed almost entirely in prose. The first graph made the topology clearer, but the agent was still expected to understand and obey it. `next_node.py` moved routing authority into executable control flow. JIT recipes went further by removing the expectation that the agent should understand the whole graph before acting.

Prose is useful for intent and judgement. It's weak as a safety boundary. An agent can read "run preflight again after every fix", agree with it and then skip ahead anyway. A router can make that transition impossible.

Executable control creates a nastier failure when it's wrong. A hard gate that sends the agent into an invalid state is worse than a weak instruction because the consumer has been told it no longer needs to second-guess the gate.

Every permitted transition in the next graph has to be lawful, not merely encoded.

## Why I still use it

The current skill still earns its keep through decomposed attention and an effort ladder. A general reviewer asked to inspect an entire pull request will miss things that focused reviewers can find. A security reviewer, a skill-standards reviewer and a test-coverage reviewer each get a narrower question and can spend their attention inside that boundary. Three reviewers aren't automatically better than one; each reviewer sees less and looks harder at what remains.

The boundary itself can make the specialist wrong. Suppose three skills changed alongside nineteen unrelated runbook and tooling files. Handing the skills reviewer the whole diff with "only review these three files" gives it a general review package and asks it to ignore most of it. Blindly slicing the diff to those three files creates the opposite problem: if one skill depends on a runbook whose contract changed in the same pull request, hiding that runbook gives the reviewer a cleaner scope and worse evidence. The orchestrator has to build a review package narrow enough to preserve attention and broad enough to include the dependencies needed for a valid judgement.

I also don't want every question escalated to the strongest model available. Narrow, cheap checks should stay narrow and cheap. The strongest included model gets the widest judgement calls and the final broad pass; the model tier follows the job. I still use version one, but the churn is hard to miss. In my own runs, I commonly have to clear two or three ambiguities, and the final strong reviewer can come back around five times before the pull request is clean. Those aren't benchmark numbers. They're the shape of using it.

Some stops are legitimate. Many aren't. A JIT graph can save context and still burn interaction if every ledger update and state change becomes another model-visible hop. I now think a node has to pay rent in judgement. Mechanical administration belongs under the tool boundary, not in the conversation just because the graph can draw a box around it.

## The next version has to earn fewer loops

I don't want to fix churn by adding a retry counter and declaring success when it runs out. I want fewer loops because each expensive judgement leaves the cheaper work with a better contract.

A specialist should finish its review before anybody starts fixing. If it finds three issues, I want all three. Each finding should say what's wrong and what must become true for it to count as resolved. The reviewer defines the bar; the fixer chooses the implementation. A separate cheaper reviewer can then check that the bar was met and that the repair didn't break something nearby.

The same applies to the strongest reviewer. If the final pass fails, it should finish the pass and say everything it currently thinks has to change. Repair should happen afterward. When the strong reviewer comes back, it has two different jobs: confirm the previous findings are actually resolved and review the whole change again for anything new.

> Everything you asked for is fixed doesn't prove there's nothing else wrong.

The final reviewer stays independent so fixing known findings can't pre-decide the outcome. The earlier machinery should make that review boring, not tell it what answer to give.

One hard edge is still open: a later fix can stale evidence from an earlier specialist review, and I haven't decided exactly when that should force the earlier review to reopen. I'd rather leave the problem visible than manufacture a tidy answer for the article.

## The proof has to be stronger than the diagram

A cleaner diagram won't prove anything. The weaker routes I actually support have to catch the defects they're responsible for without producing false greens.

One test is controlled: give those routes a fixed set of defects identified by a frontier reviewer and see whether they repeatedly catch what they're supposed to catch. Anything that escapes gets an independent frontier audit, not a convenient explanation.

The other test is ordinary use. I raise pull requests through the weaker-model review workflow, then hand the result to an independent frontier reviewer outside the graph. It's fine if that reviewer still finds something. What I don't want is to spend the scarce frontier pass on the same discovery-fix-review loop the graph was built to absorb.

If the frontier reviewer is still doing most of the discovery work, `iterative-review` hasn't earned its purpose. If it mostly acts as an independent final audit, the weaker route is doing the work I built it to do.

I started with a loop because it was the simplest version of the workflow I wanted. It accumulated enough branching review, repair and exit behaviour that I had to make the graph explicit. Then I made the graph drive its own traversal and discovered that explicit topology was only the start of the job.

The agent should be able to stop thinking about the topology, ask what comes next and trust the answer. Until it can, I have a graph. I don't yet have a trustworthy graph-based workflow.
