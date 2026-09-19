import type { CSSProperties, ReactElement } from 'react'
import { IndexClosingSequence } from './IndexClosingSequence'
import { IndexEvidenceField } from './IndexEvidenceField'
import {
  Chapter,
  ClosingSequencePlacement,
  Stage,
} from './IndexChapter.styles'

type IndexChapterProps = {
  style?: CSSProperties
}

export const IndexChapter = ({ style }: IndexChapterProps): ReactElement => {
  return (
    <Chapter aria-labelledby="specialists-index-title" data-specialist-chapter="index" id="index" style={style}>
      <h2 className="visually-hidden" id="specialists-index-title">Index</h2>
      <Stage>
        <IndexEvidenceField />
        <ClosingSequencePlacement>
          <IndexClosingSequence />
        </ClosingSequencePlacement>
      </Stage>
    </Chapter>
  )
}
