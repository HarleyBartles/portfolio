import type { CSSProperties, ReactElement } from 'react'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
import { NameLockup, NameMark, NameStrapline } from './SilkNameLockup.styles'

type SilkNameLockupProps = {
  style?: CSSProperties
}

export const SilkNameLockup = ({ style }: SilkNameLockupProps): ReactElement => (
  <NameLockup data-silk-name-lockup style={style}>
    <NameMark
      src={usualSpecialistsAssetPath('silk-wordmark.svg')}
      width="419"
      height="112"
      alt=""
      aria-hidden="true"
      data-silk-name-mark
    />
    <NameStrapline data-silk-name-strapline>PRESSURE | PROVE THE ROUTE</NameStrapline>
  </NameLockup>
)
