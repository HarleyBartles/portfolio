import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

export type EditorialHeadingWrap = 'display' | 'balanced' | 'single-line'

type EditorialHeadingProps = ComponentPropsWithoutRef<'h2'> & {
  as?: 'h1' | 'h2' | 'h3'
  wrap: EditorialHeadingWrap
}

const Heading = styled.h2<{ $wrap: EditorialHeadingWrap }>`
  ${({ $wrap }) => $wrap === 'single-line' ? 'white-space: nowrap;' : 'text-wrap: balance;'}
`

export const EditorialHeading = ({ wrap, ...props }: EditorialHeadingProps) => (
  <Heading {...props} data-text-wrap={wrap} $wrap={wrap} />
)
