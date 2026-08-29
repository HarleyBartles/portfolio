# Aggregate pre-commit diagnostics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a failed normal commit report every independent local CI failure while preserving fail-fast safeguards around staged-state custody and dependent checks.

**Architecture:** Keep the hook's submodule, snapshot, regeneration, allow-list, and restoration boundaries fail-fast. Add an explicit diagnostic mode to the canonical Python runner that executes independent check groups serially, records each result, skips Playwright if the production build has failed, prints an actionable summary, and exits nonzero only after every eligible group has run. The hook opts into that mode; hosted CI retains the existing canonical command and semantics.

**Tech Stack:** Bash hook, Python 3 standard library, `unittest`, existing `tools/run.py` command runner.

**Execution Strategy:** `manual` — the runner and hook have tightly coupled staged-tree safety requirements, so one test-first sequence keeps the contract coherent.

## Global Constraints

- Do not weaken submodule, staged snapshot, generator allow-list, or restoration failures; they remain immediate rejections.
- Run independent checks serially to avoid shared build/output and preview-server contention.
- Playwright is skipped with an explicit reason when the production build fails; it remains eligible otherwise.
- Preserve `py -3 tools/run.py ci --check` as the hosted canonical command and do not add a new runbook.
- Update the existing workflow guidance from first-failure retries to one focused repair sweep after the hook's complete report.
- Do not bypass the normal pre-commit hook or pre-run the complete canonical gate before the commit.

---

### Task 1: Define the aggregate diagnostic contract in tests

**Files:**
- Modify: `tests/test_run.py`
- Modify: `tests/test_precommit_hook.py`

**Interfaces:**
- Consumes: existing `_run`, `_precommit_check`, `_ci_check`, and tracked hook contracts.
- Produces: failing tests that require independent failures to be collected, build-dependent browser journeys to be marked skipped, and the hook to request diagnostic mode.

- [x] **Step 1: Write failing tests** that simulate multiple `_run` failures and assert later independent commands still run, the failed build prevents the Playwright command, and the hook includes the diagnostic flag.
- [x] **Step 2: Run the focused Python tests** with `py -3 -m unittest tests.test_run tests.test_precommit_hook -v` and observe failures because the diagnostic mode does not exist yet.
- [x] **Step 3: Mark Task 1 checklist complete in this plan.**

### Task 2: Implement diagnostic aggregation without weakening custody

**Files:**
- Modify: `tools/run.py`
- Modify: `.githooks/pre-commit`

**Interfaces:**
- Consumes: `--diagnostics` CLI flag, existing named command builders, and `subprocess.CalledProcessError` from `_run`.
- Produces: `ci --check --diagnostics` / `precommit --check --diagnostics` that prints each eligible group outcome and fails after the full report; hook invocation of that mode after its existing state-safety checks.

- [x] **Step 1: Implement the minimal runner aggregation** using the existing command builders, collecting independent failures and an explicit dependent skip status.
- [x] **Step 2: Keep standard check mode fail-fast** so hosted CI behavior and existing consumers remain unchanged.
- [x] **Step 3: Change only the final hook runner invocation** to request diagnostic mode; leave every earlier hook exit untouched.
- [x] **Step 4: Re-run the focused Python tests** and confirm they pass.
- [x] **Step 5: Mark Task 2 checklist complete in this plan.**

### Task 3: Align durable workflow guidance and verify the staged commit path

**Files:**
- Modify: `.agents/doctrine/workflow-policy.md`
- Modify: `.agents/runbooks/testing.md`
- Generated: affected `INDEX.md` files from `py -3 tools/run.py ci --apply` during the normal hook

**Interfaces:**
- Consumes: the diagnostic hook behavior established in Task 2.
- Produces: guidance directing agents to make one focused repair sweep from the full hook report, then retry one normal commit.

- [x] **Step 1: Replace first-failure retry guidance** in the existing policy and testing runbook with the aggregate-report workflow, without adding a separate procedure document.
- [x] **Step 2: Run focused tests for the runner and hook** with `py -3 -m unittest tests.test_run tests.test_precommit_hook -v`.
- [x] **Step 3: Inspect the complete diff and stage all intended files.**
- [x] **Step 4: Commit normally.** The hook performs regeneration, stages only owned generated surfaces, runs the diagnostic local CI mode, and is the one full integration gate for the exact staged tree.
- [x] **Step 5: Archive this completed plan as part of the normal hooked commit.** The commit is the final verification event for its exact staged tree.

## Plan-readiness review

- Dependency order is coherent: tests define the contract before runner/hook changes; guidance depends on the implemented behavior.
- The plan preserves source custody, does not add a new agent-facing procedure, and names the exact focused proof plus the normal commit gate.
- The canonical full check is intentionally not pre-run; the tracked hook remains its exact-staged-tree integration gate under the active workflow policy.
- Rating: **9/10**. The runner seams, dependency rule, and required documentation targets are all known from the live repository.
