import type { CSSProperties, ReactElement } from 'react'
import { IndexBlueCarrier } from './IndexBlueCarrier'
import { IndexCommissionComposition } from './IndexCommissionComposition'
import { IndexDeskDocument } from './IndexDeskDocument'
import { IndexGraphPaper } from './IndexGraphPaper'
import { IndexStoryCard } from './IndexStoryCard'
import {
  BlueCarrierPlacement,
  Chapter,
  ChapterNumber,
  CommissionCompositionPlacement,
  DeskComposition,
  GraphPaperPlacement,
  MainDocumentPlacement,
  Stage,
  StoryCardPlacement,
} from './IndexChapter.styles'

type IndexChapterProps = {
  style?: CSSProperties
}

export const IndexChapter = ({ style }: IndexChapterProps): ReactElement => {
  return (
    <Chapter aria-labelledby="specialists-index-title" data-specialist-chapter="index" style={style}>
      <h2 className="visually-hidden" id="specialists-index-title">Index</h2>
      <ChapterNumber aria-hidden="true">01</ChapterNumber>
      <Stage>
        <DeskComposition>
          <MainDocumentPlacement>
            <IndexDeskDocument />
          </MainDocumentPlacement>
          <StoryCardPlacement>
            <IndexStoryCard />
          </StoryCardPlacement>
          <GraphPaperPlacement>
            <IndexGraphPaper />
          </GraphPaperPlacement>
        </DeskComposition>
        <BlueCarrierPlacement>
          <IndexBlueCarrier />
        </BlueCarrierPlacement>
        <CommissionCompositionPlacement>
          <IndexCommissionComposition />
        </CommissionCompositionPlacement>
      </Stage>
    </Chapter>
  )
}
