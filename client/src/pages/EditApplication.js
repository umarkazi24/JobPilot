// Edit application page - allows users to update existing job application entries
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

function EditApplication() {
  // Get application ID from URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, loading, updateApplication } = useContext(ApplicationContext);

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    dateApplied: '',
    jobUrl: '',
    location: '',
    salary: '',
    notes: ''
  });
  const [error, setError] = useState('');

  // Load application data when component mounts
  useEffect(() => {
    const app = applications.find(a => a._id === id);
    if (app) {
      setFormData({
        company: app.company,
        position: app.position,
        status: app.status,
        dateApplied: new Date(app.dateApplied).toISOString().split('T')[0],
        jobUrl: app.jobUrl || '',
        location: app.location || '',
        salary: app.salary || '',
        notes: app.notes || ''
      });
    }
  }, [id, applications]);

  // Update form state when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.company || !formData.position) {
      setError('Company and position are required');
      return;
    }

    // Call updateApplication from context
    const result = await updateApplication(id, formData);

    if (result.success) {
      // Redirect back to dashboard on success
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>Edit Application</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Company (required):</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Position (required):</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Interviewed</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Withdrawn</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Date Applied:</label>
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Job URL:</label>
          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }}
          />
        </div>

        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditApplication;