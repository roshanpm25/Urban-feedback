// src/Components/WardAdmin/UpdateStatus.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WardNavbar from './WardNavbar'; // Optional: include if navigation is needed

export default function UpdateStatus() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [statusProgress, setStatusProgress] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!statusProgress || isNaN(statusProgress) || statusProgress < 0 || statusProgress > 100) {
      return setError('Progress must be a number between 0 and 100');
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
    <div>
      <WardNavbar />
      <h2>Update Complaint Status</h2>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Progress (%):</label><br />
        <input
          type="number"
          min="0"
          max="100"
          value={statusProgress}
          onChange={(e) => setStatusProgress(e.target.value)}
          required
        /><br /><br />

        <label>Status Note:</label><br />
        <textarea
          value={statusNote}
          onChange={(e) => setStatusNote(e.target.value)}
          rows="3"
          placeholder="Any remarks or updates"
        /><br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
