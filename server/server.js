// Main server file - initializes Express app, connects to MongoDB, and mounts all routes

// Load environment variables from .env file
require('dotenv').config();

// Import express and database connection
const express = require('express');
const connectDB = require('./config/db');

// Create express application
const app = express();

// Get port from environment or use 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount auth routes at /api/auth
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});