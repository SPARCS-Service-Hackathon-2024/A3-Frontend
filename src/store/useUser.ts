import { create } from "zustand";
import { UserType } from "../types/user";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  updateNextQuestionId: (nextQuestionId: number) => void;
  updatePrevQuestionID: (prevQuestionId: number) => void;
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
  updatePrevQuestionID: (prevQuestionId) =>
    set((state) => ({
      user: { ...state.user!, last_answered_question_id: prevQuestionId },
    })),
  isUserLoading: false,
  setIsUserLoading: (isLoading) => set({ isUserLoading: isLoading }),
}));
