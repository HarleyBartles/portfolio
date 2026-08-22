import type { ReactNode } from 'react'

export function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return <section aria-labelledby={`case-study-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}><h2 id={`case-study-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{title}</h2>{children}</section>
}
