import type { ReactElement } from 'react'
import './ProvisioningFigure.scss'

const storedCapabilities = [
  'Repository law',
  'Tool routes',
  'Workflow',
  'Evidence',
] as const

const activeKnowledge = [
  'Repository boundary',
  'Handoff contract',
] as const

export function ProvisioningFigure(): ReactElement {
  return (
    <figure className="capability-path" aria-describedby="capability-path-caption">
      <section className="capability-path__store" aria-labelledby="capability-path-store">
        <p className="capability-path__marker">Available</p>
        <h2 id="capability-path-store">Capability store</h2>
        <ul>
          {storedCapabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </section>

      <section className="capability-path__active" aria-labelledby="capability-path-active">
        <p className="capability-path__marker">Activated</p>
        <h2 id="capability-path-active">This task’s read path</h2>
        <ul>
          {activeKnowledge.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="capability-path__worker" aria-labelledby="capability-path-worker">
        <p className="capability-path__marker">Working</p>
        <h2 id="capability-path-worker">Current agent</h2>
        <p>Enough context for the next useful move.</p>
      </section>

      <figcaption id="capability-path-caption">A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.</figcaption>
    </figure>
  )
}
