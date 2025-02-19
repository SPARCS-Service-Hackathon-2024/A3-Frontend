import { HistoryType as HistoryType } from "../types/qna";

export const getHistory = async ({ token }: { token: string }) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/history`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json: HistoryType = await result.json();
  return json;
};
