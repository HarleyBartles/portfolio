import type { ReactElement } from 'react'
import styled from 'styled-components'

const BRAND_DIRECTORY = 'brand/adventures-of-patch/'

export function patchBrandAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${BRAND_DIRECTORY}${filename}`
}

const Mark = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  color: currentColor;
`

export function PatchSeriesLockup({ className, 'aria-label': ariaLabel, decorative = false }: { className?: string; 'aria-label'?: string; decorative?: boolean }): ReactElement {
  return <Mark className={className} viewBox="0 0 340 126.2021" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : ariaLabel ?? 'Adventures of PATCH'} aria-hidden={decorative} focusable="false"><use href={`${patchBrandAssetPath('adventures-of-patch-cliff-drop.svg')}#adventures-of-patch-cliff-drop`} /></Mark>
}

export function UsualSpecialistsWordmark({ className, 'aria-label': ariaLabel, decorative = false }: { className?: string; 'aria-label'?: string; decorative?: boolean }): ReactElement {
  return <Mark className={className} viewBox="0 0 1120 240" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : ariaLabel ?? 'The Usual Specialists'} aria-hidden={decorative} focusable="false"><use href={`${patchBrandAssetPath('the-usual-specialists-wordmark.svg')}#the-usual-specialists-wordmark`} /></Mark>
}

export function PatchStoryBrand({ storyWordmark, className }: { storyWordmark?: 'usual-specialists'; className?: string }): ReactElement {
  return <div className={className}><PatchSeriesLockup />{storyWordmark === 'usual-specialists' ? <UsualSpecialistsWordmark /> : null}</div>
}
