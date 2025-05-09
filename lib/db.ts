import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import type { ConnectOptions, Connection } from 'mongoose';
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bodhika';
const dbName = 'bodhika';

let cachedConnection: Connection | null = null;

const connectToDatabase = async (): Promise<Connection> => {
  if (cachedConnection && cachedConnection.readyState === 1) {
    console.log('Using existing database connection');
    return cachedConnection;
  }

  try {
    // Close any existing connections to avoid memory leaks
    if (cachedConnection) {
      await mongoose.disconnect();
    }

    const options: ConnectOptions = {
      dbName,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10, // Recommended to set a connection pool size
    };

    // Set up event listeners before connecting
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${dbName}`);
    });

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
    // Actually connect to the database
    await mongoose.connect(uri, options);
    
    // Cache the connection
    cachedConnection = mongoose.connection;
    
    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Handle process termination gracefully
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during disconnection:', error);
    process.exit(1);
  }
});

export default connectToDatabase;