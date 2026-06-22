// Authentication context - manages user login state and token across the entire app
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Point all axios requests to the deployed backend
axios.defaults.baseURL = 'https://jobpilot-backend-oq1h.onrender.com';

// Create context that components can subscribe to
export const AuthContext = createContext();

// Provider component that wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
  // State to store current user and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On component mount, check if user is already logged in
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Check if token exists in localStorage and validate it
  const checkLoggedIn = async () => {
    let token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Verify token is valid by fetching current user
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      // Token is invalid, clear it
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Provide auth state and functions to all child components
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};