import styled from 'styled-components'

export const ContactSurface = styled.section`
  display: grid;
  grid-template-columns: minmax(18rem, 4fr) minmax(0, 8fr);
  gap: clamp(var(--space-10), 7vw, var(--space-20));
  padding-block: clamp(4rem, 9vw, 7rem);

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`
