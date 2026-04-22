interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
}

export function ProgressBar({ current, total, answered }: ProgressBarProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
  const answeredProgress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Question {current + 1} of {total}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {answered} answered
        </span>
      </div>
      <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        {/* Answered progress (background) */}
        <div
          className="absolute top-0 left-0 h-full bg-green-200 dark:bg-green-900/50 rounded-full transition-all duration-300"
          style={{ width: `${answeredProgress}%` }}
        />
        {/* Current progress (foreground) */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
