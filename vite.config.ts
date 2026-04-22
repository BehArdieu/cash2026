import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
function publicSiteBase(): string {
  const fromVite = (process.env.VITE_SITE_URL || '').trim()
  if (fromVite) {
    return fromVite.replace(/\/$/, '')
  }
  // Railway : domaine public injecté en build (sans https)
  const railway = (process.env.RAILWAY_PUBLIC_DOMAIN || '').trim()
  if (railway) {
    return `https://${railway}`.replace(/\/$/, '')
  }
  return ''
}

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || publicSiteBase()).replace(/\/$/, '')

  const publicDir = join(dirname(fileURLToPath(import.meta.url)), 'public')
  let imageSize = { w: 1200, h: 630 }
  try {
    const buf = readFileSync(join(publicDir, 'og.png'))
    // PNG: dimensions at bytes 16-23 (width, height) big-endian
    if (buf.length > 24 && buf[0] === 0x89) {
      imageSize = { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
    }
  } catch {
    // defaults ok
  }

  const origin = siteUrl
  const ogImage = origin ? `${origin}/og.png` : '/og.png'
  const ogUrl = origin ? `${origin}/` : '/'
  const description =
    "Suivez en temps réel la progression de votre objectif d'épargne et de gains pour l'année 2026."

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'og-meta',
        transformIndexHtml(html) {
          return html
            .replaceAll('__VITE_OG_URL__', ogUrl)
            .replaceAll('__VITE_OG_IMAGE__', ogImage)
            .replaceAll('__VITE_OG_DESCRIPTION__', description)
            .replaceAll('__VITE_OG_IMAGE_W__', String(imageSize.w))
            .replaceAll('__VITE_OG_IMAGE_H__', String(imageSize.h))
        },
      },
    ],
  }
})
