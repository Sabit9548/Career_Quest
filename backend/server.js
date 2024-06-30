import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./dbconfig/dbConfig.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.js"; 
import authRoutes from './Routes/authRoutes.js'; 
import userRoutes from './Routes/userRoutes.js'; 
import jobTypeRoutes from './Routes/jobTypeRoutes.js'; 
import jobsRoutes from './Routes/jobsRoutes.js';

dotenv.config();

const app = express();

// MongoDB connection
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
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error Handling Middleware
app.use(errorHandler);

// Port
const port = 8001;

// Listen
app.listen(port, () => {
  console.log(`Node Server Running In ${process.env.NODE_ENV} Mode on port no ${port}`);
});
