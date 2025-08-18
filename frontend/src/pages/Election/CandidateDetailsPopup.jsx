import React from 'react';
import './Styles/CandidateDetailsPopup.css';

function CandidateDetailsPopup({ candidate, onClose, onApprove, onReject, onDelete }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={candidate.image} alt={candidate.name} />
        <h3>{candidate.name}</h3>
        {/* <p><strong>Promise:</strong> {candidate.promise}</p> */}
        <p><strong>Status:</strong> <span className={`status ${candidate.status.toLowerCase()}`}>{candidate.status}</span></p>
        <div className="popup-actions">
          <button className="approve" onClick={onApprove}>Approve</button>
          <button className="reject" onClick={onReject}>Reject</button>
          <button className="delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetailsPopup;
