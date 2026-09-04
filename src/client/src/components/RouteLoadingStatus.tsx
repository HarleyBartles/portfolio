import styled from 'styled-components'

const LoadingMessage = styled.p`
  padding-block: var(--space-16);
  margin: 0;
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.code};
  font-size: 0.82rem;
`

export const RouteLoadingStatus = ({ children }: { children: string }) => (
  <LoadingMessage role="status" data-route-loading>{children}</LoadingMessage>
)
