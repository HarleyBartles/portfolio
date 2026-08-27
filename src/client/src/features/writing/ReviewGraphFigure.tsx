import type { ReactElement } from 'react'
import './ReviewGraphFigure.scss'

const graphSource = `${import.meta.env.BASE_URL}images/writing/review-graph-v1.svg`

export function ReviewGraphFigure(): ReactElement {
  return (
    <figure className="review-graph-figure" aria-describedby="review-graph-figure-caption">
      <div className="review-graph-figure__heading">
        <p>Version one / live graph</p>
        <h2>The loop inside the loop</h2>
      </div>
      <img
        src={graphSource}
        alt="Version-one iterative-review graph, where the initially straightforward workflow knots around repair, metrics, triage and final review before ready or blocked exits."
      />
      <figcaption id="review-graph-figure-caption">A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.</figcaption>
    </figure>
  )
}
