import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

type SiteConfig = {
  activeProfile: 'custom-domain' | 'github-pages-fallback'
  profiles: Record<'custom-domain' | 'github-pages-fallback', { basePath: string }>
}

const siteConfig = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8')) as SiteConfig

// https://vite.dev/config/
export default defineConfig({
  base: siteConfig.profiles[siteConfig.activeProfile].basePath,
  build: {
    manifest: true,
  },
  plugins: [react()],
})
