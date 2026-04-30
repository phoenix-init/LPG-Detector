import { create } from "zustand";

interface DeviceIdState {
    deviceId: string | undefined;
    setDeviceId: (id: string) => void;
    
}

export const useDeviceIdStore = create<DeviceIdState>((set) => ({
    deviceId: undefined,
    setDeviceId: (id: string) => set((state) => ({ deviceId: state.deviceId = id })),
}))