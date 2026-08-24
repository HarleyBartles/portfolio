import { getPublishedEvidence } from './patchEvidence'

export function getPatchAssetPath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${path.replace(/^src\/client\/public\/?/, '')}`
}

export function PatchEvidenceGallery() {
  return (
    <section aria-labelledby="patch-evidence-gallery-title">
      <h2 id="patch-evidence-gallery-title">Evidence gallery</h2>
      {getPublishedEvidence().map(({ artefact, media, captionLabel, captionDetail, alt }) => (
        <figure key={artefact.title}>
          <img src={getPatchAssetPath(media.path)} width={media.width} height={media.height} alt={alt} loading="lazy" />
          <figcaption><strong>{captionLabel}</strong>{captionDetail === undefined ? '.' : `: ${captionDetail}`} {media.custody}</figcaption>
        </figure>
      ))}
    </section>
  )
}
