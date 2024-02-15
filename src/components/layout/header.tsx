import { useUser } from "../../store/useUser";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="absolute inset-x-0 top-0 flex h-16 items-center justify-between bg-base-100 px-8 font-bold">
      인생 기록
      {user && <div>{user.name} 님</div>}
    </header>
  );
}
