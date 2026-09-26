# Reader-panel harness refactor: working implementation plan

**Status:** completed-awaiting-retirement. All six implementation tasks and planned validation are complete; retain this plan through the completing PR.

## Goal and boundary

Make the panel runner a durable, configurable experiment harness. The two optional asides in “I just write the code” are its first demanding acceptance case. Use the existing frozen 100-reader cohort for three conditions: core only, asides fully inline, and read now or defer with every unread aside offered at the reader's journey end.

The authoring agent still chooses editorial beats, invitation copy, and hypotheses. The harness validates, executes, records, and reports those choices. It does not infer beats from headings for new experiments or decide editorial meaning. Existing flat `--article` mode and v1/v2 manifests remain readable, and historical reports remain untouched.

## Article acceptance case

The ordered route contains ordinary beats and two optional reads at their authored positions: “SQL was my weak point” before “No dev is an island,” and “The webhook wasn’t early” before “The bit before the code.” The manifest carries each aside's exact visible title, eyebrow, standfirst, authored reading time and hidden body. The webhook body's figure is represented by a description and caption in the same beat; the text panel cannot judge the figure's visual effect.

| Condition | At each inline position | At journey end |
| --- | --- | --- |
| `core_only` | Show neither invitation nor body | No aside offers |
| `asides_in_flow` | Show each complete aside in place | No later offers |
| `optional_with_defer` | Show a related-read invitation, title, standfirst, reading time and a clear promise of another choice at journey end. Offer exactly `read_now` or `defer_to_end`. | Offer every aside whose body was not read inline, separately in source order. Offer `read` or `skip` for each. |

The inline promise must be direct: “You can read this now, or continue with the article and choose whether to read it at the end.” There is no inline `skip` or “read never” action. A reader who opens one aside and defers the other receives one end offer; a reader who defers both receives two. If a reader stops before reaching an invitation, that unread aside is still offered at journey end, recorded as `first_offer_unseen`. An invitation seen and deferred is `deferred_reoffer`. The terminal prompt must use truthful language for both origins.

Record `reached_end`, `stop_satisfied` or `leave_lost_interest` as the core outcome before end offers. An additional read does not change that outcome. After an aside opened at journey end, ask whether it increased, maintained or decreased satisfaction with the article for the reader's original goal, relative to just before opening it. Keep this answer per aside.

Report each aside's invitation reach, read-now and defer choices, unseen first offers, deferred re-offers, later reads and skips, and effects after later reading. Every percentage names its eligible denominator. Show combined routes and breakdowns by condition, core outcome and archetype. The choice condition describes self-selection; it is not a randomized effect of reading an aside.

Trace these routes without model calls: both read inline; both deferred then read; one read inline and one deferred then skipped; deferred then read after a satisfied stop; deferred then skipped after a lost-interest exit; and an exit before an invitation that produces a truthful first offer. No hidden body enters a Jev request before the matching open choice.

## Architecture to implement

1. **One authored route format.** A separate frozen cohort file supplies readers. A manifest supplies source hashes, title and promise, an ordered array of core beats and optional reads, and an array of named conditions. Each condition selects from a finite set of validated exposure and offer policies. CLI flags control files, execution mode, limits, concurrency, output and resume; they do not encode editorial branches.
2. **One journey engine.** Compile existing v1/v2 manifests and the new policy format into a canonical route. For each `(reader, condition)` journey, the same engine reveals the next piece, asks one typed decision about the current visible state, advances or stops, then applies terminal optional offers. The branch evaluator is independent of SDK calls.
3. **An event ledger.** Append events for content exposure, invitation, choice, body opening, core terminal outcome, terminal offer and optional-read effect. Track each optional item by ID. Freeze the core outcome before terminal offers. Derive all counts and denominators from completed journeys in this ledger, including `deferred_reoffer` versus `first_offer_unseen`.
4. **A request renderer and trace.** Render Jev state, question instructions and criteria from the current journey state. A no-network CLI trace accepts scripted choices and prints exact requests and exposed content, so prompts and every meaningful branch can be inspected before `--apply`.
5. **A bounded async transport.** Use the installed OpenRouter SDK's `alpha.decisions.create_async` for independent journeys in parallel. Preserve sequential decisions within each journey. A shared concurrency gate and global budget reserve wire attempts and estimated spend before dispatch, then reconcile SDK-reported attempts and cost. Attempt accounting must be request-local; the current mutable `DecisionClient` fields cannot be shared across simultaneous calls. Retain SDK retry configuration, add jitter, and respect transient rate-limit signals where the SDK exposes them.
6. **Durable progress.** Atomically checkpoint completed journeys, observations and usage in canonical off-repo scratch. `--resume` accepts a partial run only when cohort, source, manifest, model and prompt fingerprints match. It schedules only unfinished journeys. An in-flight journey interrupted by process failure may be rerun from its beginning; no partially recorded choices enter the report.

## CLI contract

Keep the existing `--experiment-file`, `--profile-file`, `--profiles`, `--check`, `--apply`, `--max-calls`, `--max-usd` and `--output` controls. Add:

| Control | Purpose |
| --- | --- |
| `--trace-choices <file>` | No-network deterministic branch trace with exact request payloads |
| `--concurrency <n>` | Maximum simultaneously active Jev requests; positive bounded integer |
| `--resume <partial-report>` | Continue a matching interrupted experiment without repeating completed journeys |

`--check` validates the cohort, hashes, route, all conditions, offer policy, estimated maximum calls and spend, and the configured concurrency. `--apply` emits completed/total journeys, calls, reported cost, active requests, retry count and elapsed time. The report also records per-call latency and total wall time. Do not turn `--check` into a paid probe.

## Work sequence and source seams

| Step | Main files | Working result and proof |
| --- | --- | --- |
| 1. Preserve current behavior | `scripts/reader_panel_experiment.py`, `scripts/reader_panel.py`, current tests | Characterize meaningful v1/v2 journeys and CLI output with focused fixtures: omit, closed, forced, inline choice, post-article choice, early satisfaction, lost interest and limit interruption. Tests assert behavior and exposure, not implementation shape. |
| 2. Define and compile route policies | `scripts/reader_panel_source.py`, `scripts/reader_panel_experiment.py`, `references/experiment-manifest.md` | A validated ordered route and finite treatment policies represent all existing modes and any number of optional reads. Legacy inputs compile to the same route. Unknown policy combinations fail during `--check`. |
| 3. Implement journey and events | `scripts/reader_panel_experiment.py`, `scripts/reader_panel_report.py` | The engine handles core beats, inline invitations, body reads, stops and terminal offers by item ID. Demonstrate both asides read now; one read and one deferred; both deferred; early satisfied and lost-interest stops; and unseen first offers. No hidden body appears in an unopened reader request. |
| 4. Make prompts inspectable | `scripts/reader_panel_decisions.py`, `scripts/reader_panel.py`, `references/experiment-manifest.md` | One request renderer serves live calls and `--trace-choices`. Trace the six routes named in the article acceptance case, including the explicit promise at each inline invitation and truthful terminal language. |
| 5. Add parallel execution and resume | `scripts/reader_panel_decisions.py`, `scripts/reader_panel_experiment.py`, `scripts/reader_panel.py`, focused tests | Async journey scheduling with request-local retry accounting and synchronized global caps. Checkpoint completed journeys atomically. Verify that out-of-order completions produce stable report ordering, caps are never oversubscribed, and resume neither repeats completed journeys nor mixes fingerprints. |
| 6. Update the skill and validate the article case | `SKILL.md`, `references/experiment-manifest.md`, article manifest in off-repo scratch | Document authoring, trace, concurrency, resume and interpretation. Build the actual two-aside manifest from the current Markdown and React shell; verify source hashes and the rendered invitation text. Run `--check` and scripted traces. The paid 100-reader panel is a separate editorial action after route review. |

All repository paths in the table are relative to `.agents/skills/running-reader-panels/`. The current article source is `src/client/src/data/content/writing/2026-08-28-i-just-write-the-code-is-not-a-full-sentence.md`; its inline aside presentation is also owned by `src/client/src/features/writing/ProductOwnershipArticle.tsx`. Both sources need hashes in this experiment's manifest. The webhook figure receives a truthful text description and caption in the panel route; visual judgment remains a rendered-page editorial read.

## Performance decision

Optimize wall time first by overlapping independent journeys. Do not initially pack multiple reader profiles into one Jev request: the article and other readers' profiles would share model state and could change the simulated decision. Jev's multiple-question facility is appropriate only for independent questions about one currently visible state. A choice that reveals new text and a judgment after reading that text remain separate calls.

The installed Python SDK exposes `create_async`; the current runner does not use it. Start with a conservative concurrency default and benchmark a fixed small cohort at 1, 4, 8 and 12 in-flight requests, recording median and tail latency, throughput, retries, 429s, timeouts and spend. Choose the default from those measurements, not from the computer's 12-core count. Keep `--concurrency` configurable and an upper bound in the CLI. Do not change the model or the reader-facing decision question merely to improve throughput.

## Completion criteria

- Every current supported experiment remains runnable through the unified engine; prior JSON reports need no migration.
- The new two-aside route represents all three conditions and all terminal outcomes without article-specific branches in Python.
- Inline `defer_to_end` carries an explicit promise of another choice. Every unread aside is offered once at journey end; deferred and unseen origins are recorded separately.
- Core attention and terminal outcome remain separate from optional-read choices and satisfaction effects. Counts show their denominators by aside, condition and archetype.
- No-network traces show exact Jev payloads for all representative branches, and no unopened aside body leaks into a request.
- Parallel and resumed runs preserve journey results, global call/spend caps and stable reporting. A measured concurrency setting improves wall time over serial execution without a material rise in retries or incomplete journeys.
- Focused tests pass, the repository's normal hooked commit gate passes when implementation is committed, and the article manifest passes `--check` and route inspection before any paid run.

## Review focus

- All currently supported conditions compile to one canonical route engine without changing their user-facing decision content.
- Optional reads use stable item IDs and distinguish an unseen terminal offer from a deferred re-offer.
- The trace displays exactly what each simulated reader sees and sends, with no unopened optional body leakage.
- Concurrent requests preserve per-journey ordering, deterministic output order, and global call/spend caps under retries and failures.
- Resume accepts only matching experiment fingerprints and cannot duplicate completed journeys or admit partial journeys as results.
- The article-specific manifest lives in canonical off-repo scratch, validates against Markdown and React article shell hashes, and is suitable for review without a paid run.

## Execution ruling

Ruling: execute the six coupled plan steps in one integration context and record progress in the off-repo ledger; user explicitly requested one commit only after all tasks are done, which overrides the skill's ordinary per-task commit cadence. Cost if wrong: task-level history is less granular, but the final hooked commit still proves the complete staged tree.

Ruling: model the webhook diagram description and caption as an inline preview on its optional-read route item, shown with the invitation before the body choice. The live React aside renders `visual` outside its collapsed `Details` body, so treating the diagram as hidden body text would misrepresent what a page reader sees. Cost if wrong: the text trace may give readers a description at a different point than the rendered composition, which is why the manifest is checked against the component.

Ruling: include the React aside's eyebrow and disclosure label in its inline presentation record. Both are visible to a reader deciding whether to open the collapsed body; the terminal offer remains a title, standfirst and reading-time choice. The current component does not render a reading-time line, so the acceptance manifest treats the authored estimate as part of the proposed optional-read invitation treatment, not as a claim about the current page. Cost if wrong: the experiment tests this presentation addition alongside the timing choice; interpret its results as a combined treatment.

## Task 1: Characterize the current runner and CLI

**Files:** `.agents/skills/running-reader-panels/scripts/reader_panel_experiment.py`, `reader_panel.py`, current tests.

Add behavioral tests for existing v1/v2 journeys and CLI controls before changing implementation. Cover omit, closed, forced, reader-choice, post-article choice, satisfied stop, lost-interest exit and call/spend interruption. Run the focused experiment and CLI test modules and witness expected RED only for genuinely missing planned behavior.

## Task 2: Compile authoring policies to one route

**Files:** `.agents/skills/running-reader-panels/scripts/reader_panel_source.py`, `reader_panel_experiment.py`, `references/experiment-manifest.md`, focused tests.

Define a versioned route manifest with ordered core beats, optional reads, named conditions and validated finite exposure/offer policies. Compile existing v1/v2 documents into the canonical route representation. Add validation for unknown combinations and preserve old flat CLI mode. Test through public parsing and route behavior, not private implementation shape.

## Task 3: Implement journeys, event ledger, and reporting

**Files:** `reader_panel_experiment.py`, `reader_panel_report.py`, focused tests.

Drive core beats, invitations, read-now/defer choices, terminal offers, stop outcomes and after-read effects through one state machine. Append events by optional-item ID. Freeze core outcome before end offers. Derive eligible denominators and breakdowns from completed ledger journeys. Prove the six specified two-aside routes and hidden-body non-leakage in tests.

## Task 4: Share request rendering with offline trace

**Files:** `reader_panel_decisions.py`, `reader_panel.py`, `references/experiment-manifest.md`, focused tests.

Centralize request rendering so live Jev calls and `--trace-choices` use identical state, question and criteria. Add scripted choices for the six acceptance routes and verify exact exposed text, promise language, terminal offer wording, body reveal boundaries, call count and zero network access.

## Task 5: Add bounded async execution and resumable checkpoints

**Files:** `reader_panel_decisions.py`, `reader_panel_experiment.py`, `reader_panel.py`, focused tests.

Use the installed OpenRouter Python SDK async `create_async` path for parallel independent journeys while retaining sequential questions within a journey. Keep retry attempts request-local; reserve global call and spend budgets before dispatch and reconcile actual SDK usage; add jitter and honor exposed retry-after signals. Persist completed journeys and observations atomically. Validate `--concurrency` and implement `--resume` fingerprint checks and unfinished-only scheduling. Prove cap safety during retries, stable output order, correct resume and no partial journey inclusion. Benchmark a fixed small cohort at concurrency 1, 4, 8 and 12; select a conservative default from measured throughput, retries and tail latency.

## Task 6: Update workflow guidance and build the article acceptance manifest

**Files:** `.agents/skills/running-reader-panels/SKILL.md`, `references/experiment-manifest.md`; off-repo article manifest and trace choices.

Document authoring, validation, trace, async execution, caps, checkpoints, resume and interpretation. Build the exact two-aside three-condition manifest from the article Markdown and React shell, including the truthful webhook-figure description; record current hashes, confirm invitation copy against the rendered component, run `--check`, and inspect scripted traces. Do not run a paid 100-reader panel as part of this implementation.

## Completion

Run focused tests for each task, refresh the generated mesh after retiring the three completed site plans plus the superseded reader-panel plan/spec and changing skill navigation, run `mesh --check`, then stage the final tree and make one normal hooked commit. Push the branch, open or update one Draft PR into `main`, and verify remote PR/head state. Do not merge.

Ruling: retire the completed 23 September reader-panel implementation plan and its matching design spec from the tracked tree in this successor slice. Preserve annotated convenience copies under `../_agent-scratch/portfolio/completed/{plans,specs}/`. Their durable cohort-admission, fairness, privacy, and panel-interpretation rules are already promoted to the active `running-reader-panels` skill and references; the superseded pilot-closeout steps have no remaining purpose because the skill is now used as the live workflow. Cost if wrong: future readers lose quick access to historical implementation details, but Git history and disposable copies retain them without treating them as current authority.

Ruling: retire the three completed 25 September site/header plans in this successor slice. Their checked-in convenience copies were byte-identical to the completed sources before removal. The successor plan records completed closeout and the durable test-ownership rule is in validation doctrine and the testing playbook. Cost if wrong: historical details are less prominent in the live tree, but Git history and the disposable convenience copies preserve them.

Ruling: keep the default concurrency at four. A bounded Jev benchmark used the same 12 frozen profiles against a single synthetic beat, with one batch at each setting: concurrency 1 took 4.38s (median 0.32s, p95 0.81s); 4 took 1.17s (0.34s, 0.44s); 8 took 1.19s (0.47s, 1.11s); and 12 took 1.24s (0.54s, 1.15s). All four completed 12 decisions with zero retries and reported cost of $0.00031256 per batch. This supports four for this endpoint and moment; it is not a universal throughput guarantee. Cost if wrong: a future provider or traffic condition may prefer another bound, so reports expose latency, retries, peak concurrency and elapsed time for later tuning.

Ruling after focused GPT-6-Luna review: failed calls without returned usage are explicitly unpriced and stop dispatch; resuming their checkpoint requires a provider-billing total through `--reconciled-unpriced-usd`. Incomplete journeys remain in checkpoints but are excluded from report journeys and observations. Optional-read results include combined-route counts and denominator-bearing breakdowns by condition, core outcome and archetype. Sync decision callbacks stay serial, and resume fingerprints are derived from rendered prompt content. These repairs strengthen the accepted budget, reporting, concurrency and resume requirements without adding new experiment behavior. Cost if wrong: requiring reconciliation delays continuation when provider billing is not yet visible, but avoids treating an estimate as actual spend.
