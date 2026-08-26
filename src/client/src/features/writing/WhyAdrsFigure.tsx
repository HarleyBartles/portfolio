import type { ReactElement } from 'react'
import './WhyAdrsFigure.scss'

const decisionContents = [
  'Context before vocabulary',
  'Chosen route and consequences',
  'Rejected routes keep their evidence',
] as const

export function WhyAdrsFigure(): ReactElement {
  return (
    <figure className="decision-memory-figure" aria-describedby="decision-memory-figure-caption">
      <section className="decision-memory-figure__moment" aria-labelledby="decision-memory-start">
        <p className="decision-memory-figure__marker">Then</p>
        <h2 id="decision-memory-start">At the decision</h2>
        <p>Several credible routes meet a real constraint.</p>
        <div className="decision-memory-figure__routes" aria-label="Decision inputs">
          <span>Context</span><span>Routes</span><span>Evidence</span>
        </div>
      </section>

      <section className="decision-memory-figure__record" aria-labelledby="decision-memory-record">
        <p className="decision-memory-figure__marker">Kept</p>
        <h2 id="decision-memory-record">Decision record</h2>
        <ul>
          {decisionContents.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="decision-memory-figure__moment decision-memory-figure__moment--later" aria-labelledby="decision-memory-later">
        <p className="decision-memory-figure__marker">Later</p>
        <h2 id="decision-memory-later">With the next engineer</h2>
        <p>The old choice can be challenged without paying twice for the same learning.</p>
        <strong>Reconsider when the facts change</strong>
      </section>

      <figcaption id="decision-memory-figure-caption">A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.</figcaption>
    </figure>
  )
}
