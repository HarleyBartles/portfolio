import { Suspense, type ComponentType } from 'react'
import styled from 'styled-components'

type WritingHeaderVisualProps = {
  Figure: ComponentType
}

const Visual = styled.div`
  display: grid;
  min-block-size: 30rem;

  @media (min-width: 46.0625rem) {
    min-block-size: 24rem;
  }
`

const Loading = styled.div`
  min-block-size: 100%;
  border-block: 1px solid ${({ theme }) => theme.color.border};
  background: linear-gradient(to bottom, transparent 32%, ${({ theme }) => theme.color.accentSoft} 32%, ${({ theme }) => theme.color.accentSoft} calc(32% + 1px), transparent calc(32% + 1px));
`

export const WritingHeaderVisual = ({ Figure }: WritingHeaderVisualProps) => (
  <Visual className="content-page-visual--writing">
    <Suspense fallback={<Loading className="writing-figure__loading" aria-hidden="true" data-loading="writing-figure" />}>
      <Figure />
    </Suspense>
  </Visual>
)
