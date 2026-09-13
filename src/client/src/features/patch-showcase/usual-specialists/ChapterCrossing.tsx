import type { CSSProperties, ReactElement } from 'react'
import type { ChapterCrossingId } from './chapterCrossingGeometry'
import { IndexSilkCrossingLock } from './IndexSilkCrossingLock'
import {
  Crossing,
  CrossingAnchor,
  CrossingRule,
} from './ChapterCrossing.styles'

type ChapterCrossingProps = {
  crossing: ChapterCrossingId
  style?: CSSProperties
}

export const ChapterCrossing = ({ crossing, style }: ChapterCrossingProps): ReactElement => (
  <Crossing $crossing={crossing} data-specialists-chapter-crossing={crossing} style={style}>
    <CrossingRule data-specialists-crossing-rule />
    {crossing === 'index-silk' ? <IndexSilkCrossingLock /> : null}
    <CrossingAnchor
      $crossing={crossing}
      aria-hidden="true"
      data-specialists-crossing-anchor={crossing}
    />
  </Crossing>
)
