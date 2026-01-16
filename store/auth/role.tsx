import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { crossPlatformStorage } from '@/utils/storage/crossPlatformStorage';

type Role = 'vendor' | 'tani' | 'agent' | null;

interface VendorStatus {
  isRegistered: boolean;
  vendorType: 'individual' | 'company' | null;
  vendorId: string | null;
}

interface AgentStatus {
  isRegistered: boolean;
  agentId: string | null;
}

interface AuthState {
  role: Role;
  vendorStatus: VendorStatus;
  agentStatus: AgentStatus;
  setRole: (role: Role) => void;
  setVendorStatus: (status: Partial<VendorStatus>) => void;
  setAgentStatus: (status: Partial<AgentStatus>) => void;
  resetAuth: () => void;
}

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

const initialState = {
  role: 'tani' as Role,
  vendorStatus: {
    isRegistered: false,
    vendorType: null,
    vendorId: null,
  },
  agentStatus: {
    isRegistered: false,
    agentId: null,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      ...initialState,
      setRole: role => set({ role }),
      setVendorStatus: status =>
        set(state => ({
          vendorStatus: { ...state.vendorStatus, ...status },
        })),
      setAgentStatus: status =>
        set(state => ({
          agentStatus: { ...state.agentStatus, ...status },
        })),
      resetAuth: () => set(initialState),
    }),
    {
      name: 'tani_pintar_auth',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
