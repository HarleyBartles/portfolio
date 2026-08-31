import type { ReactElement } from 'react'
import { WildBunchCodecMap } from './WildBunchCodecMap'

export function WildBunchDeterminismFigure(): ReactElement {
  return (
    <figure aria-label="Controlled determinism from a compact world contract" className="wild-bunch-determinism-figure" data-relationship="ordered-semantic-stages">
      <figcaption>
        <strong>Controlled determinism, in order.</strong> The UUID defines the starting world. Difficulty, entropy and player choices remain separate inputs.
      </figcaption>
      <ol>
        <li>
          <h3>Directly packed world contract</h3>
          <WildBunchCodecMap />
          <p>At the pinned revision, 33 directly packed UUID bits describe world-owned choices and 95 reserved bits remain outside the current codec.</p>
        </li>
        <li>
          <h3>Separate downstream choices</h3>
          <p>Difficulty, entropy policy, starting town and player actions remain separate inputs. None occupies a UUID field.</p>
        </li>
        <li>
          <h3>Deterministic derivation</h3>
          <p>Town names come from a deterministic shuffle of the 40-name pool. Deterministic policies turn the compact recipe into a connected world graph, route distances, town identities and stored layouts.</p>
        </li>
        <li>
          <h3>Observable outcomes</h3>
          <p>Under Boring, the same seed, difficulty and ordered player actions produce the same outcome. Tests, replay and diagnosis get a stable scenario.</p>
        </li>
      </ol>
    </figure>
  )
}
