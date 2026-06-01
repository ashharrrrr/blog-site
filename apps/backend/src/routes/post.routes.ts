import { Router } from "express";
import { createPost, deletePost, getPublishedPosts, getSinglePublishedPost, publishPost, updatePost, getAllAuthorPosts, getAuthorPost } from "../controllers/postController.js"
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeAuthor } from "../middleware/authorizeAuthor.js";

const postRouter = Router();

postRouter.get("/mine", authenticateToken, authorizeAuthor, getAllAuthorPosts);
postRouter.get("/mine/:id", authenticateToken, authorizeAuthor, getAuthorPost)

// public
postRouter.get("/", getPublishedPosts);
postRouter.get("/:slug", getSinglePublishedPost);

// admin only
postRouter.post("/", authenticateToken, authorizeAuthor, createPost);

postRouter.post("/:id/publish", authenticateToken, authorizeAuthor, publishPost);
postRouter.put("/:id/update", authenticateToken, authorizeAuthor, updatePost);
postRouter.delete("/:id/delete", authenticateToken, authorizeAuthor, deletePost);

export default postRouter;
