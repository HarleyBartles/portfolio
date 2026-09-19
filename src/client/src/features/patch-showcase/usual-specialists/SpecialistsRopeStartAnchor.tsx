import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

export const SPECIALISTS_ROPE_START_ANCHOR_SIZE = {
  width: 640,
  height: 615,
} as const

export const SPECIALISTS_ROPE_START_ANCHOR_PORTS = {
  exit: { x: 353, y: 615 },
} as const

type SpecialistsRopeStartAnchorProps = {
  style?: CSSProperties
}

const AnchorRoot = styled.span`
  position: relative;
  display: block;
  width: 100%;
`

const AnchorPort = styled.span`
  position: absolute;
  top: ${(SPECIALISTS_ROPE_START_ANCHOR_PORTS.exit.y / SPECIALISTS_ROPE_START_ANCHOR_SIZE.height) * 100}%;
  left: ${(SPECIALISTS_ROPE_START_ANCHOR_PORTS.exit.x / SPECIALISTS_ROPE_START_ANCHOR_SIZE.width) * 100}%;
  width: 1px;
  height: 1px;
  pointer-events: none;
  transform: translate(-50%, -50%);
`

const AnchorImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
`

export const SpecialistsRopeStartAnchor = ({ style }: SpecialistsRopeStartAnchorProps): ReactElement => (
  <AnchorRoot aria-hidden="true" data-specialists-rope-start-anchor style={style}>
    <AnchorImage
      aria-hidden="true"
      alt=""
      data-specialists-rope-start-anchor-image
      src={usualSpecialistsAssetPath('opening-rope-start-anchor.webp')}
      width="640"
      height="615"
      decoding="async"
    />
    <AnchorPort data-specialists-rope-start-anchor-port />
  </AnchorRoot>
)
