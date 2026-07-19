# Client

This folder contains the React client application for the portfolio website.

## Boundaries

- Server content is loaded through `src/api/contentApi.ts` and React Query. Do not copy content into React Context.
- React Context is reserved for shared UI or application state after a real use case exists.
- Sass owns design tokens and global foundations in `src/styles`.
- `styled-components` is reserved for component-scoped dynamic styles. Do not use it as a second global theme system.
- Keep feature UI out of this foundation layer until a task explicitly asks for portfolio pages or components.

## Local Commands

For interactive development, run these commands from `src/client/` after
starting the ASP.NET Core server in another terminal:

```powershell
npm install
npm run dev
```

From another shell, run the client validation commands:

```powershell
npm test -- --run
npm run build
npm run test:e2e
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
```

`npm run test:e2e` uses `playwright.config.ts` to start the local ASP.NET Core
API and Vite preview server, then exercises the public journeys with Chromium.
It does not call the Wild Bunch deployment. The client consumes content from
the ASP.NET Core API; authentication, database persistence, and the Wild Bunch
playthrough flow remain deferred.
