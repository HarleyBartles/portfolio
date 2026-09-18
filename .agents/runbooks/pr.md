# Pull Request Runbook

Use this runbook for Portfolio pull-request workflow and publication proof.

## When

- Preparing a task branch for GitHub review.
- Opening, updating, or publishing a pull request.
- Establishing remote publication proof for repository work.

## Required skills

- `using-superpowers-plus` for routing.
- `repo-worker-base` for worktree, branch, validation, and publication boundaries.
- `publishing-source` for the commit/push/publication decision.
- `using-github-mcp` for hosted PR and remote-check evidence.
- `verification-before-completion` before a green or ready claim.

## Composition

1. Verify the task branch and worktree state against current repository policy.
2. Commit normally; let the tracked pre-commit hook prove the exact staged tree once.
3. Push the focused branch and open or update a draft PR into `main` unless current human authority says otherwise.
4. Move out of draft only after self-review and required local proof are complete.
5. Verify hosted checks and remote head state before publication claims.

## Doctrine and contracts

- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for branch, draft, readiness, CI, and publication rules.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) for local proof.
- Root `AGENTS.md` for repository-wide publication authority.

## Local commands and paths

- PR template: `.github/pull_request_template.md`.
- Canonical complete local gate: `py -3 tools/run.py ci --check`, normally run by the tracked pre-commit hook.
- Hosted quality gate: `Portfolio / Portfolio quality gate`.
- Public deployment proof: `Portfolio / Verify public routes`.

## PR instructions

- Open pull requests as drafts by default and keep them draft while iterating.
- Do not move a PR out of draft until self-review and required local validation are complete.
- Preserve applicable prompts in `.github/pull_request_template.md` rather than deleting evidence fields.

## Publication proof

- Publication requires GitHub-visible evidence: a verified PR URL and head SHA, or an explicitly authorized direct-main commit.
- Local files, local commits, and local validation alone are not publication proof.

## Evidence contract

- A repo-work completion return includes a verified PR URL and head SHA, an explicitly authorized direct-main commit, or a concrete publication blocker.
- Hosted check state is verified from GitHub rather than inferred from local success.
- The working tree and published branch state agree with the completion claim.

## Prohibited combinations

- Do not merge unless explicitly authorized by the human owner.
- Do not bypass the tracked hook or weaken draft-aware CI.
- Do not treat local files, a local commit hash, or a worker report as publication proof.

## Playbook routing

None.
