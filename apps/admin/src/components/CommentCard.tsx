import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type { Comment } from "@/types/comment";

type CommentCardProps = {
  comment: Comment;
  onDelete: (commentId: string) => void;
};

export default function CommentCard({
  comment,
  onDelete,
}: CommentCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>
              {comment.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">
              {comment.user.username}
            </p>

            <p className="text-sm text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(comment.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
        {comment.comment}
      </p>
    </div>
  );
}
