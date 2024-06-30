import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `Connected To MongoDB Database: ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.bgRed.white);
   // process.exit(1); // Exit process with failure
  }
};

export default connectDB;
