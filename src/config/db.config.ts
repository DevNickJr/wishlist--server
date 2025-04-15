import mongoose from 'mongoose';
import env from '@/config/env.config'

const connectToDatabase = async (callback: () => void) => {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(env.DATABASE_URL, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
    callback();
  } catch (err) {
    console.error(err);
  }
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

export default connectToDatabase;