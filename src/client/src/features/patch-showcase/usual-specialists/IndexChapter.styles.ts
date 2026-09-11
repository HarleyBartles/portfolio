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

export const GraphPaperPlacement = styled.div`
  position: absolute;
  z-index: 9;
  top: 445px;
  left: 100px;
  width: 570px;
  transform: rotate(2deg);

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

export const ObservationPlacement = styled.div`
  position: absolute;
  top: var(--index-03-top);
  left: var(--index-03-left);
  width: var(--index-03-width);
`

export const MacguffinPlacement = styled.div`
  position: absolute;
  z-index: 11;
  top: var(--index-04-top);
  left: var(--index-04-left);
  width: var(--index-04-width);
`

export const AssentNotePlacement = styled.div`
  position: absolute;
  z-index: 12;
  top: var(--index-note-top);
  left: var(--index-note-left);
  width: var(--index-note-width);
  transform: rotate(-5deg);
`
