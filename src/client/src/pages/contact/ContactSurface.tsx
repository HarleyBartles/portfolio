import type { ReactNode } from 'react'
import styled from 'styled-components'

const Surface = styled.section`
  display: grid;
  grid-template-columns: minmax(18rem, 4fr) minmax(0, 8fr);
  gap: clamp(var(--space-10), 7vw, var(--space-20));
  header > p:last-child { color: ${({ theme }) => theme.color.muted}; }
  @media (max-width: 46rem) { grid-template-columns: 1fr; }
`

type ContactSurfaceProps = { children: ReactNode }

export const ContactSurface = ({ children }: ContactSurfaceProps) => <Surface data-visual-contract="contact-route">{children}</Surface>
