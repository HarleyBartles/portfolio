import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

type SpecialistsRopeStartAnchorProps = {
  style?: CSSProperties
}

const AnchorRoot = styled.span`
  display: block;
  width: 100%;
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
  </AnchorRoot>
)
