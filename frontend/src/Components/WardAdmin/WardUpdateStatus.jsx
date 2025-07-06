import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WardNavbar from './WardNavbar';
import './WardUpdateStatus.css'; 

export default function WardUpdateStatus() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [statusProgress, setStatusProgress] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const progressNum = Number(statusProgress);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      setError('Progress must be a number between 0 and 100');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/status/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusProgress, statusNote }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error updating status');
      } else {
        alert('✅ Status updated successfully!');
        navigate('/wardAdmin/complaints');
      }
    } catch (err) {
      console.error(err);
      setError('Server error while updating status');
    }
  };

  return (
    <>
      <WardNavbar />
      <div className="update-status-container">
        <div className="update-box">
          <h2>Update Complaint Status</h2>

          {error && <p className="error-message">❌ {error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Progress (%):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={statusProgress}
              onChange={(e) => setStatusProgress(e.target.value)}
              required
            />

            <label>Status Note:</label>
            <textarea
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              rows="3"
              placeholder="Any remarks or updates"
            />

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
}
