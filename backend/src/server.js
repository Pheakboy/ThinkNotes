import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// call connectDB to establish a connection to the database

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration for both development and production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || true // Allow configured domain or any origin in production
        : [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
          ], // Multiple dev origins
    credentials: true,
  })
);

app.use(rateLimiter);

// Middleware to log request method and URL

app.use("/api/notes", notesRoutes);

// Static file serving and route handling for both environments
if (process.env.NODE_ENV === "production") {
  // Production: Serve built React app
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  // Development: API info endpoint
  app.get("/", (req, res) => {
    res.json({
      message: "ThinkNotes API Server",
      environment: process.env.NODE_ENV || "development",
      endpoints: {
        notes: "/api/notes",
        health: "/health",
      },
    });
  });

  // Health check for development
  app.get("/health", (req, res) => {
    res.json({
      status: "OK",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    });
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 ThinkNotes Server Started");
    console.log("================================");
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`API: http://localhost:${PORT}/api/notes`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log(`Frontend should run on: http://localhost:5173`);
    }
    console.log("================================");
  });
});
