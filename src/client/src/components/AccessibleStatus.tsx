import type { ReactElement, ReactNode } from 'react'

type AccessibleStatusProps = {
  id: string
  title: string
  children: ReactNode
  headingLevel?: 1 | 2
  tone?: 'status' | 'alert'
}

export function AccessibleStatus({
  id,
  title,
  children,
  headingLevel = 1,
  tone = 'status',
}: AccessibleStatusProps): ReactElement {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'
  const liveRole = tone === 'alert' ? 'alert' : 'status'

  return (
    <section className="state-panel" aria-labelledby={id}>
      <Heading id={id}>{title}</Heading>
      <p role={liveRole}>{children}</p>
    </section>
  )
}
