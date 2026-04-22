import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';

import { calculateScore, formatTime, getPerformanceMessage, getDifficultyColor } from '../utils/quizUtils';
import { OptionButton } from '../components/OptionButton';
import { ConceptCard } from '../components/ConceptCard';
import {
  Trophy, Target, Clock, CheckCircle, XCircle, MinusCircle,
  RotateCcw, Home, BarChart3, ChevronDown, ChevronUp
} from 'lucide-react';

export function ResultPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { questions, answers, startTime, resetQuiz } = useQuizStore();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Calculate results
  const result = useMemo(() => {
    if (questions.length === 0) return null;
    const { correct, wrong, unanswered } = calculateScore(questions, answers);
    const percentage = Math.round((correct / questions.length) * 100);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    return { correct, wrong, unanswered, percentage, timeTaken };
  }, [questions, answers, startTime]);

  const performance = result ? getPerformanceMessage(result.percentage) : null;

  // If no quiz data, redirect
  useEffect(() => {
    if (questions.length === 0) {
      const timer = setTimeout(() => navigate('/subjects'), 100);
      return () => clearTimeout(timer);
    }
  }, [questions, navigate]);

  if (!result || !performance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">No quiz data available</p>
          <Link to="/subjects" className="text-primary-500 hover:underline">Take a Quiz</Link>
        </div>
      </div>
    );
  }

  const handleRetry = () => {
    resetQuiz();
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Performance header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 sm:p-8 text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-5xl mb-3"
          >
            {performance.emoji}
          </motion.div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${performance.color} mb-2`}>
            {performance.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            {performance.message}
          </p>

          {/* Score circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-200 dark:text-slate-700"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - result.percentage / 100) }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.percentage}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Score</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Target, label: 'Total', value: questions.length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: CheckCircle, label: 'Correct', value: result.correct, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
              { icon: XCircle, label: 'Wrong', value: result.wrong, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
              { icon: Clock, label: 'Time', value: formatTime(result.timeTaken), color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                <div className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </button>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" /> Dashboard
          </Link>
        </div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Question Review
          </h2>

          <div className="space-y-4">
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              const isUnanswered = !userAnswer;
              const isExpanded = expandedQuestion === q.id;

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Math.min(index, 5) }}
                  className={`bg-white dark:bg-slate-800/50 rounded-2xl border-2 ${
                    isCorrect ? 'border-green-200 dark:border-green-800/50' :
                    isUnanswered ? 'border-slate-200 dark:border-slate-700/50' :
                    'border-red-200 dark:border-red-800/50'
                  } overflow-hidden`}
                >
                  {/* Question header — clickable */}
                  <button
                    onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                    className="w-full flex items-start gap-3 p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                      isCorrect ? 'bg-green-500' : isUnanswered ? 'bg-slate-400' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
                        {q.question}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {isCorrect ? (
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : isUnanswered ? (
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <MinusCircle className="w-3.5 h-3.5" /> Skipped
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-4 sm:px-5 pb-5 border-t border-slate-200 dark:border-slate-700/50 pt-4"
                    >
                      <div className="space-y-2 mb-4">
                        {q.options.map((option, i) => (
                          <OptionButton
                            key={i}
                            label={option}
                            index={i}
                            isSelected={userAnswer === option}
                            isCorrect={option === q.correctAnswer}
                            isWrong={userAnswer === option && option !== q.correctAnswer}
                            showResult={true}
                            disabled={true}
                            onClick={() => {}}
                          />
                        ))}
                      </div>

                      {/* Explanation */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">Explanation</p>
                        <p className="text-sm text-blue-600 dark:text-blue-200 leading-relaxed">{q.explanation}</p>
                      </div>

                      {/* Concept card for DSA questions */}
                      {(q.timeComplexity || q.spaceComplexity) && (
                        <ConceptCard question={q} />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
