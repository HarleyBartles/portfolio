## Why it exists

Agent Asset Marketplace packages reusable agent skills as installable Codex plugins. It turns operational knowledge into inspectable assets with clear scope, authority, and verification—not one-off prompts copied between chats.

## My role

I maintain the marketplace structure, package skills, define custody boundaries, and keep the public inventory mechanically verifiable.

## What works now

The marketplace currently offers 17 plugins with 74 bundled skill entries and 70 unique skill names. Every skill has a `SKILL.md`, authority references, verification guidance, and a defined boundary for when it should and should not be used.

Canonical vendored assets live under `codex-marketplace/plugins/`; `codex-marketplace/plugin-roots.json` records plugin roots and `codex-marketplace/manifest.json` provides the aggregate inventory.

## Decisions and trade-offs

The repository also installs the plugins it consumes for its own operation. Those copies live under `.agents/skills/` and are not counted as marketplace inventory. Keeping installed copies distinct from vendored source prevents a convenient local state from becoming a false publication claim.

Some skills appear in more than one bundle, so total entries and unique names are reported separately rather than compressed into one flattering number.

## What remains

The valuable work is continued curation: making package boundaries clearer, verification stronger, and discovery easier without allowing the catalogue to become accumulation for its own sake.

## Inspect the work

[Public repository](https://github.com/HarleyBartles/agent-asset-marketplace)
