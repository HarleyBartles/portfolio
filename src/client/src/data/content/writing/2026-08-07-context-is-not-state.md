---
title: Context is not the same as state
date: 2026-08-07
summary: Agentic engineering gets harder when every rule, receipt and warning competes for attention. Persist what matters, route it when it matters, and get out of your own way.
---

# Context is not the same as state

I’ve spent a lot of this portfolio arguing that agentic engineering is a real engineering skill. It has failure modes you do not wish away with a better prompt, and getting good at it means learning things about source truth, review, delegation and recovery that only become obvious after you have been bitten by them.

So here is the slightly awkward companion argument: getting agents to do what you want is often easier than you’re making it.

I don’t mean there is one simple prompt pattern that turns a model into a senior engineer. I don’t believe that, and the rest of this portfolio should make that fairly obvious. I mean that once you accept agentic engineering as engineering, it becomes very easy to respond to every failure by adding more engineering around the agent. Another role. Another document. Another contract. Another check. Another receipt proving the check happened.

Eventually the machinery you built to make the agent reliable becomes one of the things the agent has to survive.

## Serious does not have to mean elaborate

I learned this the expensive way on a private project.

The project had three real subdomains and a coordinating domain above them. That part was useful. I then used Git submodules to give those domains separate repositories and built an organisational graph around named agents: work entered at the top, passed through an accepting and delegating role, moved into domain-specific actors for execution, then travelled back up through reports.

There is nothing inherently ridiculous about that shape. Hierarchies, delegation and domain ownership are all legitimate ways to organise work. My mistake was binding a lot of agent theatre to them before I had evidence that the theatre was buying me enough to pay for its complexity.

When I eventually collapsed the project into one repository with the same domains bounded by folders, very little of value was lost. The domains were still real. The authority boundaries were still real. What disappeared was the need to model an imaginary organisation before an agent could do useful work inside them.

The bigger problem, though, was documentation.

At the time I did not properly understand the difference between doctrine, policy, governance, contracts, runbooks, skills and the other kinds of material that accumulate around an agentic system. More importantly, I had not yet internalised something much simpler: putting a document in a repository is not the same as presenting that document to an agent when it needs to act on it.

That distinction sounds obvious now. It was not obvious to me then.

## The document was there

My failure loop went something like this. An agent would do something I had already told it not to do. I would inspect the repository and find the instruction sitting there, clear as day. The obvious conclusion was that the instruction had not been strong enough.

So I strengthened it.

If that did not work, I linked it from somewhere harder to miss. If the rule still got violated, I reinforced it in another document. Eventually there were policies backed by contracts, completion checks backed by policies, and routing surfaces whose job was to make sure the other routing surfaces had been read.

The intention was good. I was trying to turn lessons from real failures into durable engineering knowledge instead of relying on a conversation to remember them.

The result was that more and more things in the repository were shouting at the same volume.

> **If you shout “WOLF” at an agent enough, everything starts looking like a wolf.**

That is as far as I want to take the fable. The actual failure is simpler: salience collapses when too many instructions compete at the same apparent severity.

You can see this when an agent misses a perfectly clear instruction and you ask it why. It looks back, finds the instruction and gives you some version of, “mea culpa, that was there all along; I should have followed it.” It is tempting to hear that as confirmation that the agent was careless and the rule needs to be made even harder to miss.

Sometimes the more useful diagnosis is that you have created too many things that are hard to miss.

The agent followed one important instruction and skipped another because some other warning, contract or local rule won the attention contest. Making the missed instruction louder may help next time. It may also drown out something else.

If everything is mandatory, mandatory stops being a useful distinction.

## Agents love receipts

There was another version of the same problem: receipts.

Agents love writing receipts. Ask one to work rigorously and it will quite happily leave you a report saying what it changed, a manifest describing the report, a completion proof recording that the manifest was updated, and a ledger entry explaining that the proof exists. All of this looks reassuringly responsible.

Some receipts have a real job. An independent verification result, an audit record with a genuine consumer, a deployment receipt or a handoff artifact can carry information that the underlying commit does not.

But a receipt whose only purpose is to memorialise that repository work happened is often duplicating Git while adding a new surface that can go stale.

That cost is easy to miss because the file is small. The real cost is paid by every future worker that has to decide what the file means. Is it current? Is it authoritative? Has the work it describes been superseded? Is this a report about the source of truth, or is it itself the source of truth? Can it be deleted? Does something consume it? Why is it still here?

I spent successive iterations trying to teach agents a very simple idea: disposable work should be disposed of, not commemorated.

The joke eventually became recursive. I had documents telling agents not to memorialise disposable work. When I finally cleaned the repository up, some of those documents were themselves disposable work.

> **The repository remembered too much.**

That was the correction I needed to the way I had been thinking about state. I had been so concerned about transient context disappearing that I treated persistence as an almost unqualified good. If a lesson mattered, write it down. If a worker did something, record it. If an instruction was missed, persist it more strongly.

But persistence does not create authority, usefulness or truth. It just makes something persist.

A stale report can persist. A superseded plan can persist. A generated view can persist long after the source changed. A receipt can faithfully describe a revision that is no longer current. A second policy can preserve the same rule as the first one with slightly different wording, forcing the next agent to work out which version wins.

The repository had become very good at remembering and progressively worse at telling an agent what mattered now.

## The cleanup project before the project

Eventually I found myself avoiding the project.

Coming back to it did not feel like continuing the work. It felt like accepting a separate cleanup project that had to happen before I could safely do the project I actually wanted to do. Work stalled for stretches because I knew how much accumulated ambiguity I would have to untangle before I could trust a fresh agent in the repository again.

When I did return, the first substantial job was sanitation.

The submodules went. The real domains stayed and became folder boundaries inside one repository. The named-agent organisation was stripped back so the architecture described actual authority rather than fictional employees. Old actor and governance surfaces were dissolved. Historical reports, receipts and proof artifacts with no current consumer were deleted because Git already held the history. Routing became thinner. Repeatable procedures moved toward skills. Current rules had to have current readers. Material that had lost its job needed an exit.

The point was not to make the repository small for the sake of smallness. Deleting a useful contract because fewer files looks tidier would just be a different kind of cargo cult.

The improvement was that every surviving surface had to justify why it was still live.

A small cleanup-custody skill I use now is a good example of where the thinking ended up. It does not treat cleanup as a campaign against files. It asks what custody a surface actually deserves: should it stay live, be retained but inactive, move through reversible deletion, be deleted now, or be protected and routed to somebody with the authority to decide? The useful idea is not the terminology. It is that retention is a classification decision, not a reflex.

That is a lot less dramatic than the system it replaced. It also works better.

## Files are not state just because they are files

When I first outlined this article, one of its central lines was: “Memory is context. Files are state.”

I do not think that is precise enough anymore.

A file is a durable carrier. Durability is useful, but it does not make the contents current, authoritative, discoverable or worth keeping. Calling every persistent artifact “state” hides exactly the problem that caused my repository to become difficult to operate.

I now think of state as the material the project deliberately carries forward. It has a reason to survive the conversation. It has some intelligible authority. It can be recovered by a worker that was not present when it was created. If it can become stale, there is a way to recognise that or replace it. If it stops serving a purpose, it has a lifecycle rather than an assumption of immortality.

Context is different. Context is what this worker needs in order to act correctly now.

Those two things have to meet. A governing decision can be perfectly durable and still fail to govern anything if the agent never encounters it at the point where the decision applies. Conversely, a conclusion reached in conversation that future work depends on cannot remain only in the conversation and still be called project state.

So the useful movement is in both directions. Important context becomes state when it needs to survive. Relevant state is routed back into context when it needs to influence action.

And some things deserve neither.

A temporary report that nobody will consume does not become more valuable because it is Markdown. A narration of what Git already records does not need a permanent home simply because an agent can produce one. A historical plan may be useful history without being live instruction. A generated index may be a useful view without becoming the authority it points at.

This is where the original distinction between context and state becomes useful to me again. Not as “chat disappears, files persist”, but as a custody and delivery problem. What must this project carry forward, and what does this agent need to see right now?

They are related questions. They are not the same question.

## Get out of your own way

None of this has made me think agentic engineering is easy. If anything, it has made me more convinced that it is a real engineering discipline, because the lesson did not come from finding a clever prompt. It came from watching a system fail, preserving the evidence, changing the design and discovering that some of my own attempts at reliability were part of the failure.

The part I would tell my earlier self is that seriousness does not require machinery.

Before adding another document, ask whether there is actually a reader for it and how that reader will encounter it when it matters. Before adding another orchestration role, ask what real authority boundary the role represents. Before asking for another receipt, ask what fact it preserves that Git, a test result or an existing source of truth does not already preserve. When a clear instruction is missed, do not automatically make it louder; first look at what else you have already trained the agent to treat as an emergency.

> **Get out of your own way.**

Good agentic engineering is not the maximum amount of governance you can persuade an agent to obey. It is enough structure to make the important things obvious, recoverable and hard to contradict, without making the agent solve your agent architecture before it can solve the problem.

Persist what needs to survive. Route it when it matters. Let stale material leave. Let Git remember the history it is already good at remembering.

Context is not the same as state. Files are not automatically state either. State is what the project deliberately carries forward; context is where the relevant parts of it become useful. Learning to keep that boundary clear was useful. Learning when to stop adding things to either side of it was harder.
