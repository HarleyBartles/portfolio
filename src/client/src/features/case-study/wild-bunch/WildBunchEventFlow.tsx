import type { ReactElement } from 'react'
import styled from 'styled-components'

const Figure = styled.figure`
  margin: 0;
  padding: clamp(var(--space-6), 4vw, var(--space-10));
  background: var(--wild-bunch-color-earth, #574c3f);
  color: var(--color-surface);

  figcaption { max-width: 52rem; margin-bottom: var(--space-8); }
  figcaption strong { display: block; margin-bottom: var(--space-2); color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.8rem); line-height: 1; }
  ol { display: grid; gap: var(--space-4); padding: 0; list-style: none; counter-reset: event-stage; }
  li { min-width: 0; border-top: 1px solid rgb(255 250 240 / 32%); padding-top: var(--space-4); }
  li::before { counter-increment: event-stage; content: counter(event-stage, decimal-leading-zero); color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .wild-bunch-event-flow-content { min-width: 0; }
  .wild-bunch-event-flow-content h3 { margin: 0; color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); letter-spacing: .012em; }
  && p { color: var(--color-surface); }
  .wild-bunch-event-flow-content p { max-width: 64ch; margin: var(--space-4) 0 0; }

  @media (min-width: 60rem) {
    ol { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--space-8); }
    li { display: grid; grid-template-columns: 2.25rem minmax(0, 1fr); gap: var(--space-3); align-items: start; }
    .wild-bunch-event-flow-content { grid-column: 2; }
  }
`

export function WildBunchEventFlow(): ReactElement {
  return (
    <Figure aria-label="Ordered event history from action to reconstruction" className="wild-bunch-event-flow" data-relationship="ordered-semantic-stages">
      <figcaption>
        <strong>The event stream is the receipt.</strong> Each stage owns a different responsibility. The audit points back to the facts that changed the session.
      </figcaption>
      <ol>
        <li><div className="wild-bunch-event-flow-content"><h3>Player action</h3><p>A player chooses an allowed move.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Command and handler</h3><p>The application coordinates that request.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>GameSession aggregate</h3><p>GameSession's domain rules decide whether the move is legal.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Typed domain event</h3><p>The aggregate records the fact it produced.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Append-only event stream</h3><p>Persistence appends the facts in order and rejects stale writes.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Projection</h3><p>Player and developer read models fold those facts into their own safe views.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Reconstruction</h3><p>Snapshots can be bypassed and the ordered stream can rebuild the session.</p></div></li>
      </ol>
      <p>No message broker sits between these steps. Snapshots are shortcut caches; ordered events remain the recovery route.</p>
    </Figure>
  )
}
