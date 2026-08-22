import type { ReactElement } from 'react'
import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyDecision } from '../CaseStudyDecision'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'

export function MarketplaceCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
    <section className="case-study marketplace-case-study" aria-label="Marketplace case study">
      <p className="case-study-thesis">Shared where reuse earns it. Local where context matters.</p>
      <CaseStudySection title="When repeated instruction becomes infrastructure">
        <p className="eyebrow">Problem and pivot</p>
        <p>Agent Asset Marketplace packages reusable agent skills as inspectable Codex plugins. It began as an aggregation of useful material; curation became more valuable than accumulation when the work needed to reflect an operating model rather than a catalogue.</p>
      </CaseStudySection>
      <section className="marketplace-case-study__model" aria-label="Three-layer operating model">
        <div><h2>Baseline</h2><p><code>repo-worker-pack</code>, <code>superpowers-plus</code>, and <code>mcp-usage-pack</code> establish the recurring worker baseline.</p></div>
        <div><h2>Selected</h2><p>Repositories opt into specialist plugins when their domain warrants them; selection is evidence of context, not a universal default.</p></div>
        <div><h2>Local</h2><p>Repository-specific doctrine, runbooks, skills, and plugins remain close to the work they explain.</p></div>
      </section>
      <figure className="marketplace-map" aria-labelledby="marketplace-map-caption">
        <figcaption id="marketplace-map-caption"><strong>Distribution map</strong> — a dated audit, not live telemetry. Consumers may pin different revisions.</figcaption>
        <ol>
          <li><strong>Marketplace source</strong><span>17 plugins · 74 entries · 70 unique skill names</span></li>
          <li><strong>Baseline</strong><span><img src="/portfolio/media/marketplace/repo-worker-pack.svg" alt="" />repo-worker-pack · <img src="/portfolio/media/marketplace/superpowers-plus.svg" alt="" />superpowers-plus · <img src="/portfolio/media/marketplace/mcp-usage-pack.svg" alt="" />mcp-usage-pack</span></li>
          <li><strong>Selected</strong><span><img src="/portfolio/media/marketplace/frontend-pack.svg" alt="" />frontend-pack · <img src="/portfolio/media/marketplace/architecture-pack.svg" alt="" />architecture-pack · <img src="/portfolio/media/marketplace/dotnet-pack.svg" alt="" />dotnet-pack</span></li>
          <li><strong>Consumers</strong><ul><li>Portfolio — seven local design skills</li><li>Adventures of Patch — four local skills</li><li>Rooms Mostly — five local skills</li><li>Wild Bunch — game-studio and four wild-bunch local skills; no mcp-usage-pack selection in this audit.</li></ul></li>
        </ol>
      </figure>
      <CaseStudySection title="One skill, a local overlay, and a checkable workflow">
        <ol>
          <li>Repeated repository shape and runbook instructions reveal a shared need.</li>
          <li><code>repo-standards</code> captures that maintained baseline.</li>
          <li><code>repo-worker-pack</code> distributes the skill.</li>
          <li>A consumer installs its copy under <code>.agents/skills/</code>.</li>
          <li>Local doctrine, runbooks, commands, and exceptions remain with the repository.</li>
          <li>Its workflow verifies the arrangement through deterministic <code>check</code> and <code>apply</code> commands.</li>
        </ol>
      </CaseStudySection>
      <section>
        <p className="eyebrow">A dated, inspectable snapshot</p>
        <h2>Used, pinned, and still evolving</h2>
        <CaseStudyEvidence auditDate="21 August 2026" href="https://github.com/HarleyBartles/agent-asset-marketplace" label="Marketplace repository" />
        <p>The public snapshot records selected consumers and their pins. Different repositories may deliberately carry different Marketplace revisions; provenance makes that state inspectable rather than pretending at automatic synchronisation.</p>
      </section>
      <section>
        <h2>Decisions that keep the boundary useful</h2>
        <div>
          <CaseStudyDecision decision="Curation over accumulation" reason="Keep assets that earn their place." consequence="A smaller, more legible catalogue." />
          <CaseStudyDecision decision="First-party direction" reason="Maintain derived work with provenance." consequence="Clearer ownership and honest lineage." />
          <CaseStudyDecision decision="Explicit pins" reason="Record revisions rather than imply uniform updates." consequence="Visible, reviewable drift." />
          <CaseStudyDecision decision="Source separate from installed copies" reason="Vended plugin source and consumer installations answer different questions." consequence="A convenient local copy cannot become a false publication claim." />
          <CaseStudyDecision decision="Local custody" reason="Leave domain knowledge with its repository." consequence="Reuse without false centralisation." />
        </div>
      </section>
    </section>
    </CaseStudyBody>
  )
}
