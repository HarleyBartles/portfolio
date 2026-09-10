const SPECIALISTS_MEDIA_DIRECTORY = 'media/patch/the-usual-specialists/'

export const EXPECTED_WIREFRAME_ROPE_PATH = 'M 115 0 C 122 350 140 700 160 1000 C 175 1350 205 1700 225 2000 C 232 2250 235 2600 236 3000 C 237 3130 292 3215 308 3150 C 321 3098 276 3062 252 3102 C 235 3130 248 3174 273 3178'

export function usualSpecialistsAssetPath(filename: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${SPECIALISTS_MEDIA_DIRECTORY}${filename}`
}
