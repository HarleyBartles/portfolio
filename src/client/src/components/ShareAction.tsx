import { useState } from 'react'
import styled from 'styled-components'
import { buildPublicUrl } from '../data/routes/siteProfile'
import { Eyebrow } from './content'

type ShareActionProps = {
  title: string
  path: string
}

const ShareSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  max-width: ${({ theme }) => theme.layout.readingMeasure};
  margin-top: clamp(${({ theme }) => theme.space.xxl}, 12vw, ${({ theme }) => theme.space.xxxxl});
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-top: ${({ theme }) => theme.space.xl};

  > * {
    margin: 0;
  }

  h2 {
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  .share-action__controls {
    display: grid;
    gap: ${({ theme }) => theme.space.sm};
    justify-items: start;
    margin-top: ${({ theme }) => theme.space.xs};
  }

  .share-action__controls .button-link {
    cursor: pointer;
  }

  .share-action__url {
    max-width: 100%;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.color.muted};
    font-family: ${({ theme }) => theme.font.code};
    font-size: 0.72rem;
  }
`

const ShareCopy = styled.p`
  color: ${({ theme }) => theme.color.muted};
`

export const ShareAction = ({ title, path }: ShareActionProps) => {
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
    <ShareSection className="share-action" aria-labelledby="share-action-title">
      <Eyebrow>Pass it on</Eyebrow>
      <h2 id="share-action-title">Keep the receipt</h2>
      <ShareCopy>Share the canonical link, or keep it somewhere useful for later.</ShareCopy>
      <div className="share-action__controls">
        <button type="button" className="button-link" onClick={() => void share()}>
          {supportsNativeShare ? 'Share this article' : 'Copy article link'}
        </button>
        <a href={url} className="share-action__url">{url}</a>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{status}</p>
    </ShareSection>
  )
}
