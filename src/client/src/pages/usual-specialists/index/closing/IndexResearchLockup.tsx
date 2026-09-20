import styled from 'styled-components'
import { IndexObservation } from './IndexObservation'
import { IndexTraversal } from '../IndexTraversal'
import { usualSpecialistsAssetPath } from '../../assets'
import { INDEX_CONTAINER_NAME, indexQueries } from '../responsive'

const Lockup = styled.div`
  position: relative;
  width: 100%;
  isolation: isolate;
`

const GraphPaper = styled.div`
  position: absolute;
  z-index: 0;
  top: -64%;
  left: -10.6%;
  width: 114%;
  aspect-ratio: 3 / 2;
  transform: rotate(2deg);
  transform-origin: center;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    width: 134%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    top: calc(-64% - 16px);
    left: -31%;
    width: 208%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const InspectionPair = styled.div`
  position: absolute;
  bottom: 100%;
  /* Patch's opaque pixels begin 52px into a 320px-wide source canvas.
     With the authored pair/figure widths below, -3.55% places his visible
     left edge on the office frame's left edge rather than tucking him in. */
  left: -3.55%;
  width: 44%;
  aspect-ratio: 220 / 180;
  /* Patch has 36px transparent canvas below his feet in a 480px-tall asset.
     At this authored pair geometry that equals 6.82% of the pair height. */
  transform: translateY(6.82%);
`

const PatchPlacement = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 49.6%;
`

const IndexPlacement = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -12px;
  left: 52%;
  width: 48.6%;
`

const ObservationPlacement = styled.div`
  position: relative;
  z-index: 2;
`

export const IndexResearchLockup = () => (
  <Lockup data-index-research-lockup>
    <GraphPaper data-index-substrate="graph-paper">
      <img
        src={usualSpecialistsAssetPath('index-graph-paper.webp')}
        width="1140"
        height="760"
        loading="lazy"
        decoding="async"
        alt="Graph paper spilling beyond the edge of the main route diagram."
      />
    </GraphPaper>
    <InspectionPair data-index-inspection-pair>
      <PatchPlacement>
        <IndexTraversal
          character="patch"
          moment="inspection"
          traversal="patch-peer"
          substrate="commission-03-baseline"
          src={usualSpecialistsAssetPath('patch-leaning.webp')}
        />
      </PatchPlacement>
      <IndexPlacement>
        <IndexTraversal
          character="index"
          moment="inspection"
          traversal="index-inspect"
          substrate="commission-03-baseline"
          src={usualSpecialistsAssetPath('index-inspect.webp')}
        />
      </IndexPlacement>
    </InspectionPair>
    <ObservationPlacement>
      <IndexObservation />
    </ObservationPlacement>
  </Lockup>
)
