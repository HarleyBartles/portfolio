import catalogue from './route-metadata.generated.json'

export type RouteMetadata = (typeof catalogue)[number]

export function getRouteMetadata(path: string | undefined): RouteMetadata | undefined {
  return catalogue.find((entry) => entry.path === path)
}
