# Code Style Playbook

Use this playbook for Portfolio code conventions and for composing language/framework expertise with the repository's coding doctrine.

## When

- Writing or reviewing React, TypeScript, JavaScript, Python, styling, or technical prose.
- Making structural component changes where repository architecture invariants apply.

## Required capabilities

- Choose and review maintainable React, TypeScript, Python, and web styling patterns for the affected code.
- Select behavior-focused tests before implementation when a change needs executable protection.
- Write concise, clear technical prose for human readers.

## Optional capabilities

None.

## Required repository-owned skills

None.

## Optional repository-owned skills

None.

## Composition

1. Read the coding doctrine before making structural decisions.
2. Invoke only the language/framework capabilities relevant to the changed surface.
3. Follow established local code patterns unless the task explicitly changes them.
4. Use the [testing playbook](testing.md) when behavior or validation is in scope.

## Doctrine and contracts

- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) is the authority for code scope and architecture, including React vertical-slice ownership. Do not duplicate those invariants here.
- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) constrains validation expectations.

## Local commands and paths

- Inspect the language-specific project files before changing code, for example `src/client/package.json`, `src/client/tsconfig*.json`, or `tools/run.py`.
- In React, TypeScript, JavaScript, and Node scripts, prefer named `const` arrow functions over function declarations, including exports, unless declaration-specific semantics are required.
- Keep documentation and authored routing surfaces current after structural changes.

## Evidence contract

- Code follows the applicable repository doctrine and the relevant language/framework skill.
- Architectural changes preserve vertical-slice ownership rather than relying on cross-boundary styling escape hatches.
- Behavior-changing work has focused executable proof at the appropriate test layer.
- Technical prose is clear and routes readers to the authoritative surface rather than duplicating policy.

## Prohibited combinations

- Do not restate durable architecture invariants in this playbook.
- Do not use `className`, selector reach-through, raw descendant geometry props, or hidden cross-boundary CSS variables to bypass the component ownership doctrine.
- Do not use language/framework capability guidance to override Portfolio doctrine.

## Runbook routing

- [Implementation](../runbooks/implementing.md) - routes here whenever code or technical prose changes during implementation.
- [Code review](../runbooks/code-review.md) - routes here whenever code structure or technical prose is under review.
