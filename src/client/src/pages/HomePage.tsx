import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { OrientationStrip } from '../components/OrientationStrip'
import { SiteLayout } from '../components/SiteLayout'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function HomePage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  return (
    <SiteLayout>
      <section className="hero" aria-labelledby="homepage-title">
        <p className="eyebrow">Portfolio</p>
        <h1 id="homepage-title">Harley Bartles: Full Stack Software Engineer.</h1>
        <p className="hero-support">
          AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.
        </p>
      </section>
      {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
      {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
      {navigationQuery.isSuccess ? <OrientationStrip items={navigationQuery.data} /> : null}
    </SiteLayout>
  )
}
