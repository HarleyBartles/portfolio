const SPECIALISTS_MEDIA_DIRECTORY = 'media/patch/the-usual-specialists/'

export function usualSpecialistsAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${SPECIALISTS_MEDIA_DIRECTORY}${filename}`
}
