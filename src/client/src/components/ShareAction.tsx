import { useState, type ReactElement } from 'react'
import { buildPublicUrl } from '../data/routes/siteProfile'

type ShareActionProps = {
  title: string
  path: string
}

export function ShareAction({ title, path }: ShareActionProps): ReactElement {
  const [status, setStatus] = useState('')
  const url = buildPublicUrl(path)
  const supportsNativeShare = typeof navigator.share === 'function'

  async function share(): Promise<void> {
    if (supportsNativeShare) {
      try {
        await navigator.share({ title, url })
        setStatus('Link shared.')
      } catch {
        setStatus('Sharing cancelled.')
      }
      return
    }

    if (navigator.clipboard === undefined) {
      setStatus('Copy the link below.')
      return
    }

    await navigator.clipboard.writeText(url)
    setStatus('Link copied.')
  }

  return (
    <section className="share-action" aria-labelledby="share-action-title">
      <p className="eyebrow">Pass it on</p>
      <h2 id="share-action-title">Keep the receipt</h2>
      <p>Share the canonical link, or keep it somewhere useful for later.</p>
      <div className="share-action__controls">
        <button type="button" className="button-link" onClick={() => void share()}>
          {supportsNativeShare ? 'Share this article' : 'Copy article link'}
        </button>
        <a href={url} className="share-action__url">{url}</a>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{status}</p>
    </section>
  )
}
