import type { CSSProperties } from 'react'
import styled from 'styled-components'
import { UsualSpecialistsOpening } from './opening/UsualSpecialistsOpening'
import { IndexChapter } from './index/IndexChapter'
import { UnderConstructionNotice } from './under-construction/UnderConstructionNotice'


const SpecialistsStory = styled.article`
  --specialists-paper: #f2ecdf;
  --specialists-index-paper: var(--specialists-paper);
  --specialists-ink: #20231f;
  --specialists-index-ink: #17364d;
  --specialists-gutter: clamp(18px, 3vw, 38px);
  --specialists-max: 1400px;
  position: relative;
  overflow: clip;
  color: var(--specialists-ink);
  background: var(--color-interior-canvas);
`

const SpecialistsCanvas = styled.div`
  width: min(100%, 2560px);
  margin-inline: auto;
  position: relative;
`

const OpeningComposition = styled.div`
  position: relative;
`

const ConstructionPlacement = styled.div`
  border-top: 1px solid rgb(32 35 31 / 35%);
`

type UsualSpecialistsPageProps = {
  style?: CSSProperties
}

export const UsualSpecialistsPage = ({ style }: UsualSpecialistsPageProps) => {
  return (
    <SpecialistsStory aria-label="The Usual Specialists" data-visual-contract="patch-usual-specialists-index-draft" style={style}>
      <SpecialistsCanvas data-specialists-canvas="authored">
        <OpeningComposition>
          <UsualSpecialistsOpening />
        </OpeningComposition>
        <IndexChapter />
        <ConstructionPlacement data-specialists-chapter-divider>
          <UnderConstructionNotice />
        </ConstructionPlacement>
      </SpecialistsCanvas>
    </SpecialistsStory>
  )
}
