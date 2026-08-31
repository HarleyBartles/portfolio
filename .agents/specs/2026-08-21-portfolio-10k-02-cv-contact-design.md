# Portfolio £10k Phase 2: CV and Contact Conversion Design

**Status:** Approved

**Approved design dialogue:** 21 August 2026

**Approved written specification:** 21 August 2026

**Spec-readiness:** 9/10

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Depends on:**
[Phase 1: Professional Truth and About Narrative](2026-08-21-portfolio-10k-01-professional-truth-about-design.md)

**Design baseline:** `556059655dd4f766f591207b864ea0110051379c`

## Goal

Replace the portfolio's two conspicuous unfinished hiring states with:

1. a concise, conventional two-page CV available as accessible HTML and a
   downloadable PDF; and
2. a working, privacy-conscious contact journey that reaches Harley without
   publishing his personal email address or adding a runtime backend.

The phase should let a hiring manager move from interest to action without
weakening the site's editorial restraint. It consumes the approved professional
facts from Phase 1 rather than creating a second career narrative.

## Approved decisions

- Add a public `/cv` route, linked from About but absent from primary
  navigation.
- Compose the CV as print-first semantic HTML and generate its PDF with the
  repository's existing Playwright/Chromium dependency.
- Keep the PDF to exactly two A4 pages.
- Use Formspree as the contact transport through the existing
  `VITE_CONTACT_FORM_ENDPOINT` seam.
- Retain the existing small `fetch` integration. Do not add a Formspree SDK.
- Publish remote-first availability and a four-week notice period.
- Keep salary expectations private.
- Publish no personal email address or telephone number in source, HTML, PDF,
  metadata, logs, or test fixtures.
- Keep acting as an About-only `In a previous life` aside. It does not appear
  in the CV.

## Current state

The live repository already provides most of the contact component boundary:

- `AboutPage` reads `VITE_CONTACT_FORM_ENDPOINT` and passes it into
  `ContactForm`;
- `ContactForm` rejects missing, non-URL, and non-HTTPS endpoints;
- configured submissions use `fetch`, `FormData`, and
  `Accept: application/json`;
- idle, submitting, sent, error, and disconnected states already exist;
- failure preserves the form because reset occurs only after success; and
- focused unit tests cover endpoint safety and basic success/failure behaviour.

The unfinished states are equally explicit:

- About says that a conventional CV is coming;
- no `/cv` route or PDF artefact exists;
- the normal unconfigured build renders the honest disconnected contact state;
  and
- the current honeypot name, `company_website`, does not use Formspree's
  standard `_gotcha` contract.

Phase 2 should finish these seams rather than replace them with a form or
résumé framework.

## Outcome boundaries

Phase 2 will deliver:

- the public `/cv` HTML route;
- an exact two-page PDF generated into the production build;
- a finished CV/download section on About;
- approved availability and notice-period copy;
- Formspree-compatible contact submission and privacy copy;
- configured, disconnected, success, and recoverable-failure states;
- route, accessibility, privacy, PDF, and contact verification; and
- the deployment seam required to activate the production endpoint without a
  repository literal.

Phase 2 will not deliver:

- a standalone skills, experience, availability, privacy, or contact page;
- a public salary range or current salary;
- a public personal email address or telephone number;
- a portrait, headshot, acting credit, complete filmography, references, or
  hobbies section in the CV;
- a third-party PDF library, form SDK, custom backend, database, analytics
  event, attachment flow, newsletter, account system, or custom CAPTCHA;
- a general-purpose CV renderer or multiple CV variants;
- automatic live submissions from CI; or
- changes to the primary site navigation.

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

Every subagent must use GPT-5.6 Terra. This includes implementation,
research, repair, task-review, re-review, and final-review subagents. Only the
main GPT-5.6 Sol orchestrator may create subagents: Terra workers cannot
delegate or create children. A Terra worker may propose decomposition or a
fresh-context review to Sol; Sol alone decides dispatch, role and reasoning
effort, sequencing, budget, concurrency, and reconciliation, and records that
decision in the plan or ledger. Keep the topology shallow: Sol -> Terra only;
Terra -> Terra descendants are prohibited. Generic escalation must not create a
Sol child: the Sol main agent narrows or replans the work and redispatches
Terra.

Before Terra begins material creative work, Sol records a phase-specific
creative-review brief in the JIT plan. Sol derives it from the approved phase
outcome, non-goals, protected defaults, design policy, decision ledger, and
current repository truth. The brief names the audience, intended response,
constraints and protected defaults, factual and privacy boundaries,
distinctive design intent, failure modes, observable acceptance signals, and
evidence surface.

The JIT plan records Sol's selected review lenses. Sol must use
`/writing-with-clarity` and the matching `/unslop-profiles` profile for
material prose, creative writing, documentation, plans, and handoffs, plus
the relevant artifact-specific skills and doctrine lenses. Model reputation or
an unsupported claim that Sol has better taste is never acceptance evidence.

Terra may draft creative work, but Sol personally reviews every material
creative output: public copy, creative writing, visual style, art direction,
hierarchy, imagery and capture framing, and interaction tone. Sol assesses
taste, humanness, restraint, specificity, and AI-slop risk against the £10k
portfolio bar.

Sol inspects the actual rendered or readable artifact, not Terra's
self-description, and records `pass` or `veto`, the artifact and evidence
reviewed, every criterion result, limitations, and unresolved human gates. A
veto becomes a bounded Terra revision brief naming the failed criterion or
emergent defect, observed evidence, intended effect, preserved constraints,
and re-review evidence. It constrains badness and preserves intent without
prescribing the creative answer or collapsing the result into formula.

The rubric is a floor and diagnostic aid, never an exhaustive formula or taste
scorecard; satisfying its listed criteria does not force a pass. Sol may veto
technically compliant work that is lifeless, generic, overwritten, derivative,
predictable, or off-tone, but must identify the artifact evidence, observed
defect, and intended effect. Unarticulated dislike is insufficient.

This process supports consistent, inspectable review and evidence-backed
decisions. It does not mechanically prove taste, humanness, originality, or
£10k quality. CI, profile conformance, or model identity cannot substitute for
Sol's review or a named Harley gate.

This creative gate precedes and does not replace any named Harley approval or
factual, privacy, custody, accessibility, deployed-proof, or protected-default
gate. Iteration stops only on a recorded pass or a genuine Harley-owned
decision.


## Source-of-truth contract

Phase 1's planned `src/client/src/data/professionalProfile.ts` remains the
single authored source for reusable public facts. Phase 2 may extend its types
and data with:

- remote and office-working availability;
- notice period;
- higher, further, and secondary education;
- CV-facing public links; and
- the selected independent work used by the CV.

Do not duplicate employment dates, formal titles, capability classifications,
education facts, or availability strings inside `CvPage`. Page prose may
compose and interpret those facts, just as About does, but the underlying
records remain shared.

The LinkedIn PDF supplied during design is corroborating input, not runtime
data and not repository source. Where it conflicts with Harley's approved
clarifications, the Phase 1 spec and this spec win. Do not commit the supplied
PDF or any local path to it.

## Public availability contract

Publish this meaning without broadening it:

> Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid
> up to one day per week.

Publish `Four weeks' notice` explicitly. The compact CV header may reduce the
location line to `Manchester, UK · Remote-first · Four weeks' notice` when the
full availability sentence appears nearby.

Do not imply weekly travel outside Manchester, more than one office day per
week, relocation, or an immediate start. Do not publish salary information.

## CV content contract

### Professional positioning

Use `Senior software engineer | full-stack and agentic systems` as a
professional headline, not as a fabricated employment title. Every employment
entry retains its real formal title; the current Access title remains
`Software Engineer`.

The summary should make the positive hiring narrative explicit: Harley enjoys
the work, has grown into senior scope, and is looking for a role with a larger
next challenge and room to continue growing. Do not publish dissatisfaction,
unkept promises, salary context, or criticism of Access.

### Page 1

Page 1 contains, in this order:

1. **Identity and contact route.** Harley Bartles, the professional headline,
   Manchester/remote/notice information, portfolio URL, LinkedIn, and the
   portfolio contact route. No email or phone literal.
2. **Profile.** A short evidence-led summary centred on current senior scope,
   full-stack range, and agentic engineering.
3. **Immediate contribution.** A compact scannable answer to what Harley can
   work on now. Use the Phase 1 capability model rather than ratings, logos, or
   exhaustive pattern lists.
4. **The Access Group — Software Engineer, 27 September 2021 to present.** Give
   this the largest employment allocation. Preserve the progression from
   Recruitment CRM through Screening to Access Checks, the greenfield
   involvement in Access Checks, current sole-engineer responsibility, and
   end-to-end ownership across clarification, design, implementation, DevOps,
   release, support, recovery, and operation.

Access copy may name the approved public technology and product boundaries from
Phase 1. It must preserve the distinction between the Django Screening
application and the three Access Checks surfaces:

- the .NET 8/Azure Functions API;
- the React/.NET customer portal; and
- the Playwright-and-LLM-backed checks for DBS and right-to-work public-site
  workflows.

Do not publish confidential metrics, customer identities, candidate data,
internal diagrams, unverified framework names, or the interview-only
engineering-manager anecdote.

### Page 2

Page 2 contains, in this order:

1. **Barbican Insurance Group / Arch Capital Group, February 2019 to September
   2021.** Present one continuous engineering period with an acquisition note,
   retaining the approved workflow-product and architecture evidence.
2. **Brand Addition, July 2005 to January 2019.** Compress the internal
   progression. Make the Team Manager-to-Web Manager transition legible, then
   describe Web Manager as a hybrid business-systems-analysis and
   proto-development role with external developers and limited code exposure.
   Do not reproduce the January 2019 LinkedIn gap entry or claim that Harley
   personally implemented the platform.
3. **Selected independent engineering.** Include exactly Agent Asset
   Marketplace, Wild Bunch, and Agentic Learning Lab. Give each one short
   problem/evidence wording and a portfolio link. The selection demonstrates
   agentic system design, proportionate complex architecture, mentoring, and
   technical leadership.
4. **Education.** Preserve all three educational levels below without letting
   them displace current engineering evidence.

### Education wording

Use these groups and facts:

- **Higher education — in progress:** QA, `AI Engineer Level 6 Apprenticeship`,
  February 2026 to January 2028. Name the underlying Machine Learning Engineer
  standard, ST1398 v1.0. Level 6 may be described as bachelor's-degree level;
  do not claim that Harley holds a bachelor's degree.
- **Further education:** ManCAT, Moston Campus, `Access to H.E. Certificate —
  Media, Theatre, English`, 2002 to 2003.
- **Further education:** Shena Simon F.E. College, `BTEC Level 3 — Performing
  Arts (Music)`, 1997 to 1999.
- **Secondary education:** `Seven GCSEs`. Omit school and dates.

Do not reduce education to the apprenticeship alone. Do not list individual
GCSE subjects or grades without verified source material.

## CV visual and accessibility contract

The CV should look related to the portfolio while remaining recognisably
conventional and easy to scan:

- use the existing type families and design tokens;
- retain warm paper, ink, and a restrained copper accent where print contrast
  remains strong;
- avoid card grids, decorative motion, portraits, logos, skill bars, and
  icon-only contact links;
- keep the body in a simple reading order suitable for copied text and
  assistive technology;
- use semantic headings, lists, links, and dates;
- keep URLs human-readable in the printed PDF while preserving clickable
  links; and
- provide visible screen controls to return to About and download the PDF,
  then hide those controls and the normal site chrome in print media.

`CvPage` should contain exactly two explicit page regions, such as
`[data-cv-page="1"]` and `[data-cv-page="2"]`. Each region maps to one A4 page
under print CSS. Do not rely on incidental browser pagination to decide where
the page break falls.

The screen route may stack the two page regions vertically at narrow widths.
It must remain usable at 320 CSS pixels and 200% zoom without horizontal page
scrolling. The PDF remains A4.

## Route and PDF architecture

### HTML route

Add lazy `/cv` routing through the existing React Router tree. The route:

- uses `DocumentMetadata` with a `/cv` canonical;
- is a known public route with its own generated `cv/index.html`;
- is included in sitemap, route smoke, and link-hygiene authorities;
- is linked from About but not from primary navigation; and
- remains useful when browser printing or PDF download is unavailable.

The current known-route lists are duplicated across these live authorities and
must all gain `/cv` in the same implementation task:

- `src/client/scripts/generate-route-documents.mjs`;
- `tools/refresh_seo_files.py`;
- `tools/check_link_hygiene.py`; and
- `tools/check_public_routes.py`.

Update their focused tests so drift is caught. Do not introduce a route
registry refactor into this phase unless the implementation plan proves it is
smaller than making the four explicit additions.

### Generated PDF

Add `src/client/scripts/generate-cv-pdf.mjs`. It runs after Vite and the route
document generator have produced `dist`:

1. start a temporary local preview of the built application;
2. open `/portfolio/cv/` with the existing Playwright Chromium dependency;
3. wait for the route and `document.fonts.ready`;
4. assert that exactly two ordered CV page regions exist;
5. emulate print media;
6. call `page.pdf` with A4 CSS page sizing, background printing, tagged output,
   and document outline enabled;
7. write `dist/harley-bartles-cv.pdf`;
8. assert a non-empty `%PDF` output no larger than 512 KiB; and
9. close both browser and preview server on success or failure.

Update the client build sequence to:

```text
tsc -b
vite build
node scripts/generate-route-documents.mjs
node scripts/generate-cv-pdf.mjs
node scripts/check-build-budget.mjs
```

The PDF is derived deployment output. Do not commit a hand-edited PDF under
`public/`, and do not add ReportLab, Puppeteer, pdf-lib, or another PDF
dependency. The existing CI workflow already installs Chromium before the
canonical quality gate.

The About download points to `/portfolio/harley-bartles-cv.pdf` through the
Vite base URL rather than a root-relative hard-coded deployment path.

## Contact transport and configuration

### Provider decision

Use a Formspree form-ID endpoint. The provider destination may deliver to
Harley's private Gmail address, but neither that address nor provider-account
details are published by the portfolio. The form ID remains visible as part of
the browser endpoint and must not encode the recipient address.

Keep the existing manual `fetch` path. The current component already owns the
precise visual states and accessibility announcements; a provider SDK would
add dependency, injected defaults, and provider coupling without solving a
missing requirement.

Submit only `name`, `email`, `message`, and the provider honeypot field. Use:

```text
POST <VITE_CONTACT_FORM_ENDPOINT>
Accept: application/json
Body: FormData
```

### Configuration boundary

`VITE_CONTACT_FORM_ENDPOINT` is build-time configuration:

- source and test fixtures may contain only obviously fake example endpoints;
- a local developer copies `src/client/.env.example` to the ignored
  `src/client/.env.local` and supplies the value there;
- production receives `secrets.VITE_CONTACT_FORM_ENDPOINT` through a separate
  main-branch build step after the canonical test gate; and
- an absent or unsafe value produces the honest disconnected state.

The compiled endpoint is necessarily visible in browser JavaScript. Treat the
environment seam as source and recipient privacy, not as a secret security
boundary. Add `src/client/.env.local` to `.gitignore` and commit
`src/client/.env.example` with `VITE_CONTACT_FORM_ENDPOINT=` and no real form
ID.

Playwright browser tests build with an obviously fake HTTPS endpoint and
intercept it locally. Because that test build overwrites `dist`, the deployment
workflow must run `npm --prefix src/client run build` again after
`py -3 tools/run.py ci --check`, this time with the production secret, before
uploading the Pages artefact. Tests never receive the production endpoint, and
the fake build can never become the deployed artefact.

## Contact data and privacy contract

The configured form contains exactly:

- name: text, required, autocomplete `name`, maximum 100 characters;
- reply email: email, required, autocomplete `email`, maximum 254 characters;
- message: multiline text, required, maximum 5,000 characters; and
- `_gotcha`: visually hidden, removed from keyboard order and assistive
  reading, left empty by genuine visitors.

Do not add subject, employer, telephone, attachment, marketing consent,
referrer, session identifier, analytics metadata, local storage, or session
storage.

Place a short notice next to the submit control with this meaning:

> Your name, reply email, and message are sent to Formspree for delivery. I use
> them only to reply. Formspree processes submissions under its privacy policy.

Link `privacy policy` to
`https://formspree.io/legal/privacy-policy/`. Add a brief instruction not to
send sensitive personal information. Do not claim that Formspree processes the
data solely for delivery; its own policy governs its processing.

## Contact state contract

### Disconnected

Missing, blank, malformed, or non-HTTPS endpoints render no form and no submit
button. Explain that delivery is not connected and offer LinkedIn and GitHub as
honest fallback destinations. Do not show `mailto:` or `tel:` links.

### Idle and validation

Use native field types, `required`, and the fixed maximum lengths. Keep visible
labels and existing focus treatment. Do not clear a visitor's input in response
to client-side or provider validation failure.

### Submitting

Disable the submit button, change its visible label to `Sending…`, and prevent
duplicate submissions. Do not disable the text fields or replace the form while
the request is active.

### Sent

Only an HTTP success response counts as sent. Reset the fields, restore the
submit button, and announce success through `role="status"`. Do not promise a
response time.

### Error

Network errors and non-success HTTP responses preserve all visitor input,
restore an enabled `Try again` control, and announce the failure through
`role="alert"`. Do not expose provider response bodies, stack traces, endpoint
IDs, or recipient details.

## Abuse boundary

Rename the existing honeypot field to Formspree's standard `_gotcha` field so
the selected provider recognises it. Formspree also applies provider-managed
spam controls. The site must not claim that a honeypot or any client-side code
prevents abuse.

Do not add a custom CAPTCHA package or client fingerprinting in this phase.
Provider-managed challenge behaviour remains external. Reconsider stronger
controls only after observed abuse, accessibility review, and a new design
decision justify the cost.

Where the selected Formspree plan permits domain restriction, configure the
current GitHub Pages origin and later add the custom domain when Phase 9 lands.
This dashboard setting is defence in depth, not a repository acceptance gate.

## Expected implementation surfaces

The implementation plan should expect focused changes to:

- `src/client/src/data/professionalProfile.ts` and its tests — Phase 2 facts;
- `src/client/src/pages/CvPage.tsx` and a focused component test — CV
  composition;
- `src/client/src/pages/AboutPage.tsx` — replace the placeholder with CV links
  and finished availability/notice copy;
- `src/client/src/components/ContactForm.tsx` and its tests — Formspree,
  privacy, limits, fallbacks, and state assertions;
- `src/client/src/app/router.tsx` — lazy `/cv` route;
- `src/client/src/styles/global.scss` — screen and print CV treatment plus
  finished contact states;
- `src/client/scripts/generate-cv-pdf.mjs` and focused script verification;
- `src/client/scripts/generate-route-documents.mjs` and its tests — `/cv`
  document metadata;
- `src/client/scripts/check-build-budget.mjs` and its tests — generated PDF
  existence, signature, and 512 KiB budget;
- `src/client/package.json` — PDF generation in the build sequence;
- `src/client/playwright.config.ts` — fake HTTPS contact endpoint for browser
  tests without live delivery;
- `src/client/e2e/about.spec.ts` — finished hiring and contact outcomes;
- `src/client/e2e/cv.spec.ts` — direct route, content, two-page regions, links,
  and PDF response;
- `src/client/e2e/accessibility.spec.ts` — `/cv` coverage;
- `src/client/e2e/visual-regression.spec.ts` and reviewed baselines — CV page
  composition and the changed About conversion area;
- `tools/refresh_seo_files.py`, `tools/check_link_hygiene.py`, and
  `tools/check_public_routes.py`, with focused tests — `/cv` and PDF public
  delivery;
- `.github/workflows/ci.yml` — rebuild the deployable main-branch artefact after
  tests with `secrets.VITE_CONTACT_FORM_ENDPOINT`, then upload that production
  build; and
- `.gitignore` plus `src/client/.env.example` — keep local configuration
  untracked while documenting the variable name without a real ID.

The planner may refine exact test-file grouping to follow live patterns. It may
not create a second professional-facts store, add a runtime service, commit a
manually maintained PDF, or broaden the route set beyond `/cv`.

## Verification contract

### Automated

The implementation must add or preserve evidence for:

- shared-fact invariants, exact dates, notice, availability, and education;
- exactly two ordered CV page regions;
- the real formal Access title alongside senior professional positioning;
- absence of acting, salary, personal email, and telephone from the CV;
- direct `/cv` route metadata and known-route inclusion;
- a generated PDF with `%PDF` signature and size at or below 512 KiB;
- configured contact fields, lengths, `_gotcha`, privacy notice, and payload;
- disconnected rendering for missing or unsafe endpoints;
- disabled submitting state and duplicate-submit prevention;
- successful reset and accessible status announcement;
- failed-request retention, retry, and accessible alert announcement;
- no `mailto:` or `tel:` output; and
- mocked browser submission with no real external delivery.

Stage and commit the accepted tree:

```powershell
git add --all
git commit
```

The tracked hook runs the complete `ci --check` gate once. Do not pre-run it.

### PDF review

Implementation review must render the generated PDF to images with the bundled
PDF tooling and inspect both complete pages. Require:

- exactly two pages;
- no clipped, overlapping, orphaned, or missing text;
- legible links and dates;
- consistent margins and hierarchy;
- selectable text and working links in the PDF;
- useful print contrast; and
- no site chrome or screen-only controls.

Review the HTML route at 1440, 768, 390, and 320 CSS pixels, keyboard-only,
reduced motion, and 200% zoom.

### Production activation

CI must never send a live message. After the Formspree form and main-branch
configuration exist, perform one controlled production submission and verify
that it reaches Harley. Record only delivery success and the public route in
the implementation handoff; do not record the endpoint ID, recipient address,
message contents, or provider-dashboard screenshots.

If provider activation is externally blocked, Phase 2 may still merge the CV,
configured code path, tests, and honest disconnected production state. Record
the activation dependency in the roadmap handoff. Do not claim contact
conversion complete until live delivery is proven.

## Acceptance outcomes

Phase 2 is ready for close review when:

- `/cv` is a useful, accessible, public deep route;
- its generated PDF is exactly two polished A4 pages and downloadable from
  About;
- the CV tells the approved hiring story without title inflation, stale dates,
  acting trivia, salary, or exposed personal contact details;
- availability and four-week notice are explicit and bounded;
- current stack fit is scannable;
- all three educational levels remain present;
- configured contact submission sends only the approved fields through
  Formspree;
- privacy, disconnected, submitting, success, and recoverable-error states are
  truthful and accessible;
- no new runtime backend, PDF library, form SDK, analytics, or custom CAPTCHA
  has been added;
- canonical validation passes; and
- live production delivery is either proven or named as the sole contained
  external activation dependency.

## Provider references

- [Formspree JavaScript submission](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)
- [Formspree honeypot filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering)
- [Formspree spam controls](https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam)
- [Formspree privacy policy](https://formspree.io/legal/privacy-policy/)

## Handoff notes

- Design dialogue approved by Harley on 21 August 2026.
- CV hierarchy approved after separating the About-only acting aside from the
  professional chronology.
- Contact failure, privacy, abuse, and verification contracts approved on
  21 August 2026.
- Spec-readiness rated 9/10 after the source, build, deployment, privacy,
  failure-state, and validation seams were checked against the live repository.
- The written specification is approved. Implementation planning remains
  deliberately deferred to the implementation wave and will be written just
  in time from this spec plus refreshed repository truth.
