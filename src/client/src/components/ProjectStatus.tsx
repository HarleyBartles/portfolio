import type { ReactElement } from 'react'

type ProjectStatusProps = {
  status: string
}

export function ProjectStatus({ status }: ProjectStatusProps): ReactElement | null {
  const normalizedStatus = status.trim()

  if (normalizedStatus.length === 0) {
    return null
  }

  const statusClass = `status-${normalizedStatus.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <p className={`content-status ${statusClass}`}>
      <span>Status</span>
      {normalizedStatus}
    </p>
  )
}
