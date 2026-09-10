import styled from 'styled-components'

export const EXPECTED_WIREFRAME_ROPE_PATH = 'M 115 0 C 122 350 140 700 160 1000 C 175 1350 205 1700 225 2000 C 232 2250 235 2600 236 3000 C 237 3130 292 3215 308 3150 C 321 3098 276 3062 252 3102 C 235 3130 248 3174 273 3178'

const RopeClip = styled.div`
  position: absolute;
  inset: 0;
  z-index: 8;
  overflow: visible;
  pointer-events: none;
`

const RopeAnchor = styled.span`
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

const JourneyRope = styled.svg`
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

export function SpecialistsJourneyRope() {
  return (
    <RopeClip aria-hidden="true" data-temporary-wireframe-rope="true">
      <RopeAnchor />
      <JourneyRope viewBox="0 0 1000 3300" preserveAspectRatio="none">
        <path d={EXPECTED_WIREFRAME_ROPE_PATH} />
      </JourneyRope>
    </RopeClip>
  )
}
