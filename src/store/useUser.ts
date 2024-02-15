import { create } from "zustand";
import { UserType } from "../types/user";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
