import { AUTH_TOKEN } from "@/constants";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  };

  return (
    <header className="flex h-10 items-center justify-end border-b border-zinc-200 px-4">
      <div
        onClick={handleLogout}
        className="text-sm font-bold text-gray-400 hover:cursor-pointer hover:text-gray-300 hover:underline"
      >
        LOGOUT
      </div>
    </header>
  );
};

export default Header;
