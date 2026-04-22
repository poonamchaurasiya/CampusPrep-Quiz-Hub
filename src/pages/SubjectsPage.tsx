import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { quizConfigs, subjectList } from '../data/quizConfigs';
import { SubjectCard } from '../components/SubjectCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { Filter, LayoutGrid } from 'lucide-react';

const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Mixed'];

export function SubjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredConfigs = useMemo(() => {
    return quizConfigs.filter((config) => {
      const matchesSearch =
        config.title.toLowerCase().includes(search.toLowerCase()) ||
        config.description.toLowerCase().includes(search.toLowerCase()) ||
        config.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesSubject = selectedSubject === 'All' || config.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'All' || config.difficulty === selectedDifficulty;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [search, selectedSubject, selectedDifficulty]);

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Quiz Categories
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-[52px]">
            Choose a subject to begin your practice session
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-4 sm:p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search subjects, topics..."
            />

            {/* Subject filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="All">All Subjects</option>
              {subjectList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredConfigs.length} of {quizConfigs.length} quizzes
          </span>
        </div>

        {/* Grid */}
        {filteredConfigs.length === 0 ? (
          <EmptyState
            title="No quizzes found"
            description="Try adjusting your filters or search query"
            action={
              <button
                onClick={() => { setSearch(''); setSelectedSubject('All'); setSelectedDifficulty('All'); }}
                className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            }
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredConfigs.map((config, index) => (
              <motion.div
                key={config.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SubjectCard config={config} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
