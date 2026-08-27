# Cloud handoff addendum - The right test isn't your favourite test

**Status:** Final Cloud editorial-room handoff, 27 August 2026. This addendum supersedes the unresolved/open-discovery state at the end of `testing-evidence-cloud-discovery-record.md`. It is discovery custody, not publication copy or an admission decision.

**PR / branch:** `#36` / `codex/phase-7-testing-evidence-editorial-room`

## Accepted governing argument

The article is now titled **The right test isn't your favourite test**.

The accepted governing argument is: **the right test is the one that can falsify the next thing you are about to trust. Testing belongs inside iterative development, so its scope should change as the thing being trusted changes.**

Supporting operating principle: choose an observation boundary capable of answering the actual engineering question, then collect that evidence at a cadence its cost can support.

The emotional/engineering centre is resistance to unearned confidence. A GREEN result is entitled to claim only what the observation actually examined.

Harley's formulation that unlocked the reframe was: **`The right test isn't your favourite test.`**

This is deliberately not an article arguing that the test pyramid is wrong. A pyramid can be a useful heuristic. The article rejects letting a preferred taxonomy, favourite tool, coverage number or habitual test shape choose the evidence question for you.

## Deliberate curveball and decision

The required curveball was run after the conventional engineering and agentic material were coherent enough to challenge the original premise.

The materially different candidate was **testing strategy is feedback-loop design**. That frame explained the unit-suite/sharding economics, CD integration cadence and accepted visual-regression overhead, but Harley supplied the stronger process formulation: **don't only write tests before; don't only write tests after; iterative testing is part of iterative development.**

The room did not adopt the curveball wholesale. Instead it used it to stop the manuscript sliding into `the test pyramid, actually`. The accepted article combines the original evidence insight with iterative development and makes test choice an engineering judgement about the next thing being trusted.

This was an intentional governing-argument change, not title polish.

## Agentic worked example: pressure scenarios

Harley writes pressure scenarios for skills as TDD over agent behaviour.

1. Write a scenario that proves an agent misbehaves under a particular condition and exhibits a defined bad behaviour.
2. Run it against a subagent without the skill and observe RED.
3. Write or revise the skill.
4. Run the same pressure scenario with the skill until the targeted behaviour turns GREEN.

The answer to `how do we KNOW this skill does what it claims?` is therefore concrete: here is the scenario; run it without the skill and with the skill and observe the behavioural difference.

Preserve lineage: the RED/GREEN pressure-testing shape comes from `obra/superpowers`. Do not claim Harley invented skill TDD.

### Boundary of GREEN

Harley corrected an attempted result-custody detour: he does **not** expect consumers to record anything. The distributable object is the scenario that invites the skill to be tested.

A GREEN is contextual. A pass observed in the Marketplace repository does not guarantee a pass in another repository, harness, model or agent configuration.

Harley's open-source analogy is the clean engineering bridge: if you clone an open-source repository, you expect it to ship its tests. You would not accept `all these tests pass; here are our results; you don't need to run them again` as a substitute for being able to verify the code where you intend to rely on it. Shipping a skill is no different. Ship the test, not a universalised historical result.

That is the boundary of the agentic material in this article. Do not grow it into consumer result ledgers, formal observation custody or a separate agent-testing methodology. The point is that ordinary engineering honesty still applies when the implementation under test is prose shaping a non-deterministic system.

## Frontend closeout

Professional Playwright browser-journey automation is owned by QA, not Harley. Preserve that ownership distinction.

When Harley personally cares that a journey is coherent, he runs it as a user would use it. His formulation was that dogfooding his own work is as good a proof of usability as he can personally give.

Architectural qualification accepted during lens review: do not inflate dogfooding into proof that every user finds the product usable. It is first-party usability evidence that prevents declaring an assembled journey coherent without actually taking the journey.

## Three editorial lenses after the reframe

### £10k agency/value lens

The reframed manuscript was valued at **£8,750 / £10,000** at handoff. Harley explicitly said this clears the bar required from the time-boxed Cloud session.

The expensive problem is solved: the piece now has a proposition, lived technical evidence, individual engineering judgement and a closing argument it has earned. The remaining gap to a notional £10k finish is editorial subtraction and line-level finish rather than missing substance. A later local edit can plausibly remove roughly 10-15% where the argument has already landed without deleting an idea.

### Weary sceptical hiring manager

The accepted frame is safer to forward because it does not lead with AI, methodology branding or a tutorial on the test pyramid. The evidence of senior practice is in the decisions: delayed sharding with scale-friendly organisation, composition evidence, build-bound integration results, deliberate visual-regression noise, accessibility judgement, QA ownership boundaries and the transfer of RED/GREEN discipline into skill pressure scenarios.

Failure mode to avoid during local stand-up: reintroducing too much Testing 101 before those judgements become visible.

### Jaded cynical architect

The main hostile reading is `congratulations, you discovered the test pyramid`. The rewrite must keep taxonomy subordinate to the argument.

Claims that need their honest boundaries preserved:

- integration tests prove the build actually tested; environment-specific behaviour still needs environment-specific evidence;
- dogfooding is useful first-party usability evidence, not universal usability proof;
- visual RED is a prompt for inspection, not automatically a defect verdict;
- an accessibility scan enforces only what it actually checks and does not replace judgement;
- one agentic GREEN is an observation in that model/harness/repository/agent context, not a universal property of the skill.

The desired architect reaction remains: strip the presentation away and the engineering judgement still holds.

## Reusable editorial tool discovered in this room

The room independently backed into the familiar rhetorical shape of a **hot take** while trying to find a governing argument.

Internal pressure test: **`I say X; fight me.`**

Reader-facing posture: **`Bold claim. Click here to see me prove it.`**

The useful editorial rule is not `be provocative`. When a candidate article is descriptive, taxonomic, agreeable or trapped in `it depends`, ask whether it can make a clear proposition a competent reader could dispute and then earn that proposition with evidence and honest boundaries.

This reusable tool has been persisted in the shared Phase 7 editorial README so future rooms encounter it directly.

## Local Sol handoff

Use `testing-evidence-cloud-first-draft.md` as the £8,750 Cloud manuscript to stand up into the production article frame.

Preserve:

- title: **The right test isn't your favourite test**;
- governing argument and iterative-development spine;
- engineering-first centre of gravity;
- lived scale and judgement examples;
- the narrow agentic pressure-scenario transfer and Superpowers attribution;
- all factual/privacy/uncertainty boundaries recorded in the main discovery record and this addendum.

Local work still owns the aggressive final edit, article-frame integration, factual/source refresh where needed, presentation, any admission decision and publication proof. This Cloud room does **not** make an admission decision or claim publication readiness.

Harley accepted the path and ended discovery with: the £8,750 bar is enough for this time-boxed session; cleanup and durable handoff are the only remaining Cloud work.

## Cross-article ledger reconciliation

No new cross-article thread entry is required. The engineering examples all pay the Testing article directly. The reusable hot-take argument diagnostic belongs in shared editorial-room guidance and has been placed there rather than misclassified as a future article thread.

## Time-box stop condition

The Cloud clock stops when the final handoff commit containing this addendum, the £8,750 manuscript status, the corrected Testing read order and the generated index update is verified on the same PR branch. No further Cloud editorial discovery is expected after that verified branch head.
