import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { chapterCrossingPortCss } from './chapterCrossingGeometry'
import { RopePiece } from './RopePiece'
import { SPECIALISTS_ROPE_GEOMETRY } from './specialistsRopeGeometry'
import { specialistsMedia } from './specialistsResponsive'

export const SILK_ROPE_VIEWBOX = { width: 1000, height: 1800 } as const
export const SILK_COMMISSION_06_ROPE_PORT = { x: 250, y: 580 } as const
export const SILK_COMMISSION_06_COMPACT_ROPE_PORT = { x: 244, y: 440 } as const
const SILK_WIDE_BAND_LOCK_PORT_LEFT = '329.2px'

const COMMISSION_06_PORT_LEFT = `${(SILK_COMMISSION_06_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_PORT_TOP = `${(SILK_COMMISSION_06_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`
const COMMISSION_06_COMPACT_PORT_LEFT = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_COMPACT_PORT_TOP = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`
type SilkTraversalCompositionProps = {
  style?: CSSProperties
}

const Composition = styled.div`
  position: absolute;
  z-index: 20;
  inset: 0;
  pointer-events: none;
`

const UpperRopePlacement = styled.div`
  position: absolute;
  z-index: 0;
  top: -62px;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.materialWidth}px;
  height: calc(${COMMISSION_06_PORT_TOP} + 62px);
  overflow: hidden;
  transform: translateX(-50%);
  transform-origin: 50% 0;
  ${chapterCrossingPortCss('index-silk')}

  @media ${specialistsMedia.atMostMid} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.materialWidth}px;
  }

  @media ${specialistsMedia.compactLandscape} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.materialWidth}px;
    height: calc(${COMMISSION_06_COMPACT_PORT_TOP} + 62px);
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.materialWidth}px;
  }

  @media ${specialistsMedia.wideBand} {
    left: ${SILK_WIDE_BAND_LOCK_PORT_LEFT};
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.materialWidth}px;
  }
`

const UpperRopeMaterial = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  @media ${specialistsMedia.wideBand} {
    transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.straightScaleX});
    transform-origin: 50% 100%;
  }
`

const LowerRopePlacement = styled.div`
  position: absolute;
  z-index: 0;
  top: ${COMMISSION_06_PORT_TOP};
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalWidth}px;
  margin-left: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalEntryOffset}px;
  transform: translateX(-50%);
  ${chapterCrossingPortCss('index-silk')}

  @media ${specialistsMedia.atMostMid} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.mid.terminalEntryOffset}px;
  }

  @media ${specialistsMedia.compactLandscape} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.terminalEntryOffset}px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.narrow.terminalEntryOffset}px;
  }

  @media ${specialistsMedia.wideBand} {
    left: ${SILK_WIDE_BAND_LOCK_PORT_LEFT};
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalEntryOffset}px;
  }
`

const LowerRopeMaterial = styled.div`
  width: 100%;

  @media ${specialistsMedia.wideBand} {
    transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.terminalScaleX});
    transform-origin: ${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.terminalAnchorX} 0;
  }
`

const Traversal = styled.div`
  position: absolute;
  z-index: 1;
  top: ${COMMISSION_06_PORT_TOP};
  left: ${COMMISSION_06_PORT_LEFT};
  display: grid;
  width: 156px;
  height: 420px;
  padding: 14px;
  place-items: center;
  border: 2px dashed var(--specialists-ink);
  border-radius: 46% 44% 34% 31%;
  background: rgb(230 234 235 / 50%);
  transform: translate(-50%, -16%) rotate(8deg);
  transform-origin: 50% 16%;
  font-family: var(--font-site-sans);
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .06em;
  text-align: center;
  text-transform: uppercase;

  @media ${specialistsMedia.atMostCompact} {
    width: 118px;
    height: 350px;
  }

  @media ${specialistsMedia.compactLandscape} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
    left: ${COMMISSION_06_COMPACT_PORT_LEFT};
  }
`

const TraversalRopePort = styled.span`
  position: absolute;
  top: 16%;
  left: 50%;
  width: 2px;
  height: 2px;
  transform: translate(-50%, -50%);
`

const RopeJoinPort = styled.span`
  position: absolute;
  top: ${COMMISSION_06_PORT_TOP};
  width: 2px;
  height: 2px;
  transform: translate(-50%, -50%);
  ${chapterCrossingPortCss('index-silk')}

  @media ${specialistsMedia.wideBand} {
    left: ${SILK_WIDE_BAND_LOCK_PORT_LEFT};
  }

  @media ${specialistsMedia.compactLandscape} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
  }
`

export const SilkTraversalComposition = ({ style }: SilkTraversalCompositionProps): ReactElement => (
  <Composition data-silk-traversal-composition style={style}>
    <UpperRopePlacement aria-hidden="true" data-silk-rope-segment="upper" data-specialists-rope-piece="silk-upper">
      <UpperRopeMaterial>
        <RopePiece variant="taut-straight" />
      </UpperRopeMaterial>
    </UpperRopePlacement>
    <LowerRopePlacement aria-hidden="true" data-silk-rope-segment="lower" data-specialists-rope-piece="silk-lower">
      <LowerRopeMaterial>
        <RopePiece variant="terminal-curl" />
      </LowerRopeMaterial>
    </LowerRopePlacement>
    <RopeJoinPort aria-hidden="true" data-silk-rope-join-port />
    <Traversal data-silk-commission="06">
      <TraversalRopePort aria-hidden="true" data-silk-traversal-rope-port />
      Commission 06 / threshold-crossing Silk traversal
    </Traversal>
  </Composition>
)
