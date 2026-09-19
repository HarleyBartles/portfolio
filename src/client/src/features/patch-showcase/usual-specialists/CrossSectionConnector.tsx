import type { CSSProperties, ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { CHAPTER_CROSSING_HEIGHT } from './chapterCrossingGeometry'
import {
  indexSilkConnectionCenterX,
  indexSilkConnectionResponsiveCss,
  indexSilkConnectionTransform,
} from './indexSilkConnectionGeometry'
import {
  openingIndexConnectionResponsiveCss,
  openingIndexCrossingCenterX,
  openingIndexCrossingTransform,
} from './openingIndexConnectionGeometry'
import {
  SPECIALISTS_CROSSING_LOCKUP_SIZE,
  SpecialistsCrossingLockup,
} from './SpecialistsCrossingLockup'
import type { IndexSilkConnection, OpeningIndexConnection } from './usualSpecialistsConnections'

export type CrossSectionConnectorId = 'opening-index' | 'index-silk'

type CrossSectionConnectorProps = (
  | { crossing: 'opening-index'; connection: OpeningIndexConnection }
  | { crossing: 'index-silk'; connection: IndexSilkConnection }
) & {
  style?: CSSProperties
}

const indexSilkPlacementCss = (connection: IndexSilkConnection) => indexSilkConnectionResponsiveCss(connection, (placement) => css`
  top: calc(100% + ${placement.yOffsetPx}px);
  left: ${indexSilkConnectionCenterX(placement)};
  transform: ${indexSilkConnectionTransform(placement)};
`)

const openingIndexPlacementCss = (connection: OpeningIndexConnection) => openingIndexConnectionResponsiveCss(connection, (placement) => css`
  top: calc(100% + ${placement.crossing.yOffsetPx}px);
  left: ${openingIndexCrossingCenterX(placement)};
  transform: ${openingIndexCrossingTransform(placement)};
`)

const ConnectorSurface = styled.div`
  position: relative;
  container-type: inline-size;
  height: ${CHAPTER_CROSSING_HEIGHT}px;
  background: var(--color-interior-canvas);
  pointer-events: none;
`

const ConnectorRule = styled.hr`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(32 35 31 / 30%);
`

const LockPlacement = styled.span<{
  $crossing: CrossSectionConnectorId
  $connection: IndexSilkConnection | OpeningIndexConnection
}>`
  position: absolute;
  z-index: 60;
  width: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.width}px;
  height: ${SPECIALISTS_CROSSING_LOCKUP_SIZE.height}px;
  pointer-events: none;

  ${({ $crossing, $connection }) => (
    $crossing === 'opening-index'
      ? openingIndexPlacementCss($connection as OpeningIndexConnection)
      : indexSilkPlacementCss($connection as IndexSilkConnection)
  )}
`

export const CrossSectionConnector = ({ crossing, connection, style }: CrossSectionConnectorProps): ReactElement => (
  <ConnectorSurface data-specialists-chapter-crossing={crossing} style={style}>
    <ConnectorRule data-specialists-crossing-rule />
    <LockPlacement $connection={connection} $crossing={crossing} data-specialists-crossing-lock-placement={crossing}>
      <SpecialistsCrossingLockup />
    </LockPlacement>
  </ConnectorSurface>
)
