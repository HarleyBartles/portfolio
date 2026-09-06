import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const Callout = styled.p`
  max-width: 28ch;
  margin: 0;
  padding-left: clamp(var(--space-5), 4vw, var(--space-10));
  border-left: 0.35rem solid var(--case-study-callout-accent, var(--color-accent));
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3.5vw, 3rem);
  line-height: 1.08;
  text-wrap: balance;
`

export function CaseStudyCallout({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <Callout {...props} data-case-study-callout>{children}</Callout>
}
