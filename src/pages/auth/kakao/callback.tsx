import React from "react";
import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";

// Add an onSuccess prop to the component
const SocialKakao = ({ onSuccess }: { onSuccess: (data: KakaoLoginResponseType) => void }) => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    console.log(data);
    const idToken = data.response.access_token;

    // TODO: send idToken to server

    // Call the onSuccess prop passed from the parent component
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

      // render={({ onClick }) => (
      //   <button onClick={onClick} className="btn btn-primary px-4 py-2 rounded-full text-white">
      //     카카오로 로그인
      //   </button>
      // )}
    />
  );
};

export default SocialKakao;
