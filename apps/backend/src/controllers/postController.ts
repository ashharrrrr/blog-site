import type { Request, Response } from "express";
import { slugify } from "../utils/slugify.js";
import { prisma } from "../lib/prisma.js";

export async function createPost(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const { title, excerpt, content } = req.body;

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
        excerpt,
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

type SlugParams = {
  slug: string,
}

export async function getSinglePublishedPost(req: Request<SlugParams>, res: Response) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug: req.params.slug,
        publishedAt: {
          not: null,
        }
      },
      include: {
        author: {
          select: {
            username: true
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({ post })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

type PostParams = {
  id: string
}

export async function publishPost(req: Request<PostParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const post = await getOwnedPost(req.params.id, req.user.userId);

    if (!post) {
      return res.status(404).json({
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

export async function updatePost(req: Request<PostParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        message: "Title or body cannot be empty"
      })
    }

    const post = await getOwnedPost(req.params.id, req.user.userId);

    if (!post) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    const updated = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        slug: slugify(req.body.title),
      }
    });

    return res.status(201).json({
      message: "Post updated",
      id: updated.id,
      slug: updated.slug,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export async function deletePost(req: Request<PostParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const post = await getOwnedPost(req.params.id, req.user.userId);

    if (!post) {
      return res.status(403).json({
        message: "Forbidden"
      })
    }

    await prisma.post.delete({
      where: {
        id: req.params.id
      }
    });

    return res.status(200).json({
      messsage: "Post deleted"
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export async function getAllAuthorPosts(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: req.user.userId
      },
      include: {
        author: {
          select: {
            username: true
          },
        },
      },
      orderBy: {
        updatedAt: "desc"
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

type PostIdParams = {
  id: string;
};

export async function getAuthorPost(req: Request<PostIdParams>, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const posts = await prisma.post.findFirst({
      where: {
        authorId: req.user.userId,
        id: req.params.id
      },
      include: {
        author: {
          select: {
            username: true
          },
        },
      },
    });

    console.log("Post", posts);

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

// helper (yo this is not a fucking ai comment)
async function getOwnedPost(
  postId: string,
  userId: string,
) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return null;
  }

  if (post.authorId !== userId) {
    return null;
  };
  return post;
}


