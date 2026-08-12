# Portfolio Premium Epic — Master Spec

## Goal

Turn the existing `portfolio` repository from a working wireframe into a durable, agent-navigable foundation for a `$10k-feel` developer portfolio. The first deliverable is **not code or visual design**; it is the set of skills, runbooks, tools, and workflows that survive a context reset and let any agent rehydrate the agreed approach without re-inventing it.

## Non-goals

- No new application UI or component code in this epic.
- No visual identity or style decisions until the research and runbook foundation exists.
- No 3D/Spline/WebGL or advanced cinematic scroll work until later phases.
- No backend (.NET) feature work beyond the minimum needed to serve the client.
- No CMS, authentication, or blog infrastructure decisions.

## Why this approach matters

The previous research pass surfaced many high-quality patterns (shadcn/ui, Tailwind v4, Motion, Lenis, image/font optimization, component registries, public reference repos). Without a durable record of which patterns this repo adopts, where they live, and how agents invoke them, every new session would rediscover the same trade-offs. The portfolio cannot reach a `$10k` finish if the process keeps writing in sand.

## Scope of the master spec (this document)

This spec records the discovery, the chosen foundation, and the phase boundaries. Subsequent phase specs will fill in design and implementation details.

In scope:

1. Define the target state for skills, runbooks, tools, and workflows.
2. Decide which design-system / animation / asset patterns this repo will adopt.
3. Propose a phased roadmap and the criteria for moving between phases.
4. Identify the files and surfaces that will change or be created.
5. State the validation bundle and handoff gates for the roadmap.

Out of scope for this spec:

- Detailed page designs (hero, project, writing, etc.).
- Token values, color palettes, or font selections.
- Component-level API contracts.
- Build-time asset pipeline implementation.

## Current baseline

The client is `src/client/`, a Vite + React 19 + TypeScript 6 SPA. It uses SCSS tokens in `src/client/src/styles/_tokens.scss`, `styled-components`, `react-markdown`, `@tanstack/react-query`, `react-router-dom`, Vitest, and Playwright. The .NET server in `src/server/` serves a content manifest and markdown files from `src/content/`.

## Proposed epic phases

| Phase | Title | Goal | Output |
|---|---|---|---|
| 1 | Foundation | Adopt skills, runbooks, and tools that make premium front-end work reproducible. | Updated runbooks, skill stubs, tool contracts, and a `roadmap.md`.
| 2 | Research & identity | Lock the visual identity, design system, and animation vocabulary. | Design-decision runbook, identity spec, reference repo summary.
| 3 | Design system & tokens | Write the token/theme spec and add the chosen design-system skeleton. | `.agents/specs/2026-08-12-design-system-spec.md`, Tailwind v4 config, `shadcn/ui` Vite setup.
| 4 | Component library | Define owned component library, animation patterns, and accessibility baseline. | `.agents/specs/2026-08-12-component-library-spec.md`, runbook for components and motion.
| 5 | Page specs | Write one spec per page/section (home, project, writing, index, project-index, writing-index, error). | `.agents/specs/2026-08-12-<page>-spec.md`.
| 6 | Implementation | Execute the plans derived from the page specs, one slice at a time. | Commits/PRs per plan, `roadmap.md` updated.

## Phase 1: Foundation (the first plan to write)

### Discover and adopt agent-facing guidance

- Audit which existing skills should own the work (`/brainstorming`, `/feature-sliced-design`, `/react`, `/unslop-plus` `frontend-ui`, `/wcag`, `/webapp-testing`, `/writing-with-clarity`).
- Decide whether to create repo-owned skills under `.agents/skills/port-*/` for portfolio-specific guidance (e.g., `port-design-tokens`, `port-motion-patterns`).
- Update or create runbooks so any agent can find the guidance:
  - `.agents/runbooks/design.md` — how to evaluate a premium portfolio pattern.
  - `.agents/runbooks/implementing.md` — how to install and configure the design-system stack in `src/client/`.
  - `.agents/runbooks/code-style.md` — component, token, and animation conventions.
  - `.agents/runbooks/testing.md` — visual regression and accessibility checks.
- Define the canonical commands in `tools/run.py` or standalone scripts:
  - `py -3 tools/run.py ci --check` already exists.
  - Add a command or script for design-system checks (token coverage, contrast, bundle size) if one is needed.

### Record the research

- Maintain a `research-log.md` in `.agents/docs/` that summarizes the public reference repos, DeepWiki findings, and web research.
- Record the chosen patterns with their source-of-truth boundaries (e.g., shadcn/ui components are copied source in `src/client/src/components/ui/`, Motion is an `npm` dependency, reference repo findings are not copied code).

### Validation for Phase 1

- `py -3 tools/run.py ci --check` passes after every change.
- Every new runbook and skill has a `SKILL.md` or `.md` with a clear "Read When" and custody contract.
- The `INDEX.md` mesh stays current.
- A draft `roadmap.md` is created in `.agents/plans/portfolio-premium/`.

## Design-system and animation vocabulary (tentative, subject to Phase 2 confirmation)

This is the current leading set of recommendations. Phase 2 will either confirm or replace it.

- **Styling engine**: Tailwind CSS v4 with `@theme` tokens.
- **Component base**: shadcn/ui initialized for Vite; copy source into `src/client/src/components/ui/`.
- **Motion**: `motion` (formerly Framer Motion) for declarative animations.
- **Scroll smoothing**: `lenis` or a minimal alternative.
- **Icons**: `lucide-react`.
- **Typography**: self-hosted variable fonts via `@fontsource` or `vite-fonts`.
- **Image pipeline**: `vite-plugin-image-optimizer` or `vite-imagetools` for AVIF/WebP/SVG optimization.
- **Reference repos to keep in the research log**: `roshan-1205/roshan-portfolio`, `byosamah/folio`, `luisdiaz327/portfolio-diip3sh`, `robritacca-dotcom/design-system`, `dpaez/local-components`, `ManningWorks/Projex`.

## Files and surfaces that will change

| Surface | What | Source vs derived |
|---|---|---|
| `.agents/skills/port-*/` | Repo-owned skills for design, tokens, motion | Source |
| `.agents/runbooks/*.md` | Updated runbooks for design, implementing, testing | Source |
| `.agents/specs/2026-08-12-*.md` | Phase and page specs | Source |
| `.agents/plans/portfolio-premium/roadmap.md` | Epic roadmap | Source |
| `.agents/docs/research-log.md` | Research findings and decisions | Source |
| `src/client/package.json` | New dev/prod dependencies | Source |
| `src/client/src/styles/` | New token/global CSS | Source |
| `src/client/src/components/ui/` | shadcn/ui copied source | Derived from shadcn via CLI; owned after copy |
| `src/client/vite.config.ts` | Vite plugins for fonts/images/Tailwind | Source |
| `src/client/src/lib/` | `cn()` / motion / token helpers | Source |

## Source-of-truth boundaries

- **Skills and runbooks** are repo-owned source; edit them directly.
- **Marketplace-derived skills** are generated copies under `.agents/skills/`; never hand-edit, refresh from `.agents/plugins/marketplace-source`.
- **shadcn/ui components** are copied source that this repo owns after installation; treat them like application code.
- **Reference repo findings** are research, not code; record in `.agents/docs/research-log.md` and respect licenses if any code is later copied.

## Validation bundle

- `py -3 tools/run.py ci --check` passes.
- `py -3 .agents/skills/repo-standards/scripts/repo_standards.py --check` passes.
- `py -3 .agents/skills/generating-agent-mesh/scripts/validate_agent_mesh.py --check` passes.
- New or changed runbooks/skills are linted by `repo-standards` surface checks.
- Every phase spec is rated `8/10` or higher through the design handoff gate before it moves to `working-with-epics`.

## Handoff from this spec

1. User reviews and approves this master spec.
2. Create `.agents/plans/portfolio-premium/roadmap.md` from the phase table above.
3. Use `/working-with-epics` to write Plan 1 (Foundation / research and adoption).
4. Use `/writing-plans` for the detailed plan document.
5. Execute Plan 1 with `/executing-plans` or a subagent-driven lane.

## Open questions (user-owned)

1. Visual identity: keep the current warm/serif palette, move to a dark cinematic palette, or design a token system that supports both?
2. Do we want to own repo-specific skills under `.agents/skills/port-*/` for design-tokens, motion-patterns, and asset-custody?
3. Should the .NET server remain a pure content API, or should it own optimized font/image assets?

## Spec self-review

- **Placeholder scan**: No TBD or TODO sections. Open questions are explicitly user-owned.
- **Internal consistency**: Phases are sequential; each later phase depends on the foundation.
- **Scope check**: This is a master spec; it deliberately avoids implementation details.
- **Ambiguity check**: Source-of-truth and validation are explicit.

**Spec rating: 8/10.** It can reach 9/10 once the open questions are answered and the tentative design-system vocabulary is confirmed in Phase 2.
