# Code style runbook

Use this runbook for code and writing conventions in the portfolio repo.

## Read first

- `.agents/doctrine/coding-discipline.md` for scope and architecture direction.
- The language-specific files you are touching, for example `src/client/package.json` or `tools/run.py`.

## Conventions

- Follow the existing Python, React, TypeScript, Vite, and SCSS patterns that apply to the files you change.
- In React, TypeScript, JavaScript, and Node scripts, prefer named `const` arrow functions over function declarations, including exports: `export const Name = (...) => { ... }` rather than `export function Name(...) { ... }`. Use a function declaration only when declaration-specific semantics are required.
- Keep documentation clear and routing surfaces up to date.
- Regenerate `INDEX.md` files after any structural change.
- Use focused checks while editing. Let the tracked pre-commit hook run the complete `py -3 tools/run.py ci --check` gate once when the staged change is ready.
- Avoid new speculative abstractions; keep the repository simple and easy to navigate.

## See also

- `.agents/runbooks/implementing.md` for the implementation workflow.
