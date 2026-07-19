# Portfolio Website Initial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build the first public, tested, repository-owned Portfolio website slice as a straightforward ASP.NET Core and React/Vite application that presents Harley's engineering stories and demonstrates disciplined AI-assisted development.

**Architecture:** Use one ASP.NET Core net10.0 server project and one React/TypeScript/Vite client in the existing src/server/ and src/client/ directories. Store Markdown content and typed metadata under src/content/; expose it through a small read-only server content boundary consumed by React Query. Keep the application simple and separated by responsibility without introducing a database, authentication, CMS, CQRS, DDD, Event Sourcing, Onion Architecture, microservices, or empty architecture projects.

**Tech Stack:** .NET SDK 10.0.301 / ASP.NET Core net10.0; React; TypeScript; Vite; React Query; React Router; Sass; styled-components; Vitest; React Testing Library; MSW; xUnit; ASP.NET Core integration testing; Playwright.

## Global Constraints

- The homepage headline is exactly "Harley Bartles: Full Stack Software Engineer".
- The homepage supporting line is exactly "AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.".
- The site is a public employment portfolio, not a lead-generation site, CMS, or Wild Bunch shell.
- Wild Bunch is a separate project at https://wild-bunch.harleybartles.com; the Portfolio must remain independently renderable when Wild Bunch is unavailable.
- Use repository-owned Markdown and typed metadata as the initial content source; do not add a CMS or content database.
- Do not add account creation, authentication, a database, or playthrough persistence in this plan.
- Do not hand-roll password authentication; Google OAuth through ASP.NET Core Identity belongs to a later authenticated-demo plan.
- Do not introduce CQRS, Event Sourcing, DDD, Onion Architecture, microservices, mediator layers, generic repositories, shared-kernel projects, or empty architecture projects.
- Keep application code under src/client/ and src/server/; keep existing Python repository-tooling tests separate from application tests.
- Use React Query for server state, React Context only for genuinely shared state, useState for simple local state, and reducers only when state transitions justify them.
- Use Sass for global tokens/layout foundations and styled-components only for component-scoped or dynamic styling where it improves clarity.
- Use TDD where a test-first shape is appropriate and test behavior rather than implementation details.
- Do not publish employer-confidential details, proprietary content, private contact details, credentials, internal URLs, or unsafe generated assets.
- Before application code is written, the linked worktree must pass the existing agent-surface preflight and repository-tooling tests.
- Generated INDEX.md files are owned by scripts/generate_index_mesh.py; never hand-edit them.
- Publish a draft PR first; only mark it ready when the work is complete and local preflight proves CI is expected to pass.

## File and Responsibility Map

Create or modify only these application surfaces in this plan:

- Portfolio.sln - server solution entrypoint.
- src/AGENTS.md - source-tree routing.
- src/client/AGENTS.md - client routing and client-specific read-when guidance.
- src/client/package.json and src/client/package-lock.json - client dependencies and scripts.
- src/client/vite.config.ts - Vite development/build/test integration.
- src/client/tsconfig*.json - TypeScript compiler configuration.
- src/client/src/ - React application code, styles, API client, and frontend tests.
- src/client/e2e/ - Playwright browser tests for critical public journeys.
- src/client/public/ - static robots and sitemap assets.
- src/server/AGENTS.md - server routing and server-specific read-when guidance.
- src/server/Portfolio.Server.csproj - ASP.NET Core server project.
- src/server/Program.cs - composition root and HTTP pipeline.
- src/server/Content/ - content DTOs, manifest loading, and content catalog boundary.
- tests/AGENTS.md - application-test routing and separation from repository-tooling tests.
- tests/server/Portfolio.Server.Tests.csproj - server test project.
- tests/server/ - server unit, action-level acceptance, and integration tests.
- src/content/ - repository-owned Markdown content and typed manifest metadata.
- README.md, src/README.md, src/client/README.md, and src/server/README.md - human-facing setup and architecture documentation.
- .github/workflows/ci.yml - application build/test gates in addition to existing repository hygiene checks.
- .gitignore - client/server/test build artifacts only.
- Generated INDEX.md files affected by the new directories.

Do not create application code in .agents/skills/, .agents/doctrine/, .agents/guides/, .agents/superpowers/plans/, or the existing Python tooling test modules.

---

### Task 1: Reconfirm the Agent-Ready Baseline and Scaffold the Projects

**Files:**
- Create: Portfolio.sln
- Create: src/AGENTS.md
- Create: src/client/AGENTS.md
- Create: src/server/AGENTS.md
- Create: tests/AGENTS.md
- Create: src/server/Portfolio.Server.csproj
- Create: tests/server/Portfolio.Server.Tests.csproj
- Create or modify: src/server/Program.cs
- Create: src/client/package.json
- Create: src/client/package-lock.json
- Create: src/client/vite.config.ts
- Create: src/client/tsconfig.json
- Create: src/client/tsconfig.app.json
- Create: src/client/tsconfig.node.json
- Create: src/client/index.html
- Create: src/client/src/main.tsx
- Create: src/client/src/App.tsx
- Modify: .gitignore

**Interfaces:**
- Produces a runnable ASP.NET Core server project at src/server/Portfolio.Server.csproj targeting net10.0.
- Produces a runnable Vite React TypeScript client with dev, build, test, and test:e2e script seams.
- Produces scoped source routing files that point agents to the relevant application guidance without duplicating root doctrine.

- [ ] Step 1: Verify the clean linked-worktree gate

Run from the implementation worktree:

~~~powershell
git rev-parse --show-toplevel
git branch --show-current
git worktree list
git rev-parse --git-dir
git rev-parse --git-common-dir
git rev-parse --show-superproject-working-tree
git status --short --branch
.\scripts\ci-preflight.ps1 -Check
~~~

Expected: the current checkout is a linked worktree under the canonical ../_agent-worktrees/portfolio/ root, the branch is not main, the tree is clean before mutation, and the existing preflight reports green.

- [ ] Step 2: Create the server solution and project

Run:

~~~powershell
dotnet new sln --name Portfolio --format sln
dotnet new web --name Portfolio.Server --output src/server --framework net10.0 --no-https
dotnet sln Portfolio.sln add src/server/Portfolio.Server.csproj
dotnet new xunit --name Portfolio.Server.Tests --output tests/server --framework net10.0
dotnet add tests/server/Portfolio.Server.Tests.csproj reference src/server/Portfolio.Server.csproj
dotnet sln Portfolio.sln add tests/server/Portfolio.Server.Tests.csproj
~~~

Preserve the existing human-facing src/server/README.md. Replace the template endpoint with a minimal health-capable composition root only; do not add content, authentication, database, or speculative layers in this task.

- [ ] Step 3: Initialize the existing client directory without deleting repository navigation files

Run the Vite React TypeScript template from the existing client directory,
preserving the existing README.md and generated INDEX.md:

~~~powershell
Push-Location src/client
npm create vite@latest . -- --template react-ts
Pop-Location
~~~

Resolve the existing-directory prompt by preserving README.md and INDEX.md.
Ensure the generated client has these scripts:

~~~json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
~~~

Run npm install in src/client/ and commit the generated lockfile.

- [ ] Step 4: Add the initial source routers and ignore only build artifacts

Create src/AGENTS.md, src/client/AGENTS.md, src/server/AGENTS.md, and tests/AGENTS.md. Each file must use Read When language and route to the nearest human README, the applicable design/implementation guide, and the source-specific patterns. Do not duplicate root architecture law in these files.

Add only these ignore patterns if they are not already covered. Keep the
`tests/server/` additions limited to narrow test-project build-output ignores:

~~~gitignore
src/client/node_modules/
src/client/dist/
src/server/bin/
src/server/obj/
tests/server/bin/
tests/server/obj/
test-results/
playwright-report/
~~~

- [ ] Step 5: Verify the empty scaffold before adding features

Run:

~~~powershell
dotnet build Portfolio.sln
Push-Location src/client
npm run build
Pop-Location
~~~

Expected: the server and client build successfully, with no database, authentication, or application feature behavior introduced.

- [ ] Step 6: Commit the scaffold

~~~powershell
git add Portfolio.sln src tests .gitignore
git commit -m "feat: scaffold portfolio web application"
~~~

---

### Task 2: Establish the Repository-Owned Content Contract

**Files:**
- Create: src/content/content-manifest.json
- Create: src/content/projects/wild-bunch.md
- Create: src/content/projects/portfolio.md
- Create: src/content/experience.md
- Create: src/content/engineering-practice.md
- Create: src/content/ai-engineering.md
- Create: src/content/learning-and-development.md
- Create: src/content/writing/agent-ready-repositories.md
- Create: src/content/writing/model-selection-is-engineering.md
- Create: src/content/AGENTS.md
- Create: src/server/Content/ContentKind.cs
- Create: src/server/Content/ContentManifest.cs
- Create: src/server/Content/ContentManifestLoader.cs
- Create: tests/server/ContentManifestTests.cs
- Modify: src/AGENTS.md

**Interfaces:**
- content-manifest.json is the canonical index of publishable content metadata.
- Markdown files contain narrative body content only; they do not duplicate navigation metadata.
- The server content boundary consumes the manifest and resolves each path relative to src/content/.

Use this manifest shape:

~~~json
{
  "items": [
    {
      "slug": "wild-bunch",
      "kind": "project",
      "title": "Wild Bunch",
      "status": "pre-alpha",
      "summary": "A work-in-progress project demonstrating deliberate complex architecture.",
      "path": "projects/wild-bunch.md",
      "tags": ["project", "architecture"],
      "relatedSlugs": ["engineering-practice"]
    }
  ]
}
~~~

The final manifest must include the two project stories, the three capability stories, the learning page, and the two initial writing notes. Every entry must have a unique slug, supported kind, non-empty title and summary, safe relative path, and no path traversal segments.

- [ ] Step 1: Write the manifest validation tests first

Add server test cases for:

~~~text
loads a valid manifest;
rejects duplicate slugs;
rejects unsupported kinds;
rejects empty title or summary;
rejects absolute paths and paths containing ..;
rejects a manifest path that does not resolve to a Markdown file.
~~~

Run:

~~~powershell
dotnet test tests/server --filter FullyQualifiedName~Manifest
~~~

Expected: the new tests fail because the content loader does not exist.

- [ ] Step 2: Add public-safe seed content

Write the approved factual positioning into the Markdown files. Use the exact homepage headline and supporting line from the global constraints. Describe professional AI-first work without naming the employer or exposing internal details. Describe Wild Bunch as active, buggy, and pre-alpha. Describe Rooms Mostly only as a sanitized proprietary-project narrative if it is included in the initial content; omit sensitive specifics rather than inventing them.

The two writing notes should use the approved narrative themes:

- agent-ready repositories and progressive discovery;
- choosing an AI model or tool appropriate to the work and its cost.

Frame cost examples as personal reasoning or estimates, not audited invoices. Do not publish or reproduce unsafe generated assets.

- [ ] Step 3: Implement manifest and Markdown path validation

Create ContentKind, ContentManifest, and ContentManifestLoader only after the failing tests exist. The loader must read UTF-8 Markdown, normalize line endings for parsing, reject unsafe paths, and return deterministic ordering from the manifest.

- [ ] Step 4: Verify content fixtures

~~~powershell
dotnet test tests/server --filter FullyQualifiedName~Manifest
~~~

Expected: all manifest and fixture validation tests pass.

- [ ] Step 5: Commit the content contract

~~~powershell
git add src/content src/AGENTS.md src/server tests/server
git commit -m "feat: add repository-owned portfolio content"
~~~

---

### Task 3: Build the ASP.NET Core Content Boundary

**Files:**
- Create: src/server/Content/ContentItem.cs
- Create: src/server/Content/IContentCatalog.cs
- Create: src/server/Content/FileContentCatalog.cs
- Create: src/server/Content/ContentOptions.cs
- Create: src/server/Content/ContentEndpoints.cs
- Modify: src/server/Program.cs
- Modify: src/server/Portfolio.Server.csproj
- Create: tests/server/FileContentCatalogTests.cs
- Create: tests/server/ContentEndpointTests.cs
- Create: tests/server/HealthEndpointTests.cs

**Interfaces:**

~~~csharp
public enum ContentKind
{
    Project,
    Experience,
    Practice,
    AiEngineering,
    Learning,
    Writing
}

public sealed record ContentSummary(
    string Slug,
    ContentKind Kind,
    string Title,
    string Status,
    string Summary,
    IReadOnlyList<string> Tags,
    IReadOnlyList<string> RelatedSlugs);

public sealed record ContentDocument(
    ContentSummary Summary,
    string Markdown);

public interface IContentCatalog
{
    IReadOnlyList<ContentSummary> GetNavigation();
    ContentDocument? GetBySlug(string slug);
}
~~~

The implementation must expose:

- GET /health -> 200 with a simple healthy response.
- GET /api/content/navigation -> ordered ContentSummary[].
- GET /api/content/{slug} -> ContentDocument or 404 Problem Details.

The catalog must load src/content/content-manifest.json and referenced Markdown files through a configured content root. The client must not import content files directly. The endpoint must return manifest order and must not reveal filesystem paths.

The JSON contract must emit the manifest's kebab-case kind values exactly,
including ai-engineering and learning. If ContentKind is an enum internally,
add an explicit converter and test its serialized values; do not rely on the
default .NET enum serializer.

- [ ] Step 1: Add server test dependencies

~~~powershell
dotnet add tests/server/Portfolio.Server.Tests.csproj package Microsoft.AspNetCore.Mvc.Testing
dotnet add tests/server/Portfolio.Server.Tests.csproj package Moq
~~~

The server test project was created in Task 1. Keep it separate from the existing Python repository-tooling tests.

- [ ] Step 2: Write failing unit tests for the catalog contract

Cover valid loading, deterministic ordering, missing Markdown, unsafe path, unknown kind, duplicate slug, and missing slug behavior. Use a temporary test content root and mocked filesystem abstraction only if the chosen design requires one; otherwise use isolated fixture directories under the test output and delete them in teardown.

- [ ] Step 3: Implement the manifest DTOs and file catalog

Keep parsing and path validation in focused types. Do not put file discovery, HTTP concerns, and Markdown rendering in one class. Return immutable records or read-only collections to callers.

- [ ] Step 4: Write failing HTTP acceptance tests

Use WebApplicationFactory<Program> to prove:

~~~text
GET /health returns 200;
GET /api/content/navigation returns the expected ordered summaries;
GET /api/content/wild-bunch returns its Markdown document;
GET /api/content/missing returns 404 Problem Details;
filesystem paths are never returned in the response.
~~~

- [ ] Step 5: Register the endpoint boundary

Add the catalog through dependency injection and map only the three endpoints above. Keep response serialization consistent with the client types. Do not add contact, identity, database, or Wild Bunch proxy endpoints.

- [ ] Step 6: Run the server test suite

~~~powershell
dotnet test tests/server --configuration Release
~~~

Expected: all server unit and acceptance tests pass.

- [ ] Step 7: Commit the content API

~~~powershell
git add src/server tests/server Portfolio.sln
git commit -m "feat: expose portfolio content through server boundary"
~~~

---

### Task 4: Establish the React Client, API, State, and Styling Foundations

**Files:**
- Modify: src/client/package.json
- Modify: src/client/package-lock.json
- Create: src/client/vitest.config.ts
- Create: src/client/src/test/setup.ts
- Create: src/client/src/test/server.ts
- Create: src/client/src/types/content.ts
- Create: src/client/src/api/contentApi.ts
- Create: src/client/src/app/queryClient.ts
- Create: src/client/src/app/AppProviders.tsx
- Create: src/client/src/app/router.tsx
- Create: src/client/src/styles/_tokens.scss
- Create: src/client/src/styles/global.scss
- Modify: src/client/src/main.tsx
- Modify: src/client/src/App.tsx
- Create: src/client/src/api/contentApi.test.ts
- Create: src/client/src/app/AppProviders.test.tsx

**Interfaces:**

~~~typescript
export type ContentKind =
  | "project"
  | "experience"
  | "practice"
  | "ai-engineering"
  | "learning"
  | "writing";

export type ContentSummary = {
  slug: string;
  kind: ContentKind;
  title: string;
  status: string;
  summary: string;
  tags: string[];
  relatedSlugs: string[];
};

export type ContentDocument = {
  summary: ContentSummary;
  markdown: string;
};

export function getNavigation(): Promise<ContentSummary[]>;
export function getContent(slug: string): Promise<ContentDocument>;
~~~

Use @tanstack/react-query for both API queries. Use MSW to mock the network boundary in frontend tests. Do not put server content into React Context; Context is reserved for genuinely shared UI/application state that appears after a real use case exists.

Use Sass for tokens and global foundations. Use styled-components for component-scoped dynamic styles only. Define the boundary in src/client/README.md so later agents do not mix the two arbitrarily.

- [ ] Step 1: Add client dependencies and scripts

Add these runtime dependencies:

~~~text
@tanstack/react-query
react-markdown
react-router-dom
styled-components
sass
~~~

Add these development dependencies:

~~~text
@playwright/test
@testing-library/jest-dom
@testing-library/react
@testing-library/user-event
jsdom
msw
vitest
~~~

Run npm install and commit the resulting package-lock.json.

- [ ] Step 2: Write failing API/client tests

Cover successful navigation retrieval, content retrieval, HTTP failure conversion to a useful error, and React Query loading/error behavior with MSW handlers. Run:

~~~powershell
Push-Location src/client
npm test -- --run src/api/contentApi.test.ts src/app/AppProviders.test.tsx
Pop-Location
~~~

Expected: tests fail until the API client and providers exist.

- [ ] Step 3: Implement typed API access and providers

Create the typed fetch client, QueryClient configuration, router provider, and test providers. The fetch client must reject non-2xx responses with an error that includes the endpoint and status without leaking server paths.

- [ ] Step 4: Add the global style foundation

Define neutral canvas, ink, muted text, accent, focus, spacing, and typography tokens in _tokens.scss. Add a semantic global stylesheet with focus-visible styles, readable defaults, and mobile-safe layout primitives. Do not add a large component framework.

- [ ] Step 5: Run client tests and build

~~~powershell
Push-Location src/client
npm test -- --run
npm run build
Pop-Location
~~~

Expected: all current frontend tests pass and Vite produces dist/.

- [ ] Step 6: Commit the client foundation

~~~powershell
git add src/client
git commit -m "feat: establish portfolio client foundation"
~~~

---

### Task 5: Build the Personal Portfolio Shell and Homepage

**Files:**
- Create: src/client/src/components/SiteLayout.tsx
- Create: src/client/src/components/SiteHeader.tsx
- Create: src/client/src/components/SiteFooter.tsx
- Create: src/client/src/components/OrientationStrip.tsx
- Create: src/client/src/components/ContentLink.tsx
- Create: src/client/src/pages/HomePage.tsx
- Create: src/client/src/pages/LoadingPage.tsx
- Create: src/client/src/pages/ErrorPage.tsx
- Create: src/client/src/pages/NotFoundPage.tsx
- Create: src/client/src/components/SiteLayout.test.tsx
- Create: src/client/src/pages/HomePage.test.tsx
- Modify: src/client/src/app/router.tsx
- Modify: src/client/src/App.tsx

**Interfaces:**

~~~tsx
export function SiteLayout(props: { children: React.ReactNode }): JSX.Element;
export function HomePage(): JSX.Element;
export function OrientationStrip(props: {
  items: ContentSummary[];
}): JSX.Element;
~~~

The rendered homepage must contain, in order:

1. h1 exactly Harley Bartles: Full Stack Software Engineer.
2. Supporting text exactly AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.
3. Orientation links for Projects, Experience, Engineering Practice, AI Engineering, and Writing and Notes.
4. Concise summaries and links to deeper content.
5. No learning-loop diagram and no dense evidence checklist.

- [ ] Step 1: Write failing homepage and layout tests

Use React Testing Library and user-event to prove:

~~~text
the exact headline and supporting line render;
all orientation areas have accessible links;
loading and API failure states are understandable;
keyboard focus reaches navigation and orientation links;
the layout does not require a Wild Bunch response to render the core identity.
~~~

- [ ] Step 2: Implement the layout and navigation shell

Use semantic header, nav, main, and footer. Provide a mobile menu only if the content requires it; do not add interaction for decoration. Keep contact out of the primary orientation strip until its form contract is implemented.

- [ ] Step 3: Implement the homepage

Use the typed navigation response for links and summaries. Keep project and practice details on deeper pages. Use the minimal personal-studio direction: high contrast, restrained neutral colors, one accent, strong typography, and generous spacing.

- [ ] Step 4: Verify homepage behavior

~~~powershell
Push-Location src/client
npm test -- --run src/components/SiteLayout.test.tsx src/pages/HomePage.test.tsx
npm run build
Pop-Location
~~~

- [ ] Step 5: Commit the homepage shell

~~~powershell
git add src/client
git commit -m "feat: add portfolio homepage shell"
~~~

---

### Task 6: Add Narrative Content Pages and Flexible Project Stories

**Files:**
- Create: src/client/src/pages/ContentPage.tsx
- Create: src/client/src/pages/ProjectIndexPage.tsx
- Create: src/client/src/pages/ProjectPage.tsx
- Create: src/client/src/pages/WritingIndexPage.tsx
- Create: src/client/src/pages/WritingPage.tsx
- Create: src/client/src/components/MarkdownContent.tsx
- Create: src/client/src/components/RelatedContent.tsx
- Create: src/client/src/components/ProjectStatus.tsx
- Create: src/client/src/pages/ContentPage.test.tsx
- Create: src/client/src/pages/ProjectPage.test.tsx
- Create: src/client/src/pages/WritingPage.test.tsx
- Modify: src/client/src/app/router.tsx
- Modify: src/client/src/components/OrientationStrip.tsx
- Modify: src/client/src/types/content.ts

**Interfaces:**

~~~tsx
export function ContentPage(props: { slug: string }): JSX.Element;
export function ProjectPage(props: { slug: string }): JSX.Element;
export function WritingPage(props: { slug: string }): JSX.Element;
export function RelatedContent(props: {
  slugs: string[];
  summaries: ContentSummary[];
}): JSX.Element;
~~~

Required routes:

~~~text
/
/projects
/projects/:slug
/experience
/engineering-practice
/ai-engineering
/learning-and-development
/writing
/writing/:slug
~~~

The four capability routes map to these content slugs exactly:

~~~text
/experience -> experience
/engineering-practice -> engineering-practice
/ai-engineering -> ai-engineering
/learning-and-development -> learning-and-development
~~~

The project template must support the approved narrative sections without forcing every project to fill every section. Wild Bunch must display its pre-alpha status, public repository link, and conditional demo link. The portfolio project must describe the simpler full-stack architecture. Writing pages must render Markdown safely and expose related content.

- [ ] Step 1: Write failing route and content-state tests

Cover successful rendering, missing content, loading, API failure, related links, pre-alpha status, and safe Markdown rendering. Include keyboard and semantic-heading assertions for project and writing pages.

- [ ] Step 2: Implement the generic content page

Use one React Query content hook and one page component for the single-document boundary. Keep the project and writing wrappers focused on page-specific metadata and navigation.

- [ ] Step 3: Implement safe Markdown rendering

Render the trusted repository-owned Markdown through react-markdown without enabling raw HTML by default. Apply link handling that preserves accessible names and opens external links safely when a new tab is required.

- [ ] Step 4: Implement project and writing indexes

Filter the navigation response by kind, preserve manifest order, and show status/tags only where they help visitors understand the story. Do not render a technology badge wall.

- [ ] Step 5: Verify narrative pages

~~~powershell
Push-Location src/client
npm test -- --run src/pages/ContentPage.test.tsx src/pages/ProjectPage.test.tsx src/pages/WritingPage.test.tsx
npm run build
Pop-Location
~~~

- [ ] Step 6: Commit the narrative page system

~~~powershell
git add src/client src/content
git commit -m "feat: add narrative portfolio pages"
~~~

---

### Task 7: Add Accessibility, SEO, Error, and Static Web Baselines

**Files:**
- Create: src/client/src/components/DocumentMetadata.tsx
- Create: src/client/src/components/RouteErrorBoundary.tsx
- Create: src/client/src/components/AccessibleStatus.tsx
- Create: src/client/public/robots.txt
- Create: src/client/public/sitemap.xml
- Create: src/client/src/components/DocumentMetadata.test.tsx
- Create: src/client/src/accessibility/HomePage.a11y.test.tsx
- Modify: src/client/src/app/router.tsx
- Modify: src/client/src/pages/LoadingPage.tsx
- Modify: src/client/src/pages/ErrorPage.tsx
- Modify: src/client/package.json

**Interfaces:**

~~~tsx
export function DocumentMetadata(props: {
  title: string;
  description: string;
  canonicalPath: string;
}): JSX.Element;
~~~

- [ ] Step 1: Write failing accessibility and metadata tests

Use Testing Library and jest-axe to cover the homepage, navigation, focus visibility, heading order, landmark presence, and error/loading announcements. Add jest-axe to the client development dependencies.

- [ ] Step 2: Implement metadata and route failure behavior

Every page must set a useful title, description, and canonical path. Error and loading states must be visible, announced where appropriate, and recoverable through navigation. Do not expose server filesystem or exception details.

- [ ] Step 3: Add robots and sitemap assets

Use canonical production URLs for the public Portfolio routes. Do not include Wild Bunch routes in the Portfolio sitemap; link to the separate project domain instead.

- [ ] Step 4: Run accessibility and build checks

~~~powershell
Push-Location src/client
npm test -- --run src/accessibility/HomePage.a11y.test.tsx
npm run build
Pop-Location
~~~

Expected: no serious axe violations on the tested homepage and a successful production build.

- [ ] Step 5: Commit the public-web baseline

~~~powershell
git add src/client
git commit -m "feat: add accessible public web baseline"
~~~

---

### Task 8: Add Frontend Workflow and Browser Tests

**Files:**
- Create: src/client/playwright.config.ts
- Create: src/client/e2e/homepage.spec.ts
- Create: src/client/e2e/project-story.spec.ts
- Create: src/client/e2e/writing-navigation.spec.ts
- Modify: src/client/package.json

**Interfaces:**
- Playwright runs the Vite preview and ASP.NET Core server through configured webServer processes.
- Browser tests use real HTTP between the React client and ASP.NET Core content API.

- [ ] Step 1: Write the browser assertions

Cover these user-like journeys:

~~~text
visitor loads the homepage and sees the exact identity statement;
visitor navigates from the orientation strip to Wild Bunch;
visitor reads a project story and follows a related-content link;
visitor navigates to Writing and opens a note;
visitor receives a useful page state when a content slug is missing.
~~~

- [ ] Step 2: Configure Playwright web servers

Start the ASP.NET Core server on a test port with the repository content root and start the Vite preview server on a separate port. Ensure the test command does not depend on a deployed Wild Bunch instance or external network service.

- [ ] Step 3: Run browser tests locally

~~~powershell
Push-Location src/client
npx playwright install chromium
npm run test:e2e
Pop-Location
~~~

Expected: all public-site journeys pass against the local application.

- [ ] Step 4: Commit the browser test contract

~~~powershell
git add src/client
git commit -m "test: add portfolio browser journeys"
~~~

---

### Task 9: Add Application CI and Local Development Documentation

**Files:**
- Modify: .github/workflows/ci.yml
- Modify: README.md
- Modify: src/README.md
- Modify: src/client/README.md
- Modify: src/server/README.md
- Modify: .gitignore

**Interfaces:**
- Existing repository hygiene checks remain unchanged and continue to run only on published pull requests or main pushes.
- Application CI adds build/test checks without fetching the marketplace source.

- [ ] Step 1: Document local commands

Document the supported Windows commands:

~~~powershell
dotnet run --project src/server/Portfolio.Server.csproj
Push-Location src/client
npm install
npm run dev
npm test -- --run
npm run build
npm run test:e2e
Pop-Location
~~~

Document the Bash equivalents using python3, npm, and dotnet where applicable. Explain that the client consumes content through the ASP.NET Core API and that authentication, database persistence, and the Wild Bunch playthrough flow are deferred.

- [ ] Step 2: Add Windows application CI steps

In the existing Windows job, after repository hygiene checks:

~~~yaml
- uses: actions/setup-dotnet@v4
  with:
    dotnet-version: '10.0.x'
- uses: actions/setup-node@v4
  with:
    node-version: '24.x'
    cache: npm
    cache-dependency-path: src/client/package-lock.json
- name: Restore client dependencies
  shell: pwsh
  run: npm ci --prefix src/client
- name: Restore server dependencies
  shell: pwsh
  run: dotnet restore Portfolio.sln
- name: Build server
  shell: pwsh
  run: dotnet build Portfolio.sln --configuration Release --no-restore
- name: Test server
  shell: pwsh
  run: dotnet test tests/server --configuration Release --no-build
- name: Test and build client
  shell: pwsh
  run: |
    Push-Location src/client
    npm test -- --run
    npm run build
    Pop-Location
~~~

Restore before build so the no-restore commands are deterministic.

- [ ] Step 3: Add Linux application CI steps

Mirror the same application checks in the Linux job with Bash commands and actions/setup-dotnet@v4 / actions/setup-node@v4. Keep the existing Bash syntax validation and repository-tooling test commands. Do not add a marketplace-source check to GitHub Actions.

- [ ] Step 4: Add browser CI only after the local browser command is green

Add a separate non-draft-gated application-browser job or extend the application job with Chromium installation and npm run test:e2e. The job must start the local server/client through Playwright configuration and must not call Wild Bunch production.

- [ ] Step 5: Verify CI configuration locally

~~~powershell
.\scripts\ci-preflight.ps1 -Check
py -3 -m unittest discover -s tests
dotnet restore Portfolio.sln
dotnet build Portfolio.sln --configuration Release
dotnet test tests/server --configuration Release
Push-Location src/client
npm ci
npm test -- --run
npm run build
npm run test:e2e
Pop-Location
~~~

Expected: every command passes on the linked Windows worktree. The Linux workflow peer must be checked by CI; local Windows success does not prove Bash parity.

- [ ] Step 6: Commit CI and documentation

~~~powershell
git add .github/workflows/ci.yml README.md src .gitignore
git commit -m "ci: build and test portfolio application"
~~~

---

### Task 10: Regenerate the Agent Mesh and Complete the Validation Gate

**Files:**
- Modify: generated INDEX.md files under the new tracked directories.
- Modify: any scoped AGENTS.md routing file that the generator or review identifies as stale.

**Interfaces:**
- The index mesh must include the new source, content, test, and client subdirectories.
- The marketplace submodule remains a leaf; no generated index may be written inside it.
- Ignored specs/SDD folders and build output remain outside the mesh.

- [ ] Step 1: Regenerate the full mesh from the linked worktree

~~~powershell
.\scripts\generate_index_mesh.ps1
~~~

Do not hand-edit any generated INDEX.md file.

- [ ] Step 2: Run deterministic refresh and validation checks

~~~powershell
.\scripts\refresh_agent_surfaces.ps1 -Check
py -3 scripts/validate_agent_mesh.py --check
.\scripts\generate_index_mesh.ps1 -Check
~~~

Expected: derived skills, mesh, and doctrine routing are current.

- [ ] Step 3: Run the complete local validation bundle

~~~powershell
.\scripts\ci-preflight.ps1 -Check
py -3 -m unittest discover -s tests -v
dotnet build Portfolio.sln --configuration Release
dotnet test tests/server --configuration Release
Push-Location src/client
npm test -- --run
npm run build
npm run test:e2e
Pop-Location
git diff --check origin/main...HEAD -- . ':(exclude).agents/skills/**'
git status --short
~~~

Expected: all checks pass, generated surfaces are current, and the tree is clean except for intentional tracked plan changes before commit.

- [ ] Step 4: Commit the generated mesh

~~~powershell
git add -- ':(glob)**/INDEX.md'
git diff --cached --name-only -- ':(glob)**/INDEX.md'
git commit -m "docs: regenerate portfolio navigation mesh"
~~~

---

### Task 11: Plan Closeout and Review Handoff

**Files:**
- No application files; use the plan, branch, commit, and PR surfaces.

- [ ] Step 1: Run the plan self-review

Check every design section against the implemented task map:

~~~text
positioning and homepage -> Tasks 2, 4, 5, and 6;
project stories and public/private boundaries -> Tasks 2 and 6;
agent practice and progressive discovery -> Tasks 2, 9, and 10;
AI engineering and learning content -> Task 2;
visual and interaction direction -> Tasks 4, 5, 6, and 7;
ASP.NET Core/React boundary -> Tasks 1, 3, and 4;
repository-owned content -> Tasks 2 and 3;
frontend preferences -> Task 4;
authentication/database deferral -> Global Constraints and Non-Goals;
layered backend/frontend tests -> Tasks 3, 4, 6, 7, and 8;
application CI -> Task 9;
agent-ready gate and mesh -> Tasks 1 and 10.
~~~

- [ ] Step 2: Rate implementer confidence

Return a numeric rating against this contract:

~~~text
Target: 9/10 implementer confidence.
Minimum: 8/10.
Below 8/10: do not hand off; repair the plan.
Below 9/10 with a cheap-to-close gap: close the gap before handoff.
Below 9/10 only when the remaining question is explicitly user-owned or
requires implementation-time verification.
~~~

The current plan target is 9/10 because it fixes the project paths, content boundary, API surface, test layers, CI commands, phase exclusions, and mesh obligations. Re-rate after the self-review; do not report the plan as ready below the stated floor.

- [ ] Step 3: Commit the plan and generated plan index

~~~powershell
git add .agents/superpowers/plans/2026-07-19-portfolio-website-initial-implementation.md .agents/superpowers/plans/INDEX.md
git commit -m "docs: add portfolio website implementation plan"
~~~

- [ ] Step 4: Publish the plan through the normal workflow

Push codex/portfolio-design-spec, open a draft PR, and keep it draft until the plan has been reviewed. The PR body must state that the design spec is local-only and that the tracked deliverable is the implementation plan. Do not claim application implementation, CI success for application code, or deployment readiness from this plan-only change.

## Deferred Work

The following are intentionally not implementation tasks in this plan:

- contact-form provider and abuse/security design;
- database selection and migrations;
- ASP.NET Core Identity and Google OAuth;
- cross-subdomain session or token exchange;
- Wild Bunch playthrough persistence;
- shared authentication for future portfolio projects;
- production hosting/provider provisioning and DNS changes;
- embedding the Wild Bunch application rather than linking to its subdomain;
- CMS adoption;
- complex architecture patterns without a new requirement;
- public publication of employer-confidential or proprietary material.

## Plan Handoff Judgment

Implementer confidence target: 9/10.

The plan is ready for implementation when the implementer confirms the live repository is still at or ahead of the plan base, the worktree is isolated, the repository preflight is green, and no user-owned content or privacy decision has been silently invented. If any of those conditions fail, stop and report the exact blocker rather than broadening the implementation.
