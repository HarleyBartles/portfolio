---
title: Context is not the same as state
date: 2026-08-07
summary: I made an agentic project harder by adding roles, rules and receipts until the machinery became part of the problem. The useful lesson was not to remove structure, but to put it where the real boundaries were.
---

# Context is not the same as state

I’ve spent a lot of this portfolio arguing that agentic engineering is a real engineering skill. It has failure modes you do not wish away with a better prompt, and getting good at it means learning things about source truth, review, delegation and recovery that only become obvious after you have been bitten by them.

There is a companion lesson I wish I had learned earlier: once you start taking agentic engineering seriously, it is very easy to make it harder than it needs to be.

An agent misses an instruction, so you add a stronger instruction. A handoff goes wrong, so you add a role. A worker leaves something ambiguous, so you add a report proving what happened. Each response is individually reasonable. Given enough iterations, the system you built to make the agent reliable becomes another thing the agent has to survive.

I know because I built one.

## Serious does not have to mean elaborate

The project is private because it contains a book I’m writing, so I cannot give you links to inspect its history yourself. I am happy to screen-share the engineering history in an interview — the sprawl, the commits and the cleanup — subject to a reasonably strong stomach for profanity. The book pulls no punches.

The book has three real domains: research, world-building and writing. My first implementation gave those domains separate Git repositories, wired together with submodules, and then gave each one a character.

Albert the Archaeologist handled research. Brian the Librarian looked after world-building. Derek the Novelist sat at the writing desk. Work entered through a coordinating layer, was accepted and delegated, moved down to the relevant actor, then travelled back up through reports.

I was trying to make ownership and handoff legible. In practice I had built a little organisation around three boundaries that already existed.

The characters were not the problem. I still like Albert. If I want a research specialist now, I would happily call the profile Albert the Archaeologist instead of `Research-Profile`. The mistake was turning Albert into an employee.

The hierarchy asked me to maintain the fiction that these were persistent organisational actors with standing responsibilities, routing rules and reporting relationships. It was memorable. It was also puppetry and theatre, and for this project it did not pay rent.

There was enough resemblance to a plausible product idea that I got to test that conclusion twice.

## I tried the packaged version

WorkClaw launched while my own named-agent hierarchy was still live, built around collaborative AI coworkers that can coordinate with one another. I had independently landed near a design another team was productising at the same time.

That did not make my implementation right. It gave me a chance to try the same broad idea without my home-grown machinery.

I rebuilt a miniature version of the book-writing organisation in WorkClaw. The $100 startup bonus credit disappeared during onboarding and one minor smoke task. I paid for a month anyway. What looked like an idle organisation then burned through the monthly allowance in about two days.

I emailed WorkClaw about it. Their team told me I had surfaced a cost they had not properly accounted for: agents polling for new work were hitting frontier models because model routing was misconfigured.

That routing bug was theirs. I would not generalise it into a law of multi-agent systems. What interested me was that the packaged version had arrived at the same question as my hand-rolled version by a different route. Mine charged me in repository complexity. Theirs charged me in runtime spend.

What was all this coordination buying the project?

Not enough.

The book needed research, world-building and writing. It did not need an organisation.

## A role is not a sign on the wall

I did not come away from that experiment thinking specialist roles were useless. I had put them at the wrong layer.

My old system had signs on the wall. One could effectively say: you have entered the archaeology domain; you must bind as Albert now. That is guidance. It is a polite request to an agent that has to encounter the instruction, understand it and give it the right priority among everything else it has been told.

A profile is different. If I dispatch a worker as Albert and tell it that research is its job and it does not write outside that domain, I have given the worker a job specification at the point I create it. The character name is optional; the specialised posture is not.

And if a boundary genuinely must not be crossed, prose is not the strongest tool available. Restrict the worker’s capabilities so it cannot write outside the research surface and the boundary becomes something the runtime enforces, not something a document asks the agent to remember.

Those are three different strengths of control: guidance, role and capability. I used to blur them together because all three could be described in Markdown.

The project still has the three domains. In fact, the boundaries between them are more meaningful now than when Albert, Brian and Derek were standing around pretending to be a company. Research, world-building and manuscript work own different things, and material moves between them deliberately. That is real coordination. It does not require a staff meeting.

The same confusion showed up elsewhere in the repository.

## The document was there

At the time, my understanding of agent-facing repository material was fairly mushy. Doctrine, policy, governance, contracts, runbooks and skills were all ways of writing down something I wanted an agent to know. More importantly, I had not yet internalised the distinction I had also missed with Albert: putting words in a repository is not the same as making those words govern an action.

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

Agents love receipts. Ask for rigour and they will happily produce reports, proof files, completion records and little pieces of prose explaining what changed. Some of those artifacts have a real consumer. An independent verification result, an audit record, a deployment receipt or a handoff can preserve information that the underlying commit does not.

A receipt whose only job is to say that repository work happened is different. Git already knows that. The receipt adds another surface that can become stale while forcing every future worker to decide what authority it has.

Is it current? Does it describe the source of truth or replace it? Has the work moved on? Is something consuming it? Can it be deleted? Why is it still here?

I spent successive iterations trying to teach agents a simple idea: disposable work should be disposed of, not commemorated. The anti-clutter rule grew its own policies, self-checks and supporting guidance.

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

More importantly, how could I get an agent to classify the pile without personally reading roughly 300 documents and making every decision myself?

That question changed the cleanup. “Keep the repo tidy” was not useful enough. Neither was “delete anything that looks stale.” I needed an agent to distinguish live guidance from historical evidence, retained material from disposable residue, and obvious rubbish from something ambiguous enough to stop and ask about.

That thinking eventually became the public `cleanup-custody` skill I use now. Its useful idea is not that fewer files are better. It is that a surface should have a reason to remain live, a reason to be retained elsewhere, or a reason to leave. When the answer depends on authority I do not have, the cleanup stops rather than guessing.

When active work resumed, the submodules went. The standing Albert, Brian and Derek organisation went. Research, world-building and writing stayed. Old actor and governance surfaces were dissolved. Historical reports, receipts and proof artifacts with no current consumer were removed because Git already held the history. Routing became thinner. Repeatable procedures moved toward skills. Current rules needed current readers. Material that had lost its job needed an exit.

I did not simplify the repository because small repositories are morally better. I simplified it because every surviving surface should be able to answer a fairly ordinary question: why are you here?

## Files are not state just because they are files

When I first outlined this article, one of its central lines was: “Memory is context. Files are state.”

It is useful shorthand. It is also too neat for what I learned.

A file is a durable carrier. Durability is valuable, but it does not make the contents current, authoritative, discoverable or worth keeping. Calling every persistent artifact “state” hides exactly the failure that made the private repository difficult to operate.

I now use state to mean the material the project deliberately carries forward. It has a reason to survive the conversation. Its authority is legible enough that a later worker can decide whether to trust it. If it can become stale, there is some way to recognise that, replace it or retire it.

Context is what this worker needs in order to act correctly now.

Those two things have to meet. A governing decision can be perfectly durable and still fail to govern anything if the agent never encounters it at the point where it applies. Conversely, a conclusion reached in conversation that future work depends on cannot remain only in that conversation and still do the job of project state.

Useful information therefore moves in both directions. Important context becomes state when it needs to survive. Relevant state is routed back into context when it needs to influence action.

And some things deserve neither.

A temporary report nobody will consume does not become more valuable because it is Markdown. A narration of what Git already records does not need a permanent home because an agent can produce one. A historical plan can remain useful history without being live instruction. A generated index can be a useful view without becoming the authority it points at.

The distinction I care about now is not “chat disappears, files persist.” It is: what must this project carry forward, and what does this worker need to see right now?

They are related questions. They are not the same question.

## Get out of your own way

I have not become suspicious of structure. I still use profiles, skills, contracts, routing, custody rules and hard capability boundaries where they earn their keep. Some parts of the book project have more engineering around them now than they did when Albert, Brian and Derek were running the place.

The difference is that the machinery sits on real boundaries.

A domain boundary exists because two parts of the project own different kinds of work. A specialist profile exists because a task benefits from a specialist posture. A hard restriction exists because crossing that boundary would be unsafe or simply wrong. A durable artifact exists because somebody later needs to recover, inspect or challenge what it says.

That is very different from adding another layer because the last layer failed.

When an agent misses an instruction now, I try not to treat the miss as automatic permission to write another instruction. Sometimes the wording is the problem. Sometimes the routing is the problem. Sometimes I wanted a job specification and wrote a sign. Sometimes I wanted a contract and wrote a job specification. And sometimes the repository already contains enough words.

Good agentic engineering is not the maximum amount of governance you can persuade an agent to obey. It is engineering the boundaries that are actually there, then resisting the urge to build theatre around them.

Context is not the same as state. A file is not state merely because it survived. A sign on the wall is not a contract because you wrote **MUST** in bold.

I learned all three by adding too much before I learned where the real boundaries were.
