import { UsualSpecialistsOpening } from './usual-specialists/UsualSpecialistsOpening'
import { SpecialistsStory } from './usual-specialists/UsualSpecialistsPage.styles'

export function UsualSpecialistsPage() {
  return (
    <SpecialistsStory aria-labelledby="content-page-title" data-visual-contract="patch-usual-specialists-index-draft">
      <UsualSpecialistsOpening />
    </SpecialistsStory>
  )
}
