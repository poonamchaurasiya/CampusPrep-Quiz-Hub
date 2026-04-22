import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subjectList } from '../data/quizConfigs';
import { questions as allQuestions } from '../data/questions';
import { generateQuiz, generateId } from '../utils/quizUtils';
import { useQuizStore } from '../store/quizStore';
import { Shuffle, Play, CheckSquare, Clock, Gauge } from 'lucide-react';

export function MixedQuizPage() {
  const navigate = useNavigate();
  const { startQuiz } = useQuizStore();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [timed, setTimed] = useState(true);
  const [timeLimit, setTimeLimit] = useState(15);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const availableQuestions = generateQuiz(allQuestions, {
    subjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
    difficulty: difficulty !== 'Mixed' ? difficulty : undefined,
  });

  const handleStartQuiz = () => {
    const quizQuestions = generateQuiz(allQuestions, {
      subjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
      difficulty: difficulty !== 'Mixed' ? difficulty : undefined,
      count: questionCount,
    });

    if (quizQuestions.length === 0) return;

    const quizId = 'mixed-' + generateId();
    startQuiz(quizId, quizQuestions, timed ? timeLimit * 60 : 99999);
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Mixed Quiz Builder
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-[52px]">
            Create a custom quiz by selecting subjects, difficulty, and question count
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 space-y-6"
        >
          {/* Subject selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-3">
              <CheckSquare className="w-4 h-4 text-primary-500" />
              Select Subjects
            </label>
            <div className="flex flex-wrap gap-2">
              {subjectList.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedSubjects.includes(subject)
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {selectedSubjects.length === 0
                ? 'All subjects selected by default'
                : `${selectedSubjects.length} subject(s) selected`}
            </p>
          </div>

          {/* Difficulty */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-3">
              <Gauge className="w-4 h-4 text-amber-500" />
              Difficulty
            </label>
            <div className="flex gap-2">
              {['Mixed', 'Easy', 'Medium', 'Hard'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    difficulty === d
                      ? 'bg-violet-500 text-white shadow-md shadow-violet-500/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Number of Questions: <span className="text-primary-500">{questionCount}</span>
            </label>
            <input
              type="range"
              min={5}
              max={Math.min(availableQuestions.length, 50)}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5</span>
              <span>{Math.min(availableQuestions.length, 50)}</span>
            </div>
          </div>

          {/* Timer */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-3">
              <Clock className="w-4 h-4 text-green-500" />
              Timer
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTimed(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timed
                    ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Timed
              </button>
              <button
                onClick={() => setTimed(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  !timed
                    ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Untimed
              </button>
              {timed && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                  <span className="text-sm text-slate-500">minutes</span>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">{availableQuestions.length}</span> questions available with current filters.
              Your quiz will have <span className="font-semibold text-primary-500">{Math.min(questionCount, availableQuestions.length)}</span> randomly selected questions.
            </p>
          </div>

          {/* Start button */}
          <button
            onClick={handleStartQuiz}
            disabled={availableQuestions.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Generate & Start Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
}
