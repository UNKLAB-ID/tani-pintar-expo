// stores/useProfileStore.ts
import { create } from 'zustand';

interface ProfileState {
  profileImage: any | null;
  setProfileImage: (url: any) => void;
}

export const useProfileStore = create<ProfileState>(set => ({
  profileImage: null,
  rotation: 0,
  setProfileImage: url => set({ profileImage: url }),
}));
