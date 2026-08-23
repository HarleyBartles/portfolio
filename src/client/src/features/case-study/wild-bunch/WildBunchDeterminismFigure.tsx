import type { ReactElement } from 'react'

const canonicalWorldSeed = '00000000-0000-0000-0000-000000000000'

export function WildBunchDeterminismFigure(): ReactElement {
  return (
    <figure aria-label="Controlled determinism from a compact world contract" className="wild-bunch-determinism-figure" data-relationship="ordered-semantic-stages">
      <figcaption>
        <strong>Controlled determinism, in order.</strong> The UUID describes the world contract; the choices around a playthrough stay legible at their own boundary.
      </figcaption>
      <ol>
        <li>
          <h3>Directly packed world contract</h3>
          <p><code>{canonicalWorldSeed}</code></p>
          <p>At the pinned revision, 33 directly packed UUID bits describe world-owned choices and 95 reserved bits remain outside the current codec.</p>
        </li>
        <li>
          <h3>Separate downstream choices</h3>
          <p>Difficulty, entropy / salt policy, and the player-selected starting town and actions are downstream inputs. None of these choices occupies a UUID field.</p>
        </li>
        <li>
          <h3>Deterministic derivation</h3>
          <p>Town names come from a deterministic shuffle of the 40-name pool. The compact recipe becomes a connected world graph, route distances, town identity, and stored town layout.</p>
        </li>
        <li>
          <h3>Observable outcomes</h3>
          <p>Boring is the bounded same seed, difficulty, policy, and ordered player-action contract. That gives tests, replay, and diagnosis a stable scenario without claiming every entropy mode is complete.</p>
        </li>
      </ol>
    </figure>
  )
}
