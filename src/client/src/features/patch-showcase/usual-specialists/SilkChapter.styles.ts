import styled from 'styled-components'
import {
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH,
} from './silkCommission07ReviewGeometry'
import {
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT,
  SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH,
  SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT,
  SILK_COMMISSION_08_REVIEW_VIEWPORT,
} from './silkCommission08ReviewGeometry'
import { SILK_CONTAINER_NAME, silkQueries } from './silkResponsive'
const SILK_NARROW_APERTURE_2_BLEED = 1.16
const SILK_NARROW_APERTURE_2_HEIGHT = `${(SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT / SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH) * SILK_NARROW_APERTURE_2_BLEED * 100}vw`
const SILK_COMPACT_REACTION_HALF_HEIGHT = 58
const SILK_COMPACT_REACTION_VIEWPORT_CENTER_COMPENSATION = (
  (0.5 - (SILK_COMMISSION_08_REVIEW_VIEWPORT.top / SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT))
  * (SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT / SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH)
  * 100
)
const SILK_RECONNECTING_REACTION_FRAME_HEIGHT = 700 * (SILK_COMMISSION_08_REVIEW_DERIVATIVE_HEIGHT / SILK_COMMISSION_08_REVIEW_DERIVATIVE_WIDTH)
const SILK_RECONNECTING_REACTION_EYES_BOTTOM_OFFSET = (
  120 / 2
  - SILK_RECONNECTING_REACTION_FRAME_HEIGHT / 2
  + ((SILK_COMMISSION_08_REVIEW_VIEWPORT.bottom + 1) / SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT) * SILK_RECONNECTING_REACTION_FRAME_HEIGHT
)
const SILK_RECONNECTING_RECEIPT_VISUAL_TOP_OVERHANG = 161.63
const SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO = 941 / 1672
const SILK_COMPACT_COMMISSION_09_HEIGHT_VW = 116 * SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO
const SILK_MID_COMMISSION_09_HEIGHT = 640 * SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO

export const Chapter = styled.section`
  position: relative;
  container-name: ${SILK_CONTAINER_NAME};
  container-type: inline-size;
  padding-top: 62px;
  padding-bottom: clamp(82px, 11vw, 148px);
  background:
    radial-gradient(circle at 14% 16%, rgb(255 255 255 / 15%) 0 1px, transparent 1.4px),
    radial-gradient(circle at 71% 64%, rgb(32 35 31 / 5%) 0 1px, transparent 1.4px),
    var(--color-interior-canvas);
  background-size: 43px 37px, 51px 47px, auto;

  @media ${silkQueries.narrow} {
    padding-bottom: calc(121.4333vw + 2px);
  }
`

export const ChapterNumber = styled.span`
  position: absolute;
  z-index: 0;
  top: .08em;
  right: -.04em;
  font-family: var(--font-display);
  font-size: clamp(7rem, 22vw, 19rem);
  font-weight: 900;
  line-height: .8;
  letter-spacing: -.08em;
  color: rgb(32 35 31 / 5%);
  pointer-events: none;
  user-select: none;
`

export const Stage = styled.div`
  --silk-rope-x: 23%;
  position: relative;
  min-height: 1470px;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    --silk-aperture-1-world-bottom: calc(136px + 43.1579vw);
    --silk-aperture-2-world-top: calc(134.342px + 52.5834vw);
    --silk-aperture-2-world-bottom: calc(134.342px + 86.6037vw);
    --silk-aperture-world-gutter: calc(var(--silk-aperture-2-world-top) - var(--silk-aperture-1-world-bottom));
    --silk-reaction-top: calc(var(--silk-aperture-2-world-bottom) + var(--silk-aperture-world-gutter));
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    --silk-reconnecting-lower-gutter: clamp(50px, 5vw, 60px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    --silk-separated-lower-shift: 101px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    min-height: 1580px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.lowerStage} {
    min-height: 1740px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    min-height: calc(
      var(--silk-reaction-top)
      + 320px
      + ${SILK_MID_COMMISSION_09_HEIGHT}px
      + 20px
    );
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    min-height: min(
      1740px,
      calc(
        var(--silk-reaction-top)
        + ${SILK_RECONNECTING_REACTION_EYES_BOTTOM_OFFSET}px
        + var(--silk-reconnecting-lower-gutter)
        + ${SILK_MID_COMMISSION_09_HEIGHT}px
        + 20px
      )
    );
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    min-height: 1600px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    --silk-compact-stack-shift: clamp(0px, calc(302px - 42vw), 138px);
    --silk-compact-aperture-1-top: calc(170px + 8vw + var(--silk-compact-stack-shift));
    --silk-compact-aperture-1-world-bottom: calc(var(--silk-compact-aperture-1-top) + 56.8899vw);
    --silk-compact-aperture-world-gutter: 13.49vw;
    --silk-compact-aperture-2-world-top: calc(var(--silk-compact-aperture-1-world-bottom) + var(--silk-compact-aperture-world-gutter));
    --silk-compact-aperture-2-top: calc(var(--silk-compact-aperture-2-world-top) - 11.5236vw);
    --silk-compact-aperture-2-world-bottom: calc(var(--silk-compact-aperture-2-top) + 56.3686vw);
    --silk-compact-reaction-top: calc(
      var(--silk-compact-aperture-2-world-bottom)
      + var(--silk-compact-aperture-world-gutter)
      - ${SILK_COMPACT_REACTION_HALF_HEIGHT}px
      + ${SILK_COMPACT_REACTION_VIEWPORT_CENTER_COMPENSATION}vw
    );
    --silk-stacked-reaction-top: var(--silk-compact-reaction-top);
    --silk-compact-receipt-top: calc(var(--silk-stacked-reaction-top) + 58px + 21.270407vw);
    --silk-compact-handoff-from-receipt: 16.320692vw;
    --silk-stacked-row-gap: clamp(24px, 6vw, 44px);
    min-height: calc(
      var(--silk-compact-receipt-top)
      + var(--silk-compact-handoff-from-receipt)
      + ${SILK_COMPACT_COMMISSION_09_HEIGHT_VW}vw
      + 20px
    );
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    --silk-narrow-story-top: calc(106px + 5vw);
    --silk-narrow-aperture-1-top: clamp(330px, calc(540px - 53vw), 370px);
    --silk-narrow-aperture-gap: 6.75vw;
    --silk-narrow-aperture-2-top: calc(var(--silk-narrow-aperture-1-top) + 174vw + var(--silk-narrow-aperture-gap));
    --silk-narrow-aperture-2-height: ${SILK_NARROW_APERTURE_2_HEIGHT};
    --silk-narrow-row-gap: clamp(20px, 6vw, 24px);
    --silk-narrow-reaction-visible-shift: calc(58px + 6.6225vw - var(--silk-narrow-row-gap));
    --silk-narrow-reaction-top: calc(
      var(--silk-narrow-aperture-2-top)
      + var(--silk-narrow-aperture-2-height)
      + var(--silk-narrow-aperture-gap)
      - var(--silk-narrow-reaction-visible-shift)
    );
    --silk-narrow-receipt-top: calc(var(--silk-narrow-reaction-top) + 116px + var(--silk-narrow-row-gap));
    --silk-narrow-handoff-top: calc(var(--silk-narrow-receipt-top) + 126px + var(--silk-narrow-row-gap));
    min-height: calc(
      var(--silk-narrow-handoff-top)
      + var(--silk-narrow-reaction-visible-shift)
      + 56.25vw
      + 80px
    );
  }
`

export const TraversalPlacement = styled.div`
  position: absolute;
  z-index: 20;
  inset: 0;
`

export const NameLockup = styled.div`
  position: absolute;
  z-index: 8;
  top: 38px;
  left: calc(var(--silk-rope-x) - 2.25rem);
  width: clamp(199px, 29.9vw, 439px);
  container-type: inline-size;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 40px;
    left: 280px;
    width: 440px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedUpper} {
    left: calc(-36.2px + 22.1358vw);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 24px;
    left: 0;
    width: clamp(199px, 62.3vw, 319px);
  }
`

export const NameMark = styled.img`
  position: relative;
  z-index: 8;
  display: block;
  width: 100%;
  height: auto;
`

export const NameStrapline = styled.div`
  position: relative;
  z-index: 8;
  display: block;
  width: 100%;
  margin-top: 4px;
  color: var(--specialists-ink);
  font-family: var(--font-site-sans);
  font-size: 6.4cqi;
  font-weight: 800;
  line-height: 1;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
`

export const CorridorAperturePlacement = styled.div`
  position: absolute;
  top: 136px;
  left: 17%;
  width: min(88%, 1200px);

  @container ${SILK_CONTAINER_NAME} ${silkQueries.wide} {
    width: 1200px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 150px;
    left: 240px;
    width: 1120px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedUpper} {
    left: calc(-76.2px + 22.1358vw);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 146px;
    left: 0;
    width: 100%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-aperture-1-top);
    left: 0;
    width: 100%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-aperture-1-top);
    left: 0;
    width: 100%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    left: 17vw;
    width: 88vw;
  }
`

export const StoryCard = styled.div`
  position: absolute;
  z-index: 9;
  top: 500px;
  right: 5%;
  width: min(35rem, 42%);
  padding: 20px 22px;
  border: 1px solid rgb(32 35 31 / 45%);
  background: rgb(242 236 223 / 94%);
  box-shadow: 9px 11px 0 rgb(32 35 31 / 9%);

  p {
    margin: 0;
  }

  p + p {
    margin-top: 10px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 330px;
    right: 150px;
    width: clamp(380px, calc(-820px + 62.5vw), 780px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.storyAbove} {
    top: 40px;
    right: clamp(24px, calc(-228px + 21vw), 150px);
    left: 760px;
    width: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughMid} {
    width: min(31rem, 50%);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 525px;
    right: 10%;
    left: 10%;
    width: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-story-top);
    right: 0;
    left: 0;
    width: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: calc(106px + 5vw);
    right: 10%;
    left: 10%;
    width: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    top: 40px;
    right: 24px;
    left: auto;
    width: clamp(320px, calc(176px + 20vw), 416px);
  }
`

export const BreachAperturePlacement = styled.div`
  position: absolute;
  z-index: 4;
  top: 680px;
  left: -3%;
  width: min(76%, 1080px);

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 715px;
    left: clamp(24px, calc(-1194px + 63.4375vw), 430px);
    width: clamp(1180px, calc(1000px + 9.375vw), 1240px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 755px;
    left: -12%;
    width: 98%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-aperture-2-top);
    left: 0;
    width: 100%;
    height: var(--silk-narrow-aperture-2-height);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-aperture-2-top);
    left: 0;
    width: 100%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirrored} {
    top: calc(134.342px + 43.8413vw);
    right: 17vw;
    left: auto;
    width: 88vw;
  }
`

export const ReceiptPeekthrough = styled.div`
  position: absolute;
  top: 824px;
  right: 11%;
  display: grid;
  width: 170px;
  height: 138px;
  place-items: center;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 1035px;
    right: clamp(50px, calc(-1480px + 79.6875vw), 560px);
    left: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: calc(var(--silk-reaction-top) + 212px);
    right: 19%;
    left: auto;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: calc(
      var(--silk-reaction-top)
      + ${SILK_RECONNECTING_REACTION_EYES_BOTTOM_OFFSET + SILK_RECONNECTING_RECEIPT_VISUAL_TOP_OVERHANG}px
      + var(--silk-reconnecting-lower-gutter)
    );
    right: auto;
    left: calc(46.6667vw - 420px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.stackedLower} {
    top: 910px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(1510px + var(--silk-separated-lower-shift));
    right: auto;
    left: 140px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 930px;
    right: 2%;
    width: 150px;
    height: 126px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-receipt-top);
    right: 0;
    left: auto;
    width: 50%;
    height: 126px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-receipt-top);
    right: 19%;
    left: auto;
    width: 23.611111vw;
    height: 19.166667vw;
  }
`

export const ReactionAperturePlacement = styled.div`
  position: absolute;
  z-index: 7;
  top: 1045px;
  right: max(var(--specialists-gutter), calc((100% - 1180px) / 2 - 58px));
  width: min(39%, 500px);
  height: 126px;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 845px;
    right: -20px;
    width: 700px;
    height: 120px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: var(--silk-reaction-top);
    right: auto;
    left: 24px;
    width: 700px;
    height: 120px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: var(--silk-reaction-top);
    right: auto;
    left: 24px;
    width: 700px;
    height: 120px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.stackedLower} {
    top: 1340px;
    right: auto;
    left: max(24px, calc((100% - 1240px) / 2));
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 1125px;
    right: -6%;
    width: 72%;
    height: 116px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-reaction-top);
    right: 0;
    left: 0;
    width: 100%;
    height: 116px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-stacked-reaction-top);
    right: 0;
    left: 0;
    width: 100%;
  }
`

export const HandoffCell = styled.div`
  position: absolute;
  z-index: 19;
  top: 1205px;
  right: 6%;
  width: min(52%, 360px);
  aspect-ratio: 1672 / 941;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 1200px;
    right: clamp(-80px, calc(336px - 16.25vw), 24px);
    width: 640px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: calc(var(--silk-reaction-top) + 320px);
    right: auto;
    left: 24px;
    width: 640px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: calc(
      var(--silk-reaction-top)
      + ${SILK_RECONNECTING_REACTION_EYES_BOTTOM_OFFSET}px
      + var(--silk-reconnecting-lower-gutter)
    );
    right: 24px;
    width: 640px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(1360px + var(--silk-separated-lower-shift));
    right: 24px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 1275px;
    right: -5%;
    width: min(84%, 560px);
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: calc(var(--silk-narrow-handoff-top) - var(--silk-narrow-row-gap));
    right: 0;
    left: 0;
    width: auto;
    aspect-ratio: 941 / 1672;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: calc(var(--silk-compact-receipt-top) + var(--silk-compact-handoff-from-receipt));
    right: 0;
    left: 0;
    width: auto;
  }
`
