# Portfolio £10k Phase 7A: Professional Surfaces and Proof Choreography Design

**Status:** Active Cloud design room. Source discovery is cleared; implementation is
blocked until this room closes the copy, information-architecture, proof-route and
styling decisions below.

**Author override:** 29 August 2026. Harley explicitly expanded this room beyond the
older roadmap wording. The roadmap and earlier Phase 7A constraints must catch up to
the intent established here; they do not narrow it. This room owns the finished design
for the affected hiring surfaces. Local implementation must execute that design rather
than inventing the missing editorial or visual decisions.

**Design input:** Weary-sceptical hiring-manager and jaded-cynical-architect lenses;
Harley-led source discovery and rendered-site review, 29 August 2026.

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Primary source record:**
[`phase-7a-cloud-discovery-record.md`](../../docs/editorial-drafts/phase-7a/phase-7a-cloud-discovery-record.md)

## Goal

Make the professional hiring surfaces as strong as the engineering evidence they point
to.

The problem is no longer a shortage of proof. The current About page and CV obscure
strong material with positioning language, defensive qualification and copy that can
read like a rubric translated into prose. The site also makes the CV unnecessarily hard
to find and, in Wild Bunch, leaves a particularly strong falsification receipt several
steps away from the claim it proves.

Phase 7A therefore redesigns the affected professional surfaces as one coherent hiring
journey. It may rewrite copy, reorder information, change hierarchy and styling, and
add or remove presentation structures where doing so shortens the route from a claim to
credible evidence. The target is a visible step toward the portfolio's £10k bar, not a
minimal patch to the implementation that happened to exist when the phase was first
written.

## Decision lenses

The active portfolio design policy remains authoritative. In particular:

- the weary hiring manager must be able to forward the site without feeling that they
  are forwarding another polished agentic-engineering claim with no conventional
  engineering underneath it;
- the cynical architect must be able to challenge architecture vocabulary and find
  decisions, failures, trade-offs, corrections, limits and falsifiers rather than a
  pattern costume; and
- strong evidence still fails if the public prose is generic, overqualified,
  self-congratulatory or obviously AI-shaped.

The design should create the reactions already named by policy: `I am not going to look
stupid forwarding this one` and `annoyingly, this person actually does understand what
they're talking about`.

## Room authority and implementation boundary

This Cloud room owns:

- final public copy for every Phase 7A rewrite;
- the information order and content hierarchy of About and CV;
- the CV's masthead/navigation position;
- the exact proof-route decisions for affected case studies;
- visual and styling direction detailed enough that a local worker is implementing a
  decided design rather than designing while coding;
- factual and privacy boundaries for all new professional claims; and
- the acceptance experience under the hiring-manager and architect lenses.

The local Sol implementation pass owns code, responsive execution, tests, generated
artifacts, implementation-detail choices that do not alter the design, and evidence that
the landed result matches this specification.

Local implementation must return to Harley rather than silently choosing between
material copy, hierarchy, art-direction or proof-route alternatives left unresolved by
this room.

## Approved source truth

The employer-safe source gate is cleared. The discovery record is authority for claim
precision and disclosure boundaries.

The governing Access example is the browser-automation service used by DBS Update and
Right to Work Sharecode checks:

- Harley received an underspecified delivery requirement plus access to an LLM endpoint
  and credentials, then designed and delivered the service boundary and implementation;
- the LLM is bounded to page interpretation and browser-action selection; deterministic
  code executes actions and extracts the result;
- a successful check requires captured rendering of the authoritative government result
  page;
- no capture means no successful result and a downstream no-charge signal; and
- the work enabled Access Screening to offer two additional paid integrated checks.

A second approved Access example covers the v1-to-v2 migration sequence. Harley exposed
a cross-product dependency, made migration of remaining v1 consumers a prerequisite,
and prevented a technically valid but operationally wasteful compatibility round-trip
from becoming the production design. The unused v1 endpoint remains tracked retirement
debt assigned to Harley.

These are representative examples from a much larger body of ordinary delivery. Public
copy must not make them sound like Harley's only two useful outcomes at Access.

## Professional provenance

Barbican Insurance Group and the subsequent Arch period are the concise professional
provenance for Harley's architecture judgement.

Harley learned DDD, CQRS, event sourcing, layered and onion architecture through
production immersion in a complex insurance domain where the costs were visibly earned:
DDD modelled dense business rules; event sourcing supported full replay and auditability;
CQRS paid a complementary separation cost. The public point is not a pattern tutorial
and not a claim that Harley originated the architecture. It is that he first learned
expensive architecture in a system where he could see why it paid rent, which became the
basis for later selectivity: complexity has to earn its place.

The full organisational-memory argument remains owned by `Why ADRs?`.

## About design contract

About is no longer treated as a surface that merely needs one extra outcome paragraph.
This room may rewrite and reorder the page wherever the current composition gets between
the reader and the professional evidence.

The current opening is specifically not protected. `About / professional truth`,
`Senior full-stack engineering, with the evidence in view`, the generic
`underspecified, consequential problems` positioning, and `I work at the frontier of
agentic engineering` all tell the reader how to interpret Harley before the page has
shown enough to earn the interpretation. The weary-hiring-manager lens makes that an
active problem, not harmless branding.

The redesigned About must:

- sound like Harley rather than like an assessment rubric;
- establish current professional identity and scope quickly while keeping the formal
  `Software Engineer` title exact;
- let current responsibility and consequence demonstrate seniority rather than repeatedly
  announcing `senior scope`;
- make the Access outcome chain legible near the top without turning Access Checks into a
  public employer case study;
- make the evidence invariant memorable because it is a genuine engineering decision,
  not because the page surrounds it with credibility language;
- carry the Barbican/Arch provenance briefly enough to establish where the architectural
  judgement came from;
- keep the broader career chronology useful without reproducing the CV;
- use independent work as inspectable corroboration rather than a generic claim that
  projects are evidence;
- retain the small human acting-career aside if it still improves the page after the
  professional hierarchy is settled;
- keep contact and hiring intent clear; and
- provide a direct CV route without relying on the reader to discover a buried About
  call-to-action.

Exact copy, section order and styling remain design-room work and must be appended to this
spec before implementation readiness is declared.

## CV design contract

The existing CV delivery mechanism is worth keeping; the current prose and information
order are not protected.

Phase 7A owns a substantive editorial rehabilitation of both the web CV and its generated
two-page PDF. This is not deferred to a later polish phase. The document currently reads
too much like a competency rubric converted into copy, including headings and
qualifications such as `Immediate contribution` and `Useful context, not a claim of equal
daily fluency`, a generic profile paragraph, and an inconsistent switch into third person
for Brand Addition.

The redesigned CV must:

- remain a conventional, printable two-page hiring document with web/PDF parity;
- put current professional experience and consequences ahead of a large skills inventory;
- use plain, specific language and ordinary CV grammar rather than manifesto language;
- give Access Checks enough space to show ownership and representative outcomes without
  making two examples look exhaustive;
- establish Barbican/Arch as the professional foundation of the architecture judgement
  without turning the entry into a technology wall;
- keep Brand Addition honest as the commercial, management and web-platform bridge into
  professional software engineering;
- retain useful recruiter-searchable technical capability while removing repeated
  defensive qualification;
- keep current fluency and earlier production exposure distinguishable by structure and
  wording, not by anxious disclaimers;
- retain relevant independent engineering and the Level 6 AI Engineer apprenticeship;
- preserve exact formal role titles and employment chronology; and
- read naturally aloud as Harley's professional document.

### CV navigation decision

`CV` becomes a first-class global masthead item linking to `/cv`.

The existing About-to-CV route remains useful in context, but it is no longer the primary
discovery mechanism. On the CV route, the global masthead supplies the About route, so
screen-only CV controls should not waste prominent space on a redundant `Return to About`
link unless the finished composition demonstrates a clear usability reason to retain it.

Exact CV copy, final section order and final layout/styling directions remain design-room
work and must be appended before implementation readiness is declared.

## Case-study proof-access contract

The earlier requirement for a five-part evidence abstract on every long case study is
withdrawn.

The design requirement is **early or cheap proof access**: a sceptical reader should not
have to perform repository archaeology to test the consequential claim, but a case study
that already establishes its question, design, cost and state through good narrative does
not need extra proof furniture.

Rendered-site inspection on 29 August found:

- Agent Asset Marketplace already establishes its governing engineering problem quickly;
- Agentic Learning Lab already establishes its governing idea quickly;
- Adventures of Patch already establishes its system/pipeline idea quickly; and
- Wild Bunch intentionally opens as a personal game story. That narrative is part of the
  page's value and should not be flattened into a standardised evidence card.

Implementation must therefore leave Marketplace, Learning Lab and Patch alone unless the
final design-room pass identifies a specific reader problem. No component should be added
merely to satisfy the old abstract checklist.

### Wild Bunch falsifiability decision

Wild Bunch keeps its narrative opening.

The sentence that says exact replay is `falsifiable` should make that word the direct
route to the event-sourcing falsification receipt. A sceptical reader who accepts the
sentence can keep reading; a sceptical reader who clicks should immediately be able to see
that Harley actually tested the claim, found places where it was false, corrected the
implementation and added equality/recovery tests capable of disproving it again.

The receipt is the public event-sourcing integrity sequence:

- `.agents/docs/event-sourcing-replayability-audit.md` records the replayability audit,
  including the TravelDiaryDays violation and the UnrelatedCriminalLedger replay concern;
- `tests/WildBunch.Integration.Tests/FullReplayEqualityTests.cs` deliberately stales or
  removes snapshot state and requires full event replay to recover equivalent state.

The implementation plan must pin the final public link to an appropriate stable Wild Bunch
revision rather than relying on an ambiguous prose claim or making the reader search for
the files.

About may cross-pollinate this proof if its final copy earns the reference. It does not
have to duplicate the case-study explanation.

## Portfolio-as-software receipt decision

Rejected for public Phase 7A treatment.

The 29 August pre-commit/hosted-CI repair is ordinary engineering maintenance. It was
useful to this room because it exposed Harley's instinct to challenge a locally fast but
systemically wasteful process, but it does not compete with the Access outcomes or Wild
Bunch falsification evidence for scarce reader attention. Keep it in the discovery record
as cutting-room context only. Do not add a CI receipt, badge, test-count boast or working-
style paragraph from it.

## Canonical professional facts

Reusable professional facts belong in `professionalProfile.ts` or another explicit
single source selected by the local plan, not as independently strengthened literals
across About, CV, homepage and writing.

The implementation must preserve distinctions between:

- the public statement;
- its factual basis;
- exact, approximate or qualitative precision;
- disclosure limits; and
- which routes may consume the fact.

Different routes may use different lengths of the same approved truth. They may not grow
it stronger by paraphrase.

## Visual and styling authority

Styling is in scope for this design room. The current warm-paper, ink, copper, Fraunces,
Source Serif 4, Fira Code and authored editorial identity remain useful protected defaults;
Phase 7A is not a visual reset.

Within that identity, this room may change:

- About hero scale, copy balance, grid and fact placement;
- section order, rhythm, dividers, rails, pull quotes and evidence emphasis;
- CV screen composition and the internal layout of the two printable sheets;
- typography scale and hierarchy within the affected surfaces;
- masthead spacing needed to admit the `CV` item cleanly; and
- responsive behaviour required by the new information hierarchy.

The styling must reduce the feeling of repeated rubric sections and make the professional
pages feel edited and authored. It must not add decorative dashboard cards, proof badges,
metric theatre, generic corporate iconography or a new visual system that fights the rest
of the site.

Exact layout and styling instructions remain design-room work and must be appended before
implementation readiness is declared.

## Non-goals

Phase 7A will not:

- publish customer identities, candidate data, private volumes, financial values,
  credentials, security detail, contractual information or unnecessary employer topology;
- invent or reverse-engineer employer outcomes;
- turn Access Checks into a standalone employer product case study;
- claim a formal Senior title Harley does not hold;
- redesign the homepage owned by Phase 8;
- rewrite accepted essays simply to make them match the new professional pages;
- flatten the four long case studies into one repeated template;
- use proof density as a substitute for editorial judgement; or
- broaden into unrelated site-polish work with no hiring or proof-route value.

Rewriting About and CV, changing their styling, changing their information architecture,
and making the CV first-class navigation are explicitly in scope and must not be rejected
as `site polish`.

## Validation and hostile review

Implementation validation must include normal repository gates, but CI is not the design
acceptance test.

The landed work must be reviewed as a hiring instrument:

- cold-read About as the weary hiring manager and record what is believed after the first
  viewport, after the Access treatment and after the career provenance;
- cold-read the CV at normal recruiter scanning speed and verify that role, current scope,
  representative outcomes, core stack and chronology can be recovered without reading
  every sentence;
- cold-read Wild Bunch as the cynical architect, challenge `event sourcing` and `exact
  replay`, click `falsifiable`, and confirm the route lands on evidence that can actually
  disprove the claim;
- verify that Marketplace, Learning Lab and Patch have not acquired redundant proof
  furniture merely because an older spec asked for it;
- read all changed first-person prose aloud for Harley's cadence and the portfolio's
  AI-tell policy;
- verify formal titles, chronology, outcome precision and privacy boundaries claim by
  claim; and
- review the changed layouts at 1440, 768, 390 and 320 CSS pixels, 200% zoom, keyboard,
  reduced motion and representative screen-reader flow.

## Acceptance criteria

Phase 7A is complete only when:

- [ ] this room has supplied final About copy, section order and styling direction;
- [ ] this room has supplied final two-page CV copy, section order and styling direction;
- [ ] `CV` is specified as a first-class masthead route;
- [ ] the Access outcome treatment is consequential, employer-safe and representative
      rather than exhaustive;
- [ ] Barbican/Arch provenance makes selective architecture judgement credible without a
      pattern lecture;
- [ ] About and CV no longer depend on generic `frontier`, `professional truth`,
      competency-rubric or defensive-qualification language to establish credibility;
- [ ] Wild Bunch preserves its personal opening while `falsifiable` becomes a cheap route
      to pinned replayability evidence;
- [ ] Marketplace, Learning Lab and Patch receive no new proof structure without an
      observed reader problem;
- [ ] the portfolio CI scar remains cutting-room material, not public proof theatre;
- [ ] reusable professional facts have one authority and cannot silently strengthen across
      routes;
- [ ] hostile hiring-manager and architect reads survive without requiring independent
      repository archaeology; and
- [ ] the implementation plan can be written without inventing a material copy, hierarchy,
      styling or proof-route decision.

## Readiness assessment

**Not yet implementation-ready by design.** Source discovery and the major scope decisions
are stable. The active Cloud room still owes the final About copy, final CV copy and the
corresponding layout/styling specification. Those are not implementation details and must
not be delegated accidentally to the local worker.
