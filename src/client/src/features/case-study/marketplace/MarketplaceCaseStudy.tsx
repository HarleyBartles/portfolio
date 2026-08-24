import type { ReactElement } from 'react'
import { ExternalLink } from '../../../components/ExternalLink'
import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyDecision } from '../CaseStudyDecision'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'
import { MarketplaceDistributionMap } from './MarketplaceDistributionMap'
import './MarketplaceCaseStudy.scss'

const repositoryUrl = 'https://github.com/HarleyBartles/agent-asset-marketplace'
const repoStandardsUrl = `${repositoryUrl}/blob/52866dfb13b257c8d7d98fbb6155f96a7a8ca07e/codex-marketplace/plugins/repo-worker-pack/skills/repo-standards/SKILL.md`

export function MarketplaceCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
      <section className="case-study marketplace-case-study" aria-label="Marketplace case study">
        <p className="case-study-thesis">Shared where reuse earns it. Local where context matters.</p>

        <CaseStudySection title="When repeated instruction becomes infrastructure">
          <p className="eyebrow">Problem and pivot</p>
          <p>Useful agent guidance kept recurring across repositories: how to shape a worktree, verify a handoff, or inspect an external tool without pretending that every project works the same way.</p>
          <p>The first version aggregated useful third-party material. That made discovery easier, but copying everything into every repository produced noise while centralising every instruction erased the local exceptions that made it trustworthy.</p>
          <p>The pivot was a first-party operating model: maintain a small shared baseline, select specialist plugins deliberately, and leave project knowledge local. Derived work such as <code>superpowers-plus</code> keeps its lineage visible rather than presenting upstream ideas as original authorship.</p>
          <p><ExternalLink href={repositoryUrl}>Inspect the public source</ExternalLink></p>
        </CaseStudySection>

        <MarketplaceDistributionMap />

        <section className="marketplace-case-study__model" aria-label="Three-layer operating model" data-visual-contract="marketplace-operating-model">
          <div><p className="eyebrow">01 · shared</p><h2>Baseline</h2><p><code>repo-worker-pack</code>, <code>superpowers-plus</code>, and <code>mcp-usage-pack</code> cover recurring worker, execution, and connector concerns.</p></div>
          <div><p className="eyebrow">02 · chosen</p><h2>Selected</h2><p>Repositories add specialist plugins only when their domain warrants them. A selection is evidence of context, not a universal default.</p></div>
          <div><p className="eyebrow">03 · retained</p><h2>Local</h2><p>Repository-specific doctrine, commands, skills, and plugins stay beside the work whose exceptions they explain.</p></div>
        </section>

        <CaseStudySection title="One skill, a local overlay, and a checkable workflow">
          <ol className="case-study-trace">
            <li>Repeated repository-shape and runbook instructions reveal a shared need.</li>
            <li>The maintained <ExternalLink href={repoStandardsUrl}>repo-standards skill</ExternalLink> captures the portable baseline.</li>
            <li><code>repo-worker-pack</code> distributes that authored source.</li>
            <li>A consumer installs a generated copy under <code>.agents/skills/</code>.</li>
            <li>Local doctrine, runbooks, commands, and exceptions remain with the repository.</li>
            <li>Deterministic <code>check</code> and <code>apply</code> validation detects drift without pretending the local overlay is centrally owned.</li>
          </ol>
          <p><ExternalLink href={repoStandardsUrl}>Read the repo-standards skill</ExternalLink></p>
        </CaseStudySection>

        <section className="marketplace-case-study__decisions" aria-labelledby="marketplace-decisions-title">
          <h2 id="marketplace-decisions-title">Decisions that keep the boundary useful</h2>
          <div className="marketplace-decisions-grid">
            <CaseStudyDecision decision="Curation over accumulation" reason="A catalogue is useful only when every entry earns its maintenance cost." consequence="The shared surface stays smaller and easier to inspect." />
            <CaseStudyDecision decision="First-party direction" reason="The system needs a coherent operating model while preserving transparent derivative provenance." consequence="Ownership is clearer without hiding the lineage of work such as superpowers-plus." />
            <CaseStudyDecision decision="Source separate from installed copies" reason="Authored plugin source and generated consumer installations answer different questions." consequence="A convenient local copy cannot become a false publication claim." />
            <CaseStudyDecision decision="Explicit pins" reason="Repository state should be inspectable instead of implying automatic global synchronisation." consequence="Different revisions remain visible and reviewable." />
            <CaseStudyDecision decision="Local custody" reason="Domain knowledge loses meaning when detached from its repository." consequence="Projects reuse the baseline without surrendering their exceptions." />
          </div>
        </section>

        <section className="marketplace-case-study__evidence" aria-labelledby="marketplace-evidence-title">
          <p className="eyebrow">A dated, inspectable snapshot</p>
          <h2 id="marketplace-evidence-title">Used, pinned, and still evolving</h2>
          <CaseStudyEvidence auditDate="21 August 2026" href={repositoryUrl} label="Marketplace repository" />
          <p>The public audit records selected consumers and their pins without fetching those repositories at runtime. Different revisions are deliberate, inspectable state, not evidence of live telemetry or automatic synchronisation.</p>
          <p>The Marketplace is active and permanently iterative. Its present shape is evidence of a maintained system, not a claim that distribution is finished or universally adopted.</p>
        </section>
      </section>
    </CaseStudyBody>
  )
}
