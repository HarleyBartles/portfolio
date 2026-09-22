# Article Writing Doctrine and Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the Portfolio's canonical writing doctrine, repository article-writing workflow and accurate local-skill custody policy without implementing the article-writing skill itself.

**Architecture:** Promote durable editorial rules from the approved specification into one binding doctrine and compose them through one topical playbook. Keep the root router and contributor guidance concise, repair the two stale `port-*` naming claims, and regenerate navigation through the owning mesh command. This plan deliberately leaves skill source, registration, audit tooling and pressure tests to the companion skill plan.

**Tech Stack:** Markdown doctrine/playbooks, JSON local-skill manifest conventions, generated agent mesh, Python command bus.

**Spec:** `.agents/specs/2026-09-22-article-writing-system-design.md`

**Execution Strategy:** `executing-plans` — the policy migration, playbook composition and routing changes are tightly coupled and should be kept in one context so authority is not duplicated or stranded.

## Global Constraints

- `/writing-portfolio-articles` is the approved exact local skill name; no prefix is required for repo-local custody.
- This plan must not create `.agents/skills/writing-portfolio-articles/`, edit `repo.local_skills`, implement audit code or define pressure-test fixtures.
- `.agents/doctrine/writing-policy.md` becomes the sole detailed editorial authority; `.agents/doctrine/portfolio-design-policy.md` retains only cross-cutting presentation invariants and a pointer.
- The entire public site is one 12A-inspired work until Harley explicitly decides otherwise; no automatic duration, volume or journey trigger applies.
- The policy may enforce objective language edges but must preserve contextual editorial judgement and must not claim BBFC certification.
- Published work is corpus evidence, not a golden voice dataset.
- Generated `INDEX.md` files are changed only through `py -3 tools/run.py mesh --apply`.
- Use focused checks while iterating; the tracked commit hook owns the complete local gate.
- The companion skill plan depends on this plan's doctrine and playbook outputs and runs second in the same branch/PR.

## Review Focus

- Authority duplication: detailed voice or AI-fatigue rules remain in `portfolio-design-policy.md` after migration. Covered by Task 2 inspection and repository search.
- Naming drift: any binding policy still claims local skills require `port-*`. Covered by Task 1 repository search.
- Scope drift: the writing doctrine accidentally governs private engineering documentation. Covered by Task 2 scope review.
- Rating overclaim: policy language implies BBFC approval or numerically rejects contextual mild language. Covered by Task 2 phrase checks.
- Broken routing: the new doctrine/playbook is not discoverable from root or contributor entry points. Covered by Task 4 link and mesh checks.

---

### Task 1: Repair Local-Skill Custody Policy

**Files:**

- Modify: `.agents/doctrine/marketplace-custody-policy.md`
- Modify: `.agents/doctrine/mesh-policy.md`

**Interfaces:**

- Consumes: exact-name custody rules in `.agents/skills/writing-skills/references/local-and-marketplace-custody.md` and `.agents/skills/repo-shape/references/repository-shape-standard.md`.
- Produces: one consistent repository rule: entries in `repo.local_skills` establish local custody by exact name; prefixes are optional naming choices.

- [ ] **Step 1: Record the contradictory RED evidence**

Run:

```powershell
rg -n "port-\*|prefixes are optional|local_skills" .agents/doctrine/marketplace-custody-policy.md .agents/doctrine/mesh-policy.md .agents/skills/writing-skills/references/local-and-marketplace-custody.md .agents/skills/repo-shape/references/repository-shape-standard.md
```

Expected: the two Portfolio doctrine files identify `port-*` as the local lane while current generic authority says prefixes are optional and custody uses exact manifest entries.

- [ ] **Step 2: Correct marketplace custody doctrine**

Replace the `port-*` bullet in `marketplace-custody-policy.md` with this contract:

```markdown
- Repo-owned skills are tracked local source when their exact directory/frontmatter name is declared in `repo.local_skills`. A naming prefix is optional and does not establish custody. Refresh tooling must preserve declared local skills and must not overwrite or prune them.
```

- [ ] **Step 3: Correct mesh doctrine**

Replace the `.agents/skills/` lane description in `mesh-policy.md` so it says:

```markdown
- `.agents/skills/` contains two explicit lanes: exact names declared in `repo.local_skills` identify repository-owned tracked source, while other skill directories are marketplace-derived output described by `.provenance.json`.
```

- [ ] **Step 4: Verify the contradiction is gone**

Run:

```powershell
rg -n "port-\*" .agents/doctrine .agents/playbooks AGENTS.md CONTRIBUTING.md
```

Expected: no binding repository guidance requires `port-*` naming.

Run:

```powershell
py -3 tools/run.py repo-standards --check
```

Expected: PASS.

- [ ] **Step 5: Commit the policy repair**

```powershell
git add .agents/doctrine/marketplace-custody-policy.md .agents/doctrine/mesh-policy.md
git commit -m "docs: correct local skill custody naming"
```

Expected: the tracked hook passes and the commit contains only the two doctrine repairs plus hook-owned generated changes, if any.

### Task 2: Create the Canonical Writing Doctrine

**Files:**

- Create: `.agents/doctrine/writing-policy.md`
- Modify: `.agents/doctrine/portfolio-design-policy.md`

**Interfaces:**

- Consumes: the complete doctrine contract, corpus baseline, authority order and research links from `.agents/specs/2026-09-22-article-writing-system-design.md`.
- Produces: a binding `writing-policy.md` read by the playbook and future `/writing-portfolio-articles` skill; a reduced design policy that links to it without restating it.

- [ ] **Step 1: Capture the pre-migration duplication**

Run:

```powershell
rg -n "Human voice|Editorial voice|AI-tell|em dashes|rhetorical triplets" .agents/doctrine/portfolio-design-policy.md
```

Expected: detailed writing rules currently live in the design policy and no `writing-policy.md` exists.

- [ ] **Step 2: Create the doctrine header and authority boundary**

Create `writing-policy.md` with:

```markdown
# Portfolio Writing Policy

Status: active policy
Owner: Portfolio repository
Scope: public editorial writing, including articles, case-study prose, summaries, standfirsts, titles, headings, captions, alt text and public route copy
Authority: binding repository policy for authored public prose; truth, safety, privacy, accessibility, legal boundaries and explicit human intent outrank style
Routed from: `/AGENTS.md`
```

State explicitly that private engineering documents, commit messages and internal agent artifacts are outside the public-content rating scope.

- [ ] **Step 3: Implement the complete editorial contract**

Using the spec as the source, write focused sections for:

1. authority order and reader contract;
2. centre of gravity and form before template;
3. evidence and epistemic honesty;
4. authored voice and authorised voice traits;
5. openings, structure, sections and transitions;
6. paragraphs;
7. sentences and rhythm;
8. endings;
9. corpus distinctiveness and the recorded corpus baseline;
10. AI-fatigue policy;
11. anti-overcorrection and recovery checks;
12. the 12A-inspired whole-site house standard and its explicit human-owned classification boundary.

Copy all twelve research URLs from the spec into a `Research calibration` section. Say that external sources inform but do not own local policy.

- [ ] **Step 4: Preserve the rating boundary exactly**

Verify the doctrine states all of these:

```text
whole public site = one work today
at most one site-wide fuck
shit and piss = contextual findings, not fabricated numeric failures
cunt, twat and cock = prohibited public terms
all relevant BBFC 12A dimensions considered
no certification claim
no runtime journey tracking now
classification changes only through Harley's explicit editorial decision
```

Run:

```powershell
rg -n "one work|at most one|context|certif|explicit editorial decision|runtime" .agents/doctrine/writing-policy.md
```

Expected: every boundary is directly inspectable.

- [ ] **Step 5: Reduce the design policy without losing cross-cutting authority**

In `portfolio-design-policy.md`:

- retain the short `Human voice, edited rather than neutralised` design invariant;
- replace detailed `Editorial voice and AI-tell policy` material with a concise statement that authored public prose follows `writing-policy.md`;
- retain visual hierarchy, accessibility, layout, motion, imagery, privacy and performance policy;
- update the quality-review prose question to point to the writing policy rather than duplicating its mechanics.

- [ ] **Step 6: Prove one detailed authority remains**

Run:

```powershell
rg -n "synthetic profundity|repeated rhetorical triplets|site-wide.*fuck|explicit editorial decision" .agents/doctrine
```

Expected: detailed editorial rules occur in `writing-policy.md`, not in a second doctrine file.

Run:

```powershell
py -3 tools/run.py repo-standards --check
```

Expected: PASS.

- [ ] **Step 7: Commit the doctrine migration**

```powershell
git add .agents/doctrine/writing-policy.md .agents/doctrine/portfolio-design-policy.md
git commit -m "docs: establish portfolio writing doctrine"
```

Expected: the tracked hook passes.

### Task 3: Create the Article-Writing Playbook

**Files:**

- Create: `.agents/playbooks/article-writing.md`
- Modify: `.agents/doctrine/repo-runbook-policy.md`

**Interfaces:**

- Consumes: `.agents/doctrine/writing-policy.md` and the eight-phase workflow in the approved spec.
- Produces: a repository workflow that future article tasks can invoke and that the companion skill can complement without duplicating repository commands.

- [ ] **Step 1: Write the playbook metadata and boundary**

Create `article-writing.md` with `When`, `Required skills`, `Composition`, `Doctrine and contracts`, `Local commands and paths`, `Evidence contract`, `Prohibited combinations` and `Runbook routing` sections matching existing playbook conventions.

The boundary must say:

- doctrine owns durable editorial law;
- the playbook owns repository workflow and publication mechanics;
- the repo-owned article-writing skill will own the detailed editorial method after the companion plan registers it;
- Linear-backed articles require the full issue and linked documents before edits;
- the tracked commit hook owns the complete local gate.

- [ ] **Step 2: Implement phases A through H**

Translate the spec's exact phases into executable checklist form:

- A: commission and material;
- B: editorial design;
- C: drafting;
- D: macro edit;
- E: meso and micro edit;
- F: voice and fatigue;
- G: web article and whole-site review;
- H: publication evidence.

Preserve the distinct-pass ordering and the complete whole-site 12A review. Do not copy the skill's future reference chapters into the playbook.

- [ ] **Step 3: Keep the first plan independently valid**

Describe the detailed editorial method as companion work without adding a required invocation of an unregistered skill. The companion skill plan owns adding the `/writing-portfolio-articles` invocation after exact-name registration. This plan must leave no dangling skill link and may be reviewed or committed independently.

- [ ] **Step 4: Register the topical playbook category**

Add `article-writing.md` to `.agents/doctrine/repo-runbook-policy.md` under `Additional repository-specific playbooks`, describing it as the workflow for public editorial articles from commission through publication proof.

- [ ] **Step 5: Verify playbook shape and non-duplication**

Run:

```powershell
rg -n "^## (When|Required skills|Composition|Doctrine and contracts|Local commands and paths|Evidence contract|Prohibited combinations|Runbook routing)$|^### Phase [A-H]" .agents/playbooks/article-writing.md
```

Expected: all standard sections and phases A-H exist.

Run:

```powershell
py -3 tools/run.py repo-standards --check
```

Expected: PASS.

- [ ] **Step 6: Commit the playbook**

```powershell
git add .agents/playbooks/article-writing.md .agents/doctrine/repo-runbook-policy.md
git commit -m "docs: add article writing playbook"
```

Expected: the tracked hook passes.

### Task 4: Route and Regenerate the Writing System

**Files:**

- Modify: `AGENTS.md`
- Modify: `CONTRIBUTING.md`
- Generated: `.agents/INDEX.md`
- Generated: `.agents/doctrine/INDEX.md`
- Generated: `.agents/playbooks/INDEX.md`
- Generated: other affected `INDEX.md` files selected by the mesh generator

**Interfaces:**

- Consumes: the completed writing doctrine and article-writing playbook.
- Produces: human and agent discovery paths plus a churn-free generated mesh; no dangling route to an unregistered skill.

- [ ] **Step 1: Add concise root routing pointers**

Add links in `AGENTS.md` for:

```markdown
- [Portfolio writing policy](.agents/doctrine/writing-policy.md)
- [Article-writing playbook](.agents/playbooks/article-writing.md)
```

Do not place editorial rules in the router.

- [ ] **Step 2: Add contributor entry points**

In `CONTRIBUTING.md`, add the writing policy to `Before starting` for public prose changes and the article-writing playbook to `Conventions and verification`.

- [ ] **Step 3: Regenerate and check the mesh**

Run:

```powershell
py -3 tools/run.py mesh --apply
py -3 tools/run.py mesh --check
```

Expected: both commands pass; generated indexes link the new doctrine and playbook.

- [ ] **Step 4: Verify routing and scope**

Run:

```powershell
rg -n "writing-policy|article-writing" AGENTS.md CONTRIBUTING.md .agents/doctrine/INDEX.md .agents/playbooks/INDEX.md .agents/INDEX.md
```

Expected: all intended entry points are present.

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors; only intended authored and generated files remain.

- [ ] **Step 5: Commit through the complete local gate**

```powershell
git add AGENTS.md CONTRIBUTING.md .agents/doctrine/writing-policy.md .agents/doctrine/portfolio-design-policy.md .agents/doctrine/repo-runbook-policy.md .agents/playbooks/article-writing.md .agents/INDEX.md .agents/doctrine/INDEX.md .agents/playbooks/INDEX.md
git commit -m "docs: route the article writing system"
```

Expected: the tracked hook materialises the staged tree, applies owned projections, and passes the complete check gate.

- [ ] **Step 6: Verify the independent exit state**

Verify:

```powershell
Test-Path .agents/doctrine/writing-policy.md
Test-Path .agents/playbooks/article-writing.md
Test-Path .agents/skills/writing-portfolio-articles/SKILL.md
```

Expected: first two are `True`; the skill is `False` until the companion plan executes. The doctrine and playbook slice is complete and valid, while the overall writing system remains incomplete.

## Plan Completion

After the companion skill plan has executed and the complete system is reviewable:

- use `completing-planning-artifacts` to mark this plan and the companion plan `completed-awaiting-retirement`;
- keep both plans and the approved spec tracked through the completing PR;
- push the proved commits to the existing draft PR branch;
- verify the published PR head and hosted checks before a completion claim.
