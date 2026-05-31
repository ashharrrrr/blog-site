import type { Request, Response } from "express";
import { slugify } from "../utils/slugify.js";
import { prisma } from "../lib/prisma.js";
import { id } from "zod/locales";

export async function createPost(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and body required"
      })
    }

    const post = await prisma.post.create({
      data: {
        authorId: req.user.userId,
        title,
        content,
        slug: slugify(title)
      }
    });

    return res.status(201).json({
      message: "Post created",
      id: post.id,
      slug: post.slug
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export async function getPublishedPosts(_req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        publishedAt: {
          not: null,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    return res.status(200).json(posts);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

type PostParams = {
  id: string,
}

export async function publishPost(req: Request<PostParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

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

    if (post.authorId !== req.user.userId) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const published = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        publishedAt: new Date(),
      }
    })

    return res.status(200).json({
      message: "Published",
      id: published.id,
      slug: published.slug,
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }




}
