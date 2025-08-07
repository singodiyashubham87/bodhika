const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  level: String,
  url: String
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
