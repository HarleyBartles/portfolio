import type { CSSProperties } from 'react'
import { UsualSpecialistsOpening } from './usual-specialists/UsualSpecialistsOpening'
import { IndexChapter } from './usual-specialists/IndexChapter'
import { SilkChapter } from './usual-specialists/SilkChapter'
import { CrossSectionConnector } from './usual-specialists/CrossSectionConnector'
import { SpecialistsChapterNav } from './usual-specialists/SpecialistsChapterNav'
import {
  IndexMilestoneBoundary,
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
        <IndexMilestoneBoundary data-specialists-index-milestone>
          <OpeningComposition>
            <UsualSpecialistsOpening />
          </OpeningComposition>
          <SpecialistsChapterNav />
          <CrossSectionConnector crossing="opening-index" />
          <IndexChapter />
        </IndexMilestoneBoundary>
        <CrossSectionConnector crossing="index-silk" />
        <SilkChapter />
      </SpecialistsCanvas>
    </SpecialistsStory>
  )
}
