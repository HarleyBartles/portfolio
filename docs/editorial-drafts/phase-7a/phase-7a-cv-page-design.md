# Phase 7A CV page design

**Status:** Cloud-room design output, 29 August 2026. Binding input for the
Phase 7A implementation plan, subject only to Harley correcting a factual claim
or explicitly reopening a design decision.

**Purpose:** Replace the current rubric-shaped CV with a conventional two-page
hiring document whose first job is to get Harley forwarded to a serious
technical interview. Preserve the existing web/PDF mechanism; replace the
information order, prose and internal presentation.

## Design thesis

The current CV asks a recruiter to accept the positioning before it shows the
career. Its large `Profile` and `Immediate contribution` treatment consumes the
first half of page 1 before the strongest evidence begins. Phrases such as
`Ready to contribute immediately` and `Useful context, not a claim of equal
daily fluency` read like an assessment rubric rather than a CV.

The redesigned document reverses that relationship:

1. identify Harley plainly;
2. establish present scope in two or three lines;
3. spend page 1 on current professional experience and consequences;
4. use page 2 to complete the chronology, show selected independent work, then
   answer stack-fit and education questions compactly.

The CV should look like it belongs to the same authored portfolio while using a
more conventional register. It is a hiring document, not another case study or
manifesto.

## Hiring-manager scan target

A reader spending roughly 20-30 seconds on page 1 should be able to recover:

- Harley is a full-stack software engineer with 7+ years of professional
  engineering experience;
- his current formal title is `Software Engineer` at The Access Group;
- he is currently the sole engineer responsible for Access Checks;
- he owns work from product epic through technical design, implementation,
  DevOps, release, production support and operation;
- he has shipped commercially consequential work rather than only carrying
  responsibility;
- his current stack includes .NET, React/TypeScript, Python/Django, SQL and
  Azure; and
- he is looking for a senior full-stack role.

The CV must not require the reader to infer seniority from adjectives. The role
scope and outcomes should do the work.

## Screen and print structure

Retain two canonical sheets and one shared content source for the web route and
PDF.

### Page 1

1. Header / identity / contact routes
2. Profile
3. Professional experience
4. The Access Group

Page 1 belongs overwhelmingly to the present. Do not put the technical-skills
inventory before employment.

### Page 2

1. Small running identity line: `Harley Bartles · CV · 2 / 2`
2. Professional experience continued
3. Barbican Insurance Group → Arch Capital Group
4. Brand Addition
5. Selected independent engineering
6. Technical skills
7. Education and current study

The bottom two sections may use a two-column composition on desktop/print to
save vertical space, provided DOM order remains linear and intelligible.

## Exact public copy

The copy below is the implementation target. Local Sol may make only mechanical
line-break or punctuation adjustments needed by the rendered layout; material
wording changes return to this room/Harley.

### Header

Eyebrow:

`CURRICULUM VITAE`

Name:

`Harley Bartles`

Headline:

`Full-stack software engineer · .NET, React, Python and AI-assisted automation`

Utility details:

`Manchester, UK · Remote-first · Four weeks' notice`

Links:

- `harleybartles.com`
- `LinkedIn`
- `GitHub`
- `Contact`

`Contact` links to `/about#contact` on the web and to the canonical absolute
portfolio contact URL in the generated PDF. Do not expose a private email
address or phone number to satisfy a conventional-CV trope.

Remove `Return to About` from the screen controls. The global masthead now owns
that navigation. Keep one screen-only `Download PDF` action above the document.

### Profile

Heading:

`Profile`

Copy:

> Full-stack software engineer with 7+ years in production systems. At The
> Access Group I'm currently the sole engineer responsible for Access Checks.
> I'm looking for a senior full-stack role where end-to-end ownership is
> expected and there's still something difficult left to learn.

Do not add `senior scope`, `frontier`, `consequential problems`, `evidence in
view`, or other positioning language around this. The next section supplies the
evidence.

### Professional experience

Section heading:

`Professional experience`

#### The Access Group

Role/date line:

`Software Engineer · September 2021 – present`

Lead:

> I joined Recruitment CRM, volunteered for a move to Access Screening in
> January 2023, then moved into Access Checks from its early greenfield stage.
> I'm now the sole engineer responsible for designing, delivering, operating and
> supporting Access Checks.

Bullets:

- `Turn product epics into delivery plans and own technical design,
  implementation, DevOps, release, production support and continuing operation
  across a .NET 8 API on Azure Functions, a React/.NET portal and its supporting
  automation services.`
- `Designed and delivered a browser-automation service for DBS Update and Right
  to Work Sharecode checks where the authoritative government services expose
  web journeys rather than suitable APIs. The LLM is bounded to locating page
  elements and proposing browser actions; deterministic code executes the
  actions and extracts the result.`
- `Made source evidence a hard success condition: no captured government
  result, no successful check, and a no-charge signal downstream. The service
  enabled Access Screening to offer two additional paid checks inside its
  normal screening journey.`
- `Owned a cross-product v1-to-v2 migration where Access Screening was both the
  original upstream supplier and becoming a downstream consumer of Access
  Checks. I sequenced the remaining v1 consumers first, preventing a valid but
  wasteful round trip through both generations of Access Checks. The old v1
  endpoint is now unused and tracked for retirement.`
- `Earlier on Recruitment CRM, replaced a cursor-heavy chain of stored
  procedures with set-based SQL, reducing a several-minute operation to a
  couple of seconds while preserving existing single-ID callers.`

Editorial intent:

- The first bullet proves current ownership and puts the conventional stack on
  page 1.
- The browser-automation pair proves design judgement, safety boundary and
  commercial consequence.
- The migration bullet proves cross-product sequencing and product-boundary
  reasoning while leaving the fuller topology explanation to About.
- The SQL bullet deliberately broadens the evidence beyond today's two Access
  examples and demonstrates ordinary conventional engineering.
- Do not add more bullets merely to make the role look busy. These are
  representative worked examples, not an exhaustive achievement ledger.

#### Barbican Insurance Group → Arch Capital Group

Role/date line:

`Full Stack Software Engineer (Barbican) · Software Engineer, Level 1 → Level 2 (Arch) · February 2019 – September 2021`

Copy:

> My first professional engineering role was at Barbican Insurance Group. I
> moved with the product after Arch Capital acquired the company and spent
> roughly two years on LENS in a three-person engineering team, progressing
> from Level 1 to Level 2 in Arch's three-level software-engineer framework.

Bullets:

- `Built a complex insurance application across .NET Core, React/Redux and SQL
  Server, working deeply with DDD, CQRS, event sourcing and layered/onion
  architecture.`
- `Worked in a domain where dense business rules needed explicit modelling and
  full replay and audit history made the event-sourced design earn its cost.
  That's where I learned that architecture has to earn its place.`

Do not turn this entry into a pattern or tooling inventory. TeamCity, Octopus,
TFS, SignalR and other useful search terms can live in Technical skills.

#### Brand Addition

Role/date line:

`Commercial roles → Team Manager → Web Manager · July 2005 – January 2019`

Copy:

> I spent nearly fourteen years at Brand Addition, progressing through
> commercial roles and team management before becoming Web Manager for the final
> couple of years. That role became the bridge from commercial work into
> professional software engineering.

Bullets:

- `While managing a team, I identified a web change we needed and worked with
  the Ecommerce Director to specify and deliver it. That work led to an offer
  to move into the Web Manager role.`
- `As Web Manager I defined requirements, coordinated external developers, held
  platform and delivery responsibility, and helped migrate and maintain more
  than 100 multilingual, multicurrency stores.`

The role title `Web Manager` must never be rendered beside the full 2005-2019
period in a way that implies Harley held it for the whole employment period.
The progression line is part of the factual contract.

### Selected independent engineering

Heading:

`Selected independent engineering`

Intro: none. Let the entries do the work.

#### Agent Asset Marketplace

> Public distribution for reusable agent capabilities, with provenance,
> governance, versioning and safe cross-repository reuse kept inspectable.

Link the title to `/projects/codex-marketplace`.

#### Wild Bunch

> A pre-alpha .NET Western game inspired by a childhood favourite, built around
> seeded worlds, exact replay and towns that remain themselves when the player
> rides on. The public case study exposes the game and the engineering decisions
> behind it.

Link the title to `/projects/wild-bunch`.

Do not reduce this summary to the replayability audit or another single proof
receipt. The falsification receipt is a strong deep link inside the case study,
not the definition of the project.

#### Agentic Learning Lab

> A facilitator-led curriculum for helping non-programmers direct, inspect,
> verify and recover agent work through bounded practical labs.

Link the title to `/projects/agentic-learning-lab`.

Keep this CV set to three items. Adventures of Patch remains visible elsewhere
in the portfolio; adding every strong project would turn selection into a
catalogue.

### Technical skills

Heading:

`Technical skills`

Use three compact groups. These are recruiter-searchable nouns, not prose
paragraphs and not rated skill bars.

**Current**

`C# / .NET 8 · Azure Functions · React · TypeScript / JavaScript · Python / Django · SQL / MySQL · REST APIs · Git / GitHub`

**Testing**

`Unit · API / acceptance · integration · browser · xUnit · NUnit · pytest · Django/unittest · FakeItEasy · Playwright · Jest`

**Earlier production experience**

`React Native · Redux · GraphQL · SignalR · RabbitMQ / message brokers · Angular · SQL Server · TeamCity · Octopus Deploy · TFS · Azure DevOps · AWS · Azure`

Do not restore `Ready to contribute immediately`, `Useful context, not a claim
of equal daily fluency`, star ratings, years-per-tool, percentage bars or a
logo cloud. The grouping already says what is current and what is earlier.

If `Angular` needs qualification, use the compact parenthetical `Angular
(reacclimation required)` rather than a separate defensive sentence.

### Education and current study

Heading:

`Education and current study`

Entries:

**AI Engineer Level 6 Apprenticeship – QA**  
`February 2026 – January 2028 · in progress`  
`Bachelor's degree-level programme delivered against the Machine Learning
Engineer standard (ST1398 v1.0), covering machine learning, generative AI,
model development, deployment, monitoring, ethics and security.`

**Access to H.E. Certificate – Media, Theatre, English – ManCAT**  
`2002 – 2003`

**BTEC Level 3 – Performing Arts (Music) – Shena Simon F.E. College**  
`1997 – 1999`

**Seven GCSEs**

Do not imply that the Level 6 apprenticeship awards a bachelor's degree. It is
a bachelor's-degree-level programme.

## Layout and art direction

### Overall register

The CV should feel like the portfolio changed clothes for an interview, not
like it became a different brand.

Preserve the site's typographic family and restrained copper accent, but reduce
editorial theatrics. No pull quotes, evidence cards, dark proof panels,
illustrations, diagrams, decorative icons or generated imagery belong in the
CV.

### Desktop web

- Keep the two-sheet metaphor at larger widths because it previews the PDF
  honestly.
- Retain a fine sheet border on screen, but reduce its visual dominance; the
  content hierarchy should create the document, not the rectangle.
- Page 1 header is a two-column composition: identity left, location/notice and
  links right.
- Reduce the current name scale materially. The name should be the largest text
  in the document but should not consume the vertical space needed for evidence.
- A useful target is roughly `3.5-4.25rem` on the desktop web sheet, subject to
  visual review against the final line length.
- The headline sits directly beneath the name at normal display/subheading
  scale; it is not a second hero.
- Section headings use Fraunces but are much smaller than site-page headings.
- Dates and utility labels use Fira Code / the utility voice.
- Body copy uses Source Serif 4 at a compact but comfortable document measure.
- Employment entries remain single-column. Do not make the recruiter read an
  experience timeline across columns.
- Technical skills and Education/current study may form a 55/45 two-column
  block near the bottom of page 2 if the final typesetting benefits.

### Mobile web

Below the width where an A4-sheet simulation remains comfortable:

- stop pretending the viewport is paper;
- remove the outer sheet border and A4-like horizontal padding;
- collapse the two sheets into one continuous web document with an ordinary
  section gap rather than a large page gap;
- keep the semantic `data-cv-page` sections so print generation still has two
  pages;
- stack the header details below the identity;
- stack Technical skills and Education/current study;
- preserve the same DOM/read order as desktop and print.

A user should never have to horizontally pan a miniature A4 page on mobile.

### Print / generated PDF

- Preserve exactly two A4 pages.
- Print on white with no tinted background requirement. The document must remain
  strong in colour and in ordinary grayscale printing.
- Remove the screen sheet border, site masthead/footer and screen-only PDF
  control.
- Keep copper as restrained typographic/rule emphasis where printing supports
  it; meaning must not depend on colour.
- Page 2 begins with the small running identity `Harley Bartles · CV · 2 / 2`
  before the continued experience section.
- External-link icons may be omitted in print. Link text must remain useful
  without the icon.
- Do not shrink body type below a comfortable professional-CV size merely to
  rescue overlong copy. If pagination overflows, edit spacing or return to this
  room for a copy decision rather than silently squeezing everything.

### Spacing and rules

- One strong rule after the header is enough to establish the document.
- Subsequent section boundaries use fine rules and whitespace, not boxed cards.
- Employment entries use consistent spacing: organisation, role/date line,
  lead, bullets.
- Bullets should be compact and hang cleanly; avoid huge indent or airy list
  spacing.
- Page 2 should not look like a leftovers page. The running identity and
  continued chronology should make it feel deliberately composed.

## Metadata

Update the CV document description away from the current self-positioning.
Recommended description:

`CV for Harley Bartles, a full-stack software engineer with 7+ years in production systems across .NET, React, Python and AI-assisted automation.`

The page title remains `CV | Harley Bartles`.

## Canonical-data boundary

Shared professional facts must remain canonical rather than being copied into
About and CV as independently mutable claims.

Local implementation should extend `professionalProfile.ts` or introduce a
small adjacent professional-outcomes source for facts reused across surfaces,
including:

- current Access Checks ownership;
- two additional paid checks enabled;
- the `no source capture, no success` invariant and no-charge consequence;
- migration dependency/outcome and current unused-v1 status;
- Recruitment CRM SQL performance outcome;
- Barbican/Arch titles and progression; and
- Brand Addition progression into Web Manager.

The exact CV paragraphs and bullet sentences are editorial composition and do
not all need to become canonical atoms. The facts underneath them do.

## Explicit removals from the current CV

Remove:

- `Senior software engineer | full-stack and agentic systems` as the headline;
- the current generic Profile paragraph;
- the `Immediate contribution` section;
- `Ready to contribute immediately`;
- `Current, practical delivery capability`;
- `Useful context, not a claim of equal daily fluency`;
- the current capability wall before employment;
- `Return to About` as a prominent CV action;
- third-person Brand Addition copy; and
- any implication that Web Manager covered July 2005-January 2019.

The underlying skills, dates and useful factual material are retained where
appropriate; this is an editorial rewrite, not a factual purge.

## Hostile review

### Weary hiring manager

Cold-read only page 1 for 30 seconds.

Pass if the reviewer can answer, without reading the whole document:

- what Harley does now;
- what his formal current role is;
- the level of responsibility he actually carries;
- at least two concrete things that changed because of his work;
- the conventional stack underneath the AI work; and
- what role he wants next.

Fail if the reviewer first remembers `agentic`, a skills wall, or self-awarded
seniority instead of the Access work.

### Cynical architect

Read the Access bullets and Barbican/Arch entry.

Pass if:

- the browser-automation account names the deterministic/LLM boundary rather
  than implying autonomous AI;
- success semantics and evidence are concrete;
- the migration dependency is cognitively understandable without private
  topology;
- residual v1 debt remains visible rather than polished away;
- DDD/CQRS/event sourcing appear with the requirements that paid for them; and
- the document supplies obvious interview seams rather than trying to prove
  every claim inside the CV itself.

Fail if architecture becomes a noun list or the AI material sounds like a
fashionable wrapper around ordinary scraping.

## Implementation acceptance

The CV design is implemented only when:

- [ ] page 1 leads with present professional evidence rather than capability
      inventory;
- [ ] web and PDF use the same approved copy and canonical facts;
- [ ] the generated artifact remains exactly two A4 pages at the canonical
      print target;
- [ ] Brand Addition visibly represents progression culminating in Web Manager;
- [ ] the Access migration story explains the Access Screening dependency
      before the avoided round trip;
- [ ] the Access examples read as representative evidence rather than an
      exhaustive career summary;
- [ ] Wild Bunch remains a broad project invitation rather than a replay-audit
      synopsis;
- [ ] technical keywords remain recruiter-searchable without defensive rubric
      prose;
- [ ] mobile renders as a readable continuous web document rather than a
      miniature paper sheet;
- [ ] print remains legible in grayscale and does not depend on decorative
      imagery;
- [ ] the first-class masthead `CV` route and screen-only `Download PDF` action
      both work; and
- [ ] hostile hiring-manager and architect reads pass on the rendered page and
      the actual generated PDF.
