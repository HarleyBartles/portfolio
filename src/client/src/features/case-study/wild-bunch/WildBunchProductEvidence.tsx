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
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export function WildBunchTrailMapEvidence(): ReactElement {
  return (
    <ResponsiveCapture
      alt="Current development build: generated starting-town trail map with named towns, connecting trails, and ride-day distances."
      caption="Current development build / working skeleton: the generated trail map proves names, topology, and route distances before the player chooses Dustwell."
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
      alt="Current development build: expanded developer session audit showing an ordered history of setup, world, town, and investigation events."
      caption="Current development build / working skeleton: the development-only audit makes ordered event history inspectable without publishing a private run reference."
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
        alt="Current development build: a populated Sheriff Office wanted notice with player-facing clues."
        caption="Current development build / working skeleton: a populated wanted notice reached through the ordinary Sheriff Office action, retained as player-safe investigation evidence."
        compact={{ width: 640, height: 489 }}
        figureLabel="Wanted-notice development-build evidence"
        name="wanted-notice"
        wide={{ width: 960, height: 733 }}
      />
      <ResponsiveCapture
        alt="Current development build: a player-known case file with earned clues, records, loose leads, and evidence items."
        caption="Current development build / working skeleton: a player-known case-file surface after reading a poster, retained without publishing unearned investigation facts."
        compact={{ width: 640, height: 489 }}
        figureLabel="Case-file development-build evidence"
        name="case-file"
        wide={{ width: 960, height: 733 }}
      />
    </section>
  )
}
