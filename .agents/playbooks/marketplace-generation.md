# Repository Plugin Subscription Playbook

Use this playbook when changing the repository plugin catalog or its native harness bindings.

## When

- Adding, removing, or changing a repository plugin dependency.
- Updating Codex or Devin repository-level plugin bindings.

## Required capabilities

- Keep declared dependencies consistent across the repository catalog and supported harnesses.
- Distinguish dependency declaration from authentication, trust, installation, and runtime availability.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

None.

## Composition

1. Confirm the plugin source repository, plugin-relative path, and update policy.
2. Update `.agents/plugins/marketplace.json` and native `.codex/config.toml` and `.devin/config.json` bindings together.
3. Keep `.agents/skills/` for Portfolio-authored skills; do not add installed plugin skill projections.
4. Run the local declaration and authored-skill checks, then update routed guidance when ownership or paths change.
5. Verify runtime discovery separately in each harness when the change requires availability evidence.

## Doctrine and contracts

- [`../doctrine/marketplace-custody-policy.md`](../doctrine/marketplace-custody-policy.md) for dependency and authored-skill custody.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for publication requirements.
- [`../doctrine/surface-classification-policy.md`](../doctrine/surface-classification-policy.md) for authored surfaces.

## Local commands and paths

- Plugin catalog: `.agents/plugins/marketplace.json`.
- Codex binding: `.codex/config.toml`.
- Devin binding: `.devin/config.json`.
- Declaration check: `py -3 tools/check_plugin_subscriptions.py`.
- Authored skills check: `py -3 tools/check_local_skills.py`.

## Evidence contract

- The catalog and native bindings describe the same dependencies.
- Local checks establish structure only; report runtime availability from actual harness evidence.
- AOM standard pins in `.agents/contracts/operating-standards.json` remain independent of plugin payload refs.

## Prohibited combinations

- Do not store installed plugin skills or submodule-sourced projections in `.agents/skills/`.
- Do not claim installation or runtime access from declaration checks.
- Do not tie AOM standard updates to plugin payload updates.

## Runbook routing

None.
