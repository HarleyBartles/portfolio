# Portfolio £10k Phase 9: Discovery and Sharing Finish Design

**Status:** Approved

**Approved design dialogue:** 22 August 2026

**Approved written specification:** 22 August 2026

**Spec-readiness:** 9/10

**Implementation-plan readiness:** Deferred until Phases 1–8 have landed and
their public routes, content metadata, and approved preview assets are stable

**Repository snapshot inspected:** `ae4937d8bf19fe525391a522300f511592c8b184`

**Depends on:**

- Phase 1 professional facts and About route;
- Phase 2 CV and contact routes where activation has succeeded;
- Phases 3–6 project routes and approved project-native preview assets;
- Phase 7 essay roster, editorial datelines, and visual identities; and
- Phase 8 homepage composition and fairytale-feature eligibility.

This specification records the approved design for the portfolio's discovery,
identity, and sharing finish. It is not an implementation plan. The plan must
be written just in time from this specification and the then-current repository
after the dependencies above are substantially stable.

The phase retains GitHub Pages as the host. The custom-domain cutover is a
bounded activation step, not permission to redesign hosting. Repository work
and external DNS or GitHub settings remain separate proof surfaces.

## Goal

Make every public route easy to identify, link, preview, and verify while
preserving the site's static architecture and editorial restraint.

The portfolio does not need an audience-growth programme or search-ranking
campaign. It needs to demonstrate practical command of route discovery,
canonical identity, social previews, resilient sharing, asset custody, and
deployment cutover. The finish should make links seeded on LinkedIn feel
intentional without making the website resemble a social content feed.

## Outcome

Phase 9 delivers:

- `https://harleybartles.com` as the preferred canonical origin when a bounded
  GitHub Pages cutover succeeds;
- `www.harleybartles.com` as a redirecting companion rather than a second
  canonical host;
- a tested `github.io/portfolio` deployment profile that can be restored by
  one explicit build-time profile change when the custom-domain activation is
  blocked;
- one tracked authority for deployment origin and base path;
- one resolved metadata contract for every known public route;
- crawler-readable static titles, descriptions, canonicals, indexing
  directives, Open Graph data, and Twitter/X card data;
- route-appropriate social artwork with a strong default rather than a forced
  bespoke image for every page;
- deterministic `robots.txt` and `sitemap.xml` generation from the public route
  catalogue;
- a small device-identity set derived from the existing HB mark;
- one restrained end-of-content share action on essays and fairytales;
- a documented, time-boxed custom-domain activation and rollback runbook;
- repository validation and separate deployed-environment proof; and
- an explicit public-roadmap record that RSS was considered and deferred.

## Non-goals

Phase 9 does not:

- move the site away from GitHub Pages;
- add a CDN, reverse proxy, server, database, CMS, function, or social-preview
  rendering service;
- attempt keyword research, ranking campaigns, backlink work, publication
  cadence, or search-growth theatre;
- add Google Search Console or another search-monitoring product;
- add JSON-LD or schema.org structured data;
- implement RSS or Atom at launch;
- imply that an article's visible dateline is a publication timestamp;
- emit `article:published_time` or another machine-readable publication claim;
- add social-network buttons, share counters, floating share rails, tracking
  query strings, or third-party sharing scripts;
- add a web-app manifest, service worker, install prompt, offline mode, or PWA
  identity;
- create a social-card generator or require a unique social card for every
  route;
- manufacture new project claims, article arguments, or fairytales;
- alter the Phase 8 homepage hierarchy except for compatible metadata, icon,
  or sharing-link integration;
- solve direct-route application first paint, which remains Phase 10; or
- treat repository CI as proof that DNS, TLS, redirects, or LinkedIn preview
  caches behave correctly.

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


## Evidence and authority

### Evidence precedence

When sources differ, use this order:

1. Harley's approved decisions recorded in the design dialogue;
2. later approved phase specifications;
3. current repository truth at implementation-plan time;
4. current GitHub Pages, DNS, and deployed-route evidence at activation time;
5. current official GitHub, LinkedIn, and web-standard documentation; and
6. older audits, completed designs, and screenshots.

The source-of-truth split is:

- repository state proves tracked configuration, route records, generated
  files, assets, tests, and the built artefact;
- GitHub proves Pages configuration, the deployed workflow artefact, PR state,
  and the configured custom domain;
- DNS answers prove domain records and propagation;
- HTTPS requests prove certificate and redirect behaviour;
- LinkedIn Post Inspector proves the preview LinkedIn currently reads;
- upstream project repositories and asset-custody records prove source,
  licence, transformation, and attribution for copied or derived media; and
- user-approved content sources prove public wording and route intent.

No one surface may launder another into completion. A green local build does
not prove a live certificate. A DNS answer does not prove the deployed route
metadata. A Post Inspector preview does not prove the repository source.

### Current repository snapshot

At the inspected repository snapshot:

- Vite uses the hard-coded `/portfolio/` base;
- `DocumentMetadata.tsx`, the static route-document generator, `index.html`,
  sitemap tooling, and link-hygiene tooling repeat the current GitHub Pages
  origin or base path;
- the React metadata component and the route-document generator maintain
  separate metadata registries and derivation rules;
- known static route documents already receive titles, descriptions,
  canonicals, Open Graph fields, and Twitter/X fields;
- every known route currently uses the same `brand/social-card.png`;
- that default image is already 1200 by 630 pixels but reflects the present
  narrower agentic-systems proposition;
- unknown-route documents currently canonicalise to the homepage instead of
  explicitly declining indexing;
- `robots.txt` and `sitemap.xml` are generated and checked, but their origin,
  base path, and route derivation are duplicated;
- the sitemap contains route URLs only and does not manufacture `lastmod`,
  `priority`, or `changefreq` claims;
- the HB SVG mark is the only favicon/device-identity asset; and
- there is no visible share action, RSS feed, JSON-LD, Search Console
  integration, web-app manifest, or service worker.

These are baseline facts, not requirements to preserve duplicated code or the
current social artwork.

### Current external snapshot

On 22 August 2026, before cutover:

- the GitHub Pages API reported no configured custom domain and served the site
  at `https://harleybartles.github.io/portfolio/` through the Actions build;
- `harleybartles.com` and `www.harleybartles.com` resolved to
  `139.59.184.108`;
- plain HTTP reached a default server page rather than the portfolio;
- the HTTPS endpoint did not present a working portfolio connection; and
- no GitHub Pages domain-verification TXT record was observed.

This evidence is deliberately dated. The activation plan must re-read all of
it immediately before changing GitHub or DNS.

### External platform references

The implementation and activation plan should re-check the current official
documents rather than freezing time-sensitive IP records into this spec:

- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site);
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages);
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https);
- [LinkedIn social-preview requirements](https://www.linkedin.com/help/linkedin/answer/a521928); and
- [LinkedIn Post Inspector](https://www.linkedin.com/help/linkedin/answer/a6269011).

## Governing principles

### Practical discovery, not growth theatre

The site demonstrates that public routes can be crawled and shared
intentionally. It does not promise meaningful organic discovery. Metadata is
complete because links deserve a stable identity, not because the project is
optimising a funnel.

### One public identity per route

Every known route has one canonical URL and one resolved metadata record.
Static HTML and client-side navigation expose the same claim. Query strings,
hashes, browser hostname, navigation history, and source file paths do not
change canonical identity.

### Progressive fallback

Dynamic or platform-specific affordances enhance a complete base:

- an essay or fairytale remains readable without sharing support;
- a social image failure does not weaken route copy or navigation;
- unknown routes remain honest without a canonical;
- a custom-domain blocker falls back to a deliberately rebuilt GitHub Pages
  profile; and
- RSS, JSON-LD, Search Console, and PWA features remain unnecessary to launch.

### Golden-example custody

The portfolio consumes media from Harley-owned repositories under those
repositories' actual licences and attribution terms. Common ownership does not
erase provenance. Third-party-derived work receives even clearer attribution.
The portfolio should be the most careful consumer of Harley's cross-repository
assets, not an exception to the rules it advocates.

## Deployment identity architecture

### Tracked site configuration

Create one cross-runtime tracked authority at:

`src/client/site.config.json`

It contains two named profiles and one active-profile selector:

```json
{
  "activeProfile": "custom-domain",
  "profiles": {
    "custom-domain": {
      "canonicalOrigin": "https://harleybartles.com",
      "basePath": "/"
    },
    "github-pages-fallback": {
      "canonicalOrigin": "https://harleybartles.github.io",
      "basePath": "/portfolio/"
    }
  }
}
```

The exact file is source. Runtime hostname detection is forbidden. The active
profile is resolved at build time and is the only origin/base pair consumed by
Vite, React metadata, static route generation, sitemap and robots generation,
link hygiene, route deployment checks, and asset URL construction.

Validation requires:

- exactly the two approved profile IDs;
- one active profile matching a declared ID;
- an HTTPS origin with no path, query, fragment, credentials, or trailing
  slash;
- `/` for the custom-domain base;
- `/portfolio/` for the fallback base;
- a leading and trailing slash on every base path; and
- URL joining that never produces a doubled slash, drops the project path, or
  admits a filesystem path.

The custom-domain profile is the intended finished state. The fallback remains
tracked and tested so rollback is one selector change plus a normal rebuild,
not a search-and-replace across several languages.

### Configuration consumers

The JIT plan must remove hard-coded public origin and base literals from:

- `src/client/vite.config.ts`;
- `src/client/index.html`;
- `src/client/src/components/DocumentMetadata.tsx` or its replacement;
- `src/client/scripts/generate-route-documents.mjs` or its replacement;
- `tools/refresh_seo_files.py`;
- `tools/check_link_hygiene.py`;
- `src/client/playwright.config.ts` where public-base assumptions remain; and
- public-route verification tooling and tests.

Local development may keep an explicit local origin for the dev server, but it
must not become a competing canonical-public configuration. Tests inject a
profile or read a fixture rather than mutating the process hostname.

## Public route metadata architecture

### Source and resolved catalogue

Preserve content ownership while eliminating duplicate presentation
registries:

- fixed index-route metadata lives in one small authored JSON source under
  `src/client/src/data/routes/`;
- project, essay, and fairytale titles, summaries, states, datelines, and slugs
  remain owned by their Phase 3–7 content sources and typed content manifest;
- one deterministic catalogue builder adapts those sources into
  `src/client/src/data/routes/route-metadata.generated.json`; and
- the generated catalogue is the sole resolved input to React metadata,
  static route documents, sitemap generation, route checks, and share-link
  construction.

The generated JSON is derived and must never be hand-edited. Its generator has
an apply mode and a churn-free check mode routed through `tools/run.py`. Adding
or removing a public route without refreshing the catalogue fails validation.

The JIT plan may adjust the exact authored index-source filename to match the
then-current data layout. It may not create a second hand-authored route list
or copy content metadata into a parallel SEO file.

### Resolved record contract

Each known public route resolves to exactly one typed record with:

```text
id
path
kind
title
description
indexability
openGraphType
socialImage.path
socialImage.alt
socialImage.width
socialImage.height
socialImage.mimeType
shareAction
```

The contract means:

- `id` is stable and unique;
- `path` is an absolute internal route without origin, base path, query,
  fragment, backslash, `..`, or duplicate slash;
- `kind` distinguishes home, index, About, project, writing, fairytale, and any
  real Phase 2 public route without driving page prose;
- `title` is route-specific, plain text, and includes Harley's name where the
  established title pattern requires it;
- `description` is a concise, route-specific plain-text proposition sourced
  from approved content rather than arbitrary Markdown truncation;
- `indexability` is `index` for known launch routes;
- `openGraphType` is `article` for essays and `website` elsewhere;
- `socialImage` is the fully resolved preview-asset contract;
- `shareAction` is `content-end` only for essays and fairytales and `none`
  elsewhere; and
- Twitter/X uses `summary_large_image` and derives its title, description,
  image, and image alt from the same record.

Static HTML emits exactly one title, description, canonical, robots directive,
Open Graph field set, and Twitter/X field set. Client navigation updates those
same fields without inventing another value. Open Graph image type, width,
height, and alt, plus `twitter:image:alt`, are present when a social image is
declared.

### Canonical construction

Known canonical URLs are pure functions of the active profile and route path:

```text
canonical = canonicalOrigin + normalizedBasePath + normalizedRoutePath
```

The homepage ends with `/` in the custom profile and with `/portfolio/` in the
fallback profile. Content canonicals contain no query string, fragment,
tracking parameter, browser-derived host, or duplicate slash.

The `og:url` value and the URL copied or shared by an eligible page equal the
canonical. Internal navigation remains path-based and lets React Router apply
the configured base rather than hard-coding either public host.

### Unknown-route contract

Unknown and error routes are not members of the public route catalogue. Their
static and client-rendered documents:

- use the honest `Page Not Found` title and description;
- emit `robots` as `noindex, follow`;
- omit the canonical link and `og:url` rather than falsely claiming the
  homepage;
- remain absent from the sitemap; and
- retain a useful route back to known content.

The generic default social image may remain for visual completeness, but its
presence must not turn the unknown URL into a public content identity.

### Editorial datelines

Public article dates remain editorial datelines: a soft `written around this
time` signal, not an inspectable promise that the repository published the
page on that date. Therefore:

- the visible date may remain in page content and cards;
- the route metadata does not label it `published`, `first published`, or
  `updated` unless a future content contract can prove that claim;
- `article:published_time`, feed `pubDate`, and equivalent machine-readable
  publication receipts are omitted; and
- repository notes may state this internal rationale without suggesting that
  there is something suspicious to explain to a casual reader.

## Social artwork system

### Asset hierarchy

Use the smallest useful route-aware system:

1. refresh one default portfolio card so it presents a senior full-stack
   engineer with an agentic-engineering edge;
2. use approved project-native imagery for project routes where a suitable
   composition exists;
3. use the Phase 7 visual identity or principal figure for essays where it
   remains legible at preview size;
4. use a complete existing fairytale page when it is the strongest preview,
   or derive a purpose-built fairytale social composition from the underlying
   Adventures of Patch production assets; and
5. fall back to the default card whenever a bespoke derivative would be rushed,
   illegible, weakly attributed, or low value.

Do not manufacture uniqueness for its own sake. Route-appropriate means the
image helps a viewer recognise the linked work. It does not mean every route
must have a new illustration.

### Preview contract

Every declared social image:

- is PNG or JPEG;
- is exactly 1200 by 627 pixels for LinkedIn's 1.91:1 recommendation;
- has a declared MIME type matching the file;
- includes meaningful alt intent in the route record;
- preserves important content inside a conservative crop-safe region;
- keeps any embedded words large enough to survive a small feed preview;
- has no critical claim that exists only inside the pixels;
- is optimized within the repository's image budget; and
- remains available at a stable, absolute HTTPS URL under the active profile.

The existing 1200-by-630 card may be source material but does not define the
finished dimensions. Social images are metadata assets rather than in-page
critical media and must not be eagerly loaded by page rendering solely because
they appear in the route record.

### Cross-repository custody

For every copied or derived asset, `docs/asset-custody.md` records:

- source repository and exact source path;
- source commit or other immutable source reference;
- creator and owner;
- source licence and the portfolio's permitted use;
- required attribution and where it is rendered or documented;
- whether the file is copied, cropped, composited, redrawn, or generated;
- transformation recipe or generation prompt where applicable;
- output path, dimensions, MIME type, byte size, and optimization;
- alt-text intent; and
- visual QA status.

Adventures of Patch derivatives use that repository's style bibles, positive
and negative style sheets, production sources, and self-granted derivative
permission. If an asset descends from third-party work such as the MIT-licensed
Obra `superpowers` project, the portfolio names that lineage precisely rather
than flattening it into Harley-owned authorship.

Generated Patch imagery is permitted only when an existing approved source is
not the stronger option. It receives prompt/tool provenance and Harley's visual
identity QA before use.

## Sitemap and robots

`robots.txt` and `sitemap.xml` are deterministic derived files produced from
the active site profile and resolved public route catalogue.

The sitemap:

- includes every indexable public homepage, index, About, CV/contact route that
  is genuinely public, project, essay, and fairytale;
- contains each canonical once;
- excludes unknown, loading, error, draft, private, and unpublished routes;
- uses only the active canonical origin and base path; and
- omits speculative `lastmod`, `priority`, and `changefreq` values.

Robots remains permissive for the public site and names exactly one absolute
canonical sitemap URL. It does not attempt to secure private information;
private information must not be shipped.

Generation and check modes must agree byte-for-byte so the canonical quality
gate detects drift. Route addition and removal update the catalogue first and
derive sitemap and robots from it.

## Device identity

Retain `src/client/public/brand/hb-mark.svg` as the authored browser mark and
derive:

- one PNG favicon fallback; and
- one 180-by-180 Apple touch icon.

The implementation plan chooses the smallest conventional favicon PNG size
that produces a crisp HB mark and records it in custody. Every static deep-route
document receives the same icon links. The fallback remains branded and
legible; it does not introduce a second visual identity.

No manifest, service worker, mask-icon programme, startup artwork, or broad
device-icon matrix is required.

## Sharing interaction

### Placement and presentation

Essays and fairytales receive one quiet `Share` action at the end of the main
content, after the argument or lesson and before curated continuation where
that order remains semantically natural. The control is a supporting utility,
not a promotional banner.

Projects, home, About, CV, indexes, and contact do not gain visible share UI in
this phase. Their canonical links and social previews still work when copied
normally.

### Progressive behaviour

For an eligible route:

1. use the native Web Share API when available;
2. pass the canonical URL plus the resolved title and description;
3. treat user cancellation as a silent, successful dismissal;
4. when native sharing is unavailable, copy the canonical URL;
5. announce successful copying in one concise polite status region; and
6. when clipboard access is unavailable or fails, expose a labelled,
   selectable canonical link so the user can copy it manually.

The control retains focus after every outcome. It never opens an assumed
network, appends tracking parameters, records analytics, or changes the route.
Do not show an error for an `AbortError` cancellation. Other unexpected native
share failures may fall through to copy or selectable-link fallback.

The rendered base link remains useful without Web Share or Clipboard support.
Capability detection may enhance its behaviour without removing that fallback.

### Accessible status contract

- the visible control has a text label;
- the status region is stable, concise, and `aria-live="polite"`;
- success is announced once;
- cancellation is not announced as an error;
- the selectable fallback is keyboard reachable and visibly labelled;
- focus does not jump to the document body or top of page; and
- iconography, if used, supplements rather than replaces the label.

## Custom-domain activation

### Boundary and authority

Repository implementation, build verification, and pre-cutover evidence may be
completed autonomously on the Phase 9 branch. Changing GitHub Pages domain
settings or public DNS is an external mutation requiring Harley's current
authority at activation time.

The activation begins only when the site is otherwise ready to launch to
hiring managers. It is time-boxed to approximately 30 minutes of active work.
Normal passive DNS or certificate propagation does not consume that timebox.
An unexpected provider, DNS, repository, or TLS investigation does.

### Pre-cutover evidence

Immediately before mutation, record:

- current `main` deployment and known-route health;
- current GitHub Pages configuration and deployed URL;
- current apex, `www`, and verification TXT answers from more than one resolver
  where practical;
- current HTTP, HTTPS, certificate, and redirect behaviour;
- current DNS records that would be replaced; and
- the exact active site profile and build commit intended for deployment.

Do not rely on the dated snapshot in this specification for live record
values.

### Activation sequence

Use GitHub's current documented sequence:

1. verify ownership of `harleybartles.com` in GitHub and retain the issued TXT
   record after success;
2. configure `harleybartles.com` as the Pages custom domain before advertising
   it;
3. update the apex and `www` records using GitHub's current documented targets,
   not IP literals copied from this spec;
4. avoid wildcard DNS records;
5. allow DNS and Pages to observe the new records;
6. deploy the build with the `custom-domain` profile;
7. enable or confirm HTTPS enforcement when GitHub makes it available; and
8. verify the complete post-cutover contract.

The Actions deployment does not add or require a tracked `CNAME` file. GitHub
Pages configuration owns the custom-domain setting.

The intended redirect identity is:

- `http://harleybartles.com/*` to `https://harleybartles.com/*`;
- `http://www.harleybartles.com/*` to the HTTPS apex equivalent;
- `https://www.harleybartles.com/*` to the HTTPS apex equivalent; and
- `https://harleybartles.github.io/portfolio/*` to the equivalent custom-domain
  route after GitHub's custom-domain behaviour is active.

Every redirect preserves the meaningful route path. Query preservation may
follow GitHub's platform behaviour but must not change canonical generation.

### Fallback and rollback

If active work reaches the timebox, the required provider surface is
unavailable, DNS ownership is ambiguous, GitHub rejects the domain, TLS cannot
be enabled after reasonable passive propagation, or redirect/path behaviour is
incorrect:

1. stop the custom-domain activation;
2. switch `site.config.json` to `github-pages-fallback`;
3. rebuild, validate, and deploy the fallback artefact;
4. remove or revert the incomplete Pages custom-domain configuration as
   required to restore the project URL;
5. restore or remove DNS records according to the pre-cutover evidence without
   deleting the retained ownership-verification TXT record;
6. verify every known route at
   `https://harleybartles.github.io/portfolio/`; and
7. record the custom domain as an external activation blocker, not a failed
   site launch.

Do not move hosts or begin a broader infrastructure design as a recovery step.
The hiring launch continues on the verified fallback URL.

## Failure behaviour

### Invalid site configuration

The build fails with field-specific errors. It never guesses from
`window.location`, Git remotes, deployment URLs, or environment hostnames.

### Invalid route metadata

Catalogue generation fails for missing, duplicate, malformed, or unresolvable
records. A known route may not silently inherit homepage identity. The default
social image is an explicit resolved fallback, not an accidental missing-field
behaviour.

### Missing or invalid social media

Build validation fails when a declared file is absent, has the wrong MIME type
or dimensions, lacks alt intent, or lacks a custody record. Authors may select
the default card instead of blocking a route on a bespoke image.

At runtime, social-image availability does not affect page rendering. A broken
remote preview is an external validation finding, not a reason to hide the
route.

### Sharing capability failure

Native share failure falls back to copy unless the user cancelled. Clipboard
failure exposes the canonical link. If all enhancement fails, the base
canonical link remains visible and selectable. No exception removes content or
traps focus.

### Sitemap drift

Generated-file check mode fails when source routes, active profile, sitemap,
robots, or route documents disagree. CI does not quietly regenerate and commit
the result.

## Content, implementation, and asset seams

The JIT plan must re-inspect the repository. Current likely surfaces are:

- `src/client/site.config.json`;
- a new authored index-route source and generated route catalogue under
  `src/client/src/data/routes/`;
- `src/client/src/data/content/content-manifest.json` and its generator;
- `src/client/src/components/DocumentMetadata.tsx` or a renamed metadata
  boundary;
- one restrained share component used by essay and fairytale pages;
- `src/client/src/pages/ContentPage.tsx` and any separate fairytale detail
  renderer created by earlier phases;
- `src/client/scripts/generate-route-documents.mjs` or a typed replacement;
- `src/client/index.html`;
- `src/client/vite.config.ts`;
- `src/client/public/brand/` for the HB icon derivatives and default card;
- `src/client/public/media/social/` for route-specific preview derivatives;
- `src/client/public/robots.txt` and `src/client/public/sitemap.xml` as derived
  files;
- `tools/refresh_seo_files.py`, which may be replaced by a broader route-
  discovery generator rather than retained as a second authority;
- `tools/check_link_hygiene.py`;
- `tools/check_public_routes.py`;
- focused unit, component, script, and Playwright tests;
- `.github/workflows/ci.yml` only where deployment or verification parameters
  need the active profile;
- `docs/asset-custody.md`;
- `docs/design-decisions.md` if a protected default evolves;
- `.agents/runbooks/` for the exact custom-domain activation and rollback
  procedure; and
- `README.md` Planned Roadmap for the explicit RSS deferral.

Source boundaries:

- site profiles and active selection live only in `site.config.json`;
- fixed-route metadata is authored once;
- project, essay, and fairytale content facts remain with their owning content
  sources;
- the resolved route catalogue, sitemap, robots, and static route documents
  are derived;
- social image files and custody records are source artefacts;
- upstream repository assets remain upstream source, not silently vendored
  portfolio ownership;
- external platform settings are operational state, not repository source; and
- screenshots, DNS dumps, Post Inspector results, and certificate observations
  are review evidence, not content truth.

## Accessibility and performance contract

- metadata enhancement never delays or hides page content;
- share controls work by keyboard, retain focus, and announce only useful
  outcomes;
- the base selectable link survives absent Web Share and Clipboard APIs;
- social artwork carries metadata alt intent even though it is not rendered as
  in-page content;
- icon links do not replace visible labels or site identity;
- no third-party sharing runtime or analytics script is loaded;
- route metadata and profile data remain small build-time inputs;
- social preview assets are not eagerly fetched by page rendering;
- new image and icon derivatives remain inside repository budgets; and
- canonical construction and sharing add no runtime network request.

## Testing contract

### Site-profile tests

Automated tests prove:

- both named profiles validate;
- the active selector resolves exactly one profile;
- invalid origins, base paths, profile IDs, and URL-like attack strings fail;
- canonical and asset joining is correct for homepage and deep routes under
  both profiles;
- the custom profile has root base and the fallback has `/portfolio/`; and
- no production consumer retains a hard-coded public origin/base outside the
  tracked authority or explicit test fixtures.

### Catalogue tests

Automated tests prove:

- every known public route appears exactly once;
- IDs, paths, and titles are unique;
- required titles, descriptions, types, indexability, sharing modes, and social
  image fields are present;
- content routes resolve from the current content manifest without a competing
  slug list;
- every published Phase 7 essay is included and no draft essay is included;
- every public project and fairytale route from the landed phases is included;
- `content-end` appears only on essays and fairytales;
- social files exist and match declared dimensions and MIME type;
- every social asset has alt intent and custody;
- editorial datelines do not leak into publication-time metadata; and
- unknown routes are excluded from the catalogue.

### Static-document tests

For representative home, index, About, project, essay, and fairytale routes,
tests assert exactly one:

- `<title>`;
- description;
- canonical;
- robots directive;
- Open Graph title, description, type, URL, image, image type, image width,
  image height, and image alt; and
- Twitter/X card, title, description, image, and image alt.

Values must equal the resolved catalogue and active profile. The generated
`404.html` has `noindex, follow`, no canonical, and no `og:url`.

### Sitemap and robots tests

Tests prove:

- sitemap routes equal the set of indexable catalogue routes;
- all URLs use the active profile and appear once;
- unknown, error, loading, draft, and private routes are absent;
- `lastmod`, `priority`, and `changefreq` are absent;
- robots permits public crawling and names the one canonical sitemap; and
- apply followed by check is churn-free.

### Share component tests

Tests cover:

- native share receives the resolved title, description, and canonical URL;
- native success retains focus;
- `AbortError` cancellation is silent;
- other native failure falls back safely;
- missing Web Share uses clipboard copy;
- copy success announces once;
- missing or rejected clipboard exposes the selectable canonical link;
- query strings and fragments never enter the shared URL;
- no tracking value is appended; and
- no share control renders on ineligible route kinds.

### Browser journeys

Playwright verifies:

1. home, one index, About, one project, one essay, and one fairytale expose the
   expected document identity after direct navigation;
2. client navigation updates metadata without duplicate tags;
3. unknown navigation renders useful content, `noindex`, and no canonical;
4. essay and fairytale share controls retain focus and expose a working copy or
   selectable-link fallback;
5. project, homepage, About, and index routes have no share theatre;
6. deep routes use the correct configured base;
7. icon links exist on direct static route documents; and
8. no horizontal overflow or content displacement is introduced at 320 CSS
   pixels or 200% zoom.

### Canonical repository gate

The implementation plan finishes with the staged tree and:

```powershell
git add --all
git commit
```

When mechanical surfaces change, use the narrow owning apply target; use umbrella
`ci --apply` only when this phase changes both SEO output and the mesh. Inspect the diff,
stage the intended outputs, and commit normally so the hook runs `ci --check` once. A green check proves repository
consistency only. It does not prove the external activation.

## Activation and deployed verification

### Repository proof before activation

Before external mutation, repository evidence must show:

- valid and tested custom and fallback profiles;
- a unique, complete route catalogue;
- deterministic generated static documents, sitemap, and robots;
- one correct metadata field set per route;
- valid social asset files, declarations, alt intent, and custody;
- complete favicon and touch-icon assets;
- tested share success, cancellation, copy, failure, focus, and announcement
  behaviour;
- unknown-route `noindex` and sitemap exclusion;
- a green canonical quality gate on the staged source; and
- a successful production build for the intended active profile.

### External proof after activation

External verification separately proves:

- GitHub records verified ownership of `harleybartles.com`;
- Pages reports the intended custom domain and healthy Actions deployment;
- apex and `www` DNS answers match the documented GitHub targets;
- HTTPS serves a valid certificate for apex and `www`;
- HTTP redirects to HTTPS;
- `www` redirects to the apex canonical;
- the GitHub Pages project URL redirects to the equivalent custom route;
- redirects preserve every representative deep-route path;
- every known canonical returns useful HTML and its expected metadata;
- every declared social image returns the declared MIME type and dimensions;
- robots and sitemap return the deployed canonical host;
- an unknown route returns the useful fallback and remains `noindex` without a
  canonical; and
- LinkedIn Post Inspector shows the expected preview for the homepage, one
  representative project, one essay, and one fairytale.

Use the deployed workflow URL or a purpose-built public-route checker for HTTP
proof. Use a real browser when text tooling cannot observe rendered behaviour.
Record the commit, deployment URL, timestamp, resolver evidence, certificate
observation, redirect checks, and Post Inspector results. Do not describe
unobserved propagation as complete.

### Fallback proof

If the custom domain is deferred, rebuild with the fallback profile and repeat
the known-route, static metadata, social asset, sitemap, robots, icon, unknown-
route, and share checks at the GitHub Pages project URL. Record the domain
activation blocker separately. The portfolio may launch to hiring managers on
that verified URL.

## Public roadmap deferral

Phase 9 updates the human-facing README roadmap to record RSS as a considered
future enhancement that was intentionally downscoped from launch.

The note should be brief and neutral: the site has a five-essay launch floor,
no publication-cadence promise, and editorial datelines that are not feed
publication receipts. Do not imply that RSS is scheduled or necessary. JSON-LD,
Search Console, and PWA work remain internal non-goals and do not need public
roadmap promises.

## Manual quality review

Review the built and deployed result at 1440, 768, 390, and 320 CSS pixels,
keyboard-only, 200% zoom, and with sharing APIs independently unavailable.

The reviewer answers:

- Does a pasted homepage link identify Harley as a senior full-stack engineer
  with an agentic edge?
- Does each pasted flagship link state the route's concrete proof responsibility
  rather than relying on generic agentic or portfolio language?
- Can each flagship route be recognised from its preview without making every
  image look templated?
- Does route-aware artwork add specificity rather than feed-style noise?
- Are the Patch previews recognisably Patch, legible, and correctly attributed?
- Does the share utility feel quiet and useful rather than performative?
- Does cancelling, copying, or losing clipboard support remain calm and
  accessible?
- Does every route preserve one clear canonical identity after client
  navigation and direct loading?
- Does an unknown route remain honest rather than impersonating the homepage?
- Do the favicon and touch icon add polish without creating an icon project?
- Does the custom domain feel like low-cost finish rather than new
  infrastructure?
- Can the site still launch cleanly on the project URL when activation fails?
- Does the work demonstrate SEO and sharing competence without pretending the
  site seeks organic reach?

## Acceptance criteria

- [ ] one tracked build-time site configuration owns public origin and base
      path;
- [ ] the custom profile is `https://harleybartles.com/` and the fallback is
      `https://harleybartles.github.io/portfolio/`;
- [ ] runtime hostname detection is absent;
- [ ] every known public route has one complete resolved metadata record;
- [ ] static HTML and client navigation consume the same resolved catalogue;
- [ ] known routes expose one title, description, canonical, robots directive,
      Open Graph set, and Twitter/X set;
- [ ] essays use `article` without emitting a publication timestamp;
- [ ] visible article dates remain soft editorial datelines;
- [ ] unknown routes are `noindex, follow`, have no canonical or `og:url`, and
      are absent from the sitemap;
- [ ] the default social card expresses senior full-stack breadth with an
      agentic edge;
- [ ] every flagship route description gives a skeptical recipient one concrete
      reason to inspect its engineering evidence;
- [ ] project, essay, and fairytale routes use approved route-appropriate
      artwork where it earns its cost and otherwise use the default;
- [ ] social images are 1200 by 627 PNG or JPEG files with declared MIME,
      dimensions, alt intent, and custody;
- [ ] Patch preview derivatives may use underlying production assets rather
      than being fenced to the composed fairytale page;
- [ ] cross-repository and third-party-derived assets retain exact provenance,
      licensing, attribution, and transformation records;
- [ ] sitemap and robots are deterministic derivatives of the active profile
      and public route catalogue;
- [ ] sitemap omits speculative dates, priorities, and change frequencies;
- [ ] HB SVG, PNG favicon fallback, and Apple touch icon are linked from every
      deep-route document;
- [ ] essays and fairytales provide one restrained end-of-content share action;
- [ ] native share, copy, selectable-link fallback, cancellation, focus, and
      polite status behaviour meet the approved contract;
- [ ] no visible share UI appears on projects, home, About, CV, indexes, or
      contact;
- [ ] no network buttons, counters, third-party scripts, or tracking parameters
      are introduced;
- [ ] RSS is not implemented and its deliberate deferral is noted in the
      public README roadmap;
- [ ] JSON-LD, Search Console, PWA, and SEO-growth work remain out of scope;
- [ ] custom-domain activation is time-boxed and separated from repository
      proof;
- [ ] ownership verification, DNS, TLS, redirects, deep routes, route metadata,
      social assets, unknown routes, and representative LinkedIn previews are
      externally verified when the custom domain activates;
- [ ] the Actions deployment uses no tracked `CNAME` file;
- [ ] a custom-domain blocker triggers the tested GitHub Pages fallback rather
      than a hosting redesign;
- [ ] repository validation and external activation evidence are reported as
      separate claims;
- [ ] canonical CI and build-budget checks pass; and
- [ ] manual review confirms useful premium finish without discovery or share
      theatre.

## Approved design dialogue record

Harley approved:

- the custom domain only as a low-hanging GitHub Pages finish, with no host or
  infrastructure migration;
- `harleybartles.com` as canonical apex and `www` as redirecting companion;
- a roughly 30-minute active-work timebox and a project-URL fallback that
  cannot block hiring launch;
- one tracked build-time origin/base authority and no runtime hostname
  detection;
- complete static route metadata without SEO-growth work;
- route-aware social previews, including purpose-built fairytale derivatives
  from underlying Patch production assets when useful;
- the portfolio as the golden example of cross-repository and third-party
  attribution;
- deterministic, useful, current sitemap and robots files;
- RSS as a publicly recorded future deferral;
- JSON-LD and Search Console as launch deferrals;
- the existing HB SVG plus a PNG favicon fallback and Apple touch icon;
- quiet Web Share with copy and selectable-link fallback on essays and
  fairytales only;
- easy LinkedIn propagation through metadata rather than social-feed theatre;
- no machine-readable publication promise from editorial article dates;
- progressive fallback as the governing principle;
- separate repository and external activation proof; and
- the consolidated launch scope, canonical architecture, metadata contract,
  asset and sharing system, validation, and activation design sections.

## Readiness assessment

**Rating: 9/10 — approved; implementation planning remains dependency-gated.**

The specification defines:

- exact launch and non-goal boundaries;
- the custom and fallback deployment identities;
- one cross-runtime configuration authority;
- a source-versus-derived route metadata architecture;
- the complete resolved metadata record;
- canonical and unknown-route behaviour;
- the editorial-dateline boundary;
- social artwork hierarchy, dimensions, fallbacks, and custody;
- sitemap, robots, favicon, and sharing contracts;
- a bounded custom-domain activation and rollback sequence;
- likely implementation seams grounded in the inspected repository;
- automated, browser, manual, and deployed validation;
- separate repository and external evidence claims; and
- acceptance criteria suitable for JIT planning.

No unresolved product decision blocked approval. The remaining
uncertainties are intentionally operational: exact DNS targets and provider
state must be re-read at activation time, and exact route counts and asset paths
must be re-read after Phases 1–8 land. Those constraints strengthen the handoff
by preventing stale infrastructure or content assumptions from becoming an
implementation plan.
