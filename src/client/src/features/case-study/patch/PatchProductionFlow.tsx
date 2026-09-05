import { getPatchPipeline } from './patchEvidence'
import { PatchLeadSection } from './PatchLeadSection'
import styled from 'styled-components'

const Production = styled.section`
  min-width: 0;
  padding: clamp(var(--space-8), 6vw, var(--space-16));
  color: var(--color-surface);
  background: var(--patch-teal-deep);

  @media (max-width: 44rem) {
    padding: var(--space-8) var(--space-5);
  }
`

const ProductionLead = styled(PatchLeadSection)`
  margin-bottom: var(--space-10);
`

const Flow = styled.ol`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0;
  border-top: 1px solid rgb(255 250 240 / 32%); list-style: none; counter-reset: production-stage;
  > li { padding: var(--space-8) var(--space-6); border-bottom: 1px solid rgb(255 250 240 / 32%); counter-increment: production-stage; }
  > li:not(:nth-child(3n + 1)) { border-left: 1px solid rgb(255 250 240 / 32%); }
  h3 { color: var(--color-surface); text-wrap: balance; }
  h3::before { display: block; margin-bottom: var(--space-3); color: #75d4d0; font-family: var(--font-code); font-size: .75rem; content: "0" counter(production-stage); }
  p, dd { color: rgb(255 250 240 / 82%); }
  dl { margin: var(--space-5) 0 0; }
  dt { margin-top: var(--space-3); color: #75d4d0; font-family: var(--font-code); font-size: .69rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
  dd { margin: var(--space-1) 0 0; font-size: .9rem; line-height: 1.48; }
  @media (max-width: 58rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > li:not(:nth-child(3n + 1)) { border-left: 0; }
    > li:nth-child(even) { border-left: 1px solid rgb(255 250 240 / 32%); }
  }
  @media (max-width: 44rem) {
    grid-template-columns: 1fr;
    > li, > li:nth-child(even) { border-left: 0; }
  }
`

export function PatchProductionFlow() {
  return (
    <Production className="patch-production" aria-labelledby="patch-production-flow-title" data-project-field="production-evidence">
      <ProductionLead title="The production system is the project" titleId="patch-production-flow-title" tone="inverse">
        <p>Once a frame clears, each stage names what enters, the decision being made, what leaves and when the work stops. Generation and acceptance stay separate. I retain acceptance authority over every candidate a model produces.</p>
        <p>I keep prose, labels, captions and licence material out of generated pixels. Deterministic builders assemble them around accepted imagery, which makes corrections reviewable and outputs reproducible.</p>
      </ProductionLead>
      <Flow aria-label="Patch production flow">
        {getPatchPipeline().map((stage) => (
          <li key={stage.id}>
            <h3>{stage.name}</h3>
            {stage.id === 'image-generation-and-qa' && <p><strong>Generation</strong> produces candidates. <strong>Acceptance</strong> follows inspection and QA.</p>}
            <dl>
              <dt>Input</dt><dd>{stage.input}</dd>
              <dt>Decision</dt><dd>{stage.decision}</dd>
              <dt>Output</dt><dd>{stage.output}</dd>
              <dt>Stop condition</dt><dd>{stage.stopCondition}</dd>
            </dl>
          </li>
        ))}
      </Flow>
    </Production>
  )
}
