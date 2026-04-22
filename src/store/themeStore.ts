import { create } from 'zustand';
import { loadFromStorage, saveToStorage } from '../utils/storageUtils';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: loadFromStorage<boolean>('darkMode', true),

  toggleTheme: () => {
    set((state) => {
      const newDark = !state.isDark;
      saveToStorage('darkMode', newDark);
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: newDark };
    });
  },
}));
