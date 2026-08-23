import type { ReactElement } from 'react'

export function WildBunchEventFlow(): ReactElement {
  return (
    <figure aria-label="Ordered event history from action to reconstruction" className="wild-bunch-event-flow">
      <figcaption>
        <strong>The event stream is the receipt.</strong> Each stage names a different responsibility, so a visible audit can point back to the facts that changed the session.
      </figcaption>
      <ol>
        <li><strong>Player action</strong> — a player chooses an allowed move.</li>
        <li><strong>Command and handler</strong> — the application coordinates that request.</li>
        <li><strong>GameSession aggregate</strong> — owned domain rules decide whether the move is legal.</li>
        <li><strong>Typed domain event</strong> — the aggregate records the fact it produced.</li>
        <li><strong>Append-only event stream</strong> — persistence retains the ordered facts with a concurrency boundary.</li>
        <li><strong>Projection</strong> — player and developer read models fold those facts into their own safe views.</li>
        <li><strong>Reconstruction</strong> — snapshots can be bypassed and the ordered stream can rebuild the session.</li>
      </ol>
      <p>No message broker sits between these steps. Snapshots are shortcut caches; ordered events remain the recovery route.</p>
    </figure>
  )
}
