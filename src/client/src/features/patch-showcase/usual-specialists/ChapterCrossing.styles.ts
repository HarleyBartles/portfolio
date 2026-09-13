import styled from 'styled-components'
import {
  CHAPTER_CROSSING_HEIGHT,
  chapterCrossingPort,
  type ChapterCrossingId,
} from './chapterCrossingGeometry'
import { specialistsMedia } from './specialistsResponsive'

export const Crossing = styled.div<{ $crossing: ChapterCrossingId }>`
  position: relative;
  height: ${CHAPTER_CROSSING_HEIGHT}px;
  background: var(--color-interior-canvas);
  pointer-events: none;
`

export const CrossingRule = styled.hr`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(32 35 31 / 30%);
`

export const CrossingAnchor = styled.span<{ $crossing: ChapterCrossingId }>`
  position: absolute;
  z-index: 50;
  top: 100%;
  left: ${({ $crossing }) => chapterCrossingPort($crossing, 'default')};
  width: 30px;
  height: 30px;
  border: 7px solid #5f5850;
  border-radius: 50%;
  background: #80776b;
  box-shadow: 0 3px 0 rgb(0 0 0 / 20%);
  transform: translate(-50%, -50%);

  @media ${specialistsMedia.wideBand} {
    display: ${({ $crossing }) => $crossing === 'index-silk' ? 'none' : 'block'};
    left: ${({ $crossing }) => chapterCrossingPort($crossing, 'wideBand')};
  }

  @media ${specialistsMedia.atMostMid} {
    left: ${({ $crossing }) => chapterCrossingPort($crossing, 'mid')};
  }

  @media ${specialistsMedia.compactLandscape} {
    left: ${({ $crossing }) => chapterCrossingPort($crossing, 'compactLandscape')};
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: ${({ $crossing }) => chapterCrossingPort($crossing, 'narrow')};
  }
`
