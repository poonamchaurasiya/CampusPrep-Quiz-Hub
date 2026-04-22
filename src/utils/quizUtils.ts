import { Question, QuizAttempt, SubjectStats, UserStats } from '../types';

/** Calculate score from answers and questions */
export function calculateScore(
  questions: Question[],
  answers: Record<string, string>
): { correct: number; wrong: number; unanswered: number } {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) {
      unanswered++;
    } else if (answer === q.correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  });

  return { correct, wrong, unanswered };
}

/** Format seconds into MM:SS or HH:MM:SS */
export function formatTime(seconds: number): string {
  if (seconds < 0) seconds = 0;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/** Get questions filtered by subject */
export function getQuestionsBySubject(questions: Question[], subject: string): Question[] {
  return questions.filter((q) => q.subject === subject);
}

/** Get questions filtered by topic */
export function getQuestionsByTopic(questions: Question[], topic: string): Question[] {
  return questions.filter((q) => q.topic === topic);
}

/** Get questions filtered by difficulty */
export function getQuestionsByDifficulty(
  questions: Question[],
  difficulty: string
): Question[] {
  if (difficulty === 'Mixed') return questions;
  return questions.filter((q) => q.difficulty === difficulty);
}

/** Get questions matching tags */
export function getQuestionsByTags(questions: Question[], tags: string[]): Question[] {
  return questions.filter((q) => q.tags.some((t) => tags.includes(t)));
}

/** Generate a filtered quiz with shuffled questions */
export function generateQuiz(
  allQuestions: Question[],
  options: {
    subjects?: string[];
    difficulty?: string;
    topics?: string[];
    count?: number;
  }
): Question[] {
  let filtered = [...allQuestions];

  if (options.subjects && options.subjects.length > 0) {
    filtered = filtered.filter((q) => options.subjects!.includes(q.subject));
  }

  if (options.difficulty && options.difficulty !== 'Mixed') {
    filtered = filtered.filter((q) => q.difficulty === options.difficulty);
  }

  if (options.topics && options.topics.length > 0) {
    filtered = filtered.filter((q) => options.topics!.includes(q.topic));
  }

  // Shuffle using Fisher-Yates
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  if (options.count && options.count < filtered.length) {
    filtered = filtered.slice(0, options.count);
  }

  return filtered;
}

/** Compute subject-wise analytics from attempts */
export function computeSubjectStats(attempts: QuizAttempt[]): SubjectStats[] {
  const subjectMap = new Map<string, { total: number; questions: number; correct: number; scores: number[] }>();

  attempts.forEach((a) => {
    const existing = subjectMap.get(a.subject) || {
      total: 0,
      questions: 0,
      correct: 0,
      scores: [],
    };
    existing.total++;
    existing.questions += a.totalQuestions;
    existing.correct += Math.round((a.percentage / 100) * a.totalQuestions);
    existing.scores.push(a.percentage);
    subjectMap.set(a.subject, existing);
  });

  const stats: SubjectStats[] = [];
  subjectMap.forEach((data, subject) => {
    stats.push({
      subject,
      totalAttempts: data.total,
      totalQuestions: data.questions,
      correctAnswers: data.correct,
      accuracy: data.questions > 0 ? Math.round((data.correct / data.questions) * 100) : 0,
      bestScore: Math.max(...data.scores),
      averageScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
    });
  });

  return stats;
}

/** Compute overall user stats */
export function computeUserStats(attempts: QuizAttempt[]): UserStats {
  if (attempts.length === 0) {
    return {
      totalQuizzes: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      overallAccuracy: 0,
      bestScore: 0,
      averageScore: 0,
      strongestSubject: 'N/A',
      weakestSubject: 'N/A',
      currentStreak: 0,
      longestStreak: 0,
      lastAttemptDate: '',
      subjectStats: [],
      recentAttempts: [],
    };
  }

  const subjectStats = computeSubjectStats(attempts);
  const totalQuestions = attempts.reduce((sum, a) => sum + a.totalQuestions, 0);
  const totalCorrect = subjectStats.reduce((sum, s) => sum + s.correctAnswers, 0);
  const scores = attempts.map((a) => a.percentage);

  const strongest = subjectStats.reduce((best, s) => (s.accuracy > best.accuracy ? s : best));
  const weakest = subjectStats.reduce((worst, s) => (s.accuracy < worst.accuracy ? s : worst));

  // Streak calculation (consecutive days with attempts)
  const sortedDates = [...new Set(attempts.map((a) => a.date.split('T')[0]))].sort().reverse();
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    const expected = expectedDate.toISOString().split('T')[0];
    if (sortedDates[i] === expected) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    totalQuizzes: attempts.length,
    totalQuestions,
    correctAnswers: totalCorrect,
    overallAccuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
    bestScore: Math.max(...scores),
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    strongestSubject: strongest.subject,
    weakestSubject: weakest.subject,
    currentStreak,
    longestStreak: Math.max(currentStreak, 0),
    lastAttemptDate: attempts[attempts.length - 1]?.date || today,
    subjectStats,
    recentAttempts: attempts.slice(-10).reverse(),
  };
}

/** Get a performance message based on percentage */
export function getPerformanceMessage(percentage: number): {
  title: string;
  message: string;
  emoji: string;
  color: string;
} {
  if (percentage >= 90) {
    return {
      title: 'Outstanding!',
      message: "You've demonstrated exceptional understanding. Keep up the brilliant work!",
      emoji: '🏆',
      color: 'text-yellow-500',
    };
  }
  if (percentage >= 75) {
    return {
      title: 'Excellent!',
      message: "Strong performance! You have a solid grasp of the concepts.",
      emoji: '🌟',
      color: 'text-green-500',
    };
  }
  if (percentage >= 60) {
    return {
      title: 'Good Job!',
      message: "You're on the right track. Review the missed questions and keep practicing.",
      emoji: '👍',
      color: 'text-blue-500',
    };
  }
  if (percentage >= 40) {
    return {
      title: 'Keep Practicing',
      message: "You're getting there. Focus on the fundamentals and try again!",
      emoji: '📚',
      color: 'text-orange-500',
    };
  }
  return {
    title: 'Room for Growth',
    message: "Don't give up! Review the explanations and strengthen your concepts.",
    emoji: '💪',
    color: 'text-red-500',
  };
}

/** Get difficulty badge color */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Hard':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  }
}

/** Generate a unique ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
