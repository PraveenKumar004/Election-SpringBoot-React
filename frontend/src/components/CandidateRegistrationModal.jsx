import React, { useState } from "react";

function CandidateRegistrationModal({ onClose, onSubmit }) {
  const [promises, setPromises] = useState("");

  const handleSubmit = () => {
    if (!promises.trim()) {
      alert("Please enter your promises.");
      return;
    }
    onSubmit({ promises: promises });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register as Candidate</h2>
        <textarea
          placeholder="Enter your campaign promises..."
          value={promises}
          onChange={(e) => setPromises(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistrationModal;
