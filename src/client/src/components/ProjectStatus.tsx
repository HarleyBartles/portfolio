import type { ReactElement } from 'react'

type ProjectStatusProps = {
  status: string
}

export function ProjectStatus({ status }: ProjectStatusProps): ReactElement | null {
  const normalizedStatus = status.trim()

  if (normalizedStatus.length === 0) {
    return null
  }

  return (
    <p className="content-status">
      <span>Status</span>
      {normalizedStatus}
    </p>
  )
}
