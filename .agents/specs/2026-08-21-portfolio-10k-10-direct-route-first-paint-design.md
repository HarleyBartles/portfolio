# Portfolio £10k Phase 10: Direct-route First-paint Finish Design

**Status:** Approved

**Approved design dialogue:** 22 August 2026

**Approved written specification:** 22 August 2026

**Spec-readiness:** 9/10

**Implementation-plan readiness:** Deferred until Phase 9 has landed and the
resolved public-route catalogue is current

**Repository snapshot inspected:** `d650c387f4487754092e5f6dee484983f7514b08`

**Depends on:** Phase 9 route metadata, site profiles, static route documents,
and unknown-route contract

This specification records the approved design for the direct-route loading
experience. It is not an implementation plan. The plan must be written just in
time from this specification and the then-current repository.

## Goal

Make the first useful paint of every public route identify the destination
honestly before its complete React content resolves. Remove the generic
“Preparing the portfolio” experience without adding a runtime backend,
duplicating route truth, or sacrificing lazy loading.

The improvement is progressive enhancement: a direct visitor should see a
small, stable, route-specific document immediately; React then replaces it
with the complete page. This phase does not turn the static shell into a second
copy of the site.

## Current finding to reproduce

At the inspected snapshot:

- the application starts with `createRoot`, not server hydration;
- the router exposes a generic `hydrateFallbackElement`;
- content loading and shared loading pages repeat “Preparing the portfolio”;
- generated route documents provide route metadata but not a useful
  route-specific body before React runs; and
- public pages remain split into lazy route and content chunks.

The JIT plan must reproduce the complete lifecycle before changing it:

1. generated response HTML;
2. first browser paint with JavaScript delayed;
3. router fallback while the route chunk resolves;
4. content fallback while authored content resolves; and
5. replacement by the ready page.

Record timings, screenshots, DOM identity, layout movement, announcements, and
the route/chunk responsible for each transition. The observed phrase is a
symptom; the implementation is chosen from current evidence.

## Approved experience

### Generated route prepaint

Every known public route document contains one small semantic prepaint derived
from the Phase 9 resolved route catalogue. It provides:

- portfolio/site identity;
- route kind and route title;
- the route's concise resolved description;
- a calm, honest indication that the complete presentation is loading; and
- a usable link to the configured homepage.

The prepaint is useful at 320 CSS pixels and 200% zoom, does not depend on
images, and remains legible without JavaScript or custom fonts. It may share
the established visual tokens, but must not imitate the final page so closely
that replacement looks like duplicated or jumping content.

### Client loading states

Router and content-loading fallbacks use the same resolved route record. They
preserve the useful identity already painted rather than replacing it with a
generic application message. Client navigation may use a quieter transition
because the visitor already has a functioning page, but it must never flash
the generic preparation state.

The ready route removes or replaces the fallback once. Replacement must not:

- create duplicate page headings in the accessible tree;
- announce the same loading state repeatedly;
- move keyboard focus;
- obscure already available navigation;
- introduce a large cumulative layout shift; or
- wait for decorative media before exposing useful content.

### Unknown and failed routes

Unknown routes receive an honest unknown-route prepaint and route to the useful
not-found experience. They do not inherit homepage title, description, or
identity beyond the shared site name.

If a known route is absent from the resolved catalogue, generation fails. The
build must not guess. If a lazy chunk or content import fails at runtime, the
loading state yields to a useful error state with a reliable route home.

## Source-of-truth contract

- Phase 9's resolved route catalogue owns public route title, kind,
  description, indexability, and canonical path.
- The selected site profile owns public origin and base path.
- Generated HTML, router fallback, and content fallback consume those
  authorities; they do not introduce parallel route registries or prose.
- Loading-stage labels and error-state language may be shared presentation
  primitives, but they do not own route facts.
- Generated route bodies are derived output and must be reproducible in check
  mode.

## Non-goals

- no SSR, streaming framework, runtime backend, edge worker, or host migration;
- no full duplicate render of project, essay, fairytale, CV, or About content;
- no removal of useful route or content code-splitting;
- no route-prefetching programme beyond evidence required for this defect;
- no fake progress meter, skeleton theatre, autoplay, or loading animation;
- no promise that the complete site works without JavaScript;
- no redesign of the homepage, navigation, article template, or case studies;
  and
- no brittle test coupled only to the exact replacement sentence.

## Binding execution model

This binding, prospective execution model governs implementation,
continuation, or rework begun after 23 August 2026. It does not claim who
planned, implemented, reviewed, or accepted earlier work.

GPT-5.6 Sol is the sole main phase orchestrator. Sol reads the roadmap, this
approved phase specification, current repository truth, the portfolio design
policy, design-decision ledger, and relevant runbooks; writes the JIT
implementation plan; selects `/subagent-driven-development`; and maintains the
whole-plan view, task sequencing, integration, evidence, handoff readiness,
and completion drive.

Every implementation, research, repair, task-review, re-review, and
final-review subagent uses GPT-5.6 Terra. Generic escalation must not create a
Sol child: the Sol main agent narrows or replans the work and redispatches
Terra.

Terra may draft creative work, but Sol personally reviews every material
creative output: public copy, creative writing, visual style, art direction,
hierarchy, imagery and capture framing, and interaction tone. Sol assesses
taste, humanness, restraint, specificity, and AI-slop risk against the £10k
portfolio bar; may veto; and must dispatch Terra iteration until the output
passes before handoff readiness.

This creative gate precedes and does not replace any named Harley approval or
factual, privacy, custody, accessibility, deployed-proof, or protected-default
gate. It is an additional delivery gate, not a substitute for human decisions
or other evidence.

## Likely implementation seams

The JIT plan must re-inspect names and ownership. Current likely surfaces are:

- the Phase 9 authored route sources and resolved route catalogue;
- `src/client/scripts/generate-route-documents.mjs` or its landed replacement;
- generated route documents and `404.html`;
- `src/client/src/app/router.tsx`;
- `src/client/src/main.tsx`;
- `src/client/src/pages/ContentPage.tsx`;
- `src/client/src/pages/LoadingPage.tsx` or its replacement;
- one small first-paint/loading presentation boundary;
- focused generator, component, accessibility, and Playwright tests; and
- bundle and public-route validation already owned by the canonical CI path.

Prefer the smallest implementation that lets the route catalogue render a
shared semantic prepaint at build time and lets the client adopt the same
record. Do not create a framework-shaped abstraction for one transition.

## Accessibility and performance contract

- the first paint has one meaningful landmark and one clear route identity;
- loading status is announced at most once and only while useful;
- replacement neither steals focus nor strands a keyboard user;
- the homepage link has an accessible name and configured base path;
- visual loading treatment does not rely on motion;
- `prefers-reduced-motion` receives an immediate or effectively static change;
- the prepaint remains usable at 320 CSS pixels and 200% zoom;
- route-specific data adds no runtime network request;
- route and content lazy chunks remain separate where they currently earn
  their budget;
- the implementation stays inside existing JavaScript, CSS, image, and font
  budgets; and
- the transition avoids material cumulative layout shift.

## Testing contract

### Generator and catalogue tests

Automated tests prove:

- representative home, index, About, project, essay, fairytale, CV, and
  contact documents contain the correct route-specific prepaint;
- generated title, kind, description, and home link equal the resolved
  catalogue and active profile;
- known routes missing catalogue records fail generation;
- unknown-route output is honest and cannot impersonate a known route;
- derived output is stable after apply then check; and
- the generic “Preparing the portfolio” phrase is absent from generated public
  route bodies and production loading paths.

### Component and browser tests

Tests delay or block JavaScript, route chunks, and content imports separately
and prove:

- the direct first paint identifies the requested route before React is ready;
- a long load retains stable useful identity and navigation;
- client navigation never flashes a generic preparation screen;
- ready content replaces the fallback once;
- headings, landmarks, live announcements, and focus are not duplicated or
  displaced;
- chunk or content failure reaches a useful error path;
- the not-found route remains distinct;
- no horizontal overflow appears at 320 CSS pixels or 200% zoom;
- reduced-motion behaviour is calm and complete; and
- representative transitions stay within an agreed layout-shift threshold.

### Performance evidence

Compare before and after production builds and representative browser traces.
Report route chunking, output sizes, first useful paint, layout shift, and any
new blocking resource. A faster-looking transition does not justify a larger
eager application shell that weakens Phase 9's static delivery.

### Canonical repository gate

Finish with the staged tree and:

```powershell
py -3 tools/run.py ci --check
```

Use `ci --apply` only for intended mechanical regeneration, inspect the diff,
then rerun check mode. Green CI proves consistency, not the quality of the
first-paint transition.

## Manual quality review

Review direct and client navigation at 1440, 768, 390, and 320 CSS pixels,
keyboard-only, 200% zoom, reduced motion, JavaScript delayed, and JavaScript
disabled.

The reviewer answers:

- Can a hiring manager tell which page they opened before the application is
  ready?
- Does the prepaint feel like intentional editorial identity rather than a
  spinner with better copy?
- Is the transition restrained enough to disappear from attention?
- Does the ready page arrive without a visible duplicate or jump?
- Are slow and failed loads honest and useful?
- Has the solution preserved the simplicity and reliability of static Pages
  delivery?

## Acceptance criteria

- [ ] the current lifecycle is reproduced and recorded before implementation;
- [ ] every known public direct route emits useful route-specific prepaint;
- [ ] the prepaint consumes the Phase 9 catalogue and selected site profile;
- [ ] unknown routes remain honest and distinct;
- [ ] “Preparing the portfolio” is absent from public production first paint;
- [ ] client and content fallbacks never replace specific identity with a
      generic message;
- [ ] ready content replaces the fallback once without focus movement,
      duplicate headings, or repeated announcements;
- [ ] long and failed loads preserve useful navigation;
- [ ] lazy loading and bundle budgets remain intact;
- [ ] no runtime backend, SSR framework, duplicate route registry, or full
      duplicate content render is added;
- [ ] generator, unit, browser, accessibility, responsive, and performance
      evidence passes; and
- [ ] manual review confirms a quiet premium transition rather than loading
      theatre.

## Readiness assessment

**Rating: 9/10 — approved; implementation planning remains dependency-gated.**

The goal, authority, fallback states, non-goals, likely seams, validation, and
quality gate are explicit. Exact component names and the best adoption
mechanism intentionally remain for JIT planning after Phase 9 establishes the
route catalogue.
