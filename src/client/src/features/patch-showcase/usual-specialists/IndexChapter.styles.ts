import styled from 'styled-components'
import {
  CHAPTER_CROSSING_HEIGHT,
  CHAPTER_CROSSING_PORTS,
  chapterCrossingPortCss,
} from './chapterCrossingGeometry'
import { SPECIALISTS_ROPE_GEOMETRY } from './specialistsRopeGeometry'
import { specialistsMedia } from './specialistsResponsive'

export const Chapter = styled.section`
  position: relative;
  padding-top: 112px;
  padding-bottom: clamp(74px, 10vw, 132px);
`

export const ChapterNumber = styled.span`
  position: absolute;
  top: 34px;
  left: var(--specialists-gutter);
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 800;
  line-height: .8;
  opacity: .06;
  pointer-events: none;
  user-select: none;
`

export const IndexRopePlacement = styled.div`
  --index-rope-delta-x: 11.1358vw;
  --index-rope-delta-y: calc(1148px + clamp(74px, 10vw, 132px));
  position: absolute;
  z-index: 8;
  top: 0;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.materialWidth}px;
  height: hypot(var(--index-rope-delta-x), var(--index-rope-delta-y));
  overflow: hidden;
  pointer-events: none;
  transform: translateX(-50%) rotate(atan2(calc(0px - var(--index-rope-delta-x)), var(--index-rope-delta-y)));
  transform-origin: 50% 0;
  ${chapterCrossingPortCss('opening-index')}

  @media ${specialistsMedia.wideBand} {
    top: -2px;
    left: calc(${CHAPTER_CROSSING_PORTS['opening-index'].wideBand} + 44px);
    width: auto;
    height: calc(100% + ${CHAPTER_CROSSING_HEIGHT + 4}px);
    aspect-ratio: 724 / 2172;
    overflow: visible;
    transform: translateX(-50%) rotate(-7.1deg);
  }

  @media ${specialistsMedia.atMostMid} {
    --index-rope-delta-x: 9.9075vw;
    --index-rope-delta-y: calc(1287px + clamp(74px, 10vw, 132px));
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.materialWidth}px;
  }

  @media ${specialistsMedia.compactLandscape} {
    --index-rope-delta-x: -3.2856vw;
    --index-rope-delta-y: 1537px;
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.materialWidth}px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    --index-rope-delta-x: -3.484vw;
    --index-rope-delta-y: 1457px;
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.materialWidth}px;
  }

  @media ${specialistsMedia.beyondCeiling} {
    --index-rope-delta-x: 285.07648px;
    --index-rope-delta-y: 1280px;
  }
`

export const IndexResponsiveRopeMaterial = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media ${specialistsMedia.wideBand} {
    display: none;
  }
`

export const IndexRopeTile = styled.div`
  flex: 0 0 auto;
  width: 100%;

  & + & {
    margin-top: -2px;
  }
`

export const IndexWideRopeMaterial = styled.div`
  display: none;
  width: 100%;

  @media ${specialistsMedia.wideBand} {
    display: block;
    transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.indexBowScaleX});
    transform-origin: ${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.indexBowAnchorX} 0;
  }
`

export const Stage = styled.div`
  position: relative;
  min-height: 980px;

  @media ${specialistsMedia.atMostMid} {
    min-height: 1119px;
  }

  @media ${specialistsMedia.atMostCompact} {
    min-height: 1295px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    min-height: 1215px;
  }
`

export const DeskComposition = styled.div`
  position: relative;
  height: clamp(640px, 44vw, 780px);

  @media ${specialistsMedia.atMostCompact} {
    height: 700px;
  }
`

export const MainDocumentPlacement = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: max(var(--specialists-gutter), calc((100vw - 1160px) / 2 - 70px));
  right: -3vw;

  @media ${specialistsMedia.atLeastWide} {
    left: clamp(50px, calc(25vw - 300px), 180px);
    right: -42px;
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: clamp(180px, calc(12vw - 50.4px), 257px);
  }

  @media ${specialistsMedia.beyondCeiling} {
    left: 256.8px;
  }

  @media ${specialistsMedia.atMostCompact} {
    left: 0;
    right: -12vw;
  }
`

export const BlueCarrierPlacement = styled.div`
  position: absolute;
  z-index: 8;
  top: 232px;
  left: 44px;
  width: 620px;
  transform: rotate(-7deg);
  transform-origin: center;

  @media ${specialistsMedia.atLeastWide} {
    left: clamp(44px, calc(25vw - 306px), 174px);
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: clamp(70px, calc(28.3vw - 474px), 174px);
  }

  @media ${specialistsMedia.atMostMid} {
    left: -6px;
    width: 540px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 250px;
    left: -70px;
    width: 520px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: -78px;
    width: 450px;
  }
`

export const GraphPaperPlacement = styled.div`
  position: absolute;
  z-index: 9;
  top: 445px;
  left: 100px;
  width: 570px;
  transform: rotate(2deg);

  @media ${specialistsMedia.atLeastUltrawide} {
    left: clamp(330px, calc(28.3vw - 214px), 434px);
  }

  @media ${specialistsMedia.atMostMid} {
    left: 18px;
    width: 540px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: anchor(--index-story-card-placement top);
    left: -18px;
    width: 520px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: -42px;
    width: 460px;
  }
`

export const StoryCardPlacement = styled.div`
  position: absolute;
  z-index: 13;
  right: var(--specialists-gutter);
  bottom: 30px;
  width: min(35rem, 44%);
  max-width: calc(100vw - (var(--specialists-gutter) * 2));
  anchor-name: --index-story-card-placement;

  @media ${specialistsMedia.atLeastWide} {
    left: clamp(801px, calc(12vw + 633px), 940px);
    right: auto;
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: calc(92vw - 428px);
  }

  @media ${specialistsMedia.beyondCeiling} {
    left: 1927.2px;
  }

  @media ${specialistsMedia.atMostMid} {
    width: 430px;
  }

  @media ${specialistsMedia.atMostCompact} {
    right: var(--specialists-gutter);
    bottom: 24px;
    width: 330px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: 260px;
  }
`

export const CommissionCompositionPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 590px;
  left: calc(50% - 430px);

  @media ${specialistsMedia.atLeastWide} {
    left: clamp(270px, calc(5vw + 200px), 328px);
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: calc(50vw - 96px);
  }

  @media ${specialistsMedia.beyondCeiling} {
    left: 1184px;
  }

  @media ${specialistsMedia.belowWide} {
    left: calc(50% - 390px);
  }

  @media ${specialistsMedia.atMostMid} {
    left: 40px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 718px;
    left: -40px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: -110px;
  }
`
