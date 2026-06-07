import { Link } from "react-router-dom";

import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({
  post,
}: PostCardProps) {
  return (
    <Link to={`/posts/${post.slug}`}>
      <article className="rounded-lg border border-black/10 bg-white/40 p-6 transition hover:bg-white/60">
        <h2 className="mb-2 text-2xl font-bold">
          {post.title}
        </h2>

        <p className="mb-4 text-orange-600">
          By {post.author.username}
        </p>

        <p className="text-black/80">
          {post.excerpt}
        </p>
      </article>
    </Link>
  );
}
