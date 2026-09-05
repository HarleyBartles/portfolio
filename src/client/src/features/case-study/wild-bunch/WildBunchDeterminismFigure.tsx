import type { ReactElement } from 'react'
import styled from 'styled-components'
import { WildBunchCodecMap } from './WildBunchCodecMap'

const Figure = styled.figure`
  margin: 0;
  padding: clamp(var(--space-6), 4vw, var(--space-10));
  background: var(--wild-bunch-color-earth, #574c3f);
  color: var(--color-surface);

  figcaption { max-width: 52rem; margin-bottom: var(--space-8); }
  figcaption strong { display: block; margin-bottom: var(--space-2); color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.8rem); line-height: 1; }
  ol { display: grid; gap: var(--space-4); padding: 0; list-style: none; }
  li { min-width: 0; border-top: 1px solid rgb(255 250 240 / 32%); padding-top: var(--space-4); }
  h3 { margin: 0; color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); letter-spacing: .012em; }
  && p { max-width: 64ch; color: var(--color-surface); }
  code { overflow-wrap: anywhere; color: var(--color-surface); }
`

export function WildBunchDeterminismFigure(): ReactElement {
  return (
    <Figure aria-label="Controlled determinism from a compact world contract" className="wild-bunch-determinism-figure" data-relationship="ordered-semantic-stages">
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
    </Figure>
  )
}
