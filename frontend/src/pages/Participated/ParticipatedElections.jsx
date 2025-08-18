import React, { useEffect, useState } from "react";
import "./Styles/ParticipatedElections.css";
import SideNavBar from "../../components/SideNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ParticipatedElections = () => {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("id"); // get user id from session storage
    if (!userId) {
      console.error("No user ID found in sessionStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/candidate/by_user/${userId}`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          id: item.election_id.id,
          name: item.election_id.title,
          description: item.election_id.description,
          date: item.election_id.electionStartTime,
          banner:
            item.election_id.imageUrl ||
            "https://via.placeholder.com/300x160.png?text=Election",
          status: item.status || "Completed",
        }));
        setElections(formatted);
      })
      .catch((err) => {
        console.error("Error fetching participated elections:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SideNavBar />
      <div className="participated-container">
        <h2 className="page-title">Elections You Participated In</h2>

        {loading ? (
          <p>Loading...</p>
        ) : elections.length === 0 ? (
          <p className="no-data">You haven’t participated in any elections yet.</p>
        ) : (
          <div className="participated-grid">
            {elections.map((election) => (
              <div key={election.id} className="participated-card">
                <img
                  src={election.banner}
                  alt={election.name}
                  className="participated-image"
                />
                <div className="participated-details">
                  <h3
                    className="clickable-title"
                    onClick={() => navigate(`/participated/${election.id}`)}
                  >
                    {election.name}
                  </h3>
                  <p>{election.description}</p>
                  <p className="participated-date">
                    Date: {new Date(election.date).toLocaleDateString()}
                  </p>
                  <span
                    className={`status-badge ${
                      election.status === "Pending"
                        ? "pending"
                        : election.status === "Completed"
                        ? "completed"
                        : "other"
                    }`}
                  >
                    {election.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ParticipatedElections;
