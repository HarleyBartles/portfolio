import { getPatchPipeline } from './patchEvidence'

export function PatchProductionFlow() {
  return (
    <section className="patch-movement patch-production" aria-labelledby="patch-production-flow-title" data-project-field="production-evidence">
      <div className="patch-movement__copy case-study-lead">
        <div className="case-study-lead__heading">
          <p className="patch-section-number" aria-hidden="true">04</p>
          <h2 id="patch-production-flow-title">The production system is the project</h2>
        </div>
        <div className="case-study-lead__body">
          <p>Once a frame clears, each stage names what enters, the decision being made, what leaves and when the work stops. Generation and acceptance stay separate. I retain acceptance authority over every candidate a model produces.</p>
          <p>I keep prose, labels, captions and licence material out of generated pixels. Deterministic builders assemble them around accepted imagery, which makes corrections reviewable and outputs reproducible.</p>
        </div>
      </div>
      <ol className="patch-production__flow" aria-label="Patch production flow">
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
      </ol>
    </section>
  )
}
