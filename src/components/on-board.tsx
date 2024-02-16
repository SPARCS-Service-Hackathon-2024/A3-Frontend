import SocialKakao from "./auth/kakao";
import { useUser } from "../store/useUser";
import { FaFeatherAlt, FaSignOutAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

export default function OnBoard() {
  const { user, isUserLoading } = useUser();
  const { signOut } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <img src={"/bomi/default.gif"} className="h-[300px]" alt="Login Image" />
      <h1 className="py-8 text-4xl font-bold">인생 기록</h1>
      {isUserLoading ? (
        <div className="loading text-primary" />
      ) : user ? (
        <div className="flex w-full flex-col gap-4">
          {user.last_answered_question_id === -1 ? (
            <div className="text-center text-lg font-bold">
              자서전이 완성되었습니다.
            </div>
          ) : (
            <a href="/main" className="btn btn-primary btn-lg w-full">
              <FaFeatherAlt />
              {user.last_answered_question_id === 1 ? "시작하기" : "이어하기"}
            </a>
          )}
          <a
            href="/result"
            className="btn btn-outline btn-primary btn-lg w-full"
          >
            <FaBook />
            기록 보기
          </a>
        </div>
      ) : (
        <SocialKakao />
      )}
      {user && (
        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-8">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              signOut();
            }}
          >
            <FaSignOutAlt />
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
