import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/ElectionViewPage.css';
import CandidateDetailsPopup from './CandidateDetailsPopup';
import SideNavBar from '../../components/SideNavBar';
import { useParams, useNavigate } from 'react-router-dom';

function ElectionViewPage() {
  const { id } = useParams(); // election id from URL param
  const navigate = useNavigate();

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    // Fetch election data
    axios
      .get(`http://localhost:8080/elections/${id}`)
      .then((res) => {
        const data = res.data;
        setElection({
          ...data,
          electionStartTime: data.electionStartTime
            ? new Date(data.electionStartTime)
            : null,
          electionEndTime: data.electionEndTime
            ? new Date(data.electionEndTime)
            : null,
          candidateStartTime: data.candidateStartTime
            ? new Date(data.candidateStartTime)
            : null,
          candidateEndTime: data.candidateEndTime
            ? new Date(data.candidateEndTime)
            : null,
        });
      })
      .catch((err) => {
        console.error('Failed to fetch election:', err);
        alert('Failed to load election data.');
      });

    // Fetch candidates for the election
    axios
      .get(`http://localhost:8080/candidate/by_election/${id}`)
      .then((res) => {
        const formatted = res.data.map((c) => ({
          id: c.id,
          name: c.user_id.name,
          image: c.user_id.image || 'https://via.placeholder.com/150',
          promises: c.promises,
          status: c.status,
          count: c.count,
          createdAt: c.createdAt,
          email: c.user_id.email,
          phone: c.user_id.phone,
        }));
        setCandidates(formatted);
      })
      .catch((err) => {
        console.error('Failed to fetch candidates:', err);
        alert('Failed to load candidates.');
      });
  }, [id]);

 const handleCandidateClick = (candidate) => {
  if (candidate.status?.toLowerCase() === 'pending') {
    setSelectedCandidate(candidate);
  }
};


const handleStatusChange = (candidateId, newStatus) => {
  axios
    .put(
      `http://localhost:8080/candidate/updatestatus/${candidateId}`,
      newStatus, // plain string in body
      { headers: { "Content-Type": "text/plain" } }
    )
    .then(() => {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === candidateId ? { ...c, status: newStatus } : c
        )
      );
      setSelectedCandidate(null);
      alert(`Candidate status updated to ${newStatus}`);
    })
    .catch((err) => {
      console.error("Failed to update candidate status:", err);
      alert("Error updating status.");
    });
};

const handleDelete = (candidateId) => {
  if (!window.confirm("Are you sure you want to delete this candidate?")) return;

  axios
    .delete(`http://localhost:8080/candidate/${candidateId}`)
    .then(() => {
      setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
      setSelectedCandidate(null);
      alert("Candidate deleted successfully!");
    })
    .catch((err) => {
      console.error("Failed to delete candidate:", err);
      alert("Error deleting candidate.");
    });
};


  if (!election) return <div>Loading election details...</div>;

  return (
    <>
      <SideNavBar />
      <div className="election-view-page">
        <div className="election-actions">
          <button
            className="update-btn"
            onClick={() => navigate(`/election/update/${id}`)}
          >
            Update Election
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this election?')) {
                axios
                  .delete(`http://localhost:8080/elections/${id}`)
                  .then(() => {
                    alert('Election deleted successfully!');
                    navigate('/election');
                  })
                  .catch((err) => {
                    console.error('Failed to delete election:', err);
                    alert('Failed to delete election.');
                  });
              }
            }}
          >
            Delete Election
          </button>
        </div>

        <div className="election-info">
          <h2>{election.title}</h2>
          <p className="one-liner">{election.oneDescription}</p>
          {election.imageUrl && (
            <img src={election.imageUrl} alt="Banner" className="banner" />
          )}
          <p>{election.description}</p>

          <div className="meta-info">
            <p>
              <strong>Private:</strong> {election.private ? 'Yes' : 'No'}
            </p>
            {election.private && (
              <p>
                <strong>Allowed Users:</strong> {election.username}
              </p>
            )}
            <p>
              <strong>Election:</strong>{' '}
              {election.electionStartTime?.toLocaleString()} to{' '}
              {election.electionEndTime?.toLocaleString()}
            </p>
            <p>
              <strong>Candidate Registration:</strong>{' '}
              {election.candidateStartTime?.toLocaleString()} to{' '}
              {election.candidateEndTime?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="candidates-section">
          <h3>Registered Candidates</h3>
          <div className="candidates-container">
            {candidates.length === 0 ? (
              <p>No candidates registered yet.</p>
            ) : (
              candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="candidate-card"
                  onClick={() => handleCandidateClick(candidate)}
                >
                  <div className="candidate-image-wrapper">
                    <img src={candidate.image} alt={candidate.name} />
                    {candidate.status?.toLowerCase() === 'approved' && (
                      <div className="vote-count-circle">
                        {candidate.count}
                      </div>
                    )}
                  </div>
                  <h4>{candidate.name}</h4>
                  <p>{candidate.promises}</p>
                  <span
                    className={`status ${
                      candidate.status?.toLowerCase() || 'pending'
                    }`}
                  >
                    {candidate.status || 'Pending'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {selectedCandidate && (
          <CandidateDetailsPopup
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onApprove={() => handleStatusChange(selectedCandidate.id, 'Approved')}
            onReject={() => handleStatusChange(selectedCandidate.id, 'Rejected')}
            onDelete={() => handleDelete(selectedCandidate.id)}
          />
        )}
      </div>
    </>
  );
}

export default ElectionViewPage;
