import { ChevronLeft, Check } from "lucide-react";
import { STEPS } from "../../../types/createPostTypes";

interface StepHeaderProps {
  step: number;
  canNext: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function StepHeader({ step, canNext, onBack, onNext }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border px-3 sm:px-6 py-3 sm:py-4">
      <button
        type="button"
        onClick={onBack}
        className={`shrink-0 text-muted-foreground hover:text-foreground transition-colors ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1.5 sm:gap-6 overflow-x-auto">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all shrink-0 ${
                i < step
                  ? "bg-accent text-accent-foreground"
                  : i === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={`hidden sm:inline text-xs tracking-wide transition-colors ${
                i === step ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-4 sm:w-8 h-px ml-1 sm:ml-2 ${i < step ? "bg-accent" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={`shrink-0 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all px-3 sm:px-4 py-1.5 rounded-md ${
          canNext
            ? step === STEPS.length - 1
              ? "bg-accent text-accent-foreground hover:opacity-80"
              : "text-accent hover:bg-accent/10"
            : "text-muted-foreground cursor-not-allowed"
        }`}
      >
        {step === STEPS.length - 1 ? "Publish" : "Next"}
      </button>
    </div>
  );
}

