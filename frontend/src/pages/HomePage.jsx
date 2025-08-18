import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Home.css';
import TopNavBar from '../components/TopNavBar';

const ElectionCard = ({ election, onCardClick, onRegisterClick, onVoteClick }) => {
  const now = new Date();

  // Convert string dates to Date objects (assuming backend returns ISO strings)
  const candidateStart = election.candidateStartTime ? new Date(election.candidateStartTime) : null;
  const candidateEnd = election.candidateEndTime ? new Date(election.candidateEndTime) : null;
  const electionStart = election.electionStartTime ? new Date(election.electionStartTime) : null;
  const electionEnd = election.electionEndTime ? new Date(election.electionEndTime) : null;

  const canRegister =
    candidateStart && candidateEnd && now >= candidateStart && now <= candidateEnd;

  const canVote =
    electionStart && electionEnd && now >= electionStart && now <= electionEnd;

  return (
    <div className="election-card">
      {election.imageUrl ? (
        <img src={election.imageUrl} alt={election.title} className="card-image" />
      ) : (
        <div className="card-image-placeholder">No Image</div>
      )}
      <div className="card-content">
        <h2 className="card-title">{election.title}</h2>
        <p className="card-subtitle">{election.oneDescription}</p>
        <p className="card-description">{election.description}</p>
        <p><strong>Private Election:</strong> {election.isPrivate ? 'Yes' : 'No'}</p>
        <p><strong>Candidate Registration:</strong>{' '}
          {candidateStart ? candidateStart.toLocaleString() : '-'} -{' '}
          {candidateEnd ? candidateEnd.toLocaleString() : '-'}
        </p>
        <p><strong>Voting Period:</strong>{' '}
          {electionStart ? electionStart.toLocaleString() : '-'} -{' '}
          {electionEnd ? electionEnd.toLocaleString() : '-'}
        </p>

        {canRegister && (
          <button className="btn-primary" onClick={() => onRegisterClick(election.id)}>
            Register as Candidate
          </button>
        )}

        {canVote && !canRegister && (
          <button
            className='btn-secondary'
            style={{
              backgroundColor: '#28a745', // This is the green color
              color: '#ffffff',           // This makes the text white
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginTop: '10px'
            }}
            onClick={() => onVoteClick(election.id)}
          >
            Vote
          </button>
        )}

        {!canRegister && !canVote && (
          <button className="btn-disabled" disabled>
            Not Available
          </button>
        )}

        <button className="btn-details" onClick={() => onCardClick(election.id)}>
          View Details
        </button>
      </div>
    </div>
  );
};

function HomePage() {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/elections/all')  // Adjust API URL as needed
      .then(res => {
        setElections(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch elections', err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/home/election/${id}`);
  };

  const handleRegisterClick = (id) => {
    navigate(`/home/election/${id}/`);
  };

  const handleVoteClick = (id) => {
    navigate(`/home/election/${id}/`);
  };

  if (loading) return <div><TopNavBar/>Loading elections...</div>;

  if (!elections.length) return <div><TopNavBar/>No elections found.</div>;

  return (
    <>
    <TopNavBar/>
    <main className="home-page-container">
      <header className="page-header">
        <h1 className="page-title">Upcoming Elections</h1>
        <p className="page-subtitle">
          Your participation is crucial for our democracy. Review the upcoming elections and make your voice heard.
        </p>
      </header>

      <div className="elections-grid">
        {elections.map(election => (
          <ElectionCard
            key={election.id}
            election={election}
            onCardClick={handleCardClick}
            onRegisterClick={handleRegisterClick}
            onVoteClick={handleVoteClick}
          />
        ))}
      </div>
    </main>
    </>
  );
}

export default HomePage;
