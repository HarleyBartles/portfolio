import styled from 'styled-components'

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

  @media (max-width: 900px) {
    min-height: 1119px;
  }

  @media (max-width: 720px) {
    min-height: 1295px;
  }

  @media (max-width: 390px) {
    min-height: 1215px;
  }
`

export const DeskComposition = styled.div`
  position: relative;
  height: clamp(640px, 44vw, 780px);

  @media (max-width: 720px) {
    height: 700px;
  }
`

export const MainDocumentPlacement = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: max(var(--specialists-gutter), calc((100vw - 1160px) / 2 - 70px));
  right: -3vw;

  @media (min-width: 1401px) {
    left: clamp(50px, calc(25vw - 300px), 180px);
    right: -42px;
  }

  @media (min-width: 1921px) {
    left: clamp(180px, calc(12vw - 50.4px), 257px);
  }

  @media (max-width: 720px) {
    left: 0;
    right: -12vw;
  }
`

export const BlueCarrierPlacement = styled.div`
  position: absolute;
  z-index: 8;
  top: 232px;
  left: 44px;
  width: 620px;
  transform: rotate(-7deg);
  transform-origin: center;

  @media (min-width: 1401px) {
    left: clamp(44px, calc(25vw - 306px), 174px);
  }

  @media (min-width: 1921px) {
    left: clamp(70px, calc(28.3vw - 474px), 174px);
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

export const GraphPaperPlacement = styled.div`
  position: absolute;
  z-index: 9;
  top: 445px;
  left: 100px;
  width: 570px;
  transform: rotate(2deg);

  @media (min-width: 1921px) {
    left: clamp(330px, calc(28.3vw - 214px), 434px);
  }

  @media (max-width: 900px) {
    left: 18px;
    width: 540px;
  }

  @media (max-width: 720px) {
    top: anchor(--index-story-card-placement top);
    left: -18px;
    width: 520px;
  }

  @media (max-width: 390px) {
    left: -42px;
    width: 460px;
  }
`

export const StoryCardPlacement = styled.div`
  position: absolute;
  z-index: 13;
  right: var(--specialists-gutter);
  bottom: 30px;
  width: min(35rem, 44%);
  max-width: calc(100vw - (var(--specialists-gutter) * 2));
  anchor-name: --index-story-card-placement;

  @media (min-width: 1401px) {
    left: clamp(801px, calc(12vw + 633px), 940px);
    right: auto;
  }

  @media (min-width: 1921px) {
    left: calc(92vw - 428px);
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 720px) {
    right: var(--specialists-gutter);
    bottom: 24px;
    width: 330px;
  }

  @media (max-width: 390px) {
    width: 260px;
  }
`

export const CommissionCompositionPlacement = styled.div`
  position: absolute;
  z-index: 10;
  top: 590px;
  left: calc(50% - 430px);

  @media (min-width: 1401px) {
    left: clamp(270px, calc(5vw + 200px), 328px);
  }

  @media (min-width: 1921px) {
    left: calc(50vw - 96px);
  }

  @media (max-width: 1399px) {
    left: calc(50% - 390px);
  }

  @media (max-width: 900px) {
    left: 40px;
  }

  @media (max-width: 720px) {
    top: 718px;
    left: -40px;
  }

  @media (max-width: 390px) {
    left: -110px;
  }
`
