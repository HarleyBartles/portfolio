# Provisioning is not accumulation: Cloud first draft

**Status:** First coherent Cloud draft. Not author-approved, not visitor-facing copy, and not ready for local production.

**Next editorial pass:** Have the repo Sol agent review this against the installed writing/fatigue skills and the durable discovery record. In particular, look for AI-fatigue patterns such as false comparison/reversal tics (`that isn't X, it's Y`), symmetrical scaffolding, comfort phrases, repeated rhetorical cadence, and any sentence that sounds cleaner than Harley would naturally say it. Preserve facts, evidence boundaries and intended meaning while editing voice.

---

# Provisioning is not accumulation

I asked an agent a fairly ordinary architecture question.

“We’re just talking, no plans or specs yet. What are your thoughts on this?”

Before it really answered, it spent a substantial part of its visible reasoning negotiating its own environment. Which skills applied? Was brainstorming mandatory? Which repository rules had become active? Which doctrine needed reading? Did my request to “just talk” override any of that?

Later I said, “Still just talking.”

Off it went again.

Nothing was obviously broken. The individual instructions were mostly reasonable. In fact, I’d put quite a lot of work into making them reasonable.

That was the problem.

I’d been noticing the same thing across several repositories. Useful answers were taking longer to arrive. Agents were spending more time working out what guidance applied, which rules had already been satisfied, what had precedence, and what they were expected to read next.

The environment was supposed to make them more capable.

Instead, they were increasingly having to administer the environment before they could do the work.

## The configuration was coherent

One of the systems behind this was a mesh of `AGENTS.md` files.

It wasn’t accidental prompt sprawl. I’d designed it around the documented hierarchical model: broad guidance near the repository root, increasingly local guidance further down the tree.

The idea was conventional enough. Global concerns should be global. Local concerns should stay local. An agent working in one part of a repository should be able to discover what is special about that part without loading the operating manual for every other part.

The configuration validated correctly.

Then I watched the runtime use it.

In one harness, discovering nested `AGENTS.md` files appeared to promote them into the continuing instruction set. A local file that was intended to become relevant when working in one subtree could remain present after the agent had merely explored that subtree.

That changed the semantics completely.

A small local router might contain several `MUST READ` pointers. Sensible enough if the router is active because the agent is actually working there. Much less sensible if the agent looked at that directory twenty minutes ago and is now doing something else.

As more of the repository was explored, more local guidance accumulated. The hierarchy still existed on disk, but the model increasingly had to reconstruct the intended scope and precedence itself.

The configuration I had written was coherent.

It just wasn’t the configuration the runtime was actually giving the agent.

That distinction has become one of the more useful things I’ve learned working with agentic systems:

**The system is what the runtime does, not what the configuration appears to say.**

A file tree can describe intended scope. A validator can prove that the files obey your intended structure. Neither proves that the consumer will preserve those semantics when it assembles the agent’s working environment.

## I didn’t want less capability

The obvious response would have been to delete a load of guidance.

That wasn’t what I wanted.

Most of the knowledge existed because it was useful. I still wanted agents to know how the repository worked, how to use particular tools, which workflows to follow, and which local constraints applied.

I wanted the capability without making every agent carry all of the machinery for that capability all of the time.

So the knowledge architecture mostly survived. The provisioning architecture changed.

Root instructions became smaller and more durable. Narrow local rules moved behind conditional activation where the harness supported it reliably. Skills, runbooks and references became discoverable surfaces rather than things every worker had to ingest before starting.

The rule I use now is:

**Don’t read everything. Read the next thing you need to make the next move.**

There is an obvious catch. The agent can’t know what it doesn’t know.

So progressive disclosure only works if the environment provides breadcrumbs. A small routing surface needs to expose enough topology for the agent to realise that another capability exists and that the current task has crossed into its territory.

The deep material can be large. Storage depth and context depth are different things.

I can keep a substantial operating manual for a tool without making every agent read it. The environment only needs to make the route to that manual visible when the tool becomes relevant.

I drew essentially the same idea in a Goldilocks fairytale elsewhere in this portfolio. Patch is buried under maps, tools, notes, rules and competing signposts. Every item might be useful. Carrying all of them at once has itself become another problem to solve.

The answer isn’t to throw the maps away.

It’s to stop carrying the entire workshop around because you might need a screwdriver later.

## Provisioning is capability

My working definition started simpler:

**Things you keep telling the agent need to become things you stop needing to tell the agent.**

If I have to say twice, “yes, you do have that tool, read the overflow list”, I need to stop saying it.

If I repeatedly have to explain that the Linear MCP uses `save` operations for things an agent expects to find under `create` or `update`, that correction belongs in the environment.

That does not mean every tool deserves a manual.

I have used simple retrieval tools whose schema tells the agent everything it needs to know. Adding a skill explaining how to use two obvious fields would be ceremony.

A large MCP surface is different. An agent may initially see only part of the available tool list. Even when it finds the correct operation, the schema can explain how to call it without necessarily explaining how the task in front of the agent maps onto the broader capability.

Tool availability and usable capability are not quite the same thing.

For richer tools I provision operating guidance around the surface. The top level stays small. If the agent needs to create or update something in Linear, it can discover the relevant operation guidance without reading instructions for comments, administration, attachments and everything else.

Again, the capability is present without all of its supporting knowledge becoming ambient context.

The same applies at a much larger scale to software development workflows.

Any capable coding model can be asked to write a plan. Harnesses increasingly have their own planning modes.

That isn’t the capability I want.

In an environment where I have provisioned my development workflow, I can start with an idea. The agent knows to discover the problem before implementing it. Ambiguities are worked through conversationally. Depending on the shape of the work, that may produce a spec. A large piece of work may become a roadmap with multiple specs and just-in-time plans. A plan has a defined task shape, verification requirements and an execution strategy. Execution happens through an appropriate lane. Review has its own contract.

I don’t want to explain that lifecycle in every prompt.

I want to bring the work. The environment should already know how we work.

Much of the workflow I use comes from the upstream Superpowers project. I’ve changed and extended parts of it where repeated experience has given me a reason to.

One small addition illustrates the point particularly well.

## “What would you rate this?”

An agent can finish writing a plan and confidently tell me it is ready for execution.

If I then ask, “What would you rate this plan for handoff?”, something interesting happens.

Quite often it gives an honest answer.

Six out of ten. Seven. Eight.

Then it tells me why.

A dependency is implicit. A verification step is weak. A task assumes knowledge that never made it into the plan. Something the agent knew from our conversation has silently become assumed shared knowledge.

Thirty seconds earlier the same agent had declared the plan finished.

The useful part isn’t the number.

Asking for the rating forces the producer to stop looking at its artifact as its own work and inspect it from the position of the next consumer.

So I stopped asking manually and added Handoff Gates to the workflow.

A spec has a contract. It must contain the seams a planner needs to open without rediscovering the design.

A plan has a contract. It must tell an implementer what to execute and how to prove that execution was correct.

At the boundary, the agent assesses whether a hypothetical fresh worker could continue using the artifact without relying on knowledge trapped in the producing agent’s context.

The next worker often isn’t fresh at all. It is frequently the same agent.

That is beside the point.

“Can I continue from this?” and “could a planning agent continue from this?” are different questions. The second one removes the privilege of shared pre-knowledge.

If the artifact is weak, the workflow permits a bounded strengthening pass. That limit is deliberate too. Self-critique is useful. Infinite polishing isn’t.

This is a capability I used to invoke by remembering the right question at the right moment. Now the environment invokes it at the boundary where it is useful.

That is provisioning.

## The environment should carry the method

The prompt still has an important job.

Work begins in conversation because the work itself has not been discovered yet.

The environment should not contain the answer to a problem that hasn’t been discussed. It should contain the reusable capabilities for discovering and executing the answer.

That distinction has cleaned up how I think about prompts.

The human brings intent, current constraints, judgement and the actual problem.

The environment carries the reusable method.

During the work, durable artifacts carry decisions across stage boundaries under explicit contracts.

Tools carry executable capability.

Skills and routing surfaces expose specialist knowledge when it becomes relevant.

None of those things needs to be permanently loaded into the model’s attention merely because it exists.

## Fix the boundary you control

There is no perfect ontology hiding underneath this.

Sometimes the right fix belongs in a tool. Sometimes a skill. Sometimes a runbook, repository rule, workflow, test or plain documentation.

If I control the source of a recurring problem, I prefer to fix the source.

If I don’t control it, I adapt at a boundary I do control.

The Linear MCP naming is somebody else’s interface, so operating guidance around it is reasonable.

When an adaptation layer around something I do control becomes more expensive than owning the changed behaviour directly, preserving the untouched source has stopped buying me anything.

None of this is doctrine.

It is ordinary engineering judgement applied to an unfamiliar runtime.

The current patterns exist because they solve failure modes I can observe today. If tomorrow’s harnesses gain reliable scoped knowledge activation, better capability discovery, clearer lifecycle semantics or stronger native workflow primitives, I would happily delete machinery that has become redundant.

There is no prize for preserving a workaround after the thing it worked around disappears.

## Provisioning, not accumulation

I used to think increasingly rich agent environments mostly meant teaching them more.

Now I think the harder problem is deciding what they should have to carry.

A capable environment can contain a lot. Mine does.

The agent working in it should not have to reason about all of that capability at once.

When a mundane question causes an agent to think “this is overwhelming” before it has properly considered the question, something has gone wrong. The environment has stopped provisioning the work and started competing with it.

The engineering ideas underneath the correction are not particularly exotic.

Scope. Interfaces. Contracts. Lazy loading. Dependency ownership. DRY. Separation of concerns. Runtime behaviour over declared intent.

Agentic systems give those old ideas some unfamiliar failure modes, but they don’t repeal them.

For me, provisioning is successful when I can ask for the work without repeatedly teaching the agent how that kind of work should be done, and without making it carry the implementation details of every other thing it could possibly do.

The capability is there.

The machinery can wait until it is needed.
