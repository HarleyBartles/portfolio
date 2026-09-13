import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export const SILK_ROPE_VIEWBOX = { width: 1000, height: 1800 } as const
export const SILK_COMMISSION_06_ROPE_PORT = { x: 250, y: 580 } as const
export const SILK_COMMISSION_06_COMPACT_ROPE_PORT = { x: 244, y: 440 } as const
export const SILK_WIREFRAME_ROPE_ENTRY_PATH = 'M 0 0 C 25 20 75 45 100 63'
export const SILK_WIREFRAME_ROPE_PATH = 'M 230 0 C 232 95 250 165 246 260 C 242 340 244 410 244 440 C 244 460 248 480 250 500 C 252 530 252 555 250 580 C 254 635 266 690 252 760 C 228 920 260 1090 244 1260 C 234 1390 252 1535 282 1660 C 294 1710 282 1750 254 1772'

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

const EntryRope = styled.svg`
  position: absolute;
  z-index: 0;
  top: -63px;
  left: 22.1358%;
  width: calc(23% - 22.1358%);
  height: 63px;
  overflow: visible;

  @media ${specialistsMedia.atMostMid} {
    left: 20.9075%;
    width: calc(23% - 20.9075%);
  }

  @media ${specialistsMedia.atMostCompact} {
    left: 4.7144%;
    width: calc(23% - 4.7144%);
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: 4.516%;
    width: calc(23% - 4.516%);
  }

  path {
    fill: none;
    stroke: var(--specialists-rope);
    stroke-width: 9px;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(3px 0 3px rgb(0 0 0 / 18%));
  }
`

const Rope = styled.svg`
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;

  path {
    fill: none;
    stroke: var(--specialists-rope);
    stroke-width: 9px;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(3px 0 3px rgb(0 0 0 / 18%));
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

const RopeAnchor = styled.span`
  position: absolute;
  z-index: 2;
  top: -78px;
  left: calc(22.1358% - 15px);
  width: 30px;
  height: 30px;
  border: 7px solid #5f5850;
  border-radius: 50%;
  background: #80776b;
  box-shadow: 0 3px 0 rgb(0 0 0 / 20%);

  @media ${specialistsMedia.atMostMid} {
    left: calc(20.9075% - 15px);
  }

  @media ${specialistsMedia.atMostCompact} {
    left: calc(4.7144% - 15px);
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: calc(4.516% - 15px);
  }
`

export const SilkTraversalComposition = ({ style }: SilkTraversalCompositionProps): ReactElement => (
  <Composition data-silk-traversal-composition style={style}>
    <EntryRope
      aria-hidden="true"
      data-silk-journey-rope-entry
      viewBox="0 0 100 63"
      preserveAspectRatio="none"
    >
      <path data-silk-journey-rope-entry-path d={SILK_WIREFRAME_ROPE_ENTRY_PATH} />
    </EntryRope>
    <Rope
      aria-hidden="true"
      data-silk-journey-rope
      viewBox={`0 0 ${SILK_ROPE_VIEWBOX.width} ${SILK_ROPE_VIEWBOX.height}`}
      preserveAspectRatio="none"
    >
      <path data-silk-journey-rope-path d={SILK_WIREFRAME_ROPE_PATH} />
    </Rope>
    <Traversal data-silk-commission="06">
      <TraversalRopePort aria-hidden="true" data-silk-traversal-rope-port />
      Commission 06 / threshold-crossing Silk traversal
    </Traversal>
    <RopeAnchor aria-hidden="true" data-silk-rope-anchor />
  </Composition>
)
