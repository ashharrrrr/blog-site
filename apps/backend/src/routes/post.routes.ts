import { Router } from "express";
import { createPost, getPublishedPosts, publishPost } from "../controllers/postController.js"
import { authenticateToken } from "../middleware/authenticateToken.js";

const postRouter = Router();

postRouter.get("/", getPublishedPosts);
postRouter.post("/", authenticateToken, createPost);

postRouter.post("/:id/publish", authenticateToken, publishPost);

export default postRouter;
