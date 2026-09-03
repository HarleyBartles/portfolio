import { Suspense, type ComponentType } from 'react'

type WritingHeaderVisualProps = {
  Figure: ComponentType
}

export const WritingHeaderVisual = ({ Figure }: WritingHeaderVisualProps) => (
  <div className="content-page-visual--writing">
    <Suspense fallback={<div className="writing-figure__loading" aria-hidden="true" data-loading="writing-figure" />}>
      <Figure />
    </Suspense>
  </div>
)
