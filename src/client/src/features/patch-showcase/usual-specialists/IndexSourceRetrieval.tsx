import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const SourceRetrieval = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 54%;
  }
`

type IndexSourceRetrievalProps = {
  style?: CSSProperties
}

export const IndexSourceRetrieval = ({ style }: IndexSourceRetrievalProps): ReactElement => {
  return (
    <SourceRetrieval data-index-closing-beat="source-retrieval" style={style}>
      <img
        src={usualSpecialistsAssetPath('index-macguffin.webp')}
        width="1200"
        height="800"
        loading="lazy"
        decoding="async"
        alt="Index pulls a useful source file from a packed archive drawer."
      />
    </SourceRetrieval>
  )
}
