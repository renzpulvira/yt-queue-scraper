const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();
const scrapeController = require("../controllers/search.controller");

router.post("/browserTest", scrapeController.browser_test);

module.exports = router;
