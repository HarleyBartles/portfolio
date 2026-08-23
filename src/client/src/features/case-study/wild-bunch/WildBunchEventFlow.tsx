import type { ReactElement } from 'react'

export function WildBunchEventFlow(): ReactElement {
  return (
    <figure aria-label="Ordered event history from action to reconstruction" className="wild-bunch-event-flow" data-relationship="ordered-semantic-stages">
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
    </figure>
  )
}
