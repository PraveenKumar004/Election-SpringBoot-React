import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavBar from "../components/TopNavBar";
import "./Styles/WinnerPage.css";

export default function ElectionWinnerPage() {
  const { id } = useParams(); // Election ID from URL
  const navigate = useNavigate();
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/winner`) 
      .then((res) => {
        setWinner(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch winner:", err);
        setError("Unable to load winner details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <TopNavBar />
        <p className="loading-text">Loading winner details...</p>
      </div>
    );
  }

  if (error || !winner) {
    return (
      <div>
        <TopNavBar />
        <p className="error-text">{error || "No winner found for this election."}</p>
      </div>
    );
  }

  return (
    <>
      <TopNavBar />
      <main className="winner-page-container">
        <h1 className="page-title"> Election Winner</h1>
        <div className="winner-card">
          <img
            src={winner.candidateImageUrl || "/default-avatar.png"}
            alt={winner.name}
            className="winner-image"
          />
          <div className="winner-details">
            <h2 className="winner-name">{winner.name}</h2>
            <p className="winner-party">{winner.party || "Independent"}</p>
            <p className="winner-votes">
              <strong>Total Votes:</strong> {winner.voteCount}
            </p>
            {winner.description && (
              <p className="winner-description">{winner.description}</p>
            )}
            <button
              className="btn-back"
              onClick={() => navigate("/home")}
            >
              Back to Elections
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
