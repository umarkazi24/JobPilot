// Authentication controller - handles user registration, login, and retrieving current user information

// Import required packages and models
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user._id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Send response with token
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user exists with that email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user._id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Send response with token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user info
exports.getMe = async (req, res) => {
  try {
    // Find user by ID (from auth middleware) and exclude password
    const user = await User.findById(req.user.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};