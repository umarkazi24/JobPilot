// Confirm modal - reusable styled dialog to replace browser's native confirm()
import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  // Don't render anything if the modal isn't open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* stopPropagation prevents clicks inside the card from closing the modal */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;