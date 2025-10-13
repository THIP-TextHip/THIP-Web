import { create } from 'zustand';

interface AuthReadyState {
  isReady: boolean;
  setReady: (ready: boolean) => void;
}

export const useAuthReadyStore = create<AuthReadyState>(set => ({
  isReady: false,
  setReady: (ready: boolean) => set({ isReady: ready }),
}));
