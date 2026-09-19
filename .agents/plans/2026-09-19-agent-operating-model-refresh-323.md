# Portfolio Agent Operating Model Refresh 323 Implementation Plan

**Lifecycle state:** completed-awaiting-retirement

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh Portfolio onto marketplace commit `930f2eebe3fe3252404789e3410d1343494c30fa` and align the repository-local operating-model bindings with the updated portable branch-closeout, planning-artifact, composition, and tracked-hook contracts.

**Architecture:** Keep portable procedure in marketplace-owned installed skills and templates. Portfolio changes only its local routing, lifecycle bindings, completed-artifact doctrine, tracked hook, and generated navigation required by the refreshed standard; product code and the dirty Usual Specialists Index worktree remain untouched.

**Tech Stack:** Markdown repository guidance, Bash tracked pre-commit hook, Python repository command bus, Git submodule/projection tooling.

**Spec:** `.agents/plugins/marketplace-source/.agents/specs/2026-09-19-post-merge-closeout-and-planning-lifecycle-design.md`

**Execution Strategy:** `executing-plans` — the local binding changes, tracked-hook update, regeneration, and validation are tightly coupled and should proceed sequentially in this worktree.

## Global Constraints

- Marketplace source is pinned by the superproject gitlink; never edit `.agents/plugins/marketplace-source` contents in Portfolio.
- Marketplace-derived `.agents/skills/` are projection surfaces; refresh them through the installed refresh capability rather than editing them by hand.
- `src/client/src/data/case-studies/marketplace-evidence.json` is a dated public case-study snapshot, not a live mirror of the marketplace submodule. Portfolio quality validation may check that snapshot for internal validity and safety, but must not require its revision, counts, or plugin inventory to match the moving marketplace source.
- Preserve Portfolio-specific commands, paths, CI job names, and genuine exceptions locally; do not copy portable procedure into local doctrine or runbooks.
- Leave `Z:\\_agent-worktrees\\portfolio\\codex\\usual-specialists-index-implementation` untouched during this migration.
- Do not merge; Harley owns merge authority.
- Use normal commits and the tracked pre-commit hook; never bypass it with `--no-verify`.

---

### Task 1: Commit the refreshed execution package

**Files:**
- Create: `.agents/plans/2026-09-19-agent-operating-model-refresh-323.md`
- Regenerate: `.agents/plans/INDEX.md` and affected generated mesh indexes
- Bootstrap repair: `githooks/pre-commit`, `AGENTS.md`, `.agents/doctrine/completed-artifacts.md`
- Refresh current public marketplace inventory evidence: `src/client/src/data/case-studies/marketplace-evidence.json`

**Interfaces:**
- Consumes: marketplace commit `930f2eebe3fe3252404789e3410d1343494c30fa`, the merged upstream design, the current Portfolio repository state at `854ef9e5ebe7241c3623267197de14472914be01`, and any bootstrap drift exposed by the first normal commit attempt.
- Produces: a committed, in-flight Portfolio execution plan plus only the minimum refreshed hook/router/doctrine prerequisites required for the canonical commit gate to accept that plan package.

- [x] **Step 1:** Run `py -3 tools/run.py mesh --apply` so the new plan is discoverable through generated navigation.
- [x] **Step 2:** Run `py -3 tools/run.py mesh --check` and require a clean result.
- [x] **Step 3:** Run the `handoff-gates` plan-readiness lane against this plan; strengthen any gap until the rating is at least 9/10.
- [x] **Step 4:** If the first normal commit exposes bootstrap drift in the refreshed tracked-hook standard or public Marketplace evidence, accept only the mechanically regenerated hook, the minimum authored router/doctrine repairs required by `repo-standards --check`, and an intentional dated evidence refresh where explicitly chosen; do not rewrite historical consumer snapshots or treat public case-study evidence as a required live mirror of the marketplace source.
- [x] **Step 5:** Stage the plan, marketplace-source gitlink/projection refresh, regenerated hook, required bootstrap router/doctrine repairs, and generated indexes that belong to this execution package.
- [x] **Step 6:** Commit normally with subject `chore: plan operating model refresh 323`; let the refreshed tracked hook validate the exact staged snapshot.
- [x] **Step 7:** Mark Task 1 checklist items `[x]` in this plan before moving to Task 2.

### Task 2: Align Portfolio lifecycle and discovery bindings

**Files:**
- Modify: `AGENTS.md`
- Modify: `.agents/doctrine/completed-artifacts.md`
- Modify: `.agents/runbooks/planning.md`
- Modify: `.agents/runbooks/pr.md`
- Review and modify only if required: `.agents/doctrine/repo-runbook-policy.md`

**Interfaces:**
- Consumes: the updated portable `completing-planning-artifacts`, `repo-shape`, `repo-composition`, and first-turn discovery contracts.
- Produces: Portfolio-local paths, commands, evidence bindings, and routing without duplicating portable procedure.

- [x] **Step 1:** Add a direct root routing pointer to `.agents/playbooks/INDEX.md` alongside the existing runbook inventory pointer.
- [x] **Step 2:** Update completed-artifact doctrine to the two-slice lifecycle: completion-marked artifacts remain through the completing PR and retire in the next substantive slice after promotion checks; bind normal lifecycle ownership to `completing-planning-artifacts` and ambiguity to `cleanup-custody`.
- [x] **Step 3:** Update the planning runbook to require successor-slice ingress through `completing-planning-artifacts` after fresh-base/worktree setup and before substantive edits, while preserving Portfolio's `.agents/plans/` / `.agents/specs/` / `.agents/roadmaps/` homes and `py -3 tools/run.py mesh --apply` regeneration binding.
- [x] **Step 4:** Update the PR runbook to require the completing-slice lane before fully reviewable handoff: promote durable decisions, mark governed artifacts `completed-awaiting-retirement`, keep them in the PR, and ensure agent-owned plan items are complete even when the PR remains Draft. Preserve Portfolio's draft policy, CI check names, PR template path, and no-merge authority boundary.
- [x] **Step 5:** Remove or adjust any stale local composition mapping only if `repo-standards --check` or reciprocal-edge validation proves it is drift; do not create a method-heavy local completion playbook.
- [x] **Step 6:** Run `py -3 tools/run.py repo-standards --check` and `py -3 tools/run.py mesh --check`; repair only reported local drift.
- [x] **Step 7:** Mark Task 2 checklist items `[x]` in this plan.

### Task 3: Adopt the updated tracked-hook and hosted-CI parity contract

**Files:**
- Modify: `githooks/pre-commit`
- Verify: `.agents/contracts/repo-standards-commands.json`
- Verify: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: the portable tracked-hook staged-snapshot template and Portfolio's declared `ci --apply` / `ci --check --diagnostics` command vectors.
- Produces: a local hook that re-stages apply-mode edits only for originally staged authored paths plus owned generated surfaces, while hosted CI executes the same hook against `REPO_STANDARDS_HOSTED_COMMIT=HEAD`.

- [x] **Step 1:** Update `githooks/pre-commit` to retain the refreshed canonical staged-snapshot skeleton, including capture of `ORIGINAL_STAGED_PATHS` before apply-mode mutation and `git update-index --add --remove -z --stdin` afterward.
- [x] **Step 2:** Preserve Portfolio's command declaration unchanged unless validation proves drift: apply is `@python tools/run.py ci --apply`; check is `@python tools/run.py ci --check --diagnostics`.
- [x] **Step 3:** Verify `.github/workflows/ci.yml` still runs `githooks/pre-commit` with `REPO_STANDARDS_HOSTED_COMMIT=HEAD` and retains Portfolio's Draft-aware PR gating; change it only if the refreshed standard reports a parity defect.
- [x] **Step 4:** Run `py -3 tools/run.py repo-standards --check` and require the hook contract drift to clear.
- [x] **Step 5:** Mark Task 3 checklist items `[x]` in this plan.

### Task 4: Regenerate and validate the complete operating-model slice

**Files:**
- Regenerate: `.agents/skills/` projections and `.agents/skills/.provenance.json` through the refresh capability
- Regenerate: generated `INDEX.md` mesh surfaces
- Modify only if a validator reports local drift: repository-owned operating-model files

**Interfaces:**
- Consumes: completed local binding and hook changes.
- Produces: converged marketplace gitlink, installed projections, provenance, composition graph, and generated navigation.

- [x] **Step 1:** Run `py -3 .agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py --check` and require projection convergence at `930f2eebe3fe3252404789e3410d1343494c30fa`.
- [x] **Step 2:** Run `py -3 tools/run.py mesh --apply`, then `py -3 tools/run.py mesh --check`.
- [x] **Step 3:** Run `py -3 tools/run.py repo-standards --check`; repair any remaining repository-owned drift and repeat focused checks until clean.
- [x] **Step 4:** Review `git diff --check -- . ':(exclude).agents/skills/**'`, the marketplace-source gitlink, changed-file custody, and the runbook/playbook graph for accidental portable-procedure duplication. Exact marketplace skill projections are validated by the refresh check rather than whitespace-normalized locally.
- [x] **Step 5:** Decouple Portfolio's Marketplace case-study evidence validator from the moving marketplace source. Keep the deliberately refreshed `2026-09-19` public snapshot, but prove with a regression test that an older internally valid snapshot produces neither findings nor warnings when the submodule later advances.
- [x] **Step 6:** Re-run the affected Portfolio quality and Marketplace component tests after the decoupling, then mark Task 4 complete.

### Task 5: Complete, review, commit, and publish the slice

**Files:**
- Modify: `.agents/plans/2026-09-19-agent-operating-model-refresh-323.md`
- Include: all intended repository-owned changes and refreshed generated surfaces

**Interfaces:**
- Consumes: validated implementation and the repository's PR/publication contract.
- Produces: a fully reviewable Draft PR whose exact head passed the tracked canonical hook and whose in-flight plan is completion-marked for retirement by the next substantive Portfolio slice.

- [x] **Step 1:** Run `handoff-gates` completion-readiness against this plan and the Portfolio code-review runbook; repair findings below 9/10.
- [x] **Step 2:** Run the final whole-branch review required by the implementation workflow and repair findings.
- [x] **Step 3:** Stage the complete implementation tree and commit normally; rely on the tracked pre-commit hook as the one complete local gate for that staged snapshot.
- [x] **Step 4:** Push `codex/agent-operating-model-refresh-323` and open a Draft PR into `main`; do not merge or mark Ready on Harley's behalf. Verify the published head equals the implementation commit before closing the plan.
- [x] **Step 5:** Use `completing-planning-artifacts` completing-slice lane after publication proof exists: verify durable consequences are promoted, mark this plan with lifecycle state `completed-awaiting-retirement`, and mark every agent-owned checklist item through this step `[x]`. Human Ready/merge actions are PR state and do not appear as unchecked plan work.
