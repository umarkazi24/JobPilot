// Entry point for React app - renders the App component into the DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { ToastProvider } from './context/ToastContext';

// Create root element and render App wrapped in both providers
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ApplicationProvider>
          <App />
        </ApplicationProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);