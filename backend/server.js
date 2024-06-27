import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./dbconfig/dbConfig.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.js"; // Ensure correct path and extension
import authRoutes from './Routes/authRoutes.js'; // Ensure correct path and extension
import userRoutes from './Routes/userRoutes.js'; // Ensure correct path and extension
import jobTypeRoutes from './Routes/jobTypeRoutes.js'; // Ensure correct path and extension
import jobsRoutes from './Routes/jobsRoutes.js'; // Ensure correct path and extension

dotenv.config();

const app = express();

// MONGODB CONNECTION
connectDB();

// Middleware
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/job-types', jobTypeRoutes);
app.use('/api/jobs', jobsRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 8020;

// Listen
app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`);
});
