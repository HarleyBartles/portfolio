import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'

export const Composition = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: start;
  width: 100%;
  margin-inline: auto;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    --index-medium-composition-left: max(6cqi, calc(50cqi - 520px));
    --index-medium-retrieval-left: max(35.333333cqi, calc(50cqi - 173.333333px));
    --index-medium-office-target-left: clamp(0px, calc(44.545455cqi - 427.636364px), 196px);
    --index-medium-recognition-target-left: clamp(339.1875px, calc(47.304688cqi - 114.9375px), 547.328125px);
    --index-medium-outcome-target-right: clamp(960px, calc(78.632813cqi + 205.125px), 1305.984375px);
    max-width: 1040px;
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
    position: relative;
    --index-close-overlap: 80px;
    --index-close-step-y: 45px;
    --index-recognition-seam-offset: clamp(
      -40px,
      calc(107.9px - 7.707cqi),
      0px
    );
    --index-close-cell-width: min(
      500px,
      calc((100% + (var(--index-close-overlap) * 2)) / 3)
    );
    height: 380px;
    max-width: 1340px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    position: relative;
    --index-close-cell-width: 500px;
    --index-close-overlap: 80px;
    --index-close-step-y: 45px;
    --index-recognition-seam-offset: -40px;
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
    grid-column: 1 / 6;
    transform: translateX(calc(
      var(--index-medium-office-target-left)
      - var(--index-medium-composition-left)
    ));
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    position: absolute;
    grid-column: 1 / -1;
    top: 0;
    left: 0;
    width: var(--index-close-cell-width);
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    position: absolute;
    grid-column: 1 / -1;
    top: 0;
    left: 0;
    width: var(--index-close-cell-width);
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
    grid-column: 5 / 8;
    margin-top: 94px;
    transform: translateX(calc(
      var(--index-medium-recognition-target-left)
      - var(--index-medium-retrieval-left)
    ));
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    position: absolute;
    grid-column: 1 / -1;
    top: 72px;
    left: calc(
      var(--index-close-cell-width)
      - var(--index-close-overlap)
      + var(--index-recognition-seam-offset)
    );
    width: 205px;
    margin-top: 0;
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    position: absolute;
    grid-column: 1 / -1;
    top: 72px;
    left: calc(var(--index-close-cell-width) - var(--index-close-overlap) - 40px);
    width: 205px;
    margin-top: 0;
    transform: none;
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
    grid-column: 5 / 10;
    margin-top: 64px;
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    position: absolute;
    grid-column: 1 / -1;
    top: var(--index-close-step-y);
    left: calc(var(--index-close-cell-width) - var(--index-close-overlap));
    width: var(--index-close-cell-width);
    margin-top: 0;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    position: absolute;
    grid-column: 1 / -1;
    top: var(--index-close-step-y);
    left: calc(var(--index-close-cell-width) - var(--index-close-overlap));
    width: var(--index-close-cell-width);
    margin-top: 0;
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
    grid-row: 1;
    grid-column: 8 / 13;
    margin-top: 148px;
    transform: translateX(calc(
      var(--index-medium-outcome-target-right)
      - (100cqi - var(--index-medium-composition-left))
    ));
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    position: absolute;
    grid-column: 1 / -1;
    top: calc(var(--index-close-step-y) * 2);
    left: calc((var(--index-close-cell-width) - var(--index-close-overlap)) * 2);
    width: var(--index-close-cell-width);
    margin-top: 0;
    transform: none;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    position: absolute;
    grid-column: 1 / -1;
    top: calc(var(--index-close-step-y) * 2);
    left: calc((var(--index-close-cell-width) - var(--index-close-overlap)) * 2);
    width: var(--index-close-cell-width);
    margin-top: 0;
  }
`
