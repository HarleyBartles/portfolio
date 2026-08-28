# Cloud handoff addendum — “I just write the code” is not a full sentence

**Status:** Final Cloud editorial-room handoff, 28 August 2026. This addendum supersedes the unresolved `Still to discover before drafting closes` tail in `api-is-only-the-middle-cloud-discovery-record.md`. It is discovery custody, not publication copy or an admission decision.

**PR / branch:** `#37` / `codex/phase-7-api-middle-editorial-room`

## Accepted governing argument

The article is now titled **“I just write the code” is not a full sentence**.

The accepted governing argument is: **“I just write the code” is a natural early-career boundary, but engineering responsibility expands around implementation. The mature move is not to own every adjacent discipline; it is to stop using the edge of implementation as a reason to leave the problem.**

The practical close remains:

> **Catch yourself. Qualify yourself. Finish the sentence.**

The final variant still matters: **“I just write the code, so let’s write the code.”** The article is not an argument for ceremony. Sometimes the surrounding uncertainty is already resolved and implementation is exactly the next job.

The accepted manuscript is `api-is-only-the-middle-cloud-first-draft.md`.

## Junior instinct is defended before it is challenged

The title must earn its premise. A junior engineer is already facing an intimidating technical mountain: languages, frameworks, patterns, databases, APIs, architecture, testing and deployment. Narrowing the role to the visible craft of implementation can be a sensible way to make the profession feel finite.

Harley does not frame his earlier self as lazy or defective. He wanted his code working in the real world and having an effect. The boundary widened gradually as product knowledge accumulated and expectations followed it.

Key line retained in the manuscript:

> **“I didn’t change. Expectations shifted.”**

## “No dev is an island” is anti-adversarial

The intended thought is not a comparison between one developer’s code and somebody else’s code. It is:

> **Nobody around the product wants your code to fail. They want the product to succeed, and they want to help you get it there.**

Product, engineering, QA, operations, specialists, support, consumers and suppliers hold different pieces of the same product. Adjacent people are not gatekeepers to defeat or professions to annex. They are expertise available to a shared outcome.

Wider responsibility therefore does not mean becoming an island with more skills. It means learning to stop behaving like one.

## Inherited bugs: archaeology, then pay it forward

The inherited-bug example now carries a second responsibility after the investigation: **leave a breadcrumb behind**.

When suspicious code turns out to carry a real constraint, do not make the next engineer rediscover the whole reason from scratch. Appropriate breadcrumbs include:

- a large, explicit code comment explaining the constraint;
- an ADR when the reason is architectural, including the condition that would justify reconsidering the decision;
- a well-named regression test that records the behaviour being protected; and
- a link back to the original decision or evidence where useful.

The point is stewardship without obligatory refactoring. The application can become easier to understand even when the correct technical decision is to leave the code largely alone.

Harley’s formulation:

> Sometimes they’re the person who wrote the code three years ago. Sometimes they’re the person who’ll touch the code three years from now. Sometimes the future dev you’re paying it forward to is yourself.

The manuscript also hardens the earlier absolute bug-fix claim: contain a production incident first when necessary; root-cause understanding is required for the durable fix, not necessarily for the first containment action.

## Consumer bug outside our codebase: clean handoff without abandoning ownership

A consumer reported a bug. Harley traced the behaviour empirically through his side and proved that the application was doing exactly what the upstream data instructed it to do. The defect was therefore either in the consumer’s implementation assumption or upstream in the supplier.

The materially important question became: **is the supplier’s behaviour intended?**

This was heavily regulated software. The supplier could not be assumed wrong merely because its output was inconvenient; regulation might require the behaviour. The supplier also could not simply be assumed right. The next step was to ask for an authoritative answer.

The ownership lesson is the useful part. Proving the defect is not in our codebase is a clean engineering handoff, but it does not necessarily end our responsibility. To the consumer, **we are the supplier**. Making the consumer chase our upstream dependency would leak our dependency boundary onto them.

Sometimes ownership means fixing code. Sometimes it means proving the code is behaving correctly and carrying the unresolved question to the next boundary yourself.

## SQL aside: the story closes a loop

The SQL story is intentionally detachable from the main article and should be rendered as a related standalone aside if the production page follows the current article pattern.

### Interview setup

When Harley interviewed for The Access Group, he answered strongly elsewhere but struggled with `how would you optimise a query?`. His answer was effectively:

> SQL isn’t my strongest suit. I’d put my hand up and ask somebody who knows query optimisation to walk me through it.

It did not stop him getting the job, but he still wishes he had demonstrated the basic understanding he already possessed. `Inspect the query plan`, `look for unnecessary round trips`, `find where the cost is`, then ask somebody stronger to challenge the reasoning was within his capability at the time.

The boundary leaked into the answer: query optimisation felt like somebody else’s territory, so he opted out before seeing what he could contribute.

### Real incident

Not long after joining, a slow action in Access Recruitment CRM led Harley through roughly seven stored procedures, around four layers deep with branches. Row-at-a-time cursor calls repeatedly expanded one ID into a set and then handed the next procedure one ID at a time, causing a small starting set to explode into many serial stored-procedure calls.

The repair was conceptual rather than a SQL trick: preserve the set. Pass sets of IDs through the chain, let each procedure operate over the set and produce the next set. Existing one-ID callers still work by passing a set of one.

The remembered result is several minutes down to a couple of seconds. Keep the counts and timings qualified as recollection.

Cursors are not presented as universally bad. The defect was using row-at-a-time procedural iteration for a naturally set-shaped operation.

### Circularity

The story becomes useful because the interview and the incident expose opposite halves of the same mistake.

At interview, Harley said he would ask for help instead of demonstrating what he already knew.

When the real problem arrived, he demonstrated the opposite behaviour: he read until he understood the problem and solved it without asking the SQL experts who were already around him.

He therefore wishes both moments had gone differently:

- demonstrate the understanding already available rather than opting out immediately; and
- actually use the expert help he had said he would use when a real unfamiliar problem arrived.

Accepted lesson:

> **Have a go and ask for help don’t have to be mutually exclusive.**

Form a view, investigate it, learn enough to ask a useful question, then use the expertise around you. The mature posture is neither `not my domain` nor `I must prove I can solve it alone`.

## Agentic echo stays narrow

AI belongs only as a modern echo of the same engineering habit. Harley can interrogate an AI relentlessly about an unfamiliar pattern, but the AI does not become the source of truth because it explains something confidently. Repository evidence, documentation, tests, observed behaviour and people who understand the system still arbitrate reality.

Conversely, telling an agent to `just go fix this bug` without reproduction, surrounding-code research and an understood plan automates the narrowest possible version of `I just write the code`.

Keep this compact. It is not the article’s centre of gravity.

## Profanity house rule

Harley is comfortable with swearing when it earns its place, roughly a `12A` house style rather than a sanitised one. Mild profanity can appear naturally. Strong profanity is scarce.

Editorial test: if removing the swear loses character, meaning or emotional accuracy, it may stay. If removing it only lowers the temperature, cut it.

In this manuscript, **“somebody else’s shit code”** is accepted because it accurately exposes the younger authorship boundary. A decorative `fuck it` formulation was explicitly rejected.

## Cadence and cognitive-overflow pass

Harley identified one-sentence-paragraph staccato as a remaining model-shaped failure mode. The final Cloud manuscript was therefore reviewed with a stricter paragraph rule:

> **Every paragraph break needs a distinct rhetorical job.**

A short paragraph may stand alone for a genuine turn, conclusion or deliberate emphasis. It should not exist merely to represent a spoken pause or make an ordinary sentence look important.

The manuscript now combines adjacent paragraphs that carry the same thought. `I didn’t change. Expectations shifted.` survives as a deliberate isolated turn because it closes the chronology and changes the section’s job.

Local Sol should preserve this editorial logic during final line work rather than reintroducing staccato for visual drama.

## Three-lens value review

### £0-to-£10k copy

The latest Cloud value pass placed the manuscript at approximately **£9,500 / £10,000** before local production and final editorial polish.

The expensive work is complete: clear proposition, humane opening, lived technical evidence, responsibility/authority boundaries, practical takeaway, natural paragraph flow and a detachable proof aside. The remaining gap is subtraction, exact wording, page composition and corpus-level fatigue review rather than missing substance.

### Weary sceptical hiring manager

**Shortlist / safe to forward.**

The article shows senior engineering behaviour without announcing seniority: turning ambiguous reports into evidence, reading history before changing inherited code, leaving decision breadcrumbs, keeping ownership across dependency boundaries, involving Product without commandeering Product, and using specialists without retreating from the problem.

The regulated supplier example is particularly strong because `to our consumer, we were the supplier` shows responsibility continuing after the defect location has been ruled out locally.

### Jaded cynical architect

**Architect concurs.**

The draft survives the cheap `congratulations, you discovered ownership` dismissal because ownership is made concrete through reproduction, archaeology, tests, architectural context, uncertainty, regulated upstream behaviour, contract boundaries and specialist scope.

Preserve these qualifications during production:

- containment may precede complete root-cause understanding; the durable fix should not;
- cursors are not universally bad; the SQL issue was a row-at-a-time/set-shaped mismatch;
- AI accelerates learning but is not itself the truth source;
- broader engineering responsibility does not confer Product, DevOps or other specialist authority; and
- `the developer sits near the heart of the cluster` is an engineer-centric phrase local Sol may reconsider for exact taste without weakening the shared-responsibility argument.

## Cutting-room thread routed elsewhere

The repeating career-cycle story remains valuable but is not this article’s heart:

1. join as the new person and mostly write code;
2. accumulate enough product/system knowledge to become the person people ask;
3. spend more time in coordination and explanation, less time coding;
4. change job and temporarily reset the cycle.

This thread is routed into the cross-article ledger rather than expanded in the manuscript.

## Local Sol handoff

Read in this order:

1. `api-is-only-the-middle-cloud-editorial-brief.md` for the room contract and protected boundaries;
2. `api-is-only-the-middle-cloud-discovery-record.md` for the main discovery history, employer-safe examples, evidence classes and anti-inferences;
3. `api-is-only-the-middle-cloud-handoff-addendum.md` for the accepted late discoveries, SQL circularity, stewardship argument, cadence rule and final value lenses;
4. `api-is-only-the-middle-cloud-first-draft.md` for the accepted Cloud manuscript;
5. live source surfaces named by the discovery documents when production claims need reverification; and
6. the seed and Sol first pass only as superseded historical working material.

Local Sol owns final subtraction, page composition, aside treatment, source refresh, corpus-level fatigue review, any admission decision and publication proof.

Do not reopen the governing premise by default. Discovery is complete enough for production.

## Time-box stop condition

The Cloud room stops once this final draft, late-discovery handoff, cross-article ledger route, README read order and generated index entry are verified on PR #37’s branch. No further Cloud editorial discovery is expected after that verified branch head.
