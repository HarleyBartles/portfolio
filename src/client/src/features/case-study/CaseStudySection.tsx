import type { ReactNode } from 'react'

type CaseStudySectionProps = {
  title: string
  children: ReactNode
  layout?: 'flow' | 'lead'
}

export function CaseStudySection({ title, children, layout = 'flow' }: CaseStudySectionProps) {
  const id = `case-study-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  if (layout === 'lead') {
    return (
      <section className="case-study-lead" aria-labelledby={id}>
        <div className="case-study-lead__heading"><h2 id={id}>{title}</h2></div>
        <div className="case-study-lead__body">{children}</div>
      </section>
    )
  }

  return <section aria-labelledby={id}><h2 id={id}>{title}</h2>{children}</section>
}
