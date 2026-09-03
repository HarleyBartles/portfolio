export function homepageAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}media/homepage/${filename}`
}

export function adventuresBrandAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}brand/adventures-of-patch/${filename}`
}
