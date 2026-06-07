import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, getMyPosts, publishPost } from "@/services/posts";
import PostCard from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/skeletons/DashboardPostSkeleton";
import PostFilters from "@/components/PostFilters"
import { useState } from "react";

export default function DashboardPage() {

  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");

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

  function handlePublish(id: string) {
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

  function handleDelete(id: string) {
    deletePostMutation.mutate(id);
  }

  if (isPostsLoading) {
    return (
      <ul className="space-y-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <PostCardSkeleton />
          </li>
        ))}
      </ul>
    )
  }
  if (postsError) {
    return <div className="text-red-600">Failed to load posts</div>;
  }


  const filteredPosts = posts?.filter((post) => {
    if (filter === "published") {
      return post.publishedAt !== null;
    }

    if (filter === "drafts") {
      return post.publishedAt === null;
    }

    return true;
  })


  return (
    <>
      <PostFilters filter={filter} onFilterChange={setFilter} />
      {!posts?.length ?
        (<div>No posts found.</div>) :
        (<div className="mt-12">
          {filteredPosts?.map((post) => (
            <div key={post.id} className="mt-4 mb-4">
              <PostCard post={post} onPublish={handlePublish} onDelete={handleDelete} />
            </div>
          ))}
        </div>)}
    </>
  );
}
