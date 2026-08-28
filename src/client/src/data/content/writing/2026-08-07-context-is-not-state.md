---
title: I made agentic engineering harder than it needed to be
date: 2026-08-07
summary: I built an agent organisation around a novel that only needed three domains. The cleanup became a public skill with a private repository's war stories behind it.
---

# I made agentic engineering harder than it needed to be

My [`cleanup-custody`](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/skills/cleanup-custody/SKILL.md) skill doesn't shout “WOLF” at an agent and hope repetition becomes governance. It makes the agent ask what a repository surface is for, who still needs it and whether it has enough authority to act. Those questions end in one of four outcomes: keep it live, retain it elsewhere, remove it or stop.

I built the skill because I'd made a private repository that badly needed cleaning up. I had put an agent organisation around research, world-building and writing for a novel, then filled the repository with enough rules, reports and proof files that returning to the novel felt like accepting a cleanup project first.

There were roughly 300 agent-facing documents by the time I had to unwind it. Taking agentic engineering seriously had become its own source of unnecessary complexity.

> **The repository remembered too much.**

## The organisation around the novel

The novel has three real domains: research, world-building and writing. My first implementation gave them separate Git repositories wired together with submodules, then represented each domain as a standing employee.

Will represented my will. He was me in agent form, there to make my intent concrete. Rooms, the novel project, reported to Will through Chris, its Project Director. Chris had three heads of department beneath him: Albert the Archaeologist for research, Brian the Librarian for world-building and Derek the Novelist for writing.

The organisation crossed repository boundaries. Adventures of Patch had Patch as its responsible agent reporting into Will. Other branches may have existed, but the point isn't the roll call. I had built a chain of command across my projects. Rooms alone had a project director and three department heads. Another project only needed a project director who also did the work.

That's a ton of bureaucracy for “do some work please”.

I wanted it to be obvious who owned what and where the work went next. A task went in at the top, travelled down to the agent responsible and came back up through reports. The characters weren't the mistake. Albert is still a perfectly good name for a research specialist. The expensive part was maintaining him as an employee with persistent responsibilities, routing rules and reporting relationships.

> **The novel needed research, world-building and writing. It didn't need an organisation.**

The repository is private because the novel draws on lived experience and real people. I can't link its history, but I'm happy to screen-share the engineering in an interview, subject to a reasonably strong stomach for profanity. The novel pulls no punches.

## I tried the packaged version

[WorkClaw](https://www.workclaw.com/blog/introducing-workclaw) launched while my named-agent hierarchy was still live. Its collaborative AI coworkers could coordinate with one another, which was close enough to my hand-rolled organisation to make a useful second experiment.

I rebuilt a miniature version of the novel-writing organisation in WorkClaw. The $100 startup credit got me through setting it up and one small smoke task. I gave it the benefit of the doubt and bought a monthly subscription anyway. Then I left the organisation largely idle for a couple of days and watched the paid allowance disappear too.

WorkClaw's team told me their “heartbeats”, agents periodically waking up to check for work, were consuming far more credits than expected. Their planned fix was to move lightweight work onto lower-cost models and increase the heartbeat interval. They covered the resulting overage.

Moving my home-grown organisation into a packaged one no longer looked like a solution. The experiment forced the more useful question: had this novel earned an organisation at all?

It hadn't. Somebody else had built a plausible version of the same abstraction, and my novel still didn't need it.

## A role is not a sign on the wall

I removed the named agents when I decided the novel hadn't earned an organisation. I didn't replace them with profiles. Looking back with the tooling I have now, profiles are the better implementation answer: if a project genuinely benefits from a specialist Albert, I can dispatch one without employing him full-time.

Give him a personality if you like: call the profile Albert the Archaeologist and tell him he loves digging deep into archival material. None of that costs anything while the profile sits unloaded. It gets expensive when Albert becomes a standing employee: permanently routed, repeatedly provisioned and expected to report through an organisation.

In [Devin CLI](https://docs.devin.ai/cli/subagents), a hypothetical Albert could literally live at `.devin/agents/albert/AGENT.md`. The directory names the profile. The file body becomes Albert's system prompt, and its frontmatter can choose his model and restrict his tools. The singular filename matters: this is the same instruction-file mechanism as a root `AGENTS.md`, scoped to exactly one agent.

That guarantees the job specification reaches Albert's starting context. It can't guarantee he obeys every line. The `allowed-tools` frontmatter does a different job: it can prevent him from crossing a capability boundary even if the prose fails.

My old system had signs on the wall. One effectively said: you've entered archaeology; bind as Albert now. The agent had to find that guidance, understand it and give it the right priority among everything else in the repository. If the project had actually needed Albert, a dispatched profile wouldn't have needed to discover its own job description.

I used to blur instruction delivery and capability enforcement because both could be described in Markdown. They govern different failure modes.

The novel still has research, world-building and manuscript boundaries because they own different things. Material crosses them deliberately. Evidence from research can be proposed into World, but it can't promote itself into the novel's canon. That rule exists without Albert being employed to enforce it.

## The document was there

My understanding of agent-facing repository material was fairly mushy at the time. Doctrine, policy, governance, contracts, runbooks and skills were all ways of writing down something I wanted an agent to know. I hadn't yet understood that putting words in a repository doesn't make those words govern an action.

When an agent violated an existing instruction, I found the document sitting there, clear as day, and concluded that it hadn't been strong enough. I strengthened it. If the miss happened again, I linked it from somewhere harder to overlook or reinforced it in another document. Policies gained supporting contracts. Completion checks pointed back to policies. Routing documents appeared to make sure the other routing documents were discovered.

I wanted every failure to become reusable engineering knowledge instead of hoping a conversation remembered it. Eventually everything in the repository was shouting at the same volume.

> **If you shout “WOLF” at an agent enough, everything starts looking like a wolf.**

Agents regularly acknowledged a missed instruction with some version of: “mea culpa, that was there all along; I should have followed it.” I used to hear that as permission to make the rule louder.

The repository already contained too many things that were hard to miss. One important instruction beat another important instruction in the attention contest. Strengthening the loser might fix that exact miss and make the next contest worse.

## Receipts became their own paperwork

Agents love receipts. Ask for rigour and they'll happily produce reports, proof files, completion records and prose explaining what changed. Some have a real consumer. An independent verification result, audit record, deployment receipt or handoff can preserve information the commit doesn't.

A receipt whose only job is to say repository work happened is different. Git already knows. The receipt adds another surface that can become stale while forcing every future worker to decide what authority it has.

I tried to teach agents that disposable work should be disposed of, not commemorated. The anti-clutter rule grew policies, self-checks and supporting guidance. I had documents telling agents not to memorialise disposable work, and most of those documents were themselves disposable.

Persistence doesn't create authority, usefulness or truth: a stale report and a superseded plan can both persist. Two slightly different policies can also survive and leave the next agent to decide which one wins.

## The cleanup project before the project

Eventually I stopped wanting to open the repository. Continuing the novel meant accepting a cleanup project before I could do the work I cared about.

I spent roughly a fortnight ruminating on the mess rather than returning with a sudden answer. What had to survive? What was clearly shite? Which things looked redundant but carried provenance I'd regret deleting? How could an agent classify roughly 300 documents without making me personally decide the custody of every one?

“Keep the repo tidy” wasn't enough. Neither was “delete anything that looks stale.” The useful classification was live guidance, retained history, disposable residue and material ambiguous enough to stop and ask about.

That became `cleanup-custody`. A surface needs a reason to remain live, a reason to be retained elsewhere or a reason to leave. When the answer depends on authority the worker doesn't have, cleanup stops rather than guessing.

The submodules went. The standing Will, Chris, Albert, Brian, Derek and Patch organisation went. Research, world-building and writing stayed. Reports and proof artefacts with no current consumer left because Git already held the history. I thinned out the routing and moved procedures I actually repeated into skills.

I simplified the repository until every surviving surface could answer one ordinary question: why are you here?

## Files are not state just because they're files

When I first outlined this article, one of its central lines was: “Memory is context. Files are state.” It was useful shorthand and too neat for what I'd learned. A repository file can be durable while stale, superseded, ambiguous or non-authoritative. Calling every persistent artefact state hides the failure that made this repository difficult to operate.

I now use state to mean material the project deliberately carries forward. It has a reason to survive the conversation. Its authority is legible enough that a later worker can decide whether to trust it. If it can become stale, there is some way to recognise, replace or retire it.

Context is what the current worker needs to act correctly now. Governing state still has to reach that worker at the point where it applies. A decision can be perfectly durable and govern nothing because the agent never encounters it. A conclusion future work depends on can't remain only in conversation.

If something matters after the conversation ends, it needs to become state. When a later task needs it, the relevant bit has to come back into context. Plenty of information can safely disappear instead.

## Get out of your own way

I still use profiles, skills, contracts, routing, custody rules and hard capability boundaries where they earn their keep. Some parts of the novel have more engineering around them now than they did when Albert, Brian and Derek were running the place. These days I can explain what each bit of machinery is buying me: a real domain boundary, the right specialist for a job, a restriction the agent can't talk its way around, or a record somebody will actually need later.

When an agent misses an instruction, I no longer treat the miss as automatic permission to write another one. I check the wording, the route and the required enforcement. Sometimes the repository already contains enough words.

I still engineer the real boundaries. The theatre can get out of the way.
