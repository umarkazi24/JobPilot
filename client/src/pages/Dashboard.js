// Dashboard page - displays user's job applications and allows management
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import { AuthContext } from '../context/AuthContext';

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
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      {/* Header with user info and logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {user?.name}!</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Add Application Button */}
      <div style={{ marginBottom: '30px' }}>
        <Link to="/add-application">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Add New Application
          </button>
        </Link>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>No applications yet. Start by adding one!</p>
        </div>
      ) : (
        <div>
          <h2>Your Applications ({applications.length})</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {applications.map((app) => (
              <div
                key={app._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0' }}>{app.position}</h3>
                    <p style={{ margin: '5px 0' }}><strong>Company:</strong> {app.company}</p>
                    <p style={{ margin: '5px 0' }}><strong>Status:</strong> {app.status}</p>
                    <p style={{ margin: '5px 0' }}><strong>Date Applied:</strong> {new Date(app.dateApplied).toLocaleDateString()}</p>
                    {app.location && <p style={{ margin: '5px 0' }}><strong>Location:</strong> {app.location}</p>}
                    {app.salary && <p style={{ margin: '5px 0' }}><strong>Salary:</strong> {app.salary}</p>}
                    {app.notes && <p style={{ margin: '5px 0' }}><strong>Notes:</strong> {app.notes}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/edit-application/${app._id}`}>
                      <button
                        style={{
                          padding: '5px 15px',
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(app._id)}
                      style={{
                        padding: '5px 15px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;