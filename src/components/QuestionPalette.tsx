import { motion } from 'framer-motion';
import { QuestionStatus } from '../types';

interface QuestionPaletteProps {
  total: number;
  currentIndex: number;
  answers: Record<string, string>;
  markedForReview: string[];
  questionIds: string[];
  onNavigate: (index: number) => void;
}

function getStatus(
  index: number,
  currentIndex: number,
  questionId: string,
  answers: Record<string, string>,
  markedForReview: string[]
): QuestionStatus {
  if (index === currentIndex) return 'current';
  if (markedForReview.includes(questionId)) return 'marked';
  if (answers[questionId]) return 'answered';
  return 'unanswered';
}

const statusStyles: Record<QuestionStatus, string> = {
  current: 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 ring-primary-300 dark:ring-primary-600',
  answered: 'bg-green-500 text-white',
  marked: 'bg-yellow-500 text-white',
  unanswered: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600',
};

export function QuestionPalette({
  total,
  currentIndex,
  answers,
  markedForReview,
  questionIds,
  onNavigate,
}: QuestionPaletteProps) {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Question Navigator</h3>
      
      {/* Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: total }, (_, i) => {
          const status = getStatus(i, currentIndex, questionIds[i], answers, markedForReview);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(i)}
              className={`w-9 h-9 rounded-lg text-xs font-bold ${statusStyles[status]} transition-all`}
            >
              {i + 1}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-700">
        {[
          { color: 'bg-primary-500', label: 'Current' },
          { color: 'bg-green-500', label: 'Answered' },
          { color: 'bg-yellow-500', label: 'Marked for Review' },
          { color: 'bg-slate-200 dark:bg-slate-600', label: 'Not Visited' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`} />
            <span className="text-xs text-slate-500 dark:text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
