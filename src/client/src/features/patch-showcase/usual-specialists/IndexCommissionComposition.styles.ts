import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'

export const Composition = styled.div`
  position: relative;
  width: 1110px;
  height: 359px;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    width: calc(2vw + 1082px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    width: 1065.31px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.belowWide} {
    width: 840px;
    height: 475px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughMid} {
    width: 670px;
    height: 505px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughCompact} {
    width: 660px;
    height: 577px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.narrow} {
    width: 500px;
    height: 497px;
  }
`

export const ObservationPlacement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.belowWide} {
    width: 530px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughMid} {
    width: 520px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughCompact} {
    width: 660px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.narrow} {
    width: 500px;
  }
`

export const MacguffinPlacement = styled.div`
  position: absolute;
  z-index: 11;
  top: 85px;
  left: 510px;
  width: 600px;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    left: calc(2vw + 482px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    left: 465.31px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.belowWide} {
    top: 220px;
    left: 380px;
    width: 460px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughMid} {
    top: 250px;
    left: 270px;
    width: 400px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughCompact} {
    top: 322px;
    left: 100px;
    width: 330px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.narrow} {
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

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    left: calc(10vw + 310px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    left: 402.655px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.belowWide} {
    top: 180px;
    left: 350px;
    width: 220px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughMid} {
    top: 200px;
    left: 280px;
    width: 172px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.throughCompact} {
    top: 272px;
    left: 280px;
    width: 150px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.narrow} {
    top: 190px;
    left: 300px;
    width: 124px;
  }
`
