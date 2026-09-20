# Workflow Policy

Status: active policy
Owner: Portfolio repository
Scope: git workflow, worktrees, branches, scratch, publication, and task readiness
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: installed `repo-worker-base` and its references

Use this policy when managing git workflow, worktrees, scratch, claiming completion, or deciding whether a task is ready to hand off.

## Worktree and scratch

For the Git-derived location algorithm, see [non-repo-locations-policy.md](./non-repo-locations-policy.md).

- Use an isolated worktree when a task needs to stay separate from other in-flight work.
- Keep the worktree aligned to one branch at a time.
- Keep temporary scratch under the external scratch root and never commit it.

## Branch and publication

- Start from the current `main` branch unless a task says otherwise.
- Use a branch for real work; do not treat direct `main` edits as the default path.
- Keep in-progress work in draft until the task is actually complete.
- Raise a draft PR for work that is meant to be reviewed or handed off through GitHub.
- Keep the draft PR fresh with the actual branch state and validation status.
- Only publish the PR when all work is done and the latest normal commit has passed the tracked hook's complete `py -3 tools/run.py ci --check` gate, so hosted CI is expected to confirm rather than rediscover local failures.
- GitHub Actions initializes the pinned public marketplace-source submodule and validates that source, the committed derived skills, provenance, and mesh agree. Do not weaken this check based on the marketplace repository's former private status.
- For marketplace or derived-skill work, do not publish until the manifest, submodule, derived skills, provenance, and mesh validation all agree.
- Do not claim a merge, publish, or closeout happened unless the repo and the remote state prove it.
- If a task asks for direct `main` work, use it only for that task and keep the proof explicit.

## Readiness

- A task is not ready just because files changed.
- Before claiming ready, verify the expected docs, mesh, and validation state for the slice you touched.
- During implementation, run the smallest focused test slice that proves the current change or repair. The normal loop is: commit; if the hook fails, fix every independent failure it reports, run only the narrow proofs for those repairs, and commit again; when the hook succeeds, push. Do not insert a separate broad verification phase into that loop.
- The tracked hook owns the complete local gate for the commit candidate and reports the full independent failure set in one run. Only checks blocked by a failed dependency may be skipped. Do not run the complete canonical gate immediately before a commit that will run it anyway, repeat it immediately after a successful hooked commit, or bypass the hook.
- A successful normal commit is the local canonical proof for that commit. Hosted CI should confirm the same green state after push rather than act as the first place predictable failures are discovered.
- Do not present a stale plan, stale README, or stale AGENTS pointer as current truth.

## Clean finish

- End with a clean working tree unless the task explicitly leaves a tracked draft behind.
- Report the exact files changed and the exact validation run.
- If cleanup is part of the task, perform it explicitly and verify it.

## Local completion gate

The repo is ready for normal website implementation only when:

- `.agents/runbooks/` is the canonical lifecycle-runbook home and `.agents/playbooks/` is the canonical topical-workflow home;
- no stale `.agents/docs/guides/` routing or compatibility tree remains;
- all active doctrine is routed and all authored links resolve;
- local-only and generated custody boundaries are validated;
- the marketplace gitlink is current and does not receive mesh output;
- refresh and mesh check modes are churn-free;
- the platform-appropriate preflight and tests pass;
- the final PR body and validation evidence are honest.
