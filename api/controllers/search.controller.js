const puppeteer = require("puppeteer");

const cheerio = require("cheerio");

const browser_test = async (req, res) => {
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
};

module.exports = { browser_test };
