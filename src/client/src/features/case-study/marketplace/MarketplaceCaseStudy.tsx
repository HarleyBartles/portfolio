import type { ReactElement } from 'react'
import { ExternalLink } from '../../../components'
import styled from 'styled-components'
import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyCallout } from '../CaseStudyCallout'
import { CaseStudyDecision } from '../CaseStudyDecision'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'
import { MarketplaceDistributionMap } from './MarketplaceDistributionMap'

const repositoryUrl = 'https://github.com/HarleyBartles/agent-asset-marketplace'
const repoStandardsUrl = `${repositoryUrl}/blob/52866dfb13b257c8d7d98fbb6155f96a7a8ca07e/codex-marketplace/plugins/repo-worker-pack/skills/repo-standards/SKILL.md`

const Marketplace = styled.section`
  display: grid;
  gap: clamp(var(--space-12), 9vw, var(--space-20));
  max-width: 70rem;
  margin-inline: auto;

  > section:not(.marketplace-case-study__model, .marketplace-case-study__decisions, [data-case-study-section-layout]) {
    max-width: var(--measure-reading);
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: .98;
  }

  .marketplace-case-study__model {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-block: 1px solid var(--color-ink);
  }

  .marketplace-case-study__model > div {
    padding: var(--space-7);
  }

  .marketplace-case-study__model > div + div {
    border-left: 1px solid var(--color-ink);
  }

  .marketplace-case-study__model h2,
  .marketplace-case-study__model p {
    margin-top: 0;
  }

  .case-study-trace {
    padding-left: 1.4rem;
  }

  .case-study-trace li {
    padding: var(--space-3) 0 var(--space-3) var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  .marketplace-decisions-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 var(--space-8);
  }

  .marketplace-decisions-grid > [data-case-study-decision] {
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-6);
  }

  .marketplace-map {
    margin: 0;
    border-block: 1px solid var(--color-border);
    padding-block: clamp(var(--space-6), 5vw, var(--space-10));
    color: var(--color-ink);
  }

  .marketplace-map figcaption {
    display: grid;
    gap: var(--space-3);
    max-width: 52rem;
    margin-bottom: var(--space-8);
  }

  .marketplace-map figcaption strong {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: .9;
  }

  .marketplace-map__flow {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--space-3);
    padding: 0;
    list-style: none;
  }

  .marketplace-map__flow > li {
    min-width: 0;
    border-top: 1px solid var(--color-border);
    padding: var(--space-6) 0;
    color: var(--color-ink);
  }

  .marketplace-map__source {
    grid-column: span 4;
    display: grid;
    align-content: center;
    gap: var(--space-4);
  }

  .marketplace-map__source strong {
    font-family: var(--font-site-sans);
    font-size: 2rem;
    line-height: 1;
  }

  .marketplace-map__plugins { grid-column: span 8; }
  .marketplace-map__plugins--selected { grid-column: 3 / span 8; }

  .marketplace-map__plugins ul,
  .marketplace-map__consumers ul {
    display: grid;
    gap: var(--space-4);
    margin: var(--space-5) 0 0;
    padding: 0;
    list-style: none;
  }

  .marketplace-map__plugins ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .marketplace-map__plugins li {
    display: flex;
    gap: var(--space-3);
    align-items: center;
    min-width: 0;
    font-family: var(--font-code);
    font-size: .8rem;
  }

  .marketplace-map__plugins li span { min-width: 0; overflow-wrap: anywhere; }
  .marketplace-map__plugins img { width: 1.5rem; height: 1.5rem; flex: none; }
  .marketplace-map__consumers { grid-column: 1 / -1; }
  .marketplace-map__consumers ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .marketplace-map__consumers li {
    display: grid;
    gap: var(--space-2);
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-4);
  }

  .marketplace-map__consumers code {
    width: fit-content;
    background: var(--color-accent-soft);
    padding: .1rem .3rem;
    color: var(--color-ink);
    font-size: .72rem;
  }

  .marketplace-map__consumers span { color: var(--color-muted); font-size: .92rem; }

  @media (max-width: 44rem) {
    .marketplace-case-study__model,
    .marketplace-decisions-grid,
    .marketplace-map__flow,
    .marketplace-map__plugins ul,
    .marketplace-map__consumers ul { grid-template-columns: 1fr; }

    .marketplace-case-study__model > div + div {
      border-top: 1px solid var(--color-ink);
      border-left: 0;
    }

    .marketplace-map__source,
    .marketplace-map__plugins,
    .marketplace-map__plugins--selected,
    .marketplace-map__consumers { grid-column: 1; }
  }
`

export function MarketplaceCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
      <Marketplace aria-label="Marketplace case study" className="marketplace-case-study">
        <CaseStudySection title="When repeated instruction becomes infrastructure" layout="lead">
          <p className="eyebrow">Problem and pivot</p>
          <p>Useful agent guidance kept recurring across repositories: how to shape a worktree, verify a handoff, or inspect an external tool without pretending that every project works the same way.</p>
          <p>The first version aggregated useful third-party material. That made discovery easier, but copying everything into every repository produced noise while centralising every instruction erased the local exceptions that made it trustworthy.</p>
          <p>The pivot was a first-party operating model: maintain a small shared baseline, select specialist plugins deliberately, and leave project knowledge local. Derived work such as <code>superpowers-plus</code> keeps its lineage visible rather than presenting upstream ideas as original authorship.</p>
          <p><ExternalLink href={repositoryUrl}>Inspect the public source</ExternalLink></p>
        </CaseStudySection>

        <CaseStudyCallout>Shared where reuse earns it. Local where context matters.</CaseStudyCallout>

        <MarketplaceDistributionMap />

        <section className="marketplace-case-study__model" aria-label="Three-layer operating model" data-visual-contract="marketplace-operating-model">
          <div><p className="eyebrow">01 · shared</p><h2>Baseline</h2><p><code>repo-worker-pack</code>, <code>superpowers-plus</code>, and <code>mcp-usage-pack</code> cover recurring worker, execution, and connector concerns.</p></div>
          <div><p className="eyebrow">02 · chosen</p><h2>Selected</h2><p>Repositories add specialist plugins only when their domain warrants them. A selection is evidence of context, not a universal default.</p></div>
          <div><p className="eyebrow">03 · retained</p><h2>Local</h2><p>Repository-specific doctrine, commands, skills, and plugins stay beside the work whose exceptions they explain.</p></div>
        </section>

        <CaseStudySection title="One skill, a local overlay, and a checkable workflow" layout="lead">
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

        <CaseStudySection title="Used, pinned, and still evolving" headingId="marketplace-evidence-title" layout="lead">
          <p className="eyebrow">A dated, inspectable snapshot</p>
          <div>
            <CaseStudyEvidence auditDate="21 August 2026" href={repositoryUrl} label="Marketplace repository" />
            <p>The public audit records selected consumers and their pins without fetching those repositories at runtime. Different revisions are deliberate, inspectable state, not evidence of live telemetry or automatic synchronisation.</p>
            <p>The Marketplace is active and permanently iterative. Its present shape is evidence of a maintained system, not a claim that distribution is finished or universally adopted.</p>
          </div>
        </CaseStudySection>
      </Marketplace>
    </CaseStudyBody>
  )
}
