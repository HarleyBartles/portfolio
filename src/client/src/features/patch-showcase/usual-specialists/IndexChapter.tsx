import type { ReactElement } from 'react'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
import {
  AssentCopy,
  AssentNote,
  BlueCarrier,
  BlueCarrierArt,
  Chapter,
  ChapterNumber,
  Commission03,
  Commission04,
  GraphPaper,
  IndexCross,
  IndexInspect,
  IndexLockup,
  IndexReturn,
  IndexWalk,
  MainDocument,
  MainDocumentArt,
  PatchFollow,
  PatchPeer,
  PatchReturn,
  Stage,
  StoryCard,
} from './IndexChapter.styles'

export function IndexChapter(): ReactElement {
  return (
    <Chapter aria-labelledby="specialists-index-title" data-specialist-chapter="index">
      <h2 className="visually-hidden" id="specialists-index-title">Index</h2>
      <ChapterNumber aria-hidden="true">01</ChapterNumber>
      <Stage>
        <MainDocument data-index-substrate="desk-diagram">
          <MainDocumentArt
            src={usualSpecialistsAssetPath('index-desktop-base.webp')}
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
            alt="A layered desk diagram of route records and working documents used by Index to trace provenance."
          />
          <IndexWalk data-index-traversal="index-walk" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('index-walk.webp')} width="320" height="480" alt="" aria-hidden="true" />
          <PatchReturn data-index-traversal="patch-return" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('patch-return.webp')} width="320" height="480" alt="" aria-hidden="true" />
          <IndexReturn data-index-traversal="index-return" data-substrate="desk-diagram" src={usualSpecialistsAssetPath('index-return.webp')} width="320" height="480" alt="" aria-hidden="true" />
          <StoryCard data-index-story-card>
            <p>Index is already moving before Patch finishes the pitch. She leads him across maps, revisions and overlapping records, tracing the provenance from source to source until one route holds together.</p>
          </StoryCard>
        </MainDocument>

        <BlueCarrier data-index-substrate="blue-carrier">
          <BlueCarrierArt src={usualSpecialistsAssetPath('index-blue-carrier.webp')} width="1240" height="827" loading="lazy" decoding="async" alt="A blue working sheet crossing the main route diagram." />
          <PatchFollow data-index-traversal="patch-follow" data-substrate="blue-carrier" src={usualSpecialistsAssetPath('patch-follow.webp')} width="320" height="480" alt="" aria-hidden="true" />
          <IndexCross data-index-traversal="index-high-step" data-substrate="blue-carrier" src={usualSpecialistsAssetPath('index-high-step.webp')} width="320" height="480" alt="" aria-hidden="true" />
          <IndexLockup data-index-lockup>
            <img src={usualSpecialistsAssetPath('index-wordmark.svg')} alt="" aria-hidden="true" />
            <span>PROVENANCE | TRACE THE ROUTES</span>
          </IndexLockup>
        </BlueCarrier>

        <GraphPaper data-index-substrate="graph-paper">
          <img src={usualSpecialistsAssetPath('index-graph-paper.webp')} width="1140" height="760" loading="lazy" decoding="async" alt="Graph paper spilling beyond the edge of the main route diagram." />
        </GraphPaper>

        <PatchPeer data-index-traversal="patch-peer" data-substrate="commission-03-baseline" src={usualSpecialistsAssetPath('patch-leaning.webp')} width="320" height="480" alt="" aria-hidden="true" />
        <IndexInspect data-index-traversal="index-inspect" data-substrate="commission-03-baseline" src={usualSpecialistsAssetPath('index-inspect.webp')} width="320" height="480" alt="" aria-hidden="true" />

        <AssentNote data-index-substrate="assent-note">
          <img src={usualSpecialistsAssetPath('index-assent-note.webp')} width="480" height="400" loading="lazy" decoding="async" alt="" aria-hidden="true" />
          <span className="visually-hidden">You son of a gun. I'm in!</span>
          <AssentCopy aria-hidden="true">
            <span>You son of</span>
            <span>a gun</span>
            <strong>I'm in!</strong>
          </AssentCopy>
        </AssentNote>

        <Commission03 data-index-substrate="commission-03">
          <img src={usualSpecialistsAssetPath('index-observation.webp')} width="1320" height="660" loading="lazy" decoding="async" alt="Index studies an obstructed observation point while the working route crosses in front of her." />
        </Commission03>
        <Commission04 data-index-substrate="commission-04">
          <img src={usualSpecialistsAssetPath('index-macguffin.webp')} width="1200" height="800" loading="lazy" decoding="async" alt="Index extracts the route's physical macguffin from the document world." />
        </Commission04>
      </Stage>
    </Chapter>
  )
}
