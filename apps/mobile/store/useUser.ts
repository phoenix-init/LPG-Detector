import { create } from "zustand";

interface User {
    name: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
    id: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
}));
