// Load environment variables from .env file
require('dotenv').config();

// Import express, database connection, and CORS
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Create express application
const app = express();

// Get port from environment or use 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to allow requests from React frontend
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});