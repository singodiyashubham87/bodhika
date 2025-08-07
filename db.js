const mongoose = require("mongoose");

// Create an async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gssoc_resources", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // stop the app if connection fails
  }
};

// Export the function so other files can use it
module.exports = connectDB;
