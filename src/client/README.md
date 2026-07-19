# Client

This folder contains the React client application for the portfolio website.

## Boundaries

- Server content is loaded through `src/api/contentApi.ts` and React Query. Do not copy content into React Context.
- React Context is reserved for shared UI or application state after a real use case exists.
- Sass owns design tokens and global foundations in `src/styles`.
- `styled-components` is reserved for component-scoped dynamic styles. Do not use it as a second global theme system.
- Keep feature UI out of this foundation layer until a task explicitly asks for portfolio pages or components.
