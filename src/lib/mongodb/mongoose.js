import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  if (initialized) return;

  try {
    mongoose.set('strictQuery', true);
    mongoose.set('bufferCommands', false); // <- Prevents buffering timeout

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Jukeboxd-App', // Make sure this DB exists or is correct
    });

    initialized = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
