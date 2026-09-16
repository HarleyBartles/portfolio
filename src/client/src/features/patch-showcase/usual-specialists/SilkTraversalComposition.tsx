import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { RopePiece } from './RopePiece'
import { SilkTraversalCutout } from './SilkTraversalCutout'
import { SILK_CONTAINER_NAME, silkQueries } from './silkResponsive'
import { SPECIALISTS_ROPE_GEOMETRY } from './specialistsRopeGeometry'

export const SILK_ROPE_VIEWBOX = { width: 1000, height: 1800 } as const
export const SILK_COMMISSION_06_ROPE_PORT = { x: 250, y: 580 } as const
export const SILK_COMMISSION_06_COMPACT_ROPE_PORT = { x: 244, y: 440 } as const

const COMMISSION_06_PORT_LEFT = `${(SILK_COMMISSION_06_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_PORT_TOP = `${(SILK_COMMISSION_06_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`
const COMMISSION_06_COMPACT_PORT_LEFT = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.x / SILK_ROPE_VIEWBOX.width) * 100}%`
const COMMISSION_06_COMPACT_PORT_TOP = `${(SILK_COMMISSION_06_COMPACT_ROPE_PORT.y / SILK_ROPE_VIEWBOX.height) * 100}%`
const NARROW_UPPER_ROPE_ANCHOR_OFFSET = 37.3717
const NARROW_UPPER_ROPE_MATERIAL_HEIGHT = SPECIALISTS_ROPE_GEOMETRY.narrow.materialWidth * (2172 / 724)
const NARROW_UPPER_ROPE_HEIGHT = NARROW_UPPER_ROPE_ANCHOR_OFFSET + NARROW_UPPER_ROPE_MATERIAL_HEIGHT
const NARROW_ROPE_JOIN_TOP = NARROW_UPPER_ROPE_HEIGHT - 62
const COMPACT_ROPE_JOIN_EXPRESSION = '275px + 29.822222cqi + clamp(0px, calc(73.822222px - 10.266667cqi), 33.733333px)'
const COMPACT_TRAVERSAL_TOP_EXPRESSION = '303.75px + 32.94cqi + clamp(0px, calc(81.54px - 11.34cqi), 37.26px)'

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
  narrow: { kind: 'percent-plus-px', percent: 4.516, offsetPx: 11.82 },
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
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const SilkRopeAxis = styled.div<RopeAxisProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $defaultX }) => ropeAxisXCss($defaultX)};
  width: 0;
  pointer-events: none;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    left: ${({ $wideX }) => ropeAxisXCss($wideX)};
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedUpper} {
    left: calc(22.1358cqi + 13px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughMid} {
    left: ${({ $midX }) => ropeAxisXCss($midX)};
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    left: ${({ $compactX }) => ropeAxisXCss($compactX)};
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
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

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughMid} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.materialWidth}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.materialWidth}px;
    height: calc(${COMPACT_ROPE_JOIN_EXPRESSION} + 62px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.materialWidth}px;
    height: ${NARROW_UPPER_ROPE_HEIGHT}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.materialWidth}px;
    height: 571.1111px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    width: calc(228.5px + 8.5417cqi);
    height: calc(307px + 19.0556cqi);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    width: calc(343px - 1cqi);
    height: calc(393.8889px + 11.8148cqi);
  }
`

const UpperRopeMaterial = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.paracord.straightScaleX});
  transform-origin: 50% 100%;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: ${NARROW_UPPER_ROPE_ANCHOR_OFFSET}px;
  }
`

const LowerRopePlacement = styled.div`
  position: absolute;
  z-index: 0;
  top: ${COMMISSION_06_PORT_TOP};
  left: 0;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalWidth}px;
  margin-left: ${SPECIALISTS_ROPE_GEOMETRY.default.terminalEntryOffset}px;
  transform: translateX(-50%);

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughMid} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.mid.terminalEntryOffset}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: calc(${COMPACT_ROPE_JOIN_EXPRESSION});
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.terminalEntryOffset}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: ${NARROW_ROPE_JOIN_TOP}px;
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.narrow.terminalEntryOffset}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 509.1111px;
    width: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalWidth}px;
    margin-left: ${SPECIALISTS_ROPE_GEOMETRY.wideBandSilk.terminalEntryOffset}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    top: calc(245px + 19.0556cqi);
    width: calc(276.3265px + 10.3294cqi);
    margin-left: calc(26.716px + .99875cqi);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(331.8889px + 11.8148cqi);
    width: calc(417.395px - 1.4263cqi);
    margin-left: calc(41.505px - .23367cqi);
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

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 584.6px;
    left: clamp(390px, calc(340.4717px + 3.30189cqi), 425px);
    width: 360px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    width: 240px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: ${COMMISSION_06_COMPACT_PORT_TOP};
    left: ${COMMISSION_06_COMPACT_PORT_LEFT};
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: calc(${COMPACT_TRAVERSAL_TOP_EXPRESSION});
    left: calc(34.0924px + 8.25836cqi);
    width: 192px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: 38%;
    width: 220px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    top: calc(139.65px + 33.6875cqi);
    left: calc(-36px + 30cqi);
    width: 26.6667cqi;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(381.1px + 13.5667cqi);
    left: calc(60px + 22cqi);
    width: calc(160px + 13.3333cqi);
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

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 509.1111px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: calc(${COMPACT_ROPE_JOIN_EXPRESSION});
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: ${NARROW_ROPE_JOIN_TOP}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    top: calc(245px + 19.0556cqi);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(331.8889px + 11.8148cqi);
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
