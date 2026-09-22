# Writing Portfolio Articles Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** discussion draft; do not execute until the human owner approves the pressure-testing protocol in Task 1

**Goal:** Build and register `/writing-portfolio-articles` as a repo-owned editorial skill whose behaviour and audit tooling are demonstrated through RED-GREEN-REFACTOR pressure testing.

**Architecture:** Keep `SKILL.md` as a compact router into ten focused editorial references. Use a deterministic Python audit for observable corpus and whole-site language facts, while pressure scenarios test agent judgement that deterministic assertions cannot prove. Exact-name manifest registration establishes local custody; no naming prefix is required.

**Tech Stack:** Markdown Agent Skill, Python 3 standard library, `unittest`, fresh-context agent pressure scenarios, repository skill refresh and mesh tooling.

**Spec:** `.agents/specs/2026-09-22-article-writing-system-design.md`

**Execution Strategy:** `subagent-driven-development` — pressure baselines require fresh-context agents, while the audit script and skill references benefit from separate implementer and reviewer attention. Do not begin execution until the Task 1 protocol is approved.

## Global Constraints

- This plan runs after `.agents/plans/2026-09-22-article-writing-doctrine-and-playbook.md` has created the canonical doctrine and playbook.
- The canonical skill path and name are `.agents/skills/writing-portfolio-articles/` and `writing-portfolio-articles`.
- The skill is local first-party source declared by exact name in `.agents/plugins/marketplace.json`; prefixes are optional and irrelevant to custody.
- Invoke `writing-skills` and understand `test-driven-development` before authoring any skill text.
- No skill guidance may be written before the agreed RED baselines have been run and recorded.
- `SKILL.md` is a compact router; detailed method belongs in focused references.
- Corpus analysis is observational. It must not assert AI authorship, score prose quality, rewrite prose, ban a phrase solely by frequency or retain an imitation corpus.
- Objective policy breaches may fail; contextual `shit`/`piss` and non-language 12A concerns remain findings for editorial judgement.
- Tests live under the skill's own `tests/` directory and remain outside ordinary behavioural invocation.
- Generated skill provenance and indexes are updated only through their owning commands.
- Use focused tests while iterating; the tracked commit hook owns the complete local gate.

## Review Focus

- False RED: a control prompt already behaves correctly, so guidance is authored without demonstrated need. Covered by Task 1 control acceptance rule.
- Evaluator leakage: pressure prompts reveal the desired answer or score keywords instead of behaviour. Covered by Task 1 blind prompt/rubric separation.
- Mechanical voice enforcement: the audit treats recurrence or sentence length as failure. Covered by Task 3 unit tests.
- Incomplete public-source inventory: a new route source silently escapes the 12A scan. Covered by Task 3 source-set completeness test.
- Skill bloat: `SKILL.md` duplicates doctrine, playbook or all references. Covered by Task 4 word-count and routing checks.

---

### Task 1: Design the Pressure Tests with the Human Owner

**Files:**

- No pressure-test fixture path or evidence format is approved yet.
- Later tasks may create files under `.agents/skills/writing-portfolio-articles/tests/pressure/` only after this task is revised and approved.

**Interfaces:**

- Consumes: the eighteen required behaviours below and the RED-GREEN-REFACTOR contract in `writing-skills`.
- Produces: a later, human-approved amendment defining scenario boundaries, prompts, controls, rubrics, repetition, evidence custody and pass criteria.

The required behaviours to cover are:

1. A polished but centreless draft returns to proposition and form before sentence edits.
2. A technical article distinguishes demonstrated fact, recollection and inference.
3. A list article retains cumulative movement rather than becoming interchangeable answers.
4. A one-sentence paragraph is challenged but retained when it earns emphasis.
5. Adjacent sentences are joined when a full stop falsely separates one thought.
6. Short sentences and a fragment survive when they create natural cadence and meaning.
7. A long sentence is divided when conjunction obscures the thought.
8. A familiar corpus phrase is reported as a possible habit, not automatically banned.
9. Generic AI-fatigue language returns to evidence and judgement rather than synonym replacement.
10. A request to imitate the corpus mechanically is refused in favour of current-task authorship.
11. An earned swear survives when the whole-site work remains plausibly 12A.
12. A second site-wide `fuck` is identified as an objective house-policy breach.
13. Prohibited language in non-article public copy is detected.
14. Contextual `shit` or `piss` is surfaced for editorial judgement rather than rejected by an invented quota.
15. Potentially relevant non-language 12A content enters the review.
16. The audit refuses an AI probability or prose-quality score.
17. A new public content source omitted from the inventory is caught.
18. Content volume, reading time and hypothetical journeys do not change the classification unit without Harley's explicit decision.

- [ ] **Step 1: Stop before designing fixtures**

Do not group behaviours, choose scenario prose, set run counts, define controls, choose a scoring rubric, decide evidence retention or run a RED baseline in this version of the plan.

- [ ] **Step 2: Discuss the pressure-test design with the human owner**

The discussion must settle, at minimum:

- which behaviours belong together and which require isolated scenarios;
- what realistic pressures each scenario applies;
- what the no-skill control receives;
- what counts as observable RED and GREEN;
- whether and how many repeated fresh-context runs are needed;
- how blind evaluation avoids prompt leakage;
- what evidence belongs in Git and what, if anything, belongs in governed scratch;
- which behaviours are agent-judgement pressure tests versus deterministic audit unit tests.

- [ ] **Step 3: Amend this plan with the approved protocol**

Only after discussion, replace this task with exact files, prompts, commands, expected RED evidence and GREEN criteria. The amended sequence must run and record RED before scaffolding `SKILL.md`; it may scaffold the local skill directory immediately after RED so later audit tests have their final custody. Re-run the plan-readiness gate before execution.

- [ ] **Step 4: Keep authoring blocked until approval**

Tasks 4-6 must not execute until the amended Task 1 has produced genuine RED evidence under the approved protocol.

### Task 2: Specify the Deterministic Audit Contract with Failing Tests

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/tests/test_audit_article_corpus.py`
- Create: `.agents/skills/writing-portfolio-articles/tests/fixtures/corpus/`
- Create: `.agents/skills/writing-portfolio-articles/tests/fixtures/public-copy/`
- Create later: `.agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py`

**Interfaces:**

- Consumes: public-content custody in `src/client/src/data/content/` and route-owned public copy sources discovered from the live repository.
- Produces: tested functions `discover_public_sources(root: Path) -> tuple[Path, ...]`, `audit_articles(root: Path, thresholds: AuditThresholds) -> CorpusReport`, `audit_public_language(root: Path) -> LanguageReport`, and `main(argv: Sequence[str] | None = None) -> int`.

- [ ] **Step 1: Define fixture contracts and public-source expectations**

Create minimal fixtures containing:

- two articles with frontmatter, headings, links, a repeated exact phrase, varied paragraphs and declared reading times;
- public non-article copy containing a prohibited term;
- a second public source containing a second `fuck`;
- contextual `shit` and `piss` examples;
- ignored generated, dependency, test and `.agents/` copies containing sentinel language.

- [ ] **Step 2: Write failing parsing and stable-output tests**

Tests must assert:

- frontmatter is excluded from prose sentence/paragraph counts but its reading time is captured;
- article ordering and finding ordering are stable by POSIX path then location;
- headings, one-sentence paragraphs, repeated phrases, link counts and word-count/reading-time observations are reported;
- exact counts and heuristic observations are distinguishable in the report model;
- local context and source locations accompany findings.

- [ ] **Step 3: Write failing language-policy tests**

Tests must assert:

- more than one public `fuck` yields a failing objective breach;
- `cunt`, `twat` or `cock` in public copy yields a failing objective breach;
- ordinary inflections are matched on word boundaries rather than substrings;
- `shit` and `piss` yield non-failing contextual findings;
- ignored private/generated/test sources do not affect public counts;
- no API offers AI probability, authorship classification, rewrite output or composite quality score.

- [ ] **Step 4: Write the source-set completeness RED test**

Encode the currently supported public source roots and route-owned source patterns in one explicit data structure. The test must compare discovered supported source classes with the live repository contract and fail when an unclassified public content owner appears.

Do not hard-code a list of every article file; test custody classes and discovery roots so new content inside a known class is included automatically.

- [ ] **Step 5: Run the RED suite**

Run:

```powershell
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
```

Expected: FAIL because `scripts.audit_article_corpus` and its types do not exist.

- [ ] **Step 6: Commit the deterministic RED tests**

```powershell
git add .agents/skills/writing-portfolio-articles/tests
git commit -m "test: define article corpus audit contract"
```

Expected: the tracked hook passes repository checks while the focused new test remains intentionally RED and is not yet part of the production gate.

### Task 3: Implement the Observational Audit

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/scripts/__init__.py`
- Create: `.agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py`
- Modify: `.agents/skills/writing-portfolio-articles/tests/test_audit_article_corpus.py` only when a test is proven to encode the wrong agreed contract, never merely to make implementation pass.

**Interfaces:**

- Consumes: the fixtures and function signatures from Task 2.
- Produces: standard-library-only dataclasses and CLI implementing the deterministic observation contract.

- [ ] **Step 1: Implement report types and discovery**

Define immutable dataclasses:

```python
@dataclass(frozen=True)
class AuditThresholds:
    repeated_phrase_words: int = 5

@dataclass(frozen=True)
class Finding:
    kind: str
    path: str
    line: int
    context: str
    severity: Literal["observation", "contextual-review", "objective-breach"]

@dataclass(frozen=True)
class CorpusReport:
    articles: tuple[ArticleObservation, ...]
    findings: tuple[Finding, ...]

@dataclass(frozen=True)
class LanguageReport:
    occurrences: tuple[Finding, ...]
    objective_breaches: tuple[Finding, ...]
```

Keep source roots and exclusions explicit and inspectable.

- [ ] **Step 2: Implement article observations**

Parse Markdown without adding a dependency. Report deterministic facts available from source text: word count, declared reading time, headings, paragraph/sentence-length distributions, one-sentence paragraphs, links, repeated exact phrases and repeated opening/closing constructions. Label metaphor/story/phrase-family candidates as heuristic observations only when a deterministic approximation is explainable; otherwise omit them rather than fabricate semantic certainty.

- [ ] **Step 3: Implement whole-site language inventory**

Scan explicit public-copy custody classes, applying case-insensitive word-boundary matching and common inflections. Exit non-zero only for objective breaches. Print contextual findings for `shit`/`piss` and leave non-language 12A review to the human/skill workflow.

- [ ] **Step 4: Implement CLI modes**

Support:

```text
--articles <root>
--public-language <root>
--format text|json
--check
```

`--check` returns non-zero only for objective contract breaches or an incomplete/invalid source-set contract. `--help` documents thresholds, source custody and the observational boundary.

- [ ] **Step 5: Make deterministic tests GREEN**

Run:

```powershell
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
```

Expected: PASS.

- [ ] **Step 6: Audit the live repository**

Run:

```powershell
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --articles src/client/src/data/content/writing --format text
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --public-language . --check --format text
```

Expected: both commands complete; observations are inspectable; exit status reflects only objective breaches/source-contract failures.

- [ ] **Step 7: Commit the GREEN audit**

```powershell
git add .agents/skills/writing-portfolio-articles/scripts .agents/skills/writing-portfolio-articles/tests
git commit -m "feat: add observational article corpus audit"
```

Expected: the tracked hook passes.

### Task 4: Author the Minimal Skill and Focused References

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/SKILL.md`
- Create: `.agents/skills/writing-portfolio-articles/references/article-forms.md`
- Create: `.agents/skills/writing-portfolio-articles/references/editorial-brief.md`
- Create: `.agents/skills/writing-portfolio-articles/references/developmental-edit.md`
- Create: `.agents/skills/writing-portfolio-articles/references/evidence-and-claims.md`
- Create: `.agents/skills/writing-portfolio-articles/references/structure-and-movement.md`
- Create: `.agents/skills/writing-portfolio-articles/references/openings-and-endings.md`
- Create: `.agents/skills/writing-portfolio-articles/references/paragraphs-sentences-and-rhythm.md`
- Create: `.agents/skills/writing-portfolio-articles/references/authored-voice.md`
- Create: `.agents/skills/writing-portfolio-articles/references/corpus-fatigue.md`
- Create: `.agents/skills/writing-portfolio-articles/references/final-review.md`

**Interfaces:**

- Consumes: RED rationalisations from Task 1, canonical `.agents/doctrine/writing-policy.md`, repository `.agents/playbooks/article-writing.md`, and the audit CLI from Task 3.
- Produces: a discoverable, progressive-disclosure editorial capability that addresses demonstrated failures without duplicating repository law.

- [ ] **Step 1: Verify post-RED local scaffolding**

Confirm the amended Task 1 used the installed writing-skills scaffolder after RED with exact local name, `--custody local` and the first-party lane. Inspect the generated files. If no scaffold exists, stop: do not retroactively blur the RED boundary by inventing a different sequence here.

- [ ] **Step 2: Author compact frontmatter and router**

Use frontmatter name `writing-portfolio-articles`. The description starts with `Use when...` and names drafting, developmental editing, line editing, corpus-fatigue review and final review of Portfolio public articles.

`SKILL.md` must:

- require the writing doctrine;
- route repository mechanics to the article-writing playbook;
- choose references by the current editorial stage;
- establish centre and form before line editing;
- preserve corpus observations as advisory;
- require rendered review before publication claims;
- distinguish editing authority from publication authority;
- expose the audit script through interpreter-based commands;
- address only failures observed in RED or explicit structural/retrieval requirements.

- [ ] **Step 3: Write references by single responsibility**

Implement the ten reference responsibilities verbatim from the spec. Each reference should contain the decisions and checks needed at that stage, one strong example where useful, and links back to doctrine rather than copied policy.

The `paragraphs-sentences-and-rhythm.md` example must preserve:

```text
Sometimes, shoot the hostage. In Speed, Jack Traven's answer to a gunman using a hostage as leverage is to shoot the hostage. Problem changed.
```

It must contrast that with a genuinely false sentence boundary and explain effect rather than count punctuation.

- [ ] **Step 4: Check size, links and forbidden duplication**

Run:

```powershell
$words = (Get-Content .agents/skills/writing-portfolio-articles/SKILL.md -Raw) -split '\s+' | Where-Object { $_ }
$words.Count
rg -n "writing-policy|article-writing|audit_article_corpus" .agents/skills/writing-portfolio-articles/SKILL.md
rg -n "BBFC|at most one.*fuck|explicit.*decision" .agents/skills/writing-portfolio-articles/SKILL.md
```

Expected: `SKILL.md` is a compact router, contains all three routes, and does not duplicate the doctrine's detailed rating policy.

- [ ] **Step 5: Commit the minimal skill**

```powershell
git add .agents/skills/writing-portfolio-articles
git commit -m "feat: add portfolio article writing skill"
```

Expected: the tracked hook passes.

### Task 5: Execute the Approved GREEN and REFACTOR Protocol

**Files:**

- Modify: `.agents/skills/writing-portfolio-articles/SKILL.md`
- Modify: `.agents/skills/writing-portfolio-articles/references/*.md`
- Modify/Create: the exact pressure-test evidence files approved in the amended Task 1

**Interfaces:**

- Consumes: the approved pressure-test protocol and genuine RED evidence from amended Task 1 plus the authored skill from Task 4.
- Produces: evidence in the approved custody and the smallest wording refinements needed to close observed loopholes.

- [ ] **Step 1: Run the approved GREEN cases with the skill**

Execute the scenario, context-isolation, control and evaluation procedure exactly as approved in amended Task 1. Do not add hints or change the test material between RED and GREEN unless the approved design explicitly defines a controlled variant.

- [ ] **Step 2: Apply the approved wording-test procedure**

Use the approved repetition, comparison and evidence rules from amended Task 1. This plan does not pre-decide whether micro-tests are required or how many runs constitute evidence.

- [ ] **Step 3: Refactor only observed loopholes**

When a GREEN run fails, classify the failure before editing:

- discipline violation: add a prohibition, red flag or rationalisation counter;
- wrong output shape: add a positive recipe or contract;
- omitted element: add a required structural slot;
- conditional behaviour: key the instruction to an observable predicate.

Re-run the affected approved test. Do not add speculative rules.

- [ ] **Step 4: Require full GREEN**

Apply the approved GREEN criterion and evidence format from amended Task 1. Any unresolved failure blocks registration and deployment.

- [ ] **Step 5: Re-run deterministic tests**

Run:

```powershell
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
```

Expected: PASS.

- [ ] **Step 6: Commit verified skill refinements**

```powershell
git add .agents/skills/writing-portfolio-articles
git commit -m "test: verify article writing skill behaviour"
```

Expected: tracked pressure evidence and skill text agree; the hook passes.

### Task 6: Register, Refresh and Publish the Local Skill

**Files:**

- Modify: `.agents/plugins/marketplace.json`
- Modify: `.agents/playbooks/article-writing.md`
- Generated: `.agents/skills/.provenance.json`
- Generated: `.agents/skills/INDEX.md`
- Generated: other affected `INDEX.md` files selected by the mesh generator
- Modify: `.agents/plans/2026-09-22-article-writing-doctrine-and-playbook.md`
- Modify: `.agents/plans/2026-09-22-writing-portfolio-articles-skill.md`
- Modify: `.agents/specs/2026-09-22-article-writing-system-design.md`

**Interfaces:**

- Consumes: fully GREEN local skill source and the exact-name local custody contract.
- Produces: installed-skill provenance and mesh that preserve `writing-portfolio-articles`; completion-marked planning artifacts retained through the completing PR.

- [ ] **Step 1: Declare exact local custody**

Add `writing-portfolio-articles` to `repo.local_skills` in `.agents/plugins/marketplace.json`, preserving sorted order if the manifest's validator normalises it.

Add the now-valid `/writing-portfolio-articles` invocation to `.agents/playbooks/article-writing.md` for detailed editorial work, preserving the playbook's ownership of repository mechanics.

- [ ] **Step 2: Refresh skill projections and prove preservation**

Run:

```powershell
py -3 tools/run.py refresh-skills --apply
py -3 tools/run.py refresh-skills --check
```

Expected: both pass; `.agents/skills/writing-portfolio-articles/` remains intact; provenance identifies it as local first-party custody rather than marketplace-derived source.

- [ ] **Step 3: Regenerate and validate the mesh**

Run:

```powershell
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
```

Expected: both pass and generated indexes discover the skill.

- [ ] **Step 4: Verify the complete writing-system contract**

Run:

```powershell
rg -n "writing-portfolio-articles" .agents/plugins/marketplace.json .agents/skills/.provenance.json .agents/skills/INDEX.md .agents/playbooks/article-writing.md
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --public-language . --check --format text
```

Expected: registration, provenance, mesh and playbook agree; deterministic tests pass; language audit has no objective breach.

- [ ] **Step 5: Mark governed artifacts complete**

After all agent-owned implementation and review obligations are complete, invoke `completing-planning-artifacts` and change the status of both plans and the approved spec to the exact state `completed-awaiting-retirement`. Do not delete them in this PR.

- [ ] **Step 6: Commit through the complete local gate**

```powershell
git add .agents/plugins/marketplace.json .agents/playbooks/article-writing.md .agents/skills/writing-portfolio-articles .agents/skills/.provenance.json .agents/skills/INDEX.md .agents/plans/2026-09-22-article-writing-doctrine-and-playbook.md .agents/plans/2026-09-22-writing-portfolio-articles-skill.md .agents/specs/2026-09-22-article-writing-system-design.md .agents/INDEX.md
git commit -m "feat: register article writing skill"
```

Expected: the tracked hook applies owned projections and passes the complete check gate. Do not separately repeat `ci --check` after the successful commit.

- [ ] **Step 7: Push and verify the draft PR**

```powershell
git push origin codex/article-writing-foundation
gh pr view 72 --json url,isDraft,headRefOid,statusCheckRollup
```

Expected: PR #72 remains Draft, its head matches local `HEAD`, and hosted checks report their actual draft-aware state. Report the PR URL and full head SHA as publication proof.

## Discussion Gate

The eighteen required behaviours are inventoried in Task 1, but their pressure-test design is intentionally unresolved. The human discussion will decide scenario granularity, pressure construction, controls, repetition, blind evaluation, evidence custody, pass criteria and the boundary between behavioural pressure tests and deterministic unit tests.

After that discussion, amend Task 1 and any dependent steps, then run a fresh plan-readiness review. Until then this plan is suitable for design discussion only and must not be handed to an execution skill.
