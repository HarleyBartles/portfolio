import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../components'
import { AboutPage } from './AboutPage'
import { CvPage } from './CvPage'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`

test('composes a two-page CV from the approved professional facts', () => {
  const { container } = render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <CvPage />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  const pages = container.querySelectorAll('[data-cv-page]')
  expect(container.querySelector('[data-type-register="site-sans"]')).toBeInTheDocument()
  expect(container.querySelector('[data-type-register="article-serif"]')).not.toBeInTheDocument()
  expect(pages).toHaveLength(2)
  expect(pages[0]).toHaveAttribute('data-cv-page', '1')
  expect(pages[1]).toHaveAttribute('data-cv-page', '2')
  expect(screen.getByRole('heading', { level: 1, name: 'Harley Bartles' })).toBeVisible()
  expect(screen.getByText('Full-stack software engineer', { exact: true })).toBeVisible()
  expect(screen.getByText('Software Engineer · September 2021 – present')).toBeVisible()
  expect(screen.getByText(/\.NET API on Azure Functions/)).toBeVisible()
  expect(container).not.toHaveTextContent(/\.NET 8/)
  expect(screen.getByText(/Four weeks' notice/)).toBeVisible()
  expect(screen.getByText('Higher education - in progress')).toBeVisible()
  expect(screen.getByText('QA (qa.com)')).toBeVisible()
  expect(screen.getByText("Bachelor's degree-level qualification (Level 6), delivered against the Machine Learning Engineer standard (ST1398 v1.0).")).toBeVisible()
  expect(screen.getAllByText('Further education')).toHaveLength(2)
  expect(screen.getByText('Secondary education')).toBeVisible()
  const secondaryEducation = screen.getByRole('heading', { level: 3, name: 'Seven GCSEs' }).closest('dd')
  expect(secondaryEducation).toHaveTextContent('Spurley Hey High School')
  expect(secondaryEducation).toHaveTextContent('1992 – 1997')
  expect(screen.getByRole('heading', { level: 3, name: 'Agent Asset Marketplace' })).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Wild Bunch' })).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Agentic Learning Lab' })).toBeVisible()
  expect(screen.getByRole('heading', { level: 3, name: 'Adventures of Patch' })).toBeVisible()
  const brandAddition = screen.getByRole('heading', { level: 2, name: 'Brand Addition' }).closest('section')
  expect(brandAddition).not.toBeNull()
  if (brandAddition === null) return
  expect(brandAddition).toHaveTextContent('2005–2015: order administration → Account Executive → Account Manager → Team Manager')
  expect(brandAddition).toHaveTextContent('I started in order administration, became an Account Executive, then an Account Manager, before moving into team management.')
  expect(brandAddition).toHaveTextContent('May 2015–January 2019: Web Manager')
  expect(brandAddition).not.toHaveTextContent('Commercial roles')
  const responsibilities = within(brandAddition).getByRole('list')
  expect(within(responsibilities).getAllByRole('listitem')).toHaveLength(2)
  expect(
    within(responsibilities).getByText(
      /As Team Manager, I managed an operational account-support unit: 3–5 Account Managers/,
    ),
  ).toBeVisible()
  expect(
    within(responsibilities).getByText(/around eight Account Executives and two Order Administrators/),
  ).toBeVisible()
  expect(
    within(responsibilities).getByText(/As Web Manager I defined requirements/),
  ).toBeVisible()
  expect(screen.getByText(/SQL Server \/ MySQL/)).toBeVisible()
  expect(screen.getByText('Earlier production experience', { exact: false }).parentElement).not.toHaveTextContent('SQL Server')
  expect(screen.queryByRole('link', { name: 'Return to About' })).not.toBeInTheDocument()
  const downloadLinks = screen.getAllByRole('link', { name: 'Download PDF' })
  expect(downloadLinks).toHaveLength(2)
  expect(downloadLinks.every((link) => link.getAttribute('href') === pdfHref)).toBe(true)
  expect(screen.getByRole('navigation', { name: 'Download CV at the top' })).toContainElement(downloadLinks[0])
  expect(screen.getByRole('navigation', { name: 'Download CV at the end' })).toContainElement(downloadLinks[1])
  expect(container.querySelector('a[href^="mailto:"], a[href^="tel:"]')).toBeNull()
  expect(container).not.toHaveTextContent(/salary|acting|shameless/i)
  expect(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'CV' })).toHaveAttribute('href', '/cv')
})

test('leads About with the next-role conversion and routes its CTA to contact', () => {
  const { container } = render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.queryByText('A conventional CV download is coming.')).not.toBeInTheDocument()
  const conversion = container.querySelector<HTMLElement>('[data-visual-contract="about-cv-conversion"]')
  expect(conversion).not.toBeNull()
  if (conversion === null) return
  expect(within(conversion).getByRole('link', { name: 'Read the CV' })).toHaveAttribute('href', '/cv')
  expect(within(conversion).getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact')
  expect(within(conversion).queryByRole('link', { name: 'Download PDF' })).not.toBeInTheDocument()
  expect(within(conversion).getByText(/notice period is four weeks/i)).toBeVisible()
  expect(screen.queryByText(/my formal title is software engineer/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Send message' })).not.toBeInTheDocument()
  expect(screen.queryByText(/contact delivery is not connected yet/i)).not.toBeInTheDocument()
  expect(screen.getByText('No source capture, no success.').closest('blockquote')).toHaveAttribute(
    'data-type-register',
    'site-sans',
  )
  expect(container.querySelectorAll('[data-professional-rail="chronology"]')).toHaveLength(1)
  expect(container.querySelector('[data-type-register="article-serif"]')).not.toBeInTheDocument()
  const currentWork = screen.getByRole('heading', { name: 'Access Checks, end to end.' }).closest('section')
  expect(currentWork).not.toBeNull()
  if (currentWork === null) return
  expect(conversion.compareDocumentPosition(currentWork) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'AI Engineer Level 6.' })).toBeVisible()
  const career = screen.getByRole('heading', { name: 'How I got here.' }).closest('section')
  expect(career).not.toBeNull()
  if (career === null) return
  expect(within(career).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([
    'The Access Group',
    'Barbican Insurance Group → Arch Capital Group',
    'Brand Addition',
    'There was an acting career too.',
  ])
  expect(within(career).getByRole('heading', { name: 'There was an acting career too.' })).toBeVisible()
})

test('About lists every project story from the shared project catalogue', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  const independentWork = screen.getByRole('heading', { name: 'Work I can show you.' }).parentElement
  expect(independentWork).not.toBeNull()
  if (independentWork === null) return

  expect(within(independentWork).getByRole('link', { name: 'Adventures of Patch' })).toHaveAttribute(
    'href',
    '/projects/adventures-of-patch',
  )
  expect(within(independentWork).getAllByRole('link', { name: 'Read the case study' })).toHaveLength(4)
})
