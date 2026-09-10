import styled, { css } from 'styled-components'

const traversalBase = css`
  position: absolute;
  z-index: 10;
  display: block;
  height: auto;
  pointer-events: none;
  user-select: none;
`

export const Chapter = styled.section`
  position: relative;
  padding-top: 112px;
  padding-bottom: clamp(74px, 10vw, 132px);
`

export const ChapterNumber = styled.span`
  position: absolute;
  top: 34px;
  left: var(--specialists-gutter);
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 800;
  line-height: .8;
  opacity: .06;
  pointer-events: none;
  user-select: none;
`

export const Stage = styled.div`
  position: relative;
  min-height: 980px;
  --index-03-pair-footline-drop: 12px;
  --index-03-left: calc(50% - 430px);
  --index-03-top: 590px;
  --index-03-width: 560px;
  --index-04-left: calc(50% + 80px);
  --index-04-top: 675px;
  --index-04-width: 600px;
  --index-note-left: calc(50% + 20px);
  --index-note-top: 765px;
  --index-note-width: 220px;

  @media (min-width: 1401px) {
    --index-03-left: clamp(270px, calc(5vw + 200px), 328px);
    --index-04-left: clamp(780px, calc(7vw + 682px), 861px);
    --index-note-left: clamp(720px, calc(15vw + 510px), 894px);
  }

  @media (max-width: 1399px) {
    --index-03-left: calc(50% - 390px);
    --index-03-top: 590px;
    --index-03-width: 530px;
    --index-04-left: calc(50% - 10px);
    --index-04-top: 810px;
    --index-04-width: 460px;
    --index-note-left: calc(50% - 40px);
    --index-note-top: 770px;
    --index-note-width: 220px;
  }

  @media (max-width: 900px) {
    --index-03-left: 40px;
    --index-03-top: 590px;
    --index-03-width: 520px;
    --index-04-left: 310px;
    --index-04-top: 840px;
    --index-04-width: 400px;
    --index-note-left: 320px;
    --index-note-top: 790px;
    --index-note-width: 172px;
    min-height: calc(var(--index-04-top) + 279px);
  }

  @media (max-width: 720px) {
    --index-mobile-traversal-lift: 19%;
    --index-03-left: -40px;
    --index-03-top: 718px;
    --index-03-width: 660px;
    --index-04-left: 60px;
    --index-04-top: 1040px;
    --index-04-width: 330px;
    --index-note-left: 240px;
    --index-note-top: 990px;
    --index-note-width: 150px;
    min-height: calc(var(--index-04-top) + 255px);
  }

  @media (max-width: 390px) {
    --index-03-left: -110px;
    --index-03-top: 718px;
    --index-03-width: 500px;
    --index-04-left: 40px;
    --index-04-top: 960px;
    --index-04-width: 280px;
    --index-note-left: 190px;
    --index-note-top: 908px;
    --index-note-width: 124px;
  }
`

export const MainDocument = styled.div`
  position: absolute;
  top: 0;
  left: max(var(--specialists-gutter), calc((100vw - 1160px) / 2 - 70px));
  right: calc(-1 * var(--index-main-overhang));
  min-height: clamp(640px, 44vw, 780px);
  --index-main-overhang: 3vw;
  --index-main-left: 0px;

  @media (min-width: 1401px) {
    --index-main-left: clamp(50px, calc(25vw - 300px), 180px);
    left: var(--index-main-left);
    right: -42px;
  }

  @media (min-width: 1921px) {
    --index-main-left: clamp(180px, calc(12vw - 50.4px), 257px);
    left: var(--index-main-left);
  }

  @media (max-width: 720px) {
    --index-main-overhang: 12vw;
    left: 0;
    min-height: 700px;
  }
`

export const MainDocumentArt = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const StoryCard = styled.div`
  position: absolute;
  z-index: 13;
  right: calc(var(--index-main-overhang) + var(--specialists-gutter));
  bottom: 30px;
  width: min(35rem, 44%);
  max-width: calc(100vw - (var(--specialists-gutter) * 2));
  padding: 22px 24px;
  border: 1px solid rgb(32 35 31 / 52%);
  background: rgb(242 236 223 / 94%);
  box-shadow: 9px 11px 0 rgb(0 0 0 / 9%);
  anchor-name: --index-story-card;

  p {
    margin: 0;
  }

  @media (min-width: 1401px) {
    left: calc(clamp(801px, calc(12vw + 633px), 940px) - var(--index-main-left));
    right: auto;
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 720px) {
    bottom: 24px;
    width: 330px;
    margin: 0;
  }

  @media (max-width: 390px) {
    width: 260px;
  }
`

export const BlueCarrier = styled.div`
  position: absolute;
  z-index: 9;
  top: 232px;
  left: 44px;
  width: 620px;
  aspect-ratio: 3 / 2;
  transform: rotate(-7deg);
  transform-origin: center;

  @media (min-width: 1401px) {
    left: clamp(44px, calc(25vw - 306px), 174px);
  }

  @media (min-width: 1921px) {
    left: clamp(174px, calc(12vw - 56.4px), 251px);
  }

  @media (max-width: 900px) {
    left: -6px;
    width: 540px;
  }

  @media (max-width: 720px) {
    top: 250px;
    left: -70px;
    width: 520px;
  }

  @media (max-width: 390px) {
    left: -78px;
    width: 450px;
  }
`

export const BlueCarrierArt = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotate(-5deg);
  transform-origin: center;
`

export const IndexLockup = styled.div`
  position: absolute;
  z-index: 12;
  top: 78px;
  right: 42px;
  width: 17.83rem;
  color: var(--specialists-index-ink);
  font-family: "Courier New", monospace;
  text-align: right;
  transform: rotate(-1deg);

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  span {
    display: block;
    width: 100%;
    margin-top: 7px;
    color: var(--specialists-index-ink);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: .01em;
    text-align: center;
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    top: 60px;
    right: 30px;
    width: 12.88rem;

    span {
      font-size: .72rem;
    }
  }

  @media (max-width: 720px) {
    top: 72px;
    right: max(48px, calc(466px - 100vw));
    width: 11.89rem;

    span {
      font-size: .67rem;
    }
  }

  @media (max-width: 390px) {
    top: 68px;
    right: max(42px, calc(388px - 100vw));
    width: 10.57rem;

    span {
      font-size: .59rem;
    }
  }
`

export const GraphPaper = styled.div`
  position: absolute;
  z-index: 9;
  top: 445px;
  left: 100px;
  width: 570px;
  aspect-ratio: 3 / 2;
  transform: rotate(2deg);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 900px) {
    left: 18px;
    width: 540px;
  }

  @media (max-width: 720px) {
    top: anchor(--index-story-card top);
    left: -18px;
    width: 520px;
  }

  @media (max-width: 390px) {
    left: -42px;
    width: 460px;
  }
`

export const Commission03 = styled.div`
  position: absolute;
  z-index: 11;
  top: var(--index-03-top);
  left: var(--index-03-left);
  width: var(--index-03-width);
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Commission04 = styled.div`
  position: absolute;
  z-index: 11;
  top: var(--index-04-top);
  left: var(--index-04-left);
  width: var(--index-04-width);
  min-height: 255px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 255px;
    object-fit: cover;
  }
`

export const AssentNote = styled.div`
  position: absolute;
  z-index: 12;
  top: var(--index-note-top);
  left: var(--index-note-left);
  width: var(--index-note-width);
  aspect-ratio: 1373 / 1145;
  transform: rotate(-5deg);

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const AssentCopy = styled.span`
  position: absolute;
  inset: 21% 16% 16%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: var(--specialists-index-ink);
  font-family: "Segoe Print", "Bradley Hand", cursive;
  line-height: .98;
  text-shadow: 0 .2px 0 rgb(23 54 77 / 30%);
  transform: rotate(-6deg) translate(18%, -5%);

  span {
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
  }

  span:first-child {
    transform: rotate(1.5deg);
  }

  span:nth-child(2) {
    margin-top: -.04em;
    margin-left: 2.65em;
    transform: rotate(-2deg);
  }

  strong {
    margin-top: .42em;
    margin-left: .35em;
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    transform: rotate(.8deg);
  }

  @media (max-width: 900px) {
    span {
      font-size: 1rem;
    }

    strong {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 720px) {
    span {
      font-size: .9rem;
    }

    strong {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 390px) {
    span {
      font-size: .7rem;
    }
  }
`

export const IndexWalk = styled.img`
  ${traversalBase}
  top: 17%;
  right: 18%;
  width: 94px;

  @media (min-width: 1401px) {
    right: auto;
    left: 1047px;
  }

  @media (max-width: 900px) {
    top: 25%;
    right: 18%;
    width: 88px;
    transform: translateY(clamp(0px, calc(350px - 38.8889vw), 70px));
  }

  @media (max-width: 720px) {
    display: none;
  }
`

export const PatchFollow = styled.img`
  ${traversalBase}
  top: 34%;
  right: -1%;
  width: 100px;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media (max-width: 900px) {
    width: 94px;
  }

  @media (max-width: 720px) {
    top: calc(33% - var(--index-mobile-traversal-lift));
    right: auto;
    left: 26%;
    width: 82px;
  }

  @media (max-width: 390px) {
    left: 29%;
  }
`

export const IndexInspect = styled.img`
  ${traversalBase}
  top: calc(var(--index-03-top) - 131px + var(--index-03-pair-footline-drop));
  left: calc(var(--index-03-left) + 108px);
  width: 102px;

  @media (max-width: 900px) {
    width: 96px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

export const PatchPeer = styled.img`
  ${traversalBase}
  top: calc(var(--index-03-top) - 156px + var(--index-03-pair-footline-drop));
  left: var(--index-03-left);
  width: 104px;

  @media (max-width: 900px) {
    top: calc(var(--index-03-top) - 147px + var(--index-03-pair-footline-drop));
    width: 98px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

export const IndexCross = styled.img`
  ${traversalBase}
  display: none;
  transform: rotate(7deg);
  transform-origin: 50% 100%;

  @media (max-width: 720px) {
    display: block;
    top: calc(0px - var(--index-mobile-traversal-lift));
    left: 73%;
    width: 74px;
  }

  @media (max-width: 390px) {
    top: calc(0px - var(--index-mobile-traversal-lift) - 10px);
    left: 64%;
  }
`

export const IndexReturn = styled.img`
  ${traversalBase}
  display: none;

  @media (min-width: 1600px) {
    display: block;
    top: 50%;
    left: clamp(1240px, 78%, 1780px);
    width: 96px;
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }
`

export const PatchReturn = styled.img`
  ${traversalBase}
  display: none;

  @media (min-width: 1600px) {
    z-index: 9;
    display: block;
    top: 55%;
    left: calc(clamp(1240px, 78%, 1780px) + 95px);
    width: 100px;
    transform: scaleX(-1);
    transform-origin: 50% 100%;
  }
`
