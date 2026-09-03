import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { PatchHomepageFeature } from './homepageEdition'
import { adventuresBrandAssetPath, homepageAssetPath } from './homepageAssets'

export function SpecialistsPatchFeature({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  const [mediaFailed, setMediaFailed] = useState(false)
  const failMedia = (): void => setMediaFailed(true)

  return (
    <section className={`home-movement patch-movement${mediaFailed ? ' media-off' : ''}`} aria-labelledby="home-specialists-title" data-home-movement="patch" data-patch-presentation="usual-specialists" data-visual-contract="homepage-specialists">
      <span className="home-anchor-target" id={feature.anchorId} aria-hidden="true" />
      <div className="specialists-substrate" aria-hidden="true">
        <span className="specialists-substrate__fill" />
        <img className="specialists-substrate__edge specialists-substrate__edge--left" src={homepageAssetPath('specialists-torn-edge-left.webp')} width="724" height="2172" loading="lazy" decoding="async" alt="" onError={failMedia} />
        <img className="specialists-substrate__edge specialists-substrate__edge--right" src={homepageAssetPath('specialists-torn-edge-right.webp')} width="724" height="2172" loading="lazy" decoding="async" alt="" onError={failMedia} />
      </div>
      <div className="heist-movement">
        <div className="hero-composition">
          <figure className="hero-plate"><img src={homepageAssetPath('specialists-folder.webp')} width="1536" height="1024" loading="lazy" alt="The completed recruitment folder for The Usual Specialists, carrying six distinct assent materials from Index, Silk, Rollback, Writ, Klause and Receipt." onError={failMedia} /></figure>
          <figure className="stamp-overprint" data-zero-flow-overprint="true" aria-label="Klause's produced K assent impression crosses the folder and Rollback boundary."><img src={homepageAssetPath('specialists-klause-k.webp')} width="1254" height="1254" loading="lazy" alt="" onError={failMedia} /></figure>
        </div>
        <div className="title-field">
          <p className="patch-marque"><span className="visually-hidden">Adventures of PATCH</span><svg className="patch-marque__art" viewBox="0 0 340 126.2021" preserveAspectRatio="xMinYMin meet" aria-hidden="true" focusable="false"><use href={`${adventuresBrandAssetPath('adventures-of-patch-cliff-drop.svg')}#adventures-of-patch-cliff-drop`} /></svg></p>
          <h2 className="wordmark-title" id="home-specialists-title"><span className="visually-hidden">{feature.title}</span><svg className="wordmark-art" viewBox="0 0 1120 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><use href={`${homepageAssetPath('the-usual-specialists-wordmark.svg')}#the-usual-specialists-wordmark`} /></svg></h2>
          <div className="heist-close"><p>One question. Are you in?</p><Link to={feature.to}>{feature.inwardLabel} →</Link><a className="home-next" href="#contact">{feature.closingTeaser} ↓</a></div>
        </div>
        <figure className="detail detail-eye"><div className="detail__crop"><img src={homepageAssetPath('specialists-silk.webp')} width="1983" height="793" loading="lazy" alt="Silk's eyes open in restrained surprise when the lawful route survives her pressure test." onError={failMedia} /></div></figure>
        <figure className="detail detail-lockdown"><div className="detail__crop"><img src={homepageAssetPath('specialists-rollback.webp')} width="1536" height="1024" loading="lazy" alt="Rollback's heavy gloved hand presses the amber lockdown control." onError={failMedia} /></div></figure>
        <figure className="detail detail-receipt"><div className="detail__crop"><img src={homepageAssetPath('specialists-receipt.webp')} width="1448" height="1086" loading="lazy" alt="Receipt takes a fresh audit record as it emerges from the printer." onError={failMedia} /></div></figure>
        <p className="media-fallback">Completed recruitment folder. Six specialists, six distinct assent marks, and one lawful route into the story.</p>
      </div>
    </section>
  )
}
