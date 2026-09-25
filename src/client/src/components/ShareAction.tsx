import { useState } from 'react'
import styled from 'styled-components'
import { buildPublicUrl } from '../data/routes/siteProfile'
import { ActionButton } from './content'

type ShareActionProps = {
  title: string
  path: string
}

const ShareSection = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  max-width: ${({ theme }) => theme.layout.readingMeasure};
  margin-top: ${({ theme }) => theme.space.xl};

  > * {
    margin: 0;
  }

  .share-action__controls {
    display: grid;
    gap: ${({ theme }) => theme.space.sm};
    justify-items: start;
    margin-top: ${({ theme }) => theme.space.xs};
  }

  .share-action__url {
    max-width: 100%;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.color.muted};
    font-family: ${({ theme }) => theme.font.code};
    font-size: 0.72rem;
  }
`

export const ShareAction = ({ title, path }: ShareActionProps) => {
  const [status, setStatus] = useState('')
  const [showManualLink, setShowManualLink] = useState(false)
  const url = buildPublicUrl(path)
  const supportsNativeShare = typeof navigator.share === 'function'

  async function share(): Promise<void> {
    setShowManualLink(false)
    if (supportsNativeShare) {
      try {
        await navigator.share({ title, url })
        setStatus('Link shared.')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setStatus('Sharing cancelled.')
        } else {
          setShowManualLink(true)
          setStatus('Copy this link.')
        }
      }
      return
    }

    try {
      if (navigator.clipboard === undefined) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(url)
      setStatus('Link copied.')
    } catch {
      setShowManualLink(true)
      setStatus('Copy this link.')
    }
  }

  return (
    <ShareSection className="share-action">
      <div className="share-action__controls">
        <ActionButton type="button" onClick={() => void share()}>
          {supportsNativeShare ? 'Share this article' : 'Copy article link'}
        </ActionButton>
        {showManualLink ? <a href={url} className="share-action__url">{url}</a> : null}
      </div>
      <p role="status" aria-live="polite">{status}</p>
    </ShareSection>
  )
}
