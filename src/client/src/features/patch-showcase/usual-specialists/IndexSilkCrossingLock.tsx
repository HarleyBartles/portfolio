import type { ReactElement } from 'react'
import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Lock = styled.span`
  position: absolute;
  z-index: 60;
  top: 100%;
  left: 329px;
  display: none;
  width: 176px;
  height: 154px;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(2.5deg) scale(.9);

  @media ${specialistsMedia.wideBand} {
    display: block;
  }
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
  top: 74.9px;
  left: 75.2px;
`

const KnotBottomPort = styled(KnotPort)`
  top: 134.9px;
  left: 90.7px;
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

export const IndexSilkCrossingLock = (): ReactElement => (
  <Lock aria-hidden="true" data-index-silk-crossing-lock>
    <AnchorLayer data-index-silk-lock-layer="anchor">
      <AnchorImage
        alt=""
        data-index-silk-lock-anchor-image
        data-index-silk-lock-ring
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-anchor-ring.webp')}
      />
    </AnchorLayer>
    <ForegroundRopeLayer data-index-silk-lock-layer="foreground-rope">
      <KnotImage
        alt=""
        data-index-silk-lock-knot-image
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-knot-foreground-crop.webp')}
      />
      <KnotTopPort data-index-silk-lock-knot-top-port />
      <KnotBottomPort data-index-silk-lock-knot-bottom-port />
    </ForegroundRopeLayer>
    <ForegroundRingLayer data-index-silk-lock-layer="foreground-ring">
      <RingOccluderImage
        alt=""
        data-index-silk-lock-ring-occluder-image
        decoding="async"
        src={usualSpecialistsAssetPath('silk-index-crossing-ring-occluder.webp')}
      />
    </ForegroundRingLayer>
  </Lock>
)
