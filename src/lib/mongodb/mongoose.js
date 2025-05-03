import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  if (initialized) {
    return; // If already initialized, return early.
  }

  try {
    mongoose.set('strictQuery', true);
    mongoose.set('bufferCommands', false); // <- Prevent buffering timeout.

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Jukeboxd-App', // Make sure this DB exists or is correct
    });

    initialized = true; // Mark initialized once connection is complete
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error; // Rethrow to stop further execution if failed.
  }
};
