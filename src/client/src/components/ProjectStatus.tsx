import styled from 'styled-components'

type ProjectStatusProps = {
  status: string
}

type StatusTone = 'live' | 'attention' | 'active-project' | 'default'

const Status = styled.p<{ $tone: StatusTone }>`
  display: inline-flex;
  gap: ${({ theme }) => theme.space.xs};
  align-items: center;
  margin: ${({ theme }) => theme.space.m} 0 0;
  border: 1px solid rgb(31 36 31 / 24%);
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.color.ink};

  span {
    color: ${({ theme }) => theme.color.accent};
  }

  ${({ $tone, theme }) => $tone === 'live'
    ? `border-color: ${theme.color.success}; background: rgb(58 125 68 / 8%);`
    : $tone === 'attention'
      ? `border-color: ${theme.color.warn}; background: rgb(184 134 11 / 8%);`
      : $tone === 'active-project'
        ? `border-color: color-mix(in srgb, ${theme.color.teal} 56%, transparent); background: color-mix(in srgb, ${theme.color.teal} 9%, transparent);`
      : ''}
`

export const ProjectStatus = ({ status }: ProjectStatusProps) => {
  const normalizedStatus = status.trim()

  if (normalizedStatus.length === 0) {
    return null
  }

  const normalizedStatusKey = normalizedStatus.toLowerCase()
  const tone: StatusTone = normalizedStatusKey === 'live'
    ? 'live'
    : normalizedStatusKey === 'pre-alpha' || normalizedStatusKey === 'incomplete'
      ? 'attention'
      : normalizedStatusKey === 'active project'
        ? 'active-project'
      : 'default'

  return (
    <Status className="content-status" data-status={normalizedStatusKey} data-tone={tone} $tone={tone}>
      <span>Status</span>
      {normalizedStatus}
    </Status>
  )
}
