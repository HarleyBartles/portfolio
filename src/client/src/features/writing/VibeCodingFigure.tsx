import type { ReactElement } from 'react'
import './VibeCodingFigure.scss'

const responsibilities = [
  'edge cases',
  'state',
  'error paths',
  'migrations',
  'observability',
  'security',
  'access control',
] as const

export function VibeCodingFigure(): ReactElement {
  return (
    <figure className="vibe-coding-figure" aria-describedby="vibe-coding-figure-caption">
      <div className="vibe-coding-figure__door">
        <p className="vibe-coding-figure__chapter">01</p>
        <h2>The door opens</h2>
        <p>An idea becomes clickable.</p>
      </div>
      <div className="vibe-coding-figure__threshold">
        <span>Working demo</span>
      </div>
      <div className="vibe-coding-figure__road">
        <div className="vibe-coding-figure__road-heading">
          <p className="vibe-coding-figure__chapter">02</p>
          <h2>The long road</h2>
          <p>Engineering takes responsibility for what happens after.</p>
        </div>
        <ol aria-label="Engineering responsibilities">
          {responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
        </ol>
        <div className="vibe-coding-figure__releases" aria-label="Release progression">
          <span>First draft</span>
          <span>Hundredth release</span>
        </div>
      </div>
      <figcaption id="vibe-coding-figure-caption">Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.</figcaption>
    </figure>
  )
}
