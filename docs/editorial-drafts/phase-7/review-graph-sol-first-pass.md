Status: bounded Sol first pass for Harley-led Cloud discovery, not publication-ready

# The review graph didn't make the review trustworthy

I built an iterative review graph because a checklist gave the orchestrator too much freedom. It could skip from a cheap scan into deep review, repair a finding without checking the repair, or send the same reviewer back over its own work until somebody hit a round cap. The checklist described the route I wanted. The agent still got to choose the next turning.

The graph fixed that problem. It gave the review an explicit state, guarded every transition and made `blocked` a legitimate place to stop. Then it exposed a harder one: a disciplined route through a review process doesn't prove that the review covered the work.

I had built a real graph. I hadn't yet built a trustworthy green.

## The checklist was a menu

The first workflow read sensibly from top to bottom. Run deterministic checks, compare the change with its declared scope, ask a cheap reviewer to catch obvious defects, dispatch specialist lenses, repair the findings, run a strong final review and close the pull request.

The trouble was in the joins. A language model could treat those steps as suggestions rather than legal transitions. It could fix a preflight failure and continue without proving preflight was green again. A specialist could find a defect, inspect the subsequent repair and quietly widen its attention to the whole branch. The review would begin reviewing its own edits, generating plausible new work from the context it had created.

I moved the control flow into an explicit state graph. The state records the branch, base and head, the current node, the previous node, the current round and the repair limit. A router reads that state and the append-only finding records, then permits one next node. The orchestrator can no longer choose whichever review activity feels useful in the moment.

That machinery earns its keep only because the next action had become a source of risk. A small change reviewed by one capable engineer doesn't need a state machine. This workflow is intentionally expensive. Its economics make more sense when cheaper agents can take narrow passes and the likely cost of unstructured rework is higher than the coordination overhead.

## Discovery and repair are different jobs

The most useful boundary in the graph separates finding a problem from verifying its repair.

Deep reviewer lenses inspect the change from bounded perspectives. Triage records where a finding came from, how serious it is and whether it should be repaired, deferred or escalated. An important finding enters a repair route. A contested or load-bearing one can stop at `blocked` rather than being polished into an accidental agreement.

After a repair, the originating lens doesn't receive the whole branch again. The graph reruns deterministic checks, then gives `reviewer-fixes` the original finding, the originating checklist and a diff limited to the repair's blast radius. Cross-cutting repairs take a separate regression route. Findings and resolutions live in append-only ledgers so a later pass can't casually rediscover a closed issue and restart the cycle.

The distinction is ordinary engineering: verification should be scoped to the claim the fix is meant to satisfy, while regression work follows the consequences of the change. Giving an agent more context isn't automatically safer. Sometimes it gives the reviewer enough room to manufacture a fresh assignment.

## A useful graph knows how to stop

The graph models two honest endings. A clean final route may reach `ready`. Missing tools, contested findings, unsafe uncertainty or an exhausted repair limit reach `blocked`.

Making `blocked` first-class matters because agentic workflows have a strong bias towards continuing. Another prompt, another reviewer and another repair all look productive. A bounded stop says that the available process couldn't settle the question safely and preserves it for somebody who can.

The positive exit is deliberately narrow too. Important findings need recorded resolutions. Repairs return through preflight. A strong whole-branch pass comes after the repair queue closes. Closeout checks the surrounding delivery obligations before the pull request can leave draft.

That is much stronger than a checklist. It still doesn't justify the word trustworthy.

> **A review graph can prove which route was followed. It can't prove that the route covered the work.**

## I audited the word green

The first graph had explicit state, narrow repairs, regression scanning, finding custody and terminal exits. It also had gaps large enough to make its apparent confidence misleading.

Lens selection was heuristic. A change could match no deep lens and continue. A diff slice could make a review cheaper while hiding an affected dependency. The final strong reviewer could inherit earlier conclusions and mistake agreement for independence. Reports and hashes could show that local records were internally consistent without proving who produced the evidence, what exact bytes they reviewed, or whether the remote pull request still pointed at the same head.

The graph controlled sequence. It didn't establish complete coverage, independent challenge or trustworthy evidence custody. A `ready` result could therefore mean that the legacy sequence completed, not that every relevant obligation had been reviewed or every receipt belonged to the exact pull-request snapshot now in front of the reader.

That distinction is now explicit in the shipped skill. Version one is human-opt-in review assistance for non-frontier orchestrators. Frontier models use ordinary self-review and canonical validation. Its terminal `ready` value is not allowed to authorize a `reviewed-green` claim.

## Trust needs a smaller claim and stronger receipts

The accepted replacement design starts by defining what green would have to mean. One immutable snapshot must bind the repository, base, head, tree, diff, governing authority and required checks. Every changed and affected surface needs a review obligation. Findings at every severity need evidence-backed dispositions. Local checks, reviewer attestations, final review, closure audit and hosted CI must all refer to the same epoch. Missing authority, unavailable reviewers, truncated reports, stale inputs and unresolved assumptions must block.

That design is intentionally stricter than “run more reviewers”. It proposes independent semantic and contract impact maps, a challenger looking for omissions, risk-based review assignments, structured attestations, immutable evidence custody, blind final review, a separate closure audit and fresh remote verification at presentation time. It also separates process soundness from detection quality. Deterministic tests can prove that incomplete evidence cannot become green. A benchmark is still needed to show that weaker reviewer routes reliably find a stable set of defects.

Only the design, seven-plan roadmap and first implementation plan are published today. The replacement kernel hasn't landed. The current graph remains useful legacy assistance with an honest limit around its claim.

That incompleteness is part of the story. I didn't respond to an untrustworthy green by renaming it, adding more ceremony or trusting the final reviewer harder. I reduced the claim the existing system was allowed to make, wrote down the predicates a stronger claim would owe its reader, and planned the work needed to make each predicate inspectable.

## The graph is still worth having

The first graph solved real problems. It removed convenient jumps, separated discovery from repair, kept finding history and made stopping lawful. Those are useful properties even when the system can't prove exhaustive review.

Its failure was subtler than a broken router. I had mistaken a well-governed process for evidence that the process had examined everything that mattered. The replacement design keeps the graph and moves trust into the boundaries around it: authority, coverage, independence, evidence provenance, snapshot identity and honest presentation.

That is the engineering judgement I want the finished article to carry. Agentic review doesn't become dependable because enough agents agreed or because a state machine reached its happy node. Dependability begins with a claim narrow enough to defend and evidence strong enough to survive somebody asking exactly what the green means.

## Discovery seams for Harley and Cloud Sol

This pass deliberately leaves the personal story unresolved. Cloud discovery must establish rather than infer:

- what first made Harley distrust the graph's apparent green, including whether there was one incident or an accumulation of design audit findings;
- which part of the legacy graph Harley is proudest of and which part now makes him wince;
- what emotional or engineering judgement moved him from improving the old router to specifying a replacement trust model;
- how much of the cheap-agent economics belongs in public copy;
- whether “I audited the word green” sounds like Harley's own framing or editorial shorthand;
- what a sceptical architect should be free to disagree with after accepting the core argument;
- what is implemented, planned, experimental, uncertain or too private to publish; and
- which concrete source excerpts or repository artefacts deserve to appear as receipts rather than below-the-waterline research.
