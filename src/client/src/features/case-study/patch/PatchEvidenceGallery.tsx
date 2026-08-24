import { getPatchMedia } from './patchEvidence'

const publishedEvidence = [
  getPatchMedia().find((media) => media.custody.startsWith('Club DB origin slide 2') && media.path.endsWith('.avif')),
  getPatchMedia().find((media) => media.custody.startsWith('Published Goldilocks') && media.path.endsWith('.avif') && media.width === 1200),
  getPatchMedia().find((media) => media.custody.startsWith("Published Sorcerer's Apprentice") && media.path.endsWith('.avif') && media.width === 1200),
  getPatchMedia().find((media) => media.custody.startsWith('Published Introducing Patch') && media.path.endsWith('.avif') && media.width === 1200),
].filter((media): media is NonNullable<typeof media> => media !== undefined)

function publicPath(path: string): string {
  return path.replace(/^src\/client\/public/, '')
}

export function PatchEvidenceGallery() {
  return (
    <section aria-labelledby="patch-evidence-gallery-title">
      <h2 id="patch-evidence-gallery-title">Evidence gallery</h2>
      {publishedEvidence.map((media) => (
        <figure key={media.path}>
          <img src={publicPath(media.path)} width={media.width} height={media.height} alt="Published Patch artefact evidence." loading="lazy" />
          <figcaption><strong>Published artefact</strong> · {media.custody}</figcaption>
        </figure>
      ))}
    </section>
  )
}
