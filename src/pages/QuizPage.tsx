import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { useAnalyticsStore } from '../store/analyticsStore';
import { quizConfigs } from '../data/quizConfigs';
import { questions as allQuestions } from '../data/questions';
import { generateQuiz, calculateScore, generateId } from '../utils/quizUtils';
import { Timer } from '../components/Timer';
import { ProgressBar } from '../components/ProgressBar';
import { OptionButton } from '../components/OptionButton';
import { QuestionPalette } from '../components/QuestionPalette';
import { Modal } from '../components/Modal';
import {
  ChevronLeft, ChevronRight, Flag, Send, BookmarkPlus,
  AlertCircle, PanelRightOpen, PanelRightClose
} from 'lucide-react';

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const {
    questions, currentIndex, answers, markedForReview, isStarted,
    startQuiz, selectAnswer, navigateTo, nextQuestion, previousQuestion,
    toggleMarkForReview, submitQuiz, timeLimit, startTime, isSubmitted,
  } = useQuizStore();

  const { addAttempt } = useAnalyticsStore();

  const config = quizConfigs.find((c) => c.id === quizId);
  const quizTitle = config?.title || 'Mixed Quiz';

  // Initialize quiz — only for config-based quizzes (not mixed)
  useEffect(() => {
    if (isStarted || !config) return;

    let quizQuestions;
    if (config.subject === 'DSA') {
      // Filter by tags for topic-specific DSA quizzes
      const tagFiltered = allQuestions.filter(
        (q) => q.subject === 'DSA' && config.tags.some((t) => q.tags.includes(t))
      );
      quizQuestions = tagFiltered.length > 0
        ? tagFiltered.sort(() => Math.random() - 0.5).slice(0, config.questionCount)
        : generateQuiz(allQuestions, { subjects: ['DSA'], count: config.questionCount });
    } else {
      quizQuestions = generateQuiz(allQuestions, {
        subjects: [config.subject],
        count: config.questionCount,
      });
    }

    if (quizQuestions.length === 0) {
      quizQuestions = allQuestions
        .filter((q) => q.subject === config.subject)
        .sort(() => Math.random() - 0.5)
        .slice(0, config.questionCount);
    }

    startQuiz(quizId!, quizQuestions, config.estimatedTime * 60);
  }, [config, quizId, isStarted, startQuiz]);

  // Handle submission
  const handleSubmit = useCallback(() => {
    submitQuiz();
    const scoreResult = calculateScore(questions, answers);
    const percentage = questions.length > 0 ? Math.round((scoreResult.correct / questions.length) * 100) : 0;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    addAttempt({
      id: generateId(),
      quizId: quizId!,
      quizTitle,
      subject: config?.subject || 'Mixed',
      score: scoreResult.correct,
      totalQuestions: questions.length,
      percentage,
      timeTaken,
      date: new Date().toISOString(),
      difficulty: config?.difficulty || 'Mixed',
    });

    navigate(`/result/${quizId}`);
  }, [submitQuiz, questions, answers, startTime, addAttempt, quizId, quizTitle, config, navigate]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  // Show loading only if quiz hasn't been started yet (waiting for config init)
  if (!isStarted || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-pulse text-slate-500 dark:text-slate-400 mb-4">Loading quiz...</div>
          {!config && !isStarted && (
            <button
              onClick={() => navigate('/subjects')}
              className="text-sm text-primary-500 hover:underline"
            >
              Go back to subjects
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isMarked = markedForReview.includes(currentQuestion.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white hidden sm:block">
                {quizTitle}
              </h2>
              <ProgressBar
                current={currentIndex}
                total={questions.length}
                answered={answeredCount}
              />
            </div>
            <div className="flex items-center gap-2">
              <Timer
                timeLimit={timeLimit}
                startTime={startTime}
                onTimeUp={handleTimeUp}
                isRunning={!isSubmitted}
              />
              <button
                onClick={() => setShowPalette(!showPalette)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
                aria-label="Toggle question navigator"
              >
                {showPalette ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 sm:p-8"
              >
                {/* Question header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                        Q{currentIndex + 1}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {currentQuestion.topic}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {currentQuestion.question}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleMarkForReview(currentQuestion.id)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      isMarked
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    aria-label={isMarked ? 'Unmark for review' : 'Mark for review'}
                  >
                    {isMarked ? <BookmarkPlus className="w-5 h-5" /> : <Flag className="w-5 h-5" />}
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <OptionButton
                      key={index}
                      label={option}
                      index={index}
                      isSelected={answers[currentQuestion.id] === option}
                      onClick={() => selectAnswer(currentQuestion.id, option)}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={previousQuestion}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {currentIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                    >
                      <Send className="w-4 h-4" /> Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop palette */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <QuestionPalette
                total={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                markedForReview={markedForReview}
                questionIds={questions.map((q) => q.id)}
                onNavigate={navigateTo}
              />
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
              >
                <Send className="w-4 h-4" /> Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile palette overlay */}
      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowPalette(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 p-4 overflow-y-auto"
            >
              <QuestionPalette
                total={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                markedForReview={markedForReview}
                questionIds={questions.map((q) => q.id)}
                onNavigate={(i) => { navigateTo(i); setShowPalette(false); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Quiz?"
      >
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Answered</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{answeredCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Unanswered</span>
              <span className="font-semibold text-red-600 dark:text-red-400">{questions.length - answeredCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Marked for Review</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">{markedForReview.length}</span>
            </div>
          </div>

          {answeredCount < questions.length && (
            <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-800/50">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                You have {questions.length - answeredCount} unanswered question(s). Are you sure you want to submit?
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Review Answers
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
            >
              Confirm Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
