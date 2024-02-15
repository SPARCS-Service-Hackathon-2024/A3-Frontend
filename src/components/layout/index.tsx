import { ReactNode, useEffect } from "react";
import Header from "./header";
import useAuth from "../../hooks/useAuth";

export default function Layout({ children }: { children: ReactNode }) {
  const { checkToken } = useAuth();

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <div className="flex h-full w-full flex-col items-center bg-base-200">
      <div className="relative flex h-screen w-full max-w-lg flex-col bg-white shadow-xl">
        <Header />
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
