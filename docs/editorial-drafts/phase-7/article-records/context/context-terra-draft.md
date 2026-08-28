Status: Terra draft for Sol and Harley, not publication-ready

# Context is not the same as state

A conversation is a good place to work something out. It can hold a half-formed diagnosis, a competing design, a question that needs an answer and the useful detours that lead there. That flexibility is a feature. A project still needs to survive the point at which the conversation is shortened, closed or handed to someone who was not there.

That survival depends on a different thing: durable state. If a decision, constraint or result now governs the work, it needs a home outside the current conversation where another person can inspect it, challenge it and find out whether it is still current. The conversation may explain how the team arrived there. It cannot be the only place the project keeps the answer.

## Working context has a short life

Context is the material a worker has loaded for the present job. It might include the task, recent messages, a file it has just read, a summary of earlier work and a provisional conclusion. It is necessarily selective. A good worker does not need the whole project in view to make every small decision.

That is why conversation is useful. It lets a team explore before every thought has to become a record. It also makes a poor filing system. The context window has limits. A summary can preserve the headline while losing a qualification, a source, a rejected option or the reason an exception was accepted. A new worker may receive a useful brief without receiving the exact evidence behind it. Neither event is a mistake. They are normal properties of a working medium.

The dangerous move is quietly promoting working context into project truth. "We discussed that" is not enough when the next change relies on the decision. "The agent remembers" is even less useful when the agent has been replaced. A transcript can be evidence of a discussion, but it does not automatically tell a later reader which conclusion was accepted, who could change it or whether later work superseded it.

## State needs more than a place to sit

A file is durable in a way a conversation is not, but durability alone does not make it authoritative. A stale note, an unreviewed report and a generated file with no identified source can all survive perfectly well while misleading the next worker.

Governed state answers a few ordinary questions:

- What does this record claim to be?
- Who or what is allowed to change it?
- Which version is current, and what revision or evidence supports it?
- Where does a reader look when it conflicts with another record?
- How is it checked, replaced or retired?

The exact home depends on the job. A decision may belong in an ADR. A behaviour claim may belong in a test and the code it exercises. A release result may belong in a reproducible receipt. A project boundary may belong in repository guidance. The point is not to turn every conversation into Markdown. It is to materialise the things the project must carry forward, then make their authority and lifecycle legible.

Versioning matters because state changes. A durable record should be possible to compare with the record that came before it. A reader should be able to see whether an old decision remains in force, was replaced, or is merely historical context. When a record has consequences but no owner, no revision and no route for reconsideration, it asks future workers to guess at all three.

## Materialise the handoff from thought to project truth

There is a useful boundary between deciding something in a conversation and making it part of the project. On one side are hypotheses, open questions and working explanations. On the other is an artefact that a later reader can retrieve independently: a changed source file, a decision record, a test, a plan, a schema, a checked result or an explicit issue.

Crossing that boundary should be deliberate. The worker writes the result to its proper home, gives it the information needed to be interpreted, and puts it through whatever review or validation the claim requires. Only then is there something durable for the project to inspect. The conversation can point to that artefact, but it should not substitute for it.

This is not a demand to write down every intermediate thought. Requiring a permanent record for every sketch makes exploration slow and gives temporary ideas more authority than they deserve. The test is simpler: will a later person need this to understand, verify, change or safely operate the work? If so, leaving it only in context creates a dependency on a conversation that has no reliable lifecycle.

## Recovery is a design requirement

Compaction and worker replacement are useful tests of whether a project has kept its shape. A replacement worker should be able to begin with the task, find the governing records, inspect the current revision and run the relevant checks. It should not have to reconstruct hidden facts from a prior worker's prose or take a session summary as an unexamined source of truth.

That does not mean a fresh worker starts from nothing. A concise summary can say what to inspect and why it matters. It is navigation. It becomes dangerous only when it is treated as the final authority for a fact that can still be checked at source. A handover saying "the test passed" is weaker than a handover that identifies the exact revision, the command or receipt, and the boundary of what the result examined.

This is where live verification earns its place. Durable state gives the next worker something to verify; it does not abolish the need to verify it. Source files can drift, external services can change, assumptions can expire and a green check can cover less than the claim attached to it. The responsible recovery sequence is to locate the governed record, establish the current version, inspect its evidence and rerun or refresh the relevant check when the fact is volatile. Persistence makes recovery possible. It does not grant permanent truth.

## Keep the neighbouring ideas in their own jobs

The review graph has a different concern. It governs a workflow: which transition is permitted, what evidence a step needs and how a process can stop honestly. The graph can itself be durable state, but the question here comes earlier. Where does a project keep the decisions, constraints and receipts that the workflow needs to examine?

Pass References has a different concern again. It describes the compact handoff: a worker receives a reference, resolves the material it needs and returns a reference or receipt instead of copying an entire artifact into another conversation. That is a useful transport mechanism. This article establishes the prerequisite: there must already be governed material worth referencing, with enough authority, version and availability for the recipient to rely on it.

Keeping these distinctions clear helps a team diagnose the right problem. A broken handoff may need a better reference. A looping process may need a stronger transition rule. A project that cannot survive either may first need a durable home for its truth.

## Make the project recoverable

The practical habit is modest. Before a session ends, identify what became project truth and where it now lives. Record the decision, implementation, evidence and ownership at the smallest useful scope. Link to the source instead of copying it into a second, competing record. Leave open questions open, rather than smuggling them into a conclusion because the conversation is ending.

Then make recovery ordinary. Another worker should be able to replace the conversation with inspection: find the record, establish what is current, see what it proves, and discover the next safe action. Conversation remains the place where people and agents think together. Durable state is how the project remembers what they decided.

## Source and fact custody

| Material | Exact source inspected | Permitted use in this draft | Boundary |
| --- | --- | --- | --- |
| Governing claim, article responsibility and distinction from Graph and Pass References | `.agents\specs\2026-08-21-portfolio-10k-07-writing-authority-design.md`, sections `### Context is not the same as state`, `### Pass references, not paragraphs`, and the article-responsibility table, inspected at portfolio checkout `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Defines this draft's argument: durable governed truth, not runtime workflow governance or handoff mechanics. | Editorial authority for the draft, not proof of a runtime or deployment claim. |
| Existing Context candidate | `src\client\src\data\content\writing\2026-08-07-context-is-not-state.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` and `origin/main` `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Supplies the title, existing governing idea, materialisation and compaction themes. | Candidate prose only. Existing publication status is not editorial admission. |
| Existing Pass References candidate | `src\client\src\data\content\writing\2026-08-15-pass-references-not-paragraphs.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` and inspected from `origin/main` `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Establishes the separate reference-read-write-receipt handoff argument. | Used only to prevent duplication; its operational claims need their own publication review. |
| Existing Graph candidate and Phase 7 plan | `src\client\src\data\content\writing\2026-08-22-graph-iterative-review.md` and `.agents\plans\portfolio-10k\2026-08-25-portfolio-10k-phase-7-writing-authority.md` at checkout `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Establishes Graph's separate workflow-governance responsibility. | The older Graph prose and plan are not authority for current Marketplace implementation facts. |
| Active portfolio copy policy | `.agents\doctrine\portfolio-design-policy.md`, inspected in the current checkout | Sets the human-voice, no-em-dash, proof-before-pitch and honest-state constraints for later editorial work. | Presentation policy, not technical evidence. |
| Live repository comparison | `git diff --quiet f500c55ba6fb61af85e3c2be434bdc53a3893805 593c07d2b3233c7eadced986646ae3fb1edcbdd6 -- src/client/src/data/content/writing/2026-08-07-context-is-not-state.md`, run 26 August 2026 | Confirms the existing Context candidate was identical on the observed `origin/main` revision. | A source comparison only; it does not establish that the article is publication-ready or that every statement remains current. |

## Open Harley questions

- Is there a public-safe incident where a missing decision record, stale note or lost qualification changed the next engineer's work? A real example would give the opening a scar without inventing one.
- Which durable-state homes should the finished piece make concrete: ADRs, test results, repository guidance, release receipts, or a narrower selection from Harley's own practice?
- Does the final article need a small visual contrast between transient working context and governed state, or can that distinction stay entirely in the prose?
- How far should the finished version go on treating session summaries as navigation rather than evidence? The present draft states the principle without making claims about any specific tool's compaction behaviour.
