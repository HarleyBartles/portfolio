import type { ReactElement } from 'react'

export function MarketplaceCaseStudy(): ReactElement {
  return (
    <section className="case-study marketplace-case-study" aria-label="Marketplace case study">
      <p className="case-study-thesis">Shared where reuse earns it. Local where context matters.</p>
      <section>
        <p className="eyebrow">Problem and pivot</p>
        <h2>When repeated instruction becomes infrastructure</h2>
        <p>Agent Asset Marketplace packages reusable agent skills as inspectable Codex plugins. It began as an aggregation of useful material; curation became more valuable than accumulation when the work needed to reflect an operating model rather than a catalogue.</p>
      </section>
      <section className="marketplace-case-study__model" aria-label="Three-layer operating model">
        <div><h2>Baseline</h2><p><code>repo-worker-pack</code>, <code>superpowers-plus</code>, and <code>mcp-usage-pack</code> establish the recurring worker baseline.</p></div>
        <div><h2>Selected</h2><p>Repositories opt into specialist plugins when their domain warrants them; selection is evidence of context, not a universal default.</p></div>
        <div><h2>Local</h2><p>Repository-specific doctrine, runbooks, skills, and plugins remain close to the work they explain.</p></div>
      </section>
      <figure className="marketplace-map" aria-labelledby="marketplace-map-caption">
        <figcaption id="marketplace-map-caption"><strong>Distribution map</strong> — a dated audit, not live telemetry. Consumers may pin different revisions.</figcaption>
        <ol>
          <li><strong>Marketplace source</strong><span>17 plugins · 74 entries · 70 unique skill names</span></li>
          <li><strong>Baseline</strong><span>repo-worker-pack · superpowers-plus · mcp-usage-pack</span></li>
          <li><strong>Selected</strong><span>frontend-pack · architecture-pack · dotnet-pack</span></li>
          <li><strong>Consumers</strong><span>Portfolio · Adventures of Patch · Rooms Mostly · Wild Bunch</span><small>Wild Bunch: game-studio and wild-bunch local skills; no mcp-usage-pack selection in this audit.</small></li>
        </ol>
      </figure>
      <section>
        <p className="eyebrow">A dated, inspectable snapshot</p>
        <h2>Used, pinned, and still evolving</h2>
        <p><strong>Repository audit · 21 August 2026</strong></p>
        <p>The public snapshot records selected consumers and their pins. Different repositories may deliberately carry different Marketplace revisions; provenance makes that state inspectable rather than pretending at automatic synchronisation.</p>
        <p><a href="https://github.com/HarleyBartles/agent-asset-marketplace">Marketplace repository</a></p>
      </section>
      <section>
        <h2>Decisions that keep the boundary useful</h2>
        <dl>
          <div><dt>Curation over accumulation</dt><dd>Keep assets that earn their place; the consequence is a smaller, more legible catalogue.</dd></div>
          <div><dt>First-party direction</dt><dd>Maintain derived work with provenance; the consequence is clearer ownership and honest lineage.</dd></div>
          <div><dt>Explicit pins</dt><dd>Record revisions rather than implying uniform updates; the consequence is visible, reviewable drift.</dd></div>
          <div><dt>Local custody</dt><dd>Leave domain knowledge with its repository; the consequence is reuse without false centralisation.</dd></div>
        </dl>
      </section>
    </section>
  )
}
