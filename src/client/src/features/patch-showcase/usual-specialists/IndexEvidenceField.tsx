import type { CSSProperties, ReactElement } from 'react'
import { IndexBlueCarrier } from './IndexBlueCarrier'
import { IndexDeskDocument } from './IndexDeskDocument'
import { IndexStoryCard } from './IndexStoryCard'
import {
  BlueCarrierPlacement,
  EvidenceField,
  MainDocumentPlacement,
  StoryCardPlacement,
} from './IndexEvidenceField.styles'

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
