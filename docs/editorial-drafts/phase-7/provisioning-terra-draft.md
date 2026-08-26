# Provisioning is not accumulation

Status: Terra draft for Sol and Harley, not publication-ready

More instructions don't make a better agent. Useful capability comes from putting the right knowledge at the right scope at the right time.

An agent makes the same avoidable mistake twice. Someone adds a rule. A second task exposes a nearby exception, so that becomes another rule. Soon there is a global instruction file, a handful of reusable workflows, task notes, templates and validation guidance, all carrying fragments of the same decision. Each addition was sensible when it was made. The combined environment asks a worker to reconcile more history than the task requires.

That isn't capability. It is accumulated maintenance.

The problem looks like a prompting problem because it appears while the agent is working. It is usually a knowledge-architecture problem. The worker has been given facts, preferences and constraints that belong to different owners and different lifetimes. A rule that should have been local is now global. A one-off instruction has been promoted into a reusable workflow. A claim that ought to be tested sits in prose where nothing can examine it. The next task inherits all of it.

## Knowledge needs different homes

Environment knowledge is the durable shape of a place. It tells a worker where it is, which boundaries apply, where authoritative records live and which checks are expected before a consequential change. It should be stable enough that a worker benefits from seeing it before it decides how to proceed.

Reusable workflow knowledge is different. It describes a repeatable way of doing a class of work: how to investigate a failure, review a change or prepare a release. It should be selected when the work calls for it, not loaded into every task because it might become relevant. A workflow carries method. It should not silently become a second constitution for the project.

Task context is narrower again. A task needs its outcome, its constraints, the current evidence and the decision it is asking for. It also needs a boundary: what this worker may change, what it must leave alone and when another person must decide. Giving a task every rule in the organisation makes the immediate work harder to see. Giving it none of the governing rules makes the answer unsafe. The craft is in the route between those two failures.

This is familiar engineering judgement. We do not place every variable in global configuration because it might be useful later. We give it the smallest useful scope, make ownership legible and pass it only where it is needed. Agent systems need the same discipline, with one additional complication: their instructions are read as language, so overlap can create ambiguity as well as overhead.

## Selection is part of the system

Provisioning has a routing problem. The important question is not only whether a piece of knowledge exists. It is whether the present worker needs it now, and how that worker can find it without being buried under adjacent material.

An environment can name the places to look: repository guidance, a source-of-truth record, a runbook, a quality gate. The task can point to the particular evidence and outcome. A workflow can explain the method when the task has identified the kind of work. This keeps discovery possible without forcing every worker to read every document.

Good routing also makes authority visible. A task brief may express intent, but it should not quietly overrule a project boundary. A reusable workflow may recommend a sequence, but it should not invent facts or choose a product direction. A record that proves a claim should sit close to the check that examines it. When those roles are distinct, a worker can act with less ceremony and a reviewer can see why it was allowed to act.

The alternative is familiar: a worker finds several instructions that all sound applicable, each written for a slightly different moment. It spends effort interpreting their relationship, or it follows the nearest sentence and misses the more authoritative one. Neither outcome is a model failure in isolation. The system has made scope and precedence hard to recover.

## Put verification where the claim is examined

Verification knowledge has a different job from guidance. A test, validator, acceptance check or review record should state the claim it can examine and the boundary of that result. It is not another paragraph asking the agent to remember to be careful.

This distinction matters because a rule can be true and still be badly placed. A release requirement hidden in general instructions depends on every worker noticing and interpreting it. The same requirement expressed through the relevant check becomes inspectable. The worker knows what evidence it needs to produce; the reviewer knows what the result does and does not prove.

That doesn't mean every judgement can be encoded. Editorial decisions, privacy boundaries and product trade-offs still need an accountable person. The useful split is practical: put repeatable claims where they can be examined, and keep human authority explicit where a check cannot settle the question. A green result is evidence about the claim it ran, not permission to make every other decision.

## Accumulation creates a maintenance bill

Every instruction is a dependency. It can become stale, overlap with a newer rule, describe a vanished tool or preserve an authority boundary that no longer exists. The cost is not limited to reading time. A stale instruction can route a worker towards the wrong source of truth, while two near-duplicates leave nobody responsible for deciding which one wins.

That is why instruction growth needs ordinary maintenance practices. Give durable guidance an owner and a clear scope. Link rather than copy when one record already owns the fact. Remove or retire a rule when its reason has gone. Make precedence explicit when two layers can both apply. Keep exceptions with the work that created them unless they have genuinely become a project-wide concern.

The aim is not a sparse environment for its own sake. An empty instruction surface merely moves the same burden back into repeated conversation. The aim is a small, intelligible set of durable entry points and a reliable route from each entry point to the knowledge the task actually needs.

## YAGNI applies here too

The easiest mistake is promoting a useful correction too early. A line that fixed one awkward task may be a local constraint, an incomplete diagnosis or a temporary workaround. Turning it into permanent environment knowledge immediately gives every later worker a new obligation to interpret.

Start with the smallest home that preserves the lesson. Keep task-specific direction with the task. Promote it only when it has recurred, its scope is understood and somebody is prepared to maintain it. Then make the promotion deliberate: say who owns it, which work it applies to, what authority it has and how a worker should reach it.

This is YAGNI applied to instructions. Do not provision a universal rule for a need that has only appeared once. Do not make a workflow carry a project policy because both happen to concern the same tool. Do not pass a whole archive into context when a reference and a retrieval route will do.

The resulting agent is not less prepared. It is prepared to make the next decision. Its environment supplies durable boundaries, its chosen workflow supplies a method, its task supplies the immediate purpose and its verification supplies evidence. Everything else remains available without becoming a competing voice in the room.

## Source and fact custody

| Material | Exact repository path and revision inspected | Permitted use in this draft | Boundary |
| --- | --- | --- | --- |
| Governing proposition and required article responsibility | `.agents/specs/2026-08-21-portfolio-10k-07-writing-authority-design.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Defines the environment-and-knowledge-architecture argument, including scope, routing, verification and YAGNI. | A Phase 7 specification is an editorial authority for this draft, not proof of runtime behaviour or publication. |
| Merged Phase 7 implementation plan | `.agents/plans/portfolio-10k/2026-08-25-portfolio-10k-phase-7-writing-authority.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Confirms the intended distinction between Provisioning, Graph, Context and Pass References, plus the composed writing gate. | Plan claims need live re-verification before publication; it does not supply performance results. |
| Existing Provisioning source material | `src/client/src/data/content/writing/2026-08-12-provisioning-is-not-accumulation.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805`; identical to observed `origin/main` revision `593c07d2b3233c7eadced986646ae3fb1edcbdd6` | Supplies the title, dateline, summary and the original classification of environment, task, workflow and verification knowledge. | Candidate source material only. It is not author-approved publication prose. |
| Live content registration | `src/client/src/data/content/content-manifest.json` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Establishes that the candidate is currently a live writing route in the checked-out repository. | Existing registration carries no editorial admission, as Phase 7 specifies. |
| Active public-copy policy | `.agents/doctrine/portfolio-design-policy.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Sets the plain British voice, contraction and no-em-dash constraints, plus proof-before-pitch and honest-state rules. | Governs presentation; it does not create technical facts. |
| Composed drafting workflow | `.agents/skills/writing/SKILL.md` at `f500c55ba6fb61af85e3c2be434bdc53a3893805` | Requires fact-first drafting and a final clarity pass without invented facts or inferred private voice. | Workflow guidance, not source evidence for article claims. |

The current checkout was observed one commit behind `origin/main`. The candidate article content matched the observed `origin/main` revision above. Re-check all live paths, revisions and the final admission record before any publication decision.

## Open Harley questions

- Is there an employer-safe, public example of an instruction or ownership boundary that would make the opening more concrete without turning the article into a private incident report?
- Should the finished essay use a restrained first-person sentence to anchor the maintenance argument, or keep the voice observational until Harley supplies a specific example?
- Does the distinction between environment, workflow, task and verification belong in the body as written, or should the eventual principal figure carry more of that classification so the prose can tighten further?
- Which neighbouring essay should receive the strongest continuation from this one: Context for durable truth, Pass References for hand-offs, or Vibe for the responsibility boundary?
