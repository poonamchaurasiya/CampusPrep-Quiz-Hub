import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAnalyticsStore } from '../store/analyticsStore';
import { computeUserStats } from '../utils/quizUtils';
import { EmptyState } from '../components/EmptyState';
import {
  BarChart3, Trophy, Target, Flame, Award,
  ThumbsUp, ThumbsDown, Clock, Trash2
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

export function DashboardPage() {
  const { attempts, clearAttempts } = useAnalyticsStore();
  const stats = useMemo(() => computeUserStats(attempts), [attempts]);

  if (attempts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary-500" />
            Dashboard
          </h1>
          <EmptyState
            title="No data yet"
            description="Complete your first quiz to see your performance analytics here."
            action={
              <Link
                to="/subjects"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
              >
                Take a Quiz
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  // Chart data
  const subjectAccuracyData = stats.subjectStats.map((s) => ({
    name: s.subject.length > 10 ? s.subject.substring(0, 10) + '...' : s.subject,
    accuracy: s.accuracy,
    attempts: s.totalAttempts,
  }));

  const difficultyData = [
    { name: 'Easy', value: attempts.filter((a) => a.difficulty === 'Easy').length || 0 },
    { name: 'Medium', value: attempts.filter((a) => a.difficulty === 'Medium').length || 0 },
    { name: 'Hard', value: attempts.filter((a) => a.difficulty === 'Hard').length || 0 },
    { name: 'Mixed', value: attempts.filter((a) => a.difficulty === 'Mixed').length || 0 },
  ].filter((d) => d.value > 0);

  const recentScores = stats.recentAttempts.slice(0, 10).reverse().map((a, i) => ({
    name: `#${i + 1}`,
    score: a.percentage,
  }));

  const radarData = stats.subjectStats.map((s) => ({
    subject: s.subject.length > 8 ? s.subject.substring(0, 8) : s.subject,
    accuracy: s.accuracy,
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-primary-500" />
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track your learning progress and performance</p>
          </div>
          <button
            onClick={clearAttempts}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Clear all data"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Trophy, label: 'Total Quizzes', value: stats.totalQuizzes, color: 'text-amber-500', bg: 'from-amber-500/10 to-orange-500/10' },
            { icon: Target, label: 'Accuracy', value: `${stats.overallAccuracy}%`, color: 'text-green-500', bg: 'from-green-500/10 to-emerald-500/10' },
            { icon: Award, label: 'Best Score', value: `${stats.bestScore}%`, color: 'text-primary-500', bg: 'from-primary-500/10 to-violet-500/10' },
            { icon: Flame, label: 'Current Streak', value: `${stats.currentStreak} day${stats.currentStreak !== 1 ? 's' : ''}`, color: 'text-orange-500', bg: 'from-orange-500/10 to-red-500/10' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.bg} bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Strengths / Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800/50 p-5 flex items-center gap-4">
            <ThumbsUp className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Strongest Subject</div>
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{stats.strongestSubject}</div>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50 p-5 flex items-center gap-4">
            <ThumbsDown className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-xs text-red-600 dark:text-red-400 font-medium">Needs Improvement</div>
              <div className="text-lg font-bold text-red-700 dark:text-red-300">{stats.weakestSubject}</div>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Subject accuracy bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject-wise Accuracy</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="accuracy" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Score trend line chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Score Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recentScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Difficulty distribution pie */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Difficulty Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {difficultyData.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {difficultyData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Radar chart */}
          {radarData.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Radar
                    dataKey="accuracy"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Recent Attempts table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Recent Attempts
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 pb-3 pr-4">Quiz</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 pb-3 pr-4">Subject</th>
                  <th className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 pb-3 pr-4">Score</th>
                  <th className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 pb-3 pr-4">Time</th>
                  <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAttempts.map((attempt) => (
                  <tr key={attempt.id} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{attempt.quizTitle}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">{attempt.subject}</span>
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <span className={`text-sm font-semibold ${
                        attempt.percentage >= 60 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {attempt.percentage}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(attempt.date).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
