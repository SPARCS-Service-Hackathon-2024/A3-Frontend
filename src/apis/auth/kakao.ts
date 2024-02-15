import { UserType } from "../../types/user";

export const authKakao = async (
  idToken: string,
): Promise<UserType & { access_token: string }> => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/kakao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_token: idToken }),
  });
  const json: UserType & { access_token: string } = await result.json();
  return json;
};
