import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PostContent from "@/components/PostContent";

import { getPostBySlug } from "@/services/posts";
import { getCommentsByPostId } from "@/services/comments";
import CommentComposer from "@/components/CommentComposer";

export default function PostPage() {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () =>
      getPostBySlug(slug!),
    enabled: !!slug,
  });

  const {
    data: comments,
  } = useQuery({
    queryKey: [
      "comments",
      post?.id,
    ],
    queryFn: () =>
      getCommentsByPostId(post!.id),
    enabled: !!post,
  });

  console.log("FETCH KEY", post?.id);

  if (isLoading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="mx-auto max-w-4xl">
      <h1 className="mb-4 text-5xl font-bold">
        {post.title}
      </h1>

      <p className="mb-8 text-orange-600">
        By {post.author.username}
      </p>

      <PostContent
        content={post.content}
      />

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">
          Comments
        </h2>

        <CommentComposer postId={post.id} />

        <div className="bg-white rounded border p-4 mt-12">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="p-2 border-b-2"
            >
              <p className="font-medium">
                {comment.user.username}
              </p>

              <p className="mt-2">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
