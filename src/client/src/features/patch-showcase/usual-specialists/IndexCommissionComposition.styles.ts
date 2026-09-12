import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export const Composition = styled.div`
  position: relative;
  width: 1110px;
  height: 359px;

  @media ${specialistsMedia.atLeastWide} {
    width: calc(2vw + 1082px);
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    width: 1065.31px;
  }

  @media ${specialistsMedia.belowWide} {
    width: 840px;
    height: 475px;
  }

  @media ${specialistsMedia.atMostMid} {
    width: 670px;
    height: 505px;
  }

  @media ${specialistsMedia.atMostCompact} {
    width: 660px;
    height: 577px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: 500px;
    height: 497px;
  }
`

export const ObservationPlacement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;

  @media ${specialistsMedia.belowWide} {
    width: 530px;
  }

  @media ${specialistsMedia.atMostMid} {
    width: 520px;
  }

  @media ${specialistsMedia.atMostCompact} {
    width: 660px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    width: 500px;
  }
`

export const MacguffinPlacement = styled.div`
  position: absolute;
  z-index: 11;
  top: 85px;
  left: 510px;
  width: 600px;

  @media ${specialistsMedia.atLeastWide} {
    left: calc(2vw + 482px);
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: 465.31px;
  }

  @media ${specialistsMedia.belowWide} {
    top: 220px;
    left: 380px;
    width: 460px;
  }

  @media ${specialistsMedia.atMostMid} {
    top: 250px;
    left: 270px;
    width: 400px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 322px;
    left: 100px;
    width: 330px;
  }

  @media ${specialistsMedia.atMostNarrow} {
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

  @media ${specialistsMedia.atLeastWide} {
    left: calc(10vw + 310px);
  }

  @media ${specialistsMedia.atLeastUltrawide} {
    left: 402.655px;
  }

  @media ${specialistsMedia.belowWide} {
    top: 180px;
    left: 350px;
    width: 220px;
  }

  @media ${specialistsMedia.atMostMid} {
    top: 200px;
    left: 280px;
    width: 172px;
  }

  @media ${specialistsMedia.atMostCompact} {
    top: 272px;
    left: 280px;
    width: 150px;
  }

  @media ${specialistsMedia.atMostNarrow} {
    top: 190px;
    left: 300px;
    width: 124px;
  }
`
