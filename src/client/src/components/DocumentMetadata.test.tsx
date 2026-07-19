import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { DocumentMetadata } from './DocumentMetadata'
import { RouteErrorBoundary } from './RouteErrorBoundary'

function readMeta(name: string): HTMLMetaElement | null {
  return document.head.querySelector(`meta[name="${name}"]`)
}

function readCanonical(): HTMLLinkElement | null {
  return document.head.querySelector('link[rel="canonical"]')
}

describe('DocumentMetadata', () => {
  afterEach(() => {
    document.title = 'Portfolio'
    readMeta('description')?.remove()
    readCanonical()?.remove()
  })

  test('sets a useful title, description, and canonical URL for a public page', () => {
    render(
      <DocumentMetadata
        title="Project Stories | Harley Bartles"
        description="Selected public engineering project stories from Harley Bartles."
        canonicalPath="/projects"
      />,
    )

    expect(document.title).toBe('Project Stories | Harley Bartles')
    expect(readMeta('description')).toHaveAttribute(
      'content',
      'Selected public engineering project stories from Harley Bartles.',
    )
    expect(readCanonical()).toHaveAttribute('href', 'https://harleybartles.com/projects')
  })

  test('normalizes canonical paths without exposing server paths or query details', () => {
    render(
      <DocumentMetadata
        title="Portfolio Error | Harley Bartles"
        description="Portfolio content could not be loaded."
        canonicalPath="Z:\\portfolio\\src\\client\\server-error?trace=true"
      />,
    )

    expect(readCanonical()).toHaveAttribute('href', 'https://harleybartles.com/')
    expect(readCanonical()?.getAttribute('href')).not.toContain('Z:')
    expect(readCanonical()?.getAttribute('href')).not.toContain('trace')
  })
})

describe('RouteErrorBoundary', () => {
  test('announces route failures without leaking exception details and offers recovery', async () => {
    function BrokenRoute(): ReactElement {
      throw new Error('Z:\\portfolio\\src\\server\\content-manifest.json failed')
    }

    const router = createMemoryRouter([
      {
        path: '/',
        element: <BrokenRoute />,
        errorElement: <RouteErrorBoundary />,
      },
    ])

    render(<RouterProvider router={router} />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/could not load this portfolio route/i)
    expect(alert).not.toHaveTextContent('Z:\\portfolio')
    expect(alert).not.toHaveTextContent('content-manifest.json')
    expect(screen.getByRole('link', { name: /return to the homepage/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /view project stories/i })).toHaveAttribute('href', '/projects')
    expect(document.title).toBe('Portfolio Error | Harley Bartles')
  })
})
