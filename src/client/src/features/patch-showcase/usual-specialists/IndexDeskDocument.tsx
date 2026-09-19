import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Document = styled.div`
  --index-return-lane-x: 78%;
  --index-return-width: 96px;
  --index-return-gap: 8px;
  position: relative;
  width: 100%;
  height: 100%;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    --index-return-lane-x: clamp(1240px, 78%, 1780px);
  }
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
  display: none;
  top: 25%;
  right: 42%;
  width: 90px;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.walkReady} {
    display: block;
    right: 15%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    top: 25%;
    right: auto;
    left: 52%;
    width: 94px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    top: 17%;
    left: clamp(970px, calc(12cqi + 740px), 1047px);
  }
`

const IndexReturnPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: none;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.returnPair} {
    display: block;
    top: 48%;
    left: var(--index-return-lane-x);
    width: var(--index-return-width);
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    top: 50%;
  }
`

const PatchReturnPlacement = styled.div`
  position: absolute;
  z-index: 10;
  display: none;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.returnPair} {
    z-index: 9;
    display: block;
    top: 54%;
    left: calc(var(--index-return-lane-x) + var(--index-return-width) + var(--index-return-gap));
    width: 100px;
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    top: 55%;
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
        <IndexTraversal character="index" moment="exploration" traversal="index-walk" substrate="desk-diagram" src={usualSpecialistsAssetPath('index-walk.webp')} />
      </IndexWalkPlacement>
      <PatchReturnPlacement>
        <IndexTraversal character="patch" moment="departure" traversal="patch-return" substrate="desk-diagram" src={usualSpecialistsAssetPath('patch-return.webp')} />
      </PatchReturnPlacement>
      <IndexReturnPlacement>
        <IndexTraversal character="index" moment="return-to-work" traversal="index-return" substrate="desk-diagram" src={usualSpecialistsAssetPath('index-return.webp')} />
      </IndexReturnPlacement>
    </Document>
  )
}
