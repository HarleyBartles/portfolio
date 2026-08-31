# Portfolio Premium Foundations — Master Spec

## Goal

Turn the existing `portfolio` repository from a working wireframe into a durable, agent-navigable **foundation** for a `$10k-feel` developer portfolio. This epic is **not** the redesign. It is the preparation: the skills, runbooks, tools, preflight gates, and subagent workflows that let any later agent redesign the site without re-inventing what premium means, which patterns to use, or how to validate the work.

## Non-goals

- No new application UI or component code.
- No visual identity or style decisions beyond the design-system vocabulary needed to support a later identity pass.
- No 3D/Spline/WebGL or advanced cinematic scroll work.
- No backend (.NET) feature work.
- No CMS, authentication, or blog infrastructure.
- No page-by-page redesign or implementation plans. Those belong to the next epic.

## Why this approach matters

The previous research pass surfaced many high-quality patterns (shadcn/ui, Tailwind v4, Motion, Lenis, image/font optimization, component registries, public reference repos). Without a durable record of which patterns this repo adopts, where they live, and how agents invoke them, every new session would rediscover the same trade-offs. The portfolio cannot reach a `$10k` finish if the process keeps writing in sand.

## Scope of the master spec (this document)

This spec records the discovery, the chosen foundation, and the phase boundaries for the **foundations** epic. It explicitly excludes the later redesign/implement epic.

In scope:

1. Define the target state for skills, subagent profiles, runbooks, tools, preflight gates, and workflows.
2. Decide which design-system / animation / asset patterns this repo will adopt.
3. Propose a phased roadmap for the foundation work and the criteria for moving between phases.
4. Identify the files and surfaces that will change or be created.
5. State the validation bundle and handoff gates for the foundation roadmap.

Out of scope for this spec:

- Detailed page designs (hero, project, writing, etc.).
- Token values, color palettes, or font selections.
- Component-level API contracts.
- Build-time asset pipeline implementation.
- Anything that ships production application code.

## Current baseline

The application is `src/client/`, a Vite + React 19 + TypeScript 6 static site. It uses SCSS tokens in `src/client/src/styles/_tokens.scss`, `styled-components`, `react-markdown`, `@tanstack/react-query`, `react-router-dom`, Vitest, and Playwright. Repository-owned Markdown and the content manifest live under `src/client/src/data/content/`; the production build emits direct-route documents for GitHub Pages. There is no runtime site backend.

## Proposed foundation phases

| Phase | Title | Goal | Output |
|---|---|---|---|
| 1 | Skills | Create repo-owned skills that encode what a `$10k-feel` site looks like and how to judge design quality. | `.agents/skills/designing-premium-sites/`, `.agents/skills/design-tokens/`, `.agents/skills/typography-for-the-web/`, `.agents/skills/web-layout/`, `.agents/skills/motion-patterns/`, `.agents/skills/asset-custody/`, `.agents/skills/evaluating-design-references/`. |
| 2 | Subagent profiles | Design the subagent profiles that will do the actual design work later. They read skills but cannot invoke them, so the profiles must embed the routing. | `.agents/agents/design-researcher.md`, `.agents/agents/taste-reviewer.md`, `.agents/agents/design-token-auditor.md`, `.agents/agents/motion-reviewer.md` (or equivalent in the repo's agent-surface home). |
| 3 | Runbooks | Update the runbooks so any agent can find the guidance and hand off cleanly. | `.agents/runbooks/design.md`, `.agents/runbooks/implementing.md`, `.agents/runbooks/code-style.md`, `.agents/runbooks/testing.md`, `.agents/runbooks/asset.md`. |
| 4 | Tools, libraries, and MCP servers | Define and install the dependencies and external connectors the skills and runbooks will use. | `src/client/package.json` updates, Vite/Tailwind/shadcn setup, `vite-plugin-image-optimizer` or equivalent, `motion`, `lenis`, `lucide`, `@fontsource`, `openai-image` MCP, `mcp-playwright`, `deepwiki`. |
| 5 | Preflight and taste gates | Wire the repo to enforce the standards from the skills and runbooks, not just ask politely. | `tools/run.py design-preflight`, `unslop` design/frontend/motion/a11y profiles, `handoff-gates` for design specs, contrast/bundle/CLS checks. |

## Handoff from this foundation epic

When the foundation phases are done, the repo will contain:

- A set of skills that any agent can read to understand the target quality.
- Subagent profiles that can be dispatched to do design research, taste review, token auditing, and motion review.
- Runbooks that describe the workflow for each design task.
- Tools and MCP servers that the skills and runbooks can invoke.
- Preflight and handoff gates that enforce a minimum quality bar.

The next epic, **Premium Portfolio Implementation**, can then begin. It will use these foundations to actually redesign and rebuild the site.

## Phase 1: Skills

### Proposed repo-owned skills

Skills are unprefixed unless they are a repo-specific override of a marketplace skill (per the `rooms-mostly` pattern).

1. `designing-premium-sites` — the umbrella taste/principles skill.
   - Vendored authority: `Resilient Web Design` (CC BY-SA 4.0), `The Shape of Design` (CC BY-NC-SA 3.0), `Web Design in 4 Minutes` (no stated license; user-approved attribution-only vendoring).
   - Synthesized references: the `$10k` vs `$500` design-quality pattern, typography basics, layout principles, motion heuristics, accessibility/performance as quality.
2. `design-tokens` — how to create, name, and consume design tokens; the Tailwind v4 `@theme` contract.
3. `typography-for-the-web` — type pairing, hierarchy, font loading, and fallbacks.
4. `web-layout` — grids, whitespace, composition, and responsive patterns.
5. `motion-patterns` — when and how to use `motion`, `lenis`, scroll reveals, view transitions, and `prefers-reduced-motion`.
6. `asset-custody` — fonts, images, icons: where they live, how they are optimized, and the accessibility implications.
7. `evaluating-design-references` — how to look at a public portfolio or Dribbble shot and decide whether a pattern is worth adopting, not copying.

### Validation for Phase 1

- Every skill has a `SKILL.md` and the `assets/authority/` / `references/` structure used by `writing-with-clarity`.
- Every vendored source has a `CITATIONS.md` and compatible license.
  - Exception: If a source has no stated license, it may be vendored with attribution and a recorded user acceptance when the source is otherwise public and the user explicitly approves.
- The normal commit's tracked hook passes its complete `ci --check` gate.

## Phase 2: Subagent profiles

Subagents cannot invoke skills, but they can read files. Each profile must point to the relevant skill files explicitly.

Proposed profiles:

1. `design-researcher` — evaluates public reference repos and writes a concise pattern summary.
2. `taste-reviewer` — rates a proposed page or component against the `designing-premium-sites` skill.
3. `design-token-auditor` — checks token coverage, contrast, and Tailwind v4 `@theme` usage.
4. `motion-reviewer` — checks animation heuristics, reduced-motion support, and performance.

These profiles live in the repo's agent-surface home (e.g., `.agents/agents/` or the equivalent for this repo's standards) and are referenced from runbooks.

## Phase 3: Runbooks

Update or add:

- `.agents/runbooks/design.md` — how to evaluate a premium portfolio pattern and write a design spec.
- `.agents/runbooks/implementing.md` — how to install and configure the design-system stack in `src/client/`.
- `.agents/runbooks/code-style.md` — component, token, and animation conventions.
- `.agents/runbooks/testing.md` — visual regression, accessibility, and motion checks.
- `.agents/runbooks/asset.md` — how to add fonts, images, and icons the right way.

## Phase 4: Tools, libraries, and MCP servers

### Frontend dependencies

- Tailwind CSS v4 with `@tailwindcss/vite`.
- `shadcn/ui` for Vite.
- `motion` (formerly Framer Motion).
- `lenis` for smooth scroll.
- `lucide-react` for icons.
- `@fontsource` or `vite-fonts` for self-hosted fonts.
- `vite-plugin-image-optimizer` or `vite-imagetools`.

### MCP servers

- `deepwiki` — already configured; for researching public repos.
- `mcp-playwright` — already configured; for visual regression.
- `openai-image` — **currently missing, needs re-creation**; for generating hero and background assets from the user's OpenAI API key.

### Repo tools

- Update `src/client/package.json`.
- Update `src/client/vite.config.ts`.
- Add a `py -3 tools/run.py design-preflight` surface in Phase 5.

## Phase 5: Preflight and taste gates

This is the enforcement layer. Without it, the skills and runbooks are just polite requests.

- `tools/run.py design-preflight` — checks token coverage, color contrast, font loading, image sizes, bundle size.
- `unslop` profiles for design, frontend, motion, and accessibility in the repo's unslop home.
- `handoff-gates` for design specs: 8/10 floor before a spec becomes a plan.
- `taste-reviewer` subagent can be dispatched on any design PR.

## Files and surfaces that will change

| Surface | What | Source vs derived |
|---|---|---|
| `.agents/skills/designing-premium-sites/` | Repo-owned skill with vendored sources and synthesized references | Source |
| `.agents/skills/design-tokens/`, `.agents/skills/typography-for-the-web/`, etc. | Repo-owned pattern skills | Source |
| `.agents/agents/<profile>.md` | Subagent profiles for design research, taste review, token audit, motion review | Source |
| `.agents/runbooks/*.md` | Updated guidance | Source |
| `.agents/docs/research-log.md` | Research findings and decisions | Source |
| `src/client/package.json` | New dev/prod dependencies | Source |
| `src/client/vite.config.ts` | Vite plugins for fonts/images/Tailwind | Source |
| `.agents/doctrine/{non-repo-locations,artifact,mesh,workflow,surface-classification}-policy.md`, `.agents/{skills,doctrine,docs,runbooks}/AGENTS.md` | Stale AGENTS router and doctrine split/rename surfaces | Source |
| `tools/run.py` or a new `design-preflight` script | Enforce design standards | Source |

## Source-of-truth boundaries

- **Skills and runbooks** are repo-owned source; edit them directly.
- **Subagent profiles** are repo-owned; they read skills but cannot invoke them, so the profile text must embed the routing.
- **Marketplace-derived skills** are generated copies under `.agents/skills/`; never hand-edit, refresh from `.agents/plugins/marketplace-source`.
- **Vendored reference sources** in `assets/authority/reference-source/` are copied under their original licenses with `CITATIONS.md`.
- **Reference repo findings** are research, not code; record in `.agents/docs/research-log.md` and respect licenses if any code is later copied.

## Validation bundle

- The normal commit's tracked hook passes its complete `ci --check` gate.
- `py -3 .agents/skills/repo-standards/scripts/repo_standards.py --check` passes.
- `py -3 .agents/skills/generating-agent-mesh/scripts/validate_agent_mesh.py --check` passes.
- New or changed skills have the `SKILL.md` + `assets/authority/` + `references/` structure.
- New subagent profiles are documented and referenced from runbooks.
- New `design-preflight` command has a `check` mode and an `apply` mode.

## Open questions (user-owned)

1. Which of the proposed skills should exist now, and which can wait? Is `designing-premium-sites` the right single umbrella, or should it be split?
2. Where do subagent profiles live in this repo? `.agents/agents/` is the most likely home, but the repo standard may want another name.
3. How should the `openai-image` MCP be re-created? It needs the user's OpenAI API key, so the config must reference `OPENAI_API_KEY` from the environment or a `.env` file, not be checked in.

## Spec self-review

- **Placeholder scan**: No TBD or TODO sections. Open questions are explicit.
- **Internal consistency**: Phases are sequential and produce a usable foundation, not a redesign.
- **Scope check**: This is a foundation spec; it deliberately excludes implementation.
- **Ambiguity check**: Source-of-truth, validation, and the next-epic boundary are explicit.

**Spec rating: 8/10.** It reaches 9/10 once the open questions are answered and the `openai-image` MCP plan is finalized.
