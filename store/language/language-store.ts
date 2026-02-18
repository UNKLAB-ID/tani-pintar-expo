import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { crossPlatformStorage } from '@/utils/storage/crossPlatformStorage';

export type Language = 'id' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
}

// Custom storage adapter for zustand persist
const zustandStorage = {
  getItem: async (name: string) => {
    const value = await crossPlatformStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await crossPlatformStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await crossPlatformStorage.deleteItem(name);
  },
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: 'id',
      setLanguage: lang => set({ language: lang }),
      isHydrated: false,
      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'tani_pintar_language',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => state => {
        state?.setHydrated(true);
      },
    }
  )
);
