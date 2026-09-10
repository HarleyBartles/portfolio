import styled from 'styled-components'

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
  background: var(--specialists-paper);
`

export const RopeClip = styled.div`
  position: absolute;
  inset: 0;
  z-index: 8;
  overflow: visible;
  pointer-events: none;
`

export const RopeAnchor = styled.span`
  position: absolute;
  z-index: 9;
  top: 8.5%;
  left: 11%;
  width: 30px;
  height: 30px;
  border: 7px solid #5f5850;
  border-radius: 50%;
  background: #80776b;
  box-shadow: 0 3px 0 rgb(0 0 0 / 20%);

  @media (max-width: 620px) {
    left: 8%;
  }
`

export const JourneyRope = styled.svg`
  position: absolute;
  z-index: 8;
  top: calc(8.5% + 27px);
  left: 0;
  width: 100%;
  height: 3300px;
  overflow: visible;
  pointer-events: none;

  path {
    fill: none;
    stroke: var(--specialists-rope);
    stroke-width: 9px;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(3px 0 3px rgb(0 0 0 / 18%));
  }

  @media (max-width: 620px) {
    left: -18vw;
    width: 226vw;
  }
`
