import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { RopePiece } from './RopePiece'
import { SilkTraversalCutout } from './SilkTraversalCutout'
import { SPECIALISTS_ROPE_GEOMETRY } from './specialistsRopeGeometry'
import { specialistsMedia } from './specialistsResponsive'

export const SILK_ROPE_VIEWBOX = { width: 1000, height: 1800 } as const
export const SILK_COMMISSION_06_ROPE_PORT = { x: 250, y: 580 } as const
export const SILK_COMMISSION_06_COMPACT_ROPE_PORT = { x: 244, y: 440 } as const

const COMMISSION_06_PORT_LEFT = `${(SILK_COMMISSION_06_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_PORT_TOP = `${(SILK_COMMISSION_06_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`
const COMMISSION_06_COMPACT_PORT_LEFT = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_COMPACT_PORT_TOP = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`

type RopeAxisX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

type RopeAxisState = 'narrow' | 'compactLandscape' | 'mid' | 'default' | 'wide'

type RopeAxisProps = {
  $defaultX: RopeAxisX
  $wideX: RopeAxisX
  $midX: RopeAxisX
  $compactX: RopeAxisX
  $narrowX: RopeAxisX
}

const SILK_ROPE_AXIS = {
  narrow: { kind: 'percent-plus-px', percent: 4.516, offsetPx: 12.57 },
  compactLandscape: { kind: 'percent-plus-px', percent: 4.7144, offsetPx: 7.65 },
  mid: { kind: 'percent-plus-px', percent: 20.9075, offsetPx: 12.8 },
  default: { kind: 'percent-plus-px', percent: 22.1358, offsetPx: 13 },
  wide: { kind: 'absolute-px', value: 329.2 },
} as const satisfies Record<RopeAxisState, RopeAxisX>

const ropeAxisXCss = (x: RopeAxisX): string => (
  x.kind === 'absolute-px'
    ? `${x.value}px`
    : `calc(${x.percent}% + ${x.offsetPx}px)`
)

type SilkTraversalCompositionProps = {
  style?: CSSProperties
}

const Composition = styled.div`
  position: absolute;
  z-index: 20;
  inset: 0;
  pointer-events: none;
`

const SilkRopeAxis = styled.div<RopeAxisProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $defaultX }) => ropeAxisXCss($defaultX)};
  width: 0;
  pointer-events: none;

  @media ${specialistsMedia.atLeastWide} {
    left: ${({ $wideX }) => ropeAxisXCss($wideX)};
  }

  @media ${specialistsMedia.atMostMid} {
    left: ${({ $midX }) => ropeAxisXCss($midX)};
  }

  @media ${specialistsMedia.compactLandscape} {
    left: ${({ $compactX }) => ropeAxisXCss($compactX)};
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: ${({ $narrowX }) => ropeAxisXCss($narrowX)};
  }
`

const UpperRopePlacement = styled.div`
  position: absolute;
  z-index: 0;
  top: -62px;
  left: 0;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.materialWidth}px;
  height: calc(${COMMISSION_06_PORT_TOP} + 62px);
  overflow: hidden;
  transform: translateX(-50%);
  transform-origin: 50% 0;

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

  @media ${specialistsMedia.atLeastWide} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.materialWidth}px;
  }
`

const UpperRopeMaterial = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.paracord.straightScaleX});
  transform-origin: 50% 100%;
`

const LowerRopePlacement = styled.div`
  position: absolute;
  z-index: 0;
  top: ${COMMISSION_06_PORT_TOP};
  left: 0;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalWidth}px;
  margin-left: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalEntryOffset}px;
  transform: translateX(-50%);

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

  @media ${specialistsMedia.atLeastWide} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalEntryOffset}px;
  }
`

const LowerRopeMaterial = styled.div`
  width: 100%;
  transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.paracord.terminalScaleX});
  transform-origin: ${SPECIALISTS_ROPE_GEOMETRY.paracord.terminalAnchorX} 0;
`

const TraversalPlacement = styled.div`
  position: absolute;
  z-index: 1;
  top: ${COMMISSION_06_PORT_TOP};
  left: ${COMMISSION_06_PORT_LEFT};
  width: 320px;
  transform: translate(-50%, -16%) rotate(8deg);
  transform-origin: 50% 16%;

  @media ${specialistsMedia.atMostCompact} {
    width: 240px;
  }

  @media ${specialistsMedia.compactLandscape} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
    left: ${COMMISSION_06_COMPACT_PORT_LEFT};
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: 220px;
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
  left: 0;
  width: 2px;
  height: 2px;
  transform: translate(-50%, -50%);

  @media ${specialistsMedia.compactLandscape} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
  }
`

export const SilkTraversalComposition = ({ style }: SilkTraversalCompositionProps): ReactElement => (
  <Composition data-silk-traversal-composition style={style}>
    <SilkRopeAxis
      $defaultX={SILK_ROPE_AXIS.default}
      $wideX={SILK_ROPE_AXIS.wide}
      $midX={SILK_ROPE_AXIS.mid}
      $compactX={SILK_ROPE_AXIS.compactLandscape}
      $narrowX={SILK_ROPE_AXIS.narrow}
      data-silk-rope-axis
    >
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
    </SilkRopeAxis>
    <TraversalPlacement data-silk-commission="06">
      <TraversalRopePort aria-hidden="true" data-silk-traversal-rope-port />
      <SilkTraversalCutout />
    </TraversalPlacement>
  </Composition>
)
