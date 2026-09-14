import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

const SILK_1920_TREATMENT_MEDIA = '(min-width: 1200px)'
const SILK_MIRRORED_APERTURE_MEDIA = '(min-width: 720px) and (max-width: 1199px)'
const SILK_RECONNECTED_UPPER_MEDIA = '(min-width: 1200px) and (max-width: 1399px)'
const SILK_STACKED_LOWER_MEDIA = '(min-width: 1200px) and (max-width: 1919px)'
const SILK_SEPARATED_LOWER_MEDIA = '(min-width: 1200px) and (max-width: 1499px)'
const SILK_STORY_ABOVE_MEDIA = '(min-width: 1200px) and (max-width: 1799px)'

export const Chapter = styled.section`
  position: relative;
  padding-top: 62px;
  padding-bottom: clamp(82px, 11vw, 148px);
  background:
    radial-gradient(circle at 14% 16%, rgb(255 255 255 / 15%) 0 1px, transparent 1.4px),
    radial-gradient(circle at 71% 64%, rgb(32 35 31 / 5%) 0 1px, transparent 1.4px),
    var(--color-interior-canvas);
  background-size: 43px 37px, 51px 47px, auto;
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

  @media ${SILK_1920_TREATMENT_MEDIA} {
    min-height: 1580px;
  }

  @media ${SILK_SEPARATED_LOWER_MEDIA} {
    min-height: 1740px;
  }

  @media ${specialistsMedia.atMostCompact} {
    min-height: 1600px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    min-height: 1750px;
  }
`

export const NameLockup = styled.div`
  position: absolute;
  z-index: 8;
  top: 38px;
  left: calc(var(--silk-rope-x) - 2.25rem);
  width: clamp(199px, 29.9vw, 439px);
  container-type: inline-size;

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 40px;
    left: 280px;
    width: 440px;
  }

  @media ${SILK_RECONNECTED_UPPER_MEDIA} {
    left: calc(-36.2px + 22.1358vw);
  }

  @media ${specialistsMedia.atMostCompact} {
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

  @media ${specialistsMedia.atLeastWide} {
    width: 1200px;
  }

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 150px;
    left: 240px;
    width: 1120px;
  }

  @media ${SILK_RECONNECTED_UPPER_MEDIA} {
    left: calc(-76.2px + 22.1358vw);
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 146px;
    left: 0;
    width: 100%;
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: 0;
    width: 100%;
  }

  @media ${SILK_MIRRORED_APERTURE_MEDIA} {
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

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 330px;
    right: 150px;
    width: clamp(380px, calc(-820px + 62.5vw), 780px);
  }

  @media ${SILK_STORY_ABOVE_MEDIA} {
    top: 40px;
    right: clamp(24px, calc(-228px + 21vw), 150px);
    left: 760px;
    width: auto;
  }

  @media ${specialistsMedia.atMostMid} {
    width: min(31rem, 50%);
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 525px;
    right: 10%;
    left: 10%;
    width: auto;
  }

  @media ${SILK_MIRRORED_APERTURE_MEDIA} {
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

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 715px;
    left: clamp(24px, calc(-1194px + 63.4375vw), 430px);
    width: clamp(1180px, calc(1000px + 9.375vw), 1240px);
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 755px;
    left: -12%;
    width: 98%;
  }

  @media ${SILK_MIRRORED_APERTURE_MEDIA} {
    top: calc(134.342px + 43.8413vw);
    right: 17vw;
    left: auto;
    width: 88vw;
  }
`

export const ReceiptPeekthrough = styled.div`
  position: absolute;
  z-index: 8;
  top: 824px;
  right: 11%;
  display: grid;
  width: 170px;
  height: 138px;
  padding: 18px;
  place-items: center;
  clip-path: polygon(12% 7%, 36% 1%, 58% 8%, 84% 2%, 98% 24%, 91% 51%, 99% 79%, 78% 96%, 52% 90%, 27% 99%, 3% 81%, 9% 55%, 0 29%);
  background:
    radial-gradient(circle at 55% 52%, #20231f 0 29%, transparent 31%),
    linear-gradient(130deg, #d9dcda 0 24%, #8b6048 25% 36%, #d9dcda 37% 100%);
  color: #f2ecdf;
  font-family: var(--font-site-sans);
  font-size: .65rem;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(3deg);

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 1035px;
    right: clamp(50px, calc(-1480px + 79.6875vw), 560px);
    left: auto;
    transform: rotate(3deg) scale(1.25);
  }

  @media ${SILK_STACKED_LOWER_MEDIA} {
    top: 845px;
  }

  @media ${SILK_SEPARATED_LOWER_MEDIA} {
    top: 1460px;
    right: auto;
    left: 140px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 930px;
    right: 2%;
    width: 150px;
    height: 126px;
  }
`

export const ReactionAperturePlacement = styled.div`
  position: absolute;
  z-index: 7;
  top: 1045px;
  right: max(var(--specialists-gutter), calc((100% - 1180px) / 2 - 58px));
  width: min(39%, 500px);
  height: 126px;

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 845px;
    right: -20px;
    width: 700px;
    height: 120px;
  }

  @media ${SILK_STACKED_LOWER_MEDIA} {
    z-index: 21;
    top: 1340px;
    right: auto;
    left: max(24px, calc((100% - 1240px) / 2));
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 1125px;
    right: -6%;
    width: 72%;
    height: 116px;
  }
`

export const ReactionImage = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.42);
  transform-origin: 42% 32%;
`

export const HandoffCell = styled.div`
  position: absolute;
  z-index: 22;
  top: 1205px;
  right: 6%;
  display: grid;
  box-sizing: border-box;
  width: min(52%, 360px);
  aspect-ratio: 16 / 9;
  padding: 28px 30px;
  align-content: center;
  border: 1px solid rgb(32 35 31 / 38%);
  background:
    linear-gradient(135deg, rgb(89 64 51 / 18%), rgb(46 41 37 / 8%)),
    var(--color-interior-canvas);
  box-shadow: 8px 10px 0 rgb(32 35 31 / 8%);
  color: var(--specialists-ink);
  font-family: var(--font-site-sans);
  font-size: .74rem;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;

  @media ${SILK_1920_TREATMENT_MEDIA} {
    top: 1200px;
    right: clamp(-80px, calc(336px - 16.25vw), 24px);
    width: 640px;
  }

  @media ${SILK_SEPARATED_LOWER_MEDIA} {
    top: 1360px;
    right: 24px;
  }

  span {
    display: block;
    margin-top: 12px;
    max-width: 34rem;
    font-size: .72rem;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 1275px;
    right: -5%;
    width: min(84%, 560px);
    padding: 24px 26px;
  }
`
