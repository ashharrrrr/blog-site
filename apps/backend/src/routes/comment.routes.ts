import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { deleteComment } from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.delete("/:id", authenticateToken, deleteComment);

export default commentRouter;
