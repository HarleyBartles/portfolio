# Why ADRs?

Status: Terra draft for Sol and Harley, not publication-ready

I learned the cost of missing architecture decisions on a system that had enough complexity to make every shortcut look tempting.

Early in my career, I spent roughly two years on Barbican and Arch, a complex enterprise system built by a three-person team. I was learning alongside a senior engineer with real experience of DDD, CQRS and event sourcing. Those patterns were field-acquired tools for dealing with a domain that had more rules, states and consequences than a simple CRUD model could carry comfortably.

The architecture substantially earned its cost. That is important, because the story is easy to flatten into a warning about clever architecture. A later plan assumed a simpler replacement would get to delivery much faster. It encountered much of the same domain complexity. The hard part had not been invented by the first team.

The system still left a scar. Too much of the reasoning stayed in people's heads. When the original team's knowledge disappeared, the organisation could no longer own the system confidently. The issue was not that every decision had been perfect. It was that a later engineer couldn't see what had been tried, why it had failed, what the surviving choices cost, or what would make those choices wrong.

That is why I write ADRs.

## A decision needs a future reader

An ADR is useful when it carries the part of a decision that code can't reliably explain. Code tells you what exists. It may hint at a constraint. It rarely tells you which plausible routes were examined, which one was chosen, and why an apparently simpler approach was rejected.

If nobody records what was tried and why it was rejected, tomorrow's engineer pays again for yesterday's learning. They reopen the same investigation with less context, then either recreate a failure or preserve a decision they cannot challenge. Neither outcome is good stewardship.

I want a useful decision record to answer six things:

1. What was the context?
2. What did we decide?
3. Which alternatives did we reject?
4. What evidence or experience led to those rejections?
5. What consequences did we accept?
6. What would make us reconsider?

That last question changes the tone. An ADR is not a victory speech for the architecture we happened to choose. It is a bounded statement: this fits the problem and the evidence we had, and these are the conditions under which it should be questioned again.

## Write down the routes people will rediscover

I don't write an ADR for every experiment. Most local choices can stay local. I record an alternative when a competent future engineer could reasonably find it, propose it, and spend serious time arguing for it.

The rejected route needs more than its name. "We considered a simpler model" is nearly useless if it leaves out the behaviour that made it fail. The future reader needs the constraint, the evidence and the cost. Perhaps the model could not protect an invariant. Perhaps it would have made replay impossible. Perhaps it solved the happy path by moving the operational risk somewhere less visible. The point is to leave enough evidence for someone else to decide whether the old constraint still applies.

Mistakes belong here too. A malformed implementation can expose a boundary that a polished final design hides. A decision is stronger when it says what was falsified, what it cost, and why the correction was made. The record gives a future engineer permission to challenge the decision with new evidence, rather than treating it as tribal law.

## A kitbag, not a creed

Barbican and Arch taught me a useful architectural kit. DDD, CQRS and event sourcing can earn their weight when the domain needs them. They can also be an expensive way to make a smaller problem harder to understand.

I wouldn't start from the assumption that a complex-sounding domain requires that exact family of patterns. Other architectures and ecosystems solve difficult problems well. The question is whether the boundaries, history and behaviour of the specific problem justify the cost of explicit models, separated reads and writes, or an event stream that must remain replayable.

That is also why the labels are not enough. A system can emit events beside mutable state and still fail to deliver the consequences that make event sourcing valuable. If the event stream cannot rebuild the relevant state, calling it event sourcing is a comforting description rather than an architectural fact.

## Public corroboration, separate from the earlier system

Wild Bunch gives me a public place to practise the same discipline without turning the earlier professional account into a case study. Its [ADR-0028](https://github.com/HarleyBartles/wild-bunch/blob/b095031388e8f8ca175f6639f8e460582e8ffb1d/docs/adr/ADR-0028-onion-ddd-cqrs-event-sourcing-and-projections-posture.md) records a correction: event recording alongside snapshot mutation does not meet the intended event-sourcing posture. It records other rejected options, their conditions, accepted trade-offs and review triggers.

The surrounding public evidence makes the record answerable. A [full replay equality test](https://github.com/HarleyBartles/wild-bunch/blob/b095031388e8f8ca175f6639f8e460582e8ffb1d/tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs) checks that loading from the event stream produces the same state as loading from a snapshot. A [versioning test](https://github.com/HarleyBartles/wild-bunch/blob/b095031388e8f8ca175f6639f8e460582e8ffb1d/tests/WildBunch.Integration.Tests/Versioning/VersionMismatchBehaviorTests.cs) treats stale projections and future event versions differently. A [projection test](https://github.com/HarleyBartles/wild-bunch/blob/b095031388e8f8ca175f6639f8e460582e8ffb1d/tests/WildBunch.Application.Tests/Projections/GameLogEntryLegacyProjectionTests.cs) states that the event stream is the authoritative record for the covered history while the older log becomes a derived projection.

Those are public facts about Wild Bunch, not evidence about Barbican or Arch. They show what I mean by a decision record that can be checked: the claim, the rejected half-pattern, the trade-offs, the proof surface, and the circumstances that trigger review all live together.

## The work is to leave a system ownable

The goal is not to preserve every meeting or make future engineers obey us. It is to give them a fair starting point. They should be able to understand a difficult decision, test its assumptions, see the cost we accepted, and replace it when the facts change.

That is the institutional memory I missed. A team can make good decisions and still leave a system brittle if the reasoning disappears with them. Writing it down does not make an architecture simple. It makes the complexity legible enough for the next person to own.

## Source and fact custody

| Authority | Facts or material used | Use in this draft | Limits |
| --- | --- | --- | --- |
| Harley's first-party Barbican and Arch account | Roughly two years on a complex enterprise system; three-person team; learning alongside a senior engineer experienced in DDD, CQRS and event sourcing; substantial domain complexity; architecture substantially earned its cost; tacit reasoning later left the organisation unable to own the system confidently; a simpler replacement encountered much of the same complexity | Professional provenance and the article's central organisational lesson | Sole authority for this account. No customer, employer, date, system-topology, motive or outcome detail added. |
| Wild Bunch public repository, pinned `b095031388e8f8ca175f6639f8e460582e8ffb1d` | ADR-0028's explicit rejected options, trade-offs, implementation status and review triggers; replay, versioning and projection tests | Separate public corroboration of the decision-recording practice | Does not corroborate the Barbican/Arch account or establish a general rule beyond the project's covered behaviour. |
| Editorial inference | Decision records reduce repeated investigation by preserving reasons that source code alone may not show | Governing argument and conclusion | An inference, not a measurable claim about all teams or systems. |
| Portfolio Phase 7 editorial brief | Required six record elements, custody separation and voice/privacy boundaries | Draft constraints only | Internal instruction, not a public factual source. |

## Open Harley questions

- Is "Barbican and Arch" the preferred public naming, including the conjunction, or should the article use a more general description?
- Does the phrase "the organisation could no longer own the system confidently" accurately preserve the intended level of consequence for publication?
- Should the public Wild Bunch section name ADR-0028 directly in the body, or should the final article keep the source links in a custody note or references section?
- Is the first-person use of "I write ADRs" the desired level of personal voice, or would Harley prefer the scar to remain one step further from the foreground?
