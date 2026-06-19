// Application context - manages job applications data across the app
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

// Create context
export const ApplicationContext = createContext();

// Provider component that manages application state
export const ApplicationProvider = ({ children }) => {
  // State to store all applications
  const [applications, setApplications] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(false);
  // State to store error messages
  const [error, setError] = useState('');

  // Get token from localStorage for API requests
  const getToken = () => localStorage.getItem('token');

  // Fetch all applications for the logged-in user
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.get('/api/applications', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      
      setApplications(res.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch applications';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new application
  const createApplication = useCallback(async (appData) => {
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/applications', appData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      
      // Add new application to the list
      setApplications([res.data, ...applications]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create application';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [applications]);

  // Delete an application
  const deleteApplication = useCallback(async (id) => {
    setLoading(true);
    setError('');
    
    try {
      await axios.delete(`/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      
      // Remove deleted application from list
      setApplications(applications.filter(app => app._id !== id));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete application';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [applications]);

  // Provide context to child components
  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        error,
        fetchApplications,
        createApplication,
        deleteApplication
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};