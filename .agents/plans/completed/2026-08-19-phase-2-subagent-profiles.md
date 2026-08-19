# Phase 2 - Subagent profiles

## Goal

Land four repo-local Devin Desktop subagent profiles under `.agents/agents/`: `design-researcher`, `taste-reviewer`, `design-token-auditor`, and `motion-reviewer`.

## Deliverables

- `.agents/agents/design-researcher.md`
- `.agents/agents/taste-reviewer.md`
- `.agents/agents/design-token-auditor.md`
- `.agents/agents/motion-reviewer.md`
- Updated `roadmap.md` reflecting execution.
- Regenerated index mesh and passing `ci --check`.

## Execution

1. Scaffold the four `.agents/agents/` profile files with `runtime: devin-desktop` frontmatter, `name` matching the filename, `description`, `model`, and usage instructions.
2. Run `py -3 tools/run.py ci --apply` to generate `INDEX.md` surfaces.
3. Verify with `py -3 tools/run.py ci --check`.
4. Commit and merge.
