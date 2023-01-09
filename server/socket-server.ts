import http from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8081;

io.on("connection", (socket) => {});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
