import type { ReactElement } from 'react'

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
      <picture className="project-visual project-visual--patch">
        <source media="(max-width: 44rem)" srcSet={assetPath('/media/patch/patch-role-kits-640.webp')} />
        <img
          src={assetPath('/media/patch/patch-role-kits-1200.webp')}
          alt="Patch appears as a detective, cowboy, chef, and mechanic in four overlapping role-kit cards."
          width="1200"
          height="720"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </picture>
    )
  }

  if (slug === 'agentic-learning-lab') {
    return (
      <figure className="project-visual project-visual--learning">
        <img
          src={assetPath('/media/learning-lab/venue-plan.png')}
          alt="A simple venue floor plan used as the bounded project artifact in Learning Lab 02."
          width="500"
          height="350"
          loading={eager ? 'eager' : 'lazy'}
        />
        <figcaption>Lab 02 / bounded workspace artifact</figcaption>
      </figure>
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
    return (
      <figure
        aria-label="Wild Bunch Dustwell development-build preview"
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
            alt="Current development build: Ranger Vale in the Dustwell town hub, with the town map and ordinary Store, Sheriff Office, Saloon, and trail actions visible."
            width="720"
            height="550"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
          />
        </picture>
        <figcaption>Current development build / working skeleton <span>Dustwell town hub · not final game art</span></figcaption>
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
