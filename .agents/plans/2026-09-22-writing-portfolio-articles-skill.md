# Writing Portfolio Articles Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** approved and ready for execution

**Goal:** Build and register `/writing-portfolio-articles` as a repo-owned editorial skill with deterministic audit contracts, human-assessed field use and an explicit learning loop.

**Architecture:** Keep `SKILL.md` as a compact router into focused editorial references. Use a standard-library Python audit only for facts software can establish reliably. Exercise editorial judgement on live work, with Harley deciding whether the skill improved it. Store durable candidate lessons in a non-binding field-notes document; promote them only after recurrence or explicit editorial decision.

**Tech Stack:** Markdown Agent Skill, Python 3 standard library, `unittest`, repository skill refresh and mesh tooling.

**Spec:** `.agents/specs/2026-09-22-article-writing-system-design.md`

**Execution Strategy:** `executing-plans` inline. The skill, references, audit and learning loop are tightly coupled, and editorial evaluation requires direct conversation with Harley rather than delegated pass/fail scoring.

## Global Constraints

- The doctrine and playbook on `main` are the current editorial authorities.
- The canonical skill path and name are `.agents/skills/writing-portfolio-articles/` and `writing-portfolio-articles`.
- Exact-name declaration in `.agents/plugins/marketplace.json` establishes local first-party custody; no prefix is required.
- Invoke `writing-skills` and understand `test-driven-development` before implementation. Apply TDD to deterministic software contracts, not subjective editorial outcomes.
- `SKILL.md` is a compact router; detailed method belongs in focused references.
- The article corpus is live editorial material. Do not pin it as a fixture, snapshot, golden rewrite, benchmark or permanent article-specific trial.
- Corpus analysis is observational. It must not assert AI authorship, score prose quality, rewrite prose, ban a phrase solely by frequency or retain an imitation corpus.
- Objective policy breaches may fail. Contextual `shit` and `piss`, non-language 12A concerns and prose quality remain editorial judgements.
- Deterministic tests live under the skill's `tests/` directory and remain outside ordinary behavioural invocation.
- Temporary before-and-after editorial work belongs in branch-scoped external scratch, never as tracked test evidence.
- Generated skill provenance and indexes are updated only through their owning commands.
- Use focused tests while iterating; the tracked commit hook owns the complete local gate.

## Review Focus

- **Mechanical judgement:** software treats recurrence, sentence length or a heuristic as a prose failure. Covered by Tasks 2 and 3.
- **Frozen corpus or self-imitation:** tests depend on current article wording or the skill retains a reusable voice model. Prohibited by Tasks 1, 4 and 5.
- **Unreviewed learning:** one outcome silently becomes skill or doctrine. Prevented by Task 1's promotion ladder.
- **Incomplete public-source inventory:** a new public custody class escapes the 12A scan. Covered by Task 2's discovery contract.
- **Performative verification or skill bloat:** editorial quality becomes a score, or the router duplicates its authorities. Covered by Tasks 4 and 5.

---

### Task 1: Establish the Skill Scaffold and Field-Learning Contract

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/SKILL.md`
- Create: `.agents/docs/article-writing-field-notes.md`
- Modify: `.agents/plugins/marketplace.json`
- Generated: `.agents/skills/.provenance.json`
- Generated: affected `INDEX.md` files

**Interfaces:**

- Consumes: `.agents/doctrine/writing-policy.md`, `.agents/playbooks/article-writing.md` and the approved self-improvement model in the spec.
- Produces: canonical local skill custody and a non-binding learning log that later skill work can consult without turning observations into policy.

- [ ] **Step 1: Scaffold the local skill**

Use the installed `writing-skills` scaffolder with exact name `writing-portfolio-articles`, local custody and the first-party lane. Inspect the result before editing. Do not edit marketplace-derived source.

- [ ] **Step 2: Declare local custody and refresh projections**

Add `writing-portfolio-articles` to `repo.local_skills` in `.agents/plugins/marketplace.json`, then run:

```powershell
py -3 tools/run.py refresh-skills --apply
py -3 tools/run.py refresh-skills --check
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
```

Expected: the local scaffold remains intact, provenance records first-party local custody, and the mesh discovers it. Do not add it to the article-writing playbook yet.

- [ ] **Step 3: Create the field-notes document**

Create `.agents/docs/article-writing-field-notes.md` with:

- a statement that it is an evidence log, not doctrine or an instruction source by itself;
- a candidate index near the top with `Candidate`, `Evidence`, `Status` and `Likely owner`;
- an entry template containing article or PR, editorial stage, observation, outcome, human correction, scope, candidate owner and promotion evidence;
- statuses `observed`, `candidate`, `promoted`, `rejected` and `superseded`;
- a rule to record only meaningful corrections, rejections, mixed outcomes, missed issues, surprising successes, useful abstentions, new forms, conflicts or overcorrections;
- no arbitrary time, count or file-size trigger for consolidation.

- [ ] **Step 4: Encode the promotion ladder**

State the durable loop:

```text
field use
→ human correction or observed success
→ candidate lesson
→ classify the likely owner
→ reproduce against current live work when useful
→ update the smallest authority
→ recheck affected work
```

One occurrence is recorded, not promoted. Recurrence across materially different work may justify a focused review. A clear conflict with existing authority requires repairing the skill and affected work. Doctrine changes only by Harley's explicit editorial decision. The skill never rewrites itself autonomously.

- [ ] **Step 5: Commit the scaffold and learning contract**

```powershell
git add .agents/plugins/marketplace.json .agents/skills .agents/docs .agents/INDEX.md
git commit -m "chore: scaffold article writing skill"
```

Expected: the tracked hook passes and the field-notes document is clearly non-binding.

### Task 2: Specify the Deterministic Audit Contract with Failing Tests

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/tests/test_audit_article_corpus.py`
- Create: `.agents/skills/writing-portfolio-articles/tests/fixtures/corpus/`
- Create: `.agents/skills/writing-portfolio-articles/tests/fixtures/public-copy/`
- Create later: `.agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py`

**Interfaces:**

- Consumes: public-content custody discovered from the live repository.
- Produces: tested functions `discover_public_sources(root: Path) -> tuple[Path, ...]`, `audit_articles(root: Path, thresholds: AuditThresholds) -> CorpusReport`, `audit_public_language(root: Path) -> LanguageReport`, and `main(argv: Sequence[str] | None = None) -> int`.

- [ ] **Step 1: Define synthetic fixture contracts**

Create minimal invented fixtures that exercise parser and policy mechanics without copying or pinning published articles:

- Markdown with frontmatter, headings, links, varied paragraphs and declared reading time;
- a repeated exact phrase and one-sentence paragraph;
- public non-article copy containing a prohibited term;
- two public sources containing `fuck`;
- contextual `shit` and `piss` examples;
- ignored generated, dependency, test and `.agents/` copies containing sentinel language.

- [ ] **Step 2: Write failing parsing and stable-output tests**

Assert that frontmatter is excluded from prose counts while declared reading time is captured; ordering is stable by POSIX path and location; headings, one-sentence paragraphs, exact repeated phrases, links and word-count/reading-time observations are reported; facts and heuristics are distinguished; and findings carry locations and context.

- [ ] **Step 3: Write failing language-policy tests**

Assert that more than one public `fuck` and each prohibited term produce objective breaches; word-boundary handling avoids substring false positives and covers agreed inflections; `shit` and `piss` produce contextual findings; excluded sources do not affect counts; and no API offers AI probability, authorship classification, rewrite output or a composite quality score.

- [ ] **Step 4: Write the source-set completeness test**

Keep supported public source roots and route-owned patterns in one explicit data structure. Test custody classes and discovery roots, not individual articles, so new material in an existing class is included automatically and a new unclassified public content owner fails visibly.

- [ ] **Step 5: Run and record the focused RED**

```powershell
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
```

Expected: FAIL because the audit implementation does not exist.

- [ ] **Step 6: Preserve the RED evidence without committing failure**

Record the failing command and relevant failure output in the execution commentary or plan-scoped external scratch, then continue directly to Task 3. Do not commit a deliberately failing repository state.

### Task 3: Implement the Observational Audit

**Files:**

- Create: `.agents/skills/writing-portfolio-articles/scripts/__init__.py`
- Create: `.agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py`
- Modify: `.agents/skills/writing-portfolio-articles/tests/test_audit_article_corpus.py` only when a test is proven to encode the wrong contract.

**Interfaces:**

- Consumes: Task 2's fixtures and function signatures.
- Produces: standard-library-only report types and a CLI implementing the deterministic observation contract.

- [ ] **Step 1: Implement report types and discovery**

Define immutable threshold, finding, article-observation, corpus-report and language-report dataclasses. Keep source roots, exclusions and thresholds explicit and inspectable.

- [ ] **Step 2: Implement article observations**

Parse Markdown without another dependency. Report source facts: word count, declared reading time, headings, paragraph and sentence-length distributions, one-sentence paragraphs, links and exact repeated phrases. Label a heuristic explicitly only when its approximation is explainable; otherwise omit it.

- [ ] **Step 3: Implement whole-site language inventory**

Scan explicit public-copy custody classes with case-insensitive word-boundary matching. Exit non-zero only for objective breaches. Print contextual findings for `shit` and `piss`; leave non-language 12A review to editorial workflow.

- [ ] **Step 4: Implement CLI modes**

Support `--articles <root>`, `--public-language <root>`, `--format text|json` and `--check`. Check mode returns non-zero only for objective breaches or an incomplete or invalid source-set contract. Help text explains custody, thresholds and the observational boundary.

- [ ] **Step 5: Make the deterministic suite GREEN**

```powershell
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
```

Expected: PASS.

- [ ] **Step 6: Run the audit against the live repository**

```powershell
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --articles src/client/src/data/content/writing --format text
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --public-language . --check --format text
```

Expected: observations rather than verdicts; failure only for an objective breach or source-contract problem.

- [ ] **Step 7: Commit the audit**

```powershell
git add .agents/skills/writing-portfolio-articles/scripts .agents/skills/writing-portfolio-articles/tests
git commit -m "feat: add observational article audit"
```

Expected: the commit contains the contract tests and their passing implementation; the tracked hook passes.

### Task 4: Author the Editorial Method

**Files:**

- Modify: `.agents/skills/writing-portfolio-articles/SKILL.md`
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
- Create: `.agents/skills/writing-portfolio-articles/references/field-learning.md`

**Interfaces:**

- Consumes: canonical doctrine, playbook, audit CLI and field-learning contract.
- Produces: a discoverable progressive-disclosure editorial method without duplicating repository law.

- [ ] **Step 1: Author the compact router**

Use frontmatter name `writing-portfolio-articles`. The description begins `Use when...` and covers drafting, developmental editing, line editing, corpus-fatigue review and final review.

The router must require doctrine, route mechanics to the playbook, select references by editorial stage, establish centre and form before line editing, keep corpus observations advisory and task-local, require rendered review before publication claims, distinguish editing from publication authority, expose the audit CLI, route material outcomes into the learning procedure, and forbid autonomous self-revision or doctrine promotion.

- [ ] **Step 2: Write references by single responsibility**

Implement the responsibilities from the spec. Each reference contains the decisions and checks for that stage, a strong example where useful, and links to doctrine rather than copied policy.

The sentence-and-rhythm reference must preserve:

```text
Sometimes, shoot the hostage. In Speed, Jack Traven's answer to a gunman using a hostage as leverage is to shoot the hostage. Problem changed.
```

Contrast it with a genuinely false sentence boundary and explain effect rather than punctuation count.

- [ ] **Step 3: Write the field-learning procedure**

`field-learning.md` owns when and how to consult or add to `.agents/docs/article-writing-field-notes.md`, how to classify likely ownership, and how to return unresolved taste or authority decisions to Harley. It discourages routine invocation logging and forbids autonomous self-modification.

- [ ] **Step 4: Check routing, size and duplication**

```powershell
$words = (Get-Content .agents/skills/writing-portfolio-articles/SKILL.md -Raw) -split '\s+' | Where-Object { $_ }
$words.Count
rg -n "writing-policy|article-writing|audit_article_corpus|article-writing-field-notes|field-learning" .agents/skills/writing-portfolio-articles/SKILL.md
rg -n "BBFC|at most one.*fuck|explicit.*decision" .agents/skills/writing-portfolio-articles/SKILL.md
```

Expected: all routes exist without duplicating detailed policy or method.

- [ ] **Step 5: Commit the method**

```powershell
git add .agents/skills/writing-portfolio-articles .agents/docs/article-writing-field-notes.md
git commit -m "feat: add portfolio article writing method"
```

### Task 5: Exercise the Skill on Current Live Work

**Files:**

- Read: current public articles selected at execution time
- Write temporarily: plan-scoped external scratch only
- Modify when justified: `.agents/skills/writing-portfolio-articles/SKILL.md`
- Modify when justified: `.agents/skills/writing-portfolio-articles/references/*.md`
- Modify when justified: `.agents/docs/article-writing-field-notes.md`

**Interfaces:**

- Consumes: the current skill and current live editorial material.
- Produces: Harley's categorical assessment of aggregate usefulness and only durable refinements justified by use.

- [ ] **Step 1: Select deliberately different live articles**

Choose at least three current articles with materially different editorial demands, plus one opportunity where abstention may be correct. Selection happens at execution time because the corpus is fluid. Record paths and the current commit in external scratch for that run only; create no tracked fixtures or permanent trial cards.

- [ ] **Step 2: Apply the skill without editing published source**

For each selection, create a temporary diagnosis and candidate revision in plan-scoped external scratch. Assess the whole article before local sentences. Preserve supplied language, evidence boundaries and deliberate formal choices. Do not commit candidate article rewrites as verification artefacts.

- [ ] **Step 3: Ask Harley for categorical editorial judgement**

Present original context, diagnosis, candidate changes, preservation risks and abstentions. Harley classifies each result as `improved`, `improved with damage`, `changed but not improved`, `worse` or `appropriately abstained`.

Discuss proposition, movement, evidence, authorship and voice, rhythm, preservation of the strongest choices, and publication preference. These are prompts for judgement, not numeric scoring dimensions.

- [ ] **Step 4: Repair demonstrated problems at the smallest authority**

Classify each correction as an audit bug, missing skill method, playbook or doctrine conflict needing human authority, article-specific judgement that should not generalise, or candidate lesson needing more evidence. Update only the smallest justified authority, rerun affected deterministic tests, and repeat only the affected live exercise. Do not invent rules merely to force `improved` results.

- [ ] **Step 5: Apply the initial-use gate**

Before registration and publication, require:

- all deterministic audit contracts pass;
- Harley judges at least three materially different full-article exercises `improved`;
- no accepted exercise carries unacceptable preservation damage;
- at least one `appropriately abstained` result;
- Harley judges the aggregate influence worth using again.

If the gate does not pass, stop with the evidence and unresolved judgement. Do not substitute a score or weaken the gate after seeing results.

- [ ] **Step 6: Record only material learning**

Add field notes only for outcomes meeting Task 1's recording rule. Keep single observations as observations or candidates, not policy. Leave bulky comparisons and discarded candidates in external scratch.

- [ ] **Step 7: Commit justified refinements when present**

```powershell
git add .agents/skills/writing-portfolio-articles .agents/docs/article-writing-field-notes.md
git commit -m "refactor: refine article writing skill from field use"
```

If field use justifies no tracked changes, do not create an empty commit. Otherwise expect only demonstrated method improvements and material learning, with no corpus snapshots or article-specific test artefacts.

### Task 6: Activate, Refresh and Publish the Local Skill

**Files:**

- Modify: `.agents/playbooks/article-writing.md`
- Generated: `.agents/skills/.provenance.json`
- Generated: affected `INDEX.md` files
- Modify: both article-writing plans and the approved spec when marking them complete

**Interfaces:**

- Consumes: a locally proved skill that passed the initial-use gate.
- Produces: active playbook routing, refreshed proof and completion-marked planning artifacts.

- [ ] **Step 1: Activate the route**

Confirm `writing-portfolio-articles` remains declared in `repo.local_skills`, then add `/writing-portfolio-articles` to the playbook's required skills for detailed editorial work.

- [ ] **Step 2: Refresh skill projections and prove preservation**

```powershell
py -3 tools/run.py refresh-skills --apply
py -3 tools/run.py refresh-skills --check
```

Expected: both pass; the local skill remains intact; provenance records local first-party custody.

- [ ] **Step 3: Regenerate and validate the mesh**

```powershell
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
```

Expected: indexes discover the skill and field-notes document.

- [ ] **Step 4: Verify the complete contract**

```powershell
rg -n "writing-portfolio-articles" .agents/plugins/marketplace.json .agents/skills/.provenance.json .agents/skills/INDEX.md .agents/playbooks/article-writing.md
rg -n "article-writing-field-notes|field-learning" .agents/skills/writing-portfolio-articles .agents/docs/article-writing-field-notes.md
py -3 -m unittest discover -s .agents/skills/writing-portfolio-articles/tests -p "test_*.py" -v
py -3 .agents/skills/writing-portfolio-articles/scripts/audit_article_corpus.py --public-language . --check --format text
```

- [ ] **Step 5: Mark governed artifacts complete**

After implementation and review obligations are complete, invoke `completing-planning-artifacts` and mark both article-writing plans and the approved spec with the exact state `completed-awaiting-retirement`. Do not delete them in this PR.

- [ ] **Step 6: Commit through the complete local gate**

Stage the intended source and owned projections, then commit normally. The tracked hook is the complete local gate; fix every independent failure and do not repeat `ci --check` immediately after a successful hooked commit.

- [ ] **Step 7: Publish a draft PR and verify it**

Push the implementation branch, open a draft PR against `main`, attach it to the task, and verify the GitHub-visible head SHA and hosted check state. Do not carry forward a PR number or branch name from this planning slice.

## Handoff

This plan is ready for inline execution. Its proof is deliberately lean: deterministic software contracts receive automated tests; editorial judgement is exercised on current live work and decided by Harley; useful field lessons accumulate without freezing the corpus or allowing the skill to rewrite its own authority.
