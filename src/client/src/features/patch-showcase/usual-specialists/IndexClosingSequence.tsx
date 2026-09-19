import type { CSSProperties, ReactElement } from 'react'
import {
  Composition,
  ObservationPlacement,
  OutcomePlacement,
  RecognitionPlacement,
  RetrievalPlacement,
} from './IndexClosingSequence.styles'
import { IndexOutcomePanel } from './IndexOutcomePanel'
import { IndexRecognitionBridge } from './IndexRecognitionBridge'
import { IndexResearchLockup } from './IndexResearchLockup'
import { IndexSourceRetrieval } from './IndexSourceRetrieval'

type IndexClosingSequenceProps = {
  style?: CSSProperties
}

export const IndexClosingSequence = ({ style }: IndexClosingSequenceProps): ReactElement => {
  return (
    <Composition data-index-closing-sequence style={style}>
      <ObservationPlacement data-index-closing-beat="research">
        <IndexResearchLockup />
      </ObservationPlacement>
      <RecognitionPlacement>
        <IndexRecognitionBridge />
      </RecognitionPlacement>
      <RetrievalPlacement>
        <IndexSourceRetrieval />
      </RetrievalPlacement>
      <OutcomePlacement>
        <IndexOutcomePanel />
      </OutcomePlacement>
    </Composition>
  )
}
