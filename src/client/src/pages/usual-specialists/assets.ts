const SPECIALISTS_MEDIA_DIRECTORY = 'media/patch/the-usual-specialists/'

export const usualSpecialistsAssetPath = (filename: string, baseUrl = import.meta.env.BASE_URL): string => {
  return `${baseUrl}${SPECIALISTS_MEDIA_DIRECTORY}${filename}`
}
