import type { ReactNode } from 'react'
import { StatePanel } from './StatePanel'

type AccessibleStatusProps = {
  id: string
  title: string
  children: ReactNode
  headingLevel?: 1 | 2
  routeLoading?: boolean
  tone?: 'status' | 'alert'
}

export const AccessibleStatus = ({
  id,
  title,
  children,
  headingLevel = 1,
  routeLoading = false,
  tone = 'status',
}: AccessibleStatusProps) => {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'
  const liveRole = tone === 'alert' ? 'alert' : 'status'

  return (
    <StatePanel labelledBy={id} routeLoading={routeLoading}>
      <Heading id={id}>{title}</Heading>
      <p role={liveRole}>{children}</p>
    </StatePanel>
  )
}
