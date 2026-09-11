import type { CSSProperties, ReactElement } from 'react'
import { IndexAssentNote } from './IndexAssentNote'
import { IndexBlueCarrier } from './IndexBlueCarrier'
import { IndexDeskDocument } from './IndexDeskDocument'
import { IndexGraphPaper } from './IndexGraphPaper'
import { IndexMacguffin } from './IndexMacguffin'
import { IndexObservation } from './IndexObservation'
import { IndexStoryCard } from './IndexStoryCard'
import {
  AssentNotePlacement,
  BlueCarrierPlacement,
  Chapter,
  ChapterNumber,
  DeskComposition,
  GraphPaperPlacement,
  MacguffinPlacement,
  MainDocumentPlacement,
  ObservationPlacement,
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
        <ObservationPlacement>
          <IndexObservation />
        </ObservationPlacement>
        <AssentNotePlacement>
          <IndexAssentNote />
        </AssentNotePlacement>
        <MacguffinPlacement>
          <IndexMacguffin />
        </MacguffinPlacement>
      </Stage>
    </Chapter>
  )
}
