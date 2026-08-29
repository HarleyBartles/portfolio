# Phase 7A Cloud discovery record

**Status:** Source gate cleared on 29 August 2026. This is durable,
employer-safe discovery material, not public copy or a finished professional
claim.

## Source-gate decision

**Cleared.** Harley approved the retained outcome account and its disclosure
boundaries on 29 August 2026.

The account shows a professional chain of consequence rather than only product
scope: Harley's design and delivery enabled two additional paid screening
services, while a hard evidence invariant prevents an incomplete result from
being treated as a successful, chargeable check.

## Approved outcome account

### Dependants and stakes

- **Exact:** Access Screening consumes Access Checks, which in turn consumes a
  separate internal browser-automation API designed and delivered by Harley.
- **Exact:** The live service supports DBS Update and Right to Work Sharecode
  checks.
- **Qualitative:** Employers use the surrounding screening service to obtain
  governed candidate-status results. Right to Work results can affect whether
  an employer may lawfully employ a candidate, while responsibility for the
  employment decision remains with the employer.
- **Qualitative:** An incorrect or unsupported result could cause a customer to
  rely on a false status. A completed check therefore needs inspectable source
  evidence, not only a structured assertion.

### Before

- **Qualitative:** Neither check had previously been available as an integrated
  service within the screening suite.
- **Qualitative:** The relevant government services expose public web journeys
  rather than suitable APIs. Conventional selector-bound automation was too
  brittle to offer reliably over websites outside Access's control.
- **Exact boundary:** This was not an earlier paid check with a manual stop in
  the same product journey. Do not invent that chronology.

### Harley's change

- **Exact:** Harley received an underspecified delivery requirement, access to
  an LLM endpoint and credentials, then designed and delivered the service
  boundary and implementation.
- **Exact:** He separated the browser-automation API from Access Checks so the
  capability was not tightly coupled to one immediate consumer.
- **Exact:** He designed the response schema, prompt constraints, retry and
  selector-recovery behaviour, webhook contract, failure conditions and
  pollable recovery route.
- **Exact:** The LLM is constrained to locating page elements and proposing
  browser actions. It does not determine or transcribe the candidate's legal
  status. Deterministic code executes the actions and extracts the value from
  the selected page element.
- **Exact:** A successful check must include a captured rendering of the
  authoritative result page so the customer can cross-check the structured
  status against the source.
- **Exact:** After hardening and load-testing the capture recovery paths,
  Harley removed partial-success delivery and established the production
  invariant: no source capture, no successful result. Missing evidence emits a
  failure and no-charge signal downstream.

### Observable outcome and influence

- **Exact:** DBS Update and Right to Work Sharecode are both live and consumed
  through the integrated screening journey.
- **Exact:** Access Screening can sell two additional paid check services.
- **Qualitative:** Employers can order those checks alongside the rest of a
  screening package and receive the results in the existing workflow without
  performing the government-site verification manually.
- **Exact:** Downstream systems can distinguish a delivered check from a failed
  retrieval and avoid charging for an incomplete result.
- **Qualitative:** Customers retain both the structured outcome and the
  government result capture needed to inspect the service's assertion.

## Approved supporting outcome: cross-product migration sequencing

This account is approved as employer-safe supporting material and a second
CV-level outcome input. Keep the internal product and supplier map private; the
public value lies in the dependency decision and its consequence.

### Before and risk

- **Qualitative:** Access Checks began with compatibility endpoints that proxied
  mature Screening capabilities while direct supplier integrations were
  developed behind v2 check-specific endpoints.
- **Exact:** Different consuming products migrated from v1 to v2 on independent
  schedules.
- **Qualitative:** For three related checks, switching the former supplier
  product into a v2 consumer before the remaining v1 consumers had migrated
  would have produced a technically valid but operationally wasteful round
  trip back through Access Checks.
- **Qualitative:** The route would have added avoidable latency, failure surface
  and support opacity without adding customer value.

### Harley's change

- **Exact:** Harley owned the migration epic, identified the hidden cross-
  product dependency and made migration of all remaining v1 consumers an
  explicit prerequisite for the supplier inversion.
- **Exact boundary:** Harley did not personally coordinate every consuming
  team. His contribution was exposing the risk and making the prerequisite
  part of the delivery plan.
- **Qualitative:** The prerequisite changed the release order across product
  boundaries: consumers had to leave v1 before the former supplier could
  switch to Access Checks v2.
- **Qualitative:** This sits within broader migration ownership. Harley
  implemented roughly half of the original v1 check integrations, then carried
  every v1 integration he had written, plus approximately one or two
  additional checks, through its direct-supplier v2 migration.

### Outcome, influence and remaining cost

- **Exact:** The remaining consumers migrated first. The former supplier then
  switched to the direct v2 route, so the pathological compatibility round
  trip never became the production operating model.
- **Exact:** The legacy v1 endpoint is provably unused but still present.
  Retirement is assigned to Harley as tracked backlog work.
- **Qualitative:** The account demonstrates product-boundary judgement,
  migration sequencing and honest residual-cost ownership rather than only
  implementation volume.
- **Qualitative:** The wider team uses feature flags to separate deployment
  from release. Work complete within the team's control can remain trunk-
  aligned and deployed but disabled while Product chooses a launch time or an
  external dependency catches up. A disabled flag does not imply that
  unfinished engineering was presented as complete.

## Approved disclosure boundaries

| Material | Class | Public boundary |
| --- | --- | --- |
| Check names and live status | Exact | DBS Update and Right to Work Sharecode may be named. |
| Commercial consequence | Exact | The work enabled Access Screening to sell two additional integrated checks. |
| Customer workflow consequence | Qualitative | No manual government-site verification step is required in the normal integrated journey. |
| Legal and operational stakes | Qualitative | Describe governed Right to Work decisions without legal penalties, case detail or a customer-specific assertion. |
| Harley's ownership | Exact | He designed and delivered the service within an externally supplied AI direction and model-access constraint. |
| LLM boundary | Exact | Page interpretation and browser-action selection only; no claim that the LLM decides the final status. |
| Evidence invariant | Exact | No source capture means no successful result and a downstream no-charge signal. |
| Reliability proof | Qualitative | Load testing established the invariant; retain no private test volumes or rates. |
| Private operating detail | Withheld | Customer identities, candidate data, usage volumes, financial values, credentials, internal endpoints and unnecessary topology remain private. |

## Rejected claims and uncertainty

- Do not call the shipped service an agent, an autonomous system or an agentic
  API. It is browser automation with bounded LLM-assisted page interpretation
  inside deterministic control and recovery paths.
- Do not claim Harley originated the instruction to use AI or selected the
  supplied model-access arrangement.
- Do not claim that the Agents API itself is sold directly. The accurate
  commercial consequence is that it enabled Access Screening to sell two
  additional check services.
- Do not describe a previous integrated manual version of these checks; there
  was none.
- Do not promote the earlier supplier/webhook anecdote into the governing
  Phase 7A outcome account. It remains corroborating evidence of product-
  boundary ownership, not this consequence chain.
- Do not expose the supporting migration account's internal product names,
  supplier names or private route topology. The approved claim is the cross-
  product prerequisite and completed sequence.
- The future-design retrospective may be retained only within the approved
  boundary below; private estimates, unapproved proposals and employer
  criticism remain withheld.

## Approved retrospective boundary

- **Qualitative first-party account:** The browser-automation service reflects
  the internal AI capabilities available to the work when it was designed.
  This is Harley's honest professional recollection, not a claim about an exact
  corporate AI-maturity chronology.
- **Qualitative:** The original design was proportionate to those constraints
  and remains live and commercially useful.
- **Qualitative:** With today's more mature internal platform, Harley would
  approach the same requirement as a reusable agentic workflow with less
  bespoke API surface.
- **Withheld:** Private estimates, the history of an unapproved redesign
  proposal and any framing that turns the retrospective into criticism of the
  employer.

This is cutting-room or cost/status material. It should not displace the
cleaner commercial and evidence account on About.

## Approved implementation inputs so far

- **About:** Lead with two additional paid checks enabled, then the governed
  customer stakes, Harley's bounded design and the `no evidence, no success`
  invariant. LLM mechanics support the account; they are not the headline.
- **CV:** A compressed professional outcome earns space, but it must not imply
  that the browser-automation service is Harley's only consequential Access
  work. Use the approved commercial/evidence account and the cross-product
  migration account as distinct inputs; exact wording remains for
  implementation.
- **Status/cost:** The AI-capability retrospective and assigned legacy-endpoint
  retirement may inform a restrained cost or current-status treatment. Neither
  is required on About.

## Existing public baseline

- Harley's formal title remains `Software Engineer`.
- Harley is the sole engineer responsible for designing, delivering,
  operating and supporting Access Checks.
- Public description covers a .NET 8 Azure Functions API, React and .NET
  consumer portal, and bounded AI-assisted browser automation inside
  deterministic API workflows.

## Secondary discovery still required

The outcome source and initial About/CV inputs are stable. Before the room
closes, record only the remaining minimum implementation inputs requested by
the editorial brief: professional provenance, current case-study compression
needs, the precise Wild Bunch proof source and any portfolio-as-software
receipt that earns space.
