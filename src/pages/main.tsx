import Layout from "../components/layout";
import Question from "../components/question";
import { useUser } from "../store/useUser";

export default function Main() {
  const { user } = useUser();

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pt-16 text-2xl">
        {user && <Question />}
      </div>
    </Layout>
  );
}
