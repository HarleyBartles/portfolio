---
title: Provisioning is not accumulation
date: 2026-08-12
summary: Capability should be available when the work needs it, without making every agent carry the whole workshop.
---

I asked an agent a fairly ordinary architecture question: “We’re just talking, no plans or specs yet. What are your thoughts on this?”

Before it really answered, it spent a substantial part of its visible reasoning negotiating its own environment. Which skills applied? Was brainstorming mandatory? Which repository rules had become active? Which doctrine needed reading? Did my request to “just talk” override any of that?

Later I said, “Still just talking.” Off it went again.

None of the individual instructions looked especially foolish. I’d put quite a lot of work into making them reasonable. Across several repositories, though, useful answers had been taking longer to arrive while agents spent more time working out what guidance applied, what they had already satisfied and which rule took precedence.

The environment was supposed to make them more capable. Increasingly, they had to administer the environment before they could do the work.

## The configuration passed. The runtime didn’t

One of the systems behind this was a mesh of `AGENTS.md` files. It wasn’t accidental prompt sprawl. I’d designed it around the [documented hierarchical model](https://learn.chatgpt.com/docs/agent-configuration/agents-md#how-codex-discovers-guidance): broad guidance near the repository root, with increasingly local guidance further down the tree.

The intent was conventional: keep global concerns global and local concerns local. An agent working in one part of a repository should be able to discover what is special about that part without loading the operating manual for every other part.

The mesh validator passed. Then I watched one runtime use it.

In that harness, discovering nested `AGENTS.md` files appeared to promote them into the continuing instruction set. A local router intended for one subtree could remain active after the agent had merely explored that subtree. As the repository opened up, the agent accumulated more local law and more `MUST READ` pointers, then had to reconstruct the intended scope and precedence itself.

That observation came from retained diagnostic sessions, not a controlled benchmark or a claim about every harness. The public receipt is the resulting [Marketplace migration](https://github.com/HarleyBartles/agent-asset-marketplace/pull/249): thin the retained `AGENTS.md` surfaces, move narrow law behind the runtime’s scoped activation mechanism, audit the old nodes and add guardrails against the same shape returning.

> **The system is what the runtime does, not what the configuration appears to say.**

A file tree can describe intended scope. A validator can prove that the files obey the structure you designed. Neither proves that the consumer will preserve those semantics when it assembles the agent’s working environment. We had tested the configuration we wrote, not the configuration the runtime produced.

I didn’t respond by deleting the knowledge. Root instructions became smaller and more durable. Narrow rules moved behind conditional activation where the harness supported it reliably. Skills, runbooks and references remained available as discoverable surfaces instead of becoming ambient reading for every worker.

The knowledge survived; its delivery changed.

## The question I got tired of asking

That failure explains what I now avoid. Handoff Gates is a better example of what I mean by provisioning capability.

An agent can finish a plan, declare it ready for execution and ask for approval. If I then ask, “What would you rate this plan for handoff?”, it will quite often give an unexpectedly honest answer. Six out of ten. Seven. Eight.

Then it explains why. A dependency is implicit, a verification step is weak, or a task assumes knowledge that never made it into the plan. Thirty seconds earlier, the same agent had called the artifact finished.

The number is only a forcing function. Rating makes the producer inspect its artifact from the position of the next consumer. “Can I continue from this?” permits the producing agent to rely silently on its own conversational memory. “Could a planning agent continue from this spec?” asks whether the artifact contains assumed shared knowledge it never earned.

The next stage often runs in the same session; freshness is a lens, not an execution topology.

I used to remember the question and ask it manually. Now [Handoff Gates](https://github.com/HarleyBartles/agent-asset-marketplace/blob/70dd30e2e65fd8f7aa89796a1a037da14235dd2a/codex-marketplace/plugins/superpowers-plus/skills/handoff-gates/SKILL.md) applies the check at the boundary between stages. Specs and plans already have contracts: a spec must expose the seams a planner needs to open, while a plan must tell an implementer what to execute and how to prove it. The gate checks whether the next consumer can rely on those promises without rediscovering the work.

It also permits one bounded strengthening pass. Self-critique is useful; infinite polishing isn’t. The score isn’t a scientific measure of quality, and I don’t treat it as one. The useful mechanism is the perspective change, applied at the point where hidden assumptions become somebody else’s problem.

> **Things you keep telling the agent need to become things you stop needing to tell the agent.**

Handoff Gates is one of my additions to a development workflow largely inherited from the [upstream Superpowers project](https://github.com/obra/superpowers). The wider lifecycle isn’t my invention. Turning this repeated nudge into a durable, bounded capability was my engineering response to a failure I kept seeing.

## Keep the workshop. Narrow the read

Provisioning is moving something out of the prompt and into the environment. Moving it is only the start. If the environment then activates everything because it exists or has been encountered, the storage location changed while the provisioning problem remained.

A capable environment can contain a great deal of machinery without making the current worker reason about all of it at once. Deep material can stay cold until the work justifies the read. A small routing surface only needs to provide enough of a breadcrumb for the agent to recognise that another capability exists and that the current task has crossed into its territory.

This still requires judgement. The agent can’t know what it doesn’t know, and semantic discovery isn’t guaranteed. I use explicit first-turn routing alongside trigger-rich skill descriptions because two plausible routes are more dependable than pretending one hidden relevance mechanism is infallible.

Rich tools provide a small, concrete example. Agents repeatedly searched the Linear connector for a `create` operation, failed to find one and told me they couldn’t create the object. The connector exposes that behaviour through `save_*`: omit an ID to create, provide one to update. After explaining that more than once, I put the route into the environment.

That doesn’t mean every tool deserves a manual. Some retrieval tools have two obvious fields and a schema that says everything worth saying. Adding another skill would be ceremony. Tool availability and usable capability diverge only when discovery, naming or operating semantics leave a real gap.

> **Don’t read everything. Read the next thing you need to make the next move.**

I’d already made the same argument visually in [Goldilocks](/patch/goldilocks). Patch stands at a junction buried under maps, tools, notes, rules and competing signposts. Every item might be useful; carrying all of them at once has become another problem to solve. The maps can stay. Patch just needs the relevant one before choosing a path.

## Bring the work. Provision the method

The prompt still has an important job because work begins in conversation, before the work itself has been discovered. I bring the problem, current constraints and judgement. The environment carries the reusable method for turning that conversation into something executable.

Any capable coding model can be asked to write a plan, and harnesses increasingly have planning modes of their own. I need more than the generic ability to produce plausible planning prose. In my environment, a spec and a plan have distinct contracts, planning hands off to an execution lane, and review has its own boundary. I want to bring the work without teaching that lifecycle again in every prompt.

Once work starts, durable artifacts carry decisions between stages, tools provide executable capability, and skills expose specialist practice when it becomes relevant. None of that machinery needs permanent residence in the model’s attention merely because the environment can reach it.

This is ordinary separation of concerns applied to an unfamiliar runtime. The human remains responsible for intent and acceptance; the environment should remember the repeatable method.

## Fix the boundary you control

There is no perfect ontology underneath this. Sometimes the right correction belongs in a tool, sometimes a skill, and sometimes a runbook, repository rule, test or piece of plain documentation.

If I control the source of a recurring problem, I prefer to fix the source. If I don’t, I adapt at a boundary I do control. Linear’s operation names belong to an external interface, so operating guidance is a reasonable adapter. Preserving an adapter forever on a source I own may be less sensible than changing the source.

The current patterns solve failures I can observe today. They are rules of thumb, not a final architecture for agentic engineering. A future runtime that reliably and observably enforces nested instruction scope, precedence and lifecycle would make a dense hierarchical mesh attractive again. I’d happily remove machinery whose reason for existing had disappeared.

I used to think increasingly rich agent environments mostly meant teaching them more. Now I think the harder problem is deciding what the current worker should have to carry.

The engineering ideas are familiar: scope, interfaces, contracts, lazy loading, dependency ownership, DRY and separation of concerns; above all, runtime behaviour outranks declared intent. Agentic systems give those ideas unfamiliar failure modes, but they don’t repeal them.

For me, provisioning succeeds when I can ask for the work without repeatedly teaching the agent how that kind of work should be done, and without making it carry the implementation details of every other thing it could possibly do.

The capability is there; the machinery can wait until it is needed.
