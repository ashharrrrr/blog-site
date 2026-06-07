import { ZodError } from "zod";
import { CreateCommentSchema } from "../schema/commentSchemas.js";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

type PostCommentParams = {
  id: string;
}

export async function createComment(req: Request<PostCommentParams>, res: Response) {
  try {
    console.log("request reached")
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    console.log("user exist", req.user);
    console.log("COMMENT", req.body);

    const { comment } = CreateCommentSchema.parse(req.body);


    console.log("postid", req.params.id);

    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        comment,
        userId: req.user.userId,
        postId: req.params.id,
      }
    });

    return res.status(201).json({
      message: "Comment created",
      id: newComment.id,
    })

  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid input",
        errors: err.issues,
      })
    }
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getPostComments(req: Request<PostCommentParams>, res: Response) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

type DeleteCommentParams = {
  id: string;
}

export async function deleteComment(req: Request<DeleteCommentParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!comment) {
      return res.status(400).json({
        message: "Comment not found"
      });
    }

    if (
      comment.userId !== req.user.userId &&
      comment.post.authorId !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await prisma.comment.delete({
      where: {
        id: req.params.id
      }
    });

    return res.status(200).json({
      message: "Comment Deleted!"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}
