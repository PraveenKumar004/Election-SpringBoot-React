import React, { useState, useEffect } from 'react';
import './Styles/ElectionCreatePage.css';
import SideNavBar from '../../components/SideNavBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ElectionUpdatePage() {
 const { id } = useParams();
  const navigate = useNavigate();

  const toLocalDateTime = (isoString) => {
    if (!isoString) return '';
    const dt = new Date(isoString);
    return dt.toISOString().slice(0, 16);
  };

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

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:8080/elections/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          title: data.title || '',
          oneDescription: data.oneDescription || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          isPrivate: data.isPrivate || false,
          username: data.username || '',
          electionStartTime: toLocalDateTime(data.electionStartTime),
          electionEndTime: toLocalDateTime(data.electionEndTime),
          candidateStartTime: toLocalDateTime(data.candidateStartTime),
          candidateEndTime: toLocalDateTime(data.candidateEndTime),
        });
      })
      .catch((err) => console.error("Failed to fetch election data:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/elections/${id}`, formData)
      .then(() => {
        alert("Election updated successfully!");
        navigate('/election'); // navigate back to election list or details page
      })
      .catch((err) => {
        console.error("Error updating election:", err);
        alert("Failed to update election.");
      });
  };

  return (
    <div className="election-page-wrapper">
      <SideNavBar />
      <div className="election-create-container">
        <h2>Update Election</h2>
        <form onSubmit={handleSubmit} className="election-form">

          <input
            type="text"
            name="title"
            placeholder="Enter election title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="oneDescription"
            placeholder="Enter a short description"
            value={formData.oneDescription}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="List the main goals or promises"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Paste image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
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

          <button type="submit">Update Election</button>
        </form>
      </div>
    </div>
  );
}

export default ElectionUpdatePage;
