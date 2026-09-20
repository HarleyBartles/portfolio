import styled from 'styled-components'
import { INDEX_CONTAINER_NAME, indexQueries } from './indexResponsive'

const INDEX_CHAPTER_LAYOUT = {
  narrow: { paddingTop: 48, paddingBottom: 48 },
  compact: { paddingTop: 56, paddingBottom: 56 },
  medium: { paddingTop: 64, paddingBottom: 64 },
  wide: { paddingTop: 64, paddingBottom: 56 },
  ultrawide: { paddingTop: 48, paddingBottom: 36 },
} as const

export const Chapter = styled.section`
  position: relative;
  container-name: ${INDEX_CONTAINER_NAME};
  container-type: inline-size;
  padding-top: ${INDEX_CHAPTER_LAYOUT.narrow.paddingTop}px;
  padding-bottom: ${INDEX_CHAPTER_LAYOUT.narrow.paddingBottom}px;

  @media ${indexQueries.compact} {
    padding-top: ${INDEX_CHAPTER_LAYOUT.compact.paddingTop}px;
    padding-bottom: ${INDEX_CHAPTER_LAYOUT.compact.paddingBottom}px;
  }

  @media ${indexQueries.medium} {
    padding-top: ${INDEX_CHAPTER_LAYOUT.medium.paddingTop}px;
    padding-bottom: ${INDEX_CHAPTER_LAYOUT.medium.paddingBottom}px;
  }

  @media ${indexQueries.wide} {
    padding-bottom: ${INDEX_CHAPTER_LAYOUT.wide.paddingBottom}px;
  }

  @media ${indexQueries.ultrawide} {
    padding-top: ${INDEX_CHAPTER_LAYOUT.ultrawide.paddingTop}px;
    padding-bottom: ${INDEX_CHAPTER_LAYOUT.ultrawide.paddingBottom}px;
  }
`

export const Stage = styled.div`
  position: relative;

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    --index-compact-evidence-field-height: 900px;
    --index-compact-main-document-height: 650px;
    --index-compact-office-gutter: 31px;
  }
`

export const ClosingSequencePlacement = styled.div`
  position: relative;
  z-index: 10;
  /* The lower inspection pair protrudes above the office frame by 33.55% of
     the authored lockup width. Reserve that headroom in narrow flow so the
     pair can keep its foot-to-office registration without ever being pulled
     underneath the story card. */
  padding-top: calc(33.55% - 12px);
  margin-top: 8px;
  margin-inline: var(--specialists-gutter);

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.compact} {
    --index-compact-closing-gutter: 24px;
    padding-top: 0;
    margin-top: calc(
      var(--index-compact-main-document-height)
      + var(--index-compact-office-gutter)
      - var(--index-compact-evidence-field-height)
    );
    margin-inline: var(--index-compact-closing-gutter);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.medium} {
    margin-top: -244px;
    margin-inline: 6cqi;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.upperWide} {
    margin-top: 8px;
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.wide} {
    margin-top: clamp(-36px, calc(316px - 22cqi), 8px);
    margin-right: clamp(40px, 5cqi, 80px);
    margin-left: clamp(180px, 14cqi, 260px);
  }

  @container ${INDEX_CONTAINER_NAME} ${indexQueries.ultrawide} {
    margin-top: -20px;
    margin-right: auto;
    margin-left: clamp(320px, calc(25cqi - 160px), 480px);
    width: min(calc(100cqi - 160px), 1280px);
  }
`
