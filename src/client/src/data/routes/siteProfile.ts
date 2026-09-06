import siteConfig from '../../../site.config.json'

export type SiteProfileId = 'custom-domain' | 'github-pages-fallback'

type SiteProfile = {
  canonicalOrigin: string
  basePath: string
}

type SiteConfiguration = {
  activeProfile: SiteProfileId
  profiles: Record<SiteProfileId, SiteProfile>
}

const configuration = siteConfig as SiteConfiguration

function normalizePath(path: string): string {
  const withoutQueryOrFragment = path.split(/[?#]/)[0] ?? '/'
  const withLeadingSlash = withoutQueryOrFragment.startsWith('/')
    ? withoutQueryOrFragment
    : `/${withoutQueryOrFragment}`

  return withLeadingSlash === '/' ? '/' : withLeadingSlash.replace(/\/+$/, '')
}

function profileFor(profileId: SiteProfileId = configuration.activeProfile): SiteProfile {
  return configuration.profiles[profileId]
}

export const activeSiteProfile = profileFor()

export function buildPublicUrl(path: string, profileId?: SiteProfileId): string {
  const profile = profileFor(profileId)
  const route = normalizePath(path)
  const basePath = profile.basePath === '/' ? '' : profile.basePath.slice(0, -1)

  if (route === '/' && basePath === '') {
    return profile.canonicalOrigin
  }

  return `${profile.canonicalOrigin}${basePath}${route}`
}

export function buildPublicAssetUrl(path: string, profileId?: SiteProfileId): string {
  return buildPublicUrl(path, profileId)
}
