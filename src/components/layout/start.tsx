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
      <img src={"/bomi/default.gif"} className="h-[300px]" alt="Login Image" />
      <h1 className="py-8 text-4xl font-bold">인생 기록</h1>
      <SocialKakao onSuccess={handleKakaoLoginSuccess} />
    </div>
  );
}
