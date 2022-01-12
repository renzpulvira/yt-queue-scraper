const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");

app.get("/", async (req, res) => {
  axios
    .get("https://en.wikipedia.org/wiki/Adventure_Time")
    .then((response) => {
      const $ = cheerio.load(response.data);
      const arr = [];
      console.log($);

      $(".mw-headline", response.data).each(function () {
        console.log($(this).text());
      });
    })
    .catch((err) => {
      if (err) return res.send({ err: err });
    });
});

app.listen(1337, () => console.log(`[SERVER][1337]\n- Server Loaded`));
