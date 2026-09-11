import type { ReactElement } from 'react'
import {
  AssentNote,
  BlueCarrier,
  Chapter,
  ChapterNumber,
  GraphPaper,
  Macguffin,
  MainDocument,
  Observation,
  Stage,
} from './IndexChapter.styles'

export const IndexChapter = (): ReactElement => {
  return (
    <Chapter aria-labelledby="specialists-index-title" data-specialist-chapter="index">
      <h2 className="visually-hidden" id="specialists-index-title">Index</h2>
      <ChapterNumber aria-hidden="true">01</ChapterNumber>
      <Stage>
        <MainDocument />
        <BlueCarrier />
        <GraphPaper />
        <Observation />
        <AssentNote />
        <Macguffin />
      </Stage>
    </Chapter>
  )
}
