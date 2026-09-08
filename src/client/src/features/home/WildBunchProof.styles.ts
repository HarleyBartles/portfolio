import styled, { css } from 'styled-components'

const wireArrow = css`
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 0;
    width: var(--arrow-head);
    height: var(--arrow-span);
    background: currentColor;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    transform: translateY(calc(-50% - var(--wire-stroke) / 2));
  }
`

export const ProofFigure = styled.figure`
  --event-border: .16cqw;
  --wire-stroke: .22cqw;
  --node-size: .72cqw;
  --sweep-head: 1.1cqw;
  --sweep-span: 1.25cqw;
  --arrow-head: .62cqw;
  --arrow-span: .72cqw;
  --wild-cache-texture: none;
  --wild-replay-texture: none;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  aspect-ratio: 8 / 5;
  border: 0;
  overflow: visible;
  background: var(--mineral);
  color: #172127;
  container-type: inline-size;
  font-family: var(--mono);

  h3,
  p,
  ol,
  ul {
    margin: 0;
  }

  h3 {
    font-family: var(--mono);
  }

  @media (min-width: 721px) and (max-width: 900px) {
    aspect-ratio: 7 / 6;
  }

  @media (max-width: 720px) {
    aspect-ratio: 9 / 24;
  }
`

export const VisuallyHiddenCaption = styled.figcaption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`

export const ProofHistory = styled.section`
  position: absolute;
  left: 4%;
  top: 8%;
  width: 19%;
  height: 52%;

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 5%;
    width: 25%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 5%;
    top: 5%;
    width: 47%;
    height: 40%;
  }

  @media (max-width: 720px) {
    left: 5%;
    top: 3%;
    width: 76%;
    height: 42%;
  }
`

export const EventList = styled.ol`
  position: absolute;
  inset: 9% 0 0;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 1cqw;
  padding: 0;
  list-style: none;

  @media (min-width: 721px) and (max-width: 900px) {
    inset: 10% 0 0;
    gap: .8cqw;
  }

  @media (max-width: 720px) {
    inset: 8% 0 2%;
    gap: 1.5cqw;
  }
`

export const EventItem = styled.li`
  --event-border: .16cqw;
  position: relative;
  display: grid;
  align-content: center;
  gap: .3cqw;
  padding: .62cqw .9cqw;
  border: var(--event-border) solid #8b969a;
  background: #f3f5f5;
  color: #172127;

  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(6) {
    background: #e9edef;
  }

  @media (max-width: 720px) {
    --event-border: .4cqw;
    gap: .65cqw;
    padding: 1.4cqw 1.8cqw;
    border-width: var(--event-border);
  }
`

export const EventMeta = styled.span`
  color: #536168;
  font-size: clamp(10px, .82cqw, 14px);
  line-height: 1;
  letter-spacing: .035em;

  @media (min-width: 721px) and (max-width: 900px) {
    font-size: clamp(10px, 1.2cqw, 13px);
  }

  @media (max-width: 720px) {
    font-size: clamp(10px, 2.25cqw, 14px);
  }
`

export const EventName = styled.strong`
  font-size: clamp(13px, 1.16cqw, 19px);
  line-height: 1;
  font-weight: 700;

  @media (min-width: 721px) and (max-width: 900px) {
    font-size: clamp(13px, 1.65cqw, 18px);
  }

  @media (max-width: 720px) {
    font-size: clamp(13px, 3.05cqw, 20px);
  }
`

export const HistoryRead = styled.span`
  --node-size: .72cqw;
  --wire-stroke: .23cqw;
  position: absolute;
  right: 100%;
  top: 50%;
  width: 3.5cqw;
  border-top: var(--wire-stroke) solid #48545a;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: var(--node-size);
    height: var(--node-size);
    background: #48545a;
    transform: translate(-50%, calc(-50% - var(--wire-stroke) / 2));
  }

  @media (min-width: 721px) and (max-width: 900px) {
    width: 2.5cqw;
  }

  @media (max-width: 720px) {
    --node-size: 1.6cqw;
    --wire-stroke: .55cqw;
    width: 3cqw;
    border-top-width: var(--wire-stroke);
  }
`

export const HistorySweep = styled.span`
  --sweep-head: 1.1cqw;
  --sweep-span: 1.25cqw;
  --wire-stroke: .55cqw;
  position: absolute;
  left: .5%;
  top: 12%;
  width: calc(25.5cqw - var(--sweep-head));
  height: 62%;
  border-left: var(--wire-stroke) solid #292d2d;
  border-bottom: var(--wire-stroke) solid #292d2d;
  border-radius: 0 0 0 2.2cqw;

  &::after {
    content: "";
    position: absolute;
    left: 100%;
    bottom: 0;
    width: var(--sweep-head);
    height: var(--sweep-span);
    background: #292d2d;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    transform: translateY(calc(50% + var(--wire-stroke) / 2));
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 3.5%;
    width: calc(31.5cqw - var(--sweep-head));
  }

  @media (min-width: 721px) and (max-width: 900px) {
    --sweep-head: 1cqw;
    --sweep-span: 1.15cqw;
    left: 2.5%;
    top: 9%;
    width: calc(55.5cqw - var(--sweep-head));
    height: 50%;
  }

  @media (max-width: 720px) {
    --sweep-head: 1.4cqw;
    --sweep-span: 1.65cqw;
    --wire-stroke: 1.15cqw;
    left: 2%;
    top: 7%;
    width: calc(3cqw - var(--sweep-head));
    height: 49%;
    border-left-width: var(--wire-stroke);
    border-bottom-width: var(--wire-stroke);
    border-radius: 0 0 0 4cqw;
  }
`

const Wire = styled.span`
  --arrow-head: .62cqw;
  --arrow-span: .72cqw;
  --wire-stroke: .22cqw;
  position: absolute;
  z-index: 2;
  height: 0;
  border-top: var(--wire-stroke) solid currentColor;
  transform-origin: left center;
  ${wireArrow}

  @media (max-width: 720px) {
    --arrow-head: 1.05cqw;
    --arrow-span: 1.2cqw;
    --wire-stroke: .48cqw;
    border-top-width: var(--wire-stroke);
  }
`

const narrowWireGeometry = [
  css`width: 2cqw; height: 106cqw;`,
  css`width: 4.4cqw; height: 88.93cqw;`,
  css`width: 6.8cqw; height: 71.87cqw;`,
  css`width: 9.2cqw; height: 54.8cqw;`,
  css`width: 11.6cqw; height: 37.73cqw;`,
  css`width: 14cqw; height: 20.67cqw;`,
]

export const LiveWire = styled(Wire)<{ $index: number }>`
  left: calc(100% + var(--event-border));
  top: 50%;
  z-index: 4;
  width: calc(3cqw - var(--event-border));
  color: #657177;

  @media (min-width: 901px) and (max-width: 1279px) {
    width: calc(5cqw - var(--event-border));
  }

  @media (min-width: 721px) and (max-width: 900px) {
    width: calc(6cqw - var(--event-border));
    transform: none;
  }

  @media (max-width: 720px) {
    left: calc(100% + var(--event-border));
    top: 50%;
    color: #657177;
    border-right: var(--wire-stroke) solid currentColor;
    transform: none;
    ${({ $index }) => narrowWireGeometry[$index - 1]}

    &::after {
      left: 100%;
      top: 100%;
      width: var(--arrow-span);
      height: var(--arrow-head);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      transform: translate(calc(-50% + var(--wire-stroke) / 2), -100%);
    }
  }
`

const ProofBlock = styled.section`
  position: absolute;
  z-index: 3;
  display: grid;
  place-content: center;
  gap: 1.2cqw;
  text-align: center;

  h3 {
    font-size: clamp(19px, 2.05cqw, 30px);
    line-height: 1;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    h3 {
      font-size: clamp(20px, 2.8cqw, 28px);
    }
  }

  @media (max-width: 720px) {
    gap: 2.4cqw;

    h3 {
      font-size: clamp(20px, 5cqw, 32px);
    }
  }
`

export const ProofCache = styled(ProofBlock)`
  left: 26%;
  top: 8%;
  width: 13%;
  height: 52%;
  border: .28cqw solid #59564f;
  background-color: #d9ccb0;
  background-image: linear-gradient(rgb(244 237 218 / 72%), rgb(224 210 179 / 72%)), var(--wild-cache-texture);
  background-size: auto, cover;
  background-position: center;

  .media-off & {
    background-image: none;
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 35%;
    width: 14%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 58%;
    top: 5%;
    width: 34%;
    height: 40%;
  }

  @media (max-width: 720px) {
    left: 55%;
    top: 49%;
    width: 40%;
    height: 15%;
    border-width: .7cqw;
  }
`

export const ProofReplay = styled(ProofBlock)`
  left: 26%;
  top: 64%;
  width: 13%;
  height: 22%;
  border: .28cqw solid #171b1c;
  background-color: #282a29;
  background-image: linear-gradient(rgb(34 36 35 / 28%), rgb(22 24 23 / 44%)), var(--wild-replay-texture);
  background-size: auto, cover;
  background-position: center;
  color: #f4f0e8;

  .media-off & {
    background-image: none;
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 35%;
    width: 14%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 58%;
    top: 49%;
    width: 26%;
    height: 18%;
  }

  @media (max-width: 720px) {
    left: 5%;
    top: 49%;
    width: 40%;
    height: 15%;
    border-width: .7cqw;
  }
`

export const ReplayCacheFlow = styled(Wire)`
  --arrow-head: .8cqw;
  --arrow-span: .95cqw;
  --wire-stroke: .4cqw;
  left: 32.5%;
  top: 60%;
  z-index: 4;
  width: 0;
  height: 4%;
  color: #292d2d;
  border-top: 0;
  border-left: var(--wire-stroke) solid currentColor;
  transform: none;

  &::after {
    left: 0;
    top: 0;
    width: var(--arrow-span);
    height: var(--arrow-head);
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    transform: translateX(calc(-50% - var(--wire-stroke) / 2));
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 42%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 71%;
    top: 45%;
  }

  @media (max-width: 720px) {
    --arrow-head: 1.35cqw;
    --arrow-span: 1.55cqw;
    --wire-stroke: .8cqw;
    left: 45%;
    top: 56.5%;
    width: calc(10cqw - var(--arrow-head));
    height: 0;
    border-top: var(--wire-stroke) solid currentColor;
    border-left: 0;

    &::after {
      left: 100%;
      top: 0;
      width: var(--arrow-head);
      height: var(--arrow-span);
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      transform: translateY(calc(-50% - var(--wire-stroke) / 2));
    }
  }
`

export const CacheStateFlow = styled(Wire)`
  --arrow-head: .8cqw;
  --arrow-span: .95cqw;
  --wire-stroke: .4cqw;
  left: 39%;
  top: 35%;
  width: calc(1cqw - var(--arrow-head));
  color: #4e4b46;
  border-top-width: var(--wire-stroke);

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 49%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 90%;
    top: 45%;
    width: 0;
    height: 25%;
    border-top: 0;
    border-left: var(--wire-stroke) solid currentColor;
    transform: none;

    &::after {
      left: 0;
      top: auto;
      bottom: 0;
      width: var(--arrow-span);
      height: var(--arrow-head);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      transform: translateX(calc(-50% - var(--wire-stroke) / 2));
    }
  }

  @media (max-width: 720px) {
    --arrow-head: 1.35cqw;
    --arrow-span: 1.55cqw;
    --wire-stroke: .8cqw;
    left: 75%;
    top: 64%;
    width: calc(10.7cqw - var(--arrow-head));
    height: 0;
    border-top: var(--wire-stroke) solid currentColor;
    border-left: 0;
    transform: rotate(90deg);
  }
`

export const StateTexture = styled.picture`
  position: absolute;
  inset: 0;
  opacity: .94;
  mask-image: linear-gradient(90deg, #000 0 88%, transparent 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .media-off & {
    display: none;
  }

  @media (max-width: 900px) {
    mask-image: linear-gradient(180deg, #000 0 88%, transparent 100%);
  }
`

export const StateValue = styled.p`
  position: absolute;
  left: 7%;
  bottom: 8%;
  z-index: 1;
  display: grid;
  gap: 1.5cqw;
  max-width: 31%;
  font-size: 2.65cqw;
  text-shadow: 0 1px 3px rgb(26 22 18 / 55%);

  strong {
    font-size: 5cqw;
    white-space: nowrap;
    text-transform: uppercase;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 5%;
    bottom: 10%;
    max-width: 28%;
    gap: .7cqw;
    font-size: clamp(12px, 1.65cqw, 16px);

    strong {
      font-size: clamp(17px, 2.7cqw, 24px);
    }
  }

  @media (max-width: 720px) {
    left: 5%;
    top: 27%;
    bottom: auto;
    gap: 1cqw;
    font-size: clamp(11px, 3.2cqw, 18px);

    strong {
      font-size: clamp(14px, 4cqw, 22px);
    }
  }
`

export const StateNodes = styled.ul`
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 0;
  list-style: none;
`

function baseStatePosition(index: number) {
  switch (index) {
    case 0: return css`left: 12%; top: 27%;`
    case 1: return css`left: 12%; top: 44%; opacity: .96;`
    case 2: return css`left: 20%; top: 59%; opacity: .9;`
    case 3: return css`left: 36%; top: 69%; opacity: .86;`
    case 4: return css`left: 58%; top: 77%; color: #eee9e1; opacity: .78; text-shadow: 0 1px 3px rgb(26 22 18 / 34%);`
    default: return css`left: 78%; top: 86%; color: #c2bcb5; opacity: .42; text-shadow: none;`
  }
}

function tabletStatePosition(index: number) {
  switch (index) {
    case 0: return css`left: 37%; top: 18%;`
    case 1: return css`left: 48%; top: 37%;`
    case 2: return css`left: 60%; top: 17%;`
    case 3: return css`left: 68%; top: 48%;`
    case 4: return css`left: 79%; top: 30%;`
    default: return css`left: 86%; top: 62%;`
  }
}

function narrowStatePosition(index: number) {
  switch (index) {
    case 0: return css`left: 72%; top: 16%;`
    case 1: return css`left: 58%; top: 33%;`
    case 2: return css`left: 76%; top: 48%;`
    case 3: return css`left: 47%; top: 58%;`
    case 4: return css`left: 65%; top: 71%;`
    default: return css`left: 37%; top: 83%;`
  }
}

export const StateNode = styled.li<{ $index: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2cqw;
  font-size: clamp(12px, 3.2cqw, 20px);
  font-weight: 650;
  letter-spacing: .05em;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgb(26 22 18 / 58%);
  ${({ $index }) => baseStatePosition($index)}

  &::before {
    content: "";
    width: 2.6cqw;
    aspect-ratio: 1;
    flex: none;
    border-radius: 50%;
    background: currentColor;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    font-size: clamp(12px, 2cqw, 18px);
    ${({ $index }) => tabletStatePosition($index)}
  }

  @media (max-width: 720px) {
    gap: 1.5cqw;
    font-size: clamp(11px, 2.8cqw, 17px);
    ${({ $index }) => narrowStatePosition($index)}

    &::before {
      width: 2.2cqw;
    }
  }
`

export const ProofState = styled.section`
  position: absolute;
  z-index: 1;
  left: 40%;
  top: 4%;
  width: 60%;
  height: 84%;
  overflow: hidden;
  border: .32cqw solid #3c403f;
  border-right: 0;
  background: linear-gradient(90deg, #675e55 0 35%, #c5beb8 67%, var(--mineral) 100%);
  color: #f7f4ed;
  container-type: inline-size;

  > h3 {
    position: absolute;
    left: 7%;
    top: 7%;
    z-index: 1;
    font-size: 7cqw;
    text-shadow: 0 1px 3px rgb(26 22 18 / 45%);
  }

  @media (min-width: 901px) and (max-width: 1279px) {
    left: 50%;
    width: 50%;
  }

  @media (min-width: 721px) and (max-width: 900px) {
    left: 5%;
    top: 70%;
    width: 90%;
    height: 28%;
    border-right: .32cqw solid #3c403f;
    border-bottom: 0;
    background: linear-gradient(180deg, #675e55 0 58%, #9c9288 76%, var(--mineral) 100%);

    > h3 {
      left: 5%;
      top: 10%;
      font-size: clamp(26px, 5cqw, 42px);
    }
  }

  @media (max-width: 720px) {
    left: 5%;
    top: 68%;
    width: 90%;
    height: 28%;
    border-width: .7cqw;
    border-bottom: 0;
    background: linear-gradient(180deg, #675e55 0 58%, #9c9288 76%, var(--mineral) 100%);

    > h3 {
      left: 5%;
      top: 7%;
      font-size: clamp(22px, 6.5cqw, 36px);
    }
  }
`
