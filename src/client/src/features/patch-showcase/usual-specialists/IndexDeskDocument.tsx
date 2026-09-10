import styled from 'styled-components'
import { IndexTraversal } from './IndexTraversal'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const Document = styled.div`
  min-height: clamp(640px, 44vw, 780px);
  --index-main-overhang: 3vw;

  @media (max-width: 720px) {
    --index-main-overhang: 12vw;
    min-height: 700px;
  }
`

const DocumentArt = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StoryCard = styled.div`
  position: absolute;
  z-index: 13;
  right: calc(var(--index-main-overhang) + var(--specialists-gutter));
  bottom: 30px;
  width: min(35rem, 44%);
  max-width: calc(100vw - (var(--specialists-gutter) * 2));
  padding: 22px 24px;
  border: 1px solid rgb(32 35 31 / 52%);
  background: rgb(242 236 223 / 94%);
  box-shadow: 9px 11px 0 rgb(0 0 0 / 9%);
  anchor-name: --index-story-card;

  p {
    margin: 0;
  }

  @media (min-width: 1401px) {
    left: calc(clamp(801px, calc(12vw + 633px), 940px) - var(--index-main-left));
    right: auto;
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 720px) {
    bottom: 24px;
    width: 330px;
    margin: 0;
  }

  @media (max-width: 390px) {
    width: 260px;
  }
`

const IndexWalk = styled(IndexTraversal)`
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

const IndexReturn = styled(IndexTraversal)`
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

const PatchReturn = styled(IndexTraversal)`
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

export function IndexDeskDocument({ className }: { className?: string }) {
  return (
    <Document className={className} data-index-substrate="desk-diagram">
      <DocumentArt
        src={usualSpecialistsAssetPath('index-desktop-base.webp')}
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
        alt="A layered desk diagram of route records and working documents used by Index to trace provenance."
      />
      <IndexWalk data-index-traversal="index-walk" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('index-walk.webp')} />
      <PatchReturn data-index-traversal="patch-return" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('patch-return.webp')} />
      <IndexReturn data-index-traversal="index-return" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('index-return.webp')} />
      <StoryCard data-index-story-card>
        <p>Index is already moving before Patch finishes the pitch. She leads him across maps, revisions and overlapping records, tracing the provenance from source to source until one route holds together.</p>
      </StoryCard>
    </Document>
  )
}
