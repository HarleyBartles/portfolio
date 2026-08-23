import type { ReactElement } from 'react'

export function WildBunchEventFlow(): ReactElement {
  return (
    <figure aria-label="Ordered event history from action to reconstruction" className="wild-bunch-event-flow" data-relationship="ordered-semantic-stages">
      <figcaption>
        <strong>The event stream is the receipt.</strong> Each stage names a different responsibility, so a visible audit can point back to the facts that changed the session.
      </figcaption>
      <ol>
        <li><div className="wild-bunch-event-flow-content"><h3>Player action</h3><p>a player chooses an allowed move.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Command and handler</h3><p>the application coordinates that request.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>GameSession aggregate</h3><p>owned domain rules decide whether the move is legal.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Typed domain event</h3><p>the aggregate records the fact it produced.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Append-only event stream</h3><p>persistence retains the ordered facts with a concurrency boundary.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Projection</h3><p>player and developer read models fold those facts into their own safe views.</p></div></li>
        <li><div className="wild-bunch-event-flow-content"><h3>Reconstruction</h3><p>snapshots can be bypassed and the ordered stream can rebuild the session.</p></div></li>
      </ol>
      <p>No message broker sits between these steps. Snapshots are shortcut caches; ordered events remain the recovery route.</p>
    </figure>
  )
}
