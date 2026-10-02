# Repository Plugin and Skill Custody Policy

Status: active policy
Owner: Portfolio repository
Scope: repository plugin dependencies and Portfolio-authored skills
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: repository source-custody capabilities available in the current agent runtime

Use this policy when changing the native plugin declarations or authored skill tree.

## Source and generated custody

- `.agents/plugins/marketplace.json`, `.codex/config.toml`, and `.devin/config.json` declare and bind repository plugin dependencies for supported harnesses.
- Dependencies use Git repositories and plugin-relative paths. `ref = "main"` opts a plugin payload into that source branch. The AOM standard definitions in `.agents/contracts/operating-standards.json` use separate immutable commit pins.
- `.agents/skills/` contains Portfolio-authored skills only. The skill directory and frontmatter name identify each source. There is no required installed-skill inventory or copied plugin skill projection.
- Codex and Devin configuration declares intended dependencies. Access, trust, authentication, and runtime availability depend on the harness and host and are verified separately.
- Portfolio code and tests must not import executable implementation from `.agents/skills/` or a user-level skill cache.
- Ambient workflow plugins are independent of these repository plugin dependencies and AOM standard selections.
- `tools/check_plugin_subscriptions.py` validates declaration shape and harness bindings. It does not prove that a fresh clone can install or run the plugins.
- `tools/check_local_skills.py` validates authored skill names and any checked-in Codex wrappers. Agents changing an authored skill preserve the full local frontmatter and wrapper contracts.
