import Layout from "../components/layout";

function Home() {
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pt-32 text-2xl">
        <img src="/laura_default.gif" />
        <div className="mt-12 break-keep px-8 text-center">
          안녕하세요,
          <br />
          저는 AI 자서전 코디네이터 '로라'라고 합니다.
        </div>
      </div>
    </Layout>
  );
}

export default Home;
