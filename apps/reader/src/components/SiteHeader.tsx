import { Link } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-[#e26d5c]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          Ashhar's Blog
        </Link>

        <button className="text-sm font-medium">
          Login
        </button>
      </div>
    </header>
  );
}
