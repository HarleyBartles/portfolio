import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export const Opening = styled.header`
  padding-top: clamp(34px, 6vw, 76px);

  @media ${specialistsMedia.openingAtMostNarrow} {
    padding-top: 26px;
  }
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

  @media ${specialistsMedia.openingAtMostNarrow} {
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

  @media ${specialistsMedia.openingAtMostNarrow} {
    width: 82%;
    margin-top: 8px;
  }
`

export const Threshold = styled.div`
  position: relative;
  width: 100%;
  min-height: clamp(540px, 68vw, 820px);
  border-block: 1px solid var(--specialists-ink);
  overflow: visible;

  @media ${specialistsMedia.openingAtMostNarrow} {
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

  @media ${specialistsMedia.openingAtMostNarrow} {
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
