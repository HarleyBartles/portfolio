import type { CSSProperties, ReactElement } from 'react'
import { INDEX_CONTAINER_NAME, indexQueries } from '../responsive'
import styled from 'styled-components'
import { IndexBlueCarrier } from './IndexBlueCarrier'
import { IndexDeskDocument } from './IndexDeskDocument'
import { IndexStoryCard } from './IndexStoryCard'


const EvidenceField = styled.div`
  --index-narrow-foreground-shift: 118px;
  --index-main-height: 650px;
  --index-main-left: 0px;
  --index-main-right: -12cqi;
  --index-blue-top: calc(220px - var(--index-narrow-foreground-shift));
  --index-blue-left: -78px;
  --index-blue-width: 450px;
  --index-graph-top: 430px;
  --index-graph-left: -42px;
  --index-graph-width: 460px;
  --index-story-top: calc(445px - var(--index-narrow-foreground-shift));
  --index-story-right: 18px;
  --index-story-left: 18px;
  --index-story-width: auto;
  position: relative;
  padding-top: var(--index-story-top);

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    --index-field-height: var(--index-compact-evidence-field-height);
    --index-main-height: var(--index-compact-main-document-height);
    --index-blue-top: 205px;
    --index-blue-left: -30px;
    --index-blue-width: 560px;
    --index-graph-top: 390px;
    --index-graph-left: 20px;
    --index-graph-width: 560px;
    --index-story-top: 40%;
    --index-story-right: 4%;
    --index-story-left: auto;
    --index-story-width: min(56%, 544px);
    height: var(--index-field-height);
    padding-top: 0;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    /* At the 960px medium entry the Index identity lockup is still close to the
       compact card lane. Give the card enough vertical clearance there, then
       continuously return to the authored 40% registration before upper-wide
       takes ownership at 1300px. */
    --index-story-top: calc(
      40%
      + clamp(0px, calc(45.8824px - 3.5294cqi), 12px)
    );
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    --index-field-height: 740px;
    --index-main-height: 710px;
    --index-main-left: max(24px, calc((100cqi - 1160px) / 2));
    --index-main-right: -2cqi;
    --index-blue-top: 205px;
    --index-blue-left: clamp(30px, 7cqi, 84px);
    --index-blue-width: clamp(560px, 48cqi, 620px);
    --index-graph-top: 420px;
    --index-graph-left: clamp(60px, 9cqi, 130px);
    --index-graph-width: 570px;
    --index-story-top: 92px;
    --index-story-right: clamp(28px, 4cqi, 56px);
    --index-story-left: auto;
    --index-story-width: clamp(300px, 31cqi, 390px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    --index-field-height: 690px;
    --index-main-height: 660px;
    --index-main-left: clamp(80px, calc(20cqi - 200px), 180px);
    --index-main-right: -24px;
    --index-blue-top: 190px;
    --index-blue-left: clamp(80px, calc(18cqi - 150px), 174px);
    --index-blue-width: 620px;
    --index-graph-top: 405px;
    --index-graph-left: clamp(120px, 10cqi, 190px);
    --index-graph-width: 620px;
    --index-story-top: 68px;
    --index-story-right: clamp(54px, 5cqi, 96px);
    --index-story-width: clamp(400px, 29cqi, 480px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    --index-field-height: 610px;
    --index-main-height: 610px;
    --index-main-left: clamp(180px, calc(12cqi - 50.4px), 257px);
    --index-main-right: -42px;
    --index-blue-top: 165px;
    --index-blue-left: clamp(70px, calc(28.3cqi - 474px), 174px);
    --index-graph-top: 380px;
    --index-graph-left: clamp(330px, calc(28.3cqi - 214px), 434px);
    --index-graph-width: 570px;
    --index-story-top: 58px;
    --index-story-right: clamp(130px, 7cqi, 180px);
    --index-story-width: 520px;
  }
`

const MainDocumentPlacement = styled.div`
  position: absolute;
  top: 0;
  right: var(--index-main-right);
  left: var(--index-main-left);
  height: var(--index-main-height);
`

const BlueCarrierPlacement = styled.div`
  position: absolute;
  z-index: 8;
  top: var(--index-blue-top);
  left: var(--index-blue-left);
  width: var(--index-blue-width);
  transform: rotate(-7deg);
  transform-origin: center;
`

const StoryCardPlacement = styled.div`
  position: relative;
  z-index: 13;
  margin-right: var(--index-story-right);
  margin-left: var(--index-story-left);
  width: var(--index-story-width);
  max-width: calc(100cqi - (var(--specialists-gutter) * 2));

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    position: absolute;
    top: var(--index-story-top);
    right: var(--index-story-right);
    left: var(--index-story-left);
    margin: 0;
  }
`

type IndexEvidenceFieldProps = {
  style?: CSSProperties
}

export const IndexEvidenceField = ({ style }: IndexEvidenceFieldProps): ReactElement => (
  <EvidenceField data-index-evidence-field style={style}>
    <MainDocumentPlacement>
      <IndexDeskDocument />
    </MainDocumentPlacement>
    <StoryCardPlacement>
      <IndexStoryCard />
    </StoryCardPlacement>
    <BlueCarrierPlacement>
      <IndexBlueCarrier />
    </BlueCarrierPlacement>
  </EvidenceField>
)
