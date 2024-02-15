import { useState } from "react";
import Layout from "../components/layout";
import Main from "../components/layout/start";
import Question from "../components/question";

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Layout>
      {/* Conditional rendering based on login status */}
      { !isLoggedIn ? (
        // Pass handleLoginSuccess as a prop to Main so it can be called on successful login
        <Main onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex h-full w-full flex-col items-center pt-16 text-2xl">
          <Question />
        </div>
      )}
    </Layout>
  );
}

export default Home;
