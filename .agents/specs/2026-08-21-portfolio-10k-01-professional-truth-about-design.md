# Portfolio £10k Phase 1 — Professional Truth and About Narrative Design

**Status:** Approved

**Approved design dialogue:** 21 August 2026

**Written-spec approval:** 21 August 2026

**Amended:** 21 August 2026 — Brand Addition scope corrected after Harley's
clarification; the approved claim strength and career-transition narrative are
preserved below.

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Design baseline:** `bd07d8a09581bdde40cddff4e880db426a50cd82`

## Goal

Create one durable source for Harley's public professional facts and use it to
turn About into the portfolio's explicit hiring narrative. The page must let a
hiring manager answer four questions quickly:

1. What level is Harley operating at?
2. What evidence supports that level despite the formal job title?
3. Which stacks and engineering problems can he contribute to now?
4. Why is he looking for another role?

The result should present Harley as a senior full-stack engineer working at
the frontier of agentic engineering. It must prove the claim through career
scope, technical breadth, deliberate learning, and inspectable independent
work rather than through inflated titles or promotional adjectives.

## Governing context

This spec owns Phase 1 only. It consumes, rather than repeats, the cross-epic
contracts in:

- [the approved direction checkpoint](../../docs/portfolio-10k-direction-checkpoint.md);
- [the active portfolio design policy](../doctrine/portfolio-design-policy.md);
- [the design-decision ledger](../../docs/design-decisions.md); and
- [the epic roadmap](../plans/portfolio-10k/roadmap.md).

When implementation begins, current repository truth still wins. If a fact or
component seam has changed materially, update and re-approve this spec before
writing the JIT implementation plan.

## Outcome boundaries

Phase 1 will deliver:

- a typed professional-profile source reusable by About and the later CV;
- a rewritten About page with an evidence-led career argument;
- a semantic career-timeline foundation;
- a scannable, evidence-based capability model;
- honest formal-title and actual-scope distinctions;
- targeted About styling and verification; and
- removal of the stale `/experience` orientation concept so About is the sole
  professional-history surface.

Phase 1 will not deliver:

- the downloadable CV;
- active contact delivery or provider selection;
- availability, salary, location, or working-pattern copy owned by Phase 2;
- homepage recomposition;
- a separate skills or experience route;
- a new article about agent-skill TDD or dependency governance;
- the final animated timeline interaction;
- a runtime service; or
- a formal claim that Harley holds a senior title or a bachelor's degree.

## Approved narrative approach

Use an editorial career argument supported by compact chronology. Do not
build a LinkedIn replica or a current-scope manifesto that erases the career
which produced the current judgement.

The page hierarchy is:

1. **Professional thesis.** State the senior full-stack and agentic direction.
2. **Scannable proof rail.** Show engineering since February 2019, current
   sole-engineer responsibility, and in-progress Level 6 study.
3. **Current Access practice.** Explain the progression from Recruitment CRM
   through Screening to Access Checks and the resulting end-to-end scope.
4. **Earlier career foundation.** Present Barbican-to-Arch as one continuous
   engineering period and compress the Brand Addition progression into the
   commercial judgement it proves.
5. **Formal AI depth.** Explain the apprenticeship precisely.
6. **Independent engineering laboratory.** Map projects to inspectable proof.
7. **Capability signal.** Answer what Harley can contribute to immediately,
   what he has production experience with, and how he learns into new stacks.
8. **Working style and next challenge.** Connect proportionate architecture,
   evidence, security, testing, and the positive reason for moving.
9. **Phase 2 boundary.** Keep CV and contact states honest until they work.

Final prose may be refined during implementation. The planner may not change
the approved ordering, public boundary, or claim strength without returning to
design.

## Professional-profile source

Create `src/client/src/data/professionalProfile.ts` as the single authored
source for reusable public facts. Keep editorial paragraphs in the page; they
are arguments, not canonical records.

The source must model:

- exact and approximate dates without conflating them;
- formal titles separately from actual scope;
- employers and acquisition continuity;
- career stages and public-safe evidence;
- current, prior, and learning-oriented capabilities;
- apprenticeship facts and authoritative references; and
- public profile links.

Use explicit precision such as `day`, `month`, `year`, `approximate`, or
`unknown`. Never turn an approximate transition into a promotion date.

The source should support a small pure helper which derives completed years
from `2019-02-06`. About displays both:

- `Professional software engineering since February 2019`; and
- a derived `7+ years`-style at-a-glance signal.

Tests must control the reference date. Do not reintroduce manually maintained
copy such as `6.5 years` or round the September 2026 Access anniversary up
before it occurs.

## Approved career facts

### The Access Group

- Formal title: **Software Engineer**.
- Start date: **27 September 2021**.
- The formal title has not changed.
- Public copy may name Access, its known product areas, relevant technologies,
  and Harley's responsibilities.
- Do not publish internal architecture, customer-specific information,
  private process, confidential metrics, or candidate data.

Career progression inside Access:

1. **Access Recruitment CRM — September 2021 to December 2022.** Work used
   .NET and a database-heavy control surface with stored procedures,
   transactions, rollback behaviour, and invariant protection. Do not name
   the unverified `Lightning Framework` in public copy.
2. **Access Screening — from January 2023.** Harley volunteered for the move,
   learned Python, Django, MySQL, and GitHub during January, and contributed
   fully from February 2023. The transition is evidence of deliberate and
   rapid learning, not a claim that learning required no support.
3. **Access Checks — involved from its early greenfield side-project stage.**
   The exact inception date is unknown. Do not publish the private early-to-mid
   2024 guess. Do not claim Harley invented or solely architected the original
   product.
4. **Effective senior scope — approximately mid-2025.** This is a description
   of responsibility, not a promotion or formal title change.
5. **Sole engineer — approximately May 2026.** The exact transition is not
   required in public chronology. The current fact is that Harley is the sole
   engineer responsible for Access Checks.

Describe current scope concretely:

> The sole engineer responsible for designing, delivering, operating, and
> supporting Access Checks.

Product supplies desired outcomes as epics. Harley turns underspecified epics
into explicit work items and a delivery plan, then owns technical design,
implementation, DevOps, release, production support, and continuing operation.
Do not claim product ownership or use `technical owner` as an unofficial title.

The Access Checks surface includes:

- a .NET 8 API on Azure Functions;
- a React and .NET customer portal for API consumers, usage, and webhook
  subscriptions; and
- an AI-assisted browser-automation service built end-to-end by Harley.

Public copy may name DBS and Right to Work share-code checks. Describe the last
system as bounded AI-assisted automation of public web flows where no suitable
API exists. Do not market it as autonomous or deeply agentic. The LLM earns its
place by handling change and interpretation inside a deterministic API
workflow. Detailed candidate-data flow, endpoint shape, and stored result
attachments are not needed on About.

### Reason for seeking a senior role

Use an explicit, employer-neutral account:

- Harley enjoys the work and has grown substantially at Access.
- His responsibilities have grown beyond his formal title.
- There is no available progression in the current position.
- He is looking for a senior role where scope, recognition, challenge, and
  growth align.

Do not publish dissatisfaction, private promotion conversations, or the
manager anecdote about work being planned for an experienced senior engineer.
That anecdote remains interview context.

### Barbican Insurance Group and Arch Capital Group

Treat February 2019 to September 2021 as one continuous engineering period
with an acquisition note. Retain the public-safe evidence already approved in
the direction checkpoint: .NET Core, React, Redux, layered/onion architecture,
DDD, CQRS, SignalR, TeamCity, Octopus Deploy, and TFS. The narrative should
explain decisions and delivery rather than render a technology wall.

### Brand Addition

Compress July 2005 to January 2019 into a progression from commercial and team
roles into the formal title Web Manager. Describe that final position
accurately as a hybrid business systems analysis and proto-development role,
not as a professional software developer role. Harley defined requirements,
coordinated external developers, held platform and delivery responsibility,
had limited hands-on code exposure, and helped migrate and maintain more than
100 multilingual, multicurrency stores.

This period explains commercial judgement, client awareness, leadership, and
the deliberate transition into software engineering. Harley left after taking
the role as far toward professional software development as the company
structure allowed, then established his full-time engineering career at
Barbican. Do not claim he personally developed and implemented the platform.
Do not spotlight
the short January-to-February 2019 transition or reproduce LinkedIn's
`Unemployed at this time` entry.

### Level 6 AI Engineer apprenticeship

Use the approved distinction:

- **AI Engineer Level 6 Apprenticeship — in progress**;
- QA, February 2026 to January 2028;
- underlying standard: Machine Learning Engineer, ST1398 v1.0;
- Level 6 is the same qualification level as a bachelor's degree; and
- Harley is not claiming to hold a bachelor's degree.

The at-a-glance signal is `bachelor's-degree-level programme`, never
`bachelor's degree`. Explain that the programme deepens machine learning,
generative AI, model development, deployment, monitoring, ethics, and security
underneath the agent layer.

## Capability model

About must answer stack-fit questions without ratings, percentages, logo
clouds, or years used as a substitute for evidence.

### Languages and frameworks

**Ready to contribute immediately:**

- modern C# and .NET, including .NET 8 and C# 12-era features;
- React, TypeScript, and JavaScript;
- Python and Django;
- relational database work, SQL, and MySQL;
- REST API design and integration;
- Azure Functions;
- Git and GitHub; and
- Sass, while remaining comfortable with Less.

**Production experience, not all current daily use:**

- React Native;
- Angular, explicitly requiring reacclimation;
- Redux;
- GraphQL;
- SignalR;
- RabbitMQ and distributed message brokers;
- TeamCity, Octopus Deploy, TFS, and Azure DevOps; and
- AWS and Azure working fluency without claiming dedicated platform-engineer
  depth.

### Architecture and software design

Present architecture as judgement, not a pattern inventory:

- proportionate object-oriented and modular design;
- DDD, CQRS, and event sourcing when the domain earns them;
- MediatR, repository, and unit-of-work patterns where useful;
- SOLID, DRY, and YAGNI as working principles rather than badges;
- choosing ORMs and database providers by operational needs; and
- understanding that PostgreSQL, MySQL, and SQL Server have different
  capabilities and costs.

### Data, integration, cloud, and delivery

Show REST and GraphQL APIs, relational modelling, transactions, webhooks,
downstream integrations, Azure Functions, production CI/CD, Azure DevOps in
professional work, GitHub in independent work, and end-to-end release and
support responsibility.

### Testing and security

Lead with test design, then name tools:

- unit, API/acceptance, integration, and browser tests chosen by risk;
- xUnit and NUnit;
- pytest and Django/unittest;
- FakeItEasy;
- Playwright;
- working Jest knowledge;
- directed and reviewed Vitest use rather than unsupported implementation
  fluency; and
- prior Moq experience without endorsing it as a current project choice.

State TDD as a general practice: reproduce failure first, implement the
smallest responsible change, and require evidence of corrected behaviour.

Mention **agent-skill TDD** lightly: demonstrate a scenario failing for an
unequipped worker, then equip a fresh worker with the skill and require the
scenario to pass. Phase 7 may publish the deeper article and add a link later;
Phase 1 must not create a dead promise or placeholder link.

Security extends beyond authored code. About should communicate that
dependencies are executable supply-chain inputs whose provenance, privacy,
behaviour, updates, and removal remain architectural concerns. Do not name the
Moq/SponsorLink incident on About. It is optional future writing evidence, not
biographical content.

## Page and component seams

Expected implementation surfaces are:

- `src/client/src/data/professionalProfile.ts` — authored facts and capability
  classifications;
- a colocated unit test for fact and experience derivation invariants;
- `src/client/src/pages/AboutPage.tsx` — editorial argument and composition;
- `src/client/src/components/CareerTimeline.tsx` — semantic chronology;
- a focused component test when timeline behaviour exceeds static markup;
- `src/client/src/styles/global.scss` — existing About-system evolution;
- `src/client/src/components/OrientationStrip.tsx` — remove the dead
  `Experience` orientation entry;
- `src/client/src/types/content.ts` — remove the unused `experience` content
  kind;
- `src/client/e2e/about.spec.ts` — public outcome and privacy coverage; and
- the existing About visual-regression baseline.

The planner may refine component boundaries to match live code. It may not
create a new route, duplicate professional facts in Markdown, or build a
generic résumé framework.

## Career timeline foundation

Phase 1 implements a semantic `CareerTimeline` driven by the professional
profile:

- an ordered chronology with stable IDs;
- a desktop two-column layout with a left rail and narrative content;
- a single-column mobile and high-zoom reading order;
- explicit hooks for active, selected, and focused states; and
- complete content without JavaScript or animation.

The first version may include a restrained active marker only when it remains
small, accessible, and within scope. Rich expansion and collapse are deferred.

The future interaction contract permits `IntersectionObserver` to identify the
current career beat, timeline controls to move to a section, and short
transform/opacity transitions. It forbids raw scroll-driven animation, pinned
scroll, hidden inactive content, or dependence on motion for comprehension.
Reduced motion uses instant state changes. The rail becomes ordinary ordered
content when layout space is constrained.

## Dependency admission

There is no blanket ban on new dependencies. A library may be selected when it
removes meaningful implementation or accessibility complexity without
weakening the portfolio's design system or operating contract.

Before adding a dependency, the plan must record:

1. the concrete problem it solves;
2. why existing React, CSS, browser, and installed `motion` capabilities are
   insufficient or less responsible;
3. why this library is preferable to credible alternatives;
4. bundle and runtime cost;
5. accessibility behaviour;
6. styling and editorial-fit consequences;
7. maintenance health, provenance, licence, and security/privacy posture; and
8. removal or replacement cost.

Bootstrap or another layout system is allowed in principle, but it is not
preselected. Overlapping the bespoke SCSS system must be justified by a real
benefit rather than convenience alone.

## Accessibility and visual direction

Preserve the warm editorial field-journal system, existing fonts, asymmetry,
and restrained motion. Phase 1 uses typographic hierarchy and structured
evidence, not a portrait, stock imagery, or decorative AI graphics.

- Career beats are narrative sections supported by chronology, not cards.
- Capability rows show capability, current level, and evidence.
- Formal title and actual scope appear together.
- Immediate strengths dominate prior experience visually.
- Tables must collapse into semantic single-column reading at 320 CSS pixels
  and 200% zoom.
- Heading order, landmarks, keyboard focus, and source order must remain clear.
- No new autoplay or decorative motion is permitted.

## Evidence and external references

Personal employment dates, responsibilities, and private/public boundaries
come from Harley's approved account. Official public sources support product
and qualification terminology:

- [Access Recruitment CRM Help Centre](https://help-accessrecruitmentcrm.theaccessgroup.com/en/)
- [Access Screening product overview](https://www.theaccessgroup.com/media/17193/access-screening-product-overview_corporate.pdf)
- [QA AI Engineer Level 6 Apprenticeship](https://www.qa.com/apprenticeships/ai/ai-engineer-level-6/)
- [Skills England Machine Learning Engineer standard](https://skillsengland.education.gov.uk/apprenticeship-standards/st1398-v1-0)
- [GOV.UK qualification levels](https://www.gov.uk/what-different-qualification-levels-mean/list-of-qualification-levels)

External pages corroborate public terminology; they do not override Harley's
personal employment facts or prove private responsibilities.

## Validation contract

The JIT plan must include:

- unit tests for experience derivation and fact invariants;
- tests preventing formal-title and actual-scope conflation;
- About browser coverage for career progression, qualification wording,
  capability signal, honest CV/contact state, and privacy;
- semantic chronology and heading-order checks;
- visual review at 1440, 768, 390, and 320 CSS pixels;
- keyboard-only, reduced-motion, and 200% zoom review;
- updated About visual-regression evidence; and
- `py -3 tools/run.py ci --check` on the staged final tree.

Generated navigation is updated through `py -3 tools/run.py ci --apply`, never
by hand.

## Acceptance outcomes

Phase 1 is ready for close review when:

- the stale experience literal is gone;
- professional facts have one reusable authority;
- a reader can identify Harley's target level and strongest supporting scope
  within seconds;
- Access progression and current responsibility are concrete but bounded;
- the formal title remains honest;
- apprenticeship wording survives the bachelor's-degree-level distinction;
- the stack-fit answer is scannable and evidence-led;
- the timeline is accessible without motion and open to later enhancement;
- CV and contact remain truthful Phase 2 boundaries;
- no proprietary or unsupported claim is published; and
- the canonical quality gate passes.

## Readiness

Self-review found no unresolved product decision, placeholder, conflicting
claim, or planner-owned choice. The spec fixes the source-of-truth boundary,
public claim strength, narrative order, component seams, deferred interaction
contract, and validation bundle while leaving implementation mechanics for the
just-in-time plan. **Spec-readiness: 9/10.**
