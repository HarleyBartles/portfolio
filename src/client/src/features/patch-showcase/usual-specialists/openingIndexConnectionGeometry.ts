import { css, type RuleSet } from 'styled-components'
import {
  indexSilkConnectionCenterX,
  indexSilkConnectionPortX,
  indexSilkConnectionPortYOffset,
  indexSilkConnectionTransform,
} from './indexSilkConnectionGeometry'
import {
  SPECIALISTS_ROPE_START_ANCHOR_PORTS,
  SPECIALISTS_ROPE_START_ANCHOR_SIZE,
} from './SpecialistsRopeStartAnchor'
import type {
  ConnectionInlineAnchor,
  OpeningIndexConnection,
  OpeningIndexConnectionPlacement,
} from './usualSpecialistsConnections'

export const OPENING_ROPE_START_ANCHOR_RENDER_WIDTH = 180

const OPENING_ROPE_START_ANCHOR_RENDER_HEIGHT = (
  OPENING_ROPE_START_ANCHOR_RENDER_WIDTH
  * SPECIALISTS_ROPE_START_ANCHOR_SIZE.height
  / SPECIALISTS_ROPE_START_ANCHOR_SIZE.width
)

const inlineAnchorCss = (anchor: ConnectionInlineAnchor): string => (
  anchor.edge === 'left'
    ? anchor.offset
    : `calc(100cqi - ${anchor.offset})`
)

const transformedStartAnchorPortOffset = (
  placement: OpeningIndexConnectionPlacement,
): { x: number; y: number } => {
  const port = SPECIALISTS_ROPE_START_ANCHOR_PORTS.exit
  const centerX = SPECIALISTS_ROPE_START_ANCHOR_SIZE.width / 2
  const centerY = SPECIALISTS_ROPE_START_ANCHOR_SIZE.height / 2
  const renderScale = OPENING_ROPE_START_ANCHOR_RENDER_WIDTH / SPECIALISTS_ROPE_START_ANCHOR_SIZE.width
  const radians = placement.startAnchor.rotationDeg * (Math.PI / 180)
  const scaledX = (port.x - centerX) * renderScale * placement.startAnchor.scale
  const scaledY = (port.y - centerY) * renderScale * placement.startAnchor.scale

  return {
    x: (scaledX * Math.cos(radians)) - (scaledY * Math.sin(radians)),
    y: (scaledX * Math.sin(radians)) + (scaledY * Math.cos(radians)),
  }
}

export const openingIndexStartPortX = (placement: OpeningIndexConnectionPlacement): string => (
  inlineAnchorCss(placement.startPort.inlineAnchor)
)

export const openingIndexStartAnchorLeft = (placement: OpeningIndexConnectionPlacement): string => {
  const offset = transformedStartAnchorPortOffset(placement)
  return `calc(${openingIndexStartPortX(placement)} - ${OPENING_ROPE_START_ANCHOR_RENDER_WIDTH / 2 + offset.x}px)`
}

export const openingIndexStartAnchorTop = (placement: OpeningIndexConnectionPlacement): number => {
  const offset = transformedStartAnchorPortOffset(placement)
  return placement.startPort.yPx - (OPENING_ROPE_START_ANCHOR_RENDER_HEIGHT / 2) - offset.y
}

export const openingIndexStartAnchorTransform = (placement: OpeningIndexConnectionPlacement): string => (
  `rotate(${placement.startAnchor.rotationDeg}deg) scale(${placement.startAnchor.scale})`
)

export const openingIndexCrossingCenterX = (placement: OpeningIndexConnectionPlacement): string => (
  indexSilkConnectionCenterX(placement.crossing)
)

export const openingIndexCrossingTopPortX = (placement: OpeningIndexConnectionPlacement): string => (
  indexSilkConnectionPortX(placement.crossing, 'top')
)

export const openingIndexCrossingBottomPortX = (placement: OpeningIndexConnectionPlacement): string => (
  indexSilkConnectionPortX(placement.crossing, 'bottom')
)

export const openingIndexCrossingTopPortYOffset = (placement: OpeningIndexConnectionPlacement): number => (
  indexSilkConnectionPortYOffset(placement.crossing, 'top')
)

export const openingIndexCrossingBottomPortYOffset = (placement: OpeningIndexConnectionPlacement): number => (
  indexSilkConnectionPortYOffset(placement.crossing, 'bottom')
)

export const openingIndexCrossingTransform = (placement: OpeningIndexConnectionPlacement): string => (
  indexSilkConnectionTransform(placement.crossing)
)

export const openingIndexConnectionResponsiveCss = (
  connection: OpeningIndexConnection,
  render: (placement: OpeningIndexConnectionPlacement) => RuleSet<object>,
) => css`
  ${render(connection.default)}

  @media (min-width: 1400px) {
    ${render(connection.wide)}
  }

  @media (max-width: 899px) {
    ${render(connection.mid)}
  }

  @media (min-width: 390px) and (max-width: 719px) {
    ${render(connection.compactLandscape)}
  }

  @media (max-width: 389px) {
    ${render(connection.narrow)}
  }
`
