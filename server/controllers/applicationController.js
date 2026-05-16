// Application controller - handles CRUD operations (create, read, update, delete) and statistics for job applications

// Import the Application model
const Application = require('../models/Application');

// Get all applications for the logged-in user
exports.getApplications = async (req, res) => {
  try {
    // Find all applications where userId matches the logged-in user
    const applications = await Application.find({ userId: req.user.user.id })
      .sort({ dateApplied: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    // Find application by ID
    const application = await Application.findById(req.params.id);

    // Check if application exists
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Make sure the application belongs to the logged-in user
    if (application.userId.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    // Extract data from request body
    const { company, position, status, dateApplied, jobUrl, location, salary, notes, contacts } = req.body;

    // Create new application with userId from authenticated user
    const application = new Application({
      userId: req.user.user.id,
      company,
      position,
      status,
      dateApplied,
      jobUrl,
      location,
      salary,
      notes,
      contacts
    });

    // Save to database
    await application.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an application
exports.updateApplication = async (req, res) => {
  try {
    // Find application by ID
    let application = await Application.findById(req.params.id);

    // Check if application exists
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Make sure the application belongs to the logged-in user
    if (application.userId.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update application with new data
    application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
  try {
    // Find application by ID
    const application = await Application.findById(req.params.id);

    // Check if application exists
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Make sure the application belongs to the logged-in user
    if (application.userId.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete the application
    await Application.findByIdAndDelete(req.params.id);

    res.json({ message: 'Application removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get statistics for dashboard
exports.getStats = async (req, res) => {
  try {
    // Get all applications for the user
    const applications = await Application.find({ userId: req.user.user.id });

    // Calculate stats
    const totalApplications = applications.length;
    
    // Count applications by status
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    // Group applications by month
    const applicationsByMonth = applications.reduce((acc, app) => {
      const month = new Date(app.dateApplied).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalApplications,
      statusCounts,
      applicationsByMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};