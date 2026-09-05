import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { ProjectCaseStudyHeader } from './ProjectCaseStudyHeader'

describe('ProjectCaseStudyHeader', () => {
  test.each([
    ['standard', 'Marketplace baseline', 'marketplace-case-study-hero'],
    ['learning-lab', 'Agentic Learning Lab', 'learning-lab-case-study-hero'],
    ['wild-bunch', 'Wild Bunch', 'wild-bunch-case-study-hero'],
    ['patch', 'Adventures of Patch', 'patch-case-study-hero'],
  ] as const)('owns the %s project header contract', (layout, title, visualContract) => {
    const { container } = render(
      <PortfolioThemeProvider>
        <ProjectCaseStudyHeader
          eyebrow="project"
          title={title}
          summary="A project summary with an explicit visual boundary."
          status="active project"
          layout={layout}
          visualContract={visualContract}
          visual={<div data-testid="test-visual">Visual</div>}
          visualFallback={<div data-testid="test-fallback">Fallback</div>}
        />
      </PortfolioThemeProvider>,
    )

    const header = container.querySelector('header')
    expect(header).toHaveAttribute('data-project-case-study-layout', layout)
    expect(header).toHaveAttribute('data-visual-contract', visualContract)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeVisible()
    expect(screen.getByText('A project summary with an explicit visual boundary.')).toBeVisible()
    expect(screen.getByText('active project')).toBeVisible()
    expect(screen.getByTestId('test-visual')).toBeVisible()
    expect(screen.queryByTestId('test-fallback')).not.toBeInTheDocument()
  })

  test('renders the owned visual fallback while a lazy visual is suspended', () => {
    render(
      <PortfolioThemeProvider>
        <ProjectCaseStudyHeader
          eyebrow="project"
          title="Marketplace baseline"
          summary="A project summary."
          status="live"
          layout="standard"
          visualContract="marketplace-case-study-hero"
          visual={undefined}
          visualFallback={<div data-testid="test-fallback">Fallback</div>}
        />
      </PortfolioThemeProvider>,
    )

    expect(screen.getByTestId('test-fallback')).toBeVisible()
  })
})
