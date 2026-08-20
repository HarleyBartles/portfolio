Agent Asset Marketplace is a public repository where I keep agent skills packaged as Codex plugins. The actual repo name is `agent-asset-marketplace`; the `codex-marketplace/` tree inside it holds the vendored plugin bundles.

The marketplace currently offers 17 plugins with 74 bundled skill entries. Some skills appear in more than one plugin - `feature-sliced-design`, `release-engineering`, `risk-gates`, and `unslop-profiles` are each vendored by two different bundles - so the count of unique skill names is 70. The skills are not one-off prompts; each one has a SKILL.md, authority references, a verification section, and a clear scope of when to use it and when not to use it.

The repo also installs copies of the plugins it consumes for its own operation, currently `repo-worker-pack`, `superpowers-plus`, and `mcp-usage-pack`. Those installed copies live under `.agents/skills/` and are not additional marketplace inventory. The canonical vendored assets are under `codex-marketplace/plugins/`, with the plugin root list in `codex-marketplace/plugin-roots.json` and the aggregate manifest in `codex-marketplace/manifest.json`.

The repository is public: [github.com/HarleyBartles/agent-asset-marketplace](https://github.com/HarleyBartles/agent-asset-marketplace).
