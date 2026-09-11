import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const GraphPaper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

type IndexGraphPaperProps = {
  style?: CSSProperties
}

export const IndexGraphPaper = ({ style }: IndexGraphPaperProps) => {
  return (
    <GraphPaper data-index-substrate="graph-paper" style={style}>
      <img
        src={usualSpecialistsAssetPath('index-graph-paper.webp')}
        width="1140"
        height="760"
        loading="lazy"
        decoding="async"
        alt="Graph paper spilling beyond the edge of the main route diagram."
      />
    </GraphPaper>
  )
}
