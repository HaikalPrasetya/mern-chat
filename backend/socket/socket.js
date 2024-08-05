import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    method: ["POST", "GET"],
  },
});

export const getReceiverId = (receiverId) => {
  return usersSocketMap[receiverId];
};

const usersSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connect", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) usersSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(usersSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
    delete usersSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(usersSocketMap));
  });
});

export { app, server, io };
