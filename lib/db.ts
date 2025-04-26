import mongoose from 'mongoose';
import type { Connection } from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bodhika';
const dbName = 'bodhika';

let connection: Connection;

const connectToDatabase = async (): Promise<Connection> => {
  if (connection && connection.readyState === 1) {
    return connection; // Return existing connection if already connected
  }

  try {
    const options = {
      dbName,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 10000, // Connection timeout
    };

    await mongoose.connect(uri, options);
    connection = mongoose.connection;
    console.log('Successfully connected to MongoDB database:', dbName);

    // Handle connection errors
    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      throw new Error('Database connection error');
    });

    // Handle disconnection
    connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
};

export default connectToDatabase;