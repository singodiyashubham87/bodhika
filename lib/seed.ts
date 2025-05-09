import mongoose from 'mongoose';
import connectToDatabase from './db';
import { courses, interviewContent, resources, roadmaps } from './seeds';

// Define Mongoose schemas and models
const roadmapSchema = new mongoose.Schema({
  title: String,
  description: String,
  progress: Number,
  paths: [String],
  color: String
});

const websiteSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  tags: [String],
  rating: Number
});

const youtubeSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  tags: [String],
  rating: Number
});

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  url: String,
  tags: [String],
  rating: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  instructor: String,
  duration: String,
  students: String,
  rating: Number,
  tags: [String],
  platform: String,
  price: String,
  url: String
});

const technicalInterviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  topics: [String],
  difficulty: String,
  questions: Number
});

const behavioralInterviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  topics: [String],
  questions: Number
});

const resumeInterviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  formats: [String],
  downloads: String,
  reads: String,
  topics: [String]
});

// Create models
const Roadmap = mongoose.model('Roadmap', roadmapSchema);
const Website = mongoose.model('Website', websiteSchema);
const Youtube = mongoose.model('Youtube', youtubeSchema);
const Book = mongoose.model('Book', bookSchema);
const Course = mongoose.model('Course', courseSchema);
const TechnicalInterview = mongoose.model('TechnicalInterview', technicalInterviewSchema);
const BehavioralInterview = mongoose.model('BehavioralInterview', behavioralInterviewSchema);
const ResumeInterview = mongoose.model('ResumeInterview', resumeInterviewSchema);

async function seedDatabase() {
  try {
    // Connect to database
    const connection = await connectToDatabase();
    
    // Seed data
    const roadmapDocs = await Roadmap.insertMany(roadmaps);
    const websiteDocs = await Website.insertMany(resources.websites);
    const youtubeDocs = await Youtube.insertMany(resources.youtube);
    const bookDocs = await Book.insertMany(resources.books);
    const courseDocs = await Course.insertMany(courses);
    const technicalInterviewDocs = await TechnicalInterview.insertMany(interviewContent.technical);
    const behavioralInterviewDocs = await BehavioralInterview.insertMany(interviewContent.behavioral);
    const resumeInterviewDocs = await ResumeInterview.insertMany(interviewContent.resume);
    
    console.log('Database seeded successfully!');
    console.log({
      roadmaps: roadmapDocs.length,
      websites: websiteDocs.length,
      youtube: youtubeDocs.length,
      books: bookDocs.length,
      courses: courseDocs.length,
      technicalInterviews: technicalInterviewDocs.length,
      behavioralInterviews: behavioralInterviewDocs.length,
      resumeInterviews: resumeInterviewDocs.length
    });
    
    // Close connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();