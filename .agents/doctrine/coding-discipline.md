# Coding Discipline

Use this reference when deciding scope boundaries or making structural changes.

## Scope Discipline

- Do only the requested slice.
- No opportunistic broad refactors.
- No unrelated feature work.
- If a needed design decision is missing, stop and ask rather than inventing a broader architecture.

## Architecture Direction

- Assume React, TypeScript, Vite, SCSS, Vitest, and Playwright as the live stack. The deployed site is static GitHub Pages output; do not introduce a runtime backend speculatively.
- Keep the repository simple and easy to navigate.
- Avoid DDD, CQRS, event sourcing, microservices, and other speculative abstractions unless a future requirement clearly justifies them.
- Prefer a single maintainable application over a large layer cake with empty projects.

## React vertical-slice ownership

- Treat a vertical-slice component as an opaque compositional object at its parent boundary. The parent owns the whole child's position, size, scale, rotation, and z-order; the child owns the position, size, scale, and relationships of everything inside its own boundary.
- Express normal parent-owned composition with parent-owned wrapper elements. Do not use `styled(ChildComponent)` or caller-supplied CSS selectors to reach across a vertical-slice boundary.
- Do not expose or forward `className` as part of a vertical-slice component's caller-facing props. It is an untyped styling escape hatch that allows external CSS to control the component.
- A vertical-slice component may expose `style?: React.CSSProperties` as an exceptional root-only override. Apply it only to the component root; do not use it as a descendant instruction bag or as a substitute for parent-owned composition.
- Express supported content, behaviour, or presentation choices as semantically named typed props. Do not expose raw coordinate, scale, or descendant-style props merely so a parent can position child internals.
- Ambient presentation or theme CSS custom properties are allowed. Do not use cross-boundary CSS custom properties as hidden APIs for controlling a child's internal geometry or behaviour.
- Keep tests aligned with the same ownership boundary: a vertical-slice component's colocated component test proves its own contract; parent compositor tests do not own child internals.
- Keep responsive relationship and geometry assertions at the browser level when they depend on actual layout. Keep protected pixel appearance in visual regression. Component tests prove semantics, typed inputs, owned media/content, and root override forwarding.

## Working Style

- Preserve established patterns once they exist.
- Make the smallest change that supports the current goal.
- When a surface gets bulky, extract the pure helper or focused file instead of letting it grow into a catch-all.
- Keep Wild Bunch separate; it is a portfolio subject, not the portfolio site itself.
