import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Observation = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`

const ObservationFrame = styled.div`
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

type IndexObservationProps = {
  style?: CSSProperties
}

export const IndexObservation = ({ style }: IndexObservationProps) => {
  return (
    <Observation data-index-substrate="commission-03" style={style}>
      <ObservationFrame>
        <img
          src={usualSpecialistsAssetPath('index-observation.webp')}
          width="1320"
          height="660"
          loading="lazy"
          decoding="async"
          alt="Index studies an obstructed observation point while the working route crosses in front of her."
        />
      </ObservationFrame>
    </Observation>
  )
}
