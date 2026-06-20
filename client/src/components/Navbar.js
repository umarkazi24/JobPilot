// Navbar - persistent top navigation shown on logged-in pages only
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Log out and redirect to home page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        JobPilot
      </Link>

      <div className="navbar-actions">
        <Link to="/add-application" className="navbar-link">
          + Add Application
        </Link>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;