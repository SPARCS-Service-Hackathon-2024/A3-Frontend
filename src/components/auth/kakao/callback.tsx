import React from "react";
import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";

const SocialKakao = ({
  onSuccess,
}: {
  onSuccess: (data: KakaoLoginResponseType) => void;
}) => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    console.log(data);
    const idToken = data.response.access_token;
    alert(idToken);

    // TODO: Send the idToken to the server

    onSuccess(data);
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
