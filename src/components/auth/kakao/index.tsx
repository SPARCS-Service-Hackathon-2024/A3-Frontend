import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";
import { authKakao } from "../../../apis/auth/kakao";
import useAuth from "../../../hooks/useAuth";

const SocialKakao = () => {
  const { handleLogin } = useAuth();
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    const idToken = data.response.access_token;
    const user = await authKakao(idToken);
    localStorage.setItem("token", user.access_token);
    handleLogin(user.access_token);
  };
  const kakaoOnFailure = (error: unknown) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      className="btn btn-lg !w-full !text-lg font-bold"
    />
  );
};

export default SocialKakao;
