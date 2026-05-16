// Authentication middleware - verifies JWT tokens and protects routes that require user login

// Import jsonwebtoken to verify tokens
const jwt = require('jsonwebtoken');

// Middleware function to protect routes that require authentication
const auth = (req, res, next) => {
  // Get token from request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user data to request object so route handlers can access it
    req.user = decoded;
    
    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Export the middleware function
module.exports = auth;