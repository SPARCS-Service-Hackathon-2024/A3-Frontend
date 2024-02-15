import { useCallback, useEffect } from "react";
import SocialKakao from "../auth/kakao";
import { useUser } from "../../store/useUser";
import { UserType } from "../../types/user";

export default function OnBoard() {
  const { setUser } = useUser();

  const handleLogin = useCallback(
    async (token: string) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!res.ok) throw new Error("로그인 실패");
        const json: UserType = await res.json();
        setUser(json);
      } catch (e) {
        console.log(e);
        setUser(null);
        localStorage.removeItem("token");
      }
    },
    [setUser],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin(token);
    } else {
      setUser(null);
    }
  }, [handleLogin, setUser]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={"/bomi/default.gif"} className="h-[300px]" alt="Login Image" />
      <h1 className="py-8 text-4xl font-bold">인생 기록</h1>
      <SocialKakao />
    </div>
  );
}
