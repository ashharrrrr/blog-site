import { Router } from "express";
import {
  getUserProfile,
  getUserPosts,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:username", getUserProfile);
userRouter.get("/:username/posts", getUserPosts);

export default userRouter;
