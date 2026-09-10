import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const GraphPaper = styled.div`
  aspect-ratio: 3 / 2;
  transform: rotate(2deg);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export function IndexGraphPaper({ className }: { className?: string }) {
  return (
    <GraphPaper className={className} data-index-substrate="graph-paper">
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
