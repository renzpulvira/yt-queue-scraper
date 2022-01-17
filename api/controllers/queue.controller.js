const Queue = require("../models/queue.model");

const add_new = async (req, res) => {
  const { title, video_id, channel } = await req.body;
  const newQueue = new Queue({
    title,
    video_id,
    channel,
  });

  // console.log({ title, video_id, channel });
  try {
    const response = await newQueue.save();
    console.log(response);
    return res.send({ status: "ok", response });
  } catch (err) {
    if (err) return res.send({ status: "fail" });
  }
};

module.exports = { add_new };
