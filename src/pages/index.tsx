import Layout from "../components/layout";
import Question from "../components/question";

function Home() {
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pt-16 text-2xl">
        <Question />
      </div>
    </Layout>
  );
}

export default Home;
