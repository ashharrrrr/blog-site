import { Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider"

export default function SiteHeader() {

  const { logout, user } = useAuth();

  return (
    <header className="border-b border-black/10 bg-[#e26d5c]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          Ashhar's Blog
        </Link>
        {user && 
          <button onClick={logout} className="text-sm cursor-pointer p-2 bg-white font-medium rounded">
            Logout
          </button>
        }
      </div>
    </header>
  );
}
