# Client

This folder contains the React client application for the portfolio website.

## Boundaries

- Repository content is loaded lazily through `src/api/contentApi.ts` and React Query. Do not copy content into React Context or add a runtime API without a concrete requirement.
- React Context is reserved for shared UI or application state after a real use case exists.
- Sass owns design-token declarations, font faces and document foundations in `src/styles`.
- `styled-components` owns reusable React component contracts and their scoped styling; the typed portfolio theme is a
  CSS-variable mirror, not a second token-value authority.
- React Context is reserved for shared UI or application state after a real use case exists. Static structured data stays
  with its parent and is passed through typed props.
- Keep feature UI out of this foundation layer until a task explicitly asks for portfolio pages or components.
- Import roots stay deliberate: consumers outside `components`, `data`, `styles`, `types`, or `utils` use that subtree's `index.ts`; files inside a subtree may import local implementation modules. Feature directories remain route-local so a barrel cannot accidentally defeat lazy loading.

## Local Commands

For interactive development, run these commands from `src/client/`:

```powershell
npm install
npm run dev
```

From another shell, run the client validation commands:

```powershell
npm test -- --run
npm run build
npm run test:e2e
npm run test:e2e:visual
```

The same interactive commands on Bash are:

```bash
npm install
npm run dev
```

The same validation commands on Bash are:

```bash
npm test -- --run
npm run build
npm run test:e2e
npm run test:e2e:visual
```

`npm run test:e2e` uses `playwright.config.ts` to build and start the Vite
preview server, then exercises the public journeys with Chromium. Content is
compiled from `src/data/content/`; the deployed site has no runtime backend.

`npm run test:e2e:visual` is the canonical pixel-baseline check. Windows is
the sole renderer for those baselines: local Windows validation and the required
GitHub Actions Windows job compare the same approved files. Linux still runs the
remaining canonical CI journeys and reports this visual suite as intentionally
skipped. Author and review a new visual baseline once on Windows; do not create
platform-specific duplicates.
