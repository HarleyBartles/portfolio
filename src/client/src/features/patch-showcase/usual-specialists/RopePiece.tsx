import type { ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

export type RopePieceVariant =
  | 'loose-a'
  | 'loose-b'
  | 'loose-c'
  | 'terminal-curl'
  | 'taut-straight'
  | 'taut-bow'
  | 'taut-offset'

type RopePieceProps = {
  variant: RopePieceVariant
}

const RopeImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
`

export const RopePiece = ({ variant }: RopePieceProps): ReactElement => (
  <RopeImage
    aria-hidden="true"
    alt=""
    data-specialists-rope-variant={variant}
    src={usualSpecialistsAssetPath(`rope-${variant}.webp`)}
    width="724"
    height="2172"
    decoding="async"
  />
)
