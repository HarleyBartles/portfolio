import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
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

const PatchPeerPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: calc(-156px + 12px);
  left: 0;
  width: 104px;

  @media (max-width: 900px) {
    top: calc(-147px + 12px);
    width: 98px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const IndexInspectPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: calc(-131px + 12px);
  left: 108px;
  width: 102px;

  @media (max-width: 900px) {
    width: 96px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

type IndexObservationProps = {
  style?: CSSProperties
}

export const IndexObservation = ({ style }: IndexObservationProps) => {
  return (
    <Observation data-index-substrate="commission-03" style={style}>
      <PatchPeerPlacement>
        <IndexTraversal traversal="patch-peer" substrate="commission-03-baseline" src={usualSpecialistsAssetPath('patch-leaning.webp')} />
      </PatchPeerPlacement>
      <IndexInspectPlacement>
        <IndexTraversal traversal="index-inspect" substrate="commission-03-baseline" src={usualSpecialistsAssetPath('index-inspect.webp')} />
      </IndexInspectPlacement>
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
