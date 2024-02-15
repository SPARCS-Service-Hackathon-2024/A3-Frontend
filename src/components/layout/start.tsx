import SocialKakao from "../auth/kakao/callback"; // Adjust the import path as necessary
import { KakaoLoginResponseType } from "../auth/kakao/type"; // Adjust the import path as necessary

export default function Main({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) {
  console.log("Main component is rendered");

  const handleKakaoLoginSuccess = (data: KakaoLoginResponseType) => {
    console.log("Kakao login successful with data:", data);
    onLoginSuccess();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src={"/bomi/default.gif"}
        className="mb-8 h-[300px]"
        alt="Login Image"
      />
      <SocialKakao onSuccess={handleKakaoLoginSuccess} />
    </div>
  );
}
