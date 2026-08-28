---
title: Context is not the same as state
date: 2026-08-07
summary: Agentic engineering gets harder when every rule, receipt and warning competes for attention. Persist what matters, route it when it matters, and get out of your own way.
---

# Context is not the same as state

I’ve spent a lot of this portfolio arguing that agentic engineering is a real engineering skill. It has failure modes you do not wish away with a better prompt, and getting good at it means learning things about source truth, review, delegation and recovery that only become obvious after you have been bitten by them.

So here is the slightly awkward companion argument: getting agents to do what you want is often easier than you’re making it.

I don’t mean there is one simple prompt pattern that turns a model into a senior engineer. I don’t believe that, and the rest of this portfolio should make that fairly obvious. I mean that once you accept agentic engineering as engineering, it becomes very easy to respond to every failure by adding more engineering around the agent. Another role. Another document. Another contract. Another check. Another receipt proving the check happened.

One of the harder skills is noticing when you have become part of the problem.

## Serious does not have to mean elaborate

I learned this on a private project that eventually became unpleasant to work in.

A quick evidence note before I use it as a case study: the repository is private because it contains a book I’m writing, so I can’t give you links to inspect the history yourself. I’m happy to screen-share the engineering history in an interview — the sprawl, the commits and the cleanup — subject to a reasonably strong stomach for profanity. The book pulls no punches.

The book has three real subdomains with a small amount of coordination above them. I started by giving those domains separate Git repositories wired together with submodules. Then I built a named-agent hierarchy over the top: work came in through one agent, passed to another for acceptance and delegation, moved into domain-specific agents, then travelled back up through reports.

I was trying to make ownership and handoff legible. I accidentally built an organisation.

There is nothing inherently ridiculous about that shape. [WorkClaw](https://www.workclaw.com/blog/introducing-workclaw) launched while my own named-agent hierarchy was still live, built around collaborative AI coworkers that can coordinate with one another. I had independently landed near a design another team was productising at the same time.

That did not make my implementation right. It made the next experiment more interesting.

## I tried the packaged version

I rebuilt a miniature version of the book-writing organisation in WorkClaw.

The $100 startup bonus credit disappeared during onboarding and one minor smoke task. I paid for a month anyway. What looked like an idle organisation then burned through the monthly allowance in about two days.

I emailed WorkClaw about it. They thanked me for surfacing a cost they had not properly accounted for: agents spinning on “any new tasks yet?” were hitting frontier models because their model routing was misconfigured.

That routing bug was theirs, not a universal law of multi-agent systems. What interested me was that the productised version had exposed the same design question my hand-rolled version had, only through money instead of repository complexity: what was all this coordination actually buying?

For this project, not enough.

The book needed three subdomains. It didn’t need an organisation.

So I collapsed the submodules into one repository and kept the useful boundary: the domains became folders. The thing I had actually needed survived. Most of the machinery around it did not.

The bigger mess was documentation.

## The document was there

At the time, my understanding of agent-facing repository material was fairly mushy. Doctrine, policy, governance, contracts, runbooks and skills were all ways of writing down something I wanted an agent to know. I had not yet internalised the more important distinction: a document existing in a repository is not the same as that document being presented to an agent when it needs to act on it.

My failure loop was predictable. An agent would do something I had already told it not to do. I would inspect the repository and find the instruction sitting there, clear as day. The obvious conclusion was that the instruction had not been strong enough.

So I strengthened it.

If that did not work, I linked it from somewhere harder to miss. If the rule still got violated, I reinforced it in another document. Policies gained supporting contracts. Completion checks pointed back to policies. Routing documents appeared to make sure the other routing documents were discovered.

I was trying to turn real failures into durable engineering knowledge instead of hoping a conversation remembered them. The instinct was sound. The repository slowly lost its sense of priority.

> **If you shout “WOLF” at an agent enough, everything starts looking like a wolf.**

An agent would miss one of those perfectly clear instructions and, when challenged, look back and give me some version of: “mea culpa, that was there all along; I should have followed it.”

For a while I heard that as confirmation that the agent had been careless. Make the instruction louder. Make it more mandatory. Put it somewhere else as well.

The more useful diagnosis was that I had created too many things that were hard to miss.

One important instruction beat another important instruction in the attention contest. Strengthening the loser might fix that exact miss and make the next contest worse. Once everything is written at emergency volume, “mandatory” stops telling the agent very much.

## Agents love receipts

The same instinct showed up in what agents left behind after the work.

Agents love receipts. Ask for rigor and they will happily produce reports, proof files, completion records and little pieces of prose explaining what changed. Some of those artifacts have a real consumer. An independent verification result, an audit record, a deployment receipt or a handoff can preserve information that the underlying commit does not.

A receipt whose only job is to say that repository work happened is different. Git already knows that. The receipt adds another surface that can become stale while forcing every future worker to decide what authority it has.

Is it current? Does it describe the source of truth or replace it? Has the work moved on? Is something consuming it? Can it be deleted? Why is it still here?

I spent successive iterations trying to teach agents a very simple idea: disposable work should be disposed of, not commemorated. The anti-clutter rule grew its own policies, self-checks and supporting guidance.

The joke eventually became recursive. I had documents telling agents not to memorialise disposable work. When I finally cleaned the repository up, most of those documents were themselves disposable work.

> **The repository remembered too much.**

That was the correction I needed to the way I had been thinking about state. I had been so concerned about transient context disappearing that I treated persistence as an almost unqualified good. If a lesson mattered, write it down. If a worker did something, record it. If an instruction was missed, persist it more strongly.

Persistence does not create authority, usefulness or truth. It just makes something persist.

A stale report can persist. A superseded plan can persist. A generated view can outlive the source that generated it. Two slightly different policies can both persist and leave the next agent to work out which one wins.

The repository had become very good at remembering and progressively worse at telling an agent what mattered now.

## The cleanup project before the project

Eventually I stopped wanting to open it.

Coming back did not feel like continuing the book. It felt like accepting a cleanup project before I was allowed to do the project I actually cared about.

I did not leave it alone for a fortnight and magically return with the answer in my pocket. For roughly that fortnight, I spent far more time ruminating on the mess than moving the book forward. How had I got here? What genuinely needed to survive? What was clearly shite? What had become stale, misleading or actively dangerous? Which things looked redundant but were actually carrying provenance I would regret deleting?

More importantly: how could I get an agent to classify the pile without personally reading roughly 300 documents and making every custody decision myself?

That question changed the shape of the cleanup. “Keep the repo tidy” was not useful enough. Neither was “delete anything that looks stale.” I needed an agent to distinguish live guidance from historical evidence, retained material from disposable residue, and obvious rubbish from something ambiguous enough to stop and ask about.

That thinking eventually became the public [`cleanup-custody`](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/skills/cleanup-custody/SKILL.md) skill I use now. Its useful idea is not that fewer files are better. It is that a surface should have a custody decision. Keep it live because it has a current job. Retain it because history or provenance gives it value. Delete it because it genuinely has none. Stop and route it when the authority is not yours.

When active work resumed, the first substantial job was sanitation. The submodules went. The named-agent organisation went. Old actor and governance surfaces were dissolved. Historical reports, receipts and proof artifacts with no current consumer were removed because Git already held the history. Routing became thinner. Repeatable procedures moved toward skills. Current rules had to have current readers. Material that had lost its job needed an exit.

I did not simplify the repository because small repositories are morally better. I simplified it because every surviving surface should be able to answer a fairly ordinary question: why are you here?

## Files are not state just because they are files

When I first outlined this article, one of its central lines was: “Memory is context. Files are state.”

It is a useful shorthand. It is also too neat for what I learned.

A file is a durable carrier. Durability is valuable, but it does not make the contents current, authoritative, discoverable or worth keeping. Calling every persistent artifact “state” hides exactly the failure that made the private repository difficult to operate.

I now use state to mean the material the project deliberately carries forward. It has a reason to survive the conversation. Its authority is legible enough that a later worker can decide whether to trust it. If it can become stale, there is some way to recognise that, replace it or retire it.

Context is what this worker needs in order to act correctly now.

Those two things have to meet. A governing decision can be perfectly durable and still fail to govern anything if the agent never encounters it at the point where it applies. Conversely, a conclusion reached in conversation that future work depends on cannot remain only in that conversation and still do the job of project state.

So useful information moves in both directions. Important context becomes state when it needs to survive. Relevant state is routed back into context when it needs to influence action.

And some things deserve neither.

A temporary report nobody will consume does not become more valuable because it is Markdown. A narration of what Git already records does not need a permanent home because an agent can produce one. A historical plan can remain useful history without being live instruction. A generated index can be a useful view without becoming the authority it points at.

The distinction I care about now is not “chat disappears, files persist.” It is: what must this project carry forward, and what does this worker need to see right now?

They are related questions. They are not the same question.

## Get out of your own way

None of this has made me think agentic engineering is easy. The lesson did not come from finding a clever prompt or deciding governance was pointless. It came from watching a system fail, looking at the scar tissue and admitting that some of my own attempts at reliability were now part of the failure.

The part I would tell my earlier self is that seriousness does not require maximum machinery.

A real domain boundary can earn its keep. So can a routing rule, a skill, a contract, an ADR, a receipt or a specialist agent. The question is not whether those things are sophisticated enough to count as engineering. The question is what problem each one is solving and what it costs the next worker to understand it.

Sometimes the fix for an agent missing an instruction is a better instruction. Sometimes it is better routing. Sometimes the repository already contains enough instruction and the useful move is to stop adding to it.

Good agentic engineering gives the important things enough structure to remain obvious, recoverable and hard to contradict without making the agent solve your agent architecture before it can solve the problem you hired it for.

Persist what needs to survive. Route it when it matters. Let stale material leave. Let Git remember the history it is already good at remembering.

Context is not the same as state. Files are not automatically state either. State is what the project deliberately carries forward; context is where the relevant parts of it become useful.

The rest is learning when to get out of your own way.
