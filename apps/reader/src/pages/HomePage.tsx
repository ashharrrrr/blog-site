import { useQuery } from "@tanstack/react-query";

import PostCard from "@/components/PostCard";

import { getPublishedPosts } from "@/services/posts";

export default function HomePage() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["published-posts"],
    queryFn: getPublishedPosts,
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return (
      <div>Failed to load posts.</div>
    );
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
