import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    if (initialized) {
        console.log('Already connect to MongoDB.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'Jukeboxd-App',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to MongoDB');
        initialized = true;
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}
