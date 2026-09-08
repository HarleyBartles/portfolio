import type { ReactElement } from 'react'
import styled from 'styled-components'
import type { WritingHomepageFeature } from './homepageEdition'
import { HomeAnchorTarget, HomeBody, HomeEyebrow, HomeFrame, HomeNextAnchor, HomeRouteActions, HomeRouteLink, HomeSectionTitle } from './HomePrimitives'
import { WildBunchProof } from './WildBunchProof'

const events = [
  ['EVENT 01 · 08:14:03', 'GameStarted'],
  ['EVENT 02 · 08:14:19', 'StoreItemPurchased'],
  ['EVENT 03 · 08:15:02', 'JourneyStarted'],
  ['EVENT 04 · 08:15:44', 'TravelDayAdvanced'],
  ['EVENT 05 · 08:16:27', 'JourneyCompleted'],
  ['EVENT 06 · 08:16:31', 'JourneyArrivalAcknowledged'],
] as const

const stateNodes = ['Player', 'World', 'Clock', 'Journey', 'Case file', 'Pursuit'] as const

const WildMovement = styled.section`
  position: relative;
  padding: clamp(82px, 10vw, 142px) 0;
  overflow: hidden;
  border-bottom: 1px solid var(--rule);

  @media (min-width: 1280px) and (max-width: 1399px) {
    padding-bottom: clamp(48px, 4vw, 64px);
  }

  @media (max-width: 800px) {
    padding: 76px 0;
  }
`

const WildAnchorTarget = styled(HomeAnchorTarget)`
  @media (min-width: 1280px) {
    top: clamp(180px, 16vw, 230px);
  }
`

const WildGrid = styled(HomeFrame)`
  --home-frame-width: 100%;
  --home-frame-narrow-width: 100%;
  --home-frame-margin-inline: 0;
  position: relative;
  display: grid;
  width: 100%;
  max-width: none;
  margin: 0;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto auto auto auto;
  gap: 0;
  align-items: start;

  @media (min-width: 901px) and (max-width: 1279px) {
    grid-template-rows: auto auto auto auto auto;
  }

  @media (max-width: 900px) {
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
  }
`

const WildEyebrow = styled(HomeEyebrow)`
  grid-column: 1 / span 5;
  grid-row: 1;
  z-index: 3;
  margin-left: max(24px, calc((100vw - var(--max)) / 2));
  padding: 0 0 14px;

  @media (max-width: 900px) {
    grid-column: 1;
    grid-row: auto;
    order: 1;
    margin-left: 14px;
    padding-inline: 0;
  }
`

const WildCopyRail = styled.div`
  display: contents;
`

const WildTitle = styled(HomeSectionTitle)`
  grid-column: 10 / -1;
  grid-row: 2;
  align-self: start;
  z-index: 3;
  max-width: 11ch;
  margin: clamp(150px, 13vw, 188px) 0 0;
  padding: 0 24px 0 0;
  font-size: clamp(40px, 4.2vw, 58px);

  @media (min-width: 1400px) {
    margin-top: 150px;
  }

  @media (min-width: 1280px) and (max-width: 1399px) {
    margin-top: 150px;
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    grid-column: 10 / -1;
    grid-row: 3;
    z-index: 4;
    max-width: 10ch;
    margin: clamp(120px, 12vw, 150px) 24px 0 0;
    padding: 0;
    font-size: clamp(34px, 3.8vw, 46px);
    line-height: .98;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    grid-column: 1;
    grid-row: auto;
    order: 2;
    max-width: 18ch;
    margin-top: 0;
    padding-inline: clamp(28px, 6vw, 54px);
    font-size: clamp(40px, 6vw, 54px);
  }

  @media (max-width: 720px) {
    grid-column: 1;
    grid-row: auto;
    order: 2;
    max-width: none;
    margin-top: 10px;
    padding-inline: 20px;
  }
`

const WildBody = styled(HomeBody)`
  width: auto;
  margin: 0;
  padding: 0;

  @media (min-width: 901px) and (max-width: 1279px) {
    grid-column: 1 / 8;
    grid-row: 4;
    align-self: start;
    width: min(100%, 34rem);
    margin: 36px 0 0;
    padding-left: clamp(32px, 5vw, 56px);
  }

  @media (min-width: 721px) and (max-width: 900px) {
    grid-column: 1;
    grid-row: auto;
    order: 4;
    position: relative;
    z-index: 4;
    width: min(72%, 34rem);
    margin: 38px 0 0;
    padding-inline: clamp(28px, 6vw, 54px);
  }

  @media (max-width: 720px) {
    width: auto;
    max-width: none;
    margin: 0;
    padding: 0;
  }
`

const WildRouteActions = styled(HomeRouteActions)`
  width: auto;
  margin: 22px 0 0;
  padding: 0;

  @media (min-width: 901px) and (max-width: 1279px) {
    grid-column: 1 / 8;
    grid-row: 5;
    align-self: start;
    width: min(100%, 34rem);
    margin: 24px 0 0;
    padding-left: clamp(32px, 5vw, 56px);
    padding-right: 0;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    grid-column: 1;
    grid-row: auto;
    order: 5;
    position: relative;
    z-index: 4;
    margin: 24px 0 0;
    padding-inline: clamp(28px, 6vw, 54px);
  }

  @media (max-width: 720px) {
    display: flex;
    width: auto;
    margin: 22px 0 0;
    padding: 0;

    ${HomeRouteLink},
    ${HomeNextAnchor} {
      width: fit-content;
      margin: 0;
    }
  }
`

const WildReadingCard = styled.div`
  grid-column: 10 / -1;
  grid-row: 2;
  align-self: end;
  z-index: 4;
  margin: 0 24px 22px 0;
  padding: clamp(20px, 2vw, 28px);
  background: rgb(230 234 235 / 88%);

  @media (min-width: 1400px) {
    margin-bottom: clamp(96px, 7vw, 124px);
  }

  @media (min-width: 1280px) and (max-width: 1399px) {
    align-self: end;
    margin: 0 24px calc(-1 * clamp(48px, 4vw, 64px)) 0;
  }

  @media (min-width: 721px) and (max-width: 1279px) {
    display: contents;
  }

  @media (max-width: 720px) {
    display: block;
    grid-column: 1;
    grid-row: 4;
    align-self: start;
    justify-self: center;
    z-index: 5;
    width: calc(100% - 40px);
    min-height: 0;
    margin: 0;
    padding: clamp(18px, 5vw, 28px);
    background: rgb(230 234 235 / 88%);
  }

  @media (max-width: 340px) {
    padding: 18px 12px 22px;

    ${WildRouteActions} {
      font-size: 15px;
    }
  }
`

const WildVisual = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  z-index: 1;
  min-width: 0;
  margin: 14px 0 0;

  @media (min-width: 901px) and (max-width: 1279px) {
    grid-row: 3;
    margin-top: 44px;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    grid-column: 1;
    grid-row: auto;
    order: 3;
    width: 100%;
    margin: 38px 0 0;
  }

  @media (max-width: 720px) {
    grid-column: 1;
    grid-row: 3;
    order: 3;
    width: 100%;
    margin: 42px 0 0;
  }
`

export function WildBunchFeature({ nextFeature }: { nextFeature: WritingHomepageFeature }): ReactElement {
  return (
    <WildMovement aria-labelledby="home-wild-title" data-home-movement="wild-bunch" data-visual-contract="homepage-wild-bunch">
      <WildAnchorTarget id="wild-bunch" aria-hidden="true" />
      <WildGrid>
        <WildEyebrow>Wild Bunch · C# / .NET / PostgreSQL</WildEyebrow>
        <WildCopyRail>
          <WildTitle id="home-wild-title">I only get to call the replay exact because it's falsifiable.</WildTitle>
          <WildReadingCard data-wild-reading-card>
            <WildBody>I said events were the source of truth. Then I audited the replay and found they weren't. I fixed the gaps until I could throw the snapshot away and reconstruct the same session from the event stream.</WildBody>
            <WildRouteActions>
              <HomeRouteLink to="/projects/wild-bunch">Follow the trail →</HomeRouteLink>
              <HomeNextAnchor href={`#${nextFeature.anchorId}`}>{nextFeature.incomingTeaser} ↓</HomeNextAnchor>
            </WildRouteActions>
          </WildReadingCard>
        </WildCopyRail>
        <WildVisual><WildBunchProof events={events} stateNodes={stateNodes} /></WildVisual>
      </WildGrid>
    </WildMovement>
  )
}
