import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

export const SPECIALISTS_CROSSING_LOCKUP_SIZE = {
  width: 176,
  height: 154,
} as const

export const SPECIALISTS_CROSSING_LOCKUP_PORTS = {
  top: { x: 72.5, y: 74.9 },
  bottom: { x: 90.7, y: 134.9 },
} as const

type SpecialistsCrossingLockupProps = {
  style?: CSSProperties
}

const Lock = styled.span`
  position: relative;
  display: block;
  width: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.width}px;
  height: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.height}px;
  pointer-events: none;
`

const Layer = styled.span`
  position: absolute;
  inset: 0;
`

const AnchorLayer = styled(Layer)`
  z-index: 1;
`

const AnchorImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 138px;
  height: auto;
  transform: translate(-50%, -50%);
`

const ForegroundRopeLayer = styled(Layer)`
  z-index: 2;
`

const KnotImage = styled.img`
  position: absolute;
  top: -6px;
  left: 50%;
  width: 72px;
  height: auto;
  transform: translateX(-52%);
`

const KnotPort = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  pointer-events: none;
`

const KnotTopPort = styled(KnotPort)`
  top: ${SPECIALISTS_CROSSING_LOCKUP_PORTS.top.y}px;
  left: ${SPECIALISTS_CROSSING_LOCKUP_PORTS.top.x}px;
`

const KnotBottomPort = styled(KnotPort)`
  top: ${SPECIALISTS_CROSSING_LOCKUP_PORTS.bottom.y}px;
  left: ${SPECIALISTS_CROSSING_LOCKUP_PORTS.bottom.x}px;
`

const ForegroundRingLayer = styled(Layer)`
  z-index: 3;
`

const RingOccluderImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 138px;
  height: auto;
  transform: translate(-50%, -50%);
`

export const SpecialistsCrossingLockup = ({ style }: SpecialistsCrossingLockupProps): ReactElement => (
  <Lock aria-hidden="true" data-specialists-crossing-lockup style={style}>
    <AnchorLayer data-specialists-crossing-lock-layer="anchor">
      <AnchorImage
        alt=""
        data-specialists-crossing-lock-anchor-image
        data-specialists-crossing-lock-ring
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-anchor-ring.webp')}
      />
    </AnchorLayer>
    <ForegroundRopeLayer data-specialists-crossing-lock-layer="foreground-rope">
      <KnotImage
        alt=""
        data-specialists-crossing-lock-knot-image
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-knot-foreground-crop.webp')}
      />
      <KnotTopPort data-specialists-crossing-lock-knot-top-port />
      <KnotBottomPort data-specialists-crossing-lock-knot-bottom-port />
    </ForegroundRopeLayer>
    <ForegroundRingLayer data-specialists-crossing-lock-layer="foreground-ring">
      <RingOccluderImage
        alt=""
        data-specialists-crossing-lock-ring-occluder-image
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-ring-occluder.webp')}
      />
    </ForegroundRingLayer>
  </Lock>
)
