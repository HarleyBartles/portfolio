Status: Cloud Sol working manuscript, discovery draft, not publication-ready

# The review graph

I didn't build a review graph because graphs became fashionable. I built one because I wanted weaker models to carry out a review that normally needs frontier-model judgement, and a loop left too much of the hard part in the model's head.

A frontier model can usually review its own work with ordinary engineering guidance and the repository's normal checks. A weaker model needs more scaffolding. My first attempt gave the agent the whole review graph and expected it to understand the route before starting. That was exactly the kind of global reasoning I was trying to avoid. The graph became another thing the model had to keep in context.

The next version moved control into deterministic next-node tooling and small node recipes. The agent asks what node is legal next, reads that recipe just in time, does the local job and asks again. That is a much better fit for a weaker model because it can spend its reasoning budget on the current review obligation instead of carrying the whole process around in its head.

But that design creates a stronger requirement than the first version made explicit: if the agent is going to hand administration of the graph to the graph, the graph has to deserve that authority.

The graph I have today does not.

The concrete failure is almost embarrassingly simple: I can ask the tool for the next node and it can leave me stranded. The graph can return a lawful-looking next step, or reach a state after that step, from which its deterministic machinery cannot recover without the agent reasoning about the wider workflow again.

That breaks the contract the JIT design depends on. The weaker model is supposed to ask what comes next, trust the answer, do that bounded job and move on. It cannot do that safely if "next" can eventually mean "now reconstruct how the graph got here and work out how to escape it".

The requirements fall out of each other. If the agent has to understand the whole graph before traversal, the graph has already consumed the context budget I was trying to protect. If I refuse to make it carry the whole graph, then I need deterministic routing and just-in-time recipes. And once I make that choice, "sometimes read ahead" is not a harmless exception. It means the graph stops being trustworthy exactly when the agent most needs it to be.

So the contract is deliberately small. For every non-terminal state, the tooling must return one truthful next action that moves the review somewhere meaningful. If it cannot do that safely, it must return an honest `BLOCKED` exit with enough durable state for a human or later run to understand why. There should be no third mode where the weaker model is expected to inspect the wider graph and improvise its way out.

That is the primary failure. The fact that the current `ready` state also falls short of proving a genuinely trustworthy green review is real, but it comes second. There is little value in making the completion claim stronger while the process used to reach it can still be the failure mode.

Graphs themselves are not the mistake here. They are a good way to route an agent through work with branching obligations, guarded transitions, repair paths and explicit stopping conditions. If your loop has loops inside loops, diverging exit paths and different onward paths, you do not really have a loop any more. You have a badly designed graph, with the topology left implicit for the model to reconstruct. Making that topology explicit is especially valuable when the model doing the traversal is the part of the system I trust least with global workflow judgement.

The industry vocabulary around graphs has moved absurdly quickly. Anthropic's Claude Code team was still publishing loop-engineering guidance at the end of June 2026; within weeks, practitioner discussion had swung hard toward 'graph engineering'. I had also absorbed at least one viral 'Anthropic engineers say' attribution that did not survive source checking. That is useful context, but not a reason to use a graph. I read about the approach, recognised a control problem that actually needed it, and used the graph because the topology solved something a loop would leave ambiguous.

## The audit found a state problem, not one bad edge

When I asked Sol to audit the graph as an authority rather than as a diagram, the result was not a neat bug report. The replacement plan freezes a catalogue of version-one states that version two must reject: a final-strong path with no valid report behind it, circular resolution state, cumulative preflight state, lost normalization origin, blocked states the model cannot represent safely, round state that can mislead traversal, and blockers the old state model cannot express at all.

That list changes the repair strategy. If one edge were wrong, I would fix the edge. This is broader. The graph can lose why it arrived somewhere, represent progress that is not actually safe progress, or enter a state from which deterministic traversal cannot recover. Those are failures in workflow authority. A weaker agent cannot hand over global control to a state machine that sometimes needs the agent to reconstruct missing history or decide how to escape its own state.

The accepted replacement therefore treats version-one state, reports and metrics as history, not authority. Version two starts from a stricter machine state and is being planned to fail closed when state is stale, malformed, incomplete or contradictory. That repair comes before the more ambitious question of what evidence would justify a stronger green claim.

## Ask the agent that has to live with it

One of the more useful questions I have learned to ask in agentic engineering is deliberately plain: what is your honest opinion of the environment I have given you?

That is not outsourcing architecture to a language model. It is using the agent as an observer of the runtime it actually has to work inside. Documentation tells me what a system intends to do. The agent can tell me what happens when it tries to use it. I still have to verify the answer, but pretending the written contract is the whole truth has already bitten me elsewhere.

The same pattern showed up here. I did not ask Sol whether the graph looked elegant. I asked a frontier model to assess whether a weaker model could safely surrender global workflow reasoning to it. The answer was no, and the replacement plan explains why in states and invariants rather than vibes. That is much more useful than asking whether the diagram looks sensible.

You can learn the rules of driving from a book. You still have to drive the car to find out how it behaves. Agent-facing infrastructure is similar: sometimes the only way to know whether a control surface helps or hinders the agent is to make the agent use it, observe where it gets confused or stranded, and then check those observations against the implementation.

[Next section to discover: what version one genuinely improved in practice beyond JIT traversal, and which of those properties version two must preserve.]
