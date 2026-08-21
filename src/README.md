# Application source

`client/` is the complete portfolio application: React, TypeScript, Vite, and repository-owned Markdown. Vite compiles it to static files for GitHub Pages. There is no site backend, API, database, or server project in this source tree.

Content lives under `client/src/data/content/` and is indexed by `content-manifest.json`. Browser tests exercise the production Vite preview and generated direct-route documents without contacting an application service.

## Local commands

From the repository root, install once and start interactive development:

```powershell
npm ci --prefix src/client
npm --prefix src/client run dev
```

The repository owns one complete validation command:

```powershell
py -3 tools/run.py ci --check
```

On Bash-based systems, use `python3` in place of `py -3`.

Do not add a runtime backend speculatively. Projects described by the portfolio may use server-side technology; that is showcase content, not hosting architecture for this site.
