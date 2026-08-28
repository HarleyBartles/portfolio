# Cloud discovery and local-production handoff — I made agentic engineering harder than it needed to be

**Status:** Final Cloud Sol editorial-room handoff, 28 August 2026. Discovery is complete enough for local production. This record is internal editorial custody, not public copy or an admission decision.

**PR / branch:** `#38` / `codex/phase-7-context-editorial-room`

## Accepted article

The accepted title is **I made agentic engineering harder than it needed to be**.

The old title, **Context is not the same as state**, no longer states the essay's governing argument. Context/state remains a supporting idea in the back half of the manuscript, where the article corrects the earlier shorthand `Memory is context. Files are state.`

The accepted production manuscript currently lives at `src/client/src/data/content/writing/2026-08-07-context-is-not-state.md` only because Cloud deliberately stopped before page/route production.

### Intentional URL / slug change for local production

Local Sol should treat the title change as an intentional URL change, not accidental route drift. The old `context-is-not-state` URL may die. Harley explicitly does not require preserving it. Stand the accepted article up under the new title-derived slug/file/route according to current production conventions. Do not keep the old slug merely for backwards compatibility unless a current repository rule independently requires it.

Cloud has not renamed the source file or changed routing because page composition, route production, redirects and admission remain local-production responsibilities.

## Governing argument

Taking agentic engineering seriously can itself become a source of unnecessary complexity. The failure mode is not `complexity bad` or `governance bad`. It is adding roles, rules, reports and controls whose abstraction does not pay rent for the project.

The useful correction is to put machinery on boundaries that actually exist:

- use a real domain boundary when different parts of the project genuinely own different work;
- dispatch a specialist profile when a task benefits from a specialist posture;
- use harness-enforced capability limits when a boundary must actually hold;
- persist material when it needs durable custody and authority;
- route durable material back into worker context when it needs to govern an action; and
- let stale or disposable material leave instead of memorialising it.

The book project needed research, world-building and writing. It did not need a standing organisation coordinating three fictional employees.

## Lived organisation story

The private book repository has three real domains: research, world-building and writing.

The early implementation gave the domains separate Git repositories connected by submodules and then represented each domain as a named persistent actor:

- **Albert the Archaeologist** — research;
- **Brian the Librarian** — world-building;
- **Derek the Novelist** — writing.

Work entered through a coordinating layer, was accepted/delegated down to the relevant actor, and travelled back upwards through reports.

Harley's retrospective judgement is specific: the characters were not the mistake. `Albert` is still a perfectly good name for a research profile. The expensive part was turning Albert into a standing employee with persistent organisational identity, responsibilities, routing rules and reporting relationships.

Harley's language for the failed layer is **puppetry and theatre**. It made the organisation memorable but did not buy anything the project required over keeping the three genuine domains and routing work into them.

## Signs on the wall, profiles and enforcement

A key correction discovered late in the room is that `role`, `profile` and `capability boundary` must not be flattened into a simple weak-to-strong ladder.

The old system often used repository prose equivalent to: `you entered archaeology; bind as Albert now.` That is a sign on the wall. The agent must discover it, read it and give it the right priority.

A dispatched profile changes delivery. Harley's observed/runtime-specific experience is Devin profiles:

- the profile **body** functions like root `AGENTS.md`-style starting guidance for the worker invoked under it;
- the worker does not have to discover the role specification somewhere in the repository;
- obedience to the prose remains model behaviour; guaranteed delivery is not guaranteed obedience;
- the same profile's **frontmatter** can provision/restrict tools at the harness level; and
- where the harness honours those restrictions, a capability boundary can be enforced rather than merely requested.

Harnesses vary. Do not universalise Devin's exact profile syntax or semantics without fresh evidence.

The public manuscript therefore distinguishes two jobs: routing guidance into the worker's starting context and constraining what the worker can actually do.

## WorkClaw: causal turning point and evidence boundary

[WorkClaw](https://www.workclaw.com/blog/introducing-workclaw) launched while Harley's own named-agent organisation was still live. Its public product framing around collaborative AI coworkers coordinating work was close enough to Harley's hand-rolled organisation to make a useful second experiment.

Harley rebuilt a miniature version of the book-writing organisation in WorkClaw.

The causal sequence to preserve is:

1. the **$100 startup credit** was consumed by setting the organisation up and one small smoke task;
2. Harley gave the product the benefit of the doubt and bought a monthly subscription;
3. he then left the organisation largely idle for a couple of days and watched the paid allowance disappear too;
4. that made `move the home-grown organisation into the productised organisation` economically unattractive; and
5. the failed migration idea forced the more useful architectural question: **does this book earn an organisation at all?**

The answer was no. The book earned three domains, not an organisation.

### First-party correspondence evidence

Harley supplied screenshots of the contemporaneous email thread with WorkClaw support during this room.

The correspondence directly supports these claims:

- apparently idle agents were performing periodic **heartbeats** to check whether work needed doing;
- those heartbeats were consuming **far more credits than expected**;
- WorkClaw's planned remediation was to use **lower-cost models for lightweight work** and **increase the heartbeat interval**; and
- WorkClaw covered the resulting overage.

Do **not** publish `frontier models were being used for heartbeats` as fact. Harley's usage data makes that a plausible inference, but the email itself does not say `frontier`, and the article does not need the stronger claim.

Harley also noted privately that he did not get back the paid monthly allowance he had purchased and not been able to use. That explains the lingering bad taste but does not strengthen the engineering argument. Keep it out of public copy unless Harley later decides otherwise.

The WorkClaw lesson is not `therefore my hand-rolled organisation was right`. The useful convergence is narrower: an independently productised version of the same broad abstraction still failed Harley's local cost/benefit test. His version charged repository complexity; the packaged version charged runtime spend.

## Documentation, salience and receipts

The organisational mistake had a sibling in repository guidance.

When an agent violated a rule already present in the repo, Harley's early response was often to strengthen the rule, link it more prominently, or add supporting policy/contract/check material. The instinct was to turn failures into durable engineering knowledge. Repeated enough, it flattened priority.

Accepted pull quote:

> **If you shout “WOLF” at an agent enough, everything starts looking like a wolf.**

An agent can later acknowledge that the missed instruction was present all along. That does not prove the correct repair is `make this rule louder`. Another important instruction may simply have won the attention contest.

Agents also produced reports, proof files and completion receipts. Some receipts have real consumers and must survive. A receipt whose only job is to narrate work Git already records creates another surface that can become stale and another authority question for future workers.

Accepted pull quote:

> **The repository remembered too much.**

Harley spent roughly a fortnight ruminating on how to unwind the repository rather than disappearing for a fortnight and returning with a sudden answer. The cleanup question became: how can an agent classify roughly 300 documents without Harley personally deciding custody for every one?

That thinking became the public, inspectable [`cleanup-custody`](https://github.com/HarleyBartles/agent-asset-marketplace/blob/main/.agents/skills/cleanup-custody/SKILL.md) skill. Keep this link in production. It is the public proof path for a lesson whose main scar repository must remain private.

## State/context is supporting material, not the title

The room rejected the old article's strong binary `Memory is context. Files are state.`

A repository file can be durable while stale, superseded, ambiguous or non-authoritative. Persistence does not create truth or authority.

The accepted supporting distinction is:

- **state** is material the project deliberately carries forward with legible enough authority/lifecycle to be useful later;
- **context** is what the current worker needs in order to act correctly now;
- important context becomes state when it must survive; and
- relevant state is routed back into context when it must influence action.

Some information deserves neither.

This remains useful article material, but it no longer carries the essay's title or governing promise.

## Privacy / source custody

The book repository is private because its product content is based on lived experience and real people. Public copy may discuss engineering mechanics, repository structure, actor/profile names, cleanup chronology and abstracted architecture that Harley has explicitly approved.

Do not expose or link manuscript content, character/lived-experience subject matter, testimony content, real-person claims or other content-entangled material from the private repo.

Public inspectable evidence should be used where it exists. `cleanup-custody` is the key public proof for the cleanup/custody lesson.

The manuscript's private-source disclosure may remain: Harley cannot link the Rooms history but is willing to screen-share the engineering history in an interview, subject to a reasonably strong stomach for profanity.

## Cutting-room / future article material

### Source-faithful staging before canonical project truth

The room uncovered a separate article's worth of architecture while verifying what the surviving research/world/manuscript domains actually do. Do not inflate the current article with it.

The important future thread is **one source-faithful staging model per source type/class** before material reaches canonical Pit.

Twitter archives come from the same source system and therefore have the same structure. Today they share one Twitter archive-staging database. Future source classes such as participant testimony or folders of screenshots will need staging representations appropriate to their own source shape.

The intended progression is conceptually:

`source artifact -> source-type faithful/queryable staging -> canonical Pit facts -> deliberate World representation -> Manuscript`

Pit represents what the evidence can establish about the real world. World represents the book's world and can preserve ambiguity, character belief and deliberate divergence from research. Manuscript owns what appears on the page. World database work is intended/forthcoming; do not write as though that database layer is fully implemented today.

This is preserved in the cross-article ledger rather than expanded here.

### Independent convergence is evidence, not validation

The hand-rolled organisation and WorkClaw independently converged on a broadly similar abstraction. That convergence removes `my homebrew implementation was uniquely silly` as the only explanation, but it does not prove the abstraction fits this project.

Potential future thesis: **independent convergence is evidence that an idea is plausible, not evidence that it is locally correct.**

This is also routed to the cross-article ledger.

## Three-lens final review

### £0-to-£10k agency lens

The Cloud room regards the manuscript as approximately **£9,500 / £10,000 copy before local page production**. The remaining gap is production treatment, final rendered rhythm, corpus-level fatigue review and exact route/page finish, not missing discovery or missing argument.

### Weary sceptical hiring manager

**Safe to forward once stood up well.** The article shows failure, rejected machinery, a second product experiment, a concrete replacement mechanism and a public inspectable artifact produced by the lesson. Preserve the `cleanup-custody` link and the exact evidence boundaries around WorkClaw.

### Jaded cynical architect

**Pass.** The article survives the cheap `complexity bad` dismissal because the replacement is not less engineering by default. It distinguishes discovery/routing of guidance from dispatch-time starting context and harness-enforced capability, preserves real domain boundaries and makes the evidence/canon promotion boundary concrete.

Do not weaken these qualifications during production:

- a profile body guarantees delivery into starting context in Harley's observed Devin setup, not obedience;
- frontmatter/tool enforcement is harness-specific;
- WorkClaw's email supports expensive heartbeats and cheaper-model/longer-interval remediation, not the stronger `frontier models` inference;
- World database evolution is future/current work, not completed implementation; and
- persistence does not make a file authoritative.

## Local Sol production handoff

Read in this order:

1. `context-cloud-editorial-brief.md` for the original room contract and protected boundaries;
2. `context-cloud-discovery-record.md` for the accepted story, evidence classes, corrections, privacy custody, future threads, title/URL decision and three-lens review;
3. `src/client/src/data/content/writing/2026-08-07-context-is-not-state.md` for the accepted manuscript currently parked under its old production filename;
4. `cross-article-thread-ledger.md` for material deliberately routed away from the manuscript;
5. live public sources named here when a production claim needs re-verification; and
6. `context-terra-draft.md` only as superseded historical working material.

Local Sol owns:

- moving the article off the old `context-is-not-state` filename/slug/URL and onto the new title-derived production route;
- page composition and article framing;
- deciding whether the WorkClaw section should be lifted into an editorial aside, following recent article precedent;
- preserving the two deliberate pull quotes (`WOLF` and `The repository remembered too much`);
- final source refresh where needed;
- corpus-level fatigue/voice review;
- route/index/generated-surface updates caused by the intentional slug move;
- editorial admission; and
- publication/deployment proof.

Do not reopen discovery or the governing premise by default. The Cloud room's accepted output is the current manuscript plus this record.

## Time-box stop condition

The Cloud room stops when the title change, this durable handoff, the two cross-article future threads, README read order and Phase 7 index entry are verified on PR #38's branch. Page production remains local work.
