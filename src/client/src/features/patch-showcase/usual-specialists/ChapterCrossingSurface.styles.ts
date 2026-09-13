import styled from 'styled-components'
import { CHAPTER_CROSSING_HEIGHT } from './chapterCrossingGeometry'

export const CrossingSurface = styled.div`
  position: relative;
  height: ${CHAPTER_CROSSING_HEIGHT}px;
  background: var(--color-interior-canvas);
  pointer-events: none;
`

export const CrossingRule = styled.hr`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(32 35 31 / 30%);
`
