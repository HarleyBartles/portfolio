import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'
import { ContentLink } from './ContentLink'

type OrientationArea = {
  id: string
  label: string
  findItem: (items: ContentSummary[]) => ContentSummary | undefined
}

const orientationAreas = [
  {
    id: 'projects',
    label: 'Projects',
    findItem: (items) => items.find((item) => item.kind === 'project'),
  },
  {
    id: 'experience',
    label: 'Experience',
    findItem: (items) => items.find((item) => item.kind === 'experience'),
  },
  {
    id: 'engineering-practice',
    label: 'Engineering Practice',
    findItem: (items) => items.find((item) => item.kind === 'practice'),
  },
  {
    id: 'ai-engineering',
    label: 'AI Engineering',
    findItem: (items) => items.find((item) => item.kind === 'ai-engineering'),
  },
  {
    id: 'writing-and-notes',
    label: 'Writing and Notes',
    findItem: (items) => items.find((item) => item.kind === 'writing'),
  },
] satisfies OrientationArea[]

export function OrientationStrip(props: { items: ContentSummary[] }): ReactElement {
  const availableAreas = orientationAreas
    .map((area) => ({
      ...area,
      item: area.findItem(props.items),
    }))
    .filter((area): area is OrientationArea & { item: ContentSummary } => area.item !== undefined)

  return (
    <nav className="orientation-strip" aria-label="Portfolio orientation">
      <ul>
        {availableAreas.map((area) => (
          <li className="orientation-card" id={area.id} key={area.id}>
            <h2>
              <ContentLink item={area.item} label={area.label} />
            </h2>
            <p>{area.item.summary}</p>
            <span>{area.item.title}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
