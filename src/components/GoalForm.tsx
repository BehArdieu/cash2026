import { useEffect, useRef, useState } from 'react'
import { parseAmount } from '../lib/parseAmount'
import type { FinancialGoal } from '../lib/financial'

type Props = {
  goal: FinancialGoal
  onTargetChange: (target: number) => void
  onCurrentChange: (current: number) => void
  hydrated: boolean
}

function formatForInput(n: number): string {
  if (n === 0) return ''
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 2,
  }).format(n)
}

export function GoalForm({ goal, onTargetChange, onCurrentChange, hydrated }: Props) {
  const [targetStr, setTargetStr] = useState('')
  const [currentStr, setCurrentStr] = useState('')
  const didInit = useRef(false)

  useEffect(() => {
    if (!hydrated || didInit.current) return
    setTargetStr(goal.target > 0 ? formatForInput(goal.target) : '')
    setCurrentStr(goal.current > 0 ? formatForInput(goal.current) : '')
    didInit.current = true
  }, [hydrated, goal])

  return (
    <form
      className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-surface-900/60 p-6 shadow-xl backdrop-blur-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-left font-display text-lg font-medium text-zinc-100">
        Objectif &amp; situation
      </h2>
      <div>
        <label
          htmlFor="target"
          className="mb-1.5 block text-left text-sm text-zinc-400"
        >
          Montant cible (annuel)
        </label>
        <div className="relative">
          <input
            id="target"
            name="target"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            disabled={!hydrated}
            placeholder="ex. 12 000"
            value={targetStr}
            onChange={(e) => {
              const v = e.target.value
              setTargetStr(v)
              onTargetChange(parseAmount(v))
            }}
            className="w-full rounded-xl border border-white/10 bg-surface-800 py-3 pe-10 ps-4 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-mint-400/50 focus:ring-2 focus:ring-mint-400/20 disabled:opacity-50"
          />
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            €
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="current"
          className="mb-1.5 block text-left text-sm text-zinc-400"
        >
          Somme actuelle
        </label>
        <div className="relative">
          <input
            id="current"
            name="current"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            disabled={!hydrated}
            placeholder="ex. 3 200"
            value={currentStr}
            onChange={(e) => {
              const v = e.target.value
              setCurrentStr(v)
              onCurrentChange(parseAmount(v))
            }}
            className="w-full rounded-xl border border-white/10 bg-surface-800 py-3 pe-10 ps-4 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-mint-400/50 focus:ring-2 focus:ring-mint-400/20 disabled:opacity-50"
          />
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            €
          </span>
        </div>
      </div>
      <p className="text-center text-xs text-zinc-500">
        La progression se met à jour à chaque modification. Données enregistrées
        sur cet appareil.
      </p>
    </form>
  )
}
