// Main App component - sets up routing and overall application structure
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddApplication from './pages/AddApplication';

// Placeholder for home page
function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to JobPilot</h1>
      <p>Track your job applications with ease</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/login" style={{ marginRight: '15px' }}>Login</a>
        <a href="/register">Register</a>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;