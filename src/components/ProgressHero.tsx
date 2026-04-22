type Props = {
  percent: number
  target: number
  current: number
  ready: boolean
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
      {ready && target <= 0 && (
        <p className="mt-4 text-sm text-zinc-500">
          Définissez un objectif annuel pour suivre la progression.
        </p>
      )}
    </div>
  )
}
