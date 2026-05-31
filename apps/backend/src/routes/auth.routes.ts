import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateToken.js"

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.post("/me", authenticateToken, (req, res) => { return res.json({ message: "you in protected territory!" })});

export default authRouter;
