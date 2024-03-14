import { createServer } from "node:http";
import express from "express";
import cors from "cors";

import "./config/env.config.js";

import authRouter from "./routes/auth.routes.js";
import MongoSingleton from "./config/db/mongodb.config.js";
import cookieParser from "cookie-parser";

import raffleRouter from "./routes/raffle.routes.js";
import { configEnv } from "./config/env.config.js";

const expressApp = express();

const httpServer = createServer(expressApp);

const corsOptions = {
  origin: "http://localhost:5173", // Cambia esto al origen correcto de tu aplicación
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders:
    "Content-Type, Authorization, X-Request-With, Accept, Origin, Access-Control-Allow-Headers",
  credentials: true,
};

// Middleware
expressApp.use(cors(corsOptions));

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use(cookieParser(configEnv.COOKIE_SECRET));

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.use("/api/auth", authRouter);
//expressApp.use("/api/user", userRouter);
expressApp.use("/api/raffle", raffleRouter);

const initializeServer = async () => {
  try {
    httpServer.listen(8080, () => {
      console.log("Server running on port 8080");
    });

    await MongoSingleton.getInstance();
  } catch (err) {
    console.log(err);
  }
};

initializeServer();
