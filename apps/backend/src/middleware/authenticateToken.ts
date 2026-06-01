import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.js";


export function authenticateToken(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token){
    return res.sendStatus(401);
  }

  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch(err){
    return res.sendStatus(403);
  }
}
