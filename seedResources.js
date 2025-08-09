const mongoose = require('mongoose');
const Resource = require('./models/resourceModel');
const resources = require('./data/resources');

mongoose.connect('mongodb://localhost:27017/gssoc_resources', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected...');
  return Resource.deleteMany(); // Optional: clear previous data
})
.then(() => {
  return Resource.insertMany(resources);
})
.then(() => {
  console.log('Resources seeded!');
  mongoose.connection.close();
})
.catch(err => {
  console.error(err);
  mongoose.connection.close();
});
