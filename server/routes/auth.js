// Authentication routes - defines API endpoints for user registration, login, and profile access

// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions and auth middleware
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Define routes and connect them to controller functions
// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/me - Get current user (protected route)
router.get('/me', auth, getMe);

// Export the router
module.exports = router;