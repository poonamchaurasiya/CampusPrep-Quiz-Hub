import { useEffect, useState, useCallback } from 'react';
import { formatTime } from '../utils/quizUtils';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  timeLimit: number; // seconds
  startTime: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export function Timer({ timeLimit, startTime, onTimeUp, isRunning }: TimerProps) {
  const [remaining, setRemaining] = useState(timeLimit);

  const calculateRemaining = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, timeLimit - elapsed);
  }, [timeLimit, startTime]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const rem = calculateRemaining();
      setRemaining(rem);
      if (rem <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, calculateRemaining, onTimeUp]);

  const percentage = timeLimit > 0 ? (remaining / timeLimit) * 100 : 0;
  const isLow = remaining <= 60;
  const isCritical = remaining <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-semibold transition-colors ${
        isCritical
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse'
          : isLow
          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
      }`}
    >
      {isCritical ? (
        <AlertTriangle className="w-4 h-4" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      {formatTime(remaining)}
      {/* Tiny progress bar */}
      <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isCritical ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-primary-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
