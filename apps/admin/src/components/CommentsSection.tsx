import CommentCard from "./CommentCard";
import CommentCardSkeleton from "./skeletons/CommentCardSkeleton";

import type { Comment } from "@/types/comment";

type CommentsSectionProps = {
  comments: Comment[];
  isLoading?: boolean;
  onDelete: (commentId: string) => void;
};

export default function CommentsSection({
  comments,
  isLoading = false,
  onDelete,
}: CommentsSectionProps) {
  if (isLoading) {
    return (
      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">
          Comments
        </h2>

        <CommentCardSkeleton />
        <CommentCardSkeleton />
        <CommentCardSkeleton />
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Comments
        </h2>

        <span className="text-sm text-muted-foreground">
          {comments.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          No comments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
