import { Lightbulb, Clock, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface ConceptCardProps {
  question: Question;
}

export function ConceptCard({ question }: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800/50 p-5 mt-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-indigo-500" />
        <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Concept Card</h4>
      </div>

      {/* Explanation */}
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        {question.explanation}
      </p>

      {/* Complexity info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.timeComplexity && (
          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Time Complexity</p>
              <p className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-200">{question.timeComplexity}</p>
            </div>
          </div>
        )}
        {question.spaceComplexity && (
          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-2">
            <Zap className="w-3.5 h-3.5 text-purple-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Space Complexity</p>
              <p className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-200">{question.spaceComplexity}</p>
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      {question.hint && (
        <div className="mt-3 flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-3 py-2 border border-yellow-200 dark:border-yellow-800/50">
          <AlertCircle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            <span className="font-semibold">Hint: </span>
            {question.hint}
          </p>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
