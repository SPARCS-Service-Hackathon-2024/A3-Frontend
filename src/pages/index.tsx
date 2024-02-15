import { useState } from "react";
import Layout from "../components/layout";
import OnBoard from "../components/layout/on-board";
import Question from "../components/question";
import { useUser } from "../store/useUser";

function Home() {
  const { user } = useUser();

  return (
    <Layout>
      {user ? (
        <div className="flex h-full w-full flex-col items-center pt-16 text-2xl">
          <Question />
        </div>
      ) : (
        <OnBoard />
      )}
    </Layout>
  );
}

export default Home;
