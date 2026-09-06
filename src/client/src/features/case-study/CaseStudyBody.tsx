import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled from 'styled-components'

const Body = styled.div`
  width: 100%;
  max-width: 82rem;
  margin-inline: auto;
`

export function CaseStudyBody({ children, ...props }: ComponentPropsWithoutRef<'div'> & { children: ReactNode }) {
  return <Body {...props}>{children}</Body>
}
