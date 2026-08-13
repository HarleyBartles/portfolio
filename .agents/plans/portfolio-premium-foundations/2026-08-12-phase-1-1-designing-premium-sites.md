# Phase 1.1 — `designing-premium-sites` umbrella skill

> **For agentic workers:** REQUIRED SUB-SKILL: Use /writing-skills and /writing-with-clarity to author and review the skill. Use /executing-plans or /subagent-driven-development to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `designing-premium-sites` repo-owned skill that encodes what a `$10k-feel` developer portfolio looks like, so later agents can design and review the site without re-arguing what premium means.

**Architecture:** The skill follows the repo skill structure: `SKILL.md` as the router, `assets/authority/reference-source/` for vendored books, `assets/authority/CITATIONS.md` for license and provenance, and `references/` for synthesized guidance. The umbrella points at future pattern skills (`design-tokens`, `typography-for-the-web`, `web-layout`, `motion-patterns`, `asset-custody`, `evaluating-design-references`) without depending on their existence.

**Tech Stack:** Markdown, the installed `writing-skills` and `writing-with-clarity` skills, `py -3 tools/run.py ci --check`.

## Global Constraints

- This phase produces a repo-owned skill and its authority/references, not application code.
- Repo-owned skills are unprefixed unless they are a repo-specific override of a marketplace skill.
- Every vendored source must have a `CITATIONS.md` entry with a compatible license.
- No new application UI, component code, visual identity, 3D/Spline/WebGL, backend features, CMS, auth, or blog infrastructure.
- `py -3 tools/run.py ci --check` must pass before the task is marked done.
- New or changed skills must have `SKILL.md` + `assets/authority/` + `references/` structure.

---

### Task 1: Scaffold the skill directory

**Files:**
- Create: `.agents/skills/designing-premium-sites/assets/authority/reference-source/`
- Create: `.agents/skills/designing-premium-sites/assets/authority/CITATIONS.md`
- Create: `.agents/skills/designing-premium-sites/references/`
- Create: `.agents/skills/designing-premium-sites/SKILL.md`

**Interfaces:**
- Consumes: the master spec at `.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`.
- Produces: a directory layout that `repo-standards` and the mesh validator expect.

- [x] **Step 1: Create the directory structure**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/designing-premium-sites/assets/authority/reference-source
New-Item -ItemType Directory -Force -Path .agents/skills/designing-premium-sites/references
```

- [x] **Step 2: Create `CITATIONS.md` with the known sources**

Create `.agents/skills/designing-premium-sites/assets/authority/CITATIONS.md`:

```markdown
# Citations

## Resilient Web Design

- Author: Jeremy Keith
- License: CC BY-SA 4.0
- Canonical URL: https://resilientwebdesign.com/
- Source provenance: downloaded from the canonical site

## The Shape of Design

- Author: Frank Chimero
- License: CC BY-NC-SA 3.0
- Canonical URL: https://shapeofdesignbook.com/
- Source provenance: downloaded from the canonical site

## Web Design in 4 Minutes

- Author: Jeremy Thomas
- License: verify from https://jgthms.com/web-design-in-4-minutes/ before committing
- Canonical URL: https://jgthms.com/web-design-in-4-minutes/
- Source provenance: downloaded from the canonical site
```

- [x] **Step 3: Stage and commit the scaffold**

```powershell
git add .agents/skills/designing-premium-sites/
git commit -m "feat: scaffold designing-premium-sites skill"
```

- [x] **Step 4: Mark Task 1's boxes `[x]` in the plan file**

Update `.agents/plans/portfolio-premium-foundations/2026-08-12-phase-1-1-designing-premium-sites.md` so the four checkboxes in Task 1 are `[x]`.

---

### Task 2: Vendor the authority sources

**Files:**
- Modify: `.agents/skills/designing-premium-sites/assets/authority/CITATIONS.md`
- Create: `.agents/skills/designing-premium-sites/assets/authority/reference-source/resilient-web-design/`
- Create: `.agents/skills/designing-premium-sites/assets/authority/reference-source/shape-of-design/`
- Create: `.agents/skills/designing-premium-sites/assets/authority/reference-source/web-design-in-4-minutes/`

**Interfaces:**
- Consumes: the URLs and licenses from `CITATIONS.md`.
- Produces: canonical source copies in the skill's authority directory.

- [x] **Step 1: Download or copy each authority source into its subdirectory**

For each source, download the text and place it under the matching `reference-source/` subdirectory. Prefer plain Markdown or HTML that can be read offline. Do not transform or re-license the source.

- `.agents/skills/designing-premium-sites/assets/authority/reference-source/resilient-web-design/`
- `.agents/skills/designing-premium-sites/assets/authority/reference-source/shape-of-design/`
- `.agents/skills/designing-premium-sites/assets/authority/reference-source/web-design-in-4-minutes/`

- [x] **Step 2: Verify and update `CITATIONS.md`**

Confirm the license for *Web Design in 4 Minutes* from the source and update `CITATIONS.md`.

- [x] **Step 3: Commit the authority sources**

```powershell
git add .agents/skills/designing-premium-sites/assets/authority/
git commit -m "docs: vendor authority sources for designing-premium-sites"
```

- [x] **Step 4: Mark Task 2's boxes `[x]` in the plan file**

Update this plan so the four checkboxes in Task 2 are `[x]`.

---

### Task 3: Author the `SKILL.md` and references

**Files:**
- Modify: `.agents/skills/designing-premium-sites/SKILL.md`
- Create: `.agents/skills/designing-premium-sites/references/accessibility.md`
- Create: `.agents/skills/designing-premium-sites/references/assets.md`
- Create: `.agents/skills/designing-premium-sites/references/clarity-of-purpose.md`
- Create: `.agents/skills/designing-premium-sites/references/colour-and-contrast.md`
- Create: `.agents/skills/designing-premium-sites/references/constraints-as-creative-material.md`
- Create: `.agents/skills/designing-premium-sites/references/craft-and-finish.md`
- Create: `.agents/skills/designing-premium-sites/references/hierarchy.md`
- Create: `.agents/skills/designing-premium-sites/references/how-and-why.md`
- Create: `.agents/skills/designing-premium-sites/references/layout-and-spacing.md`
- Create: `.agents/skills/designing-premium-sites/references/motion.md`
- Create: `.agents/skills/designing-premium-sites/references/performance.md`
- Create: `.agents/skills/designing-premium-sites/references/resilience.md`
- Create: `.agents/skills/designing-premium-sites/references/restraint.md`
- Create: `.agents/skills/designing-premium-sites/references/taste.md`
- Create: `.agents/skills/designing-premium-sites/references/typography.md`

**Interfaces:**
- Consumes: the vendored sources in `assets/authority/reference-source/` and the master spec.
- Produces: the umbrella skill and 15 facet reference files that later pattern skills can extend.

- [x] **Step 1: Use `/writing-skills` to author `SKILL.md`**

Write `.agents/skills/designing-premium-sites/SKILL.md` with these sections:

- `## Use when`
- `## Core thesis` — what makes a portfolio feel `$10k` instead of `$500`
- `## Quality heuristics` — concrete, reviewable signals for typography, layout, motion, assets, accessibility, and performance
- `## Reference routes` — pointers to the 15 `references/` facet files and the future pattern skills
- `## Working rules` — how an agent should apply this skill without over-designing

Each section must be concrete enough that a later agent can rate a page against it without improvising the criteria.

- [x] **Step 2: Use `/writing-with-clarity` to review the draft**

Run a clarity pass on the `SKILL.md` and the 15 reference files. Fix any vague adjectives, unsupported claims, or ambiguous signals.

- [x] **Step 3: Write the 15 facet reference files**

Synthesize the shared ideas from *Resilient Web Design* and *The Shape of Design* into the 15 facet references under `references/`. Keep only the principles that apply to a premium portfolio: resilience, hierarchy, restraint, and clarity of purpose, with one principle per file.

- [x] **Step 4: Document the `$10k-feel` versus `$500-feel` pattern across the 15 facet files**

Record the `$10k-feel` versus `$500-feel` pattern as a per-file table inside each of the 15 facet references. This pattern becomes the taste baseline for the `taste-reviewer` subagent later.

- [x] **Step 5: Commit the authored skill**

```powershell
git add .agents/skills/designing-premium-sites/
git commit -m "docs: author designing-premium-sites SKILL.md and references"
```

- [x] **Step 6: Mark Task 3's boxes `[x]` in the plan file**

Update this plan so the six checkboxes in Task 3 are `[x]`.

---

### Task 4: Verify and mesh the skill

**Files:**
- Modify: generated `INDEX.md` surfaces (downstream of the mesh generator)

**Interfaces:**
- Consumes: the new skill tree.
- Produces: a validated, mesh-discoverable skill.

- [x] **Step 1: Run the repo standards check on the skill tree**

```powershell
py -3 .agents/skills/repo-standards/scripts/repo_standards.py --check
```

If the script is not installed in this worktree, run the canonical CI instead:

```powershell
py -3 tools/run.py ci --check
```

- [x] **Step 2: Validate the generated agent mesh**

```powershell
py -3 .agents/skills/generating-agent-mesh/scripts/validate_agent_mesh.py --check
```

If the script is not installed, rely on `py -3 tools/run.py ci --check`.

- [x] **Step 3: Regenerate and verify the repo mesh**

```powershell
py -3 tools/run.py ci --apply
```

This will regenerate `INDEX.md` files and run the full canonical check.

- [x] **Step 4: Stage and commit any generated updates**

```powershell
git add .
git commit -m "chore: regenerate mesh and validate designing-premium-sites skill"
```

- [x] **Step 5: Mark Task 4's boxes `[x]` in the plan file**

Update this plan so the five checkboxes in Task 4 are `[x]`.

---

## Self-review

Before marking this plan done:

1. **Spec coverage:** Does every Phase 1 requirement in the master spec have a task? The umbrella skill, authority, citations, references, and validation are all covered.
2. **Placeholder scan:** No `TBD`, `TODO`, `implement later`, or `fill in details` remain. The `SKILL.md` content will be authored, but the structure and source list are explicit. *Web Design in 4 Minutes* has no stated license and was vendored with the repository owner's explicit acceptance for attribution-only use.
3. **Type consistency:** N/A — this plan creates documentation, not code types.
4. **Plan-readiness rating:** Target `9/10`. The only user-owned gap is the exact license for *Web Design in 4 Minutes*, which is handled as a verification step.
