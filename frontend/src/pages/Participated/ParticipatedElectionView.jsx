import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import "./Styles/ParticipatedElectionView.css";

const ParticipatedElectionView = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [promiseText, setPromiseText] = useState("");

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/candidate/by_election/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const firstCandidate = data[0];

          const electionInfo = {
            id: firstCandidate.election_id.id,
            title: firstCandidate.election_id.title,
            oneDescription: firstCandidate.election_id.oneDescription,
            description: firstCandidate.election_id.description,
            imageUrl: firstCandidate.election_id.imageUrl,
            isPrivate: firstCandidate.election_id.isPrivate,
            electionStartTime: firstCandidate.election_id.electionStartTime,
            electionEndTime: firstCandidate.election_id.electionEndTime,
            candidateStartTime: firstCandidate.election_id.candidateStartTime,
            candidateEndTime: firstCandidate.election_id.candidateEndTime,
            promise: firstCandidate.promises || "",
            votesReceived: firstCandidate.count || 0,
            participants: data.map(c => c.user_id.name).join(", "),
          };

          setElection(electionInfo);
          setPromiseText(electionInfo.promise);
        }
      })
      .catch((err) => console.error("Error fetching election data:", err));
  }, [id]);

  if (!election) return <p>Loading...</p>;

  return (
    <>
      <SideNavBar />
      <div className="view-container">

        {/* Election Details Card */}
        <div className="election-detail-card">
          <img src={election.imageUrl} alt={election.title} className="view-banner" />
          <h2 className="election-title">{election.title}</h2>
          <p className="election-one-desc">{election.oneDescription}</p>
          <p className="election-description">{election.description}</p>

          <p className="election-date">
            🗳 Election: {new Date(election.electionStartTime).toLocaleString()} -{" "}
            {new Date(election.electionEndTime).toLocaleString()}
          </p>

          <p className="election-date">
            👤 Candidates: {new Date(election.candidateStartTime).toLocaleString()} -{" "}
            {new Date(election.candidateEndTime).toLocaleString()}
          </p>

          <p className="election-participants">
            Participants: {election.participants}
          </p>

          <span
            className={`status-badge ${
              new Date() > new Date(election.electionEndTime)
                ? "status-completed"
                : new Date() < new Date(election.electionStartTime)
                ? "status-upcoming"
                : "status-ongoing"
            }`}
          >
            {new Date() > new Date(election.electionEndTime)
              ? "Completed"
              : new Date() < new Date(election.electionStartTime)
              ? "Upcoming"
              : "Ongoing"}
          </span>
        </div>

        {/* Promise Section */}
        <div className="promise-section">
          <h3>Your Election Promise</h3>
          <textarea
            value={promiseText}
            onChange={(e) => setPromiseText(e.target.value)}
            rows="4"
          />
          <button
            className="update-btn"
            onClick={() => alert("Promise updated: " + promiseText)}
          >
            Update
          </button>
        </div>

        {/* Votes Card */}
        <div className="votes-card">
          <p className="votes-number">{election.votesReceived}</p>
          <p className="votes-label">Votes Received</p>
        </div>
      </div>
    </>
  );
};

export default ParticipatedElectionView;
