import { create } from 'zustand';

type Role = 'vendor' | 'tani' | "agent" |null;

interface AuthState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  role: 'tani',
  setRole: role => set({ role }),
}));
