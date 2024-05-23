import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import router from "./route.js";
import {
  addUser, findUser, getRoomUsers, removeUser,
} from "./users.js";

const PORT = 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(router);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    const { user, isExist } = addUser({ name, room });

    if (isExist) {
      return;
    }

    socket.join(user.room);

    socket.emit("message", {
      data: {
        user: { name: "Admin" },
        message: `Добро пожаловать в комнату ${user.room}, ${user.name}`,
      },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${user.name} присоединился` },
    });

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "Admin" }, message: `${name} вышел` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room) },
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
