import styled from 'styled-components'

export const CvDocument = styled.article`
  max-width: 72rem;
  padding-block-end: clamp(3rem, 7vw, 6rem);
  @media print {
    max-width: none;
    padding: 0;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
`

export const CvSheet = styled.section`
  width: min(100%, 58rem);
  margin-inline: auto;
  border: 0;
  background: transparent;
  padding: 0 clamp(${({ theme }) => theme.space.xl}, 5vw, var(--space-16)) clamp(${({ theme }) => theme.space.xl}, 5vw, var(--space-16));

  & + & {
    margin-top: ${({ theme }) => theme.space.xxl};
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
    background: transparent;
    padding: 9mm 12mm;
    break-after: page;
    break-inside: avoid;

    &:last-of-type {
      break-after: auto;
    }

    & + & {
      margin-top: 0;
    }
  }
`
