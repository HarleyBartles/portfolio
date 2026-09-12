import type { CSSProperties } from 'react'
import { UsualSpecialistsOpening } from './usual-specialists/UsualSpecialistsOpening'
import { IndexChapter } from './usual-specialists/IndexChapter'
import { SilkChapter } from './usual-specialists/SilkChapter'
import { SpecialistsJourneyRope } from './usual-specialists/SpecialistsJourneyRope'
import {
  JourneyRopePlacement,
  OpeningComposition,
  SpecialistsCanvas,
  SpecialistsStory,
} from './usual-specialists/UsualSpecialistsPage.styles'

type UsualSpecialistsPageProps = {
  style?: CSSProperties
}

export const UsualSpecialistsPage = ({ style }: UsualSpecialistsPageProps) => {
  return (
    <SpecialistsStory aria-label="The Usual Specialists" data-visual-contract="patch-usual-specialists-index-draft" style={style}>
      <SpecialistsCanvas data-specialists-canvas="authored">
        <div data-specialists-index-milestone>
          <OpeningComposition>
            <UsualSpecialistsOpening />
            <JourneyRopePlacement>
              <SpecialistsJourneyRope />
            </JourneyRopePlacement>
          </OpeningComposition>
          <IndexChapter />
        </div>
        <SilkChapter />
      </SpecialistsCanvas>
    </SpecialistsStory>
  )
}
