import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { IMessage, Message } from "./models";

import mongoose from "mongoose";
import path from "path";

dotenv.config({ path: "../.env" });

const username = encodeURIComponent(String(process.env.USER_NAME));
const password = encodeURIComponent(String(process.env.PASSWORD));
const URI = `mongodb+srv://${username}:${password}@cluster0.wchorqu.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server);
console.log(express.static(path.join(__dirname, "../../dist")));

app.use(express.static(path.join(__dirname, "../../dist")));

mongoose.set("strictQuery", true);
mongoose.connect(URI).then(() => {
  console.log("db ok");
});

io.on("connection", async (socket) => {
  const result = await Message.find();
  socket.emit("chat-message", result);
  socket.on("chat-message", async (msg: IMessage) => {
    const message = new Message(msg);
    await message.save();
    socket.broadcast.emit("chat-message", msg);
  });
});

app.get("/");

server.listen(port);
