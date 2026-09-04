import { ActionRouteLink } from './content/PublicationPrimitives'
import styled from 'styled-components'

export type StateAction = Readonly<{
  label: string
  to: string
}>

type StatePanelProps = {
  id: string
  title: string
  messages: readonly string[]
  headingLevel?: 1 | 2
  announcement?: 'none' | 'status' | 'alert'
  routeLoading?: boolean
  actions?: readonly StateAction[]
}

const Panel = styled.section`
  max-width: 44rem;
  padding-block: clamp(4rem, 9vw, 7rem);

  h1 {
    max-width: 10ch;
    margin: 0;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(4rem, 10vw, 8rem);
    line-height: 0.86;
    letter-spacing: -0.067em;
    text-wrap: balance;
  }

  p {
    max-width: 42rem;
    margin: ${({ theme }) => theme.space.m} 0 0;
    color: ${({ theme }) => theme.color.muted};
    font-size: clamp(1.1rem, 2.4vw, 1.35rem);
    line-height: 1.45;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.xs};
    margin-top: ${({ theme }) => theme.space.lg};
  }
`

export const StatePanel = ({
  id,
  title,
  messages,
  headingLevel = 1,
  announcement = 'none',
  routeLoading = false,
  actions = [],
}: StatePanelProps) => {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <Panel aria-labelledby={id} data-route-loading={routeLoading ? '' : undefined}>
      <Heading id={id}>{title}</Heading>
      {messages.map((message, index) => (
        <p key={message} role={index === 0 && announcement !== 'none' ? announcement : undefined}>{message}</p>
      ))}
      {actions.length > 0 && (
        <nav aria-label="Recovery navigation">
          {actions.map((action) => <ActionRouteLink key={action.to} to={action.to}>{action.label}</ActionRouteLink>)}
        </nav>
      )}
    </Panel>
  )
}
