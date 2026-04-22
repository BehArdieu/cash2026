export const STORAGE_KEY = 'cash2026:goal' as const

export type FinancialGoal = {
  target: number
  current: number
}

export function progressPercent(target: number, current: number): number {
  if (target <= 0 || !Number.isFinite(target) || !Number.isFinite(current)) {
    return 0
  }
  return Math.min(100, Math.max(0, (current / target) * 100))
}

export function loadGoal(): FinancialGoal | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const t = (parsed as FinancialGoal).target
    const c = (parsed as FinancialGoal).current
    if (typeof t !== 'number' || typeof c !== 'number') return null
    return { target: t, current: c }
  } catch {
    return null
  }
}

export function saveGoal(goal: FinancialGoal): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ target: goal.target, current: goal.current })
  )
}
