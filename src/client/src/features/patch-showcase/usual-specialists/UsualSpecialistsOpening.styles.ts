import styled from 'styled-components'
import { CHAPTER_CROSSING_HEIGHT, chapterCrossingPortCss } from './chapterCrossingGeometry'
import { SPECIALISTS_CHAPTER_NAV_HEIGHT } from './SpecialistsChapterNav.styles'
import { SPECIALISTS_ROPE_GEOMETRY } from './specialistsRopeGeometry'
import { specialistsMedia } from './specialistsResponsive'

const OPENING_INDEX_TRANSITION_HEIGHT = SPECIALISTS_CHAPTER_NAV_HEIGHT + CHAPTER_CROSSING_HEIGHT

export const Opening = styled.header`
  position: relative;
  padding-top: clamp(34px, 6vw, 76px);

  @media ${specialistsMedia.atMostCompact} {
    padding-top: 26px;
  }
`

export const OpeningRopeLayer = styled.div`
  position: absolute;
  z-index: 9;
  right: 0;
  bottom: -${OPENING_INDEX_TRANSITION_HEIGHT}px;
  left: 0;
  height: calc(clamp(540px, 68vw, 820px) + 72px + ${OPENING_INDEX_TRANSITION_HEIGHT}px);
  pointer-events: none;

  @media ${specialistsMedia.atMostCompact} {
    height: calc(762px + ${OPENING_INDEX_TRANSITION_HEIGHT}px);
  }
`

export const OpeningRopePlacement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  width: ${SPECIALISTS_ROPE_GEOMETRY.default.materialWidth}px;
  flex-direction: column;
  overflow: hidden;
  transform: translateX(-50%);
  ${chapterCrossingPortCss('opening-index')}

  @media ${specialistsMedia.atMostMid} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.mid.materialWidth}px;
  }

  @media ${specialistsMedia.compactLandscape} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.compactLandscape.materialWidth}px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: ${SPECIALISTS_ROPE_GEOMETRY.narrow.materialWidth}px;
  }

  @media ${specialistsMedia.wideBand} {
    display: block;
    width: auto;
    aspect-ratio: 724 / 2172;
    overflow: visible;
  }
`

export const OpeningRopeTile = styled.div`
  flex: 0 0 auto;
  width: 100%;

  & + & {
    margin-top: -2px;
  }

  @media ${specialistsMedia.wideBand} {
    transform: scaleX(${SPECIALISTS_ROPE_GEOMETRY.wideBandParacord.straightScaleX});
    transform-origin: 50% 0;

    & + & {
      display: none;
    }
  }
`

export const OpeningRopeAnchor = styled.span`
  position: absolute;
  z-index: 1;
  top: 8px;
  width: 30px;
  height: 30px;
  border: 7px solid #5f5850;
  border-radius: 50%;
  background: #80776b;
  box-shadow: 0 3px 0 rgb(0 0 0 / 20%);
  transform: translate(-50%, -50%);
  ${chapterCrossingPortCss('opening-index')}
`

export const OpeningLockup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(14px, 2vw, 24px);
  width: min(calc(100% - (var(--specialists-gutter) * 2)), var(--specialists-max));
  margin-inline: auto;
  padding-bottom: 34px;
`

export const SeriesLockupField = styled.div`
  width: min(35%, 390px);
  margin-left: auto;

  @media ${specialistsMedia.atMostMid} {
    width: min(42%, 340px);
  }

  @media ${specialistsMedia.atMostCompact} {
    width: min(54%, 280px);
  }
`

export const OpeningTitle = styled.h1`
  width: min(100%, 1120px);
  margin: 0;
  color: var(--specialists-ink);
`

export const SpecialistsWordmarkField = styled.span`
  display: block;
  width: 100%;
`

export const OpeningPrecis = styled.p`
  width: min(46%, 33rem);
  margin: 2px 0 0 auto;
  font-size: clamp(1.05rem, 1.7vw, 1.36rem);

  @media ${specialistsMedia.atMostMid} {
    width: min(62%, 33rem);
  }

  @media ${specialistsMedia.atMostCompact} {
    width: 82%;
    margin-top: 8px;
  }
`

export const Threshold = styled.div`
  position: relative;
  width: 100%;
  min-height: clamp(540px, 68vw, 820px);
  border-top: 1px solid var(--specialists-ink);
  overflow: visible;

  @media ${specialistsMedia.atMostCompact} {
    min-height: 690px;
  }
`

export const ThresholdArt = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ThresholdCopy = styled.div`
  position: absolute;
  z-index: 10;
  top: 15%;
  left: max(var(--specialists-gutter), calc((100vw - var(--specialists-max)) / 2));
  width: min(34rem, 42vw);
  padding: 24px 26px;
  border: 1px solid rgb(32 35 31 / 50%);
  background: rgb(242 236 223 / 91%);
  box-shadow: 11px 13px 0 rgb(32 35 31 / 10%);

  h2 {
    margin: 0 0 12px;
    font-size: clamp(2.25rem, 4.6vw, 4.9rem);
    line-height: .91;
  }

  p {
    margin: 0;
  }

  @media ${specialistsMedia.beyondCeiling} {
    left: 580px;
  }

  @media ${specialistsMedia.atMostMid} {
    width: min(30rem, 58vw);
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 18%;
    right: var(--specialists-gutter);
    left: var(--specialists-gutter);
    width: auto;
  }
`

export const ThresholdEyebrow = styled.p`
  margin-bottom: 12px !important;
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
`
