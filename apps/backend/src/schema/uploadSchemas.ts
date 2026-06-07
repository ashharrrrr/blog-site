import { z } from "zod";

export const AllowedImageMimeTypes = z.enum([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const PresignImageSchema = z.object({
  fileName: z.string().min(1),
  mimeType: AllowedImageMimeTypes,
  size: z.number().int().positive(),
  draftId: z.string().optional(),
  postId: z.string().optional(),
});

export const CompleteImageSchema = z.object({
  imageId: z.string().min(1),
});
