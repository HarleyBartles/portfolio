# AOM Self-Certification Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Portfolio's deployed AOM v1 machinery with explicit v2 standard subscriptions, honest repository-owned certification, and native plugin dependencies, removing unnecessary copied tooling without weakening useful validation.

**Architecture:** Standards become immutable definition references with semantic certification. Portfolio owns its compliance checks and staged-tree hook. Native Codex and Devin Git plugin declarations replace checked-in plugin skill projections; neither CI nor repository tooling depends on an ambient plugin installation.

**Tech Stack:** Python 3.11+, JSON, TOML, Markdown, Git, Bash hook, GitHub Actions, existing React/Vite/Vitest/Playwright gates.

**Spec:** The user's request in this session to assess current subscriptions, remove unnecessary AOM files, and migrate to the updated self-cert subscription model. Definition authority is the published Marketplace commit identified below. Local planning guide: `../runbooks/planning.md`.

**Execution Strategy:** `executing-plans`. Subscription records, hook dispatch, local checks, and source removal form one sequential cutover with shared candidate-tree state; implement inline and obtain a fresh whole-branch review.

## Investigation and authority

Portfolio base: `602de10`, refreshed from remote main on 2026-10-02. Worktree: `Z:/_agent-worktrees/portfolio/codex/aom-self-cert-migration`, branch `codex/aom-self-cert-migration`. Baseline: `py -3 tools/run.py python-tests --check`, 80 tests passed.

Current AOM authority: `https://github.com/HarleyBartles/agent-asset-marketplace.git`, commit `ae148c5c7f7b86d759b1d0db6e837abf23cbcb9f`. `.agents/contracts/operating-standards.json` is v1 and selects ten standards. `.agents/standards/references/operating-standards-catalog.json` and `.agents/standards/provenance.json` describe its deployed resources. The 42 tracked files under `.agents/standards/` include scaffolders, duplicate contract modules, templates, a formatter, catalogs, and a dispatcher.

Upgrade authority: the same source repository at published main commit `b481f98ae90aa45e5271d10fe1f7aaeb6c7047aa`, verified with `git ls-remote origin refs/heads/main`. Use `git show <commit>:<path>` from a checkout whose origin matches that repository. The source lives at `Z:/agent-asset-marketplace` in this environment; that local path is a convenience, not authority. Do not silently substitute a later main or an installed plugin snapshot.

Read `skills/repo-standards/references/adoption-and-certification.md`, `subscriptions.schema.json`, and every selected definition at that exact commit before implementation. The new catalog has no `marketplace-skill-management`, `markdown-formatting`, or `root-gitignore-hygiene`. Absence does not invalidate historical subscriptions: retiring or replacing these selections is an explicit part of this migration.

| Current selection | Migration decision | New definition path |
| --- | --- | --- |
| marketplace-skill-management | Replace with repo-plugin-subscriptions | skills/repo-agent-assets/references/standard.md |
| root-agent-router | Upgrade; provide local budget checker and semantic review | skills/agents-routing/references/standard.md |
| runbook-composition | Upgrade; preserve useful lifecycle guides | skills/runbook-composition/references/standard.md |
| playbook-composition | Upgrade; preserve useful concern guides | skills/playbook-composition/references/standard.md |
| tracked-validation-hook | Upgrade; preserve complete staged-candidate gate and hosted parity | skills/tracked-repo-hooks/references/standard.md |
| review-entrypoint | Upgrade; preserve root REVIEW.md | skills/review-entrypoint/references/standard.md |
| contribution-entrypoint | Upgrade; preserve root CONTRIBUTING.md | skills/contribution-entrypoint/references/standard.md |
| completed-artifact-custody | Upgrade; semantic classification replaces marker-only discovery | skills/completed-artifact-custody/references/standard.md |
| markdown-formatting | Retire AOM subscription; retain useful local writing and normalization rules | No current AOM replacement |
| root-gitignore-hygiene | Retire subscription and obsolete one-off SDD migration check, with no replacement | No current AOM replacement |

Do not adopt command-bus, agent-doctrine-contracts, or unslop merely because Portfolio has corresponding surfaces. Preserve local policies independently. The user clarified that the gitignore rule protects an already completed migration: remove that check entirely, rather than reproducing it as local compliance. Ordinary useful ignore entries remain. Markdown formatting is a linter choice made on its own merits, not a standard obligation; remove the inactive payload and add no new linter in this slice.

Plugin declarations currently select frontend-pack and language-patterns-pack using historical GitHub source records. Their eight projected skills are feature-sliced-design, frontend-ux, playwright-testing, python-frameworks, react, typescript, wcag, and web-styling. Twelve remaining skills are Portfolio-owned, as recorded in the current manifest and provenance. The reader-panel prototype was already retired on current main; do not restore it from session skill availability.

## Global constraints

- No website content, UI, imagery, asset ledgers, package upgrades, or unrelated editorial work.
- Keep all twelve Portfolio-authored skills intact. Remove only proven plugin projections and obsolete projection metadata.
- Keep AOM and Superpowers+ as ambient workflow capabilities; do not add repository subscriptions to either plugin. AOM standard definition pins are separate from plugin payload updates.
- Maintain Codex and Devin dependency declarations for the same two existing plugin packs. Describe installation/access prerequisites separately from declaration validity.
- No scaffolder deployment, new universal installer, full AOM runtime copy, or fallback plugin copies in `.agents/skills/`.
- Preserve staged-tree materialization, unrelated unstaged work, source guards until their source is removed, generation checks, diagnostic suite independence, and Linux/Windows parity.
- Repository-generated paths must never include authored plugin declarations, authored skills, subscriptions, or certification.
- No tautological tests or path-only change-detector tests. Extend behavior tests only for real gaps introduced by the cutover.
- Follow existing normalization and no arbitrary Markdown wrapping. Do not add a formatter merely because a historical subscription deployed one; the live tree has no `.agents/contracts/markdown-formatting.json` or `.mdformat.toml`.
- Do not bypass the commit hook or run a complete aggregate immediately before or after a normal hooked commit.
- This plan requires review before implementation. No migration or certification success is claimed by its creation.

## Review focus

- A candidate with malformed subscriptions, unresolved certification anchors, invalid Git selectors, or missing required local checks fails clearly; declarations alone never set certification success.
- Hook commands and generated ownership come from the staged candidate; unstaged fixes or ignored artifacts cannot make a bad candidate pass.
- Removing copied infrastructure retains router budget checks, relevant guide links, local skill metadata behavior, artifact custody, and complete suite dispatch without importing the user cache. The obsolete one-off gitignore check is deliberately retired.
- Plugin declaration checks cannot claim installation or availability; test actual Codex discovery separately, and disclose untested Devin runtime behavior.

### Task 1: Establish repository-owned compliance and remove deployment dependencies

**Files:** Create `tools/check_agent_guidance.py`, `tools/check_operating_standards.py`, `tools/check_plugin_subscriptions.py`, and `tools/check_local_skills.py`; modify `tools/run.py`, `.agents/contracts/repo-standards-commands.json`, `githooks/pre-commit`, `tests/test_run.py`, `tests/test_run_suites.py`, `tests/test_precommit_hook.py`, `tests/test_local_skill_metadata.py`; add behavior tests for the new validators where genuine coverage is missing. Modify `.agents/contracts/skill-frontmatter.md` and `.agents/contracts/openai-agent-yaml.md` to carry the actual local obligations and immutable external attribution without a submodule link.

**Consumes:** Current v1 definitions, deployed check behavior, local doctrine, existing staged-candidate hook tests, and new pinned definitions.

**Produces:** Local read-only compliance checks and an adapted hook/runner which can validate the final v2 tree without `.agents/standards/` or Marketplace executable imports.

- [x] Resolve the old catalog's checks and classify each as a useful repository invariant, obsolete deployment bookkeeping, or optional scaffold behavior. Preserve useful checks; avoid translating fixed book inventories into new requirements. Deliberately drop the gitignore checker for the long-completed SDD migration.
- [x] Inspect eligible predecessor artifacts against current source and delivery evidence using the current pinned lifecycle. Retire only proven complete artifacts and stale links in the first substantive migration commit; preserve active editorial and Portfolio roadmap work. Candidates include `retire-reader-panel-prototype.md` and `2026-09-29-marketplace-link-repair.md`; markers are clues, not proof.
- [x] Implement the four focused local checks. Guidance checks cover repository-defined router budgets and live owned links; plugin checks cover native dependency syntax/bindings; standards checks cover v2 source/commit/path records and discoverable certification anchors without claiming semantic compliance; local-skill checks preserve the existing frontmatter/wrapper requirements and changed-skill adoption policy.
- [x] Choose router budgets from live router size and current policy, record them in `.agents/doctrine/agent-guidance-policy.md`, and test a real over-budget router plus invalid local links. Do not import the whole legacy document-contract module.
- [x] Replace `_repo_standards_cmd` dispatch with the local check chain. Remove `refresh-skills`, its `skills` compatibility alias, and the temporary vendor-profile bridge. Make `ci --apply` regenerate only actual owned mechanical content/route/SEO surfaces; no standards installation or skill refresh remains.
- [x] Keep `.agents/contracts/repo-standards-commands.json` as repository-owned hook configuration if the live hook needs it, not as an AOM obligation. Restrict `generated_paths` to content manifest, route metadata, robots, and sitemap. Preserve suite names, dependency reporting, and hosted-step behavior.
- [x] Make the hook self-contained through local Python modules. Retain its staged-candidate behavior and complete suite coverage; remove submodule guards only in the same cutover that removes the gitlink. Do not copy a new optional hook over the tested local implementation.
- [x] Exercise meaningful validator failures, candidate versus unstaged configuration, unrelated unstaged restoration, apply ownership, and independent failure reporting. Reuse the existing hook tests and update obsolete dispatcher assertions to observable behavior.
- [x] Focused proof: `py -3 -m unittest tests.test_run tests.test_run_suites tests.test_precommit_hook tests.test_local_skill_metadata -v`, plus the newly created validator behavior tests.

This task is an ordered part of one migration commit with Task 2. The temporary edit state may contain both old authority and new check code. Do not commit an incompatible intermediate subscription/dispatcher state.

### Task 2: Cut over subscriptions, certification, plugins, and custody together

**Files:** Modify `.agents/contracts/operating-standards.json`, `.agents/plugins/marketplace.json`, `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `REVIEW.md`, `.github/workflows/ci.yml`, `.agents/doctrine/{marketplace-custody-policy,artifact-policy,surface-classification-policy,workflow-policy,validation-policy,agent-guidance-policy,completed-artifacts}.md`, `.agents/runbooks/{planning,implementing,pr,code-review}.md`, `.agents/playbooks/code-style.md`, and affected `.devin/rules/` routes. Create `.agents/contracts/standards-certification.md`, `.codex/config.toml`, and `.devin/config.json`. Remove `.agents/standards/`, `.agents/skills/.provenance.json`, the eight identified projected skill directories, `.agents/plugins/marketplace-source` gitlink, and its `.gitmodules` entry.

**Consumes:** Task 1's local checks and hook seams, pinned new definitions, existing two plugin selections, authored skills and guidance.

**Produces:** Eight explicit v2 standard subscriptions, evidence-backed semantic certification, native Git dependency records, and a tree free of legacy deployment/projection dependencies.

- [x] Update each selected record to `source.repository`, full `source.commit`, exact `source.definition`, and a certification anchor using the v2 schema. Keep the original pin authoritative until implementation and assessment support the new pin; change subscription and certification together in the final candidate.
- [x] Certify each pledge separately with implementation locations, invariants, mechanical evidence, semantic assessment, drift controls, and honest gaps. Never equate checker success with certification. Resolve gaps before marking a pledge certified; partial evidence remains explicitly partial.
- [x] Preserve the frontend-pack and language-patterns-pack dependencies using native `git-subdir` records from `https://github.com/HarleyBartles/agent-asset-marketplace.git`, `dist/plugins/<name>`, `ref: main`. Remove `repo.local_skills`. Register `[marketplaces.portfolio]` with Git source `https://github.com/HarleyBartles/portfolio.git` and `ref = "main"`; enable both `<plugin>@portfolio` entries. Bind matching Devin Git dependencies through native `.devin/config.json`, as used by the pinned AOM example checker; do not invent a `.agents/plugins/devin.json` indirection.
- [x] Inspect and preserve existing supported-harness configuration before creating files. Preserve unrelated user/repository configuration. Adapt pinned examples, not placeholder repositories.
- [x] Delete only the eight plugin-owned projections identified above, then delete all 42 deployed-standard files and projection provenance. Move no scaffolders or templates into `tools/` under another name.
- [x] Remove the Marketplace gitlink after replacing the local metadata test's executable import and both local contract links. Preserve immutable attribution by linking the exact upstream commit where useful. Do not update the gitlink merely to run new tooling.
- [x] Update root AGENTS routing to subscriptions and certification; put detailed commands in the owning guidance rather than enlarging the root. Fix current instructions describing generated skills, deployment provenance, compulsory inventories, and refresh commands. Update artifact custody to semantic discovery while preserving next-slice timing and live work.
- [x] Retain useful ordinary ignore entries and writing rules. Remove the obsolete SDD migration check entirely. Remove inactive formatter payload and old subscription instead of installing a new toolchain; add a Markdown linter only in a later task justified by actual formatting needs. Adjust CI submodule setup to the actual resulting repository state while preserving Windows/Linux checks.
- [x] Focused proof: `py -3 tools/run.py repo-checks --check`, `py -3 tools/run.py repository-validation --check`, and `py -3 tools/run.py python-tests --check`. Repeat read-only checks and `git status --short` to prove no generation churn. Inspect `git diff --stat`, deletion ownership, and active references for the retired paths.
- [x] Stage Tasks 1 and 2 together and commit normally. The tracked hook owns the full staged candidate gate; repair independent failures with narrow proofs and retry without bypassing it.

### Task 3: Review, verify native discovery, and publish the migration

**Files:** This plan's status/evidence and any necessary review fixes; PR description supplied from an off-repo body file.

**Consumes:** The green migration commit, actual native dependency declarations, certification, and full diff.

**Produces:** A reviewable Draft PR with exact validation evidence and accurately bounded runtime claims.

- [ ] Invoke the repository review entrypoint and `/requesting-code-review` for fresh whole-branch review of the source removals, semantic certification, hook parity, and preservation of owned skills. Fix findings, then obtain fresh review after corrections.
- [ ] Inspect `codex plugin marketplace upgrade --help` before field-testing the catalog. For pre-merge discovery, use a temporary CLI override pointing `[marketplaces.portfolio].ref` at this branch; preserve committed `main`. Verify actual plugin discovery and update behavior. Report a real access/trust/runtime blocker if it occurs; do not claim installation from a structural check.
- [ ] Check Devin declaration structure against its supported native format and clearly state whether runtime installation was exercised. Do not add projected skills to compensate for an unavailable client.
- [ ] Record actual evidence and mark this plan complete only when agent-owned implementation, review, validation, and publication have finished. Retain it through the completing PR.
- [ ] Make any final normal hooked commit, push, and create a Draft PR following `.agents/runbooks/pr.md`. Attach the PR to this chat and verify remote head. Report draft CI skip/pending states as observed; current workflows intentionally skip quality/visual jobs for Draft PRs, so do not describe that as hosted success.
- [ ] Leave the review worktree available. Ready, merge, and merged-worktree retirement are outside this handoff.
