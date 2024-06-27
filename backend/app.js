import express from "express";
import { dbConnection } from "./database/dbConnection.js"; // Ensure dbConnection is correct
import { config } from "dotenv"; // Load environment variables
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js"; // Ensure this middleware is correct
import messageRouter from "./router/messageRouter.js"; // Ensure paths are correct
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import dotenv from "dotenv"

const app = express();

dotenv.config({ path: './config/.env' });
// Load environment variables from .env file

 // Make sure config.env exists and is valid

// CORS options configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Frontend origin
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

// Use CORS middleware with specified options
app.use(cors(corsOptions)); // Apply CORS options
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// File upload middleware
app.use(fileUpload({
    useTempFiles: true, // Use temporary files
    tempFileDir: "/tmp/", // Temp directory
}));

// Route definitions
app.use("/api/v1/message", messageRouter); // Ensure router files are correctly set up
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Initialize database connection
dbConnection(); // Ensure this is a valid and working connection

// Error handling middleware
app.use(errorMiddleware); // Ensure this middleware is defined and correctly set up

export default app; // Export app for server entry point
