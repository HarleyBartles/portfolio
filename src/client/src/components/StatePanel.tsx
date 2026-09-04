import type { ReactNode } from 'react'
import styled from 'styled-components'

type StatePanelProps = {
  labelledBy: string
  children: ReactNode
  routeLoading?: boolean
}

const Panel = styled.section`
  max-width: 44rem;
  padding-block: clamp(4rem, 9vw, 7rem);

  h1 {
    max-width: 10ch;
    margin: 0;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(4rem, 10vw, 8rem);
    line-height: 0.86;
    letter-spacing: -0.067em;
    text-wrap: balance;
  }

  p {
    max-width: 42rem;
    margin: ${({ theme }) => theme.space.m} 0 0;
    color: ${({ theme }) => theme.color.muted};
    font-size: clamp(1.1rem, 2.4vw, 1.35rem);
    line-height: 1.45;
  }

  a {
    display: inline-block;
    margin-top: ${({ theme }) => theme.space.lg};
    font-weight: 700;
  }
`

export const StatePanel = ({ labelledBy, children, routeLoading = false }: StatePanelProps) => (
  <Panel className="state-panel" aria-labelledby={labelledBy} data-route-loading={routeLoading ? '' : undefined}>
    {children}
  </Panel>
)
