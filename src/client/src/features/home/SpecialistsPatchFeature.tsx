import { useState, type ReactElement } from 'react'
import type { PatchHomepageFeature } from './homepageEdition'
import { homepageAssetPath } from './homepageAssets'
import { HomeAnchorTarget } from './HomePrimitives'
import {
  DetailCrop,
  EyeDetail,
  HeistClose,
  HeistMovement,
  HeroComposition,
  HeroPlate,
  LockdownDetail,
  MediaFallback,
  ReceiptDetail,
  SeriesLockup,
  SeriesLockupArt,
  SpecialistsMovement,
  SpecialistsNextAnchor,
  SpecialistsRouteLink,
  SpecialistsSubstrate,
  SpecialistsSubstrateFill,
  SpecialistsSubstrateLeftEdge,
  SpecialistsSubstrateRightEdge,
  StampOverprint,
  TitleField,
  WordmarkArt,
  WordmarkTitle,
} from './SpecialistsPatchFeature.styles'

export function SpecialistsPatchFeature({ feature }: { feature: PatchHomepageFeature }): ReactElement {
  const [mediaFailed, setMediaFailed] = useState(false)
  const failMedia = (): void => setMediaFailed(true)

  return (
    <SpecialistsMovement $mediaFailed={mediaFailed} aria-labelledby="home-specialists-title" data-home-movement="patch" data-patch-presentation="usual-specialists" data-visual-contract="homepage-specialists">
      <HomeAnchorTarget id={feature.anchorId} aria-hidden="true" />
      <SpecialistsSubstrate $mediaFailed={mediaFailed} aria-hidden="true">
        <SpecialistsSubstrateFill $mediaFailed={mediaFailed} />
        <SpecialistsSubstrateLeftEdge $mediaFailed={mediaFailed} src={homepageAssetPath('specialists-torn-edge-left.webp')} width="724" height="2172" loading="lazy" decoding="async" alt="" onError={failMedia} />
        <SpecialistsSubstrateRightEdge $mediaFailed={mediaFailed} src={homepageAssetPath('specialists-torn-edge-right.webp')} width="724" height="2172" loading="lazy" decoding="async" alt="" onError={failMedia} />
      </SpecialistsSubstrate>
      <HeistMovement $mediaFailed={mediaFailed} data-patch-heist-movement>
        <HeroComposition $mediaFailed={mediaFailed} data-patch-hero-composition>
          <HeroPlate $mediaFailed={mediaFailed}><img src={homepageAssetPath('specialists-folder.webp')} width="1536" height="1024" loading="lazy" alt="The completed recruitment folder for The Usual Specialists, carrying six distinct assent materials from Index, Silk, Rollback, Writ, Klause and Receipt." onError={failMedia} /></HeroPlate>
          <StampOverprint $mediaFailed={mediaFailed} data-zero-flow-overprint="true" aria-label="Klause's produced K assent impression crosses the folder and Rollback boundary."><img src={homepageAssetPath('specialists-klause-k.webp')} width="1254" height="1254" loading="lazy" alt="" onError={failMedia} /></StampOverprint>
        </HeroComposition>
        <TitleField $mediaFailed={mediaFailed}>
          <SeriesLockup data-patch-series-lockup><span className="visually-hidden">Adventures of PATCH</span><SeriesLockupArt decorative /></SeriesLockup>
          <WordmarkTitle $mediaFailed={mediaFailed} id="home-specialists-title"><span className="visually-hidden">{feature.title}</span><WordmarkArt decorative /></WordmarkTitle>
          <HeistClose><p>One question. Are you in?</p><SpecialistsRouteLink to={feature.to}>{feature.inwardLabel} →</SpecialistsRouteLink><SpecialistsNextAnchor href="#contact">{feature.closingTeaser} ↓</SpecialistsNextAnchor></HeistClose>
        </TitleField>
        <EyeDetail $mediaFailed={mediaFailed}><DetailCrop><img src={homepageAssetPath('specialists-silk.webp')} width="1983" height="793" loading="lazy" alt="Silk's eyes open in restrained surprise when the lawful route survives her pressure test." onError={failMedia} /></DetailCrop></EyeDetail>
        <LockdownDetail $mediaFailed={mediaFailed}><DetailCrop><img src={homepageAssetPath('specialists-rollback.webp')} width="1536" height="1024" loading="lazy" alt="Rollback's heavy gloved hand presses the amber lockdown control." onError={failMedia} /></DetailCrop></LockdownDetail>
        <ReceiptDetail $mediaFailed={mediaFailed}><DetailCrop><img src={homepageAssetPath('specialists-receipt.webp')} width="1448" height="1086" loading="lazy" alt="Receipt takes a fresh audit record as it emerges from the printer." onError={failMedia} /></DetailCrop></ReceiptDetail>
        <MediaFallback $mediaFailed={mediaFailed}>Completed recruitment folder. Six specialists, six distinct assent marks, and one lawful route into the story.</MediaFallback>
      </HeistMovement>
    </SpecialistsMovement>
  )
}
