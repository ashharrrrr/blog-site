import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "@/services/posts";
import { getCurrentUser } from "@/services/auth";
import HeaderBar from "@/components/HeaderBar";
import PostCard from "@/components/PostCard";

export default function DashboardPage() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({ queryKey: ["me"], queryFn: getCurrentUser });

  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getMyPosts,
  });

  const navigate = useNavigate();

  if (userError) {
    return <div className="text-red-600">Failed to load posts</div>;
  }

  if (isPostsLoading || isUserLoading) {
    // Render skeleton placeholders (omitted here)
    return <div>Loading...</div>;
  }
  if (postsError) {
    return <div className="text-red-600">Failed to load posts</div>;
  }
  if (!posts?.length) {
    return <div>No posts found.</div>;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <HeaderBar username={user.username} handleLogout={handleLogout} />
      <div className="mt-12">
        {posts?.map((post) => (
          <div className="mt-4 mb-4">
            <PostCard key={post.id} post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
