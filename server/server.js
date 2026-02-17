// Load environment variables from our .env file
require('dotenv').config();

// Import express to create our server and connectDB to connect to MongoDB
const express = require('express');
const connectDB = require('./config/db');

// Create our express application
const app = express();

// Use PORT from .env file, or default to 5000 if not set
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Tell express to automatically parse incoming JSON data
app.use(express.json());

// Test route to confirm the server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});