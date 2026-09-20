import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Panel = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--specialists-index-paper);
`

const SourcePlane = styled.div`
  position: absolute;
  inset-inline: 0;
  top: 0;
  width: 100%;
  height: 118.5185%;
  container-type: inline-size;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`

const AssentCopy = styled.span`
  position: absolute;
  z-index: 1;
  top: 27.5%;
  left: 42%;
  width: 25%;
  height: 29%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: "Segoe Print", "Bradley Hand", cursive;
  color: var(--specialists-index-ink);
  line-height: .98;
  transform: rotate(-9deg);
  transform-origin: center;

  span {
    font-size: 3.2cqi;
    font-weight: 600;
    white-space: nowrap;
  }

  span:nth-child(2) {
    margin-left: 1.8em;
  }

  strong {
    margin-top: .34em;
    margin-left: .28em;
    font-size: 4.16cqi;
    white-space: nowrap;
  }
`

type IndexOutcomePanelProps = {
  style?: CSSProperties
}

export const IndexOutcomePanel = ({ style }: IndexOutcomePanelProps): ReactElement => {
  return (
    <Panel data-index-closing-beat="assent-outcome" data-index-outcome-crop="top-right" style={style}>
      <SourcePlane>
        <img
          src={usualSpecialistsAssetPath('index-outcome-folder.webp')}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          alt="Patch carries Index's assent onward on the updated recruitment folder."
        />
        <AssentCopy aria-hidden="true">
          <span>You son of</span>
          <span>a gun.</span>
          <strong>I'm in!</strong>
        </AssentCopy>
      </SourcePlane>
      <span className="visually-hidden">You son of a gun. I'm in!</span>
    </Panel>
  )
}
