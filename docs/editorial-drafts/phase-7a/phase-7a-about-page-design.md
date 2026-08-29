# Phase 7A About page design

**Status:** Cloud-room freeze candidate, 29 August 2026. Exact public copy and art
direction are owned here. Harley has approved the section strategy and the governing
claims; this revision incorporates his corrections to the Access migration context,
Brand Addition progression, Wild Bunch summary, contact copy, pull-quote grammar and
imagery responsibility.

**Source authority:** factual precision and employer-safe boundaries come from
[`phase-7a-cloud-discovery-record.md`](./phase-7a-cloud-discovery-record.md) and
`professionalProfile.ts`. This document owns the public expression and presentation.

## Page job

About is the fast professional read after the work has earned curiosity. It should answer:

- who Harley is professionally now;
- what he actually carries at work;
- what changed because of his judgement;
- where the architecture judgement came from;
- what public work can be inspected;
- what he is studying and looking for next; and
- how to contact him.

It should not read like a competency rubric, a LinkedIn replica or an argument about why
Harley deserves to call himself senior. The work demonstrates the level. The formal title
remains exact.

## Metadata

**Title:** `About | Harley Bartles`

**Description:** `Full-stack software engineer with 7+ years of professional experience,
currently the sole engineer responsible for Access Checks at The Access Group. Career,
independent work, current study and hiring details.`

The implementation should continue deriving the experience number from the canonical
engineering start date rather than hard-coding `7+` forever.

## Final page order

1. Hero
2. Current work / The Access Group
3. Career
4. Independent work
5. Current study
6. In a previous life
7. Next role / CV conversion
8. Contact

Delete the current `At a glance`, capability-matrix and standalone `Working style`
sections. Their useful facts move into stronger contexts or the CV. Delete the large
self-explanatory CV promo copy; the CV remains available in context here and becomes a
first-class masthead route site-wide.

---

## 1. Hero

**Eyebrow:** `ABOUT`

**H1:**

> I still like writing code. I just know the job is bigger than that now.

**Copy:**

> I'm a full-stack software engineer with 7+ years of professional experience. At The
> Access Group I'm currently the sole engineer responsible for Access Checks, taking work
> from product epics through technical design, implementation, release, support and
> operation.
>
> My formal title is Software Engineer. I'm looking for a senior role where that level of
> ownership is expected, and where there's still something difficult left to learn.

### Hero art direction

Preserve the existing asymmetrical editorial opening rather than introducing a generic
professional hero.

At wide viewports:

- let the H1 occupy roughly seven of the twelve grid columns;
- let the two-paragraph professional lede occupy roughly five columns and sit lower in the
  composition so the eye moves headline -> evidence rather than headline -> slogan;
- keep the generous warm-paper negative space and fine structural rule below; and
- remove the existing `professional truth` and `evidence in view` framing completely.

At narrow widths, stack headline then lede in semantic order. Do not reduce the H1 so far
that it loses the current site's confident display character.

**Imagery recommendation:** no hero image. A generated engineer portrait, abstract AI
illustration or staged desk image would weaken this opening. Typography and the actual
professional evidence should carry it.

---

## 2. Current work / The Access Group

**Eyebrow:** `CURRENT WORK / THE ACCESS GROUP`

**H2:**

> Access Checks, end to end.

**Opening copy:**

> Product usually gives me the desired outcome as an epic. I turn that into a delivery
> plan, make the technical decisions, build it, handle the DevOps, release it, support it
> and keep it running.
>
> Access Checks is a .NET 8 API on Azure Functions, with a React and .NET portal for API
> consumers, usage and webhook subscriptions. It also consumes a separate browser-
> automation service I designed and delivered for checks where the authoritative service
> is a website rather than a suitable API.
>
> DBS Update and Right to Work Sharecode are two live examples. Their government services
> expose web journeys rather than suitable APIs. The LLM handles the narrow part that
> benefits from interpretation: locating page elements and proposing browser actions.
> Deterministic code executes those actions and extracts the result.

### Pull quote

Use the site pull-quote grammar defined in
[`phase-7a-site-visual-language-recommendations.md`](./phase-7a-site-visual-language-recommendations.md).
This is the short-statement variant, not a special evidence card.

> **No source capture, no success.**
>
> `PRODUCTION INVARIANT`

**Following copy:**

> The structured answer isn't enough. A successful check also has to capture a rendering
> of the authoritative government result page so the customer can inspect the source.
> After hardening and load-testing the recovery paths, I removed partial-success delivery.
> If we don't have the capture, the check fails and downstream systems receive a no-charge
> signal.
>
> That work enabled Access Screening to offer two additional paid checks inside its normal
> screening journey.

### Migration subsection

**H3:**

> Sometimes the important bit is the order.

**Copy:**

> Access Checks started by exposing capabilities that already lived in Access Screening.
> Screening was the original supplier behind some v1 endpoints while Access Checks built
> direct supplier integrations behind v2. As products moved onto v2, Screening itself was
> also becoming an Access Checks consumer.
>
> For three related checks, switching Screening to v2 before the remaining v1 consumers
> had moved would have created a technically valid but pointless loop:

**Technical annotation:**

`remaining v1 consumer -> Access Checks v1 -> Access Screening -> Access Checks v2 -> direct supplier`

**Utility label:** `THE ROUND TRIP WE DIDN'T SHIP`

**Copy continues:**

> Every hop worked. The route just added latency, failure surface and support opacity for
> no customer value.
>
> I made migration of the remaining v1 consumers a prerequisite. They moved first,
> Screening switched afterwards, and the loop never became the production design. The
> old v1 endpoint is now unused. Retiring it is still on my backlog.
>
> Those are two easy-to-explain examples from a lot of less photogenic work: integrations,
> migrations, production support, awkward edge cases, releases and keeping the product
> operable.

### Current-work art direction

This is the page's strongest professional evidence and should receive the widest editorial
breathing room after the hero.

- Use the established rail + narrative relationship: narrow date/context rail, generous
  reading column.
- Do not turn the two examples into cards or numbered `impact` tiles.
- Let `No source capture, no success` interrupt the reading rhythm using the shared pull-
  quote grammar. It may bleed one grid column into the editorial margin at desktop size,
  but should be tighter than the long article quotes inspected in Opera.
- Render the avoided migration route as semantic HTML/text, not an image. Fira Code carries
  the route; copper may mark the label or directional punctuation. It should read as a
  quick architecture annotation, not a terminal screenshot.
- Keep the migration subsection visually subordinate to the browser-automation outcome so
  the section has one clear lead story and one supporting example.

**Imagery recommendation:** do not generate fake Access UI, government UI, candidates,
checks or corporate systems. The small semantic migration route is the useful visual here.
If a later polish pass wants additional visual weight, it should prefer an abstract
first-party system diagram with only the already-approved public product names and
boundaries, not illustrative AI art.

---

## 3. Career

**Eyebrow:** `CAREER`

**H2:**

> How I got here.

The career treatment remains chronological and editorial, not a duplicate CV. Use the
existing timeline idea if it still serves the following copy, but allow its structure to
change so Brand Addition's internal progression is legible rather than collapsing nearly
fourteen years into a `Web Manager` label.

### Brand Addition

**Display heading:** `Brand Addition`

**Utility line:** `Commercial roles -> team management -> Web Manager | July 2005 - January 2019`

**Copy:**

> I spent almost fourteen years at Brand Addition, but Web Manager was only the last
> couple. I progressed through commercial roles and team management before I got there.
>
> While managing a team, I spotted a web change we needed and worked with the Ecommerce
> Director to specify and deliver it. That led directly to an offer to move into Web
> Manager.
>
> In that role I defined requirements, coordinated external developers, held platform and
> delivery responsibility, and helped migrate and maintain more than 100 multilingual,
> multicurrency stores. It was a hybrid business-systems and proto-development role, not a
> software-engineer job. It became the bridge into doing software engineering full time.

This is the required public compression of the earned Web Manager backstory already
recorded in the Phase 1 source spec. Do not describe July 2005 - January 2019 as thirteen
or fourteen years *as Web Manager*.

### Barbican Insurance Group -> Arch Capital Group

**Utility line:** `February 2019 - September 2021`

**Copy:**

> I joined Barbican as a Full Stack Software Engineer in my first professional engineering
> role. Arch acquired the company and I moved with the product. In Arch's three-level
> framework I progressed from Software Engineer Level 1 to Level 2 before I left.
>
> That was the deep end. LENS was a genuinely complex insurance system with dense business
> rules, full replay and auditability. DDD, CQRS and event sourcing weren't patterns I
> collected. They were part of the work because the domain made them useful. That's where
> I first saw expensive architecture pay rent.
>
> The rule that stayed with me is simple: complexity has to earn its place.

**Contextual link:** `Read the LENS handover story in Why ADRs?` -> `/writing/why-adrs`

The link is supporting provenance, not a required detour. Do not expand this section into
a pattern tutorial; the article carries the deeper organisational-memory story.

### The Access Group

**Utility line:** `Software Engineer | September 2021 - present`

**Copy:**

> I joined Recruitment CRM in 2021, then volunteered to move to Screening in January
> 2023. I learned Python, Django, MySQL and GitHub during that month and was contributing
> fully from February.
>
> I moved into Access Checks from its early greenfield stage and became its sole engineer
> around May 2026.

Do not repeat the Access outcome account here. The current-work section immediately above
already proves what the progression led to.

### Career art direction

- Keep date/title metadata in the utility voice and the career story in the reading voice.
- Preserve a continuous timeline rather than three bordered job cards.
- Brand Addition should visibly communicate progression before `Web Manager`; the final
  role must not retroactively rename the whole period.
- Barbican -> Arch should read as one continuous engineering period with acquisition
  context, not two separate employers that reset the story.
- Access should remain deliberately shorter here because the current-work section has
  already carried the evidence.

**Imagery recommendation:** no generated career imagery. Do not fabricate old offices,
insurance software or commercial-web scenes. The career chronology is stronger as an
editorial timeline. If genuine, publishable archival material later becomes available,
the polish pass may judge it separately.

---

## 4. Independent work

**Eyebrow:** `INDEPENDENT WORK`

**H2:**

> Work I can show you.

**Intro:**

> Employer systems have sensible confidentiality boundaries. My own projects are where I
> can show my working.

Use three selected editorial rows rather than a generic card grid. This is a hiring
selection, not an exhaustive project catalogue.

### Agent Asset Marketplace

> A public distribution system for reusable agent capabilities. It turns engineering
> guidance that keeps recurring across repositories into inspectable, versioned assets,
> while keeping repository-specific knowledge where it belongs.

**Action:** `Read the case study` -> `/projects/codex-marketplace`

### Wild Bunch

> A new Western game inspired by a childhood favourite, built around seeded worlds, exact
> replay and towns that remain themselves when the player rides on. The case study follows
> the game and the engineering together: what I wanted, what the architecture had to make
> possible, and what changed when my assumptions were wrong.

**Action:** `Read the case study` -> `/projects/wild-bunch`

This summary is deliberately broader than the replayability audit discovered in this
room. Do not reduce Wild Bunch to `the project where an event-sourcing audit found a bug`.
The falsifiability receipt belongs behind the specific `falsifiable` claim on the case
study, not in this overview.

### Agentic Learning Lab

> A facilitator-led curriculum for teaching a non-coder to direct agents without hiding
> the engineering underneath. The labs use source control, deliberate breakage, inspection
> and recovery to turn judgement into something teachable.

**Action:** `Read the case study` -> `/projects/agentic-learning-lab`

### Independent-work art direction

- Use ruled editorial rows with title/action in one area and the short argument in another.
- Avoid equal-height project cards and technology badges.
- Make the whole row comfortably scannable, but keep the title/action as the actual link
  target rather than making large ambiguous clickable containers.
- On mobile, stack title, copy, action in that order.

**Imagery recommendation:** this is the strongest optional image opportunity on About.
The later polish pass may use existing custody-approved project-native imagery as restrained
accents or crops if it improves rhythm and can make the three rows feel related without
making them identical. Do not generate generic replacement art. Wild Bunch should use
real game evidence; Marketplace should use its own system/artefact language; Learning Lab
should use its existing owned visual vocabulary.

---

## 5. Current study

**Eyebrow:** `CURRENT STUDY`

**H2:**

> AI Engineer Level 6 apprenticeship.

**Copy:**

> I started QA's Level 6 AI Engineer apprenticeship in February 2026. It runs through
> January 2028 and is a bachelor's degree-level programme against the Machine Learning
> Engineer standard. The syllabus covers machine learning, generative AI, model
> development, deployment, monitoring, ethics and security underneath the agent layer.

Keep the existing authoritative QA and Skills England links available without making the
section read like qualification footnotes.

### Study art direction

Treat this as a compact two-column band or editorial interlude, not another full chapter
with the same weight as Access or career. The qualification is useful supporting depth;
it is not the page's main proof.

**Imagery recommendation:** no generated `AI` image, neural-network decoration or stock
education motif. Typography and authoritative links are sufficient.

---

## 6. In a previous life

**Eyebrow:** `IN A PREVIOUS LIFE`

**H2:**

> There was an acting career too.

**Copy:**

> I acted on and off for about four years, including a role in series three of
> *Shameless*. It has almost nothing to do with the engineering argument and still feels
> worth mentioning.

**Action:** existing verified IMDb link.

### Aside art direction

Keep this visibly separate from the career timeline and smaller than the professional
sections. It is a human aside, not another credential.

**Imagery recommendation:** if Harley has a genuine image from that period that he owns or
has the right to publish, the later polish pass may consider it here. A real archival
image would add personality. Do not generate a fake television still, fake younger
portrait or imitation *Shameless* frame. Text + IMDb is preferable to synthetic history.

---

## 7. Next role / CV conversion

**Eyebrow:** `NEXT ROLE`

**H2:**

> I'm looking for a senior full-stack role.

**Copy:**

> Remote-first works best. I'm open to occasional UK-wide office travel, or Manchester
> hybrid up to one day a week. My notice period is four weeks.
>
> I want a job where owning the shape of a problem, the technical decisions and what
> happens after release is normal, and where I still have people around me who know things
> I don't.

**Actions:**

- primary: `Read the CV` -> `/cv`
- secondary: `Download PDF` -> generated CV PDF

### Conversion art direction

This is a strong closing professional band, not a sales CTA. Keep the warm-paper field
journal language, give the H2 and first action enough weight, and use the site's existing
button/text-link hierarchy. Do not create a dark marketing banner, recruiter badge or
`available for hire` pill.

`CV` is also a first-class masthead item, so this section supplies contextual conversion
rather than discoverability rescue.

---

## 8. Contact

**Eyebrow:** `CONTACT`

**H2:**

> Get in touch.

**Copy:**

> If you're hiring, want to ask about something on the site, or just have an interesting
> engineering problem, send me a note.

Then render the existing contact form and its honest connected/disconnected behaviour.
Do not add public copy congratulating the site for hiding a raw email address. The form
implementation and privacy seam can tell that story without using reader attention.

### Contact art direction

Retain the form as the final interaction on the page. It should feel like part of the
editorial composition rather than a bolted-on SaaS form card. Preserve clear labels,
validation, keyboard flow and existing honest fallback behaviour.

---

## Global About styling decisions

- Keep warm paper, ink, copper and the current three-font system.
- Use large Fraunces headings and Source Serif reading copy; use Fira Code for eyebrows,
  dates, route annotation and small context.
- Use fine ink rules to separate major sections. Use copper rules only where emphasis has
  a semantic job, especially the pull quote.
- Avoid a repeated `section heading + explanatory aside + card grid` rhythm. Sections may
  share vocabulary without sharing composition.
- Let Access be the widest evidence-bearing section. Let career be chronological. Let
  independent work be ruled rows. Let study and acting be quieter interludes. Let Next
  Role close the hiring argument.
- Maintain comfortable prose measure even when the surrounding composition uses the wide
  grid.
- At 200% zoom and narrow widths, all breakouts collapse into straightforward semantic
  order; no visual relationship may be required to understand the copy.

## Removed public language

Do not preserve or paraphrase the following merely because it exists today:

- `About / professional truth`
- `Senior full-stack engineering, with the evidence in view.`
- `I turn underspecified, consequential problems into software...`
- `I work at the frontier of agentic engineering...`
- `Responsibility that did not wait for a title change.`
- `Capability signal`
- `Useful on day one; honest about the edges.`
- the standalone `Working style` manifesto
- `No public email address; no harvested inbox.`

The facts behind some of those sentences remain valid. The page no longer needs to narrate
its own rubric or credibility strategy.

## Hostile-reader acceptance

### Weary hiring manager

After the hero, the reader should know: full-stack engineer, 7+ years, current sole-
engineer product responsibility, exact formal title, seeking senior scope.

After Current Work, the reader should be able to say something concrete when forwarding
the candidate: Harley designed and delivered a bounded browser-automation service that
enabled two paid checks, made authoritative evidence a condition of success, and can see
cross-product migration consequences before they become production topology.

The manager should not have had to read a skills matrix or accept `agentic frontier` as a
claim.

### Cynical architect

The Access section should survive: `why an LLM?`, `what does the model actually control?`,
`what happens when evidence is missing?`, and `what was the migration dependency?` without
hand-waving.

The Barbican/Arch section should answer where the architecture vocabulary came from and
why Harley does not apply it indiscriminately.

Independent work should make deeper inspection cheap without pretending three one-line
summaries are the proof themselves.

## Implementation boundary

Local Sol may change component names, CSS structure, data-model seams and responsive
implementation details. It may not materially rewrite this copy, change the page order,
reintroduce removed rubric language, omit the Access topology context, flatten Brand
Addition into a fourteen-year Web Manager role, replace the shared pull-quote grammar,
or invent imagery without returning to the design decision.

The site-wide visual-language recommendations remain a downstream polish input as well as
a Phase 7A guide. Phase 7A implements the About-specific decisions above; the later polish
pass harmonises the same grammar across the rest of the site.