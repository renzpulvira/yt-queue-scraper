require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const puppeteer = require("puppeteer");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const events = require("./events");
const io = new Server(http, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Routers
const searchRouter = require("./routers/search.router");
const queueRouter = require("./routers/queue.router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IO Events
io.on("connection", (socket) => {
  socket.on("connectToServer", (msg) => {
    console.log("New Message from client: " + msg);
    socket.emit("msgToClient", "ohyonk");
  });

  socket.on("ohyonk", (msg) => {
    console.log(msg);

    socket.emit("nice", "from server");
  });

  socket.on("added-new", (item) => {
    console.log(item);
  });

  // socket.on("new-search", socketController);

  socket.on("disconnect", () => {
    console.log("[SOCKET]\n- a user disconnected");
  });
});

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.yifph.mongodb.net/Cluster0?retryWrites=true&w=majority`,
  () => console.log(mongoose.connection.readyState)
);

app.use("/api/search/", searchRouter);
app.use("/api/queue/", queueRouter);

http.listen(1337, () => console.log(`[SERVER][1337]\n- Server Loaded`));
