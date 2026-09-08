import type { ReactElement } from 'react'
import { LearningLabImage } from '../case-study/learning-lab/LearningLabImage'
import { LearningLoop } from '../case-study/learning-lab/LearningLoop'
import {
  DecisionDiagramVisual,
  EssayVisual,
  LearningLabVisual,
  MarketplaceCaption,
  MarketplaceNodes,
  MarketplaceVisual,
  PatchVisual,
  WildBunchConceptCaption,
  WildBunchConceptVisual,
  WildBunchPreviewCaption,
  WildBunchPreviewVisual,
  type ProjectVisualPlacement,
} from './ProjectVisual.styles'

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
  placement?: ProjectVisualPlacement
}

function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function ProjectVisual({ slug, eager = false, placement = 'preview' }: ProjectVisualProps): ReactElement {
  if (slug === 'adventures-of-patch') {
    return (
      <PatchVisual
        $placement={placement}
        data-visual-contract={placement === 'index' ? 'adventures-of-patch-index-whole-character' : 'adventures-of-patch-preview'}
      >
        <source media="(min-width: 45rem)" srcSet={assetPath('/media/patch/patch-hero-1000.avif')} type="image/avif" />
        <source media="(min-width: 45rem)" srcSet={assetPath('/media/patch/patch-hero-1000.webp')} type="image/webp" />
        <source srcSet={assetPath('/media/patch/patch-hero-500.avif')} type="image/avif" />
        <source srcSet={assetPath('/media/patch/patch-hero-500.webp')} type="image/webp" />
        <img
          src={assetPath('/media/patch/patch-hero-500.webp')}
          alt="Patch carries an index card and folded map, ready to turn an engineering lesson into a story."
          width="500"
          height="672"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </PatchVisual>
    )
  }

  if (slug === 'agentic-learning-lab') {
    return (
      <LearningLabVisual data-visual-contract="learning-lab-inspection-hero">
        <LearningLabImage id="engineering-control-workbench" eager={eager} />
        <LearningLoop placement={placement} />
      </LearningLabVisual>
    )
  }

  if (slug === 'codex-marketplace') {
    return (
      <MarketplaceVisual aria-label="Marketplace baseline plugins with selected and local repository boundaries.">
        <MarketplaceNodes>
          <span>repo-worker-pack</span><span>superpowers-plus</span><span>mcp-usage-pack</span>
        </MarketplaceNodes>
        <MarketplaceCaption><strong>17</strong> plugins <i>/</i> <strong>74</strong> entries <small>selected + local</small></MarketplaceCaption>
      </MarketplaceVisual>
    )
  }

  if (slug === 'wild-bunch') {
    if (placement === 'case-study-hero' || placement === 'index') {
      return (
        <WildBunchConceptVisual
          $placement={placement}
          aria-label="Wild Bunch early-alpha town-arrival concept art"
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
          {placement === 'index' ? null : <WildBunchConceptCaption>Concept art / early-alpha visual direction</WildBunchConceptCaption>}
        </WildBunchConceptVisual>
      )
    }

    return (
      <WildBunchPreviewVisual
        aria-label="Wild Bunch generated-town development-build preview"
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
        <WildBunchPreviewCaption>Dustwell is one generated town in this seeded map-world. Its layout persists when the player leaves and returns.</WildBunchPreviewCaption>
      </WildBunchPreviewVisual>
    )
  }

  if (slug === 'i-made-agentic-engineering-harder-than-it-needed-to-be') {
    return (
      <DecisionDiagramVisual role="img" aria-label="Context flows into a decision, while durable state is written to a file.">
        <span>CONTEXT</span><b aria-hidden="true">→</b><span>DECISION</span><i aria-hidden="true">/</i><span>STATE</span><b aria-hidden="true">→</b><span>FILE</span>
      </DecisionDiagramVisual>
    )
  }

  return (
    <EssayVisual role="img" aria-label="An editorial contrast between agentic engineering and vibe coding.">
      <span>VIBE</span><i>is not the enemy of</i><strong>CRAFT</strong>
    </EssayVisual>
  )
}
