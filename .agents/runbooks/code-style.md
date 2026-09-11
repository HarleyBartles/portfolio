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

## React vertical-slice components

- Treat a vertical-slice component as an opaque compositional object at its parent boundary. The parent owns the whole child's position, size, scale, rotation, and z-order; the child owns the position, size, scale, and relationships of everything inside its own boundary.
- Express normal parent-owned composition with parent-owned wrapper elements. Do not use `styled(ChildComponent)` or caller-supplied CSS selectors to reach across a vertical-slice boundary.
- Do not expose or forward `className` as part of a vertical-slice component's caller-facing props. It is an untyped styling escape hatch that allows external CSS to control the component.
- A vertical-slice component may expose the standard `style?: React.CSSProperties` prop as an exceptional root-only override. Apply it only to the component's root element; do not interpret it as a bag of instructions for descendants and do not use it instead of normal parent-owned composition.
- Express supported content, behaviour, or presentation choices as semantically named typed props, such as a finite string union. The child owns how a semantic choice affects its internals. Do not expose raw coordinate, scale, or descendant-style props merely so a parent can position internal elements.
- Ambient presentation or theme CSS custom properties are allowed. Do not use cross-boundary CSS custom properties as hidden APIs for controlling a child's internal geometry or behaviour.
- Keep tests aligned with the same ownership boundary: one vertical-slice component has one colocated `<Component>.test.tsx` file that proves that component's own contract. Do not replace these with a catch-all component test file, and do not make a parent compositor test responsible for child internals.
- Keep responsive relationship and geometry assertions at the browser level when they depend on actual layout; keep protected pixel appearance in the visual-regression suite. Unit/component tests should prove semantics, typed inputs, owned media/content, and root override forwarding.

## See also

- `.agents/runbooks/implementing.md` for the implementation workflow.
