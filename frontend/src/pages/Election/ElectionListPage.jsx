import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/ElectionListPage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/SideNavBar';

const ElectionListPage = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080/elections/user/${userId}`)
      .then((res) => {
        setElections(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch elections.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this election?');
    if (!confirmDelete) return;

    axios.delete(`http://localhost:8080/elections/${id}`)
      .then((response) => {
        if (response.status === 204) {
          window.location.reload();
        } else {
          alert('Failed to delete election.');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert('Election not found.');
        } else {
          alert('An error occurred while deleting the election.');
        }
        console.error(error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/election/update/${id}`);
  };

  const handleCreate = () => {
    navigate('/election/create');
  };

  const handleViewPage = (id) => {
    navigate(`/election/view/${id}`);
  };

  // NEW: Handle announcing winner
  const handleAnnounceWinner = (id) => {
    if (window.confirm('Are you sure you want to announce the winner for this election?')) {
      axios.post(`http://localhost:8080/elections/${id}/announce-winner`)
        .then(() => {
          alert('Winner announced successfully!');
          window.location.reload();
        })
        .catch((err) => {
          console.error('Failed to announce winner:', err);
          alert('Failed to announce winner.');
        });
    }
  };

  const hasElectionEnded = (endDate) => {
    return new Date(endDate) < new Date();
  };

  if (loading) return <div>Loading elections...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="election-page">
      <SideNavBar />
      <div className="election-list-container">
        <div className="election-header">
          <h2>Your Elections</h2>
          <button className="create-button" onClick={handleCreate}>+ Create Election</button>
        </div>
        <div className="election-list">
          {elections.length === 0 ? (
            <p>No elections created yet.</p>
          ) : (
            elections.map((election) => (
              <div key={election.id} className="election-card">
                <img
                  src={election.imageUrl || 'https://via.placeholder.com/400x225?text=No+Image'}
                  alt={election.title}
                  className="election-image"
                />
                <div className="election-details">
                  <h3 style={{ cursor: 'pointer' }} onClick={() => handleViewPage(election.id)}>
                    {election.title}
                  </h3>
                  <p>{election.oneDescription}</p>
                  <p><strong>Private:</strong> {election.isPrivate ? 'Yes' : 'No'}</p>
                  
                  {/* Show "Announce Winner" if election ended */}
                  {election.electionEndTime && hasElectionEnded(election.electionEndTime) && (
                    election.winner
                      ? <p style={{ color: 'green' }}><strong>Winner:</strong> {election.winner}</p>
                      : <button
                          className="create-button"
                          onClick={() => handleAnnounceWinner(election.id)}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          Announce Winner
                        </button>
                  )}

                  <div className="icon-buttons">
                    <FaEdit className="icon edit-icon" onClick={() => handleUpdate(election.id)} />
                    <FaTrashAlt className="icon delete-icon" onClick={() => handleDelete(election.id)} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionListPage;
