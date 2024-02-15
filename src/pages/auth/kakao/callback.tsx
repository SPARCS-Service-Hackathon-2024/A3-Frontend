import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";

const SocialKakao = () => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    console.log(data);
    const idToken = data.response.access_token;

    // TODO: send idToken to server
  };
  const kakaoOnFailure = (error: unknown) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
    />
  );
};

export default SocialKakao;
