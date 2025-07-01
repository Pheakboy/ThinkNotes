import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
// call connectDB to establish a connection to the database

// Middleware to parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(rateLimiter);

// Middleware to log request method and URL
// app.use((req, res, next) => {
//   console.log(` Req methos is ${req.method} & Request for url '${req.url}'`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
