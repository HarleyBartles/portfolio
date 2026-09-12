# Flaky Test Containment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent a failed CV preview from poisoning the next canonical-gate run, give canonical Vitest and Playwright executions one visible retry, and avoid rebuilding the client before Playwright when the canonical gate has already produced the validated build.

**Architecture:** Replace the Windows command-shell/npm preview wrapper with an owned Vite child process launched through Node, select an available loopback port for each PDF generation, and keep cleanup in the generator's existing `finally` boundary. Keep ordinary focused tests strict; the Python command bus opts the canonical gate into one framework-native retry and tells the E2E wrapper to reuse the build already produced earlier in that gate.

**Tech Stack:** Python 3 command bus, Node.js ESM, Vite, Vitest, Playwright, Windows and POSIX process control.

**Spec:** No separate spec. This is the bounded, user-approved contract agreed in the current task.

**Execution Strategy:** `executing-plans` — lifecycle ownership must be repaired before the canonical retry and build-reuse wiring can be trusted.

## Global Constraints

- Start from `15c1f12cfac42f86af9ac49b72f69f90b5ecbbfc` in `Z:\_agent-worktrees\portfolio\codex\flaky-test-containment`.
- Retry only Vitest and Playwright test attempts, exactly once, through their native retry mechanisms.
- Do not retry repository checks, Python tests, builds, asset generation, or occupied-port failures.
- Retry-rescued tests must remain visible in native framework output; do not swallow or rewrite failures as unconditional success.
- Ordinary focused `npm test` and direct Playwright runs remain strict unless the caller explicitly supplies retry arguments.
- A standalone E2E command continues to build by default; only the canonical gate may skip the duplicate build.
- Do not terminate an unrelated process found on a fixed port. Remove the fixed-port dependency instead.
- Use TDD for each independently observable behavior and retain cross-platform process semantics.
- Use focused checks while editing. The final normal commit owns the complete staged-tree gate.
- When execution completes, remove this plan from the tracked tree; Git history retains the planning record.

---

### Task 1: Own and release the CV preview lifecycle

**Files:**
- Modify: `src/client/scripts/generate-cv-pdf.mjs`
- Modify: `src/client/scripts/generate-cv-pdf.test.ts`

**Interfaces:**
- Consumes: Vite's installed CLI entrypoint, Node's `process.execPath`, loopback TCP port allocation, and the existing `generateCvPdf` dependency-injection seam.
- Produces: `findAvailablePreviewUrl(host?: string): Promise<string>` and `startPreviewProcess(clientRoot: string, previewUrl: string, dependencies?): ChildProcess`; `generateCvPdf` resolves a per-run preview URL when none is supplied and always passes its owned preview to `stopPreviewProcess`.

- [ ] **Step 1: Write failing lifecycle tests**

Add tests proving that an automatically selected preview URL uses an available loopback port, Windows launches the Vite CLI directly through `process.execPath` without a `cmd.exe`/npm wrapper, and a readiness failure still invokes preview cleanup.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm --prefix src/client test -- --run scripts/generate-cv-pdf.test.ts`

Expected: FAIL because dynamic preview URL selection and direct Vite-child launch are not implemented.

- [ ] **Step 3: Implement the minimal owned-process lifecycle**

Resolve an available `127.0.0.1` port, launch `node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port <port> --strictPort`, retain the POSIX process-group behavior, and preserve Windows `taskkill /t /f` cleanup for the live direct Vite child. Keep `finally` as the single normal success/failure cleanup boundary.

- [ ] **Step 4: Run the focused lifecycle tests and verify GREEN**

Run: `npm --prefix src/client test -- --run scripts/generate-cv-pdf.test.ts`

Expected: all CV PDF tests pass with no retained listener.

### Task 2: Give the canonical gate bounded native retries and reuse its build

**Files:**
- Modify: `tools/run.py`
- Modify: `tests/test_run.py`
- Modify: `src/client/scripts/run-e2e.mjs`
- Create: `src/client/scripts/run-e2e.test.ts`

**Interfaces:**
- Consumes: the successful production-build step in `_base_ci_check`, Vitest's `--retry=1`, Playwright's `--retries=1`, and npm's `--` argument forwarding.
- Produces: canonical unit-test and E2E command helpers plus an E2E argument parser that recognizes and strips only the internal `--skip-build` switch before forwarding Playwright arguments.

- [ ] **Step 1: Write failing command-contract tests**

Add Python assertions that canonical client unit tests include `--retry=1`, canonical E2E includes `--skip-build` and `--retries=1`, and diagnostic/non-diagnostic gates call the same helpers. Add a Vitest test proving the E2E plan skips its build only when `--skip-build` is present and forwards all remaining Playwright arguments unchanged.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `py -3 -m unittest tests.test_run -v`

Run: `npm --prefix src/client test -- --run scripts/run-e2e.test.ts`

Expected: FAIL because the canonical command helpers and E2E argument parser do not exist.

- [ ] **Step 3: Implement canonical retry and build-reuse wiring**

Make `tools/run.py` call Vitest with exactly one retry and call `test:e2e` with the internal skip-build switch plus exactly one Playwright retry. Refactor `run-e2e.mjs` into import-safe planning and execution seams, build by default, skip only on the internal switch, and preserve direct standalone and visual-suite behavior.

- [ ] **Step 4: Run the focused command-contract tests and verify GREEN**

Run: `py -3 -m unittest tests.test_run -v`

Run: `npm --prefix src/client test -- --run scripts/run-e2e.test.ts`

Expected: all command-bus and E2E-wrapper tests pass.

### Task 3: Document, verify, and publish the bounded change

**Files:**
- Modify: `.agents/runbooks/testing.md`
- Modify: `.agents/doctrine/validation-policy.md`
- Delete at completion: `.agents/plans/2026-09-12-flaky-test-containment.md`
- Generated by the hooked commit: affected `INDEX.md` files

**Interfaces:**
- Consumes: Tasks 1 and 2, the repository validation contract, and the tracked pre-commit hook.
- Produces: current retry/lifecycle guidance, a clean committed branch, and a Draft PR targeting `main`.

- [ ] **Step 1: Update current validation guidance**

Document that canonical Vitest and Playwright attempts receive one visible native retry, deterministic checks/builds do not, retry-rescued tests remain repair evidence, standalone focused runs remain strict, and the canonical E2E phase reuses its preceding production build.

- [ ] **Step 2: Run focused integration checks**

Run: `npm --prefix src/client test -- --run scripts/generate-cv-pdf.test.ts scripts/run-e2e.test.ts`

Run: `py -3 -m unittest tests.test_run -v`

Run the production build twice consecutively and verify after each run that no listener remains on the selected PDF preview port.

Expected: focused tests and both builds pass; neither build leaves an owned preview process or blocked port.

- [ ] **Step 3: Remove the completed plan and stage the intended tree**

Delete this plan, stage only the implementation, tests, current guidance, plan deletion, and hook-generated index changes, then inspect `git diff --cached --check` and `git status --short`.

- [ ] **Step 4: Make the normal commit and accept the hooked canonical gate as exact-tree proof**

Run: `git commit -m "test: contain flaky canonical gate failures"`

Expected: the hook's declared apply/check pipeline passes, including 75 Python tests, the current Vitest suite with canonical retry, one production build before Playwright, and the current Playwright journeys with canonical retry.

- [ ] **Step 5: Review and publish**

Inspect the final diff against this plan, verify the worktree is clean, push `codex/flaky-test-containment`, create a Draft PR targeting `main`, and verify the GitHub PR head matches the pushed branch. Do not promote the PR to Ready without explicit user direction.
