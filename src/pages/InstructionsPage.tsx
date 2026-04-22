import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quizConfigs } from '../data/quizConfigs';
import { questions } from '../data/questions';
import { getDifficultyColor } from '../utils/quizUtils';
import {
  Clock, HelpCircle, AlertTriangle, CheckCircle, ArrowRight,
  ArrowLeft, Shield, RotateCcw
} from 'lucide-react';

export function InstructionsPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const config = quizConfigs.find((c) => c.id === quizId);
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Quiz Not Found</h2>
          <button
            onClick={() => navigate('/subjects')}
            className="text-primary-500 hover:underline"
          >
            Go to Subjects
          </button>
        </div>
      </div>
    );
  }

  // Count actual questions for this quiz
  const quizQuestions = questions.filter((q) => {
    if (config.subject === 'DSA') {
      return q.subject === 'DSA' && config.tags.some((t) => q.tags.includes(t));
    }
    return q.subject === config.subject;
  });

  const rules = [
    {
      icon: HelpCircle,
      text: `This quiz contains ${quizQuestions.length} questions`,
      color: 'text-blue-500',
    },
    {
      icon: Clock,
      text: `Time limit: ${config.estimatedTime} minutes`,
      color: 'text-amber-500',
    },
    {
      icon: config.hasNegativeMarking ? AlertTriangle : Shield,
      text: config.hasNegativeMarking
        ? 'Negative marking is enabled (-0.25 for wrong answers)'
        : 'No negative marking — answer confidently!',
      color: config.hasNegativeMarking ? 'text-red-500' : 'text-green-500',
    },
    {
      icon: CheckCircle,
      text: `Passing criteria: ${config.passingPercentage}% or above`,
      color: 'text-green-500',
    },
    {
      icon: RotateCcw,
      text: 'You can change your answers before submitting',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 sm:p-8 max-w-lg w-full shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{config.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{config.description}</p>
          <div className="mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(config.difficulty)}`}>
              {config.difficulty}
            </span>
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Quiz Rules
          </h3>
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
            >
              <rule.icon className={`w-5 h-5 ${rule.color} flex-shrink-0 mt-0.5`} />
              <span className="text-sm text-slate-700 dark:text-slate-300">{rule.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-6 border border-primary-200 dark:border-primary-800/50">
          <p className="text-xs text-primary-700 dark:text-primary-300">
            <span className="font-semibold">💡 Tip:</span> You can mark questions for review and revisit them before submitting. Use the question navigator to jump between questions.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/subjects')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => navigate(`/quiz/${quizId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
          >
            Start Quiz <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
