# Pull Request Runbook

Use this runbook for Portfolio pull-request workflow and publication proof.

## When

- Preparing a task branch for GitHub review.
- Opening, updating, or publishing a pull request.
- Establishing remote publication proof for repository work.

## Required capabilities

- Commit and publish a completed branch as a draft pull request and verify its exact remote head and checks.
- Inspect GitHub pull-request state and report publication evidence accurately.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

None.

## Composition

1. Verify the task branch and worktree state against current repository policy, then follow the routed portable publication and review skills.
2. Commit normally; let the tracked pre-commit hook prove the exact staged tree once.
3. Push the focused branch and open or update a draft PR into `main` unless current human authority says otherwise.
4. Before fully reviewable handoff, promote enduring content, retain completed artifacts through the PR that completes them, and verify the published head contains them. Markers can aid discovery but do not establish completion; assess retirement from current evidence in a later substantive slice.
5. Verify hosted checks and remote head state before publication claims. Human-owned Ready and merge actions remain PR state, not unfinished agent plan work.

## Doctrine and contracts

- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for branch, draft, readiness, CI, and publication rules.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) for local proof.
- Root `AGENTS.md` for repository-wide publication authority.

## Local commands and paths

- PR template: `.github/pull_request_template.md`.
- Canonical local gate: the tracked pre-commit hook runs the separately named repository checks, validation, Python, Vitest, build, and Playwright suites against the staged snapshot. Hosted CI exposes those suites as individual steps.
- Hosted quality gate: `Portfolio / Portfolio quality gate`.
- Public deployment proof: `Portfolio / Verify public routes`.

## PR instructions

- Open pull requests as drafts by default and keep them draft while iterating.
- A substantially complete, fully reviewable Draft is a completed agent handoff; all agent-owned plan items are complete unless the Draft is explicitly declared incomplete.
- Do not move a PR out of draft until self-review and required local validation are complete; changing Ready state remains human-owned unless explicitly delegated.
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

- [Article writing](../playbooks/article-writing.md) - when publishing a proved public article or writing-system change.
