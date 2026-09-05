import type { ReactElement } from 'react'
import { LearningLabImage } from '../case-study/learning-lab/LearningLabImage'
import { LearningLoop } from '../case-study/learning-lab/LearningLoop'
import './ProjectVisual.scss'

export type ProjectVisualSlug =
  | 'codex-marketplace'
  | 'agentic-learning-lab'
  | 'adventures-of-patch'
  | 'wild-bunch'
  | 'agentic-engineering-vs-vibe-coding'
  | 'i-made-agentic-engineering-harder-than-it-needed-to-be'

type ProjectVisualProps = {
  slug: ProjectVisualSlug
  eager?: boolean
  placement?: 'preview' | 'index' | 'case-study-hero'
}

function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function ProjectVisual({ slug, eager = false, placement = 'preview' }: ProjectVisualProps): ReactElement {
  if (slug === 'adventures-of-patch') {
    return (
      <picture
        className={`project-visual project-visual--patch${placement === 'index' ? ' project-visual--patch-index' : ''}${placement === 'case-study-hero' ? ' project-visual--patch-case-study' : ''}`}
        data-visual-contract={placement === 'index' ? 'adventures-of-patch-index-crop' : 'adventures-of-patch-preview'}
      >
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
    return (
      <div className="project-visual project-visual--learning-lab" data-visual-contract="learning-lab-inspection-hero">
        <LearningLabImage id="engineering-control-workbench" eager={eager} />
        <LearningLoop placement={placement} />
      </div>
    )
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
    if (placement === 'case-study-hero' || placement === 'index') {
      return (
        <figure
          aria-label="Wild Bunch early-alpha town-arrival concept art"
          className={`project-visual project-visual--wild-bunch-concept${placement === 'index' ? ' project-visual--wild-bunch-concept-index' : ''}`}
          data-visual-contract="wild-bunch-concept-art"
        >
          <picture>
            <source media="(min-width: 45rem)" srcSet={assetPath('/media/wild-bunch/town-arrival-landscape.avif')} type="image/avif" />
            <source media="(min-width: 45rem)" srcSet={assetPath('/media/wild-bunch/town-arrival-landscape.webp')} type="image/webp" />
            <source srcSet={assetPath('/media/wild-bunch/town-arrival-portrait.avif')} type="image/avif" />
            <source srcSet={assetPath('/media/wild-bunch/town-arrival-portrait.webp')} type="image/webp" />
            <img
              src={assetPath('/media/wild-bunch/town-arrival-portrait.webp')}
              alt="Concept art of a lone rider entering a faded, hand-tinted high-desert frontier town, with a water tower and mesas beyond the main street."
              width="720"
              height="900"
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : 'auto'}
            />
          </picture>
          {placement === 'index' ? null : <figcaption>Concept art / early-alpha visual direction</figcaption>}
        </figure>
      )
    }

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

  if (slug === 'i-made-agentic-engineering-harder-than-it-needed-to-be') {
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
