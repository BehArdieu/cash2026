import { GoalForm } from './components/GoalForm'
import { ProgressBar } from './components/ProgressBar'
import { ProgressHero } from './components/ProgressHero'
import { ShareBar } from './components/ShareBar'
import { useFinancialGoal } from './hooks/useFinancialGoal'

function App() {
  const { goal, hydrated, percent, setTarget, setCurrent } = useFinancialGoal()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-4 py-10 md:px-6 md:py-16">
      <header className="text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-mint-400/80">
          Cash2026
        </p>
        <h1 className="font-display text-2xl font-semibold text-zinc-100 md:text-3xl">
          Votre objectif financier
        </h1>
      </header>

      <main className="flex flex-col items-center gap-10">
        <div className="w-full max-w-lg space-y-6">
          <ProgressHero
            percent={percent}
            target={goal.target}
            current={goal.current}
            ready={hydrated}
          />
          {hydrated && goal.target > 0 && <ProgressBar percent={percent} />}
          {hydrated && goal.target > 0 && <ShareBar percent={percent} />}
        </div>

        <GoalForm
          goal={goal}
          hydrated={hydrated}
          onTargetChange={setTarget}
          onCurrentChange={setCurrent}
        />
      </main>
    </div>
  )
}

export default App
