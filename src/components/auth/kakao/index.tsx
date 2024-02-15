import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";
import { useUser } from "../../../store/useUser";
import { authKakao } from "../../../apis/auth/kakao";

const SocialKakao = () => {
  const { setUser } = useUser();
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    const idToken = data.response.access_token;
    const user = await authKakao(idToken);
    localStorage.setItem("token", user.access_token);
    setUser(user);
  };
  const kakaoOnFailure = (error: unknown) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      className="!text-lg font-bold"
    />
  );
};

export default SocialKakao;
