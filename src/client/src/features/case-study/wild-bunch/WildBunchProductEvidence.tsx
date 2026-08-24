import type { ReactElement } from 'react'

type Capture = {
  figureLabel: string
  alt: string
  caption: string
  name: string
  wide: { width: number; height: number }
  compact: { width: number; height: number }
}

export function getWildBunchAssetPath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${path.replace(/^\//, '')}`
}

function ResponsiveCapture({ figureLabel, alt, caption, name, wide, compact }: Capture): ReactElement {
  const path = getWildBunchAssetPath(`/media/wild-bunch/${name}`)

  return (
    <figure aria-label={figureLabel} className={`wild-bunch-evidence wild-bunch-evidence--${name}`}>
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
      <figcaption className="case-study-media-caption">{caption}</figcaption>
    </figure>
  )
}

export function WildBunchTrailMapEvidence(): ReactElement {
  return (
    <ResponsiveCapture
      alt="Generated starting-town trail map with named towns, connecting trails, and ride-day distances."
      caption="The generated topology and travel distances are visible before the player chooses a town."
      compact={{ width: 720, height: 550 }}
      figureLabel="Generated trail-map development-build evidence"
      name="trail-map"
      wide={{ width: 1200, height: 917 }}
    />
  )
}

export function WildBunchAuditEvidence(): ReactElement {
  return (
    <ResponsiveCapture
      alt="Expanded developer session audit showing an ordered history of setup, world, town, and investigation events."
      caption="The audit exposes typed events in order without publishing a private run reference."
      compact={{ width: 720, height: 550 }}
      figureLabel="Session-audit development-build evidence"
      name="session-audit"
      wide={{ width: 1200, height: 917 }}
    />
  )
}

export function WildBunchProductEvidence(): ReactElement {
  return (
    <section aria-label="Player-safe investigation evidence" className="wild-bunch-product-evidence">
      <h3>Player-safe investigation evidence</h3>
      <ResponsiveCapture
        alt="A populated Sheriff Office wanted notice with player-facing clues."
        caption="The wanted notice shows player-safe knowledge reached through the ordinary Sheriff Office action."
        compact={{ width: 640, height: 489 }}
        figureLabel="Wanted-notice development-build evidence"
        name="wanted-notice"
        wide={{ width: 960, height: 733 }}
      />
      <ResponsiveCapture
        alt="A player-known case file with earned clues, records, loose leads, and evidence items."
        caption="The case file keeps player-safe knowledge separate from unearned investigation facts."
        compact={{ width: 640, height: 489 }}
        figureLabel="Case-file development-build evidence"
        name="case-file"
        wide={{ width: 960, height: 733 }}
      />
    </section>
  )
}
