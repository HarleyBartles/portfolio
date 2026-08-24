import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialIndexCard } from '../components/EditorialIndexCard'
import { SiteLayout } from '../components/SiteLayout'
import { getInFlightWorlds } from '../features/case-study/patch/patchEvidence'
import '../features/patch-showcase/PatchShowcase.scss'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

const statusLabels = {
  'advanced-visual-preproduction': 'Advanced visual pre-production',
  'visual-development': 'Visual development',
  'legacy-reference': 'Legacy reference',
} as const

export function PatchIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())
  const patchStories = navigationQuery.data?.filter((item) => item.kind === 'patch') ?? []
  const fairytales = patchStories.filter((item) => item.slug === 'goldilocks' || item.slug === 'sorcerers-apprentice')
  const identity = patchStories.find((item) => item.slug === 'identity-emporium')
  const tournament = patchStories.find((item) => item.slug === 'tournament-of-reasonable-defaults')
  const heist = patchStories.find((item) => item.slug === 'lawful-heist')
  const worlds = getInFlightWorlds()

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Adventures of Patch | Harley Bartles"
        description="Visual stories that turn agentic-engineering practice into memorable, inspectable lessons."
        canonicalPath="/patch"
      />
      <section className="content-index patch-index" aria-labelledby="patch-index-title">
        <header className="index-intro index-intro--split">
          <div>
            <p className="eyebrow">Adventures of Patch / visual lessons</p>
            <h1 id="patch-index-title">Adventures of Patch</h1>
          </div>
          <p className="content-summary">Small fairytales and larger adventures about how agents interpret work, where they go wrong and what useful intervention looks like.</p>
        </header>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <>
            <section className="patch-index__group" aria-labelledby="patch-fairytales-title">
              <div className="patch-index__group-heading">
                <p className="eyebrow">Short form</p>
                <h2 id="patch-fairytales-title">One-page fairytales</h2>
                <p>One familiar story, one operational lesson, one useful action.</p>
              </div>
              <div className="editorial-index-grid editorial-index-grid--fairytales">
                {fairytales.map((item, index) => <EditorialIndexCard item={item} index={index} key={item.slug} />)}
              </div>
            </section>
            <section className="patch-index__group" aria-labelledby="patch-adventures-title">
              <div className="patch-index__group-heading">
                <p className="eyebrow">Long form</p>
                <h2 id="patch-adventures-title">Larger adventures</h2>
                <p>Broader worlds with room for the failure modes, the joke and the engineering consequence.</p>
              </div>
              <div className="patch-index__adventures">
                {worlds.map((world) => (
                  <article key={world.title} aria-label={world.title}>
                    <p className="patch-status">{statusLabels[world.status]}</p>
                    <h3>
                      {world.title === 'Identity Emporium' && identity !== undefined ? <Link to="/patch/identity-emporium">{world.title}</Link> : null}
                      {world.title === 'Tournament of Reasonable Defaults' && tournament !== undefined ? <Link to="/patch/tournament-of-reasonable-defaults">{world.title}</Link> : null}
                      {world.title === 'Lawful Heist' && heist !== undefined ? <Link to="/patch/lawful-heist">{world.title}</Link> : null}
                      {world.title !== 'Identity Emporium' && world.title !== 'Tournament of Reasonable Defaults' && world.title !== 'Lawful Heist' ? world.title : null}
                    </h3>
                    <p>{world.lesson}</p>
                    <p className="patch-index__evidence">{world.currentEvidence}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </section>
    </SiteLayout>
  )
}
