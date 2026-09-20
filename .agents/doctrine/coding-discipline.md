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

- On React-composed portfolio surfaces, use React component composition with co-located styled-components as the default layout primitive. The generic styling skills provide technique; they do not override this repository choice or replace an established component/styled-component composition with a different styling architecture unless the task explicitly calls for that change.
- For new or substantively touched route-owned composition, put the page slice under `src/client/src/pages/<slice>/`. Reserve `features/` for user-facing capabilities that are genuinely reused by multiple pages; route URL nesting does not dictate source nesting. This is an incremental direction, not a mandate to migrate unrelated existing slices: move those only when they are substantively worked on.
- Within that new or substantively touched page-slice code, organize internals by semantic/product responsibility rather than generic technical buckets such as `components`, `styles`, `hooks`, `types`, `utils`, `helpers`, or `common`. Create subfolders only when the composition has a real conceptual subdivision, and prefer direct imports until a real public API boundary exists.
- For that same incremental page-slice surface, styled-components are React components. Keep private styled primitives in the owning `.tsx` module; if a React object deserves extraction, give it a responsibility-bearing `.tsx` module rather than hiding it in `*.styles.ts`, `components.tsx`, or another type-based dumping ground. Name non-React modules for their responsibility, such as `responsive.ts`, `assets.ts`, `geometry.ts`, or `tokens.ts`.
- Treat a vertical-slice component as an opaque compositional object at its parent boundary. The parent owns the whole child's position, size, scale, rotation, and z-order; the child owns the position, size, scale, and relationships of everything inside its own boundary.
- Express normal parent-owned composition with parent-owned wrapper elements. Do not use `styled(ChildComponent)` or caller-supplied CSS selectors to reach across a vertical-slice boundary.
- Do not expose or forward `className` as part of a vertical-slice component's caller-facing props. It is an untyped styling escape hatch that allows external CSS to control the component.
- A vertical-slice component may expose `style?: React.CSSProperties` as an exceptional root-only override. Apply it only to the component root; do not use it as a descendant instruction bag or as a substitute for parent-owned composition.
- Express supported content, behaviour, or presentation choices as semantically named typed props. Do not expose raw coordinate, scale, or descendant-style props merely so a parent can position child internals.
- Ambient presentation or theme CSS custom properties are allowed. Do not use cross-boundary CSS custom properties as hidden APIs for controlling a child's internal geometry or behaviour.
- Encode compositional invariants in the React ownership tree before relying on assertions. When elements must move, scale, clip, stack, or stay registered as one visual beat, give that relationship one structural owner: either a child component that owns the relationship internally or a parent-owned wrapper that composes whole opaque children. Do not leave an invariant as matching coordinates on independently positioned siblings.
- Choose the component boundary from the invariant. Relationships inside one visual object belong to that object's component; relationships between sibling vertical slices belong to their parent compositor. A parent may place whole children together, but it must not reach into either child's internals to manufacture the relationship.
- Tests are evidence for an invariant, not the mechanism that creates it. Use component, browser-geometry, and visual-regression tests at the layer that can observe the contract, but if the code structure still permits the invalid relationship, repair the ownership/composition first rather than trying to make the test suite hold the layout together.
- Keep tests aligned with the same ownership boundary: a vertical-slice component's colocated component test proves its own contract; parent compositor tests do not own child internals.
- Keep responsive relationship and geometry assertions at the browser level when they depend on actual layout. Keep protected pixel appearance in visual regression. Component tests prove semantics, typed inputs, owned media/content, and root override forwarding.

## Working Style

- Preserve established patterns once they exist.
- Make the smallest change that supports the current goal.
- When a surface gets bulky, extract the pure helper or focused file instead of letting it grow into a catch-all.
- Keep Wild Bunch separate; it is a portfolio subject, not the portfolio site itself.
