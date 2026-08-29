import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { AboutPage } from './AboutPage'
import { CvPage } from './CvPage'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`

test('composes a two-page CV from the approved professional facts', () => {
  const { container } = render(
    <MemoryRouter>
      <CvPage />
    </MemoryRouter>,
  )

  const pages = container.querySelectorAll('[data-cv-page]')
  expect(pages).toHaveLength(2)
  expect(pages[0]).toHaveAttribute('data-cv-page', '1')
  expect(pages[1]).toHaveAttribute('data-cv-page', '2')
  expect(screen.getByRole('heading', { level: 1, name: 'Harley Bartles' })).toBeVisible()
  expect(screen.getByText('Full-stack software engineer', { exact: true })).toBeVisible()
  expect(screen.getByText('Software Engineer · September 2021 – present')).toBeVisible()
  expect(screen.getByText(/Four weeks' notice/)).toBeVisible()
  expect(screen.getByText('Higher education - in progress')).toBeVisible()
  expect(screen.getByText("Bachelor's degree-level qualification (Level 6), delivered against the Machine Learning Engineer standard (ST1398 v1.0).")).toBeVisible()
  expect(screen.getAllByText('Further education')).toHaveLength(2)
  expect(screen.getByText('Secondary education')).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Agent Asset Marketplace' })).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Wild Bunch' })).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Agentic Learning Lab' })).toBeVisible()
  expect(screen.getByText(/SQL Server \/ MySQL/)).toBeVisible()
  expect(screen.getByText('Earlier production experience', { exact: false }).parentElement).not.toHaveTextContent('SQL Server')
  expect(screen.queryByRole('link', { name: 'Return to About' })).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    pdfHref,
  )
  expect(container.querySelector('a[href^="mailto:"], a[href^="tel:"]')).toBeNull()
  expect(container).not.toHaveTextContent(/salary|acting|shameless/i)
  expect(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'CV' })).toHaveAttribute('href', '/cv')
})

test('replaces About’s future-CV boundary with finished conversion actions', () => {
  const { container } = render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  )

  expect(screen.queryByText('A conventional CV download is coming.')).not.toBeInTheDocument()
  const conversion = container.querySelector<HTMLElement>('[data-visual-contract="about-cv-conversion"]')
  expect(conversion).not.toBeNull()
  if (conversion === null) return
  expect(within(conversion).getByRole('link', { name: 'Read the CV' })).toHaveAttribute('href', '/cv')
  expect(within(conversion).getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    pdfHref,
  )
  expect(within(conversion).getByText(/notice period is four weeks/i)).toBeVisible()
  expect(screen.getByRole('heading', { name: 'AI Engineer Level 6 apprenticeship.' })).toBeVisible()
})
