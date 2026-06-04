import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, getMyPosts, publishPost } from "@/services/posts";
import { getCurrentUser } from "@/services/auth";
import HeaderBar from "@/components/HeaderBar";
import PostCard from "@/components/PostCard";

export default function DashboardPage() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const publishPostMutation = useMutation({
    mutationFn: publishPost,

    onSuccess: async () => {
      console.log("Post Published");
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })
    }
  })

  function handlePublish(id:string){
    publishPostMutation.mutate(id);
  }

  const deletePostMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: async () => {
      console.log("Post Deleted");
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })
    }
  })

  function handleDelete(id:string){
    deletePostMutation.mutate(id);
  }


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
          <div key={post.id} className="mt-4 mb-4">
            <PostCard post={post} onPublish={handlePublish} onDelete={handleDelete}/>
          </div>
        ))}
      </div>
    </>
  );
}
