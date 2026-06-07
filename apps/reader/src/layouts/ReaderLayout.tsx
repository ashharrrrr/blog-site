import { Outlet } from "react-router-dom";

import SiteHeader from "@/components/SiteHeader";
import LoginDialog from "@/components/LoginDialog";

export default function ReaderLayout() {
  return (
    <div className="min-h-screen bg-[#ffe1a8] text-black">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <LoginDialog  />
        <Outlet />
      </main>
    </div>
  );
}
