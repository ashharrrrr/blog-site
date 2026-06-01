import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

type UsernameParams = {
  username: string;
};

export async function getUserProfile(
  req: Request<UsernameParams>,
  res: Response
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.params.username,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getUserPosts(
  req: Request<UsernameParams>,
  res: Response
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.params.username,
      },
      select: {
        username: true,
        posts: {
          where: {
            publishedAt: {
              not: null,
            },
          },
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
