import { create } from 'zustand';

interface AIStore {
  resuldata: any;
  setResulData: (value: any) => void;
}

export const useAiStore = create<AIStore>(set => ({
  resuldata: null,
  setResulData: value => set({ resuldata: value }),
}));
