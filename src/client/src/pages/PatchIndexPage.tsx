import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata, Eyebrow, PatchStoryIndexEntry, SiteLayout, type PatchStoryMedia } from '../components'
import { PatchSeriesLockup, UsualSpecialistsWordmark } from '../features/patch-brand/PatchBrand'
import { getInFlightWorlds, getPatchAssetPath } from '../features/case-study/patch/patchEvidence'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import type { ContentSummaryOf } from '../types'
import '../styles/interior.scss'

const FairytaleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.xl};

  .editorial-card {
    background: var(--patch-paper);
  }

  .fairytale-thumbnail {
    aspect-ratio: 16 / 7;
  }

  .editorial-card-copy {
    padding-top: var(--space-4);
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`

const PatchIndex = styled.section`
  --patch-paper: #f7f4ec;
  display: grid;
  gap: clamp(var(--space-16), 7vw, var(--space-24));

  .patch-index__header {
    display: grid;
    grid-template-columns: minmax(18rem, 32rem) minmax(0, 34rem);
    gap: clamp(var(--space-8), 6vw, var(--space-16));
    align-items: end;
    padding-block: clamp(var(--space-8), 5vw, var(--space-16));
    border-bottom: 1px solid var(--color-border);
  }

  .patch-index__mark {
    width: 100%;
    color: var(--color-ink);
  }

  .patch-index__semantic-title {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .patch-index__intro p:last-child {
    max-width: 34rem;
    margin: var(--space-3) 0 0;
    color: var(--color-muted);
    font-size: clamp(1.15rem, 1.8vw, 1.45rem);
    line-height: 1.45;
  }

  .patch-index__character-intro {
    display: grid;
    grid-template-columns: minmax(18rem, .82fr) minmax(0, 1.18fr);
    overflow: hidden;
    border-block: 1px solid var(--color-border);
    background: var(--patch-paper);
  }

  .patch-index__character-copy {
    display: grid;
    align-content: center;
    gap: var(--space-5);
    padding: clamp(var(--space-8), 5vw, var(--space-14));
  }

  .patch-index__character-copy h2 {
    margin: 0;
    font-size: clamp(2.8rem, 5vw, 5.25rem);
    line-height: .96;
  }

  .patch-index__character-copy p {
    max-width: 36rem;
    margin: 0;
  }

  .patch-index__character-copy p:not([data-eyebrow]) {
    font-size: clamp(1.08rem, 1.65vw, 1.3rem);
    line-height: 1.5;
  }

  .patch-index__character-visual {
    display: block;
    min-width: 0;
    background: var(--patch-paper);
  }

  .patch-index__character-visual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .patch-index__group {
    display: grid;
    gap: var(--space-10);
  }

  .patch-index__group-heading {
    max-width: 46rem;
  }

  .patch-index__group-heading h2 {
    margin: var(--space-3) 0 var(--space-4);
    font-size: clamp(2.4rem, 5vw, 4.6rem);
  }

  .patch-index__group-heading p:last-child {
    color: var(--color-muted);
  }

  .patch-index__lead-adventure {
    display: grid;
    grid-template-columns: minmax(18rem, .82fr) minmax(0, 1.18fr);
    overflow: hidden;
    color: #f7efdd;
    background: #18211c;
    border: 1px solid #18211c;
  }

  .patch-index__lead-copy {
    display: grid;
    align-content: center;
    gap: var(--space-6);
    padding: clamp(var(--space-8), 5vw, var(--space-14));
  }

  .patch-index__lead-wordmark {
    width: min(34rem, 100%);
    color: #f7efdd;
  }

  .patch-index__lead-copy p {
    margin: 0;
  }

  .patch-index__lead-copy > p:not(.patch-status) {
    max-width: 34rem;
    font-size: clamp(1.1rem, 1.7vw, 1.3rem);
    line-height: 1.45;
  }

  .patch-index__lead-copy a {
    width: fit-content;
    color: #f7efdd;
    font-weight: 700;
    text-decoration-color: #f2c35b;
    text-underline-offset: .22em;
  }

  .patch-index__lead-visual {
    display: block;
    min-height: 30rem;
    background: #d4a43b;
  }

  .patch-index__lead-visual img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 30rem;
    object-fit: cover;
  }

  .patch-index__adventure-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-8);
  }

  .patch-index__adventure-card {
    display: grid;
    align-content: start;
    min-width: 0;
    border: 1px solid var(--color-border);
    background: var(--patch-paper);
  }

  .patch-index__adventure-card > a:first-child {
    display: block;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .patch-index__adventure-card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 180ms ease;
  }

  .patch-index__adventure-card > a:first-child:hover img {
    transform: scale(1.015);
  }

  .patch-index__adventure-copy {
    display: grid;
    align-content: start;
    gap: var(--space-4);
    padding: var(--space-6);
  }

  .patch-index__adventure-copy h3 {
    margin: 0;
    min-block-size: 2.04em;
    font-size: clamp(1.8rem, 3.2vw, 3rem);
    line-height: 1.02;
  }

  .patch-index__adventure-copy h3 a {
    color: var(--color-ink);
    text-decoration-color: var(--color-accent);
    text-underline-offset: .14em;
  }

  .patch-index__adventure-copy p {
    margin: 0;
  }

  .patch-index__fairytales {
    padding-top: clamp(var(--space-8), 5vw, var(--space-14));
    border-top: 1px solid var(--color-ink);
  }

  .patch-index__fairytales .patch-index__group-heading h2 {
    font-size: clamp(2rem, 4vw, 3.3rem);
  }

  @media (max-width: 58rem) {
    .patch-index__header,
    .patch-index__character-intro,
    .patch-index__lead-adventure {
      grid-template-columns: 1fr;
    }

    .patch-index__mark {
      width: min(28rem, 100%);
    }

    .patch-index__lead-visual,
    .patch-index__lead-visual img {
      min-height: 0;
    }

    .patch-index__lead-visual img {
      aspect-ratio: 16 / 9;
    }

    .patch-index__character-visual {
      order: -1;
    }

    .patch-index__character-visual img {
      max-height: 42rem;
      object-fit: contain;
    }
  }

  @media (max-width: 44rem) {
    .patch-index__adventure-pair {
      grid-template-columns: 1fr;
    }

    .patch-index__adventure-copy h3 {
      min-block-size: 0;
    }

    .patch-index__header {
      gap: var(--space-6);
    }
  }
`

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
  const specialistsWorld = worlds.find((world) => world.title === 'The Usual Specialists')
  const tournamentWorld = worlds.find((world) => world.title === 'Tournament of Reasonable Defaults')
  const identityWorld = worlds.find((world) => world.title === 'Identity Emporium')

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Adventures of Patch | Harley Bartles"
        description="Visual stories that turn agentic-engineering practice into memorable, inspectable lessons."
        canonicalPath="/patch"
      />
      <PatchIndex className="content-index patch-index" aria-labelledby="patch-index-title" data-testid="patch-index" data-visual-contract="patch-index">
        <header className="patch-index__header">
          <div className="patch-index__mark"><PatchSeriesLockup /></div>
          <div className="patch-index__intro">
            <h1 id="patch-index-title" className="patch-index__semantic-title">Adventures of Patch</h1>
            <Eyebrow>Visual lessons</Eyebrow>
            <p>Stories about agents, ambiguity, judgement and the useful interventions that keep work on course.</p>
          </div>
        </header>
        <section className="patch-index__character-intro" aria-labelledby="patch-introducing-title">
          <div className="patch-index__character-copy">
            <Eyebrow>Meet your guide</Eyebrow>
            <h2 id="patch-introducing-title">Introducing Patch</h2>
            <p>Patch is my recurring guide to the bits of agentic engineering that are easier to remember as a story than as a rule.</p>
            <p>He gets sent into bad briefs, questionable defaults, over-eager delegation and the other places where an agent needs useful human judgement.</p>
          </div>
          <picture className="patch-index__character-visual" data-visual-contract="patch-index-introducing-patch">
            <source media="(min-width: 45rem)" srcSet={getPatchAssetPath('src/client/public/media/patch/patch-hero-1000.avif')} type="image/avif" />
            <source media="(min-width: 45rem)" srcSet={getPatchAssetPath('src/client/public/media/patch/patch-hero-1000.webp')} type="image/webp" />
            <source srcSet={getPatchAssetPath('src/client/public/media/patch/patch-hero-500.avif')} type="image/avif" />
            <source srcSet={getPatchAssetPath('src/client/public/media/patch/patch-hero-500.webp')} type="image/webp" />
            <img
              src={getPatchAssetPath('src/client/public/media/patch/patch-hero-500.webp')}
              alt="Patch carries an index card and folded map, ready to turn an engineering lesson into a story."
              width="500"
              height="672"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </section>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <>
            <section className="patch-index__group" aria-labelledby="patch-adventures-title">
              <div className="patch-index__group-heading">
                <Eyebrow>Long form</Eyebrow>
                <h2 id="patch-adventures-title">Adventures</h2>
                <p>Broader worlds with room for the failure mode, the joke and the engineering consequence.</p>
              </div>
              {specialistsWorld !== undefined && heist !== undefined ? (
                <article className="patch-index__lead-adventure" aria-label="The Usual Specialists">
                  <div className="patch-index__lead-copy">
                    <Link to="/patch/the-usual-specialists" aria-label="Read The Usual Specialists" className="patch-index__lead-wordmark">
                      <UsualSpecialistsWordmark decorative />
                    </Link>
                    <p>{specialistsWorld.lesson}</p>
                    <Link to="/patch/the-usual-specialists">Read The Usual Specialists</Link>
                  </div>
                  <Link to="/patch/the-usual-specialists" className="patch-index__lead-visual" aria-label="View The Usual Specialists">
                    <img src={getPatchAssetPath('src/client/public/media/patch/patch-heist-1200.avif')} alt="The completed Usual Specialists recruitment folder with every specialist marked in." width="1200" height="900" loading="lazy" decoding="async" />
                  </Link>
                </article>
              ) : null}

              <div className="patch-index__adventure-pair">
                {tournamentWorld !== undefined && tournament !== undefined ? (
                  <article className="patch-index__adventure-card" aria-label="Tournament of Reasonable Defaults">
                    <Link to="/patch/tournament-of-reasonable-defaults" aria-label="View Tournament of Reasonable Defaults">
                      <img src={getPatchAssetPath('src/client/public/media/patch/patch-tournament-1200.avif')} alt="Patch consulting tournament officials beside a route map and decision sheets." width="1200" height="900" loading="lazy" decoding="async" />
                    </Link>
                    <div className="patch-index__adventure-copy">
                      <h3><Link to="/patch/tournament-of-reasonable-defaults">Tournament of Reasonable Defaults</Link></h3>
                      <p>{tournamentWorld.lesson}</p>
                    </div>
                  </article>
                ) : null}

                {identityWorld !== undefined && identity !== undefined ? (
                  <article className="patch-index__adventure-card" aria-label="Identity Emporium">
                    <Link to="/patch/identity-emporium" aria-label="View Identity Emporium">
                      <img src={getPatchAssetPath('src/client/public/media/patch/patch-identity-1200.avif')} alt="Patch choosing task-specific preparation inside the Identity Emporium." width="1200" height="960" loading="lazy" decoding="async" />
                    </Link>
                    <div className="patch-index__adventure-copy">
                      <h3><Link to="/patch/identity-emporium">Identity Emporium</Link></h3>
                      <p>{identityWorld.lesson}</p>
                    </div>
                  </article>
                ) : null}
              </div>
            </section>

            <section className="patch-index__group patch-index__fairytales" aria-labelledby="patch-fairytales-title">
              <div className="patch-index__group-heading">
                <Eyebrow>Short tales</Eyebrow>
                <h2 id="patch-fairytales-title">Patch fairytales</h2>
                <p>Smaller one-page lessons built around a familiar story and one useful intervention.</p>
              </div>
              <FairytaleGrid className="editorial-index-grid editorial-index-grid--fairytales">
                {fairytales.map((item, index) => <PatchStoryIndexEntry item={item} index={index} key={item.slug} media={fairytaleMedia[item.slug]} />)}
              </FairytaleGrid>
            </section>
          </>
        ) : null}
      </PatchIndex>
    </SiteLayout>
  )
}
