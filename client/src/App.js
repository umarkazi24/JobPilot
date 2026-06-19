// Main App component - sets up routing and overall application structure
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';

// Placeholder for home page
function Home() {
  return (
    <div className="auth-page">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '12px' }}>Welcome to JobPilot</h1>
        <p style={{ color: 'var(--color-ink-soft)', fontSize: '16px', marginBottom: '24px' }}>
          Track your job applications with ease
        </p>
        <div>
          <Link to="/login" className="btn-primary" style={{ marginRight: '12px', display: 'inline-block', textDecoration: 'none' }}>
            Login
          </Link>
          <Link to="/register" className="btn-full" style={{ display: 'inline-block', width: 'auto', padding: '12px 20px', textDecoration: 'none' }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-application" element={<AddApplication />} />
          <Route path="/edit-application/:id" element={<EditApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;