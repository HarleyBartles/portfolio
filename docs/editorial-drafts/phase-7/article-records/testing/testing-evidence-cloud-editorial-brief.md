# Cloud editorial handoff — Tests are different kinds of evidence

**Status:** Opening brief for a time-boxed Cloud Sol editorial room on this branch's draft PR.

## Your job

Work conversationally with Harley for **three hours, with an absolute ceiling of five hours**. Discover the story behind the Testing candidate and produce the complete article copy. The existing premise may prove strong, weak or pointed at the wrong article. Do not defend it merely because it is already written, and do not reject it merely because it begins as a technical essay.

This is a story and argument room, not an implementation task. Do not build the public page, choose final imagery, make an admission decision or claim publication readiness. Local Codex will handle production and visual judgement after Harley accepts the copy.

## Authority

Harley is the authority on his experience, intended meaning, confidentiality boundary and voice. Repository evidence can verify public implementation facts; it cannot tell you what Harley thought, learned or meant. Ask. Do not fill a factual gap with plausible prose.

You own the conversational discovery and manuscript craft under Harley's direction. Keep qualifications that matter. Credit inherited practice before describing Harley's extension. Treat fatigue patterns as editorial evidence, never as forbidden-phrase rules.

## Read order

1. `docs/editorial-drafts/phase-7/article-records/testing/testing-evidence-terra-draft.md`
2. `docs/editorial-drafts/phase-7/article-records/testing/testing-evidence-sol-first-pass.md`
3. `.agents/specs/2026-08-21-portfolio-10k-07-writing-authority-design.md`, beginning at `### Tests are different kinds of evidence`
4. `.agents/plans/portfolio-10k/2026-08-25-portfolio-10k-phase-7-writing-authority.md`, using its Testing evidence and originality boundaries
5. `docs/editorial-drafts/phase-7/cross-article-thread-ledger.md`
6. The testing, validation and pressure-test source surfaces named in the Terra draft, only as needed to verify claims that survive discovery

The Sol first pass is a stronger editorial starting point, not settled copy. Its unsupported weakness is deliberate: no new story context was invented locally.

## Begin with discovery, not line editing

Establish:

- the real event or repeated frustration that taught Harley tests were different kinds of evidence;
- what failed, passed misleadingly or remained unobserved;
- why it mattered beyond this portfolio's own CI machinery;
- the judgement Harley now applies before choosing a test;
- which parts are established engineering practice and which decision is distinctly his;
- what is publicly verifiable, privately owned, uncertain or unsuitable for publication;
- what a weary hiring manager should understand differently after a fast read; and
- which part a cynical architect might call obvious, plus the concrete evidence that makes the article worth publishing anyway.

Ask one useful question at a time. Follow Harley's answers rather than marching through a questionnaire.

## Use a curveball reframe deliberately

Once enough evidence exists for a coherent argument, propose at least one materially different governing argument. Reuse the discovered facts to ask whether the article becomes more salient when the premise changes. The Review Graph article improved when “the graph I built and why I can't trust it” became “if you write loops, don't be surprised when your agent starts looping.” Seek that scale of reframing, not a cosmetic title swap.

Harley decides whether the curveball earns adoption. If it does, carry the new argument through the whole manuscript and durable notes rather than leaving two competing articles stitched together.

## Persistence cadence

Keep a repo-local answer log current throughout the conversation. Record each material answer, correction, factual boundary, accepted editorial decision and valuable cutting-room thread while it is fresh.

Do **not** commit on every turn. Commit and push a coherent checkpoint only when the recovery value justifies interrupting the room, such as:

- a meaningful batch of questions has been answered;
- the factual boundary or governing argument changes;
- a curveball reframe is accepted and reconciled through the notes;
- context or time-box risk makes the current state expensive to lose; or
- the final handoff is ready.

Before each checkpoint, reconcile the answer log, current manuscript and cross-article ledger. The aim is to lose minutes rather than hours if the session ends unexpectedly, without spending the time box servicing Git after every exchange.

## Required durable outputs on this branch

By the final handoff, commit and push:

1. `testing-evidence-cloud-discovery-record.md` containing the material answers, evidence classes, corrections, uncertainties, privacy boundaries, argument decisions and cutting-room threads;
2. an updated manuscript in `testing-evidence-cloud-first-draft.md`;
3. any valuable material that belongs elsewhere added to `cross-article-thread-ledger.md`;
4. the Testing read order and status added to `docs/editorial-drafts/phase-7/README.md`; and
5. regenerated indexes where the repository machinery requires them.

Do not delete the Terra draft, Sol first pass or this brief during the Cloud session. Local production will decide which intermediates remain after publication.

## Manuscript bar

The returned copy should:

- make one arguable point rather than wear a test taxonomy as an article coat;
- open with a specific human or engineering consequence once Harley supplies one;
- distinguish unit, integration, browser, hosted and deployed evidence only where each distinction pays the argument;
- preserve the line between a portable scenario and a run-bound result;
- credit Superpowers before naming Harley's composition;
- use natural paragraph cadence and avoid repeated one-sentence paragraphs, one-word list rhythms and empty “not X, but Y” contrasts;
- retain uncertainty rather than inflating the evidence; and
- give both the weary hiring manager and cynical architect a quick route to falsifiable engineering judgement.

Stop at five hours even if the article remains unresolved. Hand back the best manuscript, the durable record and a candid list of what still needs Harley's decision.
