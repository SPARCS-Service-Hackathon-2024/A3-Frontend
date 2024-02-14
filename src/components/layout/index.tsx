import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-base-200 flex h-full w-full flex-col items-center">
      <div className="relative flex h-screen w-full max-w-lg flex-col bg-white shadow-xl">
        <Header />
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
