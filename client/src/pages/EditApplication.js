// Edit application page - allows users to update existing job application entries
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import './Auth.css';
import './ApplicationForm.css';
import Navbar from '../components/Navbar';
import { ToastContext } from '../context/ToastContext';
import { requiredField, isValidUrl } from '../utils/validation';

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, loading, updateApplication } = useContext(ApplicationContext);
  const { showToast } = useContext(ToastContext);

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = {};
    const companyError = requiredField(formData.company, 'Company');
    if (companyError) errors.company = companyError;

    const positionError = requiredField(formData.position, 'Position');
    if (positionError) errors.position = positionError;

    if (!isValidUrl(formData.jobUrl)) {
      errors.jobUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await updateApplication(id, formData);

    if (result.success) {
      showToast('Changes saved', 'success');
      navigate('/dashboard');
    } else {
      setError(result.message);
      showToast(result.message, 'error');
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="form-page">
      <div className="form-card">
        <h2>Edit Application</h2>
        <p className="form-subtitle">Update the details of this application</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={fieldErrors.company ? 'input-error' : ''}
            />
            {fieldErrors.company && <span className="field-error">{fieldErrors.company}</span>}
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={fieldErrors.position ? 'input-error' : ''}
            />
            {fieldErrors.position && <span className="field-error">{fieldErrors.position}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Interviewed</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Applied</label>
              <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              className={fieldErrors.jobUrl ? 'input-error' : ''}
            />
            {fieldErrors.jobUrl && <span className="field-error">{fieldErrors.jobUrl}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ minHeight: '90px' }} />
          </div>

          <div className="form-actions">
            <Link to="/dashboard" style={{ flex: 1 }}>
              <button type="button" className="btn-secondary" style={{ width: '100%' }}>Cancel</button>
            </Link>
            <button type="submit" className="btn-full">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditApplication;