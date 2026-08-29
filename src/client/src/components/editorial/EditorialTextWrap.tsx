import styled from 'styled-components'

/**
 * Deliberate line-wrap contracts for editorial headings. Use display for a hero
 * that earns multiple lines, balanced for a compact two-line title, and
 * single-line when the title must not break opportunistically.
 */
export const EditorialDisplayHeading = styled.h2`
  text-wrap: balance;
`

export const EditorialBalancedHeading = styled.h2`
  text-wrap: balance;
`

export const EditorialSingleLineHeading = styled.h2`
  white-space: nowrap;
`
