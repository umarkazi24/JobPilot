// Login page - allows existing users to sign in
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  // Get login function from auth context
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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

    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Call login function from context
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect to dashboard on success
      navigate('/dashboard');
    } else {
      // Show error message
      setError(result.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;