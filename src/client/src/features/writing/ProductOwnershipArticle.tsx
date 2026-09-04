import type { ReactNode } from 'react'
import { ContentProse } from '../../components'
import './ProductOwnershipArticle.scss'

type ProductOwnershipArticleProps = {
  markdown: string
}

type EditorialAsideProps = {
  body: string
  disclosure: string
  eyebrow: string
  id: string
  standfirst: string
  title: string
  variant: 'sql' | 'webhook'
  visual?: ReactNode
}

const sqlHeading = '## SQL was my weak point'
const sqlFollowingHeading = '## No dev is an island'
const webhookHeading = '## The webhook wasn’t early'
const webhookFollowingHeading = '## The bit before the code'

const EditorialAside = ({
  body,
  disclosure,
  eyebrow,
  id,
  standfirst,
  title,
  variant,
  visual,
}: EditorialAsideProps) => {
  return (
    <aside
      className={`product-ownership-aside product-ownership-aside--${variant}`}
      aria-labelledby={id}
    >
      <header>
        <p className="product-ownership-aside__eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        <p className="product-ownership-aside__standfirst">{standfirst}</p>
      </header>
      <div className="product-ownership-aside__content">
        {visual}
        <details className="product-ownership-aside__details">
          <summary>
            <span>{disclosure}</span>
            <span className="product-ownership-aside__marker" aria-hidden="true" />
          </summary>
          <div className="product-ownership-aside__body">
            <ContentProse register="article-serif" markdown={body} />
          </div>
        </details>
      </div>
    </aside>
  )
}

const WebhookSignalMap = () => {
  return (
    <figure className="webhook-signal-map">
      <div className="webhook-signal-map__lane">
        <span>Status path</span>
        <strong>Supplier records an outcome</strong>
        <span aria-hidden="true">→</span>
        <strong>Our API fires its webhook</strong>
      </div>
      <p className="webhook-signal-map__boundary">No ordering guarantee between paths</p>
      <div className="webhook-signal-map__lane">
        <span>Journey path</span>
        <strong>Supplier SDK ends its flow</strong>
        <span aria-hidden="true">→</span>
        <strong>Candidate returns to consumer</strong>
      </div>
      <figcaption>One supplier, two signals, and an ordering assumption between them.</figcaption>
    </figure>
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
    <div className="product-ownership-article">
      <ContentProse register="article-serif" markdown={opening} />
      <EditorialAside
        body={sqlAside}
        disclosure="The interview and the incident"
        eyebrow="One problem, two mistakes"
        id="product-ownership-sql-title"
        standfirst="At interview, I stepped away from a SQL question. In production, I later turned a several-minute operation into a couple of seconds. The same boundary mistake sat underneath both moments."
        title="SQL was my weak point"
        variant="sql"
      />
      <ContentProse register="article-serif" markdown={middle} />
      <EditorialAside
        body={webhookAside}
        disclosure="Follow both signals"
        eyebrow="Three systems, one assumption"
        id="product-ownership-webhook-title"
        standfirst="Our API emitted its webhook only after the supplier reported a terminal status. The consumer expected a separate SDK redirect to happen first, a guarantee nobody had made."
        title="The webhook wasn’t early"
        variant="webhook"
        visual={<WebhookSignalMap />}
      />
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
