import { create } from "zustand";

interface UserState {
  id: string;
  name: string;
}

export const useUser = create<UserState>((set) => ({
  id: "",
  name: "",
  setUser: (id: string, name: string) => set({ id, name }),
}));
