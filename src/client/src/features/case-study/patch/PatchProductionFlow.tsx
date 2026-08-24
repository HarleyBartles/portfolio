import { getPatchPipeline } from './patchEvidence'

export function PatchProductionFlow() {
  return (
    <section aria-labelledby="patch-production-flow-title">
      <h2 id="patch-production-flow-title">Patch production flow</h2>
      <ol aria-label="Patch production flow">
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
