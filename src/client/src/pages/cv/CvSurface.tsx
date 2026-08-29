import styled from 'styled-components'

export const CvDocument = styled.article`
  max-width: 72rem;
  padding-block: clamp(3rem, 7vw, 6rem);
`

export const CvSheet = styled.section`
  width: min(100%, 58rem);
  margin-inline: auto;
  border: 1px solid ${({ theme }) => theme.color.ink};
  background: rgb(255 250 240 / 82%);
  padding: clamp(${({ theme }) => theme.space.xl}, 5vw, var(--space-16));

  & + & {
    margin-top: ${({ theme }) => theme.space.xxl};
  }

  /* The header's rule introduces the first content section; don't draw it twice. */
  & > .cv-header + .cv-section {
    border-top: 0;
    margin-top: 0;
  }

  @media (max-width: 46rem) {
    width: 100%;
    border-inline: 0;
    padding-inline: 0;
    background: transparent;
  }

  @media print {
    box-sizing: border-box;
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    border: 0;
    background: ${({ theme }) => theme.color.surface};
    padding: 9mm 12mm;
    break-after: page;
    break-inside: avoid;

    &:last-child {
      break-after: auto;
    }

    & + & {
      margin-top: 0;
    }
  }
`
