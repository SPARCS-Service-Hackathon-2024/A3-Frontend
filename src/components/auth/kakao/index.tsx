import KakaoLogin from "react-kakao-login";
import { KakaoLoginResponseType } from "./type";
import { UserType } from "../../../types/user";
import { useUser } from "../../../store/useUser";

const SocialKakao = () => {
  const { setUser } = useUser();
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const kakaoOnSuccess = async (data: KakaoLoginResponseType) => {
    console.log(data);
    const idToken = data.response.access_token;
    const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: idToken }),
    });
    const json: UserType & { access_token: string } = await result.json();
    localStorage.setItem("token", json.access_token);
    setUser(json);
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
