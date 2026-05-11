import { create } from "zustand";

interface User {
    name: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
    id: string;
    devices: Devices[]
}

interface Devices {
    id: string;
    serialNumber: string;
    isOnline: boolean;
    valveOpen: boolean;
    powerSource: string;
    maintenanceStatus: boolean;
    name: string;
    consecutiveLeakCount: number;
    isLeaking: boolean;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    updateDeviceStatus: (serialNumber: string, liveData: any) => void;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
    updateDeviceStatus: (serialNumber: string, liveData: any) => set((state) => ({
        user: state.user ? {
            ...state.user,
            devices: state.user.devices.map(device => 
                device.serialNumber === serialNumber ? { ...device, ...liveData } : device
            )
        } : null
    }))
}));
