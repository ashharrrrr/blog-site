import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";

import {
  postComment,
} from "@/services/comments";

type Props = {
  postId: string;
};

export default function CommentComposer({
  postId,
}: Props) {
  const [comment, setComment] =
    useState("");

  const queryClient =
    useQueryClient();

  const {
    isLoggedIn,
    openLoginDialog,
  } = useAuth();

  const createCommentMutation =
    useMutation({
      mutationFn: (
        content: string
      ) =>
        postComment(
          postId,
          content
        ),

      onSuccess: async () => {
        console.log("INVALIDATE KEY", postId);
        setComment("");

        await queryClient.invalidateQueries(
          {
            queryKey: [
              "comments",
              postId,
            ],
          }
        );
      },
      onError: (error) => {
        console.log("ERROR", error);
      }
    });

  function handleSubmit(
    e: React.SyntheticEvent
  ) {
    console.log("COMMENTTTT", comment);
    e.preventDefault();

    if (!isLoggedIn) {
      openLoginDialog();
      return;
    }

    if (!comment.trim()) {
      return;
    }

    createCommentMutation.mutate(
      comment
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6"
    >
      <textarea
        className="min-h-32 w-full rounded border bg-white p-4"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value,
          )
        }
      />

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          {createCommentMutation.isPending
            ? "Posting..."
            : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
