import express from "express";
import authRouter from "./routes/auth.routes.js"; 
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js"
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
  }),
);

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter)
app.use("/users", userRouter)
app.use("/uploads", uploadRouter)

app.get("/", (_req, res) => {
  res.send("Blog API is running");
});

export default app;
