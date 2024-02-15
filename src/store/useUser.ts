import { create } from "zustand";
import { UserType } from "../types/user";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  updateNextQuestionId: (nextQuestionId: number) => void;
  isUserLoading: boolean;
  setIsUserLoading: (isLoading: boolean) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateNextQuestionId: (nextQuestionId) =>
    set((state) => ({
      user: { ...state.user!, next_question_id: nextQuestionId },
    })),
  isUserLoading: false,
  setIsUserLoading: (isLoading) => set({ isUserLoading: isLoading }),
}));
