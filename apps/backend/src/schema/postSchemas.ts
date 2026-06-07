import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title is too long"),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt is too long")
    .optional()
    .nullable(),

  content: z.unknown(),

  draftId: z
    .string()
    .optional(),
});

export const UpdatePostSchema = CreatePostSchema;

export const PostIdParamSchema = z.object({
  id: z.string().min(1),
});
