// Main App component - sets up routing and overall application structure
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';

// Placeholder components
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

function Dashboard() {
  return <h1>Dashboard Page (Coming Soon)</h1>;
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;