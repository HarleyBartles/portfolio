import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import {
  HomeBody,
  HomeCtaAnchor,
  HomeDisplayTitle,
  HomeEyebrow,
  HomeFrame,
  HomeNextAnchor,
  HomeRouteActions,
  HomeRouteLink,
  HomeSectionTitle,
} from './HomePrimitives'

test('owns the shared homepage frame and type grammar', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <HomeFrame>Frame</HomeFrame>
        <HomeEyebrow>Eyebrow</HomeEyebrow>
        <HomeDisplayTitle>Display</HomeDisplayTitle>
        <HomeSectionTitle>Section</HomeSectionTitle>
        <HomeBody>Body</HomeBody>
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByText('Frame')).toHaveAttribute('data-home-frame')
  expect(screen.getByText('Eyebrow')).toHaveStyle({ fontSize: '14px', fontWeight: '600' })
  expect(screen.getByRole('heading', { level: 1, name: 'Display' })).toHaveStyle({ lineHeight: '.96' })
  expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toHaveStyle({ lineHeight: '.98' })
  expect(screen.getByText('Body')).toHaveStyle({ fontSize: '18px', lineHeight: '1.62' })
})

test('keeps homepage actions as text links rather than filled controls', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <HomeRouteActions>
          <HomeRouteLink to="/writing">Route →</HomeRouteLink>
          <HomeCtaAnchor href="#work">Work ↓</HomeCtaAnchor>
          <HomeNextAnchor href="#next">Next ↓</HomeNextAnchor>
        </HomeRouteActions>
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  const route = screen.getByRole('link', { name: 'Route →' })
  const cta = screen.getByRole('link', { name: 'Work ↓' })
  const next = screen.getByRole('link', { name: 'Next ↓' })

  expect(route).toHaveAttribute('href', '/writing')
  expect(route).toHaveStyle({ display: 'inline-block', fontWeight: '600' })
  expect(cta).toHaveStyle({ display: 'inline-block', fontWeight: '600' })
  expect(next).toHaveStyle({ fontSize: '15px', fontWeight: '600' })
  for (const link of [route, cta, next]) {
    expect(link).not.toHaveStyle({ backgroundColor: 'var(--color-accent)' })
  }
})
