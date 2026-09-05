import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled from 'styled-components'

const Surface = styled.section`
  display: grid;
  grid-template-columns: minmax(18rem, 4fr) minmax(0, 8fr);
  gap: clamp(var(--space-10), 7vw, var(--space-20));
  scroll-margin-top: var(--space-8);

  &:focus {
    outline: 3px solid var(--color-focus);
    outline-offset: var(--space-2);
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`

type ContactSurfaceProps = ComponentPropsWithoutRef<'section'> & { children: ReactNode }

export const ContactSurface = forwardRef<HTMLElement, ContactSurfaceProps>(({ children, ...props }, ref) => (
  <Surface {...props} ref={ref} data-visual-contract="contact-route">
    {children}
  </Surface>
))
