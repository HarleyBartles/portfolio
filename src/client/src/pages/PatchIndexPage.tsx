import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata, IndexHeader, PatchStoryIndexEntry, SiteLayout } from '../components'
import { getInFlightWorlds } from '../features/case-study/patch/patchEvidence'
import '../features/patch-showcase/PatchShowcase.scss'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import type { ContentSummaryOf } from '../types'
import '../styles/interior.scss'

const FairytaleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(${({ theme }) => theme.space.xl}, 6vw, ${({ theme }) => theme.space.xxxxl}) ${({ theme }) => theme.space.xl};

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`

const statusLabels = {
  'advanced-visual-preproduction': 'Advanced visual pre-production',
  'visual-development': 'Visual development',
  'legacy-reference': 'Legacy reference',
} as const

export const PatchIndexPage = () => {
  const navigationQuery = useQuery(contentQueries.navigation())
  const patchStories = navigationQuery.data?.filter((item) => item.kind === 'patch') ?? []
  const fairytales = patchStories.filter((item): item is ContentSummaryOf<'patch'> => item.kind === 'patch' && (item.slug === 'goldilocks' || item.slug === 'sorcerers-apprentice'))
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
        <IndexHeader
          eyebrow="Adventures of Patch / visual lessons"
          title="Adventures of Patch"
          summary="Small fairytales and larger adventures about how agents interpret work, where they go wrong and what useful intervention looks like."
          layout="split"
          headingId="patch-index-title"
        />
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
              <FairytaleGrid className="editorial-index-grid editorial-index-grid--fairytales">
                {fairytales.map((item, index) => <PatchStoryIndexEntry item={item} index={index} key={item.slug} />)}
              </FairytaleGrid>
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
