// server/server.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const movieRoutes = require("./routes/movies"); // Ensure this file exists and is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/movies", movieRoutes); // Use movieRoutes for handling /api/movies requests

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log('🚀 Server running on port ${PORT}');
    });
  })
  .catch((err) => {
    console.error("X MongoDB Error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Catch-all route for handling any other requests
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Do not expose stack in production
  });
});