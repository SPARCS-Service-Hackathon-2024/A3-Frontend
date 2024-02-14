import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-base-200 flex h-full w-full flex-col items-center">
      <div className="flex h-full min-h-screen w-full max-w-lg flex-col bg-white shadow-xl">
        <header className="bg-base-100 flex h-16 items-center px-8 font-bold">
          A3 frontend
        </header>
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
