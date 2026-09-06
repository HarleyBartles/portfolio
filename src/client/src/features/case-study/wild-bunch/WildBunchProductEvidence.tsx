import type { ReactElement } from 'react'
import { CaseStudyMediaCaption } from '../CaseStudyMediaCaption'
import styled from 'styled-components'

type Capture = {
  figureLabel: string
  alt: string
  caption: string
  name: string
  wide: { width: number; height: number }
  compact: { width: number; height: number }
}

const CaptureFigure = styled.figure`
  margin: 0;

  picture,
  img { width: 100%; }
  img { height: auto; }
  &.wild-bunch-evidence--dustwell-town-hub-focus { max-width: 50rem; margin-inline: auto; }
  &.wild-bunch-evidence--trail-map-focus { max-width: 37.5rem; margin-inline: auto; }
  &.wild-bunch-evidence--wanted-notice-focus { max-width: 36.875rem; margin-inline: auto; }
`

const ProductEvidence = styled.section`
  display: grid;
  gap: var(--space-5);

  > h3 { margin: 0; font-size: clamp(1.5rem, 3vw, 2.25rem); }
`

export function getWildBunchAssetPath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${path.replace(/^\//, '')}`
}

function ResponsiveCapture({ figureLabel, alt, caption, name, wide, compact }: Capture): ReactElement {
  const path = getWildBunchAssetPath(`/media/wild-bunch/${name}`)

  return (
    <CaptureFigure aria-label={figureLabel} className={`wild-bunch-evidence wild-bunch-evidence--${name}`}>
      <picture>
        <source media="(min-width: 960px)" srcSet={`${path}-${wide.width}.avif`} type="image/avif" />
        <source media="(min-width: 960px)" srcSet={`${path}-${wide.width}.webp`} type="image/webp" />
        <source srcSet={`${path}-${compact.width}.avif`} type="image/avif" />
        <source srcSet={`${path}-${compact.width}.webp`} type="image/webp" />
        <img
          alt={alt}
          height={compact.height}
          loading="lazy"
          src={`${path}-${compact.width}.webp`}
          width={compact.width}
        />
      </picture>
      <CaseStudyMediaCaption>{caption}</CaseStudyMediaCaption>
    </CaptureFigure>
  )
}

export function WildBunchTrailMapEvidence(): ReactElement {
  return (
    <ResponsiveCapture
      alt="Generated starting-town trail map with named towns, connecting trails, and ride-day distances."
      caption="The generated topology and travel distances are visible before the player chooses a town."
      compact={{ width: 480, height: 472 }}
      figureLabel="Generated trail-map development-build evidence"
      name="trail-map-focus"
      wide={{ width: 600, height: 590 }}
    />
  )
}

export function WildBunchTownEvidence(): ReactElement {
  return (
    <ResponsiveCapture
      alt="Dustwell town hub with its central road, Store, Sheriff Office, Saloon, trailhead, and sparse frontier props."
      caption="Current playable build: Dustwell is the generated town captured for the recorded seed. Its stored layout persists when the player leaves and returns."
      compact={{ width: 640, height: 400 }}
      figureLabel="Dustwell town-hub development-build evidence"
      name="dustwell-town-hub-focus"
      wide={{ width: 800, height: 500 }}
    />
  )
}

export function WildBunchProductEvidence(): ReactElement {
  return (
    <ProductEvidence aria-label="Player-safe investigation evidence" className="wild-bunch-product-evidence">
      <h3>Player-safe investigation evidence</h3>
      <ResponsiveCapture
        alt="A populated Sheriff Office wanted notice with player-facing clues."
        caption="The wanted notice shows player-safe knowledge reached through the ordinary Sheriff Office action."
        compact={{ width: 472, height: 479 }}
        figureLabel="Wanted-notice development-build evidence"
        name="wanted-notice-focus"
        wide={{ width: 590, height: 599 }}
      />
      <ResponsiveCapture
        alt="A player-known case file with earned clues, records, loose leads, and evidence items."
        caption="The case file keeps player-safe knowledge separate from unearned investigation facts."
        compact={{ width: 640, height: 489 }}
        figureLabel="Case-file development-build evidence"
        name="case-file"
        wide={{ width: 960, height: 733 }}
      />
    </ProductEvidence>
  )
}
