const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  tags: [{ type: String }]
});

module.exports = mongoose.model('Resource', resourceSchema);
