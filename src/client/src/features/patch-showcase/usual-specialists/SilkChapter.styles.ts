import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export const Chapter = styled.section`
  position: relative;
  padding-top: 62px;
  padding-bottom: clamp(82px, 11vw, 148px);
  border-top: 1px solid rgb(32 35 31 / 30%);
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

  @media ${specialistsMedia.atMostCompact} {
    min-height: 1600px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    min-height: 1750px;
  }
`

export const NameMark = styled.img`
  position: absolute;
  z-index: 8;
  top: 38px;
  left: calc(var(--silk-rope-x) - 2.25rem);
  width: clamp(199px, 29.9vw, 439px);
  height: auto;

  @media ${specialistsMedia.atMostCompact} {
    top: 24px;
    left: 0;
    width: clamp(199px, 62.3vw, 319px);
  }
`

export const CorridorAperturePlacement = styled.div`
  position: absolute;
  z-index: 3;
  top: 136px;
  right: -4%;
  left: 17%;
  height: 510px;

  @media ${specialistsMedia.atMostMid} {
    left: 12%;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 146px;
    right: -10%;
    left: -8%;
    height: 450px;
  }
`

export const CorridorWorld = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  padding: 8% 9%;
  align-items: end;
  background:
    linear-gradient(90deg, rgb(35 31 27 / 35%), transparent 13% 84%, rgb(35 31 27 / 30%)),
    repeating-linear-gradient(90deg, transparent 0 11%, rgb(47 41 35 / 16%) 11.3% 11.7%, transparent 12% 22%),
    linear-gradient(180deg, #806b58 0 18%, #9c8064 18% 63%, #5f4c3c 63% 100%);
  color: #f2ecdf;
  font-family: var(--font-site-sans);
  font-size: .78rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
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

  @media ${specialistsMedia.atMostMid} {
    width: min(31rem, 50%);
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 525px;
    right: 10%;
    left: 10%;
    width: auto;
  }
`

export const Eyebrow = styled.p`
  font-family: var(--font-site-sans);
  font-size: .74rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
`

export const Role = styled.p`
  font-family: var(--font-site-sans);
  font-size: .78rem;
  font-weight: 800;
  letter-spacing: .09em;
  text-transform: uppercase;
`

export const Traversal = styled.div`
  position: absolute;
  top: 40%;
  left: calc(var(--silk-rope-x) - 5%);
  display: grid;
  width: 156px;
  height: 420px;
  padding: 14px;
  place-items: center;
  border: 2px dashed var(--specialists-ink);
  border-radius: 46% 44% 34% 31%;
  background: rgb(230 234 235 / 50%);
  transform: rotate(8deg);
  transform-origin: 50% 16%;
  font-family: var(--font-site-sans);
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .06em;
  text-align: center;
  text-transform: uppercase;

  @media ${specialistsMedia.atMostCompact} {
    top: 46%;
    left: max(2rem, 8%);
    width: 118px;
    height: 350px;
  }
`

export const BreachAperturePlacement = styled.div`
  position: absolute;
  z-index: 4;
  top: 680px;
  left: -3%;
  width: min(76%, 1080px);
  height: 390px;

  @media ${specialistsMedia.atMostMid} {
    width: 84%;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 755px;
    left: -12%;
    width: 98%;
    height: 370px;
  }
`

export const BreachWorld = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  padding: 8%;
  align-items: end;
  background:
    linear-gradient(90deg, rgb(18 20 18 / 68%), transparent 26% 72%, rgb(18 20 18 / 58%)),
    repeating-linear-gradient(0deg, #4d3427 0 16px, #684735 16px 18px, #433023 18px 34px),
    #352c25;
  color: #f2ecdf;
  font-family: var(--font-site-sans);
  font-size: .76rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
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

export const HandoffBeat = styled.div`
  position: absolute;
  z-index: 6;
  top: 1205px;
  right: 6%;
  display: grid;
  box-sizing: border-box;
  width: min(52%, 680px);
  min-height: 205px;
  padding: 38px 36px 32px clamp(140px, 18vw, 250px);
  align-content: center;
  background:
    radial-gradient(circle at 18% 49%, var(--specialists-rope) 0 7px, #5f5850 8px 15px, transparent 16px),
    linear-gradient(108deg, #594033 0 24%, #2e2925 24.5% 30%, transparent 30.5% 100%);
  clip-path: polygon(0 12%, 17% 4%, 31% 17%, 47% 8%, 66% 15%, 100% 4%, 97% 87%, 78% 94%, 61% 87%, 42% 97%, 26% 86%, 7% 94%);
  color: var(--specialists-ink);
  font-family: var(--font-site-sans);
  font-size: .74rem;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;

  span {
    display: block;
    margin-top: 7px;
    max-width: 34rem;
    font-size: .72rem;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 1275px;
    right: -5%;
    width: 84%;
    min-height: 205px;
    padding-left: clamp(108px, 34vw, 150px);
  }
`
