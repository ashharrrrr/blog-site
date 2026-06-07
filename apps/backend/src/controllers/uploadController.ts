import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import  supabase  from "../lib/supbase.js";
import {
  CompleteImageSchema,
  PresignImageSchema,
} from "../schema/uploadSchemas.js";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function presignImageUpload(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("BODY  RECEIEVED", req.body)

    const { fileName, mimeType, size, draftId, postId } = PresignImageSchema.parse(
      req.body.input
    );

    if (size > MAX_IMAGE_SIZE) {
      return res.status(400).json({
        message: "Image too large",
      });
    }

    const ext = MIME_TO_EXT[mimeType];
    const image = await prisma.postImage.create({
      data: {
        authorId: req.user.userId,
        draftId: draftId ?? null,
        postId: postId ?? null,
        filename: fileName,
        mimeType,
        size,
        storagePath: "temp",
        url: "temp",
        status: "PENDING",
      },
    });

    const storagePath = `users/${req.user.userId}/drafts/${draftId}/${image.id}.${ext}`;
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${storagePath}`;

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .createSignedUploadUrl(storagePath);

    if (error || !data) {
      await prisma.postImage.delete({ where: { id: image.id } });
      return res.status(500).json({
        message: "Could not create signed upload URL",
      });
    }

    await prisma.postImage.update({
      where: { id: image.id },
      data: {
        storagePath,
        url: publicUrl,
      },
    });

    return res.status(201).json({
      imageId: image.id,
      storagePath: data.path,
      token: data.token,
      publicUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function completeImageUpload(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { imageId } = CompleteImageSchema.parse(req.body);

    const image = await prisma.postImage.findFirst({
      where: {
        id: imageId,
        authorId: req.user.userId,
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const updated = await prisma.postImage.update({
      where: { id: imageId },
      data: {
        status: "READY",
      },
    });

    return res.status(200).json({
      id: updated.id,
      url: updated.url,
      storagePath: updated.storagePath,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
