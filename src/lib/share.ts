const APP = 'Cash2026'

/**
 * Texte de partage : met l’avancement en avant sans exposer de montants en euros.
 */
export function buildShareText(percent: number): string {
  const p = Math.round(percent * 10) / 10
  const pStr = p.toString().replace('.', ',')
  return `J'atteins ${pStr} % de mon objectif annuel 2026 avec ${APP} !`
}

export function getSharePageUrl(): string {
  if (typeof window === 'undefined') return ''
  return window.location.origin + window.location.pathname
}

function combinedMessage(text: string, url: string): string {
  return url ? `${text} ${url}` : text
}

export function buildTwitterUrl(text: string, url: string): string {
  const u = new URL('https://twitter.com/intent/tweet')
  u.searchParams.set('text', text)
  if (url) u.searchParams.set('url', url)
  return u.toString()
}

export function buildFacebookUrl(url: string): string {
  const u = new URL('https://www.facebook.com/sharer/sharer.php')
  u.searchParams.set('u', url)
  return u.toString()
}

export function buildLinkedInUrl(url: string): string {
  const u = new URL('https://www.linkedin.com/sharing/share-offsite/')
  u.searchParams.set('url', url)
  return u.toString()
}

export function buildWhatsAppUrl(text: string, url: string): string {
  const u = new URL('https://wa.me/')
  u.searchParams.set('text', combinedMessage(text, url))
  return u.toString()
}

export function buildTelegramUrl(text: string, url: string): string {
  const u = new URL('https://t.me/share/url')
  u.searchParams.set('url', url)
  u.searchParams.set('text', text)
  return u.toString()
}

export function openShareWindow(href: string): void {
  window.open(href, '_blank', 'noopener,noreferrer,width=580,height=420')
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

type ShareData = { title: string; text: string; url?: string }

export function canUseNativeShare(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'share' in navigator &&
    typeof navigator.share === 'function'
  )
}

export async function shareNatively(data: ShareData): Promise<'ok' | 'aborted' | 'unsupported' | 'error'> {
  if (!canUseNativeShare()) return 'unsupported'
  try {
    await navigator.share(data)
    return 'ok'
  } catch (e) {
    if (e && typeof e === 'object' && (e as Error).name === 'AbortError') {
      return 'aborted'
    }
    return 'error'
  }
}
