// Dashboard page - displays user's job applications and allows management
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import { AuthContext } from '../context/AuthContext';
import { getStatusStyle } from '../utils/statusStyles';
import './Dashboard.css';

function Dashboard() {
  // Get applications and functions from context
  const { applications, loading, fetchApplications, deleteApplication } = useContext(ApplicationContext);
  const { user, logout } = useContext(AuthContext);

  // Fetch applications when component mounts
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      await deleteApplication(id);
    }
  };

  // Show loading message while fetching
  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Top bar with greeting and logout */}
      <div className="dashboard-topbar">
        <div className="dashboard-greeting">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}</p>
        </div>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Add Application Button */}
      <div className="dashboard-actions">
        <Link to="/add-application">
          <button className="btn-primary">+ Add New Application</button>
        </Link>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="dashboard-empty">
          <p>No applications yet. Add your first one to start tracking.</p>
        </div>
      ) : (
        <div>
          <p className="dashboard-section-title">
            Your Applications ({applications.length})
          </p>
          <div className="application-list">
            {applications.map((app) => {
              const statusStyle = getStatusStyle(app.status);
              return (
                <div
                  key={app._id}
                  className="application-card"
                  style={{ '--status-color': statusStyle.color, '--status-soft': statusStyle.soft }}
                >
                  <div className="application-card-main">
                    <h3>{app.position}</h3>
                    <span className="application-card-company">{app.company}</span>
                    <div className="application-card-meta">
                      <span className="status-pill">{app.status}</span>
                      <span>Applied {new Date(app.dateApplied).toLocaleDateString()}</span>
                      {app.location && <span>{app.location}</span>}
                      {app.salary && <span>{app.salary}</span>}
                    </div>
                    {app.notes && <p className="application-card-notes">{app.notes}</p>}
                  </div>

                  <div className="application-card-actions">
                    <Link to={`/edit-application/${app._id}`}>
                      <button className="btn-icon">Edit</button>
                    </Link>
                    <button
                      className="btn-icon btn-icon-danger"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;