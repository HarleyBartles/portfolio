---
title: "I made agentic engineering harder than it needed to be"
summary: "A novel acquired a project director, three department heads and roughly 300 agent-facing documents. I had to work out what deserved to stay."
readingMinutes: 6
tags: ["writing", "agentic-engineering", "context"]
relatedSlugs: []
---

# I made agentic engineering harder than it needed to be

Opening the repository for my novel had started to feel like the first day of a cleanup job. I'd gone there to write fiction; instead I was looking at an agent organisation and roughly 300 documents explaining how it ought to behave.

I had taken agentic engineering seriously: give each kind of work an owner, make instructions durable, keep a record of what happened. Somewhere in that sensible list, I made getting back to the novel harder.

## The organisation around the novel

The novel has three real domains: research, world-building and writing. My first implementation gave them separate Git repositories wired together with submodules, then represented each domain as a standing employee.

Will represented my will. He was me in agent form, there to make my intent concrete. Rooms, the novel project, reported to Will through Chris, its Project Director. Chris had three heads of department beneath him: Albert the Archaeologist for research, Brian the Librarian for world-building and Derek the Novelist for writing.

The organisation crossed repository boundaries. Adventures of Patch had Patch as its responsible agent reporting into Will. I'd built a chain of command across my projects. Rooms alone had a project director and three department heads. Another project only needed a project director who also did the work.

:::figure organisation
visual: agent-organisation-overhead
description: Will oversees Rooms and Adventures of Patch. Chris directs Rooms through Albert, Brian and Derek.
caption: The reporting lines across Rooms and Adventures of Patch.
layout: wide
:::end-figure

That's a ton of bureaucracy for “do some work please”.

I wanted it to be obvious who owned what and where the work went next. A task went in at the top, travelled down to the agent responsible and came back up through reports. The characters weren't the mistake. Albert is still a perfectly good name for a research specialist. The expensive part was maintaining him as an employee with persistent responsibilities, routing rules and reporting relationships.

The repository is private because the novel draws on lived experience and real people. I can't link its history, but if we're interviewing and you want to see the engineering choices, we can look at it.

:::aside packaged-organisation
title: The packaged organisation
eyebrow: Same abstraction, different bill
standfirst: My hand-rolled version charged repository complexity. WorkClaw charged runtime spend. Neither bought enough coordination to justify an organisation around this novel.
disclosure: Read the WorkClaw experiment

[WorkClaw](https://www.workclaw.com/blog/introducing-workclaw) launched while my named-agent hierarchy was still live. Its collaborative AI coworkers could coordinate with one another, which was close enough to my hand-rolled organisation to make a useful second experiment.

I rebuilt a miniature version of the novel-writing organisation in WorkClaw. The $100 startup credit got me through setting it up and one small smoke task. I gave it the benefit of the doubt and bought a monthly subscription anyway. Then I left the organisation largely idle for a couple of days and watched the paid allowance disappear too.

WorkClaw's team told me their “heartbeats”, agents periodically waking up to check for work, were consuming far more credits than expected. Their planned fix was to move lightweight work onto lower-cost models and increase the heartbeat interval. They covered the resulting overage.

Moving my home-grown organisation into a packaged one no longer looked like a solution. Had this novel earned an organisation at all? It hadn't.
:::end-aside

## The document was there

I had written instructions to make the organisation behave. When an agent missed one, I found the document sitting there, clear as day, and concluded it hadn't been strong enough. I strengthened it. If the miss happened again, I linked it from somewhere harder to overlook or reinforced it in another document.

Policies gained supporting contracts. Completion checks pointed back to policies. Routing documents appeared to make sure the other routing documents were discovered. I wanted every failure to become reusable engineering knowledge instead of hoping a conversation remembered it. Eventually everything in the repository was shouting at the same volume.

:::pullquote
If you shout “WOLF” at an agent enough, everything starts looking like a wolf.
:::end-pullquote

Agents regularly acknowledged a missed instruction with some version of: “mea culpa, that was there all along; I should have followed it.” I used to hear that as permission to make the rule louder. But putting words in a repository didn't mean those words reached the agent when it acted, or that the agent gave them the right priority.

One instruction beat another in the attention contest. Strengthening the loser might fix that exact miss and make the next contest worse.

## Receipts became their own paperwork

Agents love receipts. Ask for rigour and they'll happily produce reports, proof files, completion records and prose explaining what changed. Some have a real consumer: an independent verification result or a handoff can preserve something the commit doesn't.

A receipt whose only job is to say repository work happened is different. Git already knows. The receipt adds another surface that can become stale while forcing every future worker to decide what authority it has.

I tried to teach agents that disposable work should be disposed of, not commemorated. The anti-clutter rule grew policies, self-checks and supporting guidance. I had documents telling agents not to memorialise disposable work, and most of those documents were themselves disposable.

A report with no reader looked as permanent as a policy the next agent needed. A superseded plan could sit beside a live one; the file system kept both without telling anyone which had authority. I had to decide which things still did work, which belonged in history and which only made the next visit harder.

## A job, not a department

My old arrangement expected an agent to find a repository instruction telling it to become Albert, then take its place in the chain of command. If I need him for a research task now, a dispatched [Devin CLI](https://docs.devin.ai/cli/subagents) subagent profile gives that specialist his system prompt at the start. He can do the job without a permanent place on the chart.

That delivers Albert's brief. It doesn't decide which of two repository policies governs a task, and it doesn't stop an agent crossing a capability boundary; tool restrictions can do the latter. I didn't replace the named agents with profiles during the cleanup. The organisation came down before I had that alternative in hand.

## The cleanup project before the project

Eventually I stopped wanting to open the repository. I spent roughly a fortnight ruminating on the mess rather than returning with a sudden answer. What had to survive? What was clearly shite? Which things looked redundant but carried provenance I'd regret deleting? How could an agent classify roughly 300 documents without making me personally decide the custody of every one?

“Keep the repo tidy” wasn't enough. Neither was “delete anything that looks stale.” I sorted the material into live guidance, retained history, disposable residue and things ambiguous enough to stop and ask about.

That became [`cleanup-custody`](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/skills/cleanup-custody/SKILL.md). A surface needs a reason to remain live, a reason to be retained elsewhere or a reason to leave. When the answer depends on authority the worker doesn't have, cleanup stops rather than guessing.

The submodules went. The standing Will, Chris, Albert, Brian, Derek and Patch organisation went. Research, world-building and writing stayed. Reports and proof artefacts with no current consumer left because Git already held the history. I thinned out the routing and moved procedures I actually repeated into skills.

The novel still has research, world-building and manuscript boundaries. Some have more engineering around them now than when Albert, Brian and Derek were running the place. Evidence from research can be proposed into World, but it can't promote itself into the novel's canon. That rule exists without employing Albert to enforce it.

When an agent misses an instruction, I no longer treat the miss as automatic permission to write another one. I check the wording, the route and the required enforcement.

I simplified the repository until every surviving surface could answer one ordinary question: why are you here?
