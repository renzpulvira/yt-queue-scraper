const express = require("express");
const app = express();
const cheerio = require("cheerio");
const http = require("http").createServer(app);
const puppeteer = require("puppeteer");
const { Server } = require("socket.io");
const cors = require("cors");
const io = new Server(http, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  socket.on("disconnect", () => {
    console.log("[SOCKET]\n- a user disconnected");
  });
});

app.post("/search", async (req, res) => {
  const { term } = await req.body;
  const formatTerm = term.replace(/\s/g, "+");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/results?search_query=${formatTerm}`,
    {
      waitUntil: "networkidle2",
    }
  );
  const arr = [];

  const pageRes = await page.content();
  const $ = cheerio.load(pageRes);
  try {
    await $(
      "ytd-video-renderer.ytd-item-section-renderer #video-title .ytd-video-renderer",
      pageRes
    ).each(function () {
      arr.push({
        title: $(this).text(),
      });
      return arr;
    });
  } catch (err) {
    if (err) console.log(err);
  } finally {
    console.log(arr);
    await page.close();
    return res.send({ status: "ok" });
  }
});

app.post("/browserTest", async (req, res) => {
  const { term } = await req.body;
  const formatTerm = term.replace(/\s/g, "+");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/results?search_query=${formatTerm}`,
    {
      waitUntil: "networkidle2",
    }
  );
  const arr = [];

  const pageRes = await page.content();
  const $ = cheerio.load(pageRes);
  try {
    await $(
      "ytd-video-renderer[lockup='true'] #title-wrapper #video-title",
      pageRes
    ).each(function () {
      arr.push({
        title: $(this).attr("title"),
        url: $(this).attr("href"),
      });
      return arr;
    });
  } catch (err) {
    if (err) console.log(err);
  } finally {
    console.log(arr);
    await page.close();
    return res.send({ status: "ok" });
  }
});

http.listen(1337, () => console.log(`[SERVER][1337]\n- Server Loaded`));
