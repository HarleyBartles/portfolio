import styled from 'styled-components'

export const Composition = styled.div`
  position: relative;
  width: 1110px;
  height: 359px;

  @media (min-width: 1401px) {
    width: calc(2vw + 1082px);
  }

  @media (min-width: 1921px) {
    width: 1065.31px;
  }

  @media (max-width: 1399px) {
    width: 840px;
    height: 475px;
  }

  @media (max-width: 900px) {
    width: 670px;
    height: 505px;
  }

  @media (max-width: 720px) {
    width: 660px;
    height: 577px;
  }

  @media (max-width: 390px) {
    width: 500px;
    height: 497px;
  }
`

export const ObservationPlacement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;

  @media (max-width: 1399px) {
    width: 530px;
  }

  @media (max-width: 900px) {
    width: 520px;
  }

  @media (max-width: 720px) {
    width: 660px;
  }

  @media (max-width: 390px) {
    width: 500px;
  }
`

export const MacguffinPlacement = styled.div`
  position: absolute;
  z-index: 11;
  top: 85px;
  left: 510px;
  width: 600px;

  @media (min-width: 1401px) {
    left: calc(2vw + 482px);
  }

  @media (min-width: 1921px) {
    left: 465.31px;
  }

  @media (max-width: 1399px) {
    top: 220px;
    left: 380px;
    width: 460px;
  }

  @media (max-width: 900px) {
    top: 250px;
    left: 270px;
    width: 400px;
  }

  @media (max-width: 720px) {
    top: 322px;
    left: 100px;
    width: 330px;
  }

  @media (max-width: 390px) {
    top: 242px;
    left: 150px;
    width: 280px;
  }
`

export const AssentNotePlacement = styled.div`
  position: absolute;
  z-index: 12;
  top: 175px;
  left: 450px;
  width: 220px;
  transform: rotate(-5deg);

  @media (min-width: 1401px) {
    left: calc(10vw + 310px);
  }

  @media (min-width: 1921px) {
    left: 402.655px;
  }

  @media (max-width: 1399px) {
    top: 180px;
    left: 350px;
    width: 220px;
  }

  @media (max-width: 900px) {
    top: 200px;
    left: 280px;
    width: 172px;
  }

  @media (max-width: 720px) {
    top: 272px;
    left: 280px;
    width: 150px;
  }

  @media (max-width: 390px) {
    top: 190px;
    left: 300px;
    width: 124px;
  }
`
