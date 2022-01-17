const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queue.controller");

router.post("/add", queueController.add_new);

module.exports = router;
