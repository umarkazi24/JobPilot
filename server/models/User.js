// User model - defines the schema and structure for user documents in MongoDB (name, email, password)

// Import mongoose to define our data structure
const mongoose = require('mongoose');

// Define the structure of a User document in MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);