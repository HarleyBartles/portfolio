# AOM Standard Certification

Portfolio self-certifies the selected Agent Operating Model standards below. Each entry records implementation, preservation obligations, drift controls, and the boundary between automated evidence and human judgment. Passing local checks proves only their stated mechanics.

## repo-plugin-subscriptions

**Implementation:** `.agents/plugins/marketplace.json`, `.codex/config.toml`, `.devin/config.json`, and `.agents/skills/`.

**Preserve:** Codex and Devin declare the same two Git subdirectory plugins, frontend-pack and language-patterns-pack, from the Marketplace repository. The twelve skills under `.agents/skills/` remain Portfolio-authored. AOM standard pins remain independent immutable commits.

**Drift control:** `tools/check_plugin_subscriptions.py` validates dependency source/path/ref shape and matching Codex and Devin bindings; `tools/check_local_skills.py` validates local skill names, nonblank `Use when` trigger descriptions, and any wrappers. The tracked pre-commit hook and hosted CI run these checks. The remaining twelve tracked skill directories were assessed as Portfolio-maintained sources; the removed eight projections are absent.

**Evidence boundary:** These checks establish declaration structure and skill metadata shape, not skill authorship, access, trust, authentication, installation, or runtime availability. Skill ownership is a repository custody assessment. Codex discovery and update behavior are verified separately against the published task branch before publication; Devin runtime installation is not exercised in this environment.

## root-agent-router

**Implementation:** `AGENTS.md` routes repository purpose, policy, validation, subscriptions, and certification. Scoped routers remain in their owned directories.

**Preserve:** Root remains a concise route to current human and agent guidance. Local relative links resolve, and applicable policy is read before making changes.

**Drift control:** `tools/check_agent_guidance.py` checks an 80-line root budget, 32-line scoped-router budget, and local links in all tracked `AGENTS.md` routers. The same checker runs in the tracked hook and hosted CI.

**Evidence boundary:** The checker establishes only budgets and resolvable links. Human review decides whether destinations are authoritative, complete, and useful for the task.

## runbook-composition

**Implementation:** `.agents/runbooks/` owns lifecycle guides; `.agents/doctrine/repo-runbook-policy.md` states the local composition boundary.

**Preserve:** Guides compose lifecycle work with local policy and route to applicable topic playbooks. No fixed upstream inventory is imposed on this repository.

**Drift control:** Root and scoped routers link to active guidance and are checked for local link integrity. Repository validation and the PR review assess references and applicability.

**Evidence boundary:** Automated link checks cannot determine whether guidance is semantically current, non-duplicative, or sufficient.

## playbook-composition

**Implementation:** `.agents/playbooks/` owns topical procedures; runbooks link relevant playbooks.

**Preserve:** Playbooks address recurring concerns and remain independently discoverable. No optional or required upstream playbook inventory is copied into Portfolio policy.

**Drift control:** Authored routing is maintained with moved or added guidance; router links are checked by `tools/check_agent_guidance.py`, and cross-document routes are assessed during review.

**Evidence boundary:** Link integrity is mechanical. Whether a topical guide remains useful and correctly scoped requires human review.

## tracked-validation-hook

**Implementation:** `githooks/pre-commit`, `.agents/contracts/repo-standards-commands.json`, `tools/run.py`, and `.github/workflows/ci.yml`.

**Preserve:** The hook validates the staged candidate, applies only declared generated content/route/SEO projections, reports independent suite failures, and runs the complete repository checks. Hosted CI exposes corresponding checks as separate steps on Linux and Windows.

**Drift control:** Hook behavior is exercised by `tests/test_precommit_hook.py`, runner behavior by `tests/test_run.py` and `tests/test_run_suites.py`; the normal commit hook is the complete staged-tree gate.

**Evidence boundary:** Local behavior tests prove candidate materialization and dispatch contracts. This migration's normal hooked commit is the complete local proof; hosted CI state is reported from GitHub after publication.

## review-entrypoint

**Implementation:** `REVIEW.md`, `.agents/runbooks/code-review.md`, and `.devin/rules/agents-review.md`.

**Preserve:** Review starts from the repository entrypoint, follows the current review runbook, and bases findings on the actual changed surface and validation evidence.

**Drift control:** Root guidance links to review instructions; local router links are checked. Pull requests retain repository review prompts.

**Evidence boundary:** Link checks do not establish review quality. A fresh whole-branch review is required for this migration.

## contribution-entrypoint

**Implementation:** `CONTRIBUTING.md`, `README.md`, `AGENTS.md`, and `.agents/runbooks/`.

**Preserve:** Contributors can find setup, lifecycle guidance, relevant checks, and the pull request process from the human or agent entrypoint without duplicating policy.

**Drift control:** Entrypoints route to current repository guidance; root router links are checked, and contribution changes receive human review.

**Evidence boundary:** Link checks establish only destination existence. Clarity and task coverage are assessed by review.

## completed-artifact-custody

**Implementation:** `.agents/doctrine/completed-artifacts.md`, `.agents/doctrine/artifact-policy.md`, `.agents/runbooks/planning.md`, and `.agents/runbooks/pr.md`.

**Preserve:** Classify completion from current source, delivery, and successor-use evidence. Keep completed artifacts through their completing PR; retire eligible artifacts in the first commit of a later substantive slice after promoting durable decisions. Markers may aid discovery but are not required or sufficient proof. Preserve active plans and roadmap work.

**Drift control:** Planning and publication runbooks route completion work to the doctrine. Review checks custody against live source and delivery evidence.

**Evidence boundary:** No automated marker or link test proves completion. The owner assesses artifact-specific evidence and human review checks the retirement decision.
