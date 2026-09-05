import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { getProjectSummaries } from '../../data'
import {
  CvHeader,
  CvSection,
  CvRole,
  CvDownloadFooter,
  CvEducationList,
  CvProjectList,
} from './CvContent'

test('project list renders the order and summaries supplied by its parent', () => {
  const projects = getProjectSummaries().slice(0, 2).reverse()
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <CvProjectList projects={projects} />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )
  expect(
    screen.getAllByRole('heading').map((heading) => heading.textContent),
  ).toEqual(projects.map((project) => project.title))
  for (const project of projects)
    expect(screen.getByRole('link', { name: project.title })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`,
    )
})

test('CV composition preserves parent links, named sections, education pairing and download actions', () => {
  const { container } = render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <CvHeader
          headingId="name"
          eyebrow="Curriculum vitae"
          name="Fixture engineer"
          headline="Engineer"
          availability="Available"
          links={[{ label: 'Contact', href: '/contact' }]}
          downloadHref="/cv.pdf"
          downloadLabel="Download PDF"
          downloadAriaLabel="Download CV at the top"
        />
        <CvSection headingId="profile" title="Profile" divider="none">
          <p>Profile text</p>
        </CvSection>
        <CvSection headingId="work" title="Employment" headingWrap="balanced">
          <CvRole>Engineer · 2021</CvRole>
        </CvSection>
        <CvEducationList
          records={[
            {
              id: 'study',
              level: 'Level 6',
              title: 'Engineering',
              periodLabel: '2026',
            },
          ]}
        />
        <CvDownloadFooter
          prompt="Keep a copy."
          downloadHref="/cv.pdf"
          downloadLabel="Download PDF"
          downloadAriaLabel="Download CV at the end"
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Fixture engineer',
  )
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
    'href',
    '/contact',
  )
  expect(screen.getAllByRole('link', { name: 'Download PDF' })).toHaveLength(2)
  expect(screen.getByRole('region', { name: 'Profile' })).toHaveAttribute(
    'data-divider',
    'none',
  )
  expect(
    within(screen.getByRole('region', { name: 'Employment' })).getByRole(
      'heading',
    ),
  ).toHaveAttribute('data-text-wrap', 'balanced')
  const record = screen.getByText('Level 6').parentElement!
  expect(record.querySelector('dt')).toHaveTextContent('Level 6')
  expect(record.querySelector('dd')).toHaveTextContent('Engineering2026')
  expect(
    container.querySelector(
      '[divider], [headingWrap], [wrap], [position], [node]',
    ),
  ).toBeNull()
  expect(
    container.querySelector('a[href^="mailto:"], a[href^="tel:"]'),
  ).toBeNull()
})
