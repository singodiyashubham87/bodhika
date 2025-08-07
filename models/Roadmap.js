const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  title: String,
  description: String,
  levels: [String],
  tags: [String]
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
