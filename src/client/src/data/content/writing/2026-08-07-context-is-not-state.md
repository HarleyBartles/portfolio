---
title: I made agentic engineering harder than it needed to be
date: 2026-08-07
summary: I built an agent organisation around a book that only needed three domains. Untangling it taught me where agent roles, repository state and hard boundaries actually belong.
---

# I made agentic engineering harder than it needed to be

I’ve spent a lot of this portfolio arguing that agentic engineering is a real engineering skill. It has failure modes you don’t wish away with a better prompt, and getting good at it means learning things about source truth, review, delegation and recovery that only become obvious after you’ve been bitten by them.

There’s a companion lesson I wish I’d learned earlier: once you start taking agentic engineering seriously, it’s very easy to make it harder than it needs to be.

An agent misses an instruction, so you add a stronger instruction. A handoff goes wrong, so you add a role. A worker leaves something ambiguous, so you add a report proving what happened. Each response is reasonable in isolation. Stack enough of them together and the system you built to make the agent reliable becomes another thing the agent has to survive.

I know because I built one.

## Serious doesn’t have to mean elaborate

The project is private because it contains a book I’m writing, so I can’t give you links to inspect its history yourself. I’m happy to screen-share the engineering history in an interview, including the sprawl, the commits and the cleanup, subject to a reasonably strong stomach for profanity. The book pulls no punches.

The book has three real domains: research, world-building and writing. My first implementation gave those domains separate Git repositories wired together with submodules, then gave each one a character.

Albert the Archaeologist handled research. Brian the Librarian looked after world-building. Derek the Novelist sat at the writing desk. Work entered through a coordinating layer, was accepted and delegated, moved down to the relevant actor, then travelled back up through reports.

I was trying to make ownership and handoff legible. In practice I’d built a little organisation around three boundaries that already existed.

I still like Albert. If I want a research specialist now, I’ll happily call the profile Albert the Archaeologist instead of `Research-Profile`. The character was cheap. Maintaining Albert as a standing employee meant persistent responsibilities, routing rules and reporting relationships.

That was memorable. It was also puppetry and theatre, and for this project it didn’t pay rent.

Then I got the chance to try the same broad idea as a product.

## I tried the packaged version

[WorkClaw](https://www.workclaw.com/blog/introducing-workclaw) launched while my named-agent hierarchy was still live, built around collaborative AI coworkers that can coordinate with one another. I’d independently landed near a design another team was productising at the same time.

I rebuilt a miniature version of the book-writing organisation in WorkClaw. The $100 startup credit got me through setting the organisation up and one small smoke task. I gave it the benefit of the doubt and bought a monthly subscription anyway.

Then I left the organisation largely idle for a couple of days and watched the paid allowance disappear too.

I emailed WorkClaw about it. Their team told me their “heartbeats”, agents periodically waking up to see whether there was work to do, were consuming far more credits than expected. Their planned fix was to move lightweight work onto lower-cost models and increase the heartbeat interval. They covered the resulting overage.

By then, handing my home-grown organisation over to the packaged one no longer looked like a solution. The more useful question was whether the book had earned an organisation in the first place.

The answer was straightforward. The book needed research, world-building and writing. It didn’t need an organisation.

My hand-rolled version charged me in repository complexity. The packaged one charged me in runtime spend. Neither bought enough coordination to justify the organisation.

## A role is not a sign on the wall

I kept role specialisation and moved it to dispatch.

My old system had signs on the wall. One could effectively say: you’ve entered the archaeology domain; you must bind as Albert now. That’s guidance sitting in the repository. The agent has to encounter it, understand it and give it the right priority among everything else it has been told.

A dispatched profile changes the delivery mechanism. In Devin, the profile body functions like a root `AGENTS.md` for the worker invoked under it. Albert starts with the job specification; he doesn’t have to discover it somewhere in the repository. Whether he obeys every line is still a model-behaviour question, but “the worker never saw the role” is no longer the failure mode.

The same profile can also provision capabilities through its frontmatter. Harnesses vary, so I wouldn’t generalise Devin’s exact mechanism into a universal rule. In the harness I use, though, the distinction is practical. The profile body can tell Albert not to write outside research. The profile’s provisioned tools can make that boundary something the harness enforces.

I used to blur those jobs together because they could all be described in Markdown. They aren’t the same thing. One routes guidance into the worker’s starting context. The other constrains what the worker can actually do.

The project still has research, world-building and manuscript boundaries. They own different things, and material crosses them deliberately. One current rule is concrete: evidence from the research side can be proposed into World, but it can’t promote itself into book canon.

That’s real coordination. It doesn’t require a staff meeting.

The same confusion showed up elsewhere in the repository.

## The document was there

At the time, my understanding of agent-facing repository material was fairly mushy. Doctrine, policy, governance, contracts, runbooks and skills were all ways of writing down something I wanted an agent to know. More importantly, I hadn’t yet internalised the distinction I’d missed with Albert too: putting words in a repository is not the same as making those words govern an action.

My failure loop was predictable. An agent would do something I’d already told it not to do. I’d inspect the repository and find the instruction sitting there, clear as day. The obvious conclusion was that the instruction hadn’t been strong enough.

So I strengthened it.

If that didn’t work, I linked it from somewhere harder to miss. If the rule still got violated, I reinforced it in another document. Policies gained supporting contracts. Completion checks pointed back to policies. Routing documents appeared to make sure the other routing documents were discovered.

I was trying to turn real failures into durable engineering knowledge instead of hoping a conversation remembered them. The instinct was sound. The repository slowly lost its sense of priority.

> **If you shout “WOLF” at an agent enough, everything starts looking like a wolf.**

An agent would miss one of those perfectly clear instructions and, when challenged, look back and give me some version of: “mea culpa, that was there all along; I should have followed it.”

For a while I heard that as confirmation that the agent had been careless. Make the instruction louder. Make it more mandatory. Put it somewhere else as well.

The more useful diagnosis was that I’d created too many things that were hard to miss.

One important instruction beat another important instruction in the attention contest. Strengthening the loser might fix that exact miss and make the next contest worse. Once everything is written at emergency volume, “mandatory” stops telling the agent very much.

## Agents love receipts

The same instinct showed up in what agents left behind after the work.

Agents love receipts. Ask for rigour and they’ll happily produce reports, proof files, completion records and little pieces of prose explaining what changed. Some of those artefacts have a real consumer. An independent verification result, an audit record, a deployment receipt or a handoff can preserve information that the underlying commit doesn’t.

A receipt whose only job is to say repository work happened is different. Git already knows that. The receipt adds another surface that can go stale while forcing every future worker to decide what authority it has.

Is it current? Does it describe the source of truth or replace it? Has the work moved on? Is something consuming it? Can it be deleted? Why is it still here?

I spent successive iterations trying to teach agents a simple idea: disposable work should be disposed of, not commemorated. The anti-clutter rule grew its own policies, self-checks and supporting guidance.

The joke eventually became recursive. I had documents telling agents not to memorialise disposable work. When I finally cleaned the repository up, most of those documents were themselves disposable work.

> **The repository remembered too much.**

That corrected the way I’d been thinking about state. I’d been so concerned about transient context disappearing that I treated persistence as an almost unqualified good. If a lesson mattered, write it down. If a worker did something, record it. If an instruction was missed, persist it more strongly.

Persistence doesn’t create authority, usefulness or truth. It just makes something persist.

A stale report can persist. A superseded plan can persist. A generated view can outlive the source that generated it. Two slightly different policies can both persist and leave the next agent to work out which one wins.

The repository had become very good at remembering and progressively worse at telling an agent what mattered now.

## The cleanup project before the project

Eventually I stopped wanting to open it.

Coming back didn’t feel like continuing the book. It felt like accepting a cleanup project before I was allowed to do the project I actually cared about.

I didn’t leave it alone for a fortnight and magically return with the answer in my pocket. For roughly that fortnight, I spent far more time ruminating on the mess than moving the book forward. How had I got here? What genuinely needed to survive? What was clearly shite? What had become stale, misleading or actively dangerous? Which things looked redundant but were actually carrying provenance I’d regret deleting?

More importantly, how could I get an agent to classify the pile without personally reading roughly 300 documents and making every decision myself?

That question changed the cleanup. “Keep the repo tidy” wasn’t useful enough. Neither was “delete anything that looks stale.” I needed an agent to distinguish live guidance from historical evidence, retained material from disposable residue, and obvious rubbish from something ambiguous enough to stop and ask about.

That thinking eventually became the public [`cleanup-custody`](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/skills/cleanup-custody/SKILL.md) skill I use now. The useful idea is custody. A surface should have a reason to remain live, a reason to be retained elsewhere, or a reason to leave. When the answer depends on authority I don’t have, the cleanup stops rather than guessing.

When active work resumed, the submodules went. The standing Albert, Brian and Derek organisation went. Research, world-building and writing stayed. Old actor and governance surfaces were dissolved. Historical reports, receipts and proof artefacts with no current consumer were removed because Git already held the history. Routing became thinner. Repeatable procedures moved toward skills. Current rules needed current readers. Material that had lost its job needed an exit.

I simplified the repository until every surviving surface could answer a fairly ordinary question: why are you here?

## Files are not state just because they are files

When I first outlined this article, one of its central lines was: “Memory is context. Files are state.”

It’s useful shorthand. It’s also too neat for what I learned.

A repository file can be a durable carrier. Durability doesn’t make its contents current, authoritative, discoverable or worth keeping. Calling every persistent artefact “state” hides exactly the failure that made the private repository difficult to operate.

I now use state to mean the material the project deliberately carries forward. It has a reason to survive the conversation. Its authority is legible enough that a later worker can decide whether to trust it. If it can become stale, there’s some way to recognise that, replace it or retire it.

Context is what this worker needs in order to act correctly now.

Those two things have to meet. A governing decision can be perfectly durable and still fail to govern anything if the agent never encounters it at the point where it applies. A conclusion reached in conversation that future work depends on can’t remain only in that conversation and still do the job of project state.

Useful information moves in both directions. Important context becomes state when it needs to survive. Relevant state is routed back into context when it needs to influence action.

Some information deserves neither.

A temporary report nobody will consume doesn’t become more valuable because it’s Markdown. A narration of what Git already records doesn’t need a permanent home because an agent can produce one. A historical plan can remain useful history without being live instruction.

The distinction I care about now is simple: what must this project carry forward, and what does this worker need to see right now?

They’re related questions. They aren’t the same question.

## Get out of your own way

I still use profiles, skills, contracts, routing, custody rules and hard capability boundaries where they earn their keep. Some parts of the book project have more engineering around them now than they did when Albert, Brian and Derek were running the place.

The difference is where the machinery sits.

A domain boundary exists because two parts of the project own different kinds of work. A specialist profile exists because a task benefits from a specialist posture. A hard restriction exists because crossing that boundary would be unsafe or simply wrong. A durable artefact exists because somebody later needs to recover, inspect or challenge what it says.

When an agent misses an instruction now, I try not to treat the miss as automatic permission to write another instruction. Sometimes the wording is the problem. Sometimes the routing is the problem. Sometimes I wanted a job specification and wrote a sign. Sometimes I needed an enforced boundary and wrote another paragraph. Sometimes the repository already contains enough words.

The discipline is to engineer the boundaries that are actually there, then resist building theatre around them.

Context and state do different jobs. Repository files need custody before they deserve authority. Instructions need delivery, and some boundaries need enforcement rather than louder prose.

I learned that by building too much before I learned where the project actually needed structure.
