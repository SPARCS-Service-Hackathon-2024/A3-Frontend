import { useCallback, useEffect, useState } from "react";
import SocialKakao from "./auth/kakao";
import { useUser } from "../store/useUser";
import { FaFeatherAlt } from "react-icons/fa";

export default function OnBoard() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <img src={"/bomi/default.gif"} className="h-[300px]" alt="Login Image" />
      <h1 className="py-8 text-4xl font-bold">인생 기록</h1>
      {isUserLoading ? (
        <div className="loading text-primary" />
      ) : user ? (
        <a href="/main" className="btn btn-primary btn-lg w-full">
          <FaFeatherAlt />
          이어하기
        </a>
      ) : (
        <SocialKakao />
      )}
    </div>
  );
}
