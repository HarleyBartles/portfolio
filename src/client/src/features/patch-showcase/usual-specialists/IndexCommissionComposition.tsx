import type { CSSProperties, ReactElement } from 'react'
import { IndexAssentNote } from './IndexAssentNote'
import {
  AssentNotePlacement,
  Composition,
  MacguffinPlacement,
  ObservationPlacement,
} from './IndexCommissionComposition.styles'
import { IndexMacguffin } from './IndexMacguffin'
import { IndexObservation } from './IndexObservation'

type IndexCommissionCompositionProps = {
  style?: CSSProperties
}

export const IndexCommissionComposition = ({ style }: IndexCommissionCompositionProps): ReactElement => {
  return (
    <Composition data-index-commission-composition="commission-evidence" style={style}>
      <ObservationPlacement>
        <IndexObservation />
      </ObservationPlacement>
      <AssentNotePlacement>
        <IndexAssentNote />
      </AssentNotePlacement>
      <MacguffinPlacement>
        <IndexMacguffin />
      </MacguffinPlacement>
    </Composition>
  )
}
