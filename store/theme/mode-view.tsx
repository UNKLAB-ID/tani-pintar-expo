import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | null;

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: null,
  setTheme: theme => set({ theme }),
}));
