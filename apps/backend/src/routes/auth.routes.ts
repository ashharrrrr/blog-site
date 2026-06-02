import { Router } from "express";
import { loginUser, registerUser, returnUser } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateToken.js"

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.get("/me", authenticateToken, returnUser);

export default authRouter;
