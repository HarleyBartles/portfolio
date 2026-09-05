import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { AboutPage } from '../AboutPage'
import {
  AboutIntro,
  ProfessionalStory,
  ProfessionalTimeline,
} from './AboutComposition'

test('composition owns heading semantics, story layout and parent-supplied timeline order', () => {
  const { container } = render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <AboutIntro
          headingId="intro"
          eyebrow="About"
          title="A title"
          lead="A lead"
        />
        <ProfessionalStory
          headingId="story"
          eyebrow="Study"
          title="Study title"
          lead="Study lead"
          layout="stacked"
        >
          <p>Further evidence</p>
        </ProfessionalStory>
        <ProfessionalTimeline
          headingId="timeline"
          eyebrow="Career"
          title="How I got here."
          entries={[
            {
              id: 'second',
              period: 'Later',
              title: 'Supplied first',
              body: <p>First body</p>,
            },
            {
              id: 'first',
              period: 'Earlier',
              title: 'Supplied second',
              kind: 'aside',
              body: <p>Second body</p>,
            },
          ]}
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )
  expect(
    screen.getByRole('heading', { level: 1, name: 'A title' }),
  ).toHaveAttribute('data-text-wrap', 'display')
  expect(screen.getByRole('region', { name: 'Study title' })).toHaveAttribute(
    'data-professional-story',
    'stacked',
  )
  expect(
    screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent),
  ).toEqual(['Supplied first', 'Supplied second'])
  expect(
    screen.getByRole('complementary', { name: 'Supplied second' }),
  ).toHaveTextContent('Second body')
  expect(
    container.querySelector('[layout], [wrap], [railKind], [node]'),
  ).toBeNull()
})

test('keeps About as the professional assessment surface without rendering Contact', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /I still like writing code/,
    }),
  ).toBeVisible()
  expect(
    screen.getByRole('heading', { name: 'Access Checks, end to end.' }),
  ).toBeVisible()
  expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
    'href',
    '/contact',
  )
  expect(
    screen.queryByRole('heading', { name: 'Get in touch.' }),
  ).not.toBeInTheDocument()
  expect(
    screen.getByText('No source capture, no success.').closest('blockquote'),
  ).toHaveAttribute('data-type-register', 'site-sans')
})
