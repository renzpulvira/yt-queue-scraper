const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("queue", QueueSchema);
