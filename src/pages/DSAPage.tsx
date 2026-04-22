import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
// Route navigation available via SubjectCard
import { quizConfigs } from '../data/quizConfigs';
import { questions } from '../data/questions';
import { SubjectCard } from '../components/SubjectCard';
import { getDifficultyColor } from '../utils/quizUtils';
import { Zap, Code2, Filter, BookOpen, Target, Brain } from 'lucide-react';

const difficultyFilters = ['All', 'Easy', 'Medium', 'Hard'];

export function DSAPage() {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');


  const dsaConfigs = quizConfigs.filter((c) => c.subject === 'DSA');

  const dsaQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.subject !== 'DSA') return false;
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTopic, selectedDifficulty]);

  // Topic stats
  const topicStats = useMemo(() => {
    const stats = new Map<string, { total: number; easy: number; medium: number; hard: number }>();
    questions.filter((q) => q.subject === 'DSA').forEach((q) => {
      const existing = stats.get(q.topic) || { total: 0, easy: 0, medium: 0, hard: 0 };
      existing.total++;
      if (q.difficulty === 'Easy') existing.easy++;
      if (q.difficulty === 'Medium') existing.medium++;
      if (q.difficulty === 'Hard') existing.hard++;
      stats.set(q.topic, existing);
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              DSA Mastery Mode
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-[52px]">
            Deep dive into Data Structures & Algorithms with complexity analysis and concept cards
          </p>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Code2, label: 'Total Questions', value: questions.filter((q) => q.subject === 'DSA').length, color: 'text-blue-500' },
            { icon: BookOpen, label: 'Topics', value: topicStats.size, color: 'text-violet-500' },
            { icon: Target, label: 'With Complexity', value: questions.filter((q) => q.timeComplexity).length, color: 'text-green-500' },
            { icon: Brain, label: 'With Hints', value: questions.filter((q) => q.hint).length, color: 'text-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Topic breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5 mb-8"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            Topic Breakdown
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedTopic === 'All'
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              All Topics
            </button>
            {Array.from(topicStats.entries()).map(([topic, stats]) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTopic === topic
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {topic} ({stats.total})
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-2 mt-3">
            {difficultyFilters.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedDifficulty === d
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Available DSA quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">DSA Quiz Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsaConfigs.map((config) => (
              <SubjectCard key={config.id} config={config} />
            ))}
          </div>
        </motion.div>

        {/* Question preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Questions Preview
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
              ({dsaQuestions.length} questions)
            </span>
          </h3>
          <div className="space-y-3">
            {dsaQuestions.slice(0, 10).map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">{q.question}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(q.difficulty)}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{q.topic}</span>
                      {q.timeComplexity && (
                        <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded">
                          ⏱ {q.timeComplexity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {dsaQuestions.length > 10 && (
              <p className="text-center text-sm text-slate-400 py-2">
                ...and {dsaQuestions.length - 10} more questions
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
