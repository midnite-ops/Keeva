interface Step {
  number: number
  label: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepHeader({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => {
        const isCompleted = step.number < currentStep
        const isActive = step.number === currentStep

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300',
                  isCompleted
                    ? 'bg-black text-white'
                    : isActive
                      ? 'bg-black text-white ring-4 ring-black/10'
                      : 'bg-white text-neutral-400 border border-neutral-200',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={[
                  'text-[11px] font-medium tracking-wide whitespace-nowrap transition-colors duration-300',
                  isActive ? 'text-black' : isCompleted ? 'text-black' : 'text-neutral-400',
                ].join(' ')}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={[
                  'w-8 sm:w-16 h-px mx-1.5 sm:mx-2 mb-5 transition-colors duration-300',
                  isCompleted ? 'bg-black' : 'bg-neutral-200',
                ].join(' ')}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
