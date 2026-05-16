// Application model - defines the schema for job application documents with fields like company, position, status, and notes

// Import mongoose to define our data structure
const mongoose = require('mongoose');

// Define the structure of an Application document in MongoDB
const applicationSchema = new mongoose.Schema({
  // Reference to which user owns this application
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview Scheduled', 'Interviewed', 'Offer', 'Rejected', 'Withdrawn'],
    default: 'Applied'
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  jobUrl: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: String
  },
  notes: {
    type: String
  },
  contacts: [{
    name: String,
    email: String,
    role: String
  }]
}, {
  timestamps: true
});

// Create and export the Application model
module.exports = mongoose.model('Application', applicationSchema);