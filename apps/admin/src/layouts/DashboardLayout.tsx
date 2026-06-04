import { Outlet, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth";
import { HeaderBarSkeleton } from "@/components/skeletons/HeaderBarSkeleton";


export default function DashboardLayout() {

  const navigate = useNavigate();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({ queryKey: ["me"], queryFn: getCurrentUser });

  if (isUserLoading){
    <HeaderBarSkeleton />
  }

  if (userError) {
    return <div className="text-red-600">Failed to load posts</div>;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }


  return (
    <>
      <HeaderBar username={user?.username ?? "User"} handleLogout={handleLogout}/>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </>
  )
}
