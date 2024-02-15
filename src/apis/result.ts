import { ResultType } from "../types/result";

export const getResult = async ({ token }: { token: string }) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/result`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json: ResultType[] = await result.json();
  return json;
};
