export function homepageAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}media/homepage/${filename}`
}
