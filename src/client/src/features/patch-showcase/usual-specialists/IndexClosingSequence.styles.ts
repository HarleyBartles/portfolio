import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'

export const Composition = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: start;
  width: 100%;
  margin-inline: auto;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    position: relative;
    --index-close-office-left: clamp(0px, calc(44.545455cqi - 427.636364px), 196px);
    --index-close-cell-width: clamp(352px, calc(18.029119cqi + 178.920455px), 431.328125px);
    --index-close-outcome-width: clamp(376px, calc(12.574574cqi + 255.284091px), 431.328125px);
    --index-close-office-retrieval-overlap: clamp(12.806244px, calc(15.271308cqi - 133.798315px), 80px);
    --index-close-retrieval-outcome-overlap: clamp(104px, calc(114.171953px - .726568cqi), 107.196899px);
    --index-close-retrieval-left: calc(
      var(--index-close-office-left)
      + var(--index-close-cell-width)
      - var(--index-close-office-retrieval-overlap)
    );
    --index-close-outcome-left: calc(
      var(--index-close-retrieval-left)
      + var(--index-close-cell-width)
      - var(--index-close-retrieval-outcome-overlap)
    );
    --index-close-retrieval-top: 64px;
    --index-close-recognition-top: 94px;
    --index-close-outcome-top: 148px;
    width: 100cqi;
    height: clamp(359.5px, calc(7.070313cqi + 291.625px), 390.609375px);
    max-width: none;
    margin-left: -6cqi;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    --index-compact-close-cell-height: calc(37.5cqi - 18px);
    --index-compact-outcome-gutter: 70px;
    --index-compact-retrieval-shift-x: 48px;
    --index-compact-retrieval-step-y: clamp(
      118px,
      calc(23.6769cqi - 24.0613px),
      203px
    );
    --index-compact-recognition-inset-y: clamp(
      13px,
      calc(1.1142cqi + 6.3148px),
      17px
    );
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    --index-close-office-left: 0px;
    --index-close-cell-width: min(
      500px,
      calc((100% + (var(--index-close-overlap) * 2)) / 3)
    );
    --index-close-outcome-width: var(--index-close-cell-width);
    --index-close-overlap: 80px;
    --index-close-office-retrieval-overlap: var(--index-close-overlap);
    --index-close-retrieval-outcome-overlap: 104px;
    --index-close-retrieval-left: calc(
      var(--index-close-office-left)
      + var(--index-close-cell-width)
      - var(--index-close-office-retrieval-overlap)
    );
    --index-close-outcome-left: calc(
      var(--index-close-retrieval-left)
      + var(--index-close-cell-width)
      - var(--index-close-retrieval-outcome-overlap)
    );
    --index-close-retrieval-top: clamp(45px, calc(197px - 9.5cqi), 64px);
    --index-close-recognition-top: clamp(72px, calc(248px - 11cqi), 94px);
    --index-close-outcome-top: clamp(90px, calc(554px - 29cqi), 148px);
    width: 100%;
    height: clamp(380px, calc(468px - 5.5cqi), 390.609375px);
    max-width: 1340px;
    margin-left: 0;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    --index-close-office-left: 0px;
    --index-close-cell-width: 500px;
    --index-close-outcome-width: 500px;
    --index-close-overlap: 80px;
    --index-close-office-retrieval-overlap: var(--index-close-overlap);
    --index-close-retrieval-outcome-overlap: 104px;
    --index-close-retrieval-left: calc(
      var(--index-close-office-left)
      + var(--index-close-cell-width)
      - var(--index-close-office-retrieval-overlap)
    );
    --index-close-outcome-left: calc(
      var(--index-close-retrieval-left)
      + var(--index-close-cell-width)
      - var(--index-close-retrieval-outcome-overlap)
    );
    --index-close-retrieval-top: 45px;
    --index-close-recognition-top: 72px;
    --index-close-outcome-top: 90px;
    height: 380px;
    max-width: 1280px;
  }
`

export const ObservationPlacement = styled.div`
  z-index: 10;
  grid-row: 1;
  grid-column: 1 / -1;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    grid-column: 1 / 9;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    position: absolute;
    grid-column: 1 / 6;
    top: 0;
    left: var(--index-close-office-left);
    width: var(--index-close-cell-width);
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    grid-column: 1 / -1;
  }
`

export const RecognitionPlacement = styled.div`
  z-index: 13;
  grid-row: 1;
  grid-column: 2 / 11;
  align-self: end;
  transform: translateY(80%);

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    grid-column: 5 / 9;
    align-self: start;
    margin-top: calc(
      var(--index-compact-retrieval-step-y)
      + var(--index-compact-recognition-inset-y)
    );
    transform: translateX(calc(var(--index-compact-retrieval-shift-x) - 14px));
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    position: absolute;
    grid-column: 1 / -1;
    top: var(--index-close-recognition-top);
    left: var(--index-close-retrieval-left);
    width: max-content;
    margin-top: 0;
    transform: translateX(-50%);
  }
`

export const RetrievalPlacement = styled.div`
  z-index: 11;
  grid-row: 2;
  grid-column: 1 / -1;
  margin-top: 16px;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    grid-row: 1;
    grid-column: 5 / 13;
    margin-top: var(--index-compact-retrieval-step-y);
    transform: translateX(var(--index-compact-retrieval-shift-x));
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    position: absolute;
    grid-column: 1 / -1;
    top: var(--index-close-retrieval-top);
    left: var(--index-close-retrieval-left);
    width: var(--index-close-cell-width);
    margin-top: 0;
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    grid-column: 1 / -1;
  }
`

export const OutcomePlacement = styled.div`
  z-index: 12;
  grid-row: 3;
  grid-column: 1 / -1;
  margin-top: 12px;
  margin-inline: calc(var(--specialists-gutter) * -1);
  aspect-ratio: 16 / 9;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    grid-row: 1;
    grid-column: 1 / 9;
    margin-top: calc(
      var(--index-compact-close-cell-height)
      + var(--index-compact-outcome-gutter)
    );
    margin-right: 0;
    margin-left: calc(var(--index-compact-closing-gutter) * -1);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    position: absolute;
    grid-column: 1 / -1;
    top: var(--index-close-outcome-top);
    left: var(--index-close-outcome-left);
    width: var(--index-close-outcome-width);
    margin-top: 0;
    margin-inline: 0;
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    grid-column: 1 / -1;
  }
`
