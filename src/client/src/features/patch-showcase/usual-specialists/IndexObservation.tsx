import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Observation = styled.div`
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

const PatchPeer = styled(IndexTraversal)`
  top: calc(-156px + var(--index-03-pair-footline-drop));
  left: 0;
  width: 104px;

  @media (max-width: 900px) {
    top: calc(-147px + var(--index-03-pair-footline-drop));
    width: 98px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const IndexInspect = styled(IndexTraversal)`
  top: calc(-131px + var(--index-03-pair-footline-drop));
  left: 108px;
  width: 102px;

  @media (max-width: 900px) {
    width: 96px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

export const IndexObservation = ({ className }: { className?: string }) => {
  return (
    <Observation className={className} data-index-substrate="commission-03">
      <PatchPeer data-index-traversal="patch-peer" data-substrate="commission-03-baseline" src={usualSpecialistsAssetPath('patch-leaning.webp')} />
      <IndexInspect data-index-traversal="index-inspect" data-substrate="commission-03-baseline" src={usualSpecialistsAssetPath('index-inspect.webp')} />
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
