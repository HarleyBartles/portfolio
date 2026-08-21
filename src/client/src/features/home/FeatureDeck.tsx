import { useMemo, useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { createFeatureOrder } from './featureOrder'
import { ProjectVisual, type ProjectVisualSlug } from './ProjectVisual'

export type FeatureItem = {
  id: string
  eyebrow: string
  title: string
  summary: string
  to: string
  visual: ProjectVisualSlug
  meta?: string
}

type FeatureDeckProps = {
  items: readonly FeatureItem[]
  initialOrder?: readonly FeatureItem[]
  random?: () => number
}

export function FeatureDeck({ items, initialOrder, random = Math.random }: FeatureDeckProps): ReactElement {
  const firstOrder = useMemo(
    () => (initialOrder === undefined ? createFeatureOrder(items, random) : [...initialOrder]),
    [initialOrder, items, random],
  )
  const [order, setOrder] = useState(firstOrder)
  const [activeIndex, setActiveIndex] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  const setLead = (index: number): void => {
    const normalized = (index + order.length) % order.length
    setActiveIndex(normalized)
    setAnnouncement(`Now featuring ${order[normalized].title}`)
  }

  const shuffle = (): void => {
    const nextOrder = createFeatureOrder(items, random)
    setOrder(nextOrder)
    setActiveIndex(0)
    setAnnouncement(`Now featuring ${nextOrder[0].title}`)
  }

  const visible = [0, 1, 2].map((offset) => order[(activeIndex + offset) % order.length])
  const [lead, ...supporting] = visible

  return (
    <div className="feature-deck">
      <div className="feature-deck-grid">
        <article className="feature-lead" key={`${lead.id}-${activeIndex}`}>
          <div className="feature-lead-media"><ProjectVisual slug={lead.visual} eager /></div>
          <div className="feature-lead-copy">
            <p className="eyebrow">{lead.eyebrow}</p>
            <h2><Link to={lead.to}>{lead.title}</Link></h2>
            {lead.meta === undefined ? null : <p className="feature-meta">{lead.meta}</p>}
            <p>{lead.summary}</p>
            <Link to={lead.to} className="text-link">Read the story <span aria-hidden="true">↗</span></Link>
          </div>
        </article>

        <ol className="feature-support" aria-label="Supporting stories">
          {supporting.map((item, index) => (
            <li key={item.id}>
              <p className="eyebrow">0{index + 2} / {item.eyebrow}</p>
              <h3><Link to={item.to}>{item.title}</Link></h3>
              <p>{item.summary}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="feature-controls" aria-label="Feature controls">
        <button type="button" onClick={() => setLead(activeIndex - 1)} aria-label="Previous feature"><span aria-hidden="true">←</span> Previous</button>
        <button type="button" onClick={shuffle} aria-label="Shuffle features">Shuffle <span aria-hidden="true">✦</span></button>
        <button type="button" onClick={() => setLead(activeIndex + 1)} aria-label="Next feature">Next <span aria-hidden="true">→</span></button>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </div>
  )
}
