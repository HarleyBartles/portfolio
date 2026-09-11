import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Macguffin = styled.div`
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

export const IndexMacguffin = ({ className }: { className?: string }) => {
  return (
    <Macguffin className={className} data-index-substrate="commission-04">
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
