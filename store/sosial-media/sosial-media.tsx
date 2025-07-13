// stores/useProfileStore.ts
import { create } from 'zustand';

interface MediaSosialStore {
  profileImage: any | null;
  setProfileImage: (url: any) => void;

  modalDeletePost: boolean;
  setModalDeletePost: (visible: boolean) => void;
}

export const useMediaSosial = create<MediaSosialStore>(set => ({
  profileImage: null,
  rotation: 0,
  setProfileImage: url => set({ profileImage: url }),
  modalDeletePost: false,
  setModalDeletePost: visible => set({ modalDeletePost: visible }),
}));
