import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Macguffin = styled.div`
  position: relative;
  width: 100%;
  min-height: 255px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 255px;
    object-fit: cover;
  }
`

type IndexMacguffinProps = {
  style?: CSSProperties
}

export const IndexMacguffin = ({ style }: IndexMacguffinProps) => {
  return (
    <Macguffin data-index-substrate="commission-04" style={style}>
      <img
        src={usualSpecialistsAssetPath('index-macguffin.webp')}
        width="1200"
        height="800"
        loading="lazy"
        decoding="async"
        alt="Index extracts the route's physical macguffin from the document world."
      />
    </Macguffin>
  )
}
