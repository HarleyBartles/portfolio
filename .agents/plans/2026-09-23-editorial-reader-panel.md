# Editorial Reader Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** in-flight; bounded pilot accepted and 100-reader cohort tested

**Execution amendment (23 September 2026):** Harley selected a separate repo-owned skill for the reader panel after the successful 100-reader experiment. Task paths below record the original implementation sequence. The current command, profiles and tests live under `.agents/skills/running-editorial-reader-panels/`; `writing-portfolio-articles` links to it.

**Reader-profile amendment (23 September 2026):** The runtime cohort generator and generic ten-lens expansion are superseded. The intended eventual inventory is 140 authored, stored profiles: ten under each of fourteen motive-led archetypes. This slice authors and pilots only the first ten, under `craft-admirer`. Earlier 100-reader cohort results remain historical experiments, not the current profile-production method.

**Goal:** Build a local, opt-in OpenRouter/Jev reader-panel experiment that maps simulated reader attention across an article without scoring, rewriting, or publishing it.

**Architecture:** A repo-owned article-skill command parses one or two Markdown drafts into opening/section beats, validates a small set of purpose-based reader profiles, and sends a prefix-only decision state for each active profile/beat to OpenRouter's Decisions API. Separate source, transport, and orchestration modules keep Markdown handling, paid calls, and aggregation independently testable; a local JSON report goes to canonical off-repo scratch.

**Tech Stack:** Python 3 standard library (`argparse`, `dataclasses`, `json`, `urllib.request`, `unittest`), OpenRouter Decisions API, pinned `typesafe/jev-1.13`.

**Spec:** `.agents/specs/2026-09-23-editorial-reader-panel-design.md`

**Execution Strategy:** `executing-plans` — the parser, transport, budget accounting, and report are sequentially coupled, so inline execution with one final whole-branch review is more efficient than fresh implementers per task.

## Global Constraints

- Read the spec, `.agents/doctrine/writing-policy.md`, `.agents/playbooks/article-writing.md`, and the `writing-portfolio-articles` skill before implementation. Their editorial authority remains unchanged.
- This is a local agent-facing tool, not browser code, a public route, a runtime backend, a new MCP server, or an automatic editorial/publication gate.
- `OPENROUTER_API_KEY` is read only by `--apply` from the process environment. Never print, persist, commit, or pass the key as a CLI argument. Never add a `.env` file.
- Default `--check` makes no network request and requires no key. Paid `--apply` is explicit, bounded, and never invoked by CI.
- Use `https://openrouter.ai/api/alpha/decisions` with `typesafe/jev-1.13`; pin and validate the typed response. A schema or endpoint change fails closed, with no chat-model fallback.
- All panel outputs and temporary article variants stay in canonical off-repo scratch; no corpus snapshot, golden rewrite, or generated panel result is committed.
- The 8–12 starter profiles are purpose-based. Accept up to 100 validated profiles, but do not claim independent human readers or predict a retention percentage.
- Run focused tests during implementation. Stage each task's intended tree and commit normally; the tracked hook owns the complete local gate. Do not run the complete `ci --check` immediately before or after a successful hooked commit.
- A live paid smoke is bounded to non-sensitive material and performed only after deterministic tests pass; do not silently spend against the key during planning.

## Review Focus

- A Markdown `##` inside a fenced code block is prose, not a beat boundary: Task 1 tests it.
- A reader who stops satisfied is not counted as lost interest, and terminal readers receive no later call: Task 3 tests both.
- No earlier decision sees a later section, including in paired A/B runs: Task 3 tests exact outbound states.
- A 429, malformed answer, missing usage cost, or exhausted budget cannot trigger an unbounded or unreported paid run: Task 2 tests these paths.
- The key and full draft do not appear in report output or command errors: Tasks 2 and 3 test this boundary.

---

### Task 1: Parse article beats and validate reader intents

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/scripts/reader_panel_source.py`
- Create: `.agents/skills/writing-portfolio-articles/assets/reader-intents.json`
- Create: `.agents/skills/writing-portfolio-articles/tests/test_reader_panel_source.py`

**Interfaces:**

- Produces `ReaderProfile(id: str, arrival_intent: str, background: str, desired_payoff: str)` and `Beat(index: int, heading: str, visible_prefix: str)` immutable records.
- Produces `load_profiles(path: Path, selected_ids: tuple[str, ...] | None) -> tuple[ReaderProfile, ...]` and `parse_article(path: Path) -> Article(title: str, promise: str, beats: tuple[Beat, ...], sha256: str)`.
- The parser removes frontmatter, uses the Markdown title and frontmatter `summary` as the reader promise, makes text before the first level-two heading the opening beat, and ignores headings in fenced code. An article with no `##` still has one opening beat. Missing/empty title, promise, body, duplicate profile ID, or more than 100 profiles fails with a named source error. Do not silently truncate a long article.

- [x] **Step 1: Write synthetic fixture tests before implementation.** Cover frontmatter/title/opening, two `##` sections, fenced `##`, no-section article, malformed or empty source, profile ID selection and duplicates, and 101-profile refusal. Assert every `visible_prefix` contains only text through its own beat.
- [x] **Step 2: Run `py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p 'test_reader_panel_source.py' -v` and record the expected import/contract failure.**
- [x] **Step 3: Implement the parser and profile loader with standard-library types.** Use this record shape; implement the two functions named in **Interfaces** above:

```python
@dataclass(frozen=True)
class Beat:
    index: int
    heading: str
    visible_prefix: str
```

Author 10–12 distinct, purpose-based starter profiles (engineering peer, sceptical senior engineer, time-limited hiring reader, newcomer to the subject, maintainer, and other defensible arrival intents). Keep each profile short; do not assert demographic representativeness.
- [x] **Step 4: Run the focused source tests and inspect one live article's parsed beat labels in a read-only local invocation.** The live corpus is not a fixture or a golden expected output.
- [x] **Step 5: Commit the source/parser task through the tracked hook:** `git add .agents/skills/writing-portfolio-articles/scripts/reader_panel_source.py .agents/skills/writing-portfolio-articles/assets/reader-intents.json .agents/skills/writing-portfolio-articles/tests/test_reader_panel_source.py` then `git commit -m "feat: parse editorial reader panel inputs"`.

### Task 2: Add a bounded OpenRouter decision transport

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/scripts/reader_panel_decisions.py`
- Create: `.agents/skills/writing-portfolio-articles/tests/test_reader_panel_decisions.py`

**Interfaces:**

- Consumes Task 1's `ReaderProfile`, `Article`, and `Beat` records.
- Produces `Decision(choice: Literal["read_closely", "skim", "leave_lost_interest", "stop_satisfied"], probabilities: dict[str, float], cost_usd: float, input_tokens: int | None, model: str)` and `decide(profile, article, beat, *, api_key, transport) -> Decision`.
- `transport` is an injected JSON request callable for tests; the production implementation uses `urllib.request` and a fixed URL/model. Build one `choice` question with exact criteria for the four outcomes. State contains the profile, title/promise, and `beat.visible_prefix`; never a later beat.
- The transport validates HTTP status, model identity, answer type, allowed choice, finite probabilities and cost, and nonnegative usage. It retries HTTP 429 at most twice using a bounded `Retry-After` delay, and does not retry other 4xx or malformed responses. Exception text and logs must never contain the key or article body.

- [x] **Step 1: Write fake-transport tests for request shape, no future text, model/answer validation, missing cost, 429 retry bound, non-429 failure, and redacted errors.** No real key or network call is used.
- [x] **Step 2: Run `py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p 'test_reader_panel_decisions.py' -v` and record the expected failure.**
- [x] **Step 3: Implement `decide` and the production transport.** Keep the endpoint/model as module constants and parse `answers.attention` explicitly. Build an `Authorization: Bearer` header only inside the HTTP adapter; do not include the key in state, exceptions, report fields, or reprs.
- [x] **Step 4: Run the focused decision tests and inspect the actual constructed JSON from a fake call.** Compare the request shape against the spec's linked OpenRouter example; do not spend a live call in this task.
- [x] **Step 5: Commit the bounded transport:** `git add .agents/skills/writing-portfolio-articles/scripts/reader_panel_decisions.py .agents/skills/writing-portfolio-articles/tests/test_reader_panel_decisions.py` then `git commit -m "feat: add bounded Jev decision transport"`.

### Task 3: Orchestrate the panel and write an off-repo report

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/scripts/reader_panel.py`
- Create: `.agents/skills/writing-portfolio-articles/scripts/reader_panel_report.py`
- Create: `.agents/skills/writing-portfolio-articles/tests/test_reader_panel.py`
- Modify: `.agents/skills/writing-portfolio-articles/SKILL.md`

**Interfaces:**

- Consumes `parse_article`, `load_profiles`, and `decide` from Tasks 1–2.
- Produces `run_panel(articles: tuple[Article, ...], profiles: tuple[ReaderProfile, ...], *, decide_fn, max_calls: int, max_usd: float) -> PanelReport` and `render_panel(report: PanelReport) -> str`. `PanelReport` contains only article hashes/paths, section indices/headings, profile IDs, choices/probabilities, usage totals and limitations; it contains no copied article body or key.
- CLI: `py -3 .agents/skills/writing-portfolio-articles/scripts/reader_panel.py --article <path> [--compare <path>] [--profile-file <path>] [--profiles <comma-separated-ids>] --max-calls <N> --max-usd <USD> --check|--apply`. `--check` is the default; `--apply` requires both limits and `OPENROUTER_API_KEY`. Reject source outside the repository's public-article Markdown owner unless the user explicitly passes `--allow-external-source`; never follow an untrusted URL.
- Resolve report destination beneath the repo's canonical `../_agent-scratch/portfolio/<branch>/` workspace using the main-checkout/worktree relationship; allow an explicit absolute `--output` only when it also resolves outside every registered repository worktree. Check mode prints a dry-run plan and does not create directories.

- [x] **Step 1: Write synthetic orchestration/CLI tests.** Cover check-mode zero network/key access, missing key/limits before any call, exact active-profile call sequence, `leave_lost_interest`/`stop_satisfied` terminal behaviour, `skim` continuation, same-profile A/B inputs, unequal-beat A/B non-alignment, 100-profile dry run, estimated-budget preflight, actual-cost stop, safe off-repo output, and no secret/full-draft report content.
- [x] **Step 2: Run `py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p 'test_reader_panel.py' -v` and record the expected failure.**
- [x] **Step 3: Implement serial orchestration and the two CLI modes.** Estimate cost from planned UTF-8 payload size only as an approximation; report it as such. Before each paid call, refuse when projected cost exceeds the remaining estimated budget. After each response, add `usage.cost`; stop if actual cumulative cost reaches or exceeds the cap. A dedicated key limit, not this estimate, is the hard financial backstop. For A/B, run the same profiles and question wording against each draft; present both trajectories without an automatic winner.
- [x] **Step 4: Document the opt-in command in the skill as an experimental diagnostic.** State the remote-data transfer, simulated-not-human status, and no publication authority. Do not make it a required writing-playbook phase or alter doctrine.
- [x] **Step 5: Run focused tests, `py -3 tools/run.py mesh --check`, and the CLI check mode on a current article with `--max-calls 120 --max-usd 0.10`.** Inspect its beat count, payload estimate, source custody, and zero-call behaviour without pinning the article in tests.
- [x] **Step 6: Commit the orchestration/report/skill changes through the tracked hook:** stage the four Task 3 files and `git commit -m "feat: add opt-in editorial reader panel"`.

### Task 4: Prove the live endpoint and judge editorial utility

**Files:**

- Modify only if a material outcome warrants it: `.agents/docs/article-writing-field-notes.md`
- Modify only for a demonstrated defect: the Task 1–3 files and their tests
- Modify at completion: this plan and its spec, following `completing-planning-artifacts`

**Interfaces:**

- Consumes the committed CLI and current article corpus; produces a bounded, non-committed scratch report and a human-readable pilot handoff.
- No publication or skill/playbook promotion follows automatically from a successful API call or a simulated-reader consensus.

- [x] **Step 1: With `OPENROUTER_API_KEY` present, run one non-sensitive live smoke call using `--apply`, one selected profile and a one-beat excerpt in off-repo scratch, with `--allow-external-source --max-calls 1 --max-usd 0.01`.** Verify response type, model, usage and reported cost. If auth, endpoint, schema or provider access fails, stop and report the observed failure; do not change models or bypass the budget.
- [ ] **Step 2: Run a bounded pilot with 8–12 profiles on a current article and a temporary degraded variant in off-repo scratch.** Preflight with `--check`; cap total calls and spend explicitly. Do not commit the article or panel results as fixtures. Ask Harley whether the flagged beats reveal useful friction and whether the tool punishes a deliberate slow build or satisfied ending.
- [ ] **Step 3: Fix only demonstrated tool defects using focused synthetic tests and the normal hooked commit.** Record a field note only when a material editorial lesson, correction, abstention or overcorrection meets the existing field-learning threshold; an ordinary smoke result is not a lesson.
- [ ] **Step 4: Report the pilot evidence to Harley and obtain his editorial judgement before completing this plan.** If that judgement is pending, stop with the plan in-flight and the PR explicitly incomplete. Promote any enduring operating rule only with Harley's editorial approval; then mark the plan/spec `completed-awaiting-retirement`, regenerate the mesh, and commit through the hook. Keep human-owned decisions about regular adoption, PR Ready state and merge out of unchecked plan work.
- [ ] **Step 5: Request a fresh whole-branch review and prepare a draft PR under `.agents/runbooks/pr.md`.** Verify the exact pushed head and hosted checks, report the pilot evidence and limitations, and leave the PR Draft pending Harley's judgement.

## Handoff boundary

Pilot checkpoint (2026-09-23): the one-call synthetic smoke returned a typed choice from `typesafe/jev-1.13-20260917`, 560 input tokens and $0.00002352 reported cost. A matched seven-beat A/B pilot used ten profiles and 128 wire calls at $0.00723164 reported cost. Replacing only the "What it makes possible" section of a current article with generic filler changed that beat from eight `read_closely` and one `skim` decisions among continuing profiles to nine `skim` decisions. The panel did not decide a winner. Scratch reports and the temporary variant remain off-repo; Harley's editorial judgement is pending.

This plan authorises implementation of an opt-in experiment after Harley approves execution. It does not authorise automatic use on every article, a 100-profile production claim, public-site changes, autonomous editorial revisions, or permanent human-retention thresholds. If the live pilot produces an inconclusive or negative editorial outcome, keep the tool experimental and report that result rather than promoting it to the normal writing workflow.
