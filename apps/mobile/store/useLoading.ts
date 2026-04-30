import { create } from "zustand";

interface LoadingState {
    isVerifying: boolean;
    setIsVerifying: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isVerifying: false,
    setIsVerifying: () => set((state) => ({ isVerifying: !state.isVerifying})),
}))