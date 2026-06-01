import { z } from "zod"

export const CreateCommentSchema = z.object({
  comment: z.string().trim().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
});
