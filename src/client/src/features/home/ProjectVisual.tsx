import type { ReactElement } from 'react'
import { LearningLoop } from '../case-study/learning-lab/LearningLoop'
import './ProjectVisual.scss'

export type ProjectVisualSlug =
  | 'codex-marketplace'
  | 'agentic-learning-lab'
  | 'adventures-of-patch'
  | 'wild-bunch'
  | 'agentic-engineering-vs-vibe-coding'
  | 'context-is-not-state'

type ProjectVisualProps = {
  slug: ProjectVisualSlug
  eager?: boolean
}

function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function ProjectVisual({ slug, eager = false }: ProjectVisualProps): ReactElement {
  if (slug === 'adventures-of-patch') {
    return (
      <picture className="project-visual project-visual--patch" data-visual-contract="adventures-of-patch-preview">
        <source media="(min-width: 45rem)" srcSet={assetPath('/media/patch/patch-hero-1440.avif')} type="image/avif" />
        <source media="(min-width: 45rem)" srcSet={assetPath('/media/patch/patch-hero-1440.webp')} type="image/webp" />
        <source srcSet={assetPath('/media/patch/patch-hero-720.avif')} type="image/avif" />
        <source srcSet={assetPath('/media/patch/patch-hero-720.webp')} type="image/webp" />
        <img
          src={assetPath('/media/patch/patch-hero-720.webp')}
          alt="Patch carries an index card and folded map, ready to turn an engineering lesson into a story."
          width="720"
          height="403"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </picture>
    )
  }

  if (slug === 'agentic-learning-lab') {
    return <LearningLoop />
  }

  if (slug === 'codex-marketplace') {
    return (
      <figure className="project-visual project-visual--marketplace" aria-label="Marketplace baseline plugins with selected and local repository boundaries.">
        <div className="marketplace-nodes">
          <span>repo-worker-pack</span><span>superpowers-plus</span><span>mcp-usage-pack</span>
        </div>
        <figcaption><strong>17</strong> plugins <i>/</i> <strong>74</strong> entries <small>selected + local</small></figcaption>
      </figure>
    )
  }

  if (slug === 'wild-bunch') {
    return (
      <figure
        aria-label="Wild Bunch generated-town development-build preview"
        className="project-visual project-visual--wild-bunch"
        data-visual-contract="wild-bunch-development-build-preview"
      >
        <picture>
          <source media="(min-width: 960px)" srcSet={assetPath('/media/wild-bunch/dustwell-town-1200.avif')} type="image/avif" />
          <source media="(min-width: 960px)" srcSet={assetPath('/media/wild-bunch/dustwell-town-1200.webp')} type="image/webp" />
          <source srcSet={assetPath('/media/wild-bunch/dustwell-town-720.avif')} type="image/avif" />
          <source srcSet={assetPath('/media/wild-bunch/dustwell-town-720.webp')} type="image/webp" />
          <img
            src={assetPath('/media/wild-bunch/dustwell-town-720.webp')}
            alt="Ranger Vale in Dustwell, one generated town in the seeded map-world, with its map and ordinary Store, Sheriff Office, Saloon, and trail actions visible."
            width="720"
            height="550"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
          />
        </picture>
        <figcaption>Dustwell is one generated town in this seeded map-world. Its layout persists when the player leaves and returns.</figcaption>
      </figure>
    )
  }

  if (slug === 'context-is-not-state') {
    return (
      <figure className="project-visual project-visual--diagram" role="img" aria-label="Context flows into a decision, while durable state is written to a file.">
        <span>CONTEXT</span><b aria-hidden="true">→</b><span>DECISION</span><i aria-hidden="true">/</i><span>STATE</span><b aria-hidden="true">→</b><span>FILE</span>
      </figure>
    )
  }

  return (
    <figure className="project-visual project-visual--essay" role="img" aria-label="An editorial contrast between agentic engineering and vibe coding.">
      <span>VIBE</span><i>is not the enemy of</i><strong>CRAFT</strong>
    </figure>
  )
}
