import React from "react";
import SocialKakao from "../../pages/auth/kakao/callback"; // Adjust the import path as necessary
import { KakaoLoginResponseType } from "../../pages/auth/kakao/type"; // Adjust the import path as necessary

export default function Main({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  console.log("Main component is rendered");

  const handleKakaoLoginSuccess = (data: KakaoLoginResponseType) => {
    console.log("Kakao login successful with data:", data);
    onLoginSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={"/bomi/default.gif"} className="h-[300px] mb-8" alt="Login Image"/>
      {/* Use SocialKakao for login */}
      <SocialKakao onSuccess={handleKakaoLoginSuccess} />
    </div>
  );
}
