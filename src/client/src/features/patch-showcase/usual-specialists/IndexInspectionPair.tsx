import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Pair = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 204 / 160;
`

const PatchPlacement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 48.0392%;
`

const IndexPlacement = styled.div`
  position: absolute;
  top: 10%;
  left: 52.9412%;
  width: 47.0588%;
`

export const IndexInspectionPair = () => {
  return (
    <Pair data-index-inspection-pair>
      <PatchPlacement>
        <IndexTraversal character="patch" moment="inspection" traversal="patch-peer" substrate="commission-03-baseline" src={usualSpecialistsAssetPath('patch-leaning.webp')} />
      </PatchPlacement>
      <IndexPlacement>
        <IndexTraversal character="index" moment="inspection" traversal="index-inspect" substrate="commission-03-baseline" src={usualSpecialistsAssetPath('index-inspect.webp')} />
      </IndexPlacement>
    </Pair>
  )
}
