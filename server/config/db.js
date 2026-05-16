// Database configuration - establishes connection to MongoDB using Mongoose

// Load mongoose so we can connect to and work with MongoDB
const mongoose = require('mongoose');

// Define a function that will establish our database connection
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URL stored in our .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected!');
  } catch (error) {
    // If connection fails, print the error and stop the server
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Make this function available to import in other files
module.exports = connectDB;