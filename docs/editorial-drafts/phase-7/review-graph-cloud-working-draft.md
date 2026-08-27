Status: Cloud Sol working manuscript, discovery draft

# The review graph has to be more trustworthy than the model using it

I built the iterative review graph for models I don't trust to review a pull request the way I trust a frontier model to.

A frontier model can usually hold the whole change in its head, challenge its own assumptions and decide what to inspect next. A weaker model needs more structure. The point of the graph was to supply enough of that structure that a cheaper or less capable agent could reason its way through a serious review without having to improvise the whole process.

The first version failed by asking too much of the model at once. It had to understand the graph before traversing it. That defeated the point. The model was already the weaker component; making it carry the whole control-flow model in context just moved the hard problem back into the agent.

The next iteration made the graph operational rather than descriptive. A deterministic router tells the agent the one legal next node. The agent opens one node recipe, does that job, records the result and asks the router what comes next. It is deliberately discouraged from reading the whole graph up front.

That gave me the architectural boundary I actually wanted: let the agent reason locally and hand administration of the graph to the graph.

And that boundary creates a much stricter requirement than I first appreciated. If the agent is supposed to stop thinking globally about the workflow, the workflow has to be more trustworthy than the agent using it.

The graph that's in place today isn't.

It has routes that don't tell the truth about what can happen next. It has states that can strand the agent without an automatic recovery path. It has loops that can recurse. I asked a frontier model to audit the skill on one narrow question: if a weaker agent genuinely hands global control to this graph and only reasons about each node just in time, can it trust the graph to get it through the review without having to reconstruct the workflow itself?

The answer was no.

That is the first problem version two has to solve. The current graph may also be too weak to justify a strong final `green` claim. Coverage can be incomplete. Evidence can be stale or weakly bound. Independence and provenance can be ambiguous. Those are real defects in a trustworthy review system.

But they are downstream defects. There is no point making the final green review stronger while the graph itself is still a failure mode.

## Local reasoning needs a trustworthy global authority

The useful part of the current design is still the separation between local work and global workflow state.

The agent should not have to decide whether a repair routes back through deterministic checks, whether a contested finding should stop, whether another lens pass is legal or whether the review has exhausted its repair budget. Those are process decisions. If they stay in the model's discretion, the weaker model is still administering the workflow it was meant to be protected from.

The deterministic next-node tooling was therefore the right correction to the first attempt. It reduced the agent's job from “understand and administer this whole review process” to “perform the current node correctly”. That is a much more realistic burden for a lesser model.

The mistake was assuming that a deterministic router is automatically a trustworthy authority. It isn't. Determinism can reproduce a bad transition perfectly. A graph can be explicit and still contain contradictions, dead ends and unsafe cycles.

Version two has to make global workflow state authoritative in a stronger sense: the graph must know exactly what state the review is in, what evidence exists, which transitions are lawful, which conditions block progress and how recovery works. If the process cannot make that decision safely, it should stop rather than force the agent to rediscover the whole graph in the middle of a review.

## Green comes after control

Once the workflow itself can be trusted, the second problem becomes worth solving: what should a completed review actually prove?

The accepted replacement design goes much further than the current router. It proposes one machine authority for review state, immutable snapshot identity, explicit coverage obligations, structured findings and dispositions, evidence custody, current verification, independent closure and remote identity checks. It also fails closed on missing authority, unavailable reviewers, stale inputs, malformed reports and unresolved uncertainty.

That design is not the implementation running today. The current Marketplace skill is still the legacy review-assistance graph, explicitly bounded away from a `reviewed-green` claim. The replacement design, roadmap and first implementation plan are accepted planning artefacts, not delivered behaviour.

The ordering matters. I don't want a workflow that produces stronger receipts at the end while still requiring a weak model to debug its own control system halfway through. First make the graph trustworthy enough to own the process. Then make the completion claim trustworthy enough to deserve its name.

## What I want the graph to buy

This machinery is not a general argument for putting every review behind a state machine. A frontier model doing an ordinary self-review doesn't need this level of scaffolding. The graph exists because I am deliberately trying to get useful review work out of models I trust less with open-ended global judgement.

That means the graph has to carry the part they are weakest at.

If it works, the weaker agent gets a small current problem, explicit inputs and one lawful next action. It does not need to remember the whole route, invent its own stopping condition or reason about whether the process around it is still coherent. The graph carries that burden.

If the agent has to stop halfway through and reason about whether the graph itself is lying, looping or stranded, I haven't reduced the problem. I've hidden it until the worst possible moment.

That is why version two starts with trust in global workflow state. A stronger green matters. A review process that can safely own its own administration comes first.
