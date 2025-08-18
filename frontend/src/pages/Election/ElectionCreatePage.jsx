import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/ElectionCreatePage.css';
import SideNavBar from '../../components/SideNavBar';

function ElectionCreatePage() {
  const [formData, setFormData] = useState({
    title: '',
    oneDescription: '',
    description: '',
    imageUrl: '',
    isPrivate: false,
    username: '',
    electionStartTime: '',
    electionEndTime: '',
    candidateStartTime: '',
    candidateEndTime: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const userId = sessionStorage.getItem("id");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const response = await axios.post(`http://localhost:8080/elections/${userId}`, formData);

    if (response.status === 201) {
      navigate('/election');
      window.location.reload();
    } else {
      alert('Failed to create election. Please try again.');
    }
  } catch (error) {
    console.error('Error creating election:', error);
    alert('Error creating election. Please check console for details.');
  }
};


  return (
    <div className="election-page-wrapper">
      <SideNavBar />
      <div className="election-create-container">
        <h2>Create New Election</h2>
        <form onSubmit={handleSubmit} className="election-form">
         
          <input
            type="text"
            name="title"
            placeholder="Enter election title (e.g., School Captain Election)"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="oneDescription"
            placeholder="Enter a short description (e.g., Vote for the best leader)"
            value={formData.oneDescription}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="List the main goals or promises for this election"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Paste image URL (optional banner/image for the election)"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <div className="toggle-private">
            <label>
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
              />
              Private Election
            </label>
          </div>
          <textarea
            type="text"
            name="username"
            placeholder="Enter usernames allowed to vote (comma-separated)"
            value={formData.username}
            onChange={handleChange}
            disabled={!formData.isPrivate}
            required={formData.isPrivate}
          />
          <label>Election Start Time</label>
          <input
            type="datetime-local"
            name="electionStartTime"
            value={formData.electionStartTime}
            onChange={handleChange}
            required
          />
          <label>Election End Time</label>
          <input
            type="datetime-local"
            name="electionEndTime"
            value={formData.electionEndTime}
            onChange={handleChange}
            required
          />
          <label>Candidate Registration Start</label>
          <input
            type="datetime-local"
            name="candidateStartTime"
            value={formData.candidateStartTime}
            onChange={handleChange}
            required
          />
          <label>Candidate Registration End</label>
          <input
            type="datetime-local"
            name="candidateEndTime"
            value={formData.candidateEndTime}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Election</button>
        </form>
      </div>
    </div>
  );
}

export default ElectionCreatePage;
