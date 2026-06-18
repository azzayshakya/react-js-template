import { IUserSessionStore } from "../types/user-session-types";
import { create } from "zustand";

interface UserSessionStore {
  userSession: IUserSessionStore | null;
  setUserSession: (userSession: IUserSessionStore | null) => void;
}

// Zustand store
const useUserSessionStore = create<UserSessionStore>((set) => ({
  userSession: null, // Initial state

  // Method for updating user session
  setUserSession: (newValue: IUserSessionStore | null) =>
    set((state) => ({ ...state, userSession: newValue })),
}));

export { useUserSessionStore };
