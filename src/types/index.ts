/* ===== Types for CampusPrep Quiz Hub ===== */

export interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'mcq';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  hint?: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subject: string;
  description: string;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  estimatedTime: number; // in minutes
  icon: string;
  color: string;
  tags: string[];
  hasNegativeMarking: boolean;
  passingPercentage: number;
}

export interface QuizState {
  quizId: string;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>; // questionId -> selectedAnswer
  markedForReview: Set<string>;
  visitedQuestions: Set<string>;
  startTime: number;
  endTime: number | null;
  timeLimit: number; // seconds
  isSubmitted: boolean;
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  percentage: number;
  timeTaken: number; // seconds
  date: string;
  answers: Record<string, string>;
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  date: string;
  difficulty: string;
}

export interface SubjectStats {
  subject: string;
  totalAttempts: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  bestScore: number;
  averageScore: number;
}

export interface UserStats {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  overallAccuracy: number;
  bestScore: number;
  averageScore: number;
  strongestSubject: string;
  weakestSubject: string;
  currentStreak: number;
  longestStreak: number;
  lastAttemptDate: string;
  subjectStats: SubjectStats[];
  recentAttempts: QuizAttempt[];
}

export type QuestionStatus = 'unanswered' | 'answered' | 'marked' | 'current';

export interface MixedQuizOptions {
  subjects: string[];
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  timed: boolean;
  timeLimit: number;
}
