import { create } from 'zustand';
import { QuizAttempt } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';

interface AnalyticsStore {
  attempts: QuizAttempt[];
  bookmarks: string[]; // question IDs

  addAttempt: (attempt: QuizAttempt) => void;
  clearAttempts: () => void;
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  attempts: loadFromStorage<QuizAttempt[]>('attempts', []),
  bookmarks: loadFromStorage<string[]>('bookmarks', []),

  addAttempt: (attempt) => {
    set((state) => {
      const updated = [...state.attempts, attempt];
      saveToStorage('attempts', updated);
      return { attempts: updated };
    });
  },

  clearAttempts: () => {
    saveToStorage('attempts', []);
    set({ attempts: [] });
  },

  toggleBookmark: (questionId) => {
    set((state) => {
      const updated = state.bookmarks.includes(questionId)
        ? state.bookmarks.filter((id) => id !== questionId)
        : [...state.bookmarks, questionId];
      saveToStorage('bookmarks', updated);
      return { bookmarks: updated };
    });
  },

  isBookmarked: (questionId) => {
    return get().bookmarks.includes(questionId);
  },
}));
