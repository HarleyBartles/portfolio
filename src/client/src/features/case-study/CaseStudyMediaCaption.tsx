import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const Caption = styled.figcaption`
  margin-top: var(--space-3);
  color: var(--color-muted);
  font-family: var(--font-site-sans);
  font-size: var(--type-caption-size);
  line-height: 1.5;
`

export function CaseStudyMediaCaption({ children, ...props }: ComponentPropsWithoutRef<'figcaption'>) {
  return <Caption {...props} data-case-study-media-caption>{children}</Caption>
}
