// Toast context - lets any component trigger a temporary notification popup
import React, { createContext, useState, useCallback } from 'react';
import './Toast.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  // Array of currently visible toasts
  const [toasts, setToasts] = useState([]);

  // Show a new toast, then automatically remove it after 3 seconds
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container - renders all active toasts in the corner */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};