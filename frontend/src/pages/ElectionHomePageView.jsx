import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/ElectionHomePageView.css";
import TopNavBar from "../components/TopNavBar";
import { useParams } from "react-router-dom";

function ElectionHomePageView() {
  const { id } = useParams(); // get election ID from URL

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch election details
    axios
      .get(`http://localhost:8080/elections/${id}`)
      .then((res) => {
        const data = res.data;
        setElection({
          ...data,
          candidateStartTime: data.candidateStartTime
            ? new Date(data.candidateStartTime)
            : null,
          candidateEndTime: data.candidateEndTime
            ? new Date(data.candidateEndTime)
            : null,
          electionStartTime: data.electionStartTime
            ? new Date(data.electionStartTime)
            : null,
          electionEndTime: data.electionEndTime
            ? new Date(data.electionEndTime)
            : null,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch election details:", err);
        setElection(null);
      });

    // Fetch candidates for election
    axios
      .get(`http://localhost:8080/candidate/by_election/${id}`)
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch candidates:", err);
        setCandidates([]);
      });
  }, [id]);

  if (!election) {
    return <div>Loading election details...</div>;
  }

  const now = new Date();

  const isCandidateRegistrationOpen =
    election.candidateStartTime <= now && now <= election.candidateEndTime;

  const isVotingOpen =
    election.electionStartTime <= now && now <= election.electionEndTime;

  // Register Candidate function
  const registerCandidate = (electionId, candidateData) => {
    const userId = sessionStorage.getItem("id");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    axios
      .post(`http://localhost:8080/candidate/register/${userId}/${electionId}`, candidateData)
      .then((response) => {
        if (response.status === 201) {
          alert("Candidate registered successfully!");
          return axios.get(`http://localhost:8080/candidate/by_election/${electionId}`);
        } else if (response.status === 403) {
          alert("You are not allowed to register as a candidate in this private election.");
          throw new Error("Forbidden");
        } else if (response.status === 409) {
          alert("You have already registered as a candidate for this election.");
          throw new Error("Conflict");
        } else if (response.status === 400) {
          alert("Candidate registration is not allowed at this time.");
          throw new Error("Bad Request");
        } else {
          alert("Unexpected response from server.");
          throw new Error("Unexpected response");
        }
      })
      .then((res) => {
        setCandidates(res.data);
        setShowModal(false);
      })
      .catch((err) => {
        if (["Forbidden", "Conflict", "Bad Request"].includes(err.message)) return;
        console.error("Failed to register candidate:", err);
        alert("Failed to register candidate due to server error.");
      });
  };

  // Vote function
  const handleVote = (candidateId) => {

    const userId = sessionStorage.getItem("id");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    axios
      .post(`http://localhost:8080/vote/${userId}/${id}/${candidateId}`)
      .then(() => {
        alert(`You voted for candidate ID: ${candidateId}`);
        // Refresh candidates list to reflect votes
        return axios.get(`http://localhost:8080/candidate/by_election/${id}`);
      })
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error("Failed to vote:", err);
        alert("Voting failed");
      });
  };

  return (
    <>
      <TopNavBar />
      <div className="election-home-container">
        <div className="election-header">
          {election.imageUrl && (
            <img
              src={election.imageUrl}
              alt={election.title}
              className="election-banner"
            />
          )}
          <h1>{election.title}</h1>
          <p className="one-line">{election.oneDescription}</p>
          <p className="description">{election.description}</p>

          <div className="time-info">
            <p>
              <strong>Candidate Registration:</strong>{" "}
              {election.candidateStartTime.toLocaleString()} -{" "}
              {election.candidateEndTime.toLocaleString()}
            </p>
            <p>
              <strong>Voting Period:</strong>{" "}
              {election.electionStartTime.toLocaleString()} -{" "}
              {election.electionEndTime.toLocaleString()}
            </p>
          </div>
        </div>

        {isCandidateRegistrationOpen && (
          <div className="register-section">
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Register as Candidate
            </button>
          </div>
        )}

        <div className="candidates-section">
          <h2>Candidates</h2>
          <div className="candidates-grid">
            {candidates.length === 0 && <p>No candidates registered yet.</p>}
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onVote={isVotingOpen ? () => handleVote(candidate.id) : null}
              />
            ))}
          </div>
        </div>

        {showModal && (
          <CandidateRegistrationModal
            onClose={() => setShowModal(false)}
            onSubmit={(candidateData) => registerCandidate(id, candidateData)}
          />
        )}
      </div>
    </>
  );
}

function CandidateRegistrationModal({ onClose, onSubmit }) {
  const [promises, setPromises] = useState("");

  const handleSubmit = () => {
    if (!promises.trim()) {
      alert("Please enter your promises.");
      return;
    }
    onSubmit({ promises }); // send only promises
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
          rows={5}
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


function CandidateCard({ candidate, onVote }) {
  return (
    <div className="candidate-card">
      <img
        src={candidate.user_id.image || "https://via.placeholder.com/150"}
        alt={candidate.user_id.name || "Candidate"}
        className="candidate-photo"
      />
      <h3>{candidate.user_id.name || "Unnamed Candidate"}</h3>
      <p>{candidate.promises || candidate.description || "No description"}</p>
      {onVote && (
        <button onClick={() => onVote(candidate.id)} className="btn-vote">
          Vote
        </button>
      )}
    </div>
  );
}

export default ElectionHomePageView;
