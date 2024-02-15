import { useCallback } from "react";
import { getMe } from "../apis/user";
import { useUser } from "../store/useUser";

export default function useAuth() {
  const { setUser, setIsUserLoading } = useUser();

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
  }, [setUser]);

  const handleLogin = useCallback(
    async (token: string) => {
      setIsUserLoading(true);
      try {
        const user = await getMe({ token });
        setUser(user);
      } catch (e) {
        console.log(e);
        setUser(null);
        alert("로그인에 실패했습니다.");
        localStorage.removeItem("token");
      } finally {
        setIsUserLoading(false);
      }
    },
    [setIsUserLoading, setUser],
  );

  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin(token);
    } else {
      setIsUserLoading(false);
      setUser(null);
    }
  }, [handleLogin, setIsUserLoading, setUser]);

  return {
    handleLogin,
    checkToken,
    signOut,
  };
}
