import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { authKakao } from "../../apis/auth/kakao";

export default function Auth() {
  const { handleLogin } = useAuth();
  const [searchParams] = useSearchParams("code");
  const navigate = useNavigate();

  const handleAuth = useCallback(
    async (code: string) => {
      const kakao = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: `${import.meta.env.VITE_APP_URL}/auth/kakao`,
          code: code,
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded; chatset=UTF-8",
          },
        },
      );
      const res = await authKakao(kakao.data.access_token);
      localStorage.setItem("token", res.access_token);
      handleLogin(res.access_token);
      navigate("/");
    },
    [handleLogin, navigate],
  );

  useEffect(() => {
    handleAuth(searchParams.get("code"));
  }, [handleAuth, searchParams]);
}
