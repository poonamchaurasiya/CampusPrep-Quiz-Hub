import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QuizConfig } from '../types';
import { getDifficultyColor } from '../utils/quizUtils';
import { Clock, HelpCircle, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
type IconMap = Record<string, React.ComponentType<{ className?: string }>>;

interface SubjectCardProps {
  config: QuizConfig;
}

export function SubjectCard({ config }: SubjectCardProps) {
  const navigate = useNavigate();
  // Dynamically get icon
  const IconComponent = (Icons as unknown as IconMap)[config.icon] || Icons.BookOpen;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/quiz/${config.id}/instructions`)}
      className="group cursor-pointer bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
    >
      {/* Icon + gradient header */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      {/* Title & description */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {config.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
        {config.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(config.difficulty)}`}>
          {config.difficulty}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <HelpCircle className="w-3.5 h-3.5" />
          {config.questionCount} Qs
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {config.estimatedTime} min
        </span>
      </div>

      {/* Start button hint */}
      <div className="flex items-center text-sm text-primary-500 dark:text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Start Quiz <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
}
