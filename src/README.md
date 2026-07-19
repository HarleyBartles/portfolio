# Application Source

This folder contains the portfolio application source tree:

- `server/` is the ASP.NET Core host and read-only content API.
- `client/` is the React, TypeScript, and Vite browser application.
- `../content/` is the repository-owned Markdown and typed metadata source.

The client reads content through the ASP.NET Core API rather than embedding
content in React state. The Playwright configuration starts both local servers
for integrated browser coverage without contacting Wild Bunch production.

## Local Commands

From the repository root, start the API with:

```powershell
dotnet run --project src/server/Portfolio.Server.csproj
```

Then use a second terminal for interactive client development:

```powershell
Push-Location src/client
npm install
npm run dev
```

From another shell, run the client validation commands:

```powershell
Push-Location src/client
npm test -- --run
npm run build
npm run test:e2e
Pop-Location
```

The Bash equivalents are:

```bash
dotnet run --project src/server/Portfolio.Server.csproj
```

In the second terminal, start the client:

```bash
cd src/client
npm install
npm run dev
```

From another shell, run the client validation commands:

```bash
cd src/client
npm test -- --run
npm run build
npm run test:e2e
cd ../..
```

The Playwright configuration starts its own local ASP.NET Core and Vite
preview servers for `npm run test:e2e`.

Authentication, database persistence, and the Wild Bunch playthrough flow are
deferred scope. This source tree intentionally does not introduce those
boundaries before a concrete requirement exists.
