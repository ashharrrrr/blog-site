import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Pencil } from "lucide-react";
import { Separator } from "../components/ui/separator";

import { getSpecificPost } from "@/services/posts";
import PostRenderer from "@/components/PostRenderer";
import CommentsSection from "@/components/CommentsSection";
import { deleteComment, getCommentsByPostId } from "@/services/comments";

export default function PostPreviewPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSpecificPost(id!),
    enabled: !!id,
  });

  const{
    data: comments,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id!),
    enabled: !!id
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: async () => {
      console.log("Comment Deleted");
      queryClient.invalidateQueries({
        queryKey: ["comments", id]
      })
    }
  })

  console.log(post);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load post</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">{post.title}</h1>

          <p className="mt-2 text-muted-foreground">
            By {post.author.username}
          </p>
        </div>

        <Link to={`/posts/${post.id}/update`}>
          <Button variant="outline" className="hover:cursor-pointer hover:bg-black hover:text-amber-50">
            <Pencil className="h-4 w-4" />
            <Separator orientation="vertical"/>
            Edit
          </Button>
        </Link>
      </div>

      <div className="rounded border p-4">
        <PostRenderer content={post.content} />
      </div>

      <CommentsSection
        comments={comments ?? []}
        isLoading={commentsLoading}
        onDelete={(commentId) => deleteCommentMutation.mutate(commentId)}
        />
    </article>
  );
}
