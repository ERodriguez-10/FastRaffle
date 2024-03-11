import { createServer } from "node:http";
import express from "express";

import "./config/env.config.js";

import authRouter from "./routes/auth.routes.js";

const expressApp = express();

const httpServer = createServer(expressApp);

// Middleware
expressApp.use(express.json());

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.use("/api/auth", authRouter);
//expressApp.use("/api/user", userRouter);
//expressApp.use("/api/raffle", raffleRouter);

httpServer.listen(8080, () => {
  console.log("Server running on port 8080");
});
