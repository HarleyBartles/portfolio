# Pass references, not paragraphs

Status: Terra draft for Sol and Harley, not publication-ready

A handoff can fail even when the next worker receives a long, careful message. The message may explain the task, repeat the relevant decision and include a summary of the evidence. It may also leave the recipient unable to tell which version it received, who owns the underlying record, whether it is still current or where to look when a detail needs checking.

The usual response is to add more prose. That makes the handoff heavier without making it more governable.

The better unit of transfer is a bounded brief plus a reference to materialised state. The brief tells the worker what job it owns now. The reference tells it where the durable evidence, decision or artifact lives, which exact revision applies and how to retrieve it. The worker reads the material when the job requires it, then writes its result back to a place the next person can inspect.

This is not an argument against context. Context establishes where durable truth lives and why a conversation cannot be its only home. Handoffs start after that question has been answered. They need a way to move authority and evidence between people or agents without turning every conversation into a copied archive.

## A pointer has to earn trust

`See the plan` is not a useful handoff. It asks the recipient to guess the plan, its version and its authority. A durable reference needs enough shape to make those questions answerable.

For a repository artifact, that may mean a stable path, the commit that contains it and a short statement of why this is the record to use. For a review finding, it may mean the finding identifier, the affected surface, the evidence that produced it and the owner of the repair decision. For a release, it may mean the exact build or revision, the verification record and the route to the deployed result.

The details change with the system. The questions do not:

- What material is being referenced?
- Which exact version is in scope?
- Why does this record have authority for this decision?
- How can the recipient retrieve and inspect it?
- Is it fresh enough for the present task?
- Who may read it, change it or decide that it no longer applies?

A good reference answers those questions at the smallest useful cost. It does not require the coordinator to paste a report into three separate tasks just to prove that the report exists.

## The brief carries the job, not the archive

References do not make a task self-explanatory. A worker still needs a bounded brief: the outcome, constraints, permitted actions and the condition that ends its responsibility. It should know whether it is being asked to inspect a decision, implement a scoped change, verify a claim or prepare a reviewable artifact.

That brief is working context. It may quote the one fact that changes the immediate decision, name the relevant revision and say what a successful receipt looks like. It should not become a second, lossy copy of the record it points at.

Imagine a worker asked to assess a repair. The handoff can name the issue, point to the finding at a specific revision, define the allowed files and request a verification receipt. The worker can retrieve the evidence, inspect the current surface and produce a patch or a blocked result. A later reviewer can follow the same route. Nobody has to trust that an earlier summary preserved every qualification.

That is a practical distinction. Paragraphs are useful for explaining a job. They are poor substitutes for the governed artifacts that settle it.

## Retrieval is part of the contract

A reference that cannot be resolved is not a smaller handoff. It is an incomplete one.

The retrieval route has to be concrete enough for the recipient's environment. A repository path may need a repository identity and commit. A URL may need access that survives the handoff. A generated artifact may need the build that created it and a retention period. A secret or restricted record may need an approved route that discloses only what the worker is allowed to see.

This is where access and custody matter. The sender should not copy protected material into a chat just because the target cannot resolve the original reference. That widens the audience and creates another ungoverned copy. If the recipient lacks the required access, the handoff should stop with a clear blocked result or route to the accountable person. It should not pretend that a partial summary is equivalent evidence.

Freshness matters for the same reason. A reference can be valid, resolvable and still stale. The worker needs a way to tell whether the revision named by the brief is intentionally pinned, superseded by a newer record or missing a required update. A pin is useful when reproducibility matters. A live route is useful when the task needs the latest accepted state. The brief should say which one it intends. Leaving that choice implicit is how a task quietly performs work against yesterday's authority.

## Fail closed when the reference is unresolved

Handoffs often fail politely. A worker sees an unavailable path, an expired link or an identifier with no accessible record, then continues from the sender's paraphrase. The result can look productive while its evidence chain has already broken.

For consequential work, unresolved references need a first-class exit. The worker should report what it could not resolve, what decision or evidence is therefore unavailable and which owner or route can unblock it. That receipt gives the coordinator something durable to act on. It also prevents a guess from acquiring the status of a verified fact merely because it was repeated in a task message.

Failing closed does not mean refusing every imperfect handoff. It means matching the response to the missing material. A typo in a non-critical label may be easy to correct. An inaccessible decision record should block a change that depends on that decision. The boundary belongs in the brief, and the custody of the missing record belongs with an accountable owner.

## Small facts can travel directly

The rule is not that every sentence must become a file reference. A small, self-contained fact can travel directly when it is sufficient for the immediate task and does not need wider custody. A worker may need to know that its output belongs in a named directory, that a review is read-only or that it must stop for a human decision. Putting those facts in the brief makes the work clearer.

The test is whether copying the content creates a second source of truth. If the detail has a version, needs provenance, changes over time, has access restrictions or will be checked by someone else, point to its governed home. If it is a narrow instruction that expires with this handoff, say it plainly.

That restraint keeps references useful. The goal is not ritual indirection. It is a handoff in which the next worker can locate the right evidence, understand its authority and leave a receipt that the next worker can inspect.

## Keep the chain inspectable

A durable workflow has a simple shape:

1. Materialise the decision, evidence or artifact in its governed home.
2. Give the next worker a bounded brief and a stable, resolvable reference.
3. Let that worker retrieve only the material needed for its responsibility.
4. Require it to write its result, evidence or blocked state back to durable custody.
5. Return a short receipt that points to the new state rather than narrating it.

The chain does not make correctness automatic. A file can be wrong, a test can prove only a narrow claim and a reviewer can still need judgement. The value is simpler: the authority path remains visible. A worker can check what it received. A reviewer can check what changed. A coordinator can route the next decision without carrying the whole project in conversation.

That is the job of a handoff. It is not to transfer every paragraph one worker has read. It is to transfer enough bounded purpose and governed evidence for the next worker to act responsibly.

## Source and fact custody

| Material | Exact repository path and revision inspected | Permitted use in this draft | Boundary |
| --- | --- | --- | --- |
| Governing proposition and candidate distinction | `.agents/specs/2026-08-21-portfolio-10k-07-writing-authority-design.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Defines this essay's argument: materialised, governed state for handoffs, distinct from Context's durable-truth argument. | A Phase 7 specification is an editorial authority for this draft. It is not proof that a particular workflow, reference scheme or system behaviour has succeeded. |
| Candidate responsibility and editorial bar | `.agents/plans/portfolio-10k/2026-08-25-portfolio-10k-phase-7-writing-authority.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Defines Pass References as evidence-rich delegation, preserves its independent admission test and requires the composed writing gate. | A plan does not confer publication admission or establish operational performance. |
| Existing Pass References candidate | `src/client/src/data/content/writing/2026-08-15-pass-references-not-paragraphs.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805`; identical to observed `origin/main` revision `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Supplies the title, dateline, summary and candidate themes of materialisation, retrieval and concise receipts. | Candidate source material only. It is not author-approved publication prose or evidence for universal performance claims. |
| Existing Context candidate | `src/client/src/data/content/writing/2026-08-07-context-is-not-state.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805`; identical to observed `origin/main` revision `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Establishes the neighbouring essay's home-for-truth argument so this draft can avoid duplicating it. | Candidate source material only. Its quotations and teaching examples are not imported as independently verified technical evidence here. |
| Live content registration | `src/client/src/data/content/content-manifest.json` at `f500c55ba6fb61af85e3c2be434bdc53a3893805`; identical to observed `origin/main` revision `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Establishes that Pass References is presently a live writing route in the checked-out repository. | Registration does not equal Phase 7 editorial admission. |
| Active public-copy policy | `.agents/doctrine/portfolio-design-policy.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Applies proof-before-pitch, honest-state, plain British voice and no-em-dash constraints. | Presentation policy does not create technical facts. |
| Composed drafting workflow | `.agents/skills/writing/SKILL.md` and `.agents/skills/writing-with-clarity/` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Requires fact-first drafting, composition review and final clarity review. | Workflow guidance, not evidence for article claims. No authorised Harley voice card was supplied, so no inferred private voice profile was used. |

The current checkout was `f500c55ba6fb61af85e3c2be434bdc53a3893805`; `origin/main` was observed at `593c07d2b3233c7eadced986646ae3fb1edcbdd6`. Re-check revisions, access controls, examples and final editorial admission before any publication decision.

## Open Harley questions

- Is there a safe public example where an imprecise handoff created rework, or where an exact reference let another person inspect and continue the work, without exposing private systems or colleagues?
- Which handoff boundary matters most in your own practice: a pinned code revision, a review finding with its evidence, a deployment receipt or a decision record with an accountable owner?
- Should the final article keep the deliberately general example of a repair, or replace it with one concrete, publishable story that can carry the stakes and the human judgement?
- Where should the published piece route readers next: Context for the durable-home argument, Provisioning for selection and scope, or the review graph for governed repair?
