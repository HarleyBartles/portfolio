import styled from 'styled-components'
import {
  SILK_CHAPTER_PADDING_TOP,
  SILK_CONTAINER_NAME,
  SILK_NARROW_BREACH_APERTURE_HEIGHT_VW,
  silkQueries,
} from './silkResponsive'
const SILK_REACTION_VIEWPORT_WIDTH_PERCENT = 89.3557422969188
const SILK_REACTION_VIEWPORT_LEFT_PERCENT = 3.64145658263305
const SILK_REACTION_MID_WIDTH = 625.490196078431
const SILK_REACTION_MID_HEIGHT = SILK_REACTION_MID_WIDTH / 8.25
const SILK_REACTION_MID_TOP_SHIFT = 23.7057220708447
const SILK_REACTION_MID_BOTTOM_ALIGNMENT = 0.0413171626507136
const SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO = 941 / 1672
const SILK_COMPACT_COMMISSION_09_HEIGHT_VW = 116 * SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO
const SILK_MID_COMMISSION_09_HEIGHT = 640 * SILK_COMMISSION_09_LANDSCAPE_HEIGHT_RATIO

export const Chapter = styled.section`
  position: relative;
  container-name: ${SILK_CONTAINER_NAME};
  container-type: inline-size;
  padding-top: ${SILK_CHAPTER_PADDING_TOP}px;
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
    --silk-reaction-top: calc(
      var(--silk-aperture-2-world-bottom)
      + var(--silk-aperture-world-gutter)
      + ${SILK_REACTION_MID_TOP_SHIFT}px
    );
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
      + ${SILK_REACTION_MID_HEIGHT}px
      + 220.477284465103px
      + ${SILK_MID_COMMISSION_09_HEIGHT}px
      + 20px
    );
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    min-height: min(
      1740px,
      calc(
        var(--silk-reaction-top)
        + ${SILK_REACTION_MID_HEIGHT + SILK_REACTION_MID_BOTTOM_ALIGNMENT}px
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
    --silk-compact-reaction-top: calc(var(--silk-compact-aperture-2-world-bottom) + var(--silk-compact-aperture-world-gutter));
    --silk-stacked-reaction-top: var(--silk-compact-reaction-top);
    --silk-compact-receipt-top: calc(var(--silk-stacked-reaction-top) + 12.8404996517269vw);
    --silk-compact-handoff-top: calc(var(--silk-stacked-reaction-top) + 42.7759958470222vw);
    --silk-stacked-row-gap: clamp(24px, 6vw, 44px);
    min-height: calc(
      var(--silk-compact-handoff-top)
      + ${SILK_COMPACT_COMMISSION_09_HEIGHT_VW}vw
      + 20px
    );
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    --silk-narrow-story-top: calc(106px + 5vw);
    --silk-narrow-aperture-1-top: clamp(330px, calc(540px - 53vw), 370px);
    --silk-narrow-aperture-gap: 6.75vw;
    --silk-narrow-aperture-2-top: calc(var(--silk-narrow-aperture-1-top) + 174vw + var(--silk-narrow-aperture-gap));
    --silk-narrow-aperture-2-height: ${SILK_NARROW_BREACH_APERTURE_HEIGHT_VW}vw;
    --silk-narrow-row-gap: clamp(20px, 6vw, 24px);
    --silk-narrow-reaction-top: calc(
      var(--silk-narrow-aperture-2-top)
      + var(--silk-narrow-aperture-2-height)
      + var(--silk-narrow-aperture-gap)
      + var(--silk-narrow-row-gap)
      - 11.8073968470222vw
    );
    --silk-narrow-receipt-top: calc(
      var(--silk-narrow-reaction-top)
      + 15.71125px
      + 5.18489684702219vw
      + var(--silk-narrow-row-gap)
    );
    --silk-narrow-handoff-top: calc(
      var(--silk-narrow-reaction-top)
      + 184px
      + 5.18489684702219vw
      + var(--silk-narrow-row-gap)
      + var(--silk-narrow-row-gap)
    );
    min-height: calc(
      var(--silk-narrow-handoff-top)
      + 58px
      + 6.6225vw
      - var(--silk-narrow-row-gap)
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
    width: 116%;
    margin-left: -8%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-aperture-1-top);
    left: 0;
    width: 116%;
    margin-left: -8%;
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
    width: 116%;
    height: var(--silk-narrow-aperture-2-height);
    margin-left: -8%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-aperture-2-top);
    left: 0;
    width: 116%;
    margin-left: -8%;
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
  top: 748.3675px;
  right: calc(11% - 96.291547197072px);
  width: 481.441547197072px;
  height: 411.924047197072px;

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 914.9952px;
    right: calc(clamp(50px, calc(-1480px + 79.6875vw), 560px) - 31.026590206126px);
    left: auto;
    width: 341.242590206126px;
    height: 305.031390206126px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: calc(var(--silk-reaction-top) + 90.2676877230293px);
    right: calc(19% - 47.026590206126px);
    left: auto;
    width: 324.122590206126px;
    height: 232.053180412252px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: calc(
      var(--silk-reaction-top)
      + ${SILK_REACTION_MID_HEIGHT + SILK_REACTION_MID_BOTTOM_ALIGNMENT}px
      + var(--silk-reconnecting-lower-gutter)
    );
    right: auto;
    left: calc(46.6667vw - 516.291547197072px);
    width: 481.441547197072px;
    height: 411.924047197072px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.stackedLower} {
    top: 748.3675px;
    right: calc(clamp(50px, calc(-1480px + 79.6875vw), 560px) - 96.291547197072px);
    width: 481.441547197072px;
    height: 411.924047197072px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposedLower} {
    top: calc(1348.3675px + var(--silk-separated-lower-shift));
    right: auto;
    left: 43.7084528029282px;
    width: 515.941547197072px;
    height: 411.924047197072px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: 887.71125px;
    right: -2.763532416055px;
    width: calc(25vw + 139.788532416055px);
    height: 188.052282416055px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-receipt-top);
    right: -2.763532416055px;
    left: auto;
    width: calc(25vw + 139.788532416055px);
    height: 188.052282416055px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-receipt-top);
    right: 12.4685291380381%;
    left: auto;
    width: 45.0170264175175vw;
    height: 32.2296083905906vw;
  }
`

export const ReactionAperturePlacement = styled.div`
  position: absolute;
  z-index: 7;
  top: 1082.07551576489px;
  right: max(calc(var(--specialists-gutter) + 35.014551px), calc((100% - 1180px) / 2 - 22.985449px));
  width: min(34.8487394957983%, 446.778711484594px);

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: ${845 + SILK_REACTION_MID_TOP_SHIFT}px;
    right: 29.0196078431372px;
    width: ${SILK_REACTION_MID_WIDTH}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: var(--silk-reaction-top);
    right: auto;
    left: 49.4901960784314px;
    width: ${SILK_REACTION_MID_WIDTH}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: var(--silk-reaction-top);
    right: auto;
    left: 49.4901960784314px;
    width: ${SILK_REACTION_MID_WIDTH}px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.stackedLower} {
    top: ${1340 + SILK_REACTION_MID_TOP_SHIFT}px;
    right: auto;
    left: max(49.4901960784314px, calc((100% - 1189.01960784314px) / 2));
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.throughCompact} {
    top: calc(1183px - 5.18489684702219vw);
    right: auto;
    left: ${SILK_REACTION_VIEWPORT_LEFT_PERCENT}%;
    width: ${SILK_REACTION_VIEWPORT_WIDTH_PERCENT}%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.narrow} {
    top: var(--silk-narrow-reaction-top);
    right: auto;
    left: ${SILK_REACTION_VIEWPORT_LEFT_PERCENT}%;
    width: ${SILK_REACTION_VIEWPORT_WIDTH_PERCENT}%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-stacked-reaction-top);
    right: auto;
    left: ${SILK_REACTION_VIEWPORT_LEFT_PERCENT}%;
    width: ${SILK_REACTION_VIEWPORT_WIDTH_PERCENT}%;
  }
`

export const HandoffCell = styled.div`
  position: absolute;
  z-index: 19;
  top: 1205px;
  right: 6%;
  width: min(52%, 360px);

  @container ${SILK_CONTAINER_NAME} ${silkQueries.recomposed} {
    top: 1200px;
    right: clamp(-80px, calc(336px - 16.25vw), 24px);
    width: 640px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerNarrow} {
    top: calc(var(--silk-reaction-top) + ${SILK_REACTION_MID_HEIGHT + 220.477284465103}px);
    right: auto;
    left: 24px;
    width: 640px;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.mirroredLowerReconnect} {
    top: calc(
      var(--silk-reaction-top)
      + ${SILK_REACTION_MID_HEIGHT + SILK_REACTION_MID_BOTTOM_ALIGNMENT}px
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
    right: auto;
    left: -2.1%;
    width: 104.2%;
  }

  @container ${SILK_CONTAINER_NAME} ${silkQueries.compact} {
    top: var(--silk-compact-handoff-top);
    right: auto;
    left: -8%;
    width: 116%;
  }
`
