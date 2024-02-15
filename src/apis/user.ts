import { UserType } from "../types/user";

export const getMe = async ({ token }: { token: string }) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json: UserType = await result.json();
  return { ...json, access_token: token };
};
