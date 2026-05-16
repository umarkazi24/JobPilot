// Application routes - defines protected API endpoints for managing job applications and viewing statistics

// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions and auth middleware
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats
} = require('../controllers/applicationController');
const auth = require('../middleware/auth');

// All routes are protected - require authentication
// GET /api/applications - Get all applications for logged-in user
router.get('/', auth, getApplications);

// GET /api/applications/stats - Get statistics
router.get('/stats', auth, getStats);

// GET /api/applications/:id - Get single application by ID
router.get('/:id', auth, getApplicationById);

// POST /api/applications - Create new application
router.post('/', auth, createApplication);

// PUT /api/applications/:id - Update application
router.put('/:id', auth, updateApplication);

// DELETE /api/applications/:id - Delete application
router.delete('/:id', auth, deleteApplication);

// Export the router
module.exports = router;