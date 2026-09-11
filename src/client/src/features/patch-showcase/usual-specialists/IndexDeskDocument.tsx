import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Document = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const DocumentArt = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const IndexWalkPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 17%;
  right: 18%;
  width: 94px;

  @media (min-width: 1401px) {
    right: auto;
    left: 1047px;
  }

  @media (max-width: 900px) {
    top: 25%;
    right: 18%;
    width: 88px;
    transform: translateY(clamp(0px, calc(350px - 38.8889vw), 70px));
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const IndexReturnPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: none;

  @media (min-width: 1600px) {
    display: block;
    top: 50%;
    left: clamp(1240px, 78%, 1780px);
    width: 96px;
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }
`

const PatchReturnPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: none;

  @media (min-width: 1600px) {
    z-index: 9;
    display: block;
    top: 55%;
    left: calc(clamp(1240px, 78%, 1780px) + 95px);
    width: 100px;
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }
`

type IndexDeskDocumentProps = {
  style?: CSSProperties
}

export const IndexDeskDocument = ({ style }: IndexDeskDocumentProps) => {
  return (
    <Document data-index-substrate="desk-diagram" style={style}>
      <DocumentArt
        src={usualSpecialistsAssetPath('index-desktop-base.webp')}
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
        alt="A layered desk diagram of route records and working documents used by Index to trace provenance."
      />
      <IndexWalkPlacement>
        <IndexTraversal traversal="index-walk" substrate="desk-diagram" src={usualSpecialistsAssetPath('index-walk.webp')} />
      </IndexWalkPlacement>
      <PatchReturnPlacement>
        <IndexTraversal traversal="patch-return" substrate="desk-diagram" src={usualSpecialistsAssetPath('patch-return.webp')} />
      </PatchReturnPlacement>
      <IndexReturnPlacement>
        <IndexTraversal traversal="index-return" substrate="desk-diagram" src={usualSpecialistsAssetPath('index-return.webp')} />
      </IndexReturnPlacement>
    </Document>
  )
}
