# Scripts

This directory contains deterministic tooling for the portfolio repository.

## Tool Catalog

### `generate_index_mesh.py` / `generate_index_mesh.ps1`

**Use when** you have added, removed, renamed, or moved tracked files or directories and need to regenerate the repo-wide `INDEX.md` mesh.

- `python scripts/generate_index_mesh.py` - regenerate the whole `INDEX.md` mesh
- `python scripts/generate_index_mesh.py --check` - validate the mesh without writing
- `.\scripts\generate_index_mesh.ps1` - PowerShell wrapper with the same `-Check` flag

The generator owns every tracked `INDEX.md` file in the repo. It respects `.gitignore`, skips excluded directories, and writes deterministic navigation pages that show child directories and files.

**Use after** structural changes that affect navigation or any new surface that should be discoverable through `INDEX.md`.

## Conventions

- Keep scripts deterministic.
- Prefer a thin PowerShell wrapper over duplicating logic in two languages.
- If a script has a check mode, the check mode should match the write mode as closely as possible without mutating files.
