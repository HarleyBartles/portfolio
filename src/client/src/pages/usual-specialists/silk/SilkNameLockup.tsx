import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from '../assets'


const NameLockup = styled.div`
  width: 100%;
  container-type: inline-size;
`

const NameMark = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

const NameStrapline = styled.div`
  display: block;
  width: 100%;
  margin-top: 4px;
  color: var(--specialists-ink);
  font-family: var(--font-site-sans);
  font-size: 6.4cqi;
  font-weight: 800;
  line-height: 1;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
`

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
