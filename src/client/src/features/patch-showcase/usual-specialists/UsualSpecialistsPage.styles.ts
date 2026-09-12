import styled from 'styled-components'
import { SPECIALISTS_WIDTHS } from './specialistsResponsive'

export const SpecialistsStory = styled.article`
  --specialists-paper: #f2ecdf;
  --specialists-ink: #20231f;
  --specialists-rope: #aa302d;
  --specialists-index-ink: #17364d;
  --specialists-gutter: clamp(18px, 3vw, 38px);
  --specialists-max: 1400px;
  position: relative;
  overflow: clip;
  color: var(--specialists-ink);
  background: var(--color-interior-canvas);
`

export const SpecialistsCanvas = styled.div`
  width: min(100%, ${SPECIALISTS_WIDTHS.ceiling}px);
  margin-inline: auto;
  position: relative;
`
