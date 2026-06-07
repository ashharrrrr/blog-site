import { Router } from "express";
import { createPost, deletePost, getPublishedPosts, getSinglePublishedPost, publishPost, updatePost, getAllAuthorPosts, getAuthorPost } from "../controllers/postController.js"
import {  getPostComments } from "../controllers/commentController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeAuthor } from "../middleware/authorizeAuthor.js";

const postRouter = Router();

// public
postRouter.get("/:id/comments", getPostComments);

// Author only
postRouter.get("/mine", authenticateToken, authorizeAuthor, getAllAuthorPosts);
postRouter.get("/mine/:id", authenticateToken, authorizeAuthor, getAuthorPost)

// public
postRouter.get("/", getPublishedPosts);
postRouter.get("/:slug", getSinglePublishedPost);

// Author only
postRouter.post("/", authenticateToken, authorizeAuthor, createPost);

postRouter.patch("/:id", authenticateToken, authorizeAuthor, publishPost);
postRouter.put("/:id", authenticateToken, authorizeAuthor, updatePost);
postRouter.delete("/:id", authenticateToken, authorizeAuthor, deletePost);

export default postRouter;
