import styled from 'styled-components'
import { chapterCrossingPort } from './chapterCrossingGeometry'
import { specialistsMedia } from './specialistsResponsive'

export const CrossingAnchor = styled.span`
  position: absolute;
  z-index: 50;
  top: 100%;
  left: ${chapterCrossingPort('opening-index', 'default')};
  width: 30px;
  height: 30px;
  border: 7px solid #5f5850;
  border-radius: 50%;
  background: #80776b;
  box-shadow: 0 3px 0 rgb(0 0 0 / 20%);
  transform: translate(-50%, -50%);

  @media ${specialistsMedia.atLeastWide} {
    left: ${chapterCrossingPort('opening-index', 'wideBand')};
  }

  @media ${specialistsMedia.atMostMid} {
    left: ${chapterCrossingPort('opening-index', 'mid')};
  }

  @media ${specialistsMedia.compactLandscape} {
    left: ${chapterCrossingPort('opening-index', 'compactLandscape')};
  }

  @media ${specialistsMedia.atMostNarrow} {
    left: ${chapterCrossingPort('opening-index', 'narrow')};
  }
`
