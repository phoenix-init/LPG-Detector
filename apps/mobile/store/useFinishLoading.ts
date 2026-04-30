import { create } from "zustand";

interface FinishLoadingState {
    isFinished: boolean;
    setIsFinished: () => void;
}

export const useFinishLoadingStore = create<FinishLoadingState>((set) => ({
    isFinished: false,
    setIsFinished: () => set((state) => ({ isFinished: !state.isFinished })),
}))