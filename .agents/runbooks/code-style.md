# Code style runbook

Use this runbook for code and writing conventions in the portfolio repo.

## Read first

- `.agents/doctrine/coding-discipline.md` for scope and architecture direction.
- The language-specific files you are touching, e.g. `src/client/package.json`, `src/server/Portfolio.Server.csproj`.

## Conventions

- Follow the existing `.NET`, `ASP.NET Core`, `React`, `TypeScript`, and `Vite` patterns.
- Keep documentation clear and routing surfaces up to date.
- Regenerate `INDEX.md` files after any structural change.
- Use `py -3 tools/run.py ci --check` as the canonical pre-commit validation.
- Avoid new speculative abstractions; keep the repository simple and easy to navigate.

## See also

- `.agents/runbooks/implementing.md` for the implementation workflow.
