import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log(
            'MongoDB connected:',
            mongoose.connection.name
        );
    } catch (error) {
        console.error('MongoDB error:', error);
        throw error;
    }
};

export default connectDB;