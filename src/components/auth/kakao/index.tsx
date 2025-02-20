const SocialKakao = () => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID as string;
  const appURL = import.meta.env.VITE_APP_URL as string;

  return (
    <a
      className="btn btn-lg !w-full bg-[#FEE500] !text-lg font-bold text-black"
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${appURL}/auth/kakao&response_type=code`}
    >
      카카오로 로그인
    </a>
  );
};

export default SocialKakao;
