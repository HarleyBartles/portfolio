import { css, type RuleSet } from 'styled-components'
import {
  SPECIALISTS_CROSSING_LOCKUP_PORTS,
  SPECIALISTS_CROSSING_LOCKUP_SIZE,
} from './SpecialistsCrossingLockup'
import type {
  ConnectionInlineAnchor,
  IndexSilkConnection,
  IndexSilkConnectionPlacement,
} from './usualSpecialistsConnections'

export type IndexSilkConnectionPort = keyof typeof SPECIALISTS_CROSSING_LOCKUP_PORTS

const inlineAnchorCss = (anchor: ConnectionInlineAnchor): string => (
  anchor.edge === 'left'
    ? anchor.offset
    : `calc(100cqi - ${anchor.offset})`
)

const transformedPortOffset = (
  placement: IndexSilkConnectionPlacement,
  port: IndexSilkConnectionPort,
): { x: number; y: number } => {
  const point = SPECIALISTS_CROSSING_LOCKUP_PORTS[port]
  const centerX = SPECIALISTS_CROSSING_LOCKUP_SIZE.width / 2
  const centerY = SPECIALISTS_CROSSING_LOCKUP_SIZE.height / 2
  const radians = placement.rotationDeg * (Math.PI / 180)
  const scaledX = (point.x - centerX) * placement.scale
  const scaledY = (point.y - centerY) * placement.scale

  return {
    x: (scaledX * Math.cos(radians)) - (scaledY * Math.sin(radians)),
    y: (scaledX * Math.sin(radians)) + (scaledY * Math.cos(radians)),
  }
}

export const indexSilkConnectionCenterX = (placement: IndexSilkConnectionPlacement): string => (
  inlineAnchorCss(placement.inlineAnchor)
)

export const indexSilkConnectionPortX = (
  placement: IndexSilkConnectionPlacement,
  port: IndexSilkConnectionPort,
): string => {
  const offset = transformedPortOffset(placement, port)
  return `calc(${inlineAnchorCss(placement.inlineAnchor)} + ${offset.x}px)`
}

export const indexSilkConnectionPortYOffset = (
  placement: IndexSilkConnectionPlacement,
  port: IndexSilkConnectionPort,
): number => placement.yOffsetPx + transformedPortOffset(placement, port).y

export const indexSilkConnectionTransform = (placement: IndexSilkConnectionPlacement): string => (
  `translate(-50%, -50%) rotate(${placement.rotationDeg}deg) scale(${placement.scale})`
)

export const indexSilkConnectionResponsiveCss = (
  connection: IndexSilkConnection,
  render: (placement: IndexSilkConnectionPlacement) => RuleSet<object>,
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
