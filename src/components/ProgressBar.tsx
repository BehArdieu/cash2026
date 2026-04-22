type Props = {
  percent: number
}

export function ProgressBar({ percent }: Props) {
  const w = Math.min(100, Math.max(0, percent))
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-800 ring-1 ring-white/5">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-mint-400 to-teal-300 transition-[width] duration-500 ease-out"
        style={{ width: `${w}%` }}
        role="progressbar"
        aria-valuenow={Math.round(w * 10) / 10}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
