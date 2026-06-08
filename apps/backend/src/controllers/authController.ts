import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {

    console.log("BODY", req.body)
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    console.log("FOUND USER",  user?.username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    console.log("VALID PASSWORD", validPassword)

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.error(err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function returnUser(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        displayName: true,
        bio: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
