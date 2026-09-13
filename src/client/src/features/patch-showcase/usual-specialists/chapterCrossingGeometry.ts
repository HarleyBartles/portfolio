import { css } from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export type ChapterCrossingId = 'opening-index' | 'index-silk'

type ChapterCrossingPortState = 'default' | 'wideBand' | 'mid' | 'compactLandscape' | 'narrow'

export const CHAPTER_CROSSING_HEIGHT = 56

export const CHAPTER_CROSSING_PORTS = {
  'opening-index': {
    default: '11%',
    wideBand: '159px',
    compactLandscape: '8%',
    narrow: '8%',
  },
  'index-silk': {
    default: '22.1358%',
    wideBand: '320px',
    mid: '20.9075%',
    compactLandscape: '4.7144%',
    narrow: '4.516%',
  },
} as const

export const chapterCrossingPort = (crossing: ChapterCrossingId, state: ChapterCrossingPortState): string => {
  const geometry = CHAPTER_CROSSING_PORTS[crossing]
  if (state in geometry) return geometry[state as keyof typeof geometry]
  return geometry.default
}

export const chapterCrossingPortCss = (crossing: ChapterCrossingId) => css`
  left: ${chapterCrossingPort(crossing, 'default')};

  @media ${specialistsMedia.wideBand} {
    left: ${chapterCrossingPort(crossing, 'wideBand')};
  }

  @media ${specialistsMedia.atMostMid} {
    left: ${chapterCrossingPort(crossing, 'mid')};
  }

  @media ${specialistsMedia.compactLandscape} {
    left: ${chapterCrossingPort(crossing, 'compactLandscape')};
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: ${chapterCrossingPort(crossing, 'narrow')};
  }
`
