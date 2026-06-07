import { Router } from "express";
import {
  completeImageUpload,
  presignImageUpload,
} from "../controllers/uploadController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeAuthor } from "../middleware/authorizeAuthor.js";

const uploadRouter = Router();

uploadRouter.post("/images/presign", authenticateToken, authorizeAuthor, presignImageUpload);
uploadRouter.post("/images/complete", authenticateToken, authorizeAuthor, completeImageUpload);

export default uploadRouter;
