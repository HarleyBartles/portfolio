import type { ReactNode } from 'react'
import './CaseStudyBody.scss'

export function CaseStudyBody({ children }: { children: ReactNode }) {
  return <div className="case-study-body">{children}</div>
}
