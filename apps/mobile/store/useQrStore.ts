import { create } from 'zustand'

interface QrState {
  isOpeningQR: boolean
  setIsOpeningQR: () => void
}

export const useQrStore = create<QrState>()((set) => ({
  isOpeningQR: false,
  setIsOpeningQR: () => set((state) => ({isOpeningQR: !state.isOpeningQR})),
}))