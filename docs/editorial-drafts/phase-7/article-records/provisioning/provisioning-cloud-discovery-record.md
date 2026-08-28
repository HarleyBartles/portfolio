# Provisioning is not accumulation: Cloud discovery record

**Status:** Durable editorial source, not article copy.

**Discovery snapshot:** 2026-08-26.

**Baton:** Cloud editorial discovery remains active. Harley has not approved settled copy and local production must not begin from this document.

## Why this record exists

This file drains the substantive Cloud Sol discovery conversation into the repository before the chat itself becomes an unreliable working memory. It is intentionally more complete than the eventual article. A future editor should be able to recover the argument, evidence boundaries, corrections, useful side trails and unresolved decisions without reconstructing the conversation.

The article is cross-repo. `agent-asset-marketplace` is important evidence because the first broad correction was encoded there and because it is a strong current golden example, but Marketplace is not the protagonist, not the case study, and not necessarily the repo where the original failure was first noticed.

Use this record as editorial source material. Do not turn it into a catalogue of files, plugins or Git history. The visitor-facing article should carry only the evidence needed to make the engineering argument legible.

## Locked editorial target

The portfolio-level promise this article must cash is approximately **Senior Software Engineer working at the agentic frontier**.

The article should convince a sceptical technical reader that Harley is not an agentic vibe coder who happens to get useful output from models. The intended signal is an experienced software engineer applying familiar engineering disciplines to a new runtime surface where many teams are still working by feel.

Three lenses govern editorial value:

1. **£0 to £10k lens.** Does the material demonstrate judgement that plausibly increases Harley's market value, rather than merely documenting an interesting hobby or toolchain?
2. **Weary sceptical hiring-manager lens.** Can a busy hiring manager get enough signal, early enough, to shortlist without having to decode the whole agent stack?
3. **Cynical architect lens.** If the hiring manager recommends Harley, can a jaded architect inspect the argument quickly and conclude that the candidate understands scope, precedence, runtime behaviour, ownership, verification and trade-offs rather than hand-waving about prompts?

The architect verdict we are trying to earn is essentially: this person already knows software engineering and is applying it to agents, rather than learning software engineering through agents.

Proof should arrive before the midpoint. Do not make a busy reader wade through 1,500 words of setup before revealing what failed.

## Governing engineering principle

The dominant conventional engineering principle is:

> The system is what the runtime does, not what the configuration appears to say.

The agentic form of that principle is that knowledge and instructions are runtime inputs. Their effective semantics depend on what the harness makes active, for which worker, at what authority, under what trigger, with what precedence and for how long.

A repository hierarchy can express intended scope. That does not mean the runtime preserves that scope.

Useful candidate formulations for later prose:

- "The configuration I had written was coherent. It just wasn't the configuration the runtime was actually giving the agent."
- "The file tree can describe intended scope. The harness decides whether that scope becomes enforced configuration or merely extra context the model has to reason about."
- "The file tree is storage. The harness does the provisioning. Knowledge is only scoped if the runtime actually makes it relevant at that scope."
- "You haven't scoped agent knowledge because you put it in the right folder. You've scoped it only when the runtime delivers it to the right worker, at the right time."
- "Declared hierarchy is not the same as enforced precedence."

These are drafting candidates, not approved article copy.

## What Harley means by provisioning

Harley's own definition from discovery:

> "Provisioning is moving something out of the prompt into the environment. Things you keep telling the agent need to become things you stop needing to tell the agent."

The operating rule that followed from it:

> "Don't read everything, read the next thing you need to make the next move."

That distinction is central to the title.

Provisioning is not merely moving repeated instructions from a user prompt into repository files. If the environment then accumulates everything and makes all of it active regardless of the task, the storage location changed but the provisioning problem did not go away.

A useful working distinction is:

- **Provisioning:** the environment makes relevant knowledge available without Harley having to remember to restate it manually.
- **Accumulation:** the environment makes more and more knowledge active simply because it exists or has been encountered, whether or not the current task needs it.

This is not a universal "less context is better" argument. Sometimes the next move genuinely requires a large amount of context. The point is that the read should be justified by the work.

The agent also cannot know what it does not know. Selective provisioning therefore needs discoverability. A small rule, skill description, runbook pointer, doctrine entry point or other routing surface can expose the existence of the next relevant knowledge without preloading all of that knowledge. The environment needs to give the agent a plausible breadcrumb from what it knows now to what it may need next.

## Recommended narrative spine

The strongest editorial sequence currently looks like this.

### 1. Open on a mundane task being swallowed by self-administration

One retained conversation is a strong specimen. Harley asked a straightforward architectural question about moving Superpowers away from an overlay-driven third-party model and explicitly said: "We're just talking, no plans or specs yet. What are your thoughts on this?"

Before giving the substantive answer, the agent spent a large visible reasoning pass deciding which skills applied, whether brainstorming had become mandatory, which repo rules and doctrine it had to consult, and how to reconcile the instruction stack with Harley's request to keep the exchange informal. Later "still just talking" questions produced similar routing and self-management passes.

The specimen is useful because the individual instructions were not obviously stupid. The failure emerged from simultaneous activation and the amount of policy arbitration the model had to perform before it could answer a normal question.

Do not require the exact remembered phrase "the rules are overwhelming" to appear in this specimen. Another retained diagnostic conversation begins with Harley reporting that an agent had said something equivalent and asking whether the nested `AGENTS.md` mesh was the anti-pattern. The live "just talking" transcript independently demonstrates the behaviour we care about.

### 2. Zoom out immediately: this was a cross-repo pattern

Harley had been noticing wall-clock time to reasoned responses creeping upward across multiple repos while his suspicion increasingly settled on growing `AGENTS.md` meshes. The problem was not confined to Marketplace and the exact repo where the first "overwhelming" moment occurred is not important enough to manufacture an origin story for.

This is a repeated first-party observation, not an instrumented latency benchmark. The final article must say so.

### 3. Establish that the original mesh was deliberate engineering

The nested `AGENTS.md` architecture was not accidental prompt sprawl. It was designed around the documented hierarchical model Harley understood from OpenAI/Codex: project-root guidance inherited down the tree, with closer/current-directory guidance applied later and able to override earlier/root guidance.

The intent of a scoped node was cheap local orientation. Wherever an agent worked, it should be able to establish things such as:

- what can I do here?
- what local law applies here?
- how does this subtree differ from global policy?
- which upstream rules still apply?

This is important because the article should not caricature the failure as "I wrote too many bad instructions." A coherent abstraction failed because its runtime assumptions did not hold in one harness.

### 4. Show the diagnostic contradiction early

The retained diagnostic session is unusually useful because the declared mesh validator passed while the runtime behaviour was still wrong for the intended architecture.

Harley entered that investigation with a specific suspicion, not a blank slate. The opening was effectively: an agent working in the repo thought the rules were overwhelming; Harley believed that might reflect an anti-pattern in the `AGENTS.md` node mesh; his hypothesis was that scoped files were staying active after directory reads rather than being limited to their intended lineage.

The fresh diagnostic session then observed nested `AGENTS.md` files being promoted into a continuing always-on rule set as the repository was explored. Reading or encountering another scoped `AGENTS.md` was behaving like activation rather than neutral lookup.

The useful engineering lesson is not merely "the validator missed a bug." It is that the validator proved the configuration Harley had declared was internally consistent. It could not prove that the consumer assembled the same effective configuration at runtime.

Candidate line:

> "We had tested the configuration we wrote, not the configuration the consumer actually produced."

Again, this is candidate copy, not yet approved.

### 5. Explain why accumulation became expensive

The failure had several related shapes.

**Scope collapse and persistence.** Scoped files that were intended to matter locally appeared in the continuing active rule set after discovery.

**Obligation amplification.** Some scoped nodes were intentionally substantial and some were thin routers containing `MUST READ` obligations. Either can be sensible if activation establishes relevance. Once local routers accumulated globally, their pointers turned into repeated obligations. Earlier agents often read those referenced documents literally, increasing context further.

**Traversal contamination.** Looking at a surface could cause its local instruction file to become active even when the agent was consulting that surface rather than working under its edit policy. Reading a schema should not make an agent adopt the schema package's build rules. Consulting a runbook should not imply that the agent is now modifying the runbook system.

**Precedence reconstruction.** The hierarchy remained visible in file provenance, so the model could often reason about which local/global rules probably applied. But that moved policy resolution into repeated model reasoning. The runtime was no longer doing enough of the lifecycle and precedence work that the architecture had assumed it would do.

Do not claim hidden equal weighting of all rules. The supported claim is that they were presented or appeared as continuing always-on material and the agent visibly spent effort reconstructing relevance and precedence.

Harley's memorable analogy is RoboCop 2 being loaded with hundreds of Prime Directives and developing tics while trying to satisfy the whole list. Use only if it improves the prose rather than turning the article into a gag.

### 6. Show the correction as a change in provisioning, not a deletion of knowledge

The response was not "delete the knowledge and go back to a dumb root prompt."

The durable idea was to preserve useful locality and knowledge while changing how it became active:

- keep root `AGENTS.md` material sparse and durable;
- move narrow scoped law behind harness-native conditional activation where that harness can do it reliably;
- use skills, doctrine, runbooks and references as discoverable knowledge surfaces rather than ambient context dumps;
- keep deep knowledge reachable without requiring it to be read on every task;
- separate read-side context selection from action-side capability control.

A useful summary is: the knowledge architecture survived; the provisioning architecture around it changed.

### 7. Broaden into the current engineering model

The article can then generalise beyond the original `AGENTS.md` incident. The stronger current practice is about selective delivery, ownership, progressive discovery, reuse, lifecycle and explicit limits.

Marketplace should appear here only when it is the cleanest receipt for a claim. It should not acquire narrative gravity just because its Git history is rich.

### 8. End on the senior-engineering signal

The conclusion should land on the idea that familiar engineering principles still apply at the agentic frontier, but the runtime gives them unfamiliar failure modes.

The article is not "I learned a clever prompting trick." The story is that Harley challenged a working abstraction when evidence contradicted it, investigated effective runtime behaviour, changed the boundary where the problem actually lived, preserved useful parts rather than burning the system down, and then let the correction become reusable engineering practice.

## What the original diagnostic transcript supports

A retained Devin conversation supplied during discovery supports the following sequence. It should be treated as first-party session evidence rather than public vendor documentation.

- Harley reports that an agent thought "the rules are overwhelming" and says he believes this reflects an anti-pattern in the `AGENTS.md` node mesh.
- Harley's initial hypothesis is specifically that scoped `AGENTS.md` files may remain on after directory reads rather than remaining dormant/local.
- The repo's mesh validator reports success.
- The fresh agent then says the runtime is not keeping scoped `AGENTS.md` files dormant and reports watching root and nested files appear in subsequent always-on rules as the tree is explored.
- The session identifies a mismatch between intended lineage and observed activation semantics.
- Harley asks for a workaround that does not amount to hand-rolling a fragile private runtime: "I don't want to hand roll a fragile system that fails often, I want to work with the tools and runtime things that we have."
- The investigation itself also demonstrates ecosystem confusion. It moves through old Windsurf/Cascade assumptions, Devin Desktop/Local naming, `.windsurf/rules`, `.devin/rules` and uncertainty about what was supported where before correcting course.
- The final direction in that session is drastically reduced `AGENTS.md` use plus `.devin/rules` for scoped activation in Devin.

The transcript is evidence of what that session observed. It is not proof that all Devin versions behave forever the same way and not evidence that Codex violates its own documented hierarchy.

## The live "just talking" specimen

A second retained conversation supplied during discovery is useful for an opening because it demonstrates user-visible cost rather than merely discussing it.

Harley asks a normal architecture question and twice makes the intended mode explicit: "We're just talking" and later "Still just talking."

The agent's visible reasoning repeatedly spends substantial effort on its own operating environment before answering: skill discovery, whether brainstorming must be invoked, repo doctrine, search sequencing, whether formal process should be forced, which surfaces need reading and whether obligations remain relevant.

This should be presented as evidence of self-administration overhead, not as proof that any single skill or instruction was wrong. Several instructions were individually sensible. The combined activation shape was the problem.

## Costs Harley actually observed

Use these as first-party observations, not quantified benchmark claims:

- wall-clock time to useful/reasoned answers had been creeping upward across multiple repos;
- agents visibly spent increasing reasoning effort asking what rules were active, already satisfied, relevant, stale, overridden or duplicated;
- simple questions could consume thousands of reasoning tokens before reaching the proposition;
- offhand ambiguity could become disproportionately significant once many rules were active;
- the result was more waiting, more instruction triage, more prompt fragility and occasional decision drift;
- after moving away from the accumulation pattern, the visible reconcile spiral largely disappeared and the environment became more predictable in ordinary work.

Do not manufacture before/after timing numbers. There is no controlled benchmark for the original incident.

## Marketplace's correct role in this story

Marketplace is a strong current **golden example and evidence surface**, not the article's case study.

It naturally became the first place to encode the broad fix because reusable cross-repo skills, standards and distribution machinery already live there. It also dogfoods much of what it distributes: it consumes cross-repo base skills, uses Superpowers Plus for its own repo work, consumes several of its own plugins, and is deliberately maintained as a reference implementation for the standards it ships.

That does not make Marketplace a formal incubation gate. The pattern is organic.

A reusable idea can originate in a consumer repo. If it remains repo-specific, it stays there. If Harley can already name multiple real consumers with the same reuse purpose, keeping copies and "figuring out distribution later" is an ordinary DRY smell. Since cross-repo distribution already belongs to Marketplace, a reusable thing naturally moves there sooner rather than later.

Marketplace's high PR count is therefore unsurprising: repo-wide ideas are exercised, revised and distributed there as part of normal work. Do not over-explain this in Provisioning. The existing Marketplace portfolio surface is the better home for the full "what Marketplace actually is" story and can be refined separately.

## Cross-repo propagation was organic, not a fleet migration

The Git history prevents a falsely neat story where Marketplace invented the entire pattern and every repo copied it afterwards.

Useful chronology:

- **Wild Bunch PR #161, 2026-07-11.** Before the decisive August runtime diagnosis, Wild Bunch had already reacted to instruction pressure by shrinking a large root `AGENTS.md`, turning scoped nodes into tighter routing tables and moving doctrine elsewhere. Its PR text records roughly twenty `MUST READ` and twenty `MUST INVOKE` flat directives that agents struggled to triage. This shows repos were already teaching each other and the pressure was visible before the lifecycle bug was isolated.
- **Marketplace PR #249, 2026-08-01.** The decisive migration explicitly records the finding that Devin Local loads discovered `AGENTS.md` files as always-on, thins retained `AGENTS.md` surfaces, moves scoped law to `.devin/rules`, audits the affected surfaces and adds guardrails.
- **Portfolio PR #6, 2026-08-12.** A broader standards refresh converts repo-owned scoped `AGENTS.md` material into conditional `.devin/rules`, adds runbooks/doctrine segmentation and related repo-standard cleanup.
- **Wild Bunch PR #176, 2026-08-24.** A later repo-standards cleanup explicitly migrates remaining scoped `AGENTS.md` surfaces into `.devin/rules` and refreshes the repo against the evolved standard.

The right propagation description is **convergence on touch**. Harley does not stop all work to update every inactive repo whenever a standard changes. Repos that are out of eyeline can stay on an older standard. When one becomes active again, a standards refresh is part of provisioning the working environment.

Do not write that `repo-standards` tells the agent which sibling repo is the golden example. It does not. Harley may separately tell an agent to inspect one or more sibling repos checked out on disk when a concrete example would help. That is human-directed pattern consultation, distinct from the standard itself.

## DRY, reuse and ownership

Harley's reuse threshold is conventional engineering judgement rather than a special agent rule.

If two real places need materially the same thing for the same reusable purpose, there is an argument for putting it in one shared place and referencing/distributing it rather than maintaining copies. Hypothetical reuse is not enough. "Someone might want this one day" is not a reason to manufacture a central abstraction.

When two repos need the same base idea plus meaningful local wrinkles, the preferred shape is:

- extract the reusable invariant into the shared Marketplace/distribution layer;
- leave the repo responsible for its local delta;
- express that delta in the surface that fits the job, which might be a repo-local skill, repo doctrine, a runbook, configuration or something else.

Skill composition is one mechanism, not the universal mechanism.

This prevents the central abstraction from accumulating Wild Bunch exceptions, Portfolio exceptions, Rooms exceptions and so on until the supposedly generic thing knows every consumer.

A useful conventional analogy is extracting shared implementation while leaving specialisation/configuration with the caller.

### Project-specific skills moved back to their owning repos

This ownership model evolved rather than existing fully formed from day one.

Historical Git evidence shows an earlier model where project packs were centrally owned/generated, followed by deliberate retirement of that arrangement and movement of project-specific skills into the repos that actually exercise and evolve them. Wild Bunch and Rooms both moved their project skills local during July 2026. Current Marketplace distribution contains reusable roots rather than hanging on to old Adventures/Wild Bunch/Rooms project packs.

The practical reason is maintenance locality as much as abstract purity. Harley got tired of returning to Marketplace to update a skill when an agent had tripped over something in a skill consumed by only one repo. If the skill affects one project, the project is the sensible place to repair it.

A future drafting candidate is: put reusable skills in the distribution layer; put project skills with the project that exercises and evolves them. Do not present that wording as an immutable universal law unless Harley approves it in copy.

## Shared base plus local delta

Current repos demonstrate a useful compositional pattern such as a generic `base-doctrine` plus repo/project-specific doctrine.

Harley's intended semantics are deliberately sparse:

- minimise cross-skill chatter;
- where no local compositional equivalent exists, the selected skill is the authority for its own job;
- where a repo-local layer deliberately composes with a central base, the local layer should state exactly what it invalidates or changes from the base;
- prefer separate authority boundaries and make overrides exceptional and explicit;
- composition should be directional rather than a mesh of authorities endlessly negotiating with one another.

Today this is still mostly engineered co-discovery plus strongly worded guidance, not a formal type system or mechanically verified precedence regime.

The base can anticipate that a more specific downstream skill may exist and ask the agent to explore matching companion skills. The repo-local skill can know the exact upstream skill it composes with and explicitly point back to it. Harley also intends compositional partners to advertise trigger descriptions in the same neighbourhood so the runtime is more likely to present/invoke them together.

Discovery found an important current limitation: that trigger-description mirroring is an intended pattern but is not consistently encoded today. Preserve that as internal truth, but do not build the public article around a transient implementation gap that is likely to be fixed quickly.

Downstream skill refreshes still flow through each repo's normal PR/publication and review path. That is a human or reviewing-agent gate, not formal semantic compatibility proof.

## Progressive discovery and context-safe skills

The current first-party skill style is a positive example of provisioning rather than accumulation.

A `SKILL.md` is intended to be a tight activation/router surface into wider references, not a dump of everything the skill knows. Marketplace policy currently enforces a first-party `SKILL.md` body under 500 words excluding frontmatter, with much smaller targets for frequently loaded/getting-started skills inherited from the skill-authoring discipline.

The important idea is not the exact word limit. It is that storage depth and active-context depth are independent.

`writing-with-clarity` is a particularly clean example:

- the skill tells the agent to read in bounded layers;
- it routes through `references/routing.md`;
- it selects one primary operational reference and at most one secondary by default;
- it explicitly says not to load every reference;
- a separate final-edit pass is bounded again;
- the full authority source remains available only when the smaller operational material leaves a genuine unresolved question.

This gives a strong general formulation:

> Context safety is not a property of how much knowledge you store. It is a property of the read path you design through it.

The full source can be very large and still remain cold. Operational references can be the normal knowledge surface. The skill should say exactly when a deeper read is justified rather than encouraging "maybe one more file" exploration.

## Source-backed skills and expertise provisioning

Marketplace now distinguishes several source-custody lanes for skills, including first-party material, legally vendored authority sources, mixed-source skills and citation-only clean-room synthesis where source material cannot be bundled.

The editorially useful point is not the taxonomy. It is that Harley does not need to personally possess all of the expertise represented by every specialist skill he uses.

His own example was the Strunk material behind `writing-with-clarity`: he has not read the full book. He established that it is a widely recognised authority, inspected enough to understand whether the resulting skill makes a legible difference, and can test the output at the level the work actually requires: did this rewrite become clearer without changing the intended meaning?

Sometimes the useful test is simply that an output feels overexplained, the relevant skill was not invoked, and invoking it causes a materially cleaner rewrite without Harley having to specify the exact defect in advance.

This supports a broader idea: skills can let the human operate from **recognition rather than full prescription**. The human can know "this isn't right" and invoke a trusted specialist capability without enumerating every remediation rule personally.

Do not treat the model's post-hoc explanation of "what the skill changed" as proof. It is one diagnostic signal among others. Behavioural before/after observation and source provenance are stronger.

## Specialist lenses

Harley often treats skills as specialist lenses: "what does `skill-name` think?"

A lens does not need to own an end-to-end task. It can inspect an artifact from one bounded expertise. Disagreement is expected and useful.

Harley's wording:

> "Lenses should disagree - if they agreed on everything in the first iteration that would be suspicious. Resolving the tension is an iterative process between me and the agent running the various lenses."

The human retains authority over the tension. The architecture should expose useful disagreement rather than silently inventing a universal precedence order among specialist opinions.

This discovery session itself used the same idea without requiring permanent skills: the £0-to-£10k lens, the weary hiring-manager lens and the cynical-architect lens are novel perspectives specific to this editorial job. Harley thinks they probably deserve durable repo guidance eventually, likely a runbook rather than a skill, because they do not need an independent discovery trigger.

That is an important provisioning point: not every useful thought needs to become a globally discoverable permanent instruction. Some knowledge belongs in a skill, some in a rule, some in a runbook, some in doctrine, some in a reference, and some can remain ephemeral conversational context.

## How durable guidance is placed

Harley's actual process is more failure-driven than taxonomy-driven.

When an agent does something bad or surprising, he tends to:

1. fix the immediate bad thing;
2. disassemble why that failure was reasonable given what the agent could see;
3. ask which future agent would have benefited from the missing knowledge;
4. ask where that future agent could have discovered it at the right time;
5. leave the smallest useful durable guidance at that discovery point.

This is closer to a regression guardrail or incident follow-up than "append another global instruction."

The taxonomy is allowed to be fuzzy. The engineering judgement is choosing an appropriate persistence and activation surface rather than pretending there is one perfect ontology for important knowledge.

## Bootstrap knowledge and the irreducible first turn

Harley's current mental model is `using-superpowers-plus` first, then environment inspection, repo/base doctrine recce and selective task routing.

Current Superpowers Plus has evolved toward a single cold-start router. Older `work-mode-router`/bootstrap-router responsibilities were consolidated into `using-superpowers-plus`, which now establishes the bootstrap order and hands off selectively downstream.

Do not describe `work-mode-router` as a current active node merely because it existed in older architecture.

### Environment inspection is deliberately non-optional

`inspecting-the-environment` was Harley's first addition to Superpowers Plus and he does not want it skipped. His reasoning is straightforward: an agent working on disk cannot responsibly tell him about the repo until it has established what tools and environment constraints it actually has for inspecting that repo.

That means some first-turn cost is intentional and irreducible.

The thing to watch is everything after that. Repo routing/doctrine should be a light recce: how this repo works and how to discover what is needed next. If first-turn wall-clock time starts creeping upward again, the second stack is the suspect, especially if it causes broad reading beyond the quick orientation needed for the next move.

### Upstream Superpowers evidence boundary

The first-turn skill-trigger engineering is inherited from `obra/superpowers`, not Harley's invention. Upstream treats skills as behaviour-shaping code, has explicit integration/evaluation expectations, and tests real agent CLIs for automatic triggering and workflow compliance.

Harley's additions are measured responses to behaviour in his own environments. He explicitly does **not** claim to have tested those additions to the same standard as upstream, and Devin Desktop/Local is not currently in the upstream documented harness matrix.

Do not use upstream Superpowers evaluation evidence as proof of Harley-specific additions or Devin behaviour.

## Lifecycle: live guidance should represent current truth

Provisioning includes expiry as well as activation.

Harley's current practice is opportunistic rather than perfectly automated: "We try to thread things in and replace stale shit with fresh shit as we go. It isn't perfect."

A repo that is actively touched should trend toward current guidance. Git preserves history. The live discovery surface should not become a museum of superseded instructions plus newer instructions explaining which old instructions to ignore.

A useful drafting candidate is:

> "If you need live instructions telling an agent not to obey the old instructions it just found, the old instructions probably shouldn't still be on the live discovery surface."

The repo still has known completed-plan/history cleanup opportunities that support this lifecycle lesson, but Provisioning should not become a housekeeping article.

### `self-heal` is an experiment, not evidence

Harley has a very recent experiment in his unversioned global user skills where a `self-heal` marker tells an agent that, if a skill surface is clearly stale/false/misleading, the skill is responsible for announcing the correction, fixing itself in place and returning to the original task.

Harley's own assessment: "It's an hour long fiddle and a theory so far. Haven't proven it or evolved it."

Keep this out of the article's proven architecture. At most it is a future lifecycle experiment worth revisiting after evidence exists.

## Soft guidance is useful, but it is not control

Harley relies on prose guidance constantly. The important boundary is that he does not pretend prose is enforcement.

His core phrasing:

> "Prose is just a sign on the wall an agent can read and ignore. tool restrictions are the control lever for what an agent can do."

The article can use a cleaned version of that distinction if it serves the provisioning argument:

- prose can orient, remind, explain, route and establish conventions;
- capability restrictions and runtime enforcement determine what the agent can actually do;
- declarative syntax that claims to restrict tools is still only a claim about control until the runtime has been verified to honour it.

Do not let Provisioning turn into the capability-control/hooks article. Read-side knowledge selection and action-side enforcement are related boundaries but deserve different treatment.

A useful contrast for another article is that a badly scoped sign on the wall creates reasoning noise, while a badly scoped hard gate can stop legitimate work entirely.

## Model and harness are part of one effective system

SWE-1.7 was a useful canary in this work because it exposes a lot of its reasoning. That made provisioning debt visible: the model would "chunner" through rule reconciliation that a quieter model might hide.

Do not turn that into a model-quality ranking. Sol is stronger in some relevant ways and often runs under a different harness. Comparing model behaviour across harnesses is a poor experiment unless runtime semantics are controlled too.

The durable idea is:

> effective behaviour = model + harness + provisioned environment

A reasoning-visible model can be useful for observing steering failures, but visible thought volume itself is not a performance metric.

## Portability and the current harness "wild west"

Harley's analogy is the mid-1990s web: standards can exist while browser/runtime differences remain important enough that engineers still have to know which consumer they are standing in.

Do not over-map the analogy. It is useful only at the level of fragmented runtime semantics despite emerging standards.

The current stance is deliberately agnostic rather than purist:

- do not build critical behaviour on a harness feature that is observably failing;
- do not refuse useful harness-native features merely because they are proprietary;
- keep reusable doctrine, skills and scripts as portable as practical;
- contain vendor-specific activation semantics at the edge where possible;
- treat a standard as a portability surface, not proof of equivalent runtime behaviour.

`.devin/rules` was an acceptable response because it improved Devin's scoped activation and did not interfere with Codex. That is different from pretending `.devin/rules` is a universal standard.

If a future runtime reliably supplies nested `AGENTS.md` scope, precedence and lifecycle semantics in a stable and observable way, Harley would happily use a dense nested mesh again, with better guardrails. The article must not imply that nested `AGENTS.md` is inherently a bad architecture.

## Evidence discipline and the subagent cautionary tale

A separate subagent experiment supplies a useful epistemic warning but should remain a sidebar or another article unless Provisioning genuinely needs it.

Harley spent hours experimenting with Devin custom subagent profiles and inconsistent tool availability. A recent conversation with a Cognition representative about the current frontmatter spelling made it tempting to reconstruct the old failure as a simple typo story.

Git falsified that satisfying explanation. The persisted experiment used the correct `allowed-tools` spelling throughout. Several hypotheses were tried and the root cause was never isolated.

The durable lesson is:

> The failure was real. The root cause is still unknown. Evidence outranks a satisfying causal story.

Do not claim the typo caused the historical experiment. Do not claim the Cognition representative diagnosed the old bug. A casual line such as "I dropped a message in Teams to the Cognition rep" may be useful in a future story, but the causal boundary has to stay honest.

## Anti-inferences the Provisioning article must actively avoid

The final prose should not accidentally imply any of the following:

- The `AGENTS.md` standard is bad.
- Nested `AGENTS.md` is bad in Codex.
- Devin's observed 2026 behaviour is universal or permanent.
- Less context is always better.
- Visible reasoning volume is a benchmark.
- Every active directive contradicted every other directive.
- `.devin/rules` is a portable universal solution.
- Git history proves hidden runtime internals.
- All injected rules had equal hidden weighting.
- Glob-triggered rules govern tool calls or provide capability security.
- The subagent experiment was caused by an `allowed_tools`/`allowed-tools` typo.
- A declarative tool restriction is enforcement merely because the configuration says so.
- Prose instructions are useless because they are soft.
- A hard gate is automatically safe because it is mechanically enforced.
- The original latency observation was a controlled benchmark.
- Marketplace was the only repo affected or necessarily the first repo where the symptom appeared.
- Marketplace invented the whole correction in isolation.
- Repo standards synchronise every repo immediately when they change.
- `repo-standards` tells an agent which sibling repo is the golden example.
- Sibling examples are automatically discovered rather than human-directed.
- Project-specific skill packs still live centrally when they have already moved to their owning repos.
- A repo-local skill automatically wins because of path proximity.
- Skill composition has formal, mechanically enforced precedence today.
- Similar skill descriptions guarantee both compositional partners are invoked.
- `work-mode-router` is still part of the current bootstrap stack.
- Upstream Superpowers evaluations prove Harley's additions or Devin integration.
- Harley invented the inherited first-turn Superpowers triggering mechanism.
- The experimental `self-heal` idea is a proven architecture.
- A model's post-hoc explanation of what a skill changed is proof that the skill caused the improvement.
- Harley claims personal expertise equivalent to every authority source behind a source-backed skill.

## Voice anchors worth preserving

These came naturally from Harley during discovery and are stronger than manufactured slogans:

> "Provisioning is moving something out of the prompt into the environment. Things you keep telling the agent need to become things you stop needing to tell the agent."

> "Don't read everything, read the next thing you need to make the next move."

> "I don't want to hand roll a fragile system that fails often. I want to work with the tools and runtime things that we have."

> "Prose is just a sign on the wall an agent can read and ignore."

> "Lenses should disagree - if they agreed on everything in the first iteration that would be suspicious."

> "What does `skill-name` think?"

Other voice material:

- RoboCop 2 receiving hundreds of Prime Directives and developing tics while trying to obey them all.
- SWE-1.7 "chunners" thought constantly, which makes it useful for seeing steering problems.
- The ecosystem currently feels like the web when standards existed but engineers still had to know which browser they were standing in.
- Marketplace's PR count is "preposterously higher" than the other repos because cross-repo ideas naturally get exercised there.

Use these selectively. The article needs an authored argument, not a greatest-hits reel.

## Public evidence map

Re-verify exact revisions immediately before final copy if a claim depends on current file contents.

### OpenAI/Codex instruction hierarchy

Current OpenAI documentation consulted during discovery:

- <https://learn.chatgpt.com/docs/agent-configuration/agents-md#how-codex-discovers-guidance>

The relevant documented model is a guidance chain discovered from project root toward the working directory, concatenated in order so closer guidance appears later and can override earlier guidance, subject to the combined instruction budget. This is public vendor documentation for Codex semantics, not evidence of Devin behaviour.

### Marketplace decisive migration

- PR #249: <https://github.com/HarleyBartles/agent-asset-marketplace/pull/249>

The merged migration explicitly records the observed Devin Local always-on discovery problem, thins `AGENTS.md`, moves scoped law to `.devin/rules`, audits the old scoped surfaces and adds guardrails.

### Cross-repo history

- Wild Bunch PR #161: <https://github.com/HarleyBartles/wild-bunch/pull/161>
- Portfolio PR #6: <https://github.com/HarleyBartles/portfolio/pull/6>
- Wild Bunch PR #176: <https://github.com/HarleyBartles/wild-bunch/pull/176>

These support the organic, cross-repo chronology described above. Re-read each PR before final prose rather than relying on this summary for exact counts or wording.

### Project-skill custody evolution

Historical commits identified during discovery:

- Wild Bunch project skills move repo-local: `1dc6800...` on 2026-07-21.
- Rooms project skills move repo-local: `77af168...` on 2026-07-30.
- Adventures central pack retirement: `70a7bb...` on 2026-07-19.

Use full SHAs/URLs only after refetching them during final source-custody work.

### Current provisioning examples

Useful current Marketplace surfaces include:

- `using-superpowers-plus`
- `inspecting-the-environment`
- `base-doctrine`
- `repo-standards`
- `writing-with-clarity`
- source-grounded skill-authoring policy
- current sparse root `AGENTS.md` and `.devin/rules`

These are examples of the resulting architecture. They are not a requirement to explain Marketplace in the article.

### Upstream Superpowers

The `obra/superpowers` repository and its eval harness are useful evidence for the inherited first-turn/bootstrap philosophy and the principle that skill text is behaviour-shaping code that should be evaluated. They do not prove Harley's additions or Devin support.

### First-party retained transcripts

Two supplied Devin conversations are source evidence for:

1. the live "just talking" self-administration symptom;
2. the deliberate diagnostic session that starts from Harley's `AGENTS.md` suspicion, observes always-on accumulation, passes the declared mesh validator and moves toward `.devin/rules`.

These are not currently public URLs. Treat Harley's prompts as first-party material and the agent's responses as diagnostic session evidence. Strip machine paths, usernames and irrelevant private details from any published excerpt.

## Related article seeds and material that should not swamp Provisioning

Discovery surfaced several valuable threads. Preserve them here so Provisioning can stay narrow.

### Marketplace article refresh

The existing Marketplace project surface should eventually explain Marketplace's actual role more clearly:

- provider of reusable standards and skills;
- consumer/dogfooder of its own standards and plugins;
- intentional golden example for the shape it distributes;
- natural place where cross-repo abstractions move once real reuse exists;
- organic incubator by consequence, not a formal graduation gate;
- high PR volume as a consequence of day-to-day cross-repo evolution and distribution work.

This is a separate portfolio story. Do not make Provisioning carry it.

### Hard capability gates and hooks

There is a separate story about moving from advisory prose to enforced tool/capability boundaries. A recent hook experiment showed both sides: an independent evidence judge could hard-block unauthorized-looking tool calls, but the gate was mis-scoped and ended up blocking legitimate unrelated work because its authority/evidence boundary was wrong.

The useful future argument is that stronger enforcement raises the cost of a scoping error. Provisioning should only use the simple distinction between guidance and control.

### Subagent debugging and causal humility

The Devin custom-subagent experiment is a clean future story about not trusting a satisfying causal reconstruction until Git/runtime evidence actually supports it. The root cause remains unknown. That incompleteness is part of the value.

### Lifecycle and self-healing guidance

The stale-guidance lifecycle question deserves further work, but `self-heal` is currently an hour-old theory. Revisit only after it has real behavioural evidence.

### Source-backed expertise and specialist lenses

The source-backed skill model, recognition-over-prescription and disagreeing specialist lenses may fit as concise positive examples in Provisioning. If they begin consuming too much space, they can support a separate article about provisioning expertise rather than provisioning repo policy.

### Portability wrappers

A separate engineering irritation exists around unnecessary `.sh` and `.ps1` wrappers around portable `.py` scripts. It illustrates the difference between true portability work and decorative ecosystem conformity, but it is not needed in this article.

## Current drafting constraints

When the manuscript is eventually drafted:

- Open inside a recognisable failure, probably the "just talking" conversation, then reveal the cross-repo pattern.
- Establish quickly that the old mesh was deliberate and internally coherent.
- Put the runtime contradiction and strongest proof before the midpoint.
- Use Marketplace as a receipt where useful, not as the subject or case study.
- Keep Git archaeology below the waterline. Readers need the shape, not a reconstruction of August commit by commit.
- Let conventional engineering judgement carry the story. Agentic mechanisms are the terrain.
- Keep runtime semantics over declared configuration as the dominant spine.
- Preserve uncertainty classes: public/Git-proven fact, retained-session evidence, first-party recollection, inference.
- Avoid turning a current implementation detail into a published limitation when it is likely to go stale within days.
- Avoid AI-writing comfort phrases and stock symmetrical rhetoric.
- Preserve Harley's contractions, directness, dry humour and occasional rough edge.
- No em dash in article copy.
- Do not write final prose until the remaining editorial choices are resolved enough to support one coherent first draft.

## Still unresolved for the article

The following remain editorial decisions rather than missing factual research:

- exact opening wording and how much of the visible reasoning specimen to quote versus paraphrase;
- how much progressive-discovery/source-backed-skill material belongs in this article before it becomes a second article;
- the eventual principal visual proposition;
- exact ending language;
- final article length and section rhythm;
- which of the candidate voice lines deserve pull-quote treatment;
- whether any adjacent thread belongs as a short sidebar or should be excluded entirely.

The governing argument, audience gates, definition of provisioning and dominant engineering principle are settled enough to draft from once Harley decides discovery has earned a first manuscript.

## Current editorial completion snapshot

- **Governing argument:** Agent knowledge/configuration only has the scope, precedence, activation and lifetime that the runtime actually gives it. Provisioning must be designed against effective runtime semantics, not repository convention alone.
- **Publication job:** Demonstrate senior conventional software-engineering judgement applied to agent environment and knowledge architecture, distinct from cataloguing tools or Marketplace.
- **Opening pressure:** A mundane "just talking" architecture conversation visibly swallowed by agent self-administration, against a wider cross-repo pattern of increasing wait/reasoning overhead.
- **Engineering judgement:** Runtime semantics over declared configuration, supported by scope, separation of concerns, DRY, ownership, progressive discovery, lifecycle and honest control boundaries.
- **Hiring-manager change:** Make it easy to see an experienced engineer diagnosing and correcting a messy systems problem rather than a prompt enthusiast describing a setup.
- **Architect change:** Make it easy to agree that Harley understands where an abstraction actually lives, verifies behaviour instead of trusting convention, can unwind a false assumption without discarding useful structure, and knows where guarantees stop.
- **Evidence route:** Retained first-party Devin sessions plus public Git history and current vendor documentation, with claim classes kept separate.
- **Uncertainty/privacy:** No fabricated origin repo, no benchmark claims, no universal Devin/Codex claims, no publication of work-specific hook details, strip machine/private details from transcript excerpts.
- **Anti-inferences:** Recorded above.
- **Voice anchors:** Recorded above.
- **Reconsideration condition:** A future runtime that reliably and observably enforces nested instruction scope, precedence and lifecycle would make dense hierarchical `AGENTS.md` attractive again. The recommendation is about runtime semantics, not a permanent ban on the mechanism.
- **Harley copy approval:** Not given. This record is discovery source only.
