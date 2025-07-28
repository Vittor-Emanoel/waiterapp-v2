import { create } from "zustand";
import { localStorageKeys } from "../config/localStorageKeys";
import type { User } from "../entities/User";

interface AuthState {
  signedIn: boolean;
  user?: User;
  setUser(user: User): void;
  signin(accessToken: string): void;
  signout(): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  signedIn: !!localStorage.getItem(localStorageKeys.ACCESS_TOKEN),
  user: undefined,

  setUser: (user) => set({ user }),

  signin: (accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    set({ signedIn: true });
  },

  signout: () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    set({ signedIn: false, user: undefined });
  },
}));
