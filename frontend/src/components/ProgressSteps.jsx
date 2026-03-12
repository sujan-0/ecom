const Step = ({ label, done, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? "bg-brand-500 border-brand-500 text-white"
        : active ? "border-brand-500 bg-white text-brand-600"
          : "border-slate-200 bg-white text-slate-400"
      }`}>
      {done ? "✓" : null}
    </div>
    <span className={`text-xs font-semibold uppercase tracking-wider ${done || active ? "text-slate-900" : "text-slate-400"
      }`}>{label}</span>
  </div>
);

const Line = ({ done }) => (
  <div className={`flex-1 h-0.5 mt-4 self-start transition-all ${done ? "bg-brand-500" : "bg-slate-200"}`} />
);

const ProgressSteps = ({ step1, step2, step3 }) => (
  <div className="flex items-start gap-2 mb-10">
    <Step label="Sign In" done={step1} active={!step1} />
    <Line done={step1} />
    <Step label="Shipping" done={step2} active={step1 && !step2} />
    <Line done={step2} />
    <Step label="Summary" done={step3} active={step2 && !step3} />
  </div>
);

export default ProgressSteps;
