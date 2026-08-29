# Portfolio £10k Phase 7A: Professional Surfaces and Proof Choreography Design

**Status:** Design complete and implementation-ready as of 29 August 2026.

**Author override:** Harley expanded this room beyond the older roadmap wording. The
roadmap and earlier Phase 7A constraints must follow the intent established here; they do
not narrow it. This room owns the finished design for the affected hiring surfaces.
Local implementation executes that design rather than inventing missing editorial or
visual decisions.

**Design input:** Weary-sceptical hiring-manager and jaded-cynical-architect lenses;
Harley-led source discovery and rendered-site review, 29 August 2026.

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

## Binding room outputs

The implementation plan must consume these records together:

- [source and disclosure record](../../docs/editorial-drafts/phase-7a/phase-7a-cloud-discovery-record.md);
- [final About page design](../../docs/editorial-drafts/phase-7a/phase-7a-about-page-design.md);
- [final CV page design](../../docs/editorial-drafts/phase-7a/phase-7a-cv-page-design.md); and
- [site visual-language recommendations](../../docs/editorial-drafts/phase-7a/phase-7a-site-visual-language-recommendations.md).

The About and CV design records own their exact public copy, section order, link
behaviour, layout and styling direction. The visual-language record owns both the Phase
7A visual decisions and the recommendations the later site-wide polish pass must use as
its starting design brief.

Local Sol owns code, responsive execution, tests, generated artifacts and
implementation-detail choices that do not alter those designs. A material copy,
hierarchy, art-direction or proof-route choice not already answered by the room is a
human/design gate, not permission to improvise.

## Goal

Make the professional hiring surfaces as strong as the engineering evidence they point
to.

The site already contains strong engineering work. Before this room, About and the CV
obscured some of it with positioning language, defensive qualification and prose that
could read like a rubric translated into copy. The CV was too shy in navigation and put
a capability wall ahead of the career. Wild Bunch made a particularly strong
falsification claim without making the receipt cheap enough to inspect.

Phase 7A therefore redesigns the affected professional surfaces as one coherent hiring
journey. It changes copy, information order, hierarchy and styling where needed, makes
the CV a first-class route, and shortens the route from consequential claims to credible
evidence without wallpapering the site in proof apparatus.

## Decision lenses

The active portfolio design policy remains authoritative. In particular:

- the weary hiring manager must be able to forward the site without feeling that they
  are forwarding another polished agentic-engineering claim with no conventional
  engineering underneath it;
- the cynical architect must be able to strip away architecture vocabulary and find
  decisions, failures, trade-offs, corrections, limits and falsifiers; and
- strong evidence still fails if the public prose is generic, overqualified,
  self-congratulatory or obviously AI-shaped.

The intended reactions remain: `I am not going to look stupid forwarding this one` and
`annoyingly, this person actually does understand what they're talking about`.

## Approved source truth

The employer-safe source gate is cleared. The discovery record is authority for claim
precision and disclosure boundaries.

### Access browser automation

The governing professional example is the browser-automation service used by DBS Update
and Right to Work Sharecode checks:

- Harley received an underspecified delivery requirement plus access to an LLM endpoint
  and credentials, then designed and delivered the service boundary and implementation;
- the LLM is bounded to locating page elements and proposing browser actions;
  deterministic code executes the actions and extracts the result;
- a successful check requires captured rendering of the authoritative government result
  page;
- no capture means no successful result and a downstream no-charge signal; and
- the work enabled Access Screening to offer two additional paid integrated checks.

The public memorable invariant is `No source capture, no success.` About renders it using
the shared pull-quote grammar with `PRODUCTION INVARIANT` as the utility line.

### Access migration sequencing

Access Screening originally supplied the capability behind Access Checks v1. Access
Checks then developed direct-supplier v2 integrations, while Access Screening itself was
becoming a v2 consumer.

Migrating Screening first while other consumers remained on v1 could therefore have
created the wasteful route:

`remaining v1 consumer -> Access Checks v1 -> Access Screening -> Access Checks v2 -> direct supplier`

Harley owned the migration epic, exposed that dependency and made migration of the
remaining v1 consumers an explicit prerequisite. They moved first; Screening switched
afterwards; the round trip never became the production operating model. The legacy v1
endpoint is now unused but remains tracked retirement debt assigned to Harley.

The browser-automation and migration accounts are representative worked examples from a
larger body of ordinary delivery. Public copy must not make them sound like Harley's only
two useful outcomes at Access.

### Professional provenance

Barbican Insurance Group and the subsequent Arch period are the concise professional
provenance for Harley's architecture judgement.

Harley learned DDD, CQRS, event sourcing, layered and onion architecture through
production immersion in a complex insurance domain where the costs were visibly earned:
DDD modelled dense business rules; event sourcing supported full replay and auditability;
CQRS paid a complementary cost. The public point is not a pattern tutorial and not a
claim that Harley originated the architecture. It is that he first learned expensive
architecture in a system where he could see why it paid rent, which became the later
rule that complexity has to earn its place.

The full organisational-memory story remains owned by `Why ADRs?`.

### Brand Addition progression

Brand Addition is one long progression from commercial work through team management to
Web Manager for the final couple of years, not thirteen years as Web Manager.

While managing a team, Harley identified a web change the team needed and worked with the
Ecommerce Director to specify and deliver it. That work led directly to an offer to move
into Web Manager. In that role he defined requirements, coordinated external developers,
held platform and delivery responsibility, and helped migrate and maintain more than 100
multilingual, multicurrency stores.

About and CV must preserve that progression rather than flattening the whole employment
period into the final title.

## About contract

The final copy, section order, links, responsive intent, imagery recommendations and art
direction are binding in
[`phase-7a-about-page-design.md`](../../docs/editorial-drafts/phase-7a/phase-7a-about-page-design.md).

The important structural decisions are:

- replace the current `professional truth`, `evidence in view`, `underspecified,
  consequential problems` and `frontier of agentic engineering` opening with a plain
  first-person professional introduction;
- put current Access responsibility and consequence near the top;
- use the shared pull-quote grammar for the source-evidence invariant;
- explain the Access Screening migration dependency before its consequence;
- preserve Brand Addition as progression culminating in Web Manager;
- use Barbican/Arch briefly to establish where the architecture judgement came from;
- remove the current `At a glance` proof block, capability matrix and standalone Working
  Style manifesto where the work itself now makes those arguments better;
- treat independent work as three broad invitations to inspect the projects rather than
  reducing each project to the proof receipt discovered in this room;
- keep the AI Engineer Level 6 study and small acting-career aside at appropriate visual
  weight;
- close the hiring argument with a clear next-role treatment and CV actions; and
- let the contact form implementation handle its own privacy mechanics without public
  copy congratulating the site for not exposing a raw email address.

No generated About hero image is required. If later imagery is added, follow the room's
visual-language brief: project-native imagery is preferred; Access explanation should be
semantic rather than fabricated employer UI; acting imagery must be genuine and
publishable rather than generated history.

## CV contract

The final two-page copy, page order, screen/print treatment and hostile-reader contract
are binding in
[`phase-7a-cv-page-design.md`](../../docs/editorial-drafts/phase-7a/phase-7a-cv-page-design.md).

The main decisions are:

- retain a conventional two-page web/PDF CV mechanism;
- put present professional experience and consequence before the capability inventory;
- make page 1 overwhelmingly about current Access work;
- keep the formal `Software Engineer` title exact while allowing scope and outcomes to
  establish the level of work;
- use representative Access examples plus the Recruitment CRM SQL outcome so the current
  role is not reduced to two discoveries from this room;
- make Barbican/Arch the professional foundation of the architecture judgement without a
  technology wall;
- make the Brand Addition progression explicit;
- keep three selected independent projects broad enough to invite discovery;
- move recruiter-searchable technical nouns into compact current/testing/earlier groups
  instead of `Immediate contribution`, `Ready to contribute immediately`, or defensive
  fluency qualifications;
- keep the Level 6 apprenticeship precise as a bachelor's-degree-level programme, not a
  bachelor's degree;
- make mobile a readable continuous web document instead of a miniature A4 simulation;
  and
- preserve exactly two A4 pages for the generated print artifact without shrinking type
  to rescue overlong copy.

### CV navigation

`CV` becomes a first-class global masthead item linking to `/cv`.

The contextual About -> CV route remains. On the CV page, the global masthead already
supplies About navigation, so the current prominent `Return to About` control should be
removed. Keep the screen-only `Download PDF` action.

## Case-study proof-access contract

The earlier requirement for a five-part evidence abstract on every long case study is
withdrawn.

The binding requirement is **early or cheap proof access**. A sceptical reader should not
have to perform repository archaeology to test a consequential claim, but a case study
that already establishes its question, design, cost and state through good narrative
does not need extra proof furniture.

Rendered-site inspection found:

- Agent Asset Marketplace already establishes its governing engineering problem quickly;
- Agentic Learning Lab already establishes its governing idea quickly;
- Adventures of Patch already establishes its system/pipeline idea quickly; and
- Wild Bunch intentionally opens as a personal game story. That narrative is part of the
  page's value and stays intact.

Implementation leaves Marketplace, Learning Lab and Patch alone unless drift reveals a
new concrete reader problem. Do not add components merely to satisfy the withdrawn
abstract checklist.

### Wild Bunch falsifiability route

The rendered paragraph currently reads:

> I only get to call that exact replay because it's falsifiable. Full-stream equality
> tests rebuild a session from its events and compare the result. If the reconstructed
> state differs, the architecture hasn't earned the claim.

Use two deliberate evidence links rather than making one link prove both the scar and the
repair:

- link **`falsifiable`** to Wild Bunch PR #167,
  `https://github.com/HarleyBartles/wild-bunch/pull/167`;
- link **`Full-stream equality tests`** to Wild Bunch PR #171,
  `https://github.com/HarleyBartles/wild-bunch/pull/171`.

PR #167 is the receipt for falsification: the replay audit tested the strict claim and
found concrete gaps, including `TravelDiaryDays` and the unrelated-criminal-ledger
concern. PR #171 is the closure receipt: the integrity series resolves the remaining
audit findings, adds production full-replay loading and extends replay equality through
the production path.

That gives the cynical architect one click to the uncomfortable evidence and one click to
the repaired claim. Do not replace these with a generic repository link or a new proof
panel.

## Portfolio-as-software receipt

Rejected for public Phase 7A treatment.

The 29 August pre-commit/hosted-CI repair is ordinary engineering maintenance. It was
useful during discovery because it exposed Harley's instinct to challenge a locally fast
but systemically wasteful process, but it does not compete with the Access outcomes or
Wild Bunch falsification evidence for reader attention. Keep it in the discovery record
as cutting-room context only. Do not add a CI receipt, badge, test-count boast or
Working Style paragraph from it.

## Canonical professional facts

Reusable professional facts belong in `professionalProfile.ts` or another explicit
single source selected by the local plan, not as independently strengthened literals
across About, CV, homepage and writing.

Implementation must preserve distinctions between the public statement, its factual
basis, exact/approximate/qualitative precision, disclosure limits and allowed consumers.
Different routes may use different lengths of the same approved truth. They may not grow
it stronger by paraphrase.

The About/CV design records identify the specific new canonical outcome/progression facts
that implementation needs to model.

## Visual and styling authority

The current warm paper, ink, copper, Fraunces, Source Serif 4, Fira Code and authored
editorial identity remain protected defaults. Phase 7A is not a visual reset.

The final visual recommendations live in
[`phase-7a-site-visual-language-recommendations.md`](../../docs/editorial-drafts/phase-7a/phase-7a-site-visual-language-recommendations.md).
The governing principle is **reuse grammar, not layouts**.

The room inspected rendered pull quotes directly and promoted their common grammar into a
site editorial primitive: pale copper wash, strong copper left rule, oversized italic
Fraunces, deliberate whitespace and an optional Fira Code secondary line when it adds
real attribution or classification. About uses the short-statement variant. The later
site-wide polish pass must compare and harmonise pull quotes and the wider recurring
visual vocabulary across the whole publication rather than rediscovering the language
from CSS.

Phase 7A may change About/CV hierarchy, grid, rhythm, rules, typography scale and
responsive behaviour as specified by their page-design records. It must not add
dashboard cards, proof badges, metric theatre, generic corporate iconography or a new
visual system that fights the rest of the site.

## Non-goals

Phase 7A will not:

- publish customer identities, candidate data, private volumes, financial values,
  credentials, security detail, contractual information or unnecessary employer
  topology;
- invent or reverse-engineer employer outcomes;
- turn Access Checks into a standalone employer product case study;
- claim a formal Senior title Harley does not hold;
- redesign the Phase 8 homepage;
- rewrite accepted essays simply to make them match the new professional pages;
- flatten the four long case studies into one repeated template;
- use proof density as a substitute for editorial judgement; or
- make the later site-wide polish pass rediscover design decisions already made here.

Rewriting About and CV, changing their styling and information architecture, making CV
first-class navigation, defining proof links, and supplying downstream visual-language
recommendations are explicitly in scope.

## Validation and hostile review

Normal repository gates remain necessary but are not design acceptance evidence by
themselves.

The landed implementation must:

- cold-read About as the weary hiring manager and record what is believed after the first
  viewport, after the Access treatment and after the career provenance;
- cold-read the CV at recruiter scanning speed and verify role, current scope,
  representative outcomes, conventional stack and chronology can be recovered without
  reading every sentence;
- cold-read Wild Bunch as the cynical architect, challenge `event sourcing` and `exact
  replay`, click `falsifiable`, and confirm PR #167 exposes an actual failed replayability
  claim;
- click `Full-stream equality tests` and confirm PR #171 supplies the repaired production
  replay/equality receipt;
- verify Marketplace, Learning Lab and Patch have not acquired redundant proof furniture;
- read all changed first-person prose aloud for Harley's cadence and the portfolio's
  AI-tell policy;
- verify formal titles, chronology, outcome precision and privacy boundaries claim by
  claim; and
- review changed layouts at 1440, 768, 390 and 320 CSS pixels, 200% zoom, keyboard,
  reduced motion and representative screen-reader flow.

The generated CV must also be inspected as the actual two-page PDF, not inferred from the
web route.

## Design-room acceptance

The Cloud design room is complete because:

- [x] final About copy, section order and styling direction are recorded;
- [x] final two-page CV copy, section order and styling direction are recorded;
- [x] `CV` is a first-class masthead route;
- [x] the Access outcome treatment is consequential, employer-safe and representative
      rather than exhaustive;
- [x] Barbican/Arch provenance establishes selective architecture judgement without a
      pattern lecture;
- [x] Brand Addition preserves the progression that earned Web Manager;
- [x] About and CV no longer rely on generic `frontier`, `professional truth`,
      competency-rubric or defensive-qualification language;
- [x] Wild Bunch preserves its personal opening and has exact one-click scar and repair
      receipts;
- [x] Marketplace, Learning Lab and Patch receive no new proof structure without an
      observed reader problem;
- [x] the portfolio CI scar remains cutting-room material;
- [x] reusable professional facts have a single-authority requirement;
- [x] site-wide visual-language recommendations are durable for the later polish pass;
- [x] hostile hiring-manager and architect lenses have been applied to the design; and
- [x] local Sol can write a JIT implementation plan without inventing a material copy,
      hierarchy, styling or proof-route decision.

## Readiness assessment

**Implementation-ready.** The source gate, copy, information architecture, proof routes,
visual direction and downstream polish recommendations are all decided. Local Sol should
begin with a current-branch drift review, reconcile the canonical professional-fact
source, write the JIT implementation plan, and execute the room outputs without
redrafting them.
