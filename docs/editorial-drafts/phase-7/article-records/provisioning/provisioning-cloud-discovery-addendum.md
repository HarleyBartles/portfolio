# Provisioning is not accumulation: late-stage Cloud discovery addendum

**Status:** Durable editorial source, not article copy.

**Relationship to the main record:** Read this after `provisioning-cloud-discovery-record.md` and before evaluating `provisioning-cloud-first-draft.md`. The main record was written before the final several hours of discovery. This addendum preserves the material developed afterwards so a local editor does not inherit an unqualified manuscript without the evidence, corrections, anecdotes and boundaries that produced it.

**Discovery state:** Substantive discovery is now closed. Harley explicitly called time after roughly ten hours of discussion. The reason was saturation, not a belief that every possible adjacent topic had been exhausted. Local Sol should edit and test the manuscript against this evidence rather than restarting the interrogation from first principles.

## Final governing frame

The late-stage discussion collapsed several provisional categories into one stronger abstraction:

> **Provisioning is capability.**

Knowledge, tool manuals, workflow skills, routing surfaces, review lenses and handoff contracts are not separate headline ideas. They are different ways of making a capability durable in the agent's environment so the human can ask for the work rather than repeatedly teach the agent how that kind of work should be done.

The article's established governing principles therefore remain:

- **The system is what the runtime does, not what the configuration appears to say.**
- **Things you keep telling the agent need to become things you stop needing to tell the agent.**
- **Don't read everything. Read the next thing you need to make the next move.**
- A capable environment may contain a great deal of machinery. The current worker should not have to carry all of that machinery in active context merely because it might become useful later.

Do not turn the finished article into a taxonomy of “knowledge provisioning”, “tool provisioning” and “workflow provisioning”. Those are implementation examples under the capability argument.

## Goldilocks is already the same thesis

Harley pointed out that the existing Goldilocks Patch Fairytale already states this argument visually.

Current source: `src/client/src/data/content/fairytales/goldilocks.md`.

Its first frame has Patch at a junction buried under maps, tools, notes, rules and competing signposts. The items are individually useful, but carrying all of them at once has become another problem to solve. The final frame presents enough relevant structure for the next decision.

This is not a newly invented idea for the Provisioning article. It is the same message Harley has been driving elsewhere in the portfolio, now being corralled into a longer engineering argument.

Editorial implication: the article may reference Goldilocks, but it should not present Goldilocks as fresh proof. It is a compact prior expression of the same opinion.

## Tools are part of capability provisioning

Harley broadened provisioning beyond repository knowledge and workflow to the tools themselves.

A tool does **not** automatically need a skill or operating manual. A simple retrieval/RAG tool with two clear fields can have a schema that fully explains its use. Adding a skill there would be ceremony.

Rich tool surfaces are different. Harley's GitHub MCP and work Azure DevOps MCP are examples, and Linear is the clearest public example discussed here. An agent can have access to a rich MCP yet still fail to use it because:

- the initial visible tool list may be truncated;
- the agent may not realise more operations exist;
- an operation can be named differently from the verb the agent is searching for;
- a schema can explain how to call an operation once found without explaining how the current task maps onto the wider capability.

Working candidate principle:

> **Tool availability and usable capability are not the same thing.**

Do not overstate this into “every tool needs documentation”. Harley explicitly rejects that cargo-cult reading.

### The Linear `save_*` anecdote

Before the operating skill existed, agents repeatedly searched the Linear MCP for a `create` operation, failed to find one, and reported that they could not create the object. Harley repeatedly had to explain that the Linear connector exposes create/update semantics through `save_*`: creating omits an ID and updating supplies an ID.

Harley's practical threshold was simple:

> “If I told the agent twice ‘yes you do have that tool, read the overflow file’ or ‘linear doesn’t have a create tool, use the save tool’ I need to stop telling the agent.”

This is the same provisioning rule as before. Repetition is diagnostic. Do not publish “two strikes” as a universal theorem; it is Harley's practical instinct for noticing a recurring human correction that the environment should absorb.

Current public repo evidence in `HarleyBartles/agent-asset-marketplace`:

- `using-linear-mcp` has trigger-rich description text and routes by intended operation.
- Its fast rule tells the agent that if it is looking for create/update and cannot see those verbs, search `save_*` first.
- Its mutation reference documents `save_issue`, `save_project`, `save_document`, `save_initiative` and `save_milestone` as create/update surfaces, with `create_issue_label` as an explicit exception.
- Its OpenAI adapter permits implicit invocation and tells the agent that create/update operations are usually exposed under `save_*`.

Evidence boundary: this proves the configured routes and skill content. It does **not** prove proprietary harness relevance scoring or guarantee that semantic skill discovery will fire on every prompt.

### Tool mechanics and domain judgement are separate concerns

The same intent, “create a Linear issue”, can legitimately activate two different capabilities:

- `using-linear-mcp`: how to use the connector/tool surface.
- `linear-issue-shaping`: how to make the issue itself useful, worker-ready and durable rather than “shit”.

This is ordinary separation of concerns: one layer makes the operation usable; another applies domain/workflow judgement to the result.

Harley's explicit qualification:

> “General rule of thumb, yes. Cargo cult doctrine, no. It’s the thing that currently solves a few persistent niggles, it’s not the final solution to agentic engineering.”

Do not write this decomposition as a universal final architecture.

## Discoverability is engineered redundantly, not guaranteed

Harley deliberately stuffs skill descriptions with trigger language so the harness has a strong semantic route to relevant skills. He does not claim this is failsafe.

He also relies on `using-superpowers-plus` as an explicit first-turn router because, in his current environment, it is very reliably present at session start. Its bootstrap surface enumerates capabilities such as Linear and GitHub operating skills, giving the agent another route even if semantic invocation does not happen automatically.

Useful framing:

- semantic/implicit discovery is one route;
- explicit bootstrap routing is a fallback/known map;
- this is engineered redundancy, not a claim about hidden harness scoring.

Do not claim “no agent can mathematically ever miss this skill”. The first-party experience is that the current provenance/bootstrap path makes misses uncommon enough to rely on operationally.

## Fix the source when you own it; adapt at a boundary when you do not

Harley's current rule:

> “Fix the source is best but only possible if I control the source.”

Linear's MCP naming is external, so an operating skill is an adapter at a boundary Harley controls.

The Superpowers evolution is the counterexample on an owned surface. Harley initially kept upstream core intact and added an overlay/adaptor layer. Over time the number of adaptors grew and the arrangement crossed a simple economic boundary:

> “We were honestly bastardising the source for no return on value but with an added forever burden of maintaining an overlay adapter layer. Once I had a bunch of adaptors the question is simple to answer - is the maintenance burden outweighing the benefit of keeping the source intact?”

The progression is therefore:

1. Work with the source as-is when that is sufficient.
2. Adapt at a boundary you control when the source is external or divergence is still cheaply isolated.
3. If you control the source and the adapter layer becomes the recurring maintenance problem, owning the modified source can be cheaper than preserving upstream purity.

Editorial decision already made: the Superpowers overlay-to-fork history is probably **not** worth a detour in the Provisioning article. The principle is useful. The detailed story belongs to a potential future article about upstream divergence, adapter layers and ownership.

Do not turn this into “fork your dependencies”.

## The workflow is provisioned capability

Harley corrected a weaker earlier framing that prompts merely hold “one-off context”. In his normal work, the prompt/conversation is the beginning of the work because the work itself is not yet known.

Current pattern:

- conversation starts the work;
- `using-superpowers-plus` routes naturally into brainstorming/clarification rather than immediate implementation;
- brainstorming discovers the problem and resolves ambiguity;
- depending on work shape it produces a spec or routes into a larger roadmap/epic shape;
- planning is normally not optional once a spec exists;
- the plan is executed via an execution lane such as `executing-plans` or `subagent-driven-development`;
- review has requesting/receiving cycles, with `iterative-review` separately invocable but not trusted enough today to be the primary correctness gate.

Much of that workflow comes from upstream Superpowers. Do not attribute the whole development lifecycle to Harley.

Harley's point is that any capable model can be asked to “write a plan”, and some harnesses even provide a planning mode. That generic ability is weaker than the capability he wants provisioned in his environment. His environment knows what a spec is, what a plan must guarantee, when an epic/roadmap shape is required, how planning hands off to execution, and where review lives.

Without those capabilities provisioned, he would have to explain the lifecycle repeatedly in prompts. That is precisely what he considers unsustainable.

## Specs and plans are contracted artifacts, not arbitrary summaries

A late-stage correction is important here. Do not describe the workflow artifacts as mere context compression or “whatever the previous phase wrote down”.

Harley's wording:

> “A spec is a defined thing with a contract, it’s not just ‘anything the brainstorming agent wrote down’. A plan also has a contract.”

A spec exists for a purpose and must guarantee what the planning stage needs. Harley's compact formulation is:

> **A spec must contain the seams for the planner to open.**

A plan likewise exists for execution. In the current workflow it is task-shaped, individual steps are estimated around 2–5 minutes, it declares a recommended execution strategy, and it contains both how to execute and how to prove execution was correct.

The next stage is entitled to rely on those guarantees. Treat these artifacts more like interfaces/contracts than narrative summaries.

Current public skill evidence in `agent-asset-marketplace`:

- `brainstorming` produces a written design/spec and routes to planning after review/readiness.
- `writing-plans` requires task-shaped plans, explicit interfaces, bite-sized actions, verification, committed plan lifecycle and an execution strategy.
- `executing-plans` and `subagent-driven-development` consume an approved plan and preserve the boundary between controller context and worker context.

## Handoff Gates: the rating is not the point

`handoff-gates` is Harley's first-party addition to the upstream workflow and is one of the stronger examples for the article.

Do **not** present its numeric score as the invention.

Harley's observation was simpler: an agent can finish an artifact, announce that it is ready, and then immediately find substantial weaknesses if asked to rate its own handoff confidence critically.

Typical interaction:

1. Agent: the plan is complete, approve it and I will execute.
2. Harley: “What’s your rating?”
3. Agent gives an honest lower score, names missing seams or weak verification, and often fixes them directly.

The act of rating forces a perspective change from producer to critic. The number is mainly a forcing function.

The current skill uses an 8/10 floor, 9/10 target, and permits one bounded strengthening pass in the 8–8.9 region. The bounded pass prevents the useful self-critique from turning into unbounded perfectionism.

### The “fresh agent” is a lens, not an execution topology

Harley explicitly corrected another likely misreading.

The next phase often runs in the **same** agent/session. Actual freshness is not the point.

The counterfactual question is useful because:

- “Can I continue from this spec?” allows the producing agent to silently rely on its own conversational memory.
- “Could a planning agent continue from this spec?” forces the producer to inspect whether the artifact contains assumed shared pre-knowledge it never earned.

Harley's wording:

> “The actual freshness of the agent implementing it isn’t the point, the point is only making the agent consider if something in their artifact contains an assumed shared pre-knowledge it doesn’t earn.”

This is the important mechanism. The artifact is being tested as a consumer-facing contract.

### Handoff Gates has real repo evidence

The original design for `handoff-gates` defines three readiness lanes:

- spec-readiness: can a planning agent expand the spec without improvising or discovering seams mid-flight?
- plan-readiness: can the implementer/orchestrator execute without improvising mid-flight?
- completion-readiness: what will a reviewer find when checking the work against the plan and review guide?

The repo's pressure results show the mechanism changing behaviour: weak artifacts are scored below the floor, specific gaps are surfaced, and stronger artifacts are re-rated after repair.

A real composable-tooling design also received a strengthening commit after a handoff-gate review found concrete omissions such as CLI contract details, duplicate target semantics, a wrong test location and a missing risk note. This is stronger evidence than presenting only a synthetic pressure scenario.

Again, the defensible claim is that asking for the rating surfaces weaknesses and gives the workflow a bounded point to repair them. Do not imply that a 9.2 score is scientifically calibrated quality.

## Provision the method; bring the work

A useful distinction from the final discussion:

- The conversation supplies the actual problem, intent, current constraints and human judgement.
- The environment supplies the reusable capability for discovering, shaping, planning, executing and reviewing that work.
- Durable stage artifacts carry the contracted information required by the next stage.

The prompt is therefore not a storage layer to eliminate. It is the discovery surface for work that does not exist yet.

Candidate working sentence, not approved copy:

> **Provision the reusable method. Discover the specific work.**

The article should keep the stronger capability framing above it: what is provisioned is the ability to perform that method without re-teaching it in every prompt.

## Article centre after final discovery

The strongest synthesis is now:

> **A well-provisioned agent environment makes durable capabilities available at the point of need without requiring every worker to carry the supporting machinery for every possible capability all the time.**

The original `AGENTS.md` incident is the concrete failure case. The environment contained useful capabilities, but runtime activation collapsed their boundaries and forced the worker to carry too much supporting material simultaneously.

The corrections preserve capability while changing delivery:

- sparse durable root guidance;
- conditional/scoped activation where the harness supports it;
- discoverable skills/runbooks/references instead of ambient dumps;
- rich tool operating knowledge only where tool semantics need it;
- explicit workflow capability instead of repeated prompt instruction;
- contracted artifacts at stage boundaries;
- first-party additions such as Handoff Gates where repeated manual correction proved a capability worth preserving.

This is the same point Goldilocks already expresses visually: the environment can contain the workshop; the worker should receive the next thing needed rather than carry the whole workshop around just in case.

## Editorial decisions already made

Use these to avoid reopening settled branches during local editing:

- Marketplace is evidence/golden-example material, not the protagonist of the article.
- The Superpowers overlay-to-fork story should remain background unless the manuscript has a very specific need for one short ownership example.
- Do not create a grand taxonomy of provisioning categories.
- Handoff Gates deserves a bounded example because it is Harley-original and demonstrates a repeated manual intervention becoming durable capability.
- Goldilocks may provide a useful cross-link/echo, but is not new evidence.
- Tool manuals are selective, not universal. Simple tools may need none.
- `using-linear-mcp` and `linear-issue-shaping` demonstrate separate operational and judgement concerns, but this is a rule of thumb, not doctrine.
- Skill trigger descriptions and implicit invocation are engineered discovery aids, not guaranteed harness semantics.
- Do not imply all of Superpowers is Harley's invention. Much is upstream; Handoff Gates is fully Harley's addition.
- Do not treat the Handoff Gates score itself as a calibrated metric. The critical self-assessment is the mechanism.
- Do not equate “fresh agent” with a requirement to spawn a new agent. It is a perspective test for hidden shared state.
- Do not reduce specs/plans to summaries. They have contracts.
- Do not imply the current patterns are the final solution to agentic engineering. Harley expects to delete/replace them as runtimes improve.

## AI-fatigue warning for the first draft

Harley explicitly spotted formulaic comparison/reversal tics in the first coherent draft, especially constructions of the form:

- “That isn’t X. It’s Y.”
- “The answer isn’t X. It’s Y.”

The repo Sol editor should use the installed writing/fatigue skills and the broader anti-slop guidance already present in this Phase 7 work. Look especially for:

- false contrast or reversal used only for rhythm;
- symmetrical paragraph pairs;
- repeated “the point is” / “what matters is” style comfort phrases;
- over-clean slogan sequences that sound more model-authored than Harley-authored;
- unnecessary lists where Harley would normally use prose;
- repeated short declarative sentence cadence;
- conventional AI transitions and throat-clearing;
- any attempt to turn nuanced rules of thumb into doctrine because the prose wants a neat maxim.

The goal is not “undetectable AI”. Harley is open about AI use. The goal is to avoid reader fatigue and make the prose sound like Harley rather than like the median technical article generated by an LLM.

## Evidence and anti-inference additions

### Supported by current public repository surfaces

- Goldilocks fairytale wording and visual transcript.
- `using-linear-mcp` operation routing and `save_*` guidance.
- `linear-issue-shaping` as a separate Linear domain/work-quality skill.
- `using-superpowers-plus` first-turn/bootstrap routing.
- `brainstorming`, `writing-plans`, `executing-plans`, `subagent-driven-development`, `requesting-code-review` workflow contracts.
- `handoff-gates` lane definitions and thresholds.
- Handoff Gates pressure results.
- The composable-tooling design and strengthening history after handoff review.

### First-party account from Harley

- Repeated agents saying they could not create Linear objects until told about `save_*`.
- The practical “if I have to tell it twice, stop telling it” threshold.
- Current first-turn reliability expectations for `using-superpowers-plus`.
- Overlay-to-fork maintenance judgement.
- Normal work beginning in conversation and flowing through the provisioned Superpowers workflow.
- Rating an artifact often causes the same producing agent to expose weaknesses immediately.
- The “fresh agent” language is a lens for unearned pre-knowledge rather than a process requirement.
- The current workflow is valuable because it gives his environments capabilities he would otherwise have to specify repeatedly in prompts.

### Do not infer

- Every tool needs a manual.
- Skill discovery is guaranteed by trigger-rich descriptions.
- Handoff scores are scientifically calibrated.
- A separate process must always use a physically fresh agent.
- Every spec/plan is merely a context summary.
- All workflow capability was invented by Harley.
- Forking upstream is generally superior to adapters.
- Current Superpowers Plus decomposition is a final agentic architecture.
- More stored capability means more active context.
- Less context is always better.

## Local Sol handoff

Local Sol should now reason from, in order:

1. `provisioning-cloud-editorial-brief.md`
2. `provisioning-cloud-discovery-record.md`
3. **this addendum**
4. `provisioning-cloud-first-draft.md`
5. the exact public/source surfaces named in the records as needed for verification

The first draft is intentionally qualified by the two discovery documents. Do not treat a clean sentence in the manuscript as stronger evidence than Harley's recorded intent or the source boundary.

The next useful work is editorial, not more discovery: fatigue/voice review, evidence alignment, structural tightening, and then Harley review. The baton is **not** `Ready for local production` and copy approval has **not** been given.
