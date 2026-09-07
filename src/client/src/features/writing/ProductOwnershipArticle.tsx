import { ContentProse } from '../../components'
import { EditorialAside } from '../../components/editorial'
import styled from 'styled-components'

const SignalMap = styled.figure`
  margin: 0 0 var(--space-6);
  border: 1px solid var(--color-ink);
  background: var(--color-surface);
`

const SignalLane = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);

  > span:first-child {
    grid-column: 1 / -1;
    color: var(--color-accent);
    font-family: var(--font-code);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  strong {
    font-size: 0.9rem;
    line-height: 1.3;
  }

  > span[aria-hidden='true'] {
    color: var(--color-accent);
    font-family: var(--font-code);
  }
`

const SignalBoundary = styled.p`
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-ink);
  background: var(--color-ink);
  color: var(--color-surface);
  font-family: var(--font-code);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
`

const SignalCaption = styled.figcaption`
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-family: var(--font-code);
  font-size: 0.68rem;
  line-height: 1.45;
`

type ProductOwnershipArticleProps = {
  markdown: string
}

const sqlHeading = '## SQL was my weak point'
const sqlFollowingHeading = '## No dev is an island'
const webhookHeading = '## The webhook wasn’t early'
const webhookFollowingHeading = '## The bit before the code'

const WebhookSignalMap = () => {
  return (
    <SignalMap>
      <SignalLane>
        <span>Status path</span>
        <strong>Supplier records an outcome</strong>
        <span aria-hidden="true">→</span>
        <strong>Our API fires its webhook</strong>
      </SignalLane>
      <SignalBoundary>No ordering guarantee between paths</SignalBoundary>
      <SignalLane>
        <span>Journey path</span>
        <strong>Supplier SDK ends its flow</strong>
        <span aria-hidden="true">→</span>
        <strong>Candidate returns to consumer</strong>
      </SignalLane>
      <SignalCaption>One supplier, two signals, and an ordering assumption between them.</SignalCaption>
    </SignalMap>
  )
}

export const ProductOwnershipArticle = ({ markdown }: ProductOwnershipArticleProps) => {
  const sqlStart = markdown.indexOf(sqlHeading)
  const sqlFollowingStart = markdown.indexOf(sqlFollowingHeading, sqlStart + sqlHeading.length)
  const webhookStart = markdown.indexOf(webhookHeading, sqlFollowingStart + sqlFollowingHeading.length)
  const webhookFollowingStart = markdown.indexOf(
    webhookFollowingHeading,
    webhookStart + webhookHeading.length,
  )

  if (sqlStart < 0 || sqlFollowingStart < 0 || webhookStart < 0 || webhookFollowingStart < 0) {
    return <ContentProse register="article-serif" markdown={markdown} />
  }

  const opening = markdown.slice(0, sqlStart).trimEnd()
  const sqlAside = markdown.slice(sqlStart + sqlHeading.length, sqlFollowingStart).trim()
  const middle = markdown.slice(sqlFollowingStart, webhookStart).trim()
  const webhookAside = markdown.slice(webhookStart + webhookHeading.length, webhookFollowingStart).trim()
  const closing = markdown.slice(webhookFollowingStart).trimStart()

  return (
    <>
      <ContentProse register="article-serif" markdown={opening} />
      <EditorialAside
        disclosureLabel="The interview and the incident"
        eyebrow="One problem, two mistakes"
        precis="At interview, I stepped away from a SQL question. In production, I later turned a several-minute operation into a couple of seconds. The same boundary mistake sat underneath both moments."
        title="SQL was my weak point"
      >
        <ContentProse register="article-serif" treatment="editorial-aside" markdown={sqlAside} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={middle} />
      <EditorialAside
        disclosureLabel="Follow both signals"
        eyebrow="Three systems, one assumption"
        precis="Our API emitted its webhook only after the supplier reported a terminal status. The consumer expected a separate SDK redirect to happen first, a guarantee nobody had made."
        title="The webhook wasn’t early"
        visual={<WebhookSignalMap />}
      >
        <ContentProse register="article-serif" treatment="editorial-aside" markdown={webhookAside} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={closing} />
    </>
  )
}
