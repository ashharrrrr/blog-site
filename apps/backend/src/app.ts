import express from "express";
import authRouter from "./routes/auth.routes.js"; 

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("Blog API is running");
});

export default app;
