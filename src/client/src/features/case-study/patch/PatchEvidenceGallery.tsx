import { ExternalLink } from '../../../components/ExternalLink'
import { getPatchMediaByPath, getPublishedEvidence, type PatchEvidenceMedia } from './patchEvidence'

export function getPatchAssetPath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${path.replace(/^src\/client\/public\/?/, '')}`
}

function siblingMedia(media: PatchEvidenceMedia, path: string): PatchEvidenceMedia {
  return getPatchMediaByPath(path) ?? media
}

export function PatchEvidenceGallery() {
  return (
    <section className="patch-published-gallery" aria-label="Evidence gallery">
      {getPublishedEvidence().map(({ artefact, media, portraitMedia, captionLabel, captionDetail, alt }) => {
        const wideWebp = siblingMedia(media, media.path.replace(/\.avif$/, '.webp'))
        const narrowAvif = siblingMedia(media, media.path.replace('-1200.avif', '-640.avif'))
        const narrowWebp = siblingMedia(wideWebp, wideWebp.path.replace('-1200.webp', '-640.webp'))
        const portraitWebp = portraitMedia === undefined ? undefined : siblingMedia(portraitMedia, portraitMedia.path.replace(/\.avif$/, '.webp'))

        return (
          <figure key={artefact.title}>
            <ExternalLink href={artefact.publicArtefactUrl} aria-label={`Open ${artefact.title} in the public repository`}>
              <picture>
                {portraitMedia === undefined ? null : <source media="(max-width: 44.99rem)" srcSet={getPatchAssetPath(portraitMedia.path)} type="image/avif" />}
                {portraitWebp === undefined ? null : <source media="(max-width: 44.99rem)" srcSet={getPatchAssetPath(portraitWebp.path)} type="image/webp" />}
                <source media="(min-width: 45rem)" srcSet={getPatchAssetPath(media.path)} type="image/avif" />
                <source media="(min-width: 45rem)" srcSet={getPatchAssetPath(wideWebp.path)} type="image/webp" />
                <source srcSet={getPatchAssetPath(narrowAvif.path)} type="image/avif" />
                <source srcSet={getPatchAssetPath(narrowWebp.path)} type="image/webp" />
                <img src={getPatchAssetPath(narrowWebp.path)} width={narrowWebp.width} height={narrowWebp.height} alt={alt} loading="lazy" />
              </picture>
            </ExternalLink>
            <figcaption className="case-study-media-caption"><strong>{captionLabel}</strong>{captionDetail === undefined ? '.' : `. ${captionDetail}`}</figcaption>
          </figure>
        )
      })}
    </section>
  )
}
