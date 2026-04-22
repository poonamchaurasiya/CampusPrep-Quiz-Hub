import { create } from 'zustand';
import { Question } from '../types';

interface QuizStore {
  // Quiz state
  quizId: string;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;
  markedForReview: string[];
  visitedQuestions: string[];
  startTime: number;
  timeLimit: number; // seconds
  isSubmitted: boolean;
  isStarted: boolean;

  // Actions
  startQuiz: (quizId: string, questions: Question[], timeLimit: number) => void;
  selectAnswer: (questionId: string, answer: string) => void;
  navigateTo: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  toggleMarkForReview: (questionId: string) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizId: '',
  questions: [],
  currentIndex: 0,
  answers: {},
  markedForReview: [],
  visitedQuestions: [],
  startTime: 0,
  timeLimit: 0,
  isSubmitted: false,
  isStarted: false,

  startQuiz: (quizId, questions, timeLimit) => {
    set({
      quizId,
      questions,
      currentIndex: 0,
      answers: {},
      markedForReview: [],
      visitedQuestions: [questions[0]?.id || ''],
      startTime: Date.now(),
      timeLimit,
      isSubmitted: false,
      isStarted: true,
    });
  },

  selectAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  navigateTo: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set((state) => ({
        currentIndex: index,
        visitedQuestions: state.visitedQuestions.includes(questions[index].id)
          ? state.visitedQuestions
          : [...state.visitedQuestions, questions[index].id],
      }));
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      get().navigateTo(currentIndex + 1);
    }
  },

  previousQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      get().navigateTo(currentIndex - 1);
    }
  },

  toggleMarkForReview: (questionId) => {
    set((state) => ({
      markedForReview: state.markedForReview.includes(questionId)
        ? state.markedForReview.filter((id) => id !== questionId)
        : [...state.markedForReview, questionId],
    }));
  },

  submitQuiz: () => {
    set({ isSubmitted: true });
  },

  resetQuiz: () => {
    set({
      quizId: '',
      questions: [],
      currentIndex: 0,
      answers: {},
      markedForReview: [],
      visitedQuestions: [],
      startTime: 0,
      timeLimit: 0,
      isSubmitted: false,
      isStarted: false,
    });
  },
}));
