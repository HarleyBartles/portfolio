import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

type SilkTraversalCutoutProps = {
  style?: CSSProperties
}

const CutoutRoot = styled.span`
  display: block;
  width: 100%;
`

const CutoutImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
`

export const SilkTraversalCutout = ({ style }: SilkTraversalCutoutProps): ReactElement => (
  <CutoutRoot aria-hidden="true" data-silk-traversal-cutout style={style}>
    <CutoutImage
      src={usualSpecialistsAssetPath('silk-commission-06-abseil-hands-free.webp')}
      width="720"
      height="864"
      loading="lazy"
      decoding="async"
      alt=""
      data-silk-traversal-cutout-image
    />
  </CutoutRoot>
)
