import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata, Eyebrow, PatchStoryIndexEntry, SiteLayout, type PatchStoryMedia } from '../components'
import { PatchSeriesLockup } from '../features/patch-brand/PatchBrand'
import { getInFlightWorlds } from '../features/case-study/patch/patchEvidence'
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

const PatchIndex = styled.section`
  display: grid; gap: clamp(var(--space-16), 8vw, var(--space-24));
  .patch-index__header { display: grid; grid-template-columns: minmax(12rem,.7fr) minmax(0,1.3fr); gap: var(--space-8); align-items: end; }
  .patch-index__mark { width: min(18rem, 100%); color: var(--color-ink); }
  .patch-index__intro h1 { margin: var(--space-3) 0 var(--space-4); font-size: clamp(2.8rem, 6vw, 5.25rem); }
  .patch-index__intro p:last-child { color: var(--color-muted); }
  .patch-index__group { display: grid; gap: var(--space-10); } .patch-index__group-heading { max-width: 46rem; } .patch-index__group-heading h2 { margin: var(--space-3) 0 var(--space-4); font-size: clamp(2.4rem,6vw,5.25rem); } .patch-index__group-heading p:last-child { color: var(--color-muted); }
  .patch-index__adventures { display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); border-top: 1px solid var(--color-ink); } .patch-index__adventures article { grid-column: span 4; padding: var(--space-7) var(--space-6) var(--space-8) 0; border-bottom: 1px solid var(--color-ink); } .patch-index__adventures article + article { padding-left: var(--space-6); border-left: 1px solid var(--color-border); } .patch-index__adventures h3 { margin: var(--space-3) 0 var(--space-4); font-size: clamp(1.65rem,3vw,2.5rem); } .patch-index__adventures h3 a { color: var(--color-ink); text-decoration-color: var(--color-accent); } .patch-index__adventures p { margin: 0; } .patch-index .patch-status { color: #0d7476; font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; } .patch-index__evidence { margin-top: var(--space-5) !important; color: var(--color-muted); }
  @media (max-width: 58rem) { .patch-index__adventures article { grid-column: span 12; padding-inline: 0; border-left: 0 !important; } }
  @media (max-width: 44rem) { .patch-index__header { grid-template-columns: 1fr; } }
`

const statusLabels = {
  'advanced-visual-preproduction': 'Advanced visual pre-production',
  'visual-development': 'Visual development',
  'legacy-reference': 'Legacy reference',
} as const

const fairytaleMedia: Record<string, PatchStoryMedia> = {
  goldilocks: { alt: 'Three scenes compare too much, too little, and just enough guidance for Patch.', folder: 'goldilocks' },
  'sorcerers-apprentice': { alt: 'A bounded five-worker delegation expands into an uncontrolled crowd before a delegation policy restores limits.', folder: 'sorcerers-apprentice' },
}

export const PatchIndexPage = () => {
  const navigationQuery = useQuery(contentQueries.navigation())
  const patchStories = navigationQuery.data?.filter((item) => item.kind === 'patch') ?? []
  const fairytales = patchStories.filter((item): item is ContentSummaryOf<'patch'> => item.kind === 'patch' && (item.slug === 'goldilocks' || item.slug === 'sorcerers-apprentice'))
  const identity = patchStories.find((item) => item.slug === 'identity-emporium')
  const tournament = patchStories.find((item) => item.slug === 'tournament-of-reasonable-defaults')
  const heist = patchStories.find((item) => item.slug === 'the-usual-specialists')
  const worlds = getInFlightWorlds()

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Adventures of Patch | Harley Bartles"
        description="Visual stories that turn agentic-engineering practice into memorable, inspectable lessons."
        canonicalPath="/patch"
      />
      <PatchIndex className="content-index patch-index" aria-labelledby="patch-index-title" data-testid="patch-index" data-visual-contract="patch-index">
        <header className="patch-index__header"><div className="patch-index__mark"><PatchSeriesLockup /></div><div className="patch-index__intro"><Eyebrow>Visual lessons</Eyebrow><h1 id="patch-index-title">Adventures of Patch</h1><p>Small fairytales and larger adventures about how agents interpret work, where they go wrong and what useful intervention looks like.</p></div></header>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <>
            <section className="patch-index__group" aria-labelledby="patch-fairytales-title">
              <div className="patch-index__group-heading">
                <Eyebrow>Short form</Eyebrow>
                <h2 id="patch-fairytales-title">One-page fairytales</h2>
                <p>One familiar story, one operational lesson, one useful action.</p>
              </div>
              <FairytaleGrid className="editorial-index-grid editorial-index-grid--fairytales">
                {fairytales.map((item, index) => <PatchStoryIndexEntry item={item} index={index} key={item.slug} media={fairytaleMedia[item.slug]} />)}
              </FairytaleGrid>
            </section>
            <section className="patch-index__group" aria-labelledby="patch-adventures-title">
              <div className="patch-index__group-heading">
                <Eyebrow>Long form</Eyebrow>
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
                      {world.title === 'The Usual Specialists' && heist !== undefined ? <Link to="/patch/the-usual-specialists">{world.title}</Link> : null}
                      {world.title !== 'Identity Emporium' && world.title !== 'Tournament of Reasonable Defaults' && world.title !== 'The Usual Specialists' ? world.title : null}
                    </h3>
                    <p>{world.lesson}</p>
                    <p className="patch-index__evidence">{world.currentEvidence}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </PatchIndex>
    </SiteLayout>
  )
}
