import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { PatchSeriesLockup, UsualSpecialistsWordmark } from '../patch-brand/PatchBrand'
import { HomeNextAnchor } from './HomePrimitives'

type MediaStateProps = {
  $mediaFailed: boolean
}

export const SpecialistsMovement = styled.section<MediaStateProps>`
  --ink: #111b1a;
  --paper: #f5ecd7;
  --teal: #0d7476;
  --red: #a43d34;
  --substrate-black: #090909;
  --tear-width: clamp(110px, 16vw, 260px);
  --tear-reveal: calc(var(--tear-width) * .18);
  --tear-fill-left: calc(var(--tear-width) * .30);
  --tear-fill-right: calc(var(--tear-width) * .20);
  position: relative;
  z-index: 0;
  padding: clamp(76px, 9vw, 124px) 0 clamp(132px, 15vw, 210px);
  overflow: hidden;
  isolation: isolate;
  border-bottom: 1px solid var(--rule);

  @media (max-width: 520px) {
    padding-top: 76px;
    padding-bottom: 132px;
  }
`

export const SpecialistsSubstrate = styled.div<MediaStateProps>`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;

  ${({ $mediaFailed }) => $mediaFailed && css`
    background: var(--substrate-black);
  `}
`

export const SpecialistsSubstrateFill = styled.span<MediaStateProps>`
  position: absolute;
  inset-block: 0;
  inset-inline: var(--tear-fill-left) var(--tear-fill-right);
  background: linear-gradient(90deg, #050504, #0e0e0d);

  ${({ $mediaFailed }) => $mediaFailed && css`
    inset: 0;
  `}
`

export const SpecialistsSubstrateEdge = styled.img<MediaStateProps>`
  position: absolute;
  top: 0;
  width: var(--tear-width);
  height: 100%;
  max-width: none;
  object-fit: fill;
  object-position: center;
  user-select: none;

  ${({ $mediaFailed }) => $mediaFailed && css`
    display: none;
  `}
`

export const SpecialistsSubstrateLeftEdge = styled(SpecialistsSubstrateEdge)`
  left: 0;
`

export const SpecialistsSubstrateRightEdge = styled(SpecialistsSubstrateEdge)`
  right: 0;
`

export const HeistMovement = styled.div<MediaStateProps>`
  position: relative;
  z-index: 1;
  width: auto;
  max-width: 1440px;
  min-height: clamp(780px, 61vw, 900px);
  margin-left: max(var(--tear-fill-left), calc((100% - 1440px) / 2));
  margin-right: max(var(--tear-fill-right), calc((100% - 1440px) / 2));
  overflow: visible;
  color: var(--paper);
  background: transparent;
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    z-index: 20;
    height: 7px;
    background: linear-gradient(90deg, var(--teal) 0 31%, var(--red) 31% 33%, #d4ae6d 33% 100%);
  }

  @media (max-width: 1099px) {
    display: grid;
    grid-template-areas:
      "eye"
      "hero"
      "rollback"
      "receipt";
    grid-template-columns: minmax(0, 1fr);
    row-gap: 28px;
    min-height: 0;
    overflow: visible;
    background: transparent;

    &::after {
      display: none;
    }

    ${({ $mediaFailed }) => $mediaFailed && css`
      grid-template-areas: "title" "fallback";
      row-gap: 0;
    `}
  }

  @media (max-width: 520px) {
    grid-template-areas: "title" "eye" "hero" "rollback" "receipt";
    row-gap: 12px;

    ${({ $mediaFailed }) => $mediaFailed && css`
      grid-template-areas: "title" "fallback";
    `}
  }
`

export const HeroComposition = styled.div<MediaStateProps>`
  position: absolute;
  inset: 0;
  pointer-events: none;

  ${({ $mediaFailed }) => $mediaFailed && css`
    display: none;
  `}

  @media (max-width: 1099px) {
    grid-area: hero;
    position: relative;
    inset: auto;
    width: 100%;
  }
`

export const HeroPlate = styled.figure<MediaStateProps>`
  position: absolute;
  inset: 0;
  z-index: -2;
  margin: 0;
  background: #10191b;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgb(8 17 18 / 92%) 0, rgb(8 17 18 / 72%) 25%, transparent 48%),
      linear-gradient(0deg, rgb(8 17 18 / 48%) 0, transparent 25%);
    pointer-events: none;
  }

  ${({ $mediaFailed }) => $mediaFailed && css`
    display: none;
  `}

  @media (max-width: 1099px) {
    position: relative;
    z-index: 1;
    width: calc(100% - 64px);
    aspect-ratio: 3 / 2;
    margin-inline: 32px;
    clip-path: polygon(0 5%, 5% 0, 100% 0, 100% 96%, 97% 100%, 0 100%);

    &::after {
      display: none;
    }

    img {
      object-position: 58% center;
    }
  }

  @media (max-width: 520px) {
    width: calc(100% + 12px);
    aspect-ratio: 4 / 3;
    margin: 0 0 0 16px;
    clip-path: polygon(0 4%, 5% 0, 100% 0, 100% 97%, 96% 100%, 0 100%);

    img {
      object-position: 63% center;
    }
  }
`

export const TitleField = styled.div<MediaStateProps>`
  position: relative;
  z-index: 12;
  display: flex;
  flex-direction: column;
  width: 43%;
  min-height: inherit;
  padding: clamp(42px, 5vw, 72px) 0 clamp(54px, 5vw, 72px) clamp(34px, 5vw, 72px);
  pointer-events: none;

  a {
    pointer-events: auto;
  }

  @media (max-width: 1099px) {
    --intermediate-field: rgb(8 20 20 / 94%);
    grid-area: hero;
    position: relative;
    z-index: 12;
    align-self: center;
    justify-self: start;
    width: min(43%, 360px);
    min-height: 0;
    margin-left: clamp(32px, 6vw, 64px);
    padding: 26px 28px 30px;
    background: transparent;

    ${({ $mediaFailed }) => $mediaFailed && css`
      grid-area: title;
      width: 100%;
      margin: 0;
      padding: 40px 32px 52px;
      background: var(--ink);
    `}
  }

  @media (max-width: 520px) {
    grid-area: title;
    align-self: stretch;
    justify-self: stretch;
    width: 100%;
    min-height: 390px;
    margin: 0;
    padding: 36px 24px 52px;
    background: transparent;

    ${({ $mediaFailed }) => $mediaFailed && css`
      min-height: 390px;
      padding: 36px 24px 52px;
      background: var(--ink);
    `}
  }
`

export const SeriesLockup = styled.p`
  position: relative;
  width: clamp(150px, 12vw, 180px);
  aspect-ratio: 340 / 126.2021;
  margin: 0;
  color: var(--paper);

  @media (max-width: 1099px) {
    width: 132px;
  }

  @media (max-width: 520px) {
    width: 150px;
  }
`

export const SeriesLockupArt = styled(PatchSeriesLockup)`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
`

export const WordmarkTitle = styled.h2<MediaStateProps>`
  width: min(100%, 620px);
  margin: auto 0 0;
  color: var(--paper);

  @media (max-width: 1099px) {
    position: relative;
    z-index: 1;
    width: calc(119% + 33px);
    margin-top: clamp(48px, 8vw, 76px);

    ${({ $mediaFailed }) => $mediaFailed && css`
      width: auto;
      margin-top: 64px;
    `}
  }

  @media (max-width: 520px) {
    width: auto;
    margin-top: auto;
  }
`

export const WordmarkArt = styled(UsualSpecialistsWordmark)`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1120 / 240;
  overflow: visible;
`

export const HeistClose = styled.div`
  display: grid;
  gap: 18px;
  width: min(20rem, 76%);
  margin-top: clamp(52px, 7vw, 96px);
  padding-top: 18px;
  border-top: 1px solid rgb(245 236 215 / 46%);

  p {
    margin: 0;
    font-size: 18px;
    line-height: 1.5;
  }

  a {
    width: fit-content;
    font-size: 18px;
    font-weight: 720;
  }

  @media (max-width: 1099px) {
    width: 100%;
    margin-top: 22px;

    p {
      font-size: clamp(15px, 2.4vw, 18px);
      line-height: 1.5;
      white-space: nowrap;
    }
  }

  @media (max-width: 520px) {
    gap: 15px;

    p {
      white-space: normal;
    }

    p,
    a {
      font-size: 17px;
    }
  }
`

export const SpecialistsRouteLink = styled(Link)``

export const SpecialistsNextAnchor = styled(HomeNextAnchor)`
  color: rgb(245 236 215 / 72%);
  font-size: 15px;
  font-weight: 620;
`

const detailBase = css<MediaStateProps>`
  position: absolute;
  z-index: 8;
  margin: 0;
  padding: 10px;
  border: 2px solid #0b1111;
  background: var(--paper);
  box-shadow: 0 18px 30px rgb(2 7 7 / 38%);
  overflow: hidden;

  ${({ $mediaFailed }) => $mediaFailed && css`
    display: none;
  `}

  @media (max-width: 1099px) {
    position: relative;
    inset: auto;
    height: auto;
    margin: 0;
  }
`

export const DetailCrop = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const EyeDetail = styled.figure<MediaStateProps>`
  ${detailBase}
  top: 15%;
  left: 5.5%;
  width: 54%;
  aspect-ratio: 4 / 1;
  transform: rotate(-1.2deg);
  clip-path: polygon(1.5% 8%, 100% 0, 98% 94%, 0 100%);
  padding: 11px 9px 13px 12px;

  @media (max-width: 1099px) {
    grid-area: eye;
    justify-self: start;
    width: min(102%, 960px);
    aspect-ratio: 4.4 / 1;
    margin: 8px 0 0 -3%;
    transform: rotate(-1deg);
  }

  @media (max-width: 520px) {
    grid-area: eye;
    width: calc(100% + 36px);
    aspect-ratio: 3.35 / 1;
    margin: 0 0 0 -22px;
    transform: rotate(-.8deg);
  }
`

export const LockdownDetail = styled.figure<MediaStateProps>`
  ${detailBase}
  bottom: 5.5%;
  left: 31%;
  width: 24%;
  aspect-ratio: 3 / 2;
  transform: rotate(-3deg);
  clip-path: polygon(0 4%, 96% 0, 100% 94%, 5% 100%);
  padding: 13px 10px 11px 14px;

  @media (max-width: 1099px) {
    grid-area: rollback;
    justify-self: start;
    width: min(88%, 840px);
    aspect-ratio: 16 / 9;
    margin: -18px 0 0 -5%;
    transform: rotate(-1.4deg);
  }

  @media (max-width: 520px) {
    grid-area: rollback;
    justify-self: start;
    width: 98%;
    aspect-ratio: 4 / 3;
    margin: -18px 0 0 -10%;
    transform: rotate(-.8deg);
  }
`

export const ReceiptDetail = styled.figure<MediaStateProps>`
  ${detailBase}
  right: 2.2%;
  bottom: 13%;
  width: 18.5%;
  aspect-ratio: 4 / 3;
  transform: rotate(2.4deg);
  clip-path: polygon(3% 0, 100% 4%, 96% 100%, 0 95%);
  padding: 10px 13px 14px 9px;

  img {
    transform: scale(1.8);
    transform-origin: 63% 68%;
  }

  @media (max-width: 1099px) {
    grid-area: receipt;
    justify-self: end;
    width: min(80%, 780px);
    aspect-ratio: 16 / 9;
    margin: -28px -7% 0 0;
    transform: rotate(1.2deg);

    img {
      transform: scale(1.72);
      transform-origin: 63% 67%;
    }
  }

  @media (max-width: 520px) {
    grid-area: receipt;
    justify-self: end;
    width: 94%;
    aspect-ratio: 4 / 3;
    margin: -26px -12% 0 0;
    transform: rotate(.8deg);

    img {
      transform: scale(1.9);
    }
  }
`

export const StampOverprint = styled.figure<MediaStateProps>`
  position: absolute;
  right: 4.5%;
  bottom: -10%;
  z-index: 30;
  width: clamp(190px, 18vw, 260px);
  margin: 0;
  transform: rotate(-12deg);
  filter: drop-shadow(0 10px 8px rgb(2 7 7 / 35%));

  img {
    width: 100%;
    height: auto;
  }

  ${({ $mediaFailed }) => $mediaFailed && css`
    display: none;
  `}

  @media (max-width: 1099px) {
    position: absolute;
    right: 5%;
    bottom: clamp(-144px, -15vw, -104px);
    left: auto;
    top: auto;
    z-index: 30;
    width: clamp(168px, 23vw, 224px);
    margin: 0;
    transform: rotate(-11deg);
  }

  @media (max-width: 520px) {
    right: 8%;
    bottom: -108px;
    width: clamp(138px, 40vw, 172px);
    margin: 0;
    transform: rotate(-10deg);
  }
`

export const MediaFallback = styled.p<MediaStateProps>`
  display: ${({ $mediaFailed }) => ($mediaFailed ? 'grid' : 'none')};
  position: absolute;
  inset: 18% 8%;
  z-index: 7;
  place-content: center;
  padding: 32px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid #b9a67f;
  font-size: clamp(18px, 2vw, 26px);
  line-height: 1.45;
  text-align: center;

  @media (max-width: 1099px) {
    position: relative;
    inset: auto;
    grid-area: fallback;
    min-height: 280px;
    margin: 20px 32px 0;
  }

  @media (max-width: 520px) {
    margin: 0 16px;
    min-height: 260px;
  }
`
