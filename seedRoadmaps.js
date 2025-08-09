const connectDB = require("./db");
const Roadmap = require("./models/Roadmap");
const roadmaps = require("./data/roadmaps");

const seedRoadmaps = async () => {
  await connectDB(); // Connect to MongoDB

  try {
    await Roadmap.deleteMany();         // Remove existing documents
    await Roadmap.insertMany(roadmaps); // Insert new ones from static file
    console.log("✅ Roadmaps seeded successfully");
    process.exit(); // Exit script when done
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1); // Exit with error
  }
};

seedRoadmaps();
