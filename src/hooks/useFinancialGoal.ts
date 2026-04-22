import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  type FinancialGoal,
  loadGoal,
  progressPercent,
  saveGoal,
} from '../lib/financial'

const defaultState: FinancialGoal = { target: 0, current: 0 }

export function useFinancialGoal() {
  const [goal, setGoal] = useState<FinancialGoal>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setGoal(loadGoal() ?? defaultState)
    setHydrated(true)
  }, [])

  const commit = useCallback((next: FinancialGoal) => {
    setGoal(next)
    saveGoal(next)
  }, [])

  const setTarget = useCallback((target: number) => {
    setGoal((prev) => {
      const next = { ...prev, target: Math.max(0, target) }
      saveGoal(next)
      return next
    })
  }, [])

  const setCurrent = useCallback((current: number) => {
    setGoal((prev) => {
      const next = { ...prev, current: Math.max(0, current) }
      saveGoal(next)
      return next
    })
  }, [])

  const percent = useMemo(
    () => progressPercent(goal.target, goal.current),
    [goal.target, goal.current]
  )

  return { goal, hydrated, percent, setTarget, setCurrent, updateGoal: commit }
}
