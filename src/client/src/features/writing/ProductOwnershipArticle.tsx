import { ContentProse } from '../../components'
import { EditorialAside } from '../../components/editorial'
import './ProductOwnershipArticle.scss'

type ProductOwnershipArticleProps = {
  markdown: string
}

const sqlHeading = '## SQL was my weak point'
const sqlFollowingHeading = '## No dev is an island'
const webhookHeading = '## The webhook wasn’t early'
const webhookFollowingHeading = '## The bit before the code'

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
        disclosureLabel="The interview and the incident"
        eyebrow="One problem, two mistakes"
        precis="At interview, I stepped away from a SQL question. In production, I later turned a several-minute operation into a couple of seconds. The same boundary mistake sat underneath both moments."
        title="SQL was my weak point"
      >
        <ContentProse register="article-serif" markdown={sqlAside} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={middle} />
      <EditorialAside
        disclosureLabel="Follow both signals"
        eyebrow="Three systems, one assumption"
        precis="Our API emitted its webhook only after the supplier reported a terminal status. The consumer expected a separate SDK redirect to happen first, a guarantee nobody had made."
        title="The webhook wasn’t early"
        visual={<WebhookSignalMap />}
      >
        <ContentProse register="article-serif" markdown={webhookAside} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
