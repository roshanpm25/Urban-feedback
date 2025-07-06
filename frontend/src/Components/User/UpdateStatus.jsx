import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateStatus() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const [statusProgress, setStatusProgress] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/status/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusProgress, statusNote }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);
      alert('✅ Status updated');
      navigate('/wardAdmin/complaints');
    } catch (err) {
      alert('❌ Error updating status');
    }
  };

  return (
    <div>
      <h2>Update Complaint Status</h2>
      <form onSubmit={handleSubmit}>
        <label>Progress (%):</label><br />
        <input
          type="number"
          min="0"
          max="100"
          value={statusProgress}
          onChange={(e) => setStatusProgress(e.target.value)}
          required
        />
        <br /><br />
        <label>Status Note:</label><br />
        <textarea
          value={statusNote}
          onChange={(e) => setStatusNote(e.target.value)}
          rows={3}
        />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
