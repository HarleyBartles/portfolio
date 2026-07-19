import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'
import { ContentLink } from './ContentLink'

type OrientationArea = {
  id: string
  label: string
  href: string
  findItem: (items: ContentSummary[]) => ContentSummary | undefined
}

const orientationAreas = [
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    findItem: (items) => items.find((item) => item.kind === 'project'),
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '/experience',
    findItem: (items) => items.find((item) => item.kind === 'experience'),
  },
  {
    id: 'engineering-practice',
    label: 'Engineering Practice',
    href: '/engineering-practice',
    findItem: (items) => items.find((item) => item.kind === 'practice'),
  },
  {
    id: 'ai-engineering',
    label: 'AI Engineering',
    href: '/ai-engineering',
    findItem: (items) => items.find((item) => item.kind === 'ai-engineering'),
  },
  {
    id: 'learning-and-development',
    label: 'Learning and Development',
    href: '/learning-and-development',
    findItem: (items) => items.find((item) => item.kind === 'learning'),
  },
  {
    id: 'writing-and-notes',
    label: 'Writing and Notes',
    href: '/writing',
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
              <ContentLink item={area.item} label={area.label} href={area.href} />
            </h2>
            <p>{area.item.summary}</p>
            <span>{area.item.title}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
