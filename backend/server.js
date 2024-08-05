import express from "express";
import dotEnv from "dotenv";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotEnv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server running at PORT: ${PORT}`);
});
