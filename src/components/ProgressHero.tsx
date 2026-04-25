type Props = {
  percent: number
  target: number
  current: number
  ready: boolean
}

function getFunMessage(percent: number): string {
  if (percent >= 100) {
    return 'Objectif explosé, vous êtes officiellement une légende.'
  }
  if (percent >= 85) {
    return 'Dernière ligne droite: tenez bon, la victoire est à portée.'
  }
  if (percent >= 60) {
    return 'Très solide! Vous avancez comme un pro de la finance.'
  }
  if (percent >= 35) {
    return 'Le rythme est bon, chaque euro vous rapproche du sommet.'
  }
  if (percent >= 10) {
    return 'Bon départ! Continuez comme ça, ça monte bien.'
  }
  return 'Mode échauffement activé: le plus dur, c est de commencer.'
}

const money = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const moneyDetailed = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function ProgressHero({ percent, target, current, ready }: Props) {
  const display =
    !ready || target <= 0
      ? '—'
      : `${Math.round(percent * 10) / 10}`.replace('.', ',') + ' %'
  const funMessage = ready && target > 0 ? getFunMessage(percent) : null

  return (
    <div className="relative flex flex-col items-center text-center">
      <p className="mb-1 text-sm font-medium uppercase tracking-widest text-zinc-500">
        Progression 2026
      </p>
      <p
        className="font-display text-[4.5rem] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-8xl"
        style={{
          textShadow: '0 0 60px rgba(74, 222, 155, 0.25)',
        }}
      >
        {display}
      </p>
      {ready && target > 0 && (
        <p className="mt-4 max-w-sm text-balance text-sm text-zinc-400">
          <span className="text-mint-400">{moneyDetailed.format(current)}</span>
          <span> sur </span>
          <span className="text-zinc-200">{money.format(target)}</span>
        </p>
      )}
      {funMessage && (
        <p className="mt-3 max-w-md text-balance text-sm font-medium text-mint-300">
          {funMessage}
        </p>
      )}
      {ready && target <= 0 && (
        <p className="mt-4 text-sm text-zinc-500">
          Définissez un objectif annuel pour suivre la progression.
        </p>
      )}
    </div>
  )
}
