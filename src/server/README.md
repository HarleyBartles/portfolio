# Server Application

This folder contains the ASP.NET Core `net10.0` host and the read-only content
API. Content is loaded from the repository-owned Markdown and typed manifest in
`../content/`, with a published-content fallback for deployment packaging.

## Local Commands

From the repository root, run the server with Windows PowerShell:

```powershell
dotnet run --project src/server/Portfolio.Server.csproj -- --urls http://127.0.0.1:5278
```

The Bash equivalent is:

```bash
dotnet run --project src/server/Portfolio.Server.csproj -- --urls http://127.0.0.1:5278
```

The health endpoint is `/health`; navigation and document content are served
under `/api/content`. The React client consumes these API routes. Server tests
run from the repository root with:

```powershell
dotnet test tests/server --configuration Release
```

```bash
dotnet test tests/server --configuration Release
```

Authentication, database persistence, and the Wild Bunch playthrough flow are
deferred until a separate requirement establishes their scope.
