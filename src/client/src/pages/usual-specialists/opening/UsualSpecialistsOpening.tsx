import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'
import { PatchSeriesLockup, UsualSpecialistsWordmark } from '../../../features/patch-brand/PatchBrand'
import { usualSpecialistsAssetPath } from '../assets'

const OPENING_CONTAINER_NAME = 'specialists-opening'
const openingQueries = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughCompact: '(max-width: 719px)',
  throughMid: '(max-width: 899px)',
  wide: '(min-width: 1300px)',
  beyondCeiling: '(min-width: 2561px)',
} as const

const Opening = styled.header`
  position: relative;
  container-name: ${OPENING_CONTAINER_NAME};
  container-type: inline-size;
  padding-top: clamp(34px, 6vw, 76px);

  @media ${openingQueries.throughCompact} {
    padding-top: 26px;
  }
`

const OpeningLockup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(14px, 2vw, 24px);
  width: min(calc(100% - (var(--specialists-gutter) * 2)), var(--specialists-max));
  margin-inline: auto;
  padding-bottom: 34px;
`

const SeriesLockupField = styled.div`
  width: min(46%, 190px);

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.narrow} {
    width: min(34%, 110px);
  }
`

const OpeningTitle = styled.h1`
  width: min(100%, 1120px);
  margin: 0;
  color: var(--specialists-ink);
`

const SpecialistsWordmarkField = styled.span`
  display: block;
  width: 100%;
`

const OpeningSupporting = styled.div`
  width: min(46%, 33rem);
  margin-left: auto;
  display: grid;
  gap: clamp(12px, 1.5vw, 20px);

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.throughMid} {
    width: min(62%, 33rem);
  }

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.throughCompact} {
    width: 82%;
    margin-top: 8px;
  }

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.narrow} {
    box-sizing: border-box;
    width: 100%;
    margin-top: 2px;
    padding-left: 8%;
  }

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.wide} {
    width: min(44%, 36rem);
    margin-top: -16px;
    margin-right: clamp(80px, 8vw, 140px);
  }
`

const OpeningPrecis = styled.p`
  width: 100%;
  margin: 0;
  font-size: clamp(1.05rem, 1.7vw, 1.36rem);
`

const Threshold = styled.div`
  position: relative;
  width: 100%;
  min-height: clamp(540px, 68vw, 820px);
  border-top: 1px solid var(--specialists-ink);
  overflow: visible;

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.throughCompact} {
    min-height: 690px;
  }
`

const ThresholdArt = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ThresholdCopy = styled.div`
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
    font-size: clamp(1.9rem, 3.2vw, 3.4rem);
    line-height: .96;
  }

  p {
    margin: 0;
  }

  @media ${openingQueries.beyondCeiling} {
    left: 580px;
  }

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.throughMid} {
    width: min(30rem, 58vw);
  }

  @container ${OPENING_CONTAINER_NAME} ${openingQueries.throughCompact} {
    top: 18%;
    right: var(--specialists-gutter);
    left: var(--specialists-gutter);
    width: auto;
  }
`

type UsualSpecialistsOpeningProps = {
  style?: CSSProperties
}

export const UsualSpecialistsOpening = ({ style }: UsualSpecialistsOpeningProps): ReactElement => {
  return (
    <Opening style={style}>
      <OpeningLockup>
        <OpeningTitle id="content-page-title">
          <span className="visually-hidden">The Usual Specialists</span>
          <SpecialistsWordmarkField data-specialists-wordmark aria-hidden="true">
            <UsualSpecialistsWordmark decorative />
          </SpecialistsWordmarkField>
        </OpeningTitle>
        <OpeningSupporting data-specialists-opening-supporting>
          <SeriesLockupField data-patch-series-lockup>
            <PatchSeriesLockup decorative />
          </SeriesLockupField>
          <OpeningPrecis>Patch built a vault that won’t let him in. Good. It’s doing its job. Lock an agent operating environment down hard enough and eventually legitimate work hits the wall too. Patch still needs a lawful way back in. That route has to be justified, tested, authorised, deliberately chosen, recoverable and recorded.</OpeningPrecis>
        </OpeningSupporting>
      </OpeningLockup>
      <Threshold>
        <ThresholdArt
          src={usualSpecialistsAssetPath('safehouse-threshold.webp')}
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          alt="An ordinary apartment safehouse threshold repurposed room by room for the Specialists."
        />
        <ThresholdCopy data-specialists-threshold-copy>
          <h2>Six names on the list</h2>
          <p>No single agent gets to invent, prove, authorise, choose, recover and record its own exception. Patch needs the specialists who already own those questions. First up: Index.</p>
        </ThresholdCopy>
      </Threshold>
    </Opening>
  )
}
