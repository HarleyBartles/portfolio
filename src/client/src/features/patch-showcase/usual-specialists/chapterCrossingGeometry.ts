import { css } from 'styled-components'

export type ChapterCrossingId = 'opening-index'

type ChapterCrossingPortState = 'default' | 'wideBand' | 'mid' | 'compactLandscape' | 'narrow'

export const CHAPTER_CROSSING_HEIGHT = 56
const crossingMedia = {
  narrow: '(max-width: 389px)',
  compact: '(min-width: 390px) and (max-width: 719px)',
  throughMid: '(max-width: 899px)',
  wide: '(min-width: 1400px)',
} as const

export const CHAPTER_CROSSING_PORTS = {
  'opening-index': {
    default: '11%',
    wideBand: '159px',
    compactLandscape: '8%',
    narrow: '8%',
  },
} as const

export const chapterCrossingPort = (crossing: ChapterCrossingId, state: ChapterCrossingPortState): string => {
  const geometry = CHAPTER_CROSSING_PORTS[crossing]
  if (state in geometry) return geometry[state as keyof typeof geometry]
  return geometry.default
}

export const chapterCrossingPortCss = (crossing: ChapterCrossingId) => css`
  left: ${chapterCrossingPort(crossing, 'default')};

  @media ${crossingMedia.wide} {
    left: ${chapterCrossingPort(crossing, 'wideBand')};
  }

  @media ${crossingMedia.throughMid} {
    left: ${chapterCrossingPort(crossing, 'mid')};
  }

  @media ${crossingMedia.compact} {
    left: ${chapterCrossingPort(crossing, 'compactLandscape')};
  }

  @media ${crossingMedia.narrow} {
    left: ${chapterCrossingPort(crossing, 'narrow')};
  }
`
