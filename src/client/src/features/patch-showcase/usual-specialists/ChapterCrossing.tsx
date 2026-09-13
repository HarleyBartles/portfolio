import type { CSSProperties, ReactElement } from 'react'
import { CrossingAnchor } from './ChapterCrossing.styles'
import { CrossingRule, CrossingSurface } from './ChapterCrossingSurface.styles'

type ChapterCrossingProps = {
  crossing: 'opening-index'
  style?: CSSProperties
}

export const ChapterCrossing = ({ crossing, style }: ChapterCrossingProps): ReactElement => (
  <CrossingSurface data-specialists-chapter-crossing={crossing} style={style}>
    <CrossingRule data-specialists-crossing-rule />
    <CrossingAnchor
      aria-hidden="true"
      data-specialists-crossing-anchor={crossing}
    />
  </CrossingSurface>
)
