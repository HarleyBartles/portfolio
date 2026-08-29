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
- A possible future redesign discussed during discovery is not part of the
  shipped outcome and has not been approved as public material.

## Existing public baseline

- Harley's formal title remains `Software Engineer`.
- Harley is the sole engineer responsible for designing, delivering,
  operating and supporting Access Checks.
- Public description covers a .NET 8 Azure Functions API, React and .NET
  consumer portal, and bounded AI-assisted browser automation inside
  deterministic API workflows.

## Secondary discovery still required

The outcome source is stable. Before the room closes, record only the minimum
implementation inputs requested by the editorial brief: About and CV claim
shape, professional provenance, current case-study compression needs, the
precise Wild Bunch proof source and any portfolio-as-software receipt that
earns space.
