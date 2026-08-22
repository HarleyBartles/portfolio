# Portfolio £10k Phase 12: Launch Audit and Measurement Decision Design

**Status:** Approved

**Approved design dialogue:** 22 August 2026

**Approved written specification:** 22 August 2026

**Spec-readiness:** 9/10

**Implementation-plan readiness:** Deferred until Phases 1–10 have landed and
Phase 11 has been re-checked

**Repository snapshot inspected:** `d650c387f4487754092e5f6dee484983f7514b08`

**Depends on:** the complete implemented portfolio and its deployed launch
candidate

This specification defines the whole-site launch audit. It is not a second
redesign phase and is not permission to quietly enlarge earlier scopes. The
JIT plan must audit current source and deployed truth, close bounded defects,
record explicit deferrals, and seek final human launch approval.

## Goal

Prove that the portfolio is an honest, coherent, accessible, technically
finished hiring instrument for senior full-stack roles. Resolve launch-blocking
defects and leave a dated evidence report that distinguishes automated
consistency, manual quality judgement, deployed behaviour, and external state.

## Frozen design baseline

The approved direction checkpoint, portfolio design policy, design-decision
ledger, roadmap, and Phase 1–11 outcomes form the launch baseline. Phase 12 may
repair defects against that baseline. It may not introduce a new visual
language, content system, project argument, interaction, host, or measurement
programme.

When audit evidence conflicts with a protected design decision or public fact,
stop and return to the owning specification or Harley. Do not redefine success
to make the audit green.

## Audit tracks

### Hiring journey and editorial argument

Verify the ten-second homepage proposition, the quiet professional route, the
four distinct case-study arguments, the five-essay entry and continuation
journeys, Patch fairytale interlude, About narrative, CV, contact path, and
availability language.

The site should read as an authored view of how Harley thinks across domains,
not a sequence of repeated claims that he should be hired.

### Factual and privacy integrity

Check employment chronology, role language, education, project maturity,
article datelines, licensing, contact handling, current availability, and every
claim whose source may have drifted. Confirm that no proprietary employer
detail, private plan, plaintext personal contact information, invented metric,
or stronger title than Harley holds has entered public output.

### Route and state completeness

Exercise every public route and navigation edge, including direct deep links,
client transitions, reloads, configured base paths, unknown routes, loading,
content failure, external links, back/forward history, CV, contact activation,
and share fallbacks. There must be no placeholder, dead end, stale route,
unlabelled control, or homepage impersonation.

### Content completeness

Confirm the implemented launch floor:

- four project case studies with distinct senior-proof responsibilities;
- five fully groomed essays with two core and three agentic arguments;
- curated essay continuations rather than random adjacency;
- the approved Patch fairytale presence;
- About, professional facts, CV, and contact surfaces; and
- honest current/future language for unfinished projects and curriculum.

### Progressive enhancement, discovery, and sharing

Verify route-specific first paint, static direct-route identity, canonical
metadata, sitemap, robots, social artwork, favicon/touch icon, restrained share
fallbacks, custom domain or proven project-URL fallback, and LinkedIn preview
behaviour. Repository proof and DNS/platform proof remain separate.

### Accessibility and responsive finish

Review every layout family at 1440, 768, 390, and 320 CSS pixels, keyboard-only,
200% zoom, reduced motion, forced or high-contrast conditions where supported,
and representative screen-reader navigation. Combine automated accessibility
checks with manual landmarks, headings, names, focus, order, announcements,
alternative intent, target size, reflow, and error-recovery checks.

### Performance and resilience

Inspect production bundles, route chunks, images, fonts, layout shift, first
useful paint, lazy media, failed or slow content, console errors, network
failures, and third-party dependencies. Verify that premium finish has not
become an oversized homepage or fragile critical path.

### Custody and attribution

Reconcile every deployed image, font, icon, diagram, screenshot, social card,
PDF, and cross-repository derivative with the asset-custody record. Verify
source, owner, licence, attribution, transformations, and public-use authority.
The portfolio must be the golden example of the standards it describes.

### Browser and deployment coverage

Run representative core journeys in Chromium, Firefox, and WebKit. Verify the
actual deployed commit, URL, HTTP behaviour, TLS, redirects, deep routes,
unknown route, contact activation state, social assets, sitemap, robots, and
custom-domain or fallback posture.

## Defect triage

### Launch blockers

Fix before launch:

- broken homepage-to-evidence or professional-contact journeys;
- false, unapproved, stale-sensitive, or confidentiality-breaking claims;
- inaccessible essential content or action;
- broken route, direct load, CV, contact, metadata, or first paint;
- failed deployment, TLS, redirect, or fallback guarantee;
- major responsive overflow or unreadable content;
- missing required attribution or public-use authority;
- canonical validation or production-build failure; and
- material performance regression against repository budgets.

### Contained polish defects

Fix in Phase 12 when the correction is bounded, evidence-backed, and does not
change the approved design: inconsistent spacing, a missed focus state, weak
alt intent, small copy drift, an isolated browser defect, or an incorrect
derived file.

### Deferred enhancements

Record rather than build ideas that are useful but not needed for launch,
including RSS, JSON-LD, Search Console, PWA work, analytics, and value-gated
interaction. Do not create a fictional delivery schedule.

If a defect exposes an architectural or editorial decision rather than a
contained repair, return it to the owning phase and Harley. Launch pressure is
not authority to improvise.

## Measurement decision

**No analytics are added at launch.**

The portfolio is intended to persuade known visitors reached through
applications, conversation, and deliberate LinkedIn seeding. There is no named
product decision that currently requires first-party visitor data. Adding an
analytics dependency would create privacy, consent, security, performance, and
maintenance surface without a decision it can improve.

Reconsider measurement only when all of the following exist:

- a concrete decision Harley will make differently based on the answer;
- a narrowly stated question and minimum data required;
- a privacy-conscious collection and retention posture;
- evidence that platform-level or campaign-level information cannot answer it;
- a maintenance owner; and
- explicit human approval of the implementation and public privacy effect.

Absence of analytics is not absence of SEO or sharing competence. Phase 9
demonstrates those concepts through inspectable metadata, URLs, previews, and
deterministic discovery files.

## Durable audit evidence

Create `docs/portfolio-10k-launch-audit.md` as a dated launch receipt, not a
perpetual status dashboard. It records:

- audited branch, commit, build, deployment URL, and timestamp;
- baseline specs and protected decisions used;
- public route and core-journey matrix;
- automated commands, versions, results, and limitations;
- manual viewport, zoom, keyboard, reduced-motion, contrast, and screen-reader
  observations;
- cross-browser coverage;
- performance and bundle evidence;
- factual, privacy, custody, and attribution review;
- external domain, redirect, social-preview, and contact activation proof;
- defects found, disposition, owner, and verification;
- explicit launch deferrals;
- the no-analytics decision; and
- launch recommendation plus Harley's final approval or blocker.

Screenshots and machine output support the report but do not substitute for a
concise conclusion. A green CI run proves repository consistency only.

## Likely implementation seams

The JIT plan must inspect the landed repository. Expected surfaces include:

- all public route and content sources;
- route catalogue and site profile configuration;
- production build, bundle budgets, and public-route checks;
- Vitest and Playwright suites, including all configured browsers;
- generated sitemap, robots, route documents, and social assets;
- contact-provider activation evidence and CV artefact;
- `docs/asset-custody.md`;
- `docs/design-decisions.md`;
- the README public roadmap and explicit deferrals;
- the new dated launch-audit report; and
- only those source files required for bounded audit defect repairs.

## Verification sequence

1. Freeze and record the candidate commit.
2. Run deterministic generation and canonical repository validation.
3. Run focused unit/component tests and the production build.
4. Run full Chromium, Firefox, and WebKit route journeys.
5. Perform manual responsive, accessibility, content, and editorial review.
6. Inspect performance and custody evidence.
7. Deploy the exact reviewed commit.
8. Verify domain/fallback, redirects, deep routes, contact state, metadata,
   discovery files, social previews, and failure routes externally.
9. Repair bounded defects and repeat the affected checks plus the canonical
   gate.
10. Complete the audit report and obtain human launch approval.

The canonical repository command is:

```powershell
py -3 tools/run.py ci --check
```

Use `ci --apply` only for intended mechanical surfaces, inspect its diff, and
rerun check mode. Report any test not run, browser not available, external
state not observed, or manual judgement not independently reviewed.

## Non-goals

- no visual redesign or new design system;
- no sixth launch essay, fifth case study, or new project argument;
- no interactive proof feature;
- no analytics, tag manager, cookie banner, session replay, tracking pixel, or
  campaign-parameter scheme;
- no host migration or infrastructure programme;
- no RSS, JSON-LD, Search Console, or PWA implementation;
- no invented publication cadence, traffic target, conversion target, or SEO
  growth claim;
- no hiding known defects by weakening tests or acceptance criteria; and
- no claim of launch readiness based only on CI.

## Acceptance criteria

- [ ] the complete site is audited against the approved design baseline rather
      than a newly invented standard;
- [ ] the ten-second hiring proposition and all core evidence journeys work;
- [ ] professional facts, current claims, confidentiality boundaries, dates,
      maturity language, CV, contact, and availability are re-verified;
- [ ] four distinct case studies and five fully groomed essays meet their
      assigned proof responsibilities;
- [ ] every public route, deep link, state, fallback, and external action is
      exercised without placeholders or dead ends;
- [ ] route first paint, metadata, discovery, sharing, domain/fallback, and
      social previews are proven on the deployed candidate;
- [ ] responsive, keyboard, zoom, reduced-motion, contrast, automated, and
      representative screen-reader evidence is recorded;
- [ ] Chromium, Firefox, and WebKit representative journeys pass or any genuine
      blocker is declared;
- [ ] production performance, bundles, images, fonts, and layout stability
      remain within the repository contract;
- [ ] every deployed asset has sufficient custody and attribution evidence;
- [ ] all launch blockers and bounded defects are repaired and re-verified;
- [ ] enhancements are deferred explicitly without speculative dates;
- [ ] no analytics or associated privacy surface is added;
- [ ] `docs/portfolio-10k-launch-audit.md` separates automated, manual,
      deployed, and external evidence;
- [ ] canonical CI passes on the final staged source; and
- [ ] Harley gives final launch approval after reviewing the report and visual
      evidence.

## Readiness assessment

**Rating: 9/10 — approved; implementation planning remains dependency-gated.**

The frozen baseline, audit scope, defect thresholds, measurement decision,
evidence artefact, verification sequence, non-goals, and human launch gate are
explicit. Exact route counts, deployed URLs, test commands beyond the canonical
entrypoint, and defects must remain live inputs for JIT planning.
