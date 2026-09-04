import styled from 'styled-components'

type ProjectStatusProps = {
  status: string
  tone?: ProjectStatusTone
}

export type ProjectStatusTone = 'live' | 'attention' | 'active-project' | 'default'

const Status = styled.p<{ $tone: ProjectStatusTone }>`
  display: inline-flex;
  gap: ${({ theme }) => theme.space.xs};
  align-items: center;
  margin: ${({ theme }) => theme.space.m} 0 0;
  border: 1px solid rgb(31 36 31 / 24%);
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.metadataSize};
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: .012em;
  text-transform: none;

  span {
    color: currentColor;
  }

  ${({ $tone, theme }) => $tone === 'live'
    ? `border-color: ${theme.color.success}; background: rgb(58 125 68 / 8%);`
    : $tone === 'attention'
      ? `border-color: ${theme.color.warn}; background: rgb(184 134 11 / 8%);`
      : $tone === 'active-project'
        ? `border-color: color-mix(in srgb, ${theme.color.teal} 56%, transparent); background: color-mix(in srgb, ${theme.color.teal} 9%, transparent);`
      : ''}
`

export const ProjectStatus = ({ status, tone: requestedTone }: ProjectStatusProps) => {
  const normalizedStatus = status.trim()

  if (normalizedStatus.length === 0) {
    return null
  }

  const normalizedStatusKey = normalizedStatus.toLowerCase()
  const inferredTone: ProjectStatusTone = normalizedStatusKey === 'live'
    ? 'live'
    : normalizedStatusKey === 'pre-alpha' || normalizedStatusKey === 'incomplete'
      ? 'attention'
      : 'default'
  const tone = requestedTone ?? inferredTone

  return (
    <Status className="content-status" data-status={normalizedStatusKey} data-tone={tone} $tone={tone}>
      <span>Status</span>
      {normalizedStatus}
    </Status>
  )
}
